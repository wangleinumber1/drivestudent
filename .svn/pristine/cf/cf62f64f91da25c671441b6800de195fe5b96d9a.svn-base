package com.dyh.drivingschool.ui.service;

import java.util.ArrayList;

import com.dyh.drivingschool.model.ImgJsonService;
import com.dyh.drivingschool.model.StartImg;
import com.dyh.drivingschool.model.StartImgItem;
import com.dyh.drivingschool.utils.ImgDownloadUtil;
import com.dyh.drivingschool.utils.YokaLog;



import android.app.IntentService;
import android.content.Context;
import android.content.Intent;

/*
 * 后台下载服务
 */
public class DownloadService extends IntentService {

	private static final String TAG = "DownloadService";
	private ImgJsonService imgService; 
	private Context mContext;
	
	public DownloadService() {
		super(null);
	}
	public DownloadService(String name) {
		super(TAG);
	}

	@Override
	public void onCreate() {
		super.onCreate();
		mContext = DownloadService.this;
		imgService = new ImgJsonService(mContext);
	}


	@Override
	protected void onHandleIntent(Intent intent) {
		downLoad();
	}

	private void downLoad(){
		ArrayList<StartImg> startImgList = imgService.getStartImg();
		if( null == startImgList) return ;
		ArrayList<StartImg> list =startImgList;
		for(int i=0;i<list.size();i++){
			ImgDownloadUtil.downloadImg(list.get(i).imgSn);
			YokaLog.d(TAG, "DownloadService==downLoad()==i is "+i);
		}
		YokaLog.d(TAG, "DownloadService==downLoad()==is over ");
		stopSelf();
	}
}
