package com.dyh.drivingschool.activity;

import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.text.NumberFormat;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.Map;

import org.apache.http.HttpEntity;
import org.apache.http.HttpResponse;
import org.apache.http.client.ClientProtocolException;
import org.apache.http.client.HttpClient;
import org.apache.http.client.methods.HttpGet;
import org.apache.http.impl.client.DefaultHttpClient;
import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

import android.app.AlertDialog;
import android.app.Dialog;
import android.app.ProgressDialog;
import android.app.AlertDialog.Builder;
import android.content.Intent;
import android.content.pm.PackageInfo;
import android.content.pm.PackageManager;
import android.content.pm.PackageManager.NameNotFoundException;
import android.net.Uri;
import android.os.AsyncTask;
import android.os.Bundle;
import android.os.Environment;
import android.os.Handler;
import android.os.Message;
import android.text.TextUtils;
import android.util.Log;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.view.Window;
import android.view.View.OnClickListener;
import android.widget.BaseAdapter;
import android.widget.Button;
import android.widget.ImageView;
import android.widget.LinearLayout;
import android.widget.ProgressBar;
import android.widget.TextView;
import android.widget.Toast;

import com.dyh.drivingschool.activity.WeatherActivity.Weather;
import com.dyh.drivingschool.activity.WeatherActivity.Weather.Index;
import com.dyh.drivingschool.activity.WeatherActivity.Weather.Weather_data;
import com.dyh.drivingschool.contents.InterfaceParams;
import com.dyh.drivingschool.net.NetRequestService;
import com.dyh.drivingschool.net.NetUrl;
import com.dyh.drivingschool.utils.YokaLog;
import com.dyh.drivingschool.R;
import com.nostra13.universalimageloader.core.ImageLoader;

public class VersionActivity extends BaseActivity implements OnClickListener{

	private LinearLayout oil_title_back;
	private TextView version_code;
	private Button version_bt;
	
	private Dialog dialog;
	
	@Override
	protected void onCreate(Bundle savedInstanceState) {
		// TODO Auto-generated method stub
		super.onCreate(savedInstanceState);
		setContentView(R.layout.version_layout);
		
		initView();
	}

	private void initView() {
		oil_title_back=(LinearLayout) findViewById(R.id.oil_title_back);
		version_code=(TextView) findViewById(R.id.version_code);
		version_bt=(Button) findViewById(R.id.version_bt);
		
		version_code.setText("V "+getVersionName());
		
		oil_title_back.setOnClickListener(this);
		version_bt.setOnClickListener(this);
	}

	@Override
	public void onClick(View v) {
		switch(v.getId()){
		case R.id.oil_title_back:
			finish();
			break;
		case R.id.version_bt:
			new MyAsyncTask().execute();
			break;
		}
	}

	private ProgressDialog pdialog;

	protected class MyAsyncTask extends AsyncTask<Object, Object, Object> {
		protected MyAsyncTask() {
			pdialog = ProgressDialog.show(VersionActivity.this,"","版本信息获取中...");
		}

		@Override
		protected Object doInBackground(Object... params) {
			Map<String,String> map=new HashMap<String, String>();	
			map.put("platform", "0");
			return new NetRequestService(VersionActivity.this).requestData("POST",InterfaceParams.VERSION,"0", map, false);
			
		};

		@SuppressWarnings("unchecked")
		@Override
		protected void onPostExecute(Object result) {
			super.onPostExecute(result);
			YokaLog.e("MyAsyncTask", "MyAsyncTask==onPostExecute()" + result);
			if (null != pdialog && pdialog.isShowing()) {
				pdialog.dismiss();
				pdialog = null;
			}
			if (result == null) {
				return;
			}
			
			try {
				JSONObject js=new JSONObject((String)result);
				
				String code=js.getString("code");
				
				if("1000".equals(code)){
					JSONObject content=js.getJSONObject("content");
					if(content!=null){
						String versionCode=content.getString("versionCode");
						int versionNum=content.getInt("versionNum");
						String url=content.getString("url");
						String minpermVersionCode=content.getString("minpermVersionCode");
						int minpermVersionNum=content.getInt("minpermVersionNum");
						
						if(versionNum>minpermVersionNum){//有新版本，需要更新
							showVersionDialog(1, NetUrl.TEST_HOST+"app/download/"+url);
						}else{
							showVersionDialog(0, null);
						}
					}else{
						showVersionDialog(0, null);
					}
				}else {
					showVersionDialog(0, null);
				}
				
			} catch (JSONException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
				showVersionDialog(0, null);
			}
		}
	}
	
