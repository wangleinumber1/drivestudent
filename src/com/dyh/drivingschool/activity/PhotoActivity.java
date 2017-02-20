package com.dyh.drivingschool.activity;




import com.dyh.drivingschool.R;

import android.os.Bundle;
import android.app.Activity;
import android.app.Dialog;
import android.content.Intent;
import android.graphics.BitmapFactory;
import android.text.TextUtils;
import android.view.Menu;
import android.view.View;
import android.view.View.OnClickListener;
import android.widget.Button;
import android.widget.ImageView;
import android.widget.Toast;

public class PhotoActivity extends BaseActivity {

	private ImageView img;
	private Dialog dialog;
	
	@Override
	protected void onCreate(Bundle savedInstanceState) {
		super.onCreate(savedInstanceState);
		setContentView(R.layout.photolayout);
		
		img=(ImageView) findViewById(R.id.img);
	}

	public void choosePic(View v){
		showCameraDialog();
	}
	
	public void showCameraDialog() {
		if(dialog == null){
			dialog = new Dialog(PhotoActivity.this);
			View dialog_view = View.inflate(PhotoActivity.this,
					R.layout.dialog_photos_camera, null);
			dialog.setContentView(dialog_view);
			dialog.setTitle("头像设置");
			Button bt_photos = (Button) dialog_view.findViewById(R.id.bt_photos);
			Button bt_camera = (Button) dialog_view.findViewById(R.id.bt_camera);
			Button bt_cancel = (Button) dialog_view.findViewById(R.id.bt_cancel);
			bt_camera.setOnClickListener(new OnClickListener() {
				
				@Override
				public void onClick(View v) {
					dialog.dismiss();
					//����
					choicePhoto(true);
				}
			});
			bt_photos.setOnClickListener(new OnClickListener() {
				
				@Override
				public void onClick(View v) {
					dialog.dismiss();
					//ѡ��
					choicePhoto(false);
				}
			});
			bt_cancel.setOnClickListener(new OnClickListener() {
				
				@Override
				public void onClick(View v) {
					dialog.dismiss();
				}
			});
		}
		dialog.show();
	}

	private void choicePhoto(boolean fromCamra) {
		Intent intent = new Intent(this, ChoicePicActivity.class);
		intent.putExtra(ChoicePicActivity.EXTRA_IS_FROM_CAMRA, fromCamra);
		intent.putExtra(ChoicePicActivity.EXTRA_IS_NEED_ZOOM, true);
		startActivityForResult(intent, 998);
	}

	@Override
	public void onActivityResult(int requestCode, int resultCode, Intent data) {
		super.onActivityResult(requestCode, resultCode, data);
		if (resultCode == 200 && requestCode == 998) {
			String path = data.getStringExtra(ChoicePicActivity.EXTRA_PIC_PATH);
			if (!TextUtils.isEmpty(path)) {
				img.setImageBitmap(BitmapFactory.decodeFile(path));
				
			}
		}
		
	}
	
}
