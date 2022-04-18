define("ajax.shared",["require","exports"],function(n,t){function r(n){var r=keyMap[n]?keyMap[n]:keyMap.Prefix+n,i=document.getElementById(r),t;return!i&&document.getElementsByClassName&&(t=document.getElementsByClassName(r),i=t&&t.length?t[0]:null),i}function u(n){var f=sj_ce("a"),t,r,u;return f.href=n,t=f.pathname,t[0]!=="/"&&(t="/"+t),t=t.replace(i,"/"),r="",t==="/"?r=t:(u=n.indexOf(t),r=u>-1?n.substr(u):""),r}function f(n,t,i){for(;n&&n!==document;n=n.parentNode){if(n[t]===i)return n;if(n===undefined)break}}var i=/^(\/)(\1+)/;t.getPlaceholder=r;t.getRelativeUrl=u;t.getParentContainer=f});define("ajax.cache",["require","exports"],function(n,t){function p(n,t,i,r){if(n>=0){var u=d(n);switch(t){case"Script":u.ScriptHolder.push(r);break;case"Style":u.Style+=r;break;case"EOS":u.Script=u.ScriptHolder;delete u.ScriptHolder;u[t]=r;h(i,u);break;default:u[t]=r}}}function w(n){var t=sessionStorage.getItem(i+n);return t?JSON.parse(t):null}function h(n,t){_G.JCache&&k(i+n,JSON.stringify(t));t={}}function b(n){var f=i+n,u=sessionStorage.getItem(f),t,r;u&&(t=JSON.parse(u),r=t?t.IG:"-1",_G.IG!==r&&sj_log("CI.Ajax","Cache",r))}function k(n,t){var i,r,u;try{i=sessionStorage.getItem(o);i=i?parseInt(i):1;r=v+i;u=sessionStorage.getItem(r);u&&sessionStorage.removeItem(u);sessionStorage.setItem(n,t);sessionStorage.setItem(r,n);i=i>=y?1:i+1;sessionStorage.setItem(o,i)}catch(f){}}function d(n){while(n>=r.length)r.push({Style:"",SearchForm:"",Content:"",ScriptHolder:[]});return r[n]}function c(){var u,e,i,o,n,r,l;if((g(),t.hasStorage)&&_w.JSON&&_w.keyMap){for(u=a.getCssHolder(),e=document.getElementsByTagName("link"),n=0;n<e.length;n++)i=e[n],i.parentElement===document.body&&!i.hasAttribute("data-rms")&&i.hasAttribute("data-tag")&&i.getAttribute("data-tag")==="fcpStyleLinkPreload"&&u.appendChild(i);for(o=document.body.getElementsByTagName("style"),n=0;n<o.length;n++)r=o[n],r.parentElement!==document.body||r.hasAttribute("data-rms")||u.appendChild(r);b(s);_G.JCache&&(l=nt(),h(l.Url,l));f.unbind("onP1",c)}}function g(){try{sessionStorage.setItem(i,i);sessionStorage.removeItem(i);t.hasStorage=!0}catch(n){t.hasStorage=!1}}function nt(){for(var h,r,c,t,f,e,o,i,l,a,v,y="",p=document.body.getElementsByTagName("style"),n=0;n<p.length;n++)h=p[n],h.hasAttribute("data-rms")||(y+=h.outerHTML);for(r=[],r.push({Content:tt()+"_G.ST=new Date;"}),c=document.body.getElementsByTagName("script"),n=0;n<c.length;n++)t=c[n],t.hasAttribute("data-rms")||t.hasAttribute("data-ajaxResKey")||t.type==="text/rms"||t.hasAttribute("data-bing-script")||(f=t.src,r.push({Content:f?f:it(t.text),Method:f?"reference":"inline"}));if(e="",document.querySelectorAll&&(o=document.querySelectorAll("div[id^=emb]"),o.length)){for(i=document.createElement("div"),i.id="b_EmbDivs",i.className="b_hide",document.body.appendChild(i),n=0;n<o.length;n++)l=o[n],a=l.id,a.substr(a.length-3)==="DIV"&&i.appendChild(l);e=i.outerHTML}return v={Style:y,scopebar:u("scopebar"),Identity:u("Identity"),SearchForm:_G.SRF,Content:_G.CNT,RmsDefer:u("RmsDefer"),EmbDivs:e,IG:_G.IG,Title:document.title,Url:s,Script:r,HBop:rt(),EOS:1},e===""&&delete v.EmbDivs,v}function tt(){var i=[],n,t;for(n in _G)t=_G[n],typeof t=="string"&&t.length<100&&t.indexOf('"')===-1&&i.push(n+':"'+_G[n]+'"');return"var _G={"+i.join(",")+"};"}function it(n){var e=n.indexOf("_w.rms.js"),i,r,o,u,f,t,s;if(e===-1)return n;for(i=[],_w.keyMap&&(i=keyMap.RmsKeys),r=0;r<i.length;r++)(o=i[r],u=n.indexOf(o,e),u!==-1)&&((f=n.lastIndexOf("{",u),t=n.indexOf("}",u),f===-1||t===-1||f<e)||(t+=n[t+1]===","?2:1,s=n.substring(f,t),n=n.replace(s,"")));return n}function u(n){var t=e.getPlaceholder(n);return t?t.outerHTML:""}function rt(){var i="",t,n,r;if(document.getElementsByClassName)for(t=document.getElementsByClassName(l),n=0;n<t.length;n++)r=t[n],i+=r.parentElement.outerHTML;return i}var l="ftrD",ut=n("cookies"),a=n("dom"),f=n("event.custom"),e=n("ajax.shared"),i="bing#",v="bingi#",o="bingIndex",r=[],y=10,s=e.getRelativeUrl(window.location.href);t.hasStorage=!0;t.cacheItem=p;t.fetch=w;f.bind("onP1",c,!0)});define("ajax.history",["require","exports"],function(n,t){function o(n){history.pushState(i,i,n)}function s(n){history.replaceState(i,i,n)}function h(){var n=_w.location,t=n.href,i=t.indexOf(e),f;i>=0?(f=t.substr(i),u.fire("ajax.state",f)):n.pathname===r&&_w.sj_lc(r)}var u=n("event.custom"),f=n("event.native"),e="/search",r="/",i=null;t.pushState=o;t.replaceState=s;f.bind(_w,"popstate",h,!1)});define("ajax.maskBase",["require","exports"],function(n,t){function e(n){var t=document.createElement("style"),i;t.setAttribute("data-rms","1");document.body.appendChild(t);i="#"+u+n;i+="a,a *{-ms-touch-action:manipulation;touch-action:manipulation}";t.textContent!==undefined?t.textContent=i:t.styleSheet&&(t.styleSheet.cssText+=i)}function r(){return i=document.getElementById(u),i?!0:!1}function o(){var l=n("ajax.instant"),f,v,c,e;if(l&&l.enabled||h(),f=document.getElementById(keyMap.Content),f){var t=f.getBoundingClientRect(),o=t.width?Math.abs(t.right-t.left):t.width,a=s(f,"paddingLeft");o=o-(a?parseInt(a):0);v=t.height?Math.abs(t.bottom-t.top):t.height;c="px";r()||(i=document.createElement("div"),i.setAttribute("id",u));i.style.height=v+c;i.style.width=o+c;e=f.childNodes;e&&e.length&&f.insertBefore(i,e[0])}}function s(n,t){var i;if(window.getComputedStyle)i=getComputedStyle(n,null);else if(n.currentStyle)i=n.currentStyle;else return null;return i[t]}function h(){var n=f.getPlaceholder("AutoSug"),t=f.getPlaceholder("header");n&&t&&(n.style.display="none",t.className="")}function c(){r()&&i.parentNode.removeChild(i)}function l(n){if(r())for(var t in n)i.style[t]=n[t]}function a(){return r()}function v(){try{window.scrollTo(0,0)}catch(n){}}var y=n("event.custom"),f=n("ajax.shared"),u="ajaxMaskLayer",i;t.addAjaxStyles=e;t.addMask=o;t.removeMask=c;t.updateMask=l;t.hasMask=a;t.scrollToTop=v});define("ajax.noMask",["require","exports","ajax.maskBase"],function(n,t,i){function u(){i.addAjaxStyles("{position:absolute;background-color:white;opacity:0;z-index:-1}");r.unbind("onP1",u)}var r=n("event.custom");r.bind("onP1",u,!0);r.bind("ajax.requestSent",i.addMask);r.bind("ajax.firstChunkEnd",function(){i.updateMask({zIndex:"10"})});r.bind("ajax.load",function(){i.scrollToTop()})});define("ajax.framework",["require","exports","ajax.cache","ajax.history"],function(n,t,i,r){function ti(){var r="onpopstate"in _w&&_w.history&&_w.history.pushState,f,n,t;if(c||(c=w.get("_SS","SID"),pt="jsonv2"),_w.keyMap&&i.hasStorage&&_w.JSON&&document.getElementsByClassName&&c&&r&&b){if(gi=w.get("SRCHHPGUSR","AS"),ii(),u.bind("ajax.state",dr),nt.bind(document,"keydown",function(n){n.keyCode===27&&b.preventDefault(n)}),document.querySelectorAll)for(f=document.querySelectorAll("script[data-ajaxResKey]"),n=0;n<f.length;n++)at[f[n].getAttribute("data-ajaxResKey")]=!0;_w.sj_isAjax=!0;u.fire("ajaxReady")}i.hasStorage&&r&&c||(t=i.hasStorage?"":"SS NA ",t+=r?"":"History NA",t+=c?"":"SID NA",sj_log("CI.Ajax","H5Support",t),ft());u.unbind("onP1",ti)}function ii(){var t,n,i;if(u.bind("ErrorInstrumentation",function(){ft()}),u.bind("LayoutError",function(){ft()}),keyMap.IsHP)for(t=document.getElementsByTagName("form"),n=0;n<t.length;n++)t[n].id==="sb_form"&&ri(t[n],p);else i=document.getElementById("sb_form"),i&&ri(i,p);document.onclick=sr;window.sj_lc=function(n,t,i){var r=t;r||(r=s.AS);gr(n,r,i)}}function ri(n){nt.bind(n,"submit",p);u.bind("autoSugLoaded",function(){nt.unbind(n,"submit",p);n.submit=p},!0)}function or(){document.onclick=null;var n=document.getElementById("sb_form");nt.unbind(n,"submit",p);_w.sj_lc=function(n){_w.location.assign(n)};n.submit=function(){var n=ci();n&&_w.location.assign(n)};_w.sj_isAjax=!1}function ft(){if(!lt){var n=parseInt(w.get("_SS","h5comp"));isNaN(n)&&(n=-1);or();n=n>2?3:n+1;lt=!0;w.set("_SS","h5comp",n,!1,"/")}}function sr(n){var r,t;if(!n.defaultPrevented&&!n.ctrlKey&&!n.shiftKey&&n.button===0&&(r=n.target,t=o.getParentContainer(r,"tagName","A"),t&&(t.target==="_self"||!t.target)&&t.getAttribute("data-noajax")!=="1")){var u=t.pathname,f=t.protocol?t.protocol:location.protocol,h=t.hostname?t.hostname:location.hostname,i=t.href;i=i.replace(bi,"");keyMap.FeaturePersist&&(e=hr(t),i=i.replace(ki,""));i&&(t.href=i);h===location.hostname&&u.indexOf(tt)===0&&location.protocol===f&&(i=d(i.substr(i.indexOf(tt))),i!==d(k)&&(i=ui(i),et(i,s.Click),n.preventDefault()))}}function ui(n){var t,i;return e&&(bt++,n+="&ajax="+e.getAttribute(ut),n+="&axID="+bt,t=e.getAttribute("data-ajax-pig"),t&&(n+="&pIG="+t),i=e.getAttribute("data-ajax-nid"),i&&(n+="&axNID="+i)),n}function hr(n){while(n&&n!==document.body){if(n.hasAttribute(ut))return n.getAttribute(ut)?n:null;n=n.parentNode}return null}function fi(n,t,i){var r,u,f;i!==dt&&(dt=i);for(r in n)if(r==="Script")for(u=0;u<n[r].length;u++)f=n[r][u],ei(t,r,i,f);else ei(t,r,i,n[r])}function ei(n,t,r,u){cr(n,t,r,u);i.cacheItem(n,t,r,u)}function cr(n,t,i,r){var l,s,v,h,c,f;if(i===k)switch(t){case"Script":r.Method==="reference"?a.includeScriptReference(r.Content):r.Method==="referenceOnce"?(l=r.Key,at[l]||(a.includeScriptReference(r.Content),at[l]=!0)):a.includeScript(r.Content);break;case"Style":nu();a.getCssHolder().innerHTML+="<div><\/div>"+r;break;case"IG":_G.IG=r;break;case"Title":kt.innerHTML=r;document.title=kt.innerText;break;case"EOS":lr(i);break;case"HBop":f=document.createElement("div");document.getElementById(keyMap.Content).appendChild(f);f.outerHTML=r;y.push(t);break;case"RmsDefer":case"EmbDivs":s=o.getPlaceholder(t);s||(s=document.createElement("div"),document.body.appendChild(s));s.outerHTML=r;break;case"Content":keyMap.FeaturePersist&&e?(v=document.createDocumentFragment(),f=document.createElement("div"),v.appendChild(f),f.innerHTML=r,h=v.querySelector("#persistent"+e.getAttribute(ut)),h?h.parentNode.replaceChild(e,h):u.reset(null,si(),!0),c=o.getPlaceholder(t),c&&(c.parentNode.replaceChild(f.firstChild,c),y.push(t)),u.fire("ajax.persist")):oi(t,r);u.fire("ajax.contentEnd");rt!==null&&(sb_ct(rt),rt=null);break;case"EOC":r==="1"&&u.fire("ajax.firstChunkEnd");break;case"Keys":ht=r;break;case"LangSwitch":case"MarketSwitch":f=document.createElement("div");document.body.appendChild(f);f.outerHTML=r;y.push(t);break;default:oi(t,r)}}function lr(n){if(f){var t=f.onload,i=sb_st(function(){vt(n);f.onload=function(){}},1e3);f.onload=function(){sb_ct(i);vt(n);t&&t()}}else vt(n)}function vt(n){o.ajaxPerf&&(l.performance=f&&f.contentWindow&&f.contentWindow.performance);ct=!1;u.bind("onPP",function(){return ct=!0});ar();ii();tu();kr(n);g.setTimeout(function(){return wr()},1)}function oi(n,t){var i=o.getPlaceholder(n);i&&(i.outerHTML=t,y.push(n))}function ar(){_G.PPS=!1;try{_G.BPT=new Date;_w.lb&&lb();var n=f&&f.contentWindow,t=o.ajaxPerf?l.performance:n&&n.performance,i=t&&t.timing;si_PP(new Date,"L",i?i:it)}catch(r){si_PP(new Date)}}function vr(){u.fire("unload");u.fire("ajax.unload");lt=!1;g.clear();b.forEach(ai,function(n){window.hasOwnProperty(n)&&(window[n]=it,delete window[n])});b.forEach(vi,function(n){for(var i,r=document.getElementsByClassName(n),t=0;t<r.length;t++)i=r[t],i.parentNode.removeChild(i)});pr();uu();u.reset(yr(),si());li.reset();y=[];ht=[]}function yr(){var t=null,r=e?e.getAttribute("data-ajax-cetp"):"",i,n;if(r)for(t={},i=r.split(","),n=0;n<i.length;n++)t[i[n]]="";return t}function si(){return(v==s.Answer||v==s.History)&&e?e.getAttribute("data-ajax-pocetp"):""}function pr(){window.Bing&&Bing.hasOwnProperty("MapControl")&&(Bing.MapControl=it,delete Bing.MapControl);window.$MapsNamespace&&window.hasOwnProperty($MapsNamespace)&&(window[$MapsNamespace]=it,delete window[$MapsNamespace])}function wr(){o.ajaxPerf?u.fire("ajax.load",l):u.fire("ajax.load");u.fire("onHTML");ct||u.fire("onPP");u.fire("onP1Lazy");o.ajaxPerf?u.fire("ajax.postload",l):u.fire("ajax.postload");l={}}function et(n,t){h=tr;try{if(window.performance&&performance.now&&performance.now()>wi){yt(n,"PageExpired",h,t);return}k=n;v=t;ot=!0;vr();h=ir;br(n,t)}catch(r){var u=h===gt&&!document.getElementById(wt)?!1:!0,i=""+r;u?yt(n,i,h,t):hi(i,h)}}function br(n,t){var p,r,e,o,a,b;st.indexOf(n)===-1&&(f&&f.parentNode&&(f.onload=null,f.parentNode.removeChild(f),f=null),t===s.History&&(p=i.fetch(n))?(h=gt,l.fromCache=!0,fi(p,-1,n)):(l.fromCache=!1,r=window.AjaxCB.length,h=rr,st.push(n),e=w.get("_SS","SID"),e&&(c=e),o=n+(n.indexOf("&sid=")===-1?"&sid="+c:"")+"&format="+pt+"&jsoncbid="+r,f=document.createElement("iframe"),f.style.display="none",document.body.appendChild(f),window.AjaxCB.push(function(t){fi(t,r,n)}),nr=new Date,a=function(t,i){return function(){if(document.getElementById(wt)){var r="RK:"+y.join(",")+" SK:"+ht.join(",")+" U:"+escape(o);yt(n,"FailedRequest",t,i,r)}}},f.onload=a(ni,v),b=window.location.protocol+"//"+window.location.host+o,f.src=b,rt=g.setTimeout(a(fr,v),yi),h=ur,u.fire("ajax.requestSent",n)))}function yt(n,t,i,r,u){hi(t,i,u);n=n+er+i;var e="assign";r===s.History&&(e="replace");k="";f&&(f.onload=null);g.setTimeout(function(){return window.location[e](n)},pi)}function hi(n,t,i){if(t<ni&&typeof onerror=="function")window.onerror(n,"Ajax.Bundle",t);else{var r="Ajax";i&&(r+='","Meta":"'+i);sj_log("CI.Error",r,n+t);ft()}}function kr(n){v!==s.History&&r.pushState(n);st=[]}function dr(n){if(n&&n.length>1){var t=d(n[1]);t&&t!==d(k)&&et(t,s.History)}}function gr(n,t,i){i&&(e=i,n=ui(n));var r=o.getRelativeUrl(n);r.indexOf(tt)===0?(r=d(r),et(r,t)):window.location.assign(n)}function d(n){if(!n)return n;var t=n.indexOf("#");return t===-1?n:n.substring(0,t)}function nu(){var n,i,t;ot&&(n=a.getCssHolder(),n.id="ajaxStylesBackup",i=a.getCssHolder(),t=n.nextSibling,t&&n.parentNode.insertBefore(i,t),ot=!1)}function tu(){var n=document.getElementById("ajaxStylesBackup");n&&n.parentNode.removeChild(n)}function iu(n){return tt+"?q="+encodeURIComponent(n)}function ru(n){for(var r="",i=n.getElementsByTagName("input"),t=0;t<i.length;t++)i[t].type==="hidden"&&(r+="&"+i[t].name+"="+encodeURIComponent(i[t].value));return r}function p(n){var t=ci();t&&(b.preventDefault(n),et(t,s.AS))}function ci(){var u,n,t,f=_ge("serpHeader"),i,r;return keyMap.IsHP&&f?(i=f.getElementsByTagName("form"),i.length>0&&i[0].id===keyMap.SearchForm&&(n=i[0],r=n.getElementsByClassName("b_searchbox"),r.length>0&&r[0].id===keyMap.SBoxId&&(t=r[0].value))):(n=_d.getElementById(keyMap.SearchForm),t=_d.getElementById(keyMap.SBoxId).value),di.test(t)&&(u=iu(t)+ru(n)),u}function uu(){var n=document.getElementById(keyMap.Notification),t;n&&(n.parentNode.removeChild(n),t=document.getElementById("id_h"),t&&(t.style.top="0"))}var w=n("cookies"),a=n("dom"),g=n("env"),u=n("event.custom"),nt=n("event.native"),b=n("shared"),li=n("rmsajax"),o=n("ajax.shared"),f=null,e,tt="/search",c=_G.SID,pt="snrjson",ot=!1,s={Click:1,History:2,AS:3,Answer:8},v=s.Click,k=o.getRelativeUrl(window.location.href),st=[],y=[],ht=[],ai=["Bnp","RMS_IACL","sched","TP","bepns","Identity","initComCtrl","ccal","ccal_bundle","expitem","si_sendCReq"],vi=["bubblePlaceholder","irhc","vrhc"],wt="ajaxMaskLayer",it,rt=null,yi=1e4,pi=30,wi=864e5,bi=/(&|%26)sid(=|%3d)\w+(&|%26)format(=|%3d)(jsonv2|snrjson)(&|%26)jsoncbid(=|%3d)\d+/gm,ki=/((&|%26)ajax(=|%3d)\w+(&|%26)axID(=|%3d)\w+)|((&|%26)pIG(=|%3d)\w+)|((&|%26)axNID(=|%3d)(\w|[,.])+)/gm,di=/\S/,gi,bt=0,kt=sj_ce("textarea"),ct,dt,nr=si_ST,ut="data-ajax",h,lt=!1,tr=10,ir=20,rr=30,ur=40,gt=50,ni=60,fr=70,er="&ajf=",at={},l={};u.bind("onP1",ti,!0);window.AjaxCB=[]})