	private String getVersionName() {
		// 获取packagemanager的实例
		PackageManager packageManager = getPackageManager();
		// getPackageName()是你当前类的包名，0代表是获取版本信息
		String version = "";
		int versionCode=1;
		try {
			PackageInfo packInfo = packageManager.getPackageInfo(getPackageName(), 0);
			version = packInfo.versionName;
			versionCode = packInfo.versionCode;
		} catch (NameNotFoundException e) {
			// TODO Auto-generated catch block
			version = "";
			e.printStackTrace();
		}
		
		return version+"."+versionCode;
	}
	
	// 弹出版本的对话框；state=0：最新版本；state=1：新版本
	private void showVersionDialog(final int state,final String url) {
		View v = LayoutInflater.from(this).inflate(R.layout.dialoglayout_dati, null);

		dialog = new Dialog(this);
		dialog.requestWindowFeature(Window.FEATURE_NO_TITLE);
		dialog.setContentView(v);

		TextView title = (TextView) v.findViewById(R.id.dialog_text);
		Button leftBt = (Button) v.findViewById(R.id.dialog_okBtn);
		Button rightBtn = (Button) v.findViewById(R.id.dialog_cancelBtn);

		if (state == 0) {// 最新版本
			title.setText("目前已经是最新的版本。");
			leftBt.setText("确定");
		} else if (state == 1) {
			title.setText("发现新版本，是否需要更新?");
			leftBt.setText("立即更新");
			rightBtn.setVisibility(View.VISIBLE);
			rightBtn.setText("以后更新");
		}

		leftBt.setOnClickListener(new OnClickListener() {

			@Override
			public void onClick(View v) {
				if (dialog != null && dialog.isShowing()) {
					dialog.dismiss();
				}
				if (state == 1) {
					// 下载app
					if(!TextUtils.isEmpty(url) && url.startsWith("http:")){
						loaderApk(url);
					}
				}
			}
		});

		rightBtn.setOnClickListener(new OnClickListener() {

			@Override
			public void onClick(View v) {
				if (dialog != null && dialog.isShowing()) {
					dialog.dismiss();
				}
			}
		});

		dialog.show();
	}
	

	private ProgressBar updateProgress;
	private TextView updatePercentage;
	private TextView updateDownlength;
	private TextView updateFilelength;
	public Builder pBar;
	private Button update_cancelBt;
	private AlertDialog downloadAlertDialog;
	private float filelength;
	private float downlength;
	downFileThread downFileThread;
	private boolean stop = true;
	private String urlName = "";

	// 下载apk的方法
	private void loaderApk(final String apkurl) {

		if (!"".equals(apkurl)) {
			urlName = apkurl.substring(apkurl.lastIndexOf("/") + 1);
		}

		View updateView = LayoutInflater.from(VersionActivity.this).inflate(
				R.layout.update_view, null);
		updateProgress = (ProgressBar) updateView.findViewById(R.id.update_bar);
		updatePercentage = (TextView) updateView
				.findViewById(R.id.update_percentage);
		updateDownlength = (TextView) updateView.findViewById(R.id.update_data);
		updateFilelength = (TextView) updateView
				.findViewById(R.id.update_data2);
		update_cancelBt = (Button) updateView
				.findViewById(R.id.update_cancelBt);

		pBar = new AlertDialog.Builder(VersionActivity.this);
		updateProgress.setIndeterminate(false);
		pBar.setView(updateView);
		pBar.setCancelable(false);

		downloadAlertDialog = pBar.create();
		downloadAlertDialog.show();
		downFileThread = new downFileThread(apkurl);// 下载
		stop = true;
		downFileThread.start();

		update_cancelBt.setOnClickListener(new OnClickListener() {

			@Override
			public void onClick(View v) {
				// TODO Auto-generated method stub
				pBar.setCancelable(true);

				downloadAlertDialog.cancel();
				downloadAlertDialog.dismiss();

				stop = false;

				File file = new File(getPath(), urlName);
				if (file.exists()) {
					file.delete();
				}

				updateProgress.setProgress(0);
				updatePercentage.setText("0%");
				updateDownlength.setText("0kb/");
				updateFilelength.setText("0kb");

			}
		});

	}

