import{I as e,c as t,p as n,h as r,A as s}from"./vendor.fe82a25e.js";let o;const a={},i=function(e,t){if(!t)return e();if(void 0===o){const e=document.createElement("link").relList;o=e&&e.supports&&e.supports("modulepreload")?"modulepreload":"preload"}return Promise.all(t.map((e=>{if(e in a)return;a[e]=!0;const t=e.endsWith(".css"),n=t?'[rel="stylesheet"]':"";if(document.querySelector(`link[href="${e}"]${n}`))return;const r=document.createElement("link");return r.rel=t?"stylesheet":o,t||(r.as="script",r.crossOrigin=""),r.href=e,document.head.appendChild(r),t?new Promise(((e,t)=>{r.addEventListener("load",e),r.addEventListener("error",t)})):void 0}))).then((()=>e()))};e.init();let d={"./Pages/PageOne.vue":()=>i((()=>import("./PageOne.58ffd855.js")),["/assets/PageOne.58ffd855.js","/assets/vendor.fe82a25e.js"]),"./Pages/PageTwo.vue":()=>i((()=>import("./PageTwo.db22ef23.js")),["/assets/PageTwo.db22ef23.js","/assets/vendor.fe82a25e.js"])};const l=document.getElementById("app");t({render:()=>r(s,{initialPage:JSON.parse(l.dataset.page),resolveComponent:e=>d["./Pages/"+e+".vue"]().then((e=>e.default))})}).use(n).mount(l);