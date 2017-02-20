package com.dyh.drivingschool.activity;

import cn.jpush.android.api.InstrumentedActivity;
import cn.jpush.android.api.JPushInterface;
import android.app.Activity;
import android.content.pm.ActivityInfo;
import android.os.Bundle;
import android.view.Window;

public class BaseActivity extends InstrumentedActivity {
	@Override
	protected void onCreate(Bundle savedInstanceState) {
		// TODO Auto-generated method stub
		super.onCreate(savedInstanceState);
		// 设置屏幕为竖屏
	setRequestedOrientation(ActivityInfo.SCREEN_ORIENTATION_PORTRAIT);
	requestWindowFeature(Window.FEATURE_NO_TITLE); 
	}
	@Override
	protected void onResume() {
	    super.onResume();
	    JPushInterface.onResume(this);
	}
	@Override
	protected void onPause() {
	    super.onPause();
	    JPushInterface.onPause(this);
	}
}
