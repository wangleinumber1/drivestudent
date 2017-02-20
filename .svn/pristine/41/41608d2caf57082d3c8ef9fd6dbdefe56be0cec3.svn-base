package com.dyh.drivingschool.net;

import java.io.IOException;
import java.io.UnsupportedEncodingException;
import java.net.HttpURLConnection;
import java.net.MalformedURLException;
import java.net.URLEncoder;

import org.apache.http.client.methods.HttpUriRequest;
import org.apache.http.protocol.HTTP;

import com.dyh.drivingschool.Config;
import com.dyh.drivingschool.utils.YokaLog;



import android.content.Context;
import android.content.SharedPreferences;


/*
 * 构建http请求头,返回一个HttpURLConnection对象
 */
public class HttpRequestHeader {

	private static final String TAG = "HttpRequestHeader";
	
	public static HttpURLConnection constructHeader(Context context,String params,String urlState) throws MalformedURLException, IOException{

		//当前未得到有效的网络
		String requestUrl=null;
		if("0".equals(urlState)){
			if(Config.IS_TEST){
				 requestUrl = NetUrl.TEST_HOST;
			}else{
				 requestUrl = NetUrl.ONLINE_HOST;
			}
		}else if("1".equals(urlState)){
			requestUrl=OAURL.OAHOST;
		}else if("3".equals(urlState)){
			requestUrl="http://api.map.baidu.com/";//天气
		}
		HttpURLConnection httpConnection = LCHttpUrlConnection.getHttpConnection(requestUrl,params);
		YokaLog.d(TAG, "requestUrl is "+requestUrl+",httpConnection is "+httpConnection);
		if(null == httpConnection) return null;
		
//		httpConnection.setRequestProperty(Header.DEVICEMODE, DeviceParamsDB.deviceModel);
//		httpConnection.setRequestProperty(Header.DEVICESIZE, DeviceParamsDB.deviceSize);
//		httpConnection.setRequestProperty(Header.APPVERSION, DeviceParamsDB.appVersion);
//		httpConnection.setRequestProperty(Header.SYSTEM_VERSION, DeviceParamsDB.systemVersion);
//		httpConnection.setRequestProperty(Header.UID, UserData.userId);
//		httpConnection.setRequestProperty(Header.CHANNELID, DeviceParamsDB.channelID);
//		httpConnection.setRequestProperty(Header.CHANNELNAME, DeviceParamsDB.channelName);
//		httpConnection.setRequestProperty(Header.ACCESS_MODE, DeviceParamsDB.currentNetType);
//		httpConnection.setRequestProperty(Header.ACCESS_TOKEN, UserData.userToken);
//		httpConnection.setRequestProperty(Header.PLATFORM, DeviceParamsDB.platform);
//		httpConnection.setRequestProperty(Header.CLIENTID, DeviceParamsDB.deviceId);
//		//httpConnection.setRequestProperty(Header.ACCEPT_ENCODING, "gzip");
		
		httpConnection.setRequestProperty("charsert", "utf-8");
		httpConnection.setRequestProperty("Connection", "Close");
		httpConnection.setConnectTimeout(Config.CONNECT_TIME_OUT);
		httpConnection.setReadTimeout(Config.CONNECT_TIME_OUT);
		return httpConnection;
	}
	
}
