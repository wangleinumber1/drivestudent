package com.dyh.drivingschool.activity;

import android.os.Bundle;
import android.os.Environment;
import android.view.View;
import android.view.View.OnClickListener;
import android.webkit.CookieManager;
import android.webkit.CookieSyncManager;
import android.widget.Button;
import android.widget.TextView;
import android.widget.Toast;

import com.dyh.drivingschool.utils.DataCleanManager;
import com.dyh.drivingschool.R;

public class DateClearActivity extends BaseActivity implements OnClickListener {

	private TextView dialog_text;
	private Button dialog_okBtn, dialog_cancelBtn;

	@Override
	protected void onCreate(Bundle savedInstanceState) {
		// TODO Auto-generated method stub
		super.onCreate(savedInstanceState);
		setContentView(R.layout.dialoglayout_dati);
		initView();
	}

	private void initView() {
		dialog_text = (TextView) findViewById(R.id.dialog_text);
		dialog_okBtn = (Button) findViewById(R.id.dialog_okBtn);
		dialog_cancelBtn = (Button) findViewById(R.id.dialog_cancelBtn);

		dialog_text.setText("确定要清楚缓存吗?");

		dialog_okBtn.setOnClickListener(this);
		dialog_cancelBtn.setOnClickListener(this);
	}

	@Override
	public void onClick(View v) {
		switch (v.getId()) {
		case R.id.dialog_okBtn:// ok
			DataCleanManager.cleanApplicationData(getApplicationContext(),
					Environment.getExternalStorageDirectory() + "/com.dyh.drivingschool/imagecache");
			
			CookieSyncManager.createInstance(this); 
			CookieSyncManager.getInstance().startSync(); 
			CookieManager.getInstance().removeSessionCookie(); 
			
			Toast.makeText(getApplicationContext(),"缓存已清除..", Toast.LENGTH_SHORT).show();
			
			finish();
			break;
		case R.id.dialog_cancelBtn:// cancel
			finish();
			break;
		}
	}

	private String getCachePath() {
		String sdDir = null;
		boolean sdCardExist = Environment.getExternalStorageState().equals(
				android.os.Environment.MEDIA_MOUNTED); // 判断sd卡是否存在
		if (sdCardExist) {
			sdDir = Environment.getExternalStorageDirectory().getPath();// 获取跟目录
		} else {
			sdDir = "data/data/files/";
		}
		return sdDir;
	}

}
