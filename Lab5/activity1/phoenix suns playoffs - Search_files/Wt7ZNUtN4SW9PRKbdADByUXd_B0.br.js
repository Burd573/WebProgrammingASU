IRP=new function(){function t(){var r,t,u;for(n=_d.querySelectorAll?_d.querySelectorAll(".irpserp"):null,r=0;r<n.length;r++)t=n[r],t&&typeof IRH!="undefined"&&(u=function(){_w.imageRichHover=new IRH;_w.imageRichHover.IsInitialized&&(_w.imageRichHover.logHover=i,_w.imageRichHover.attach(t,["a"]))},typeof SmartRendering!="undefined"?SmartRendering.LoadElementWhenDisplayed(this,t,u,[_answerElement]):u.apply(this,[t]))}function i(n,t){if(n){t||(t="h");var i=['{"T":"CI.Hover","AppNS":"',n.ns,'","K":"',n.k,'.1","Name":"ImgAns","HType":"',t,'","TS":',sb_gt(),"}"];r(i.join(""))}}function r(n){var t=new Image,i=["/fd/ls/ls.gif?IG=",_G.IG,"&Type=Event.ClientInst&DATA=",n,"&log=UserEvent"];return t.src=i.join(""),!0}var n=null;t();typeof sj_evt!="undefined"&&sj_evt.bind("WFR.Resized",function(){t()})}