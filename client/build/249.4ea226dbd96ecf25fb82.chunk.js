<<<<<<< HEAD:client/build/245.55c7004f7eb36b60b78c.chunk.js
(window.webpackJsonp=window.webpackJsonp||[]).push([[245],{"35fc344798f55b82556a":function(e,t,r){"use strict";r.r(t);var a,n=r("8af190b70a6bc55c6f1b"),o=r.n(n),i=(r("8a2d1b95e05b6a321e74"),r("e95a63b25fb92ed15721")),c=r("a28fc3c963a1d4d1a2e5"),d=r("ab4cb61bcb2dc161defb"),l=r("d7dd51e1bf6bfc2c9c3d"),u=r("3aced5b508e7389026da"),p=(r("f85e09def79cc2a20bc2"),r("4a683f0a5e64e66a8eb9")),s=r.n(p),b=r("c502bee2fd4be3dd7f62"),f=r.n(b),m=r("5c0a236ca4c0b26f32cd"),v=r.n(m),y=r("26682d5d4df1c4fdd619"),g=r.n(y),h=r("0d939196e59ed73c94e6"),w=r("23b8d02be40765ac53e3"),O=r.n(w),j=r("adc20f99e57c573c589c"),x=r("d95b0cf107403b178365"),k=r("4494c0aa19615ae991be"),P=r("87163568714833b04eb5"),N=r("5041d88289802809dfa1"),I=r("4ef19203826896c40d7c"),S=r("d733903be61208652859"),E=r("5932430beb0c05240602"),A=r("2fad9e66eff5130ad191"),R=r("5cb9d1dda30508c4ab9e"),C=r("fcb99a06256635f70435");function D(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);t&&(a=a.filter(function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable})),r.push.apply(r,a)}return r}function T(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?D(Object(r),!0).forEach(function(t){F(e,t,r[t])}):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):D(Object(r)).forEach(function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))})}return e}function F(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}function B(e,t,r,n){a||(a="function"===typeof Symbol&&Symbol.for&&Symbol.for("react.element")||60103);var o=e&&e.defaultProps,i=arguments.length-3;if(t||0===i||(t={children:void 0}),1===i)t.children=n;else if(i>1){for(var c=new Array(i),d=0;d<i;d++)c[d]=arguments[d+3];t.children=c}if(t&&o)for(var l in o)void 0===t[l]&&(t[l]=o[l]);else t||(t=o||{});return{$$typeof:a,type:e,key:void 0===r?null:""+r,ref:null,props:t,_owner:null}}function $(e,t){return function(e){if(Array.isArray(e))return e}(e)||function(e,t){var r=null==e?null:"undefined"!==typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(null==r)return;var a,n,o=[],i=!0,c=!1;try{for(r=r.call(e);!(i=(a=r.next()).done)&&(o.push(a.value),!t||o.length!==t);i=!0);}catch(e){c=!0,n=e}finally{try{i||null==r.return||r.return()}finally{if(c)throw n}}return o}(e,t)||function(e,t){if(!e)return;if("string"===typeof e)return _(e,t);var r=Object.prototype.toString.call(e).slice(8,-1);"Object"===r&&e.constructor&&(r=e.constructor.name);if("Map"===r||"Set"===r)return Array.from(e);if("Arguments"===r||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r))return _(e,t)}(e,t)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function _(e,t){(null==t||t>e.length)&&(t=e.length);for(var r=0,a=new Array(t);r<t;r++)a[r]=e[r];return a}var q="propertyPurpose",J=B(A.a,{}),L=B(g.a,{}),U=B("label",{className:"block uppercase tracking-wide text-grey-darker text-xs mb-2",htmlFor:"grid-title"},void 0,"Description"),V=B("label",{className:"block uppercase tracking-wide text-gray-800 text-xs mb-2",htmlFor:"Image"},void 0,"Image"),M=B("br",{}),z=s()({backbtn:{padding:0,height:"40px",width:"40px",marginTop:"auto",marginBottom:"auto",borderRadius:"50%",marginRight:"5px"}}),G=Object(c.b)({one:Object(N.d)(),loading:Object(N.c)(),errors:Object(N.b)(),tempImage:Object(N.f)()}),H=Object(l.connect)(G,T(T({},I),{},{push:u.push}));t.default=Object(d.compose)(i.withRouter,z,H)(function(e){var t=e.clearErrors,r=e.loadOneRequest,a=e.match,i=e.one,c=e.classes,d=e.loading,l=e.errors,u=e.setOneValue,p=e.addEditRequest,s=e.tempImage,b=e.setTempImageValue;Object(x.b)({key:q,reducer:k.a}),Object(j.b)({key:q,saga:P.a}),Object(n.useEffect)(function(){t(),a.params&&a.params.id&&r(a.params.id)},[]);var m,y=$(Object(n.useState)(!1),2),g=y[0],w=y[1],N=function(e){return function(t){t.persist(),u({key:e,value:t.target.value})}};return d?J:o.a.createElement(o.a.Fragment,null,B("div",{},void 0,B("div",{className:"flex justify-between mt-3 mb-3"},void 0,B(S.a,{},void 0,B(h.IconButton,{className:"".concat(c.backbtn," cursor-pointer"),onClick:function(){e.push("/admin/property-purpose")},"aria-label":"Back"},void 0,L),a&&a.params&&a.params.id?"Edit Property Purpose":"Add Propert Purpose")),B(E.a,{},void 0,B("div",{className:"w-full md:w-1/2 pb-4"},void 0,B(R.a,{label:"Title",inputclassName:"inputbox",inputid:"grid-title",inputType:"text",value:i.title,onChange:N("title"),error:l.title})),B("div",{className:"w-full md:w-1/2 pb-4"},void 0,B(R.a,{label:"Order",inputclassName:"inputbox",inputid:"grid-value",inputType:"number",value:i.order,onChange:N("order"),error:l.order})),B("div",{className:"w-full md:w-1/2"},void 0,U,B("textarea",{className:"inputbox",id:"grid-description",type:"text",value:i.description,onChange:N("description")}),B("div",{id:"component-error-text"},void 0,l.order)),B("div",{className:"w-full md:w-1/2 pb-4 mt-4"},void 0,V,B(O.a,{onDrop:function(e){return function(e,t){w(!0);var r=e[0];u({key:[t],value:r});var a=new FileReader;a.addEventListener("load",function(){b(a.result)},!1),a.readAsDataURL(r)}(e,"media")}},void 0,function(e){var t=e.getRootProps,r=e.getInputProps;return o.a.createElement("div",t(),o.a.createElement("input",r()),B("img",g?{className:"inputbox cursor-pointer",src:s,alt:"Property Purpose",style:{height:"120px",width:"120px"}}:{className:"inputbox cursor-pointer",src:i.media&&i.media.path?"".concat(C.g).concat(i.media.path):s,alt:"Property purpose",style:{height:"120px",width:"120px"}}))})),B(v.a,{control:B(f.a,{checked:i.is_active||!1,tabIndex:-1,onClick:(m="is_active",function(e){e.persist(),u({key:m,value:e.target.checked})}),color:"primary"}),label:"Is Active"}),M,B("button",{type:"button",className:"text-white py-2 px-4 rounded mt-4 bg-primary uppercase btn-theme",onClick:function(){p()}},void 0,"Save"))))})}}]);
=======
(window.webpackJsonp=window.webpackJsonp||[]).push([[249],{"35fc344798f55b82556a":function(e,t,r){"use strict";r.r(t);var a,n=r("8af190b70a6bc55c6f1b"),o=r.n(n),i=(r("8a2d1b95e05b6a321e74"),r("e95a63b25fb92ed15721")),c=r("a28fc3c963a1d4d1a2e5"),d=r("ab4cb61bcb2dc161defb"),l=r("d7dd51e1bf6bfc2c9c3d"),u=r("3aced5b508e7389026da"),p=(r("f85e09def79cc2a20bc2"),r("4a683f0a5e64e66a8eb9")),s=r.n(p),b=r("c502bee2fd4be3dd7f62"),f=r.n(b),m=r("5c0a236ca4c0b26f32cd"),v=r.n(m),y=r("26682d5d4df1c4fdd619"),g=r.n(y),h=r("0d939196e59ed73c94e6"),w=r("23b8d02be40765ac53e3"),O=r.n(w),j=r("adc20f99e57c573c589c"),x=r("d95b0cf107403b178365"),k=r("4494c0aa19615ae991be"),P=r("87163568714833b04eb5"),N=r("5041d88289802809dfa1"),I=r("4ef19203826896c40d7c"),S=r("d733903be61208652859"),E=r("5932430beb0c05240602"),A=r("2fad9e66eff5130ad191"),R=r("5cb9d1dda30508c4ab9e"),C=r("fcb99a06256635f70435");function D(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);t&&(a=a.filter(function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable})),r.push.apply(r,a)}return r}function T(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?D(Object(r),!0).forEach(function(t){F(e,t,r[t])}):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):D(Object(r)).forEach(function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))})}return e}function F(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}function B(e,t,r,n){a||(a="function"===typeof Symbol&&Symbol.for&&Symbol.for("react.element")||60103);var o=e&&e.defaultProps,i=arguments.length-3;if(t||0===i||(t={children:void 0}),1===i)t.children=n;else if(i>1){for(var c=new Array(i),d=0;d<i;d++)c[d]=arguments[d+3];t.children=c}if(t&&o)for(var l in o)void 0===t[l]&&(t[l]=o[l]);else t||(t=o||{});return{$$typeof:a,type:e,key:void 0===r?null:""+r,ref:null,props:t,_owner:null}}function $(e,t){return function(e){if(Array.isArray(e))return e}(e)||function(e,t){var r=null==e?null:"undefined"!==typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(null==r)return;var a,n,o=[],i=!0,c=!1;try{for(r=r.call(e);!(i=(a=r.next()).done)&&(o.push(a.value),!t||o.length!==t);i=!0);}catch(e){c=!0,n=e}finally{try{i||null==r.return||r.return()}finally{if(c)throw n}}return o}(e,t)||function(e,t){if(!e)return;if("string"===typeof e)return _(e,t);var r=Object.prototype.toString.call(e).slice(8,-1);"Object"===r&&e.constructor&&(r=e.constructor.name);if("Map"===r||"Set"===r)return Array.from(e);if("Arguments"===r||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r))return _(e,t)}(e,t)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function _(e,t){(null==t||t>e.length)&&(t=e.length);for(var r=0,a=new Array(t);r<t;r++)a[r]=e[r];return a}var q="propertyPurpose",J=B(A.a,{}),L=B(g.a,{}),U=B("label",{className:"block uppercase tracking-wide text-grey-darker text-xs mb-2",htmlFor:"grid-title"},void 0,"Description"),V=B("label",{className:"block uppercase tracking-wide text-gray-800 text-xs mb-2",htmlFor:"Image"},void 0,"Image"),M=B("br",{}),z=s()({backbtn:{padding:0,height:"40px",width:"40px",marginTop:"auto",marginBottom:"auto",borderRadius:"50%",marginRight:"5px"}}),G=Object(c.b)({one:Object(N.d)(),loading:Object(N.c)(),errors:Object(N.b)(),tempImage:Object(N.f)()}),H=Object(l.connect)(G,T(T({},I),{},{push:u.push}));t.default=Object(d.compose)(i.withRouter,z,H)(function(e){var t=e.clearErrors,r=e.loadOneRequest,a=e.match,i=e.one,c=e.classes,d=e.loading,l=e.errors,u=e.setOneValue,p=e.addEditRequest,s=e.tempImage,b=e.setTempImageValue;Object(x.b)({key:q,reducer:k.a}),Object(j.b)({key:q,saga:P.a}),Object(n.useEffect)(function(){t(),a.params&&a.params.id&&r(a.params.id)},[]);var m,y=$(Object(n.useState)(!1),2),g=y[0],w=y[1],N=function(e){return function(t){t.persist(),u({key:e,value:t.target.value})}};return d?J:o.a.createElement(o.a.Fragment,null,B("div",{},void 0,B("div",{className:"flex justify-between mt-3 mb-3"},void 0,B(S.a,{},void 0,B(h.IconButton,{className:"".concat(c.backbtn," cursor-pointer"),onClick:function(){e.push("/admin/property-purpose")},"aria-label":"Back"},void 0,L),a&&a.params&&a.params.id?"Edit Property Purpose":"Add Propert Purpose")),B(E.a,{},void 0,B("div",{className:"w-full md:w-1/2 pb-4"},void 0,B(R.a,{label:"Title",inputclassName:"inputbox",inputid:"grid-title",inputType:"text",value:i.title,onChange:N("title"),error:l.title})),B("div",{className:"w-full md:w-1/2 pb-4"},void 0,B(R.a,{label:"Order",inputclassName:"inputbox",inputid:"grid-value",inputType:"number",value:i.order,onChange:N("order"),error:l.order})),B("div",{className:"w-full md:w-1/2"},void 0,U,B("textarea",{className:"inputbox",id:"grid-description",type:"text",value:i.description,onChange:N("description")}),B("div",{id:"component-error-text"},void 0,l.order)),B("div",{className:"w-full md:w-1/2 pb-4 mt-4"},void 0,V,B(O.a,{onDrop:function(e){return function(e,t){w(!0);var r=e[0];u({key:[t],value:r});var a=new FileReader;a.addEventListener("load",function(){b(a.result)},!1),a.readAsDataURL(r)}(e,"media")}},void 0,function(e){var t=e.getRootProps,r=e.getInputProps;return o.a.createElement("div",t(),o.a.createElement("input",r()),B("img",g?{className:"inputbox cursor-pointer",src:s,alt:"Property Purpose",style:{height:"120px",width:"120px"}}:{className:"inputbox cursor-pointer",src:i.media&&i.media.path?"".concat(C.g).concat(i.media.path):s,alt:"Property purpose",style:{height:"120px",width:"120px"}}))})),B(v.a,{control:B(f.a,{checked:i.is_active||!1,tabIndex:-1,onClick:(m="is_active",function(e){e.persist(),u({key:m,value:e.target.checked})}),color:"primary"}),label:"Is Active"}),M,B("button",{type:"button",className:"text-white py-2 px-4 rounded mt-4 bg-primary uppercase btn-theme",onClick:function(){p()}},void 0,"Save"))))})}}]);
>>>>>>> 41f64895ae2d4aeb7736fd90e084d7a063de2675:client/build/249.4ea226dbd96ecf25fb82.chunk.js