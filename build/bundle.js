var app=function(){"use strict";function e(){}function t(e){return e()}function n(){return Object.create(null)}function l(e){e.forEach(t)}function r(e){return"function"==typeof e}function s(e,t){return e!=e?t==t:e!==t||e&&"object"==typeof e||"function"==typeof e}function o(t,...n){if(null==t)return e;const l=t.subscribe(...n);return l.unsubscribe?()=>l.unsubscribe():l}function a(e,t,n){e.$$.on_destroy.push(o(t,n))}function u(e,t){e.appendChild(t)}function i(e,t,n){e.insertBefore(t,n||null)}function c(e){e.parentNode.removeChild(e)}function p(e,t){for(let n=0;n<e.length;n+=1)e[n]&&e[n].d(t)}function f(e){return document.createElement(e)}function m(e){return document.createTextNode(e)}function d(){return m(" ")}function h(){return m("")}function v(e,t,n,l){return e.addEventListener(t,n,l),()=>e.removeEventListener(t,n,l)}function g(e){return function(t){return t.preventDefault(),e.call(this,t)}}function b(e,t,n){null==n?e.removeAttribute(t):e.getAttribute(t)!==n&&e.setAttribute(t,n)}function y(e){return""===e?null:+e}function $(e,t){t=""+t,e.wholeText!==t&&(e.data=t)}function _(e,t){e.value=null==t?"":t}function x(e,t){for(let n=0;n<e.options.length;n+=1){const l=e.options[n];if(l.__value===t)return void(l.selected=!0)}}function w(e){const t=e.querySelector(":checked")||e.options[0];return t&&t.__value}function k(e,t,n){e.classList[n?"add":"remove"](t)}let j;function z(e){j=e}function S(e,t){const n=e.$$.callbacks[t.type];n&&n.slice().forEach((e=>e.call(this,t)))}const D=[],O=[],C=[],L=[],P=Promise.resolve();let q=!1;function E(e){C.push(e)}let N=!1;const A=new Set;function B(){if(!N){N=!0;do{for(let e=0;e<D.length;e+=1){const t=D[e];z(t),M(t.$$)}for(z(null),D.length=0;O.length;)O.pop()();for(let e=0;e<C.length;e+=1){const t=C[e];A.has(t)||(A.add(t),t())}C.length=0}while(D.length);for(;L.length;)L.pop()();q=!1,N=!1,A.clear()}}function M(e){if(null!==e.fragment){e.update(),l(e.before_update);const t=e.dirty;e.dirty=[-1],e.fragment&&e.fragment.p(e.ctx,t),e.after_update.forEach(E)}}const T=new Set;let H;function J(){H={r:0,c:[],p:H}}function W(){H.r||l(H.c),H=H.p}function I(e,t){e&&e.i&&(T.delete(e),e.i(t))}function R(e,t,n,l){if(e&&e.o){if(T.has(e))return;T.add(e),H.c.push((()=>{T.delete(e),l&&(n&&e.d(1),l())})),e.o(t)}}function V(e,t){R(e,1,1,(()=>{t.delete(e.key)}))}function F(e,t,n,l,r,s,o,a,u,i,c,p){let f=e.length,m=s.length,d=f;const h={};for(;d--;)h[e[d].key]=d;const v=[],g=new Map,b=new Map;for(d=m;d--;){const e=p(r,s,d),a=n(e);let u=o.get(a);u?l&&u.p(e,t):(u=i(a,e),u.c()),g.set(a,v[d]=u),a in h&&b.set(a,Math.abs(d-h[a]))}const y=new Set,$=new Set;function _(e){I(e,1),e.m(a,c),o.set(e.key,e),c=e.first,m--}for(;f&&m;){const t=v[m-1],n=e[f-1],l=t.key,r=n.key;t===n?(c=t.first,f--,m--):g.has(r)?!o.has(l)||y.has(l)?_(t):$.has(r)?f--:b.get(l)>b.get(r)?($.add(l),_(t)):(y.add(r),f--):(u(n,o),f--)}for(;f--;){const t=e[f];g.has(t.key)||u(t,o)}for(;m;)_(v[m-1]);return v}function G(e){e&&e.c()}function U(e,n,s,o){const{fragment:a,on_mount:u,on_destroy:i,after_update:c}=e.$$;a&&a.m(n,s),o||E((()=>{const n=u.map(t).filter(r);i?i.push(...n):l(n),e.$$.on_mount=[]})),c.forEach(E)}function Z(e,t){const n=e.$$;null!==n.fragment&&(l(n.on_destroy),n.fragment&&n.fragment.d(t),n.on_destroy=n.fragment=null,n.ctx=[])}function K(e,t){-1===e.$$.dirty[0]&&(D.push(e),q||(q=!0,P.then(B)),e.$$.dirty.fill(0)),e.$$.dirty[t/31|0]|=1<<t%31}function Q(t,r,s,o,a,u,i,p=[-1]){const f=j;z(t);const m=t.$$={fragment:null,ctx:null,props:u,update:e,not_equal:a,bound:n(),on_mount:[],on_destroy:[],on_disconnect:[],before_update:[],after_update:[],context:new Map(f?f.$$.context:r.context||[]),callbacks:n(),dirty:p,skip_bound:!1,root:r.target||f.$$.root};i&&i(m.root);let d=!1;if(m.ctx=s?s(t,r.props||{},((e,n,...l)=>{const r=l.length?l[0]:n;return m.ctx&&a(m.ctx[e],m.ctx[e]=r)&&(!m.skip_bound&&m.bound[e]&&m.bound[e](r),d&&K(t,e)),n})):[],m.update(),d=!0,l(m.before_update),m.fragment=!!o&&o(m.ctx),r.target){if(r.hydrate){const e=function(e){return Array.from(e.childNodes)}(r.target);m.fragment&&m.fragment.l(e),e.forEach(c)}else m.fragment&&m.fragment.c();r.intro&&I(t.$$.fragment),U(t,r.target,r.anchor,r.customElement),B()}z(f)}class Y{$destroy(){Z(this,1),this.$destroy=e}$on(e,t){const n=this.$$.callbacks[e]||(this.$$.callbacks[e]=[]);return n.push(t),()=>{const e=n.indexOf(t);-1!==e&&n.splice(e,1)}}$set(e){var t;this.$$set&&(t=e,0!==Object.keys(t).length)&&(this.$$.skip_bound=!0,this.$$set(e),this.$$.skip_bound=!1)}}const X=[];function ee(t,n=e){let l;const r=new Set;function o(e){if(s(t,e)&&(t=e,l)){const e=!X.length;for(const e of r)e[1](),X.push(e,t);if(e){for(let e=0;e<X.length;e+=2)X[e][0](X[e+1]);X.length=0}}}return{set:o,update:function(e){o(e(t))},subscribe:function(s,a=e){const u=[s,a];return r.add(u),1===r.size&&(l=n(o)||e),s(t),()=>{r.delete(u),0===r.size&&(l(),l=null)}}}}const te={Bleeding:"流血",Frozen:"冰凍",Burning:"燃燒",Asleep:"入睡",Paralyzed:"麻痺",Blind:"致盲",Stunned:"暈眩",Rot:"腐敗",Blight:"枯萎",Petrified:"石化",Poisoned:"中毒",Drenched:"濕滑",Cursed:"詛咒",Toxic:"劇毒",Lulled:"安份",Mage:"法師",Thief:"盜賊",Warrior:"戰士",Curative:"藥水",Weapon:".. 武器",Other:"其他",Item:"物品",Head:". 頭部",Armor:".. 護甲",Legs:"... 腿部",Accessory:"... 配件",Material:"材料","Off-hand":".. 副手",Adornment:"裝飾品",Dark:"闇",Water:"水",Fire:"火",Physical:"物",Holy:"光",Earthen:"土",Lightning:"雷",Dragon:"龍",Arcane:"奧","Fire Def":".火抗","Water Def":".水抗","Earth Def":".土抗","Lightning Def":".雷抗","Holy Def":".光抗","Dark Def":".闇抗","stats.attack":"物攻","stats.magic":"魔攻","stats.defense":"物防","stats.ward":"護盾","stats.dexterity":"敏捷","stats.mana":"魔力","stats.crit":"暴擊","stats.resistance":"魔防","stats.hp":"血量"};function ne(e){return function(e){for(let t in e)e[t]=e[t].filter(Boolean).map((e=>({value:e,label:te[e]?`${te[e]} ${e}`:e}))).sort(((e,t)=>le(e.label,t.label))),e[t].unshift({value:"",label:""});return e}({types:[...new Set(e.map((e=>e.type)))],tiers:[...new Set(e.map((e=>e.tier)))],element:[...new Set(e.map((e=>e.element)))],immunities:[...new Set(e.map((e=>e.immunities?.split(", "))).flat())],causes:[...new Set(e.map((e=>e.causes)).flat())],prevents:[...new Set(e.map((e=>e.prevents)).flat())],gives:[...new Set(e.map((e=>e.gives)).flat())],cures:[...new Set(e.map((e=>e.cures)).flat())],equipped_by:[...new Set(e.map((e=>e.equipped_by)).flat().filter(Boolean))]})}function le(e,t){switch(typeof e){case"number":return e-t;case"string":return e.toLowerCase().localeCompare(t.toLowerCase());default:return e>label_12}}function re(e){return te[e]||e}function se(e,t){return e-t}function oe(e){return{timestamp:+new Date,rule:{prop:e.prop,value:ae(e.value,e.type),type:e.type,comparator:"="}}}function ae(e,t){switch(t){case"number":return+e;case"text":default:return String(e)}return e}function ue(e){return oe({prop:"name_zh",value:e||"",type:"text"})}function ie(e,t){return t.tier-e.tier}const ce=[{prop:"name_zh",label:"name_zh",type:"text",sort:!0},{prop:"name",label:"name_en",type:"text",sort:!0},{prop:"tier",label:"Tier ★",type:"number",list:"tiers",min:1,max:10,sort:!0},{prop:"equipped_by",label:"穿戴者",type:"text",list:"equipped_by"},{prop:"prevents",label:"-免疫(敵)",type:"text",list:"prevents"},{prop:"cures",label:"-治癒(己)",type:"text",list:"cures"},{prop:"causes",label:"+造成(敵)",type:"text",list:"causes"},{prop:"gives",label:"+給予(己)",type:"text",list:"gives"},{prop:"type",label:"裝備類型",type:"text",list:"types",sort:!0},{prop:"element",label:"元素",type:"text",list:"element",sort:!0},{prop:"boss",label:"👿 BOSS",type:"checkbox"},{prop:"arena",label:"🏟️ 競技場",type:"checkbox"},{prop:"view_distance",label:"👁️ +視野",type:"checkbox"},{prop:"materials",label:"材料id",type:"number",checkId:!0},{prop:"dropped_by",label:"掉落者id",type:"number",checkId:!0},{prop:"stats.attack",label:".物攻",type:"number",sort:!0},{prop:"stats.magic",label:".魔攻",type:"number",sort:!0},{prop:"stats.defense",label:".物防",type:"number",sort:!0},{prop:"stats.resistance",label:".魔防",type:"number",sort:!0},{prop:"stats.dexterity",label:".敏捷",type:"number",sort:!0},{prop:"stats.crit",label:".暴擊",type:"number",sort:!0},{prop:"stats.ward",label:".護盾",type:"number",sort:!0},{prop:"stats.mana",label:".魔力",type:"number",sort:!0},{prop:"stats.hp",label:".血量",type:"number",sort:!0},{prop:"context",label:"全文搜索",type:"text"},{prop:"id",label:"id",type:"number",min:1,sort:!0}],pe=ee({waiting:!0}),fe=ee({}),me=ee({open:!1});Promise.all(["./data/item.min.json","./data/monster.min.json"].map((e=>fetch(e).then((e=>e.json()))))).then((e=>{let t=function(e,t){let n=e=>{let n=t.find((t=>t.id===e));return n?{id:n.id,tier:n.tier,name:n.name,name_zh:n.zh}:null},l=t=>{let n=e.find((e=>e.id===t));return n?{id:n.id,tier:n.tier,name:n.name,name_zh:n.zh}:null};return e.forEach((e=>{e.dropped_by=e.dropped_by?.map(n).sort(ie),e.materials=e.materials?.map(l).sort(ie),e.name_zh=e.zh,e.context=JSON.stringify(e)})),{items:e,monsters:t}}(e[0],e[1]);const n=t.items,l=t.monsters;window.ddd=n,fe.set(ne(n)),ne(n),pe.set({items:n,monsters:l})}));let de=new URLSearchParams(location.search),he=ce.find((e=>de.get(e.prop))),ve=he?oe({prop:he.prop,type:he.type,value:de.get(he.prop)}):ue("");const ge=function(){const{subscribe:e,set:t,update:n}=ee([ve]);return{subscribe:e,set:t,update:n,add:e=>n((t=>(t[t.length]=e,t))),remove:e=>n((t=>{let n=t.findIndex((t=>t.timestamp===e));return-1!==n&&t.splice(n,1),t})),reset:()=>t([])}}();function be(e,t,n){const l=e.slice();return l[14]=t[n],l}function ye(e,t,n){const l=e.slice();return l[17]=t[n],l}function $e(t){let n,l,r,s=t[17].label+"";return{c(){n=f("option"),l=m(s),n.__value=r=t[17].prop,n.value=n.__value},m(e,t){i(e,n,t),u(n,l)},p:e,d(e){e&&c(n)}}}function _e(e){let t,n,l;return{c(){t=f("input"),b(t,"type","search")},m(r,s){i(r,t,s),_(t,e[0].rule.value),n||(l=v(t,"input",e[11]),n=!0)},p(e,n){1&n&&_(t,e[0].rule.value)},d(e){e&&c(t),n=!1,l()}}}function xe(e){let t,n,l,r,s;return{c(){t=f("input"),b(t,"type","number"),b(t,"min",n=e[1].min),b(t,"max",l=e[1].max)},m(n,l){i(n,t,l),_(t,e[0].rule.value),r||(s=v(t,"input",e[10]),r=!0)},p(e,r){2&r&&n!==(n=e[1].min)&&b(t,"min",n),2&r&&l!==(l=e[1].max)&&b(t,"max",l),1&r&&y(t.value)!==e[0].rule.value&&_(t,e[0].rule.value)},d(e){e&&c(t),r=!1,s()}}}function we(e){let t,n,l,r=e[2][e[1].list],s=[];for(let t=0;t<r.length;t+=1)s[t]=je(be(e,r,t));return{c(){t=f("select");for(let e=0;e<s.length;e+=1)s[e].c();void 0===e[0].rule.value&&E((()=>e[9].call(t)))},m(r,o){i(r,t,o);for(let e=0;e<s.length;e+=1)s[e].m(t,null);x(t,e[0].rule.value),n||(l=v(t,"change",e[9]),n=!0)},p(e,n){if(6&n){let l;for(r=e[2][e[1].list],l=0;l<r.length;l+=1){const o=be(e,r,l);s[l]?s[l].p(o,n):(s[l]=je(o),s[l].c(),s[l].m(t,null))}for(;l<s.length;l+=1)s[l].d(1);s.length=r.length}1&n&&x(t,e[0].rule.value)},d(e){e&&c(t),p(s,e),n=!1,l()}}}function ke(e){let t,n,r,s,o,a,p,h,g;return{c(){t=f("label"),n=m("T\n      "),r=f("input"),s=d(),o=f("label"),a=f("input"),p=m("\n      F"),b(r,"type","radio"),r.__value="1",r.value=r.__value,e[7][0].push(r),b(a,"type","radio"),a.__value="0",a.value=a.__value,e[7][0].push(a)},m(l,c){i(l,t,c),u(t,n),u(t,r),r.checked=r.__value===e[0].rule.value,i(l,s,c),i(l,o,c),u(o,a),a.checked=a.__value===e[0].rule.value,u(o,p),h||(g=[v(r,"change",e[6]),v(a,"change",e[8])],h=!0)},p(e,t){1&t&&(r.checked=r.__value===e[0].rule.value),1&t&&(a.checked=a.__value===e[0].rule.value)},d(n){n&&c(t),e[7][0].splice(e[7][0].indexOf(r),1),n&&c(s),n&&c(o),e[7][0].splice(e[7][0].indexOf(a),1),h=!1,l(g)}}}function je(e){let t,n,l,r=e[14].label+"";return{c(){t=f("option"),n=m(r),t.__value=l=e[14].value,t.value=t.__value},m(e,l){i(e,t,l),u(t,n)},p(e,s){6&s&&r!==(r=e[14].label+"")&&$(n,r),6&s&&l!==(l=e[14].value)&&(t.__value=l,t.value=t.__value)},d(e){e&&c(t)}}}function ze(e){let t,n,l,r,s,o;return{c(){t=f("select"),n=f("option"),n.textContent="=",l=f("option"),l.textContent="+",r=f("option"),r.textContent="-",n.__value="=",n.value=n.__value,l.__value="+",l.value=l.__value,r.__value="-",r.value=r.__value,void 0===e[0].rule.comparator&&E((()=>e[12].call(t)))},m(a,c){i(a,t,c),u(t,n),u(t,l),u(t,r),x(t,e[0].rule.comparator),s||(o=v(t,"change",e[12]),s=!0)},p(e,n){1&n&&x(t,e[0].rule.comparator)},d(e){e&&c(t),s=!1,o()}}}function Se(e){let t,n,l;return{c(){t=f("a"),n=m("↗"),b(t,"href",l="./?"+e[0].rule.prop+"="+e[0].rule.value)},m(e,l){i(e,t,l),u(t,n)},p(e,n){1&n&&l!==(l="./?"+e[0].rule.prop+"="+e[0].rule.value)&&b(t,"href",l)},d(e){e&&c(t)}}}function De(t){let n,s,o,a,h,g,y,$,_,w,k=ce,j=[];for(let e=0;e<k.length;e+=1)j[e]=$e(ye(t,k,e));function z(e,t){return"checkbox"===e[1].type?ke:e[1].list?we:"number"===e[1].type?xe:"text"===e[1].type?_e:void 0}let S=z(t),D=S&&S(t),O="number"===t[1].type&&ze(t),C=t[0].rule.value&&Se(t);return{c(){n=f("div"),s=f("button"),s.textContent="x",o=d(),a=f("select");for(let e=0;e<j.length;e+=1)j[e].c();h=m("}"),g=d(),D&&D.c(),y=d(),O&&O.c(),$=d(),C&&C.c(),void 0===t[0].rule.prop&&E((()=>t[5].call(a))),b(n,"class","filters")},m(e,l){i(e,n,l),u(n,s),u(n,o),u(n,a);for(let e=0;e<j.length;e+=1)j[e].m(a,null);u(a,h),x(a,t[0].rule.prop),u(n,g),D&&D.m(n,null),u(n,y),O&&O.m(n,null),u(n,$),C&&C.m(n,null),_||(w=[v(s,"click",(function(){r(t[4](t[0].timestamp))&&t[4](t[0].timestamp).apply(this,arguments)})),v(a,"change",t[5]),v(a,"change",t[3])],_=!0)},p(e,[l]){if(t=e,0&l){let e;for(k=ce,e=0;e<k.length;e+=1){const n=ye(t,k,e);j[e]?j[e].p(n,l):(j[e]=$e(n),j[e].c(),j[e].m(a,h))}for(;e<j.length;e+=1)j[e].d(1);j.length=k.length}1&l&&x(a,t[0].rule.prop),S===(S=z(t))&&D?D.p(t,l):(D&&D.d(1),D=S&&S(t),D&&(D.c(),D.m(n,y))),"number"===t[1].type?O?O.p(t,l):(O=ze(t),O.c(),O.m(n,$)):O&&(O.d(1),O=null),t[0].rule.value?C?C.p(t,l):(C=Se(t),C.c(),C.m(n,null)):C&&(C.d(1),C=null)},i:e,o:e,d(e){e&&c(n),p(j,e),D&&D.d(),O&&O.d(),C&&C.d(),_=!1,l(w)}}}function Oe(e,t,n){let l;a(e,fe,(e=>n(2,l=e)));let{filter:r}=t,s=o(r.rule.prop);function o(e){return ce.find((t=>t.prop===e))}return e.$$set=e=>{"filter"in e&&n(0,r=e.filter)},e.$$.update=()=>{3&e.$$.dirty&&(n(1,s=o(r.rule.prop)),n(0,r.rule.type=s.type,r))},[r,s,l,function(){n(0,r.rule.value="",r)},function(e){ge.remove(e)},function(){r.rule.prop=w(this),n(0,r),n(1,s)},function(){r.rule.value=this.__value,n(0,r),n(1,s)},[[]],function(){r.rule.value=this.__value,n(0,r),n(1,s)},function(){r.rule.value=w(this),n(0,r),n(1,s)},function(){r.rule.value=y(this.value),n(0,r),n(1,s)},function(){r.rule.value=this.value,n(0,r),n(1,s)},function(){r.rule.comparator=w(this),n(0,r),n(1,s)}]}class Ce extends Y{constructor(e){super(),Q(this,e,Oe,De,s,{filter:0})}}function Le(e,t,n){const l=e.slice();return l[3]=t[n],l[4]=t,l[5]=n,l}function Pe(e,t){let n,l,r,s,o;function a(e){t[2](e,t[3],t[4],t[5])}let p={};return void 0!==t[3]&&(p.filter=t[3]),l=new Ce({props:p}),O.push((()=>function(e,t,n){const l=e.$$.props[t];void 0!==l&&(e.$$.bound[l]=n,n(e.$$.ctx[l]))}(l,"filter",a))),{key:e,first:null,c(){n=f("li"),G(l.$$.fragment),s=d(),this.first=n},m(e,t){i(e,n,t),U(l,n,null),u(n,s),o=!0},p(e,n){t=e;const s={};var o;!r&&1&n&&(r=!0,s.filter=t[3],o=()=>r=!1,L.push(o)),l.$set(s)},i(e){o||(I(l.$$.fragment,e),o=!0)},o(e){R(l.$$.fragment,e),o=!1},d(e){e&&c(n),Z(l)}}}function qe(e){let t,n,l,r,s,o,a,p=[],m=new Map,h=e[0];const g=e=>e[3].timestamp;for(let t=0;t<h.length;t+=1){let n=Le(e,h,t),l=g(n);m.set(l,p[t]=Pe(l,n))}return{c(){t=f("aside"),n=f("button"),n.textContent="+過濾條件",l=d(),r=f("ul");for(let e=0;e<p.length;e+=1)p[e].c();b(r,"class","svelte-km15j4"),b(t,"class","svelte-km15j4")},m(c,f){i(c,t,f),u(t,n),u(t,l),u(t,r);for(let e=0;e<p.length;e+=1)p[e].m(r,null);s=!0,o||(a=v(n,"click",e[1]),o=!0)},p(e,[t]){1&t&&(h=e[0],J(),p=F(p,t,g,1,e,h,m,r,V,Pe,null,Le),W())},i(e){if(!s){for(let e=0;e<h.length;e+=1)I(p[e]);s=!0}},o(e){for(let e=0;e<p.length;e+=1)R(p[e]);s=!1},d(e){e&&c(t);for(let e=0;e<p.length;e+=1)p[e].d();o=!1,a()}}}function Ee(e,t,n){let l;return a(e,ge,(e=>n(0,l=e))),[l,function(){ge.add(ue(""))},function(e,t,n,r){n[r]=e,ge.set(l)}]}class Ne extends Y{constructor(e){super(),Q(this,e,Ee,qe,s,{})}}function Ae(e,t){if(e)return t?`https://playorna.com/static/img/${e.image}`:(e.deadProxyImage,Be(e.image))}function Be(e){return`https://orna.guide/static/orna/img/${e}`}function Me(e,t,n){const l=e.slice();return l[6]=t[n],l}function Te(e){let t,n,l,r,s,o=e[0],a=[];for(let t=0;t<o.length;t+=1)a[t]=He(Me(e,o,t));return{c(){t=f("details"),n=f("summary"),l=m(e[1]),r=d(),s=f("ul");for(let e=0;e<a.length;e+=1)a[e].c();t.open=!0},m(e,o){i(e,t,o),u(t,n),u(n,l),u(t,r),u(t,s);for(let e=0;e<a.length;e+=1)a[e].m(s,null)},p(e,t){if(2&t&&$(l,e[1]),13&t){let n;for(o=e[0],n=0;n<o.length;n+=1){const l=Me(e,o,n);a[n]?a[n].p(l,t):(a[n]=He(l),a[n].c(),a[n].m(s,null))}for(;n<a.length;n+=1)a[n].d(1);a.length=o.length}},d(e){e&&c(t),p(a,e)}}}function He(e){let t,n,l,r,s,o,a,p,h,y,_,x,w=e[6].tier+"",k=(e[6].name_zh||e[6].name)+"";function j(){return e[5](e[6])}return{c(){t=f("li"),n=f("a"),l=f("small"),r=m("★"),s=m(w),o=m(" -"),a=d(),p=m(k),y=d(),b(n,"href",h="https://orna.guide/"+e[2]+"?show="+e[6].id),b(n,"target","orna.guide")},m(e,c){i(e,t,c),u(t,n),u(n,l),u(l,r),u(l,s),u(l,o),u(n,a),u(n,p),u(t,y),_||(x=v(n,"click",g(j)),_=!0)},p(t,l){e=t,1&l&&w!==(w=e[6].tier+"")&&$(s,w),1&l&&k!==(k=(e[6].name_zh||e[6].name)+"")&&$(p,k),5&l&&h!==(h="https://orna.guide/"+e[2]+"?show="+e[6].id)&&b(n,"href",h)},d(e){e&&c(t),_=!1,x()}}}function Je(t){let n,l=t[0]&&Te(t);return{c(){l&&l.c(),n=h()},m(e,t){l&&l.m(e,t),i(e,n,t)},p(e,[t]){e[0]?l?l.p(e,t):(l=Te(e),l.c(),l.m(n.parentNode,n)):l&&(l.d(1),l=null)},i:e,o:e,d(e){l&&l.d(e),e&&c(n)}}}function We(e,t,n){let{items:l=null}=t,{title:r=""}=t,{type:s="monsters"}=t,{prop:o=""}=t;function a(e){let t=oe({prop:o,value:e,type:"number"});ge.set([t])}return e.$$set=e=>{"items"in e&&n(0,l=e.items),"title"in e&&n(1,r=e.title),"type"in e&&n(2,s=e.type),"prop"in e&&n(4,o=e.prop)},[l,r,s,a,o,e=>a(e.id)]}class Ie extends Y{constructor(e){super(),Q(this,e,We,Je,s,{items:0,title:1,type:2,prop:4})}}function Re(e,t,n){const l=e.slice();return l[6]=t[n],l}function Ve(e,t,n){const l=e.slice();return l[9]=t[n],l}function Fe(e,t,n){const l=e.slice();return l[12]=t[n],l}function Ge(t){let n,l,r,s,o,a,p,h=re(t[12].prop)+"",v=t[12].value+"";return{c(){n=f("tr"),l=f("th"),r=m(h),s=d(),o=f("td"),a=m(v),p=d(),b(l,"class","svelte-ewj0vv")},m(e,t){i(e,n,t),u(n,l),u(l,r),u(n,s),u(n,o),u(o,a),u(n,p)},p:e,d(e){e&&c(n)}}}function Ue(e){let t,n,l,r,s,o,a,h,v,g=e[6][1]+"",y=e[0][e[6][0]],$=[];for(let t=0;t<y.length;t+=1)$[t]=Ze(Ve(e,y,t));return{c(){t=f("div"),n=f("span"),l=m("[ "),r=m(g),s=m(" ]"),a=d(),h=f("br"),v=m("\n            -------\n            ");for(let e=0;e<$.length;e+=1)$[e].c();b(n,"title",o=e[6][0]),b(t,"class","text-right svelte-ewj0vv")},m(e,o){i(e,t,o),u(t,n),u(n,l),u(n,r),u(n,s),u(t,a),u(t,h),u(t,v);for(let e=0;e<$.length;e+=1)$[e].m(t,null)},p(e,n){if(3&n){let l;for(y=e[0][e[6][0]],l=0;l<y.length;l+=1){const r=Ve(e,y,l);$[l]?$[l].p(r,n):($[l]=Ze(r),$[l].c(),$[l].m(t,null))}for(;l<$.length;l+=1)$[l].d(1);$.length=y.length}},d(e){e&&c(t),p($,e)}}}function Ze(e){let t,n,l=re(e[9])+"";return{c(){t=f("div"),n=m(l)},m(e,l){i(e,t,l),u(t,n)},p(e,t){1&t&&l!==(l=re(e[9])+"")&&$(n,l)},d(e){e&&c(t)}}}function Ke(e){let t,n=e[0][e[6][0]]&&Ue(e);return{c(){n&&n.c(),t=h()},m(e,l){n&&n.m(e,l),i(e,t,l)},p(e,l){e[0][e[6][0]]?n?n.p(e,l):(n=Ue(e),n.c(),n.m(t.parentNode,t)):n&&(n.d(1),n=null)},d(e){n&&n.d(e),e&&c(t)}}}function Qe(e){let t,n,l,r,s,o,a,h,y,_,x,w,k,j,z,S,D,O,C,L,P,q,E,N,A,B,M,T,H,J,W,V,F,K,Q,Y,X,ee,ne,le,re,se,oe,ae,ue,ie,ce,pe,fe,me,de,he,ve,ge=e[0].name_zh+"",be=e[0].name+"",ye=e[0].tier+"",$e=te[e[0].element]?`[${te[e[0].element]}]`:"",_e=e[0].boss?"👿":"",xe=e[0].arena?"🏟️":"",we=e[0].view_distance?"👁️":"",ke=JSON.stringify({...e[0],context:null},null," ")+"",je=e[2].length&&function(e){let t,n,l,r,s,o,a,d=e[2],h=[];for(let t=0;t<d.length;t+=1)h[t]=Ge(Fe(e,d,t));return{c(){t=f("div"),n=m("[ Stats ]\n          "),l=f("br"),r=m("\n          ---------\n          "),s=f("table");for(let e=0;e<h.length;e+=1)h[e].c();var e,o,a;e="cursor",o="pointer",s.style.setProperty(e,o,a?"important":""),b(s,"class","svelte-ewj0vv"),b(t,"class","svelte-ewj0vv")},m(c,p){i(c,t,p),u(t,n),u(t,l),u(t,r),u(t,s);for(let e=0;e<h.length;e+=1)h[e].m(s,null);o||(a=v(s,"click",e[3]),o=!0)},p(e,t){if(4&t){let n;for(d=e[2],n=0;n<d.length;n+=1){const l=Fe(e,d,n);h[n]?h[n].p(l,t):(h[n]=Ge(l),h[n].c(),h[n].m(s,null))}for(;n<h.length;n+=1)h[n].d(1);h.length=d.length}},d(e){e&&c(t),p(h,e),o=!1,a()}}}(e),ze=e[1],Se=[];for(let t=0;t<ze.length;t+=1)Se[t]=Ke(Re(e,ze,t));return re=new Ie({props:{items:e[0].dropped_by,title:"掉落方",type:"monsters",prop:"dropped_by"}}),ae=new Ie({props:{items:e[0].materials,title:"材料",type:"items",prop:"id"}}),{c(){t=f("details"),n=f("summary"),l=f("ruby"),r=f("rb"),s=m(ge),o=d(),a=f("rt"),h=m(be),y=d(),_=f("a"),x=f("sup"),w=m("★"),k=m(ye),z=d(),S=f("div"),D=f("div"),C=d(),je&&je.c(),L=d();for(let e=0;e<Se.length;e+=1)Se[e].c();P=d(),q=f("div"),E=f("div"),A=d(),B=f("div"),M=m($e),T=d(),H=f("div"),J=m(_e),W=d(),V=f("div"),F=m(xe),K=d(),Q=f("div"),Y=m(we),X=d(),ee=f("div"),ne=f("div"),le=f("div"),G(re.$$.fragment),se=d(),oe=f("div"),G(ae.$$.fragment),ue=d(),ie=f("details"),ce=f("summary"),pe=d(),fe=f("pre"),me=m(ke),b(a,"class","svelte-ewj0vv"),b(l,"class","svelte-ewj0vv"),b(x,"class","svelte-ewj0vv"),b(_,"href",j="https://orna.guide/items?show="+e[0].id),b(_,"target","orna.guide"),b(D,"class","item-img-box svelte-ewj0vv"),b(D,"style",O=`--bg: url(${Ae(e[0])}); --bg-fallback: url(${Ae(e[0],"small")})`),b(E,"class","item-equipped svelte-ewj0vv"),b(E,"title",N=e[0].equipped_by),b(B,"class","item-char svelte-ewj0vv"),b(H,"class","item-char svelte-ewj0vv"),b(V,"class","item-char svelte-ewj0vv"),b(Q,"class","item-char svelte-ewj0vv"),b(q,"class","rt-box svelte-ewj0vv"),b(S,"class","item-info svelte-ewj0vv"),b(n,"class","summary svelte-ewj0vv"),b(le,"class","dropped_by"),b(oe,"class","materials"),b(ce,"class","text-right"),b(fe,"class","item-pre svelte-ewj0vv"),b(ne,"class","item-more svelte-ewj0vv"),b(t,"class","item-details svelte-ewj0vv")},m(c,p){i(c,t,p),u(t,n),u(n,l),u(l,r),u(r,s),u(l,o),u(l,a),u(a,h),u(n,y),u(n,_),u(_,x),u(x,w),u(x,k),u(n,z),u(n,S),u(S,D),u(S,C),je&&je.m(S,null),u(S,L);for(let e=0;e<Se.length;e+=1)Se[e].m(S,null);u(S,P),u(S,q),u(q,E),u(q,A),u(q,B),u(B,M),u(q,T),u(q,H),u(H,J),u(q,W),u(q,V),u(V,F),u(q,K),u(q,Q),u(Q,Y),u(t,X),u(t,ee),u(ee,ne),u(ne,le),U(re,le,null),u(ne,se),u(ne,oe),U(ae,oe,null),u(ne,ue),u(ne,ie),u(ie,ce),u(ie,pe),u(ie,fe),u(fe,me),de=!0,he||(ve=v(S,"click",g(e[4])),he=!0)},p(e,[t]){if((!de||1&t)&&ge!==(ge=e[0].name_zh+"")&&$(s,ge),(!de||1&t)&&be!==(be=e[0].name+"")&&$(h,be),(!de||1&t)&&ye!==(ye=e[0].tier+"")&&$(k,ye),(!de||1&t&&j!==(j="https://orna.guide/items?show="+e[0].id))&&b(_,"href",j),(!de||1&t&&O!==(O=`--bg: url(${Ae(e[0])}); --bg-fallback: url(${Ae(e[0],"small")})`))&&b(D,"style",O),e[2].length&&je.p(e,t),3&t){let n;for(ze=e[1],n=0;n<ze.length;n+=1){const l=Re(e,ze,n);Se[n]?Se[n].p(l,t):(Se[n]=Ke(l),Se[n].c(),Se[n].m(S,P))}for(;n<Se.length;n+=1)Se[n].d(1);Se.length=ze.length}(!de||1&t&&N!==(N=e[0].equipped_by))&&b(E,"title",N),(!de||1&t)&&$e!==($e=te[e[0].element]?`[${te[e[0].element]}]`:"")&&$(M,$e),(!de||1&t)&&_e!==(_e=e[0].boss?"👿":"")&&$(J,_e),(!de||1&t)&&xe!==(xe=e[0].arena?"🏟️":"")&&$(F,xe),(!de||1&t)&&we!==(we=e[0].view_distance?"👁️":"")&&$(Y,we);const n={};1&t&&(n.items=e[0].dropped_by),re.$set(n);const l={};1&t&&(l.items=e[0].materials),ae.$set(l),(!de||1&t)&&ke!==(ke=JSON.stringify({...e[0],context:null},null," ")+"")&&$(me,ke)},i(e){de||(I(re.$$.fragment,e),I(ae.$$.fragment,e),de=!0)},o(e){R(re.$$.fragment,e),R(ae.$$.fragment,e),de=!1},d(e){e&&c(t),je&&je.d(),p(Se,e),Z(re),Z(ae),he=!1,ve()}}}function Ye(e,t,n){let{item:l}=t;let r=["stats.attack","stats.magic","stats.defense","stats.ward","stats.dexterity","stats.mana","stats.crit","stats.resistance","stats.hp"].map((e=>({prop:e,value:l[e]}))).filter((e=>e.value));return e.$$set=e=>{"item"in e&&n(0,l=e.item)},[l,[["causes","🔪"],["prevents","🛡️"],["gives","🎁"],["cures","❤️‍🩹"]],r,function(){me.set({open:!0,item:l,stats:r})},function(t){S.call(this,e,t)}]}class Xe extends Y{constructor(e){super(),Q(this,e,Ye,Qe,s,{item:0})}}function et(e,t,n){const l=e.slice();return l[17]=t[n],l}function tt(e,t,n){const l=e.slice();return l[20]=t[n],l}function nt(t){let n,l,r,s=t[20].label+"";return{c(){n=f("option"),l=m(s),n.__value=r=t[20].prop,n.value=n.__value},m(e,t){i(e,n,t),u(n,l)},p:e,d(e){e&&c(n)}}}function lt(e,t){let n,l,r,s;return l=new Xe({props:{item:t[17]}}),{key:e,first:null,c(){n=f("li"),G(l.$$.fragment),r=d(),b(n,"class","svelte-1627awp"),this.first=n},m(e,t){i(e,n,t),U(l,n,null),u(n,r),s=!0},p(e,n){t=e;const r={};17&n&&(r.item=t[17]),l.$set(r)},i(e){s||(I(l.$$.fragment,e),s=!0)},o(e){R(l.$$.fragment,e),s=!1},d(e){e&&c(n),Z(l)}}}function rt(e){let t,n,r,s,o,a,h,g,w,j,z,S,D,O,C,L,P,q,N,A,B,M,T,H,G,U=e[0].length+"",Z=[],K=new Map,Q=e[6],Y=[];for(let t=0;t<Q.length;t+=1)Y[t]=nt(tt(e,Q,t));let X=e[0].slice(0,e[4]);const ee=e=>e[17].id;for(let t=0;t<X.length;t+=1){let n=et(e,X,t),l=ee(n);K.set(l,Z[t]=lt(l,n))}return{c(){t=f("div"),n=f("div"),r=m("排序:\n    "),s=f("select");for(let e=0;e<Y.length;e+=1)Y[e].c();o=d(),a=f("input"),h=d(),g=f("details"),w=f("summary"),j=m("顯示數量\n      "),z=f("input"),S=m("\n      / "),D=m(U),O=d(),C=f("div"),L=m("總數\n      "),P=f("input"),q=m("\n      以下秀圖"),N=d(),A=f("hr"),B=d(),M=f("ul");for(let e=0;e<Z.length;e+=1)Z[e].c();void 0===e[1]&&E((()=>e[9].call(s))),b(a,"id","sortDir"),b(a,"type","checkbox"),b(a,"class","svelte-1627awp"),b(z,"class","text-center"),b(z,"type","number"),b(z,"min","5"),b(z,"max","2000"),b(z,"step","5"),b(P,"class","text-center"),b(P,"type","number"),b(P,"min","1"),b(P,"max","50"),b(t,"class","nav svelte-1627awp"),b(M,"class","items svelte-1627awp"),k(M,"showDetails",e[5])},m(l,c){i(l,t,c),u(t,n),u(n,r),u(n,s);for(let e=0;e<Y.length;e+=1)Y[e].m(s,null);x(s,e[1]),u(n,o),u(n,a),a.checked=e[2],u(t,h),u(t,g),u(g,w),u(w,j),u(w,z),_(z,e[4]),u(w,S),u(w,D),u(g,O),u(g,C),u(C,L),u(C,P),_(P,e[3]),u(C,q),i(l,N,c),i(l,A,c),i(l,B,c),i(l,M,c);for(let e=0;e<Z.length;e+=1)Z[e].m(M,null);T=!0,H||(G=[v(s,"change",e[9]),v(a,"change",e[10]),v(z,"input",e[11]),v(P,"input",e[12])],H=!0)},p(e,[t]){if(64&t){let n;for(Q=e[6],n=0;n<Q.length;n+=1){const l=tt(e,Q,n);Y[n]?Y[n].p(l,t):(Y[n]=nt(l),Y[n].c(),Y[n].m(s,null))}for(;n<Y.length;n+=1)Y[n].d(1);Y.length=Q.length}66&t&&x(s,e[1]),4&t&&(a.checked=e[2]),16&t&&y(z.value)!==e[4]&&_(z,e[4]),(!T||1&t)&&U!==(U=e[0].length+"")&&$(D,U),8&t&&y(P.value)!==e[3]&&_(P,e[3]),17&t&&(X=e[0].slice(0,e[4]),J(),Z=F(Z,t,ee,1,e,X,K,M,V,lt,null,et),W()),32&t&&k(M,"showDetails",e[5])},i(e){if(!T){for(let e=0;e<X.length;e+=1)I(Z[e]);T=!0}},o(e){for(let e=0;e<Z.length;e+=1)R(Z[e]);T=!1},d(e){e&&c(t),p(Y,e),e&&c(N),e&&c(A),e&&c(B),e&&c(M);for(let e=0;e<Z.length;e+=1)Z[e].d();H=!1,l(G)}}}function st(e,t,n){let l,r,s,o,u,i;a(e,ge,(e=>n(8,i=e)));let{items:c=[]}=t,p=ce.filter((e=>e.sort)),f=[];function m(e){let t=c;return!e||!e.length||1===e.length&&null==e[0].rule?.value?t:(e.map((e=>e.rule)).forEach((e=>{e&&(t=function(e,t){let{prop:n,type:l,value:r,comparator:s}=t;if(!r||!e.length)return e;let o=ce.find((e=>e.prop===n));if(o.checkId)return e.filter((e=>e[n]?.some((e=>e.id===r))));switch(l){case"checkbox":return Boolean(+r)?e.filter((e=>e[n])):e.filter((e=>!e[n]));case"number":return e.filter((e=>{let t=e[n];switch(s){case"+":return t>=r;case"-":return t<=r;default:return t===r}}));case"text":return e.filter((e=>{if(o.list)return e[n]?.includes(r);return new RegExp(r.replace(/[.*+?^${}()|[\]\\]/g,"\\$&"),"i").test(e[n])}));default:return e}}(t,e))})),function(e=c){return e.sort(((e,t)=>{let n=r?1:-1,s=e[l]||-9999,o=t[l]||-9999;switch("object"==typeof o&&(o=-9999),"object"==typeof s&&(s=-9999),typeof s){case"string":return s.localeCompare(o)*n;case"number":return(s-o)*n;default:return 0}}))}(t))}return e.$$set=e=>{"items"in e&&n(7,c=e.items)},e.$$.update=()=>{262&e.$$.dirty&&n(0,f=m(i)),25&e.$$.dirty&&n(5,u=f.length<=o||s<=o)},n(1,l="tier"),n(2,r=!0),n(4,s=50),n(3,o=20),[f,l,r,o,s,u,p,c,i,function(){l=w(this),n(1,l),n(6,p)},function(){r=this.checked,n(2,r)},function(){s=y(this.value),n(4,s)},function(){o=y(this.value),n(3,o)}]}class ot extends Y{constructor(e){super(),Q(this,e,st,rt,s,{items:7})}}function at(e,t,n){const l=e.slice();return l[7]=t[n],l[9]=n,l}function ut(e,t,n){const l=e.slice();return l[10]=t[n],l}function it(e,t,n){const l=e.slice();return l[13]=t[n],l}function ct(e){let t;return{c(){t=m("Loading...")},m(e,n){i(e,t,n)},d(e){e&&c(t)}}}function pt(t){let n;return{c(){n=f("blockquote"),n.textContent="GG",b(n,"class","svelte-1tc8awj")},m(e,t){i(e,n,t)},p:e,d(e){e&&c(n)}}}function ft(e){let t,n,l,r,s,o,a=100*e[3].quality+"";function p(e,t){return"0"!==e[3].quality?dt:mt}let h=p(e),v=h(e);return{c(){t=f("table"),n=f("caption"),l=m("品質: "),r=m(a),s=m("%"),o=d(),v.c(),b(n,"class","svelte-1tc8awj"),b(t,"class","text-right svelte-1tc8awj")},m(e,a){i(e,t,a),u(t,n),u(n,l),u(n,r),u(n,s),u(t,o),v.m(t,null)},p(e,n){8&n&&a!==(a=100*e[3].quality+"")&&$(r,a),h===(h=p(e))&&v?v.p(e,n):(v.d(1),v=h(e),v&&(v.c(),v.m(t,null)))},d(e){e&&c(t),v.d()}}}function mt(t){let n;return{c(){n=f("caption"),n.textContent="Wrong values.",b(n,"class","svelte-1tc8awj")},m(e,t){i(e,n,t)},p:e,d(e){e&&c(n)}}}function dt(e){let t,n,l,r,s,o,a=Object.keys(e[3].stats),m=[];for(let t=0;t<a.length;t+=1)m[t]=ht(it(e,a,t));let h=Object.values(e[3].stats)[0].values,v=[];for(let t=0;t<h.length;t+=1)v[t]=gt(at(e,h,t));return{c(){t=f("thead"),n=f("tr"),l=f("th"),l.textContent="Lv.",r=d();for(let e=0;e<m.length;e+=1)m[e].c();s=d(),o=f("tbody");for(let e=0;e<v.length;e+=1)v[e].c();b(l,"class","svelte-1tc8awj"),b(o,"class","svelte-1tc8awj")},m(e,a){i(e,t,a),u(t,n),u(n,l),u(n,r);for(let e=0;e<m.length;e+=1)m[e].m(n,null);i(e,s,a),i(e,o,a);for(let e=0;e<v.length;e+=1)v[e].m(o,null)},p(e,t){if(8&t){let l;for(a=Object.keys(e[3].stats),l=0;l<a.length;l+=1){const r=it(e,a,l);m[l]?m[l].p(r,t):(m[l]=ht(r),m[l].c(),m[l].m(n,null))}for(;l<m.length;l+=1)m[l].d(1);m.length=a.length}if(8&t){let n;for(h=Object.values(e[3].stats)[0].values,n=0;n<h.length;n+=1){const l=at(e,h,n);v[n]?v[n].p(l,t):(v[n]=gt(l),v[n].c(),v[n].m(o,null))}for(;n<v.length;n+=1)v[n].d(1);v.length=h.length}},d(e){e&&c(t),p(m,e),e&&c(s),e&&c(o),p(v,e)}}}function ht(e){let t,n,l=re(e[13])+"";return{c(){t=f("th"),n=m(l),b(t,"class","svelte-1tc8awj")},m(e,l){i(e,t,l),u(t,n)},p(e,t){8&t&&l!==(l=re(e[13])+"")&&$(n,l)},d(e){e&&c(t)}}}function vt(e){let t,n,l=e[10].values[e[9]]+"";return{c(){t=f("td"),n=m(l),b(t,"class","svelte-1tc8awj")},m(e,l){i(e,t,l),u(t,n)},p(e,t){8&t&&l!==(l=e[10].values[e[9]]+"")&&$(n,l)},d(e){e&&c(t)}}}function gt(e){let t,n,l,r,s,o=e[9]+1+"",a=Object.values(e[3].stats),h=[];for(let t=0;t<a.length;t+=1)h[t]=vt(ut(e,a,t));return{c(){t=f("tr"),n=f("th"),l=m(o),r=d();for(let e=0;e<h.length;e+=1)h[e].c();s=d(),b(n,"class","svelte-1tc8awj"),b(t,"class","svelte-1tc8awj")},m(e,o){i(e,t,o),u(t,n),u(n,l),u(t,r);for(let e=0;e<h.length;e+=1)h[e].m(t,null);u(t,s)},p(e,n){if(8&n){let l;for(a=Object.values(e[3].stats),l=0;l<a.length;l+=1){const r=ut(e,a,l);h[l]?h[l].p(r,n):(h[l]=vt(r),h[l].c(),h[l].m(t,s))}for(;l<h.length;l+=1)h[l].d(1);h.length=a.length}},d(e){e&&c(t),p(h,e)}}}function bt(t){let n,l,r=t[2]&&ct();function s(e,t){return e[3]?ft:e[2]?void 0:pt}let o=s(t),a=o&&o(t);return{c(){r&&r.c(),n=d(),a&&a.c(),l=h()},m(e,t){r&&r.m(e,t),i(e,n,t),a&&a.m(e,t),i(e,l,t)},p(e,[t]){e[2]?r||(r=ct(),r.c(),r.m(n.parentNode,n)):r&&(r.d(1),r=null),o===(o=s(e))&&a?a.p(e,t):(a&&a.d(1),a=o&&o(e),a&&(a.c(),a.m(l.parentNode,l)))},i:e,o:e,d(e){r&&r.d(e),e&&c(n),a&&a.d(e),e&&c(l)}}}function yt(t,n,l){let r,s,a,u,i,c,p=e,f=e;t.$$.on_destroy.push((()=>p())),t.$$.on_destroy.push((()=>f()));let{assessData:m={}}=n;return t.$$set=e=>{"assessData"in e&&l(4,m=e.assessData)},t.$$.update=()=>{16&t.$$.dirty&&(l(1,[r,s,a,u]=function(e){const t=ee(!1),n=ee(!1),l=ee(null);async function r(){t.set(!0),n.set(!1);try{const t=await fetch("https://orna.guide/api/v1/assess",{headers:{accept:"*/*","content-type":"application/x-www-form-urlencoded"},referrerPolicy:"strict-origin-when-cross-origin",body:JSON.stringify(e),method:"POST",mode:"cors"}).then((e=>e.json()));l.set(t)}catch(e){n.set(e)}t.set(!1)}return r(),[l,t,n,r]}(m),r,(l(0,s),p(),p=o(s,(e=>l(2,i=e))),s)),f(),f=o(r,(e=>l(3,c=e))))},[s,r,i,c,m]}class $t extends Y{constructor(e){super(),Q(this,e,yt,bt,s,{assessData:4})}}function _t(e,t,n){const l=e.slice();return l[15]=t[n],l[16]=t,l[17]=n,l}function xt(e,t,n){const l=e.slice();return l[18]=t[n],l}function wt(e){let t,n,r,s,o,a,y,_,w,k,j,z,S,D,O,C,L,P,q,N,A=e[2].item.name_zh+"",B=e[5],M=[];for(let t=0;t<B.length;t+=1)M[t]=kt(xt(e,B,t));let T=e[4],H=[];for(let t=0;t<T.length;t+=1)H[t]=jt(_t(e,T,t));let V=e[3]&&zt(e);return{c(){t=f("form"),n=f("table"),r=f("caption"),s=m("品質試算\n            "),o=f("br"),a=m("\n            [ "),y=m(A),_=m(" ] Lv.\n            "),w=f("select");for(let e=0;e<M.length;e+=1)M[e].c();k=d();for(let e=0;e<H.length;e+=1)H[e].c();j=d(),z=f("div"),S=f("button"),S.textContent="Reset",D=d(),O=f("button"),O.textContent="Assess",C=d(),V&&V.c(),L=h(),void 0===e[1]&&E((()=>e[10].call(w))),b(r,"class","svelte-1vlz5gb"),b(n,"class","assess-table svelte-1vlz5gb"),b(S,"type","reset"),b(O,"type","submit"),b(z,"class","form-ctrl svelte-1vlz5gb")},m(l,c){i(l,t,c),u(t,n),u(n,r),u(r,s),u(r,o),u(r,a),u(r,y),u(r,_),u(r,w);for(let e=0;e<M.length;e+=1)M[e].m(w,null);x(w,e[1]),u(n,k);for(let e=0;e<H.length;e+=1)H[e].m(n,null);u(t,j),u(t,z),u(z,S),u(z,D),u(z,O),i(l,C,c),V&&V.m(l,c),i(l,L,c),P=!0,q||(N=[v(w,"change",e[10]),v(S,"click",g(e[7])),v(O,"click",g(e[8]))],q=!0)},p(e,t){if((!P||4&t)&&A!==(A=e[2].item.name_zh+"")&&$(y,A),32&t){let n;for(B=e[5],n=0;n<B.length;n+=1){const l=xt(e,B,n);M[n]?M[n].p(l,t):(M[n]=kt(l),M[n].c(),M[n].m(w,null))}for(;n<M.length;n+=1)M[n].d(1);M.length=B.length}if(34&t&&x(w,e[1]),16&t){let l;for(T=e[4],l=0;l<T.length;l+=1){const r=_t(e,T,l);H[l]?H[l].p(r,t):(H[l]=jt(r),H[l].c(),H[l].m(n,null))}for(;l<H.length;l+=1)H[l].d(1);H.length=T.length}e[3]?V?(V.p(e,t),8&t&&I(V,1)):(V=zt(e),V.c(),I(V,1),V.m(L.parentNode,L)):V&&(J(),R(V,1,1,(()=>{V=null})),W())},i(e){P||(I(V),P=!0)},o(e){R(V),P=!1},d(e){e&&c(t),p(M,e),p(H,e),e&&c(C),V&&V.d(e),e&&c(L),q=!1,l(N)}}}function kt(t){let n,l,r,s=t[18]+"";return{c(){n=f("option"),l=m(s),n.__value=r=t[18],n.value=n.__value},m(e,t){i(e,n,t),u(n,l)},p:e,d(e){e&&c(n)}}}function jt(e){let t,n,r,s,o,a,p,h,g,x,w,k,j,z,S,D,O,C,L,P,q=e[15].prop+"",E=Dt(e[15])+"";function N(){e[11].call(a,e[16],e[17])}function A(){e[12].call(k,e[16],e[17])}return{c(){t=f("tr"),n=f("th"),r=m(q),s=d(),o=f("td"),a=f("input"),g=d(),x=f("br"),w=d(),k=f("input"),S=d(),D=f("td"),O=m(E),C=d(),b(n,"class","svelte-1vlz5gb"),b(a,"type","number"),b(a,"max",p=e[15].max),b(a,"min",h=e[15].min),b(a,"step","1"),b(a,"class","svelte-1vlz5gb"),b(k,"type","range"),b(k,"max",j=e[15].max),b(k,"min",z=e[15].min),b(k,"step","1"),b(k,"class","svelte-1vlz5gb"),b(o,"class","text-center svelte-1vlz5gb"),b(D,"class","svelte-1vlz5gb")},m(l,c){i(l,t,c),u(t,n),u(n,r),u(t,s),u(t,o),u(o,a),_(a,e[15].value),u(o,g),u(o,x),u(o,w),u(o,k),_(k,e[15].value),u(t,S),u(t,D),u(D,O),u(t,C),L||(P=[v(a,"input",N),v(k,"change",A),v(k,"input",A)],L=!0)},p(t,n){e=t,16&n&&q!==(q=e[15].prop+"")&&$(r,q),16&n&&p!==(p=e[15].max)&&b(a,"max",p),16&n&&h!==(h=e[15].min)&&b(a,"min",h),16&n&&y(a.value)!==e[15].value&&_(a,e[15].value),16&n&&j!==(j=e[15].max)&&b(k,"max",j),16&n&&z!==(z=e[15].min)&&b(k,"min",z),16&n&&_(k,e[15].value),16&n&&E!==(E=Dt(e[15])+"")&&$(O,E)},d(e){e&&c(t),L=!1,l(P)}}}function zt(e){let t,n;return t=new $t({props:{assessData:e[3]}}),{c(){G(t.$$.fragment)},m(e,l){U(t,e,l),n=!0},p(e,n){const l={};8&n&&(l.assessData=e[3]),t.$set(l)},i(e){n||(I(t.$$.fragment,e),n=!0)},o(e){R(t.$$.fragment,e),n=!1},d(e){Z(t,e)}}}function St(e){let t,n,r,s,o,a,p,m,h=e[2].item&&wt(e);return{c(){t=f("div"),n=f("div"),r=d(),s=f("main"),h&&h.c(),b(n,"class","overlay svelte-1vlz5gb"),b(s,"class","content svelte-1vlz5gb"),b(t,"class","dialog svelte-1vlz5gb"),t.hidden=o=!e[2].open,b(t,"tabindex","-1")},m(l,o){i(l,t,o),u(t,n),u(t,r),u(t,s),h&&h.m(s,null),e[13](t),a=!0,p||(m=[v(n,"click",e[6]),v(t,"keydown",e[9])],p=!0)},p(e,[n]){e[2].item?h?(h.p(e,n),4&n&&I(h,1)):(h=wt(e),h.c(),I(h,1),h.m(s,null)):h&&(J(),R(h,1,1,(()=>{h=null})),W()),(!a||4&n&&o!==(o=!e[2].open))&&(t.hidden=o)},i(e){a||(I(h),a=!0)},o(e){R(h),a=!1},d(n){n&&c(t),h&&h.d(),e[13](null),p=!1,l(m)}}}function Dt(e){return`${(100*e.value/e.oValue).toFixed(1)}%`}function Ot(e,t,n){let l,r,s,o;a(e,me,(e=>n(2,s=e)));const u=new Array(13).fill(1).map(((e,t)=>t+1));let i=1;function c(){n(3,r=null),function(e,t,n=t){e.set(n)}(me,s={open:!1},s)}return e.$$.update=()=>{var t;7&e.$$.dirty&&s&&s.stats&&(t=s.stats,n(4,l=t.map((e=>{let[t,n]=[2*e.value,~~(.7*e.value)].sort(se);return{oProp:e.prop.split(".")[1],prop:te[e.prop]||e.prop,value:e.value,oValue:e.value,max:1===i?n:3*n,min:t}}))),setTimeout((()=>{o.querySelector("input")?.select()})))},n(4,l=[]),n(3,r=null),[o,i,s,r,l,u,c,function(){n(3,r=null),n(4,l=l.map((e=>({...e,value:e.oValue})))),n(1,i=1)},function(){if(n(3,r=null),!l.length)return;let e={id:s.item.id},t=l.reduce(((e,t)=>(t.value!==t.oValue&&(e[t.oProp]=t.value),e)),e);if(1===Object.keys(t).length){let e=l[0];t[e.oProp]=e.oValue}i>1&&(t.level=i),n(3,r=t)},function(e){"Escape"===e.code&&c()},function(){i=w(this),n(1,i),n(5,u)},function(e,t){e[t].value=y(this.value),n(4,l)},function(e,t){e[t].value=y(this.value),n(4,l)},function(e){O[e?"unshift":"push"]((()=>{o=e,n(0,o)}))}]}class Ct extends Y{constructor(e){super(),Q(this,e,Ot,St,s,{})}}function Lt(t){let n,l,r,s,o,a,u;return{c(){n=f("hr"),l=d(),r=f("hr"),s=d(),o=f("div"),o.textContent="Loading...",a=d(),u=f("hr"),b(o,"class","text-center")},m(e,t){i(e,n,t),i(e,l,t),i(e,r,t),i(e,s,t),i(e,o,t),i(e,a,t),i(e,u,t)},p:e,i:e,o:e,d(e){e&&c(n),e&&c(l),e&&c(r),e&&c(s),e&&c(o),e&&c(a),e&&c(u)}}}function Pt(e){let t,n,l,r,s,o,a,u;return t=new Ne({}),s=new ot({props:{items:e[1]}}),a=new Ct({}),{c(){G(t.$$.fragment),n=d(),l=f("hr"),r=d(),G(s.$$.fragment),o=d(),G(a.$$.fragment)},m(e,c){U(t,e,c),i(e,n,c),i(e,l,c),i(e,r,c),U(s,e,c),i(e,o,c),U(a,e,c),u=!0},p(e,t){const n={};2&t&&(n.items=e[1]),s.$set(n)},i(e){u||(I(t.$$.fragment,e),I(s.$$.fragment,e),I(a.$$.fragment,e),u=!0)},o(e){R(t.$$.fragment,e),R(s.$$.fragment,e),R(a.$$.fragment,e),u=!1},d(e){Z(t,e),e&&c(n),e&&c(l),e&&c(r),Z(s,e),e&&c(o),Z(a,e)}}}function qt(e){let t,n,l,r,s,o,a,p,m,h;const v=[Pt,Lt],g=[];function y(e,t){return e[0]?0:1}return r=y(e),s=g[r]=v[r](e),{c(){t=f("div"),n=f("h1"),n.innerHTML='<a href="https://playorna.com/" target="_blank">Orna RPG</a> items lookup tool',l=d(),s.c(),o=d(),a=f("hr"),p=d(),m=f("footer"),m.innerHTML='* comment on <a href="https://docs.google.com/spreadsheets/d/1JZM_9U7hYtq39T0BeZHaUrJVKSWWNfxLxcZnrJPiHBQ/edit#gid=2050818910">sheet</a> to update data <br/>\n  * repo: <a href="https://github.com/rplus/orna-lookup" target="_blank">Rplus/orna-lookup</a>  <br/>\n  * origin data &amp; image source: <a href="https://orna.guide/" target="_blank">https://orna.guide/</a>  <br/>',b(n,"class","text-center"),b(t,"class","workspace svelte-h6ecfv"),b(m,"class","svelte-h6ecfv")},m(e,s){i(e,t,s),u(t,n),u(t,l),g[r].m(t,null),i(e,o,s),i(e,a,s),i(e,p,s),i(e,m,s),h=!0},p(e,[n]){let l=r;r=y(e),r===l?g[r].p(e,n):(J(),R(g[l],1,1,(()=>{g[l]=null})),W(),s=g[r],s?s.p(e,n):(s=g[r]=v[r](e),s.c()),I(s,1),s.m(t,null))},i(e){h||(I(s),h=!0)},o(e){R(s),h=!1},d(e){e&&c(t),g[r].d(),e&&c(o),e&&c(a),e&&c(p),e&&c(m)}}}function Et(e,t,n){let l;a(e,pe,(e=>n(2,l=e)));let r=!1,s=[];return e.$$.update=()=>{5&e.$$.dirty&&(l.waiting||r||(n(0,r=!0),n(1,s=l.items)))},[r,s,l]}return new class extends Y{constructor(e){super(),Q(this,e,Et,qt,s,{})}}({target:document.body})}();
//# sourceMappingURL=bundle.js.map
