<<<<<<< HEAD:client/build/323.a7657ceba3b782931e64.chunk.js
(window.webpackJsonp=window.webpackJsonp||[]).push([[323],{"5270afe3e1a184f77f88":function(e,t,a){"use strict";a.r(t);var n,o=a("8af190b70a6bc55c6f1b"),r=a.n(o),i=(a("8a2d1b95e05b6a321e74"),a("d7dd51e1bf6bfc2c9c3d")),l=a("a28fc3c963a1d4d1a2e5"),c=a("ab4cb61bcb2dc161defb"),u=a("3aced5b508e7389026da"),s=a("0d7f0986bcd2f33d8a2a"),d=a("e95a63b25fb92ed15721"),f=a("4a683f0a5e64e66a8eb9"),b=a.n(f),p=a("c233babf320cd068509e"),v=a.n(p),m=a("29df10ef1bee6d38fd67"),y=a.n(m),g=a("e799c547a20a503b338f"),h=a.n(g),O=a("e68eb59aa96fc65ab714"),j=a.n(O),S=a("e96e82762cfd5fe3a589"),k=a.n(S),w=a("73bb0e359204f9566244"),_=a("adc20f99e57c573c589c"),A=a("d95b0cf107403b178365"),P=a("9d56412483840c7db38c"),N=a("3c96b9432b93bdec9a95"),E=a("405d149753ab774cff77"),x=a("9f23c06f0536c8f582a5"),C=a("d733903be61208652859"),q=(a("5932430beb0c05240602"),a("61118b78f8958645f2e4"),a("2fad9e66eff5130ad191")),D=a("daf935c0d95671762e1e"),I=a("0d939196e59ed73c94e6");function F(e,t){var a=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter(function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable})),a.push.apply(a,n)}return a}function L(e){for(var t=1;t<arguments.length;t++){var a=null!=arguments[t]?arguments[t]:{};t%2?F(Object(a),!0).forEach(function(t){M(e,t,a[t])}):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(a)):F(Object(a)).forEach(function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(a,t))})}return e}function M(e,t,a){return t in e?Object.defineProperty(e,t,{value:a,enumerable:!0,configurable:!0,writable:!0}):e[t]=a,e}function B(e,t,a,o){n||(n="function"===typeof Symbol&&Symbol.for&&Symbol.for("react.element")||60103);var r=e&&e.defaultProps,i=arguments.length-3;if(t||0===i||(t={children:void 0}),1===i)t.children=o;else if(i>1){for(var l=new Array(i),c=0;c<i;c++)l[c]=arguments[c+3];t.children=l}if(t&&r)for(var u in r)void 0===t[u]&&(t[u]=r[u]);else t||(t=r||{});return{$$typeof:n,type:e,key:void 0===a?null:""+a,ref:null,props:t,_owner:null}}function z(e,t){return function(e){if(Array.isArray(e))return e}(e)||function(e,t){var a=null==e?null:"undefined"!==typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(null==a)return;var n,o,r=[],i=!0,l=!1;try{for(a=a.call(e);!(i=(n=a.next()).done)&&(r.push(n.value),!t||r.length!==t);i=!0);}catch(e){l=!0,o=e}finally{try{i||null==a.return||a.return()}finally{if(l)throw o}}return r}(e,t)||function(e,t){if(!e)return;if("string"===typeof e)return $(e,t);var a=Object.prototype.toString.call(e).slice(8,-1);"Object"===a&&e.constructor&&(a=e.constructor.name);if("Map"===a||"Set"===a)return Array.from(e);if("Arguments"===a||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(a))return $(e,t)}(e,t)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function $(e,t){(null==t||t>e.length)&&(t=e.length);for(var a=0,n=new Array(t);a<t;a++)n[a]=e[a];return n}var R,T="userPersonalInformationPage",H=B(s.Helmet,{},void 0,B("title",{},void 0," My Leads ")),J=B(q.a,{}),U=B(C.a,{},void 0,"My Leads"),W=B(v.a,{}),Q=B(I.DialogTitle,{},void 0,"Set Status"),V=B("option",{value:""},void 0,"Choose Status"),G=B("option",{value:"unqualified"},void 0,"Unqualified"),K=B("option",{value:"on_progress"},void 0,"On Progress"),X=B("option",{value:"converted"},void 0,"Converted"),Y=Object(l.b)({lead:Object(N.l)(),loading:Object(N.o)(),query:Object(N.z)(),open:Object(N.x)(),status_loading:Object(N.A)()}),Z=Object(i.connect)(Y,L(L({},P),{},{push:u.push})),ee=Object(A.a)({key:T,reducer:E.a}),te=Object(_.a)({key:T,saga:x.a}),ae=b()(function(e){return{button:{margin:e.spacing.unit},fab:{width:"40px",height:"40px",marginTop:"auto",marginBottom:"auto"},tableActionButton:{padding:0,"&:hover":{background:"transparent",color:"#404040"}},waftsrch:{padding:0,position:"absolute",borderLeft:"1px solid #d9e3e9",borderRadius:0,"&:hover":{background:"transparent",color:"#404040"}}}}),ne=Object(c.compose)(ee,te,ae,Z,o.memo)(function(e){var t=e.lead,a=t.data,n=t.page,i=t.size,l=t.totaldata,c=t.msg,u=e.loading,s=e.loadLeadRequest,f=e.clearOne,b=e.setQueryValue,p=(e.deleteOneRequest,e.classes),v=e.query,m=e.push,g=e.setOpen,O=e.open,S=(e.status_loading,e.setLeadStatusRequest);Object(A.a)({key:T,reducer:E.a}),Object(_.a)({key:T,saga:x.a});var P=z(Object(o.useState)(""),2),N=(P[0],P[1],z(Object(o.useState)("Contact_Form"),2)),C=N[0],q=N[1],F=z(Object(o.useState)([]),2),L=F[0],M=F[1],$=z(Object(o.useState)(""),2),R=$[0],Y=$[1],Z=z(Object(o.useState)(""),2),ee=Z[0],te=Z[1];Object(o.useEffect)(function(){s(v)},[]),Object(o.useEffect)(function(){s(v)},[v]),Object(o.useEffect)(function(){var e=[];if(a&&a.length>0)for(var t=0;t<a.length;t++)a[t].channel===C&&e.push(a[t]);M(e)},[C,a]);var ae=function(e){g(!0),Y(e)},ne={page:n,size:i,totaldata:l},oe=L.map(function(e){var t=e._id,a=e.name,n=e.email,o=(e.is_active,e.inquiry),i=e.profile_link,l=e.phone_no,c=e.status,u=e.is_assign_by_admin,s=e.property_id,f=e.channel;return"Property_Inquiries"===C?[a,n,"Facebook"===C?i:l,"Property_Inquiries"===f&&s&&s.slug_url?B(d.Link,{target:"_blank",to:"/detail/".concat(s.slug_url),className:"text-secondary underline"},void 0,s.slug_url):"-",o,c?r.a.createElement(r.a.Fragment,null,c,B(y.a,{id:"tooltip-top",title:"Edit",placement:"top",classes:{tooltip:p.tooltip}},void 0,B(h.a,{"aria-label":"Edit",className:p.tableActionButton,onClick:function(){return ae(t)}},void 0,B(j.a,{className:"".concat(p.tableActionButtonIcon," ").concat(p.edit)})))):B("button",{className:"underline text-blue-500",onClick:function(){return ae(t)}},void 0,"Set Status"),u?"Assigned by Admin":"-"]:[a,n,"Facebook"===C?i:l,o,c?r.a.createElement(r.a.Fragment,null,c,B(y.a,{id:"tooltip-top",title:"Edit",placement:"top",classes:{tooltip:p.tooltip}},void 0,B(h.a,{"aria-label":"Edit",className:p.tableActionButton,onClick:function(){return ae(t)}},void 0,B(j.a,{className:"".concat(p.tableActionButtonIcon," ").concat(p.edit)})))):B("button",{className:"underline text-blue-500",onClick:function(){return ae(t)}},void 0,"Set Status"),u?"Assigned by Admin":"-"]}),re="Property_Inquiries"===C?["Name","Email","Phone No.","Property","Message","Status","Assigned"]:"Facebook"===C?["Name","Email","Profile Link","Message","Status","Assigned"]:["Name","Email","Phone No.","Message","Status","Assigned"];return r.a.createElement(r.a.Fragment,null,H,B("div",{className:"flex justify-between mt-3 mb-3"},void 0,u&&!0===u?J:r.a.createElement(r.a.Fragment,null),U,B(k.a,{color:"primary","aria-label":"Add",className:p.fab,round:"true",onClick:function(){f(),m("/user/leads/add")},elevation:0},void 0,W)),B("div",{className:""},void 0,B("div",{className:"  flex flex-wrap"},void 0,D.M.map(function(e){return B("button",{type:"button",onClick:function(){return q(t=e),b({key:"find_channel",value:t}),void b({key:"page",value:1});var t},className:"rounded mr-2 px-4 py-1 mb-4 ".concat(C!==e?"bg-gray-200 text-black":"bg-secondary text-white")},void 0,e.replace("_"," ")," (",function(e){var t=0;if(c&&void 0!==c)for(var a=0;a<c.length;a++){var n=c[a];n._id===e&&(t=n.amt)}return t}(e),")")})),B(w.a,{tableHead:re,tableData:oe,pagination:ne,handlePagination:function(e){var t=e.page,a=e.size;b({key:"page",value:t}),b({key:"size",value:a})},loading:u})),B(I.Dialog,{ullWidth:!0,maxWidth:"sm",open:O,onClose:function(){g(!1)}},void 0,Q,B(I.DialogContent,{},void 0,B("select",{className:"inputbox",value:ee,onChange:function(e){var t=e.target.value;console.log("value",t),te(t)}},void 0,V,G,K,X)),B(I.DialogActions,{},void 0,B("button",{className:"btn disabled:cursor-not-allowed",type:"button",disabled:""===R||""===ee,onClick:function(){S({_id:R,status:ee})}},void 0,"Set Status"))))});a("bf09244ac130652df84f");function oe(e,t,a,n){R||(R="function"===typeof Symbol&&Symbol.for&&Symbol.for("react.element")||60103);var o=e&&e.defaultProps,r=arguments.length-3;if(t||0===r||(t={children:void 0}),1===r)t.children=n;else if(r>1){for(var i=new Array(r),l=0;l<r;l++)i[l]=arguments[l+3];t.children=i}if(t&&o)for(var c in o)void 0===t[c]&&(t[c]=o[c]);else t||(t=o||{});return{$$typeof:R,type:e,key:void 0===a?null:""+a,ref:null,props:t,_owner:null}}var re=oe(ne,{});t.default=function(){return re}}}]);
=======
(window.webpackJsonp=window.webpackJsonp||[]).push([[327],{"5270afe3e1a184f77f88":function(e,t,a){"use strict";a.r(t);var n,o=a("8af190b70a6bc55c6f1b"),r=a.n(o),i=(a("8a2d1b95e05b6a321e74"),a("d7dd51e1bf6bfc2c9c3d")),l=a("a28fc3c963a1d4d1a2e5"),c=a("ab4cb61bcb2dc161defb"),u=a("3aced5b508e7389026da"),s=a("0d7f0986bcd2f33d8a2a"),d=a("e95a63b25fb92ed15721"),f=a("4a683f0a5e64e66a8eb9"),b=a.n(f),p=a("c233babf320cd068509e"),v=a.n(p),m=a("29df10ef1bee6d38fd67"),y=a.n(m),g=a("e799c547a20a503b338f"),h=a.n(g),O=a("e68eb59aa96fc65ab714"),j=a.n(O),S=a("e96e82762cfd5fe3a589"),k=a.n(S),w=a("73bb0e359204f9566244"),_=a("adc20f99e57c573c589c"),A=a("d95b0cf107403b178365"),P=a("9d56412483840c7db38c"),N=a("3c96b9432b93bdec9a95"),E=a("405d149753ab774cff77"),x=a("9f23c06f0536c8f582a5"),C=a("d733903be61208652859"),q=(a("5932430beb0c05240602"),a("61118b78f8958645f2e4"),a("2fad9e66eff5130ad191")),D=a("daf935c0d95671762e1e"),I=a("0d939196e59ed73c94e6");function F(e,t){var a=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter(function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable})),a.push.apply(a,n)}return a}function L(e){for(var t=1;t<arguments.length;t++){var a=null!=arguments[t]?arguments[t]:{};t%2?F(Object(a),!0).forEach(function(t){M(e,t,a[t])}):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(a)):F(Object(a)).forEach(function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(a,t))})}return e}function M(e,t,a){return t in e?Object.defineProperty(e,t,{value:a,enumerable:!0,configurable:!0,writable:!0}):e[t]=a,e}function B(e,t,a,o){n||(n="function"===typeof Symbol&&Symbol.for&&Symbol.for("react.element")||60103);var r=e&&e.defaultProps,i=arguments.length-3;if(t||0===i||(t={children:void 0}),1===i)t.children=o;else if(i>1){for(var l=new Array(i),c=0;c<i;c++)l[c]=arguments[c+3];t.children=l}if(t&&r)for(var u in r)void 0===t[u]&&(t[u]=r[u]);else t||(t=r||{});return{$$typeof:n,type:e,key:void 0===a?null:""+a,ref:null,props:t,_owner:null}}function z(e,t){return function(e){if(Array.isArray(e))return e}(e)||function(e,t){var a=null==e?null:"undefined"!==typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(null==a)return;var n,o,r=[],i=!0,l=!1;try{for(a=a.call(e);!(i=(n=a.next()).done)&&(r.push(n.value),!t||r.length!==t);i=!0);}catch(e){l=!0,o=e}finally{try{i||null==a.return||a.return()}finally{if(l)throw o}}return r}(e,t)||function(e,t){if(!e)return;if("string"===typeof e)return $(e,t);var a=Object.prototype.toString.call(e).slice(8,-1);"Object"===a&&e.constructor&&(a=e.constructor.name);if("Map"===a||"Set"===a)return Array.from(e);if("Arguments"===a||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(a))return $(e,t)}(e,t)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function $(e,t){(null==t||t>e.length)&&(t=e.length);for(var a=0,n=new Array(t);a<t;a++)n[a]=e[a];return n}var R,T="userPersonalInformationPage",H=B(s.Helmet,{},void 0,B("title",{},void 0," My Leads ")),J=B(q.a,{}),U=B(C.a,{},void 0,"My Leads"),W=B(v.a,{}),Q=B(I.DialogTitle,{},void 0,"Set Status"),V=B("option",{value:""},void 0,"Choose Status"),G=B("option",{value:"unqualified"},void 0,"Unqualified"),K=B("option",{value:"on_progress"},void 0,"On Progress"),X=B("option",{value:"converted"},void 0,"Converted"),Y=Object(l.b)({lead:Object(N.l)(),loading:Object(N.o)(),query:Object(N.z)(),open:Object(N.x)(),status_loading:Object(N.A)()}),Z=Object(i.connect)(Y,L(L({},P),{},{push:u.push})),ee=Object(A.a)({key:T,reducer:E.a}),te=Object(_.a)({key:T,saga:x.a}),ae=b()(function(e){return{button:{margin:e.spacing.unit},fab:{width:"40px",height:"40px",marginTop:"auto",marginBottom:"auto"},tableActionButton:{padding:0,"&:hover":{background:"transparent",color:"#404040"}},waftsrch:{padding:0,position:"absolute",borderLeft:"1px solid #d9e3e9",borderRadius:0,"&:hover":{background:"transparent",color:"#404040"}}}}),ne=Object(c.compose)(ee,te,ae,Z,o.memo)(function(e){var t=e.lead,a=t.data,n=t.page,i=t.size,l=t.totaldata,c=t.msg,u=e.loading,s=e.loadLeadRequest,f=e.clearOne,b=e.setQueryValue,p=(e.deleteOneRequest,e.classes),v=e.query,m=e.push,g=e.setOpen,O=e.open,S=(e.status_loading,e.setLeadStatusRequest);Object(A.a)({key:T,reducer:E.a}),Object(_.a)({key:T,saga:x.a});var P=z(Object(o.useState)(""),2),N=(P[0],P[1],z(Object(o.useState)("Contact_Form"),2)),C=N[0],q=N[1],F=z(Object(o.useState)([]),2),L=F[0],M=F[1],$=z(Object(o.useState)(""),2),R=$[0],Y=$[1],Z=z(Object(o.useState)(""),2),ee=Z[0],te=Z[1];Object(o.useEffect)(function(){s(v)},[]),Object(o.useEffect)(function(){s(v)},[v]),Object(o.useEffect)(function(){var e=[];if(a&&a.length>0)for(var t=0;t<a.length;t++)a[t].channel===C&&e.push(a[t]);M(e)},[C,a]);var ae=function(e){g(!0),Y(e)},ne={page:n,size:i,totaldata:l},oe=L.map(function(e){var t=e._id,a=e.name,n=e.email,o=(e.is_active,e.inquiry),i=e.profile_link,l=e.phone_no,c=e.status,u=e.is_assign_by_admin,s=e.property_id,f=e.channel;return"Property_Inquiries"===C?[a,n,"Facebook"===C?i:l,"Property_Inquiries"===f&&s&&s.slug_url?B(d.Link,{target:"_blank",to:"/detail/".concat(s.slug_url),className:"text-secondary underline"},void 0,s.slug_url):"-",o,c?r.a.createElement(r.a.Fragment,null,c,B(y.a,{id:"tooltip-top",title:"Edit",placement:"top",classes:{tooltip:p.tooltip}},void 0,B(h.a,{"aria-label":"Edit",className:p.tableActionButton,onClick:function(){return ae(t)}},void 0,B(j.a,{className:"".concat(p.tableActionButtonIcon," ").concat(p.edit)})))):B("button",{className:"underline text-blue-500",onClick:function(){return ae(t)}},void 0,"Set Status"),u?"Assigned by Admin":"-"]:[a,n,"Facebook"===C?i:l,o,c?r.a.createElement(r.a.Fragment,null,c,B(y.a,{id:"tooltip-top",title:"Edit",placement:"top",classes:{tooltip:p.tooltip}},void 0,B(h.a,{"aria-label":"Edit",className:p.tableActionButton,onClick:function(){return ae(t)}},void 0,B(j.a,{className:"".concat(p.tableActionButtonIcon," ").concat(p.edit)})))):B("button",{className:"underline text-blue-500",onClick:function(){return ae(t)}},void 0,"Set Status"),u?"Assigned by Admin":"-"]}),re="Property_Inquiries"===C?["Name","Email","Phone No.","Property","Message","Status","Assigned"]:"Facebook"===C?["Name","Email","Profile Link","Message","Status","Assigned"]:["Name","Email","Phone No.","Message","Status","Assigned"];return r.a.createElement(r.a.Fragment,null,H,B("div",{className:"flex justify-between mt-3 mb-3"},void 0,u&&!0===u?J:r.a.createElement(r.a.Fragment,null),U,B(k.a,{color:"primary","aria-label":"Add",className:p.fab,round:"true",onClick:function(){f(),m("/user/leads/add")},elevation:0},void 0,W)),B("div",{className:""},void 0,B("div",{className:"  flex flex-wrap"},void 0,D.M.map(function(e){return B("button",{type:"button",onClick:function(){return q(t=e),b({key:"find_channel",value:t}),void b({key:"page",value:1});var t},className:"rounded mr-2 px-4 py-1 mb-4 ".concat(C!==e?"bg-gray-200 text-black":"bg-secondary text-white")},void 0,e.replace("_"," ")," (",function(e){var t=0;if(c&&void 0!==c)for(var a=0;a<c.length;a++){var n=c[a];n._id===e&&(t=n.amt)}return t}(e),")")})),B(w.a,{tableHead:re,tableData:oe,pagination:ne,handlePagination:function(e){var t=e.page,a=e.size;b({key:"page",value:t}),b({key:"size",value:a})},loading:u})),B(I.Dialog,{ullWidth:!0,maxWidth:"sm",open:O,onClose:function(){g(!1)}},void 0,Q,B(I.DialogContent,{},void 0,B("select",{className:"inputbox",value:ee,onChange:function(e){var t=e.target.value;console.log("value",t),te(t)}},void 0,V,G,K,X)),B(I.DialogActions,{},void 0,B("button",{className:"btn disabled:cursor-not-allowed",type:"button",disabled:""===R||""===ee,onClick:function(){S({_id:R,status:ee})}},void 0,"Set Status"))))});a("bf09244ac130652df84f");function oe(e,t,a,n){R||(R="function"===typeof Symbol&&Symbol.for&&Symbol.for("react.element")||60103);var o=e&&e.defaultProps,r=arguments.length-3;if(t||0===r||(t={children:void 0}),1===r)t.children=n;else if(r>1){for(var i=new Array(r),l=0;l<r;l++)i[l]=arguments[l+3];t.children=i}if(t&&o)for(var c in o)void 0===t[c]&&(t[c]=o[c]);else t||(t=o||{});return{$$typeof:R,type:e,key:void 0===a?null:""+a,ref:null,props:t,_owner:null}}var re=oe(ne,{});t.default=function(){return re}}}]);
>>>>>>> 41f64895ae2d4aeb7736fd90e084d7a063de2675:client/build/327.153c21636992e3ead48f.chunk.js
