<<<<<<< HEAD:client/build/341.93b0133ac324d0222d81.chunk.js
(window.webpackJsonp=window.webpackJsonp||[]).push([[341],{ca3b81a6a800708f8cd0:function(t,e,a){"use strict";a.r(e);var o,i=a("8af190b70a6bc55c6f1b"),n=a.n(i),r=a("0d7f0986bcd2f33d8a2a"),c=(a("2fab4c3552d6567474b0"),function(t){var e,a,o,i,n;return a=0,o=0,i=0,n=0,(e=t/21.39)<4?n=e:(n=e%4,(i=e/4)>=4&&(o=i/4,i%=4,o>=16&&(a=o/16,o%=16))),[a,o,i,n]}),l=function(t){var e,a,o,i;return a=0,o=0,i=0,(e=t/182.25)<20?i=e:(i=e%20,(o=e/20)>=20&&(a=o/20,o%=20)),[a,o,i]};function s(t,e,a,i){o||(o="function"===typeof Symbol&&Symbol.for&&Symbol.for("react.element")||60103);var n=t&&t.defaultProps,r=arguments.length-3;if(e||0===r||(e={children:void 0}),1===r)e.children=i;else if(r>1){for(var c=new Array(r),l=0;l<r;l++)c[l]=arguments[l+3];e.children=c}if(e&&n)for(var s in n)void 0===e[s]&&(e[s]=n[s]);else e||(e=n||{});return{$$typeof:o,type:t,key:void 0===a?null:""+a,ref:null,props:e,_owner:null}}function u(t,e){return function(t){if(Array.isArray(t))return t}(t)||function(t,e){var a=null==t?null:"undefined"!==typeof Symbol&&t[Symbol.iterator]||t["@@iterator"];if(null==a)return;var o,i,n=[],r=!0,c=!1;try{for(a=a.call(t);!(r=(o=a.next()).done)&&(n.push(o.value),!e||n.length!==e);r=!0);}catch(t){c=!0,i=t}finally{try{r||null==a.return||a.return()}finally{if(c)throw i}}return n}(t,e)||function(t,e){if(!t)return;if("string"===typeof t)return d(t,e);var a=Object.prototype.toString.call(t).slice(8,-1);"Object"===a&&t.constructor&&(a=t.constructor.name);if("Map"===a||"Set"===a)return Array.from(t);if("Arguments"===a||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(a))return d(t,e)}(t,e)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function d(t,e){(null==e||e>t.length)&&(e=t.length);for(var a=0,o=new Array(e);a<e;a++)o[a]=t[a];return o}var v=s(r.Helmet,{},void 0,s("title",{},void 0,"Unit Converter")),f=s("h1",{className:"text-3xl text-center pt-5"},void 0,"Unit Converter"),b=s("p",{className:"text-sm text-center"},void 0,"Just at one shot you can convert areas across ropani, bigha, square feet, square meter."),m=s("td",{className:"whitespace-no-wrap text-xl"},void 0,"Ropani System"),p=s("span",{className:"italic pl-1 text-red-200"},void 0,"field not valid"),h=s("span",{className:"italic pl-1 text-red-200"},void 0,"field not valid"),N=s("span",{className:"italic pl-1 text-red-200"},void 0,"field not valid"),x=s("span",{className:"italic pl-1 text-red-200"},void 0,"field not valid"),g=s("td",{className:"whitespace-no-wrap text-xl"},void 0,"Bigha System"),y=s("span",{className:"italic pl-1 text-red-200"},void 0,"field not valid"),F=s("span",{className:"italic pl-1 text-red-200"},void 0,"field not valid"),w=s("span",{className:"italic pl-1 text-red-200"},void 0,"field not valid"),M=s("td",{}),S=s("td",{className:"whitespace-no-wrap text-xl"},void 0,"Square Feet"),k=s("span",{className:"italic pl-1 text-red-200"},void 0,"field not valid"),j=s("span",{className:"italic pl-1 text-red-200"},void 0,"field not valid");e.default=function(t){var e=t.isModal,a=u(Object(i.useState)(""),2),o=a[0],r=a[1],d=u(Object(i.useState)(""),2),O=d[0],q=d[1],C=u(Object(i.useState)(""),2),A=C[0],B=C[1],E=u(Object(i.useState)(""),2),I=E[0],J=E[1],U=u(Object(i.useState)(""),2),$=U[0],D=U[1],P=u(Object(i.useState)(""),2),R=P[0],T=P[1],H=u(Object(i.useState)(""),2),K=H[0],_=H[1],z=u(Object(i.useState)(""),2),G=z[0],L=z[1],Q=u(Object(i.useState)(""),2),V=Q[0],W=Q[1],X=u(Object(i.useState)(""),2),Y=X[0],Z=X[1];Object(i.useEffect)(function(){window.scrollTo(0,0)},[]);return n.a.createElement(n.a.Fragment,null,void 0===e&&v,s("div",{className:"text-sm"},void 0,s("div",{className:""},void 0,s("div",{className:"max-w-3xl mx-auto p-10"},void 0,f,b,s("table",{className:"table-border mt-10"},void 0,s("tbody",{},void 0,s("tr",{className:"border-b border-white"},void 0,m,s("td",{},void 0,s("label",{className:"block"},void 0,"Ropani","ropani"===o&&p,s("input",{type:"text",value:O,className:"inputbox bg-white text-right ".concat("ropani"===o?"input-error":""),placeholder:"0",onChange:function(t){return function(t){var e=+t;if(q(t),Number.isFinite(e)&&e>=0){r("");var a=5476*e+342.25*(Number.isFinite(+A)?+A:0)+85.56*(Number.isFinite(+I)?+I:0)+21.39*(Number.isFinite(+$)?+$:0);T("".concat(a)),_("".concat(a/10.764));var o=u(l(a),3),i=o[0],n=o[1],c=o[2];L("".concat(Math.floor(i))),W("".concat(Math.floor(n))),Z("".concat(Number(c).toFixed(3)))}else r("ropani")}(t.target.value)}}))),s("td",{},void 0,s("label",{className:"block"},void 0,"Anna","anna"===o&&h,s("input",{type:"text",value:A,className:"inputbox bg-white text-right ".concat("anna"===o?"input-error":""),placeholder:"0",onChange:function(t){return function(t){var e=+t;if(B(t),Number.isFinite(e)&&e>=0){r("");var a=5476*(Number.isFinite(+O)?+O:0)+342.25*e+85.56*(Number.isFinite(+I)?+I:0)+21.39*(Number.isFinite(+$)?+$:0);T("".concat(a)),_("".concat(a/10.764));var o=u(l(a),3),i=o[0],n=o[1],c=o[2];L("".concat(Math.floor(i))),W("".concat(Math.floor(n))),Z("".concat(Number(c).toFixed(3)))}else r("anna")}(t.target.value)}}))),s("td",{},void 0,s("label",{className:"block"},void 0,"Paisa","paisa"===o&&N,s("input",{type:"text",value:I,className:"inputbox bg-white text-right ".concat("paisa"===o?"input-error":""),placeholder:"0",onChange:function(t){return function(t){var e=+t;if(J(t),Number.isFinite(e)&&e>=0){r("");var a=5476*(Number.isFinite(+O)?+O:0)+342.25*(Number.isFinite(+A)?+A:0)+85.56*e+21.39*(Number.isFinite(+$)?+$:0);T("".concat(a)),_("".concat(a/10.764));var o=u(l(a),3),i=o[0],n=o[1],c=o[2];L("".concat(Math.floor(i))),W("".concat(Math.floor(n))),Z("".concat(Number(c).toFixed(3)))}else r("paisa")}(t.target.value)}}))),s("td",{},void 0,s("label",{className:"block"},void 0,"Daam"," ","daam"===o&&x,s("input",{type:"text",value:$,className:"inputbox bg-white text-right ".concat("daam"===o?"input-error":""),placeholder:"0",onChange:function(t){return function(t){var e=+t;if(D(t),Number.isFinite(e)&&e>=0){r("");var a=5476*(Number.isFinite(+O)?+O:0)+342.25*(Number.isFinite(+A)?+A:0)+85.56*(Number.isFinite(+I)?+I:0)+21.39*e;T("".concat(a)),_("".concat(a/10.764));var o=u(l(a),3),i=o[0],n=o[1],c=o[2];L("".concat(Math.floor(i))),W("".concat(Math.floor(n))),Z("".concat(Number(c).toFixed(3)))}else r("daam")}(t.target.value)}})))),s("tr",{},void 0,g,s("td",{},void 0,s("label",{className:"block"},void 0,"Bigha"," ","bigha"===o&&y,s("input",{type:"text",value:G,className:"inputbox bg-white text-right ".concat("bigha"===o?"input-error":""),placeholder:"0",onChange:function(t){return function(t){var e=+t;if(L(t),Number.isFinite(e)&&e>=0){r("");var a=72900*e+3645*(Number.isFinite(+V)?+V:0)+182.25*(Number.isFinite(+Y)?+Y:0);T("".concat(a)),_("".concat(a/10.764));var o=u(c(a),4),i=o[0],n=o[1],l=o[2],s=o[3];D("".concat(s.toFixed(3))),J("".concat(Math.floor(l))),B("".concat(Math.floor(n))),q("".concat(Math.floor(i)))}else r("bigha")}(t.target.value)}}))),s("td",{},void 0,s("label",{className:"block"},void 0,"Kattha"," ","katha"===o&&F,s("input",{type:"text",value:V,className:"inputbox bg-white text-right ".concat("katha"===o?"input-error":""),placeholder:"0",onChange:function(t){return function(t){var e=+t;if(W(t),Number.isFinite(e)&&e>=0){r("");var a=72900*(Number.isFinite(+G)?+G:0)+3645*e+182.25*(Number.isFinite(+Y)?+Y:0);T("".concat(a)),_("".concat(a/10.764));var o=u(c(a),4),i=o[0],n=o[1],l=o[2],s=o[3];D("".concat(s.toFixed(3))),J("".concat(Math.floor(l))),B("".concat(Math.floor(n))),q("".concat(Math.floor(i)))}else r("katha")}(t.target.value)}}))),s("td",{},void 0,s("label",{className:"block"},void 0,"Dhur"," ","dhur"===o&&w,s("input",{type:"text",value:Y,className:"inputbox bg-white text-right ".concat("dhur"===o?"input-error":""),placeholder:"0",onChange:function(t){return function(t){var e=+t;if(Z(t),Number.isFinite(e)&&e>=0){r("");var a=72900*(Number.isFinite(+G)?+G:0)+3645*(Number.isFinite(+V)?+V:0)+182.25*e;T("".concat(a)),_("".concat(a/10.764));var o=u(c(a),4),i=o[0],n=o[1],l=o[2],s=o[3];D("".concat(s.toFixed(3))),J("".concat(Math.floor(l))),B("".concat(Math.floor(n))),q("".concat(Math.floor(i)))}else r("dhur")}(t.target.value)}}))),M),s("tr",{},void 0,S,s("td",{colSpan:"4"},void 0,s("label",{className:"block"},void 0,"Sq. Feet","sqfeet"===o&&k,s("input",{type:"text",value:R,className:"inputbox bg-white text-right w-64 ".concat("sqfeet"===o?"input-error":""),placeholder:"0",onChange:function(t){return function(t){var e=+t;if(T(t),Number.isFinite(e)&&e>=0){r(""),_("".concat(e/10.764));var a=u(c(e),4),o=a[0],i=a[1],n=a[2],s=a[3];D("".concat(s.toFixed(3))),J("".concat(Math.floor(n))),B("".concat(Math.floor(i))),q("".concat(Math.floor(o)));var d=u(l(e),3),v=d[0],f=d[1],b=d[2];L("".concat(Math.floor(v))),W("".concat(Math.floor(f))),Z("".concat(Number(b).toFixed(3)))}else r("sqfeet")}(t.target.value)},style:{width:270}})))),s("tr",{},void 0,s("td",{style:{borderBottom:"none"},className:"whitespace-no-wrap text-xl"},void 0,"Square Meter"),s("td",{style:{borderBottom:"none"},colSpan:"4"},void 0,s("label",{className:"block"},void 0,"Sq. Meter"," ","sqmeter"===o&&j,s("input",{type:"text",value:K,className:"inputbox bg-white text-right ".concat("sqmeter"===o?"input-error":""),placeholder:"0",onChange:function(t){return function(t){var e=+t;if(_(t),Number.isFinite(e)&&e>=0){r("");var a=10.764*e;T("".concat(a));var o=u(c(a),4),i=o[0],n=o[1],s=o[2],d=o[3];D("".concat(d.toFixed(3))),J("".concat(Math.floor(s))),B("".concat(Math.floor(n))),q("".concat(Math.floor(i)));var v=u(l(a),3),f=v[0],b=v[1],m=v[2];L("".concat(Math.floor(f))),W("".concat(Math.floor(b))),Z("".concat(Number(m).toFixed(3)))}else r("sqmeter")}(t.target.value)},style:{width:270}}))))))))))}}}]);
=======
(window.webpackJsonp=window.webpackJsonp||[]).push([[345],{ca3b81a6a800708f8cd0:function(t,e,a){"use strict";a.r(e);var o,i=a("8af190b70a6bc55c6f1b"),n=a.n(i),r=a("0d7f0986bcd2f33d8a2a"),c=(a("2fab4c3552d6567474b0"),function(t){var e,a,o,i,n;return a=0,o=0,i=0,n=0,(e=t/21.39)<4?n=e:(n=e%4,(i=e/4)>=4&&(o=i/4,i%=4,o>=16&&(a=o/16,o%=16))),[a,o,i,n]}),l=function(t){var e,a,o,i;return a=0,o=0,i=0,(e=t/182.25)<20?i=e:(i=e%20,(o=e/20)>=20&&(a=o/20,o%=20)),[a,o,i]};function s(t,e,a,i){o||(o="function"===typeof Symbol&&Symbol.for&&Symbol.for("react.element")||60103);var n=t&&t.defaultProps,r=arguments.length-3;if(e||0===r||(e={children:void 0}),1===r)e.children=i;else if(r>1){for(var c=new Array(r),l=0;l<r;l++)c[l]=arguments[l+3];e.children=c}if(e&&n)for(var s in n)void 0===e[s]&&(e[s]=n[s]);else e||(e=n||{});return{$$typeof:o,type:t,key:void 0===a?null:""+a,ref:null,props:e,_owner:null}}function u(t,e){return function(t){if(Array.isArray(t))return t}(t)||function(t,e){var a=null==t?null:"undefined"!==typeof Symbol&&t[Symbol.iterator]||t["@@iterator"];if(null==a)return;var o,i,n=[],r=!0,c=!1;try{for(a=a.call(t);!(r=(o=a.next()).done)&&(n.push(o.value),!e||n.length!==e);r=!0);}catch(t){c=!0,i=t}finally{try{r||null==a.return||a.return()}finally{if(c)throw i}}return n}(t,e)||function(t,e){if(!t)return;if("string"===typeof t)return d(t,e);var a=Object.prototype.toString.call(t).slice(8,-1);"Object"===a&&t.constructor&&(a=t.constructor.name);if("Map"===a||"Set"===a)return Array.from(t);if("Arguments"===a||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(a))return d(t,e)}(t,e)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function d(t,e){(null==e||e>t.length)&&(e=t.length);for(var a=0,o=new Array(e);a<e;a++)o[a]=t[a];return o}var v=s(r.Helmet,{},void 0,s("title",{},void 0,"Unit Converter")),f=s("h1",{className:"text-3xl text-center pt-5"},void 0,"Unit Converter"),b=s("p",{className:"text-sm text-center"},void 0,"Just at one shot you can convert areas across ropani, bigha, square feet, square meter."),m=s("td",{className:"whitespace-no-wrap text-xl"},void 0,"Ropani System"),p=s("span",{className:"italic pl-1 text-red-200"},void 0,"field not valid"),h=s("span",{className:"italic pl-1 text-red-200"},void 0,"field not valid"),N=s("span",{className:"italic pl-1 text-red-200"},void 0,"field not valid"),x=s("span",{className:"italic pl-1 text-red-200"},void 0,"field not valid"),g=s("td",{className:"whitespace-no-wrap text-xl"},void 0,"Bigha System"),y=s("span",{className:"italic pl-1 text-red-200"},void 0,"field not valid"),F=s("span",{className:"italic pl-1 text-red-200"},void 0,"field not valid"),w=s("span",{className:"italic pl-1 text-red-200"},void 0,"field not valid"),M=s("td",{}),S=s("td",{className:"whitespace-no-wrap text-xl"},void 0,"Square Feet"),k=s("span",{className:"italic pl-1 text-red-200"},void 0,"field not valid"),j=s("span",{className:"italic pl-1 text-red-200"},void 0,"field not valid");e.default=function(t){var e=t.isModal,a=u(Object(i.useState)(""),2),o=a[0],r=a[1],d=u(Object(i.useState)(""),2),O=d[0],q=d[1],C=u(Object(i.useState)(""),2),A=C[0],B=C[1],E=u(Object(i.useState)(""),2),I=E[0],J=E[1],U=u(Object(i.useState)(""),2),$=U[0],D=U[1],P=u(Object(i.useState)(""),2),R=P[0],T=P[1],H=u(Object(i.useState)(""),2),K=H[0],_=H[1],z=u(Object(i.useState)(""),2),G=z[0],L=z[1],Q=u(Object(i.useState)(""),2),V=Q[0],W=Q[1],X=u(Object(i.useState)(""),2),Y=X[0],Z=X[1];Object(i.useEffect)(function(){window.scrollTo(0,0)},[]);return n.a.createElement(n.a.Fragment,null,void 0===e&&v,s("div",{className:"text-sm"},void 0,s("div",{className:""},void 0,s("div",{className:"max-w-3xl mx-auto p-10"},void 0,f,b,s("table",{className:"table-border mt-10"},void 0,s("tbody",{},void 0,s("tr",{className:"border-b border-white"},void 0,m,s("td",{},void 0,s("label",{className:"block"},void 0,"Ropani","ropani"===o&&p,s("input",{type:"text",value:O,className:"inputbox bg-white text-right ".concat("ropani"===o?"input-error":""),placeholder:"0",onChange:function(t){return function(t){var e=+t;if(q(t),Number.isFinite(e)&&e>=0){r("");var a=5476*e+342.25*(Number.isFinite(+A)?+A:0)+85.56*(Number.isFinite(+I)?+I:0)+21.39*(Number.isFinite(+$)?+$:0);T("".concat(a)),_("".concat(a/10.764));var o=u(l(a),3),i=o[0],n=o[1],c=o[2];L("".concat(Math.floor(i))),W("".concat(Math.floor(n))),Z("".concat(Number(c).toFixed(3)))}else r("ropani")}(t.target.value)}}))),s("td",{},void 0,s("label",{className:"block"},void 0,"Anna","anna"===o&&h,s("input",{type:"text",value:A,className:"inputbox bg-white text-right ".concat("anna"===o?"input-error":""),placeholder:"0",onChange:function(t){return function(t){var e=+t;if(B(t),Number.isFinite(e)&&e>=0){r("");var a=5476*(Number.isFinite(+O)?+O:0)+342.25*e+85.56*(Number.isFinite(+I)?+I:0)+21.39*(Number.isFinite(+$)?+$:0);T("".concat(a)),_("".concat(a/10.764));var o=u(l(a),3),i=o[0],n=o[1],c=o[2];L("".concat(Math.floor(i))),W("".concat(Math.floor(n))),Z("".concat(Number(c).toFixed(3)))}else r("anna")}(t.target.value)}}))),s("td",{},void 0,s("label",{className:"block"},void 0,"Paisa","paisa"===o&&N,s("input",{type:"text",value:I,className:"inputbox bg-white text-right ".concat("paisa"===o?"input-error":""),placeholder:"0",onChange:function(t){return function(t){var e=+t;if(J(t),Number.isFinite(e)&&e>=0){r("");var a=5476*(Number.isFinite(+O)?+O:0)+342.25*(Number.isFinite(+A)?+A:0)+85.56*e+21.39*(Number.isFinite(+$)?+$:0);T("".concat(a)),_("".concat(a/10.764));var o=u(l(a),3),i=o[0],n=o[1],c=o[2];L("".concat(Math.floor(i))),W("".concat(Math.floor(n))),Z("".concat(Number(c).toFixed(3)))}else r("paisa")}(t.target.value)}}))),s("td",{},void 0,s("label",{className:"block"},void 0,"Daam"," ","daam"===o&&x,s("input",{type:"text",value:$,className:"inputbox bg-white text-right ".concat("daam"===o?"input-error":""),placeholder:"0",onChange:function(t){return function(t){var e=+t;if(D(t),Number.isFinite(e)&&e>=0){r("");var a=5476*(Number.isFinite(+O)?+O:0)+342.25*(Number.isFinite(+A)?+A:0)+85.56*(Number.isFinite(+I)?+I:0)+21.39*e;T("".concat(a)),_("".concat(a/10.764));var o=u(l(a),3),i=o[0],n=o[1],c=o[2];L("".concat(Math.floor(i))),W("".concat(Math.floor(n))),Z("".concat(Number(c).toFixed(3)))}else r("daam")}(t.target.value)}})))),s("tr",{},void 0,g,s("td",{},void 0,s("label",{className:"block"},void 0,"Bigha"," ","bigha"===o&&y,s("input",{type:"text",value:G,className:"inputbox bg-white text-right ".concat("bigha"===o?"input-error":""),placeholder:"0",onChange:function(t){return function(t){var e=+t;if(L(t),Number.isFinite(e)&&e>=0){r("");var a=72900*e+3645*(Number.isFinite(+V)?+V:0)+182.25*(Number.isFinite(+Y)?+Y:0);T("".concat(a)),_("".concat(a/10.764));var o=u(c(a),4),i=o[0],n=o[1],l=o[2],s=o[3];D("".concat(s.toFixed(3))),J("".concat(Math.floor(l))),B("".concat(Math.floor(n))),q("".concat(Math.floor(i)))}else r("bigha")}(t.target.value)}}))),s("td",{},void 0,s("label",{className:"block"},void 0,"Kattha"," ","katha"===o&&F,s("input",{type:"text",value:V,className:"inputbox bg-white text-right ".concat("katha"===o?"input-error":""),placeholder:"0",onChange:function(t){return function(t){var e=+t;if(W(t),Number.isFinite(e)&&e>=0){r("");var a=72900*(Number.isFinite(+G)?+G:0)+3645*e+182.25*(Number.isFinite(+Y)?+Y:0);T("".concat(a)),_("".concat(a/10.764));var o=u(c(a),4),i=o[0],n=o[1],l=o[2],s=o[3];D("".concat(s.toFixed(3))),J("".concat(Math.floor(l))),B("".concat(Math.floor(n))),q("".concat(Math.floor(i)))}else r("katha")}(t.target.value)}}))),s("td",{},void 0,s("label",{className:"block"},void 0,"Dhur"," ","dhur"===o&&w,s("input",{type:"text",value:Y,className:"inputbox bg-white text-right ".concat("dhur"===o?"input-error":""),placeholder:"0",onChange:function(t){return function(t){var e=+t;if(Z(t),Number.isFinite(e)&&e>=0){r("");var a=72900*(Number.isFinite(+G)?+G:0)+3645*(Number.isFinite(+V)?+V:0)+182.25*e;T("".concat(a)),_("".concat(a/10.764));var o=u(c(a),4),i=o[0],n=o[1],l=o[2],s=o[3];D("".concat(s.toFixed(3))),J("".concat(Math.floor(l))),B("".concat(Math.floor(n))),q("".concat(Math.floor(i)))}else r("dhur")}(t.target.value)}}))),M),s("tr",{},void 0,S,s("td",{colSpan:"4"},void 0,s("label",{className:"block"},void 0,"Sq. Feet","sqfeet"===o&&k,s("input",{type:"text",value:R,className:"inputbox bg-white text-right w-64 ".concat("sqfeet"===o?"input-error":""),placeholder:"0",onChange:function(t){return function(t){var e=+t;if(T(t),Number.isFinite(e)&&e>=0){r(""),_("".concat(e/10.764));var a=u(c(e),4),o=a[0],i=a[1],n=a[2],s=a[3];D("".concat(s.toFixed(3))),J("".concat(Math.floor(n))),B("".concat(Math.floor(i))),q("".concat(Math.floor(o)));var d=u(l(e),3),v=d[0],f=d[1],b=d[2];L("".concat(Math.floor(v))),W("".concat(Math.floor(f))),Z("".concat(Number(b).toFixed(3)))}else r("sqfeet")}(t.target.value)},style:{width:270}})))),s("tr",{},void 0,s("td",{style:{borderBottom:"none"},className:"whitespace-no-wrap text-xl"},void 0,"Square Meter"),s("td",{style:{borderBottom:"none"},colSpan:"4"},void 0,s("label",{className:"block"},void 0,"Sq. Meter"," ","sqmeter"===o&&j,s("input",{type:"text",value:K,className:"inputbox bg-white text-right ".concat("sqmeter"===o?"input-error":""),placeholder:"0",onChange:function(t){return function(t){var e=+t;if(_(t),Number.isFinite(e)&&e>=0){r("");var a=10.764*e;T("".concat(a));var o=u(c(a),4),i=o[0],n=o[1],s=o[2],d=o[3];D("".concat(d.toFixed(3))),J("".concat(Math.floor(s))),B("".concat(Math.floor(n))),q("".concat(Math.floor(i)));var v=u(l(a),3),f=v[0],b=v[1],m=v[2];L("".concat(Math.floor(f))),W("".concat(Math.floor(b))),Z("".concat(Number(m).toFixed(3)))}else r("sqmeter")}(t.target.value)},style:{width:270}}))))))))))}}}]);
>>>>>>> 41f64895ae2d4aeb7736fd90e084d7a063de2675:client/build/345.42ab86f8c45843e88699.chunk.js
