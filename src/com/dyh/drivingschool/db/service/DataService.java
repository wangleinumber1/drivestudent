package com.dyh.drivingschool.db.service;

import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.util.ArrayList;
import java.util.List;

import android.content.Context;
import android.content.res.AssetManager;
import android.database.Cursor;
import android.database.sqlite.SQLiteDatabase;
import android.util.Log;

import com.dyh.drivingschool.model.QestionBean;

public class DataService {
	
	public static String TABLENAME = "web_note";
	private SQLiteDatabase db;

	// 数据库存储路径
	String filePath = "data/data/com.dyh.drivingschool/jxedt_user.db";
	// 数据库存放的文件夹 data/data/com.main.jh 下面
	String pathStr = "data/data/com.dyh.drivingschool";
	private Cursor rawQuery;
	int i=1;
	private Cursor rawQuery2;
	private Cursor rawQuery3;
	private Cursor rawQuery5;
	private Cursor rawQuery4;
	private Cursor rawQuery6;

	public DataService(Context context) {

		db = openDatabase(context);

	}

	public SQLiteDatabase openDatabase(Context context) {
		System.out.println("filePath:" + filePath);
		File jhPath = new File(filePath);
		// 查看数据库文件是否存在
		if (jhPath.exists()) {
			Log.i("test", "存在数据库");
			// 存在则直接返回打开的数据库
			return SQLiteDatabase.openOrCreateDatabase(jhPath, null);
		} else {
			// 不存在先创建文件夹
			File path = new File(pathStr);
			Log.e("test", "pathStr=" + path);
			if (path.mkdir()) {
				Log.e("test", "创建成功");
			} else {
				Log.e("test", "创建失败");
			}
			;
			try {
				// 得到资源
				AssetManager am = context.getAssets();
				// 得到数据库的输入流
				InputStream is = am.open("jxedt_user.db");
				Log.e("test", is + "");
				// 用输出流写到SDcard上面
				FileOutputStream fos = new FileOutputStream(jhPath);
				Log.e("test", "fos=" + fos);
				Log.e("test", "jhPath=" + jhPath);
				// 创建byte数组 用于1KB写一次
				byte[] buffer = new byte[1024];
				int count = 0;
				while ((count = is.read(buffer)) > 0) {
					Log.e("test", "得到"+i);
					i++;
					fos.write(buffer, 0, count);
				}
				// 最后关闭就可以了
				fos.flush();
				fos.close();
				is.close();
			} catch (IOException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
				return null;
			}
			// 如果没有这个数据库 我们已经把他写到SD卡上了，然后在执行一次这个方法 就可以返回数据库了
			return openDatabase(context);
		}
	}

	//获取科目的条数
	public int getQueCount(int kemu){
		rawQuery2 = db.rawQuery("select count(*) from " + TABLENAME +" where kemu=?",new String[]{kemu+""} );
		try {
			
			if(rawQuery2.moveToFirst()){
				return rawQuery2.getInt(0);
			}
			
		} catch (Exception e) {
			return 0;
		}
		return 0;
	}
	
	//顺序测试查询
 	public QestionBean getQestion(int kemu,int lim) {
		rawQuery = db.rawQuery("select * from " + TABLENAME + " where kemu=? limit ?,?",new String[]{kemu+"",lim+"","1"} );
		
		try {
			if (rawQuery.moveToNext()) {
				String intNumber = rawQuery.getString(rawQuery.getColumnIndex("intNumber"));
				String qestion = rawQuery.getString(rawQuery.getColumnIndex("Question"));
				String an1 = rawQuery.getString(rawQuery.getColumnIndex("An1"));
				String an2 = rawQuery.getString(rawQuery.getColumnIndex("An2"));
				String an3 = rawQuery.getString(rawQuery.getColumnIndex("An3"));
				String an4 = rawQuery.getString(rawQuery.getColumnIndex("An4"));
				String answerTrue = rawQuery.getString(rawQuery.getColumnIndex("AnswerTrue"));
				String explain = rawQuery.getString(rawQuery.getColumnIndex("explain"));
				String type = rawQuery.getString(rawQuery.getColumnIndex("Type"));
				String sinaimg = rawQuery.getString(rawQuery.getColumnIndex("sinaimg"));
				String diff_degree = rawQuery.getString(rawQuery.getColumnIndex("diff_degree"));
				String sxAnsState = rawQuery.getString(rawQuery.getColumnIndex("SxAnsState"));
 				String sxAnsChoose = rawQuery.getString(rawQuery.getColumnIndex("SxAnsChoose"));
 				String zjAnsState = rawQuery.getString(rawQuery.getColumnIndex("ZjAnsState"));
 				String zjAnsChoose = rawQuery.getString(rawQuery.getColumnIndex("ZjAnsChoose"));
				return new QestionBean(intNumber, qestion, an1, an2, an3, an4, answerTrue, explain, type, sinaimg, diff_degree, sxAnsState, sxAnsChoose, zjAnsState, zjAnsChoose);
			}else{
				return null;
			}
		} catch (Exception e) {
			return null;
		}

	}
 	
