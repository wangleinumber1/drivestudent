package com.dyh.drivingschool.activity;

import java.io.File;
import java.util.ArrayList;
import java.util.List;

import net.sourceforge.pinyin4j.PinyinHelper;
import net.sourceforge.pinyin4j.format.HanyuPinyinCaseType;
import net.sourceforge.pinyin4j.format.HanyuPinyinOutputFormat;
import net.sourceforge.pinyin4j.format.HanyuPinyinToneType;
import net.sourceforge.pinyin4j.format.HanyuPinyinVCharType;
import net.sourceforge.pinyin4j.format.exception.BadHanyuPinyinOutputFormatCombination;

import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

import android.app.Activity;
import android.app.ProgressDialog;
import android.content.Context;
import android.content.pm.ActivityInfo;
import android.graphics.Color;
import android.graphics.drawable.ColorDrawable;
import android.os.AsyncTask;
import android.os.Bundle;
import android.os.Environment;
import android.text.TextUtils;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.view.View.OnClickListener;
import android.widget.BaseAdapter;
import android.widget.GridView;
import android.widget.ImageView;
import android.widget.LinearLayout;
import android.widget.ListView;
import android.widget.TextView;
import android.widget.Toast;

import com.dyh.drivingschool.activity.WeatherActivity.Weather.Index;
import com.dyh.drivingschool.activity.WeatherActivity.Weather.Weather_data;
import com.dyh.drivingschool.net.NetRequestService;
import com.dyh.drivingschool.utils.YokaLog;
import com.dyh.drivingschool.R;
import com.nostra13.universalimageloader.cache.disc.impl.UnlimitedDiscCache;
import com.nostra13.universalimageloader.cache.disc.naming.Md5FileNameGenerator;
import com.nostra13.universalimageloader.cache.memory.impl.WeakMemoryCache;
import com.nostra13.universalimageloader.core.DisplayImageOptions;
import com.nostra13.universalimageloader.core.ImageLoader;
import com.nostra13.universalimageloader.core.ImageLoaderConfiguration;
import com.nostra13.universalimageloader.core.assist.QueueProcessingType;

public class WeatherActivity extends BaseActivity implements OnClickListener {

	private LinearLayout wea_title_back;
	private TextView weather_date,weather_pm25;
	private ListView wea_lv;
	private GridView wea_gv;
	private TextView wea_title_name;
	private String city="";
	
	@Override
	protected void onCreate(Bundle savedInstanceState) {
		// TODO Auto-generated method stub
		super.onCreate(savedInstanceState);
		setContentView(R.layout.weather_lay);
		initImageLoader(this, null);
		initView();
		
		new MyAsyncTask().execute();
	}

	private void initView() {
		wea_title_back=(LinearLayout) findViewById(R.id.wea_title_back);
		wea_title_name=(TextView) findViewById(R.id.wea_title_name);
		weather_date=(TextView) findViewById(R.id.weather_date);
		weather_pm25=(TextView) findViewById(R.id.weather_pm25);
		wea_lv=(ListView) findViewById(R.id.wea_lv);
		wea_gv=(GridView) findViewById(R.id.wea_gv);

		// listview/gridview 设置点击无法点击
		wea_lv.setSelector(new ColorDrawable(Color.TRANSPARENT));
		wea_gv.setSelector(new ColorDrawable(Color.TRANSPARENT));
		
		if(!TextUtils.isEmpty(MainActivity.city)){
			if(MainActivity.city.endsWith("市")){
				city=MainActivity.city.substring(0, MainActivity.city.length()-1);
			}else{
				city=MainActivity.city;
			}
		}else{
			city="北京";
		}
		wea_title_name.setText(city+"天气");
		
		wea_title_back.setOnClickListener(this);
	}

	@Override
	public void onClick(View v) {
		switch (v.getId()) {
		case R.id.wea_title_back:
			finish();
			break;
		}
	}


	private ProgressDialog pdialog;

	protected class MyAsyncTask extends AsyncTask<Object, Object, Object> {
		protected MyAsyncTask() {
			pdialog = ProgressDialog.show(WeatherActivity.this,"","数据提交中...");
		}

