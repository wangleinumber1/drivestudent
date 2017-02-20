package com.dyh.drivingschool.activity;

import com.dyh.drivingschool.utils.IntentUtil;
import com.dyh.drivingschool.R;

import android.app.Activity;
import android.os.Bundle;
import android.view.View;
import android.view.View.OnClickListener;
import android.widget.ImageView;
import android.widget.LinearLayout;
import android.widget.TextView;

public class Km1Zj_Lx_Activity extends BaseActivity implements OnClickListener {

	private TextView zj_t1, zj_t2, zj_t3, zj_t4, zj_t5, zj_t6, zj_t7;
	private LinearLayout zj_title_back;

	private int kemu;

	@Override
	protected void onCreate(Bundle savedInstanceState) {
		// TODO Auto-generated method stub
		super.onCreate(savedInstanceState);
		setContentView(R.layout.zhangjie_liebiao);

		kemu = getIntent().getExtras().getInt("kemu");

		initView();
	}

	private void initView() {
		zj_t1 = (TextView) findViewById(R.id.zj_t1);
		zj_t2 = (TextView) findViewById(R.id.zj_t2);
		zj_t3 = (TextView) findViewById(R.id.zj_t3);
		zj_t4 = (TextView) findViewById(R.id.zj_t4);
		zj_t5 = (TextView) findViewById(R.id.zj_t5);
		zj_t6 = (TextView) findViewById(R.id.zj_t6);
		zj_t7 = (TextView) findViewById(R.id.zj_t7);
		zj_title_back = (LinearLayout) findViewById(R.id.zj_title_back);
		
		if(kemu==1){
			zj_t1.setText("道路交通安全法律,法规和规章(465)");
			zj_t2.setText("道路交通信号(312)");
			zj_t3.setText("安全行车,文明驾驶基础知识(187)");
			zj_t4.setText("机动车驾驶操作相关基础知识(109)");
			zj_t5.setVisibility(View.GONE);
			zj_t6.setVisibility(View.GONE);
			zj_t7.setVisibility(View.GONE);
		}else {
			zj_t1.setText("交通事故救助及常见危化品处置常识(35)");
			zj_t2.setText("紧急情况下避险常识(86)");
			zj_t3.setText("恶劣气候和复杂道路驾驶(165)");
			zj_t4.setText("职业道德,文明驾驶(62)");
			zj_t5.setText("常见交通标志,标线和交通手势(215)");
			zj_t6.setText("安全行车常识(192)");
			zj_t7.setText("违法行为综合判断和案例分析(10)");
		}
		
		zj_title_back.setOnClickListener(this);
		zj_t1.setOnClickListener(this);
		zj_t2.setOnClickListener(this);
		zj_t3.setOnClickListener(this);
		zj_t4.setOnClickListener(this);
		zj_t5.setOnClickListener(this);
		zj_t6.setOnClickListener(this);
		zj_t7.setOnClickListener(this);
	}

	@Override
	public void onClick(View v) {
		switch (v.getId()) {
		case R.id.zj_title_back:
			finish();
			break;
		case R.id.zj_t1:
			if(kemu==1){
				Bundle bundle = new Bundle();
				bundle.putInt("kemu", 1);
				bundle.putInt("chapterid", 1);
				bundle.putInt("sumPage", 465);
				IntentUtil.activityForward(this, Km1Sx_Lx_Activity.class,
						bundle, false);
			}else{
				Bundle bundle = new Bundle();
				bundle.putInt("kemu", 4);
				bundle.putInt("chapterid", 34);
				bundle.putInt("sumPage", 35);
				IntentUtil.activityForward(this, Km1Sx_Lx_Activity.class,
						bundle, false);
			}
			break;
		case R.id.zj_t2:
			if(kemu==1){
				Bundle bundle = new Bundle();
				bundle.putInt("kemu", 1);
				bundle.putInt("chapterid", 2);
				bundle.putInt("sumPage", 312);
				IntentUtil.activityForward(this, Km1Sx_Lx_Activity.class,
						bundle, false);
			}else{
				Bundle bundle = new Bundle();
				bundle.putInt("kemu", 4);
				bundle.putInt("chapterid", 33);
				bundle.putInt("sumPage", 83);
				IntentUtil.activityForward(this, Km1Sx_Lx_Activity.class,
						bundle, false);
			}
			break;
		case R.id.zj_t3:
			if(kemu==1){
				Bundle bundle = new Bundle();
				bundle.putInt("kemu", 1);
				bundle.putInt("chapterid", 3);
				bundle.putInt("sumPage", 187);
				IntentUtil.activityForward(this, Km1Sx_Lx_Activity.class,
						bundle, false);
			}else{
				Bundle bundle = new Bundle();
				bundle.putInt("kemu", 4);
				bundle.putInt("chapterid", 32);
				bundle.putInt("sumPage", 165);
				IntentUtil.activityForward(this, Km1Sx_Lx_Activity.class,
						bundle, false);
			}
			break;
		case R.id.zj_t4:
			if(kemu==1){
				Bundle bundle = new Bundle();
				bundle.putInt("kemu", 1);
				bundle.putInt("chapterid", 4);
				bundle.putInt("sumPage", 109);
				IntentUtil.activityForward(this, Km1Sx_Lx_Activity.class,
						bundle, false);
			}else{
				Bundle bundle = new Bundle();
				bundle.putInt("kemu", 4);
				bundle.putInt("chapterid", 31);
				bundle.putInt("sumPage", 55);
				IntentUtil.activityForward(this, Km1Sx_Lx_Activity.class,
						bundle, false);
			}
			break;
		case R.id.zj_t5:
			Bundle bundle = new Bundle();
			bundle.putInt("kemu", 4);
			bundle.putInt("chapterid", 30);
			bundle.putInt("sumPage", 215);
			IntentUtil.activityForward(this, Km1Sx_Lx_Activity.class,
					bundle, false);
			break;
		case R.id.zj_t6:
			Bundle bundle6 = new Bundle();
			bundle6.putInt("kemu", 4);
			bundle6.putInt("chapterid", 29);
			bundle6.putInt("sumPage", 159);
			IntentUtil.activityForward(this, Km1Sx_Lx_Activity.class,
					bundle6, false);
			break;
		case R.id.zj_t7:
			Bundle bundle7 = new Bundle();
			bundle7.putInt("kemu", 4);
			bundle7.putInt("chapterid", 28);
			bundle7.putInt("sumPage", 10);
			IntentUtil.activityForward(this, Km1Sx_Lx_Activity.class,
					bundle7, false);
			break;
		}
	}
}
