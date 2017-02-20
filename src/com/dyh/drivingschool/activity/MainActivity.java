package com.dyh.drivingschool.activity;

import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.util.Timer;
import java.util.TimerTask;
import com.amap.api.location.AMapLocation;
import com.dyh.drivingschool.contents.Constants;
import com.dyh.drivingschool.contents.ReciverContents;
import com.dyh.drivingschool.contents.UserData;
import com.dyh.drivingschool.db.service.UserDataService;
import com.dyh.drivingschool.model.DemoJavaScriptInterface;
import com.dyh.drivingschool.model.ShareClass;
import com.dyh.drivingschool.uiservice.JpushService;
import com.dyh.drivingschool.utils.IntentUtil;
import com.dyh.drivingschool.utils.StringUtil;
import com.dyh.drivingschool.utils.ToastUtil;
import com.dyh.drivingschool.utils.YokaLog;
import com.ksfc.drive.Push.JPushReceiver;
import com.dyh.drivingschool.R;

import android.net.Uri;
import android.os.Build;
import android.os.Bundle;
import android.os.Handler.Callback;
import android.os.Message;
import android.annotation.SuppressLint;
import android.annotation.TargetApi;
import android.os.Handler;
import android.os.Looper;
import android.app.Activity;
import android.content.BroadcastReceiver;
import android.content.Context;
import android.content.Intent;
import android.content.IntentFilter;
import android.graphics.Bitmap;
import android.graphics.BitmapFactory;
import android.text.TextUtils;
import android.util.Base64;
import android.util.Log;
import android.view.KeyEvent;
import android.view.Menu;
import android.view.View;
import android.view.View.OnClickListener;
import android.webkit.WebSettings;
import android.webkit.JavascriptInterface;
import android.webkit.WebSettings.RenderPriority;
import android.webkit.WebView;
import android.webkit.WebViewClient;
import android.widget.Button;
import android.widget.Toast;

@TargetApi(Build.VERSION_CODES.HONEYCOMB_MR1)
public class MainActivity extends LocationActivity implements Callback {
	private WebView mWebView;
	private static final int requestCode = 1;
	public static String city = "";
	private static final String JsCityMethod = "";
	private static final String JsMapidMethod = "";
	private String id;
	// 是否加载详情
	private boolean isJump = false;
	private String TAG = "MainActivity";
	private final int Recivercode = 2;
	private final int Jpushcode = 1;
	private final int JpushIdcode = 3;
	private final int UpPiccode = 4;
	private Handler mHandler;
	private UserDataService userDataService;
	protected void onCreate(Bundle savedInstanceState) {
		super.onCreate(savedInstanceState);
		setContentView(R.layout.activity_main);
		mHandler = new Handler(this);
		// upcanshu();
		userDataService=new UserDataService(this);
		mWebView = (WebView) findViewById(R.id.webview);
		WebSettings webSettings = mWebView.getSettings();
		webSettings.setDomStorageEnabled(true);
		webSettings.setAppCacheEnabled(true);
		webSettings.setDatabaseEnabled(true);
		webSettings.setAppCacheMaxSize(1024 * 1024 * 8);
		String appCachePath = getApplicationContext().getCacheDir()
				.getAbsolutePath();
		webSettings.setAppCachePath(appCachePath);
		webSettings.setDatabasePath(appCachePath);
		webSettings.setAllowFileAccess(true);
		webSettings.setRenderPriority(RenderPriority.HIGH);
		webSettings.setCacheMode(WebSettings.LOAD_DEFAULT); // 设置 缓存模式
		webSettings.setAppCacheEnabled(true); // 开启 Application Caches 功能
		mWebView.setWebViewClient(new MyWebViewClient());
		webSettings.setJavaScriptEnabled(true);
		webSettings.setSupportZoom(true);
		mWebView.addJavascriptInterface(new DemoJavaScriptInterface(this),
				"androidjsdemo");
		webSettings.setDefaultTextEncodingName("UTF-8");
		registerReceiver();
		mWebView.loadUrl("file:///android_asset/html/html/home/home.html");
	}

	@Override
	public void onStart() {
		// TODO Auto-generated method stub
		super.onStart();

		// ToastUtil.showToast(this, 0, UserData.MapId + "//////////", true);
		if (UserData.isJump) {
			UserData.isJump = false;
			mWebView.loadUrl("file:///android_asset/html/html/studycar/divingSchoolInfo.html");
			// 地图传参
			String qian = "javascript:(function(){divingSchoolInfo('";
			String hou = "');})()";
			String URL = qian + UserData.MapId + hou;
			mWebView.loadUrl(URL);
		} else if (UserData.ispic) {
			UserData.ispic = false;
			String qian = "javascript:(function(){imgread('";
			String hou = "');})()";
			String URL = qian + UserData.picPath + hou;
			YokaLog.d(TAG, URL);
			mWebView.loadUrl(URL);
		} else if (JPushReceiver.islogin&UserData.isOpenNote) {
			UserData.isOpenNote=false;
			mWebView.loadUrl("file:///android_asset/html/html/mydiving/message.html");
		}
	}

