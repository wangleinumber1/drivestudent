package com.dyh.drivingschool.activity;

import java.io.BufferedOutputStream;
import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;

import com.dyh.drivingschool.contents.Constants;
import com.dyh.drivingschool.contents.InterfaceParams;
import com.dyh.drivingschool.model.DemoJavaScriptInterface;
import com.dyh.drivingschool.net.NetUrl;
import com.dyh.drivingschool.utils.FileToServer;
import com.dyh.drivingschool.utils.IntentUtil;
import com.dyh.drivingschool.utils.IoUtils;
import com.dyh.drivingschool.utils.PostFileToServer;
import com.dyh.drivingschool.R;
import com.ksfc.drive.Push.TaskUtil;
import com.ksfc.drive.Push.TaskUtil.BackFore;

import android.annotation.SuppressLint;
import android.app.Activity;
import android.content.Intent;
import android.database.Cursor;
import android.graphics.Bitmap;
import android.graphics.BitmapFactory;
import android.graphics.Matrix;
import android.media.ExifInterface;
import android.net.Uri;
import android.os.Bundle;
import android.os.Environment;
import android.provider.MediaStore;
import android.provider.MediaStore.MediaColumns;
import android.util.Log;
import android.widget.Toast;

public class PostChoicePicActivity extends BaseActivity {

	public static final String EXTRA_IS_FROM_CAMRA = "from_camra";
	public static final String EXTRA_IS_NEED_ZOOM = "need_zoom";
	public static final String EXTRA_PIC_PATH = "pic_path";
	public static final String USERID = "userid";
	public static final int FROM_CAMRA = 1001;
	public static final int FROM_CHOICE = 1002;
	public static final int FROM_ZOOM = 1003;

	private boolean needZoom;
	private boolean fromCamra;
	private String id;
	public static final String Tag = "ChoicePicActivity";
	private String filePath = IoUtils.getImageCacheDir().getAbsolutePath()
			+ File.separator + System.currentTimeMillis() + ".jpg";

	@SuppressLint("NewApi")
	@Override
	protected void onCreate(Bundle savedInstanceState) {
		super.onCreate(savedInstanceState);
		setContentView(R.layout.activity_compress_pic);
		Intent intent = getIntent();
		if (!Environment.getExternalStorageState().equals(
				android.os.Environment.MEDIA_MOUNTED)) {
			Toast.makeText(this, "!", Toast.LENGTH_SHORT).show();
			finish();
			return;
			// C2D5F76E686B6C5E3ED687E1B84E34AF
		}
		fromCamra = intent.getBooleanExtra(EXTRA_IS_FROM_CAMRA, false);
		needZoom = intent.getBooleanExtra(EXTRA_IS_NEED_ZOOM, false);
		id = intent.getExtras().getString(USERID, "0");
		start();
	}

	private void start() {
		if (fromCamra) {
			Intent intent = new Intent(MediaStore.ACTION_IMAGE_CAPTURE);
			intent.putExtra(MediaStore.EXTRA_OUTPUT,
					Uri.fromFile(new File(filePath)));
			startActivityForResult(intent, FROM_CAMRA);
		} else {
			Intent intent2 = new Intent(Intent.ACTION_PICK, null);
			intent2.setDataAndType(
					MediaStore.Images.Media.EXTERNAL_CONTENT_URI, "image/*");
			startActivityForResult(intent2, FROM_CHOICE);
		}
	}

	/**
	 * �ü�ͼƬ����ʵ��
	 * 
	 * @param uri
	 */
	public void startPhotoZoom(Uri uri) {
		Intent intent = new Intent("com.android.camera.action.CROP");
		intent.setDataAndType(uri, "image/*");
		intent.putExtra("crop", "true");
		// aspectX aspectY �ǿ�ߵı���
		intent.putExtra("aspectX", 1);
		intent.putExtra("aspectY", 1);
		// outputX outputY �ǲü�ͼƬ���
			intent.putExtra("outputX", 100);
			intent.putExtra("outputY", 100);		
		intent.putExtra("return-data", true);
		startActivityForResult(intent, FROM_ZOOM);
	}

