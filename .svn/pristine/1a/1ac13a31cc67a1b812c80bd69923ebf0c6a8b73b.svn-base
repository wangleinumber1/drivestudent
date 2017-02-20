package com.dyh.drivingschool.activity;

import java.io.IOException;
import java.io.InputStream;
import java.util.List;

import android.app.Activity;
import android.content.Context;
import android.content.res.AssetManager;
import android.graphics.Bitmap;
import android.graphics.BitmapFactory;
import android.graphics.Color;
import android.graphics.drawable.BitmapDrawable;
import android.os.Bundle;
import android.text.TextUtils;
import android.view.Gravity;
import android.view.LayoutInflater;
import android.view.View;
import android.view.View.OnClickListener;
import android.view.ViewGroup;
import android.view.WindowManager.LayoutParams;
import android.widget.AdapterView;
import android.widget.AdapterView.OnItemClickListener;
import android.widget.BaseAdapter;
import android.widget.GridView;
import android.widget.ImageView;
import android.widget.LinearLayout;
import android.widget.PopupWindow;
import android.widget.RelativeLayout;
import android.widget.TextView;
import android.widget.Toast;
import android.widget.VideoView;

import com.dyh.drivingschool.db.service.DataService;
import com.dyh.drivingschool.model.QestionBean;
import com.dyh.drivingschool.R;
/**
 * 
*    
* 项目名称：DriveStudent   
* 类名称：Km1Mn_TestActivity   
* 类描述：  顺序练习
* 创建人：Jimes
* 创建时间：2015-4-29 上午10:45:46   
* 修改备注：
 */
public class Km1Ct_Activity extends Activity implements OnClickListener {

	private RelativeLayout root;
	private LinearLayout km1_sx_title_back;
	private TextView km1_sx_choose_que,km1_sx_ans_que;
	private TextView km1_sx_titleName;
	
	private LinearLayout ans_lay;
	private TextView km1_sx_trueAns,km1_sx_explain;
	 
	private TextView q_name,q_an1,q_an2,q_an3,q_an4;
	private ImageView q_img;
	private VideoView q_vid;
	
	private int ansState=1;//参考答案是否显示
	
	private int page=1;
	private int kemu=1;
	private DataService ds;
	private QestionBean qestion;
	private PopupWindow pop;
	private List<QestionBean> list;
	private int count;
	
	@Override
	protected void onCreate(Bundle savedInstanceState) {
		// TODO Auto-generated method stub
		super.onCreate(savedInstanceState);
		
		setContentView(R.layout.km1_sx_lx_lay);
		kemu=getIntent().getExtras().getInt("kemu");
		
		ds=new DataService(this);
		list = ds.getExamWro(kemu);
		count = ds.getExamCount(kemu, 1);

		initView();
	}

	private void initView() {
		root=(RelativeLayout) findViewById(R.id.root);
		km1_sx_title_back=(LinearLayout) findViewById(R.id.km1_sx_title_back);
		q_img=(ImageView) findViewById(R.id.q_img);
		km1_sx_titleName=(TextView) findViewById(R.id.km1_sx_titleName);
		km1_sx_choose_que=(TextView) findViewById(R.id.km1_sx_choose_que);
		km1_sx_ans_que=(TextView) findViewById(R.id.km1_sx_ans_que);
		q_vid=(VideoView) findViewById(R.id.q_vid);
		
		km1_sx_titleName.setText("错题统计");
		
		q_name=(TextView) findViewById(R.id.q_name);
		q_an1=(TextView) findViewById(R.id.q_an1);
		q_an2=(TextView) findViewById(R.id.q_an2);
		q_an3=(TextView) findViewById(R.id.q_an3);
		q_an4=(TextView) findViewById(R.id.q_an4);
		
		ans_lay=(LinearLayout) findViewById(R.id.ans_lay);//参考答案布局
		km1_sx_trueAns=(TextView) findViewById(R.id.km1_sx_trueAns);
		km1_sx_explain=(TextView) findViewById(R.id.km1_sx_explain);
		
		getQ();
		
		km1_sx_title_back.setOnClickListener(this);
		km1_sx_choose_que.setOnClickListener(this);
		km1_sx_ans_que.setOnClickListener(this);
		q_an1.setOnClickListener(this);
		q_an2.setOnClickListener(this);
		q_an3.setOnClickListener(this);
		q_an4.setOnClickListener(this);
	}

