package com.dyh.drivingschool.utils;

import com.dyh.drivingschool.activity.ChoicePicActivity;
import com.dyh.drivingschool.activity.PhotoActivity;
import com.dyh.drivingschool.activity.PostChoicePicActivity;
import com.dyh.drivingschool.R;

import android.app.Activity;
import android.app.Dialog;
import android.content.Intent;
import android.view.View;
import android.view.View.OnClickListener;
import android.widget.Button;

public class PostgetPhoto {
	private Dialog dialog;
	private Activity activity;
	
	
	public PostgetPhoto(Activity activity) {
		super();
		this.activity = activity;
	}

	public void showPostCameraDialog(String id) {
		if(dialog == null){
			dialog = new Dialog(activity);
			View dialog_view = View.inflate(activity,
					R.layout.dialog_photos_camera, null);
			dialog.setContentView(dialog_view);
			dialog.setTitle("头像设置");
			Button bt_photos = (Button) dialog_view.findViewById(R.id.bt_photos);
			Button bt_camera = (Button) dialog_view.findViewById(R.id.bt_camera);
			Button bt_cancel = (Button) dialog_view.findViewById(R.id.bt_cancel);
			final String userid=id;
			bt_camera.setOnClickListener(new OnClickListener() {
				
				@Override
				public void onClick(View v) {
					dialog.dismiss();
					
					choicePhoto(true,userid);
				}
			});
			bt_photos.setOnClickListener(new OnClickListener() {
				
				@Override
				public void onClick(View v) {
					dialog.dismiss();
					
					choicePhoto(false,userid);
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
	
	private void choicePhoto(boolean fromCamra,String id) {
		Intent intent = new Intent(activity, PostChoicePicActivity.class);
		intent.putExtra(PostChoicePicActivity.EXTRA_IS_FROM_CAMRA, fromCamra);
		intent.putExtra(PostChoicePicActivity.EXTRA_IS_NEED_ZOOM, true);
		intent.putExtra(PostChoicePicActivity.USERID, id);
		activity.startActivityForResult(intent, 998);
	}
	
	
}
