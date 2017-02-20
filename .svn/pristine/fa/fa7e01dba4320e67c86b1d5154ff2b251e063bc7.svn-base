package com.dyh.drivingschool.utils;

import java.io.ByteArrayOutputStream;
import java.io.File;

import org.apache.http.Header;

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

public class FileToServer {
	
	
	public static void reg(final Context cont,final String filePath ,File file,
			 String userid) {
		
		try {
			String url="";
			RequestParams params = new RequestParams();
			// file : File userId : 用户唯一标志
			params.put("userId", userid);
			Bitmap photodata=BitmapFactory.decodeFile(filePath);
			ByteArrayOutputStream baos = new ByteArrayOutputStream();			
			photodata.compress(Bitmap.CompressFormat.PNG, 100, baos);
			baos.close();
			byte[] buffer = baos.toByteArray();
			System.out.println("ͼƬ�Ĵ�С��" + buffer.length);
			final String photo = Base64.encodeToString(buffer, 0, buffer.length,
					Base64.DEFAULT);
			if(Constants.isHead){params.put("picfile", file);
			url=NetUrl.TEST_HOST+InterfaceParams.App_Pic_Upload;
			}
			else{
				params.put("file", file);
				url=NetUrl.TEST_HOST+InterfaceParams.App_Stream_Upload;
			}
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
					UserData.ispic=true;
					UserData.picPath=filePath;
					IntentUtil.activityForward(cont, MainActivity.class, null, true);

				}
			});

		} catch (Exception e) {
			e.printStackTrace();
		}

	}
}