	@Override
	public void onClick(View v) {
		switch (v.getId()) {
		case R.id.km1_sx_title_back:
			finish();
			break;
		case R.id.q_an1:
			list.get(page-1).examAnsChoose="1";
			ds.setExamAnsChoose("1", list.get(page-1).intNumber);
			if("1".equals(qestion.answerTrue)){//A
				ds.setExamAnsState("0", list.get(page-1).intNumber);
				q_an1.setBackgroundColor(getResources().getColor(R.color.bg_title));
				q_an2.setBackgroundColor(Color.WHITE);
				q_an3.setBackgroundColor(Color.WHITE);
				q_an4.setBackgroundColor(Color.WHITE);
				ans_lay.setVisibility(View.GONE);
				if(page<count){
					page++;
					getQ();
				}
				
			}else{
				ds.setExamAnsState("1", list.get(page-1).intNumber);
				q_an1.setBackgroundColor(Color.RED);
				q_an2.setBackgroundColor(Color.WHITE);
				q_an3.setBackgroundColor(Color.WHITE);
				q_an4.setBackgroundColor(Color.WHITE);
				ans_lay.setVisibility(View.VISIBLE);
			}
			
			break;
		case R.id.q_an2:
			list.get(page-1).examAnsChoose="2";
			ds.setExamAnsChoose("2", list.get(page-1).intNumber);
			if("2".equals(qestion.answerTrue)){//B
				ds.setExamAnsState("0", list.get(page-1).intNumber);
				q_an2.setBackgroundColor(getResources().getColor(R.color.bg_title));
				q_an1.setBackgroundColor(Color.WHITE);
				q_an3.setBackgroundColor(Color.WHITE);
				q_an4.setBackgroundColor(Color.WHITE);
				ans_lay.setVisibility(View.GONE);
				if(page<count){
					page++;
					getQ();
				}
			}else{
				ds.setExamAnsState("1", list.get(page-1).intNumber);
				q_an2.setBackgroundColor(Color.RED);
				q_an1.setBackgroundColor(Color.WHITE);				
				q_an3.setBackgroundColor(Color.WHITE);				
				q_an4.setBackgroundColor(Color.WHITE);				
				ans_lay.setVisibility(View.VISIBLE);
			}
			
			break;
		case R.id.q_an3:
			list.get(page-1).examAnsChoose="3";
			ds.setExamAnsChoose("3", list.get(page-1).intNumber);
			if("3".equals(qestion.answerTrue)){//C
				ds.setExamAnsState("0", list.get(page-1).intNumber);
				q_an3.setBackgroundColor(getResources().getColor(R.color.bg_title));
				q_an1.setBackgroundColor(Color.WHITE);
				q_an2.setBackgroundColor(Color.WHITE);
				q_an4.setBackgroundColor(Color.WHITE);
				ans_lay.setVisibility(View.GONE);
				if(page<count){
					page++;
					getQ();
				}
			}else{
				ds.setExamAnsState("1", list.get(page-1).intNumber);
				q_an3.setBackgroundColor(Color.RED);
				q_an2.setBackgroundColor(Color.WHITE);
				q_an1.setBackgroundColor(Color.WHITE);
				q_an4.setBackgroundColor(Color.WHITE);
				ans_lay.setVisibility(View.VISIBLE);
			}
			
			break;
		case R.id.q_an4:
			list.get(page-1).examAnsChoose="4";
			ds.setExamAnsChoose("4", list.get(page-1).intNumber);
			if("4".equals(qestion.answerTrue)){//D
				ds.setExamAnsState("0", list.get(page-1).intNumber);
				q_an4.setBackgroundColor(getResources().getColor(R.color.bg_title));
				q_an1.setBackgroundColor(Color.WHITE);
				q_an2.setBackgroundColor(Color.WHITE);
				q_an3.setBackgroundColor(Color.WHITE);
				ans_lay.setVisibility(View.GONE);
				if(page<count){
					page++;
					getQ();
				}
			}else{
				ds.setExamAnsState("1", list.get(page-1).intNumber);
				q_an4.setBackgroundColor(Color.RED);
				q_an1.setBackgroundColor(Color.WHITE);
				q_an2.setBackgroundColor(Color.WHITE);
				q_an3.setBackgroundColor(Color.WHITE);
				ans_lay.setVisibility(View.VISIBLE);
			}
			
			break;
		case R.id.km1_sx_choose_que://选择题号
			
			showPopup(count);
			
			break;
		case R.id.km1_sx_ans_que://参考答案
			if(ansState==1){
				ans_lay.setVisibility(View.VISIBLE);
				ansState=2;
			}else{
				ans_lay.setVisibility(View.GONE);
				ansState=1;
			}
			break;

		}
	}
	
