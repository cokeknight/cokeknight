// JavaScript Document
var Tajax = T.ajax,rooturl =document.getElementById('rooturl').value;
function getMessage(opt){
	T.html.rendBox({
						'style': 'position:absolute;left:50%;width:600px;height:143px;top:50%;margin-left:-300px;margin-top:-72px;z-index:100;',
						'id': 'menubox',
						'class': 'drawobj',
						'html': {
							'file': "../common/tangram-dialog.html",
							'path':true,
							'filter': {
								"title": opt.title,
								"content": opt.content,
								'tip': '展开显示'
							}
						},
						'check':function(box){
							clearCeng('menubox');	
						}
	});
}
function showshops(){
	var Tajax = T.ajax;
	var shops ='',content='';
	Tajax.ajaxGet("../user.php?op=getshops",false,function(response){	
			shops = response;
		});
		
	shops = eval('(' + shops + ')');
T.forEach(shops,
			function(item, index) {
				if(item!=''){
					content+='<li>您在'+item.dateline;
					content+=item.flag==0?'退货':'购买';
					content+='本公司的产品</li>';	
				}
			});
			
	getMessage({"title": '提示页面',
							"content": content
				});	
}
if(T.cookie.get('jifenshuoming')!=null && T.cookie.get('jifenshuoming')!=''){
	var sm = T.cookie.get('jifenshuoming'),sm = sm.split(';'),content='';
	T.forEach(sm,
			function(item, index) {
				item!=''?content+='<li>感谢您在'+T.cookie.get('jifenshuoming')+'购买本公司的产品，将会给予积分奖励</li>':null;
			});
	getMessage({"title": '提示页面',
							"content": content
				});
	 T.cookie.set('jifenshuoming','');
}
function getInputValue(obj){
	var boxinput = obj.getElementsByTagName('input'),postvalue =[];
//	T.forEach(boxinput, function(item, index) {
//		if(item.type=='radio' && item.checked ==true ){
//			return item.value;
//
//				
//		}	
//	})	

	for(var i=0,len=boxinput.length;i<len;i++){
		if(boxinput.item(i).type=='radio' && boxinput.item(i).checked ==true ){
			return boxinput.item(i).value;
			}
	}
	return '';
}
function huidawenti(box) {
    var boxinput = box.getElementsByTagName('ul'),
    postvalue = [];

						T.forEach(boxinput, function(item, index) {
							//if(item.checked  == true){
								//alert("问题"+index+"还没回答");
								//return false;	
							//var img = document.createElement('img');
								//img.src = "templates/images/loading.gif";
							T.html.setcsstext(item.getElementsByTagName('div').item(0).lastChild,'background: url("../templates/images/loading.gif") no-repeat scroll left center transparent;padding-left:20px;margin-left:20px');
							
							//item.getElementsByTagName('div').item(0).lastChild.appendChild(img);
							
							
							var tempvalue =function(obj){
								return getInputValue(obj);}(item);
							
							
							postvalue.push({"id":item.id,"value":tempvalue});
							});
	if (boxinput == '') {
        alert('输入值无效');
    }

    Tajax.ajaxPost(rooturl+"/manage.php?op=checkquestion&user=1", JSON.stringify(postvalue),
    function(response) {
		try
		{
			var json = eval('(' + response + ')'),flag = true;
									if(!T.isEmptyObject(json)){
										T.forEach(json, function(item, index) {
											if(item.value == 1){
												
												//document.getElementById("message_"+item.id).getElementsByTagName('img').item(0).src='templates/images/right.gif';
												
												T.html.setcsstext(boxinput.item(index).getElementsByTagName('div').item(0).lastChild,'background: url("../templates/images/right.gif") no-repeat scroll left center transparent;padding-left:20px;margin-left:20px');
											
											}else{
												flag=false;
												//console.log(document.getElementById("message_"+item.id));
												//document.getElementById("message_"+item.id).getElementsByTagName('img').item(0).src='templates/images/error.gif';
												
												T.html.setcsstext(boxinput.item(index).getElementsByTagName('div').item(0).lastChild,'background: url("../templates/images/error.gif") no-repeat scroll left center transparent;padding-left:20px;margin-left:20px');
											}
											
										});
									}else{
										flag = false;	
									}
			
		
			if (flag) { //全部答对
				
				getMessage({"title": '跳转页面',
							"content": '<span class="tiaozhuan">恭喜您全部回答正确,奖励积分2分</span>'
				});
			}
		}catch(e){
			getMessage({"title": '提示页面',
							"content": '<span class="tiaozhuan" style="width:150px">'+response+'</span>'
			});	
		}
		

        //reloadtable();
    });
}
if(T.cookie.get('stop_session')=='stop_session'){
	TOP.cookie.remove('_t_session','.ghshealth.com.cn','/');
}
if(document.getElementById("top-login-btn-container")){
TOP.ui("login-btn", {
	container:".top-login-btn-container",
	type:"1,1",
	callback:{
	   login:function(user){
		   var nick = user.nick;
		 if(T.cookie.get('stop_session')!='stop_session'){
			location = rooturl+'/user.php?op=taobaoname&nick='+encodeURIComponent(nick);	  
		  } else{
			document.location.reload();	  
		 }
		  
		  
		   
	   }
}});
}
 function hasClass(obj, cls) {
            return obj.className.match(new RegExp('(\\s|^)' + cls + '(\\s|$)'));
        }
