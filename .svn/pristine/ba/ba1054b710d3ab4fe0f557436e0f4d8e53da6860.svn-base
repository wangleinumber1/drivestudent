package com.dyh.drivingschool.model;

import java.io.Serializable;

public class QestionBean implements Serializable {

	public String intNumber;
	public String qestion;//问题
	public String an1;
	public String an2;
	public String an3;
	public String an4;
	public String answerTrue;//正确答案
	public String explain;//解析
	public String type;//1:判断题；2：选择题
	public String sinaimg;//图片
	public String diff_degree;//难易程度

	public String examAnsState;//考试状态；null:未答；0：正确；1:不正确
	public String examAnsChoose;//考试选择：1,2,3,4
	
	public String SxAnsState;//顺序答题状态：null：未答；0：正确；1:不正确
	public String SxAnsChoose;//顺序答题选择：1,2,3,4
	
	public String ZjAnsState;//章节答题状态：null：未答；0：正确；1:不正确
	public String ZjAnsChoose;//章节答题选择：1,2,3,4
	
	

	public QestionBean(String intNumber, String qestion, String an1,
			String an2, String an3, String an4, String answerTrue,
			String explain, String type, String sinaimg, String diff_degree,
			String sxAnsState, String sxAnsChoose, String zjAnsState,
			String zjAnsChoose) {
		super();
		this.intNumber = intNumber;
		this.qestion = qestion;
		this.an1 = an1;
		this.an2 = an2;
		this.an3 = an3;
		this.an4 = an4;
		this.answerTrue = answerTrue;
		this.explain = explain;
		this.type = type;
		this.sinaimg = sinaimg;
		this.diff_degree = diff_degree;
		SxAnsState = sxAnsState;
		SxAnsChoose = sxAnsChoose;
		ZjAnsState = zjAnsState;
		ZjAnsChoose = zjAnsChoose;
	}



	//考试
	public QestionBean(String intNumber,String qestion, String an1, String an2, String an3,
			String an4, String answerTrue, String explain, String type,
			String sinaimg, String diff_degree, String examAnsState,
			String examAnsChoose) {
		super();
		this.intNumber = intNumber;
		this.qestion = qestion;
		this.an1 = an1;
		this.an2 = an2;
		this.an3 = an3;
		this.an4 = an4;
		this.answerTrue = answerTrue;
		this.explain = explain;
		this.type = type;
		this.sinaimg = sinaimg;
		this.diff_degree = diff_degree;
		this.examAnsState = examAnsState;
		this.examAnsChoose = examAnsChoose;
	}
	
}
