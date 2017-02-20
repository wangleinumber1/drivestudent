package com.dyh.drivingschool.utils;



import com.dyh.drivingschool.Config;

import android.util.Log;

public class YokaLog {

	public static void i(String tag, String message) {
		if(Config.IS_DEBUG)
			Log.i(tag, message);
	}

	public static void e(String tag, String message) {
		if(Config.IS_DEBUG)
			Log.e(tag, message);
	}

	public static void e(String tag, String message, Throwable throwble) {
		if(Config.IS_DEBUG)
		    Log.e(tag, message, throwble);
	}

	public static void w(String tag, String message) {
		if(Config.IS_DEBUG)
		    Log.w(tag,  message);
	}
	
	public static void w(String tag, String message, Throwable throwble) {
		if(Config.IS_DEBUG)
		    Log.w(tag,  message , throwble);
	}

	public static void d(String tag, String message) {
		if(Config.IS_DEBUG)
		    Log.d(tag, message);
	}

	public static void v(String tag, String message) {
		if(Config.IS_DEBUG)
		    Log.v(tag, message );
	}
	public static void e(Throwable e) {
		if(Config.IS_DEBUG)
			e.printStackTrace();
	}
	public static void p(Object e) {
		if(Config.IS_DEBUG)
			System.out.println(e.toString());
	}
}
