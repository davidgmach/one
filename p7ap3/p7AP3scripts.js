
/* 

  ================================================
  PVII Accordian Panel Magic 3 scripts
  Copyright (c) 2012-2014 Project Seven Development
  www.projectseven.com
  Version: 3.2.3 -build 12
  ================================================
  
*/

// define the image swap file naming convention

// rollover image for any image in the normal state
var p7AP3over='_over';

// image for any trigger that has an open sub menu -no rollover
var p7AP3open='_down';

var p7AP3i=false,p7AP3a=false,p7AP3ctl=[],p7AP3dy=(1000/100);
function P7_AP3set(){
	var i,h,sh,hd,x,v;
	if(!document.getElementById){
		return;
	}
	sh='.p7AP3cwrapper {height:0px;overflow:hidden;}\n';
	if(document.styleSheets){
		h='\n<st' + 'yle type="text/css">\n'+sh+'\n</s' + 'tyle>';
		document.write(h);
	}
	else{
		h=document.createElement('style');
		h.type='text/css';
		h.appendChild(document.createTextNode(sh));
		hd=document.getElementsByTagName('head');
		hd[0].appendChild(h);
	}
}
P7_AP3set();
function P7_AP3addLoad(){
	if(!document.getElementById){
		return;
	}
	if(window.addEventListener){
		document.addEventListener("DOMContentLoaded", P7_initAP3, false);
		window.addEventListener("load",P7_initAP3,false);
		window.addEventListener("unload",P7_AP3ff,false);
	}
	else if(window.attachEvent){
		document.write("<script id=p7ie_ap3 defer src=\"//:\"><\/script>");
		document.getElementById("p7ie_ap3").onreadystatechange=function(){
			if (this.readyState=="complete"){
				if(p7AP3ctl.length>0){
					P7_initAP3();
				}
			}
		};
		window.attachEvent("onload",P7_initAP3);
	}
}
P7_AP3addLoad();
function P7_AP3ff(){
	return;
}
function P7_opAP3(){
	if(!document.getElementById){
		return;
	}
	p7AP3ctl[p7AP3ctl.length]=arguments;
}
function P7_initAP3(){
	var i,j,cn,tB,tA,tC,iM,sr,x,fnA,fnB,swp,s1,s2,s3,ob,tr,cP,tp,tBR,tBW,cl;
	if(p7AP3i){
		return;
	}
	p7AP3i=true;
	document.p7AP3preload=[];
	for(i=0;i<p7AP3ctl.length;i++){
		tB=document.getElementById(p7AP3ctl[i][0]);
		if(tB){
			tB.p7opt=p7AP3ctl[i];
			if(navigator.appVersion.indexOf("MSIE 5")>-1){
				tB.p7opt[2]=0;
			}
			tB.p7AP3cont=[];
			tB.p7AP3trig=[];
			tB.p7AP3mv=false;
			tB.ap3StartTime=0;
			tB.ap3Duration=tB.p7opt[12];
			tp='linear';
			if(tB.p7opt[2]==2){
				tp='quad';
			}
			else if(tB.p7opt[2]==3){
				tp='bounce';
				tB.ap3Duration=tB.p7opt[12]*2;
			}
			tB.ap3AnimType=tp;
			tB.ap3ToolbarClosed=false;
			tBR=document.getElementById(tB.id.replace('_','tb_'));
			tBW=document.getElementById(tB.id.replace('_','rw_'));
			if(tBR && tBW){
				tBR.ap3root=tB.id;
				tBR.ap3wrapper=tBW;
				cl=tBR.className;
				if(cl && cl!=='' && cl.indexOf('opened')>-1){
					tBR.ap3State='open';
					tBW.ap3State='open';
					P7_AP3setClass(tBW,'opened');
				}
				else{
					tB.ap3ToolbarClosed=true;
					tBW.ap3State='closed';
					tBR.ap3State='closed';
				}
tBR.onclick = function(){
	var tBW=this.ap3wrapper;
	if(tBW.ap3State=='open'){
		tBR.ap3State='closed';
		tBW.ap3State='closed';
		P7_AP3changeClass(tBR,'opened','closed');
		P7_AP3changeClass(tBW,'opened','closed');
	}
	else{
		tBR.ap3State='open';
		tBW.ap3State='open';
		P7_AP3changeClass(tBR,'closed','opened');
		P7_AP3changeClass(tBW,'closed','opened');
	}
};
tA=tBR.getElementsByTagName('A');
				if(tA && tA[0]){
						tA[0].onclick=function(){
							return false;
						};
				}
}
tA=tB.getElementsByTagName('A');
cn=-1;
for(j=0;j<tA.length;j++){
if(tA[j].id&&tA[j].id.indexOf(tB.id.replace('_','t')+'_')===0){
	tB.p7AP3trig[tB.p7AP3trig.length]=tA[j];
	tA[j].p7state='closed';
	tA[j].p7AP3pr=tB.id;
	tA[j].p7AP3ct=false;
	tC=document.getElementById(tA[j].id.replace('t','w'));
	cP=document.getElementById(tA[j].id.replace('t','p'));
	tB.p7AP3cont[tB.p7AP3cont.length]=(tC)?tC:null;
	if(cn==-1){
		P7_AP3setClass(tA[j],'ap3first');
		P7_AP3setClass(tA[j].parentNode,'ap3first');
		if(cP){
			P7_AP3setClass(cP,'panel_first');
		}
	}
	cn=j;
	if(tC){
		tC.p7state='closed';
		tC.p7AP3trg=tA[j].id;
		tA[j].p7AP3ct=tC.id;
		tC.ap3CurrentHeight=0;
		tC.ap3FinishHeight=0;
		tC.ap3StartHeight=0;
		tC.style.height='0px';
	}
	else{
		P7_AP3setClass(tA[j],'p7AP3_ext');
	}
	tA[j].onclick=function(){
		return P7_AP3trig(this);
	};
	if(tB.p7opt[6]==1){
		tA[j].onmouseover=function(){
			var tB=document.getElementById(this.p7AP3pr);
			if(this.p7state=='closed'){
				P7_AP3open(this);
			}
		};
	}
	if(tB.p7opt[7]==1){
		tA[j].onmouseout=function(evt){
			var tg,pp,dv,tB,m=true;
			tB=document.getElementById(this.p7AP3pr);
			dv=this.id.replace('t','w');
			evt=(evt)?evt:event;
			tg=(evt.toElement)?evt.toElement:evt.relatedTarget;
			if(tg){
				pp=tg;
				while(pp){
					if(pp.id&&pp.id.indexOf(dv)===0){
						m=false;
						break;
					}
					pp=pp.parentNode;
				}
			}
			if(m){
				P7_AP3close(this);
			}
		};
		if(tC){
			tC.onmouseout=function(evt){
				var tg,pp,tA,tB,m=true;
				evt=(evt)?evt:event;
				tg=(evt.toElement)?evt.toElement:evt.relatedTarget;
				tA=document.getElementById(this.p7AP3trg);
				tB=document.getElementById(this.p7AP3pr);
				if(tg){
					pp=tg;
					if(tg.id&&tg.id==tA.p7AP3pr){
						m=true;
					}
					else{
						while(pp){
							if(pp.id){
								if(pp.id.indexOf(tA.p7AP3pr)===0){
									m=false;
									break;
								}
							}
							pp=pp.parentNode;
						}
					}
					if(m){
						if(tA){
							if(tA.p7state=='open'){
								P7_AP3close(tA);
							}
						}
					}
				}
			};
		}
	}
	tA[j].hasImg=false;
	iM=tA[j].getElementsByTagName("IMG");
	if(iM&&iM[0]){
		sr=iM[0].getAttribute("src");
		swp=tB.p7opt[8];
		iM[0].ap3swap=swp;
		x=sr.lastIndexOf(".");
		fnA=sr.substring(0,x);
		fnB='.'+sr.substring(x+1);
		s1=fnA+p7AP3over+fnB;
		s2=fnA+p7AP3open+fnB;
		if(swp==1){
			iM[0].p7imgswap=[sr,s1,s1,s1];
			P7_AP3preloader(s1);
		}
		else if(swp==2){
			iM[0].p7imgswap=[sr,s1,s2,s2];
			P7_AP3preloader(s1,s2);
		}
		else{
			iM[0].p7imgswap=[sr,sr,sr,sr];
		}
		iM[0].p7state='closed';
		iM[0].mark=false;
		iM[0].rollover=tB.p7opt[9];
		if(swp>0){
			tA[j].hasImg=true;
			iM[0].onmouseover=function(){
				P7_AP3imovr(this);
			};
			iM[0].onmouseout=function(){
				P7_AP3imout(this);
			};
			tA[j].onfocus=function(){
				P7_AP3imovr(this.getElementsByTagName('IMG')[0]);
			};
			tA[j].onblur=function(){
				P7_AP3imout(this.getElementsByTagName('IMG')[0]);
			};
		}
	}
}
}
if(cn>-1){
P7_AP3setClass(tA[cn],'ap3last');
P7_AP3setClass(tA[cn].parentNode,'ap3last');
if(cP){
	P7_AP3setClass(cP,'panel_last');
}
}
if(tB.p7opt[3]==-2){
P7_AP3all(tB.id,'open');
}
else if(tB.p7opt[3]==-3){
P7_AP3all(tB.id,'open');
setTimeout("P7_AP3all('"+tB.id+"','close',1)",200);
}
else if(tB.p7opt[3]==-1){
ob=P7_AP3random(tB.id);
P7_AP3open(ob,1,1,1);
}
else{
tr=tB.id.replace("_","t")+"_"+tB.p7opt[3];
ob=document.getElementById(tr);
if(ob){
	P7_AP3open(ob,1,1,1);
}
}
}
}
for(i=0;i<p7AP3ctl.length;i++){
tB=document.getElementById(p7AP3ctl[i][0]);
if(tB.p7opt[5]==1&&tB.p7opt[3]!=-2){
if(tB.p7opt[3]==-3){
setTimeout("P7_AP3auto('"+tB.id+"')",200);
}
else{
P7_AP3auto(tB);
}
}
if(tB.p7opt[10]>0){
tB.p7rtmr=setTimeout("P7_AP3rotate('"+tB.id+"',"+tB.p7opt[10]+")",tB.p7opt[11]);
}
P7_AP3url(p7AP3ctl[i][0]);
}
p7AP3a=true;
}
function P7_AP3preloader(){
	var i,x;
	for(i=0;i<arguments.length;i++){
		x=document.p7AP3preload.length;
		document.p7AP3preload[x]=new Image();
		document.p7AP3preload[x].src=arguments[i];
	}
}
function P7_AP3imovr(im){
	var m=false,r=im.rollover;
	if(im.mark){
		m=(r>1)?true:false;
	}
	else if(im.p7state=='open'){
		m=(r==1||r==3)?true:false;
	}
	else{
		m=true;
	}
	if(m){
		im.src=im.p7imgswap[1];
	}
}
function P7_AP3imout(im){
	var r=im.rollover;
	if(im.mark){
		if(im.p7state=='open'){
			im.src=im.p7imgswap[2];
		}
		else{
			im.src=im.p7imgswap[3];
		}
	}
	else if(im.p7state=='open'){
		if(r==1||r==3){
			im.src=im.p7imgswap[2];
		}
	}
	else{
		im.src=im.p7imgswap[0];
	}
}
function P7_AP3control(tr,ac){
	P7_AP3ctl(tr,ac);
}
function P7_AP3controlAll(dv,ac){
	P7_AP3all(dv,ac);
}
function P7_AP3ctl(tr,ac,bp,tg,an,rt){
	var tA=document.getElementById(tr);
	if(tA){
		if(ac=='open'){
			if(tA.p7state!='open'){
				P7_AP3open(tA,bp,tg,an,rt);
			}
		}
		else if(ac=='close'){
			if(tA.p7state!='closed'){
				P7_AP3close(tA,bp,tg,an,rt);
			}
		}
		else if(ac=='trigger'){
			P7_AP3trig(tA,bp,tg,an,rt);
		}
	}
	return false;
}
function P7_AP3all(dv,ac,rt){
	var i,j,tB,a,tA,an=1;
	if(rt==1){
		an=null;
	}
	if(dv=='all'){
		for(i=0;i<p7AP3ctl.length;i++){
			tB=document.getElementById(p7AP3ctl[i][0]);
			tA=tB.p7AP3trig;
			for(j=0;j<tA.length;j++){
				if(ac=='open'&&tA[j].p7state!='open'){
					P7_AP3open(tA[j],1,1,an);
				}
				else if(ac=='close'&&tA[j].p7state!='closed'){
					P7_AP3close(tA[j],1,1,an);
				}
			}
		}
	}
	else{
		tB=document.getElementById(dv);
		if(tB){
			tA=tB.p7AP3trig;
			for(j=0;j<tA.length;j++){
				if(ac=='open'&&tA[j].p7state!='open'){
					P7_AP3open(tA[j],1,1,an);
				}
				else if(ac=='close'&&tA[j].p7state!='closed'){
					P7_AP3close(tA[j],1,1,an);
				}
			}
		}
	}
}
function P7_AP3random(dd){
	var i,k,j=0,tB,tA,a,rD=[];
	tB=document.getElementById(dd);
	if(tB){
		tA=tB.getElementsByTagName("A");
		for(i=0;i<tA.length;i++){
			if(tA[i].p7AP3pr && tA[i].p7AP3pr==dd && tA[i].p7AP3ct){
				rD[j]=tA[i].id;
				j++;
			}
		}
		if(j>0){
			k=Math.floor(Math.random()*j);
			a=document.getElementById(rD[k]);
		}
	}
	return a;
}
function P7_AP3rotator(dv,md,pn){
	P7_AP3rotate(dv,md,pn);
}
function P7_AP3rotate(dv,md,pn){
	var i,pl,tB=document.getElementById(dv);
	if(md===0){
		if(tB.p7rtmr){
			clearTimeout(tB.p7rtmr);
		}
		if(tB.p7rtrun){
			tB.p7rtcntr--;
			tB.p7rtrun=false;
		}
		return;
	}
	else{
		if(tB.p7rtrun){
			return;
		}
	}
	if(tB&&tB.p7AP3trig){
		if(md>0){
			tB.p7rtmd=md;
			tB.p7rtcy=1;
			tB.p7rtcntr=1;
		}
		if(!pn||pn<0){
			pn=-1;
			for(i=0;i<tB.p7AP3trig.length;i++){
				if(tB.p7AP3trig[i].p7state=='open'){
					pn=i;
					break;
				}
			}
		}
		else{
			pn--;
		}
		pl=pn;
		pn=(pn<=-1)?0:pn;
		pn=(pn>tB.p7AP3trig.length-1)?tB.p7AP3trig.length-1:pn;
		if(md>0){
			tB.p7rtsp=(pl==-1)?pl:pn;
		}
		if(tB.p7rtmr){
			clearTimeout(tB.p7rtmr);
		}
		tB.p7rtmr=setTimeout("P7_AP3runrt('"+dv+"',"+pn+")",10);
	}
}
function P7_AP3runrt(dv,n){
	var a,tB;
	tB=document.getElementById(dv);
	tB.p7rtrun=true;
	if(tB.p7rtmr){
		clearTimeout(tB.p7rtmr);
	}
	if(n>-1&&n<tB.p7AP3trig.length){
		a=tB.p7AP3trig[n];
		if(a.p7state!="open"){
			P7_AP3open(a,null,null,null,1);
		}
		tB.p7rtcntr++;
	}
	n++;
	if(tB.p7rtcntr>tB.p7AP3trig.length){
		tB.p7rtcy++;
		tB.p7rtcntr=1;
	}
	if(n>=tB.p7AP3trig.length){
		n=0;
	}
	if(tB.p7rtcy>tB.p7rtmd){
		if(tB.p7rtsp==-1){
			tB.p7rtmr=setTimeout("P7_AP3all('"+dv+"','close',1)",tB.p7opt[11]);
		}
		else{
			tB.p7rtmr=setTimeout("P7_AP3ctl('"+	tB.p7AP3trig[n].id+"','open',true,false,false,1)",tB.p7opt[11]);
		}
		tB.p7rtrun=false;
	}
	else{
		tB.p7rtmr=setTimeout("P7_AP3runrt('"+dv+"',"+n+")",tB.p7opt[11]);
	}
}
function P7_AP3trig(a,bp,tg,an,rt){
	var h,wH,m=false;
	if(!p7AP3a&&!bp){
		return false;
	}
	h=a.getAttribute("href");
	wH=window.location.href;
	if(h&&h!==''){
		if(a.href!=wH && a.href!=wH+'#' && a.href.indexOf('#p7AP3')==-1){
			if(h.search(/javas/i)!==0){
				if(!a.p7AP3ct || a.p7state=='open'){
					m=true;
				}
			}
		}
	}
	if(!m){
		if(a.p7state=='open'){
			P7_AP3close(a,bp,tg,an,rt);
		}
		else{
			P7_AP3open(a,bp,tg,an,rt);
		}
	}
	return m;
}
function P7_AP3open(a,bp,tg,an,rt){
	var i,j,tB,cT,iM,op,tC;
	if(!p7AP3a&&!bp){
		return;
	}
	if(a.p7state=='open'){
		return;
	}
	tB=document.getElementById(a.p7AP3pr);
	op=tB.p7opt[2];
	if(!p7AP3a||an==1){
		op=0;
	}
	a.p7state='open';
	P7_AP3setClass(a,'p7AP3trig_down');
	if(a.hasImg){
		iM=a.getElementsByTagName("IMG")[0];
		iM.p7state='open';
		iM.src=iM.p7imgswap[2];
	}
	cT=document.getElementById(a.p7AP3ct);
	if(!cT){
		return;
	}
	tC=document.getElementById(a.id.replace('t','c'));
	if((!tg&&tB.p7opt[1]==1)||rt==1){
		for(i=0;i<tB.p7AP3trig.length;i++){
			if(tB.p7AP3trig[i].p7state=='open'){
				if(tB.p7AP3trig[i]!=a){
					P7_AP3close(tB.p7AP3trig[i],1,1);
				}
			}
		}
	}
	if(cT){
		if(op>0&&P7_AP3hasOverflow(cT.getElementsByTagName('DIV')[0])){
			op=0;
		}
		if(tB.p7opt[2]>0){
			cT.ap3StartHeight=cT.offsetHeight;
			cT.ap3FinishHeight=tC.offsetHeight;
			cT.ap3CurrentHeight=cT.ap3StartHeight;
			cT.style.height=cT.ap3StartHeight+'px';
			for(j=0;j<tB.p7AP3trig.length;j++){
				if(tB.p7AP3cont[j]){
					tB.p7AP3cont[j].ap3StartHeight=tB.p7AP3cont[j].offsetHeight;
				}
			}
			tB.ap3StartTime=P7_AP3getTime(0);
			cT.ap3StartTime=P7_AP3getTime(0);
			if(op>0){
				if(!tB.p7AP3running){
					tB.p7AP3running=true;
					tB.p7AP3glide=setInterval("P7_AP3glide('"+tB.id+"','"+tB.ap3AnimType+"')",p7AP3dy);
				}
			}
			else{
				cT.ap3CurrentHeight=cT.ap3FinishHeight;
				cT.style.height='auto';
			}
		}
		else{
			cT.style.height='auto';
		}
	}
}
function P7_AP3close(a,bp,tg,an,rt){
	var i,j,m=false,tB,cT,iM,op;
	if(!p7AP3a&&!bp){
		return;
	}
	if(a.p7state=='closed'){
		return;
	}
	tB=document.getElementById(a.p7AP3pr);
	op=tB.p7opt[2];
	if(!p7AP3a||an==1){
		op=0;
	}
	if(!tg&&tB.p7opt[4]==1){
		for(i=0;i<tB.p7AP3trig.length;i++){
			if(tB.p7AP3trig[i].p7state=='open'){
				if(tB.p7AP3trig[i]!=a){
					m=true;
					break;
				}
			}
		}
		if(!m){
			return;
		}
	}
	a.p7state='closed';
	P7_AP3remClass(a,'p7AP3trig_down');
	if(a.hasImg){
		iM=a.getElementsByTagName("IMG")[0];
		iM.p7state='closed';
		if(iM.mark){
			iM.src=iM.p7imgswap[3];
		}
		else{
			iM.src=iM.p7imgswap[0];
		}
	}
	cT=document.getElementById(a.p7AP3ct);
	if(cT){
		if(P7_AP3hasOverflow(cT.getElementsByTagName('DIV')[0])){
			op=0;
		}
		if(tB.p7opt[2]>0){
			cT.ap3StartHeight=cT.offsetHeight;
			cT.ap3FinishHeight=0;
			cT.ap3CurrentHeight=cT.ap3StartHeight;
			cT.style.height=cT.ap3StartHeight+'px';
			for(j=0;j<tB.p7AP3trig.length;j++){
				if(tB.p7AP3cont[j]){
					tB.p7AP3cont[j].ap3StartHeight=tB.p7AP3cont[j].offsetHeight;
				}
			}
			tB.ap3StartTime=P7_AP3getTime(0);
			cT.ap3StartTime=P7_AP3getTime(0);
			if(op>0){
				if(!tB.p7AP3running){
					tB.p7AP3running=true;
					tB.p7AP3glide=setInterval("P7_AP3glide('"+tB.id+"','"+tB.ap3AnimType+"')",p7AP3dy);
				}
			}
			else{
				cT.ap3CurrentHeight=0;
				cT.style.height='0px';
			}
		}
		else{
			cT.style.height='0px';
		}
	}
}
function P7_AP3glide(d,tp){
	var i,tD,tC,tA,nh,et,cet,m=false;
	tD=document.getElementById(d);
	tC=tD.p7AP3cont;
	tA=tD.p7AP3trig;
	et=P7_AP3getTime(tD.ap3StartTime);
	if(et>=tD.ap3Duration){
		et=tD.ap3Duration;
	}
	for(i=0;i<tA.length;i++){
		if(tC[i]){
			if(tC[i].ap3CurrentHeight!=tC[i].ap3FinishHeight){
				nh=P7_AP3anim(tp,et,tC[i].ap3StartHeight,tC[i].ap3FinishHeight-tC[i].ap3StartHeight,tD.ap3Duration);
				tC[i].ap3CurrentHeight=nh;
				tC[i].style.height=nh+'px';
				m=true;
			}
			else if(tA[i].p7state=='open'){
				if(tC[i].ap3CurrentHeight==tC[i].ap3FinishHeight){
					tC[i].style.height='auto';
				}
			}
		}
	}
	if(!m){
		tD.p7AP3running=false;
		clearInterval(tD.p7AP3glide);
	}
}
function P7_AP3getTime(st){
	var d = new Date();
	return d.getTime() - st;
}
function P7_AP3url(dv){
	var i,h,s,x,d='ap3',a,n=dv.replace("p7AP3_","");
	if(document.getElementById){
		h=document.location.search;
		if(h){
			h=h.replace('?','');
			s=h.split(/[=&]/g);
			if(s&&s.length){
				for(i=0;i<s.length;i+=2){
					if(s[i]==d){
						x=s[i+1];
						if(n!=x.charAt(0)){
							x=false;
						}
						if(x){
							a=document.getElementById('p7AP3t'+x);
							if(a&&a.p7state!="open"){
								P7_AP3open(a,1);
							}
						}
					}
				}
			}
		}
		h=document.location.hash;
		if(h){
			x=h.substring(1,h.length);
			if(n!=x.charAt(3)){
				x=false;
			}
			if(x&&x.indexOf(d)===0){
				a=document.getElementById('p7AP3t'+x.substring(3));
				if(a&&a.p7state!="open"){
					P7_AP3open(a,1);
				}
			}
		}
	}
}
function P7_AP3auto(ob){
	var i,wH,tr,pp,im,r1,tA,pA;
	if (typeof ob!='object'){
		ob=document.getElementById(ob);
	}
	wH=window.location.href;
	if(ob.p7opt[14]!=1){
		wH=wH.replace(window.location.search,'');
	}
	if(wH.charAt(wH.length-1)=='#'){
		wH=wH.substring(0,wH.length-1);
	}
	r1=/index\.[\S]*/i;
	tA=ob.getElementsByTagName("A");
	for(i=0;i<tA.length;i++){
		if(tA[i].href==wH){
			if(tA[i].p7AP3pr){
				tr=tA[i];
				break;
			}
			else{
				P7_AP3setClass(tA[i],'current_mark');
				pp=tA[i].parentNode;
				while(pp){
					if(pp.id&&pp.id.indexOf('p7AP3w')===0){
						tr=document.getElementById(pp.p7AP3trg);
						break;
					}
					pp=pp.parentNode;
				}
				break;
			}
		}
	}
	if(tr){
		P7_AP3setClass(tr,'current_mark');
		P7_AP3setClass(tr.parentNode,'current_mark');
		if(tr.hasImg){
			im=tr.getElementsByTagName('IMG')[0];
			im.mark=true;
			im.src=im.p7imgswap[3];
		}
		if(ob.p7opt[13]==1){
			P7_AP3open(tr,1);
		}
		pp=tr.parentNode;
		while(pp){
			if(pp.id && pp.id.indexOf('p7AP3w')===0){
				pA=document.getElementById(pp.id.replace('w','t'));
				if(pA){
					P7_AP3setClass(pA,'current_mark');
					P7_AP3setClass(pA.parentNode,'current_mark');
					if(pA.hasImg){
						im=pA.getElementsByTagName('IMG')[0];
						im.mark=true;
						im.src=im.p7imgswap[3];
					}
					if(ob.p7opt[13]==1){
						P7_AP3open(pA,1);
					}
				}
			}
			if(pp.nodeName && pp.nodeName=='BODY'){
				break;
			}
			pp=pp.parentNode;
		}
	}
}
function P7_AP3changeClass(ob,clf,clt){
	if(ob){
		var cc,nc;
		cc=ob.className;
		if(cc&&cc.indexOf(clf>-1)){
			nc=cc.replace(clf,clt);
			ob.className=nc;
		}
		else{
			P7_AP3setClass(ob,clt);
		}
	}
}
function P7_AP3setClass(ob,cl){
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
function P7_AP3remClass(ob,cl){
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
function P7_AP3hasOverflow(ob){
	var s,m;
	if(navigator.userAgent.toLowerCase().indexOf('gecko')>-1){
		s=ob.style.overflow;
		if(!s){
			if(document.defaultView.getComputedStyle(ob,"")){
				s=document.defaultView.getComputedStyle(ob,"").getPropertyValue("overflow");
			}
		}
	}
	m=(s&&s=='auto')?true:false;
	return m;
}
function P7_AP3anim(tp,t,b,c,d){
	if(tp=='linear'){
		return (c*(t/d))+b;
	}
	else if(tp=='quad'){
		if((t/=d/2)<1){
			return c/2*t*t+b;
		}
		else{
			return -c/2*((--t)*(t-2)-1)+b;
		}
	}
	else if(tp=='inquad'){
		var tt=t/d;
		return c * (tt)*(tt) + b;
	}
	else if(tp=='bounce'){
		if((t/=d)<(1/2.75)){
			return c*(7.5625*t*t)+b;
		}
		else if(t<(2/2.75)){
			return c*(7.5625*(t-=(1.5/2.75))*t+0.75)+b;
		}
		else if (t<(2.5/2.75)){
			return c*(7.5625*(t-=(2.25/2.75))*t+0.9375)+b;
		}
		else{
			return c*(7.5625*(t-=(2.625/2.75))*t+0.984375)+b;
		}
	}
}
