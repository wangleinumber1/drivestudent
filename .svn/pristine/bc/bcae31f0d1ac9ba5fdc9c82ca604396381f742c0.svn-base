package com.dyh.drivingschool.activity;

import java.io.IOException;
import java.io.InputStream;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Random;

import org.json.JSONException;
import org.json.JSONObject;

import android.app.Activity;
import android.app.Dialog;
import android.app.ProgressDialog;
import android.content.res.AssetManager;
import android.graphics.Bitmap;
import android.graphics.BitmapFactory;
import android.graphics.Color;
import android.os.AsyncTask;
import android.os.Bundle;
import android.text.TextUtils;
import android.util.Log;
import android.view.GestureDetector;
import android.view.GestureDetector.OnGestureListener;
import android.view.KeyEvent;
import android.view.LayoutInflater;
import android.view.MotionEvent;
import android.view.View;
import android.view.View.OnClickListener;
import android.view.Window;
import android.widget.Button;
import android.widget.ImageView;
import android.widget.LinearLayout;
import android.widget.TextView;
import android.widget.Toast;

import com.dyh.drivingschool.contents.InterfaceParams;
import com.dyh.drivingschool.db.service.DataService;
import com.dyh.drivingschool.model.DemoJavaScriptInterface;
import com.dyh.drivingschool.model.GaodeInfo;
import com.dyh.drivingschool.model.QestionBean;
import com.dyh.drivingschool.net.NetRequestService;
import com.dyh.drivingschool.utils.CountDownSeconds;
import com.dyh.drivingschool.utils.YokaLog;
import com.dyh.drivingschool.utils.CountDownSeconds.CountDownListener;
import com.dyh.drivingschool.R;

