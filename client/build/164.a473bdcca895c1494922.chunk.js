<<<<<<< HEAD:client/build/164.a473bdcca895c1494922.chunk.js
(window.webpackJsonp=window.webpackJsonp||[]).push([[164],{"433580aac093265f466f":function(e,t,r){"use strict";r.r(t);var a,n=r("8af190b70a6bc55c6f1b"),i=r.n(n),o=(r("8a2d1b95e05b6a321e74"),r("e95a63b25fb92ed15721")),c=r("a28fc3c963a1d4d1a2e5"),l=r("ab4cb61bcb2dc161defb"),d=r("d7dd51e1bf6bfc2c9c3d"),s=r("3aced5b508e7389026da"),u=(r("f85e09def79cc2a20bc2"),r("23b8d02be40765ac53e3")),b=r.n(u),p=r("4a683f0a5e64e66a8eb9"),f=r.n(p),m=r("c502bee2fd4be3dd7f62"),g=r.n(m),v=r("5c0a236ca4c0b26f32cd"),y=r.n(v),h=r("26682d5d4df1c4fdd619"),x=r.n(h),k=r("0d939196e59ed73c94e6"),w=r("adc20f99e57c573c589c"),O=r("d95b0cf107403b178365"),_=r("4a086ae412af213825d8"),j=r("ebda53ec1f8bdf415a6c"),N=r("3b8b53c48d51495ea469"),I=r("7a71265627a473350574"),P=r("d733903be61208652859"),S=r("5932430beb0c05240602"),R=r("2fad9e66eff5130ad191"),T=(r("b64d871fc84f55650602"),r("fcb99a06256635f70435"));function A(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);t&&(a=a.filter(function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable})),r.push.apply(r,a)}return r}function F(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?A(Object(r),!0).forEach(function(t){E(e,t,r[t])}):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):A(Object(r)).forEach(function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))})}return e}function E(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}function M(e,t,r,n){a||(a="function"===typeof Symbol&&Symbol.for&&Symbol.for("react.element")||60103);var i=e&&e.defaultProps,o=arguments.length-3;if(t||0===o||(t={children:void 0}),1===o)t.children=n;else if(o>1){for(var c=new Array(o),l=0;l<o;l++)c[l]=arguments[l+3];t.children=c}if(t&&i)for(var d in i)void 0===t[d]&&(t[d]=i[d]);else t||(t=i||{});return{$$typeof:a,type:e,key:void 0===r?null:""+r,ref:null,props:t,_owner:null}}function B(e,t){return function(e){if(Array.isArray(e))return e}(e)||function(e,t){var r=null==e?null:"undefined"!==typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(null==r)return;var a,n,i=[],o=!0,c=!1;try{for(r=r.call(e);!(o=(a=r.next()).done)&&(i.push(a.value),!t||i.length!==t);o=!0);}catch(e){c=!0,n=e}finally{try{o||null==r.return||r.return()}finally{if(c)throw n}}return i}(e,t)||function(e,t){if(!e)return;if("string"===typeof e)return D(e,t);var r=Object.prototype.toString.call(e).slice(8,-1);"Object"===r&&e.constructor&&(r=e.constructor.name);if("Map"===r||"Set"===r)return Array.from(e);if("Arguments"===r||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r))return D(e,t)}(e,t)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function D(e,t){(null==t||t>e.length)&&(t=e.length);for(var r=0,a=new Array(t);r<t;r++)a[r]=e[r];return a}var C=M(R.a,{}),L=M(x.a,{}),V=M("label",{className:"block uppercase tracking-wide text-grey-darker text-xs mb-2",htmlFor:"grid-title"},void 0,"Bank Name"),$=M("label",{className:"block uppercase tracking-wide text-grey-darker text-xs mb-2",htmlFor:"grid-title"},void 0,"Rate of Interest"),q=M("label",{className:"block uppercase tracking-wide text-grey-darker text-xs mb-2",htmlFor:"grid-title"},void 0,"Processing fees"),J=M("label",{className:"block uppercase tracking-wide text-grey-darker text-xs mb-2",htmlFor:"grid-title"},void 0,"Max tenure"),U=M("label",{className:"block uppercase tracking-wide text-grey-darker text-xs mb-2",htmlFor:"grid-title"},void 0,"Min tenure"),z=M("label",{className:"block uppercase tracking-wide text-gray-800 text-xs mb-2",htmlFor:"Image"},void 0,"Image"),G=f()({backbtn:{padding:0,height:"40px",width:"40px",marginTop:"auto",marginBottom:"auto",borderRadius:"50%",marginRight:"5px"}}),H=Object(O.a)({key:"bankDetail",reducer:_.a}),K=Object(w.a)({key:"bankDetail",saga:j.a}),Q=Object(c.b)({one:Object(N.d)(),loading:Object(N.c)(),errors:Object(N.b)(),tempImage:Object(N.f)()}),W=Object(d.connect)(Q,F(F({},I),{},{push:s.push}));t.default=Object(l.compose)(o.withRouter,G,H,K,W)(function(e){var t=e.clearErrors,r=e.loadOneRequest,a=e.match,o=e.one,c=e.classes,l=e.loading,d=e.errors,s=e.setOneValue,u=e.addEditRequest,p=e.push,f=e.tempImage,m=e.setTempImageValue;Object(n.useEffect)(function(){t(),a.params&&a.params.id&&r(a.params.id)},[]);var v,h=B(Object(n.useState)(!1),2),x=h[0],w=h[1],O=function(e){return function(t){t.persist(),s({key:e,value:t.target.value})}};return l&&!0===l?C:i.a.createElement(i.a.Fragment,null,M("div",{},void 0,M("div",{className:"flex justify-between mt-3 mb-3"},void 0,M(P.a,{},void 0,M(k.IconButton,{className:"".concat(c.backbtn," cursor-pointer"),onClick:function(){p("/admin/banks")},"aria-label":"Back"},void 0,L),a&&a.params&&a.params.id?"Edit Bank":"Add Bank")),M(S.a,{},void 0,M("div",{className:"w-full md:w-1/2 pb-4"},void 0,V,M("input",{className:"inputbox",id:"grid-title",type:"text",value:o.Bank_Name,onChange:O("Bank_Name")}),M("div",{id:"component-error-text"},void 0,d.Bank_Name&&d.Bank_Name)),M("div",{className:"w-full md:w-1/2 pb-4"},void 0,$,M("input",{className:"inputbox",id:"grid-title",type:"text",value:o.Rate_Of_interest,onChange:O("Rate_Of_interest")}),M("div",{id:"component-error-text"},void 0,d.Rate_Of_interest&&d.Rate_Of_interest)),M("div",{className:"w-full md:w-1/2"},void 0,q,M("input",{className:"inputbox",id:"grid-title",type:"text",value:o.Processing_Fees,onChange:O("Processing_Fees")}),M("div",{id:"component-error-text"},void 0,d.Processing_Fees&&d.Processing_Fees)),M("div",{className:"w-full md:w-1/2"},void 0,J,M("input",{className:"inputbox",id:"grid-title",type:"number",value:o.Max_Tenure,onChange:O("Max_Tenure")}),M("div",{id:"component-error-text"},void 0,d.Max_Tenure&&d.Max_Tenure)),M("div",{className:"w-full md:w-1/2"},void 0,U,M("input",{className:"inputbox",id:"grid-title",type:"number",value:o.Min_Tenure,onChange:O("Min_Tenure")}),M("div",{id:"component-error-text"},void 0,d.Min_Tenure&&d.Min_Tenure)),M("div",{className:"w-full md:w-1/2 pb-4 mt-4"},void 0,z,M(b.a,{onDrop:function(e){return function(e,t){w(!0);var r=e[0];s({key:[t],value:r});var a=new FileReader;a.addEventListener("load",function(){m(a.result)},!1),a.readAsDataURL(r)}(e,"Logo")}},void 0,function(e){var t=e.getRootProps,r=e.getInputProps;return i.a.createElement("div",t(),i.a.createElement("input",r()),M("img",x?{className:"inputbox cursor-pointer",src:f,alt:"Developerimage",style:{height:"120px",width:"60%"}}:{className:"inputbox cursor-pointer",src:o.Logo&&o.Logo.path?"".concat(T.g).concat(o.Logo.path):f,alt:"Developerimage",style:{height:"120px",width:"60%"}}))})),M(y.a,{control:M(g.a,{checked:o.IS_Include_VAT||!1,tabIndex:-1,onClick:(v="IS_Include_VAT",function(e){e.persist(),s({key:v,value:e.target.checked})}),color:"primary"}),label:"Is Active"}),M("button",{type:"button",className:"text-white py-2 px-4 rounded mt-4 bg-primary uppercase btn-theme",onClick:function(){u()}},void 0,"Save"))))})}}]);
=======
(window.webpackJsonp=window.webpackJsonp||[]).push([[167],{"433580aac093265f466f":function(e,t,r){"use strict";r.r(t);var a,n=r("8af190b70a6bc55c6f1b"),i=r.n(n),o=(r("8a2d1b95e05b6a321e74"),r("e95a63b25fb92ed15721")),c=r("a28fc3c963a1d4d1a2e5"),l=r("ab4cb61bcb2dc161defb"),d=r("d7dd51e1bf6bfc2c9c3d"),s=r("3aced5b508e7389026da"),u=(r("f85e09def79cc2a20bc2"),r("23b8d02be40765ac53e3")),b=r.n(u),p=r("4a683f0a5e64e66a8eb9"),f=r.n(p),m=r("c502bee2fd4be3dd7f62"),g=r.n(m),v=r("5c0a236ca4c0b26f32cd"),y=r.n(v),h=r("26682d5d4df1c4fdd619"),x=r.n(h),k=r("0d939196e59ed73c94e6"),w=r("adc20f99e57c573c589c"),O=r("d95b0cf107403b178365"),_=r("4a086ae412af213825d8"),j=r("ebda53ec1f8bdf415a6c"),N=r("3b8b53c48d51495ea469"),I=r("7a71265627a473350574"),P=r("d733903be61208652859"),S=r("5932430beb0c05240602"),R=r("2fad9e66eff5130ad191"),T=(r("b64d871fc84f55650602"),r("fcb99a06256635f70435"));function A(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);t&&(a=a.filter(function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable})),r.push.apply(r,a)}return r}function F(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?A(Object(r),!0).forEach(function(t){E(e,t,r[t])}):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):A(Object(r)).forEach(function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))})}return e}function E(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}function M(e,t,r,n){a||(a="function"===typeof Symbol&&Symbol.for&&Symbol.for("react.element")||60103);var i=e&&e.defaultProps,o=arguments.length-3;if(t||0===o||(t={children:void 0}),1===o)t.children=n;else if(o>1){for(var c=new Array(o),l=0;l<o;l++)c[l]=arguments[l+3];t.children=c}if(t&&i)for(var d in i)void 0===t[d]&&(t[d]=i[d]);else t||(t=i||{});return{$$typeof:a,type:e,key:void 0===r?null:""+r,ref:null,props:t,_owner:null}}function B(e,t){return function(e){if(Array.isArray(e))return e}(e)||function(e,t){var r=null==e?null:"undefined"!==typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(null==r)return;var a,n,i=[],o=!0,c=!1;try{for(r=r.call(e);!(o=(a=r.next()).done)&&(i.push(a.value),!t||i.length!==t);o=!0);}catch(e){c=!0,n=e}finally{try{o||null==r.return||r.return()}finally{if(c)throw n}}return i}(e,t)||function(e,t){if(!e)return;if("string"===typeof e)return D(e,t);var r=Object.prototype.toString.call(e).slice(8,-1);"Object"===r&&e.constructor&&(r=e.constructor.name);if("Map"===r||"Set"===r)return Array.from(e);if("Arguments"===r||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r))return D(e,t)}(e,t)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function D(e,t){(null==t||t>e.length)&&(t=e.length);for(var r=0,a=new Array(t);r<t;r++)a[r]=e[r];return a}var C=M(R.a,{}),L=M(x.a,{}),V=M("label",{className:"block uppercase tracking-wide text-grey-darker text-xs mb-2",htmlFor:"grid-title"},void 0,"Bank Name"),$=M("label",{className:"block uppercase tracking-wide text-grey-darker text-xs mb-2",htmlFor:"grid-title"},void 0,"Rate of Interest"),q=M("label",{className:"block uppercase tracking-wide text-grey-darker text-xs mb-2",htmlFor:"grid-title"},void 0,"Processing fees"),J=M("label",{className:"block uppercase tracking-wide text-grey-darker text-xs mb-2",htmlFor:"grid-title"},void 0,"Max tenure"),U=M("label",{className:"block uppercase tracking-wide text-grey-darker text-xs mb-2",htmlFor:"grid-title"},void 0,"Min tenure"),z=M("label",{className:"block uppercase tracking-wide text-gray-800 text-xs mb-2",htmlFor:"Image"},void 0,"Image"),G=f()({backbtn:{padding:0,height:"40px",width:"40px",marginTop:"auto",marginBottom:"auto",borderRadius:"50%",marginRight:"5px"}}),H=Object(O.a)({key:"bankDetail",reducer:_.a}),K=Object(w.a)({key:"bankDetail",saga:j.a}),Q=Object(c.b)({one:Object(N.d)(),loading:Object(N.c)(),errors:Object(N.b)(),tempImage:Object(N.f)()}),W=Object(d.connect)(Q,F(F({},I),{},{push:s.push}));t.default=Object(l.compose)(o.withRouter,G,H,K,W)(function(e){var t=e.clearErrors,r=e.loadOneRequest,a=e.match,o=e.one,c=e.classes,l=e.loading,d=e.errors,s=e.setOneValue,u=e.addEditRequest,p=e.push,f=e.tempImage,m=e.setTempImageValue;Object(n.useEffect)(function(){t(),a.params&&a.params.id&&r(a.params.id)},[]);var v,h=B(Object(n.useState)(!1),2),x=h[0],w=h[1],O=function(e){return function(t){t.persist(),s({key:e,value:t.target.value})}};return l&&!0===l?C:i.a.createElement(i.a.Fragment,null,M("div",{},void 0,M("div",{className:"flex justify-between mt-3 mb-3"},void 0,M(P.a,{},void 0,M(k.IconButton,{className:"".concat(c.backbtn," cursor-pointer"),onClick:function(){p("/admin/banks")},"aria-label":"Back"},void 0,L),a&&a.params&&a.params.id?"Edit Bank":"Add Bank")),M(S.a,{},void 0,M("div",{className:"w-full md:w-1/2 pb-4"},void 0,V,M("input",{className:"inputbox",id:"grid-title",type:"text",value:o.Bank_Name,onChange:O("Bank_Name")}),M("div",{id:"component-error-text"},void 0,d.Bank_Name&&d.Bank_Name)),M("div",{className:"w-full md:w-1/2 pb-4"},void 0,$,M("input",{className:"inputbox",id:"grid-title",type:"text",value:o.Rate_Of_interest,onChange:O("Rate_Of_interest")}),M("div",{id:"component-error-text"},void 0,d.Rate_Of_interest&&d.Rate_Of_interest)),M("div",{className:"w-full md:w-1/2"},void 0,q,M("input",{className:"inputbox",id:"grid-title",type:"text",value:o.Processing_Fees,onChange:O("Processing_Fees")}),M("div",{id:"component-error-text"},void 0,d.Processing_Fees&&d.Processing_Fees)),M("div",{className:"w-full md:w-1/2"},void 0,J,M("input",{className:"inputbox",id:"grid-title",type:"number",value:o.Max_Tenure,onChange:O("Max_Tenure")}),M("div",{id:"component-error-text"},void 0,d.Max_Tenure&&d.Max_Tenure)),M("div",{className:"w-full md:w-1/2"},void 0,U,M("input",{className:"inputbox",id:"grid-title",type:"number",value:o.Min_Tenure,onChange:O("Min_Tenure")}),M("div",{id:"component-error-text"},void 0,d.Min_Tenure&&d.Min_Tenure)),M("div",{className:"w-full md:w-1/2 pb-4 mt-4"},void 0,z,M(b.a,{onDrop:function(e){return function(e,t){w(!0);var r=e[0];s({key:[t],value:r});var a=new FileReader;a.addEventListener("load",function(){m(a.result)},!1),a.readAsDataURL(r)}(e,"Logo")}},void 0,function(e){var t=e.getRootProps,r=e.getInputProps;return i.a.createElement("div",t(),i.a.createElement("input",r()),M("img",x?{className:"inputbox cursor-pointer",src:f,alt:"Developerimage",style:{height:"120px",width:"60%"}}:{className:"inputbox cursor-pointer",src:o.Logo&&o.Logo.path?"".concat(T.g).concat(o.Logo.path):f,alt:"Developerimage",style:{height:"120px",width:"60%"}}))})),M(y.a,{control:M(g.a,{checked:o.IS_Include_VAT||!1,tabIndex:-1,onClick:(v="IS_Include_VAT",function(e){e.persist(),s({key:v,value:e.target.checked})}),color:"primary"}),label:"Is Active"}),M("button",{type:"button",className:"text-white py-2 px-4 rounded mt-4 bg-primary uppercase btn-theme",onClick:function(){u()}},void 0,"Save"))))})}}]);
>>>>>>> 41f64895ae2d4aeb7736fd90e084d7a063de2675:client/build/167.9881a97b28145137b0fc.chunk.js