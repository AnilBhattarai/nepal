<<<<<<< HEAD:client/build/153.bd65f9a3c023b2dc8d06.chunk.js
(window.webpackJsonp=window.webpackJsonp||[]).push([[153],{"361595c9f82819e85603":function(e,a,t){"use strict";t.r(a),t.d(a,"Agency",function(){return G});var n,c=t("8af190b70a6bc55c6f1b"),r=t.n(c),o=(t("8a2d1b95e05b6a321e74"),t("d7dd51e1bf6bfc2c9c3d")),i=t("a28fc3c963a1d4d1a2e5"),l=t("ab4cb61bcb2dc161defb"),d=t("3aced5b508e7389026da"),b=t("0d7f0986bcd2f33d8a2a"),f=t("4a683f0a5e64e66a8eb9"),u=t.n(f),s=t("c233babf320cd068509e"),p=t.n(s),m=t("29df10ef1bee6d38fd67"),y=t.n(m),v=t("e799c547a20a503b338f"),g=t.n(v),h=t("e68eb59aa96fc65ab714"),k=t.n(h),O=t("e96e82762cfd5fe3a589"),j=t.n(O),w=t("c502bee2fd4be3dd7f62"),x=t.n(w),_=t("5c0a236ca4c0b26f32cd"),A=t.n(_),N=t("73bb0e359204f9566244"),P=t("adc20f99e57c573c589c"),E=t("d95b0cf107403b178365"),C=t("af43e11c61eaad018269"),S=t("71cdee5f75157aa5cf27"),D=t("7e807c2915b8f75e4034"),z=t("4e5b552e94144cbccd19"),B=t("d733903be61208652859"),F=t("5932430beb0c05240602"),q=t("2fad9e66eff5130ad191"),I=t("e95a63b25fb92ed15721");function R(e,a){var t=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);a&&(n=n.filter(function(a){return Object.getOwnPropertyDescriptor(e,a).enumerable})),t.push.apply(t,n)}return t}function V(e){for(var a=1;a<arguments.length;a++){var t=null!=arguments[a]?arguments[a]:{};a%2?R(Object(t),!0).forEach(function(a){H(e,a,t[a])}):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(t)):R(Object(t)).forEach(function(a){Object.defineProperty(e,a,Object.getOwnPropertyDescriptor(t,a))})}return e}function H(e,a,t){return a in e?Object.defineProperty(e,a,{value:t,enumerable:!0,configurable:!0,writable:!0}):e[a]=t,e}function J(e,a,t,c){n||(n="function"===typeof Symbol&&Symbol.for&&Symbol.for("react.element")||60103);var r=e&&e.defaultProps,o=arguments.length-3;if(a||0===o||(a={children:void 0}),1===o)a.children=c;else if(o>1){for(var i=new Array(o),l=0;l<o;l++)i[l]=arguments[l+3];a.children=i}if(a&&r)for(var d in r)void 0===a[d]&&(a[d]=r[d]);else a||(a=r||{});return{$$typeof:n,type:e,key:void 0===t?null:""+t,ref:null,props:a,_owner:null}}var L="agency",Q=J(b.Helmet,{},void 0,J("title",{},void 0,"Agency ")),T=J(q.a,{}),$=J(B.a,{},void 0,"Agency "),K=J(p.a,{}),G=function(e){var a=e.all,t=a.data,n=a.page,o=a.size,i=a.totaldata,l=e.loading,d=e.loadAllRequest,b=e.clearOne,f=e.setQueryValue,u=e.classes,s=e.query,p=e.push,m=e.filter,v=e.setFilterValue,h=e.clearQuery;Object(E.a)({key:L,reducer:D.a}),Object(P.a)({key:L,saga:z.a}),Object(c.useEffect)(function(){d()},[]),Object(c.useEffect)(function(){d(s)},[s]);var O=function(){d(s)},w=function(e){return function(a){a.persist(),v({key:e,value:a.target.checked}),f({key:e,value:!!a.target.checked||""})}},_={page:n,size:o,totaldata:i},C=t.map(function(e){var a=e._id,t=e.title,n=e.email,c=e.is_active,o=e.is_approved;return[J(I.Link,{to:"/agent/".concat(a),target:"_blank",className:"text-secondary underline"},void 0,t),n,"".concat(c),"".concat(o),r.a.createElement(r.a.Fragment,null,J(y.a,{id:"tooltip-top",title:"Edit",placement:"top",classes:{tooltip:u.tooltip}},void 0,J(g.a,{"aria-label":"Edit",className:u.tableActionButton,onClick:function(){p("/admin/agency-manage/edit/".concat(a))}},void 0,J(k.a,{className:"".concat(u.tableActionButtonIcon," ").concat(u.edit)}))))]});return r.a.createElement(r.a.Fragment,null,Q,J("div",{className:"flex justify-between mt-3 mb-3"},void 0,l&&!0===l?T:r.a.createElement(r.a.Fragment,null),$,J(j.a,{color:"primary","aria-label":"Add",className:u.fab,round:"true",onClick:function(){b(),p("/admin/agency-manage/add")},elevation:0},void 0,K)),J(F.a,{loading:l},void 0,J("div",{className:"flex justify-end items-center"},void 0,J("input",{type:"text",name:"find_name",id:"contents-name",placeholder:"Search by name",className:"m-auto inputbox",value:s.find_name||"",onChange:function(e){e.persist(),f({key:e.target.name,value:e.target.value})},style:{marginRight:"20px",width:200},onKeyPress:function(e){"Enter"===e.key&&O()}}),J("div",{className:"waftformgroup flex relative mr-2"},void 0,J("label",{className:"mr-2 block smallCheckbox"},void 0,J(A.a,{control:J(x.a,{checked:m.find_is_verified||!1,tabIndex:-1,onClick:w("find_is_verified"),color:"primary"}),label:"Verified"})),J("label",{className:"mr-2 block smallCheckbox"},void 0,J(A.a,{control:J(x.a,{checked:m.find_is_active||!1,tabIndex:-1,onClick:w("find_is_active"),color:"primary"}),label:"Active"})),J("button",{"aria-label":"Clear",className:"px-6 py-1 inline-block text-secondary text-center underline",onClick:function(){d(),h()},type:"button"},void 0,"clear filter"),J("button",{"aria-label":"Search",className:"bg-secondary px-4 py-2 text-white  text-center rounded",onClick:O,type:"button"},void 0,"Search"))),J(N.a,{tableHead:["Title","Email","Active","Approved"],tableData:C,pagination:_,handlePagination:function(e){var a=e.page,t=e.size;f({key:"page",value:a}),f({key:"size",value:t})}})))},M=Object(i.b)({all:Object(S.a)(),query:Object(S.f)(),loading:Object(S.d)(),filter:Object(S.c)()}),U=Object(o.connect)(M,V(V({},C),{},{push:d.push})),W=Object(E.a)({key:L,reducer:D.a}),X=Object(P.a)({key:L,saga:z.a}),Y=u()(function(e){return{button:{margin:e.spacing.unit},fab:{width:"40px",height:"40px",marginTop:"auto",marginBottom:"auto"},tableActionButton:{padding:0,"&:hover":{background:"transparent",color:"#404040"}},waftsrch:{padding:0,position:"absolute",borderLeft:"1px solid #d9e3e9",borderRadius:0,"&:hover":{background:"transparent",color:"#404040"}}}});a.default=Object(l.compose)(W,X,Y,U,c.memo)(G)}}]);
=======
(window.webpackJsonp=window.webpackJsonp||[]).push([[156],{"361595c9f82819e85603":function(e,a,t){"use strict";t.r(a),t.d(a,"Agency",function(){return G});var n,c=t("8af190b70a6bc55c6f1b"),r=t.n(c),o=(t("8a2d1b95e05b6a321e74"),t("d7dd51e1bf6bfc2c9c3d")),i=t("a28fc3c963a1d4d1a2e5"),l=t("ab4cb61bcb2dc161defb"),d=t("3aced5b508e7389026da"),b=t("0d7f0986bcd2f33d8a2a"),f=t("4a683f0a5e64e66a8eb9"),u=t.n(f),s=t("c233babf320cd068509e"),p=t.n(s),m=t("29df10ef1bee6d38fd67"),y=t.n(m),v=t("e799c547a20a503b338f"),g=t.n(v),h=t("e68eb59aa96fc65ab714"),k=t.n(h),O=t("e96e82762cfd5fe3a589"),j=t.n(O),w=t("c502bee2fd4be3dd7f62"),x=t.n(w),_=t("5c0a236ca4c0b26f32cd"),A=t.n(_),N=t("73bb0e359204f9566244"),P=t("adc20f99e57c573c589c"),E=t("d95b0cf107403b178365"),C=t("af43e11c61eaad018269"),S=t("71cdee5f75157aa5cf27"),D=t("7e807c2915b8f75e4034"),z=t("4e5b552e94144cbccd19"),B=t("d733903be61208652859"),F=t("5932430beb0c05240602"),q=t("2fad9e66eff5130ad191"),I=t("e95a63b25fb92ed15721");function R(e,a){var t=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);a&&(n=n.filter(function(a){return Object.getOwnPropertyDescriptor(e,a).enumerable})),t.push.apply(t,n)}return t}function V(e){for(var a=1;a<arguments.length;a++){var t=null!=arguments[a]?arguments[a]:{};a%2?R(Object(t),!0).forEach(function(a){H(e,a,t[a])}):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(t)):R(Object(t)).forEach(function(a){Object.defineProperty(e,a,Object.getOwnPropertyDescriptor(t,a))})}return e}function H(e,a,t){return a in e?Object.defineProperty(e,a,{value:t,enumerable:!0,configurable:!0,writable:!0}):e[a]=t,e}function J(e,a,t,c){n||(n="function"===typeof Symbol&&Symbol.for&&Symbol.for("react.element")||60103);var r=e&&e.defaultProps,o=arguments.length-3;if(a||0===o||(a={children:void 0}),1===o)a.children=c;else if(o>1){for(var i=new Array(o),l=0;l<o;l++)i[l]=arguments[l+3];a.children=i}if(a&&r)for(var d in r)void 0===a[d]&&(a[d]=r[d]);else a||(a=r||{});return{$$typeof:n,type:e,key:void 0===t?null:""+t,ref:null,props:a,_owner:null}}var L="agency",Q=J(b.Helmet,{},void 0,J("title",{},void 0,"Agency ")),T=J(q.a,{}),$=J(B.a,{},void 0,"Agency "),K=J(p.a,{}),G=function(e){var a=e.all,t=a.data,n=a.page,o=a.size,i=a.totaldata,l=e.loading,d=e.loadAllRequest,b=e.clearOne,f=e.setQueryValue,u=e.classes,s=e.query,p=e.push,m=e.filter,v=e.setFilterValue,h=e.clearQuery;Object(E.a)({key:L,reducer:D.a}),Object(P.a)({key:L,saga:z.a}),Object(c.useEffect)(function(){d()},[]),Object(c.useEffect)(function(){d(s)},[s]);var O=function(){d(s)},w=function(e){return function(a){a.persist(),v({key:e,value:a.target.checked}),f({key:e,value:!!a.target.checked||""})}},_={page:n,size:o,totaldata:i},C=t.map(function(e){var a=e._id,t=e.title,n=e.email,c=e.is_active,o=e.is_approved;return[J(I.Link,{to:"/agent/".concat(a),target:"_blank",className:"text-secondary underline"},void 0,t),n,"".concat(c),"".concat(o),r.a.createElement(r.a.Fragment,null,J(y.a,{id:"tooltip-top",title:"Edit",placement:"top",classes:{tooltip:u.tooltip}},void 0,J(g.a,{"aria-label":"Edit",className:u.tableActionButton,onClick:function(){p("/admin/agency-manage/edit/".concat(a))}},void 0,J(k.a,{className:"".concat(u.tableActionButtonIcon," ").concat(u.edit)}))))]});return r.a.createElement(r.a.Fragment,null,Q,J("div",{className:"flex justify-between mt-3 mb-3"},void 0,l&&!0===l?T:r.a.createElement(r.a.Fragment,null),$,J(j.a,{color:"primary","aria-label":"Add",className:u.fab,round:"true",onClick:function(){b(),p("/admin/agency-manage/add")},elevation:0},void 0,K)),J(F.a,{loading:l},void 0,J("div",{className:"flex justify-end items-center"},void 0,J("input",{type:"text",name:"find_name",id:"contents-name",placeholder:"Search by name",className:"m-auto inputbox",value:s.find_name||"",onChange:function(e){e.persist(),f({key:e.target.name,value:e.target.value})},style:{marginRight:"20px",width:200},onKeyPress:function(e){"Enter"===e.key&&O()}}),J("div",{className:"waftformgroup flex relative mr-2"},void 0,J("label",{className:"mr-2 block smallCheckbox"},void 0,J(A.a,{control:J(x.a,{checked:m.find_is_verified||!1,tabIndex:-1,onClick:w("find_is_verified"),color:"primary"}),label:"Verified"})),J("label",{className:"mr-2 block smallCheckbox"},void 0,J(A.a,{control:J(x.a,{checked:m.find_is_active||!1,tabIndex:-1,onClick:w("find_is_active"),color:"primary"}),label:"Active"})),J("button",{"aria-label":"Clear",className:"px-6 py-1 inline-block text-secondary text-center underline",onClick:function(){d(),h()},type:"button"},void 0,"clear filter"),J("button",{"aria-label":"Search",className:"bg-secondary px-4 py-2 text-white  text-center rounded",onClick:O,type:"button"},void 0,"Search"))),J(N.a,{tableHead:["Title","Email","Active","Approved"],tableData:C,pagination:_,handlePagination:function(e){var a=e.page,t=e.size;f({key:"page",value:a}),f({key:"size",value:t})}})))},M=Object(i.b)({all:Object(S.a)(),query:Object(S.f)(),loading:Object(S.d)(),filter:Object(S.c)()}),U=Object(o.connect)(M,V(V({},C),{},{push:d.push})),W=Object(E.a)({key:L,reducer:D.a}),X=Object(P.a)({key:L,saga:z.a}),Y=u()(function(e){return{button:{margin:e.spacing.unit},fab:{width:"40px",height:"40px",marginTop:"auto",marginBottom:"auto"},tableActionButton:{padding:0,"&:hover":{background:"transparent",color:"#404040"}},waftsrch:{padding:0,position:"absolute",borderLeft:"1px solid #d9e3e9",borderRadius:0,"&:hover":{background:"transparent",color:"#404040"}}}});a.default=Object(l.compose)(W,X,Y,U,c.memo)(G)}}]);
>>>>>>> 41f64895ae2d4aeb7736fd90e084d7a063de2675:client/build/156.6df95ac76cc415eaf7f9.chunk.js
