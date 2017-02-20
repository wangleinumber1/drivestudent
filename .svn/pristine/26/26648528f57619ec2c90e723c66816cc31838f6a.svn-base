package com.dyh.drivingschool.model;

import org.json.JSONException;
import org.json.JSONObject;

import com.dyh.drivingschool.contents.Constants;
import com.dyh.drivingschool.utils.StringUtil;
import com.dyh.drivingschool.utils.ToastUtil;
import com.dyh.drivingschool.utils.YokaLog;
import com.dyh.drivingschool.R;
import com.umeng.socialize.bean.SHARE_MEDIA;
import com.umeng.socialize.controller.UMServiceFactory;
import com.umeng.socialize.controller.UMSocialService;
import com.umeng.socialize.media.UMImage;
import com.umeng.socialize.sso.QZoneSsoHandler;
import com.umeng.socialize.sso.SinaSsoHandler;
import com.umeng.socialize.sso.TencentWBSsoHandler;
import com.umeng.socialize.sso.UMQQSsoHandler;
import com.umeng.socialize.weixin.controller.UMWXHandler;

import android.annotation.SuppressLint;
import android.app.Activity;
import android.content.Intent;
import android.net.Uri;
import android.widget.Toast;

public class ShareClass {
	private Activity mainActivity;
	final UMSocialService mController = UMServiceFactory
			.getUMSocialService("com.umeng.share");
	private String json;
	private String shareUrl;
	private String contents;
	private String ImageUrl;

	public ShareClass(Activity mainActivity, String json) {
		super();
		this.mainActivity = mainActivity;
		this.json = json;
	}

	/**
	 * 添加分享平台
	 * */
	private void addSharePlatform() {
		// try {
		// mController.getConfig().setSsoHandler(new SinaSsoHandler());
		// } catch (Exception e) {
		// ToastUtil.showToast(mainActivity, 0,"请安装新浪微博客户端", false);
		// }
		mController.getConfig().setSsoHandler(new SinaSsoHandler());
		// 添加新浪SSO授权

		// // 添加腾讯微博SSO授权
		// mController.getConfig().setSsoHandler(new TencentWBSsoHandler());
		// 添加QQ、QZone平台
		addQQQZonePlatform();
		// 添加微信、微信朋友圈平台
		addWXPlatform();

	};

	/**
	 * @功能描述 : 添加QQ平台支持 QQ分享的内容， 包含四种类型， 即单纯的文字、图片、音乐、视频. 参数说明 : title, summary,
	 *       image url中必须至少设置一个, targetUrl必须设置,网页地址必须以"http://"开头 . title :
	 *       要分享标题 summary : 要分享的文字概述 image url : 图片地址 [以上三个参数至少填写一个] targetUrl
	 *       : 用户点击该分享时跳转到的目标地址 [必填] ( 若不填写则默认设置为友盟主页 )
	 * @return
	 */
	private void addQQQZonePlatform() {
		String appId = "100424468";
		String appKey = "c7394704798a158208a74ab60104f0ba";
		// 添加QQ支持, 并且设置QQ分享内容的target url
		UMQQSsoHandler qqSsoHandler = new UMQQSsoHandler(mainActivity, appId,
				appKey);
		qqSsoHandler.setTargetUrl(shareUrl);
		qqSsoHandler.addToSocialSDK();

		// 添加QZone平台
		QZoneSsoHandler qZoneSsoHandler = new QZoneSsoHandler(mainActivity,
				appId, appKey);
		qZoneSsoHandler.addToSocialSDK();
	}

	/**
	 * @功能描述 : 添加微信平台分享
	 * @return
	 */
	private void addWXPlatform() {

		String appId = "wxdadf9e1d5d0266ff";
		String appSecret = "51aa935690145d2157911a7f53bca53c";
		// AppID：wx731ef12f046fec2f
		//
		// AppSecret：5a769e3b71fceab8c1c416001bcb036d

		// 添加微信平台
		UMWXHandler wxHandler = new UMWXHandler(mainActivity, appId, appSecret);
		wxHandler.addToSocialSDK();

		// 支持微信朋友圈
		UMWXHandler wxCircleHandler = new UMWXHandler(mainActivity, appId,
				appSecret);
		wxCircleHandler.setToCircle(true);
		wxCircleHandler.addToSocialSDK();

	}

	/**
	 * 根据不同的平台设置不同的分享内容</br>
	 */

	private void setShareContents() {
		mController.setShareContent(contents + "\n" + shareUrl);
		mController.setShareMedia(new UMImage(mainActivity, ImageUrl));
	}

	/**
	 * 一键分享
	 * */
	public void driecShare() {
		JsonSet();
		addSharePlatform();
		setShareContents();
		mController.getConfig().setPlatforms(SHARE_MEDIA.WEIXIN,
				SHARE_MEDIA.WEIXIN_CIRCLE, SHARE_MEDIA.QQ);
		mController.openShare(mainActivity, false);
	}

	// json设置给分享
	@SuppressLint("NewApi")
	private void JsonSet() {
//		json= "{'contenturl':'http://www.baidu.com','title':'baidubaidu','imgurl':''}";
		try {
			if(StringUtil.checkStr(json)){
			YokaLog.d("ShareClass", json);
//			Toast.makeText(mainActivity,json, Toast.LENGTH_LONG).show();
				JSONObject jsonObject = new JSONObject(json);
				shareUrl = jsonObject.getString("contenturl");
				contents = jsonObject.getString("title");
				ImageUrl = jsonObject.getString("imgurl");
			}
		} catch (JSONException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}

	}
}