		@Override
		protected Object doInBackground(Object... params) {
			
			String url="telematics/v3/weather?location="+toPinYin(city)+"&output=json&ak=DE47ef0dcee1774d255910ac7f68cf3d";
			return new NetRequestService(WeatherActivity.this).requestData("GET",url,"3", null, false);
			
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
				JSONObject js=new JSONObject((String)result);
				String error= js.getString("error");
				if("0".equals(error)){
					final Weather wea=new Weather();
					wea.date = js.getString("date");
					JSONArray results=js.getJSONArray("results");
					JSONObject j =  results.getJSONObject(0);
					wea.currentCity=j.getString("currentCity");
					wea.pm25=j.getString("pm25");
					wea.index=new ArrayList<WeatherActivity.Weather.Index>();
					JSONArray jsonArray = j.getJSONArray("index");
					for(int i=0;i<jsonArray.length();i++){
						Index index=new Index();
						JSONObject jsonObject = jsonArray.getJSONObject(i);
						index.title=jsonObject.getString("title");
						index.zs=jsonObject.getString("zs");
						index.tipt=jsonObject.getString("tipt");
						index.des=jsonObject.getString("des");
						wea.index.add(index);
					}
					
					wea.weather_data=new ArrayList<WeatherActivity.Weather.Weather_data>();
					JSONArray jsonArray1 = j.getJSONArray("weather_data");
					for(int i=0;i<jsonArray1.length();i++){
						Weather_data weather_data=new Weather_data();
						JSONObject jsonObject1 = jsonArray1.getJSONObject(i);
						weather_data.date=jsonObject1.getString("date");
						weather_data.dayPictureUrl=jsonObject1.getString("dayPictureUrl");
						weather_data.nightPictureUrl=jsonObject1.getString("nightPictureUrl");
						weather_data.weather=jsonObject1.getString("weather");
						weather_data.wind=jsonObject1.getString("wind");
						weather_data.temperature=jsonObject1.getString("temperature");
						wea.weather_data.add(weather_data);
					}
					
					//设置天气
					weather_date.setText(TextUtils.isEmpty(wea.date)?"":"今天日期 : "+wea.date);
					weather_pm25.setText(TextUtils.isEmpty(wea.pm25)?"":"PM2.5 : "+wea.pm25);
					
					wea_lv.setAdapter(new BaseAdapter() {
						
						@Override
						public View getView(int position, View convertView, ViewGroup parent) {
							if(convertView==null){
								convertView=LayoutInflater.from(getApplicationContext()).inflate(R.layout.wea1, null);
							}
							TextView wea1_title =(TextView) convertView.findViewById(R.id.wea1_title);
							TextView wea1_zs =(TextView) convertView.findViewById(R.id.wea1_zs);
							TextView wea1_tipt =(TextView) convertView.findViewById(R.id.wea1_tipt);
							TextView wea1_des =(TextView) convertView.findViewById(R.id.wea1_des);
							
							Index index = wea.index.get(position);
							wea1_title.setText(TextUtils.isEmpty(index.title)?"":index.title);
							wea1_zs.setText(TextUtils.isEmpty(index.zs)?"":index.zs);
							wea1_tipt.setText(TextUtils.isEmpty(index.tipt)?"":index.tipt);
							wea1_des.setText(TextUtils.isEmpty(index.des)?"":index.des);
							
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
							return wea.index.get(position);
						}
						
						@Override
						public int getCount() {
							// TODO Auto-generated method stub
							return wea.index.isEmpty()?0:wea.index.size();
						}
					});
					
					wea_gv.setAdapter(new BaseAdapter() {
						
						@Override
						public View getView(int position, View convertView, ViewGroup parent) {
							if(convertView==null){
								convertView=LayoutInflater.from(getApplicationContext()).inflate(R.layout.wea2, null);
							}
							
							TextView wea1_date=(TextView) convertView.findViewById(R.id.wea1_date);
							TextView wea1_weather=(TextView) convertView.findViewById(R.id.wea1_weather);
							TextView wea1_wind=(TextView) convertView.findViewById(R.id.wea1_wind);
							ImageView wea1_dayPictureUrl=(ImageView) convertView.findViewById(R.id.wea1_dayPictureUrl);
							ImageView nightPictureUrl=(ImageView) convertView.findViewById(R.id.nightPictureUrl);
							
							Weather_data weather_data = wea.weather_data.get(position);
							
							if(!TextUtils.isEmpty(weather_data.dayPictureUrl)){
								ImageLoader.getInstance().displayImage(weather_data.dayPictureUrl, wea1_dayPictureUrl);
							}
							if(!TextUtils.isEmpty(weather_data.nightPictureUrl)){
								ImageLoader.getInstance().displayImage(weather_data.dayPictureUrl, nightPictureUrl);
							}
							
							wea1_date.setText(TextUtils.isEmpty(weather_data.date)?"未知":weather_data.date);
							wea1_weather.setText(TextUtils.isEmpty(weather_data.weather)?"未知":weather_data.weather);
							wea1_wind.setText(TextUtils.isEmpty(weather_data.wind)?"未知":weather_data.wind);
							
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
							return wea.weather_data.get(position);
						}
						
						@Override
						public int getCount() {
							// TODO Auto-generated method stub
							return wea.weather_data.isEmpty()?0:wea.weather_data.size();
						}
					});
					
				}else{
					Toast.makeText(getApplicationContext(), "获取天气失败", 0).show();
				}
				
			} catch (JSONException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
				Toast.makeText(getApplicationContext(), "获取数据失败", Toast.LENGTH_SHORT).show();
			}
			
		}
	}
	
	/**
	 * 初始化图片加载器
	 * 
	 * @param mContext
	 * @param defaultOptions
	 */
	public static void initImageLoader(Context mContext, DisplayImageOptions defaultOptions) {

		if (defaultOptions == null)
			defaultOptions = buildImageOptions(mContext);

		ImageLoaderConfiguration config = new ImageLoaderConfiguration.Builder(mContext).threadPoolSize(5).defaultDisplayImageOptions(defaultOptions)
				.threadPriority(Thread.NORM_PRIORITY - 2).denyCacheImageMultipleSizesInMemory().discCacheFileNameGenerator(new Md5FileNameGenerator())
				.tasksProcessingOrder(QueueProcessingType.LIFO).memoryCache(new WeakMemoryCache()).memoryCacheSize(30 * 1024 * 1024)
				.discCache(new UnlimitedDiscCache(new File(Environment.getExternalStorageDirectory() + "/com.dyh.drivingschool/imagecache"))).build();
		ImageLoader.getInstance().init(config);
	}

	/**
	 * 创建图片参数
	 * 
	 * @param mContext
	 * @return
	 */
	private static DisplayImageOptions buildImageOptions(Context mContext) {
		DisplayImageOptions defaultOptions = new DisplayImageOptions.Builder()
				.showImageOnLoading(R.drawable.icon)
				.showImageForEmptyUri(R.drawable.icon)
				.showImageOnFail(R.drawable.icon)
				.considerExifParams(true).cacheInMemory(true).cacheOnDisc(true)
				.build();

		return defaultOptions;
	}
	
	public static class Weather{
		public  String date;
		public  String currentCity;
		public  String pm25;
		public List<Index> index;
		public List<Weather_data> weather_data;
		
		public static class Index{
			public String title;
			public String zs;
			public String tipt;
			public String des;
		}
		public static class Weather_data{
			public String date;
			public String dayPictureUrl;
			public String nightPictureUrl;
			public String weather;
			public String wind;
			public String temperature;
		}
	}
    
    public static String toPinYin(String hanzhis) {
		CharSequence s = hanzhis;

		char[] hanzhi = new char[s.length()];
		for (int i = 0; i < s.length(); i++) {
			hanzhi[i] = s.charAt(i);
		}

		char[] t1 = hanzhi;
		String[] t2 = new String[s.length()];
		/** */
		/**
		 * 设置输出格式
		 */
		net.sourceforge.pinyin4j.format.HanyuPinyinOutputFormat t3 = new HanyuPinyinOutputFormat();
		t3.setCaseType(HanyuPinyinCaseType.UPPERCASE);
		t3.setToneType(HanyuPinyinToneType.WITHOUT_TONE);
		t3.setVCharType(HanyuPinyinVCharType.WITH_V);

		int t0 = t1.length;
		String py = "";
		try {
			for (int i = 0; i < t0; i++) {
				t2 = PinyinHelper.toHanyuPinyinStringArray(t1[i], t3);
				py = py + t2[0].toString();
			}
		} catch (BadHanyuPinyinOutputFormatCombination e1) {
			e1.printStackTrace();
		}

		return py.trim();
	}
    
    
    @Override
    protected void onDestroy() {
    	// TODO Auto-generated method stub
    	super.onDestroy();
    	if(pdialog!=null){
    		pdialog.dismiss();
    	}
    }
}
