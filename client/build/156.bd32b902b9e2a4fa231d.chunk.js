<<<<<<< HEAD:client/build/156.bd32b902b9e2a4fa231d.chunk.js
(window.webpackJsonp=window.webpackJsonp||[]).push([[156],{d8a955f0480e655a842d:function(e,t,r){"use strict";r.r(t);var a,n=r("8af190b70a6bc55c6f1b"),i=r.n(n),c=(r("8a2d1b95e05b6a321e74"),r("e95a63b25fb92ed15721")),o=r("a28fc3c963a1d4d1a2e5"),d=r("ab4cb61bcb2dc161defb"),l=r("d7dd51e1bf6bfc2c9c3d"),u=r("3aced5b508e7389026da"),b=(r("f85e09def79cc2a20bc2"),r("23b8d02be40765ac53e3")),s=r.n(b),p=r("4a683f0a5e64e66a8eb9"),f=r.n(p),m=r("c502bee2fd4be3dd7f62"),v=r.n(m),y=r("5c0a236ca4c0b26f32cd"),g=r.n(y),h=r("26682d5d4df1c4fdd619"),w=r.n(h),O=r("0d939196e59ed73c94e6"),j=r("adc20f99e57c573c589c"),x=r("d95b0cf107403b178365"),k=r("fdba76a624bbc946bcd6"),N=r("7a93fc7b6789b9fffdeb"),A=r("5fb91283b232e0957c5d"),I=r("998748e2cab0d79b46c3"),P=r("d733903be61208652859"),S=r("5932430beb0c05240602"),E=r("2fad9e66eff5130ad191"),R=(r("b64d871fc84f55650602"),r("fcb99a06256635f70435")),C=r("5cb9d1dda30508c4ab9e");function D(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);t&&(a=a.filter(function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable})),r.push.apply(r,a)}return r}function T(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?D(Object(r),!0).forEach(function(t){F(e,t,r[t])}):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):D(Object(r)).forEach(function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))})}return e}function F(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}function B(e,t,r,n){a||(a="function"===typeof Symbol&&Symbol.for&&Symbol.for("react.element")||60103);var i=e&&e.defaultProps,c=arguments.length-3;if(t||0===c||(t={children:void 0}),1===c)t.children=n;else if(c>1){for(var o=new Array(c),d=0;d<c;d++)o[d]=arguments[d+3];t.children=o}if(t&&i)for(var l in i)void 0===t[l]&&(t[l]=i[l]);else t||(t=i||{});return{$$typeof:a,type:e,key:void 0===r?null:""+r,ref:null,props:t,_owner:null}}function $(e,t){return function(e){if(Array.isArray(e))return e}(e)||function(e,t){var r=null==e?null:"undefined"!==typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(null==r)return;var a,n,i=[],c=!0,o=!1;try{for(r=r.call(e);!(c=(a=r.next()).done)&&(i.push(a.value),!t||i.length!==t);c=!0);}catch(e){o=!0,n=e}finally{try{c||null==r.return||r.return()}finally{if(o)throw n}}return i}(e,t)||function(e,t){if(!e)return;if("string"===typeof e)return _(e,t);var r=Object.prototype.toString.call(e).slice(8,-1);"Object"===r&&e.constructor&&(r=e.constructor.name);if("Map"===r||"Set"===r)return Array.from(e);if("Arguments"===r||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r))return _(e,t)}(e,t)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function _(e,t){(null==t||t>e.length)&&(t=e.length);for(var r=0,a=new Array(t);r<t;r++)a[r]=e[r];return a}var q=B(E.a,{}),J=B(w.a,{}),L=B("label",{className:"block uppercase tracking-wide text-grey-darker text-xs mb-2",htmlFor:"grid-country-code-2"},void 0,"Description"),U=B("label",{className:"block uppercase tracking-wide text-gray-800 text-xs mb-2",htmlFor:"Image"},void 0,"Image"),V=f()({backbtn:{padding:0,height:"40px",width:"40px",marginTop:"auto",marginBottom:"auto",borderRadius:"50%",marginRight:"5px"}}),M=Object(x.a)({key:"amenities",reducer:k.a}),z=Object(j.a)({key:"amenities",saga:N.a}),G=Object(o.b)({one:Object(A.d)(),loading:Object(A.c)(),errors:Object(A.b)(),tempImage:Object(A.f)()}),H=Object(l.connect)(G,T(T({},I),{},{push:u.push}));t.default=Object(d.compose)(c.withRouter,V,M,z,H)(function(e){var t=e.clearErrors,r=e.loadOneRequest,a=e.match,c=e.one,o=e.classes,d=e.loading,l=e.errors,u=e.setOneValue,b=e.addEditRequest,p=e.push,f=e.tempImage,m=e.setTempImageValue;Object(n.useEffect)(function(){t(),a.params&&a.params.id&&r(a.params.id)},[]);var y,h=$(Object(n.useState)(!1),2),w=h[0],j=h[1],x=function(e){return function(t){t.persist(),u({key:e,value:t.target.value})}};return d&&!0===d?q:i.a.createElement(i.a.Fragment,null,B("div",{},void 0,B("div",{className:"flex justify-between mt-3 mb-3"},void 0,B(P.a,{},void 0,B(O.IconButton,{className:"".concat(o.backbtn," cursor-pointer"),onClick:function(){p("/admin/amenities")},"aria-label":"Back"},void 0,J),a&&a.params&&a.params.id?"Edit amenities":"Add amenities")),B(S.a,{},void 0,B("div",{className:"w-full md:w-1/2 pb-4"},void 0,B(C.a,{label:"Title",inputclassName:"inputbox",inputid:"grid-title",inputType:"text",value:c.title,onChange:x("title"),error:l.title})),B("div",{className:"w-full md:w-1/2 pb-4"},void 0,B(C.a,{label:"Order",inputclassName:"inputbox",inputid:"grid-value",inputType:"number",value:c.order,onChange:x("order"),error:l.order})),B("div",{className:"w-full md:w-1/2"},void 0,L,B("textarea",{className:"inputbox",id:"grid-description",type:"text",value:c.description,onChange:x("description")}),B("div",{id:"component-error-text"},void 0,l.description)),B("div",{className:"w-full md:w-1/2 pb-4 mt-4"},void 0,U,B(s.a,{onDrop:function(e){return function(e,t){j(!0);var r=e[0];u({key:[t],value:r});var a=new FileReader;a.addEventListener("load",function(){m(a.result)},!1),a.readAsDataURL(r)}(e,"media")}},void 0,function(e){var t=e.getRootProps,r=e.getInputProps;return i.a.createElement("div",t(),i.a.createElement("input",r()),B("img",w?{className:"inputbox cursor-pointer",src:f,alt:"Amenity",style:{height:"120px",width:"120px"}}:{className:"inputbox cursor-pointer",src:c.media&&c.media.path?"".concat(R.g).concat(c.media.path):f,alt:"Amenity",style:{height:"120px",width:"120px"}}))})),B(g.a,{control:B(v.a,{checked:c.is_active||!1,tabIndex:-1,onClick:(y="is_active",function(e){e.persist(),u({key:y,value:e.target.checked})}),color:"primary"}),label:"Is Active"}),B("button",{type:"button",className:"text-white py-2 px-4 rounded mt-4 bg-primary uppercase btn-theme",onClick:function(){b()}},void 0,"Save"))))})}}]);
=======
(window.webpackJsonp=window.webpackJsonp||[]).push([[159],{d8a955f0480e655a842d:function(e,t,r){"use strict";r.r(t);var a,n=r("8af190b70a6bc55c6f1b"),i=r.n(n),c=(r("8a2d1b95e05b6a321e74"),r("e95a63b25fb92ed15721")),o=r("a28fc3c963a1d4d1a2e5"),d=r("ab4cb61bcb2dc161defb"),l=r("d7dd51e1bf6bfc2c9c3d"),u=r("3aced5b508e7389026da"),b=(r("f85e09def79cc2a20bc2"),r("23b8d02be40765ac53e3")),s=r.n(b),p=r("4a683f0a5e64e66a8eb9"),f=r.n(p),m=r("c502bee2fd4be3dd7f62"),v=r.n(m),y=r("5c0a236ca4c0b26f32cd"),g=r.n(y),h=r("26682d5d4df1c4fdd619"),w=r.n(h),O=r("0d939196e59ed73c94e6"),j=r("adc20f99e57c573c589c"),x=r("d95b0cf107403b178365"),k=r("fdba76a624bbc946bcd6"),N=r("7a93fc7b6789b9fffdeb"),A=r("5fb91283b232e0957c5d"),I=r("998748e2cab0d79b46c3"),P=r("d733903be61208652859"),S=r("5932430beb0c05240602"),E=r("2fad9e66eff5130ad191"),R=(r("b64d871fc84f55650602"),r("fcb99a06256635f70435")),C=r("5cb9d1dda30508c4ab9e");function D(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);t&&(a=a.filter(function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable})),r.push.apply(r,a)}return r}function T(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?D(Object(r),!0).forEach(function(t){F(e,t,r[t])}):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):D(Object(r)).forEach(function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))})}return e}function F(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}function B(e,t,r,n){a||(a="function"===typeof Symbol&&Symbol.for&&Symbol.for("react.element")||60103);var i=e&&e.defaultProps,c=arguments.length-3;if(t||0===c||(t={children:void 0}),1===c)t.children=n;else if(c>1){for(var o=new Array(c),d=0;d<c;d++)o[d]=arguments[d+3];t.children=o}if(t&&i)for(var l in i)void 0===t[l]&&(t[l]=i[l]);else t||(t=i||{});return{$$typeof:a,type:e,key:void 0===r?null:""+r,ref:null,props:t,_owner:null}}function $(e,t){return function(e){if(Array.isArray(e))return e}(e)||function(e,t){var r=null==e?null:"undefined"!==typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(null==r)return;var a,n,i=[],c=!0,o=!1;try{for(r=r.call(e);!(c=(a=r.next()).done)&&(i.push(a.value),!t||i.length!==t);c=!0);}catch(e){o=!0,n=e}finally{try{c||null==r.return||r.return()}finally{if(o)throw n}}return i}(e,t)||function(e,t){if(!e)return;if("string"===typeof e)return _(e,t);var r=Object.prototype.toString.call(e).slice(8,-1);"Object"===r&&e.constructor&&(r=e.constructor.name);if("Map"===r||"Set"===r)return Array.from(e);if("Arguments"===r||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r))return _(e,t)}(e,t)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function _(e,t){(null==t||t>e.length)&&(t=e.length);for(var r=0,a=new Array(t);r<t;r++)a[r]=e[r];return a}var q=B(E.a,{}),J=B(w.a,{}),L=B("label",{className:"block uppercase tracking-wide text-grey-darker text-xs mb-2",htmlFor:"grid-country-code-2"},void 0,"Description"),U=B("label",{className:"block uppercase tracking-wide text-gray-800 text-xs mb-2",htmlFor:"Image"},void 0,"Image"),V=f()({backbtn:{padding:0,height:"40px",width:"40px",marginTop:"auto",marginBottom:"auto",borderRadius:"50%",marginRight:"5px"}}),M=Object(x.a)({key:"amenities",reducer:k.a}),z=Object(j.a)({key:"amenities",saga:N.a}),G=Object(o.b)({one:Object(A.d)(),loading:Object(A.c)(),errors:Object(A.b)(),tempImage:Object(A.f)()}),H=Object(l.connect)(G,T(T({},I),{},{push:u.push}));t.default=Object(d.compose)(c.withRouter,V,M,z,H)(function(e){var t=e.clearErrors,r=e.loadOneRequest,a=e.match,c=e.one,o=e.classes,d=e.loading,l=e.errors,u=e.setOneValue,b=e.addEditRequest,p=e.push,f=e.tempImage,m=e.setTempImageValue;Object(n.useEffect)(function(){t(),a.params&&a.params.id&&r(a.params.id)},[]);var y,h=$(Object(n.useState)(!1),2),w=h[0],j=h[1],x=function(e){return function(t){t.persist(),u({key:e,value:t.target.value})}};return d&&!0===d?q:i.a.createElement(i.a.Fragment,null,B("div",{},void 0,B("div",{className:"flex justify-between mt-3 mb-3"},void 0,B(P.a,{},void 0,B(O.IconButton,{className:"".concat(o.backbtn," cursor-pointer"),onClick:function(){p("/admin/amenities")},"aria-label":"Back"},void 0,J),a&&a.params&&a.params.id?"Edit amenities":"Add amenities")),B(S.a,{},void 0,B("div",{className:"w-full md:w-1/2 pb-4"},void 0,B(C.a,{label:"Title",inputclassName:"inputbox",inputid:"grid-title",inputType:"text",value:c.title,onChange:x("title"),error:l.title})),B("div",{className:"w-full md:w-1/2 pb-4"},void 0,B(C.a,{label:"Order",inputclassName:"inputbox",inputid:"grid-value",inputType:"number",value:c.order,onChange:x("order"),error:l.order})),B("div",{className:"w-full md:w-1/2"},void 0,L,B("textarea",{className:"inputbox",id:"grid-description",type:"text",value:c.description,onChange:x("description")}),B("div",{id:"component-error-text"},void 0,l.description)),B("div",{className:"w-full md:w-1/2 pb-4 mt-4"},void 0,U,B(s.a,{onDrop:function(e){return function(e,t){j(!0);var r=e[0];u({key:[t],value:r});var a=new FileReader;a.addEventListener("load",function(){m(a.result)},!1),a.readAsDataURL(r)}(e,"media")}},void 0,function(e){var t=e.getRootProps,r=e.getInputProps;return i.a.createElement("div",t(),i.a.createElement("input",r()),B("img",w?{className:"inputbox cursor-pointer",src:f,alt:"Amenity",style:{height:"120px",width:"120px"}}:{className:"inputbox cursor-pointer",src:c.media&&c.media.path?"".concat(R.g).concat(c.media.path):f,alt:"Amenity",style:{height:"120px",width:"120px"}}))})),B(g.a,{control:B(v.a,{checked:c.is_active||!1,tabIndex:-1,onClick:(y="is_active",function(e){e.persist(),u({key:y,value:e.target.checked})}),color:"primary"}),label:"Is Active"}),B("button",{type:"button",className:"text-white py-2 px-4 rounded mt-4 bg-primary uppercase btn-theme",onClick:function(){b()}},void 0,"Save"))))})}}]);
>>>>>>> 41f64895ae2d4aeb7736fd90e084d7a063de2675:client/build/159.43730e353fbd4a8ad786.chunk.js
