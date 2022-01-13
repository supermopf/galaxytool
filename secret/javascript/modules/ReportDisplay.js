define("dojo/dom dijit/registry dojo/on dijit/popup dojo/i18n!./nls/galaxytool.js dojo/domReady!".split(" "),function(w,F,G,J,l){function s(a){if(!0==a||!1==a)A=a}function H(a){F.byId("ReportDialog").hide();p.remove();p=null}function B(a,l,b){if(""==a)return console.log("invalid method call - empty link provided"),!1;if(0<b||"coordinates"==l||"enemy_name"==l)switch(l){case "coordinates":a+="enemy_pos="+b+"&amp;";break;case "enemy_name":a+="enemy_name="+b+"&amp;";break;case "metal":a+="enemy_metal="+
b+"&amp;";break;case "crystal":a+="enemy_crystal="+b+"&amp;";break;case "deuterium":a+="enemy_deut="+b+"&amp;";break;case "kt":a+="ship_d0_0_b="+b+"&amp;";break;case "gt":a+="ship_d0_1_b="+b+"&amp;";break;case "lj":a+="ship_d0_2_b="+b+"&amp;";break;case "sj":a+="ship_d0_3_b="+b+"&amp;";break;case "krz":a+="ship_d0_4_b="+b+"&amp;";break;case "ss":a+="ship_d0_5_b="+b+"&amp;";break;case "kolo":a+="ship_d0_6_b="+b+"&amp;";break;case "rec":a+="ship_d0_7_b="+b+"&amp;";break;case "spio":a+="ship_d0_8_b="+
b+"&amp;";break;case "bomb":a+="ship_d0_9_b="+b+"&amp;";break;case "sat":a+="ship_d0_10_b="+b+"&amp;";break;case "zerri":a+="ship_d0_11_b="+b+"&amp;";break;case "ds":a+="ship_d0_12_b="+b+"&amp;";break;case "skrz":a+="ship_d0_13_b="+b+"&amp;";break;case "rak":a+="ship_d0_14_b="+b+"&amp;";break;case "ll":a+="ship_d0_15_b="+b+"&amp;";break;case "sl":a+="ship_d0_16_b="+b+"&amp;";break;case "gauss":a+="ship_d0_17_b="+b+"&amp;";break;case "ion":a+="ship_d0_18_b="+b+"&amp;";break;case "plasma":a+="ship_d0_19_b="+
b+"&amp;";break;case "ksk":a+="ship_d0_20_b="+b+"&amp;";break;case "gsk":a+="ship_d0_21_b="+b+"&amp;";break;case "waffentech":a+="tech_d0_0="+b+"&amp;";break;case "schildtech":a+="tech_d0_1="+b+"&amp;";break;case "rpz":a+="tech_d0_2="+b+"&amp;";break;case "arak":a+="abm_b="+b+"&amp;";break;case "irak":a+="ipm_b="+b+"&amp;"}return a}function C(a,l,b,d,c){if(""==a)return console.log("invalid method call - empty link provided"),!1;d=!0==d?1:0;c=parseInt(c);switch(l){case "coordinates":a+="v_coords="+
b+"&amp;";break;case "enemy_name":a+="v_planet="+b+"&amp;";break;case "metal":a+="v_met="+b+"&amp;";break;case "crystal":a+="v_kris="+b+"&amp;";break;case "deuterium":a+="v_deut="+b+"&amp;";break;case "kt":a+="numunits["+d+"]["+c+"][k_t]="+b+"&amp;";break;case "gt":a+="numunits["+d+"]["+c+"][g_t]="+b+"&amp;";break;case "lj":a+="numunits["+d+"]["+c+"][l_j]="+b+"&amp;";break;case "sj":a+="numunits["+d+"]["+c+"][s_j]="+b+"&amp;";break;case "krz":a+="numunits["+d+"]["+c+"][kr]="+b+"&amp;";break;case "ss":a+=
"numunits["+d+"]["+c+"][sc]="+b+"&amp;";break;case "kolo":a+="numunits["+d+"]["+c+"][ko]="+b+"&amp;";break;case "rec":a+="numunits["+d+"]["+c+"][re]="+b+"&amp;";break;case "spio":a+="numunits["+d+"]["+c+"][sp]="+b+"&amp;";break;case "bomb":a+="numunits["+d+"]["+c+"][bo]="+b+"&amp;";break;case "sat":a+="numunits["+d+"]["+c+"][so]="+b+"&amp;";break;case "zerri":a+="numunits["+d+"]["+c+"][z]="+b+"&amp;";break;case "ds":a+="numunits["+d+"]["+c+"][t]="+b+"&amp;";break;case "skrz":a+="numunits["+d+"]["+
c+"][sk]="+b+"&amp;";break;case "rak":a+="numunits["+d+"]["+c+"][ra]="+b+"&amp;";break;case "ll":a+="numunits["+d+"]["+c+"][l_l]="+b+"&amp;";break;case "sl":a+="numunits["+d+"]["+c+"][s_l]="+b+"&amp;";break;case "gauss":a+="numunits["+d+"]["+c+"][g]="+b+"&amp;";break;case "ion":a+="numunits["+d+"]["+c+"][i]="+b+"&amp;";break;case "plasma":a+="numunits["+d+"]["+c+"][p]="+b+"&amp;";break;case "ksk":a+="numunits["+d+"]["+c+"][k_s]="+b+"&amp;";break;case "gsk":a+="numunits["+d+"]["+c+"][g_s]="+b+"&amp;";
break;case "waffentech":a+="techs[1][0][w_t]="+b+"&amp;";break;case "schildtech":a+="techs[1][0][s_t]="+b+"&amp;";break;case "rpz":a+="techs[1][0][r_p]="+b+"&amp;";break;case "arak":a+="missiles_available_v="+b+"&amp;";break;case "irak":a+="missiles_available_a="+b+"&amp;"}return a}function x(a,l,b,d,c){if(""==a)return console.log("invalid method call - empty link provided"),!1;d=!0==d?"d":"a";c=parseInt(c);switch(l){case "coordinates":a+="enemy_pos="+b+"&amp;";break;case "enemy_name":a+="enemy_name="+
b+"&amp;";break;case "metal":a+="enemy_metal="+b+"&amp;";break;case "crystal":a+="enemy_crystal="+b+"&amp;";break;case "deuterium":a+="enemy_deut="+b+"&amp;";break;case "kt":a+="ship_"+d+c+"_0_b="+b+"&amp;";break;case "gt":a+="ship_"+d+c+"_1_b="+b+"&amp;";break;case "lj":a+="ship_"+d+c+"_2_b="+b+"&amp;";break;case "sj":a+="ship_"+d+c+"_3_b="+b+"&amp;";break;case "krz":a+="ship_"+d+c+"_4_b="+b+"&amp;";break;case "ss":a+="ship_"+d+c+"_5_b="+b+"&amp;";break;case "kolo":a+="ship_"+d+c+"_6_b="+b+"&amp;";
break;case "rec":a+="ship_"+d+c+"_7_b="+b+"&amp;";break;case "spio":a+="ship_"+d+c+"_8_b="+b+"&amp;";break;case "bomb":a+="ship_"+d+c+"_9_b="+b+"&amp;";break;case "sat":a+="ship_"+d+c+"_10_b="+b+"&amp;";break;case "zerri":a+="ship_"+d+c+"_11_b="+b+"&amp;";break;case "ds":a+="ship_"+d+c+"_12_b="+b+"&amp;";break;case "skrz":a+="ship_"+d+c+"_13_b="+b+"&amp;";break;case "rak":a+="ship_"+d+c+"_14_b="+b+"&amp;";break;case "ll":a+="ship_"+d+c+"_15_b="+b+"&amp;";break;case "sl":a+="ship_"+d+c+"_16_b="+b+
"&amp;";break;case "gauss":a+="ship_"+d+c+"_17_b="+b+"&amp;";break;case "ion":a+="ship_"+d+c+"_18_b="+b+"&amp;";break;case "plasma":a+="ship_"+d+c+"_19_b="+b+"&amp;";break;case "ksk":a+="ship_"+d+c+"_20_b="+b+"&amp;";break;case "gsk":a+="ship_"+d+c+"_21_b="+b+"&amp;";break;case "waffentech":a+="tech_"+d+c+"_0="+b+"&amp;";break;case "schildtech":a+="tech_"+d+c+"_1="+b+"&amp;";break;case "rpz":a+="tech_"+d+c+"_2="+b+"&amp;";break;case "arak":a+="abm_b="+b+"&amp;";break;case "irak":a+="inter="+b+"&amp;";
break;case "bandit":a+="plunder_perc="+b+"&amp;"}if("a"==d)switch(l){case "vbt":a+="engine"+c+"_0="+b+"&amp;";break;case "impulse":a+="engine"+c+"_1="+b+"&amp;";break;case "hra":a+="engine"+c+"_2="+b+"&amp;"}return a}function I(a){switch(a){case "kt":return 5E3;case "gt":return 25E3;case "lj":return 50;case "sj":return 100;case "krz":return 800;case "ss":return 1500;case "kolo":return 7500;case "rec":return 2E4;case "spio":return 0;case "bomb":return 500;case "zerri":return 2E3;case "ds":return 1E6;
case "skrz":return 750;default:alert("unknown ship key")}}var p,A=!1;s.prototype.display=function(a,q,b,d,c,k,t,p,s,e){if(!(!0!=p&&!1!=p)){e='<div align="center"><table cellpadding="1" cellspacing="0" border="0" style="width:700px;"><tr class="header"><td colspan="4">';e+=l.RESOURCES_ON;""!=a&&(e+=" "+a);a=q.split(":");e+=' <a href="'+("galaxyview.php?gala="+a[0]+"&system="+a[1])+'">['+q+"]</a> ";""!=b&&(e+=" ("+b+") ");e+=l.REPORT_WHEN+" "+k.scantime[0];!1==A&&!1==p&&(e+=" ",e+='<a href="report.php?coordinates='+
q+"&moon="+t+'" target="_blank" style="float:right">',e+='<img src="../images/new_tab.png" border="0" alt="'+l.GENERAL_OPEN_IN_NEW_WINDOW+'" title="'+l.GENERAL_OPEN_IN_NEW_WINDOW+'"></a></img>');e+="</td></tr>";var u;b="http://websim.speedsim.net/?";b=!0==galaxytool.Settings.DefToDebris?b+"def_to_df=1&amp;":b+"def_to_df=0&amp;";b+="perc-df="+galaxytool.Settings.DebrisRate+"&amp;";"object"==typeof galaxytool.Settings.UserTechs&&(0<galaxytool.Settings.UserTechs.vbt&&(b+="engine0_0="+galaxytool.Settings.UserTechs.vbt+
"&amp;"),0<galaxytool.Settings.UserTechs.impulse&&(b+="engine0_1="+galaxytool.Settings.UserTechs.impulse+"&amp;"),0<galaxytool.Settings.UserTechs.hra&&(b+="engine0_2="+galaxytool.Settings.UserTechs.hra+"&amp;"),0<galaxytool.Settings.UserTechs.waffentech&&(b+="tech_a0_0="+galaxytool.Settings.UserTechs.waffentech+"&amp;"),0<galaxytool.Settings.UserTechs.schildtech&&(b+="tech_a0_1="+galaxytool.Settings.UserTechs.schildtech+"&amp;"),0<galaxytool.Settings.UserTechs.rpz&&(b+="tech_a0_2="+galaxytool.Settings.UserTechs.rpz+
"&amp;"));switch(galaxytool.Settings.Language){case "german":b+="lang=de&amp;";break;case "polish":b+="lang=pl&amp;";break;case "english":b+="lang=en&amp;";break;case "spanish":b+="lang=sp&amp;";break;case "dutch":b+="lang=nl&amp;";break;case "balkan":b+="lang=ba&amp;";break;case "french":b+="lang=fr&amp;";break;case "portugues":b+="lang=pt&amp;";break;case "italian":b+="lang=it&amp;";break;case "turkish":break;case "danish":b+="lang=dk&amp;";break;case "brazilian":b+="lang=pt&amp;";break;case "russian":b+=
"lang=ru&amp;";break;case "swedish":b+="lang=sv&amp;";break;case "greek":b+="lang=gr&amp;";break;case "romanian":b+="lang=ro&amp;";break;case "hungarian":b+="lang=hu&amp;";break;case "czech":b+="lang=cz&amp;";break;case "korean":b+="lang=kr&amp;";break;case "norwegian":b+="lang=no&amp;";break;case "taiwan":b+="lang=tw&amp;";break;case "japan":b+="lang=ja&amp;";break;case "chinese":b+="lang=cn&amp;";break;case "bulgarian":b+="lang=bg&amp;";break;case "lithuanian":b+="lang=lt&amp;";break;case "latvian":b+=
"lang=lv&amp;";break;case "finnish":b+="lang=fi&amp;";break;case "slovak":b+="lang=sk&amp;";break;case "croatian":b+="lang=ba&amp;";break;case "serbian":break;case "slovenian":b+="lang=si&amp;";break;default:b+="lang=en&amp;"}var g;g="http://drago-sim.com/?referrer=galaxytool&amp;"+("debris_ratio="+galaxytool.Settings.DebrisRate/100+"&amp;");!0==galaxytool.Settings.DefToDebris&&(g+="def_tf=0&amp;");"object"==typeof galaxytool.Settings.UserTechs&&(0<galaxytool.Settings.UserTechs.waffentech&&(g+="techs[0][0][w_t]="+
galaxytool.Settings.UserTechs.waffentech+"&amp;"),0<galaxytool.Settings.UserTechs.schildtech&&(g+="techs[0][0][s_t]="+galaxytool.Settings.UserTechs.schildtech+"&amp;"),0<galaxytool.Settings.UserTechs.rpz&&(g+="techs[0][0][r_p]="+galaxytool.Settings.UserTechs.rpz+"&amp;"));switch(galaxytool.Settings.Language){case "german":g+="lang=german&amp;";break;case "polish":g+="lang=polish&amp;";break;case "english":g+="lang=english&amp;";break;case "spanish":g+="lang=spanish&amp;";break;case "dutch":g+="lang=dutch&amp;";
break;case "balkan":g+="lang=bosnian&amp;";break;case "french":g+="lang=french&amp;";break;case "portugues":g+="lang=portuguese&amp;";break;case "italian":g+="lang=italian&amp;";break;case "turkish":g+="lang=turkish&amp;";break;case "danish":g+="lang=danish&amp;";break;case "brazilian":g+="lang=brazilian&amp;";break;case "russian":g+="lang=russian&amp;";break;case "swedish":g+="lang=swedish&amp;";break;case "greek":g+="lang=greek&amp;";break;case "romanian":g+="lang=romanian&amp;";break;case "hungarian":g+=
"lang=hungarian&amp;";break;case "czech":g+="lang=czech&amp;";break;case "korean":g+="lang=korean&amp;";break;case "norwegian":break;case "taiwan":g+="lang=taiwanese&amp;";break;case "japan":break;case "chinese":break;case "bulgarian":g+="lang=bulgarian&amp;";break;case "lithuanian":break;case "latvian":break;case "finnish":break;case "slovak":g+="lang=slovak&amp;";break;case "croatian":g+="lang=bosnian&amp;";break;case "serbian":break;case "slovenian":break;default:g+="lang=english&amp;"}var f;f=
"http://www.osimulate.com/?"+("perc-df="+galaxytool.Settings.DebrisRate+"&amp;");!0==galaxytool.Settings.DefToDebris&&(f+="defense_debris=30&amp;");f+="uni_speed="+galaxytool.Settings.SpeedRate+"&amp;";"object"==typeof galaxytool.Settings.UserTechs&&(0<galaxytool.Settings.UserTechs.waffentech&&(f+="tech_a0_0="+galaxytool.Settings.UserTechs.waffentech+"&amp;"),0<galaxytool.Settings.UserTechs.schildtech&&(f+="tech_a0_1="+galaxytool.Settings.UserTechs.schildtech+"&amp;"),0<galaxytool.Settings.UserTechs.rpz&&
(f+="tech_a0_2="+galaxytool.Settings.UserTechs.rpz+"&amp;"),0<galaxytool.Settings.UserTechs.vbt&&(f+="engine_0="+galaxytool.Settings.UserTechs.vbt+"&amp;"),0<galaxytool.Settings.UserTechs.impulse&&(f+="engine_1="+galaxytool.Settings.UserTechs.impulse+"&amp;"),0<galaxytool.Settings.UserTechs.hra&&(f+="engine_2="+galaxytool.Settings.UserTechs.hra+"&amp;"));switch(galaxytool.Settings.Language){case "german":f+="lang=de&amp;";break;case "polish":f+="lang=pl&amp;";break;case "english":f+="lang=gb&amp;";
break;case "spanish":f+="lang=es&amp;";break;case "dutch":f+="lang=nl&amp;";break;case "balkan":f+="lang=ba&amp;";break;case "french":f+="lang=fr&amp;";break;case "portugues":f+="lang=pt&amp;";break;case "italian":f+="lang=it&amp;";break;case "turkish":f+="lang=tr&amp;";break;case "danish":f+="lang=dk&amp;";break;case "brazilian":f+="lang=br&amp;";break;case "russian":f+="lang=ru&amp;";break;case "swedish":f+="lang=se&amp;";break;case "greek":f+="lang=gr&amp;";break;case "romanian":f+="lang=ro&amp;";
break;case "hungarian":f+="lang=hu&amp;";break;case "czech":f+="lang=cz&amp;";break;case "korean":f+="lang=kr&amp;";break;case "norwegian":break;case "taiwan":f+="lang=tw&amp;";break;case "japan":break;case "chinese":break;case "bulgarian":f+="lang=bg&amp;";break;case "lithuanian":break;case "latvian":break;case "finnish":break;case "slovak":f+="lang=sk&amp;";break;case "croatian":f+="lang=hr&amp;";break;case "serbian":break;case "slovenian":break;default:f+="lang=gb&amp;"}u=B(b,"coordinates",q);
g=C(g,"coordinates",q,!1,0);f=x(f,"coordinates",q,!1,0);var y=0,n=!1,v=0,z=0;b=!1;for(var h in k)if("bandit"==h)b=k[h],"true"==b&&(f=x(f,h,"100",!1,0)),b=!1;else if(!("id"==h||"msg_id"==h||"res_sum"==h||"fleet_sum"==h||"def_sum"==h||"scantime"==h||"planetname"==h||"playername"==h||"details"==h||"username"==h))if("h1"==h||"h2"==h||"h3"==h||"h4"==h||"h5"==h)!0==n&&(e+='<td colspan="2">&nbsp;</td>',e+="</tr>"),e+='<tr class="header '+("ok"==k[h][0]?"truespio":"falsespio")+'"><td colspan="4">'+k[h][1]+
"</td></tr>",y=0;else{if("kt"==h||"gt"==h||"lj"==h||"sj"==h||"krz"==h||"ss"==h||"kolo"==h||"rec"==h||"bomb"==h||"zerri"==h||"ds"==h||"skrz"==h)0<k[h][0]&&(v+=I(h)*k[h][0]);if("metal"==h||"crystal"==h||"deuterium"==h)z+=parseInt(k[h][0]);var D=k[h][0];if(!isNaN(parseFloat(k[h][0]))&&isFinite(k[h][0])){if(0==k[h][0]&&"metal"!=h&&"crystal"!=h&&"deuterium"!=h&&"energy"!=h)continue;u=B(u,h,k[h][0]);g=C(g,h,k[h][0],!0,0);f=x(f,h,k[h][0],!0,0)}var r="";if("metal"==h||"crystal"==h||"deuterium"==h){n=null;
switch(h){case "metal":n="mesp";break;case "crystal":n="krissp";break;case "deuterium":n="deutsp"}var E=0;try{E=k[n][0]}catch(w){alert(w)}"ok"==k.h4[0]&&!t&&(n=5E3*Math.floor(2.5*Math.pow(Math.E,20*E/33)),n<=D?r='class="traffic_light_red"':0.9*n<=D&&(r='class="traffic_light_yellow"'))}0==y%2?(n=!0,e+="<tr>",e+='<td style="padding-left:20px;">'+k[h][1]+'</td><td style="padding-left:10px; padding-right:20px;" '+r+">"+galaxytool.General.numberFormat(k[h][0])+"</td>"):(n=!1,e+='<td style="padding-left:20px;">'+
k[h][1]+'</td><td style="padding-left:10px; padding-right:20px;" '+r+">"+galaxytool.General.numberFormat(k[h][0])+"</td>",e+="</tr>");y++}!0==n&&(e+='<td colspan="2">&nbsp;</td>',e+="</tr>");""!=c&&null!==c&&(e+='<tr class="header"><td colspan="4">'+d+" "+c+"</td></tr>");e+='<tr class="header"><td colspan="1"><a target="speedsim" href="'+u+'">'+l.REPORTS_SPEEDSIM+"</a></td>";e+='<td colspan="2"><a target="dragosim" href="'+g+'">'+l.REPORTS_DRAGOSIM+"</a></td>";e+='<td colspan="1"><a target="OSimulate" href="'+
f+'">'+l.REPORTS_OSIMULATE+"</a></td></tr>";e+='<tr><td colspan="2" style="padding-left:20px;">'+l.REPORTS_ALL_RESOURCES+"</td>";e+='<td style="padding-left:20px;" colspan="2">'+galaxytool.General.numberFormat(z)+"</tr>";"ok"==k.h2[0]&&(r=v<k.res_sum[0]?'class="traffic_light_red"':"",e+='<tr><td colspan="2" style="padding-left:20px;">'+l.REPORT_ARCHIVE_FLEET_CARGO+"</td>",e+='<td style="padding-left:20px;" colspan="2" '+r+">"+galaxytool.General.numberFormat(v)+"</tr>");"ok"==k.h4[0]&&(!0==t&&0<k.sensor[0])&&
(e+='<tr><td colspan="2" style="padding-left:20px;">'+l.DETAILEDINFO_PHALANX_AREA+"</td>",d=parseInt(a[1])-(Math.pow(k.sensor[0],2)-1),0>d&&(d=1),c=parseInt(a[1])+(Math.pow(k.sensor[0],2)-1),499<c&&(c=499),h="galaxyview.php?gala="+a[0]+"&system="+d,g="galaxyview.php?gala="+a[0]+"&system="+c,e+='<td style="padding-left:20px;" colspan="2"><a href="'+h+'">'+a[0]+":"+d+"</a>",e+=' - <a href="'+g+'">'+a[0]+":"+c+"</a></tr>");"ok"==k.h5[0]&&(0<k.impulse[0]&&!1==t&&3<k.raksilo[0])&&(e+='<tr><td colspan="2" style="padding-left:20px;">'+
l.REPORT_ARCHIVE_IRAK_RANGE+"</td>",d=parseInt(a[1])-(5*k.impulse[0]-1),0>d&&(d=1),c=parseInt(a[1])+(5*k.impulse[0]-1),499<c&&(c=499),h="galaxyview.php?gala="+a[0]+"&system="+d,g="galaxyview.php?gala="+a[0]+"&system="+c,e+='<td style="padding-left:20px;" colspan="2"><a href="'+h+'">'+a[0]+":"+d+"</a>",e+=' - <a href="'+g+'">'+a[0]+":"+c+"</a></tr>");e+='<tr><td colspan="2" style="padding-left:20px; vertical-align:text-top;">'+l.REPORTS_FOR_ALL_RES+"</td>";a=k.metal[0];d=k.crystal[0];c=k.deuterium[0];
a=parseInt(a);d=parseInt(d);c=parseInt(c);b=!0!=b?!1:!0;!(0>a)&&!(0>d)&&!(0>c)?(g=!0==b?1:2,h=Math.ceil(Math.max(a+d+c,Math.min(0.75*(2*a+d+c),2*a+c))/(5E3*g)),b=Math.ceil(Math.max(a+d+c,Math.min(0.75*(2*a+d+c),2*a+c))/(25E3*g)),a=Math.ceil(Math.max(a+d+c,Math.min(0.75*(2*a+d+c),2*a+c))/(1500*g)),d=l.REPORTS_KT+": "+galaxytool.General.numberFormat(h)+"<br />",d+=l.REPORTS_GT+": "+galaxytool.General.numberFormat(b)+"<br />",a=d+=l.REPORTS_SS+": "+galaxytool.General.numberFormat(a)+"<br />"):a=void 0;
e+='<td colspan="2" style="padding-left:20px;">'+a+"</td></tr>";a=0;b=!0==galaxytool.Settings.DefToDebris?1:0;for(var m in k)switch(m){case "kt":a+=1200*k[m][0];break;case "gt":a+=3600*k[m][0];break;case "lj":a+=1200*k[m][0];break;case "sj":a+=3E3*k[m][0];break;case "krz":a+=8100*k[m][0];break;case "ss":a+=18E3*k[m][0];break;case "kolo":a+=9E3*k[m][0];break;case "rec":a+=4800*k[m][0];break;case "spio":a+=300*k[m][0];break;case "bomb":a+=22500*k[m][0];break;case "sat":a+=600*k[m][0];break;case "zerri":a+=
33E3*k[m][0];break;case "ds":a+=27E5*k[m][0];break;case "skrz":a+=21E3*k[m][0];break;case "rak":a+=600*k[m][0]*b;break;case "ll":a+=600*k[m][0]*b;break;case "sl":a+=2400*k[m][0]*b;break;case "gauss":a+=10500*k[m][0]*b;break;case "ion":a+=2400*k[m][0]*b;break;case "plasma":a+=3E4*k[m][0]*b;break;case "ksk":a+=6E3*k[m][0]*b;break;case "gsk":a+=3E4*k[m][0]*b}k=a;m=Math.ceil(k/2E4);e+='<tr><td colspan="2" style="padding-left:20px; vertical-align:text-top;">'+l.SHOW_DF_LONG+"</td>";e+='<td colspan="2" style="padding-left:20px;">'+
galaxytool.General.numberFormat(k)+" ( "+m+" "+l.REPORTS_REC+")</td></tr>";!1==p&&(e+='<tr class="header"><td colspan="4"><a href="report_archive.php?coordinates='+q+"&moon="+t+'">'+s+"</a></td></tr>");return e+="</table></div>"}};s.prototype.addReportClickAndCloseListener=function(){if(null==p){var a=w.byId("ReportDialog_underlay");p=G(a,"click",H)}};return s});