	/**
	 * 方法说明：消息队列
	 * */
	private Handler handler = new Handler() {

		public void handleMessage(Message msg) {
			if (!Thread.currentThread().isInterrupted()) {
				switch (msg.what) {
				case 0:
					updateProgress.setMax((int) filelength);
					updateFilelength.setText((int) filelength / 1000 + "kb");
					break;
				case 1:
					updateProgress.setProgress((int) downlength);
					updateDownlength.setText((int) downlength / 1000 + "kb/");
					updatePercentage.setText(format(downlength / filelength));
					break;
				case 2:
					pBar.setCancelable(true);
					if (downloadAlertDialog != null
							&& downloadAlertDialog.isShowing()) {
						downloadAlertDialog.dismiss();
						Toast.makeText(getApplicationContext(), "文件下载完成", 0)
								.show();
					}
					break;
				case -1:
					Toast.makeText(getApplicationContext(), "文件下载失败，请重新下载", 0)
							.show();
					pBar.setCancelable(true);
					if (downloadAlertDialog != null
							&& downloadAlertDialog.isShowing()) {
						downloadAlertDialog.dismiss();
					}
					break;

				}
				super.handleMessage(msg);
			}
		}
	};

	/**
	 * 方法说明：百分数转换
	 * */
	private String format(double i) {
		NumberFormat nf = NumberFormat.getPercentInstance();
		nf.setMaximumIntegerDigits(5);// 小数点前保留几位
		nf.setMinimumFractionDigits(0);
		return nf.format(i);
	}

	/**
	 * 方法说明：发送消息
	 * */
	private void sendMsg(int flag) {
		Message msg = new Message();
		msg.what = flag;
		handler.sendMessage(msg);
	}

	/**
	 * 方法说明：文件下载
	 * */
	class downFileThread extends Thread {

		String url;

		downFileThread(String url) {
			this.url = url;
		}

		public void run() {

			HttpClient client = new DefaultHttpClient();
			HttpGet get = new HttpGet(url);

			HttpResponse response;
			File file = null;
			try {
				response = client.execute(get);
				if (response.getStatusLine().getStatusCode() == 200) {
					HttpEntity entity = response.getEntity();
					filelength = entity.getContentLength();
					InputStream is = entity.getContent();
					FileOutputStream fileOutputStream = null;
					if (is != null) {

						File f = new File(getPath());
						if (!f.exists()) {
							f.mkdirs();
						}

						file = new File(getPath(), urlName);

						fileOutputStream = new FileOutputStream(file, false);

						byte[] buf = new byte[1024];

						sendMsg(0);// 给进度条set最大值
						int ch = -1;
						downlength = 0;
						while ((ch = is.read(buf)) != -1) {
							if (stop) {
								fileOutputStream.write(buf, 0, ch);
								downlength += ch;
								if (filelength > 0) {
									sendMsg(1);// 更新进度条
								}
							} else {
								fileOutputStream = null;
								break;
							}
						}

					}
					if (fileOutputStream != null) {
						fileOutputStream.flush();
						fileOutputStream.close();
						down();
					}
				} else {
					handler.sendEmptyMessage(-1);
				}
			} catch (ClientProtocolException e) {
				e.printStackTrace();
				Log.e("ClientProtocolException", "ClientProtocolException");
				handler.sendEmptyMessage(-1);
			} catch (IOException e) {
				e.printStackTrace();
				Log.e("IOException", "IOException");
				handler.sendEmptyMessage(-1);
			}
		}

	}

	private String getPath() {
		String sdDir = null;
		boolean sdCardExist = Environment.getExternalStorageState().equals(
				android.os.Environment.MEDIA_MOUNTED); // 判断sd卡是否存在
		if (sdCardExist) {
			sdDir = Environment.getExternalStorageDirectory().getPath()
					+ "/com.example.weiStore/apk/";// 获取跟目录
		} else {
			sdDir = "data/data/files/com.example.weiStore/apk/";
		}
		return sdDir;
	}

	/**
	 * 方法说明：
	 * */
	private void down() {
		handler.post(new Runnable() {
			public void run() {
				sendMsg(2);// 通知进度条下载完成
				update();
			}
		});

	}

	/**
	 * 方法说明：升级替换原程序
	 * */
	private void update() {
		Intent intent = new Intent();
		intent.addFlags(Intent.FLAG_ACTIVITY_NEW_TASK);
		intent.setAction(android.content.Intent.ACTION_VIEW);
		intent.setDataAndType(Uri.fromFile(new File(getPath() + urlName)),
				"application/vnd.android.package-archive");
		startActivity(intent);
	}
}
