package com.dyh.drivingschool.activity;

import java.util.ArrayList;

import android.app.Activity;
import android.app.AlertDialog;
import android.app.ProgressDialog;
import android.content.Intent;
import android.graphics.Color;
import android.location.Location;
import android.os.AsyncTask;
import android.os.Bundle;
import android.util.Log;
import android.view.Gravity;
import android.view.LayoutInflater;
import android.view.MotionEvent;
import android.view.View;
import android.view.View.OnClickListener;
import android.view.View.OnTouchListener;
import android.view.Window;
import android.widget.AdapterView;
import android.widget.AdapterView.OnItemClickListener;
import android.widget.ArrayAdapter;
import android.widget.Button;
import android.widget.ImageButton;
import android.widget.LinearLayout.LayoutParams;
import android.widget.ListView;
import android.widget.PopupWindow;
import android.widget.TextView;
import android.widget.Toast;

import com.amap.api.location.AMapLocation;
import com.amap.api.location.AMapLocationListener;
import com.amap.api.location.LocationManagerProxy;
import com.amap.api.location.LocationProviderProxy;
import com.amap.api.maps2d.AMap;
import com.amap.api.maps2d.AMap.InfoWindowAdapter;
import com.amap.api.maps2d.AMap.OnInfoWindowClickListener;
import com.amap.api.maps2d.AMap.OnMapClickListener;
import com.amap.api.maps2d.AMap.OnMapLoadedListener;
import com.amap.api.maps2d.AMap.OnMarkerClickListener;
import com.amap.api.maps2d.AMap.OnMarkerDragListener;
import com.amap.api.maps2d.LocationSource;
import com.amap.api.maps2d.LocationSource.OnLocationChangedListener;
import com.amap.api.maps2d.MapView;
import com.amap.api.maps2d.model.BitmapDescriptorFactory;
import com.amap.api.maps2d.model.LatLng;
import com.amap.api.maps2d.model.Marker;
import com.amap.api.maps2d.model.MarkerOptions;
import com.amap.api.maps2d.model.MyLocationStyle;
import com.amap.api.maps2d.overlay.BusRouteOverlay;
import com.amap.api.maps2d.overlay.DrivingRouteOverlay;
import com.amap.api.maps2d.overlay.WalkRouteOverlay;
import com.amap.api.services.core.LatLonPoint;
import com.amap.api.services.poisearch.PoiItemDetail;
import com.amap.api.services.poisearch.PoiResult;
import com.amap.api.services.poisearch.PoiSearch;
import com.amap.api.services.poisearch.PoiSearch.OnPoiSearchListener;
import com.amap.api.services.route.BusPath;
import com.amap.api.services.route.BusRouteResult;
import com.amap.api.services.route.DrivePath;
import com.amap.api.services.route.DriveRouteResult;
import com.amap.api.services.route.RouteSearch;
import com.amap.api.services.route.RouteSearch.BusRouteQuery;
import com.amap.api.services.route.RouteSearch.DriveRouteQuery;
import com.amap.api.services.route.RouteSearch.OnRouteSearchListener;
import com.amap.api.services.route.RouteSearch.WalkRouteQuery;
import com.amap.api.services.route.WalkPath;
import com.amap.api.services.route.WalkRouteResult;
import com.dyh.drivingschool.contents.ReciverContents;
import com.dyh.drivingschool.contents.UserData;
import com.dyh.drivingschool.model.GaodeInfo;
import com.dyh.drivingschool.net.service.UserJsonService;
import com.dyh.drivingschool.utils.IntentUtil;
import com.dyh.drivingschool.utils.ToastUtil;
import com.dyh.drivingschool.utils.YokaLog;
import com.dyh.drivingschool.R;

