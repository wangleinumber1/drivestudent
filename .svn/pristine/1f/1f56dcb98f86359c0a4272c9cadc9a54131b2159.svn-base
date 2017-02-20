package com.dyh.drivingschool.activity;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.Map;

import android.annotation.SuppressLint;
import android.app.ProgressDialog;
import android.content.Context;
import android.os.AsyncTask;
import android.os.Bundle;
import android.text.TextPaint;
import android.util.DisplayMetrics;
import android.view.LayoutInflater;
import android.view.View;
import android.view.View.OnClickListener;
import android.view.WindowManager;
import android.widget.GridView;
import android.widget.ImageView;
import android.widget.LinearLayout;
import android.widget.TextView;

import com.dyh.drivingschool.activity.adapter.xianxingAdapter;
import com.dyh.drivingschool.model.xianxingClass;
import com.dyh.drivingschool.net.service.xianxingService;
import com.dyh.drivingschool.utils.ToastUtil;
import com.dyh.drivingschool.utils.YokaLog;
import com.dyh.drivingschool.R;

@SuppressLint("ResourceAsColor")
public class xianxingActivity extends BaseActivity implements OnClickListener {
	private final static String TAG = "xianxingActivity";
	private xianxingService xianxingService;
	private xianxingClass xianxing;
	private TextView text1, text3, text2;
	private TextView textToday;
	private ArrayList<String[]> messageList = new ArrayList<String[]>();
	private String[] weeks = { "周一", "周二", "周三", "周四", "周五", "公休/节假日" };
	private GridView gridview;

	private LinearLayout back;
	private LayoutInflater inflater;
	private xianxingAdapter adapter;

	@Override
	protected void onCreate(Bundle savedInstanceState) {
		// TODO Auto-generated method stub
		super.onCreate(savedInstanceState);
		setContentView(R.layout.xianxing_layout);
		initView();

	}

	// 加载布局
	private void initView() {
		inflater = LayoutInflater.from(this);
		text1 = (TextView) findViewById(R.id.text1);
		text2 = (TextView) findViewById(R.id.text2);
		text3 = (TextView) findViewById(R.id.text3);
		back = (LinearLayout) findViewById(R.id.back);
		back.setOnClickListener(this);
		textToday = (TextView) findViewById(R.id.textToday);
		gridview = (GridView) findViewById(R.id.xianxingGridview);
		xianxingService = new xianxingService(this);
		new MyAsyncTask().execute();

	}

	@Override
	protected void onResume() {
		// TODO Auto-generated method stub
		super.onResume();

		adapter = new xianxingAdapter(weeks, messageList, inflater, this,
				getDeviceWidthHeight());
		gridview.setAdapter(adapter);

	}

	private ProgressDialog pdialog;
	protected class MyAsyncTask extends AsyncTask<Object, Object, Object> {
		protected MyAsyncTask() {
			pdialog = ProgressDialog.show(
					xianxingActivity.this,
					"",
					xianxingActivity.this.getResources().getString(
							R.string.data_loading_waiting));
		}

		@Override
		protected Object doInBackground(Object... params) {

			return xianxingService.getXianxingmessage();

		};

		@Override
		protected void onPostExecute(Object result) {
			super.onPostExecute(result);
			YokaLog.d("MyAsyncTask", "MyAsyncTask==onPostExecute()" + result);
			if (null != pdialog && pdialog.isShowing()) {
				pdialog.dismiss();
				pdialog = null;
			}
			if (result == null) {
				return;
			}
			xianxing = (xianxingClass) result;
			YokaLog.d(TAG, xianxing.friday.split(",")[0]);
			plitString(xianxing);
			adapter.notifyDataSetChanged();
			
			textToday.setText("今天" + EngToChina(xianxing.today[0]) + "限行");
			YokaLog.d(TAG, xianxing.today[1] + "initView()");
			text1.setText(getString(xianxing.today[1])[0].equals("") ? ""
					: getString(xianxing.today[1])[0]);
			text2.setText(getString(xianxing.today[1])[0].equals("") ? "不限行"
					: "和");
			if (getString(xianxing.today[1])[1].equals("")) {
				text2.setTextSize(50);
				text2.setTextColor(R.color.bg_title);
				TextPaint tp = text2.getPaint();
				tp.setFakeBoldText(true);
				text2.setText("不限行");
			}
			text3.setText(getString(xianxing.today[1])[0].equals("") ? ""
					: getString(xianxing.today[1])[1]);
		}
	}

	public static String[] getString(String targe) {
		if (targe.equals("none")) {
			return new String[] { "", "" };
		}
		return targe.split(",");

	}

	// 字符串切数组
	private void plitString(xianxingClass xianxing) {
		messageList.add(getString(xianxing.monday));
		messageList.add(getString(xianxing.tuesday));
		messageList.add(getString(xianxing.wednesday));
		messageList.add(getString(xianxing.thursday));
		messageList.add(getString(xianxing.friday));
		messageList.add(getString(xianxing.saturday));

	}

	// 英文转中文
	private String EngToChina(String today) {
		Map<String, String> map = new HashMap<String, String>();
		map.put("monday", "周一 ");
		map.put("tuesday", "周二 ");
		map.put("wednesday", "周三 ");
		map.put("thursday", "周四 ");
		map.put("friday", "周五 ");
		map.put("saturday", "公休 不");
		map.put("sunday", "公休 不");
		map.put("holiday", "节假日 不");
		return map.get(today);

	}

	/**
	 * @return 返回屏幕的宽高
	 */
	public int getDeviceWidthHeight() {
		WindowManager wm = (WindowManager) this
				.getSystemService(Context.WINDOW_SERVICE);
		DisplayMetrics outMetrics = new DisplayMetrics();
		wm.getDefaultDisplay().getMetrics(outMetrics);
		return outMetrics.widthPixels;
	}

	@Override
	public void onClick(View arg0) {
		switch (arg0.getId()) {
		case R.id.back:
			finish();
			break;

		default:
			break;
		}

	}
	
	@Override
	protected void onDestroy() {
		// TODO Auto-generated method stub
		super.onDestroy();
		if(pdialog!=null){
			pdialog.dismiss();
			pdialog = null;
		}
	}
}