	@Override
	protected void onActivityResult(int requestCode, int resultCode, Intent data) {
		switch (requestCode) {
		case FROM_CHOICE:
			if (data != null && data.getData() != null) {
				if (needZoom) {
					startPhotoZoom(data.getData());
				} else {
					done(getPath(data.getData()));
				}
			} else {
				done(null);
			}
			break;
		case FROM_CAMRA:
			File temp = new File(filePath);
			if (temp.exists()) {
				if (needZoom) {
					startPhotoZoom(Uri.fromFile(temp));
				} else {
					done(filePath);
				}
			} else {
				done(null);
			}
			break;
		case FROM_ZOOM:
			if (data != null) {
				Bundle extras = data.getExtras();
				if (extras != null) {
					final Bitmap photo = extras.getParcelable("data");
					// Toast.makeText(getApplicationContext(), "���ڱ���",
					// Toast.LENGTH_SHORT).show();
					new Thread() {
						@Override
						public void run() {
							IoUtils.saveBitmap(photo, filePath);
							done(filePath);
						};
					}.start();
				}
			} else {
				done(null);
			}
			break;

		default:

			break;
		}
	}

	/**
	 * ���URI��ȡͼƬ��λ��
	 * 
	 * @param uri
	 * @return
	 */
	public String getPath(Uri uri) {
		String[] projection = { MediaColumns.DATA };
		Cursor cursor = managedQuery(uri, projection, null, null, null);
		int column_index = cursor.getColumnIndexOrThrow(MediaColumns.DATA);
		cursor.moveToFirst();
		return cursor.getString(column_index);
	}

	/**
	 * �������
	 * 
	 * @param path
	 */
	private void done(final String path) {

		TaskUtil.backFore(new BackFore() {

			@Override
			public void onFore() {
				int code = 201;
				Intent data = new Intent();
				if (path != null && new File(filePath).exists()) {
					code = 200;
					data.putExtra(EXTRA_PIC_PATH, filePath);
					// getRotatedBitmap(180,filePath);
					PostFileToServer.reg(PostChoicePicActivity.this, path, new File(
							filePath), id);
				}
				// 向首界面发送图片
				// Bundle bundle=new Bundle();
				// bundle.putString(Tag, path);
				// IntentUtil.activityForward(ChoicePicActivity.this,
				// TestActivty.class, bundle,true );
				// FileToServer.reg(ChoicePicActivity.this, new File(filePath),
				// NetUrl.TEST_HOST+InterfaceParams.App_Pic_Upload,id);
				// finish();
			}

			@Override
			public void onBack() {
				try {
					Log.d("ChoicePicActivity", "ѹ��ͼƬ.��ʼ..");
					if (path == null || !new File(path).exists()) {
						Log.e("ChoicePicActivity", "path is null.");
						PostFileToServer.reg(PostChoicePicActivity.this, path,
								new File(filePath), id);
						return;
					}
					filePath = path;
					// 上传图片
					// FileToServer.reg(ChoicePicActivity.this, new
					// File(filePath),
					// NetUrl.TEST_HOST+InterfaceParams.App_Pic_Upload,id);
				} catch (Exception e) {
					e.printStackTrace();
				}
			}
		});
	}

	// //做圆图
	// private void getRotatedBitmap(int rotate, String filepath) {
	// Matrix matrix = new Matrix();
	// Bitmap bitmap=BitmapFactory.decodeFile(filepath);
	// if (rotate == 180) {
	// matrix.setRotate(rotate);
	// } else {
	// matrix.setRotate(rotate, (float) bitmap.getWidth() / 2, (float)
	// bitmap.getHeight() / 2);
	// }
	// bitmap = Bitmap.createBitmap(bitmap, 0, 0, bitmap.getWidth(),
	// bitmap.getHeight(), matrix, true);
	// File file=saveBitmapFile(bitmap);
	// FileToServer.reg(ChoicePicActivity.this,file,id);
	//
	// }

	public static int readPictureDegree(String path) {
		int degree = 0;
		try {
			ExifInterface exifInterface = new ExifInterface(path);
			int orientation = exifInterface.getAttributeInt(
					ExifInterface.TAG_ORIENTATION,
					ExifInterface.ORIENTATION_NORMAL);
			switch (orientation) {
			case ExifInterface.ORIENTATION_ROTATE_90:
				degree = 90;
				break;
			case ExifInterface.ORIENTATION_ROTATE_180:
				degree = 180;
				break;
			case ExifInterface.ORIENTATION_ROTATE_270:
				degree = 270;
				break;
			}
		} catch (IOException e) {
			e.printStackTrace();
		}
		return degree;
	}

	/**
	 * 将图片保存为文件
	 * */
	public File saveBitmapFile(Bitmap bitmap) {
		File file = new File("/mnt/sdcard/pic/01.jpg");// 将要保存图片的路径
		try {
			BufferedOutputStream bos = new BufferedOutputStream(
					new FileOutputStream(file));
			bitmap.compress(Bitmap.CompressFormat.JPEG, 100, bos);
			bos.flush();
			bos.close();
		} catch (IOException e) {
			e.printStackTrace();
		}
		return file;
	}
}
