var ShareGeneralCardAction;(function(n){function t(){var t=_d.querySelectorAll(i),n,r,u;if(t)for(n=0;n<t.length;n++)r=t[n],u=sj_wf(f,r),sj_be(r,"click",u)}function f(t){var e=t.getAttribute(r),i=n.shareGeneralCardData[e],o=_ge(u+e),s={service:i.serviceName,scenario:i.scenarioName,sharemethods:i.sharemethods,formcodes:i.formcodes},l={eType:1,html:o,style:{display:"block"}},f,h,c;o&&i?(f={shareElements:[l],customShareUrl:i.customShareUrl,title:i.title,description:i.description,shareHashKey:i.shareHashKey,twitter:{text:i.shortTitle}},i.emailBody&&(f.email={subject:i.emailSubject?i.emailSubject:i.title,body:i.emailBody}),i.imText&&(f.messaging={text:i.imText}),ShareDialog.show(s,f)):(h={eType:2},c={errorElements:[h]},ShareDialog.showError(s,c))}var i="[data-type='shareGeneralCardAction']",r="data-sharegeneralcardid",u="sharegeneralcard_";sj_be(_w,"load",function(){return t()});sj_evt.bind("ajax.load",function(){return t()});sj_evt.bind("AjaxFinished",function(){return t()})})(ShareGeneralCardAction||(ShareGeneralCardAction={}))