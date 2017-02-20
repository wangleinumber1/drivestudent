package com.dyh.drivingschool.utils;




import com.dyh.drivingschool.R;

import android.app.AlertDialog;
import android.app.ProgressDialog;
import android.content.Context;
import android.content.DialogInterface;
import android.content.DialogInterface.OnClickListener;
import android.os.AsyncTask;

public class DownLoadApp {

	public static void showDialog(final Context mContext,String Message,final String appUrl){
		
		AlertDialog.Builder builder=new AlertDialog.Builder(mContext);
		builder.setTitle(R.string.title);
		//builder.setIcon(R.drawable.);
//		builder.setMessage(Message);
		builder.setPositiveButton("确定",new OnClickListener() {
			
			@Override
			public void onClick(DialogInterface dialog, int which) {				
				if(appUrl==null){
					ToastUtil.showToast(mContext,0, "服务器端没有最新版本",false);
					return;
				}
				new AsyDownLoadApp(mContext).execute(appUrl);
			}
		});
		builder.setNegativeButton("取消", new OnClickListener() {
			
			@Override
			public void onClick(DialogInterface dialog, int which) {
				dialog.dismiss();			
			}
		});
		builder.create();
		builder.show();
	}
	
}