 	//章节测试查询
 	public QestionBean getQestionByZj(int kemu,int chapterid,int lim) {
 		rawQuery5 = db.rawQuery("select * from " + TABLENAME + " where kemu=? and chapterid=? limit ?,?",new String[]{kemu+"",chapterid+"",lim+"","1"} );
 		
 		try {
 			if (rawQuery5.moveToNext()) {
 				String intNumber = rawQuery5.getString(rawQuery5.getColumnIndex("intNumber"));
 				String qestion = rawQuery5.getString(rawQuery5.getColumnIndex("Question"));
 				String an1 = rawQuery5.getString(rawQuery5.getColumnIndex("An1"));
 				String an2 = rawQuery5.getString(rawQuery5.getColumnIndex("An2"));
 				String an3 = rawQuery5.getString(rawQuery5.getColumnIndex("An3"));
 				String an4 = rawQuery5.getString(rawQuery5.getColumnIndex("An4"));
 				String answerTrue = rawQuery5.getString(rawQuery5.getColumnIndex("AnswerTrue"));
 				String explain = rawQuery5.getString(rawQuery5.getColumnIndex("explain"));
 				String type = rawQuery5.getString(rawQuery5.getColumnIndex("Type"));
 				String sinaimg = rawQuery5.getString(rawQuery5.getColumnIndex("sinaimg"));
 				String diff_degree = rawQuery5.getString(rawQuery5.getColumnIndex("diff_degree"));
 				String sxAnsState = rawQuery5.getString(rawQuery5.getColumnIndex("SxAnsState"));
 				String sxAnsChoose = rawQuery5.getString(rawQuery5.getColumnIndex("SxAnsChoose"));
 				String zjAnsState = rawQuery5.getString(rawQuery5.getColumnIndex("ZjAnsState"));
 				String zjAnsChoose = rawQuery5.getString(rawQuery5.getColumnIndex("ZjAnsChoose"));
 				
 				return new QestionBean(intNumber, qestion, an1, an2, an3, an4, answerTrue, explain, type, sinaimg, diff_degree, sxAnsState, sxAnsChoose, zjAnsState, zjAnsChoose);
 			}else{
 				return null;
 			}
 		} catch (Exception e) {
 			return null;
 		}
 		
 	}
 	
 	//模拟测试
 	public List<QestionBean> getQueTest(int kemu,int lim){
 		List<QestionBean> list=new ArrayList<QestionBean>();
 		
 		rawQuery3 = db.rawQuery("select * from " + TABLENAME + " where kemu=? limit ?,?",new String[]{kemu+"",lim+"","100"} );
		
		try {
			while(rawQuery3.moveToNext()) {
				String intNumber = rawQuery3.getString(rawQuery3.getColumnIndex("intNumber"));
				String qestion = rawQuery3.getString(rawQuery3.getColumnIndex("Question"));
				String an1 = rawQuery3.getString(rawQuery3.getColumnIndex("An1"));
				String an2 = rawQuery3.getString(rawQuery3.getColumnIndex("An2"));
				String an3 = rawQuery3.getString(rawQuery3.getColumnIndex("An3"));
				String an4 = rawQuery3.getString(rawQuery3.getColumnIndex("An4"));
				String answerTrue = rawQuery3.getString(rawQuery3.getColumnIndex("AnswerTrue"));
				String explain = rawQuery3.getString(rawQuery3.getColumnIndex("explain"));
				String type = rawQuery3.getString(rawQuery3.getColumnIndex("Type"));
				String sinaimg = rawQuery3.getString(rawQuery3.getColumnIndex("sinaimg"));
				String diff_degree = rawQuery3.getString(rawQuery3.getColumnIndex("diff_degree"));
				String examAnsState = rawQuery3.getString(rawQuery3.getColumnIndex("examAnsState"));
				String examAnsChoose = rawQuery3.getString(rawQuery3.getColumnIndex("examAnsChoose"));
				
				QestionBean q=new QestionBean(intNumber,qestion, an1, an2, an3, an4, answerTrue, explain, type,
						sinaimg, diff_degree,examAnsState,examAnsChoose);
			
				list.add(q);
			}
			
			return list;
		} catch (Exception e) {
			return null;
		}
		
 	}

