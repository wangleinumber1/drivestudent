package com.dyh.drivingschool.activity;

import java.util.ArrayList;
import java.util.Calendar;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

import com.dyh.drivingschool.contents.InterfaceParams;
import com.dyh.drivingschool.model.DemoJavaScriptInterface;
import com.dyh.drivingschool.net.NetRequestService;
import com.dyh.drivingschool.utils.YokaLog;
import com.dyh.drivingschool.R;

import android.app.Activity;
import android.app.ProgressDialog;
import android.os.AsyncTask;
import android.os.Bundle;
import android.text.TextUtils;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.view.View.OnClickListener;
import android.widget.BaseAdapter;
import android.widget.ImageView;
import android.widget.LinearLayout;
import android.widget.ListView;
import android.widget.TextView;
import android.widget.Toast;

public class OilPriceActivity extends BaseActivity implements OnClickListener {

	private LinearLayout oil_title_back;
	private TextView oil_date;
	private ListView oil_pri_lv;
	
	@Override
	protected void onCreate(Bundle savedInstanceState) {
		// TODO Auto-generated method stub
		super.onCreate(savedInstanceState);
		setContentView(R.layout.oil_lay);
		initView();
		new MyAsyncTask().execute();
		
	}

	private void initView() {
		oil_title_back=(LinearLayout) findViewById(R.id.oil_title_back);
		oil_date=(TextView) findViewById(R.id.oil_date);
		oil_pri_lv=(ListView) findViewById(R.id.oil_pri_lv);
		
		Calendar calendar = Calendar.getInstance();
		int month = calendar.get(Calendar.MONTH) + 1;
		int day = calendar.get(Calendar.DATE);
		String taday = calendar.get(Calendar.YEAR)
				+ (month > 9 ? "-" + month : "-0" + month)
				+ (day > 9 ? "-" + day : "-0" + day);
		oil_date.setText(taday);
		
		oil_title_back.setOnClickListener(this);
	}

	@Override
	public void onClick(View v) {
		switch (v.getId()) {
		case R.id.oil_title_back:
			finish();
			break;
		}
	}

	private ProgressDialog pdialog;

	protected class MyAsyncTask extends AsyncTask<Object, Object, Object> {
		protected MyAsyncTask() {
			pdialog = ProgressDialog.show(OilPriceActivity.this,"","数据提交中...");
		}

		@Override
		protected Object doInBackground(Object... params) {
			
			return new NetRequestService(OilPriceActivity.this).requestData("GET",InterfaceParams.OIL_TADAY,"0", null, false);
			
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
				JSONArray js=new JSONArray((String)result);
				final List<OilBean> list=new ArrayList<OilPriceActivity.OilBean>();
					
				for(int i=0;i<js.length();i++){
					JSONObject jsonObject = js.getJSONObject(i);
					String id=jsonObject.getString("id");
					String province=jsonObject.getString("province");
					String oil90=jsonObject.getString("oil90");
					String oil93=jsonObject.getString("oil93");
					String oil97=jsonObject.getString("oil97");
					String oil0=jsonObject.getString("oil0");
					String addtime=jsonObject.getString("addtime");
						
					list.add(new OilBean(id, province, oil90, oil93, oil97, oil0, addtime));
				}
					
				oil_pri_lv.setAdapter(new BaseAdapter() {
						
					@Override
					public View getView(int position, View convertView, ViewGroup parent) {
						ViewHolder vh=null;
						if(convertView==null){
							convertView=LayoutInflater.from(OilPriceActivity.this).inflate(R.layout.oilitem, null);
						}
							
						TextView oil_item_city=(TextView) convertView.findViewById(R.id.oil_item_city);
						TextView oil_item_pri1=(TextView) convertView.findViewById(R.id.oil_item_pri1);
						TextView oil_item_pri2=(TextView) convertView.findViewById(R.id.oil_item_pri2);
						TextView oil_item_pri3=(TextView) convertView.findViewById(R.id.oil_item_pri3);
						TextView oil_item_pri4=(TextView) convertView.findViewById(R.id.oil_item_pri4);
							
						OilBean oilBean = list.get(position);
						oil_item_city.setText(oilBean.province);
						oil_item_pri1.setText(oilBean.oil90);
						oil_item_pri2.setText(oilBean.oil93);
						oil_item_pri3.setText(oilBean.oil97);
						oil_item_pri4.setText(oilBean.oil0);
							
						return convertView;
					}
						
					@Override
					public long getItemId(int position) {
						// TODO Auto-generated method stub
						return position;
					}
						
					@Override
					public Object getItem(int position) {
						// TODO Auto-generated method stub
						return list.get(position);
					}
						
					@Override
					public int getCount() {
						// TODO Auto-generated method stub
						return list.isEmpty()?0:list.size();
					}
						
				});
				
				
			} catch (JSONException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
				Toast.makeText(getApplicationContext(), "获取数据失败", Toast.LENGTH_SHORT).show();
			}
			
		}
	}
	
	class OilBean{
		public String id;
		public String province;
		public String oil90;
		public String oil93;
		public String oil97;
		public String oil0;
		public String addtime;
		public OilBean(String id, String province, String oil90, String oil93,
				String oil97, String oil0, String addtime) {
			super();
			this.id = id;
			this.province = province;
			this.oil90 = oil90;
			this.oil93 = oil93;
			this.oil97 = oil97;
			this.oil0 = oil0;
			this.addtime = addtime;
		}
		
	}
	
	@Override
	protected void onDestroy() {
		// TODO Auto-generated method stub
		super.onDestroy();
		if(pdialog!=null){
			pdialog.dismiss();
			pdialog.cancel();
		}
	}
	
}
