<<<<<<< HEAD:client/build/261.5bbd6f922167e7bf2b5a.chunk.js
(window.webpackJsonp=window.webpackJsonp||[]).push([[261],{bf677770fe7a31ad8726:function(e,t,r){"use strict";r.r(t);var a,n=r("8af190b70a6bc55c6f1b"),o=r.n(n),i=(r("8a2d1b95e05b6a321e74"),r("e95a63b25fb92ed15721")),c=r("a28fc3c963a1d4d1a2e5"),d=r("ab4cb61bcb2dc161defb"),l=r("d7dd51e1bf6bfc2c9c3d"),b=r("3aced5b508e7389026da"),u=(r("f85e09def79cc2a20bc2"),r("4a683f0a5e64e66a8eb9")),s=r.n(u),f=r("c502bee2fd4be3dd7f62"),p=r.n(f),m=r("5c0a236ca4c0b26f32cd"),v=r.n(m),y=r("26682d5d4df1c4fdd619"),g=r.n(y),h=r("0d939196e59ed73c94e6"),w=r("adc20f99e57c573c589c"),O=r("d95b0cf107403b178365"),x=r("5df2663e676f8932a2e3"),j=r("dc2595913ff3ca805cde"),k=r("65f1dbb8558fed00e9af"),N=r("fa7598b71a51184f7700"),S=r("d733903be61208652859"),C=r("5932430beb0c05240602"),P=r("2fad9e66eff5130ad191"),I=r("5cb9d1dda30508c4ab9e"),A=r("059040756c929fa8b9bb"),E=r("e727e731a9bed8ec3c2a"),D=r.n(E),F=r("eb6b79030a47f0b10efc"),R=r.n(F),T=r("1551459233b95bf53af9"),_=r.n(T),B=r("fcb99a06256635f70435");function M(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);t&&(a=a.filter(function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable})),r.push.apply(r,a)}return r}function $(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?M(Object(r),!0).forEach(function(t){q(e,t,r[t])}):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):M(Object(r)).forEach(function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))})}return e}function q(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}function J(e,t,r,n){a||(a="function"===typeof Symbol&&Symbol.for&&Symbol.for("react.element")||60103);var o=e&&e.defaultProps,i=arguments.length-3;if(t||0===i||(t={children:void 0}),1===i)t.children=n;else if(i>1){for(var c=new Array(i),d=0;d<i;d++)c[d]=arguments[d+3];t.children=c}if(t&&o)for(var l in o)void 0===t[l]&&(t[l]=o[l]);else t||(t=o||{});return{$$typeof:a,type:e,key:void 0===r?null:""+r,ref:null,props:t,_owner:null}}function U(e,t){return function(e){if(Array.isArray(e))return e}(e)||function(e,t){var r=null==e?null:"undefined"!==typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(null==r)return;var a,n,o=[],i=!0,c=!1;try{for(r=r.call(e);!(i=(a=r.next()).done)&&(o.push(a.value),!t||o.length!==t);i=!0);}catch(e){c=!0,n=e}finally{try{i||null==r.return||r.return()}finally{if(c)throw n}}return o}(e,t)||function(e,t){if(!e)return;if("string"===typeof e)return W(e,t);var r=Object.prototype.toString.call(e).slice(8,-1);"Object"===r&&e.constructor&&(r=e.constructor.name);if("Map"===r||"Set"===r)return Array.from(e);if("Arguments"===r||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r))return W(e,t)}(e,t)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function W(e,t){(null==t||t>e.length)&&(t=e.length);for(var r=0,a=new Array(t);r<t;r++)a[r]=e[r];return a}var V="serviceCategory",z=J(P.a,{}),G=J(g.a,{}),H=J("label",{className:"block uppercase tracking-wide text-grey-darker text-xs mb-2",htmlFor:"grid-country-code-2"},void 0,"Description"),K=J("label",{className:"block uppercase tracking-wide text-gray-800 text-xs mb-2",htmlFor:"Image"},void 0,"Image"),L=J("button",{type:"button",className:"text-black py-2 px-4 rounded font-bold bg-waftprimary hover:text-primary"},void 0,"Upload Image from Media"),Q=J("br",{}),X=J(R.a,{},void 0,"Select Image"),Y=J("div",{className:"mt-2 text-xs"},void 0,"Note: Please Double Click to open folder and select images."),Z=s()({backbtn:{padding:0,height:"40px",width:"40px",marginTop:"auto",marginBottom:"auto",borderRadius:"50%",marginRight:"5px"}}),ee=Object(O.a)({key:V,reducer:x.a}),te=Object(w.a)({key:V,saga:j.a}),re=Object(c.b)({one:Object(k.d)(),loading:Object(k.c)(),errors:Object(k.b)()}),ae=Object(l.connect)(re,$($({},N),{},{push:b.push}));t.default=Object(d.compose)(i.withRouter,Z,ee,te,ae)(function(e){var t=e.clearErrors,r=e.loadOneRequest,a=e.match,i=e.one,c=e.classes,d=e.loading,l=e.errors,b=e.setOneValue,u=e.addEditRequest,s=e.push,f=e.addFromMedia,m=U(Object(n.useState)(!1),2),y=m[0],g=m[1];Object(n.useEffect)(function(){t(),a.params&&a.params.id&&r(a.params.id)},[]);var w,O=function(e){return function(t){t.persist(),b({key:e,value:t.target.value})}};return d&&!0===d?z:o.a.createElement(o.a.Fragment,null,J("div",{},void 0,J("div",{className:"flex justify-between mt-3 mb-3"},void 0,J(S.a,{},void 0,J(h.IconButton,{className:"".concat(c.backbtn," cursor-pointer"),onClick:function(){s("/admin/service-category-manage")},"aria-label":"Back"},void 0,G),a&&a.params&&a.params.id?"Edit Service Category":"Add Service Category")),J(C.a,{},void 0,J("div",{className:"w-full md:w-1/2 pb-4"},void 0,J(I.a,{label:"Title",inputclassName:"inputbox",inputid:"grid-title",inputType:"text",value:i.title,onChange:O("title"),error:l.title})),J("div",{className:"w-full md:w-1/2 pb-4"},void 0,J(I.a,{label:"Order",inputclassName:"inputbox",inputid:"grid-value",inputType:"number",value:i.order,onChange:O("order"),error:l.order})),J("div",{className:"w-full md:w-1/2"},void 0,H,J("textarea",{className:"inputbox",id:"grid-description",type:"text",value:i.description,onChange:O("description")}),J("div",{id:"component-error-text"},void 0,l.description)),J("div",{className:"w-full  pb-4 -mr-2"},void 0,K,J("section",{onClick:function(){g(!0)},style:{width:"50%"},className:"text-black hover:text-primary text-center self-start py-3 px-4 border border-gray-500 rounded-lg border-dashed cursor-pointer"},void 0,L),l&&l.image&&J("div",{id:"component-error-text"},void 0,l.image),i.image&&i.image._id&&J("img",{src:"".concat(B.g).concat(i.image.path),alt:"wanted"})),J(v.a,{control:J(p.a,{checked:i.is_active||!1,tabIndex:-1,onClick:(w="is_active",function(e){e.persist(),b({key:w,value:e.target.checked})}),color:"primary"}),label:"Is Active"}),Q,J("button",{type:"button",className:"text-white py-2 px-4 rounded mt-4 bg-primary uppercase btn-theme",onClick:function(){u()}},void 0,"Save"))),J(D.a,{open:y,onClose:function(){g(!1)},fullWidth:!0,maxWidth:"lg"},void 0,X,J(_.a,{},void 0,J(A.a,{location:location,selectFile:function(e){return function(e){f(e),g(!1)}(e)}}),Y)))})}}]);
=======
(window.webpackJsonp=window.webpackJsonp||[]).push([[265],{bf677770fe7a31ad8726:function(e,t,r){"use strict";r.r(t);var a,n=r("8af190b70a6bc55c6f1b"),o=r.n(n),i=(r("8a2d1b95e05b6a321e74"),r("e95a63b25fb92ed15721")),c=r("a28fc3c963a1d4d1a2e5"),d=r("ab4cb61bcb2dc161defb"),l=r("d7dd51e1bf6bfc2c9c3d"),b=r("3aced5b508e7389026da"),u=(r("f85e09def79cc2a20bc2"),r("4a683f0a5e64e66a8eb9")),s=r.n(u),f=r("c502bee2fd4be3dd7f62"),p=r.n(f),m=r("5c0a236ca4c0b26f32cd"),v=r.n(m),y=r("26682d5d4df1c4fdd619"),g=r.n(y),h=r("0d939196e59ed73c94e6"),w=r("adc20f99e57c573c589c"),O=r("d95b0cf107403b178365"),x=r("5df2663e676f8932a2e3"),j=r("dc2595913ff3ca805cde"),k=r("65f1dbb8558fed00e9af"),N=r("fa7598b71a51184f7700"),S=r("d733903be61208652859"),C=r("5932430beb0c05240602"),P=r("2fad9e66eff5130ad191"),I=r("5cb9d1dda30508c4ab9e"),A=r("059040756c929fa8b9bb"),E=r("e727e731a9bed8ec3c2a"),D=r.n(E),F=r("eb6b79030a47f0b10efc"),R=r.n(F),T=r("1551459233b95bf53af9"),_=r.n(T),B=r("fcb99a06256635f70435");function M(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);t&&(a=a.filter(function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable})),r.push.apply(r,a)}return r}function $(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?M(Object(r),!0).forEach(function(t){q(e,t,r[t])}):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):M(Object(r)).forEach(function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))})}return e}function q(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}function J(e,t,r,n){a||(a="function"===typeof Symbol&&Symbol.for&&Symbol.for("react.element")||60103);var o=e&&e.defaultProps,i=arguments.length-3;if(t||0===i||(t={children:void 0}),1===i)t.children=n;else if(i>1){for(var c=new Array(i),d=0;d<i;d++)c[d]=arguments[d+3];t.children=c}if(t&&o)for(var l in o)void 0===t[l]&&(t[l]=o[l]);else t||(t=o||{});return{$$typeof:a,type:e,key:void 0===r?null:""+r,ref:null,props:t,_owner:null}}function U(e,t){return function(e){if(Array.isArray(e))return e}(e)||function(e,t){var r=null==e?null:"undefined"!==typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(null==r)return;var a,n,o=[],i=!0,c=!1;try{for(r=r.call(e);!(i=(a=r.next()).done)&&(o.push(a.value),!t||o.length!==t);i=!0);}catch(e){c=!0,n=e}finally{try{i||null==r.return||r.return()}finally{if(c)throw n}}return o}(e,t)||function(e,t){if(!e)return;if("string"===typeof e)return W(e,t);var r=Object.prototype.toString.call(e).slice(8,-1);"Object"===r&&e.constructor&&(r=e.constructor.name);if("Map"===r||"Set"===r)return Array.from(e);if("Arguments"===r||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r))return W(e,t)}(e,t)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function W(e,t){(null==t||t>e.length)&&(t=e.length);for(var r=0,a=new Array(t);r<t;r++)a[r]=e[r];return a}var V="serviceCategory",z=J(P.a,{}),G=J(g.a,{}),H=J("label",{className:"block uppercase tracking-wide text-grey-darker text-xs mb-2",htmlFor:"grid-country-code-2"},void 0,"Description"),K=J("label",{className:"block uppercase tracking-wide text-gray-800 text-xs mb-2",htmlFor:"Image"},void 0,"Image"),L=J("button",{type:"button",className:"text-black py-2 px-4 rounded font-bold bg-waftprimary hover:text-primary"},void 0,"Upload Image from Media"),Q=J("br",{}),X=J(R.a,{},void 0,"Select Image"),Y=J("div",{className:"mt-2 text-xs"},void 0,"Note: Please Double Click to open folder and select images."),Z=s()({backbtn:{padding:0,height:"40px",width:"40px",marginTop:"auto",marginBottom:"auto",borderRadius:"50%",marginRight:"5px"}}),ee=Object(O.a)({key:V,reducer:x.a}),te=Object(w.a)({key:V,saga:j.a}),re=Object(c.b)({one:Object(k.d)(),loading:Object(k.c)(),errors:Object(k.b)()}),ae=Object(l.connect)(re,$($({},N),{},{push:b.push}));t.default=Object(d.compose)(i.withRouter,Z,ee,te,ae)(function(e){var t=e.clearErrors,r=e.loadOneRequest,a=e.match,i=e.one,c=e.classes,d=e.loading,l=e.errors,b=e.setOneValue,u=e.addEditRequest,s=e.push,f=e.addFromMedia,m=U(Object(n.useState)(!1),2),y=m[0],g=m[1];Object(n.useEffect)(function(){t(),a.params&&a.params.id&&r(a.params.id)},[]);var w,O=function(e){return function(t){t.persist(),b({key:e,value:t.target.value})}};return d&&!0===d?z:o.a.createElement(o.a.Fragment,null,J("div",{},void 0,J("div",{className:"flex justify-between mt-3 mb-3"},void 0,J(S.a,{},void 0,J(h.IconButton,{className:"".concat(c.backbtn," cursor-pointer"),onClick:function(){s("/admin/service-category-manage")},"aria-label":"Back"},void 0,G),a&&a.params&&a.params.id?"Edit Service Category":"Add Service Category")),J(C.a,{},void 0,J("div",{className:"w-full md:w-1/2 pb-4"},void 0,J(I.a,{label:"Title",inputclassName:"inputbox",inputid:"grid-title",inputType:"text",value:i.title,onChange:O("title"),error:l.title})),J("div",{className:"w-full md:w-1/2 pb-4"},void 0,J(I.a,{label:"Order",inputclassName:"inputbox",inputid:"grid-value",inputType:"number",value:i.order,onChange:O("order"),error:l.order})),J("div",{className:"w-full md:w-1/2"},void 0,H,J("textarea",{className:"inputbox",id:"grid-description",type:"text",value:i.description,onChange:O("description")}),J("div",{id:"component-error-text"},void 0,l.description)),J("div",{className:"w-full  pb-4 -mr-2"},void 0,K,J("section",{onClick:function(){g(!0)},style:{width:"50%"},className:"text-black hover:text-primary text-center self-start py-3 px-4 border border-gray-500 rounded-lg border-dashed cursor-pointer"},void 0,L),l&&l.image&&J("div",{id:"component-error-text"},void 0,l.image),i.image&&i.image._id&&J("img",{src:"".concat(B.g).concat(i.image.path),alt:"wanted"})),J(v.a,{control:J(p.a,{checked:i.is_active||!1,tabIndex:-1,onClick:(w="is_active",function(e){e.persist(),b({key:w,value:e.target.checked})}),color:"primary"}),label:"Is Active"}),Q,J("button",{type:"button",className:"text-white py-2 px-4 rounded mt-4 bg-primary uppercase btn-theme",onClick:function(){u()}},void 0,"Save"))),J(D.a,{open:y,onClose:function(){g(!1)},fullWidth:!0,maxWidth:"lg"},void 0,X,J(_.a,{},void 0,J(A.a,{location:location,selectFile:function(e){return function(e){f(e),g(!1)}(e)}}),Y)))})}}]);
>>>>>>> 41f64895ae2d4aeb7736fd90e084d7a063de2675:client/build/265.4acb3472b6ce091aa256.chunk.js
