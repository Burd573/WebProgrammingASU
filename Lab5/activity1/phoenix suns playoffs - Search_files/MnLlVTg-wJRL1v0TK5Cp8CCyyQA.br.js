var Html5VideoSMTPlayer;(function(n){function ai(n,r,u,e,h){return!n||!o||!lt||!i||!r||!u||r.length<1||!u.smtThumbUrl?!1:(f=!1,v=e,l=ri,u.cookiePre&&u.cookiePre.length>0&&(l=u.cookiePre+"_"+l),c=u.beginClipIndex,w=u.endClipIndex,k=c>1,tt=h,at=o.sw,vt=o.sh,li=o.st,ci=o.gsh,hi=o.gsw,si=o.stf,it=o.ss,rt=o.gfbc,b=lt.showElement,ht=n,s=r,!yi())?!1:(vi(u),at(t,u.thumbnailWidth),vt(t,u.thumbnailHeight),pi(u),wi(u),er(),or(),t.autoplay=!k,t.loop=u.enableLoop,sj_evt.fire(i.PlayerLoadEvt,v,s),t.src=u.smtThumbUrl,sr(),f=!0,!0)}function vi(t){oi=t.clipsCount;ct=t.clipsTimeline;p=t.playClipsCount;di(ct);h=null;p&&r&&p<r.length&&(h=r[p]);n.seekVideo=null;r&&(n.seekVideo=ti)}function yi(){return(e=rt(ui,ht),!e)?!1:(t=rt(fi,e),!t)?!1:(t.addEventListener("playing",cr),t.addEventListener("ended",d),t.addEventListener("error",gi),t.addEventListener("loadeddata",ki),t.addEventListener("timeupdate",ir),t.addEventListener("canplaythrough",pt),!0)}function pi(n){var i=k?(1-c)*n.thumbnailWidth:0;it(t,"background","url("+n.imageThumbUrl+") "+i+"px 0 / cover")}function wi(n){switch(n.playerEndAction){case VRHEnums.PlayerEndAction.Reset:d=ut;break;case VRHEnums.PlayerEndAction.Cleanup:default:d=tr}}function bi(){wt()}function ki(){var n,r;sj_evt.fire(i.PlayerDataLoadEndEvt,s);n=t.seekable;n&&n.length>0&&(r=n.end(n.length-1),(!h||h>r)&&(h=r),k&&(t.addEventListener("seeked",bi),ti(c)))}function di(n){var i,t,u;if(n&&!(n.length<1))for(i=n.split(","),r=[],t=0;t<i.length;t++){if(u=parseFloat(i[t]),isNaN(u))return null;if(p<t)break;r.push(u)}}function pt(){t.removeEventListener("canplaythrough",pt);sj_evt.fire(i.PlayerDownloadEndEvt,v,s,u);b(e,!0)}function gi(){sj_evt.fire(i.PlayerErrEvt,v,s)}function nr(){f&&e&&(ft(),sj_evt.fire(i.PlayerEndEvt,v,s))}function tr(){nr()}function ut(){t.pause();t.currentTime=0;b(e,!1)}function wt(){f&&t&&t.play()}function bt(){wt();b(e,!0)}function ir(){var o=h?h:t.duration,n=c>0&&w>=c&&r&&w<=r.length,u=n?r[c-1]+st:0,f=n&&w<r.length?r[w]:o,e=Math.max(t.currentTime-u,0)/(f-u);isNaN(e)||sj_evt.fire(i.PlayerPBUpdateEvt,s,e);t.currentTime>=f&&(t.pause(),d())}function rr(){return u?0:a}function kt(){return u||a==0}function ur(){f&&(ni(!u),yt=!0,ii(u,a),tt&&sj_evt.fire(i.HoverMuteEvt,this.instMeta,u))}function fr(n){if(f&&t){if(!isNaN(n)){var r=n===0;u!=r&&(ni(r),tt&&sj_evt.fire(i.HoverMuteEvt,this.instMeta,r));gt(r?y:n)}dt(a)}}function dt(n){f&&t&&!isNaN(n)&&n>0&&(y=n,ii(u,y))}function er(){yt?lr():u=!0;t&&(t.muted=kt())}function or(){y=ar();gt(y)}function gt(n){t&&n&&!isNaN(n)&&(n=Math.min(Math.max(n,0),100),a=n,t.volume=a/100)}function ni(n){t&&(u=n,t.muted=u)}function sr(){sj_evt.bind(i.StopPlayEvt,ft);sj_evt.bind(i.HoverCancelEvt,hr);sj_evt.bind(i.PlayerReplayEvt,bt);sj_evt.bind(i.PlayerResetEvt,ut)}function hr(){sj_evt.unbind(i.StopPlayEvt,ft);sj_evt.unbind(i.PlayerReplayEvt,bt);sj_evt.unbind(i.PlayerResetEvt,ut)}function cr(){f&&(it(t,"background",null),o.sc(t,ei),sj_evt.fire(i.PlayerStartEvt,v,s))}function ft(){f&&t&&(t.autoplay=!1,t.removeAttribute("src"),t.load(),t&&t.parentNode==e&&e.removeChild(t),b(e,!1),f=!1)}function ti(n){var i=k?st:0,u;f&&r&&n<=r.length&&r[n-1]+i<h&&(u=r[n-1]+i,t.currentTime=u)}function ii(n,t){sj_cook&&sj_cook.set&&(sj_cook.set(l,et,n?"1":"0",!0,"/"),sj_cook.set(l,ot,t.toFixed(0),!0,"/"))}function lr(){var n=sj_cook&&sj_cook.get?sj_cook.get(l,et):null;u=n?n==="1":!0}function ar(){var n=sj_cook&&sj_cook.get?sj_cook.get(l,ot):null;return n?parseInt(n):nt}var ri="SRCHHPGUSR",et="VMUTE",ot="VOLUME",ui="smtplayerhtml5",fi="smtplayer",ei="videoplaying",g="undefined",nt=50,st=1,ht,a=nt,y=nt,u=!0,s=null,oi=null,ct=null,p=null,c=null,w=null,h=null,r=null,tt=!1,t,e,o=typeof pMMUtils!=g?pMMUtils:null,lt=typeof VideoRichHoverUtils!=g?VideoRichHoverUtils:null,i=typeof VRHConsts!=g?VRHConsts:null,f=!1,at=null,vt=null,si=null,it=null,hi=null,ci=null,li=null,b=null,v=null,rt=null;n.seekVideo=null;var d=null,l=null,k=!1,yt=!1;n.init=ai;n.getVolume=rr;n.isMute=kt;n.setMute=ur;n.setVolume=fr;n.setLastStableVolume=dt})(Html5VideoSMTPlayer||(Html5VideoSMTPlayer={}))