	//“选择题号”弹出框
	
	private void showPopup(int count) {
		View v = LayoutInflater.from(this).inflate(
				R.layout.dialog, null);
		pop = new PopupWindow(v, LayoutParams.MATCH_PARENT,
				LayoutParams.MATCH_PARENT, true);
		
		GridView dialog_grid=(GridView) v.findViewById(R.id.dialog_grid); 
		
		dialog_grid.setAdapter(new QueCountAdapter(this, count));
		dialog_grid.setOnItemClickListener(new OnItemClickListener() {

			@Override
			public void onItemClick(AdapterView<?> parent, View view,
					int position, long id) {
				page=position+1;
				getQ();
				
				if (pop != null) {
					pop.dismiss();
				}
			}
		});
		
		v.findViewById(R.id.dialog_gray_lay).setOnClickListener(new OnClickListener() {
			
			@Override
			public void onClick(View v) {
				if (pop != null) {
					pop.dismiss();
				}
			}
		});
		
		pop.setFocusable(true);
		pop.setOutsideTouchable(true);
		pop.setBackgroundDrawable(new BitmapDrawable());
		pop.showAtLocation(root, Gravity.BOTTOM, 0, 0);
		pop.update();
	}

	
	private void getQ(){
		if(page>count){
			Toast.makeText(getApplicationContext(), "后面没有错题了", 0).show();
			return;
		}
		
		qestion=list.get(page-1);
		
		if(qestion!=null){
			setQue(qestion);
		}else{
			Toast.makeText(this, "对不起,没有该题了", 0).show();
		}
	}
	
	
	private void setQue(QestionBean q){
		
		q_name.setText(page+"."+q.qestion);
		if(!TextUtils.isEmpty(q.sinaimg)){
			setImg(q.sinaimg);
			q_img.setVisibility(View.VISIBLE);
		}else{
			q_img.setVisibility(View.GONE);
		}
		
		if("1".equals(q.type)){//判断题
			
			q_an1.setText("A. 正确");
			q_an2.setText("B. 错误");
			
			if(TextUtils.isEmpty(q.examAnsChoose)){
				q_an1.setBackgroundColor(Color.WHITE);
				q_an2.setBackgroundColor(Color.WHITE);
			}else if("1".equals(q.examAnsChoose)){
				if("1".equals(q.answerTrue)){
					q_an1.setBackgroundColor(getResources().getColor(R.color.bg_title));
				}else{
					q_an1.setBackgroundColor(Color.RED);
				}
				q_an2.setBackgroundColor(Color.WHITE);
			}else if("2".equals(q.examAnsChoose)){
				q_an1.setBackgroundColor(Color.WHITE);
				if("2".equals(q.answerTrue)){
					q_an2.setBackgroundColor(getResources().getColor(R.color.bg_title));
				}else{
					q_an2.setBackgroundColor(Color.RED);
				}
			}
			
			if("1".equals(q.answerTrue)){
				km1_sx_trueAns.setText("答案：A");
			}else{
				km1_sx_trueAns.setText("答案：B");
			}
			if(!TextUtils.isEmpty(q.explain)){
				km1_sx_explain.setText("习题解析："+q.explain);
			}else{
				km1_sx_explain.setText("习题解析：暂无解释");
			}
			
			q_an3.setVisibility(View.GONE);
			q_an4.setVisibility(View.GONE);
		}else {//选择题
			if(TextUtils.isEmpty(q.examAnsChoose)){
				q_an1.setBackgroundColor(Color.WHITE);
				q_an2.setBackgroundColor(Color.WHITE);
				q_an3.setBackgroundColor(Color.WHITE);
				q_an4.setBackgroundColor(Color.WHITE);
			}else if("1".equals(q.examAnsChoose)){
				if("1".equals(q.answerTrue)){
					q_an1.setBackgroundColor(getResources().getColor(R.color.bg_title));
				}else{
					q_an1.setBackgroundColor(Color.RED);
				}
				q_an2.setBackgroundColor(Color.WHITE);
				q_an3.setBackgroundColor(Color.WHITE);
				q_an4.setBackgroundColor(Color.WHITE);
			}else if("2".equals(q.examAnsChoose)){
				q_an1.setBackgroundColor(Color.WHITE);
				if("2".equals(q.answerTrue)){
					q_an2.setBackgroundColor(getResources().getColor(R.color.bg_title));
				}else{
					q_an2.setBackgroundColor(Color.RED);
				}
				q_an3.setBackgroundColor(Color.WHITE);
				q_an4.setBackgroundColor(Color.WHITE);
			}else if("3".equals(q.examAnsChoose)){
				q_an1.setBackgroundColor(Color.WHITE);
				q_an2.setBackgroundColor(Color.WHITE);
				if("3".equals(q.answerTrue)){
					q_an3.setBackgroundColor(getResources().getColor(R.color.bg_title));
				}else{
					q_an3.setBackgroundColor(Color.RED);
				}
				q_an4.setBackgroundColor(Color.WHITE);
			}else if("3".equals(q.examAnsChoose)){
				q_an1.setBackgroundColor(Color.WHITE);
				q_an2.setBackgroundColor(Color.WHITE);
				q_an3.setBackgroundColor(Color.WHITE);
				if("4".equals(q.answerTrue)){
					q_an4.setBackgroundColor(getResources().getColor(R.color.bg_title));
				}else{
					q_an4.setBackgroundColor(Color.RED);
				}
			}
			
			if("1".equals(q.answerTrue)){
				km1_sx_trueAns.setText("答案：A");
			}else if("2".equals(q.answerTrue)){
				km1_sx_trueAns.setText("答案：B");
			}else if("3".equals(q.answerTrue)){
				km1_sx_trueAns.setText("答案：C");
			}else if("4".equals(q.answerTrue)){
				km1_sx_trueAns.setText("答案：D");
			}
			if(!TextUtils.isEmpty(q.explain)){
				km1_sx_explain.setText("习题解析："+q.explain);
			}else{
				km1_sx_explain.setText("习题解析：暂无解释");
			}
			q_an1.setText("A."+q.an1);
			q_an2.setText("B."+q.an2);
			q_an3.setText("C."+q.an3);
			q_an4.setText("D."+q.an4);
			q_an3.setVisibility(View.VISIBLE);
			q_an4.setVisibility(View.VISIBLE);
		}
	}
	
