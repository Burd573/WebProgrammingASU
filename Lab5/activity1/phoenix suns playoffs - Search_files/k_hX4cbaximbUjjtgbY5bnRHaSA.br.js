var redDotControl="redDotControl",giveMuidHomepageHeaderIconId="rh_meter_leaf_homepage",giveMuidSerpHeaderIconId="rh_meter_leaf",giveMuidHomepageHeaderIconIdV2="givemuid_heart_homepage",giveMuidSerpHeaderIconIdV2="givemuid_heart",giveMuidPartnerId="GiveMuid",giveSerpPartnerId="GiveSerp",bepns=bepns||function(n,t){function vt(){var h=this,e;sj_be(_w,"message",ii,!1);u=n("id_rh");r=n("bepfo");r||(e=n("id_rwl"),e&&(r=t("div"),r.id="bepfo",r.className=o,e.parentNode&&e.parentNode.insertBefore(r,e.nextSibling)));pt();sj_evt.bind("AutoOpenFlyout",function(){b=!0;(a||!a&&ti()>=1200)&&s(r,o)&&k(h.evt,!0)},!0);sj_evt.bind("AutoOpenFlyoutHide",function(){i&&f()},!0);sj_be(u,c,it,!1);sj_evt.bind(nt,rt,!1);sj_evt.bind(g,dt);sj_evt.bind("onP1",yt,1);sj_evt.bind("id:refreshed",wt,1)}function yt(){var n=0,t=setInterval(function(){u&&u.offsetWidth>0&&u.offsetHeight>0?(clearInterval(t),sj_evt.fire("bepready",ut)):n==80&&clearInterval(t);n++},400)}function pt(){kt(u,at)}function wt(){bt(_ge("idd_rwds"),_ge("idd_rwdstrial"))}function bt(n,t){n&&t&&(t.href=n.href,n.h?t.h=n.h:n.getAttribute&&n.getAttribute("h")&&t.setAttribute("h",n.getAttribute("h")))}function kt(n,t){n&&(n.href=t)}function dt(n){n[1]!==d&&f()}function s(n,t){if(n&&n.className){var i=" "+n.className+" ";return i.indexOf(" "+t+" ")!==-1}return!1}function h(n,t){n&&!s(n,t)&&(n.className+=" "+t)}function v(n,t){if(s(n,t)){var i=new RegExp("(\\s|^)"+t+"(\\s|$)","g");n.className=n.className.replace(i," ")}}function it(n){r&&(s(r,o)?k(n):f(n))}function rt(n){r&&(!r||s(r,o)?k(n):f(n),sj_evt.unbind(nt,rt))}function gt(){u&&sj_ue(u,c,it,!1)}function ut(n){a&&(n&&n>0?ni():ft())}function ni(){h(u,"rigleamon")}function ft(){v(u,"rigleamon")}function k(n,t){t===void 0&&(t=!1);sj_evt.fire("focusChange","bep");r&&(v(r,"popup"),r.firstChild?b?(r.removeChild(i),ot(t),b=!1):lt(!0):ot(t),v(r,o),u.setAttribute("aria-expanded","true"));h(u,"openfo");sj_sp(n);sj_evt.fire(g,d);t||(sj_be(_d,c,f,!0),sj_be(_d,l,y,!0))}function et(n){var c,i,l,t,a,e;n===void 0&&(n=!1);var r=_w.location.search.substr(1),h=/(^|&)rewardstesthooks=1(&|$)/i.exec(r),u=/(?:^|&)rewardsbag=([^&]*)(?:&|$)/i.exec(r),f=undefined;try{c=/(^|&)uncrunched=1(&|$)/i;f=c.exec(r)}catch(b){f=undefined}i=undefined;try{l=/(^|&)isDarkMode=1(&|$)/i;i=l.exec(r)}catch(k){i=undefined}t=undefined;try{a=/(?:^|&)partnerId=([^&]*)(?:&|$)/i;t=a.exec(r)}catch(d){t=undefined}var o=new Date,v=o.getDate(),y=o.getMonth()+1,p=(y<10?"0":"")+y+"/"+(v<10?"0":"")+v+"/"+o.getFullYear(),w="/rewardsapp/flyout"+(n?"?channel=2":"?channel=0"),s;return!t&&_ge?(e="",_ge(giveMuidHomepageHeaderIconId)||_ge(giveMuidSerpHeaderIconId)||_ge(giveMuidHomepageHeaderIconIdV2)||_ge(giveMuidSerpHeaderIconIdV2)?e=giveMuidPartnerId:(_ge("gwb_teal_heart")||_ge("gwb_header_wrapper"))&&(e=giveSerpPartnerId),s=w+(n?"&partnerId=AutoOpenFlyout":"&partnerId="+e)+"&date="+p+(h&&u?"&atlahostname=localhost&bag="+u[1]:"")+(f?"&uncrunched=1":"")+(i?"&isDarkMode=1":"")):s=w+(t&&t[1]?"&partnerId="+t[1]:"")+"&date="+p+(h&&u?"&atlahostname=localhost&bag="+u[1]:"")+(f?"&uncrunched=1":"")+(i?"&isDarkMode=1":""),{src:s,isDarkMode:i}}function ot(n){n===void 0&&(n=!1);i=t("iframe");i.id="bepfm";i.frameBorder="no";i.scrolling="no";i.height=0;r.appendChild(i);n?(r.style.visibility="hidden",r.style.height="100%",sj_be(i,tt,function(){r.style.visibility="visible";ct(n);h(r,"popup")},!1)):(sj_be(i,tt,function(){ct(n)},!1),st(i),e=t("div"),e.id="bepfl",e.innerText=e.textContent="Loading...",r.appendChild(e),r.style.width=w+"px",ht(e));var u=et(n);i.src=u.src;u.isDarkMode&&h(r,"darkMode")}function f(n){s(r,o)||h(r,o);v(u,"openfo");a&&ft();u.setAttribute("aria-expanded","false");sj_ue(_d,c,f,!0);sj_ue(_d,l,y,!0);i&&i.contentWindow&&sj_ue(i.contentWindow.document,l,y,!0);n&&sj_sp(n);n&&sj_pd(n);lt(!1)}function st(n){n&&(n.style.display="none")}function ht(n){n&&(n.style.display="block")}function ct(n){n||(st(e),ht(i));i.height=Math.min(i.contentWindow.document.body.scrollHeight,p);r.style.height=i.height+"px";i&&i.contentWindow&&sj_be(i.contentWindow.document,l,y,!0)}function lt(n){i&&i.contentWindow.postMessage({action:"visibility",isVisible:n},"*")}function ti(){return Math.max(_d.body.scrollWidth,_d.documentElement.scrollWidth,_d.body.offsetWidth,_d.documentElement.offsetWidth,_d.documentElement.clientWidth)}function ii(n){var u,e,t,o,s;if(i&&i.contentWindow&&n.source==i.contentWindow&&n.data)switch(n.data.action){case"resize":u=n.data.bodyHeight&&parseFloat(n.data.bodyHeight);e=n.data.bodyWidth&&parseFloat(n.data.bodyWidth);u&&!isNaN(u)?(i.height=Math.min(u,p),r.style.height=i.height+"px"):(i.height=Math.min(i.contentWindow.document.body.scrollHeight,p),r.style.height=i.height+"px");e&&!isNaN(e)?(t=Math.min(e,w)+"px",i.style.width=t,r.style.width=t):(t=w+"px",i.style.width=t,r.style.width=t);break;case"updatePoints":RewardsCreditRefresh&&(o=RewardsCreditRefresh.GetRewardsHeaderBalance(),o!=n.data.newBal&&(RewardsCreditRefresh.SetRewardsHeaderBalance(n.data.newBal),RewardsCreditRefresh.RewardsHeaderAnim(o,n.data.newBal,n.data.goal,n.data.incr)));break;case"redDotControl":sj_evt.fire(redDotControl,!0);break;case"refresh":i&&(s=et(),i.src=s.src);break;case"close":i&&f()}}var d="bepfo",p=700,w=320,g="onPopTR",nt="openbep",u,r,e,i,c="click",l="keyup",tt="load",o="b_hide",at="javascript:void(0)",b=!1,a=typeof _H!="undefined",y=function(n){var e=n.which||n.keyCode,r=sj_et(n),t;if(e==27){f(n);u.focus();return}if(e==9&&r&&i){if(t=r.nodeName,t=="BODY"||t=="HTML"||t=="#document")return;i.contentWindow.document.body.contains(r)||f(n)}};return vt(),{sg:ut,ubc:gt}}(_ge,sj_ce)