public class ExamActivity extends Activity implements OnClickListener,
		OnGestureListener {

	private LinearLayout exam_title_back;
	private TextView exam_time;
	private TextView exam_drop, exam_sb;
	private ImageView q_img;
	private TextView q_name, q_an1, q_an2, q_an3, q_an4;
	private GestureDetector detector;
	private CountDownSeconds countDown = new CountDownSeconds();

	private DataService ds;
	private int kemu;
	private int page = 0;
	private List<QestionBean> list;

	private Dialog dialog;
	private int time;

	@Override
	protected void onCreate(Bundle savedInstanceState) {
		// TODO Auto-generated method stub
		super.onCreate(savedInstanceState);
		setContentView(R.layout.exam_lay);
		kemu = getIntent().getExtras().getInt("kemu");

		ds = new DataService(this);
		ds.setExamState(null, null);
		int limit;
		Random r = new Random();
		if (kemu == 1) {
			limit = r.nextInt(1536);
		} else {
			limit = r.nextInt(866);
		}
		list = ds.getQueTest(kemu, limit);

		detector = new GestureDetector(this);
		initView();
	}

	private void initView() {
		exam_title_back = (LinearLayout) findViewById(R.id.exam_title_back);
		q_img = (ImageView) findViewById(R.id.q_img);
		exam_time = (TextView) findViewById(R.id.exam_time);
		exam_drop = (TextView) findViewById(R.id.exam_drop);
		exam_sb = (TextView) findViewById(R.id.exam_sb);
		q_name = (TextView) findViewById(R.id.q_name);
		q_an1 = (TextView) findViewById(R.id.q_an1);
		q_an2 = (TextView) findViewById(R.id.q_an2);
		q_an3 = (TextView) findViewById(R.id.q_an3);
		q_an4 = (TextView) findViewById(R.id.q_an4);

		setque();
		count();

		exam_title_back.setOnClickListener(this);
		exam_drop.setOnClickListener(this);
		exam_sb.setOnClickListener(this);
		q_an1.setOnClickListener(this);
		q_an2.setOnClickListener(this);
		q_an3.setOnClickListener(this);
		q_an4.setOnClickListener(this);
	}

	private void setque() {
		QestionBean que = list.get(page);
		q_name.setText((page + 1) + "." + que.qestion);

		if (!TextUtils.isEmpty(que.sinaimg)) {
			setImg(que.sinaimg);
			q_img.setVisibility(View.VISIBLE);
		} else {
			q_img.setVisibility(View.GONE);
		}

		if ("1".equals(que.type)) {// 判断题

			q_an1.setText("A. 正确");
			q_an2.setText("B. 错误");

			if (TextUtils.isEmpty(que.examAnsChoose)) {
				q_an1.setBackgroundColor(Color.WHITE);
				q_an2.setBackgroundColor(Color.WHITE);
			} else if ("1".equals(que.examAnsChoose)) {
				q_an1.setBackgroundColor(getResources().getColor(
						R.color.bg_title));
				q_an2.setBackgroundColor(Color.WHITE);
			} else if ("2".equals(que.examAnsChoose)) {
				q_an1.setBackgroundColor(Color.WHITE);
				q_an2.setBackgroundColor(getResources().getColor(
						R.color.bg_title));
			}

			q_an3.setVisibility(View.GONE);
			q_an4.setVisibility(View.GONE);
		} else {// 选择题
			if (TextUtils.isEmpty(que.examAnsChoose)) {
				q_an1.setBackgroundColor(Color.WHITE);
				q_an2.setBackgroundColor(Color.WHITE);
				q_an3.setBackgroundColor(Color.WHITE);
				q_an4.setBackgroundColor(Color.WHITE);
			} else if ("1".equals(que.examAnsChoose)) {
				q_an1.setBackgroundColor(getResources().getColor(
						R.color.bg_title));
				q_an2.setBackgroundColor(Color.WHITE);
				q_an3.setBackgroundColor(Color.WHITE);
				q_an4.setBackgroundColor(Color.WHITE);
			} else if ("2".equals(que.examAnsChoose)) {
				q_an1.setBackgroundColor(Color.WHITE);
				q_an2.setBackgroundColor(getResources().getColor(
						R.color.bg_title));
				q_an3.setBackgroundColor(Color.WHITE);
				q_an4.setBackgroundColor(Color.WHITE);
			} else if ("3".equals(que.examAnsChoose)) {
				q_an1.setBackgroundColor(Color.WHITE);
				q_an2.setBackgroundColor(Color.WHITE);
				q_an3.setBackgroundColor(getResources().getColor(
						R.color.bg_title));
				q_an4.setBackgroundColor(Color.WHITE);
			} else if ("3".equals(que.examAnsChoose)) {
				q_an1.setBackgroundColor(Color.WHITE);
				q_an2.setBackgroundColor(Color.WHITE);
				q_an3.setBackgroundColor(Color.WHITE);
				q_an4.setBackgroundColor(getResources().getColor(
						R.color.bg_title));
			}

			q_an1.setText("A." + que.an1);
			q_an2.setText("B." + que.an2);
			q_an3.setText("C." + que.an3);
			q_an4.setText("D." + que.an4);
			q_an3.setVisibility(View.VISIBLE);
			q_an4.setVisibility(View.VISIBLE);
		}

	}

	@Override
	public void onClick(View v) {
		switch (v.getId()) {
		case R.id.exam_title_back:
			showPop(0);
			break;
		case R.id.q_an1:
			if (time <= 0) {
				Toast.makeText(getApplicationContext(), "答题时间到,请勿答题", 0).show();
				return;
			}
			list.get(page).examAnsChoose = "1";
			if ("1".equals(list.get(page).answerTrue)) {// 正确答案
				ds.setExamAnsState("0", list.get(page).intNumber);
			} else {
				ds.setExamAnsState("1", list.get(page).intNumber);
			}

			ds.setExamAnsChoose("1", list.get(page).intNumber);// 保存答题选择

			q_an1.setBackgroundColor(getResources().getColor(R.color.bg_title));
			q_an2.setBackgroundColor(Color.WHITE);
			q_an3.setBackgroundColor(Color.WHITE);
			q_an4.setBackgroundColor(Color.WHITE);
			break;
		case R.id.q_an2:
			if (time <= 0) {
				Toast.makeText(getApplicationContext(), "答题时间到,请勿答题", 0).show();
				return;
			}
			if ("2".equals(list.get(page).answerTrue)) {// 正确答案
				ds.setExamAnsState("0", list.get(page).intNumber);
			} else {
				ds.setExamAnsState("1", list.get(page).intNumber);
			}
			list.get(page).examAnsChoose = "2";
			ds.setExamAnsChoose("2", list.get(page).intNumber);
			q_an2.setBackgroundColor(getResources().getColor(R.color.bg_title));
			q_an1.setBackgroundColor(Color.WHITE);
			q_an3.setBackgroundColor(Color.WHITE);
			q_an4.setBackgroundColor(Color.WHITE);
			break;
		case R.id.q_an3:
			if (time <= 0) {
				Toast.makeText(getApplicationContext(), "答题时间到,请勿答题", 0).show();
				return;
			}
			if ("3".equals(list.get(page).answerTrue)) {// 正确答案
				ds.setExamAnsState("0", list.get(page).intNumber);
			} else {
				ds.setExamAnsState("1", list.get(page).intNumber);
			}
			list.get(page).examAnsChoose = "3";
			ds.setExamAnsChoose("3", list.get(page).intNumber);
			q_an3.setBackgroundColor(getResources().getColor(R.color.bg_title));
			q_an2.setBackgroundColor(Color.WHITE);
			q_an1.setBackgroundColor(Color.WHITE);
			q_an4.setBackgroundColor(Color.WHITE);
			break;
		case R.id.q_an4:
			if (time <= 0) {
				Toast.makeText(getApplicationContext(), "答题时间到,请勿答题", 0).show();
				return;
			}

			if ("4".equals(list.get(page).answerTrue)) {// 正确答案
				ds.setExamAnsState("0", list.get(page).intNumber);
			} else {
				ds.setExamAnsState("1", list.get(page).intNumber);
			}
			list.get(page).examAnsChoose = "4";
			ds.setExamAnsChoose("4", list.get(page).intNumber);
			q_an4.setBackgroundColor(getResources().getColor(R.color.bg_title));
			q_an2.setBackgroundColor(Color.WHITE);
			q_an3.setBackgroundColor(Color.WHITE);
			q_an1.setBackgroundColor(Color.WHITE);
			break;
		case R.id.exam_drop:// 放弃考试
			showPop(0);
			break;
		case R.id.exam_sb:// 提交
			showPop(2);
			break;
		}
	}

	// 倒计时
	private void count() {
		countDown.start(45 * 60, new CountDownListener() {

			@Override
			public void onCount(int current) {
				time = current;
				exam_time.setText((current / 60 < 10 ? "0" + current / 60
						: current / 60)
						+ " : "
						+ (current % 60 < 10 ? "0" + current % 60
								: current % 60));
				if (current <= 0) {
					showPop(1);
				}
			}

		});
	}

	// 提交试题的弹出框
	private void showPop(final int state) {
		View v = LayoutInflater.from(this).inflate(R.layout.dialoglayout_dati,
				null);

		dialog = new Dialog(this);
		dialog.requestWindowFeature(Window.FEATURE_NO_TITLE);
		dialog.setContentView(v);

		TextView title = (TextView) v.findViewById(R.id.dialog_text);
		Button leftBt = (Button) v.findViewById(R.id.dialog_okBtn);
		Button rightBtn = (Button) v.findViewById(R.id.dialog_cancelBtn);

		if (state == 0) {
			title.setText("您的答题还未提交,确定要放弃本次考试吗？");
		} else if (state == 1) {
			title.setText("答题时间到,您本次得分为:" + ds.getExamCount(kemu, 0)
					+ "确定要提交吗？");
		} else if (state == 2) {
			title.setText("您本次得分为: " + ds.getExamCount(kemu, 0) + " , 确定要提交吗？");
		}

		leftBt.setOnClickListener(new OnClickListener() {

			@Override
			public void onClick(View v) {
				if (dialog != null && dialog.isShowing()) {
					dialog.dismiss();
				}
				if (state == 0) {// 放弃考试,清楚答题记录
					ds.setExamState(null, null);
					finish();
				} else if (state == 1) {// 提交答题
					new MyAsyncTask().execute();
				} else if (state == 2) {// 点击提交按钮提交
					new MyAsyncTask().execute();
				}
			}
		});
		// 取消
		rightBtn.setOnClickListener(new OnClickListener() {

			@Override
			public void onClick(View v) {
				if (dialog != null && dialog.isShowing()) {
					dialog.dismiss();
				}
			}
		});

		dialog.show();
	}

	private void setImg(String filename) {
		AssetManager assets = getAssets();
		InputStream is = null;

		try {
			is = assets.open("examimg/" + filename);
		} catch (IOException e) {
			e.printStackTrace();
		}
		BitmapFactory.Options options = new BitmapFactory.Options();
		Bitmap bitmap = BitmapFactory.decodeStream(is, null, options);

		q_img.setImageBitmap(bitmap);
	}

	@Override
	public boolean onKeyDown(int keyCode, KeyEvent event) {
		if (keyCode == KeyEvent.KEYCODE_BACK) {
			showPop(0);

			return true;
		}
		return super.onKeyDown(keyCode, event);
	}

	private ProgressDialog pdialog;

	protected class MyAsyncTask extends AsyncTask<Object, Object, Object> {
		protected MyAsyncTask() {
			pdialog = ProgressDialog.show(ExamActivity.this, "", "数据提交中...");
		}

		@Override
		protected Object doInBackground(Object... params) {

			Map<String, String> map = new HashMap<String, String>();

			String stuId = "";
			String schoolCode = "";
			if (!TextUtils.isEmpty(DemoJavaScriptInterface.info)) {
				try {
					JSONObject js = new JSONObject(DemoJavaScriptInterface.info);
					stuId = js.getString("userid");
					schoolCode = js.getString("jiaxiaoid");
				} catch (JSONException e) {
					// TODO Auto-generated catch block
					e.printStackTrace();
				}

			}
			map.put("stuId", stuId);// 学号
			map.put("subject", kemu + "");// 科目
			map.put("testResult", ds.getExamCount(kemu, 0) + "");// 成绩
			map.put("schoolCode", schoolCode);// 驾校标识
			return new NetRequestService(ExamActivity.this).requestData("POST",
					InterfaceParams.EXAM_STORE, "1", map, false);

		};

		@SuppressWarnings("unchecked")
		@Override
		protected void onPostExecute(Object result) {
			super.onPostExecute(result);
			YokaLog.e("MyAsyncTask", "MyAsyncTask==onPostExecute()" + result);
			if (null != pdialog && pdialog.isShowing()) {
				pdialog.dismiss();
				pdialog = null;
			}
			if (result == null) {
				return;
			}

			try {
				JSONObject js = new JSONObject((String) result);
				String code = js.getString("code");

				if ("1001".equals(code)) {
					Toast.makeText(getApplicationContext(), "模拟成绩提交成功",
							Toast.LENGTH_SHORT).show();
					finish();
				} else {
					Toast.makeText(getApplicationContext(), "模拟成绩提交失败",
							Toast.LENGTH_SHORT).show();
				}

			} catch (JSONException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
				Toast.makeText(getApplicationContext(), "模拟成绩提交失败",
						Toast.LENGTH_SHORT).show();
			}

		}
	}

	/**
	 * zuoyouhuadong
	 */
	@Override
	public boolean onTouchEvent(MotionEvent event) {
		return this.detector.onTouchEvent(event);
	}

	@Override
	public boolean onFling(MotionEvent e1, MotionEvent e2, float velocityX,
			float velocityY) {
		if (e1.getX() - e2.getX() < -80) {
			Log.e("Gestures", "手势向右滑动");

			if (page <= 0) {
				Toast.makeText(getApplicationContext(), "前面没有题了",
						Toast.LENGTH_SHORT).show();
			} else {
				if (time > 0) {
					page--;
					setque();
				} else {
					Toast.makeText(getApplicationContext(), "答题时间到,请勿答题", 0)
							.show();
				}
			}

			return true;
		} else if (e1.getX() - e2.getX() > 80) {
			Log.e("Gestures", "手势向左滑动");
			if (page >= 99) {
				showPop(2);
			} else {
				if (time > 0) {
					page++;
					setque();
				} else {
					Toast.makeText(getApplicationContext(), "答题时间到,请勿答题", 0)
							.show();
				}
			}
			return true;
		}
		return false;
	}

	@Override
	public boolean onDown(MotionEvent e) {
		// TODO Auto-generated method stub
		return false;
	}

	@Override
	public void onShowPress(MotionEvent e) {
		// TODO Auto-generated method stub

	}

	@Override
	public boolean onSingleTapUp(MotionEvent e) {
		// TODO Auto-generated method stub
		return false;
	}

	@Override
	public boolean onScroll(MotionEvent e1, MotionEvent e2, float distanceX,
			float distanceY) {
		// TODO Auto-generated method stub
		return false;
	}

	@Override
	public void onLongPress(MotionEvent e) {
		// TODO Auto-generated method stub

	}

	@Override
	protected void onDestroy() {
		// TODO Auto-generated method stub
		super.onDestroy();
		if (pdialog != null) {
			pdialog.dismiss();
		}
	}
}
