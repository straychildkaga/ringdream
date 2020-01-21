var csvArray = new Array();
var newarr = new Array();

var IDX_DATE=0;
var IDX_TAIKAI=1;
var IDX_NAME=2;
var IDX_LINK=3;
var IDX_NUM=4;
var IDX_TITLE=5;
var IDX_TYPE=6;
var IDX_WIN1=7;
var IDX_WIN2=8;
var IDX_WIN3=9;
var IDX_WIN4=10;
var IDX_LOSE1=11;
var IDX_LOSE2=12;
var IDX_LOSE3=13;
var IDX_LOSE4=14;
var IDX_LINK2=15;
var IDX_LINK3=16;

var IDX_WING1=17;
var IDX_WING2=18;
var IDX_WING3=19;
var IDX_WING4=20;
var IDX_LOSEG1=21;
var IDX_LOSEG2=22;
var IDX_LOSEG3=23;
var IDX_LOSEG4=24;

function getFile() {
// 引っ張ってきたいサイトのURL
//var stamp= new Date().milliseconds;	2017-03-08
var stamp= new Date().getTime();
  url = 'http://www.me.ccnw.ne.jp/~ac42616/data/7warsdata.csv?stamp='+stamp;
  $.get(url, function(csvData){
    var tempArray = csvData;
    if(typeof csvData.responseText != "undefined")
    {
      tempArray = csvData.responseText.split("\n");
    }
    else
    {
      tempArray = csvData.split("\n");
    }
    var cnt=0;
    for(var i = 1; i<tempArray.length-1;i++){
      /*i=0はタイトル,ラストはbodyタグなので飛ばす*/
      if(trim(tempArray[i])!="")
      {
        csvArray[cnt] = tempArray[i].split(",");
        cnt=cnt+1;
      }
    }
    match_search();  });
}
function getJSONP()
{	//2019年対応
	var stamp= new Date().getTime();
	url = 'https://straychildkaga.github.io/ringdream/7warsdata.js?stamp='+stamp;

 	$.ajax({
		type:"GET",
		url:url,
		dataType:"jsonp",
//		jsonp : "callback7wars",
		jsonpCallback:"callback",
//		format:"json",
		timeout:5000
	})
	.done(function(csvData){
		var cnt=0;
		for(var i = 1; i<csvData.length;i++){
			if(csvData[i]!="")
			{
				csvArray[cnt] = csvData[i];
				cnt=cnt+1;
			}
		}
		match_searchJSONP();
//		document.getElementById("readflg").value="1";
	})
	.fail(function(jqXHR,textStatus,errorThrown){
	  console.log('['+textStatus+'] ');
	  console.log(errorThrown);
	});
}
function getCSVFile() {
    var xhr = new XMLHttpRequest();
    xhr.onload = function() {
    createArray(xhr.responseText);
    };
 
    xhr.open("get", "http://www.me.ccnw.ne.jp/~ac42616/data/7warsdata.csv", true);
    xhr.send(null);
}
 
function createXMLHttpRequest() {
    var XMLhttpObject = null;
    XMLhttpObject = new XMLHttpRequest();
    return XMLhttpObject;
}
 
function createArray(csvData) {

    var tempArray = csvData.split("\n");
    var cnt=0;
    for(var i = 1; i<tempArray.length;i++){
      /*i=0はタイトルなので飛ばす*/
      if(trim(tempArray[i])!="")
      {
        csvArray[cnt] = tempArray[i].split(",");
        cnt=cnt+1;
      }
    }
    match_search();
}

