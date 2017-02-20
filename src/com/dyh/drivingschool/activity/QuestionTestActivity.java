package com.dyh.drivingschool.activity;

import android.annotation.SuppressLint;
import android.app.Activity;
import android.graphics.Color;
import android.os.Bundle;
import android.view.View;
import android.view.View.OnClickListener;
import android.widget.ImageView;
import android.widget.LinearLayout;
import android.widget.TextView;
import android.widget.Toast;

import cn.jpush.android.api.JPushInterface;

import com.dyh.drivingschool.db.service.DataService;
import com.dyh.drivingschool.uiservice.JpushService;
import com.dyh.drivingschool.utils.IntentUtil;
import com.dyh.drivingschool.R;

/**
 * 项目名称：DriveStudent 类名称：QuestionTestActivity 类描述： 模拟考试 创建人：Jimes 创建时间：2015-4-28
 * 下午1:24:04 修改备注：
 */
public class QuestionTestActivity extends Activity implements OnClickListener {

	private TextView qes_kemu1, qes_kemu2, qes_kemu3, qes_kemu4;// 科目
	private TextView qes_1, qes_2, qes_3, qes_4;
	private LinearLayout qes_title_back;

	private int i = 1;// i=1:科目一；i=2:科目二；i=3:科目三；i=4:科目四
	private DataService ds;
	public static final String TAG = "QuestionTestActivity";
//	private String id;

	@Override
	protected void onCreate(Bundle savedInstanceState) {
		// TODO Auto-generated method stub
		super.onCreate(savedInstanceState);
		setContentView(R.layout.question_layout);		
		new Thread() {

			public void run() {
				ds = new DataService(QuestionTestActivity.this);
			};
		}.start();

		initView();
	}
	@Override
	protected void onResume() {
		// TODO Auto-generated method stub
		super.onResume();
		Bundle bundle1 = new Bundle();
		bundle1.putString(TAG, JPushInterface.getRegistrationID(this));
		com.dyh.drivingschool.utils.YokaLog.d(TAG, JPushInterface.getRegistrationID(this)+"//////////////////");
		IntentUtil.serviceForward(this, JpushService.class, bundle1, false);
	}
	private void initView() {
		qes_title_back = (LinearLayout) findViewById(R.id.qes_title_back);
		qes_kemu1 = (TextView) findViewById(R.id.qes_kemu1);
		qes_kemu2 = (TextView) findViewById(R.id.qes_kemu2);
		qes_kemu3 = (TextView) findViewById(R.id.qes_kemu3);
		qes_kemu4 = (TextView) findViewById(R.id.qes_kemu4);
		qes_1 = (TextView) findViewById(R.id.qes_1);
		qes_2 = (TextView) findViewById(R.id.qes_2);
		qes_3 = (TextView) findViewById(R.id.qes_3);
		qes_4 = (TextView) findViewById(R.id.qes_4);
		qes_kemu1.setOnClickListener(this);
		qes_kemu2.setOnClickListener(this);
		qes_kemu3.setOnClickListener(this);
		qes_kemu4.setOnClickListener(this);
		qes_1.setOnClickListener(this);
		qes_2.setOnClickListener(this);
		qes_3.setOnClickListener(this);
		qes_4.setOnClickListener(this);
		qes_title_back.setOnClickListener(this);
	}