 	//修改数据
 	public void setExamAnsChoose(String examAnsChoose,String intNumber){
 		String sql="update "+TABLENAME+" set examAnsChoose='"+examAnsChoose+"' where intNumber='"+intNumber+"'";
 		db.execSQL(sql);
 	}
 	
 	//修改数据
 	public void setExamAnsState(String examAnsState,String intNumber){
 		String sql="update "+TABLENAME+" set examAnsState='"+examAnsState+"' where intNumber='"+intNumber+"'";
 		db.execSQL(sql);
 	}
 	
 	//放弃考试修改数据
 	public void setExamState(String examAnsState,String examAnsChoose){
 		String sql="update "+TABLENAME+" set examAnsState=?,examAnsChoose=?" ;
 		db.execSQL(sql,new String[]{examAnsState,examAnsChoose});
 	}
 	
 	//模拟测试
 	 	public List<QestionBean> getExamWro(int kemu){
 	 		List<QestionBean> list=new ArrayList<QestionBean>();
 	 		
 	 		rawQuery6 = db.rawQuery("select * from " + TABLENAME + " where kemu=? and examAnsState='1'",new String[]{kemu+""} );
 			
 			try {
 				while(rawQuery6.moveToNext()) {
 					String intNumber = rawQuery6.getString(rawQuery6.getColumnIndex("intNumber"));
 					String qestion = rawQuery6.getString(rawQuery6.getColumnIndex("Question"));
 					String an1 = rawQuery6.getString(rawQuery6.getColumnIndex("An1"));
 					String an2 = rawQuery6.getString(rawQuery6.getColumnIndex("An2"));
 					String an3 = rawQuery6.getString(rawQuery6.getColumnIndex("An3"));
 					String an4 = rawQuery6.getString(rawQuery6.getColumnIndex("An4"));
 					String answerTrue = rawQuery6.getString(rawQuery6.getColumnIndex("AnswerTrue"));
 					String explain = rawQuery6.getString(rawQuery6.getColumnIndex("explain"));
 					String type = rawQuery6.getString(rawQuery6.getColumnIndex("Type"));
 					String sinaimg = rawQuery6.getString(rawQuery6.getColumnIndex("sinaimg"));
 					String diff_degree = rawQuery6.getString(rawQuery6.getColumnIndex("diff_degree"));
 					String examAnsState = rawQuery6.getString(rawQuery6.getColumnIndex("examAnsState"));
 					String examAnsChoose = rawQuery6.getString(rawQuery6.getColumnIndex("examAnsChoose"));
 					
 					QestionBean q=new QestionBean(intNumber,qestion, an1, an2, an3, an4, answerTrue, explain, type,
 							sinaimg, diff_degree,examAnsState,examAnsChoose);
 				
 					list.add(q);
 				}
 				
 				return list;
 			} catch (Exception e) {
 				return null;
 			}
 			
 	 	}
 	
 	//获取考试答题的条数
 	public int getExamCount(int kemu,int trues){
 		rawQuery4 = db.rawQuery("select count(*) from " + TABLENAME +" where kemu=? and examAnsState=?",
 				new String[]{kemu+"",trues+""} );
 		try {
 				
 			if(rawQuery4.moveToFirst()){
 				return rawQuery4.getInt(0);
 			}
 				
 		} catch (Exception e) {
 			return 0;
 		}
 		return 0;
 		}
 	
 	public void close(){
		if(rawQuery!=null){
			rawQuery.close();
		}
		if(rawQuery2!=null){
			rawQuery2.close();
		}
		if(rawQuery3!=null){
			rawQuery3.close();
		}
		if(rawQuery4!=null){
			rawQuery4.close();
		}
		
		if(rawQuery5!=null){
			rawQuery5.close();
		}
		if(rawQuery6!=null){
			rawQuery6.close();
		}
		if(db!=null){
			db.close();
		}
	}
	
}
