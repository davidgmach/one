
/* 
 ================================================
 PVII Backgound Image Rotator scripts
 Copyright (c) 2014 Project Seven Development
 www.projectseven.com
 Version: 1.0.9 -build 02
 ================================================
 
*/

var p7BRM={
	ctl: [],
	status: false,
	once: false,
	prf: 'none',
	animDelay: (1000/60)
};
function P7_BRMset(){
	var i,h,sh='',ie=P7_BRMgetIEver();
	if(!document.getElementById || (ie>4 && ie<6)){
		return;
	}
	sh+='.p7brm-box {position:fixed;z-index:-999;height:100%;width:100%;left:0;top:0;overflow:hidden;padding:0;margin:0;}\n';
	sh+='.p7brm-slide {position:absolute;height:100%;width:100%;top:0;left:0;overflow:hidden;visibility:hidden;padding:0;margin:0;}\n';
	sh+='.p7brm-image {width:100%;height:auto;position:absolute;top:0px;left:0px;filter:inherit;}\n';
	sh+='.p7brm-box.foreground {z-index:9999999 !important;opacity:1 !important;filter:alpha(opacity=100) !important;}\n';
	sh+='.p7brm-toolbar.foreground {z-index:99999995 !important;}\n';
	p7BRM.prf=P7_BRMgetCSSPre();
	if(document.styleSheets){
		if(ie>4 && ie<8){
		}
		h='\n<st' + 'yle type="text/css">\n'+sh+'\n</s' + 'tyle>';
		document.write(h);
	}
	else{
		P7_HLSaddSheet(sh);
	}
}
P7_BRMset();
function P7_BRMop(){
	if(!document.getElementById){
		return;
	}
	p7BRM.ctl[p7BRM.ctl.length]=arguments;
}
function P7_BRMbb(){
}
function P7_BRMaddLoad(){
	var ie=P7_BRMgetIEver();
	if(!document.getElementById || (ie>4 && ie<6)){
		return;
	}
	if(window.addEventListener){
		window.addEventListener("load",P7_BRMinit,false);
		window.addEventListener("unload",P7_BRMbb,false);
		window.addEventListener("resize",P7_BRMrsz,false);
	}
	else if(window.attachEvent){
		document.write("<script id=p7ie_brm defer src=\"//:\"><\/script>");
		document.getElementById("p7ie_brm").onreadystatechange=function(){
			if (this.readyState=="complete"){
				if(p7BRM.ctl.length>0){
					P7_BRMinit();
				}
			}
		};
		window.attachEvent("onload",P7_BRMinit);
		window.attachEvent("onunload",P7_BRMbb);
		window.attachEvent("onresize",P7_BRMrsz);
	}
}
P7_BRMaddLoad();
function P7_BRMinit(){
	var i,j,k,tD,bx,el,tU,tA,tC,ie,pli=0;
	if(p7BRM.once){
		return;
	}
	p7BRM.once=true;
	document.p7brmpre=[];
	ie=P7_BRMgetIEver();
	for(j=0;j<p7BRM.ctl.length;j++){
		tD=document.getElementById(p7BRM.ctl[j][0]);
		if(tD){
			tD.p7opt=p7BRM.ctl[j];
			bx=document.createElement('div');
			bx.setAttribute('id',tD.id.replace('_','box_'));
			bx.className='p7brm-box '+tD.className;
			document.getElementsByTagName('body')[0].appendChild(bx);
			if(tD.p7opt[9] && tD.p7opt[9]<100){
				if(bx.filters){
					bx.style.filter='alpha(opacity='+tD.p7opt[9]+')';
				}
				else{
					bx.style.opacity=tD.p7opt[9]/100;
				}
			}
			if(p7BRM.prf=='none' && tD.p7opt[1]>2){
				tD.p7opt[1]=1;
			}
			if(tD.p7opt[1]!=2 && ie>4 && ie<8){
				tD.p7opt[1]=0;
			}
			tD.brmBox=bx;
			tD.brmControls=false;
			tD.brmToolbar=false;
			tC=document.getElementById(tD.id.replace('_','tb_'));
			if(tC){
				document.getElementsByTagName('body')[0].appendChild(tC);
				tD.brmControls=[];
				tD.brmToolbar=tC;
			}
			tD.brmSlides=[];
			tD.brmCurrentSlideNum=0;
			tD.brmPreviousSlideNum=1;
			tU=document.getElementById(tD.id.replace('_','list_'));
			if(tD.p7opt[3]===0){
				P7_BRMrandomizer(tU);
				tD.p7opt[3]=1;
			}
			tA=tU.getElementsByTagName('A');
			k=0;
			for(i=0;i<tA.length;i++){
				if(tA[i].parentNode.nodeName=="LI"){
					k++;
					tD.brmSlides[k]=tA[i];
					tA[i].brmDiv=tD.id;
					tA[i].brmSlideNum=k;
					tD.brmSlideNums=tD.brmSlides.length-1;
					document.p7brmpre[pli]=new Image();
					document.p7brmpre[pli].cmp=false;
					document.p7brmpre[pli].brmDiv=tD.id;
					tA[i].brmPreIndex=pli;
					tA[i].brmPreImage=document.p7brmpre[pli];
					if(k<2){
						document.p7brmpre[pli].src=tA[i].href;
					}
					pli++;
					if(tC){
						tD.brmControls[3]=P7_BRMsetCC(tD.id,'rp_','prev');
						tD.brmControls[5]=P7_BRMsetCC(tD.id,'rn_','next');
						el=document.getElementById(tD.id.replace('_','fb_'));
						if(el){
							el.p7state='back';
							el.brmDiv=tD.id;
							tD.brmControls[7]=el;
							el.brmBox=bx;
							el.brmToolbar=tC;
							el.onclick=function(){
								var tx,cl='foreground',ac=(this.p7state=='fore')?'back':'fore';
								if(this.p7state=='fore'){
									this.p7state='back';
									tx='Foreground';
									P7_BRMremClass(this,cl);
									P7_BRMremClass(this.brmBox,cl);
									P7_BRMremClass(this.brmToolbar,cl);
								}
								else{
									this.p7state='fore';
									tx='Background';
									P7_BRMsetClass(this,cl);
									P7_BRMsetClass(this.brmBox,cl);
									P7_BRMsetClass(this.brmToolbar,cl);
								}
								this.innerHTML=tx;
								return false;
							};
						}
						el=document.getElementById(tD.id.replace('_','rpp_'));
						if(el){
							el.p7state='pause';
							el.brmDiv=tD.id;
							tD.brmControls[4]=el;
							el.onclick=function(){
								var ac=(this.p7state=='play')?'pause':'play';
								P7_BRMcontrol(this.brmDiv,ac);
								return false;
							};
							el.brmSetButtonState=function(st){
								var tx;
								if(st=='play'){
									tx='Pause';
									P7_BRMremClass(this,'tb-play');
								}
								else{
									tx='Play';
									P7_BRMsetClass(this,'tb-play');
								}
								this.innerHTML=tx;
							};
						}
					}
				}
			}
			if(tD.p7opt[4]==1){
				tD.brmShowMode='play';
				if(tD.brmControls[4]){
					tD.brmControls[4].p7state='play';
					tD.brmControls[4].brmSetButtonState('play');
				}
			}
			P7_BRMshowImage(tD.id,tD.p7opt[3],1);
		}
	}
}
function P7_BRMctrl(dv,ac){
	return P7_BRMcontrol(dv,ac);
}
function P7_BRMcontrol(dv,ac,bp){
	var i,tD,cs,ts,op,sn,eI,eC,eD,tm=0,pauseOnAction,rs=false,m=false;
	tD=document.getElementById(dv);
	if(tD&&tD.brmSlides){
		if(tD.brmShowTimer){
			clearTimeout(tD.brmShowTimer);
		}
		pauseOnAction=(tD.p7opt[8]==1)?true:false;
		cs=tD.brmCurrentSlideNum;
		ts=tD.brmSlideNums;
		op=tD.p7opt;
		if(ac=='pause'){
			P7_BRMpause(dv);
			return m;
		}
		if(!bp && pauseOnAction){
			P7_BRMpause(dv);
		}
		if(ac=='play'){
			tD.brmShowMode='play';
			if(tD.brmControls[4]){
				tD.brmControls[4].p7state='play';
				tD.brmControls[4].brmSetButtonState('play');
			}
			ac='next';
			rs=true;
		}
		if(ac=='first'){
			tD.brmDirection='left';
			sn=1;
		}
		else if(ac=='prev'){
			tD.brmDirection='left';
			sn=cs-1;
			if(sn<1){
				sn=ts;
			}
		}
		else if(ac=='next'){
			sn=cs+1;
			tD.brmDirection='right';
			if(tD.brmShowMode=='play'){
				if(sn>ts){
					tD.brmNumPlays++;
					if(tD.p7opt[6]>0 && tD.brmNumPlays>tD.p7opt[6]){
						tD.brmNumPlays=0;
						sn=(tD.p7opt[7]==1)?1:tD.brmSlideNums;
						P7_BRMpause(tD.id);
					}
					else{
						sn=1;
					}
				}
			}
			else{
				if(sn>ts){
					sn=1;
				}
			}
		}
		else if(ac=='last'){
			tD.brmDirection='right';
			sn=ts;
		}
		else{
			tD.brmDirection='right';
			sn=ac;
		}
		sn=(sn<1)?1:sn;
		sn=(sn>tD.brmSlideNums)?tD.brmSlideNums:sn;
		if(sn==tD.brmCurrentSlideNum&&bp!=1){
			return m;
		}
		if(rs){
			tm=100;
			setTimeout("P7_BRMshowImage('"+tD.id+"',"+sn+","+bp+")",tm );
		}
		else{
			P7_BRMshowImage(tD.id,sn,bp);
		}
	}
	return false;
}
function P7_BRMpause(d){
	var cD,tD=document.getElementById(d);
	if(tD){
		tD.brmShowMode='pause';
		if(tD.brmShowTimer){
			clearTimeout(tD.brmShowTimer);
		}
		if(tD.brmControls[4]){
			tD.brmControls[4].p7state='pause';
			tD.brmControls[4].brmSetButtonState('pause');
		}
	}
}
function P7_BRMshowImage(dv,sn,bp){
	var i,tD,tA,tB,sW,iM;
	bp=(bp)?bp:null;
	tD=document.getElementById(dv);
	if(tD.brmStatus!='open'){
		tD.brmBox.style.display='block';
		if(tD.brmToolbar){
			tD.brmToolbar.style.display='block';
		}
	}
	if(tD.brmCurrentSlideNum==sn && bp!=1){
		return false;
	}
	if(tD.brmShowTimer){
		clearTimeout(tD.brmShowTimer);
	}
	if(tD.brmWait){
		clearTimeout(tD.brmWait);
	}
	if(tD.brmCurrentSlideNum!==0){
		tD.brmPreviousSlideNum = tD.brmCurrentSlideNum;
	}
	tD.brmCurrentSlideNum=sn;
	tA=tD.brmSlides[sn];
	tB=tD.brmBox;
	sW=document.createElement('div');
	sW.className='p7brm-slide';
	iM=document.createElement('img');
	iM.className='p7brm-image';
	P7_BRMsetImage(iM);
	iM.brmCnt=0;
	iM.src=tA.href;
	iM.oncontextmenu=function(){
		return false;
	};
	sW.appendChild(iM);
	tB.appendChild(sW);
	sW.brmImage=iM;
tD.brmWait=setInterval(function(){
	P7_BRMloadImage(tD,sW,iM,sn,bp);
}
,60);
}
function P7_BRMloadImage(tD,sW,im,sn,bp){
	im.brmCnt++;
	if(im.cmp && im.complete && im.height>10 && im.width > 10){
		clearTimeout(tD.brmWait);
		P7_BRMdispA(tD.id,sn,sW,bp);
	}
	if(im.brmCnt>50){
		clearTimeout(tD.brmWait);
	}
}
function P7_BRMsetImage(im){
	this.p7Status='';
	im.onload=function(){
		this.cmp=true;
	};
	im.onerror=function(){
		this.p7Status='load_error';
	};
}
function P7_BRMdispA(dv,sn,sW,bp){
	var tD,an;
	tD=document.getElementById(dv);
	if(tD.brmCurrentSlideNum!=sn){
		return false;
	}
	an=(bp && bp==1)?0:tD.p7opt[1];
	sW.brmImgHeight=sW.brmImage.height;
	sW.brmImgWidth=sW.brmImage.width;
	P7_BRMsetClass(sW,'current-slide');
	P7_BRMresizer(tD);
	P7_BRMhideSlide(tD);
	if(tD.p7opt[1]==1){
		P7_BRMfade(sW,5,100,tD.p7opt[2],'quad');
		P7_BRMdispFin(dv,sn,bp);
	}
	else if(tD.p7opt[1]==2){
		x=sW.offsetWidth;
		if(tD.brmDirection=='left'){
			x=x*-1;
		}
		sW.style.left=x+'px';
		P7_BRManimate(sW,'left','px',x,0,tD.p7opt[2],'quad');
		P7_BRMdispFin(dv,sn,bp);
	}
	else if(tD.p7opt[1]==3){
		x=100;
		if(tD.brmDirection=='left'){
			x=x*-1;
		}
		sW.style.left=x+'px';
		sW.style.opacity=0.1;
		sW.style.visibility='visible';
		sW.offsetWidth = sW.offsetWidth;
		sW.style[p7BRM.prf+'transition']='all '+tD.p7opt[2]+'ms ease-out';
		sW.style.left='0px';
		sW.style.opacity=1;
		P7_BRMdispFin(dv,sn,bp);
	}
	else{
		sW.style.visibility='visible';
		P7_BRMdispFin(dv,sn,bp);
	}
}
function P7_BRMdispFin(dv,sn,bp){
	var tD,ns,tA;
	tD=document.getElementById(dv);
	if(tD.brmCurrentSlideNum!=sn){
		return false;
	}
	ns=tD.brmCurrentSlideNum+1;
	ns=(ns<=tD.brmSlides.length-1)?ns:1;
	tA=tD.brmSlides[ns];
	if(!tA.brmPreImage.cmp){
		tA.brmPreImage.src=tA.href;
	}
	if(tD.brmShowMode=='play'){
		tD.brmShowMode='play';
		tD.brmShowResume=false;
		if(tD.brmShowTimer){
			clearTimeout(tD.brmShowTimer);
		}
		tD.brmShowTimer=setTimeout("P7_BRMcontrol('"+tD.id+"','next',2)",(tD.p7opt[5]*1000));
	}
}
function P7_BRMremoveSlide(bX,op){
	op=(op>-1)?op:1;
	if(bX.hasChildNodes()){
		while(bX.childNodes.length>op){
			bX.removeChild(bX.childNodes[0]);
		}
	}
}
function P7_BRMhideSlide(tD){
	var x,bX,sW,trnsd;
	trsnd=(p7BRM.prf=='-webkit-'?'webkitTransitionEnd':'transitionend');
	bX=tD.brmBox;
	if(bX && bX.hasChildNodes && bX.childNodes.length>1){
		sW=bX.childNodes[0];
		P7_BRMremClass(sW,'current-slide');
		if(tD.p7opt[1]==1){
			P7_BRMfade(sW,100,0,tD.p7opt[2],'quad',function(){
				P7_BRMremoveSlide(bX,1);
			}
			);
		}
		else if (tD.p7opt[1]==2){
			x=bX.offsetWidth*-1;
			if(tD.brmDirection=='left'){
				x=x*-1;
			}
			P7_BRManimate(sW,'left','px',0,x,tD.p7opt[2],'quad',function(){
				P7_BRMremoveSlide(bX,1);
			}
			);
		}
		else if (tD.p7opt[1]==3){
			x=-100;
			if(tD.brmDirection=='left'){
				x=x*-1;
			}
sW.addEventListener(trsnd, function(){
	P7_BRMremoveSlide(bX,1);
}
, false);
sW.style.left=x+'px';
sW.style.opacity=0;
}
else{
P7_BRMremoveSlide(bX,1);
}
}
}
function P7_BRMgetTime(st){
	var d = new Date();
	return d.getTime() - st;
}
function P7_BRManim(tp,t,b,c,d){
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
function P7_BRMfade(ob,from,to,dur,typ,cb){
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
	ob.fadeStartTime=P7_BRMgetTime(0);
	ob.fadeDuration=dur;
	ob.p7FadeRunning=true;
ob.p7Fade=setInterval(function(){
	P7_BRMfader(ob,cb);
}
,p7BRM.animDelay);
}
function P7_BRMfader(el,cb){
	var i,tC,tA,op,et,cet,m=false;
	et=P7_BRMgetTime(el.fadeStartTime);
	if(et>=el.fadeDuration){
		et=el.fadeDuration;
		m=true;
	}
	if(el.p7CurrentFade!=el.p7FinishFade){
		op=P7_BRManim(el.p7fadeType,et,el.p7StartFade,el.p7FinishFade-el.p7StartFade,el.fadeDuration);
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
function P7_BRManimate(ob,prop,un,fv,tv,dur,typ,cb){
	if(ob.p7AnimRunning){
		ob.p7AnimRunning=false;
		clearInterval(ob.p7BRManim);
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
	ob.p7animStartTime=P7_BRMgetTime(0);
	ob.p7animDuration=dur;
	if(!ob.p7AnimRunning){
		ob.p7AnimRunning=true;
ob.p7BRManim=setInterval(function(){
	P7_BRManimator(ob,cb);
}
, p7BRM.animDelay);
}
}
function P7_BRManimator(el,cb,op){
	var i,tB,tA,tS,et,nv,m=false;
	et=P7_BRMgetTime(el.p7animStartTime);
	if(et>=el.p7animDuration){
		et=el.p7animDuration;
		m=true;
	}
	if(el.p7animCurrentVal!=el.p7animFinishVal){
		nv=P7_BRManim(el.p7animType, et, el.p7animStartVal, el.p7animFinishVal-el.p7animStartVal, el.p7animDuration);
		el.p7animCurrentVal=nv;
		el.style[el.p7animProp]=nv+el.p7animUnit;
	}
	if(m){
		el.p7AnimRunning=false;
		clearInterval(el.p7BRManim);
		if(cb && typeof(cb) === "function"){
			cb.call(el);
		}
	}
}
function P7_BRMrsz(bp){
	var j,tD;
	for(j=0;j<p7BRM.ctl.length;j++){
		tD=document.getElementById(p7BRM.ctl[j][0]);
		if(tD){
			P7_BRMresizer(tD);
		}
	}
}
function P7_BRMresizer(tD){
	var i,sW,iM,oh,ow,hh,ww,nt,nl,au;
	if(tD.brmBox.hasChildNodes){
		for(i=0;i<tD.brmBox.childNodes.length;i++){
			sW=sW=tD.brmBox.childNodes[i];
			oh=sW.offsetHeight;
			ow=sW.offsetWidth;
			au='height';
			ww=ow;
			hh=ww*(sW.brmImgHeight/sW.brmImgWidth);
			if(hh<oh){
				hh=oh;
				ww=hh*(sW.brmImgWidth/sW.brmImgHeight);
				au='width';
				sW.brmImage.style.height=oh+'px';
				sW.brmImage.style.width='auto';
				ww=sW.brmImage.offsetWidth;
			}
			else{
				sW.brmImage.style.height='auto';
				sW.brmImage.style.width=ow+'px';
				hh=sW.brmImage.offsetHeight;
			}
			nl=(ow-ww)/2;
			nt=(oh-hh)/2;
			sW.brmImage.style.left=nl+'px';
			sW.brmImage.style.top=nt+'px';
		}
	}
}
function P7_BRMrandomize(){
	return 0.5-Math.random();
}
function P7_BRMrandomizer(ul){
	var i,tI=[],cn,k=0,rn;
	cn=ul.childNodes;
	for(i=0;i<cn.length;i++){
		tI[i]=cn[i];
	}
	tI.sort(P7_BRMrandomize);
	while(k<tI.length){
		ul.appendChild(tI[k]);
		k++;
	}
}
function P7_BRMaddSheet(sh){
	var h,hd;
	h=document.createElement('style');
	h.type='text/css';
	h.appendChild(document.createTextNode(sh));
	hd=document.getElementsByTagName('head');
	hd[0].appendChild(h);
}
function P7_BRMgetIEver(){
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
function P7_BRMgetCSSPre(){
	var i,dV,pre=['animationDuration','WebkitAnimationDuration'];
	var c='none',cssPre=['','-webkit-'];
	dV=document.createElement('div');
	for(i=0;i<pre.length;i++){
		if(dV.style[pre[i]]!==undefined){
			c=cssPre[i];
			break;
		}
	}
	p7BRMprf=c;
	return c;
}
function P7_BRMsetCC(dd,rp,ac){
	var d,tC;
	d=dd.replace('_',rp);
	tC=document.getElementById(d);
	if(tC){
		tC.onclick=function(){
			return P7_BRMcontrol(dd,ac);
		};
	}
	return tC;
}
function P7_BRMchangeClass(ob,clf,clt){
	if(ob){
		var cc,nc;
		cc=ob.className;
		if(cc&&cc.indexOf(clf>-1)){
			nc=cc.replace(clf,clt);
			ob.className=nc;
		}
		else{
			P7_BRMsetClass(ob,clt);
		}
	}
}
function P7_BRMsetClass(ob,cl){
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
function P7_BRMremClass(ob,cl){
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
