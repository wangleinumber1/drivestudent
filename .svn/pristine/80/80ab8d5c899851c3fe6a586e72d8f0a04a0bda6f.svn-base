package com.dyh.drivingschool.activity;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.Map;

import cn.jpush.android.api.JPushInterface;

import com.dyh.drivingschool.contents.Constants;
import com.dyh.drivingschool.db.service.UserDataService;
import com.dyh.drivingschool.model.ImgJsonService;
import com.dyh.drivingschool.net.service.JpushIdPostService;
import com.dyh.drivingschool.uiservice.JpushService;
import com.dyh.drivingschool.utils.IntentUtil;
import com.dyh.drivingschool.utils.NetworkUtil;
import com.dyh.drivingschool.R;
import android.app.Activity;
import android.os.AsyncTask;
import android.os.Bundle;
import android.os.Handler;
import android.os.Message;

public class LogoActivity extends BaseActivity {
	private static final int DELAYED_TIME = 2 * 1000;
	private Activity mActivity;
	private Myhandler mHandler;
	private UserDataService userDataService;
	private ImgJsonService imagejsonservice;
	public static final String TAG = "LogoActivity";
	private JpushIdPostService jpushIdPostService;
	public static  boolean isCross=true;

	@Override
	protected void onCreate(Bundle savedInstanceState) {
		// TODO Auto-generated method stub
		super.onCreate(savedInstanceState);
		setContentView(R.layout.logolayout);
		mActivity = this;
		mHandler = new Myhandler();
		imagejsonservice = new ImgJsonService(mActivity);
		userDataService = new UserDataService(this);
		jpushIdPostService = new JpushIdPostService(this);
		initData();
	}
	
	private void initData() {
		if (!NetworkUtil.isConnected(mActivity)) {
			mHandler.sendEmptyMessageDelayed(1, DELAYED_TIME);
			return;
		}
		// IntentUtil.activityForward(this, ShowStartImgActivity.class, null,
		// true);
		// 开机图片数据下载 无数据先注掉
		// mActivity.startService(new Intent(mActivity, DownloadService.class));
		// getJpushId();
		new AsyncLoad().execute();
	}

	private class AsyncLoad extends AsyncTask<Void, Void, ArrayList<Object>> {
		@Override
		protected ArrayList<Object> doInBackground(Void... params) {
			try {
				Thread.sleep(2000);
			} catch (InterruptedException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}
			return null;

		}

		@Override
		protected void onPostExecute(ArrayList<Object> result) {
			super.onPostExecute(result);

			activityForward();
			// IntentUtil.activityForward(LogoActivity.this,
			// ShowStartImgActivity.class, null, true);
		}

	}

	/*
	 * 跳转到图片展示页或首页
	 */
	private void activityForward() {
		// open | closed
		imagejsonservice.setNeedCach(true);
		// 以后需要改回来
		// if (userDataService.getUserId() == null) {
//		 Map map = new HashMap<String, String>();
//		 map.put(Constants.NEW_USER_ID, "userid");
//		 userDataService.saveData(map);
		// IntentUtil.activityForward(mActivity, ShowStartImgActivity.class,
		// null, true);
		// } else {
		// IntentUtil.activityForward(mActivity, MainActivity.class, null,
		// true);
		// // }
		IntentUtil.activityForward(mActivity, ShowStartImgActivity.class, null,
				true);

	}

	class Myhandler extends Handler {
		@Override
		public void handleMessage(Message msg) {
			switch (msg.what) {
			case 1:
				activityForward();
				break;
			default:
				break;
			}

		}
	}
}
