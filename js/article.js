
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
if(document.getElementById("joinus")){
	var eventU =T.EventUtil;
	var _this = this;
	eventU.addHandler(document,'click',function(event){
		var target = eventU.getTarget(event) ;
		if(target.nodeName.toUpperCase() == 'BUTTON' && target.id == 'joinus' ){
		var Tajax = T.ajax;
		var addFnav= T.html.rendBox({
					'style': 'position:absolute;left:50%;top:50%;width:600px;height:600px;margin-left:-300px;margin-top:-300px;z-index:100;',
					'id': 'menubox',
					'class': 'drawobj',
					'html': {
						'file': "common/tangram-dialog.html",
						'path':true,
						'filter': {
							"title": '请先回答一下问题',
							"content": '<form name=question><div class="para">'+document.getElementById("question").innerHTML+'</div></form>',
							'tip': '展开显示'
						}
					},
					'check':function(box){
						var boxinput = box.getElementsByTagName('ul'),postvalue =[];
						
						T.forEach(boxinput, function(item, index) {
							//if(item.checked  == true){
								//alert("问题"+index+"还没回答");
								//return false;	
							//var img = document.createElement('img');
								//img.src = "templates/images/loading.gif";
							T.html.setcsstext(item.getElementsByTagName('div').item(0).lastChild,'background: url("templates/images/loading.gif") no-repeat scroll left center transparent;padding-left:20px;margin-left:20px');
							
							//item.getElementsByTagName('div').item(0).lastChild.appendChild(img);
							
							
							var tempvalue =function(obj){
								return getInputValue(obj);}(item);
							
							
							postvalue.push({"id":item.id,"value":tempvalue});
							//}
						});
						
						if(	boxinput==''){
							alert('输入值无效');	
						}
						
						Tajax.ajaxPost("manage.php?op=checkquestion",JSON.stringify(postvalue),function(response){
								
								try{
									var json=eval('(' + response + ')'),flag=true;
									if(!T.isEmptyObject(json)){
										T.forEach(json, function(item, index) {
											if(item.value == 1){
												
												//document.getElementById("message_"+item.id).getElementsByTagName('img').item(0).src='templates/images/right.gif';
												
												T.html.setcsstext(boxinput.item(index).getElementsByTagName('div').item(0).lastChild,'background: url("templates/images/right.gif") no-repeat scroll left center transparent;padding-left:20px;margin-left:20px');
											
											}else{
												flag=false;
												//console.log(document.getElementById("message_"+item.id));
												//document.getElementById("message_"+item.id).getElementsByTagName('img').item(0).src='templates/images/error.gif';
												
												T.html.setcsstext(boxinput.item(index).getElementsByTagName('div').item(0).lastChild,'background: url("templates/images/error.gif") no-repeat scroll left center transparent;padding-left:20px;margin-left:20px');
											}
											
										});
									}else{
										flag = false;	
									}
								}catch(Exception){
									flag = false;	
								}
								if(flag){//全部答对
								
								
								function answerright(){
								var menubox = document.getElementById("menubox");
									menubox.style.height='143px';
									menubox.style.marginTop = '-71px';
									T.html.getElementsByClassName('clath-path-all',box)[0].innerHTML='<span class="tiaozhuan">恭喜您全部回答正确<br /><span id="showtime" class="showtime">2</span>秒后跳转到注册页面</span>';			
								var second = document.getElementById('showtime').innerHTML,showtime=document.getElementById('showtime');
								function redirect(){ 
									
									showtime.innerText=--second; 
									if(second<=0) location.href='user/register.html';
								}
								setInterval(redirect, 1000);
								}
								setTimeout(answerright,100);	
								

								
								}
									
							//reloadtable();
							}
						);
						//clearCeng('menubox')
				}
					
			});
		}
		
	});	
}



if(document.getElementById("rongjiu")){
	var eventU =T.EventUtil;
	var _this = this;
	eventU.addHandler(document,'click',function(event){;
		var target = eventU.getTarget(event) ;
		if(target.nodeName.toUpperCase() == 'H3'){
			var p = target.parentNode.getElementsByTagName("div").item(0),
		display = p.style.display ;
			if(display == 'block'){
				p.style.display='none';
			}else{
				p.style.display='block';
			}
		}
		
	});	
}
	var setClass=function(obj, classname) {
			 if(navigator.appName == "Microsoft Internet Explorer")
 {
   if(navigator.appVersion.match(/7./i)=='7.')
   {
	   obj.style.cssText=' background:#fff; color:#48b0e5';
	   return;
	   }
   }
            obj.getAttribute('classname') ? obj.setAttribute('className', classname) : obj.setAttribute('class', classname);
        }
		var removeClass =function(obj, classname) {
						 if(navigator.appName == "Microsoft Internet Explorer")
 {
   if(navigator.appVersion.match(/7./i)=='7.')
   {
	   obj.style.cssText='';
	   return;
	   }
   }

          var reg = new RegExp('(\\s|^)' + classname + '(\\s|$)');
		  if(obj.getAttribute('classname')){
          	obj.className = obj.className.replace(reg, ' ');
		  }else{
          	obj.removeAttribute('class');
		  }
        }
		String.prototype.trim = function() {　　
    return this.replace(/(^\s*)|(\s*$)/g, "");
}
if(document.getElementById("gdcontent")){
	//var content = document.getElementById("gdcontent");
	document.getElementById("gdcontent").style.top = '270px';
	var gundong=function(){
		var content = document.getElementById("gdcontent");
		var top =parseInt(content.style.top);
		var index = (270-top)/30;
		var pchilds =content.getElementsByTagName("p"),len=pchilds.length;
		for(var i = 0;i<len;i++){
			removeClass(pchilds.item(i),'active');
		}
		var current = pchilds.item(index);
		if(current != null){
			current.innerHTML.trim()!='&nbsp;'?setClass(pchilds.item(index),'active'):null;
		}
		
		if(top == 30){
			//content.style.top = '20px';
			//gundong();
			return false;
			
		}
		
		content.style.top = (top -1)+'px';
		
		timeid = setTimeout(gundong,100);	
	}
	gundong();
}
if(T.cookie.get('getshop')!='stop'){
	T.ajax.ajaxGet("text.php",false,'',true);//file, flag,callback,async
}
