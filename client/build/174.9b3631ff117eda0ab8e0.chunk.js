<<<<<<< HEAD:client/build/171.e1bbf4627f051eb23ff0.chunk.js
(window.webpackJsonp=window.webpackJsonp||[]).push([[171],{"70b9ae1f643b0cf0d437":function(e,t,n){"use strict";n.r(t),n.d(t,"Builders",function(){return $});var a,r=n("8af190b70a6bc55c6f1b"),i=n.n(r),o=(n("8a2d1b95e05b6a321e74"),n("0d7f0986bcd2f33d8a2a")),c=n("ca0c8c9a15f684f9951f"),l=n.n(c),d=n("a28fc3c963a1d4d1a2e5"),u=n("d7dd51e1bf6bfc2c9c3d"),f=n("ab4cb61bcb2dc161defb"),s=n("3aced5b508e7389026da"),b=(n("c25d3de6a26e2dd439cd"),n("4a683f0a5e64e66a8eb9")),p=n.n(b),m=n("29df10ef1bee6d38fd67"),y=n.n(m),g=n("e799c547a20a503b338f"),v=n.n(g),h=n("adc20f99e57c573c589c"),O=n("d95b0cf107403b178365"),j=n("73bb0e359204f9566244"),w=n("eec3f8ad528d6958dcd6"),x=n.n(w),k=n("4810247ef5bb5d506846"),_=n("0dd24bbc30bc4dd0afcc"),S=n("cb6bda23ecd3cf581ef7"),P=n("259fbac8d30b49a04c48"),E=n("d733903be61208652859"),A=n("5932430beb0c05240602"),N=n("2fad9e66eff5130ad191"),B=n("0120805a365c4918a127");function C(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);t&&(a=a.filter(function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable})),n.push.apply(n,a)}return n}function D(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?C(Object(n),!0).forEach(function(t){z(e,t,n[t])}):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):C(Object(n)).forEach(function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))})}return e}function z(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function F(e,t,n,r){a||(a="function"===typeof Symbol&&Symbol.for&&Symbol.for("react.element")||60103);var i=e&&e.defaultProps,o=arguments.length-3;if(t||0===o||(t={children:void 0}),1===o)t.children=r;else if(o>1){for(var c=new Array(o),l=0;l<o;l++)c[l]=arguments[l+3];t.children=c}if(t&&i)for(var d in i)void 0===t[d]&&(t[d]=i[d]);else t||(t=i||{});return{$$typeof:a,type:e,key:void 0===n?null:""+n,ref:null,props:t,_owner:null}}function R(e,t){return function(e){if(Array.isArray(e))return e}(e)||function(e,t){var n=null==e?null:"undefined"!==typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(null==n)return;var a,r,i=[],o=!0,c=!1;try{for(n=n.call(e);!(o=(a=n.next()).done)&&(i.push(a.value),!t||i.length!==t);o=!0);}catch(e){c=!0,r=e}finally{try{o||null==n.return||n.return()}finally{if(c)throw r}}return i}(e,t)||function(e,t){if(!e)return;if("string"===typeof e)return V(e,t);var n=Object.prototype.toString.call(e).slice(8,-1);"Object"===n&&e.constructor&&(n=e.constructor.name);if("Map"===n||"Set"===n)return Array.from(e);if("Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n))return V(e,t)}(e,t)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function V(e,t){(null==t||t>e.length)&&(t=e.length);for(var n=0,a=new Array(t);n<t;n++)a[n]=e[n];return a}var q=F(x.a,{}),H=F(o.Helmet,{},void 0,F("title",{},void 0,"Builders Listing")),I=F(N.a,{}),M=F(E.a,{},void 0,"Builders"),$=function(e){var t=e.loadAllRequest,n=e.query,a=e.setQueryValue,o=e.push,c=e.classes,d=e.all,u=d.data,f=d.page,s=d.size,b=d.totaldata,p=e.loading,m=e.clearQuery,g=R(Object(r.useState)({page:1,size:10}),2),h=g[0];g[1];Object(r.useEffect)(function(){t()},[]),Object(r.useEffect)(function(){n.size!==h.size?t(n):n.page!==h.page&&t(n)},[n]);var O,w=function(e){e.persist(),a({key:e.target.name,value:e.target.value})},x=function(e){"Enter"===e.key&&t(n)},k={page:f,size:s,totaldata:b},_=u.map(function(e){var t=e._id,n=e.email,a=e.name,r=e.roles,l=(e.email_verified,e.builder);return[a,n,r.map(function(e){return e.role_title}).join(", "),l&&"".concat(l.is_verified?"Verified":"Un-verified"),i.a.createElement(i.a.Fragment,null,F(y.a,{id:"tooltip-left",title:"Edit Builder",placement:"left"},void 0,F(v.a,{className:c.tableActionButton,onClick:function(){o("/admin/builders-manage/edit/".concat(t))}},void 0,q)))]});return i.a.createElement(i.a.Fragment,null,H,F("div",{className:"flex justify-between mt-3 mb-3"},void 0,p&&!0===p?I:i.a.createElement(i.a.Fragment,null),M),F(A.a,{loading:p},void 0,F("div",{className:"flex justify-end items-center"},void 0,F("input",{type:"text",name:"find_name",id:"name",placeholder:"Name",className:"mr-3 inputbox",value:n.find_name,onKeyDown:x,onChange:w,style:{width:"200px"}}),F(l.a,{className:"React_Select",id:"find_is_verified",classNamePrefix:"select",placeholder:"Verified",name:"find_is_verified",onChange:(O="find_is_verified",function(e){a({key:O,value:e.value})}),value:n.find_is_verified||"",isSearchable:!0,options:B.o,styles:L}),F("input",{type:"text",name:"find_email",id:"email",placeholder:"Email",className:"mr-3 inputbox",onKeyDown:x,value:n.find_email,onChange:w,style:{width:"200px"}}),F("button",{"aria-label":"clear",className:"px-6 py-1 inline-block text-secondary text-center underline",onClick:function(){t(),m()},type:"button"},void 0,"clear filter"),F("button",{"aria-label":"Search",className:"bg-secondary px-4 py-2 text-white  text-center rounded",onClick:function(e){e.preventDefault(),t(n)},type:"button"},void 0,"Search")),F(j.a,{tableHead:["Name","Email","Roles","Verified","Action"],tableData:_,pagination:k,handlePagination:function(e){var t=e.page,n=e.size;a({key:"page",value:t}),a({key:"size",value:n})}})))},J=Object(d.b)({all:Object(P.a)(),query:Object(P.e)(),loading:Object(P.d)()}),K=Object(u.connect)(J,D(D({},S),{},{push:s.push})),L={control:function(e,t){return D(D({},e),{},{background:"#F3F3F9",borderColor:"#e0e3e8",minHeight:"35px",height:"35px",width:"150px",boxShadow:(t.isFocused,null),marginRight:"8px"})},indicatorSeparator:function(e){return{display:"none"}}},Q=p()(function(e){return{fab:{width:"40px",height:"40px",marginTop:"auto",marginBottom:"auto"},tableActionButton:{padding:0,"&:hover":{background:"transparent",color:"#404040"}},waftsrch:{padding:0,position:"absolute",borderLeft:"1px solid #d9e3e9",borderRadius:0,"&:hover":{background:"transparent",color:"#404040"}}}}),T=Object(O.a)({key:"adminBuildersManagePage",reducer:k.a}),U=Object(h.a)({key:"adminBuildersManagePage",saga:_.a});t.default=Object(f.compose)(T,U,K,Q)($)}}]);
=======
(window.webpackJsonp=window.webpackJsonp||[]).push([[174],{"70b9ae1f643b0cf0d437":function(e,t,n){"use strict";n.r(t),n.d(t,"Builders",function(){return $});var a,r=n("8af190b70a6bc55c6f1b"),i=n.n(r),o=(n("8a2d1b95e05b6a321e74"),n("0d7f0986bcd2f33d8a2a")),c=n("ca0c8c9a15f684f9951f"),l=n.n(c),d=n("a28fc3c963a1d4d1a2e5"),u=n("d7dd51e1bf6bfc2c9c3d"),f=n("ab4cb61bcb2dc161defb"),s=n("3aced5b508e7389026da"),b=(n("c25d3de6a26e2dd439cd"),n("4a683f0a5e64e66a8eb9")),p=n.n(b),m=n("29df10ef1bee6d38fd67"),y=n.n(m),g=n("e799c547a20a503b338f"),v=n.n(g),h=n("adc20f99e57c573c589c"),O=n("d95b0cf107403b178365"),j=n("73bb0e359204f9566244"),w=n("eec3f8ad528d6958dcd6"),x=n.n(w),k=n("4810247ef5bb5d506846"),_=n("0dd24bbc30bc4dd0afcc"),S=n("cb6bda23ecd3cf581ef7"),P=n("259fbac8d30b49a04c48"),E=n("d733903be61208652859"),A=n("5932430beb0c05240602"),N=n("2fad9e66eff5130ad191"),B=n("0120805a365c4918a127");function C(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);t&&(a=a.filter(function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable})),n.push.apply(n,a)}return n}function D(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?C(Object(n),!0).forEach(function(t){z(e,t,n[t])}):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):C(Object(n)).forEach(function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))})}return e}function z(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function F(e,t,n,r){a||(a="function"===typeof Symbol&&Symbol.for&&Symbol.for("react.element")||60103);var i=e&&e.defaultProps,o=arguments.length-3;if(t||0===o||(t={children:void 0}),1===o)t.children=r;else if(o>1){for(var c=new Array(o),l=0;l<o;l++)c[l]=arguments[l+3];t.children=c}if(t&&i)for(var d in i)void 0===t[d]&&(t[d]=i[d]);else t||(t=i||{});return{$$typeof:a,type:e,key:void 0===n?null:""+n,ref:null,props:t,_owner:null}}function R(e,t){return function(e){if(Array.isArray(e))return e}(e)||function(e,t){var n=null==e?null:"undefined"!==typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(null==n)return;var a,r,i=[],o=!0,c=!1;try{for(n=n.call(e);!(o=(a=n.next()).done)&&(i.push(a.value),!t||i.length!==t);o=!0);}catch(e){c=!0,r=e}finally{try{o||null==n.return||n.return()}finally{if(c)throw r}}return i}(e,t)||function(e,t){if(!e)return;if("string"===typeof e)return V(e,t);var n=Object.prototype.toString.call(e).slice(8,-1);"Object"===n&&e.constructor&&(n=e.constructor.name);if("Map"===n||"Set"===n)return Array.from(e);if("Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n))return V(e,t)}(e,t)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function V(e,t){(null==t||t>e.length)&&(t=e.length);for(var n=0,a=new Array(t);n<t;n++)a[n]=e[n];return a}var q=F(x.a,{}),H=F(o.Helmet,{},void 0,F("title",{},void 0,"Builders Listing")),I=F(N.a,{}),M=F(E.a,{},void 0,"Builders"),$=function(e){var t=e.loadAllRequest,n=e.query,a=e.setQueryValue,o=e.push,c=e.classes,d=e.all,u=d.data,f=d.page,s=d.size,b=d.totaldata,p=e.loading,m=e.clearQuery,g=R(Object(r.useState)({page:1,size:10}),2),h=g[0];g[1];Object(r.useEffect)(function(){t()},[]),Object(r.useEffect)(function(){n.size!==h.size?t(n):n.page!==h.page&&t(n)},[n]);var O,w=function(e){e.persist(),a({key:e.target.name,value:e.target.value})},x=function(e){"Enter"===e.key&&t(n)},k={page:f,size:s,totaldata:b},_=u.map(function(e){var t=e._id,n=e.email,a=e.name,r=e.roles,l=(e.email_verified,e.builder);return[a,n,r.map(function(e){return e.role_title}).join(", "),l&&"".concat(l.is_verified?"Verified":"Un-verified"),i.a.createElement(i.a.Fragment,null,F(y.a,{id:"tooltip-left",title:"Edit Builder",placement:"left"},void 0,F(v.a,{className:c.tableActionButton,onClick:function(){o("/admin/builders-manage/edit/".concat(t))}},void 0,q)))]});return i.a.createElement(i.a.Fragment,null,H,F("div",{className:"flex justify-between mt-3 mb-3"},void 0,p&&!0===p?I:i.a.createElement(i.a.Fragment,null),M),F(A.a,{loading:p},void 0,F("div",{className:"flex justify-end items-center"},void 0,F("input",{type:"text",name:"find_name",id:"name",placeholder:"Name",className:"mr-3 inputbox",value:n.find_name,onKeyDown:x,onChange:w,style:{width:"200px"}}),F(l.a,{className:"React_Select",id:"find_is_verified",classNamePrefix:"select",placeholder:"Verified",name:"find_is_verified",onChange:(O="find_is_verified",function(e){a({key:O,value:e.value})}),value:n.find_is_verified||"",isSearchable:!0,options:B.o,styles:L}),F("input",{type:"text",name:"find_email",id:"email",placeholder:"Email",className:"mr-3 inputbox",onKeyDown:x,value:n.find_email,onChange:w,style:{width:"200px"}}),F("button",{"aria-label":"clear",className:"px-6 py-1 inline-block text-secondary text-center underline",onClick:function(){t(),m()},type:"button"},void 0,"clear filter"),F("button",{"aria-label":"Search",className:"bg-secondary px-4 py-2 text-white  text-center rounded",onClick:function(e){e.preventDefault(),t(n)},type:"button"},void 0,"Search")),F(j.a,{tableHead:["Name","Email","Roles","Verified","Action"],tableData:_,pagination:k,handlePagination:function(e){var t=e.page,n=e.size;a({key:"page",value:t}),a({key:"size",value:n})}})))},J=Object(d.b)({all:Object(P.a)(),query:Object(P.e)(),loading:Object(P.d)()}),K=Object(u.connect)(J,D(D({},S),{},{push:s.push})),L={control:function(e,t){return D(D({},e),{},{background:"#F3F3F9",borderColor:"#e0e3e8",minHeight:"35px",height:"35px",width:"150px",boxShadow:(t.isFocused,null),marginRight:"8px"})},indicatorSeparator:function(e){return{display:"none"}}},Q=p()(function(e){return{fab:{width:"40px",height:"40px",marginTop:"auto",marginBottom:"auto"},tableActionButton:{padding:0,"&:hover":{background:"transparent",color:"#404040"}},waftsrch:{padding:0,position:"absolute",borderLeft:"1px solid #d9e3e9",borderRadius:0,"&:hover":{background:"transparent",color:"#404040"}}}}),T=Object(O.a)({key:"adminBuildersManagePage",reducer:k.a}),U=Object(h.a)({key:"adminBuildersManagePage",saga:_.a});t.default=Object(f.compose)(T,U,K,Q)($)}}]);
>>>>>>> 41f64895ae2d4aeb7736fd90e084d7a063de2675:client/build/174.9b3631ff117eda0ab8e0.chunk.js