package com.dyh.drivingschool.net.service;

import java.util.Map;

import android.content.Context;

import com.dyh.drivingschool.contents.InterfaceParams;
import com.dyh.drivingschool.net.NetRequestService;

public class JpushIdPostService {
	private static final String TAG = "JpushIdPostService";
	private Context mContext;
	private NetRequestService mNetRequService;

	public JpushIdPostService(Context context) {
		this.mContext = context;
		mNetRequService = new NetRequestService(mContext);
	}

	public boolean mNeedCach = false;// 是否需要缓存

	public void setNeedCach(boolean needCach) {
		mNeedCach = needCach;
	}

	public void postId(Map<String, String> map) {
		mNetRequService.requestData("POST",
				InterfaceParams.App_Message_Jpush_SaveRegistrationId, "0", map,
				false);
	}
}
