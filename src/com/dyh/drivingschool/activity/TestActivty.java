package com.dyh.drivingschool.activity;

import java.io.File;
import java.sql.Date;

import com.dyh.drivingschool.model.DemoJavaScriptInterface;
import com.dyh.drivingschool.utils.IntentUtil;
import com.dyh.drivingschool.utils.ToastUtil;
import com.dyh.drivingschool.R;

import android.app.Activity;
import android.content.Intent;
import android.graphics.BitmapFactory;
import android.os.Bundle;
import android.view.View;
import android.view.View.OnClickListener;
import android.widget.Button;
import android.widget.ImageView;

public class TestActivty extends BaseActivity implements OnClickListener {
	
	ImageView image;
	@Override
	protected void onCreate(Bundle savedInstanceState) {
		// TODO Auto-generated method stub
		super.onCreate(savedInstanceState);
		setContentView(R.layout.testlayout);
		Button button1 = (Button) findViewById(R.id.button1);
		Button button2 = (Button) findViewById(R.id.button2);
		Button button3 = (Button) findViewById(R.id.button3);
		Button button4 = (Button) findViewById(R.id.button4);
		Button button5 = (Button) findViewById(R.id.button5);
		Button button6 = (Button) findViewById(R.id.button6);
		Button button7 = (Button) findViewById(R.id.button7);
		Button button8 = (Button) findViewById(R.id.button8);
		Button button9 = (Button) findViewById(R.id.button9);
		Button button10 = (Button) findViewById(R.id.button10);
		Button button11 = (Button) findViewById(R.id.button11);
		image=(ImageView) findViewById(R.id.imageview);
		button4.setOnClickListener(this);
		button6.setOnClickListener(this);
		button7.setOnClickListener(this);
		button1.setOnClickListener(this);
		button2.setOnClickListener(this);
		button3.setOnClickListener(this);
		button5.setOnClickListener(this);
		button8.setOnClickListener(this);
		button9.setOnClickListener(this);
		button10.setOnClickListener(this);
		button11.setOnClickListener(this);
	}

	@Override
	public void onClick(View arg0) {
		switch (arg0.getId()) {
		case R.id.button1:
			//获取图片上传头像
			String id="1";
			new DemoJavaScriptInterface(this).takeHeaderPictureAndPost(id);
			break;
		case R.id.button2:
			IntentUtil.activityForward(this, WeatherActivity.class, null, false);
			break;
		case R.id.button3:
//			new DemoJavaScriptInterface(this).getShare(id);
			break;
		case R.id.button4:
			IntentUtil.activityForward(this, GaodeMapActivity.class, null, false);
			break;
		case R.id.button5:
			IntentUtil.activityForward(this, QuestionTestActivity.class, null, false);
			break;
		case R.id.button6:
			//上传图片
			String id1="1";
			new DemoJavaScriptInterface(this).takePictureAndPost(id1);
//			IntentUtil.activityForward(this, QuestionTestActivity.class, null, false);
//			new DemoJavaScriptInterface(this).SendPicture();
//			image.setImageBitmap(BitmapFactory.decodeFile(getIntent().getExtras().getString(ChoicePicActivity.Tag)));
			break;
		case R.id.button7:
			new DemoJavaScriptInterface(this).getAlipay();
				break;
		case R.id.button8:
			new DemoJavaScriptInterface(this).getCityList();
			break;
		case R.id.button9:
			IntentUtil.activityForward(this, VersionActivity.class, null, false);
			break;
		case R.id.button10:
//			new DemoJavaScriptInterface(this).adduserData("1");
			
			IntentUtil.activityForward(this, xianxingActivity.class, null, false);
			break;
		case R.id.button11:
			IntentUtil.activityForward(this, OilPriceActivity.class, null, false);
			break;
		default:
			break;
		}

	}
	
	
}
