
/* 
 ================================================
 PVII Show More Less scripts
 Copyright (c) 2015 Project Seven Development
 www.projectseven.com
 Version: 1.0.6 -build 12
 ================================================
 
*/

var p7SML={
	ctl: [],
	once: false,
	body: null,
	bodyRestoreOffset: 160,
	animDelay: (1000/60)
};
function P7_SMLset(){
	var h,hd,sh='';
	if(!document.getElementById){
		return;
	}
	sh+='.sml-content-inline {display: none;}\n';
	sh+='.sml-content {display: block;height:0px;}\n';
	hd=document.head || document.getElementsByTagName('head')[0];
	h=document.createElement('style');
	h.type='text/css';
	if(h.styleSheet){
		h.styleSheet.cssText=sh;
	}
	else{
		h.appendChild(document.createTextNode(sh));
	}
	hd.appendChild(h);
}
P7_SMLset();
function P7_SMLbb(){
}
function P7_SMLaddLoad(){
	if(window.addEventListener){
		document.addEventListener("DOMContentLoaded", P7_SMLinit, false);
		window.addEventListener("load",P7_SMLinit,false);
		window.addEventListener("unload",P7_SMLbb,false);
	}
	else if(window.attachEvent){
		document.write("<script id=p7ie_sml defer src=\"//:\"><\/script>");
		document.getElementById("p7ie_sml").onreadystatechange=function(){
			if (this.readyState=="complete"){
				if(p7SML.ctl.length>0){
					P7_SMLinit();
				}
			}
		};
		window.attachEvent("onload",P7_SMLinit);
		window.attachEvent("onunload",P7_SMLbb);
	}
}
P7_SMLaddLoad();
function P7_SMLop(){
	if(!document.getElementById){
		return;
	}
	p7SML.ctl[p7SML.ctl.length]=arguments;
}
function P7_SMLinit(){
	var i,j,tA,cT,wP,sL,pn,dv,el,cl;
	if(p7SML.ctl.length<1){
		return;
	}
	if(p7SML.once){
		return;
	}
	p7SML.body=document.body.parentNode;
	if(/KHTML|WebKit/i.test(navigator.userAgent) || P7_SMLgetIEver()==5 ){
		p7SML.body=document.body;
	}
	p7SML.once=true;
	for(j=0;j<p7SML.ctl.length;j++){
		tA=document.getElementById(p7SML.ctl[j][0]);
		if(tA){
			tA.p7opt=p7SML.ctl[j];
			tA.smlContent=false;
			tA.smlWrapper=false;
			tA.smlState='closed';
			tA.smlType='block';
			cl=tA.getAttribute('class');
			if(/sml-more-inline/.test(cl)){
				tA.smlType='inline';
				if(tA.p7opt[1]>0){
					tA.p7opt[1]=2;
				}
			}
			tA.innerHTML=tA.p7opt[3];
			cT=document.getElementById(tA.id.replace('_','content_'));
			wP=document.getElementById(tA.id.replace('_','wrapper_'));
			cT.smlMinHeight=tA.p7opt[5];
			if(tA.p7opt[5]>0){
				cT.style.height=tA.p7opt[5]+'px';
				el=document.createElement('DIV');
				el.className='sml-blur';
				el.setAttribute('id',tA.id.replace('_','blur_'));
				cT.appendChild(el);
				tA.smlBlur=el;
				cT.smlBlur=el;
			}
			if(cT){
				tA.smlContent=cT;
				tA.smlWrapper=wP;
				cT.smlTrig=tA;
				cT.smlType=tA.smlType;
				if(tA.smlType=='inline'){
					tA.onclick=function(){
						return P7_SMLshow(this);
					};
					el=document.getElementById(tA.id.replace('_','less_'));
					if(el){
						el.smlContent=cT;
						el.smlWrapper=wP;
						el.smlTrig=tA;
						el.smlTrigLess=true;
						el.innerHTML=tA.p7opt[4];
						el.onclick=function(){
							return P7_SMLhide(this.smlTrig);
						};
					}
				}
				else{
					tA.onclick=function(){
						return P7_SMLtrig(this);
					};
				}
			}
		}
	}
}
function P7_SMLtrig(a){
	if(a.smlState=='open'){
		P7_SMLhide(a);
	}
	else{
		P7_SMLshow(a);
	}
	return false;
}
function P7_SMLshow(a){
	var tx;
	if(a.smlState=='open'){
		return false;
	}
	a.smlState='open';
	P7_SMLsetClass(a,'open');
	if(a.smlType=='block'){
		tx=a.p7opt[4];
		a.innerHTML=tx;
		a.setAttribute('title',tx);
	}
	P7_SMLsetClass(a.smlContent,'open');
	if(a.p7opt[1]==1){
		P7_SMLanimate(a.smlContent,'height','px',a.smlContent.offsetHeight,a.smlWrapper.offsetHeight,a.p7opt[2],'quad',function(){
			this.style.height='auto';
			if(this.smlBlur){
				this.smlBlur.style.display='none';
			}
		}
		);
	}
	else if(a.p7opt[1]==2){
		a.smlContent.style.visibility='hidden';
		a.smlContent.style.height='auto';
		if(a.smlBlur){
			a.smlBlur.style.display='none';
		}
		if(a.smlType=='inline'){
			a.style.display='none';
			a.smlContent.style.display='inline';
		}
		P7_SMLfade(a.smlContent,5,100,a.p7opt[2],'quad');
	}
	else{
		if(a.smlType=='inline'){
			a.style.display='none';
			a.smlContent.style.display='inline';
		}
		else{
			a.smlContent.style.height='auto';
			if(a.smlBlur){
				a.smlBlur.style.display='none';
			}
		}
	}
	return false;
}
function P7_SMLhide(a){
	var tx;
	if(a.smlState=='closed'){
		return false;
	}
	a.smlState='closed';
	P7_SMLremClass(a,'open');
	if(a.smlType=='block'){
		tx=a.p7opt[3];
		a.innerHTML=tx;
		a.setAttribute('title',tx);
	}
	P7_SMLremClass(a.smlContent,'open');
	P7_SMLrestore(a);
	if(a.p7opt[1]==1){
		if(a.smlBlur){
			a.smlBlur.style.display='block';
		}
		P7_SMLanimate(a.smlContent,'height','px',a.smlContent.offsetHeight,a.p7opt[5],a.p7opt[2],'quad');
	}
	else if(a.p7opt[1]==2 && a.smlType!='inline'){
		a.smlContent.style.visibility='hidden';
		a.smlContent.style.height='auto';
		if(a.smlBlur){
			a.smlBlur.style.display='block';
		}
		P7_SMLfade(a.smlContent,100,0,a.p7opt[2]/2,'quad',function(){
			if(this.smlType=='inline'){
				this.style.display='none';
				this.smlTrig.style.display='inline';
			}
			else{
				this.style.height=this.smlMinHeight+'px';
				if(this.filters){
					this.style.filter='';
				}
				else{
					this.style.opacity=1;
				}
			}
		}
		);
	}
	else{
		if(a.smlType=='inline'){
			a.style.display='inline';
			a.smlContent.style.display='none';
		}
		else{
			a.smlContent.style.height=a.p7opt[5]+'px';
			if(a.smlBlur){
				a.smlBlur.style.display='none';
			}
		}
	}
	return false;
}
function P7_SMLrestore(a){
	var el,st,t;
	if(!a || a.p7opt[6]!=1){
		return;
	}
	var an=a.p7opt[1];
	el=a.smlContent;
	if(p7SML.body.p7AnimRunning){
		p7SML.body.p7AnimRunning=false;
		clearInterval(p7SML.body.p7SMLanim);
	}
	if(typeof(p7STT)=='object'){
		if(p7STT.body && p7STT.body.p7AnimRunning){
			p7STT.body.p7AnimRunning=false;
			clearInterval(p7STT.body.p7STTanim);
		}
	}
	st=parseInt(p7SML.body.scrollTop,10);
	var wh = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
	var tt = el.getBoundingClientRect().top;
	var nst=0;
	if(tt < p7SML.bodyRestoreOffset){
		nst = st + tt - (wh/2);
	}
	else if(tt > wh-p7SML.bodyRestoreOffset){
		nst = st - tt + (wh/2);
	}
	else{
		nst=st;
	}
	nst=(nst<0)?0:nst;
	if(an>0){
		P7_SMLscrollAnim(p7SML.body,st,nst,a.p7opt[2],'quad');
	}
	else{
		p7SML.body.scrollTop=nst;
	}
}
function P7_SMLgetTime(st){
	var d = new Date();
	return d.getTime() - st;
}
function P7_SMLanim(tp,t,b,c,d){
	if(tp=='quad'){
		if((t/=d/2)<1){
			return c/2*t*t+b;
		}
		else{
			return -c/2*((--t)*(t-2)-1)+b;
		}
	}
	else{
		return (c*(t/d))+b;
	}
}
function P7_SMLanimate(ob,prop,un,fv,tv,dur,typ,cb){
	if(ob.p7AnimRunning){
		ob.p7AnimRunning=false;
		clearInterval(ob.p7SMLanim);
	}
	typ=(!typ)?'quad':typ;
	ob.p7animType=typ;
	ob.p7animProp=prop;
	ob.p7animUnit=un;
	ob.p7animStartVal=fv;
	ob.p7animCurrentVal=ob.p7animStartVal;
	ob.p7animFinishVal=tv;
	ob.style[ob.p7animProp]=ob.p7animCurrentVal+ob.p7animUnit;
	ob.style.visibility='visible';
	ob.p7animStartTime=P7_SMLgetTime(0);
	ob.p7animDuration=dur;
	if(!ob.p7AnimRunning){
		ob.p7AnimRunning=true;
ob.p7SMLanim=setInterval(function(){
	P7_SMLanimator(ob,cb);
}
, p7SML.animDelay);
}
}
function P7_SMLanimator(el,cb,op){
	var i,tB,tA,tS,et,nv,m=false;
	et=P7_SMLgetTime(el.p7animStartTime);
	if(et>=el.p7animDuration){
		et=el.p7animDuration;
		m=true;
	}
	if(el.p7animCurrentVal!=el.p7animFinishVal){
		nv=P7_SMLanim(el.p7animType, et, el.p7animStartVal, el.p7animFinishVal-el.p7animStartVal, el.p7animDuration);
		el.p7animCurrentVal=nv;
		el.style[el.p7animProp]=nv+el.p7animUnit;
	}
	if(m){
		el.p7AnimRunning=false;
		clearInterval(el.p7SMLanim);
		if(cb && typeof(cb) === "function"){
			cb.call(el);
		}
	}
}
function P7_SMLfade(ob,from,to,dur,typ,cb){
	if(ob.p7FadeRunning){
		clearInterval(ob.p7Fade);
		ob.p7FadeRunning=false;
	}
	typ=(!typ)?'quad':typ;
	ob.p7fadeType=typ;
	ob.p7StartFade=from;
	ob.p7FinishFade=to;
	ob.p7CurrentFade=ob.p7StartFade;
	if(ob.filters){
		ob.style.filter='alpha(opacity='+ob.p7CurrentFade+')';
	}
	else{
		ob.style.opacity=ob.p7CurrentFade/100;
	}
	ob.style.visibility='visible';
	ob.fadeStartTime=P7_SMLgetTime(0);
	ob.fadeDuration=dur;
	ob.p7FadeRunning=true;
ob.p7Fade=setInterval(function(){
	P7_SMLfader(ob,cb);
}
,p7SML.animDelay);
}
function P7_SMLfader(el,cb){
	var i,tC,tA,op,et,cet,m=false;
	et=P7_SMLgetTime(el.fadeStartTime);
	if(et>=el.fadeDuration){
		et=el.fadeDuration;
		m=true;
	}
	if(el.p7CurrentFade!=el.p7FinishFade){
		op=P7_SMLanim(el.p7fadeType,et,el.p7StartFade,el.p7FinishFade-el.p7StartFade,el.fadeDuration);
		el.p7CurrentFade=op;
		if(el.filters){
			el.style.filter='alpha(opacity='+el.p7CurrentFade+')';
		}
		else{
			el.style.opacity=el.p7CurrentFade/100;
		}
	}
	if(m){
		el.p7FadeRunning=false;
		clearInterval(el.p7Fade);
		if(cb && typeof(cb) === "function"){
			cb.call(el);
		}
	}
}
function P7_SMLscrollAnim(ob,fv,tv,dur,typ,cb){
	if(ob.p7AnimRunning){
		ob.p7AnimRunning=false;
		clearInterval(ob.p7SMLanim);
	}
	typ=(!typ)?'quad':typ;
	ob.p7animType=typ;
	ob.p7animStartVal=fv;
	ob.p7animCurrentVal=ob.p7animStartVal;
	ob.p7animFinishVal=tv;
	ob.p7animStartTime=P7_SMLgetTime(0);
	ob.p7animDuration=dur;
	if(!ob.p7AnimRunning){
		ob.p7AnimRunning=true;
ob.p7SMLanim=setInterval(function(){
	P7_SMLscrollAnimator(ob,cb);
}
, p7SML.animDelay);
}
}
function P7_SMLscrollAnimator(el,cb,op){
	var i,tB,tA,tS,et,nv,m=false;
	et=P7_SMLgetTime(el.p7animStartTime);
	if(et>=el.p7animDuration){
		et=el.p7animDuration;
		m=true;
	}
	if(el.p7animCurrentVal!=el.p7animFinishVal){
		nv=P7_SMLanim(el.p7animType, et, el.p7animStartVal, el.p7animFinishVal-el.p7animStartVal, el.p7animDuration);
		el.p7animCurrentVal=nv;
		el.scrollTop=nv;
	}
	if(m){
		el.p7AnimRunning=false;
		clearInterval(el.p7SMLanim);
		if(typeof(P7_STTrsz)=='function'){
			P7_STTrsz();
		}
		if(cb && typeof(cb) === "function"){
			cb.call(el);
		}
	}
}
function P7_SMLsetClass(ob,cl){
	if(ob){
		var cc,nc,r=/\s+/g;
		cc=ob.className;
		nc=cl;
		if(cc&&cc.length>0){
			if(cc.indexOf(cl)==-1){
				nc=cc+' '+cl;
			}
			else{
				nc=cc;
			}
		}
		nc=nc.replace(r,' ');
		ob.className=nc;
	}
}
function P7_SMLremClass(ob,cl){
	if(ob){
		var cc,nc;
		cc=ob.className;
		if(cc&&cc.indexOf(cl>-1)){
			nc=cc.replace(cl,'');
			nc=nc.replace(/\s+/g,' ');
			nc=nc.replace(/\s$/,'');
			nc=nc.replace(/^\s/,'');
			ob.className=nc;
		}
	}
}
function P7_SMLgetIEver(){
	var j,v=-1,nv,m=false;
	nv=navigator.userAgent.toLowerCase();
	j=nv.indexOf("msie");
	if(j>-1){
		v=parseFloat(nv.substring(j+4,j+8));
		if(document.documentMode){
			v=document.documentMode;
		}
	}
	return v;
}
function P7_PM3getWinDims(){
	var h,w,st;
	if(document.documentElement&&document.documentElement.clientHeight){
		w=document.documentElement.clientWidth;
		h=document.documentElement.clientHeight;
	}
	else if(window.innerHeight){
		if(document.documentElement.clientWidth){
			w=document.documentElement.clientWidth;
		}
		else{
			w=window.innerWidth;
		}
		h=window.innerHeight;
	}
	else if(document.body){
		w=document.body.clientWidth;
		h=document.body.clientHeight;
	}
	return [h,w];
}
