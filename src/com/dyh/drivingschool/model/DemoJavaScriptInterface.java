package com.dyh.drivingschool.model;

import java.io.File;
import java.util.HashMap;

import net.sourceforge.simcpux.WxPayActivity;

import cn.jpush.android.api.JPushInterface;

import com.dyh.drivingschool.activity.AlipayActivity;
import com.dyh.drivingschool.activity.CityListActivity;
import com.dyh.drivingschool.activity.DateClearActivity;
import com.dyh.drivingschool.activity.GaodeMapActivity;
import com.dyh.drivingschool.activity.OilPriceActivity;
import com.dyh.drivingschool.activity.PhotoActivity;
import com.dyh.drivingschool.activity.QuestionTestActivity;
import com.dyh.drivingschool.activity.VersionActivity;
import com.dyh.drivingschool.activity.WeatherActivity;
import com.dyh.drivingschool.activity.WeatherActivity.Weather;
import com.dyh.drivingschool.contents.Constants;
import com.dyh.drivingschool.contents.InterfaceParams;
import com.dyh.drivingschool.contents.UserData;
import com.dyh.drivingschool.db.service.UserDataService;
import com.dyh.drivingschool.net.NetUrl;
import com.dyh.drivingschool.net.service.JpushIdPostService;
import com.dyh.drivingschool.utils.DownLoadApp;
import com.dyh.drivingschool.utils.FileToServer;
import com.dyh.drivingschool.utils.IntentUtil;
import com.dyh.drivingschool.utils.ToastUtil;
import com.dyh.drivingschool.utils.getPhoto;
import com.tencent.weibo.sdk.android.api.UserAPI;

import android.app.Activity;
import android.app.Application;
import android.content.Context;
import android.content.Intent;
import android.net.Uri;
import android.os.AsyncTask;
import android.os.Bundle;
import android.util.Log;
import android.webkit.JavascriptInterface;

public class DemoJavaScriptInterface {

	public static String info;

	public DemoJavaScriptInterface(Activity activity) {
		super();
		this.activity = activity;
	}

	private Activity activity;

	/**
	 * 调用分享接口
	 * */
	@JavascriptInterface
	public void getShare(String json) {
		// //调用分享
		// androidjsdemo.androidjsdemo()

		new ShareClass(activity, json).driecShare();
	}

	/**
	 * 调用支付宝支付
	 * */
	@JavascriptInterface
	public void getAlipay() {
		// //调用支付宝
		// androidjsdemo.getAlipay()
		// IntentUtil.activityForward(activity, AlipayActivity.class, null,
		// false);
	}

	/**
	 * 调用微信支付
	 * */
	@JavascriptInterface
	public void getWXpay() {
		// 调用微信支付
		// androidjsdemo.getWXpay();
		// IntentUtil.activityForward(activity, WxPayActivity.class, null,
		// false);
	}

	/**
	 * 打电话
	 * */
	@JavascriptInterface
	public void callphone(String number) {
		// 用intent启动拨打电话nu
		// 调用打电话
		// androidjsdemo.callphone(电话号码)
		Intent intent = new Intent(Intent.ACTION_CALL, Uri.parse("tel:"
				+ number));
		activity.startActivity(intent);

	}

	/**
	 * 照相截图头像
	 * */
	@JavascriptInterface
	public void takeHeaderPictureAndPost(String id) {
		// 上传头像
		// androidjsdemo.takeHeaderPictureAndPost(电话号码)
		Constants.isHead = true;
		new getPhoto(activity).showCameraDialog(id);

	}

	/**
	 * 照相截图图片
	 * */
	@JavascriptInterface
	public void takePictureAndPost(String id) {
		Constants.isHead = false;
		// 上传图片
		// androidjsdemo.takePictureAndPost(用户id)
		new getPhoto(activity).showCameraDialog(id);

	}

	/**
	 * 调地图
	 * */
	@JavascriptInterface
	public void Map() {
		IntentUtil.activityForward(activity, GaodeMapActivity.class, null,
				false);
	}

	/**
	 * @param Activity
	 *            上下文
	 * @param String
	 *            app描述
	 * @param String
	 *            app下载地址
	 * @return null
	 * */
//	@JavascriptInterface
//	public void downLoadApp(String message, String appUrl) {
//		DownLoadApp.showDialog(activity, message, appUrl);
//	}
	
	/**
	 * 版本详情
	 */
	@JavascriptInterface
	public void downLoadApp() {
		IntentUtil.activityForward(activity, VersionActivity.class, null,
				false);
	}

	/**
	 * 停止推送
	 * */
	@JavascriptInterface
	public void stopPush(Application application) {
		JPushInterface.stopPush(application);
	}

	/**
	 * 重启推送
	 * */
	@JavascriptInterface
	public void restartPush(Application application) {
		JPushInterface.resumePush(application);
	}

	/**
	 * 获取当前城市
	 * */
	@JavascriptInterface
	public void getCityList() {
		IntentUtil.startActivityForResult(activity, CityListActivity.class, 1,
				null);

	}

	/**
	 * 首次启动保存用户信息
	 * */
	@JavascriptInterface
	public void adduserData(String userid) {
//		ToastUtil.showToast(activity, 1,userid+"//////////", true);
		UserData.userId=userid;
	}

	@JavascriptInterface
	public void questionLib(String str) {
		info = str;
		Log.e("**************************", info);
		// {'userid':9a4c2118d3a84dbab503042453c7786c,'jiaxiaoid':2020}
		IntentUtil.activityForward(activity, QuestionTestActivity.class, null,
				false);
	}

	/**
	 * 今日油价
	 * */
	@JavascriptInterface
	public void getTadayOilPrice() {

		IntentUtil.activityForward(activity, OilPriceActivity.class, null,
				false);
	}

	/**
	 * 天气情况
	 * */
	@JavascriptInterface
	public void getWeather() {

		IntentUtil.activityForward(activity, WeatherActivity.class, null, false);
	}
	
	/**
	 * 清除缓存
	 * */
	@JavascriptInterface
	public void clearData() {
		
		IntentUtil.activityForward(activity, DateClearActivity.class, null, false);
	}

	@JavascriptInterface
	public void exitEnter() {
		UserDataService userDataService = new UserDataService(activity);
		userDataService.clearData();
	}

	/*
	 * 进入限行
	 */
	@JavascriptInterface
	public void xianxingActivity() {
		IntentUtil.activityForward(activity,
				com.dyh.drivingschool.activity.xianxingActivity.class, null,
				false);
	}
}
