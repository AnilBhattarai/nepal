<<<<<<< HEAD:client/build/209.c2aaf2e55f063a8414b8.chunk.js
(window.webpackJsonp=window.webpackJsonp||[]).push([[209],{"3f0b05ad1e63a4d7b10a":function(e,t,a){"use strict";a.r(t);var n,r=a("8af190b70a6bc55c6f1b"),o=a.n(r),i=(a("8a2d1b95e05b6a321e74"),a("d7dd51e1bf6bfc2c9c3d")),c=a("a28fc3c963a1d4d1a2e5"),l=a("ab4cb61bcb2dc161defb"),d=a("3aced5b508e7389026da"),u=a("0d7f0986bcd2f33d8a2a"),f=a("4a683f0a5e64e66a8eb9"),s=a.n(f),b=a("c233babf320cd068509e"),p=a.n(b),m=a("29df10ef1bee6d38fd67"),v=a.n(m),g=a("e799c547a20a503b338f"),y=a.n(g),h=a("e68eb59aa96fc65ab714"),O=a.n(h),j=a("9095151026da8c51dd60"),w=a.n(j),A=a("e96e82762cfd5fe3a589"),k=a.n(A),C=a("ab7ebb4f5c369f043e8f"),S=a.n(C),I=a("73bb0e359204f9566244"),P=a("adc20f99e57c573c589c"),x=a("d95b0cf107403b178365"),E=a("7753387b765b95d45e75"),N=a("a5f22ac2985b103314cf"),D=a("12d786067d7fa44ed89e"),B=a("0a2528a44a662cfab2ad"),M=a("ab039aecd4a1d4fedc0e"),R=(Object(M.defineMessages)({header:{id:"".concat("app.containers.ImageCaption",".header"),defaultMessage:"This is the ImageCaption container!"}}),a("d733903be61208652859")),_=a("5932430beb0c05240602"),q=a("61118b78f8958645f2e4"),z=a("2fad9e66eff5130ad191");function T(e,t){var a=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter(function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable})),a.push.apply(a,n)}return a}function F(e){for(var t=1;t<arguments.length;t++){var a=null!=arguments[t]?arguments[t]:{};t%2?T(Object(a),!0).forEach(function(t){$(e,t,a[t])}):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(a)):T(Object(a)).forEach(function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(a,t))})}return e}function $(e,t,a){return t in e?Object.defineProperty(e,t,{value:a,enumerable:!0,configurable:!0,writable:!0}):e[t]=a,e}function H(e,t,a,r){n||(n="function"===typeof Symbol&&Symbol.for&&Symbol.for("react.element")||60103);var o=e&&e.defaultProps,i=arguments.length-3;if(t||0===i||(t={children:void 0}),1===i)t.children=r;else if(i>1){for(var c=new Array(i),l=0;l<i;l++)c[l]=arguments[l+3];t.children=c}if(t&&o)for(var d in o)void 0===t[d]&&(t[d]=o[d]);else t||(t=o||{});return{$$typeof:n,type:e,key:void 0===a?null:""+a,ref:null,props:t,_owner:null}}function J(e,t){return function(e){if(Array.isArray(e))return e}(e)||function(e,t){var a=null==e?null:"undefined"!==typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(null==a)return;var n,r,o=[],i=!0,c=!1;try{for(a=a.call(e);!(i=(n=a.next()).done)&&(o.push(n.value),!t||o.length!==t);i=!0);}catch(e){c=!0,r=e}finally{try{i||null==a.return||a.return()}finally{if(c)throw r}}return o}(e,t)||function(e,t){if(!e)return;if("string"===typeof e)return K(e,t);var a=Object.prototype.toString.call(e).slice(8,-1);"Object"===a&&e.constructor&&(a=e.constructor.name);if("Map"===a||"Set"===a)return Array.from(e);if("Arguments"===a||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(a))return K(e,t)}(e,t)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function K(e,t){(null==t||t>e.length)&&(t=e.length);for(var a=0,n=new Array(t);a<t;a++)n[a]=e[a];return n}a.d(t,"ImageCaption",function(){return X});var L="imageCaption",Q=H(u.Helmet,{},void 0,H("title",{},void 0,"Image Caption Manage")),U=H(z.a,{}),V=H(R.a,{},void 0,"Image Caption Manage "),G=H(p.a,{}),W=H(w.a,{}),X=function(e){var t=e.all,a=t.data,n=t.page,i=t.size,c=t.totaldata,l=e.loading,d=e.loadAllRequest,u=e.clearOne,f=e.setQueryValue,s=e.deleteOneRequest,b=e.classes,p=e.query,m=e.push;Object(x.b)({key:L,reducer:D.a}),Object(P.b)({key:L,saga:B.a});var g=J(Object(r.useState)(!1),2),h=g[0],j=g[1],w=J(Object(r.useState)(""),2),A=w[0],C=w[1];Object(r.useEffect)(function(){d()},[]);var E=function(){d(p)},N={page:n,size:i,totaldata:c},M=a.map(function(e){var t=e._id;return[e.title,e.order,e.description,e.is_active?"Active":"In-active",o.a.createElement(o.a.Fragment,null,H(v.a,{id:"tooltip-top",title:"Edit",placement:"top",classes:{tooltip:b.tooltip}},void 0,H(y.a,{"aria-label":"Edit",className:b.tableActionButton,onClick:function(){m("/admin/image-caption/edit/".concat(t))}},void 0,H(O.a,{className:"".concat(b.tableActionButtonIcon," ").concat(b.edit)}))),H(v.a,{id:"tooltip-top-start",title:"Remove",placement:"top",classes:{tooltip:b.tooltip}},void 0,H(y.a,{"aria-label":"Close",className:b.tableActionButton,onClick:function(){return e=t,j(!0),void C(e);var e}},void 0,H(S.a,{className:"".concat(b.tableActionButtonIcon," ").concat(b.close)}))))]});return o.a.createElement(o.a.Fragment,null,Q,H(q.a,{open:h,doClose:function(){j(!1)},doDelete:function(){return s(A),void j(!1)}}),H("div",{className:"flex justify-between mt-3 mb-3"},void 0,l&&!0===l?U:o.a.createElement(o.a.Fragment,null),V,H(k.a,{color:"primary","aria-label":"Add",className:b.fab,round:"true",onClick:function(){u(),m("/admin/image-caption/add")},elevation:0},void 0,G)),H(_.a,{loading:l},void 0,H("div",{className:"flex justify-end"},void 0,H("div",{className:"waftformgroup flex relative mr-2"},void 0,H("input",{type:"text",name:"find_title",id:"contents-title",placeholder:"Search by title",className:"m-auto inputbox",value:p.find_title,onChange:function(e){e.persist(),f({key:e.target.name,value:e.target.value})},style:{paddingRight:"50px"},onKeyPress:function(e){"Enter"===e.key&&E()}}),H(y.a,{"aria-label":"Search",className:"waftsrchstyle",onClick:E},void 0,W))),H(I.a,{tableHead:["Title","Order","Description","Is active?","Action"],tableData:M,pagination:N,handlePagination:function(e){var t=e.page,a=e.size;d({page:t,size:a})}})))},Y=Object(c.b)({all:Object(N.a)(),query:Object(N.e)(),loading:Object(N.c)()}),Z=Object(i.connect)(Y,F(F({},E),{},{push:d.push})),ee=s()(function(e){return{button:{margin:e.spacing.unit},fab:{width:"40px",height:"40px",marginTop:"auto",marginBottom:"auto"},tableActionButton:{padding:0,"&:hover":{background:"transparent",color:"#404040"}},waftsrch:{padding:0,position:"absolute",borderLeft:"1px solid #d9e3e9",borderRadius:0,"&:hover":{background:"transparent",color:"#404040"}}}});t.default=Object(l.compose)(ee,Z,r.memo)(X)}}]);
=======
(window.webpackJsonp=window.webpackJsonp||[]).push([[212],{"3f0b05ad1e63a4d7b10a":function(e,t,a){"use strict";a.r(t);var n,r=a("8af190b70a6bc55c6f1b"),o=a.n(r),i=(a("8a2d1b95e05b6a321e74"),a("d7dd51e1bf6bfc2c9c3d")),c=a("a28fc3c963a1d4d1a2e5"),l=a("ab4cb61bcb2dc161defb"),d=a("3aced5b508e7389026da"),u=a("0d7f0986bcd2f33d8a2a"),f=a("4a683f0a5e64e66a8eb9"),s=a.n(f),b=a("c233babf320cd068509e"),p=a.n(b),m=a("29df10ef1bee6d38fd67"),v=a.n(m),g=a("e799c547a20a503b338f"),y=a.n(g),h=a("e68eb59aa96fc65ab714"),O=a.n(h),j=a("9095151026da8c51dd60"),w=a.n(j),A=a("e96e82762cfd5fe3a589"),k=a.n(A),C=a("ab7ebb4f5c369f043e8f"),S=a.n(C),I=a("73bb0e359204f9566244"),P=a("adc20f99e57c573c589c"),x=a("d95b0cf107403b178365"),E=a("7753387b765b95d45e75"),N=a("a5f22ac2985b103314cf"),D=a("12d786067d7fa44ed89e"),B=a("0a2528a44a662cfab2ad"),M=a("ab039aecd4a1d4fedc0e"),R=(Object(M.defineMessages)({header:{id:"".concat("app.containers.ImageCaption",".header"),defaultMessage:"This is the ImageCaption container!"}}),a("d733903be61208652859")),_=a("5932430beb0c05240602"),q=a("61118b78f8958645f2e4"),z=a("2fad9e66eff5130ad191");function T(e,t){var a=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter(function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable})),a.push.apply(a,n)}return a}function F(e){for(var t=1;t<arguments.length;t++){var a=null!=arguments[t]?arguments[t]:{};t%2?T(Object(a),!0).forEach(function(t){$(e,t,a[t])}):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(a)):T(Object(a)).forEach(function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(a,t))})}return e}function $(e,t,a){return t in e?Object.defineProperty(e,t,{value:a,enumerable:!0,configurable:!0,writable:!0}):e[t]=a,e}function H(e,t,a,r){n||(n="function"===typeof Symbol&&Symbol.for&&Symbol.for("react.element")||60103);var o=e&&e.defaultProps,i=arguments.length-3;if(t||0===i||(t={children:void 0}),1===i)t.children=r;else if(i>1){for(var c=new Array(i),l=0;l<i;l++)c[l]=arguments[l+3];t.children=c}if(t&&o)for(var d in o)void 0===t[d]&&(t[d]=o[d]);else t||(t=o||{});return{$$typeof:n,type:e,key:void 0===a?null:""+a,ref:null,props:t,_owner:null}}function J(e,t){return function(e){if(Array.isArray(e))return e}(e)||function(e,t){var a=null==e?null:"undefined"!==typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(null==a)return;var n,r,o=[],i=!0,c=!1;try{for(a=a.call(e);!(i=(n=a.next()).done)&&(o.push(n.value),!t||o.length!==t);i=!0);}catch(e){c=!0,r=e}finally{try{i||null==a.return||a.return()}finally{if(c)throw r}}return o}(e,t)||function(e,t){if(!e)return;if("string"===typeof e)return K(e,t);var a=Object.prototype.toString.call(e).slice(8,-1);"Object"===a&&e.constructor&&(a=e.constructor.name);if("Map"===a||"Set"===a)return Array.from(e);if("Arguments"===a||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(a))return K(e,t)}(e,t)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function K(e,t){(null==t||t>e.length)&&(t=e.length);for(var a=0,n=new Array(t);a<t;a++)n[a]=e[a];return n}a.d(t,"ImageCaption",function(){return X});var L="imageCaption",Q=H(u.Helmet,{},void 0,H("title",{},void 0,"Image Caption Manage")),U=H(z.a,{}),V=H(R.a,{},void 0,"Image Caption Manage "),G=H(p.a,{}),W=H(w.a,{}),X=function(e){var t=e.all,a=t.data,n=t.page,i=t.size,c=t.totaldata,l=e.loading,d=e.loadAllRequest,u=e.clearOne,f=e.setQueryValue,s=e.deleteOneRequest,b=e.classes,p=e.query,m=e.push;Object(x.b)({key:L,reducer:D.a}),Object(P.b)({key:L,saga:B.a});var g=J(Object(r.useState)(!1),2),h=g[0],j=g[1],w=J(Object(r.useState)(""),2),A=w[0],C=w[1];Object(r.useEffect)(function(){d()},[]);var E=function(){d(p)},N={page:n,size:i,totaldata:c},M=a.map(function(e){var t=e._id;return[e.title,e.order,e.description,e.is_active?"Active":"In-active",o.a.createElement(o.a.Fragment,null,H(v.a,{id:"tooltip-top",title:"Edit",placement:"top",classes:{tooltip:b.tooltip}},void 0,H(y.a,{"aria-label":"Edit",className:b.tableActionButton,onClick:function(){m("/admin/image-caption/edit/".concat(t))}},void 0,H(O.a,{className:"".concat(b.tableActionButtonIcon," ").concat(b.edit)}))),H(v.a,{id:"tooltip-top-start",title:"Remove",placement:"top",classes:{tooltip:b.tooltip}},void 0,H(y.a,{"aria-label":"Close",className:b.tableActionButton,onClick:function(){return e=t,j(!0),void C(e);var e}},void 0,H(S.a,{className:"".concat(b.tableActionButtonIcon," ").concat(b.close)}))))]});return o.a.createElement(o.a.Fragment,null,Q,H(q.a,{open:h,doClose:function(){j(!1)},doDelete:function(){return s(A),void j(!1)}}),H("div",{className:"flex justify-between mt-3 mb-3"},void 0,l&&!0===l?U:o.a.createElement(o.a.Fragment,null),V,H(k.a,{color:"primary","aria-label":"Add",className:b.fab,round:"true",onClick:function(){u(),m("/admin/image-caption/add")},elevation:0},void 0,G)),H(_.a,{loading:l},void 0,H("div",{className:"flex justify-end"},void 0,H("div",{className:"waftformgroup flex relative mr-2"},void 0,H("input",{type:"text",name:"find_title",id:"contents-title",placeholder:"Search by title",className:"m-auto inputbox",value:p.find_title,onChange:function(e){e.persist(),f({key:e.target.name,value:e.target.value})},style:{paddingRight:"50px"},onKeyPress:function(e){"Enter"===e.key&&E()}}),H(y.a,{"aria-label":"Search",className:"waftsrchstyle",onClick:E},void 0,W))),H(I.a,{tableHead:["Title","Order","Description","Is active?","Action"],tableData:M,pagination:N,handlePagination:function(e){var t=e.page,a=e.size;d({page:t,size:a})}})))},Y=Object(c.b)({all:Object(N.a)(),query:Object(N.e)(),loading:Object(N.c)()}),Z=Object(i.connect)(Y,F(F({},E),{},{push:d.push})),ee=s()(function(e){return{button:{margin:e.spacing.unit},fab:{width:"40px",height:"40px",marginTop:"auto",marginBottom:"auto"},tableActionButton:{padding:0,"&:hover":{background:"transparent",color:"#404040"}},waftsrch:{padding:0,position:"absolute",borderLeft:"1px solid #d9e3e9",borderRadius:0,"&:hover":{background:"transparent",color:"#404040"}}}});t.default=Object(l.compose)(ee,Z,r.memo)(X)}}]);
>>>>>>> 41f64895ae2d4aeb7736fd90e084d7a063de2675:client/build/212.628cb3d0401bcedea17b.chunk.js