	private class MyWebViewClient extends WebViewClient {
		@Override
		public boolean shouldOverrideUrlLoading(WebView view, String url) {

			view.loadUrl(url);
			return super.shouldOverrideUrlLoading(view, url);
		}
	}

	@Override
	public boolean onKeyDown(int keyCode, KeyEvent event) {
		// 用户点击了返回键
		if (keyCode == KeyEvent.KEYCODE_BACK && event.getRepeatCount() == 0) {
			if (canExit) {
				return super.onKeyDown(keyCode, event);
			}
			oneAgainExit();
			return true;
		}
		return super.onKeyDown(keyCode, event);
	}

	private boolean canExit = false;

	private void oneAgainExit() {
		canExit = true;
		new Timer().schedule(new TimerTask() {
			@Override
			public void run() {
				canExit = false;
			}
		}, 2500);
		if (canExit)
			// ToastUtil.showToast
			Toast.makeText(this, R.string.one_again_exit, Toast.LENGTH_LONG)
					.show();
	}

	@Override
	public void onLocationChanged(AMapLocation arg0) {
		super.onLocationChanged(arg0);
		// 获取定位信息
		// ToastUtil.showToast(this, 0, arg0.getCity(), false);
		city = arg0.getCity();
		sendStringToJs(city);
		// ToastUtil.showToast(this, 0, city + "00000000000", true);

	}

	// 传给js数据
	@SuppressWarnings("unused")
	private void sendStringToJs(String city) {
		String qian = "javascript:(function(){getcityid('";
		String hou = "');})()";
		String URL = qian + city + hou;
		mWebView.loadUrl(URL);
	}

	/*
	 * 注册广播
	 */
	private Receiver mReceiver;

	private void registerReceiver() {
		mReceiver = new Receiver();
		IntentFilter filter = new IntentFilter();
		filter.addAction(ReciverContents.cityListReciver);
		this.registerReceiver(mReceiver, filter);
	}

	/*
	 * 取消注册广播
	 */
	private void unRegisterReceiver() {
		if (null != mReceiver) {
			this.unregisterReceiver(mReceiver);
			mReceiver = null;
		}
	}

	private class Receiver extends BroadcastReceiver {
		@Override
		public void onReceive(Context context, Intent intent) {
			YokaLog.d(TAG, "LiwudianFg==onReceive() is " + intent.getAction());
			if (ReciverContents.cityListReciver == intent.getAction()) {
				String bundle = intent.getStringExtra(CityListActivity.TAG);
				Message msg = new Message();
				msg.what = Recivercode;
				msg.obj = bundle;
				mHandler.sendMessage(msg);
			} else if (ReciverContents.JpushReciver == intent.getAction()) {
				Message msg = new Message();
				msg.what = Jpushcode;
				mHandler.sendMessage(msg);
			} else if (ReciverContents.JpushidReciver == intent.getAction()) {
				Message msg = new Message();
				msg.what = JpushIdcode;
				mHandler.sendMessage(msg);
			} else if (ReciverContents.picReciver == intent.getAction()) {
				Message msg = new Message();
				msg.what = UpPiccode;
				msg.obj = intent.getBundleExtra(Constants.uppicbundle);
				mHandler.sendMessage(msg);
			}
		}
	}

	@Override
	public boolean handleMessage(Message msg) {
		switch (msg.what) {
		case Recivercode:
			city = (String) msg.obj;
			sendStringToJs(city);
			mLocationManagerProxy.destroy();
			break;
		case Jpushcode:
			mWebView.loadUrl("file:///android_asset/html/html/person/messageCenter.html");
			break;
		case JpushIdcode:
			IntentUtil.serviceForward(this, JpushService.class, null, false);
			break;
		case UpPiccode:
			// Bundle bundle = (Bundle) msg.obj;
			// String picString = bundle.getString(Constants.upPicTag);
			// String picState = bundle.getString(Constants.upStateTag);
			// String qian = "javascript:(function(){postPicSuccess('";
			// String hou = "');})()";
			// String URL = qian + picString + ',' + picState + hou;
			// ToastUtil.showToast(this, 0, URL, true);
			// YokaLog.d(TAG, picString);
			// mWebView.loadUrl(URL);
			break;
		default:
			break;
		}

		return false;

	}

	@Override
	protected void onDestroy() {
		// TODO Auto-generated method stub
		super.onDestroy();
		this.stopService(new Intent(this, JpushService.class));
		unRegisterReceiver();

	}
}