function removeClass(element, className) {
    if (!element) return;
    var elementClassName = element.className;
    if (elementClassName.length == 0) return;
    if (elementClassName == className) {
        element.className = "";
        return;
    }
    if (elementClassName.match(new RegExp("(^|\\s)" + className + "(\\s|$)"))) element.className = elementClassName.replace((new RegExp("(^|\\s)" + className + "(\\s|$)")), " ");
};
function setClass(element, classname) {
        if (!element) return;
        var elementClassName = element.className;
        if (elementClassName.length == 0) {
            element.className = elementClassName;
            return;
        }
        if (elementClassName == classname || elementClassName.match(new RegExp("(^|\\s)" + classname + "(\\s|$)"))) return;
        element.className = elementClassName + " " + classname;
}
var eventU =T.EventUtil,array = T.array;
	var _this = this,spanarray=["jifen","yizhan","xinxi"];
	eventU.addHandler(document,'click',function(event){;
		var target = eventU.getTarget(event) ;
		if(target.nodeName.toUpperCase() == 'SPAN' && hasClass(target,'content')){
			var span = target.parentNode.id;
			if(array.InArray(span,spanarray)){
				
				T.forEach(spanarray, function(item, index) {
						removeClass(document.getElementById(item).getElementsByTagName("span").item(1),"hovercontent");
						document.getElementById(item+"banner").style.display='none';
				});
				document.getElementById(span+"banner").style.display='block';
				setClass(target,"hovercontent");
			}
		}
		
	});	
	eventU.addHandler(document,'click',function(event){;
		var target = eventU.getTarget(event) ;
		if(target.nodeName.toUpperCase() == 'A' && target.id =='showtaobaoname'){
			var p = target.parentNode.getElementsByTagName("p").item(0),
		display = p.style.display ;
			if(display == 'block'){
				p.style.display='none';
			}else{
				p.style.display='block';
			}
		}
		
	});	
	eventU.addHandler(document,'click',function(event){;
		var target = eventU.getTarget(event) ;
		if(target.nodeName.toUpperCase() == 'BUTTON' && target.id =='huidawenyi'){
			huidawenti(document.getElementById("question"));
		}
		
	});	


if(T.cookie.get('getshop')!='stop'){
	T.ajax.ajaxGet("../sandbox_text.php",false,'',true);//file, flag,callback,async
}