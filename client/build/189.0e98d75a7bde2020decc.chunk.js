<<<<<<< HEAD:client/build/186.bb8e00f000264a2bfcab.chunk.js
(window.webpackJsonp=window.webpackJsonp||[]).push([[186],{d79ab65b44be0d778b5b:function(e,t,a){"use strict";a.r(t),a.d(t,"Currency",function(){return G});var n,r=a("8af190b70a6bc55c6f1b"),o=a.n(r),c=(a("8a2d1b95e05b6a321e74"),a("d7dd51e1bf6bfc2c9c3d")),i=a("a28fc3c963a1d4d1a2e5"),l=a("ab4cb61bcb2dc161defb"),u=a("3aced5b508e7389026da"),d=a("0d7f0986bcd2f33d8a2a"),f=a("4a683f0a5e64e66a8eb9"),b=a.n(f),s=a("c233babf320cd068509e"),p=a.n(s),y=a("29df10ef1bee6d38fd67"),m=a.n(y),v=a("e799c547a20a503b338f"),g=a.n(v),h=a("e68eb59aa96fc65ab714"),O=a.n(h),j=a("9095151026da8c51dd60"),w=a.n(j),A=a("e96e82762cfd5fe3a589"),k=a.n(A),S=a("ab7ebb4f5c369f043e8f"),P=a.n(S),C=a("73bb0e359204f9566244"),x=a("adc20f99e57c573c589c"),E=a("d95b0cf107403b178365"),N=a("6db8f1c73ae604d2dc3a"),D=a("294000dd6eddfa9ffb90"),I=a("cde7ce7b68147c92b3fe"),B=a("a7740874416f23397473"),R=a("d733903be61208652859"),_=a("5932430beb0c05240602"),q=a("61118b78f8958645f2e4"),z=a("2fad9e66eff5130ad191");function F(e,t){var a=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter(function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable})),a.push.apply(a,n)}return a}function T(e){for(var t=1;t<arguments.length;t++){var a=null!=arguments[t]?arguments[t]:{};t%2?F(Object(a),!0).forEach(function(t){$(e,t,a[t])}):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(a)):F(Object(a)).forEach(function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(a,t))})}return e}function $(e,t,a){return t in e?Object.defineProperty(e,t,{value:a,enumerable:!0,configurable:!0,writable:!0}):e[t]=a,e}function H(e,t,a,r){n||(n="function"===typeof Symbol&&Symbol.for&&Symbol.for("react.element")||60103);var o=e&&e.defaultProps,c=arguments.length-3;if(t||0===c||(t={children:void 0}),1===c)t.children=r;else if(c>1){for(var i=new Array(c),l=0;l<c;l++)i[l]=arguments[l+3];t.children=i}if(t&&o)for(var u in o)void 0===t[u]&&(t[u]=o[u]);else t||(t=o||{});return{$$typeof:n,type:e,key:void 0===a?null:""+a,ref:null,props:t,_owner:null}}function J(e,t){return function(e){if(Array.isArray(e))return e}(e)||function(e,t){var a=null==e?null:"undefined"!==typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(null==a)return;var n,r,o=[],c=!0,i=!1;try{for(a=a.call(e);!(c=(n=a.next()).done)&&(o.push(n.value),!t||o.length!==t);c=!0);}catch(e){i=!0,r=e}finally{try{c||null==a.return||a.return()}finally{if(i)throw r}}return o}(e,t)||function(e,t){if(!e)return;if("string"===typeof e)return M(e,t);var a=Object.prototype.toString.call(e).slice(8,-1);"Object"===a&&e.constructor&&(a=e.constructor.name);if("Map"===a||"Set"===a)return Array.from(e);if("Arguments"===a||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(a))return M(e,t)}(e,t)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function M(e,t){(null==t||t>e.length)&&(t=e.length);for(var a=0,n=new Array(t);a<t;a++)n[a]=e[a];return n}var V=H(d.Helmet,{},void 0,H("title",{},void 0,"Currency Manage")),K=H(z.a,{}),L=H(R.a,{},void 0," Currency "),Q=H(p.a,{}),U=H(w.a,{}),G=function(e){var t=e.all,a=t.data,n=t.page,c=t.size,i=t.totaldata,l=e.loading,u=e.loadAllRequest,d=e.clearOne,f=e.setQueryValue,b=e.deleteOneRequest,s=e.classes,p=e.query,y=e.push;Object(E.b)({key:"currency",reducer:I.a}),Object(x.b)({key:"currency",saga:B.a});var v=J(Object(r.useState)(!1),2),h=v[0],j=v[1],w=J(Object(r.useState)(""),2),A=w[0],S=w[1];Object(r.useEffect)(function(){u()},[]);var N=function(){u(p)},D={page:n,size:c,totaldata:i},R=a.map(function(e){var t=e._id;return[e.title,e.value,e.order,e.description,e.is_active?"Active":"In-active",o.a.createElement(o.a.Fragment,null,H(m.a,{id:"tooltip-top",title:"Edit",placement:"top",classes:{tooltip:s.tooltip}},void 0,H(g.a,{"aria-label":"Edit",className:s.tableActionButton,onClick:function(){y("/admin/currency/edit/".concat(t))}},void 0,H(O.a,{className:"".concat(s.tableActionButtonIcon," ").concat(s.edit)}))),H(m.a,{id:"tooltip-top-start",title:"Remove",placement:"top",classes:{tooltip:s.tooltip}},void 0,H(g.a,{"aria-label":"Close",className:s.tableActionButton,onClick:function(){return e=t,j(!0),void S(e);var e}},void 0,H(P.a,{className:"".concat(s.tableActionButtonIcon," ").concat(s.close)}))))]});return o.a.createElement(o.a.Fragment,null,V,H(q.a,{open:h,doClose:function(){j(!1)},doDelete:function(){return b(A),void j(!1)}}),H("div",{className:"flex justify-between mt-3 mb-3"},void 0,l&&!0===l?K:o.a.createElement(o.a.Fragment,null),L,H(k.a,{color:"primary","aria-label":"Add",className:s.fab,round:"true",onClick:function(){d(),y("/admin/currency/add")},elevation:0},void 0,Q)),H(_.a,{loading:l},void 0,H("div",{className:"flex justify-end"},void 0,H("div",{className:"waftformgroup flex relative mr-2"},void 0,H("input",{type:"text",name:"find_title",id:"contents-title",placeholder:"Search by title",className:"m-auto inputbox",value:p.find_title,onChange:function(e){e.persist(),f({key:e.target.name,value:e.target.value})},style:{paddingRight:"50px"},onKeyPress:function(e){"Enter"===e.key&&N()}}),H(g.a,{"aria-label":"Search",className:"waftsrchstyle",onClick:N},void 0,U))),H(C.a,{tableHead:["Title","Value","Order","Description","Is active?",""],tableData:R,pagination:D,handlePagination:function(){u({page:n,size:c})}})))},W=Object(i.b)({all:Object(D.a)(),query:Object(D.e)(),loading:Object(D.c)()}),X=Object(c.connect)(W,T(T({},N),{},{push:u.push})),Y=b()(function(e){return{button:{margin:e.spacing.unit},fab:{width:"40px",height:"40px",marginTop:"auto",marginBottom:"auto"},tableActionButton:{padding:0,"&:hover":{background:"transparent",color:"#404040"}},waftsrch:{padding:0,position:"absolute",borderLeft:"1px solid #d9e3e9",borderRadius:0,"&:hover":{background:"transparent",color:"#404040"}}}});t.default=Object(l.compose)(Y,X,r.memo)(G)}}]);
=======
(window.webpackJsonp=window.webpackJsonp||[]).push([[189],{d79ab65b44be0d778b5b:function(e,t,a){"use strict";a.r(t),a.d(t,"Currency",function(){return G});var n,r=a("8af190b70a6bc55c6f1b"),o=a.n(r),c=(a("8a2d1b95e05b6a321e74"),a("d7dd51e1bf6bfc2c9c3d")),i=a("a28fc3c963a1d4d1a2e5"),l=a("ab4cb61bcb2dc161defb"),u=a("3aced5b508e7389026da"),d=a("0d7f0986bcd2f33d8a2a"),f=a("4a683f0a5e64e66a8eb9"),b=a.n(f),s=a("c233babf320cd068509e"),p=a.n(s),y=a("29df10ef1bee6d38fd67"),m=a.n(y),v=a("e799c547a20a503b338f"),g=a.n(v),h=a("e68eb59aa96fc65ab714"),O=a.n(h),j=a("9095151026da8c51dd60"),w=a.n(j),A=a("e96e82762cfd5fe3a589"),k=a.n(A),S=a("ab7ebb4f5c369f043e8f"),P=a.n(S),C=a("73bb0e359204f9566244"),x=a("adc20f99e57c573c589c"),E=a("d95b0cf107403b178365"),N=a("6db8f1c73ae604d2dc3a"),D=a("294000dd6eddfa9ffb90"),I=a("cde7ce7b68147c92b3fe"),B=a("a7740874416f23397473"),R=a("d733903be61208652859"),_=a("5932430beb0c05240602"),q=a("61118b78f8958645f2e4"),z=a("2fad9e66eff5130ad191");function F(e,t){var a=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter(function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable})),a.push.apply(a,n)}return a}function T(e){for(var t=1;t<arguments.length;t++){var a=null!=arguments[t]?arguments[t]:{};t%2?F(Object(a),!0).forEach(function(t){$(e,t,a[t])}):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(a)):F(Object(a)).forEach(function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(a,t))})}return e}function $(e,t,a){return t in e?Object.defineProperty(e,t,{value:a,enumerable:!0,configurable:!0,writable:!0}):e[t]=a,e}function H(e,t,a,r){n||(n="function"===typeof Symbol&&Symbol.for&&Symbol.for("react.element")||60103);var o=e&&e.defaultProps,c=arguments.length-3;if(t||0===c||(t={children:void 0}),1===c)t.children=r;else if(c>1){for(var i=new Array(c),l=0;l<c;l++)i[l]=arguments[l+3];t.children=i}if(t&&o)for(var u in o)void 0===t[u]&&(t[u]=o[u]);else t||(t=o||{});return{$$typeof:n,type:e,key:void 0===a?null:""+a,ref:null,props:t,_owner:null}}function J(e,t){return function(e){if(Array.isArray(e))return e}(e)||function(e,t){var a=null==e?null:"undefined"!==typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(null==a)return;var n,r,o=[],c=!0,i=!1;try{for(a=a.call(e);!(c=(n=a.next()).done)&&(o.push(n.value),!t||o.length!==t);c=!0);}catch(e){i=!0,r=e}finally{try{c||null==a.return||a.return()}finally{if(i)throw r}}return o}(e,t)||function(e,t){if(!e)return;if("string"===typeof e)return M(e,t);var a=Object.prototype.toString.call(e).slice(8,-1);"Object"===a&&e.constructor&&(a=e.constructor.name);if("Map"===a||"Set"===a)return Array.from(e);if("Arguments"===a||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(a))return M(e,t)}(e,t)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function M(e,t){(null==t||t>e.length)&&(t=e.length);for(var a=0,n=new Array(t);a<t;a++)n[a]=e[a];return n}var V=H(d.Helmet,{},void 0,H("title",{},void 0,"Currency Manage")),K=H(z.a,{}),L=H(R.a,{},void 0," Currency "),Q=H(p.a,{}),U=H(w.a,{}),G=function(e){var t=e.all,a=t.data,n=t.page,c=t.size,i=t.totaldata,l=e.loading,u=e.loadAllRequest,d=e.clearOne,f=e.setQueryValue,b=e.deleteOneRequest,s=e.classes,p=e.query,y=e.push;Object(E.b)({key:"currency",reducer:I.a}),Object(x.b)({key:"currency",saga:B.a});var v=J(Object(r.useState)(!1),2),h=v[0],j=v[1],w=J(Object(r.useState)(""),2),A=w[0],S=w[1];Object(r.useEffect)(function(){u()},[]);var N=function(){u(p)},D={page:n,size:c,totaldata:i},R=a.map(function(e){var t=e._id;return[e.title,e.value,e.order,e.description,e.is_active?"Active":"In-active",o.a.createElement(o.a.Fragment,null,H(m.a,{id:"tooltip-top",title:"Edit",placement:"top",classes:{tooltip:s.tooltip}},void 0,H(g.a,{"aria-label":"Edit",className:s.tableActionButton,onClick:function(){y("/admin/currency/edit/".concat(t))}},void 0,H(O.a,{className:"".concat(s.tableActionButtonIcon," ").concat(s.edit)}))),H(m.a,{id:"tooltip-top-start",title:"Remove",placement:"top",classes:{tooltip:s.tooltip}},void 0,H(g.a,{"aria-label":"Close",className:s.tableActionButton,onClick:function(){return e=t,j(!0),void S(e);var e}},void 0,H(P.a,{className:"".concat(s.tableActionButtonIcon," ").concat(s.close)}))))]});return o.a.createElement(o.a.Fragment,null,V,H(q.a,{open:h,doClose:function(){j(!1)},doDelete:function(){return b(A),void j(!1)}}),H("div",{className:"flex justify-between mt-3 mb-3"},void 0,l&&!0===l?K:o.a.createElement(o.a.Fragment,null),L,H(k.a,{color:"primary","aria-label":"Add",className:s.fab,round:"true",onClick:function(){d(),y("/admin/currency/add")},elevation:0},void 0,Q)),H(_.a,{loading:l},void 0,H("div",{className:"flex justify-end"},void 0,H("div",{className:"waftformgroup flex relative mr-2"},void 0,H("input",{type:"text",name:"find_title",id:"contents-title",placeholder:"Search by title",className:"m-auto inputbox",value:p.find_title,onChange:function(e){e.persist(),f({key:e.target.name,value:e.target.value})},style:{paddingRight:"50px"},onKeyPress:function(e){"Enter"===e.key&&N()}}),H(g.a,{"aria-label":"Search",className:"waftsrchstyle",onClick:N},void 0,U))),H(C.a,{tableHead:["Title","Value","Order","Description","Is active?",""],tableData:R,pagination:D,handlePagination:function(){u({page:n,size:c})}})))},W=Object(i.b)({all:Object(D.a)(),query:Object(D.e)(),loading:Object(D.c)()}),X=Object(c.connect)(W,T(T({},N),{},{push:u.push})),Y=b()(function(e){return{button:{margin:e.spacing.unit},fab:{width:"40px",height:"40px",marginTop:"auto",marginBottom:"auto"},tableActionButton:{padding:0,"&:hover":{background:"transparent",color:"#404040"}},waftsrch:{padding:0,position:"absolute",borderLeft:"1px solid #d9e3e9",borderRadius:0,"&:hover":{background:"transparent",color:"#404040"}}}});t.default=Object(l.compose)(Y,X,r.memo)(G)}}]);
>>>>>>> 41f64895ae2d4aeb7736fd90e084d7a063de2675:client/build/189.0e98d75a7bde2020decc.chunk.js
