package com.dyh.drivingschool.model;

import java.util.ArrayList;

import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

import com.dyh.drivingschool.contents.InterfaceParams;
import com.dyh.drivingschool.net.NetRequestService;
import com.dyh.drivingschool.utils.StringUtil;

import android.content.Context;

/*
 * 开机大图秀图片的请求
 */
public class ImgJsonService {

	private static final String TAG = "GoodsDetailJsonService";
	private Context mContext;
	private NetRequestService mNetRequService;

	public ImgJsonService(Context context) {
		this.mContext = context;
		mNetRequService = new NetRequestService(mContext);
	}

	public int code = -1;

	public boolean mNeedCach = false;// 是否需要缓存

	public void setNeedCach(boolean needCach) {
		mNeedCach = needCach;
	}

	public ArrayList<StartImg> getStartImg() {
		String str = mNetRequService.requestData("POST",
				InterfaceParams.App_Lead_List,"0", null, mNeedCach);
		if (!StringUtil.checkStr(str))
			return null;
		try {
			// {"datas":{"leadList":
			// "message":"success","code":"1000"}
			JSONObject jsonObject = new JSONObject(str);
			jsonObject = jsonObject.getJSONObject("datas");
			if (jsonObject.getInt("code") == 1000) {
				JSONArray jsonArray = jsonObject.getJSONArray("leadList");
				return getStartImgList(jsonArray);
			}

			
		} catch (JSONException e) {
			e.printStackTrace();
		}
		return null;
	}

	private ArrayList<StartImg> getStartImgList(JSONArray jsonArray) {
		if (null == jsonArray)
			return null;
		ArrayList<StartImg> list = new ArrayList<StartImg>();
		for (int i = 0; i < jsonArray.length(); i++) {
			JSONObject jsonObj = jsonArray.optJSONObject(i);
			StartImg item = new StartImg();
			item.id = jsonObj.optString("id");
			item.imgGroup = jsonObj.optString("imgGroup");
			item.groupDesc = jsonObj.optString("groupDesc");
			item.sort = jsonObj.optString("sort");
			item.imgSn = jsonObj.optString("imgSn");
			item.isEffect = jsonObj.optString("isEffect");
			item.startTime = jsonObj.optString("startTime");
			item.endTime = jsonObj.optString("endTime");
			item.createTime = jsonObj.optString("imgSn");
			item.inForce = jsonObj.optString("inForce");

			list.add(item);
		}
		return list;
	}
}
