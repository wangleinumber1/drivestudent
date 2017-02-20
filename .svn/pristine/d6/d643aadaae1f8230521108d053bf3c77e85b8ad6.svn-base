package com.dyh.drivingschool.activity.adapter;

import java.util.ArrayList;

import android.app.Activity;
import android.content.Context;
import android.text.TextPaint;
import android.util.DisplayMetrics;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.view.WindowManager;
import android.view.ViewGroup.LayoutParams;
import android.widget.BaseAdapter;
import android.widget.RelativeLayout;
import android.widget.TextView;

import com.dyh.drivingschool.YmallApplication;
import com.dyh.drivingschool.utils.ScreenUtil;
import com.dyh.drivingschool.R;

public class xianxingAdapter extends BaseAdapter {
	private String[] weeks = { "周一", "周二", "周三", "周四", "周五", "公休/节假日" };
	ArrayList<String[]> messageList;
	LayoutInflater inflater;
	Activity activity;
	int with;

	public xianxingAdapter(String[] weeks, ArrayList<String[]> messageList,
			LayoutInflater inflater, Activity activity, int with) {
		super();
		this.weeks = weeks;
		this.messageList = messageList;
		this.inflater = inflater;
		this.activity = activity;
		this.with = with;
	}

	@Override
	public int getCount() {
		// TODO Auto-generated method stub
		return messageList.size();
	}

	@Override
	public Object getItem(int arg0) {
		// TODO Auto-generated method stub
		return arg0;
	}

	@Override
	public long getItemId(int arg0) {
		// TODO Auto-generated method stub
		return arg0;
	}

	@Override
	public View getView(int arg0, View convertView, ViewGroup arg2) {
		TextView textup = null, text1 = null, text2, text3 = null;
		if (convertView == null) {
			convertView = inflater.inflate(R.layout.xianxing_item, null);
		}
		text2 = (TextView) convertView.findViewById(R.id.text2);
		textup = (TextView) convertView.findViewById(R.id.textup);
		text1 = (TextView) convertView.findViewById(R.id.text1);
		text3 = (TextView) convertView.findViewById(R.id.text3);

		String[] message = messageList.get(arg0);
		if (message[0].equals("")) {
			TextPaint tp = text2.getPaint();
			tp.setFakeBoldText(true);
			text2.setText("不限行");
			text2.setTextSize(28);			
			textup.setText("公休/节假日 不限行");
		} else {
			
			textup.setText(weeks[arg0] + " 限行");
			text1.setText(message[0]);
			text1.setTextSize(40);

			text3.setText(message[1]);
			text3.setTextSize(40);
		}

		return convertView;

	}
}
