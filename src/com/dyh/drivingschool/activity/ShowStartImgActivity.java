package com.dyh.drivingschool.activity;

import java.util.ArrayList;
import java.util.zip.Inflater;

import com.dyh.drivingschool.R;
import com.dyh.drivingschool.utils.ImageLoad;
import com.dyh.drivingschool.utils.IntentUtil;
import com.facebook.internal.ImageDownloader;

import android.app.Activity;
import android.graphics.BitmapFactory;
import android.os.Bundle;
import android.os.Parcelable;
import android.support.v4.view.PagerAdapter;
import android.support.v4.view.ViewPager;
import android.support.v4.view.ViewPager.OnPageChangeListener;
import android.util.Log;
import android.view.LayoutInflater;
import android.view.View;
import android.view.View.OnClickListener;
import android.view.ViewGroup;
import android.view.ViewGroup.LayoutParams;
import android.widget.FrameLayout;
import android.widget.ImageView;
import android.widget.TextView;

public class ShowStartImgActivity extends BaseActivity implements OnClickListener {
	private ArrayList<String> imageList = new ArrayList<String>();
	private ArrayList<View> list;
	private ImageLoad imageLoad;
	private ViewPager viewPager;
	private View[] mImageViews;
	private int[] imgIdArray;

	@Override
	protected void onCreate(Bundle savedInstanceState) {
		super.onCreate(savedInstanceState);
		setContentView(R.layout.startimagelayout);
		// 没有数据
		// if (getIntent().getStringArrayListExtra(LogoActivity.TAG) != null) {
		// imageList = getIntent().getStringArrayListExtra(LogoActivity.TAG);
		// } else {
		// IntentUtil.activityForward(this, MainActivity.class, null, true);
		// }

		viewPager = (ViewPager) findViewById(R.id.viewPager);

		imgIdArray = new int[] { R.drawable.one, R.drawable.two,
				R.drawable.three };

		mImageViews = new View[imgIdArray.length];
		for (int i = 0; i < mImageViews.length-1; i++) {
			ImageView imageView = new ImageView(this);
			mImageViews[i] = imageView;
			imageView.setBackgroundResource(imgIdArray[i]);
		}
		FrameLayout frame=(FrameLayout) LayoutInflater.from(this).inflate(R.layout.item2, null);
		ImageView imageview=(ImageView) frame.findViewById(R.id.imageView1);
		imageview.setBackgroundResource(imgIdArray[2]);
		mImageViews[2]=frame;
		TextView text=(TextView) frame.findViewById(R.id.textid);
		text.setOnClickListener(this);
		viewPager.setAdapter(new MyAdapter());
		viewPager.setCurrentItem(0);

	}

	/**
	 * 
	 * @author xiaanming
	 * 
	 */
	public class MyAdapter extends PagerAdapter {

		@Override
		public int getCount() {
			return mImageViews.length;
		}

		@Override
		public boolean isViewFromObject(View arg0, Object arg1) {
			return arg0 == arg1;
		}

		@Override
		public void destroyItem(View container, int position, Object object) {
			((ViewPager) container).removeView(mImageViews[position
					% mImageViews.length]);

		}

		@Override
		public Object instantiateItem(View container, int position) {
			((ViewPager) container).addView(mImageViews[position
					% mImageViews.length], 0);
			return mImageViews[position % mImageViews.length];
		}

	}

	@Override
	public void onClick(View arg0) {
		switch (arg0.getId()) {
		case R.id.textid:
			IntentUtil.activityForward(this, MainActivity.class, null, true);
			break;

		default:
			break;
		}

	}
}