var IframeContainer;(function(n){var e="vrhiframe",l=e+"_loaded",u="undefined",t=typeof pMMUtils!=u?pMMUtils:null,i=typeof VRHConsts!=u?VRHConsts:null,r=!1,o=null,s=null,h=null,f=[],c;if(!r&&t&&t.gfbc&&t.gfbt&&t.sepd&&t.ga&&(o=t.gfbc,s=t.gfbt,h=t.ac,r=!0),r){function a(n,t,i,u,e,o,s){r&&n&&n.length>1&&(f[n]&&(f[n]=null),i&&(f[n]=new c(t,i,u,e,o,s)));return}n.init=a}c=function(){function n(n,t,r,f,c,a){var v=this,y;(this.bindEvent=function(){if(sj_be(_w,"message",v.onMessage),v.styleTransformation)for(var n=0;n<v.styleTransformation.length;n++)switch(v.styleTransformation[n]){case VRHEnums.TransformationTriggerType.OnLoad:sj_evt.bind(VRHConsts.IframeLoadedEvt,v.onIframeLoaded)}sj_evt.bind(i.HoverCancelEvt,v.unBindEvent)},this.unBindEvent=function(){sj_ue(_w,"message",v.onMessage);sj_evt.unbind(VRHConsts.IframeLoadedEvt,v.onIframeLoaded)},this.onMessage=function(n){var r,f,t;if(typeof MMMessenger!==u&&typeof MMMessenger.GetMessageData=="function"&&(t=MMMessenger.GetMessageData(n),t===null||t===void 0?void 0:t.command))switch(t.command){case VRHEnums.IframeMessage.Loaded:sj_evt.fire(i.IframeLoadedEvt,v.instMetadata,(r=t.data)===null||r===void 0?void 0:r.hasRelatedVideo);break;case VRHEnums.IframeMessage.PreviewStarted:sj_evt.fire(i.PlayerResetEvt,v.playerName);break;case VRHEnums.IframeMessage.Click:v.onVideoClick((f=t.data)===null||f===void 0?void 0:f.url);break;case VRHEnums.IframeMessage.Scroll:sj_evt.fire(i.IframeScrollEvt,v.instMetadata)}},this.onIframeLoaded=function(n){if(n&&n.length>2&&n[2]){var t=n[2];t&&v.doStyleTransformation(l)}},this.doStyleTransformation=function(n){v.iframeContainer&&n&&h(v.iframeContainer,n)},this.onVideoClick=function(n){var t;n&&(typeof si_ct=="function"&&v.hoverTargetAnchorElement&&si_ct(v.hoverTargetAnchorElement),_w.open(n,(t=v.hoverTargetAnchorElement)===null||t===void 0?void 0:t.target))},this.iframeContainer=o(e,n),this.iframeContainer)&&(a&&(this.instMetadata=a),this.hoverTargetAnchorElement=f,this.styleTransformation=r,this.playerName=c,y=s("iframe",this.iframeContainer),y&&y.setAttribute("src",t),this.bindEvent())}return n}()})(IframeContainer||(IframeContainer={}))