function match_searchJSONP() {
    document.getElementById("data_list").innerHTML="";
    var taikai="";
    var year="";
    var txt="";
    for(var i = 0; i<csvArray.length;i++){
//絞り込み
      if(csvArray[i].field_4==2)
      {//シングル
        if(!document.getElementById("num_2").checked){continue;}
      }
      else if(csvArray[i].field_4==4)
      {//タッグ
        if(!document.getElementById("num_4").checked){continue;}
      }
      else if(csvArray[i].field_4==6)
      {//6人タッグ 
        if(!document.getElementById("num_6").checked){continue;}
      }
      else if(csvArray[i].field_4==8)
      {//8人タッグ 
        if(!document.getElementById("num_8").checked){continue;}
      }
      else if(csvArray[i].field_4=="変則")
      {//変則マッチ
        if(!document.getElementById("num_other").checked){continue;}
      }

      if(csvArray[i].field_6=="7連戦")
      {//7連戦
        if(!document.getElementById("game_7").checked){continue;}
      }
      else if(csvArray[i].field_6=="スペシャルワンマッチ")
      {//スペシャルワンマッチ
        if(!document.getElementById("game_1").checked){continue;}
      }
      else if(csvArray[i].field_6=="チャレンジマッチ")
      {//チャレンジマッチ
        if(!document.getElementById("game_chare").checked){continue;}
      }

      if(csvArray[i].field_5=="TWPシングル")
      {//TWPシングル
        if(!document.getElementById("title_twp2").checked){continue;}
      }
      else if(csvArray[i].field_5=="TWPタッグ")
      {//TWPタッグ
        if(!document.getElementById("title_twp4").checked){continue;}
      }
      else if(csvArray[i].field_5=="セヴンスター")
      {//セヴンスター
        if(!document.getElementById("title_7").checked){continue;}
      }
      else if(csvArray[i].field_5=="KOM")
      {//KOM
        if(!document.getElementById("title_kom").checked){continue;}
      }
//2018-07-31 ADD
      else if(csvArray[i].field_5=="女神杯")
      {//女神杯
        if(!document.getElementById("title_venus").checked){continue;}
      }
//2018-07-31 ADD
//2018-08-05 ADD
      else if(csvArray[i].field_5=="女神杯＆TWPシングル")
      {//女神杯＆TWPシングル
        if((!document.getElementById("title_twp2").checked) && (!document.getElementById("title_venus").checked)){continue;}
      }
//2018-08-05 ADD
      else if(csvArray[i].field_5=="FWWWシングル")
      {//FWWWシングル
        if(!document.getElementById("title_fwww2").checked){continue;}
      }
      else if(csvArray[i].field_5=="FWWWタッグ")
      {//FWWWタッグ
        if(!document.getElementById("title_fwww4").checked){continue;}
      }
      else if(csvArray[i].field_5=="")
      {//ノンタイトル
        if(!document.getElementById("title_none").checked){continue;}
      }

//2019-01-19 ADD 年絞り込み
      var chkyear =csvArray[i].field_0.substring(0,4);
      var idyear = "year"+chkyear;
      if(!document.getElementById(idyear).checked){continue;}

//画面への表示
      if(year!=csvArray[i].field_0.substring(0,4))
      {
        year=csvArray[i].field_0.substring(0,4);
        if(txt!="")
        {
          txt+="</table>";
        }
        txt+=year+"年<br>";
        txt+="<table style='font-size: 70%' width='100%' border=1>";
      }
      if(csvArray[i].field_6=="スペシャルワンマッチ")
      {
          taikai=csvArray[i].field_1;
          txt+="<tr bgcolor='blue'><td colspan=3><font color='white'><B>スペシャルワンマッチ ("+csvArray[i].field_0+"まで)</B></font></td></tr>";
      }
      else
      {
        var color="red";
        if(csvArray[i].field_6=="チャレンジマッチ")
        {
          color="orange";
        }
        if(i==0)
        {
          taikai=csvArray[i].field_1;
          txt+="<tr bgcolor='"+color+"'><td colspan=3><font color='white'><B>"+taikai+" ("+csvArray[i].field_0+"まで)</B></font></td></tr>";
        }
        else if(csvArray[i].field_1!=taikai)
        {
          taikai=csvArray[i].field_1;
          txt+="<tr bgcolor='"+color+"'><td colspan=3><font color='white'><B>"+taikai+" ("+csvArray[i].field_0+"まで)</B></font></td></tr>";
        }
      }
      var title_flg=0;
      var namebuf=csvArray[i].field_2;
      if(trim(csvArray[i].field_5)!="")
      {
        namebuf+="("+csvArray[i].field_5+")";
        title_flg=1;
      }
      txt+="<tr><td><a href='http://straychild.hatenadiary.com/entry/"+csvArray[i].field_3+"' target='_blank'>"+bold_check(title_flg,namebuf)+"</a></td>";
      if(csvArray[i].field_15!="")
      {
	      txt+="<td align='center' width=50><a href='http://straychild.hatenadiary.com/entry/"+csvArray[i].field_15+"' target='_blank'>後日談</a></td>";
      }
      else
      {
	      txt+="<td width=50>&nbsp;</td>";
      }
      if(csvArray[i].field_16!="")
      {
	      txt+="<td align='center' width=50><a href='http://straychild.hatenadiary.com/entry/"+csvArray[i].field_16+"' target='_blank'>後日談2</a></td>";
      }
      else
      {
	      txt+="<td width=50>&nbsp;</td>";
      }
      txt+="</tr>";
    }
    if(txt!="")
    {
      txt+="</table>";
    }
    document.getElementById("data_list").innerHTML=txt;
}
function win_searchJSONP(flg) {
//	if(document.getElementById("readflg").value!="1")
//	{
//		getJSONP();
//	}
    document.getElementById("data_list").innerHTML="";
    var taikai="";
    var txt="<table style='font-size: 70%' width='100%' border=1>";
    var idx=0;
    newarr = new Array();
//絞り込み
    for(var i = 0; i<csvArray.length;i++){
      if(csvArray[i].field_4==2)
      {//シングル
        if(!document.getElementById("num_2").checked){continue;}
      }
      else if(csvArray[i].field_4==4)
      {//タッグ
        if(!document.getElementById("num_4").checked){continue;}
      }
      else if(csvArray[i].field_4==6)
      {//6人タッグ 
        if(!document.getElementById("num_6").checked){continue;}
      }
      else if(csvArray[i].field_4==8)
      {//8人タッグ 
        if(!document.getElementById("num_8").checked){continue;}
      }
      else if(csvArray[i].field_4=="変則")
      {//変則マッチ
        if(!document.getElementById("num_other").checked){continue;}
      }

      if(csvArray[i].field_6=="7連戦")
      {//7連戦
        if(!document.getElementById("game_7").checked){continue;}
      }
      else if(csvArray[i].field_6=="スペシャルワンマッチ")
      {//スペシャルワンマッチ
        if(!document.getElementById("game_1").checked){continue;}
      }
      else if(csvArray[i].field_6=="チャレンジマッチ")
      {//チャレンジマッチ
        if(!document.getElementById("game_chare").checked){continue;}
      }

      if(csvArray[i].field_5=="TWPシングル")
      {//TWPシングル
        if(!document.getElementById("title_twp2").checked){continue;}
      }
      else if(csvArray[i].field_5=="TWPタッグ")
      {//TWPタッグ
        if(!document.getElementById("title_twp4").checked){continue;}
      }
      else if(csvArray[i].field_5=="セヴンスター")
      {//セヴンスター
        if(!document.getElementById("title_7").checked){continue;}
      }
      else if(csvArray[i].field_5=="KOM")
      {//KOM
        if(!document.getElementById("title_kom").checked){continue;}
      }
//2018-07-31 ADD
      else if(csvArray[i].field_5=="女神杯")
      {//女神杯
        if(!document.getElementById("title_venus").checked){continue;}
      }
//2018-07-31 ADD
//2018-08-05 ADD
      else if(csvArray[i].field_5=="女神杯＆TWPシングル")
      {//女神杯＆TWPシングル
        if((!document.getElementById("title_twp2").checked) && (!document.getElementById("title_venus").checked)){continue;}
      }
//2018-08-05 ADD
      else if(csvArray[i].field_5=="FWWWシングル")
      {//FWWWシングル
        if(!document.getElementById("title_fwww2").checked){continue;}
      }
      else if(csvArray[i].field_5=="FWWWタッグ")
      {//FWWWタッグ
        if(!document.getElementById("title_fwww4").checked){continue;}
      }
      else if(csvArray[i].field_5=="")
      {//ノンタイトル
        if(!document.getElementById("title_none").checked){continue;}
      }

//2019-01-19 ADD 年絞り込み
      var chkyear =csvArray[i].field_0.substring(0,4);
      var idyear = "year"+chkyear;
      if(!document.getElementById(idyear).checked){continue;}

      newarr[idx] = csvArray[i];
      idx=idx+1;
    }

//勝敗数を別配列で管理[選手名,インデックス,勝,負]
    var winarr = new Array();
    var win_idx=0;
    if(document.getElementById("disp_group").checked)
    {	//2019-01-20 グループ対応
        for(var i = 0;i<newarr.length;i++){
          var lose1_set=false;
          var lose2_set=false;
          var lose3_set=false;
          var lose4_set=false;
          if(trim(newarr[i].field_17)!="")
          {
            winarr[win_idx] = [newarr[i].field_17,i,1,0];
            if( trim(newarr[i].field_17)==trim(newarr[i].field_21) )
            {
              lose1_set = true;
              winarr[win_idx] = [newarr[i].field_17,i,1,1];
            }
            else if( trim(newarr[i].field_17)==trim(newarr[i].field_22) )
            {
              lose2_set = true;
              winarr[win_idx] = [newarr[i].field_17,i,1,1];
            }
            else if( trim(newarr[i].field_17)==trim(newarr[i].field_23) )
            {
              lose3_set = true;
              winarr[win_idx] = [newarr[i].field_17,i,1,1];
            }
            else if( trim(newarr[i].field_17)==trim(newarr[i].field_24) )
            {
              lose4_set = true;
              winarr[win_idx] = [newarr[i].field_17,i,1,1];
            }
            win_idx=win_idx+1;
          }
          if(trim(newarr[i].field_18)!="")
          {
            winarr[win_idx] = [newarr[i].field_18,i,1,0];
            if( trim(newarr[i].field_18)==trim(newarr[i].field_21) )
            {
              lose1_set = true;
              winarr[win_idx] = [newarr[i].field_18,i,1,1];
            }
            else if( trim(newarr[i].field_18)==trim(newarr[i].field_22) )
            {
              lose2_set = true;
              winarr[win_idx] = [newarr[i].field_18,i,1,1];
            }
            else if( trim(newarr[i].field_18)==trim(newarr[i].field_23) )
            {
              lose3_set = true;
              winarr[win_idx] = [newarr[i].field_18,i,1,1];
            }
            else if( trim(newarr[i].field_18)==trim(newarr[i].field_24) )
            {
              lose4_set = true;
              winarr[win_idx] = [newarr[i].field_18,i,1,1];
            }
            win_idx=win_idx+1;
          }
          if(trim(newarr[i].field_19)!="")
          {
            winarr[win_idx] = [newarr[i].field_19,i,1,0];
            if( trim(newarr[i].field_19)==trim(newarr[i].field_21) )
            {
              lose1_set = true;
              winarr[win_idx] = [newarr[i].field_19,i,1,1];
            }
            else if( trim(newarr[i].field_19)==trim(newarr[i].field_22) )
            {
              lose2_set = true;
              winarr[win_idx] = [newarr[i].field_19,i,1,1];
            }
            else if( trim(newarr[i].field_19)==trim(newarr[i].field_23) )
            {
              lose3_set = true;
              winarr[win_idx] = [newarr[i].field_19,i,1,1];
            }
            else if( trim(newarr[i].field_19)==trim(newarr[i].field_24) )
            {
              lose4_set = true;
              winarr[win_idx] = [newarr[i].field_19,i,1,1];
            }
            win_idx=win_idx+1;
          }
          if(trim(newarr[i].field_20)!="")
          {
            winarr[win_idx] = [newarr[i].field_20,i,1,0];
            if( trim(newarr[i].field_20)==trim(newarr[i].field_21) )
            {
              lose1_set = true;
              winarr[win_idx] = [newarr[i].field_20,i,1,1];
            }
            else if( trim(newarr[i].field_20)==trim(newarr[i].field_22) )
            {
              lose2_set = true;
              winarr[win_idx] = [newarr[i].field_20,i,1,1];
            }
            else if( trim(newarr[i].field_20)==trim(newarr[i].field_23) )
            {
              lose3_set = true;
              winarr[win_idx] = [newarr[i].field_20,i,1,1];
            }
            else if( trim(newarr[i].field_20)==trim(newarr[i].field_24) )
            {
              lose4_set = true;
              winarr[win_idx] = [newarr[i].field_20,i,1,1];
            }
            win_idx=win_idx+1;
          }
          if(lose1_set==false && trim(newarr[i].field_21)!="")
          {
            winarr[win_idx] = [newarr[i].field_21,i,0,1];
            win_idx=win_idx+1;
          }
          if(lose2_set==false && trim(newarr[i].field_22)!="")
          {
            winarr[win_idx] = [newarr[i].field_22,i,0,1];
            win_idx=win_idx+1;
          }
          if(lose3_set==false && trim(newarr[i].field_23)!="")
          {
            winarr[win_idx] = [newarr[i].field_23,i,0,1];
            win_idx=win_idx+1;
          }
          if(lose4_set==false && trim(newarr[i].field_24)!="")
          {
            winarr[win_idx] = [newarr[i].field_24,i,0,1];
            win_idx=win_idx+1;
          }
        }
    }
    else
    {
        for(var i = 0;i<newarr.length;i++){
          if(trim(newarr[i].field_7)!="")
          {
            winarr[win_idx] = [newarr[i].field_7,i,1,0];
            win_idx=win_idx+1;
          }
          if(trim(newarr[i].field_8)!="")
          {
            winarr[win_idx] = [newarr[i].field_8,i,1,0];
            win_idx=win_idx+1;
          }
          if(trim(newarr[i].field_9)!="")
          {
            winarr[win_idx] = [newarr[i].field_9,i,1,0];
            win_idx=win_idx+1;
          }
          if(trim(newarr[i].field_10)!="")
          {
            winarr[win_idx] = [newarr[i].field_10,i,1,0];
            win_idx=win_idx+1;
          }
          if(trim(newarr[i].field_11)!="")
          {
            winarr[win_idx] = [newarr[i].field_11,i,0,1];
            win_idx=win_idx+1;
          }
          if(trim(newarr[i].field_12)!="")
          {
            winarr[win_idx] = [newarr[i].field_12,i,0,1];
            win_idx=win_idx+1;
          }
          if(trim(newarr[i].field_13)!="")
          {
            winarr[win_idx] = [newarr[i].field_13,i,0,1];
            win_idx=win_idx+1;
          }
          if(trim(newarr[i].field_14)!="")
          {
            winarr[win_idx] = [newarr[i].field_14,i,0,1];
            win_idx=win_idx+1;
          }
        }
    }

    var counts = new Array();
    var idxarr = new Array();
    //counts[選手名]=[勝ち数,負け数]
    //idxarr[選手名]=[インデックス1,インデックス2...]
    for(var i=0;i< winarr.length;i++)
    {
      var key = winarr[i][0];
      counts[key] = (counts[key])? [counts[key][0] + winarr[i][2],counts[key][1] + winarr[i][3] ]: [winarr[i][2],winarr[i][3] ];
      if(idxarr[key])
      {
        idxarr[key].push(winarr[i][1]);
      }
      else
      {
        idxarr[key]=[winarr[i][1]];
      }
    }
    if(flg==1||flg==4)
    {
      //勝利数ソート
      if(flg==1)
      {
        counts=win_sort(counts,0);
      }
      else
      {
        counts=win_sort(counts,1);
      }
      for(keyname in counts){
        txt+="<tr bgcolor='#ffaeff'><td colspan=3><B>"+keyname+" "+counts[keyname][0]+"-"+counts[keyname][1]+"</B></td></tr>";
        for(var j=0;j<idxarr[keyname].length;j++)
        {
          var title_flg=0;
          var namebuf=newarr[idxarr[keyname][j]].field_2;
          if(trim(newarr[idxarr[keyname][j]].field_5)!="")
          {
            namebuf+="("+newarr[idxarr[keyname][j]].field_5+")";
            title_flg=1;
          }
          if(newarr[idxarr[keyname][j]].field_6=="スペシャルワンマッチ")
          {
            namebuf+="[ワンマッチ]";
          }
          else if(newarr[idxarr[keyname][j]].field_6=="チャレンジマッチ")
          {
            namebuf+="[チャレンジマッチ]";
          }

         if(document.getElementById("disp_group").checked)
          { //2019-01-20 グループ対応
              var mark="×";
              if(newarr[idxarr[keyname][j]].field_17==keyname||newarr[idxarr[keyname][j]].field_18==keyname||newarr[idxarr[keyname][j]].field_19==keyname||newarr[idxarr[keyname][j]].field_20==keyname)
              {
                mark="○";
                if(newarr[idxarr[keyname][j]].field_21==keyname||newarr[idxarr[keyname][j]].field_22==keyname||newarr[idxarr[keyname][j]].field_23==keyname||newarr[idxarr[keyname][j]].field_24==keyname)
                {
                  mark+="×";
                }
              }
          }
          else
          {
              var mark="×";
              if(newarr[idxarr[keyname][j]].field_7==keyname||newarr[idxarr[keyname][j]].field_8==keyname||newarr[idxarr[keyname][j]].field_9==keyname||newarr[idxarr[keyname][j]].field_10==keyname)
              {
                mark="○";
              }
          }
          txt+="<tr><td>"+mark+"&nbsp;<a href='http://straychild.hatenadiary.com/entry/"+newarr[idxarr[keyname][j]].field_3+"' target='_blank'>"+bold_check(title_flg,namebuf)+"</a></td>";
          if(newarr[idxarr[keyname][j]].field_15!="")
          {
            txt+="<td align='center' width=50><a href='http://straychild.hatenadiary.com/entry/"+newarr[idxarr[keyname][j]].field_15+"' target='_blank'>後日談</a></td>";
          }
          else
          {
            txt+="<td width=50>&nbsp;</td>";
          }
          if(newarr[idxarr[keyname][j]].field_16!="")
          {
            txt+="<td align='center' width=50><a href='http://straychild.hatenadiary.com/entry/"+newarr[idxarr[keyname][j]].field_16+"' target='_blank'>後日談2</a></td>";
          }
          else
          {
            txt+="<td width=50>&nbsp;</td>";
          }
          txt+="</tr>";
        }
      }
      txt+="</table>";
      document.getElementById("data_list").innerHTML=txt;
    }
    else if(flg==2||flg==5)
    {
      //勝率ソート
      if(flg==2)
      {
        counts=par_sort(counts,0);
      }
      else
      {
        counts=par_sort(counts,1);
      }
      for(keyname in counts){
        var par=100*counts[keyname][0]/(counts[keyname][0]+counts[keyname][1]);
        par=Math.floor(par*100)/100;	//小数点第3位切り捨て
        txt+="<tr bgcolor='#ffaeff'><td colspan=3><B>"+keyname+" "+par+"%</B></td></tr>";
        for(var j=0;j<idxarr[keyname].length;j++)
        {
          var title_flg=0;
          var namebuf=newarr[idxarr[keyname][j]].field_2;
          if(trim(newarr[idxarr[keyname][j]].field_5)!="")
          {
            namebuf+="("+newarr[idxarr[keyname][j]].field_5+")";
            title_flg=1;
          }
          if(newarr[idxarr[keyname][j]].field_6=="スペシャルワンマッチ")
          {
            namebuf+="[ワンマッチ]";
          }
          else if(newarr[idxarr[keyname][j]].field_6=="チャレンジマッチ")
          {
            namebuf+="[チャレンジマッチ]";
          }
         if(document.getElementById("disp_group").checked)
          { //2019-01-20 グループ対応
              var mark="×";
              if(newarr[idxarr[keyname][j]].field_17==keyname||newarr[idxarr[keyname][j]].field_18==keyname||newarr[idxarr[keyname][j]].field_19==keyname||newarr[idxarr[keyname][j]].field_20==keyname)
              {
                mark="○";
                if(newarr[idxarr[keyname][j]].field_21==keyname||newarr[idxarr[keyname][j]].field_22==keyname||newarr[idxarr[keyname][j]].field_23==keyname||newarr[idxarr[keyname][j]].field_24==keyname)
                {
                  mark+="×";
                }
              }
          }
          else
          {
              var mark="×";
              if(newarr[idxarr[keyname][j]].field_7==keyname||newarr[idxarr[keyname][j]].field_8==keyname||newarr[idxarr[keyname][j]].field_9==keyname||newarr[idxarr[keyname][j]].field_10==keyname)
              {
                mark="○";
              }
          }
          txt+="<tr><td>"+mark+"&nbsp;<a href='http://straychild.hatenadiary.com/entry/"+newarr[idxarr[keyname][j]].field_3+"' target='_blank'>"+bold_check(title_flg,namebuf)+"</a></td>";
          if(newarr[idxarr[keyname][j]].field_15!="")
          {
            txt+="<td align='center' width=50><a href='http://straychild.hatenadiary.com/entry/"+newarr[idxarr[keyname][j]].field_15+"' target='_blank'>後日談</a></td>";
          }
          else
          {
            txt+="<td width=50>&nbsp;</td>";
          }
          if(newarr[idxarr[keyname][j]].field_16!="")
          {
            txt+="<td align='center' width=50><a href='http://straychild.hatenadiary.com/entry/"+newarr[idxarr[keyname][j]].field_16+"' target='_blank'>後日談2</a></td>";
          }
          else
          {
            txt+="<td width=50>&nbsp;</td>";
          }
          txt+="</tr>";
        }
      }
      txt+="</table>";
      document.getElementById("data_list").innerHTML=txt;
    }
    else if(flg==3||flg==6)
    {
      //試合数ソート
      if(flg==3)
      {
        counts=cnt_sort(counts,0);
      }
      else
      {
        counts=cnt_sort(counts,1);
      }
      for(keyname in counts){
        txt+="<tr bgcolor='#ffaeff'><td colspan=3><B>"+keyname+" "+counts[keyname][0]+"-"+counts[keyname][1]+"</B></td></tr>";
        for(var j=0;j<idxarr[keyname].length;j++)
        {
          var title_flg=0;
          var namebuf=newarr[idxarr[keyname][j]].field_2;
          if(trim(newarr[idxarr[keyname][j]].field_5)!="")
          {
            namebuf+="("+newarr[idxarr[keyname][j]].field_5+")";
            title_flg=1;
          }
          if(newarr[idxarr[keyname][j]].field_6=="スペシャルワンマッチ")
          {
            namebuf+="[ワンマッチ]";
          }
          else if(newarr[idxarr[keyname][j]].field_6=="チャレンジマッチ")
          {
            namebuf+="[チャレンジマッチ]";
          }
         if(document.getElementById("disp_group").checked)
          { //2019-01-20 グループ対応
              var mark="×";
              if(newarr[idxarr[keyname][j]].field_17==keyname||newarr[idxarr[keyname][j]].field_18==keyname||newarr[idxarr[keyname][j]].field_19==keyname||newarr[idxarr[keyname][j]].field_20==keyname)
              {
                mark="○";
                if(newarr[idxarr[keyname][j]].field_21==keyname||newarr[idxarr[keyname][j]].field_22==keyname||newarr[idxarr[keyname][j]].field_23==keyname||newarr[idxarr[keyname][j]].field_24==keyname)
                {
                  mark+="×";
                }
              }
          }
          else
          {
              var mark="×";
              if(newarr[idxarr[keyname][j]].field_7==keyname||newarr[idxarr[keyname][j]].field_8==keyname||newarr[idxarr[keyname][j]].field_9==keyname||newarr[idxarr[keyname][j]].field_10==keyname)
              {
                mark="○";
              }
          }
          txt+="<tr><td>"+mark+"&nbsp;<a href='http://straychild.hatenadiary.com/entry/"+newarr[idxarr[keyname][j]].field_3+"' target='_blank'>"+bold_check(title_flg,namebuf)+"</a></td>";
          if(newarr[idxarr[keyname][j]].field_15!="")
          {
            txt+="<td align='center' width=50><a href='http://straychild.hatenadiary.com/entry/"+newarr[idxarr[keyname][j]].field_15+"' target='_blank'>後日談</a></td>";
          }
          else
          {
            txt+="<td width=50>&nbsp;</td>";
          }
          if(newarr[idxarr[keyname][j]].field_16!="")
          {
            txt+="<td align='center' width=50><a href='http://straychild.hatenadiary.com/entry/"+newarr[idxarr[keyname][j]].field_16+"' target='_blank'>後日談2</a></td>";
          }
          else
          {
            txt+="<td width=50>&nbsp;</td>";
          }
          txt+="</tr>";
        }
      }
      txt+="</table>";
      document.getElementById("data_list").innerHTML=txt;
    }
}

