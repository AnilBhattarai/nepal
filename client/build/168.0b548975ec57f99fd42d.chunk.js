<<<<<<< HEAD:client/build/165.4c355a2d3bc266fdba0b.chunk.js
(window.webpackJsonp=window.webpackJsonp||[]).push([[165],{"3a76ba0547d0ce209fdb":function(e,t,a){"use strict";a.r(t);var n,r=a("8af190b70a6bc55c6f1b"),o=a.n(r),c=(a("8a2d1b95e05b6a321e74"),a("d7dd51e1bf6bfc2c9c3d")),i=a("a28fc3c963a1d4d1a2e5"),l=a("ab4cb61bcb2dc161defb"),d=a("3aced5b508e7389026da"),b=a("0d7f0986bcd2f33d8a2a"),f=a("4a683f0a5e64e66a8eb9"),u=a.n(f),s=a("c233babf320cd068509e"),p=a.n(s),m=a("29df10ef1bee6d38fd67"),g=a.n(m),y=a("e799c547a20a503b338f"),v=a.n(y),h=a("e68eb59aa96fc65ab714"),O=a.n(h),j=a("e96e82762cfd5fe3a589"),k=a.n(j),w=a("ab7ebb4f5c369f043e8f"),A=a.n(w),B=a("73bb0e359204f9566244"),P=a("adc20f99e57c573c589c"),S=a("d95b0cf107403b178365"),D=a("7a71265627a473350574"),E=a("3b8b53c48d51495ea469"),N=a("4a086ae412af213825d8"),I=a("ebda53ec1f8bdf415a6c"),_=a("ab039aecd4a1d4fedc0e"),C=(Object(_.defineMessages)({header:{id:"".concat("app.containers.BankDetail",".header"),defaultMessage:"This is the BankDetail container!"}}),a("d733903be61208652859")),R=a("5932430beb0c05240602"),x=a("61118b78f8958645f2e4"),q=a("2fad9e66eff5130ad191"),z=a("fcb99a06256635f70435");function F(e,t){var a=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter(function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable})),a.push.apply(a,n)}return a}function M(e){for(var t=1;t<arguments.length;t++){var a=null!=arguments[t]?arguments[t]:{};t%2?F(Object(a),!0).forEach(function(t){T(e,t,a[t])}):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(a)):F(Object(a)).forEach(function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(a,t))})}return e}function T(e,t,a){return t in e?Object.defineProperty(e,t,{value:a,enumerable:!0,configurable:!0,writable:!0}):e[t]=a,e}function $(e,t,a,r){n||(n="function"===typeof Symbol&&Symbol.for&&Symbol.for("react.element")||60103);var o=e&&e.defaultProps,c=arguments.length-3;if(t||0===c||(t={children:void 0}),1===c)t.children=r;else if(c>1){for(var i=new Array(c),l=0;l<c;l++)i[l]=arguments[l+3];t.children=i}if(t&&o)for(var d in o)void 0===t[d]&&(t[d]=o[d]);else t||(t=o||{});return{$$typeof:n,type:e,key:void 0===a?null:""+a,ref:null,props:t,_owner:null}}function H(e,t){return function(e){if(Array.isArray(e))return e}(e)||function(e,t){var a=null==e?null:"undefined"!==typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(null==a)return;var n,r,o=[],c=!0,i=!1;try{for(a=a.call(e);!(c=(n=a.next()).done)&&(o.push(n.value),!t||o.length!==t);c=!0);}catch(e){i=!0,r=e}finally{try{c||null==a.return||a.return()}finally{if(i)throw r}}return o}(e,t)||function(e,t){if(!e)return;if("string"===typeof e)return J(e,t);var a=Object.prototype.toString.call(e).slice(8,-1);"Object"===a&&e.constructor&&(a=e.constructor.name);if("Map"===a||"Set"===a)return Array.from(e);if("Arguments"===a||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(a))return J(e,t)}(e,t)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function J(e,t){(null==t||t>e.length)&&(t=e.length);for(var a=0,n=new Array(t);a<t;a++)n[a]=e[a];return n}a.d(t,"BankDetail",function(){return K});var L="bankDetail",Q=$(b.Helmet,{},void 0,$("title",{},void 0,"Banks Manage")),U=$(q.a,{}),V=$(C.a,{},void 0," Banks "),G=$(p.a,{}),K=function(e){var t=e.all,a=t.data,n=t.page,c=t.size,i=t.totaldata,l=e.loading,d=e.loadAllRequest,b=e.clearOne,f=(e.setQueryValue,e.deleteOneRequest),u=e.classes,s=(e.query,e.push);e.clearQuery;Object(S.b)({key:L,reducer:N.a}),Object(P.b)({key:L,saga:I.a});var p=H(Object(r.useState)(!1),2),m=p[0],y=p[1],h=H(Object(r.useState)(""),2),j=h[0],w=h[1];Object(r.useEffect)(function(){d()},[]);var D={page:n,size:c,totaldata:i},E=a.map(function(e){var t=e._id,a=e.Bank_Name,n=e.Rate_Of_interest,r=e.Processing_Fees,c=e.Logo;return[c?$("img",{src:"".concat(z.g).concat(c.path),alt:"bank_image",style:{height:50,width:50}}):"",a,n,r,o.a.createElement(o.a.Fragment,null,$(g.a,{id:"tooltip-top",title:"Edit Bank",placement:"top",classes:{tooltip:u.tooltip}},void 0,$(v.a,{"aria-label":"Edit",className:u.tableActionButton,onClick:function(){return e=t,b(),void s("/admin/banks/edit/".concat(e));var e}},void 0,$(O.a,{className:"".concat(u.tableActionButtonIcon," ").concat(u.edit)}))),$(g.a,{id:"tooltip-top-start",title:"Remove",placement:"top",classes:{tooltip:u.tooltip}},void 0,$(v.a,{"aria-label":"Close",className:u.tableActionButton,onClick:function(){return e=t,y(!0),void w(e);var e}},void 0,$(A.a,{className:"".concat(u.tableActionButtonIcon," ").concat(u.close)}))))]});return o.a.createElement(o.a.Fragment,null,Q,$(x.a,{open:m,doClose:function(){y(!1)},doDelete:function(){return f(j),void y(!1)}}),$("div",{className:"flex justify-between mt-3 mb-3"},void 0,l&&!0===l?U:o.a.createElement(o.a.Fragment,null),V,$(k.a,{color:"primary","aria-label":"Add",className:u.fab,round:"true",onClick:function(){b(),s("/admin/banks/add")},elevation:0},void 0,G)),$(R.a,{loading:l},void 0,$(B.a,{tableHead:["Image","Bank Name","Rate of Interest","Processing fees",""],tableData:E,pagination:D,handlePagination:function(e){var t=e.page,a=e.size;d({page:t,size:a})}})))},W=Object(i.b)({all:Object(E.a)(),query:Object(E.e)(),loading:Object(E.c)()}),X=Object(c.connect)(W,M(M({},D),{},{push:d.push})),Y=u()(function(e){return{button:{margin:e.spacing.unit},fab:{width:"40px",height:"40px",marginTop:"auto",marginBottom:"auto"},tableActionButton:{padding:0,"&:hover":{background:"transparent",color:"#404040"}},waftsrch:{padding:0,position:"absolute",borderLeft:"1px solid #d9e3e9",borderRadius:0,"&:hover":{background:"transparent",color:"#404040"}}}});t.default=Object(l.compose)(Y,X,r.memo)(K)}}]);
=======
(window.webpackJsonp=window.webpackJsonp||[]).push([[168],{"3a76ba0547d0ce209fdb":function(e,t,a){"use strict";a.r(t);var n,r=a("8af190b70a6bc55c6f1b"),o=a.n(r),c=(a("8a2d1b95e05b6a321e74"),a("d7dd51e1bf6bfc2c9c3d")),i=a("a28fc3c963a1d4d1a2e5"),l=a("ab4cb61bcb2dc161defb"),d=a("3aced5b508e7389026da"),b=a("0d7f0986bcd2f33d8a2a"),f=a("4a683f0a5e64e66a8eb9"),u=a.n(f),s=a("c233babf320cd068509e"),p=a.n(s),m=a("29df10ef1bee6d38fd67"),g=a.n(m),y=a("e799c547a20a503b338f"),v=a.n(y),h=a("e68eb59aa96fc65ab714"),O=a.n(h),j=a("e96e82762cfd5fe3a589"),k=a.n(j),w=a("ab7ebb4f5c369f043e8f"),A=a.n(w),B=a("73bb0e359204f9566244"),P=a("adc20f99e57c573c589c"),S=a("d95b0cf107403b178365"),D=a("7a71265627a473350574"),E=a("3b8b53c48d51495ea469"),N=a("4a086ae412af213825d8"),I=a("ebda53ec1f8bdf415a6c"),_=a("ab039aecd4a1d4fedc0e"),C=(Object(_.defineMessages)({header:{id:"".concat("app.containers.BankDetail",".header"),defaultMessage:"This is the BankDetail container!"}}),a("d733903be61208652859")),R=a("5932430beb0c05240602"),x=a("61118b78f8958645f2e4"),q=a("2fad9e66eff5130ad191"),z=a("fcb99a06256635f70435");function F(e,t){var a=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter(function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable})),a.push.apply(a,n)}return a}function M(e){for(var t=1;t<arguments.length;t++){var a=null!=arguments[t]?arguments[t]:{};t%2?F(Object(a),!0).forEach(function(t){T(e,t,a[t])}):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(a)):F(Object(a)).forEach(function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(a,t))})}return e}function T(e,t,a){return t in e?Object.defineProperty(e,t,{value:a,enumerable:!0,configurable:!0,writable:!0}):e[t]=a,e}function $(e,t,a,r){n||(n="function"===typeof Symbol&&Symbol.for&&Symbol.for("react.element")||60103);var o=e&&e.defaultProps,c=arguments.length-3;if(t||0===c||(t={children:void 0}),1===c)t.children=r;else if(c>1){for(var i=new Array(c),l=0;l<c;l++)i[l]=arguments[l+3];t.children=i}if(t&&o)for(var d in o)void 0===t[d]&&(t[d]=o[d]);else t||(t=o||{});return{$$typeof:n,type:e,key:void 0===a?null:""+a,ref:null,props:t,_owner:null}}function H(e,t){return function(e){if(Array.isArray(e))return e}(e)||function(e,t){var a=null==e?null:"undefined"!==typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(null==a)return;var n,r,o=[],c=!0,i=!1;try{for(a=a.call(e);!(c=(n=a.next()).done)&&(o.push(n.value),!t||o.length!==t);c=!0);}catch(e){i=!0,r=e}finally{try{c||null==a.return||a.return()}finally{if(i)throw r}}return o}(e,t)||function(e,t){if(!e)return;if("string"===typeof e)return J(e,t);var a=Object.prototype.toString.call(e).slice(8,-1);"Object"===a&&e.constructor&&(a=e.constructor.name);if("Map"===a||"Set"===a)return Array.from(e);if("Arguments"===a||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(a))return J(e,t)}(e,t)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function J(e,t){(null==t||t>e.length)&&(t=e.length);for(var a=0,n=new Array(t);a<t;a++)n[a]=e[a];return n}a.d(t,"BankDetail",function(){return K});var L="bankDetail",Q=$(b.Helmet,{},void 0,$("title",{},void 0,"Banks Manage")),U=$(q.a,{}),V=$(C.a,{},void 0," Banks "),G=$(p.a,{}),K=function(e){var t=e.all,a=t.data,n=t.page,c=t.size,i=t.totaldata,l=e.loading,d=e.loadAllRequest,b=e.clearOne,f=(e.setQueryValue,e.deleteOneRequest),u=e.classes,s=(e.query,e.push);e.clearQuery;Object(S.b)({key:L,reducer:N.a}),Object(P.b)({key:L,saga:I.a});var p=H(Object(r.useState)(!1),2),m=p[0],y=p[1],h=H(Object(r.useState)(""),2),j=h[0],w=h[1];Object(r.useEffect)(function(){d()},[]);var D={page:n,size:c,totaldata:i},E=a.map(function(e){var t=e._id,a=e.Bank_Name,n=e.Rate_Of_interest,r=e.Processing_Fees,c=e.Logo;return[c?$("img",{src:"".concat(z.g).concat(c.path),alt:"bank_image",style:{height:50,width:50}}):"",a,n,r,o.a.createElement(o.a.Fragment,null,$(g.a,{id:"tooltip-top",title:"Edit Bank",placement:"top",classes:{tooltip:u.tooltip}},void 0,$(v.a,{"aria-label":"Edit",className:u.tableActionButton,onClick:function(){return e=t,b(),void s("/admin/banks/edit/".concat(e));var e}},void 0,$(O.a,{className:"".concat(u.tableActionButtonIcon," ").concat(u.edit)}))),$(g.a,{id:"tooltip-top-start",title:"Remove",placement:"top",classes:{tooltip:u.tooltip}},void 0,$(v.a,{"aria-label":"Close",className:u.tableActionButton,onClick:function(){return e=t,y(!0),void w(e);var e}},void 0,$(A.a,{className:"".concat(u.tableActionButtonIcon," ").concat(u.close)}))))]});return o.a.createElement(o.a.Fragment,null,Q,$(x.a,{open:m,doClose:function(){y(!1)},doDelete:function(){return f(j),void y(!1)}}),$("div",{className:"flex justify-between mt-3 mb-3"},void 0,l&&!0===l?U:o.a.createElement(o.a.Fragment,null),V,$(k.a,{color:"primary","aria-label":"Add",className:u.fab,round:"true",onClick:function(){b(),s("/admin/banks/add")},elevation:0},void 0,G)),$(R.a,{loading:l},void 0,$(B.a,{tableHead:["Image","Bank Name","Rate of Interest","Processing fees",""],tableData:E,pagination:D,handlePagination:function(e){var t=e.page,a=e.size;d({page:t,size:a})}})))},W=Object(i.b)({all:Object(E.a)(),query:Object(E.e)(),loading:Object(E.c)()}),X=Object(c.connect)(W,M(M({},D),{},{push:d.push})),Y=u()(function(e){return{button:{margin:e.spacing.unit},fab:{width:"40px",height:"40px",marginTop:"auto",marginBottom:"auto"},tableActionButton:{padding:0,"&:hover":{background:"transparent",color:"#404040"}},waftsrch:{padding:0,position:"absolute",borderLeft:"1px solid #d9e3e9",borderRadius:0,"&:hover":{background:"transparent",color:"#404040"}}}});t.default=Object(l.compose)(Y,X,r.memo)(K)}}]);
>>>>>>> 41f64895ae2d4aeb7736fd90e084d7a063de2675:client/build/168.0b548975ec57f99fd42d.chunk.js