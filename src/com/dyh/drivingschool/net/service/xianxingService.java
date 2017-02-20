package com.dyh.drivingschool.net.service;

import org.json.JSONException;
import org.json.JSONObject;

import android.content.Context;
import android.util.Log;

import com.dyh.drivingschool.contents.InterfaceParams;
import com.dyh.drivingschool.model.xianxingClass;
import com.dyh.drivingschool.net.NetRequestService;
import com.dyh.drivingschool.utils.StringUtil;

public class xianxingService {
	private static final String TAG = "xianxingService";
	private Context mContext;
	private NetRequestService mNetRequService;

	public xianxingService(Context context) {
		this.mContext = context;
		mNetRequService = new NetRequestService(mContext);
	}

	public boolean mNeedCach = false;// 是否需要缓存

	public void setNeedCach(boolean needCach) {
		mNeedCach = needCach;
	}

	// 获取限行信息
	public xianxingClass getXianxingmessage() {
		String str = mNetRequService.requestData("POST",
				InterfaceParams.App_Common_Restriction, "0", null, false);
		if (!StringUtil.checkStr(str))
			return null;
		Log.d(TAG, str);
		try {
			// "monday":"2,8","tuesday":"3,7","wednesday":"4,9","thursday":"5,0","friday":"1,6"
			// ,"saturday":"none","sunday":"none","holiday":"none"
			JSONObject jsonObject = new JSONObject(str);
			if (1000 == jsonObject.optInt("code")) {
				JSONObject jsonObject1 = jsonObject.optJSONObject("content");
				xianxingClass xianxing = new xianxingClass();
				xianxing.monday = jsonObject1.optString("monday");
				xianxing.tuesday = jsonObject1.optString("tuesday");
				xianxing.wednesday = jsonObject1.optString("wednesday");
				xianxing.thursday = jsonObject1.optString("thursday");
				xianxing.friday = jsonObject1.optString("friday");
				xianxing.saturday = jsonObject1.optString("saturday");
				xianxing.sunday = jsonObject1.optString("sunday");
				jsonObject1 = jsonObject1.getJSONObject("today");
				xianxing.today[0]=jsonObject1.optString("weekday");
				xianxing.today[1] =jsonObject1.optString("restrict");
				return xianxing;
			}
		} catch (JSONException e) {
			e.printStackTrace();
		}
		return null;

	}
}
