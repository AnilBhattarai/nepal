<<<<<<< HEAD:client/build/175.3e31193ba52a14b4c801.chunk.js
(window.webpackJsonp=window.webpackJsonp||[]).push([[175],{ecbfd486c20fa119ce62:function(e,t,a){"use strict";a.r(t),a.d(t,"Career",function(){return J});var n,r=a("8af190b70a6bc55c6f1b"),o=a.n(r),c=(a("8a2d1b95e05b6a321e74"),a("d7dd51e1bf6bfc2c9c3d")),i=a("a28fc3c963a1d4d1a2e5"),l=a("ab4cb61bcb2dc161defb"),d=a("3aced5b508e7389026da"),u=(a("da010f21fea25912dd9e"),a("0d7f0986bcd2f33d8a2a")),f=a("4a683f0a5e64e66a8eb9"),s=a.n(f),b=a("29df10ef1bee6d38fd67"),p=a.n(b),m=a("e799c547a20a503b338f"),y=a.n(m),v=a("9095151026da8c51dd60"),g=a.n(v),h=a("ab7ebb4f5c369f043e8f"),O=a.n(h),j=a("73bb0e359204f9566244"),w=a("adc20f99e57c573c589c"),A=a("d95b0cf107403b178365"),S=a("d733903be61208652859"),k=a("5932430beb0c05240602"),P=a("837d8d69b2ae7bc72746"),x=a("c7fbdc4a931d53496e02"),E=a("4626dfed4b6092807749"),C=a("dd759665234b97edd49d"),D=a("61118b78f8958645f2e4"),N=a("2fad9e66eff5130ad191");function R(e,t){var a=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter(function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable})),a.push.apply(a,n)}return a}function q(e){for(var t=1;t<arguments.length;t++){var a=null!=arguments[t]?arguments[t]:{};t%2?R(Object(a),!0).forEach(function(t){I(e,t,a[t])}):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(a)):R(Object(a)).forEach(function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(a,t))})}return e}function I(e,t,a){return t in e?Object.defineProperty(e,t,{value:a,enumerable:!0,configurable:!0,writable:!0}):e[t]=a,e}function _(e,t,a,r){n||(n="function"===typeof Symbol&&Symbol.for&&Symbol.for("react.element")||60103);var o=e&&e.defaultProps,c=arguments.length-3;if(t||0===c||(t={children:void 0}),1===c)t.children=r;else if(c>1){for(var i=new Array(c),l=0;l<c;l++)i[l]=arguments[l+3];t.children=i}if(t&&o)for(var d in o)void 0===t[d]&&(t[d]=o[d]);else t||(t=o||{});return{$$typeof:n,type:e,key:void 0===a?null:""+a,ref:null,props:t,_owner:null}}function z(e,t){return function(e){if(Array.isArray(e))return e}(e)||function(e,t){var a=null==e?null:"undefined"!==typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(null==a)return;var n,r,o=[],c=!0,i=!1;try{for(a=a.call(e);!(c=(n=a.next()).done)&&(o.push(n.value),!t||o.length!==t);c=!0);}catch(e){i=!0,r=e}finally{try{c||null==a.return||a.return()}finally{if(i)throw r}}return o}(e,t)||function(e,t){if(!e)return;if("string"===typeof e)return B(e,t);var a=Object.prototype.toString.call(e).slice(8,-1);"Object"===a&&e.constructor&&(a=e.constructor.name);if("Map"===a||"Set"===a)return Array.from(e);if("Arguments"===a||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(a))return B(e,t)}(e,t)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function B(e,t){(null==t||t>e.length)&&(t=e.length);for(var a=0,n=new Array(t);a<t;a++)n[a]=e[a];return n}var U=_("div",{},void 0,_(u.Helmet,{},void 0,_("title",{},void 0,"Applied Users"),_("meta",{name:"description",content:"Description of Career"}))),F=_(N.a,{}),$=_(S.a,{},void 0,"Applied Users"),H=_(g.a,{}),J=function(e){var t=e.applied_users,a=t.data,n=t.page,c=t.size,i=t.totaldata,l=e.loading,d=e.loadAllRequest,u=e.loadAppliedUsersRequest,f=(e.clearOne,e.setQueryValue),s=e.deleteOneRequest,b=e.classes,m=e.query;e.push;Object(A.b)({key:"career",reducer:E.a}),Object(w.b)({key:"career",saga:C.a});var v=z(Object(r.useState)(!1),2),g=v[0],h=v[1],S=z(Object(r.useState)(""),2),P=S[0],x=S[1];Object(r.useEffect)(function(){u(m)},[]);var N=function(){d(m)},R={page:n,size:c,totaldata:i},q=a.map(function(e){var t=e._id,a=e.name,n=e.email;return[t,a,n,o.a.createElement(o.a.Fragment,null,_(p.a,{id:"tooltip-top-start",title:"Remove",placement:"top",classes:{tooltip:b.tooltip}},void 0,_(y.a,{"aria-label":"Close",className:b.tableActionButton,onClick:function(){return function(e){h(!0),x(e)}(t)}},void 0,_(O.a,{className:"".concat(b.tableActionButtonIcon," ").concat(b.close)}))))]});return o.a.createElement(o.a.Fragment,null,U,_(D.a,{open:g,doClose:function(){h(!1)},doDelete:function(){return s(P),void h(!1)}}),_("div",{className:"flex justify-between mt-3 mb-3"},void 0,l&&!0===l?F:o.a.createElement(o.a.Fragment,null),$),_(k.a,{loading:l},void 0,_("div",{className:"flex justify-end"},void 0,_("div",{className:"waftformgroup flex relative mr-2"},void 0,_("input",{type:"text",name:"name",id:"_id",placeholder:"Search by name",className:"m-auto inputbox",value:m.name,onChange:function(e){e.persist(),f({key:e.target.name,value:e.target.value})},style:{paddingRight:"50px"},onKeyPress:function(e){"Enter"===e.key&&N()}}),_(y.a,{"aria-label":"Search",className:"waftsrchstyle",onClick:N},void 0,H))),_(j.a,{classes:b,tableHead:["ID","Name","Email","action"],tableData:q,pagination:R,handlePagination:function(e){var t=e.page,a=e.size;d({page:t,size:a})}})))},T=Object(i.b)({all:Object(x.a)(),applied_users:Object(x.b)(),query:Object(x.f)(),loading:Object(x.d)()}),K=Object(c.connect)(T,q(q({},P),{},{push:d.push})),L=s()(function(e){return{button:{margin:e.spacing.unit},fab:{width:"40px",height:"40px",marginTop:"auto",marginBottom:"auto"},tableActionButton:{padding:0,"&:hover":{background:"transparent",color:"#404040"}},waftsrch:{padding:0,position:"absolute",borderLeft:"1px solid #d9e3e9",borderRadius:0,"&:hover":{background:"transparent",color:"#404040"}}}});t.default=Object(l.compose)(K,L,r.memo)(J)}}]);
=======
(window.webpackJsonp=window.webpackJsonp||[]).push([[178],{ecbfd486c20fa119ce62:function(e,t,a){"use strict";a.r(t),a.d(t,"Career",function(){return J});var n,r=a("8af190b70a6bc55c6f1b"),o=a.n(r),c=(a("8a2d1b95e05b6a321e74"),a("d7dd51e1bf6bfc2c9c3d")),i=a("a28fc3c963a1d4d1a2e5"),l=a("ab4cb61bcb2dc161defb"),d=a("3aced5b508e7389026da"),u=(a("da010f21fea25912dd9e"),a("0d7f0986bcd2f33d8a2a")),f=a("4a683f0a5e64e66a8eb9"),s=a.n(f),b=a("29df10ef1bee6d38fd67"),p=a.n(b),m=a("e799c547a20a503b338f"),y=a.n(m),v=a("9095151026da8c51dd60"),g=a.n(v),h=a("ab7ebb4f5c369f043e8f"),O=a.n(h),j=a("73bb0e359204f9566244"),w=a("adc20f99e57c573c589c"),A=a("d95b0cf107403b178365"),S=a("d733903be61208652859"),k=a("5932430beb0c05240602"),P=a("837d8d69b2ae7bc72746"),x=a("c7fbdc4a931d53496e02"),E=a("4626dfed4b6092807749"),C=a("dd759665234b97edd49d"),D=a("61118b78f8958645f2e4"),N=a("2fad9e66eff5130ad191");function R(e,t){var a=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter(function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable})),a.push.apply(a,n)}return a}function q(e){for(var t=1;t<arguments.length;t++){var a=null!=arguments[t]?arguments[t]:{};t%2?R(Object(a),!0).forEach(function(t){I(e,t,a[t])}):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(a)):R(Object(a)).forEach(function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(a,t))})}return e}function I(e,t,a){return t in e?Object.defineProperty(e,t,{value:a,enumerable:!0,configurable:!0,writable:!0}):e[t]=a,e}function _(e,t,a,r){n||(n="function"===typeof Symbol&&Symbol.for&&Symbol.for("react.element")||60103);var o=e&&e.defaultProps,c=arguments.length-3;if(t||0===c||(t={children:void 0}),1===c)t.children=r;else if(c>1){for(var i=new Array(c),l=0;l<c;l++)i[l]=arguments[l+3];t.children=i}if(t&&o)for(var d in o)void 0===t[d]&&(t[d]=o[d]);else t||(t=o||{});return{$$typeof:n,type:e,key:void 0===a?null:""+a,ref:null,props:t,_owner:null}}function z(e,t){return function(e){if(Array.isArray(e))return e}(e)||function(e,t){var a=null==e?null:"undefined"!==typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(null==a)return;var n,r,o=[],c=!0,i=!1;try{for(a=a.call(e);!(c=(n=a.next()).done)&&(o.push(n.value),!t||o.length!==t);c=!0);}catch(e){i=!0,r=e}finally{try{c||null==a.return||a.return()}finally{if(i)throw r}}return o}(e,t)||function(e,t){if(!e)return;if("string"===typeof e)return B(e,t);var a=Object.prototype.toString.call(e).slice(8,-1);"Object"===a&&e.constructor&&(a=e.constructor.name);if("Map"===a||"Set"===a)return Array.from(e);if("Arguments"===a||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(a))return B(e,t)}(e,t)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function B(e,t){(null==t||t>e.length)&&(t=e.length);for(var a=0,n=new Array(t);a<t;a++)n[a]=e[a];return n}var U=_("div",{},void 0,_(u.Helmet,{},void 0,_("title",{},void 0,"Applied Users"),_("meta",{name:"description",content:"Description of Career"}))),F=_(N.a,{}),$=_(S.a,{},void 0,"Applied Users"),H=_(g.a,{}),J=function(e){var t=e.applied_users,a=t.data,n=t.page,c=t.size,i=t.totaldata,l=e.loading,d=e.loadAllRequest,u=e.loadAppliedUsersRequest,f=(e.clearOne,e.setQueryValue),s=e.deleteOneRequest,b=e.classes,m=e.query;e.push;Object(A.b)({key:"career",reducer:E.a}),Object(w.b)({key:"career",saga:C.a});var v=z(Object(r.useState)(!1),2),g=v[0],h=v[1],S=z(Object(r.useState)(""),2),P=S[0],x=S[1];Object(r.useEffect)(function(){u(m)},[]);var N=function(){d(m)},R={page:n,size:c,totaldata:i},q=a.map(function(e){var t=e._id,a=e.name,n=e.email;return[t,a,n,o.a.createElement(o.a.Fragment,null,_(p.a,{id:"tooltip-top-start",title:"Remove",placement:"top",classes:{tooltip:b.tooltip}},void 0,_(y.a,{"aria-label":"Close",className:b.tableActionButton,onClick:function(){return function(e){h(!0),x(e)}(t)}},void 0,_(O.a,{className:"".concat(b.tableActionButtonIcon," ").concat(b.close)}))))]});return o.a.createElement(o.a.Fragment,null,U,_(D.a,{open:g,doClose:function(){h(!1)},doDelete:function(){return s(P),void h(!1)}}),_("div",{className:"flex justify-between mt-3 mb-3"},void 0,l&&!0===l?F:o.a.createElement(o.a.Fragment,null),$),_(k.a,{loading:l},void 0,_("div",{className:"flex justify-end"},void 0,_("div",{className:"waftformgroup flex relative mr-2"},void 0,_("input",{type:"text",name:"name",id:"_id",placeholder:"Search by name",className:"m-auto inputbox",value:m.name,onChange:function(e){e.persist(),f({key:e.target.name,value:e.target.value})},style:{paddingRight:"50px"},onKeyPress:function(e){"Enter"===e.key&&N()}}),_(y.a,{"aria-label":"Search",className:"waftsrchstyle",onClick:N},void 0,H))),_(j.a,{classes:b,tableHead:["ID","Name","Email","action"],tableData:q,pagination:R,handlePagination:function(e){var t=e.page,a=e.size;d({page:t,size:a})}})))},T=Object(i.b)({all:Object(x.a)(),applied_users:Object(x.b)(),query:Object(x.f)(),loading:Object(x.d)()}),K=Object(c.connect)(T,q(q({},P),{},{push:d.push})),L=s()(function(e){return{button:{margin:e.spacing.unit},fab:{width:"40px",height:"40px",marginTop:"auto",marginBottom:"auto"},tableActionButton:{padding:0,"&:hover":{background:"transparent",color:"#404040"}},waftsrch:{padding:0,position:"absolute",borderLeft:"1px solid #d9e3e9",borderRadius:0,"&:hover":{background:"transparent",color:"#404040"}}}});t.default=Object(l.compose)(K,L,r.memo)(J)}}]);
>>>>>>> 41f64895ae2d4aeb7736fd90e084d7a063de2675:client/build/178.41ee1d04ddcfbfbe852f.chunk.js
