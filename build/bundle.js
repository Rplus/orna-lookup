var app=function(){"use strict";function e(){}function t(e,t){for(const n in t)e[n]=t[n];return e}function n(e){return e()}function l(){return Object.create(null)}function r(e){e.forEach(n)}function o(e){return"function"==typeof e}function s(e,t){return e!=e?t==t:e!==t||e&&"object"==typeof e||"function"==typeof e}function i(t,n,l){t.$$.on_destroy.push(function(t,...n){if(null==t)return e;const l=t.subscribe(...n);return l.unsubscribe?()=>l.unsubscribe():l}(n,l))}function u(e,t){e.appendChild(t)}function c(e,t,n){e.insertBefore(t,n||null)}function a(e){e.parentNode.removeChild(e)}function p(e,t){for(let n=0;n<e.length;n+=1)e[n]&&e[n].d(t)}function f(e){return document.createElement(e)}function m(e){return document.createTextNode(e)}function d(){return m(" ")}function h(e,t,n,l){return e.addEventListener(t,n,l),()=>e.removeEventListener(t,n,l)}function v(e){return function(t){return t.preventDefault(),e.call(this,t)}}function g(e,t,n){null==n?e.removeAttribute(t):e.getAttribute(t)!==n&&e.setAttribute(t,n)}function y(e){return""===e?null:+e}function b(e,t){t=""+t,e.wholeText!==t&&(e.data=t)}function $(e,t){e.value=null==t?"":t}function _(e,t){for(let n=0;n<e.options.length;n+=1){const l=e.options[n];if(l.__value===t)return void(l.selected=!0)}}function x(e){const t=e.querySelector(":checked")||e.options[0];return t&&t.__value}function k(e,t,n){e.classList[n?"add":"remove"](t)}let w;function S(e){w=e}function j(e,t){const n=e.$$.callbacks[t.type];n&&n.slice().forEach((e=>e.call(this,t)))}const C=[],O=[],q=[],E=[],L=Promise.resolve();let z=!1;function M(e){q.push(e)}let A=!1;const B=new Set;function D(){if(!A){A=!0;do{for(let e=0;e<C.length;e+=1){const t=C[e];S(t),P(t.$$)}for(S(null),C.length=0;O.length;)O.pop()();for(let e=0;e<q.length;e+=1){const t=q[e];B.has(t)||(B.add(t),t())}q.length=0}while(C.length);for(;E.length;)E.pop()();z=!1,A=!1,B.clear()}}function P(e){if(null!==e.fragment){e.update(),r(e.before_update);const t=e.dirty;e.dirty=[-1],e.fragment&&e.fragment.p(e.ctx,t),e.after_update.forEach(M)}}const T=new Set;let N;function R(){N={r:0,c:[],p:N}}function F(){N.r||r(N.c),N=N.p}function H(e,t){e&&e.i&&(T.delete(e),e.i(t))}function I(e,t,n,l){if(e&&e.o){if(T.has(e))return;T.add(e),N.c.push((()=>{T.delete(e),l&&(n&&e.d(1),l())})),e.o(t)}}function J(e,t){I(e,1,1,(()=>{t.delete(e.key)}))}function V(e,t,n,l,r,o,s,i,u,c,a,p){let f=e.length,m=o.length,d=f;const h={};for(;d--;)h[e[d].key]=d;const v=[],g=new Map,y=new Map;for(d=m;d--;){const e=p(r,o,d),i=n(e);let u=s.get(i);u?l&&u.p(e,t):(u=c(i,e),u.c()),g.set(i,v[d]=u),i in h&&y.set(i,Math.abs(d-h[i]))}const b=new Set,$=new Set;function _(e){H(e,1),e.m(i,a),s.set(e.key,e),a=e.first,m--}for(;f&&m;){const t=v[m-1],n=e[f-1],l=t.key,r=n.key;t===n?(a=t.first,f--,m--):g.has(r)?!s.has(l)||b.has(l)?_(t):$.has(r)?f--:y.get(l)>y.get(r)?($.add(l),_(t)):(b.add(r),f--):(u(n,s),f--)}for(;f--;){const t=e[f];g.has(t.key)||u(t,s)}for(;m;)_(v[m-1]);return v}function W(e){e&&e.c()}function G(e,t,l,s){const{fragment:i,on_mount:u,on_destroy:c,after_update:a}=e.$$;i&&i.m(t,l),s||M((()=>{const t=u.map(n).filter(o);c?c.push(...t):r(t),e.$$.on_mount=[]})),a.forEach(M)}function K(e,t){const n=e.$$;null!==n.fragment&&(r(n.on_destroy),n.fragment&&n.fragment.d(t),n.on_destroy=n.fragment=null,n.ctx=[])}function Q(e,t){-1===e.$$.dirty[0]&&(C.push(e),z||(z=!0,L.then(D)),e.$$.dirty.fill(0)),e.$$.dirty[t/31|0]|=1<<t%31}function U(t,n,o,s,i,u,c,p=[-1]){const f=w;S(t);const m=t.$$={fragment:null,ctx:null,props:u,update:e,not_equal:i,bound:l(),on_mount:[],on_destroy:[],on_disconnect:[],before_update:[],after_update:[],context:new Map(f?f.$$.context:n.context||[]),callbacks:l(),dirty:p,skip_bound:!1,root:n.target||f.$$.root};c&&c(m.root);let d=!1;if(m.ctx=o?o(t,n.props||{},((e,n,...l)=>{const r=l.length?l[0]:n;return m.ctx&&i(m.ctx[e],m.ctx[e]=r)&&(!m.skip_bound&&m.bound[e]&&m.bound[e](r),d&&Q(t,e)),n})):[],m.update(),d=!0,r(m.before_update),m.fragment=!!s&&s(m.ctx),n.target){if(n.hydrate){const e=function(e){return Array.from(e.childNodes)}(n.target);m.fragment&&m.fragment.l(e),e.forEach(a)}else m.fragment&&m.fragment.c();n.intro&&H(t.$$.fragment),G(t,n.target,n.anchor,n.customElement),D()}S(f)}class X{$destroy(){K(this,1),this.$destroy=e}$on(e,t){const n=this.$$.callbacks[e]||(this.$$.callbacks[e]=[]);return n.push(t),()=>{const e=n.indexOf(t);-1!==e&&n.splice(e,1)}}$set(e){var t;this.$$set&&(t=e,0!==Object.keys(t).length)&&(this.$$.skip_bound=!0,this.$$set(e),this.$$.skip_bound=!1)}}const Y=[];function Z(t,n=e){let l;const r=new Set;function o(e){if(s(t,e)&&(t=e,l)){const e=!Y.length;for(const e of r)e[1](),Y.push(e,t);if(e){for(let e=0;e<Y.length;e+=2)Y[e][0](Y[e+1]);Y.length=0}}}return{set:o,update:function(e){o(e(t))},subscribe:function(s,i=e){const u=[s,i];return r.add(u),1===r.size&&(l=n(o)||e),s(t),()=>{r.delete(u),0===r.size&&(l(),l=null)}}}}const ee={Bleeding:"流血",Frozen:"冰凍",Burning:"燃燒",Asleep:"入睡",Paralyzed:"麻痺",Blind:"致盲",Stunned:"暈眩",Rot:"腐敗",Blight:"枯萎",Petrified:"石化",Poisoned:"中毒",Drenched:"濕滑",Cursed:"詛咒",Toxic:"劇毒",Lulled:"安份",Mage:"法師",Thief:"盜賊",Warrior:"戰士",Curative:"藥水",Weapon:"武器",Other:"其他",Item:"物品",Head:"頭部",Armor:"護甲",Legs:"腿部",Accessory:"配件",Material:"材料","Off-hand":"副手",Adornment:"裝飾品",Dark:"暗",Water:"水",Fire:"火",Physical:"物",Holy:"聖",Earthen:"地",Lightning:"雷",Dragon:"龍",Arcane:"奧",attack:"物攻",magic:"魔攻",defense:"物防",ward:"護盾",dexterity:"敏捷",mana:"魔力",crit:"暴擊",resistance:"魔防",hp:"血量"};function te(e){return function(e){for(let t in e)e[t]=e[t].filter(Boolean).map((e=>({value:e,label:ee[e]?`${ee[e]} ${e}`:e}))).sort(((e,t)=>ne(e.label,t.label))),e[t].unshift({value:"",label:""});return e}({types:[...new Set(e.map((e=>e.type)))],tiers:[...new Set(e.map((e=>e.tier)))],element:[...new Set(e.map((e=>e.element)))],immunities:[...new Set(e.map((e=>e.immunities?.split(", "))).flat())],causes:[...new Set(e.map((e=>e.causes)).flat())],prevents:[...new Set(e.map((e=>e.prevents)).flat())],equipped_by:[...new Set(e.map((e=>e.equipped_by)).flat().filter(Boolean))]})}function ne(e,t){switch(typeof e){case"number":return e-t;case"string":return e.toLowerCase().localeCompare(t.toLowerCase());default:return e>label_12}}const le=Z({waiting:!0}),re=Z({}),oe=Z({open:!1});fetch("raw-data/item.added.min.json").then((e=>e.json())).then((e=>{e=e.filter(Boolean).map((e=>(e.context=JSON.stringify(e),e.equipped_by=e.equipped_by?.map((e=>e?.name)),e))),re.set(te(e)),window.d=e,le.set(e)}));const se=function(){const{subscribe:e,set:t,update:n}=Z([]);return{subscribe:e,add:e=>n((t=>(t[t.length]={timestamp:e.timestamp,rules:null},t))),update:(e,t)=>n((n=>{let l=n.findIndex((t=>t.timestamp===e));return n[l].rules=t,n})),remove:e=>n((t=>{let n=t.findIndex((t=>t.timestamp===e));return-1!==n&&t.splice(n,1),t})),reset:()=>t([])}}(),ie=[{prop:"name_zh",type:"text"},{prop:"name",type:"text"},{prop:"tier",type:"number",list:"tiers",min:1,max:10},{prop:"equipped_by",type:"text",list:"equipped_by"},{prop:"context",type:"text"},{prop:"prevents",type:"text",list:"prevents"},{prop:"causes",type:"text",list:"causes"},{prop:"id",type:"number",min:0},{prop:"description",type:"text"},{prop:"type",type:"text",list:"types"},{prop:"boss",type:"checkbox"},{prop:"arena",type:"checkbox"},{prop:"element",type:"text",list:"element"},{prop:"view_distance",type:"checkbox"}];function ue(e,t,n){const l=e.slice();return l[19]=t[n],l}function ce(e,t,n){const l=e.slice();return l[22]=t[n],l}function ae(t){let n,l,r,o=t[22].prop+"";return{c(){n=f("option"),l=m(o),n.__value=r=t[22].prop,n.value=n.__value},m(e,t){c(e,n,t),u(n,l)},p:e,d(e){e&&a(n)}}}function pe(e){let t,n,l;return{c(){t=f("input"),g(t,"type","text")},m(r,o){c(r,t,o),$(t,e[1]),n||(l=h(t,"input",e[17]),n=!0)},p(e,n){74&n&&t.value!==e[1]&&$(t,e[1])},d(e){e&&a(t),n=!1,l()}}}function fe(e){let t,n,l,r,o;return{c(){t=f("input"),g(t,"type","number"),g(t,"min",n=e[3].min),g(t,"max",l=e[3].max)},m(n,l){c(n,t,l),$(t,e[1]),r||(o=h(t,"input",e[16]),r=!0)},p(e,r){8&r&&n!==(n=e[3].min)&&g(t,"min",n),8&r&&l!==(l=e[3].max)&&g(t,"max",l),74&r&&y(t.value)!==e[1]&&$(t,e[1])},d(e){e&&a(t),r=!1,o()}}}function me(e){let t,n,l,r=e[6][e[3].list],o=[];for(let t=0;t<r.length;t+=1)o[t]=he(ue(e,r,t));return{c(){t=f("select");for(let e=0;e<o.length;e+=1)o[e].c();void 0===e[1]&&M((()=>e[15].call(t)))},m(r,s){c(r,t,s);for(let e=0;e<o.length;e+=1)o[e].m(t,null);_(t,e[1]),n||(l=h(t,"change",e[15]),n=!0)},p(e,n){if(72&n){let l;for(r=e[6][e[3].list],l=0;l<r.length;l+=1){const s=ue(e,r,l);o[l]?o[l].p(s,n):(o[l]=he(s),o[l].c(),o[l].m(t,null))}for(;l<o.length;l+=1)o[l].d(1);o.length=r.length}74&n&&_(t,e[1])},d(e){e&&a(t),p(o,e),n=!1,l()}}}function de(e){let t,n,l,o,s,i,p,v,y;return{c(){t=f("label"),n=m("T\n      "),l=f("input"),o=d(),s=f("label"),i=f("input"),p=m("\n      F"),g(l,"type","radio"),l.__value="1",l.value=l.__value,e[13][0].push(l),g(i,"type","radio"),i.__value="0",i.value=i.__value,e[13][0].push(i)},m(r,a){c(r,t,a),u(t,n),u(t,l),l.checked=l.__value===e[1],c(r,o,a),c(r,s,a),u(s,i),i.checked=i.__value===e[1],u(s,p),v||(y=[h(l,"change",e[12]),h(i,"change",e[14])],v=!0)},p(e,t){74&t&&(l.checked=l.__value===e[1]),74&t&&(i.checked=i.__value===e[1])},d(n){n&&a(t),e[13][0].splice(e[13][0].indexOf(l),1),n&&a(o),n&&a(s),e[13][0].splice(e[13][0].indexOf(i),1),v=!1,r(y)}}}function he(e){let t,n,l;return{c(){t=f("option"),t.__value=n=e[19].value,t.value=t.__value,g(t,"label",l=e[19].label)},m(e,n){c(e,t,n)},p(e,r){72&r&&n!==(n=e[19].value)&&(t.__value=n,t.value=t.__value),72&r&&l!==(l=e[19].label)&&g(t,"label",l)},d(e){e&&a(t)}}}function ve(e){let t,n,l,r,o,s;return{c(){t=f("select"),n=f("option"),n.textContent="=",l=f("option"),l.textContent="+",r=f("option"),r.textContent="-",n.__value="=",n.value=n.__value,l.__value="+",l.value=l.__value,r.__value="-",r.value=r.__value,void 0===e[2]&&M((()=>e[18].call(t)))},m(i,a){c(i,t,a),u(t,n),u(t,l),u(t,r),_(t,e[2]),o||(s=h(t,"change",e[18]),o=!0)},p(e,n){4&n&&_(t,e[2])},d(e){e&&a(t),o=!1,s()}}}function ge(t){let n,l,s,i,v,y,b,$,x,k=ie,w=[];for(let e=0;e<k.length;e+=1)w[e]=ae(ce(t,k,e));function S(e,t){return"checkbox"===e[3].type?de:e[3].list?me:"number"===e[3].type?fe:"text"===e[3].type?pe:void 0}let j=S(t),C=j&&j(t),O="number"===t[3].type&&ve(t);return{c(){n=f("div"),l=f("button"),l.textContent="x",s=d(),i=f("select");for(let e=0;e<w.length;e+=1)w[e].c();v=m("}"),y=d(),C&&C.c(),b=d(),O&&O.c(),void 0===t[4]&&M((()=>t[10].call(i))),g(n,"class","filters")},m(e,r){c(e,n,r),u(n,l),u(n,s),u(n,i);for(let e=0;e<w.length;e+=1)w[e].m(i,null);u(i,v),_(i,t[4]),t[11](i),u(n,y),C&&C.m(n,null),u(n,b),O&&O.m(n,null),$||(x=[h(l,"click",(function(){o(t[8](t[0]))&&t[8](t[0]).apply(this,arguments)})),h(i,"change",t[10]),h(i,"change",t[7])],$=!0)},p(e,[l]){if(t=e,0&l){let e;for(k=ie,e=0;e<k.length;e+=1){const n=ce(t,k,e);w[e]?w[e].p(n,l):(w[e]=ae(n),w[e].c(),w[e].m(i,v))}for(;e<w.length;e+=1)w[e].d(1);w.length=k.length}16&l&&_(i,t[4]),j===(j=S(t))&&C?C.p(t,l):(C&&C.d(1),C=j&&j(t),C&&(C.c(),C.m(n,b))),"number"===t[3].type?O?O.p(t,l):(O=ve(t),O.c(),O.m(n,null)):O&&(O.d(1),O=null)},i:e,o:e,d(e){e&&a(n),p(w,e),t[11](null),C&&C.d(),O&&O.d(),$=!1,r(x)}}}function ye(e,t,n){let l,r,o,s,u;i(e,re,(e=>n(6,u=e)));let c,{timestamp:a}=t,{rules:p}=t;return e.$$set=e=>{"timestamp"in e&&n(0,a=e.timestamp),"rules"in e&&n(9,p=e.rules)},e.$$.update=()=>{16&e.$$.dirty&&n(3,r=ie.find((e=>e.prop===l))),31&e.$$.dirty&&se.update(a,{prop:l,type:r.type,value:o,comparator:s})},n(4,l="name_zh"),n(1,o=null),n(2,s="="),[a,o,s,r,l,c,u,function(){n(1,o=null),console.log({select:c}),c.quer},function(e){se.remove(e)},p,function(){l=x(this),n(4,l)},function(e){O[e?"unshift":"push"]((()=>{c=e,n(5,c)}))},function(){o=this.__value,n(1,o),n(3,r),n(4,l)},[[]],function(){o=this.__value,n(1,o),n(3,r),n(4,l)},function(){o=x(this),n(1,o),n(3,r),n(4,l)},function(){o=y(this.value),n(1,o),n(3,r),n(4,l)},function(){o=this.value,n(1,o),n(3,r),n(4,l)},function(){s=x(this),n(2,s)}]}class be extends X{constructor(e){super(),U(this,e,ye,ge,s,{timestamp:0,rules:9})}}function $e(e,t){if(e)return t?_e(e.image,16):(e.deadProxyImage,xe(e.image))}function _e(e,t=96){return`https://images.weserv.nl/?w=${t}&il&url=${xe(e)}`}function xe(e){return`https://orna.guide/static/orna/img/${e}`}function ke(e,t,n){const l=e.slice();return l[6]=t[n],l}function we(e,t,n){const l=e.slice();return l[6]=t[n],l}function Se(e,t,n){const l=e.slice();return l[11]=t[n],l}function je(e){let t,n,l,r,o,s,i,d=e[1],v=[];for(let t=0;t<d.length;t+=1)v[t]=Ce(Se(e,d,t));return{c(){t=f("div"),n=m("[ Stats ]\n          "),l=f("br"),r=m("\n          ---------\n          "),o=f("table");for(let e=0;e<v.length;e+=1)v[e].c();var e,s,i;e="cursor",s="pointer",o.style.setProperty(e,s,i?"important":""),g(o,"class","svelte-ky1493"),g(t,"class","svelte-ky1493")},m(a,p){c(a,t,p),u(t,n),u(t,l),u(t,r),u(t,o);for(let e=0;e<v.length;e+=1)v[e].m(o,null);s||(i=h(o,"click",e[2]),s=!0)},p(e,t){if(10&t){let n;for(d=e[1],n=0;n<d.length;n+=1){const l=Se(e,d,n);v[n]?v[n].p(l,t):(v[n]=Ce(l),v[n].c(),v[n].m(o,null))}for(;n<v.length;n+=1)v[n].d(1);v.length=d.length}},d(e){e&&a(t),p(v,e),s=!1,i()}}}function Ce(e){let t,n,l,r,o,s,i,p=e[3](e[11].prop)+"",h=e[11].value+"";return{c(){t=f("tr"),n=f("th"),l=m(p),r=d(),o=f("td"),s=m(h),i=d(),g(n,"class","svelte-ky1493")},m(e,a){c(e,t,a),u(t,n),u(n,l),u(t,r),u(t,o),u(o,s),u(t,i)},p(e,t){2&t&&p!==(p=e[3](e[11].prop)+"")&&b(l,p),2&t&&h!==(h=e[11].value+"")&&b(s,h)},d(e){e&&a(t)}}}function Oe(e){let t,n,l,r,o=e[0].prevents,s=[];for(let t=0;t<o.length;t+=1)s[t]=qe(we(e,o,t));return{c(){t=f("div"),n=m("[ 🛡️ ]\n          "),l=f("br"),r=m("\n          ------\n          ");for(let e=0;e<s.length;e+=1)s[e].c();g(t,"class","svelte-ky1493")},m(e,o){c(e,t,o),u(t,n),u(t,l),u(t,r);for(let e=0;e<s.length;e+=1)s[e].m(t,null)},p(e,n){if(9&n){let l;for(o=e[0].prevents,l=0;l<o.length;l+=1){const r=we(e,o,l);s[l]?s[l].p(r,n):(s[l]=qe(r),s[l].c(),s[l].m(t,null))}for(;l<s.length;l+=1)s[l].d(1);s.length=o.length}},d(e){e&&a(t),p(s,e)}}}function qe(e){let t,n,l=e[3](e[6])+"";return{c(){t=f("div"),n=m(l)},m(e,l){c(e,t,l),u(t,n)},p(e,t){1&t&&l!==(l=e[3](e[6])+"")&&b(n,l)},d(e){e&&a(t)}}}function Ee(e){let t,n,l,r,o=e[0].causes,s=[];for(let t=0;t<o.length;t+=1)s[t]=Le(ke(e,o,t));return{c(){t=f("div"),n=m("[ 🗡️ ]\n          "),l=f("br"),r=m("\n          ------\n          ");for(let e=0;e<s.length;e+=1)s[e].c();g(t,"class","svelte-ky1493")},m(e,o){c(e,t,o),u(t,n),u(t,l),u(t,r);for(let e=0;e<s.length;e+=1)s[e].m(t,null)},p(e,n){if(9&n){let l;for(o=e[0].causes,l=0;l<o.length;l+=1){const r=ke(e,o,l);s[l]?s[l].p(r,n):(s[l]=Le(r),s[l].c(),s[l].m(t,null))}for(;l<s.length;l+=1)s[l].d(1);s.length=o.length}},d(e){e&&a(t),p(s,e)}}}function Le(e){let t,n,l=e[3](e[6])+"";return{c(){t=f("div"),n=m(l)},m(e,l){c(e,t,l),u(t,n)},p(e,t){1&t&&l!==(l=e[3](e[6])+"")&&b(n,l)},d(e){e&&a(t)}}}function ze(t){let n,l,r,o,s,i,p,y,$,_,x,k,w,S,j,C,O,q,E,L,z,M,A,B,D,P,T,N,R,F,H,I,J,V,W,G,K,Q,U,X,Y,Z,te,ne,le,re,oe,se=t[0].name_zh+"",ie=t[0].name+"",ue=t[0].tier+"",ce=ee[t[0].element]?`[${ee[t[0].element]}]`:"",ae=t[0].boss?"👿":"",pe=t[0].arena?"🏟️":"",fe=t[0].view_distance?"👁️":"",me=JSON.stringify({...t[0],context:null},null," ")+"",de=t[1]&&je(t),he=t[0].prevents&&Oe(t),ve=t[0].causes&&Ee(t);return{c(){n=f("details"),l=f("summary"),r=f("ruby"),o=f("rb"),s=m(se),i=d(),p=f("rt"),y=m(ie),$=d(),_=f("a"),x=f("sup"),k=m("★"),w=m(ue),j=d(),C=f("div"),O=f("div"),E=d(),de&&de.c(),L=d(),he&&he.c(),z=d(),ve&&ve.c(),M=d(),A=f("div"),B=f("div"),P=d(),T=f("div"),N=m(ce),R=d(),F=f("div"),H=m(ae),I=d(),J=f("div"),V=m(pe),W=d(),G=f("div"),K=m(fe),Q=d(),U=f("div"),X=f("div"),Y=f("details"),Z=f("summary"),te=d(),ne=f("pre"),le=m(me),g(p,"class","svelte-ky1493"),g(r,"class","svelte-ky1493"),g(x,"class","svelte-ky1493"),g(_,"href",S="https://orna.guide/items?show="+t[0].id),g(_,"target","orna.guide"),g(O,"class","item-img-box svelte-ky1493"),g(O,"style",q=`--bg: url(${$e(t[0])}); --bg-fallback: url(${$e(t[0],"small")})`),g(C,"class","item-info svelte-ky1493"),g(B,"class","item-equipped svelte-ky1493"),g(B,"data-by",D=t[0].equipped_by),g(T,"class","item-char svelte-ky1493"),g(F,"class","item-char svelte-ky1493"),g(J,"class","item-char svelte-ky1493"),g(G,"class","item-char svelte-ky1493"),g(A,"class","rt-box svelte-ky1493"),g(l,"class","summary svelte-ky1493"),g(Z,"class","text-right"),g(ne,"class","item-pre svelte-ky1493"),g(X,"class","item-more svelte-ky1493"),g(n,"class","item-details svelte-ky1493")},m(e,a){c(e,n,a),u(n,l),u(l,r),u(r,o),u(o,s),u(r,i),u(r,p),u(p,y),u(l,$),u(l,_),u(_,x),u(x,k),u(x,w),u(l,j),u(l,C),u(C,O),u(C,E),de&&de.m(C,null),u(C,L),he&&he.m(C,null),u(C,z),ve&&ve.m(C,null),u(l,M),u(l,A),u(A,B),u(A,P),u(A,T),u(T,N),u(A,R),u(A,F),u(F,H),u(A,I),u(A,J),u(J,V),u(A,W),u(A,G),u(G,K),u(n,Q),u(n,U),u(U,X),u(X,Y),u(Y,Z),u(Y,te),u(Y,ne),u(ne,le),re||(oe=h(C,"click",v(t[4])),re=!0)},p(e,[t]){1&t&&se!==(se=e[0].name_zh+"")&&b(s,se),1&t&&ie!==(ie=e[0].name+"")&&b(y,ie),1&t&&ue!==(ue=e[0].tier+"")&&b(w,ue),1&t&&S!==(S="https://orna.guide/items?show="+e[0].id)&&g(_,"href",S),1&t&&q!==(q=`--bg: url(${$e(e[0])}); --bg-fallback: url(${$e(e[0],"small")})`)&&g(O,"style",q),e[1]?de?de.p(e,t):(de=je(e),de.c(),de.m(C,L)):de&&(de.d(1),de=null),e[0].prevents?he?he.p(e,t):(he=Oe(e),he.c(),he.m(C,z)):he&&(he.d(1),he=null),e[0].causes?ve?ve.p(e,t):(ve=Ee(e),ve.c(),ve.m(C,null)):ve&&(ve.d(1),ve=null),1&t&&D!==(D=e[0].equipped_by)&&g(B,"data-by",D),1&t&&ce!==(ce=ee[e[0].element]?`[${ee[e[0].element]}]`:"")&&b(N,ce),1&t&&ae!==(ae=e[0].boss?"👿":"")&&b(H,ae),1&t&&pe!==(pe=e[0].arena?"🏟️":"")&&b(V,pe),1&t&&fe!==(fe=e[0].view_distance?"👁️":"")&&b(K,fe),1&t&&me!==(me=JSON.stringify({...e[0],context:null},null," ")+"")&&b(le,me)},i:e,o:e,d(e){e&&a(n),de&&de.d(),he&&he.d(),ve&&ve.d(),re=!1,oe()}}}function Me(e,t,n){let l;i(e,oe,(e=>n(5,l=e)));let{item:r}=t,o=r.stats;return o&&(o=Object.keys(o).map((e=>({prop:e,value:o[e].base})))),e.$$set=e=>{"item"in e&&n(0,r=e.item)},[r,o,function(){console.log(l),oe.set({open:!0,item:r,stats:o})},function(e){return ee[e]||e},function(t){j.call(this,e,t)}]}class Ae extends X{constructor(e){super(),U(this,e,Me,ze,s,{item:0})}}function Be(e,t,n){const l=e.slice();return l[7]=t[n],l[8]=t,l[9]=n,l}function De(e){let t,n,l,r,o,s,i,y,$,_,x,k,w,S,j=e[0].item.name_zh+"",C=e[1],O=[];for(let t=0;t<C.length;t+=1)O[t]=Pe(Be(e,C,t));return{c(){t=f("form"),n=f("table"),l=f("caption"),r=m("品質試算\n            "),o=f("br"),s=m("\n            [ "),i=m(j),y=m(" ]"),$=d();for(let e=0;e<O.length;e+=1)O[e].c();_=d(),x=f("div"),k=f("button"),k.textContent="Reset",g(l,"class","svelte-1o43v9f"),g(n,"class","assess-table svelte-1o43v9f"),g(k,"type","reset"),g(x,"class","text-right")},m(a,p){c(a,t,p),u(t,n),u(n,l),u(l,r),u(l,o),u(l,s),u(l,i),u(l,y),u(n,$);for(let e=0;e<O.length;e+=1)O[e].m(n,null);u(t,_),u(t,x),u(x,k),w||(S=h(k,"click",v(e[3])),w=!0)},p(e,t){if(1&t&&j!==(j=e[0].item.name_zh+"")&&b(i,j),2&t){let l;for(C=e[1],l=0;l<C.length;l+=1){const r=Be(e,C,l);O[l]?O[l].p(r,t):(O[l]=Pe(r),O[l].c(),O[l].m(n,null))}for(;l<O.length;l+=1)O[l].d(1);O.length=C.length}},d(e){e&&a(t),p(O,e),w=!1,S()}}}function Pe(e){let t,n,l,o,s,i,p,v,_,x,k,w,S,j,C,O,q,E,L,z,M=e[7].prop+"",A=Ne(e[7])+"";function B(){e[4].call(i,e[8],e[9])}function D(){e[5].call(w,e[8],e[9])}return{c(){t=f("tr"),n=f("th"),l=m(M),o=d(),s=f("td"),i=f("input"),_=d(),x=f("br"),k=d(),w=f("input"),C=d(),O=f("td"),q=m(A),E=d(),g(n,"class","svelte-1o43v9f"),g(i,"type","number"),g(i,"max",p=e[7].max),g(i,"min",v=e[7].min),g(i,"step","1"),g(i,"class","svelte-1o43v9f"),g(w,"type","range"),g(w,"max",S=e[7].max),g(w,"min",j=e[7].min),g(w,"step","1"),g(w,"class","svelte-1o43v9f"),g(s,"class","text-center svelte-1o43v9f"),g(O,"class","svelte-1o43v9f")},m(r,a){c(r,t,a),u(t,n),u(n,l),u(t,o),u(t,s),u(s,i),$(i,e[7].value),u(s,_),u(s,x),u(s,k),u(s,w),$(w,e[7].value),u(t,C),u(t,O),u(O,q),u(t,E),L||(z=[h(i,"input",B),h(w,"change",D),h(w,"input",D)],L=!0)},p(t,n){e=t,2&n&&M!==(M=e[7].prop+"")&&b(l,M),2&n&&p!==(p=e[7].max)&&g(i,"max",p),2&n&&v!==(v=e[7].min)&&g(i,"min",v),2&n&&y(i.value)!==e[7].value&&$(i,e[7].value),2&n&&S!==(S=e[7].max)&&g(w,"max",S),2&n&&j!==(j=e[7].min)&&g(w,"min",j),2&n&&$(w,e[7].value),2&n&&A!==(A=Ne(e[7])+"")&&b(q,A)},d(e){e&&a(t),L=!1,r(z)}}}function Te(t){let n,l,r,o,s,i,p,m=t[0].item&&De(t);return{c(){n=f("div"),l=f("div"),r=d(),o=f("main"),m&&m.c(),g(l,"class","overlay svelte-1o43v9f"),g(o,"class","content svelte-1o43v9f"),g(n,"class","dialog svelte-1o43v9f"),n.hidden=s=!t[0].open},m(e,s){c(e,n,s),u(n,l),u(n,r),u(n,o),m&&m.m(o,null),i||(p=h(l,"click",t[2]),i=!0)},p(e,[t]){e[0].item?m?m.p(e,t):(m=De(e),m.c(),m.m(o,null)):m&&(m.d(1),m=null),1&t&&s!==(s=!e[0].open)&&(n.hidden=s)},i:e,o:e,d(e){e&&a(n),m&&m.d(),i=!1,p()}}}function Ne(e){return`${(100*e.value/e.oValue).toFixed(1)}%`}function Re(e,t,n){let l,r;return i(e,oe,(e=>n(0,r=e))),e.$$.update=()=>{var t;1&e.$$.dirty&&r&&r.stats&&(t=r.stats,n(1,l=t.map((e=>({prop:ee[e.prop]||e.prop,value:e.value,oValue:e.value,max:2*e.value,min:~~(.7*e.value)})))))},n(1,l=[]),[r,l,function(){!function(e,t,n=t){e.set(n)}(oe,r={open:!1},r)},function(){n(1,l=l.map((e=>({...e,value:e.oValue}))))},function(e,t){e[t].value=y(this.value),n(1,l)},function(e,t){e[t].value=y(this.value),n(1,l)}]}class Fe extends X{constructor(e){super(),U(this,e,Re,Te,s,{})}}function He(e,t,n){const l=e.slice();return l[17]=t[n],l}function Ie(e,t,n){const l=e.slice();return l[20]=t[n],l}function Je(e,t,n){const l=e.slice();return l[23]=t[n],l}function Ve(e,n){let l,r,o,s;const i=[n[23]];let p={};for(let e=0;e<i.length;e+=1)p=t(p,i[e]);return r=new be({props:p}),{key:e,first:null,c(){l=f("li"),W(r.$$.fragment),o=d(),this.first=l},m(e,t){c(e,l,t),G(r,l,null),u(l,o),s=!0},p(e,t){n=e;const l=64&t?function(e,t){const n={},l={},r={$$scope:1};let o=e.length;for(;o--;){const s=e[o],i=t[o];if(i){for(const e in s)e in i||(l[e]=1);for(const e in i)r[e]||(n[e]=i[e],r[e]=1);e[o]=i}else for(const e in s)r[e]=1}for(const e in l)e in n||(n[e]=void 0);return n}(i,[(o=n[23],"object"==typeof o&&null!==o?o:{})]):{};var o;r.$set(l)},i(e){s||(H(r.$$.fragment,e),s=!0)},o(e){I(r.$$.fragment,e),s=!1},d(e){e&&a(l),K(r)}}}function We(e){let t,n,l,o,s,i,v,x,w,S,j,C,O,q,E,L,z,A,B,D,P,T,N,W,G,K=e[0].length+"",Q=[],U=new Map,X=e[3],Y=[];for(let t=0;t<X.length;t+=1)Y[t]=Ge(Ie(e,X,t));let Z=e[0].slice(0,e[5]);const ee=e=>e[17].id;for(let t=0;t<Z.length;t+=1){let n=He(e,Z,t),l=ee(n);U.set(l,Q[t]=Ke(l,n))}return{c(){t=f("div"),n=f("div"),l=m("排序:\n      "),o=f("select");for(let e=0;e<Y.length;e+=1)Y[e].c();s=d(),i=f("input"),v=d(),x=f("details"),w=f("summary"),S=m("顯示數量\n        "),j=f("input"),C=m("\n        / "),O=m(K),q=d(),E=f("div"),L=m("總數\n        "),z=f("input"),A=m("\n        以下秀圖"),B=d(),D=f("hr"),P=d(),T=f("ul");for(let e=0;e<Q.length;e+=1)Q[e].c();void 0===e[1]&&M((()=>e[11].call(o))),g(i,"id","sortDir"),g(i,"type","checkbox"),g(i,"class","svelte-p2hn9j"),g(j,"class","text-center"),g(j,"type","number"),g(j,"min","5"),g(j,"max","2000"),g(j,"step","5"),g(z,"class","text-center"),g(z,"type","number"),g(z,"min","1"),g(z,"max","50"),g(t,"class","nav svelte-p2hn9j"),g(T,"class","items svelte-p2hn9j"),k(T,"showDetails",e[7])},m(r,a){c(r,t,a),u(t,n),u(n,l),u(n,o);for(let e=0;e<Y.length;e+=1)Y[e].m(o,null);_(o,e[1]),u(n,s),u(n,i),i.checked=e[2],u(t,v),u(t,x),u(x,w),u(w,S),u(w,j),$(j,e[5]),u(w,C),u(w,O),u(x,q),u(x,E),u(E,L),u(E,z),$(z,e[4]),u(E,A),c(r,B,a),c(r,D,a),c(r,P,a),c(r,T,a);for(let e=0;e<Q.length;e+=1)Q[e].m(T,null);N=!0,W||(G=[h(o,"change",e[11]),h(i,"change",e[12]),h(j,"input",e[13]),h(z,"input",e[14])],W=!0)},p(e,t){if(8&t){let n;for(X=e[3],n=0;n<X.length;n+=1){const l=Ie(e,X,n);Y[n]?Y[n].p(l,t):(Y[n]=Ge(l),Y[n].c(),Y[n].m(o,null))}for(;n<Y.length;n+=1)Y[n].d(1);Y.length=X.length}10&t&&_(o,e[1]),4&t&&(i.checked=e[2]),32&t&&y(j.value)!==e[5]&&$(j,e[5]),(!N||1&t)&&K!==(K=e[0].length+"")&&b(O,K),16&t&&y(z.value)!==e[4]&&$(z,e[4]),33&t&&(Z=e[0].slice(0,e[5]),R(),Q=V(Q,t,ee,1,e,Z,U,T,J,Ke,null,He),F()),128&t&&k(T,"showDetails",e[7])},i(e){if(!N){for(let e=0;e<Z.length;e+=1)H(Q[e]);N=!0}},o(e){for(let e=0;e<Q.length;e+=1)I(Q[e]);N=!1},d(e){e&&a(t),p(Y,e),e&&a(B),e&&a(D),e&&a(P),e&&a(T);for(let e=0;e<Q.length;e+=1)Q[e].d();W=!1,r(G)}}}function Ge(e){let t,n,l;return{c(){t=f("option"),t.__value=n=e[20],t.value=t.__value,g(t,"label",l=e[20])},m(e,n){c(e,t,n)},p(e,r){8&r&&n!==(n=e[20])&&(t.__value=n,t.value=t.__value),8&r&&l!==(l=e[20])&&g(t,"label",l)},d(e){e&&a(t)}}}function Ke(e,t){let n,l,r,o;return l=new Ae({props:{item:t[17]}}),{key:e,first:null,c(){n=f("li"),W(l.$$.fragment),r=d(),g(n,"class","svelte-p2hn9j"),this.first=n},m(e,t){c(e,n,t),G(l,n,null),u(n,r),o=!0},p(e,n){t=e;const r={};33&n&&(r.item=t[17]),l.$set(r)},i(e){o||(H(l.$$.fragment,e),o=!0)},o(e){I(l.$$.fragment,e),o=!1},d(e){e&&a(n),K(l)}}}function Qe(e){let t,n,l,r,o,s,i,p,m,v,y,b,$,_,x,k,w,S,j,C=[],O=new Map,q=e[6];const E=e=>e[23].timestamp;for(let t=0;t<q.length;t+=1){let n=Je(e,q,t),l=E(n);O.set(l,C[t]=Ve(l,n))}let L=e[0].length&&We(e);return b=new Fe({}),{c(){t=f("div"),n=f("h1"),n.innerHTML='<a href="https://playorna.com/" target="_blank">Orna RPG</a> items lookup tool',l=d(),r=f("aside"),o=f("button"),o.textContent="+過濾條件",s=d(),i=f("ul");for(let e=0;e<C.length;e+=1)C[e].c();p=d(),m=f("hr"),v=d(),L&&L.c(),y=d(),W(b.$$.fragment),$=d(),_=f("hr"),x=d(),k=f("footer"),k.innerHTML='* data &amp; image source: <a href="https://orna.guide/" target="_blank">https://orna.guide/</a>  <br/>\n  * repo: <a href="https://github.com/rplus/orna-lookup" target="_blank">Rplus/orna-lookup</a>',g(n,"class","text-center"),g(t,"class","workspace svelte-p2hn9j"),g(k,"class","svelte-p2hn9j")},m(a,f){c(a,t,f),u(t,n),u(t,l),u(t,r),u(r,o),u(r,s),u(r,i);for(let e=0;e<C.length;e+=1)C[e].m(i,null);u(t,p),u(t,m),u(t,v),L&&L.m(t,null),u(t,y),G(b,t,null),c(a,$,f),c(a,_,f),c(a,x,f),c(a,k,f),w=!0,S||(j=h(o,"click",e[8]),S=!0)},p(e,[n]){64&n&&(q=e[6],R(),C=V(C,n,E,1,e,q,O,i,J,Ve,null,Je),F()),e[0].length?L?(L.p(e,n),1&n&&H(L,1)):(L=We(e),L.c(),H(L,1),L.m(t,y)):L&&(R(),I(L,1,1,(()=>{L=null})),F())},i(e){if(!w){for(let e=0;e<q.length;e+=1)H(C[e]);H(L),H(b.$$.fragment,e),w=!0}},o(e){for(let e=0;e<C.length;e+=1)I(C[e]);I(L),I(b.$$.fragment,e),w=!1},d(e){e&&a(t);for(let e=0;e<C.length;e+=1)C[e].d();L&&L.d(),K(b),e&&a($),e&&a(_),e&&a(x),e&&a(k),S=!1,j()}}}function Ue(e,t,n){let l,r,o,s,u,c,a;i(e,le,(e=>n(10,c=e))),i(e,se,(e=>n(6,a=e)));let p,f=!1,m=[];function d(e){let t=c;return!e||!e.length||1===e.length&&null==e[0].rules?.value?t:(e.map((e=>e.rules)).forEach((e=>{e&&(t=function(e,t){let{prop:n,type:l,value:r,comparator:o}=t;if(!r||!e.length)return e;switch("string"==typeof r&&(r=r.toLowerCase()),"checkbox"===l&&(r=Boolean(+r)),l){case"checkbox":return r?e.filter((e=>e[n])):e.filter((e=>!e[n]));case"number":return e.filter((e=>{switch(o){case"+":return e[n]>=r;case"-":return e[n]<=r;default:return e[n]===r}}));case"text":let t=new RegExp(r,"i");return e.filter((e=>t.test(e[n])));default:return e}}(t,e))})),function(e=m){return e.sort(((e,t)=>{let n=r?1:-1;switch(typeof e[p]){case"string":return e[p].localeCompare(t[p])*n;case"number":return(e[p]-t[p])*n;default:return 0}}))}(t))}function h(){se.add({timestamp:+new Date})}return h(),e.$$.update=()=>{if(1545&e.$$.dirty&&!c.waiting&&!f){n(9,f=!0),n(0,m=c);let e=[...new Set(m.map((e=>Object.keys(e))).flat())];n(3,l=e.filter((e=>{let t=typeof m.find((t=>t[e]))?.[e],n=ie.find((t=>t.prop===e));return"object"!==t&&n?.list}))),l.includes("tier")?n(1,p="tier"):n(1,p=l[0])}70&e.$$.dirty&&n(0,m=d(a)),49&e.$$.dirty&&n(7,u=m.length<=s||o<=s)},n(3,l=[]),n(2,r=!0),n(5,o=50),n(4,s=20),[m,p,r,l,s,o,a,u,h,f,c,function(){p=x(this),n(1,p),n(10,c),n(9,f),n(0,m),n(3,l),n(2,r),n(6,a),n(3,l),n(10,c),n(9,f),n(0,m),n(1,p),n(2,r),n(6,a)},function(){r=this.checked,n(2,r)},function(){o=y(this.value),n(5,o)},function(){s=y(this.value),n(4,s)}]}return new class extends X{constructor(e){super(),U(this,e,Ue,Qe,s,{})}}({target:document.body,props:{name:"world"}})}();
//# sourceMappingURL=bundle.js.map
