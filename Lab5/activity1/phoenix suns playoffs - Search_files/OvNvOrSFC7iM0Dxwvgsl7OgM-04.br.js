var RelatedPageRecommendationsClickback;(function(){function p(){var s,c,a,v,y,p,h;try{if(s=null,typeof rprData!="undefined"&&rprData)s=rprData.InsertId,o=rprData.IsInstrumentation;else{n(t,i,"RenderDataNotAvailable");return}if(c=ot()&&ht(),a=et(u),typeof _w!="undefined"&&c&&(v=sessionStorage.getItem(r),v&&ct()&&(f.lastLinkClicked=v,l(s,f),n(t,i,"QuickbackTriggered")),sessionStorage.removeItem(r)),typeof _w!="undefined"&&a&&sj_be(_d,u.visibilityChangedEventName,function(){return b(s,f)}),c||a)for(y=_ge(e).children,p=function(n){var t=y.item(n),i;g(t)&&(i=ut(t),i&&sj_be(t,"click",function(n){return!w(n)&&tt(f,i)}))},h=0;h<y.length;h++)p(h);else n(t,i,"NoClickbackTriggerSupported")}catch(k){n(t,i,k?k.message:"Unknown Error")}}function w(n){var t,i;if(n===null||n===void 0?void 0:n.currentTarget)for(t=n.target;t&&t!==n.currentTarget;){for(i=0;i<c.length;i++)if(Lib.CssClass.contains(t,c[i]))return!0;t=t.parentElement}return!1}function b(f,e){try{var s=_d[u.hiddenProperty];e.lastLinkClicked&&(s?(n(t,i,"NewTabLoadTriggered"),l(f,e)):(n(t,i,"RevisitTriggered"),a(e),sessionStorage.removeItem(r)))}catch(o){n(t,i,o?o.message:"Unknown Error")}}function l(r,u){var h,c,l,o=u.lastLinkClicked,s,v,e,f,y;if(!((h=o===null||o===void 0?void 0:o.trim())===null||h===void 0?void 0:h.length)){n(t,i,"EmptyUrlDetected");return}if(s=it(),!((c=s===null||s===void 0?void 0:s.trim())===null||c===void 0?void 0:c.length)){n(t,i,"EmptyQueryDetected");return}if(v=k(),!v){n(t,i,"CouldNotGetContainerWidth");return}(e=u.linkStates[o]=(l=u.linkStates[o])!==null&&l!==void 0?l:{state:0,recommendationsHtml:undefined},e.state===0)&&(e.state=1,f=sj_gx(),f.onreadystatechange=function(){try{f.readyState===4&&f.status===200?(e.state=2,e.recommendationsHtml=f.responseText,a(u)):f.readyState===4&&f.status===204?(e.state=2,n(t,i,"AsyncNoContent")):(e.state=3,n(t,i,"AsyncLoadError - Status: "+f.status+" "+f.statusText))}catch(r){n(t,i,r?r.message:"Unknown Error")}},f.open("POST","/relatedPageRecommendations?IID="+r+"&IG="+_G.IG,!0),f.setRequestHeader("content-type","application/json"),f.timeout=1e4,y={url:o,query:s,containerWidth:v},f.send(JSON.stringify(y)))}function k(){var o,s,h,u=_ge(e),f=u.getElementsByClassName("b_algo"),r;return f.length>0?(r=_w.getComputedStyle(f[0]),((o=f[0])===null||o===void 0?void 0:o.clientWidth)&&(r===null||r===void 0?void 0:r.paddingLeft)&&(r===null||r===void 0?void 0:r.paddingRight)?f[0].clientWidth-parseInt(r.paddingLeft)-parseInt(r.paddingRight):(n(t,i,"Unable to get the container width. Fall back to the width of #b_results"),(h=(s=f[0])===null||s===void 0?void 0:s.clientWidth)!==null&&h!==void 0?h:u===null||u===void 0?void 0:u.clientWidth)):(n(t,i,"No b_algo results. Fall back to the width of #b_results"),u===null||u===void 0?void 0:u.clientWidth)}function a(r){var p,l,w,b,k,g,tt,it,f,rt,c,y,u;if(!nt(r))return!1;f=r.lastLinkClicked;rt=r.linkStates[f];r.lastLinkClicked=undefined;var ft=_ge(e),ut=ft.children,a=-1;for(c=0;c<ft.children.length;c++)if(y=v(ut[c]),(f===null||f===void 0?void 0:f.length)&&(y===null||y===void 0?void 0:y.getAttribute("href"))===f){a=c;break}if(a!==-1){if(o)n(t,"ClickbackAddedInst","");else{if(sj_appHTML(ut[a],rt.recommendationsHtml),(p=rprData.CB)===null||p===void 0?void 0:p.ClickbackAnimationEnabled){if(u=(b=(w=(l=ut[a])===null||l===void 0?void 0:l.getElementsByClassName)===null||w===void 0?void 0:w.call(l,s))===null||b===void 0?void 0:b[0],!u)return;sb_ie||!lt("transition")?(d(u,(g=(k=rprData.CB)===null||k===void 0?void 0:k.ContainerHeight)!==null&&g!==void 0?g:h),Lib.CssClass.remove(u,"pagereco_anim")):(u.offsetHeight,u.style.opacity="1.0",u.style.maxHeight=((it=(tt=rprData.CB)===null||tt===void 0?void 0:tt.ContainerHeight)!==null&&it!==void 0?it:h)+"px");n(t,"ClickbackAnimStarted","")}n(t,"ClickbackAdded","")}return n(t,i,"InsertedRecommendations"),rt.recommendationsHtml=undefined,typeof rms=="undefined"||o||rms.start(),!0}return!1}function d(n,t){var f=new sj_anim(function(n,t){n.style.maxHeight=Math.ceil(t)+"px"}),i=f.getInterval()/300,r=.3/i,o=t/r,u,e;f.init(n,0,t,o,function(){});n.style.opacity="0";u=new sj_anim(function(n,t){n.style.opacity=t.toString()});i=u.getInterval()/250;r=.3/i;e=1/r;u.init(n,0,1,e,function(){})}function g(n){var t;return((t=n===null||n===void 0?void 0:n.className)===null||t===void 0?void 0:t.indexOf(y))>=0&&n.getElementsByClassName(s).length===0}function nt(n){var t=n.linkStates[n.lastLinkClicked];return!_d[u.hiddenProperty]&&Boolean(t===null||t===void 0?void 0:t.recommendationsHtml)&&t.state===2}function tt(n,t){(t===null||t===void 0?void 0:t.length)&&!n.linkStates[t]?(n.lastLinkClicked=t,st(r,n.lastLinkClicked)||(n.lastLinkClicked=undefined)):n.lastLinkClicked=undefined}function it(){var n,t,i=(t=(n=_w.location)===null||n===void 0?void 0:n.search)===null||t===void 0?void 0:t.match(new RegExp("[?&]{1}q=([^&]+)"));return i?decodeURI(i[1]):null}function rt(n){return!!n.match(/^http[s]?:\/\/.+|^www\..+/)}function ut(n){var t=v(n);return t&&(t===null||t===void 0?void 0:t.hasAttribute("href"))&&rt(t.getAttribute("href"))?t.getAttribute("href"):null}function v(n){for(var t,i=0;i<n.children.length;i++)for(t=n.children.item(i);t;){if(t.nodeName=="A")return t;t=t.firstElementChild}return null}function ft(){var i=undefined,r=undefined,t,n;if("hidden"in _d)i="hidden",r="visibilitychange";else for(t=["webkit","moz","ms","o"],n=0;n<t.length;n++)if(t[n]+"Hidden"in _d){i=t[n]+"Hidden";r=t[n]+"visibilitychange";break}return{hiddenProperty:i,visibilityChangedEventName:r}}function et(n){return!!(n&&n.hiddenProperty&&n.visibilityChangedEventName)}function ot(){if(typeof Storage=="undefined"||typeof sessionStorage=="undefined")return!1;try{sessionStorage.setItem(r+"Test","test");sessionStorage.removeItem(r+"Test")}catch(n){return!1}return!0}function st(n,t){try{sessionStorage.setItem(n,t)}catch(i){return!1}return!0}function ht(){var t,n,i,r;return!!(((t=_w===null||_w===void 0?void 0:_w.performance)===null||t===void 0?void 0:t.navigation)||((r=(i=(n=_w===null||_w===void 0?void 0:_w.performance)===null||n===void 0?void 0:n.getEntriesByType)===null||i===void 0?void 0:i.call(n,"navigation"))===null||r===void 0?void 0:r.length)>0)}function ct(){var n,t,i,r,u;return"performance"in _w&&(((r=(i=(t=(n=_w.performance)===null||n===void 0?void 0:n.getEntriesByType)===null||t===void 0?void 0:t.call(n,"navigation"))===null||i===void 0?void 0:i[0])===null||r===void 0?void 0:r.type)==="back_forward"||((u=_w.performance.navigation)===null||u===void 0?void 0:u.type)&&_w.performance.navigation.type===_w.performance.navigation.TYPE_BACK_FORWARD)}function lt(n,t){var r,u,i;if(t===void 0&&(t=["Webkit","Moz","ms","O"]),r=document.createElement("div"),n=n.toLowerCase(),r.style[n]!==undefined)return!0;for(u=n.charAt(0).toUpperCase()+n.substr(1),i=0;i<t.length;i++)if(r.style[t[i]+u]!==undefined)return!0;return!1}var n=function(n,t,i){_w.sj_log&&sj_log(n,t,i)},r="qbClickedIdx",t="RPR.CB",i="ClickbackLog",e="b_results",y="b_algo",s="scs_child_rpr",h=199,c=["scs_exp"],o=!1,u=ft(),f={lastLinkClicked:undefined,linkStates:{}};p();_w.sj_evt&&sj_evt.fire("rpr_cb_load_init")})(RelatedPageRecommendationsClickback||(RelatedPageRecommendationsClickback={}))