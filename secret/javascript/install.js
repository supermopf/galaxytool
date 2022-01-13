var Galaxytool_install_step=1,nextButtonHandler=null,PW_mismatch_tooltip=null;
function install_tool(){var b=dijit.byId("username").get("value"),a=dijit.byId("password").get("value"),c=dijit.byId("dbname").get("value"),d=dijit.byId("server").get("value"),e=dijit.byId("prefix").get("value"),f=dijit.byId("toolname").get("value"),g=dijit.byId("maxshouts").get("value"),h=dijit.byId("email_to").get("value"),k=dijit.byId("email_from").get("value"),l=dijit.byId("step5_language").get("value"),m=dijit.byId("universe").get("value"),n=dijit.byId("def_to_debris").get("checked"),p=dijit.byId("debris_rate").get("value"),
q=dijit.byId("speed_rate").get("value"),r=dijit.byId("url").get("value"),s=dijit.byId("phpmailer").get("checked"),t=dijit.byId("smpt_host").get("value"),u=dijit.byId("smpt_user").get("value"),v=dijit.byId("smpt_pass").get("value"),w=dijit.byId("smpt_secure").get("value"),x=dijit.byId("smpt_port").get("value"),y=dijit.byId("password1").get("value");dojo.xhrPost({url:"secret/ajax/ajax_install.php?step=7",handleAs:"json",content:{dbusername:b,dbpassword:a,dbname:c,dbhost:d,dbprefix:e,owner:f,maxshouts:g,
email_to:h,email_from:k,usePHPMailer:s,SMPT_host:t,SMPT_user:u,SMPT_pass:v,SMPT_secure:w,SMPT_port:x,default_language:l,global_universe:m,def_to_debris:n,debris_rate:p,speed_rate:q,url:r,admin_pass:y},load:function(a){null!=a.messages&&showMessages(a.messages,"./images",!1);!0==a.result&&(dijit.byId("nextButton").set("label",TEXT_INSTALL_CONTINUE),dojo.disconnect(nextButtonHandler),nextButtonHandler=dojo.connect(dijit.byId("nextButton"),"onClick",next))},error:function(a){console.log("Error:");console.log(a)}})}
function download_data(){dojo.xhrPost({url:"secret/ajax/ajax_install.php?step=8",handleAs:"json",load:function(b){null!=b.messages&&showMessages(b.messages,"./images",!1);!0==b.result?dojo.byId("step8download").innerHTML=TEXT_UPDATE_DONE:dojo.byId("step8download").innerHTML=TEXT_UPDATE_FAILED},error:function(b){console.log("Error:");console.log(b)}})}
function validate_step2(){dojo.xhrPost({url:"secret/ajax/ajax_install.php?step=2",handleAs:"json",load:function(b){null!=b.messages&&showMessages(b.messages,"./images");var a=!1;!1==b.attribute?(a=!0,dojo.byId("step2_attributes").className="failure"):dojo.byId("step2_attributes").className="success";!1==b.config?(a=!0,dojo.byId("step2_config").className="failure"):dojo.byId("step2_config").className="success";!1==a?(dijit.byId("nextButton").set("label",TEXT_INSTALL_CONTINUE),dojo.disconnect(nextButtonHandler),
nextButtonHandler=dojo.connect(dijit.byId("nextButton"),"onClick",next)):(dijit.byId("nextButton").set("label",TEXT_INSTALL_VALIDATE),dojo.disconnect(nextButtonHandler),nextButtonHandler=dojo.connect(dijit.byId("nextButton"),"onClick",validate))},error:function(b){console.log("Error:");console.log(b)}})}
function validate_step3(){dojo.byId("messageArea").style.display="none";for(var b=!1,a=["server","username","password","dbname","prefix"],c=0;c<a.length;c++)!1==dijit.byId(a[c]).isValid()&&(dijit.byId(a[c]).set("state","Error"),b=!0);!0!=b&&(b={url:"secret/ajax/ajax_install.php?step=3",handleAs:"json",form:dojo.byId("step3_form"),load:function(a){null!=a.messages?showMessages(a.messages,"./images"):next()},error:function(a){console.log("Error:");console.log(a)}},dojo.xhrPost(b))}
function validate_step4(){dojo.byId("messageArea").style.display="none";for(var b=!1,a=["universe","debris_rate","speed_rate"],c=0;c<a.length;c++)!1==dijit.byId(a[c]).isValid()&&(dijit.byId(a[c]).set("state","Error"),b=!0);!0!=b&&(b={url:"secret/ajax/ajax_install.php?step=4",handleAs:"json",form:dojo.byId("step4_form"),load:function(a){null!=a.messages?showMessages(a.messages,"./images"):next()},error:function(a){console.log("Error:");console.log(a)}},dojo.xhrPost(b))}
function validate_step5(){dojo.byId("messageArea").style.display="none";for(var b=!1,a=["toolname","email_to","email_from","maxshouts"],c=0;c<a.length;c++)!1==dijit.byId(a[c]).isValid()&&(dijit.byId(a[c]).set("state","Error"),b=!0);!0!=b&&next()}
function validate_step6(){dojo.byId("messageArea").style.display="none";dijit.byId("password1").isValid()&&dijit.byId("password1").get("value")==dijit.byId("password2").get("value")?next():(dijit.byId("password1").set("state","Error"),PW_mismatch_tooltip=new dijit.Tooltip({connectId:["password1"],label:TEXT_PW_MISMATCH}))}
function show_step(b,a,c){dojo.byId("install_progress_title").innerHTML=TEXT_INSTALL_STEPS[a];dojo.byId("progress_step"+b).className="step_disabled";dojo.byId("progress_step"+a).className="step_enabled";!0==c?(dijit.byId("nextButton").set("label",TEXT_INSTALL_VALIDATE),dojo.disconnect(nextButtonHandler),nextButtonHandler=dojo.connect(dijit.byId("nextButton"),"onClick",validate)):(dijit.byId("nextButton").set("label",TEXT_INSTALL_CONTINUE),dojo.disconnect(nextButtonHandler),nextButtonHandler=dojo.connect(dijit.byId("nextButton"),
"onClick",next));Galaxytool_install_step=a;switch(a){case 2:validate_step2();break;case 7:install_tool();break;case 8:dojo.disconnect(nextButtonHandler),dojo.byId("nextButton").style.display="none",download_data()}}function validate(){step=parseInt(Galaxytool_install_step);if(!(2>step||8<step))switch(step){case 2:validate_step2();break;case 3:validate_step3();break;case 4:validate_step4();break;case 5:validate_step5();break;case 6:validate_step6()}}
function next(){dijit.byId("nextButton").set("disabled",!0);dojo.byId("messageArea").style.display="none";step=parseInt(Galaxytool_install_step);if(!(1>step||8<step)){switch(step){case 1:show_step(1,2,!0);break;case 2:show_step(2,3,!0);break;case 3:show_step(3,4,!0);break;case 4:show_step(4,5,!0);break;case 5:show_step(5,6,!0);break;case 6:show_step(6,7,!1);break;case 7:show_step(7,8,!1);break;default:console.log("To be implemented for step "+step);return}dojo.fx.wipeOut({node:dojo.byId("step"+step)}).play();
dojo.fx.wipeIn({node:dojo.byId("step"+(step+1))}).play();dijit.byId("nextButton").set("disabled",!1)}}
function check_password_strength(){var b=dojo.trim(dojo.byId("password1").value);null!=PW_mismatch_tooltip&&(PW_mismatch_tooltip.destroy(),PW_mismatch_tooltip=null);dojo.removeClass("password_strength","password_strength_weak");dojo.removeClass("password_strength","password_strength_good");dojo.removeClass("password_strength","password_strength_strong");dojo.removeClass("password_strength","password_strength_very_strong");dojo.byId("password_strength").title="";if(""!=b)if(5<b.length){var a=0;b.match(/\d{1,}/)&&
a++;b.match(/[a-z\u00e4\u00f6\u00fc]{1,}/)&&a++;b.match(/[A-Z\u00c4\u00dc\u00d6]{1,}/)&&a++;b.match(/\W/)&&a++;7<b.length&&3<a?dojo.addClass("password_strength","password_strength_very_strong"):2<a?dojo.addClass("password_strength","password_strength_strong"):1<a?dojo.addClass("password_strength","password_strength_good"):dojo.addClass("password_strength","password_strength_weak")}else dojo.addClass("password_strength","password_strength_weak")}
function fetchOGameUrlSettings(){var b={url:"secret/ajax/ajax_ogame_settings.php",handleAs:"json",content:{ogame_server:dijit.byId("url").get("value")},load:function(a){!1==a.result?showMessages(a.messages,"./images"):(""!=a.result.name?dijit.byId("universe").set("value",a.result.name):dijit.byId("universe").set("value",a.result.number),"0"==a.result.defToTF?dijit.byId("def_to_debris").set("checked",!1):dijit.byId("def_to_debris").set("checked",!0),dijit.byId("debris_rate").set("value",100*parseFloat(a.result.debrisFactor)),
dijit.byId("speed_rate").set("value",a.result.speed),console.log(a))},error:function(a){console.log("Error:");console.log(a)}};dojo.xhrPost(b)}function switch_phpmailer(){!0==dijit.byId("phpmailer").get("checked")?dojo.fx.wipeIn({node:dojo.byId("phpmailer_details")}).play():dojo.fx.wipeOut({node:dojo.byId("phpmailer_details")}).play()}function galaxytool_install_init(){dojo.disconnect(nextButtonHandler);nextButtonHandler=dojo.connect(dijit.byId("nextButton"),"onClick",next)}dojo.ready(galaxytool_install_init);