<<<<<<< HEAD:client/build/217.1096660900fd84253407.chunk.js
(window.webpackJsonp=window.webpackJsonp||[]).push([[217],{"3bda5a7f9af36cda9aa3":function(e,t,r){"use strict";r.r(t);var a={};r.r(a),r.d(a,"loadLocationRequest",function(){return j}),r.d(a,"loadLocationSuccess",function(){return x}),r.d(a,"loadLocationFailure",function(){return h}),r.d(a,"setActiveRequest",function(){return S}),r.d(a,"setActiveSuccess",function(){return k}),r.d(a,"setActiveFailure",function(){return C});var n=r("8af190b70a6bc55c6f1b"),i=r.n(n),o=(r("8a2d1b95e05b6a321e74"),r("d7dd51e1bf6bfc2c9c3d")),c=r("0d7f0986bcd2f33d8a2a"),l=r("a28fc3c963a1d4d1a2e5"),d=r("ab4cb61bcb2dc161defb"),u=r("adc20f99e57c573c589c"),s=r("d95b0cf107403b178365"),p=r("c87810b6e820b5433784"),f=r.n(p),b=r("c502bee2fd4be3dd7f62"),m=r.n(b),v=r("dd2abf8ea2229aaf878b"),y=r.n(v),O=r("da7ed230e57b1869e3fb"),g=r.n(O),_="app/LocationTreeView/LOAD_LOCATION_REQUEST",w="app/LocationTreeView/SET_ACTIVE_REQUEST",j=function(e){return{type:_,payload:e}},x=function(e){return{type:"app/LocationTreeView/LOAD_LOCATION_SUCCESS",payload:e}},h=function(e){return{type:"app/LocationTreeView/LOAD_LOCATION_FAILURE",payload:e}},S=function(e){return{type:w,payload:e}},k=function(e){return{type:"app/LocationTreeView/SET_ACTIVE_SUCCESS",payload:e}},C=function(e){return{type:"app/LocationTreeView/SET_ACTIVE_FAILURE",payload:e}},E=r("7edf83707012a871cdfb");function A(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);t&&(a=a.filter(function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable})),r.push.apply(r,a)}return r}function L(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?A(Object(r),!0).forEach(function(t){T(e,t,r[t])}):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):A(Object(r)).forEach(function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))})}return e}function T(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}var N={location:{allState:[],allDistrict:[],allVdc:[],allArea:[]},loading:!1},P=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:N,t=arguments.length>1?arguments[1]:void 0;return Object(E.a)(e,function(r){switch(t.type){case _:r.loading=!0;break;case"app/LocationTreeView/LOAD_LOCATION_FAILURE":r.loading=!1;break;case"app/LocationTreeView/LOAD_LOCATION_SUCCESS":r.location=L({},t.payload.data),r.loading=!1;break;case"app/LocationTreeView/SET_ACTIVE_SUCCESS":"State"===t.payload.msg?r.location.allState=e.location.allState.map(function(e){return e._id===t.payload.data._id?L(L({},e),{},{is_active:t.payload.data.is_active}):L({},e)}):"District"===t.payload.msg?r.location.allDistrict=e.location.allDistrict.map(function(e){return e._id===t.payload.data._id?L(L({},e),{},{is_active:t.payload.data.is_active}):L({},e)}):"VDC"===t.payload.msg?r.location.allVdc=e.location.allVdc.map(function(e){return e._id===t.payload.data._id?L(L({},e),{},{is_active:t.payload.data.is_active}):L({},e)}):"Area"===t.payload.msg&&(r.location.allArea=e.location.allArea.map(function(e){return e._id===t.payload.data._id?L(L({},e),{},{is_active:t.payload.data.is_active}):L({},e)}))}})},D=function(e){return e.locationTreeView||N},V=r("d782b72bc5b680c7122c"),I=r("6144be5eac76f277117a"),R=r("6542cd13fd5dd1bcffd4");function U(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);t&&(a=a.filter(function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable})),r.push.apply(r,a)}return r}function F(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?U(Object(r),!0).forEach(function(t){q(e,t,r[t])}):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):U(Object(r)).forEach(function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))})}return e}function q(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}var B,z=regeneratorRuntime.mark(Q),$=regeneratorRuntime.mark(H),J=regeneratorRuntime.mark(M);function Q(e){var t;return regeneratorRuntime.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,Object(V.select)(Object(R.j)());case 2:return t=e.sent,e.next=5,Object(V.call)(I.a.get("static/nepal/all?active=all",x,h,t));case 5:case"end":return e.stop()}},z)}function H(e){var t;return regeneratorRuntime.wrap(function(r){for(;;)switch(r.prev=r.next){case 0:return r.next=2,Object(V.select)(Object(R.j)());case 2:return t=r.sent,r.next=5,Object(V.call)(I.a.post("static/nepal/".concat(e.payload.key,"/active"),k,C,F({},e.payload.data),t));case 5:case"end":return r.stop()}},$)}function M(){return regeneratorRuntime.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,Object(V.takeLatest)(_,Q);case 2:return e.next=4,Object(V.takeLatest)(w,H);case 4:case"end":return e.stop()}},J)}function G(e,t,r,a){B||(B="function"===typeof Symbol&&Symbol.for&&Symbol.for("react.element")||60103);var n=e&&e.defaultProps,i=arguments.length-3;if(t||0===i||(t={children:void 0}),1===i)t.children=a;else if(i>1){for(var o=new Array(i),c=0;c<i;c++)o[c]=arguments[c+3];t.children=o}if(t&&n)for(var l in n)void 0===t[l]&&(t[l]=n[l]);else t||(t=n||{});return{$$typeof:B,type:e,key:void 0===r?null:""+r,ref:null,props:t,_owner:null}}function K(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);t&&(a=a.filter(function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable})),r.push.apply(r,a)}return r}function W(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?K(Object(r),!0).forEach(function(t){X(e,t,r[t])}):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):K(Object(r)).forEach(function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))})}return e}function X(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}function Y(e,t){return function(e){if(Array.isArray(e))return e}(e)||function(e,t){var r=null==e?null:"undefined"!==typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(null==r)return;var a,n,i=[],o=!0,c=!1;try{for(r=r.call(e);!(o=(a=r.next()).done)&&(i.push(a.value),!t||i.length!==t);o=!0);}catch(e){c=!0,n=e}finally{try{o||null==r.return||r.return()}finally{if(c)throw n}}return i}(e,t)||function(e,t){if(!e)return;if("string"===typeof e)return Z(e,t);var r=Object.prototype.toString.call(e).slice(8,-1);"Object"===r&&e.constructor&&(r=e.constructor.name);if("Map"===r||"Set"===r)return Array.from(e);if("Arguments"===r||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r))return Z(e,t)}(e,t)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function Z(e,t){(null==t||t>e.length)&&(t=e.length);for(var r=0,a=new Array(t);r<t;r++)a[r]=e[r];return a}r.d(t,"LocationTreeView",function(){return ue});var ee="locationTreeView",te=function(e,t,r){return e.filter(function(e){return e[r]===t}).length},re=G("div",{},void 0,G(c.Helmet,{},void 0,G("title",{},void 0,"Location Tree View"),G("meta",{name:"description",content:"Description of LocationTreeView"}))),ae=G("span",{className:"text-gray-800 px-4"},void 0,"|"),ne=G("div",{className:"text-grey-darker hover:text-primary"},void 0,G(g.a,{})),ie=G("div",{className:"text-grey-darker hover:text-primary"},void 0,G(y.a,{})),oe=G("div",{className:"text-grey-darker hover:text-primary"},void 0,G(g.a,{})),ce=G("div",{className:"text-grey-darker hover:text-primary"},void 0,G(y.a,{})),le=G("div",{className:"text-grey-darker hover:text-primary"},void 0,G(g.a,{})),de=G("div",{className:"text-grey-darker hover:text-primary"},void 0,G(y.a,{})),ue=function(e){var t=e.loadLocationRequest,r=e.setActiveRequest,a=e.location,o=a.allState,c=a.allDistrict,l=a.allVdc,d=a.allArea;Object(s.b)({key:ee,reducer:P}),Object(u.b)({key:ee,saga:M});var p=Y(Object(n.useState)({}),2),b=p[0],v=p[1];Object(n.useEffect)(function(){t()},[]);Object(n.useEffect)(function(){o&&o.length>0&&o.sort(function(e,t){var r=e.name.toUpperCase(),a=t.name.toUpperCase();return r<a?-1:r>a?1:0})},[o]),Object(n.useEffect)(function(){c&&c.length>0&&c.sort(function(e,t){var r=e.name.toUpperCase(),a=t.name.toUpperCase();return r<a?-1:r>a?1:0})},[c]),Object(n.useEffect)(function(){l&&l.length>0&&l.sort(function(e,t){var r=e.name.toUpperCase(),a=t.name.toUpperCase();return r<a?-1:r>a?1:0})},[l]),Object(n.useEffect)(function(){d&&d.length>0&&d.sort(function(e,t){var r=e.name.toUpperCase(),a=t.name.toUpperCase();return r<a?-1:r>a?1:0})},[d]);var y=function(e){v(W(W({},b),{},X({},e,!b[e])))},O=function(e,t){return function(a){r({key:e,data:{is_active:a.target.checked,_id:t}})}};return console.log("openSet",b),i.a.createElement(i.a.Fragment,null,re,G("div",{className:"px-4 mt-5"},void 0,G("button",{className:"mb-2",type:"button",onClick:function(){v({})}},void 0,"Collapse All"),ae,G("button",{className:"mb-2",type:"button",onClick:function(){var e=[],t={};o.map(function(t){e.push(t._id)}),c.map(function(t){e.push(t._id)}),l.map(function(t){e.push(t._id)}),d.map(function(t){e.push(t._id)}),e.map(function(e){return t[e]=!0}),v(t)}},void 0,"Expand All")),G("div",{className:"bg-white flex flex-wrap justify-between p-2 pb-0 px-4"},void 0,o&&o.map(function(e){return G("ul",{className:"w-full md:w-1/3 border mb-2 -ml-2 -mr-2"},e._id,G("li",{className:"py-2 pr-4 pl-4 cursor-pointer flex items-center capitalize text-gray-800 hover:text-primary text-sm"},void 0,G("div",{className:"flex justify-between"},void 0,G("div",{className:"w-56 flex flexwrap",onClick:function(){return y(e._id)}},void 0,b[e._id]?ne:ie," ".concat(e.name)," (".concat(te(c,e._id,"state_id"),")")),G(m.a,{checked:e.is_active||!1,tabIndex:-1,onClick:O("state",e._id),color:"default",style:{paddingTop:0,paddingBottom:"0",borderLeft:"1px solid #eeeeee",borderRadius:"0"}}))),G(f.a,{in:b[e._id],timeout:"auto",unmountOnExit:!0},void 0,G("div",{className:"list-reset pl-4"},void 0,c.filter(function(t){return t.state_id===e._id}).map(function(e){return G("div",{},e._id,G("li",{className:"border-b border-gray-200 pr-4 pl-4 cursor-pointer flex items-center capitalize text-gray-800 hover:text-primary text-sm"},void 0,G("div",{className:"flex justify-between"},void 0,G("div",{className:"w-56 flex flexwrap",onClick:function(){y(e._id)}},void 0,b[e._id]?oe:ce," ".concat(e.name)," (".concat(te(l,e._id,"district_id"),")")),G(m.a,{className:"bg-red-800",checked:e.is_active||!1,tabIndex:-1,onClick:O("district",e._id),style:{paddingTop:0,paddingBottom:"0",color:"#0291DDed",borderLeft:"1px solid #eeeeee",borderRadius:"0"}}))),G(f.a,{in:b[e._id],timeout:"auto",unmountOnExit:!0},void 0,G("div",{className:"list-reset pl-4"},void 0,l.filter(function(t){return t.district_id===e._id}).map(function(e){return G("div",{},e._id,G("li",{className:"border-b border-gray-200 pr-4 pl-4 cursor-pointer flex items-center capitalize text-gray-800 hover:text-primary text-sm"},void 0,G("div",{className:"flex justify-between"},void 0,G("div",{className:"w-56 flex flexwrap",onClick:function(){return y(e._id)}},void 0,b[e._id]?le:de," ".concat(e.name)," (".concat(te(d,e._id,"vdcmunicipality_id"),")")),G(m.a,{checked:e.is_active||!1,tabIndex:-1,onClick:O("vdc",e._id),color:"default",style:{paddingTop:0,paddingBottom:"0",color:"#4baea0",borderLeft:"1px solid #eeeeee",borderRadius:"0"}}))),G(f.a,{in:b[e._id],timeout:"auto",unmountOnExit:!0},void 0,G("div",{className:"list-reset"},void 0,d.filter(function(t){return t.vdcmunicipality_id===e._id}).map(function(e){return G("div",{className:"pl-12 bg-gray-200 mb-1 last:mb-0"},e._id,G("li",{className:"flex justify-between"},void 0,G("div",{className:"w-56 flex flexwrap"},void 0," ".concat(e.name)),G(m.a,{checked:e.is_active||!1,tabIndex:-1,onClick:O("area",e._id),color:"primary",style:{paddingTop:0,paddingBottom:"0",borderLeft:"1px solid #FFFFFF",borderRadius:"0"}})))}))))}))))}))))})))},se=Object(l.b)({location:Object(l.a)(D,function(e){return e.location})}),pe=Object(o.connect)(se,a);t.default=Object(d.compose)(pe,n.memo)(ue)}}]);
=======
(window.webpackJsonp=window.webpackJsonp||[]).push([[220],{"3bda5a7f9af36cda9aa3":function(e,t,r){"use strict";r.r(t);var a={};r.r(a),r.d(a,"loadLocationRequest",function(){return j}),r.d(a,"loadLocationSuccess",function(){return x}),r.d(a,"loadLocationFailure",function(){return h}),r.d(a,"setActiveRequest",function(){return S}),r.d(a,"setActiveSuccess",function(){return k}),r.d(a,"setActiveFailure",function(){return C});var n=r("8af190b70a6bc55c6f1b"),i=r.n(n),o=(r("8a2d1b95e05b6a321e74"),r("d7dd51e1bf6bfc2c9c3d")),c=r("0d7f0986bcd2f33d8a2a"),l=r("a28fc3c963a1d4d1a2e5"),d=r("ab4cb61bcb2dc161defb"),u=r("adc20f99e57c573c589c"),s=r("d95b0cf107403b178365"),p=r("c87810b6e820b5433784"),f=r.n(p),b=r("c502bee2fd4be3dd7f62"),m=r.n(b),v=r("dd2abf8ea2229aaf878b"),y=r.n(v),O=r("da7ed230e57b1869e3fb"),g=r.n(O),_="app/LocationTreeView/LOAD_LOCATION_REQUEST",w="app/LocationTreeView/SET_ACTIVE_REQUEST",j=function(e){return{type:_,payload:e}},x=function(e){return{type:"app/LocationTreeView/LOAD_LOCATION_SUCCESS",payload:e}},h=function(e){return{type:"app/LocationTreeView/LOAD_LOCATION_FAILURE",payload:e}},S=function(e){return{type:w,payload:e}},k=function(e){return{type:"app/LocationTreeView/SET_ACTIVE_SUCCESS",payload:e}},C=function(e){return{type:"app/LocationTreeView/SET_ACTIVE_FAILURE",payload:e}},E=r("7edf83707012a871cdfb");function A(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);t&&(a=a.filter(function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable})),r.push.apply(r,a)}return r}function L(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?A(Object(r),!0).forEach(function(t){T(e,t,r[t])}):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):A(Object(r)).forEach(function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))})}return e}function T(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}var N={location:{allState:[],allDistrict:[],allVdc:[],allArea:[]},loading:!1},P=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:N,t=arguments.length>1?arguments[1]:void 0;return Object(E.a)(e,function(r){switch(t.type){case _:r.loading=!0;break;case"app/LocationTreeView/LOAD_LOCATION_FAILURE":r.loading=!1;break;case"app/LocationTreeView/LOAD_LOCATION_SUCCESS":r.location=L({},t.payload.data),r.loading=!1;break;case"app/LocationTreeView/SET_ACTIVE_SUCCESS":"State"===t.payload.msg?r.location.allState=e.location.allState.map(function(e){return e._id===t.payload.data._id?L(L({},e),{},{is_active:t.payload.data.is_active}):L({},e)}):"District"===t.payload.msg?r.location.allDistrict=e.location.allDistrict.map(function(e){return e._id===t.payload.data._id?L(L({},e),{},{is_active:t.payload.data.is_active}):L({},e)}):"VDC"===t.payload.msg?r.location.allVdc=e.location.allVdc.map(function(e){return e._id===t.payload.data._id?L(L({},e),{},{is_active:t.payload.data.is_active}):L({},e)}):"Area"===t.payload.msg&&(r.location.allArea=e.location.allArea.map(function(e){return e._id===t.payload.data._id?L(L({},e),{},{is_active:t.payload.data.is_active}):L({},e)}))}})},D=function(e){return e.locationTreeView||N},V=r("d782b72bc5b680c7122c"),I=r("6144be5eac76f277117a"),R=r("6542cd13fd5dd1bcffd4");function U(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);t&&(a=a.filter(function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable})),r.push.apply(r,a)}return r}function F(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?U(Object(r),!0).forEach(function(t){q(e,t,r[t])}):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):U(Object(r)).forEach(function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))})}return e}function q(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}var B,z=regeneratorRuntime.mark(Q),$=regeneratorRuntime.mark(H),J=regeneratorRuntime.mark(M);function Q(e){var t;return regeneratorRuntime.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,Object(V.select)(Object(R.j)());case 2:return t=e.sent,e.next=5,Object(V.call)(I.a.get("static/nepal/all?active=all",x,h,t));case 5:case"end":return e.stop()}},z)}function H(e){var t;return regeneratorRuntime.wrap(function(r){for(;;)switch(r.prev=r.next){case 0:return r.next=2,Object(V.select)(Object(R.j)());case 2:return t=r.sent,r.next=5,Object(V.call)(I.a.post("static/nepal/".concat(e.payload.key,"/active"),k,C,F({},e.payload.data),t));case 5:case"end":return r.stop()}},$)}function M(){return regeneratorRuntime.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,Object(V.takeLatest)(_,Q);case 2:return e.next=4,Object(V.takeLatest)(w,H);case 4:case"end":return e.stop()}},J)}function G(e,t,r,a){B||(B="function"===typeof Symbol&&Symbol.for&&Symbol.for("react.element")||60103);var n=e&&e.defaultProps,i=arguments.length-3;if(t||0===i||(t={children:void 0}),1===i)t.children=a;else if(i>1){for(var o=new Array(i),c=0;c<i;c++)o[c]=arguments[c+3];t.children=o}if(t&&n)for(var l in n)void 0===t[l]&&(t[l]=n[l]);else t||(t=n||{});return{$$typeof:B,type:e,key:void 0===r?null:""+r,ref:null,props:t,_owner:null}}function K(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);t&&(a=a.filter(function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable})),r.push.apply(r,a)}return r}function W(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?K(Object(r),!0).forEach(function(t){X(e,t,r[t])}):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):K(Object(r)).forEach(function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))})}return e}function X(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}function Y(e,t){return function(e){if(Array.isArray(e))return e}(e)||function(e,t){var r=null==e?null:"undefined"!==typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(null==r)return;var a,n,i=[],o=!0,c=!1;try{for(r=r.call(e);!(o=(a=r.next()).done)&&(i.push(a.value),!t||i.length!==t);o=!0);}catch(e){c=!0,n=e}finally{try{o||null==r.return||r.return()}finally{if(c)throw n}}return i}(e,t)||function(e,t){if(!e)return;if("string"===typeof e)return Z(e,t);var r=Object.prototype.toString.call(e).slice(8,-1);"Object"===r&&e.constructor&&(r=e.constructor.name);if("Map"===r||"Set"===r)return Array.from(e);if("Arguments"===r||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r))return Z(e,t)}(e,t)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function Z(e,t){(null==t||t>e.length)&&(t=e.length);for(var r=0,a=new Array(t);r<t;r++)a[r]=e[r];return a}r.d(t,"LocationTreeView",function(){return ue});var ee="locationTreeView",te=function(e,t,r){return e.filter(function(e){return e[r]===t}).length},re=G("div",{},void 0,G(c.Helmet,{},void 0,G("title",{},void 0,"Location Tree View"),G("meta",{name:"description",content:"Description of LocationTreeView"}))),ae=G("span",{className:"text-gray-800 px-4"},void 0,"|"),ne=G("div",{className:"text-grey-darker hover:text-primary"},void 0,G(g.a,{})),ie=G("div",{className:"text-grey-darker hover:text-primary"},void 0,G(y.a,{})),oe=G("div",{className:"text-grey-darker hover:text-primary"},void 0,G(g.a,{})),ce=G("div",{className:"text-grey-darker hover:text-primary"},void 0,G(y.a,{})),le=G("div",{className:"text-grey-darker hover:text-primary"},void 0,G(g.a,{})),de=G("div",{className:"text-grey-darker hover:text-primary"},void 0,G(y.a,{})),ue=function(e){var t=e.loadLocationRequest,r=e.setActiveRequest,a=e.location,o=a.allState,c=a.allDistrict,l=a.allVdc,d=a.allArea;Object(s.b)({key:ee,reducer:P}),Object(u.b)({key:ee,saga:M});var p=Y(Object(n.useState)({}),2),b=p[0],v=p[1];Object(n.useEffect)(function(){t()},[]);Object(n.useEffect)(function(){o&&o.length>0&&o.sort(function(e,t){var r=e.name.toUpperCase(),a=t.name.toUpperCase();return r<a?-1:r>a?1:0})},[o]),Object(n.useEffect)(function(){c&&c.length>0&&c.sort(function(e,t){var r=e.name.toUpperCase(),a=t.name.toUpperCase();return r<a?-1:r>a?1:0})},[c]),Object(n.useEffect)(function(){l&&l.length>0&&l.sort(function(e,t){var r=e.name.toUpperCase(),a=t.name.toUpperCase();return r<a?-1:r>a?1:0})},[l]),Object(n.useEffect)(function(){d&&d.length>0&&d.sort(function(e,t){var r=e.name.toUpperCase(),a=t.name.toUpperCase();return r<a?-1:r>a?1:0})},[d]);var y=function(e){v(W(W({},b),{},X({},e,!b[e])))},O=function(e,t){return function(a){r({key:e,data:{is_active:a.target.checked,_id:t}})}};return console.log("openSet",b),i.a.createElement(i.a.Fragment,null,re,G("div",{className:"px-4 mt-5"},void 0,G("button",{className:"mb-2",type:"button",onClick:function(){v({})}},void 0,"Collapse All"),ae,G("button",{className:"mb-2",type:"button",onClick:function(){var e=[],t={};o.map(function(t){e.push(t._id)}),c.map(function(t){e.push(t._id)}),l.map(function(t){e.push(t._id)}),d.map(function(t){e.push(t._id)}),e.map(function(e){return t[e]=!0}),v(t)}},void 0,"Expand All")),G("div",{className:"bg-white flex flex-wrap justify-between p-2 pb-0 px-4"},void 0,o&&o.map(function(e){return G("ul",{className:"w-full md:w-1/3 border mb-2 -ml-2 -mr-2"},e._id,G("li",{className:"py-2 pr-4 pl-4 cursor-pointer flex items-center capitalize text-gray-800 hover:text-primary text-sm"},void 0,G("div",{className:"flex justify-between"},void 0,G("div",{className:"w-56 flex flexwrap",onClick:function(){return y(e._id)}},void 0,b[e._id]?ne:ie," ".concat(e.name)," (".concat(te(c,e._id,"state_id"),")")),G(m.a,{checked:e.is_active||!1,tabIndex:-1,onClick:O("state",e._id),color:"default",style:{paddingTop:0,paddingBottom:"0",borderLeft:"1px solid #eeeeee",borderRadius:"0"}}))),G(f.a,{in:b[e._id],timeout:"auto",unmountOnExit:!0},void 0,G("div",{className:"list-reset pl-4"},void 0,c.filter(function(t){return t.state_id===e._id}).map(function(e){return G("div",{},e._id,G("li",{className:"border-b border-gray-200 pr-4 pl-4 cursor-pointer flex items-center capitalize text-gray-800 hover:text-primary text-sm"},void 0,G("div",{className:"flex justify-between"},void 0,G("div",{className:"w-56 flex flexwrap",onClick:function(){y(e._id)}},void 0,b[e._id]?oe:ce," ".concat(e.name)," (".concat(te(l,e._id,"district_id"),")")),G(m.a,{className:"bg-red-800",checked:e.is_active||!1,tabIndex:-1,onClick:O("district",e._id),style:{paddingTop:0,paddingBottom:"0",color:"#0291DDed",borderLeft:"1px solid #eeeeee",borderRadius:"0"}}))),G(f.a,{in:b[e._id],timeout:"auto",unmountOnExit:!0},void 0,G("div",{className:"list-reset pl-4"},void 0,l.filter(function(t){return t.district_id===e._id}).map(function(e){return G("div",{},e._id,G("li",{className:"border-b border-gray-200 pr-4 pl-4 cursor-pointer flex items-center capitalize text-gray-800 hover:text-primary text-sm"},void 0,G("div",{className:"flex justify-between"},void 0,G("div",{className:"w-56 flex flexwrap",onClick:function(){return y(e._id)}},void 0,b[e._id]?le:de," ".concat(e.name)," (".concat(te(d,e._id,"vdcmunicipality_id"),")")),G(m.a,{checked:e.is_active||!1,tabIndex:-1,onClick:O("vdc",e._id),color:"default",style:{paddingTop:0,paddingBottom:"0",color:"#4baea0",borderLeft:"1px solid #eeeeee",borderRadius:"0"}}))),G(f.a,{in:b[e._id],timeout:"auto",unmountOnExit:!0},void 0,G("div",{className:"list-reset"},void 0,d.filter(function(t){return t.vdcmunicipality_id===e._id}).map(function(e){return G("div",{className:"pl-12 bg-gray-200 mb-1 last:mb-0"},e._id,G("li",{className:"flex justify-between"},void 0,G("div",{className:"w-56 flex flexwrap"},void 0," ".concat(e.name)),G(m.a,{checked:e.is_active||!1,tabIndex:-1,onClick:O("area",e._id),color:"primary",style:{paddingTop:0,paddingBottom:"0",borderLeft:"1px solid #FFFFFF",borderRadius:"0"}})))}))))}))))}))))})))},se=Object(l.b)({location:Object(l.a)(D,function(e){return e.location})}),pe=Object(o.connect)(se,a);t.default=Object(d.compose)(pe,n.memo)(ue)}}]);
>>>>>>> 41f64895ae2d4aeb7736fd90e084d7a063de2675:client/build/220.84060c3b2fa8873fdc30.chunk.js