/*!
* FitVids 1.1
*
* Copyright 2013, Chris Coyier - http://css-tricks.com + Dave Rupert - http://daverupert.com
* Credit to Thierry Koblentz - http://www.alistapart.com/articles/creating-intrinsic-ratios-for-video/
* Released under the WTFPL license - http://sam.zoy.org/wtfpl/
*
*/
!function(e){"use strict";e.fn.fitVids=function(t){var n={customSelector:null,ignore:null};if(!document.getElementById("fit-vids-style")){var i=document.head||document.getElementsByTagName("head")[0],r=document.createElement("div");r.innerHTML='<p>x</p><style id="fit-vids-style">.fluid-width-video-wrapper{width:100%;position:relative;padding:0;}.fluid-width-video-wrapper iframe,.fluid-width-video-wrapper object,.fluid-width-video-wrapper embed {position:absolute;top:0;left:0;width:100%;height:100%;}</style>',i.appendChild(r.childNodes[1])}return t&&e.extend(n,t),this.each((function(){var t=["iframe[src*='player.vimeo.com']","iframe[src*='youtube.com']","iframe[src*='youtube-nocookie.com']","iframe[src*='kickstarter.com'][src*='video.html']","object","embed"];n.customSelector&&t.push(n.customSelector);var i=".fitvidsignore";n.ignore&&(i=i+", "+n.ignore);var r=e(this).find(t.join(","));(r=(r=r.not("object object")).not(i)).each((function(){var t=e(this);if(!(t.parents(i).length>0||"embed"===this.tagName.toLowerCase()&&t.parent("object").length||t.parent(".fluid-width-video-wrapper").length)){t.css("height")||t.css("width")||!isNaN(t.attr("height"))&&!isNaN(t.attr("width"))||(t.attr("height",9),t.attr("width",16));var n=("object"===this.tagName.toLowerCase()||t.attr("height")&&!isNaN(parseInt(t.attr("height"),10))?parseInt(t.attr("height"),10):t.height())/(isNaN(parseInt(t.attr("width"),10))?t.width():parseInt(t.attr("width"),10));if(!t.attr("id")){var r="fitvid"+Math.floor(999999*Math.random());t.attr("id",r)}t.wrap('<div class="fluid-width-video-wrapper"></div>').parent(".fluid-width-video-wrapper").css("padding-top",100*n+"%"),t.removeAttr("height").removeAttr("width")}}))}))}}(window.jQuery||window.Zepto),function(e,t){"function"==typeof define&&define.amd?define(t):"object"==typeof exports?module.exports=t():e.NProgress=t()}(this,(function(){var e,t,n={version:"0.1.6"},i=n.settings={minimum:.08,easing:"ease",positionUsing:"",speed:200,trickle:!0,trickleRate:.02,trickleSpeed:800,showSpinner:!0,barSelector:'[role="bar"]',spinnerSelector:'[role="spinner"]',parent:"body",template:'<div class="bar" role="bar"><div class="peg"></div></div><div class="spinner" role="spinner"><div class="spinner-icon"></div></div>'};function r(e,t,n){return e<t?t:e>n?n:e}function s(e){return 100*(-1+e)}n.configure=function(e){var t,n;for(t in e)void 0!==(n=e[t])&&e.hasOwnProperty(t)&&(i[t]=n);return this},n.status=null,n.set=function(e){var t=n.isStarted();e=r(e,i.minimum,1),n.status=1===e?null:e;var c=n.render(!t),l=c.querySelector(i.barSelector),d=i.speed,u=i.easing;return c.offsetWidth,a((function(t){""===i.positionUsing&&(i.positionUsing=n.getPositioningCSS()),o(l,function(e,t,n){var r;r="translate3d"===i.positionUsing?{transform:"translate3d("+s(e)+"%,0,0)"}:"translate"===i.positionUsing?{transform:"translate("+s(e)+"%,0)"}:{"margin-left":s(e)+"%"};return r.transition="all "+t+"ms "+n,r}(e,d,u)),1===e?(o(c,{transition:"none",opacity:1}),c.offsetWidth,setTimeout((function(){o(c,{transition:"all "+d+"ms linear",opacity:0}),setTimeout((function(){n.remove(),t()}),d)}),d)):setTimeout(t,d)})),this},n.isStarted=function(){return"number"==typeof n.status},n.start=function(){n.status||n.set(0);var e=function(){setTimeout((function(){n.status&&(n.trickle(),e())}),i.trickleSpeed)};return i.trickle&&e(),this},n.done=function(e){return e||n.status?n.inc(.3+.5*Math.random()).set(1):this},n.inc=function(e){var t=n.status;return t?("number"!=typeof e&&(e=(1-t)*r(Math.random()*t,.1,.95)),t=r(t+e,0,.994),n.set(t)):n.start()},n.trickle=function(){return n.inc(Math.random()*i.trickleRate)},e=0,t=0,n.promise=function(i){return i&&"resolved"!=i.state()?(0==t&&n.start(),e++,t++,i.always((function(){0==--t?(e=0,n.done()):n.set((e-t)/e)})),this):this},n.render=function(e){if(n.isRendered())return document.getElementById("nprogress");l(document.documentElement,"nprogress-busy");var t=document.createElement("div");t.id="nprogress",t.innerHTML=i.template;var r,a=t.querySelector(i.barSelector),c=e?"-100":s(n.status||0),d=document.querySelector(i.parent);return o(a,{transition:"all 0 linear",transform:"translate3d("+c+"%,0,0)"}),i.showSpinner||(r=t.querySelector(i.spinnerSelector))&&f(r),d!=document.body&&l(d,"nprogress-custom-parent"),d.appendChild(t),t},n.remove=function(){d(document.documentElement,"nprogress-busy"),d(document.querySelector(i.parent),"nprogress-custom-parent");var e=document.getElementById("nprogress");e&&f(e)},n.isRendered=function(){return!!document.getElementById("nprogress")},n.getPositioningCSS=function(){var e=document.body.style,t="WebkitTransform"in e?"Webkit":"MozTransform"in e?"Moz":"msTransform"in e?"ms":"OTransform"in e?"O":"";return t+"Perspective"in e?"translate3d":t+"Transform"in e?"translate":"margin"};var a=function(){var e=[];function t(){var n=e.shift();n&&n(t)}return function(n){e.push(n),1==e.length&&t()}}(),o=function(){var e=["Webkit","O","Moz","ms"],t={};function n(n){return n=n.replace(/^-ms-/,"ms-").replace(/-([\da-z])/gi,(function(e,t){return t.toUpperCase()})),t[n]||(t[n]=function(t){var n=document.body.style;if(t in n)return t;for(var i,r=e.length,s=t.charAt(0).toUpperCase()+t.slice(1);r--;)if((i=e[r]+s)in n)return i;return t}(n))}function i(e,t,i){t=n(t),e.style[t]=i}return function(e,t){var n,r,s=arguments;if(2==s.length)for(n in t)void 0!==(r=t[n])&&t.hasOwnProperty(n)&&i(e,n,r);else i(e,s[1],s[2])}}();function c(e,t){return("string"==typeof e?e:u(e)).indexOf(" "+t+" ")>=0}function l(e,t){var n=u(e),i=n+t;c(n,t)||(e.className=i.substring(1))}function d(e,t){var n,i=u(e);c(e,t)&&(n=i.replace(" "+t+" "," "),e.className=n.substring(1,n.length-1))}function u(e){return(" "+(e.className||"")+" ").replace(/\s+/gi," ")}function f(e){e&&e.parentNode&&e.parentNode.removeChild(e)}return n})),jQuery((function(e){e("body");var t=e("html"),n=e(window);function i(){t.toggleClass("menu-active")}e(window).scroll((function(){e(this).scrollTop()>300?e(".back-to-top").fadeIn():e(".back-to-top").fadeOut()})),e('a[href*="#"]:not([href="#"], [title])').click((function(){if(location.pathname.replace(/^\//,"")==this.pathname.replace(/^\//,"")&&location.hostname==this.hostname){var t=e(this.hash);if((t=t.length?t:e("[name="+this.hash.slice(1)+"]")).length)return e("html,body").animate({scrollTop:t.offset().top},1e3),!1}})),e("#menu").on({click:function(){i()}}),e(".menu-button").on({click:function(){i()}}),e(".hidden-close").on({click:function(){i()}});var r=e(".cover"),s=0;function a(){if(r.length>=1){var e=n.scrollTop();s=e>0?Math.floor(.25*e):0,r.css({"-webkit-transform":"translate3d(0, "+s+"px, 0)",transform:"translate3d(0, "+s+"px, 0)"}),n.scrollTop()<r.height()?t.addClass("cover-active"):t.removeClass("cover-active")}}a(),n.on({scroll:function(){a()},resize:function(){a()},orientationchange:function(){a()}});var o=e(".post-content");function c(){if(o.length>=1){var t=o.offset().top+o.height(),i=100-(t-(n.scrollTop()+n.height()))/(t-n.height())*100;e(".progress-bar").css("width",i+"%"),i>100?e(".progress-container").addClass("ready"):e(".progress-container").removeClass("ready")}}c(),n.on({scroll:function(){c()},resize:function(){c()},orientationchange:function(){c()}}),document.querySelectorAll(".kg-gallery-image img").forEach((function(e){var t=e.closest(".kg-gallery-image"),n=e.attributes.width.value/e.attributes.height.value;t.style.flex=n+" 1 0%"})),e("pre code").each((function(t,n){if(hljs.highlightBlock(n),!e(this).hasClass("language-text")){var i=e(this),r=i.html().split(/\n/).length,s=[];for(t=1;t<r;t++)s+='<span class="line">'+t+"</span>";i.parent().append('<div class="lines">'+s+"</div>")}})),e("#wrapper").fitVids(),"undefined"==typeof disqus?e(".post-comments").css({display:"none"}):e("#show-disqus").on("click",(function(){e.ajax({type:"GET",url:"//"+disqus+".disqus.com/embed.js",dataType:"script",cache:!0}),e(this).parent().addClass("activated")}))}));var firebaseConfig={apiKey:"AIzaSyAi0HZMbjVLKrfYsCdj3To2osTNCBrg6z4",authDomain:"subscribe-8cae0.firebaseapp.com",databaseURL:"https://subscribe-8cae0.firebaseio.com",projectId:"subscribe-8cae0",storageBucket:"",messagingSenderId:"255887982226",appId:"1:255887982226:web:723e7e885efbc23b"};firebase.initializeApp(firebaseConfig);var db=firebase.firestore(),form=document.querySelector("#md-form");function enableBtn(){0==$("#d").is(":checked")||1==$(".input").parent(".input-wrap").hasClass("invalid")||$(".input").val().length<2?$("#confirm").prop("disabled",!0):$("#confirm").prop("disabled",!1)}$(".input").on("focus blur",(function(){$(this).val().length>0||$(".input").is(":focus")?($(this).siblings().addClass("active"),$(this).parent().addClass("active")):($(this).siblings().removeClass("active").addClass("not"),$(this).parent().removeClass("active").addClass("not")),$(this).val().length<2&&1!=$(".input").is(":focus")&&$(this).is(":invalid")||$(this).is(":invalid")&&1!=$(".input").is(":focus")?($(this).parent().addClass("invalid"),$(this).siblings().addClass("invalid")):($(this).parent().removeClass("invalid"),$(this).siblings().removeClass("invalid")),$(this).val().length>0&&$(this).is(":valid")&&1!=$(".input").is(":focus")?($(this).parent().addClass("valid"),$(this).siblings().addClass("valid")):($(this).parent().removeClass("valid"),$(this).siblings().removeClass("valid"))})),$("#d").change(enableBtn),$(".input").blur(enableBtn),enableBtn(),$("#confirm").click((function(){$("form").submit((function(e){$(".card").addClass("end"),$(".ending").addClass("showed"),e.preventDefault(),db.collection("users").add({name:form.name.value,email:form.email.value,message:form.message.value})}))}));