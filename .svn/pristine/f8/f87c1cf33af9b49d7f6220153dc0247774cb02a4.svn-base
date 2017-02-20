package com.dyh.drivingschool.uiservice;

import java.util.HashMap;
import java.util.Map;

import cn.jpush.android.api.JPushInterface;

import com.dyh.drivingschool.activity.LogoActivity;
import com.dyh.drivingschool.contents.ReciverContents;
import com.dyh.drivingschool.contents.UserData;
import com.dyh.drivingschool.net.service.JpushIdPostService;

import android.app.IntentService;
import android.content.Intent;
import android.os.Bundle;

public class JpushService extends IntentService {
	private JpushIdPostService jpushIdPostService;

	public JpushService() {
		super("JpushService");
	}

	@Override
	public int onStartCommand(Intent intent, int flags, int startId) {
		// TODO Auto-generated method stub
		jpushIdPostService = new JpushIdPostService(this);
		return super.onStartCommand(intent, flags, startId);
	}

	@Override
	protected void onHandleIntent(Intent arg0) {
		Map<String, String> map = new HashMap<String, String>();
		Bundle bundle = arg0.getExtras();
		map.put("userId", UserData.userId);
		map.put("registrationId",
				bundle.getString(LogoActivity.TAG));
		map.put("phoneType", "android");
		jpushIdPostService.postId(map);

	}

}
