package com.dyh.drivingschool.db.service;

import java.util.ArrayList;

import com.dyh.drivingschool.model.ChapterObject;
import com.dyh.drivingschool.model.Web_NoteObject;

import android.database.Cursor;
import android.database.sqlite.SQLiteDatabase;
import android.provider.ContactsContract.Contacts.Data;

public class DbService {
	// 章节表名
	private static final String ChapterName = "Chapter";
	private static final String web_note = "Web_note";

	public ArrayList DbtoChapterObject(SQLiteDatabase db) {
		ArrayList<ChapterObject> chapterList = new ArrayList<ChapterObject>();
		try {

			Cursor c = null;
			c = db.query(ChapterName, null, null, new String[] { "id", "mid",
					"Str", "Fid", "kemu", "counts" }, null, null, null, null);

			while (c != null && c.moveToNext()) {
				ChapterObject chapter = new ChapterObject();
				chapter.counts = c.getInt(c.getColumnIndex("counts"));
				chapter.Fid = c.getInt(c.getColumnIndex("Fid"));
				chapter.counts = c.getInt(c.getColumnIndex("counts"));
				chapter.Str = c.getString(c.getColumnIndex("Str"));
				chapter.kemu = c.getInt(c.getColumnIndex("kemu"));
				chapter.mid = c.getInt(c.getColumnIndex("mid"));
				chapter.id = c.getInt(c.getColumnIndex("id"));
				chapterList.add(chapter);

			}
			if (c != null)
				c.close();
			return chapterList;
		} catch (Exception e) {

			return null;
		}
	}

	public ArrayList DbtoWeb_noteObject(SQLiteDatabase db) {
		ArrayList<Web_NoteObject> Web_NoteObjectList = new ArrayList<Web_NoteObject>();
		try {

			Cursor c = null;
			c = db.query(web_note, null, null, new String[] { "ID", "Type",
					"intNumber", "strTppe", "strType_l", "LicenseType",
					"Question", "An1", "An2", "An3", "An4", "An5", "An6",
					"An7", "AnswerTrue", "explain", "BestAnswerId", "kemu",
					"jieshi_from", "moretypes", "chapterid", "sinaimg",
					"video_url", "diff_degree" }, null, null, null, null);

			while (c != null && c.moveToNext()) {
				Web_NoteObject web_note = new Web_NoteObject();
				web_note.ID = c.getInt(c.getColumnIndex("ID"));
				web_note.Type = c.getInt(c.getColumnIndex("Type"));
				web_note.intnumber = c.getInt(c.getColumnIndex("intNumber"));
				web_note.strTppe = c.getInt(c.getColumnIndex("strTppe"));
				web_note.strtype_l = c.getInt(c.getColumnIndex("strType_l"));
				web_note.LicenseType = c.getString(c
						.getColumnIndex("LicenseType"));
				web_note.Question = c.getString(c.getColumnIndex("Question"));
				web_note.An1 = c.getString(c.getColumnIndex("An1"));
				web_note.An2 = c.getString(c.getColumnIndex("An2"));
				web_note.An3 = c.getString(c.getColumnIndex("An3"));
				web_note.An4 = c.getString(c.getColumnIndex("An4"));
				web_note.An5 = c.getString(c.getColumnIndex("An5"));
				web_note.An6 = c.getString(c.getColumnIndex("An6"));
				web_note.An7 = c.getString(c.getColumnIndex("An7"));
				web_note.Answertrue = c.getInt(c.getColumnIndex("AnswerTrue"));
				web_note.explain = c.getString(c.getColumnIndex("explain"));
				web_note.BestAnswerId = c.getString(c
						.getColumnIndex("BestAnswerId"));
				web_note.jiashi_form = c.getString(c
						.getColumnIndex("jieshi_from"));
				web_note.kemu = c.getString(c.getColumnIndex("kemu"));
				web_note.moretypes = c.getString(c.getColumnIndex("moretypes"));
				web_note.chapterid = c.getInt(c.getColumnIndex("chapterid"));
				web_note.kemu = c.getString(c.getColumnIndex("kemu"));
				web_note.moretypes = c.getString(c.getColumnIndex("moretypes"));
				web_note.chapterid = c.getInt(c.getColumnIndex("chapterid"));
				web_note.sinaimg = c.getString(c.getColumnIndex("sinaimg"));
				web_note.video_url = c.getString(c.getColumnIndex("video_url"));
				web_note.diff_deegree = c.getInt(c
						.getColumnIndex("diff_degree"));

				Web_NoteObjectList.add(web_note);

			}
			if (c != null)
				c.close();
			return Web_NoteObjectList;
		} catch (Exception e) {

			return null;
		}
	}

}
