package com.dyh.drivingschool.net;

import java.io.DataOutputStream;
import java.io.IOException;
import java.net.HttpURLConnection;
import java.net.MalformedURLException;
import java.net.SocketTimeoutException;
import java.net.URLEncoder;
import java.util.Map;

import org.json.JSONObject;

import com.dyh.drivingschool.utils.NetworkUtil;
import com.dyh.drivingschool.utils.StringUtil;
import com.dyh.drivingschool.utils.ToastUtil;
import com.dyh.drivingschool.utils.YokaLog;
import com.dyh.drivingschool.R;



import android.app.Activity;
import android.content.Context;
import android.util.Log;

/*
 * 根据Http请求得到数据，String类型
 */
public class NetRequestService {

	private static final String TAG ="NetRequestService";
	private Context mContext;
	
	public NetRequestService(Context context){
		this.mContext = context;
	}
	private HttpURLConnection getConnection(String params,String urlState) throws MalformedURLException, IOException{
		return LCHttpUrlConnection.getHttpConnectionWithHeader(mContext,params,urlState);
		
	}
	/**
	 * method，请求方式
	 * params，get请求url后的参数
	 * urlState, 请求路径的状态，具体参看  HttpRequestHeader 类
	 * paramsMap，post请求，body里的参数
	 * throws MalformedURLException, IOException
	 * needShowCach 是否需要展示缓存 true为需要，false为不需要
	 */
	public String requestData(String method,String params,String urlState,Map<String,String> paramMaps,boolean needShowCach) {
		//生成缓存文件内容的key值
		/*if(StringUtil.checkStr(params))
			params = URLEncodUtil.getEncodeStr(params);*/
		String cachContentKey = generateKey(params,paramMaps);
//		LocalCachService localcach = new LocalCachService(mContext, UserData.userId);
//		if(needShowCach){
//			//先读取缓存文件
//			return localcach.getCachData(cachContentKey);	
//		}
		if(!NetworkUtil.isConnected(mContext)){
			ToastUtil.showToast(mContext, R.string.POOR_NETWORK_STATUS, null, true);
			return null;
		}
		try {
			HttpURLConnection httpConn = getConnection(params,urlState);
			if(null == httpConn) return null;
			httpConn.setRequestMethod(method);
			//请求参数放在body里时的post请求
			if(null!=paramMaps&&!paramMaps.isEmpty()){
				StringBuilder data = new StringBuilder();
				httpConn.setDoOutput(true);
				httpConn.setDoInput(true);
				for(Map.Entry<String,String> map : paramMaps.entrySet()){// Map.Entry<String,String> map:paramsMap.entrySet()
					data.append(map.getKey()).append("=");
					String value = map.getValue();
					if(StringUtil.checkStr(value)){
						value = URLEncoder.encode(value, "utf-8");
					}else{
						value = "0";
					} 
					data.append(value);
					data.append("&");
				}
				data.deleteCharAt(data.length() - 1);
				byte[] paramsdata = data.toString().getBytes();//Content-Type: application/x-www-form-urlencoded
				if("POST".equals(method))httpConn.setRequestProperty("Content-Type","application/x-www-form-urlencoded");
			//httpConn.setRequestProperty("Content-Type","application/json");
				
				DataOutputStream ds = new DataOutputStream(httpConn.getOutputStream());
		
				ds.write(paramsdata);
				ds.flush();
				ds.close();
			}
			int code = httpConn.getResponseCode();
			YokaLog.d("requestData", "请求 的  code is "+code);
			if (code== 200) {
				String result = LCHttpUrlConnection.decodeConnectionToString(httpConn); 
//				JSONObject jsonObject = new JSONObject(result);
//				if(10001 == jsonObject.optInt("status")){
//					ToastUtil.showToast(mContext, R.string.try_login_again, null, true);
//					UserData.userId = null;
//					UserDataService userService = new UserDataService(mContext);
//					userService.clearData();
//					return null;
//				}
				//将字符串写入文件
//				if(StringUtil.checkStr(cachContentKey) && StringUtil.checkStr(result))
//					localcach.cachData(cachContentKey, result);
				return result;
			}else{
				
				ToastUtil.showToast(mContext, R.string.server_exception, null, true);
				return null;
			}
		} catch (MalformedURLException e1) {
			YokaLog.d(TAG, "MalformedURLException=="+e1.getMessage());
			ToastUtil.showToast(mContext, R.string.reques_error_url, null, true);
			return null;
		}catch(SocketTimeoutException ste){
			YokaLog.d(TAG, "SocketTimeoutException=="+ste.getMessage());
			ToastUtil.showToast(mContext, R.string.connect_time_out, null, true);
			return null;
		}catch (IOException e1) {
			YokaLog.d(TAG, "IOException=="+mContext+e1.getMessage());
			ToastUtil.showToast(mContext, R.string.POOR_NETWORK_STATUS, null, true);
			return null;
		}catch (Exception e) {
			YokaLog.d(TAG, "Exception=="+e.getMessage());
			ToastUtil.showToast(mContext, R.string.server_or_net_error, null, true);
			return null;
		}
	}
	private String generateKey(String params,Map<?,?> paramMaps) {
		String key = null;
		if(null == paramMaps){
			key = params;
		}else{
			key = params+paramMaps.toString();
		}
		return key;
	}
}