	@SuppressLint("NewApi")
	@Override
	public void onClick(View v) {
		switch (v.getId()) {
		case R.id.qes_kemu1:

			i = 1;
			qes_1.setText("模拟测试");
			qes_1.setCompoundDrawablesWithIntrinsicBounds(getResources()
					.getDrawable(R.drawable.moniceshi), null, null, null);
			qes_2.setText("顺序练习");
			qes_2.setCompoundDrawablesWithIntrinsicBounds(getResources()
					.getDrawable(R.drawable.shunxulianxi), null, null, null);
			qes_3.setText("章节测试");
			qes_3.setCompoundDrawablesWithIntrinsicBounds(getResources()
					.getDrawable(R.drawable.zhangjieceshi), null, null, null);
			qes_4.setText("错题统计");
			qes_4.setCompoundDrawablesWithIntrinsicBounds(getResources()
					.getDrawable(R.drawable.cuotitongji), null, null, null);
			qes_kemu1.setBackground(getResources().getDrawable(
					R.drawable.choose_checked));
			qes_kemu1.setTextColor(Color.WHITE);
			qes_kemu2.setBackground(getResources().getDrawable(
					R.drawable.choose_unchecked));
			qes_kemu2.setTextColor(getResources().getColor(R.color.bg_title));
			qes_kemu3.setBackground(getResources().getDrawable(
					R.drawable.choose_unchecked));
			qes_kemu3.setTextColor(getResources().getColor(R.color.bg_title));
			qes_kemu4.setBackground(getResources().getDrawable(
					R.drawable.choose_unchecked));
			qes_kemu4.setTextColor(getResources().getColor(R.color.bg_title));
			break;
		case R.id.qes_kemu2:

			i = 2;
			qes_1.setText("考前说明");
			qes_1.setCompoundDrawablesWithIntrinsicBounds(getResources()
					.getDrawable(R.drawable.kaoshishuoming), null, null, null);
			qes_2.setText("考前准备");
			qes_2.setCompoundDrawablesWithIntrinsicBounds(getResources()
					.getDrawable(R.drawable.kaoqianzhunbei), null, null, null);
			qes_3.setText("教学视频");
			qes_3.setCompoundDrawablesWithIntrinsicBounds(getResources()
					.getDrawable(R.drawable.jiaoxueshipin), null, null, null);
			qes_4.setText("教学指导");
			qes_4.setCompoundDrawablesWithIntrinsicBounds(getResources()
					.getDrawable(R.drawable.jiaoxuezhidao), null, null, null);

			qes_kemu2.setBackground(getResources().getDrawable(
					R.drawable.choose_checked));
			qes_kemu2.setTextColor(Color.WHITE);
			qes_kemu1.setBackground(getResources().getDrawable(
					R.drawable.choose_unchecked));
			qes_kemu1.setTextColor(getResources().getColor(R.color.bg_title));
			qes_kemu3.setBackground(getResources().getDrawable(
					R.drawable.choose_unchecked));
			qes_kemu3.setTextColor(getResources().getColor(R.color.bg_title));
			qes_kemu4.setBackground(getResources().getDrawable(
					R.drawable.choose_unchecked));
			qes_kemu4.setTextColor(getResources().getColor(R.color.bg_title));
			break;
		case R.id.qes_kemu3:

			i = 3;
			qes_1.setText("考前说明");
			qes_1.setCompoundDrawablesWithIntrinsicBounds(getResources()
					.getDrawable(R.drawable.kaoshishuoming), null, null, null);
			qes_2.setText("考前准备");
			qes_2.setCompoundDrawablesWithIntrinsicBounds(getResources()
					.getDrawable(R.drawable.kaoqianzhunbei), null, null, null);
			qes_3.setText("教学视频");
			qes_3.setCompoundDrawablesWithIntrinsicBounds(getResources()
					.getDrawable(R.drawable.jiaoxueshipin), null, null, null);
			qes_4.setText("教学指导");
			qes_4.setCompoundDrawablesWithIntrinsicBounds(getResources()
					.getDrawable(R.drawable.jiaoxuezhidao), null, null, null);

			qes_kemu3.setBackground(getResources().getDrawable(
					R.drawable.choose_checked));
			qes_kemu3.setTextColor(Color.WHITE);
			qes_kemu2.setBackground(getResources().getDrawable(
					R.drawable.choose_unchecked));
			qes_kemu2.setTextColor(getResources().getColor(R.color.bg_title));
			qes_kemu1.setBackground(getResources().getDrawable(
					R.drawable.choose_unchecked));
			qes_kemu1.setTextColor(getResources().getColor(R.color.bg_title));
			qes_kemu4.setBackground(getResources().getDrawable(
					R.drawable.choose_unchecked));
			qes_kemu4.setTextColor(getResources().getColor(R.color.bg_title));
			break;
		case R.id.qes_kemu4:

			i = 4;
			qes_1.setText("模拟测试");
			qes_1.setCompoundDrawablesWithIntrinsicBounds(getResources()
					.getDrawable(R.drawable.moniceshi), null, null, null);
			qes_2.setText("顺序练习");
			qes_2.setCompoundDrawablesWithIntrinsicBounds(getResources()
					.getDrawable(R.drawable.shunxulianxi), null, null, null);
			qes_3.setText("章节测试");
			qes_3.setCompoundDrawablesWithIntrinsicBounds(getResources()
					.getDrawable(R.drawable.zhangjieceshi), null, null, null);
			qes_4.setText("错题统计");
			qes_4.setCompoundDrawablesWithIntrinsicBounds(getResources()
					.getDrawable(R.drawable.cuotitongji), null, null, null);

			qes_kemu4.setBackground(getResources().getDrawable(
					R.drawable.choose_checked));
			qes_kemu4.setTextColor(Color.WHITE);
			qes_kemu2.setBackground(getResources().getDrawable(
					R.drawable.choose_unchecked));
			qes_kemu2.setTextColor(getResources().getColor(R.color.bg_title));
			qes_kemu3.setBackground(getResources().getDrawable(
					R.drawable.choose_unchecked));
			qes_kemu3.setTextColor(getResources().getColor(R.color.bg_title));
			qes_kemu1.setBackground(getResources().getDrawable(
					R.drawable.choose_unchecked));
			qes_kemu1.setTextColor(getResources().getColor(R.color.bg_title));
			break;
		case R.id.qes_1:
			if (i == 1) {// 科目一 模拟测试
				Bundle bundle = new Bundle();
				bundle.putInt("kemu", 1);
				IntentUtil.activityForward(this, ExamActivity.class, bundle,
						false);
			} else if (i == 2) {// 科目二 考前说明
				Toast.makeText(getApplicationContext(), "该功能暂未开通", 0).show();
			} else if (i == 3) {// 科目3 考前说明
				Toast.makeText(getApplicationContext(), "该功能暂未开通", 0).show();
			} else if (i == 4) {// 科目4 模拟测试
				Bundle bundle = new Bundle();
				bundle.putInt("kemu", 4);
				IntentUtil.activityForward(this, ExamActivity.class, bundle,
						false);
			}
			break;
		case R.id.qes_2:
			if (i == 1) {// 科目一 顺序
				Bundle bundle = new Bundle();
				bundle.putInt("kemu", 1);
				IntentUtil.activityForward(this, Km1Sx_Lx_Activity.class,
						bundle, false);
			} else if (i == 2) {// 科目二 考前准备
				Toast.makeText(getApplicationContext(), "该功能暂未开通", 0).show();
			} else if (i == 3) {// 科目3 考前准备
				Toast.makeText(getApplicationContext(), "该功能暂未开通", 0).show();
			} else if (i == 4) {// 科目4 顺序
				Bundle bundle = new Bundle();
				bundle.putInt("kemu", 4);
				IntentUtil.activityForward(this, Km1Sx_Lx_Activity.class,
						bundle, false);
			}
			break;
		case R.id.qes_3:
			if (i == 1) {// 科目1 章节测试
				Bundle bundle = new Bundle();
				bundle.putInt("kemu", 1);
				IntentUtil.activityForward(this, Km1Zj_Lx_Activity.class,
						bundle, false);
			} else if (i == 2) {// 科目2 教学视频
				Toast.makeText(getApplicationContext(), "该功能暂未开通", 0).show();
			} else if (i == 3) {// 科目3 教学视频
				Toast.makeText(getApplicationContext(), "该功能暂未开通", 0).show();
			} else if (i == 4) {// 科目四 章节测试
				Bundle bundle = new Bundle();
				bundle.putInt("kemu", 4);
				IntentUtil.activityForward(this, Km1Zj_Lx_Activity.class,
						bundle, false);
			}
			break;
		case R.id.qes_4:
			if (ds == null) {
				ds = new DataService(this);
			}
			if (i == 1) {// 科目1 错题统计
				if (ds.getExamCount(1, 1) > 0) {
					Bundle bundle = new Bundle();
					bundle.putInt("kemu", 1);
					IntentUtil.activityForward(this, Km1Ct_Activity.class,
							bundle, false);
				} else {
					Toast.makeText(getApplicationContext(), "暂时没有错题噢", 0)
							.show();
				}
			} else if (i == 2) {// 科目2 教学指导
				Toast.makeText(getApplicationContext(), "该功能暂未开通", 0).show();
			} else if (i == 3) {// 科目3 教学指导
				Toast.makeText(getApplicationContext(), "该功能暂未开通", 0).show();
			} else if (i == 4) {// 科目四 错题统计
				if (ds.getExamCount(4, 1) > 0) {
					Bundle bundle = new Bundle();
					bundle.putInt("kemu", 4);
					IntentUtil.activityForward(this, Km1Ct_Activity.class,
							bundle, false);
				} else {
					Toast.makeText(getApplicationContext(), "暂时没有错题噢", 0)
							.show();
				}
			}
			break;
		case R.id.qes_title_back:// 返回
			finish();
			break;
		}
	}

}