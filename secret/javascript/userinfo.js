function galaxytool_status_formatter(a,b,c){var d=store1.getValues(grid1.getItem(b),"status_style");b=store1.getValues(grid1.getItem(b),"url");c.customClasses.push(d);c.customClasses.push("centered_text");""!=b&&(a='<a class="'+d+'" href="'+b+'">'+a+"</a>");return a}function galaxytool_centered_formatter(a,b,c){c.customClasses.push("centered_text");return a}
function galaxytool_ingame_formatter(a,b,c){b=store1.getValues(grid1.getItem(b),"pid");c.customClasses.push("centered_text");""!=b&&(a='<a href="playerinformation.php?id='+b+'">'+a+"</a>");return a}function galaxytool_ally_formatter(a,b,c){b=store1.getValues(grid1.getItem(b),"aid");c.customClasses.push("centered_text");""!=b&&(a='<a href="allyinformation.php?id='+b+'">'+a+"</a>");return a}
function galaxytool_load_new_User(a){store4.url="ajax/ajax_userinfo_ipdetails.php?userid="+a;store4.close();grid4.setStore(store4)}function galaxytool_new_tab_loaded(a){dojo.connect(dijit.byId("user_select"),"onChange",galaxytool_load_new_User)}
function galaxytool_userinfo_init(){var a=window.location.hash;if(""!=a)try{a=a.replace(/#select_/,""),dijit.byId("tabcontainer").selectChild(dijit.byId(a))}catch(b){}dojo.subscribe("tabcontainer-selectChild",function(a){window.location.hash="#select_"+a.get("id");dojo.byId("messageArea").style.display="none"});dojo.connect(dijit.byId("tab4"),"onLoad",galaxytool_new_tab_loaded)}dojo.ready(galaxytool_userinfo_init);
