var PersistentHeader;(function(n){var t=null,i=null,u=null,r="click",s="mouseover",e=!1;n.initializeView=function(n){var c,it,yt,pt,a,st,g,wt,ht,ct,lt,p,w,tt,b,k,v,bt;try{i=n===null||n===void 0?void 0:n.id;c=JSON.parse(n===null||n===void 0?void 0:n.propertybag);t=_ge("bnp.nid."+i);it=c.MarginBottom;e=c.IsAnimationEnabled==="true";var rt=c.ButtonColor,d=c.BackgroundColor,ut=c["Close.Color"],ft=c["Title.Color"],et=c["Desc.Color"],ot=c["Click.Color"],at=c.LargeFlyoutIcon,vt=c.FlyoutIcon,kt=c.DescriptionText,dt=c.FlyoutTitle,gt=c.ThemeLayout,ni=c.OpenByDefaultTime,ti=c.OpenByDefault==="true";e=c.IsAnimationEnabled==="true";it&&(marginBottomPx=parseInt(it));yt="b_opalpers";u=sj_ce("div",yt);pt="b_op_anch";a=sj_ce("a",pt);a.href=c["Link.Url"];a.addEventListener(r,function(){f(i)});a.addEventListener(s,function(){var n=_ge("b_op_flyout");n.style.display="block"});st="b_op_icon";g=sj_ce("img",st,st);g.src=vt;g.setAttribute("data-priority","2");wt="b_op_atxt";ht=sj_ce("span",wt);ht.innerText=c.Title;ct="b_op_dd";lt=sj_ce("img",ct,ct);lt.src=c.RighArrowIcon;a.appendChild(g);a.appendChild(ht);a.appendChild(lt);u.appendChild(a);var nt=sj_ce("div","b_op_flyout","b_op_flyout"),y=sj_ce("a","b_op_anch2");y.href=c["Link.Url"];y.addEventListener(r,function(){f(i)});p=sj_ce("img");p.src=at!=""?at:vt;p.setAttribute("data-priority","2");p.alt="";w=sj_ce("div","desc","desc");w.innerText=kt;w.addEventListener(r,function(){f(i)});y.appendChild(p);gt=="FlyoutWithTitle"&&(tt=sj_ce("span","flyout_title_id"),tt.innerText=dt,y.appendChild(tt),ft&&ft.length>0&&(tt.style.color=ft));y.appendChild(w);nt.appendChild(y);b=sj_ce("div","b_op_flyout_btn_area","b_op_flyout_btn_area");k=sj_ce("span","b_op_flyout_no","b_op_flyout_no");k.innerText=c["Close.Text"];k.addEventListener(r,function(){l(i)});v=sj_ce("a","b_op_flyout_yes","b_op_flyout_yes");v.innerText=c["Link.Text"];v.href=c["Link.Url"];v.addEventListener(r,function(){f(i)});b.appendChild(k);b.appendChild(v);nt.appendChild(b);u.appendChild(nt);t.appendChild(u);rt&&rt.length>0&&(v.style.backgroundColor=rt);d&&d.length>0&&(b.style.backgroundColor=d,nt.style.backgroundColor=d);et&&et.length>0&&(w.style.color=et);ut&&ut.length>0&&(k.style.color=ut);ot&&ot.length>0&&(v.style.color=ot);ti?(_ge("b_op_flyout").classList.add("popup"),setTimeout(function(){_ge("b_op_flyout").style.display="none"},ni)):_ge("b_op_flyout").style.display="none";h(u);bt=document.querySelectorAll(".id_button");bt.forEach(function(n){n.addEventListener(r,o,!0)});_d.addEventListener(r,o,!0)}catch(ii){Log.Log("NotificationsError","BNP",ii.message,!1)}};var o=function(n){var r=_ge("b_op_anch"),t=_ge("b_op_flyout"),i=n.target;t&&i!=r&&i!=t&&(t.style.display="none")},h=function(n){t&&u&&!c()&&(ClassUtil.removeClass(t,"b_hide"),sj_evt.fire("bnp.persist.shown",n),Bnp.Common.LogImpression(n,i,!0))},c=function(){var n=_d.querySelector(".b_header_bg.th_trig")||_d.querySelector(".b_header_bg.thm_ThHalo");return n!=null},f=function(n){if(t)return t.style.display="none",Bnp.Common.Click(n)},l=function(n){return e?slideOutNotification():t&&(t.style.display="none"),Bnp.Common.Close(n,!0)}})(PersistentHeader||(PersistentHeader={}))