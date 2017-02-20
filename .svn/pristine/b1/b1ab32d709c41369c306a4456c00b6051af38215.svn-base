package com.dyh.drivingschool.utils;

import java.io.ByteArrayOutputStream;
import java.io.File;

import org.apache.http.Header;
import org.json.JSONException;
import org.json.JSONObject;

import android.content.Context;
import android.content.Intent;
import android.graphics.Bitmap;
import android.graphics.BitmapFactory;
import android.os.Bundle;
import android.util.Base64;
import android.widget.Toast;

import com.dyh.drivingschool.activity.MainActivity;
import com.dyh.drivingschool.contents.Constants;
import com.dyh.drivingschool.contents.InterfaceParams;
import com.dyh.drivingschool.contents.ReciverContents;
import com.dyh.drivingschool.contents.UserData;
import com.dyh.drivingschool.net.NetUrl;
import com.facebook.model.PropertyName;
import com.loopj.android.http.AsyncHttpClient;
import com.loopj.android.http.AsyncHttpResponseHandler;
import com.loopj.android.http.RequestParams;

public class PostFileToServer {

	public static void reg(final Context cont, final String filePath,
			File file, String userid) {

		try {
			String url = "";
			RequestParams params = new RequestParams();
			// file : File userId : 用户唯一标志
			params.put("userId", userid);
			params.put("file", file);
			url = NetUrl.TEST_HOST + InterfaceParams.App_Stream_Upload;
			AsyncHttpClient client = new AsyncHttpClient();
			client.post(url, params, new AsyncHttpResponseHandler() {

				@Override
				public void onFailure(int arg0, Header[] arg1, byte[] arg2,
						Throwable arg3) {
					// TODO Auto-generated method stub
					Toast.makeText(cont, "上传失败!", 0).show();
				}

				@Override
				public void onSuccess(int arg0, Header[] arg1, byte[] arg2) {
					// TODO Auto-generated method stub
					Toast.makeText(cont, "上传成功!", 0).show();
					// {"message":"success","picId":"c9d15864146a40599b507fcf8cbaa50c","code":"1000"}
					JSONObject jsonObject;
					try {
						jsonObject = new JSONObject(new String(arg2));
						UserData.PostpicId = jsonObject.getString("content");
					} catch (JSONException e) {
						// TODO Auto-generated catch block
						e.printStackTrace();
					}
					UserData.Postispic = true;
					UserData.PostpicPath = filePath;
					IntentUtil.activityForward(cont, MainActivity.class, null,
							true);

				}
			});

		} catch (Exception e) {
			e.printStackTrace();
		}

	}
}
