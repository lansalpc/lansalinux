﻿/*!
	(c) 2002, 2012 LANSA
	Standard Scripts messages (JPN)
	$Workfile:: std_messages-ja.js           $
	$UTCDate:: 2012-10-18 01:13:18Z          $
	$Revision:: 24                           $
*/

if (!window.Lstd) Lstd = {};
if (!Lstd.L10N) Lstd.L10N = { lang: "ja" };
if (!Lstd.L10N.strings) Lstd.L10N.strings = {};
if (!Lstd.L10N.arrays) Lstd.L10N.arrays = {};

Lstd.L10N.strings.ja = {
	"PPCNoForm": "このﾌﾞﾗｳｻﾞは document.createElement をｻﾎﾟｰﾄしていません。呼び出しｵﾌﾞｼﾞｪｸﾄの formname ﾌﾟﾛﾊﾟﾃｨに指定されたﾌｫｰﾑが必要です。",
	"BadHidFld": "このﾌﾞﾗｳｻﾞは document.createElement をｻﾎﾟｰﾄしていません。 非表示ﾌｨｰﾙﾄﾞ %1% を事前に定義する必要があります。",
	"BadNum": "無効な数。数は整数部分が %1% 以下、小数部分が %2% 以下の桁でなければなりません。",
	"BadInt": "無効な整数です",
	"BadIntWithRange": "無効な整数です! %1% より小さな数、%2% より大きな数は無効です。",
	"BadFloat": "無効な小数値です。",
	"BadDate": "無効な日付の値です",
	"BadDate1": " 無効な日付です",
	"BlankDate": "日付にﾌﾞﾗﾝｸは認められていません。省略値として今日の日付にします。",
	"BlankDate2": "日付にﾌﾞﾗﾝｸは認められていません。",
	"BadTime": "無効な時刻の値です。",
	"BadTime1": "無効な時刻です。",
	"BlankTime": "時刻にﾌﾞﾗﾝｸは認められていません。省略値として現時刻にします。",
	"BlankTime2": "時刻にﾌﾞﾗﾝｸは認められていません!",
	"BadDateTime": "無効な日付・時間の値です。",
	"BadBool": "値が無効です\n値は\"true\" か \"false\"です。",
	"BadDBCS_TooLong": "入力された文字の変換後の長さは %1 ﾊﾞｲﾄです。\n最大長の %2 ﾊﾞｲﾄを超えています。",
	"BadDBCS_SBCSNotAllowed": "このﾌｨｰﾙﾄﾞにはDBCSのみ入力できます。%1 文字のSBCSが入力されました。",
	"BadDBCS_DBCSNotAllowed": "このﾌｨｰﾙﾄﾞにはSBCSのみ入力できます。%1 文字のDBCSが入力されました。",
	"BadDBCS_BothNotAllowed": "このﾌｨｰﾙﾄﾞにはDBCSのみ、またはSBCSのみ入力できます。%1 文字のSBCSが入力されました。%2 文字のDBCSが入力されました。",
	"BadLength1": "最大長を超えてしまいます。",
	"NoXMLHttpRequest": "このﾌﾞﾗｳｻﾞではXMLHttpRequestはｻﾎﾟｰﾄされていません。",
	"Processing1": "処理",
	"Done1": "実行",
	"Messages": "ﾒｯｾｰｼﾞ:"
}

Lstd.L10N.arrays.en = {
	"DaysOfWeek": ["月", "火", "水", "木", "金", "土", "日"],
	"DaysOfWeekLong": ["月曜日", "火曜日", "水曜日", "木曜日", "金曜日", "土曜日", "日曜日"],
	"Months": ["１月", "２月", "３月", "４月", "５月", "６月", "７月", "８月", "９月", "１０月", "１１月", "１２月"],
	"MonthsShort": ["１月", "２月", "３月", "４月", "５月", "６月", "７月", "８月", "９月", "１０月", "１１月", "１２月"]
}
