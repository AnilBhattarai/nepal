<<<<<<< HEAD:client/build/322.f183dd3d354ed4f13486.chunk.js
(window.webpackJsonp=window.webpackJsonp||[]).push([[322],{"237a7b48ef205b110b7e":function(e,a,n){"use strict";n.r(a);var t,o=n("8af190b70a6bc55c6f1b"),i=n.n(o),r=(n("8a2d1b95e05b6a321e74"),n("e95a63b25fb92ed15721")),c=n("a28fc3c963a1d4d1a2e5"),l=n("ab4cb61bcb2dc161defb"),d=n("d7dd51e1bf6bfc2c9c3d"),b=n("3aced5b508e7389026da"),u=(n("f85e09def79cc2a20bc2"),n("4a683f0a5e64e66a8eb9")),f=n.n(u),s=n("c502bee2fd4be3dd7f62"),p=n.n(s),m=n("5c0a236ca4c0b26f32cd"),v=n.n(m),y=n("26682d5d4df1c4fdd619"),h=n.n(y),g=n("0d939196e59ed73c94e6"),w=(n("da010f21fea25912dd9e"),n("6d0b3088082c0f598087")),O=n.n(w),k=n("adc20f99e57c573c589c"),x=n("d95b0cf107403b178365"),j=n("405d149753ab774cff77"),N=n("9f23c06f0536c8f582a5"),P=n("3c96b9432b93bdec9a95"),C=n("9d56412483840c7db38c"),_=n("d733903be61208652859"),S=n("5932430beb0c05240602"),q=n("2fad9e66eff5130ad191"),E=n("5cb9d1dda30508c4ab9e");n("daf935c0d95671762e1e");function F(e,a){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var t=Object.getOwnPropertySymbols(e);a&&(t=t.filter(function(a){return Object.getOwnPropertyDescriptor(e,a).enumerable})),n.push.apply(n,t)}return n}function D(e){for(var a=1;a<arguments.length;a++){var n=null!=arguments[a]?arguments[a]:{};a%2?F(Object(n),!0).forEach(function(a){I(e,a,n[a])}):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):F(Object(n)).forEach(function(a){Object.defineProperty(e,a,Object.getOwnPropertyDescriptor(n,a))})}return e}function I(e,a,n){return a in e?Object.defineProperty(e,a,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[a]=n,e}function T(e,a,n,o){t||(t="function"===typeof Symbol&&Symbol.for&&Symbol.for("react.element")||60103);var i=e&&e.defaultProps,r=arguments.length-3;if(a||0===r||(a={children:void 0}),1===r)a.children=o;else if(r>1){for(var c=new Array(r),l=0;l<r;l++)c[l]=arguments[l+3];a.children=c}if(a&&i)for(var d in i)void 0===a[d]&&(a[d]=i[d]);else a||(a=i||{});return{$$typeof:t,type:e,key:void 0===n?null:""+n,ref:null,props:a,_owner:null}}var L,R="userPersonalInformationPage",A=T(q.a,{}),$=T(h.a,{}),B=T("option",{value:""},void 0,"Choose Channel"),V=T("option",{value:"Facebook"},void 0,"Facebook"),J=T("option",{value:"Via_Phone"},void 0,"Via Phone"),M=T("label",{className:"font-bold text-gray-700",htmlFor:"grid-title"},void 0,"Date"),z=T("label",{className:"font-bold text-gray-700",htmlFor:"grid-title"},void 0,"Inquiry"),G=T("br",{}),H=f()({backbtn:{padding:0,height:"40px",width:"40px",marginTop:"auto",marginBottom:"auto",borderRadius:"50%",marginRight:"5px"}}),K=Object(x.a)({key:R,reducer:j.a}),Q=Object(k.a)({key:R,saga:N.a}),U=Object(c.b)({one:Object(P.m)(),loading:Object(P.o)(),errors:Object(P.k)()}),W=Object(d.connect)(U,D(D({},C),{},{push:b.push})),X=Object(l.compose)(r.withRouter,H,K,Q,W)(function(e){var a=e.clearError,n=(e.loadOneRequest,e.match),t=e.one,r=e.classes,c=e.loading,l=e.errors,d=e.setLeadOne,b=e.addLeadRequest,u=e.push;Object(o.useEffect)(function(){a()},[]);var f,s=function(e){return function(a){a.persist(),d({key:e,value:a.target.value})}};return c&&!0===c?A:i.a.createElement(i.a.Fragment,null,T("div",{},void 0,T("div",{className:"flex justify-between mt-3 mb-3"},void 0,T(_.a,{},void 0,T(g.IconButton,{className:"".concat(r.backbtn," cursor-pointer"),onClick:function(){u("/user/leads")},"aria-label":"Back"},void 0,$),n&&n.params&&n.params.id?"Edit My Lead":"Add My Lead")),T(S.a,{},void 0,T("div",{className:"w-full md:w-1/2 pb-4"},void 0,T("select",{className:"inputbox",value:t.channel,onChange:s("channel")},void 0,B,V,J)),"Facebook"===t.channel&&T("div",{className:"w-full md:w-1/2 pb-4"},void 0,T(E.a,{label:"Profile Link",inputclassName:"inputbox",inputid:"grid-name",inputType:"text",value:t.profile_link,onChange:s("profile_link"),error:l.profile_link})),("Via_Phone"===t.channel||"Contact_Form"===t.channel||"Property_Inquiries"===t.channel)&&T("div",{className:"w-full md:w-1/2 pb-4"},void 0,T(E.a,{label:"Phone No.",inputclassName:"inputbox",inputid:"grid-name",inputType:"text",value:t.phone_no,onChange:s("phone_no"),error:l.phone_no})),T("div",{className:"w-full md:w-1/2 pb-4"},void 0,T(E.a,{label:"Name",inputclassName:"inputbox",inputid:"grid-name",inputType:"text",value:t.name,onChange:s("name"),error:l.name})),T("div",{className:"w-full md:w-1/2 pb-4"},void 0,T(E.a,{label:"Email",inputclassName:"inputbox",inputid:"grid-email",inputType:"email",value:t.email,onChange:s("email"),error:l.email})),T("div",{className:"w-1/2 z-20 pb-4"},void 0,M,T(O.a,{className:"inputbox",placeholderText:"Click to select a date",selected:""!==t.date&&null!==t.date?new Date(t.date):"",onChange:function(e){null===e&&(e=""),d({key:"date",value:e})},isClearable:!0}),l.date&&l.date&&T("div",{id:"component-error-text"},void 0,l.date)),T("div",{className:"w-full md:w-1/2"},void 0,z,T("textarea",{className:"inputbox",id:"grid-inquiry",type:"text",value:t.inquiry,onChange:s("inquiry")}),T("div",{id:"component-error-text"},void 0,l.inquiry)),T(v.a,{control:T(p.a,{checked:t.is_active||!1,tabIndex:-1,onClick:(f="is_active",function(e){e.persist(),d({key:f,value:e.target.checked})}),color:"primary"}),label:"Is Active"}),G,T("button",{type:"button",className:"text-white py-2 px-4 rounded mt-4 bg-primary uppercase btn-theme",onClick:function(){b()}},void 0,"Save"))))});n("bf09244ac130652df84f");function Y(e,a,n,t){L||(L="function"===typeof Symbol&&Symbol.for&&Symbol.for("react.element")||60103);var o=e&&e.defaultProps,i=arguments.length-3;if(a||0===i||(a={children:void 0}),1===i)a.children=t;else if(i>1){for(var r=new Array(i),c=0;c<i;c++)r[c]=arguments[c+3];a.children=r}if(a&&o)for(var l in o)void 0===a[l]&&(a[l]=o[l]);else a||(a=o||{});return{$$typeof:L,type:e,key:void 0===n?null:""+n,ref:null,props:a,_owner:null}}var Z=Y(X,{});a.default=function(){return Z}}}]);
=======
(window.webpackJsonp=window.webpackJsonp||[]).push([[326],{"237a7b48ef205b110b7e":function(e,a,n){"use strict";n.r(a);var t,o=n("8af190b70a6bc55c6f1b"),i=n.n(o),r=(n("8a2d1b95e05b6a321e74"),n("e95a63b25fb92ed15721")),c=n("a28fc3c963a1d4d1a2e5"),l=n("ab4cb61bcb2dc161defb"),d=n("d7dd51e1bf6bfc2c9c3d"),b=n("3aced5b508e7389026da"),u=(n("f85e09def79cc2a20bc2"),n("4a683f0a5e64e66a8eb9")),f=n.n(u),s=n("c502bee2fd4be3dd7f62"),p=n.n(s),m=n("5c0a236ca4c0b26f32cd"),v=n.n(m),y=n("26682d5d4df1c4fdd619"),h=n.n(y),g=n("0d939196e59ed73c94e6"),w=(n("da010f21fea25912dd9e"),n("6d0b3088082c0f598087")),O=n.n(w),k=n("adc20f99e57c573c589c"),x=n("d95b0cf107403b178365"),j=n("405d149753ab774cff77"),N=n("9f23c06f0536c8f582a5"),P=n("3c96b9432b93bdec9a95"),C=n("9d56412483840c7db38c"),_=n("d733903be61208652859"),S=n("5932430beb0c05240602"),q=n("2fad9e66eff5130ad191"),E=n("5cb9d1dda30508c4ab9e");n("daf935c0d95671762e1e");function F(e,a){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var t=Object.getOwnPropertySymbols(e);a&&(t=t.filter(function(a){return Object.getOwnPropertyDescriptor(e,a).enumerable})),n.push.apply(n,t)}return n}function D(e){for(var a=1;a<arguments.length;a++){var n=null!=arguments[a]?arguments[a]:{};a%2?F(Object(n),!0).forEach(function(a){I(e,a,n[a])}):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):F(Object(n)).forEach(function(a){Object.defineProperty(e,a,Object.getOwnPropertyDescriptor(n,a))})}return e}function I(e,a,n){return a in e?Object.defineProperty(e,a,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[a]=n,e}function T(e,a,n,o){t||(t="function"===typeof Symbol&&Symbol.for&&Symbol.for("react.element")||60103);var i=e&&e.defaultProps,r=arguments.length-3;if(a||0===r||(a={children:void 0}),1===r)a.children=o;else if(r>1){for(var c=new Array(r),l=0;l<r;l++)c[l]=arguments[l+3];a.children=c}if(a&&i)for(var d in i)void 0===a[d]&&(a[d]=i[d]);else a||(a=i||{});return{$$typeof:t,type:e,key:void 0===n?null:""+n,ref:null,props:a,_owner:null}}var L,R="userPersonalInformationPage",A=T(q.a,{}),$=T(h.a,{}),B=T("option",{value:""},void 0,"Choose Channel"),V=T("option",{value:"Facebook"},void 0,"Facebook"),J=T("option",{value:"Via_Phone"},void 0,"Via Phone"),M=T("label",{className:"font-bold text-gray-700",htmlFor:"grid-title"},void 0,"Date"),z=T("label",{className:"font-bold text-gray-700",htmlFor:"grid-title"},void 0,"Inquiry"),G=T("br",{}),H=f()({backbtn:{padding:0,height:"40px",width:"40px",marginTop:"auto",marginBottom:"auto",borderRadius:"50%",marginRight:"5px"}}),K=Object(x.a)({key:R,reducer:j.a}),Q=Object(k.a)({key:R,saga:N.a}),U=Object(c.b)({one:Object(P.m)(),loading:Object(P.o)(),errors:Object(P.k)()}),W=Object(d.connect)(U,D(D({},C),{},{push:b.push})),X=Object(l.compose)(r.withRouter,H,K,Q,W)(function(e){var a=e.clearError,n=(e.loadOneRequest,e.match),t=e.one,r=e.classes,c=e.loading,l=e.errors,d=e.setLeadOne,b=e.addLeadRequest,u=e.push;Object(o.useEffect)(function(){a()},[]);var f,s=function(e){return function(a){a.persist(),d({key:e,value:a.target.value})}};return c&&!0===c?A:i.a.createElement(i.a.Fragment,null,T("div",{},void 0,T("div",{className:"flex justify-between mt-3 mb-3"},void 0,T(_.a,{},void 0,T(g.IconButton,{className:"".concat(r.backbtn," cursor-pointer"),onClick:function(){u("/user/leads")},"aria-label":"Back"},void 0,$),n&&n.params&&n.params.id?"Edit My Lead":"Add My Lead")),T(S.a,{},void 0,T("div",{className:"w-full md:w-1/2 pb-4"},void 0,T("select",{className:"inputbox",value:t.channel,onChange:s("channel")},void 0,B,V,J)),"Facebook"===t.channel&&T("div",{className:"w-full md:w-1/2 pb-4"},void 0,T(E.a,{label:"Profile Link",inputclassName:"inputbox",inputid:"grid-name",inputType:"text",value:t.profile_link,onChange:s("profile_link"),error:l.profile_link})),("Via_Phone"===t.channel||"Contact_Form"===t.channel||"Property_Inquiries"===t.channel)&&T("div",{className:"w-full md:w-1/2 pb-4"},void 0,T(E.a,{label:"Phone No.",inputclassName:"inputbox",inputid:"grid-name",inputType:"text",value:t.phone_no,onChange:s("phone_no"),error:l.phone_no})),T("div",{className:"w-full md:w-1/2 pb-4"},void 0,T(E.a,{label:"Name",inputclassName:"inputbox",inputid:"grid-name",inputType:"text",value:t.name,onChange:s("name"),error:l.name})),T("div",{className:"w-full md:w-1/2 pb-4"},void 0,T(E.a,{label:"Email",inputclassName:"inputbox",inputid:"grid-email",inputType:"email",value:t.email,onChange:s("email"),error:l.email})),T("div",{className:"w-1/2 z-20 pb-4"},void 0,M,T(O.a,{className:"inputbox",placeholderText:"Click to select a date",selected:""!==t.date&&null!==t.date?new Date(t.date):"",onChange:function(e){null===e&&(e=""),d({key:"date",value:e})},isClearable:!0}),l.date&&l.date&&T("div",{id:"component-error-text"},void 0,l.date)),T("div",{className:"w-full md:w-1/2"},void 0,z,T("textarea",{className:"inputbox",id:"grid-inquiry",type:"text",value:t.inquiry,onChange:s("inquiry")}),T("div",{id:"component-error-text"},void 0,l.inquiry)),T(v.a,{control:T(p.a,{checked:t.is_active||!1,tabIndex:-1,onClick:(f="is_active",function(e){e.persist(),d({key:f,value:e.target.checked})}),color:"primary"}),label:"Is Active"}),G,T("button",{type:"button",className:"text-white py-2 px-4 rounded mt-4 bg-primary uppercase btn-theme",onClick:function(){b()}},void 0,"Save"))))});n("bf09244ac130652df84f");function Y(e,a,n,t){L||(L="function"===typeof Symbol&&Symbol.for&&Symbol.for("react.element")||60103);var o=e&&e.defaultProps,i=arguments.length-3;if(a||0===i||(a={children:void 0}),1===i)a.children=t;else if(i>1){for(var r=new Array(i),c=0;c<i;c++)r[c]=arguments[c+3];a.children=r}if(a&&o)for(var l in o)void 0===a[l]&&(a[l]=o[l]);else a||(a=o||{});return{$$typeof:L,type:e,key:void 0===n?null:""+n,ref:null,props:a,_owner:null}}var Z=Y(X,{});a.default=function(){return Z}}}]);
>>>>>>> 41f64895ae2d4aeb7736fd90e084d7a063de2675:client/build/326.68beced516c8380f14bf.chunk.js