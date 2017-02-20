package com.dyh.drivingschool.utils;



import com.dyh.drivingschool.R;

import android.app.ProgressDialog;
import android.content.Context;
import android.os.AsyncTask;

/*
 * 自定义AsyncTask，用于加载过程中dialog弹框提示
 */
public abstract class MyAsyncTask extends AsyncTask<Object, Object, Object> {

	private Context context;
	private ProgressDialog pdialog;
	protected MyAsyncTask(Context context){
		this.context = context;
		pdialog = ProgressDialog.show(context, "", context.getResources().getString(R.string.data_loading_waiting));

	}
	@Override
	protected abstract Object doInBackground(Object... params);

	@Override
	protected void onPostExecute(Object result) {
		super.onPostExecute(result);
		YokaLog.d("MyAsyncTask", "MyAsyncTask==onPostExecute()"+result);
		if(null != pdialog && pdialog.isShowing()){
			pdialog.dismiss();
			pdialog = null;
		}
	}

}
