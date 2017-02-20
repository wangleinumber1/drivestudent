package com.ksfc.drive.Push;

import com.dyh.drivingschool.YmallApplication;

import android.content.Context;
import android.telephony.TelephonyManager;

public class App {
	private static YmallApplication app;

	public static void setApp(YmallApplication application) {
		app = application;
	}

	public static YmallApplication getApp() {
		return app;
	}

	private static String imei;

	public static String imei() {
		if (imei == null) {
			TelephonyManager tm = (TelephonyManager) app.getSystemService(Context.TELEPHONY_SERVICE);
			imei = tm.getDeviceId();
		}
		return imei;
	}
}