	private void setImg(String filename){
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
	
	class QueCountAdapter extends BaseAdapter{

		private Context c;
		private int a=0;//题的数量
		
		public QueCountAdapter(Context c,int a){
			this.c=c;
			this.a=a;
		}
		
		@Override
		public int getCount() {
			// TODO Auto-generated method stub
			return a;
		}

		@Override
		public Object getItem(int position) {
			// TODO Auto-generated method stub
			return position+1;
		}

		@Override
		public long getItemId(int position) {
			// TODO Auto-generated method stub
			return position;
		}

		@Override
		public View getView(int position, View convertView, ViewGroup parent) {

			ViewHolder vh;
			
			if(convertView==null){
				vh=new ViewHolder();
				convertView=LayoutInflater.from(c).inflate(R.layout.que_count, null);
				vh.que_count_t=(TextView) convertView.findViewById(R.id.que_count_t);
				convertView.setTag(vh);
			}else{
				vh=(ViewHolder) convertView.getTag();
			}
			
			vh.que_count_t.setText((position+1)+"");
			
			return convertView;
		}
		
		class ViewHolder{
			TextView que_count_t;
		}
	}
	
	@Override
	protected void onDestroy() {
		// TODO Auto-generated method stub
		super.onDestroy();
		
		if(ds!=null){
			ds.close();
		}
	}

	
}
