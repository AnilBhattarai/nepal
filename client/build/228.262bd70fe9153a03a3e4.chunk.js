<<<<<<< HEAD:client/build/225.c415394ab50ccb0e245d.chunk.js
(window.webpackJsonp=window.webpackJsonp||[]).push([[225],{"5d5f7d90bb7f118c56a5":function(e,t,a){"use strict";a.r(t),a.d(t,"OwnerShipType",function(){return W});var n,r=a("8af190b70a6bc55c6f1b"),o=a.n(r),i=(a("8a2d1b95e05b6a321e74"),a("d7dd51e1bf6bfc2c9c3d")),c=a("a28fc3c963a1d4d1a2e5"),l=a("ab4cb61bcb2dc161defb"),d=a("3aced5b508e7389026da"),u=a("0d7f0986bcd2f33d8a2a"),f=a("4a683f0a5e64e66a8eb9"),b=a.n(f),s=a("c233babf320cd068509e"),p=a.n(s),y=a("29df10ef1bee6d38fd67"),m=a.n(y),v=a("e799c547a20a503b338f"),g=a.n(v),h=a("e68eb59aa96fc65ab714"),O=a.n(h),j=a("9095151026da8c51dd60"),w=a.n(j),S=a("e96e82762cfd5fe3a589"),k=a.n(S),A=a("ab7ebb4f5c369f043e8f"),P=a.n(A),x=a("73bb0e359204f9566244"),E=a("adc20f99e57c573c589c"),N=a("d95b0cf107403b178365"),C=a("96f4be710d88d446a306"),D=a("8e58eee59839dcfa01be"),T=a("bbf2ab47451f68bffe03"),B=a("9717046cce25567424f8"),I=a("d733903be61208652859"),R=a("5932430beb0c05240602"),_=a("61118b78f8958645f2e4"),q=a("2fad9e66eff5130ad191");function z(e,t){var a=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter(function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable})),a.push.apply(a,n)}return a}function F(e){for(var t=1;t<arguments.length;t++){var a=null!=arguments[t]?arguments[t]:{};t%2?z(Object(a),!0).forEach(function(t){$(e,t,a[t])}):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(a)):z(Object(a)).forEach(function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(a,t))})}return e}function $(e,t,a){return t in e?Object.defineProperty(e,t,{value:a,enumerable:!0,configurable:!0,writable:!0}):e[t]=a,e}function H(e,t,a,r){n||(n="function"===typeof Symbol&&Symbol.for&&Symbol.for("react.element")||60103);var o=e&&e.defaultProps,i=arguments.length-3;if(t||0===i||(t={children:void 0}),1===i)t.children=r;else if(i>1){for(var c=new Array(i),l=0;l<i;l++)c[l]=arguments[l+3];t.children=c}if(t&&o)for(var d in o)void 0===t[d]&&(t[d]=o[d]);else t||(t=o||{});return{$$typeof:n,type:e,key:void 0===a?null:""+a,ref:null,props:t,_owner:null}}function J(e,t){return function(e){if(Array.isArray(e))return e}(e)||function(e,t){var a=null==e?null:"undefined"!==typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(null==a)return;var n,r,o=[],i=!0,c=!1;try{for(a=a.call(e);!(i=(n=a.next()).done)&&(o.push(n.value),!t||o.length!==t);i=!0);}catch(e){c=!0,r=e}finally{try{i||null==a.return||a.return()}finally{if(c)throw r}}return o}(e,t)||function(e,t){if(!e)return;if("string"===typeof e)return M(e,t);var a=Object.prototype.toString.call(e).slice(8,-1);"Object"===a&&e.constructor&&(a=e.constructor.name);if("Map"===a||"Set"===a)return Array.from(e);if("Arguments"===a||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(a))return M(e,t)}(e,t)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function M(e,t){(null==t||t>e.length)&&(t=e.length);for(var a=0,n=new Array(t);a<t;a++)n[a]=e[a];return n}var K="ownerShipType",L=H(u.Helmet,{},void 0,H("title",{},void 0,"OwnerShip Type Manage")),Q=H(q.a,{}),U=H(I.a,{},void 0,"OwnerShip Type "),V=H(p.a,{}),G=H(w.a,{}),W=function(e){var t=e.all,a=t.data,n=t.page,i=t.size,c=t.totaldata,l=e.loading,d=e.loadAllRequest,u=e.clearOne,f=e.setQueryValue,b=e.deleteOneRequest,s=e.classes,p=e.query,y=e.push;Object(N.a)({key:K,reducer:T.a}),Object(E.a)({key:K,saga:B.a});var v=J(Object(r.useState)(!1),2),h=v[0],j=v[1],w=J(Object(r.useState)(""),2),S=w[0],A=w[1];Object(r.useEffect)(function(){d()},[]);var C=function(){d(p)},D={page:n,size:i,totaldata:c},I=a.map(function(e){var t=e._id,a=e.title;return[e.order,e.is_active?"active":"in-active",a,e.description,o.a.createElement(o.a.Fragment,null,H(m.a,{id:"tooltip-top",title:"Edit",placement:"top",classes:{tooltip:s.tooltip}},void 0,H(g.a,{"aria-label":"Edit",className:s.tableActionButton,onClick:function(){y("/admin/ownership-type-manage/edit/".concat(t))}},void 0,H(O.a,{className:"".concat(s.tableActionButtonIcon," ").concat(s.edit)}))),H(m.a,{id:"tooltip-top-start",title:"Remove",placement:"top",classes:{tooltip:s.tooltip}},void 0,H(g.a,{"aria-label":"Close",className:s.tableActionButton,onClick:function(){return e=t,j(!0),void A(e);var e}},void 0,H(P.a,{className:"".concat(s.tableActionButtonIcon," ").concat(s.close)}))))]});return o.a.createElement(o.a.Fragment,null,L,H(_.a,{open:h,doClose:function(){j(!1)},doDelete:function(){return b(S),void j(!1)}}),H("div",{className:"flex justify-between mt-3 mb-3"},void 0,l&&!0===l?Q:o.a.createElement(o.a.Fragment,null),U,H(k.a,{color:"primary","aria-label":"Add",className:s.fab,round:"true",onClick:function(){u(),y("/admin/ownership-type-manage/add")},elevation:0},void 0,V)),H(R.a,{loading:l},void 0,H("div",{className:"flex justify-end"},void 0,H("div",{className:"waftformgroup flex relative mr-2"},void 0,H("input",{type:"text",name:"find_title",id:"contents-title",placeholder:"Search by title",className:"m-auto inputbox",value:p.find_title,onChange:function(e){e.persist(),f({key:e.target.name,value:e.target.value})},style:{paddingRight:"50px"},onKeyPress:function(e){"Enter"===e.key&&C()}}),H(g.a,{"aria-label":"Search",className:"waftsrchstyle",onClick:C},void 0,G))),H(x.a,{tableHead:["Order","Is active","Title","Description",""],tableData:I,pagination:D,handlePagination:function(e){var t=e.page,a=e.size;d({page:t,size:a})}})))},X=Object(c.b)({all:Object(D.a)(),query:Object(D.e)(),loading:Object(D.c)()}),Y=Object(i.connect)(X,F(F({},C),{},{push:d.push})),Z=Object(N.a)({key:K,reducer:T.a}),ee=Object(E.a)({key:K,saga:B.a}),te=b()(function(e){return{button:{margin:e.spacing.unit},fab:{width:"40px",height:"40px",marginTop:"auto",marginBottom:"auto"},tableActionButton:{padding:0,"&:hover":{background:"transparent",color:"#404040"}},waftsrch:{padding:0,position:"absolute",borderLeft:"1px solid #d9e3e9",borderRadius:0,"&:hover":{background:"transparent",color:"#404040"}}}});t.default=Object(l.compose)(Z,ee,te,Y,r.memo)(W)}}]);
=======
(window.webpackJsonp=window.webpackJsonp||[]).push([[228],{"5d5f7d90bb7f118c56a5":function(e,t,a){"use strict";a.r(t),a.d(t,"OwnerShipType",function(){return W});var n,r=a("8af190b70a6bc55c6f1b"),o=a.n(r),i=(a("8a2d1b95e05b6a321e74"),a("d7dd51e1bf6bfc2c9c3d")),c=a("a28fc3c963a1d4d1a2e5"),l=a("ab4cb61bcb2dc161defb"),d=a("3aced5b508e7389026da"),u=a("0d7f0986bcd2f33d8a2a"),f=a("4a683f0a5e64e66a8eb9"),b=a.n(f),s=a("c233babf320cd068509e"),p=a.n(s),y=a("29df10ef1bee6d38fd67"),m=a.n(y),v=a("e799c547a20a503b338f"),g=a.n(v),h=a("e68eb59aa96fc65ab714"),O=a.n(h),j=a("9095151026da8c51dd60"),w=a.n(j),S=a("e96e82762cfd5fe3a589"),k=a.n(S),A=a("ab7ebb4f5c369f043e8f"),P=a.n(A),x=a("73bb0e359204f9566244"),E=a("adc20f99e57c573c589c"),N=a("d95b0cf107403b178365"),C=a("96f4be710d88d446a306"),D=a("8e58eee59839dcfa01be"),T=a("bbf2ab47451f68bffe03"),B=a("9717046cce25567424f8"),I=a("d733903be61208652859"),R=a("5932430beb0c05240602"),_=a("61118b78f8958645f2e4"),q=a("2fad9e66eff5130ad191");function z(e,t){var a=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter(function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable})),a.push.apply(a,n)}return a}function F(e){for(var t=1;t<arguments.length;t++){var a=null!=arguments[t]?arguments[t]:{};t%2?z(Object(a),!0).forEach(function(t){$(e,t,a[t])}):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(a)):z(Object(a)).forEach(function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(a,t))})}return e}function $(e,t,a){return t in e?Object.defineProperty(e,t,{value:a,enumerable:!0,configurable:!0,writable:!0}):e[t]=a,e}function H(e,t,a,r){n||(n="function"===typeof Symbol&&Symbol.for&&Symbol.for("react.element")||60103);var o=e&&e.defaultProps,i=arguments.length-3;if(t||0===i||(t={children:void 0}),1===i)t.children=r;else if(i>1){for(var c=new Array(i),l=0;l<i;l++)c[l]=arguments[l+3];t.children=c}if(t&&o)for(var d in o)void 0===t[d]&&(t[d]=o[d]);else t||(t=o||{});return{$$typeof:n,type:e,key:void 0===a?null:""+a,ref:null,props:t,_owner:null}}function J(e,t){return function(e){if(Array.isArray(e))return e}(e)||function(e,t){var a=null==e?null:"undefined"!==typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(null==a)return;var n,r,o=[],i=!0,c=!1;try{for(a=a.call(e);!(i=(n=a.next()).done)&&(o.push(n.value),!t||o.length!==t);i=!0);}catch(e){c=!0,r=e}finally{try{i||null==a.return||a.return()}finally{if(c)throw r}}return o}(e,t)||function(e,t){if(!e)return;if("string"===typeof e)return M(e,t);var a=Object.prototype.toString.call(e).slice(8,-1);"Object"===a&&e.constructor&&(a=e.constructor.name);if("Map"===a||"Set"===a)return Array.from(e);if("Arguments"===a||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(a))return M(e,t)}(e,t)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function M(e,t){(null==t||t>e.length)&&(t=e.length);for(var a=0,n=new Array(t);a<t;a++)n[a]=e[a];return n}var K="ownerShipType",L=H(u.Helmet,{},void 0,H("title",{},void 0,"OwnerShip Type Manage")),Q=H(q.a,{}),U=H(I.a,{},void 0,"OwnerShip Type "),V=H(p.a,{}),G=H(w.a,{}),W=function(e){var t=e.all,a=t.data,n=t.page,i=t.size,c=t.totaldata,l=e.loading,d=e.loadAllRequest,u=e.clearOne,f=e.setQueryValue,b=e.deleteOneRequest,s=e.classes,p=e.query,y=e.push;Object(N.a)({key:K,reducer:T.a}),Object(E.a)({key:K,saga:B.a});var v=J(Object(r.useState)(!1),2),h=v[0],j=v[1],w=J(Object(r.useState)(""),2),S=w[0],A=w[1];Object(r.useEffect)(function(){d()},[]);var C=function(){d(p)},D={page:n,size:i,totaldata:c},I=a.map(function(e){var t=e._id,a=e.title;return[e.order,e.is_active?"active":"in-active",a,e.description,o.a.createElement(o.a.Fragment,null,H(m.a,{id:"tooltip-top",title:"Edit",placement:"top",classes:{tooltip:s.tooltip}},void 0,H(g.a,{"aria-label":"Edit",className:s.tableActionButton,onClick:function(){y("/admin/ownership-type-manage/edit/".concat(t))}},void 0,H(O.a,{className:"".concat(s.tableActionButtonIcon," ").concat(s.edit)}))),H(m.a,{id:"tooltip-top-start",title:"Remove",placement:"top",classes:{tooltip:s.tooltip}},void 0,H(g.a,{"aria-label":"Close",className:s.tableActionButton,onClick:function(){return e=t,j(!0),void A(e);var e}},void 0,H(P.a,{className:"".concat(s.tableActionButtonIcon," ").concat(s.close)}))))]});return o.a.createElement(o.a.Fragment,null,L,H(_.a,{open:h,doClose:function(){j(!1)},doDelete:function(){return b(S),void j(!1)}}),H("div",{className:"flex justify-between mt-3 mb-3"},void 0,l&&!0===l?Q:o.a.createElement(o.a.Fragment,null),U,H(k.a,{color:"primary","aria-label":"Add",className:s.fab,round:"true",onClick:function(){u(),y("/admin/ownership-type-manage/add")},elevation:0},void 0,V)),H(R.a,{loading:l},void 0,H("div",{className:"flex justify-end"},void 0,H("div",{className:"waftformgroup flex relative mr-2"},void 0,H("input",{type:"text",name:"find_title",id:"contents-title",placeholder:"Search by title",className:"m-auto inputbox",value:p.find_title,onChange:function(e){e.persist(),f({key:e.target.name,value:e.target.value})},style:{paddingRight:"50px"},onKeyPress:function(e){"Enter"===e.key&&C()}}),H(g.a,{"aria-label":"Search",className:"waftsrchstyle",onClick:C},void 0,G))),H(x.a,{tableHead:["Order","Is active","Title","Description",""],tableData:I,pagination:D,handlePagination:function(e){var t=e.page,a=e.size;d({page:t,size:a})}})))},X=Object(c.b)({all:Object(D.a)(),query:Object(D.e)(),loading:Object(D.c)()}),Y=Object(i.connect)(X,F(F({},C),{},{push:d.push})),Z=Object(N.a)({key:K,reducer:T.a}),ee=Object(E.a)({key:K,saga:B.a}),te=b()(function(e){return{button:{margin:e.spacing.unit},fab:{width:"40px",height:"40px",marginTop:"auto",marginBottom:"auto"},tableActionButton:{padding:0,"&:hover":{background:"transparent",color:"#404040"}},waftsrch:{padding:0,position:"absolute",borderLeft:"1px solid #d9e3e9",borderRadius:0,"&:hover":{background:"transparent",color:"#404040"}}}});t.default=Object(l.compose)(Z,ee,te,Y,r.memo)(W)}}]);
>>>>>>> 41f64895ae2d4aeb7736fd90e084d7a063de2675:client/build/228.262bd70fe9153a03a3e4.chunk.js
