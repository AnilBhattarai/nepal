<<<<<<< HEAD:client/build/274.84eb5954ea0de9f35aff.chunk.js
(window.webpackJsonp=window.webpackJsonp||[]).push([[274],{"3bc5192fba83e925e79c":function(e,t,a){"use strict";a.r(t),a.d(t,"Vdc",function(){return L});var n,o=a("8af190b70a6bc55c6f1b"),r=a.n(o),i=(a("8a2d1b95e05b6a321e74"),a("d7dd51e1bf6bfc2c9c3d")),c=a("a28fc3c963a1d4d1a2e5"),l=a("ab4cb61bcb2dc161defb"),u=a("3aced5b508e7389026da"),d=a("0d7f0986bcd2f33d8a2a"),s=a("4a683f0a5e64e66a8eb9"),f=a.n(s),b=a("29df10ef1bee6d38fd67"),p=a.n(b),m=a("e799c547a20a503b338f"),v=a.n(m),g=a("e68eb59aa96fc65ab714"),y=a.n(g),h=a("9095151026da8c51dd60"),O=a.n(h),j=a("ab7ebb4f5c369f043e8f"),w=a.n(j),x=a("adc20f99e57c573c589c"),A=a("d95b0cf107403b178365"),N=a("68c4d40a8cb8aafb0818"),S=a("61118b78f8958645f2e4"),_=a("2fad9e66eff5130ad191"),k=a("d733903be61208652859"),C=a("5932430beb0c05240602"),P=a("73bb0e359204f9566244"),E=a("de6f895a456a11bcf307"),D=a("e18c367e90178b3b9199"),R=a("61c79228cb27537171c9"),q=a("9ad4601af50487591ec0");function B(e,t,a,o){n||(n="function"===typeof Symbol&&Symbol.for&&Symbol.for("react.element")||60103);var r=e&&e.defaultProps,i=arguments.length-3;if(t||0===i||(t={children:void 0}),1===i)t.children=o;else if(i>1){for(var c=new Array(i),l=0;l<i;l++)c[l]=arguments[l+3];t.children=c}if(t&&r)for(var u in r)void 0===t[u]&&(t[u]=r[u]);else t||(t=r||{});return{$$typeof:n,type:e,key:void 0===a?null:""+a,ref:null,props:t,_owner:null}}function I(e,t){var a=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter(function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable})),a.push.apply(a,n)}return a}function M(e){for(var t=1;t<arguments.length;t++){var a=null!=arguments[t]?arguments[t]:{};t%2?I(Object(a),!0).forEach(function(t){T(e,t,a[t])}):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(a)):I(Object(a)).forEach(function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(a,t))})}return e}function T(e,t,a){return t in e?Object.defineProperty(e,t,{value:a,enumerable:!0,configurable:!0,writable:!0}):e[t]=a,e}function V(e,t){return function(e){if(Array.isArray(e))return e}(e)||function(e,t){var a=null==e?null:"undefined"!==typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(null==a)return;var n,o,r=[],i=!0,c=!1;try{for(a=a.call(e);!(i=(n=a.next()).done)&&(r.push(n.value),!t||r.length!==t);i=!0);}catch(e){c=!0,o=e}finally{try{i||null==a.return||a.return()}finally{if(c)throw o}}return r}(e,t)||function(e,t){if(!e)return;if("string"===typeof e)return z(e,t);var a=Object.prototype.toString.call(e).slice(8,-1);"Object"===a&&e.constructor&&(a=e.constructor.name);if("Map"===a||"Set"===a)return Array.from(e);if("Arguments"===a||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(a))return z(e,t)}(e,t)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function z(e,t){(null==t||t>e.length)&&(t=e.length);for(var a=0,n=new Array(t);a<t;a++)n[a]=e[a];return n}var F=B(d.Helmet,{},void 0,B("title",{},void 0,"Vdc Manage")),$=B(_.a,{}),H=B(k.a,{},void 0,"Vdc/Municipality Manage"),J=B("option",{name:"all",value:""},"0","All"),Q=B("option",{name:"all",value:""},"0","All"),K=B(O.a,{}),L=function(e){Object(A.b)({key:"vdc",reducer:R.a}),Object(x.b)({key:"vdc",saga:q.a});var t=e.all,a=t.data,n=t.page,i=t.size,c=t.totaldata,l=e.loading,u=e.query,d=e.loadAllRequest,s=e.loadDistrictRequest,f=e.classes,b=e.push,m=e.district,g=e.state,h=(e.clearOne,e.deleteOneRequest),O=e.setQueryValue,j=e.clearQuery,_=e.addIsActiveRequest,k=e.active_status,E=e.loadStateRequest,D=V(Object(o.useState)(!1),2),I=D[0],T=D[1],z=V(Object(o.useState)(""),2),L=z[0],U=z[1];Object(o.useEffect)(function(){j(),s(u),E(),d(u)},[]);var G=function(e){return function(t){O({key:e,value:t.target.value})}},W=function(){d(u)},X={page:n,size:i,totaldata:c},Y=a.map(function(e){var t=e._id,a=e.name,n=e.is_active;return[e.state_id.name,e.district_id.name,a,r.a.createElement(r.a.Fragment,null,B(N.a,{id:t,status:k,isOn:n,handleToggle:function(){return function(e,t){console.log("handleToggleChange",e,t),_({_id:e,status:t})}(t,n)}})),r.a.createElement(r.a.Fragment,null,B(p.a,{id:"tooltip-top",title:"Edit",placement:"top",classes:{tooltip:f.tooltip}},void 0,B(v.a,{"aria-label":"Edit",className:f.tableActionButton,onClick:function(){b("/admin/vdc-manage/edit/".concat(t))}},void 0,B(y.a,{className:"".concat(f.tableActionButtonIcon," ").concat(f.edit)}))),B(p.a,{id:"tooltip-top-start",title:"Remove",placement:"top",classes:{tooltip:f.tooltip}},void 0,B(v.a,{"aria-label":"Close",className:f.tableActionButton,onClick:function(){return e=t,T(!0),void U(e);var e}},void 0,B(w.a,{className:"".concat(f.tableActionButtonIcon," ").concat(f.close)}))))]});return r.a.createElement(r.a.Fragment,null,F,B(S.a,{msg:"This will delete area within this vdc!",open:I,doClose:function(){T(!1)},doDelete:function(){return h(L),void T(!1)}}),B("div",{className:"flex justify-between mt-3 mb-3"},void 0,l&&1==l?$:r.a.createElement(r.a.Fragment,null),H),B(C.a,{loading:l},void 0,B("div",{className:"flex justify-space-around"},void 0,B("div",{className:"flex justify"},void 0,B("div",{className:"waftformgroup flex relative mr-2"},void 0,B("select",{className:"inputbox",native:"true",onChange:G("state_id"),onClick:function(){s(u)}},void 0,J,g.map(function(e){return B("option",{name:e.name,value:e._id},e._id,e.name)})))),B("div",{className:"flex justify"},void 0,B("div",{className:"waftformgroup flex relative mr-2"},void 0,B("select",{className:"inputbox",native:"true",disabled:!u.state_id,onChange:G("district_id"),onClick:function(){return W()}},void 0,Q,m.map(function(e){return B("option",{name:e.name,value:e._id},e._id,e.name)})))),B("div",{className:"flex ml-auto"},void 0,B("div",{className:"waftformgroup flex relative mr-2"},void 0,B("input",{type:"text",name:"find_name",id:"contents-name",placeholder:"Search by vdc Name",className:"m-auto inputbox",value:u.find_name,onChange:function(e){e.persist(),O({key:e.target.name,value:e.target.value})},style:{paddingRight:"50px"},onKeyPress:function(e){"Enter"===e.key&&W()}}),B(v.a,{"aria-label":"Search",className:"waftsrchstyle",onClick:W},void 0,K)))),B(P.a,{tableHead:["State","District","Vdc/Municipality","Status","Action"],tableData:Y,pagination:X,handlePagination:function(e){var t=e.page,a=e.size;d(M(M({},u),{},{page:t,size:a}))}})))},U=Object(c.b)({all:Object(D.b)(),query:Object(D.g)(),loading:Object(D.e)(),district:Object(D.c)(),active_status:Object(D.a)(),state:Object(D.h)()}),G=f()(function(e){return{button:{margin:e.spacing.unit},fab:{width:"40px",height:"40px",marginTop:"auto",marginBottom:"auto"},tableActionButton:{padding:0,"&:hover":{background:"transparent",color:"#404040"}},waftsrch:{padding:0,position:"absolute",borderLeft:"1px solid #d9e3e9",borderRadius:0,"&:hover":{background:"transparent",color:"#404040"}}}}),W=Object(i.connect)(U,M(M({},E),{},{push:u.push}));t.default=Object(l.compose)(W,o.memo,G)(L)}}]);
=======
(window.webpackJsonp=window.webpackJsonp||[]).push([[278],{"3bc5192fba83e925e79c":function(e,t,a){"use strict";a.r(t),a.d(t,"Vdc",function(){return L});var n,o=a("8af190b70a6bc55c6f1b"),r=a.n(o),i=(a("8a2d1b95e05b6a321e74"),a("d7dd51e1bf6bfc2c9c3d")),c=a("a28fc3c963a1d4d1a2e5"),l=a("ab4cb61bcb2dc161defb"),u=a("3aced5b508e7389026da"),d=a("0d7f0986bcd2f33d8a2a"),s=a("4a683f0a5e64e66a8eb9"),f=a.n(s),b=a("29df10ef1bee6d38fd67"),p=a.n(b),m=a("e799c547a20a503b338f"),v=a.n(m),g=a("e68eb59aa96fc65ab714"),y=a.n(g),h=a("9095151026da8c51dd60"),O=a.n(h),j=a("ab7ebb4f5c369f043e8f"),w=a.n(j),x=a("adc20f99e57c573c589c"),A=a("d95b0cf107403b178365"),N=a("68c4d40a8cb8aafb0818"),S=a("61118b78f8958645f2e4"),_=a("2fad9e66eff5130ad191"),k=a("d733903be61208652859"),C=a("5932430beb0c05240602"),P=a("73bb0e359204f9566244"),E=a("de6f895a456a11bcf307"),D=a("e18c367e90178b3b9199"),R=a("61c79228cb27537171c9"),q=a("9ad4601af50487591ec0");function B(e,t,a,o){n||(n="function"===typeof Symbol&&Symbol.for&&Symbol.for("react.element")||60103);var r=e&&e.defaultProps,i=arguments.length-3;if(t||0===i||(t={children:void 0}),1===i)t.children=o;else if(i>1){for(var c=new Array(i),l=0;l<i;l++)c[l]=arguments[l+3];t.children=c}if(t&&r)for(var u in r)void 0===t[u]&&(t[u]=r[u]);else t||(t=r||{});return{$$typeof:n,type:e,key:void 0===a?null:""+a,ref:null,props:t,_owner:null}}function I(e,t){var a=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter(function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable})),a.push.apply(a,n)}return a}function M(e){for(var t=1;t<arguments.length;t++){var a=null!=arguments[t]?arguments[t]:{};t%2?I(Object(a),!0).forEach(function(t){T(e,t,a[t])}):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(a)):I(Object(a)).forEach(function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(a,t))})}return e}function T(e,t,a){return t in e?Object.defineProperty(e,t,{value:a,enumerable:!0,configurable:!0,writable:!0}):e[t]=a,e}function V(e,t){return function(e){if(Array.isArray(e))return e}(e)||function(e,t){var a=null==e?null:"undefined"!==typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(null==a)return;var n,o,r=[],i=!0,c=!1;try{for(a=a.call(e);!(i=(n=a.next()).done)&&(r.push(n.value),!t||r.length!==t);i=!0);}catch(e){c=!0,o=e}finally{try{i||null==a.return||a.return()}finally{if(c)throw o}}return r}(e,t)||function(e,t){if(!e)return;if("string"===typeof e)return z(e,t);var a=Object.prototype.toString.call(e).slice(8,-1);"Object"===a&&e.constructor&&(a=e.constructor.name);if("Map"===a||"Set"===a)return Array.from(e);if("Arguments"===a||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(a))return z(e,t)}(e,t)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function z(e,t){(null==t||t>e.length)&&(t=e.length);for(var a=0,n=new Array(t);a<t;a++)n[a]=e[a];return n}var F=B(d.Helmet,{},void 0,B("title",{},void 0,"Vdc Manage")),$=B(_.a,{}),H=B(k.a,{},void 0,"Vdc/Municipality Manage"),J=B("option",{name:"all",value:""},"0","All"),Q=B("option",{name:"all",value:""},"0","All"),K=B(O.a,{}),L=function(e){Object(A.b)({key:"vdc",reducer:R.a}),Object(x.b)({key:"vdc",saga:q.a});var t=e.all,a=t.data,n=t.page,i=t.size,c=t.totaldata,l=e.loading,u=e.query,d=e.loadAllRequest,s=e.loadDistrictRequest,f=e.classes,b=e.push,m=e.district,g=e.state,h=(e.clearOne,e.deleteOneRequest),O=e.setQueryValue,j=e.clearQuery,_=e.addIsActiveRequest,k=e.active_status,E=e.loadStateRequest,D=V(Object(o.useState)(!1),2),I=D[0],T=D[1],z=V(Object(o.useState)(""),2),L=z[0],U=z[1];Object(o.useEffect)(function(){j(),s(u),E(),d(u)},[]);var G=function(e){return function(t){O({key:e,value:t.target.value})}},W=function(){d(u)},X={page:n,size:i,totaldata:c},Y=a.map(function(e){var t=e._id,a=e.name,n=e.is_active;return[e.state_id.name,e.district_id.name,a,r.a.createElement(r.a.Fragment,null,B(N.a,{id:t,status:k,isOn:n,handleToggle:function(){return function(e,t){console.log("handleToggleChange",e,t),_({_id:e,status:t})}(t,n)}})),r.a.createElement(r.a.Fragment,null,B(p.a,{id:"tooltip-top",title:"Edit",placement:"top",classes:{tooltip:f.tooltip}},void 0,B(v.a,{"aria-label":"Edit",className:f.tableActionButton,onClick:function(){b("/admin/vdc-manage/edit/".concat(t))}},void 0,B(y.a,{className:"".concat(f.tableActionButtonIcon," ").concat(f.edit)}))),B(p.a,{id:"tooltip-top-start",title:"Remove",placement:"top",classes:{tooltip:f.tooltip}},void 0,B(v.a,{"aria-label":"Close",className:f.tableActionButton,onClick:function(){return e=t,T(!0),void U(e);var e}},void 0,B(w.a,{className:"".concat(f.tableActionButtonIcon," ").concat(f.close)}))))]});return r.a.createElement(r.a.Fragment,null,F,B(S.a,{msg:"This will delete area within this vdc!",open:I,doClose:function(){T(!1)},doDelete:function(){return h(L),void T(!1)}}),B("div",{className:"flex justify-between mt-3 mb-3"},void 0,l&&1==l?$:r.a.createElement(r.a.Fragment,null),H),B(C.a,{loading:l},void 0,B("div",{className:"flex justify-space-around"},void 0,B("div",{className:"flex justify"},void 0,B("div",{className:"waftformgroup flex relative mr-2"},void 0,B("select",{className:"inputbox",native:"true",onChange:G("state_id"),onClick:function(){s(u)}},void 0,J,g.map(function(e){return B("option",{name:e.name,value:e._id},e._id,e.name)})))),B("div",{className:"flex justify"},void 0,B("div",{className:"waftformgroup flex relative mr-2"},void 0,B("select",{className:"inputbox",native:"true",disabled:!u.state_id,onChange:G("district_id"),onClick:function(){return W()}},void 0,Q,m.map(function(e){return B("option",{name:e.name,value:e._id},e._id,e.name)})))),B("div",{className:"flex ml-auto"},void 0,B("div",{className:"waftformgroup flex relative mr-2"},void 0,B("input",{type:"text",name:"find_name",id:"contents-name",placeholder:"Search by vdc Name",className:"m-auto inputbox",value:u.find_name,onChange:function(e){e.persist(),O({key:e.target.name,value:e.target.value})},style:{paddingRight:"50px"},onKeyPress:function(e){"Enter"===e.key&&W()}}),B(v.a,{"aria-label":"Search",className:"waftsrchstyle",onClick:W},void 0,K)))),B(P.a,{tableHead:["State","District","Vdc/Municipality","Status","Action"],tableData:Y,pagination:X,handlePagination:function(e){var t=e.page,a=e.size;d(M(M({},u),{},{page:t,size:a}))}})))},U=Object(c.b)({all:Object(D.b)(),query:Object(D.g)(),loading:Object(D.e)(),district:Object(D.c)(),active_status:Object(D.a)(),state:Object(D.h)()}),G=f()(function(e){return{button:{margin:e.spacing.unit},fab:{width:"40px",height:"40px",marginTop:"auto",marginBottom:"auto"},tableActionButton:{padding:0,"&:hover":{background:"transparent",color:"#404040"}},waftsrch:{padding:0,position:"absolute",borderLeft:"1px solid #d9e3e9",borderRadius:0,"&:hover":{background:"transparent",color:"#404040"}}}}),W=Object(i.connect)(U,M(M({},E),{},{push:u.push}));t.default=Object(l.compose)(W,o.memo,G)(L)}}]);
>>>>>>> 41f64895ae2d4aeb7736fd90e084d7a063de2675:client/build/278.daf2b593debd2fdd8053.chunk.js