var StatefulAction;(function(){function i(n){var e,r,t,o,f,i;if(n&&n[1])for(e=n[1],r=_d.getElementsByClassName("sa_wrapper"),t=0;t<r.length;t++)for(o=r[t],f=o.getAttribute("data-actionNames").split("|"),i=0;i<f.length;i++)e.bind(f[i],u)}function r(n){if(n&&n.length>2){var t=n[1];t&&n[2]&&(t.hoveredElement=n[2])}}function u(i){var o=n(i,"sa_wrapper"),f,r,e;t(o);var h={},c=o.getAttribute("data-eventPayload"),u=o.hoveredElement;c?h=JSON.parse(c):(f=s(u,"vrhdata"),f&&(r=JSON.parse(f.getAttribute("vrhm")),r.capt||(r.capt={}),r.capt.saved=!0,r.capt.actpayload&&(h=JSON.parse(r.capt.actpayload)),f.setAttribute("vrhm",JSON.stringify(r))));e=i.parentElement.getAttribute("data-eventName");e&&(sj_evt.fire(e,h,u?u:i),e==="VideoFavoritesRemoveItemEvent"&&(sj_evt.fire("Favorites.HideMoveToBalloon"),u!=null&&sj_evt.fire("Vi.Player.E")))}function f(i){var r=n(i[1],"sa_wrapper");t(r)}function e(t){var i=n(t[1],"sa_wrapper");o(i)}function t(n){var t=n.getElementsByClassName("sa_initial"),i=n.getElementsByClassName("sa_updated");t&&t.length==1&&i&&i.length==1&&(t[0].style.display=="none"?(t[0].style.display="inline-block",i[0].style.display="none"):(t[0].style.display="none",i[0].style.display="inline-block"))}function o(n){var t=n.getElementsByClassName("sa_initial"),i=n.getElementsByClassName("sa_updated");t&&t.length==1&&i&&i.length==1&&t[0].style.display!=="none"&&(t[0].style.display="none",i[0].style.display="inline-block")}function n(n,t){while(n&&n.className.indexOf(t)==-1)n=n.parentNode;return n}function s(n,t){while(n){var i=n.getElementsByClassName(t);if(i&&i.length==1)return i[0];n=n.parentNode}}sj_evt.bind("ClientLinkAction_Loaded",i,!0);sj_evt.bind("StatefulAction.SwitchState",f,!0);sj_evt.bind("StatefulAction.UpdateState",e,!0);sj_evt.bind("StatefulAction.AttachEventPayLoad",r,!0)})(StatefulAction||(StatefulAction={}))