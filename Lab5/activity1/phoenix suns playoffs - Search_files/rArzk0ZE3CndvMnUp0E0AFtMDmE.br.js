var Ads;(function(n){function i(n,t,i,r){Log&&Log.Log&&Log.Log(n,t,i,r)}function r(n){for(var o="sendBeacon",t,r,u,e,f;n&&n.nodeName!=="A";)n=n.parentElement;if(n&&(t=n.getAttribute("data-pturl"),t)){if(r=navigator,u=!r||!r[o],!u)try{r[o](t)}catch(s){u=!0}u?(e=!1,_w.sj_gx&&(f=sj_gx(),f&&(f.open("GET",t),f.send(),e=!0,i("Ads","AdsParallelTracking","Fallback involved",!0))),e||i("Ads","AdsParallelTracking","Fallback failed",!0)):i("Ads","AdsParallelTracking","Success",!0)}}function u(){sb_ct(t);t=0}function f(n){t?u():r(n)}function e(n){t=sb_st(u,1e3);r(n)}var t=0;n.ad_pt_md=f;n.ad_pt_td=e})(Ads||(Ads={}));_w.ad_pt_md=Ads.ad_pt_md;_w.ad_pt_td=Ads.ad_pt_td