package com.dyh.drivingschool.net.service;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.Map;

import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

import com.dyh.drivingschool.contents.InterfaceParams;
import com.dyh.drivingschool.model.GaodeInfo;
import com.dyh.drivingschool.model.UserList;
import com.dyh.drivingschool.net.NetRequestService;
import com.dyh.drivingschool.net.NetUrl;
import com.dyh.drivingschool.utils.StringUtil;

import android.content.Context;
import android.util.Log;

/*
 * 公用接口的请求
 */
public class UserJsonService {

	private static final String TAG = "UserJsonService";
	private Context mContext;
	private NetRequestService mNetRequService;

	public UserJsonService(Context context) {
		this.mContext = context;
		mNetRequService = new NetRequestService(mContext);
	}

	public boolean mNeedCach = false;// 是否需要缓存

	public void setNeedCach(boolean needCach) {
		mNeedCach = needCach;
	}

	/*
	 * http://m.ymall.com/api/help/share
	 */
	public ArrayList<GaodeInfo> getGaodeInfo() {
		// {"id":77,"name":"WY","namedesc":"崴岳驾校","province":"河北省",
		// "city":"廊坊市","address":"河北省廊坊市永清县","description":"1",
		// "telphone":"(0316)2775555","locationX":116.502144,"locationY":39.334274,
		// "president":"1","signUp":"DC00180001"}
		String str = mNetRequService.requestData("POST",
				InterfaceParams.App_School_List,"1", null, mNeedCach);
		if (!StringUtil.checkStr(str))
			return null;

		Log.d(TAG, str);
		try {
			JSONObject jsonObject = new JSONObject(str);
			if (1000 == jsonObject.optInt("code")) {
				JSONObject jsonObject1 = jsonObject.optJSONObject("result");
				ArrayList<GaodeInfo> list = new ArrayList<GaodeInfo>();

				JSONArray jsonArray = jsonObject1.optJSONArray("rows");

				for (int i = 0; i < jsonArray.length(); i++) {
					GaodeInfo gaodeInfo = new GaodeInfo();
					JSONObject json = jsonArray.getJSONObject(i);
					gaodeInfo.id = json.getString("id");
					gaodeInfo.name = json.getString("name");
					gaodeInfo.namedesc = json.getString("namedesc");
					gaodeInfo.province = json.getString("province");
					gaodeInfo.city = json.getString("city");
					gaodeInfo.address = json.getString("address");
					gaodeInfo.description = json.getString("description");
					gaodeInfo.telphone = json.getString("telphone");
					gaodeInfo.locationX = json.getString("locationY");
					gaodeInfo.locationY = json.getString("locationX");
					gaodeInfo.president = json.getString("president");
					gaodeInfo.signUp = json.getString("signUp");
					list.add(gaodeInfo);
				}
				return list;
			}
		} catch (JSONException e) {
			e.printStackTrace();
		}
		return null;
	}

}