function match_search() {
    document.getElementById("data_list").innerHTML="";
    var taikai="";
    var year="";
    var txt="";
    for(var i = 0; i<csvArray.length;i++){
//絞り込み
      if(csvArray[i][IDX_NUM]==2)
      {//シングル
        if(!document.getElementById("num_2").checked){continue;}
      }
      else if(csvArray[i][IDX_NUM]==4)
      {//タッグ
        if(!document.getElementById("num_4").checked){continue;}
      }
      else if(csvArray[i][IDX_NUM]==6)
      {//6人タッグ 
        if(!document.getElementById("num_6").checked){continue;}
      }
      else if(csvArray[i][IDX_NUM]==8)
      {//8人タッグ 
        if(!document.getElementById("num_8").checked){continue;}
      }
      else if(csvArray[i][IDX_NUM]=="変則")
      {//変則マッチ
        if(!document.getElementById("num_other").checked){continue;}
      }

      if(csvArray[i][IDX_TYPE]=="7連戦")
      {//7連戦
        if(!document.getElementById("game_7").checked){continue;}
      }
      else if(csvArray[i][IDX_TYPE]=="スペシャルワンマッチ")
      {//スペシャルワンマッチ
        if(!document.getElementById("game_1").checked){continue;}
      }
      else if(csvArray[i][IDX_TYPE]=="チャレンジマッチ")
      {//チャレンジマッチ
        if(!document.getElementById("game_chare").checked){continue;}
      }

      if(csvArray[i][IDX_TITLE]=="TWPシングル")
      {//TWPシングル
        if(!document.getElementById("title_twp2").checked){continue;}
      }
      else if(csvArray[i][IDX_TITLE]=="TWPタッグ")
      {//TWPタッグ
        if(!document.getElementById("title_twp4").checked){continue;}
      }
      else if(csvArray[i][IDX_TITLE]=="セヴンスター")
      {//セヴンスター
        if(!document.getElementById("title_7").checked){continue;}
      }
      else if(csvArray[i][IDX_TITLE]=="KOM")
      {//KOM
        if(!document.getElementById("title_kom").checked){continue;}
      }
//2018-07-31 ADD
      else if(csvArray[i][IDX_TITLE]=="女神杯")
      {//女神杯
        if(!document.getElementById("title_venus").checked){continue;}
      }
//2018-07-31 ADD
//2018-08-05 ADD
      else if(csvArray[i][IDX_TITLE]=="女神杯＆TWPシングル")
      {//女神杯＆TWPシングル
        if((!document.getElementById("title_twp2").checked) && (!document.getElementById("title_venus").checked)){continue;}
      }
//2018-08-05 ADD
      else if(csvArray[i][IDX_TITLE]=="FWWWシングル")
      {//FWWWシングル
        if(!document.getElementById("title_fwww2").checked){continue;}
      }
      else if(csvArray[i][IDX_TITLE]=="FWWWタッグ")
      {//FWWWタッグ
        if(!document.getElementById("title_fwww4").checked){continue;}
      }
      else if(csvArray[i][IDX_TITLE]=="")
      {//ノンタイトル
        if(!document.getElementById("title_none").checked){continue;}
      }

//2019-01-19 ADD 年絞り込み
      var chkyear =csvArray[i][IDX_DATE].substring(0,4);
      var idyear = "year"+chkyear;
      if(!document.getElementById(idyear).checked){continue;}

//画面への表示
      if(year!=csvArray[i][IDX_DATE].substring(0,4))
      {
        year=csvArray[i][IDX_DATE].substring(0,4);
        if(txt!="")
        {
          txt+="</table>";
        }
        txt+=year+"年<br>";
        txt+="<table style='font-size: 70%' width='100%' border=1>";
      }

      if(csvArray[i][IDX_TYPE]=="スペシャルワンマッチ")
      {
          taikai=csvArray[i][IDX_TAIKAI];
          txt+="<tr bgcolor='blue'><td colspan=3><font color='white'><B>スペシャルワンマッチ ("+csvArray[i][IDX_DATE]+"まで)</B></font></td></tr>";
      }
      else
      {
        var color="red";
        if(csvArray[i][IDX_TYPE]=="チャレンジマッチ")
        {
          color="orange";
        }
        if(i==0)
        {
          taikai=csvArray[i][IDX_TAIKAI];
          txt+="<tr bgcolor='"+color+"'><td colspan=3><font color='white'><B>"+taikai+" ("+csvArray[i][IDX_DATE]+"まで)</B></font></td></tr>";
        }
        else if(csvArray[i][IDX_TAIKAI]!=taikai)
        {
          taikai=csvArray[i][IDX_TAIKAI];
          txt+="<tr bgcolor='"+color+"'><td colspan=3><font color='white'><B>"+taikai+" ("+csvArray[i][IDX_DATE]+"まで)</B></font></td></tr>";
        }
      }
      var title_flg=0;
      var namebuf=csvArray[i][IDX_NAME];
      if(trim(csvArray[i][IDX_TITLE])!="")
      {
        namebuf+="("+csvArray[i][IDX_TITLE]+")";
        title_flg=1;
      }
      txt+="<tr><td><a href='http://straychild.hatenadiary.com/entry/"+csvArray[i][IDX_LINK]+"' target='_blank'>"+bold_check(title_flg,namebuf)+"</a></td>";
      if(csvArray[i][IDX_LINK2]!="")
      {
	      txt+="<td align='center' width=50><a href='http://straychild.hatenadiary.com/entry/"+csvArray[i][IDX_LINK2]+"' target='_blank'>後日談</a></td>";
      }
      else
      {
	      txt+="<td width=50>&nbsp;</td>";
      }
      if(csvArray[i][IDX_LINK3]!="")
      {
	      txt+="<td align='center' width=50><a href='http://straychild.hatenadiary.com/entry/"+csvArray[i][IDX_LINK3]+"' target='_blank'>後日談2</a></td>";
      }
      else
      {
	      txt+="<td width=50>&nbsp;</td>";
      }
      txt+="</tr>";
    }
    if(txt!="")
    {
      txt+="</table>";
    }
    document.getElementById("data_list").innerHTML=txt;
}
function win_search(flg) {
    document.getElementById("data_list").innerHTML="";
    var taikai="";
    var txt="<table style='font-size: 70%' width='100%' border=1>";
    var idx=0;
    newarr = new Array();
//絞り込み
    for(var i = 0; i<csvArray.length;i++){
      if(csvArray[i][IDX_NUM]==2)
      {//シングル
        if(!document.getElementById("num_2").checked){continue;}
      }
      else if(csvArray[i][IDX_NUM]==4)
      {//タッグ
        if(!document.getElementById("num_4").checked){continue;}
      }
      else if(csvArray[i][IDX_NUM]==6)
      {//6人タッグ 
        if(!document.getElementById("num_6").checked){continue;}
      }
      else if(csvArray[i][IDX_NUM]==8)
      {//8人タッグ 
        if(!document.getElementById("num_8").checked){continue;}
      }
      else if(csvArray[i][IDX_NUM]=="変則")
      {//変則マッチ
        if(!document.getElementById("num_other").checked){continue;}
      }

      if(csvArray[i][IDX_TYPE]=="7連戦")
      {//7連戦
        if(!document.getElementById("game_7").checked){continue;}
      }
      else if(csvArray[i][IDX_TYPE]=="スペシャルワンマッチ")
      {//スペシャルワンマッチ
        if(!document.getElementById("game_1").checked){continue;}
      }
      else if(csvArray[i][IDX_TYPE]=="チャレンジマッチ")
      {//チャレンジマッチ
        if(!document.getElementById("game_chare").checked){continue;}
      }

      if(csvArray[i][IDX_TITLE]=="TWPシングル")
      {//TWPシングル
        if(!document.getElementById("title_twp2").checked){continue;}
      }
      else if(csvArray[i][IDX_TITLE]=="TWPタッグ")
      {//TWPタッグ
        if(!document.getElementById("title_twp4").checked){continue;}
      }
      else if(csvArray[i][IDX_TITLE]=="セヴンスター")
      {//セヴンスター
        if(!document.getElementById("title_7").checked){continue;}
      }
      else if(csvArray[i][IDX_TITLE]=="KOM")
      {//KOM
        if(!document.getElementById("title_kom").checked){continue;}
      }
//2018-07-31 ADD
      else if(csvArray[i][IDX_TITLE]=="女神杯")
      {//女神杯
        if(!document.getElementById("title_venus").checked){continue;}
      }
//2018-07-31 ADD
//2018-08-05 ADD
      else if(csvArray[i][IDX_TITLE]=="女神杯＆TWPシングル")
      {//女神杯＆TWPシングル
        if((!document.getElementById("title_twp2").checked) && (!document.getElementById("title_venus").checked)){continue;}
      }
//2018-08-05 ADD
      else if(csvArray[i][IDX_TITLE]=="FWWWシングル")
      {//FWWWシングル
        if(!document.getElementById("title_fwww2").checked){continue;}
      }
      else if(csvArray[i][IDX_TITLE]=="FWWWタッグ")
      {//FWWWタッグ
        if(!document.getElementById("title_fwww4").checked){continue;}
      }
      else if(csvArray[i][IDX_TITLE]=="")
      {//ノンタイトル
        if(!document.getElementById("title_none").checked){continue;}
      }

//2019-01-19 ADD 年絞り込み
      var chkyear =csvArray[i][IDX_DATE].substring(0,4);
      var idyear = "year"+chkyear;
      if(!document.getElementById(idyear).checked){continue;}

      newarr[idx] = csvArray[i];
      idx=idx+1;
    }

//勝敗数を別配列で管理[選手名,インデックス,勝,負]
    var winarr = new Array();
    var win_idx=0;
//2019-01-19 グループ対応
	var buf_win1=IDX_WIN1;
	var buf_win2=IDX_WIN2;
	var buf_win3=IDX_WIN3;
	var buf_win4=IDX_WIN4;
	var buf_lose1=IDX_LOSE1;
	var buf_lose2=IDX_LOSE2;
	var buf_lose3=IDX_LOSE3;
	var buf_lose4=IDX_LOSE4;
  if(document.getElementById("disp_group").checked)
  {
	buf_win1=IDX_WING1;
	buf_win2=IDX_WING2;
	buf_win3=IDX_WING3;
	buf_win4=IDX_WING4;
	buf_lose1=IDX_LOSEG1;
	buf_lose2=IDX_LOSEG2;
	buf_lose3=IDX_LOSEG3;
	buf_lose4=IDX_LOSEG4;
  }

    for(var i = 0;i<newarr.length;i++){
	  var lose1_set=false;
	  var lose2_set=false;
	  var lose3_set=false;
	  var lose4_set=false;
      if(trim(newarr[i][buf_win1])!="")
      {
        winarr[win_idx] = [newarr[i][buf_win1],i,1,0];
        if( trim(newarr[i][buf_win1])==trim(newarr[i][buf_lose1]) )
        {
          lose1_set = true;
          winarr[win_idx] = [newarr[i][buf_win1],i,1,1];
        }
        else if( trim(newarr[i][buf_win1])==trim(newarr[i][buf_lose2]) )
        {
          lose2_set = true;
          winarr[win_idx] = [newarr[i][buf_win1],i,1,1];
        }
        else if( trim(newarr[i][buf_win1])==trim(newarr[i][buf_lose3]) )
        {
          lose3_set = true;
          winarr[win_idx] = [newarr[i][buf_win1],i,1,1];
        }
        else if( trim(newarr[i][buf_win1])==trim(newarr[i][buf_lose4]) )
        {
          lose4_set = true;
          winarr[win_idx] = [newarr[i][buf_win1],i,1,1];
        }
        win_idx=win_idx+1;
      }
      if(trim(newarr[i][buf_win2])!="")
      {
        winarr[win_idx] = [newarr[i][buf_win2],i,1,0];
        if( trim(newarr[i][buf_win2])==trim(newarr[i][buf_lose1]) )
        {
          lose1_set = true;
          winarr[win_idx] = [newarr[i][buf_win2],i,1,1];
        }
        else if( trim(newarr[i][buf_win2])==trim(newarr[i][buf_lose2]) )
        {
          lose2_set = true;
          winarr[win_idx] = [newarr[i][buf_win2],i,1,1];
        }
        else if( trim(newarr[i][buf_win2])==trim(newarr[i][buf_lose3]) )
        {
          lose3_set = true;
          winarr[win_idx] = [newarr[i][buf_win2],i,1,1];
        }
        else if( trim(newarr[i][buf_win2])==trim(newarr[i][buf_lose4]) )
        {
          lose4_set = true;
          winarr[win_idx] = [newarr[i][buf_win2],i,1,1];
        }
        win_idx=win_idx+1;
      }
      if(trim(newarr[i][buf_win3])!="")
      {
        winarr[win_idx] = [newarr[i][buf_win3],i,1,0];
        if( trim(newarr[i][buf_win3])==trim(newarr[i][buf_lose1]) )
        {
          lose1_set = true;
          winarr[win_idx] = [newarr[i][buf_win3],i,1,1];
        }
        else if( trim(newarr[i][buf_win3])==trim(newarr[i][buf_lose2]) )
        {
          lose2_set = true;
          winarr[win_idx] = [newarr[i][buf_win3],i,1,1];
        }
        else if( trim(newarr[i][buf_win3])==trim(newarr[i][buf_lose3]) )
        {
          lose3_set = true;
          winarr[win_idx] = [newarr[i][buf_win3],i,1,1];
        }
        else if( trim(newarr[i][buf_win3])==trim(newarr[i][buf_lose4]) )
        {
          lose4_set = true;
          winarr[win_idx] = [newarr[i][buf_win3],i,1,1];
        }
        win_idx=win_idx+1;
      }
      if(trim(newarr[i][buf_win4])!="")
      {
        winarr[win_idx] = [newarr[i][buf_win4],i,1,0];
        if( trim(newarr[i][buf_win4])==trim(newarr[i][buf_lose1]) )
        {
          lose1_set = true;
          winarr[win_idx] = [newarr[i][buf_win4],i,1,1];
        }
        else if( trim(newarr[i][buf_win4])==trim(newarr[i][buf_lose2]) )
        {
          lose2_set = true;
          winarr[win_idx] = [newarr[i][buf_win4],i,1,1];
        }
        else if( trim(newarr[i][buf_win4])==trim(newarr[i][buf_lose3]) )
        {
          lose3_set = true;
          winarr[win_idx] = [newarr[i][buf_win4],i,1,1];
        }
        else if( trim(newarr[i][buf_win4])==trim(newarr[i][buf_lose4]) )
        {
          lose4_set = true;
          winarr[win_idx] = [newarr[i][buf_win4],i,1,1];
        }
        win_idx=win_idx+1;
      }
      if(lose1_set==false && trim(newarr[i][buf_lose1])!="")
      {
        winarr[win_idx] = [newarr[i][buf_lose1],i,0,1];
        win_idx=win_idx+1;
      }
      if(lose2_set==false && trim(newarr[i][buf_lose2])!="")
      {
        winarr[win_idx] = [newarr[i][buf_lose2],i,0,1];
        win_idx=win_idx+1;
      }
      if(lose3_set==false && trim(newarr[i][buf_lose3])!="")
      {
        winarr[win_idx] = [newarr[i][buf_lose3],i,0,1];
        win_idx=win_idx+1;
      }
      if(lose4_set==false && trim(newarr[i][buf_lose4])!="")
      {
        winarr[win_idx] = [newarr[i][buf_lose4],i,0,1];
        win_idx=win_idx+1;
      }
    }

    var counts = new Array();
    var idxarr = new Array();
    //counts[選手名]=[勝ち数,負け数]
    //idxarr[選手名]=[インデックス1,インデックス2...]
    for(var i=0;i< winarr.length;i++)
    {
      var key = winarr[i][0];
      counts[key] = (counts[key])? [counts[key][0] + winarr[i][2],counts[key][1] + winarr[i][3] ]: [winarr[i][2],winarr[i][3] ];
      if(idxarr[key])
      {
        idxarr[key].push(winarr[i][1]);
      }
      else
      {
        idxarr[key]=[winarr[i][1]];
      }
    }
    if(flg==1||flg==4)
    {
      //勝利数ソート
      if(flg==1)
      {
        counts=win_sort(counts,0);
      }
      else
      {
        counts=win_sort(counts,1);
      }
      for(keyname in counts){
        txt+="<tr bgcolor='#ffaeff'><td colspan=3><B>"+keyname+" "+counts[keyname][0]+"-"+counts[keyname][1]+"</B></td></tr>";
        for(var j=0;j<idxarr[keyname].length;j++)
        {
          var title_flg=0;
          var namebuf=newarr[idxarr[keyname][j]][IDX_NAME];
          if(trim(newarr[idxarr[keyname][j]][IDX_TITLE])!="")
          {
            namebuf+="("+newarr[idxarr[keyname][j]][IDX_TITLE]+")";
            title_flg=1;
          }
          if(newarr[idxarr[keyname][j]][IDX_TYPE]=="スペシャルワンマッチ")
          {
            namebuf+="[ワンマッチ]";
          }
          else if(newarr[idxarr[keyname][j]][IDX_TYPE]=="チャレンジマッチ")
          {
            namebuf+="[チャレンジマッチ]";
          }
          var mark="×";
          if(newarr[idxarr[keyname][j]][buf_win1]==keyname||newarr[idxarr[keyname][j]][buf_win2]==keyname||newarr[idxarr[keyname][j]][buf_win3]==keyname||newarr[idxarr[keyname][j]][buf_win4]==keyname)
          {
            mark="○";
            if(newarr[idxarr[keyname][j]][buf_lose1]==keyname||newarr[idxarr[keyname][j]][buf_lose2]==keyname||newarr[idxarr[keyname][j]][buf_lose3]==keyname||newarr[idxarr[keyname][j]][buf_lose4]==keyname)
            {
              mark+="×";
            }
          }
          txt+="<tr><td>"+mark+"&nbsp;<a href='http://straychild.hatenadiary.com/entry/"+newarr[idxarr[keyname][j]][IDX_LINK]+"' target='_blank'>"+bold_check(title_flg,namebuf)+"</a></td>";
          if(newarr[idxarr[keyname][j]][IDX_LINK2]!="")
          {
            txt+="<td align='center' width=50><a href='http://straychild.hatenadiary.com/entry/"+newarr[idxarr[keyname][j]][IDX_LINK2]+"' target='_blank'>後日談</a></td>";
          }
          else
          {
            txt+="<td width=50>&nbsp;</td>";
          }
          if(newarr[idxarr[keyname][j]][IDX_LINK3]!="")
          {
            txt+="<td align='center' width=50><a href='http://straychild.hatenadiary.com/entry/"+newarr[idxarr[keyname][j]][IDX_LINK3]+"' target='_blank'>後日談2</a></td>";
          }
          else
          {
            txt+="<td width=50>&nbsp;</td>";
          }
          txt+="</tr>";
        }
      }
      txt+="</table>";
      document.getElementById("data_list").innerHTML=txt;
    }
    else if(flg==2||flg==5)
    {
      //勝率ソート
      if(flg==2)
      {
        counts=par_sort(counts,0);
      }
      else
      {
        counts=par_sort(counts,1);
      }
      for(keyname in counts){
        var par=100*counts[keyname][0]/(counts[keyname][0]+counts[keyname][1]);
        par=Math.floor(par*100)/100;	//小数点第3位切り捨て
        txt+="<tr bgcolor='#ffaeff'><td colspan=3><B>"+keyname+" "+par+"%</B></td></tr>";
        for(var j=0;j<idxarr[keyname].length;j++)
        {
          var title_flg=0;
          var namebuf=newarr[idxarr[keyname][j]][IDX_NAME];
          if(trim(newarr[idxarr[keyname][j]][IDX_TITLE])!="")
          {
            namebuf+="("+newarr[idxarr[keyname][j]][IDX_TITLE]+")";
            title_flg=1;
          }
          if(newarr[idxarr[keyname][j]][IDX_TYPE]=="スペシャルワンマッチ")
          {
            namebuf+="[ワンマッチ]";
          }
          else if(newarr[idxarr[keyname][j]][IDX_TYPE]=="チャレンジマッチ")
          {
            namebuf+="[チャレンジマッチ]";
          }
          var mark="×";
          if(newarr[idxarr[keyname][j]][buf_win1]==keyname||newarr[idxarr[keyname][j]][buf_win2]==keyname||newarr[idxarr[keyname][j]][buf_win3]==keyname||newarr[idxarr[keyname][j]][buf_win4]==keyname)
          {
            mark="○";
            if(newarr[idxarr[keyname][j]][buf_lose1]==keyname||newarr[idxarr[keyname][j]][buf_lose2]==keyname||newarr[idxarr[keyname][j]][buf_lose3]==keyname||newarr[idxarr[keyname][j]][buf_lose4]==keyname)
            {
              mark+="×";
            }
          }
          txt+="<tr><td>"+mark+"&nbsp;<a href='http://straychild.hatenadiary.com/entry/"+newarr[idxarr[keyname][j]][IDX_LINK]+"' target='_blank'>"+bold_check(title_flg,namebuf)+"</a></td>";
          if(newarr[idxarr[keyname][j]][IDX_LINK2]!="")
          {
            txt+="<td align='center' width=50><a href='http://straychild.hatenadiary.com/entry/"+newarr[idxarr[keyname][j]][IDX_LINK2]+"' target='_blank'>後日談</a></td>";
          }
          else
          {
            txt+="<td width=50>&nbsp;</td>";
          }
          if(newarr[idxarr[keyname][j]][IDX_LINK3]!="")
          {
            txt+="<td align='center' width=50><a href='http://straychild.hatenadiary.com/entry/"+newarr[idxarr[keyname][j]][IDX_LINK3]+"' target='_blank'>後日談2</a></td>";
          }
          else
          {
            txt+="<td width=50>&nbsp;</td>";
          }
          txt+="</tr>";
        }
      }
      txt+="</table>";
      document.getElementById("data_list").innerHTML=txt;
    }
    else if(flg==3||flg==6)
    {
      //試合数ソート
      if(flg==3)
      {
        counts=cnt_sort(counts,0);
      }
      else
      {
        counts=cnt_sort(counts,1);
      }
      for(keyname in counts){
        txt+="<tr bgcolor='#ffaeff'><td colspan=3><B>"+keyname+" "+counts[keyname][0]+"-"+counts[keyname][1]+"</B></td></tr>";
        for(var j=0;j<idxarr[keyname].length;j++)
        {
          var title_flg=0;
          var namebuf=newarr[idxarr[keyname][j]][IDX_NAME];
          if(trim(newarr[idxarr[keyname][j]][IDX_TITLE])!="")
          {
            namebuf+="("+newarr[idxarr[keyname][j]][IDX_TITLE]+")";
            title_flg=1;
          }
          if(newarr[idxarr[keyname][j]][IDX_TYPE]=="スペシャルワンマッチ")
          {
            namebuf+="[ワンマッチ]";
          }
          else if(newarr[idxarr[keyname][j]][IDX_TYPE]=="チャレンジマッチ")
          {
            namebuf+="[チャレンジマッチ]";
          }
          var mark="×";
          if(newarr[idxarr[keyname][j]][buf_win1]==keyname||newarr[idxarr[keyname][j]][buf_win2]==keyname||newarr[idxarr[keyname][j]][buf_win3]==keyname||newarr[idxarr[keyname][j]][buf_win4]==keyname)
          {
            mark="○";
            if(newarr[idxarr[keyname][j]][buf_lose1]==keyname||newarr[idxarr[keyname][j]][buf_lose2]==keyname||newarr[idxarr[keyname][j]][buf_lose3]==keyname||newarr[idxarr[keyname][j]][buf_lose4]==keyname)
            {
              mark+="×";
            }
          }
          txt+="<tr><td>"+mark+"&nbsp;<a href='http://straychild.hatenadiary.com/entry/"+newarr[idxarr[keyname][j]][IDX_LINK]+"' target='_blank'>"+bold_check(title_flg,namebuf)+"</a></td>";
          if(newarr[idxarr[keyname][j]][IDX_LINK2]!="")
          {
            txt+="<td align='center' width=50><a href='http://straychild.hatenadiary.com/entry/"+newarr[idxarr[keyname][j]][IDX_LINK2]+"' target='_blank'>後日談</a></td>";
          }
          else
          {
            txt+="<td width=50>&nbsp;</td>";
          }
          if(newarr[idxarr[keyname][j]][IDX_LINK3]!="")
          {
            txt+="<td align='center' width=50><a href='http://straychild.hatenadiary.com/entry/"+newarr[idxarr[keyname][j]][IDX_LINK3]+"' target='_blank'>後日談2</a></td>";
          }
          else
          {
            txt+="<td width=50>&nbsp;</td>";
          }
          txt+="</tr>";
        }
      }
      txt+="</table>";
      document.getElementById("data_list").innerHTML=txt;
    }
}
function win_sort(a,flg){
    var x=[],b=[];
    for(key in a){
        x.push([key,a[key][0],a[key][1]]);
    }
    x.sort(function(m,n){
    if(flg==0)
    {
      if(n[1]>m[1]) return 1;
      if(n[1]<m[1]) return -1;
      if(m[2]>n[2]) return 1;
      if(m[2]<n[2]) return -1;
    }
    else
    {
      if(n[1]>m[1]) return -1;
      if(n[1]<m[1]) return 1;
      if(m[2]>n[2]) return -1;
      if(m[2]<n[2]) return 1;
    }
        return 0;
    });
    for(i=0;i<x.length;i++){
        b[x[i][0]]=[x[i][1],x[i][2]];
    }
    return b;
}
function par_sort(a,flg){
    var x=[],b=[];
    for(key in a){
        x.push([key,a[key][0],a[key][1]]);
    }
    x.sort(function(m,n){
    if(flg==0)
    {
      if(n[1]/(n[1]+n[2])>m[1]/(m[1]+m[2])) return 1;
      if(n[1]/(n[1]+n[2])<m[1]/(m[1]+m[2])) return -1;
      if(n[1]>m[1]) return 1;
      if(n[1]<m[1]) return -1;
      if(n[2]>m[2]) return -1;
      if(n[2]<m[2]) return 1;
    }
    else
    {
      if(n[1]/(n[1]+n[2])>m[1]/(m[1]+m[2])) return -1;
      if(n[1]/(n[1]+n[2])<m[1]/(m[1]+m[2])) return 1;
      if(n[2]>m[2]) return 1;
      if(n[2]<m[2]) return -1;
      if(n[1]>m[1]) return -1;
      if(n[1]<m[1]) return 1;
    }
        return 0;
    });
    for(i=0;i<x.length;i++){
        b[x[i][0]]=[x[i][1],x[i][2]];
    }
    return b;
}
function cnt_sort(a,flg){
    var x=[],b=[];
    for(key in a){
        x.push([key,a[key][0],a[key][1]]);
    }
    x.sort(function(m,n){
    if(flg==0)
    {
      if(0+n[1]+n[2]>0+m[1]+m[2]) return 1;
      if(0+n[1]+n[2]<0+m[1]+m[2]) return -1;
      if(n[1]>m[1]) return 1;
      if(n[1]<m[1]) return -1;
      if(m[2]>n[2]) return 1;
      if(m[2]<n[2]) return -1;
    }
    else
    {
      if(0+n[1]+n[2]>0+m[1]+m[2]) return -1;
      if(0+n[1]+n[2]<0+m[1]+m[2]) return 1;
      if(n[1]>m[1]) return -1;
      if(n[1]<m[1]) return 1;
      if(m[2]>n[2]) return -1;
      if(m[2]<n[2]) return 1;
    }
        return 0;
    });
    for(i=0;i<x.length;i++){
        b[x[i][0]]=[x[i][1],x[i][2]];
    }
    return b;
}
function trim(string) {
    return string.replace(/^\s+|\s+$/g,'');
  };
function bold_check(flg,string) {
  if(flg==1)
  {
    return "<B>"+string+"</B>";
  }
  else
  {
    return string;
  }
};