var CaptionContainer;(function(n){function wt(){y||(y=!0,v(_w,at,bt,!0))}function bt(){u=[];y=!1}function kt(n){return u[n]?u[n].clientHeight:0}var w="vrhcs",ft="vrht",et="vrhdl",ot="vrhmd",st="vrhmdvc",b="vrhmddu",k="vrhmdpd",d="vrhmdr",ht="vrhs",g="vrhsi",ct="vrhsn",lt="vrhcadl",s="vrhspu",at="unload",nt="captionContainer",vt="data-actionkey",f="undefined",t=typeof pMMUtils!=f?pMMUtils:null,h=typeof SmartEvent!=f?SmartEvent:null,e=typeof VideoRichHoverUtils!=f?VideoRichHoverUtils:null,r=typeof VRHConsts!=f?VRHConsts:null,o=!1,i=null,tt=null,yt=null,it=null,c=null,rt=null,l=null,a=null,ut=null,v=null,u=[],y=!1,p;if(!o&&t&&t.gfbc&&t.sepd&&t.ga&&e&&e.showElementFromList&&e.showElement&&h&&r&&h.bind&&(i=t.gfbc,tt=t.sepd,yt=t.gebc,c=t.ga,it=t.gsh,a=t.ac,ut=t.sh,rt=e.showElementFromList,l=VideoRichHoverUtils.showElement,v=h.bind,o=!0),o&&_w&&!_w[nt]){_w[nt]=n;function pt(n,t,i,r,f,e,s,h){o&&n&&n.length>1&&i>0&&(u[n]&&(u[n]=null),u[n]=f?new p(t,i,r,f,e,s,h):new p(t,i,r,null,e,s,h));return}wt();n.init=pt}n.clientHeight=kt;p=function(){function n(n,u,f,e,o,h,y){var p=this,lt,nt;(this.clientHeight=0,this.bindEventForMask=function(){sj_evt.bind(r.CaptionHideEvt,p.onHide);sj_evt.bind(r.CaptionShowEvt,p.onShow)},this.bindEvent=function(){sj_evt.bind(r.HoverCaptionHUpdateEvt,p.onResizeHeight);sj_evt.bind(r.HoverCancelEvt,p.unBindEvent)},this.unBindEvent=function(){sj_evt.unbind(r.HoverCaptionHUpdateEvt,p.onResizeHeight)},this.onResizeHeight=function(n){if(n&&!(n.length>2)&&!isNaN(n[1])){var t=parseInt(n[1]);ut(p.captionContainer,t)}},this.onMouseMove=function(){sj_evt.fire(VRHConsts.PlayerReplayEvt,p.instMetaData,p.playerName)},this.onShow=function(){l(p.captionContainer,!0)},this.onHide=function(){l(p.captionContainer,!1)},this.setTextElement=function(n,t,r,u){if(!n||!u)return!1;var f=i(t,n);return r&&f?(f.innerHTML=r,u.push(f),!0):!1},this.setSource=function(n,t,u,f,e,o){var h=i(ht,n),y,c,l,w;h&&(y=i(g,h),c=!1,t&&t.length>0&&(y.className=g+" "+t,o.push(y),c=!0),c=p.setTextElement(h,ct,u,o)||c,l=p.setTextElement(h,s,f,o),l&&e&&e.length>0&&(w=i(s,h),a(w,"chlf"),v(w,"click",p.onChannelClick),sj_evt.fire(r.HoverChannelFilterEvt,p.instMetaData,p.publish,p.publishId,"cov")),(c||l)&&o.push(h),p.setDelimiter(n,s,c&&l))},this.setMetaData=function(n,t,r,u,f,e){var s=i(ot,n);if(s){var a=p.setTextElement(s,st,r,e),h=p.setTextElement(s,b,u,e),c=p.setTextElement(s,k,t,e),l=p.setTextElement(s,d,f,e),o=a;p.setDelimiter(n,b,o&&h);o=o||h;p.setDelimiter(n,k,o&&c);o=o||c;p.setDelimiter(n,d,o&&l);o=o||l;o&&e.push(s)}},this.onChannelClick=function(n){p.filterUrlFormat&&p.publishId&&p.publish&&(n==null||n.button!=2)&&(_w.location.href=StringHelper.format(p.filterUrlFormat,[p.publish,p.publishId]),sj_evt.fire(r.HoverChannelFilterEvt,p.instMetaData,p.publish,p.publishId,"click"),tt(n))},this.setActionBehavior=function(n,t){var r=i("sa_wrapper",p.captionContainer);if(r){var u=p.actkeylst,f=u?u.split(";"):[],e=c(r,vt);p.setEachAction(r,f.indexOf(e)>=0,n);sj_evt.fire("StatefulAction.AttachEventPayLoad",r,t)}},this.setEachAction=function(n,i,r){if(n){var u=n.parentNode;u&&t.hc(u,w)&&(i?(t.sd(n,"inline-block"),r.push(n),p.saved&&sj_evt.fire("StatefulAction.SwitchState",n)):t.sd(n,"none"))}},this.captionContainer=i(w,n),this.captionContainer)&&e&&(this.filterUrlFormat=e.filterUrlFormat,this.publish=e.pu,this.publishId=e.puid,this.instMetaData=o,this.actkeylst=e.actkeylst,this.actpayload=e.actpayload,this.saved=e.saved,this.playerName=y,lt=parseInt(c(this.captionContainer,"asMask"))===1,nt=new Array(0),this.setTextElement(this.captionContainer,ft,e.t,nt),this.setTextElement(this.captionContainer,et,e.de,nt),t.sw(this.captionContainer,u),this.setMetaData(this.captionContainer,e.pud,e.vc,e.du,e.r,nt),this.setSource(this.captionContainer,e.sk,e.s,e.pu,e.puid,nt),this.setActionBehavior(nt,h),nt.length>0&&(t.ac(n," fullsize"),nt.push(this.captionContainer)),lt&&this.bindEventForMask(),this.bindEvent(),sj_be(this.captionContainer,"mousemove",this.onMouseMove),sj_evt.fire(VRHConsts.HoverCaptionLoadEvt,o),rt(nt,f),this.clientHeight=lt===!0?0:it(this.captionContainer))}return n.prototype.setDelimiter=function(n,t,r){if(r){var u=i(t,n);u&&a(u,lt)}},n}()})(CaptionContainer||(CaptionContainer={}))