public class GaodeMapActivity extends BaseActivity implements
		OnMarkerClickListener, OnInfoWindowClickListener, OnMarkerDragListener,
		OnMapLoadedListener, OnClickListener, InfoWindowAdapter,
		OnPoiSearchListener, OnRouteSearchListener, LocationSource,
		OnLocationChangedListener, AMapLocationListener, OnMapClickListener {
	private AMap aMap;
	private MapView mapView;
	private OnLocationChangedListener mListener;
	private LocationManagerProxy mAMapLocationManager;
	private MarkerOptions markerOption;
	// private LatLng latlng = new LatLng(36.061, 103.834);
	// private LatLng chengdulatlng = new LatLng(30.679879, 104.064855);
	// // 测试坐标

	private Button drivingButton;
	private Button busButton;
//	private Button walkButton;

	private ImageButton startImageButton;
	private ImageButton endImageButton;
	private ImageButton routeSearchImagebtn;

	private TextView startTextView;
	private TextView endTextView;
	private ProgressDialog progDialog = null;// 搜索时进度条
	private int busMode = RouteSearch.BusDefault;// 公交默认模式
	private int drivingMode = RouteSearch.DrivingDefault;// 驾车默认模式
	private int walkMode = RouteSearch.WalkDefault;// 步行默认模式
	private BusRouteResult busRouteResult;// 公交模式查询结果
	private DriveRouteResult driveRouteResult;// 驾车模式查询结果
	private WalkRouteResult walkRouteResult;// 步行模式查询结果
	private int routeType = 1;// 1代表公交模式，2代表驾车模式，3代表步行模式
	private String strStart;
	private String strEnd;
	private LatLonPoint startPoint = null;
	private LatLonPoint endPoint = null;
	private PoiSearch.Query startSearchQuery;
	private PoiSearch.Query endSearchQuery;

	private boolean isClickStart = false;
	private boolean isClickTarget = false;
	private Marker startMk, targetMk;
	private RouteSearch routeSearch;
	public ArrayAdapter<String> aAdapter;
	private UserJsonService userjsonService;
	private ArrayList<GaodeInfo> gaolist=new ArrayList<GaodeInfo>();
	private AMapLocation aMapLocation;
	public static final String TAG = "GaodeMapActivity";
	private PopupWindow pwMyPopWindow;
	private ListView lvPopupList;
	
	@Override
	protected void onCreate(Bundle savedInstanceState) {
		// TODO Auto-generated method stub
		super.onCreate(savedInstanceState);
		setContentView(R.layout.locationsource_activity);
		mapView = (MapView) findViewById(R.id.map);
		mapView.onCreate(savedInstanceState);// 此方法必须重写
		userjsonService = new UserJsonService(this);
		new MyAsyncTask().execute();
		init();
	}

	/**
	 * 初始化AMap对象
	 */
	private void init() {
		
		if (aMap == null) {
			aMap = mapView.getMap();
			setUpMap();
			registerListener();

		}

		routeSearch = new RouteSearch(this);
		routeSearch.setRouteSearchListener(this);
		startTextView = (TextView) findViewById(R.id.autotextview_roadsearch_start);
		endTextView = (TextView) findViewById(R.id.autotextview_roadsearch_goals);
		busButton = (Button) findViewById(R.id.imagebtn_roadsearch_tab_transit);
		busButton.setOnClickListener(this);
		drivingButton = (Button) findViewById(R.id.imagebtn_roadsearch_tab_driving);
		drivingButton.setOnClickListener(this);
		
		startImageButton = (ImageButton) findViewById(R.id.imagebtn_roadsearch_startoption);
		startImageButton.setOnClickListener(this);
		endImageButton = (ImageButton) findViewById(R.id.imagebtn_roadsearch_endoption);
		endImageButton.setOnClickListener(this);
		routeSearchImagebtn = (ImageButton) findViewById(R.id.imagebtn_roadsearch_search);
		routeSearchImagebtn.setOnClickListener(this);
		
	}

	/**
	 * 注册监听
	 */
	private void registerListener() {
		aMap.setOnMapClickListener(this);
		aMap.setOnMarkerClickListener(this);
		aMap.setOnInfoWindowClickListener(this);
		aMap.setInfoWindowAdapter(this);
	}

	/**
	 * 设置一些amap的属性
	 */
	private void setUpMap() {
		getLocation();
		showMarker();
	}

	/**
	 * 显示小蓝点
	 * */

	private void getLocation() {
		// 自定义系统定位小蓝点
		MyLocationStyle myLocationStyle = new MyLocationStyle();
		myLocationStyle.myLocationIcon(BitmapDescriptorFactory
				.fromResource(R.drawable.location_marker));// 设置小蓝点的图标
		myLocationStyle.strokeColor(Color.BLACK);// 设置圆形的边框颜色
		myLocationStyle.radiusFillColor(Color.argb(100, 0, 0, 180));// 设置圆形的填充颜色
		// myLocationStyle.anchor(int,int)//设置小蓝点的锚点
		myLocationStyle.strokeWidth(1.0f);// 设置圆形的边框粗细
		aMap.setMyLocationStyle(myLocationStyle);
		aMap.setLocationSource(this);// 设置定位监听
		aMap.getUiSettings().setMyLocationButtonEnabled(true);// 设置默认定位按钮是否显示
		aMap.setMyLocationEnabled(true);// 设置为true表示显示定位层并可触发定位，false表示隐藏定位层并不可触发定位，默认是false
		// aMap.setMyLocationType()
		// Location location=Location.
	}

	/**
	 * 显示marker
	 * 
	 * */

	private void showMarker() {
		aMap.setOnMarkerDragListener(this);// 设置marker可拖拽事件监听器
		aMap.setOnMapLoadedListener(this);// 设置amap加载成功事件监听器
		aMap.setOnMarkerClickListener(this);// 设置点击marker事件监听器
		aMap.setOnInfoWindowClickListener(this);// 设置点击infoWindow事件监听器
		aMap.setInfoWindowAdapter(this);// 设置自定义InfoWindow样式
		// 往地图上添加marker
		if (aMap == null) {
			aMap = mapView.getMap();
			setUpMap();
		}
	}

	/**
	 * 方法必须重写
	 */
	@Override
	protected void onResume() {
		super.onResume();
		mapView.onResume();
	}

	/**
	 * 方法必须重写
	 */
	@Override
	protected void onPause() {
		super.onPause();
		mapView.onPause();
		deactivate();
	}

	/**
	 * 方法必须重写
	 */
	@Override
	protected void onSaveInstanceState(Bundle outState) {
		super.onSaveInstanceState(outState);
		mapView.onSaveInstanceState(outState);
	}

	/**
	 * 方法必须重写
	 */
	@Override
	protected void onDestroy() {
		super.onDestroy();
		mapView.onDestroy();
		if (null != pdialog && pdialog.isShowing()) {
			pdialog.dismiss();
			pdialog = null;
		}
	}

	/**
	 * 定位成功后回调函数
	 */
	@Override
	public void onLocationChanged(AMapLocation aLocation) {
		if (mListener != null && aLocation != null) {
			mListener.onLocationChanged(aLocation);// 显示系统小蓝点
			this.aMapLocation = aLocation;
		}
	}

	/**
	 * 激活定位
	 */
	@SuppressWarnings("deprecation")
	@Override
	public void activate(OnLocationChangedListener listener) {
		mListener = listener;
		if (mAMapLocationManager == null) {
			mAMapLocationManager = LocationManagerProxy.getInstance(this);
			/*
			 * mAMapLocManager.setGpsEnable(false);
			 * 1.0.2版本新增方法，设置true表示混合定位中包含gps定位，false表示纯网络定位，默认是true Location
			 * API定位采用GPS和网络混合定位方式
			 * ，第一个参数是定位provider，第二个参数时间最短是2000毫秒，第三个参数距离间隔单位是米，第四个参数是定位监听者
			 */
			mAMapLocationManager.requestLocationUpdates(
					LocationProviderProxy.AMapNetwork, 2000, 10, this);
		}
	}

	/**
	 * 停止定位
	 */
	@Override
	public void deactivate() {
		mListener = null;
		if (mAMapLocationManager != null) {
			mAMapLocationManager.removeUpdates(this);
			mAMapLocationManager.destory();
		}
		mAMapLocationManager = null;
	}

	/**
	 * 在地图上添加marker
	 */
	private void addMarkersToMap(ArrayList<GaodeInfo> userlist1) {
		final ArrayList<GaodeInfo> userlist=userlist1;
		for (int i = 0; i < userlist.size(); i++) {
			
			GaodeInfo gaodeInfo = userlist.get(i);
			aMap.addMarker(
					new MarkerOptions()
							.anchor(0.5f, 0.5f)
							.position(
									new LatLng(Double
											.valueOf(gaodeInfo.locationX),
											Double.valueOf(gaodeInfo.locationY)))
							.title(gaodeInfo.namedesc).draggable(true))
					.setObject(gaodeInfo);
//			Log.d(TAG, gaodeInfo.locationX);
		}
		// aMap.addMarker(new MarkerOptions().anchor(0.5f, 0.5f)
		// .position(Constants.CHENGDU).title("成都市")
		// .snippet("成都市:30.679879, 104.064855").draggable(true));

		// drawMarkers();// 添加10个带有系统默认icon的marker
	}

	/**
	 * 点击搜索按钮开始Route搜索
	 */
	public void searchRoute() {
		strStart = startTextView.getText().toString().trim();
		strEnd = endTextView.getText().toString().trim();

		if (strEnd == null && strEnd.endsWith("")) {

			Toast.makeText(this, "请选择终点", Toast.LENGTH_SHORT).show();
			return;
		}

		startSearchResult();// 开始搜终点
	}

	@Override
	public void onInfoWindowClick(Marker marker) {
		GaodeInfo gaodeInfo = (GaodeInfo) marker.getObject();
		showDialog(gaodeInfo);
	}

	@Override
	public boolean onMarkerClick(Marker marker) {
		if (marker.isInfoWindowShown()) {
			marker.hideInfoWindow();
		} else {
			marker.showInfoWindow();
		}
		return false;
	}

	@Override
	public View getInfoContents(Marker arg0) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public View getInfoWindow(Marker marker) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public void onMapLoaded() {
		// TODO Auto-generated method stub

	}

	@Override
	public void onMarkerDrag(Marker arg0) {
		// TODO Auto-generated method stub

	}

	@Override
	public void onMarkerDragEnd(Marker arg0) {
		// TODO Auto-generated method stub

	}

	@Override
	public void onMarkerDragStart(Marker arg0) {
		// TODO Auto-generated method stub

	}

	/**
	 * 监听点击infowindow窗口事件回调
	 */

	// @Override
	// public void onInfoWindowClick(Marker marker) {
	// // TODO Auto-generated method stub
	// Toast.makeText(this,"你点击了infoWindow窗口" +
	// marker.getTitle(),Toast.LENGTH_SHORT).show();
	//
	//
	// }

	// @Override
	// public boolean onMarkerClick(Marker arg0) {
	// // TODO Auto-generated method stub
	//
	// return false;
	// }

	/**
	 * 绘制系统默认的1种marker背景图片
	 */
	// public void drawMarkers() {
	// Marker marker = aMap.addMarker(new MarkerOptions()
	// .position(latlng)
	// .title("好好学习")
	// .icon(BitmapDescriptorFactory
	// .defaultMarker(BitmapDescriptorFactory.HUE_AZURE))
	// .draggable(true));
	// marker.showInfoWindow();// 设置默认显示一个infowinfow
	//
	// }

	/**
	 * 选择公交模式
	 */
	private void busRoute() {
		routeType = 1;// 标识为公交模式
		busMode = RouteSearch.BusDefault;
		drivingButton.setBackgroundResource(R.drawable.mode_driving_off);
		busButton.setBackgroundResource(R.drawable.mode_transit_on);
//		walkButton.setBackgroundResource(R.drawable.mode_walk_off);

	}

	/**
	 * 选择驾车模式
	 */
	private void drivingRoute() {
		routeType = 2;// 标识为驾车模式
		drivingButton.setBackgroundResource(R.drawable.mode_driving_on);
		busButton.setBackgroundResource(R.drawable.mode_transit_off);
//		walkButton.setBackgroundResource(R.drawable.mode_walk_off);
	}

	/**
	 * 选择步行模式
	 */
	// private void walkRoute() {
	// routeType = 3;// 标识为步行模式
	// walkMode = RouteSearch.WalkMultipath;
	// drivingButton.setBackgroundResource(R.drawable.mode_driving_off);
	// busButton.setBackgroundResource(R.drawable.mode_transit_off);
	// walkButton.setBackgroundResource(R.drawable.mode_walk_on);
	// }

	/**
	 * 显示进度框
	 */
	private void showProgressDialog() {
		if (progDialog == null)
			progDialog = new ProgressDialog(this);
		progDialog.setProgressStyle(ProgressDialog.STYLE_SPINNER);
		progDialog.setIndeterminate(false);
		progDialog.setCancelable(true);
		progDialog.setMessage("正在搜索");
		progDialog.show();
	}

	/**
	 * 隐藏进度框
	 */
	private void dissmissProgressDialog() {
		if (progDialog != null) {
			progDialog.dismiss();
		}
	}

	/**
	 * 查询路径规划起点
	 */
	public void startSearchResult() {
		strStart = startTextView.getText().toString().trim();
		if(aMapLocation==null){
			return;
		}
		startPoint = new LatLonPoint(aMapLocation.getLatitude(),
				aMapLocation.getLongitude());
		if (startPoint != null) {
			endSearchResult();
		} else {
			showProgressDialog();
			// startSearchQuery = new PoiSearch.Query(strStart, ""); //
			// 第一个参数表示查询关键字，第二参数表示poi搜索类型，第三个参数表示城市区号或者城市名
			// startSearchQuery.setPageNum(0);// 设置查询第几页，第一页从0开始
			// startSearchQuery.setPageSize(20);// 设置每页返回多少条数据
			// PoiSearch poiSearch = new PoiSearch(this, startSearchQuery);
			// poiSearch.setOnPoiSearchListener(this);
			// poiSearch.searchPOIAsyn();// 异步poi查询
		}
	}

	/**
	 * 查询路径规划终点
	 */
	public void endSearchResult() {
		strEnd = endTextView.getText().toString().trim();
		if (endPoint != null) {
			searchRouteResult(startPoint, endPoint);
		} else {
			showProgressDialog();
			endSearchQuery = new PoiSearch.Query(strEnd, ""); // 第一个参数表示查询关键字，第二参数表示poi搜索类型，第三个参数表示城市区号或者城市名
			endSearchQuery.setPageNum(0);// 设置查询第几页，第一页从0开始
			endSearchQuery.setPageSize(20);// 设置每页返回多少条数据

			PoiSearch poiSearch = new PoiSearch(this, endSearchQuery);
			poiSearch.setOnPoiSearchListener(this);
			poiSearch.searchPOIAsyn(); // 异步poi查询
		}
	}

	/**
	 * 开始搜索路径规划方案
	 */
	public void searchRouteResult(LatLonPoint startPoint, LatLonPoint endPoint) {
		showProgressDialog();
		final RouteSearch.FromAndTo fromAndTo = new RouteSearch.FromAndTo(
				startPoint, endPoint);
		if (routeType == 1) {// 公交路径规划
			BusRouteQuery query = new BusRouteQuery(fromAndTo, busMode,
					aMapLocation.getCity(), 0);// 第一个参数表示路径规划的起点和终点，第二个参数表示公交查询模式，第三个参数表示公交查询城市区号，第四个参数表示是否计算夜班车，0表示不计算
			routeSearch.calculateBusRouteAsyn(query);// 异步路径规划公交模式查询
		} else if (routeType == 2) {// 驾车路径规划
			DriveRouteQuery query = new DriveRouteQuery(fromAndTo, drivingMode,
					null, null, "");// 第一个参数表示路径规划的起点和终点，第二个参数表示驾车模式，第三个参数表示途经点，第四个参数表示避让区域，第五个参数表示避让道路
			routeSearch.calculateDriveRouteAsyn(query);// 异步路径规划驾车模式查询
		} else if (routeType == 3) {// 步行路径规划
			WalkRouteQuery query = new WalkRouteQuery(fromAndTo, walkMode);
			routeSearch.calculateWalkRouteAsyn(query);// 异步路径规划步行模式查询
		}
	}

	/**
	 * 公交路线查询回调
	 */
	@Override
	public void onBusRouteSearched(BusRouteResult result, int rCode) {
		dissmissProgressDialog();
		if (rCode == 0) {
			if (result != null && result.getPaths() != null
					&& result.getPaths().size() > 0) {
				busRouteResult = result;
				BusPath busPath = busRouteResult.getPaths().get(0);
				aMap.clear();// 清理地图上的所有覆盖物
				BusRouteOverlay routeOverlay = new BusRouteOverlay(this, aMap,
						busPath, busRouteResult.getStartPos(),
						busRouteResult.getTargetPos());
				routeOverlay.removeFromMap();
				routeOverlay.addToMap();
				routeOverlay.zoomToSpan();
			} else {
				Toast.makeText(this, R.string.no_result, Toast.LENGTH_SHORT)
						.show();
			}
		} else if (rCode == 27) {
			Toast.makeText(this, R.string.error_network, Toast.LENGTH_SHORT)
					.show();

		} else if (rCode == 32) {
			Toast.makeText(this, R.string.error_key, Toast.LENGTH_SHORT).show();

		} else {
			Toast.makeText(this, R.string.error_other + rCode,
					Toast.LENGTH_SHORT).show();

		}
	}

	/**
	 * 驾车结果回调
	 */
	@Override
	public void onDriveRouteSearched(DriveRouteResult result, int rCode) {
		dissmissProgressDialog();
		if (rCode == 0) {
			if (result != null && result.getPaths() != null
					&& result.getPaths().size() > 0) {
				driveRouteResult = result;
				DrivePath drivePath = driveRouteResult.getPaths().get(0);
				aMap.clear();// 清理地图上的所有覆盖物
				DrivingRouteOverlay drivingRouteOverlay = new DrivingRouteOverlay(
						this, aMap, drivePath, driveRouteResult.getStartPos(),
						driveRouteResult.getTargetPos());
				drivingRouteOverlay.removeFromMap();
				drivingRouteOverlay.addToMap();
				drivingRouteOverlay.zoomToSpan();
			} else {
				Toast.makeText(this, R.string.no_result, Toast.LENGTH_SHORT)
						.show();
			}
		} else if (rCode == 27) {
			Toast.makeText(this, R.string.error_network, Toast.LENGTH_SHORT)
					.show();

		} else if (rCode == 32) {
			Toast.makeText(this, R.string.error_key, Toast.LENGTH_SHORT).show();

		} else {
			Toast.makeText(this, R.string.error_other + rCode,
					Toast.LENGTH_SHORT).show();

		}
	}

	/**
	 * 步行路线结果回调
	 */
	@Override
	public void onWalkRouteSearched(WalkRouteResult result, int rCode) {
		dissmissProgressDialog();
		if (rCode == 0) {
			if (result != null && result.getPaths() != null
					&& result.getPaths().size() > 0) {
				walkRouteResult = result;
				WalkPath walkPath = walkRouteResult.getPaths().get(0);
				aMap.clear();// 清理地图上的所有覆盖物
				WalkRouteOverlay walkRouteOverlay = new WalkRouteOverlay(this,
						aMap, walkPath, walkRouteResult.getStartPos(),
						walkRouteResult.getTargetPos());
				walkRouteOverlay.removeFromMap();
				walkRouteOverlay.addToMap();
				walkRouteOverlay.zoomToSpan();
			} else {
				Toast.makeText(this, R.string.no_result, Toast.LENGTH_SHORT)
						.show();
			}
		} else if (rCode == 27) {
			Toast.makeText(this, R.string.error_network, Toast.LENGTH_SHORT)
					.show();

		} else if (rCode == 32) {
			Toast.makeText(this, R.string.error_key, Toast.LENGTH_SHORT).show();

		} else {
			Toast.makeText(this, R.string.error_other + rCode,
					Toast.LENGTH_SHORT).show();

		}
	}

	@Override
	public void onClick(View v) {
		switch (v.getId()) {

		case R.id.imagebtn_roadsearch_endoption:
			showEndLocation();
			break;
		case R.id.imagebtn_roadsearch_tab_transit:
			busRoute();
			break;
		case R.id.imagebtn_roadsearch_tab_driving:
			drivingRoute();
			break;

		case R.id.imagebtn_roadsearch_search:
			searchRoute();
			break;
		default:
			break;
		}
	}

	/**
	 * 选择终点
	 * */
	private void showEndLocation() {
		// TODO Auto-generated method stub
		iniPopupWindow();
		if (pwMyPopWindow.isShowing()) {

			pwMyPopWindow.dismiss();// 关闭
		} else {

			pwMyPopWindow.showAsDropDown(endImageButton);// 显示
		}

	}

	@Override
	public void onProviderDisabled(String arg0) {
		// TODO Auto-generated method stub

	}

	@Override
	public void onProviderEnabled(String arg0) {
		// TODO Auto-generated method stub

	}

	@Override
	public void onStatusChanged(String arg0, int arg1, Bundle arg2) {
		// TODO Auto-generated method stub

	}

	@Override
	public void onLocationChanged(Location arg0) {
		// TODO Auto-generated method stub

	}

	@Override
	public void onPoiItemDetailSearched(PoiItemDetail arg0, int arg1) {
		// TODO Auto-generated method stub

	}

	private ProgressDialog pdialog;

	protected class MyAsyncTask extends AsyncTask<Object, Object, Object> {
		protected MyAsyncTask() {
			pdialog = ProgressDialog.show(
					GaodeMapActivity.this,
					"",
					GaodeMapActivity.this.getResources().getString(
							R.string.data_loading_waiting));
		}

		@Override
		protected Object doInBackground(Object... params) {

			 return userjsonService.getGaodeInfo();
			 

			
		};

		@SuppressWarnings("unchecked")
		@Override
		protected void onPostExecute(Object result) {
			super.onPostExecute(result);
			YokaLog.d("MyAsyncTask", "MyAsyncTask==onPostExecute()" + result);
			if (null != pdialog && pdialog.isShowing()) {
				pdialog.dismiss();
				pdialog = null;
			}
			if (result == null) {
				return;
			}
			gaolist = (ArrayList<GaodeInfo>) result;
//			Log.d(TAG, gaolist.get(0).description);
//			Toast.makeText(GaodeMapActivity.this, gaolist.get(0).description, Toast.LENGTH_LONG).show();
			addMarkersToMap(gaolist);
		}
	}

	@Override
	public void onMapClick(LatLng arg0) {
		// TODO Auto-generated method stub

	}

	private void iniPopupWindow() {

		LayoutInflater inflater = (LayoutInflater) this
				.getSystemService(LAYOUT_INFLATER_SERVICE);
		View layout = inflater.inflate(R.layout.task_detail_popupwindow, null);
		layout.setOnTouchListener(new OnTouchListener() {

			@Override
			public boolean onTouch(View arg0, MotionEvent arg1) {
				pwMyPopWindow.dismiss();
				return true;
			}
		});
		lvPopupList = (ListView) layout.findViewById(R.id.lv_popup_list);
		pwMyPopWindow = new PopupWindow(layout);
		pwMyPopWindow.setFocusable(true);// 加上这个popupwindow中的ListView才可以接收点击事件

		// lvPopupList.setAdapter(new SimpleAdapter(GaodeMapActivity.this,
		// gaolist,
		// R.layout.list_item_popupwindow, android.R.id.text1,
		// new int[] { R.id.tv_list_item }));
		if(gaolist==null){
			return;
		}
//		Log.d(TAG, gaolist.get(1).description);
		final ArrayList<GaodeInfo> list=gaolist;		
		lvPopupList.setAdapter(new ArrayAdapter<String>(GaodeMapActivity.this,
				R.layout.list_item_popupwindow, R.id.tv_list_item,
				getDriveSchool(gaolist)));
		lvPopupList.setOnItemClickListener(new OnItemClickListener() {

			@Override
			public void onItemClick(AdapterView<?> parent, View view,
					int position, long id) {
			YokaLog.d(TAG, "定位已被加载");
				endTextView.setText(list.get(position).namedesc);
				endPoint = new LatLonPoint(Double.parseDouble(list
						.get(position).locationX), Double.parseDouble(list
						.get(position).locationY));
			}
		});

		// 控制popupwindow的宽度和高度自适应
		lvPopupList.measure(View.MeasureSpec.UNSPECIFIED,
				View.MeasureSpec.UNSPECIFIED);
		pwMyPopWindow.setHeight((lvPopupList.getMeasuredHeight() + 20)
				* gaolist.size());
		pwMyPopWindow.setWidth(lvPopupList.getMeasuredWidth());

		// 控制popupwindow点击屏幕其他地方消失
		pwMyPopWindow.setBackgroundDrawable(this.getResources().getDrawable(
				R.drawable.bg_popupwindow));// 设置背景图片，不能在布局中设置，要通过代码来设置
		pwMyPopWindow.setOutsideTouchable(true);// 触摸popupwindow外部，popupwindow消失。这个要求你的popupwindow要有背景图片才可以成功，如上
	}

	@Override
	public void onPoiSearched(PoiResult arg0, int arg1) {
		// TODO Auto-generated method stub

	}

	private ArrayList<String> getDriveSchool(ArrayList<GaodeInfo> list) {
		if (list != null) {
			ArrayList<String> nameList = new ArrayList<String>();
			for (int i = 0; i < list.size(); i++) {
				nameList.add(list.get(i).namedesc);
			}
			return nameList;
		}
		return null;
	}

	private void showDialog(GaodeInfo gaodeInfo) {
		final AlertDialog dialog = new AlertDialog.Builder(GaodeMapActivity.this)
				.create();
		dialog.show();
		Window window = dialog.getWindow();
		window.setContentView(R.layout.alertdialog);
		View view=LayoutInflater.from(GaodeMapActivity.this).inflate(R.layout.alertdialog, null);
		window.setContentView(view);
		window.setLayout(LayoutParams.FILL_PARENT, LayoutParams.WRAP_CONTENT);
		window.setGravity(Gravity.BOTTOM);
		window.setWindowAnimations(R.style.AnimBottom);
		TextView text = (TextView) window.findViewById(R.id.text);
		Button button = (Button) window.findViewById(R.id.button1);
		text.setText("学校名称："+gaodeInfo.namedesc+"\n"+"学校电话"+gaodeInfo.telphone+"\n"+"学校地址："+gaodeInfo.address+"\n"+"学校简介:"+gaodeInfo.description);
		final String id = gaodeInfo.id.equals("")?"1":gaodeInfo.id;
		view.setOnClickListener(new OnClickListener() {
			//测试方便测出传空
			@Override
			public void onClick(View arg0) {
//				Bundle bundle = new Bundle();
//				bundle.putString(TAG, id);
//				bundle.putBoolean(TAG, true);
				
				UserData.MapId=id;
				UserData.isJump=true;
//				Intent intent=new Intent();
//				intent.putExtra(TAG, id);
//				intent.setAction(ReciverContents.GaodeReciver);
//				GaodeMapActivity.this.sendBroadcast(intent);
//				finish();
				IntentUtil.activityForward(GaodeMapActivity.this, MainActivity.class, null, true);
			}
		});
	}
	
	
}
