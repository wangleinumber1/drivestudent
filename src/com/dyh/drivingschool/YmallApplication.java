package com.dyh.drivingschool;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.Set;

import cn.jpush.android.api.BasicPushNotificationBuilder;
import cn.jpush.android.api.JPushInterface;

import com.dyh.drivingschool.contents.UserData;
import com.dyh.drivingschool.db.service.UserDataService;
import com.dyh.drivingschool.utils.DeviceInfoUtil;
import com.dyh.drivingschool.utils.NetworkUtil;
import com.dyh.drivingschool.utils.StringUtil;
import com.dyh.drivingschool.utils.YokaLog;



import android.app.Application;
import android.app.Notification;
import android.content.Context;
import android.os.Handler;

public class YmallApplication extends Application {

	public static final String TAG = "YmallApplication";
	public static YmallApplication mContext;
	public ActivityManager activityManager;
	public Thread mUiThread;
	
	// public ArrayList<OrderInfoCoupon> couponList;
	
	public final int MSGID_KILLACTIVITYS = 1;
	public final Handler mHandler = new Handler() {
		public void handleMessage(android.os.Message msg) {
			switch (msg.what) {
			case MSGID_KILLACTIVITYS:
				activityManager.popAllActivity();
				break;

			default:
				break;
			}
		};
	};

	@Override
	public void onCreate() {
		super.onCreate();
		mContext = this;
		initUserData();
		initJPush();
		activityManager = ActivityManager.getActivityManagerInstance();
		mUiThread = Thread.currentThread();
	}

	/**
	 * 初始化JPush
	 */
	private void initJPush() {
		JPushInterface.init(getApplicationContext());
		//调试模式
		JPushInterface.setDebugMode(false);
		JPushInterface.init(this);		
		BasicPushNotificationBuilder builder = new BasicPushNotificationBuilder(
				this);
		builder.notificationFlags = Notification.FLAG_AUTO_CANCEL;
		builder.notificationDefaults = Notification.DEFAULT_LIGHTS
				| Notification.DEFAULT_VIBRATE;
		JPushInterface.setPushNotificationBuilder(1, builder);		
		YokaLog.d(TAG, JPushInterface.getRegistrationID(mContext)+"///////////////////////");
	}


	

	/**
	 * @return the activityManager
	 */
	public ActivityManager getActivityManager() {
		return activityManager;
	}

	/**
	 * @param activityManager
	 *            the activityManager to set
	 */
	public void setActivityManager(ActivityManager activityManager) {
		this.activityManager = activityManager;
	}

	

	@Override
	public void onLowMemory() {
		super.onLowMemory();
	}

	public final void runOnUiThread(Runnable action) {
		if (Thread.currentThread() != mUiThread) {
			mHandler.post(action);
		} else {
			action.run();
		}
	}

	// @Override
	// public void gotResult(int arg0, String arg1, Set<String> arg2) {
	// }
	public void initUserData() {
		UserDataService userService = new UserDataService(mContext);
		UserData.userId = userService.getUserId();		
		YokaLog.d("YmallApplication", "初始化用户信息==userId is "
				);
	}
	public Context getContext() {
		return mContext;
	}
	
	// private void initShouhuorenInfo(){
	// AddressSaveService service = new AddressSaveService(mContext);
	// UserData.shouhuoren_name = service.getShouhuorenName();
	// UserData.shouhuoren_phone = service.getShouhuorenMob();
	// UserData.shouhuoren_area = service.getShouhuorenArea();
	// UserData.detail_address = service.getShouhuorenDetail();
	// UserData.jihuoren_phone = service.getJihuorenMob();
	// }

	// private ArrayList<DetailImgItem> imgurlList;
	// public void setTotalImgList(ArrayList<DetailImgItem> imgurlList) {
	// this.imgurlList = imgurlList;
	// }
	// public ArrayList<DetailImgItem> getTotalImgList() {
	// return imgurlList;
	// }
}
