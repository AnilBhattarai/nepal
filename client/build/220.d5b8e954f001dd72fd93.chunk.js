<<<<<<< HEAD:client/build/220.d5b8e954f001dd72fd93.chunk.js
(window.webpackJsonp=window.webpackJsonp||[]).push([[220],{"7bedcc15a2d0068598e6":function(e,t,a){"use strict";a.r(t),a.d(t,"MenuManage",function(){return U});var n,r=a("8af190b70a6bc55c6f1b"),o=a.n(r),i=(a("8a2d1b95e05b6a321e74"),a("d7dd51e1bf6bfc2c9c3d")),c=a("0d7f0986bcd2f33d8a2a"),l=a("3aced5b508e7389026da"),d=a("a28fc3c963a1d4d1a2e5"),u=a("ab4cb61bcb2dc161defb"),f=a("adc20f99e57c573c589c"),s=a("d95b0cf107403b178365"),b=a("4a683f0a5e64e66a8eb9"),p=a.n(b),m=a("c233babf320cd068509e"),v=a.n(m),y=a("e799c547a20a503b338f"),g=a.n(y),h=a("9095151026da8c51dd60"),O=a.n(h),x=a("e96e82762cfd5fe3a589"),j=a.n(x),w=a("73bb0e359204f9566244"),k=a("6228424e466393de4f9c"),A=(a("fcb99a06256635f70435"),a("d733903be61208652859")),S=a("5932430beb0c05240602"),N=a("61118b78f8958645f2e4"),M=a("2fad9e66eff5130ad191"),P=a("a42cee5dc000eec55acb"),C=a("1afa78e851089935c60d"),E=a("303e8cb95f55947e8b3e");function q(e,t){var a=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter(function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable})),a.push.apply(a,n)}return a}function R(e){for(var t=1;t<arguments.length;t++){var a=null!=arguments[t]?arguments[t]:{};t%2?q(Object(a),!0).forEach(function(t){D(e,t,a[t])}):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(a)):q(Object(a)).forEach(function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(a,t))})}return e}function D(e,t,a){return t in e?Object.defineProperty(e,t,{value:a,enumerable:!0,configurable:!0,writable:!0}):e[t]=a,e}function _(e,t,a,r){n||(n="function"===typeof Symbol&&Symbol.for&&Symbol.for("react.element")||60103);var o=e&&e.defaultProps,i=arguments.length-3;if(t||0===i||(t={children:void 0}),1===i)t.children=r;else if(i>1){for(var c=new Array(i),l=0;l<i;l++)c[l]=arguments[l+3];t.children=c}if(t&&o)for(var d in o)void 0===t[d]&&(t[d]=o[d]);else t||(t=o||{});return{$$typeof:n,type:e,key:void 0===a?null:""+a,ref:null,props:t,_owner:null}}function I(e,t){return function(e){if(Array.isArray(e))return e}(e)||function(e,t){var a=null==e?null:"undefined"!==typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(null==a)return;var n,r,o=[],i=!0,c=!1;try{for(a=a.call(e);!(i=(n=a.next()).done)&&(o.push(n.value),!t||o.length!==t);i=!0);}catch(e){c=!0,r=e}finally{try{i||null==a.return||a.return()}finally{if(c)throw r}}return o}(e,t)||function(e,t){if(!e)return;if("string"===typeof e)return F(e,t);var a=Object.prototype.toString.call(e).slice(8,-1);"Object"===a&&e.constructor&&(a=e.constructor.name);if("Map"===a||"Set"===a)return Array.from(e);if("Arguments"===a||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(a))return F(e,t)}(e,t)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function F(e,t){(null==t||t>e.length)&&(t=e.length);for(var a=0,n=new Array(t);a<t;a++)n[a]=e[a];return n}var T="menuManage",$=_("i",{className:"material-icons text-base text-indigo-500 hover:text-indigo-700"},void 0,"edit"),z=_("i",{className:"material-icons text-base text-red-400 hover:text-red-600"},void 0,"delete"),B=_("div",{},void 0,_(c.Helmet,{},void 0,_("title",{},void 0,"MenuManage"),_("meta",{name:"description",content:"Description of MenuManage"}))),H=_(M.a,{}),J=_(A.a,{},void 0,"Menu Manage"),K=_(v.a,{}),Q=_(O.a,{}),L=_(O.a,{}),U=function(e){Object(s.b)({key:T,reducer:C.a}),Object(f.b)({key:T,saga:E.a});var t=I(Object(r.useState)(!1),2),a=t[0],n=t[1],i=I(Object(r.useState)(""),2),c=i[0],l=i[1],d=e.all,u=d.data,b=d.page,p=d.size,m=d.totaldata,v=e.query,y=e.loading,h=e.classes,O=e.loadAllRequest;Object(r.useEffect)(function(){O(v)},[]);var x=function(t){t.persist(),e.setQueryValue({key:t.target.name,value:t.target.value})},k=function(){e.loadAllRequest(e.query)},A={page:b,size:p,totaldata:m},M=u.map(function(t){var a=t.title,r=t.key,i=t.order,c=t.is_active,d=t._id;return[a||"",r||"",i||"",c?"Active":"In active",o.a.createElement(o.a.Fragment,null,_("div",{className:"flex"},void 0,_("button",{"aria-label":"Edit",className:" px-1 text-center leading-none",onClick:function(){return t=d,void e.push("/admin/menu-manage/edit/".concat(t));var t}},void 0,$),_("button",{className:"ml-2 px-1 text-center leading-none",onClick:function(){return e=d,n(!0),void l(e);var e}},void 0,z)))]});return o.a.createElement(o.a.Fragment,null,B,_(N.a,{open:a,doClose:function(){n(!1)},doDelete:function(){return t=c,e.deleteOneRequest(t),void n(!1);var t}}),_("div",{className:"flex justify-between mt-3 mb-3"},void 0,y&&!0===y?H:o.a.createElement(o.a.Fragment,null),J,_(j.a,{color:"primary","aria-label":"Add",className:h.fab,round:"true",onClick:function(){e.clearOne(),e.push("/admin/menu-manage/add")},elevation:0},void 0,K)),_(S.a,{loading:y},void 0,_("div",{className:"flex"},void 0,_("div",{className:"flex relative mr-2"},void 0,_("input",{type:"text",name:"find_title",id:"contents-name",placeholder:"Search Menu by title",className:"m-auto inputbox",value:v.find_title,onChange:x,style:{paddingRight:"50px"},onKeyPress:function(e){"Enter"===e.key&&k()}}),_(g.a,{"aria-label":"Search",className:"".concat(h.waftsrch," waftsrchstyle"),onClick:k},void 0,Q)),_("div",{className:"waftformgroup relative flex"},void 0,_("input",{type:"text",name:"find_key",id:"contents-key",placeholder:"Search Menu  by key",className:"m-auto inputbox pr-6",value:v.find_key,onChange:x,style:{paddingRight:"50px"}}),_(g.a,{"aria-label":"Search",className:"".concat(h.waftsrch," waftsrchstyle"),onClick:k},void 0,L)),_("div",{},void 0,_("button",{"aria-label":"clear filter",className:"underline px-4 py-1 text-secondary  text-center rounded ml-2",onClick:function(){e.loadAllRequest(),e.clearQuery()},type:"button"},void 0,"clear filter"))),_(w.a,{tableHead:["Title","Key","Order","Is Active","Action"],tableData:M,pagination:A,handlePagination:function(t){e.loadAllRequest(t)}})))},V=Object(d.b)({all:Object(P.a)(),loading:Object(P.d)(),query:Object(P.f)()}),G=p()(function(e){return{button:{margin:e.spacing.unit},fab:{width:"40px",height:"40px",marginTop:"auto",marginBottom:"auto"},tableActionButton:{padding:0,"&:hover":{background:"transparent",color:"#404040"}},waftsrch:{padding:0,position:"absolute",borderLeft:"1px solid #d9e3e9",borderRadius:0,"&:hover":{background:"transparent",color:"#404040"}}}}),W=Object(i.connect)(V,R(R({},k),{},{push:l.push}));t.default=Object(u.compose)(W,r.memo,G)(U)}}]);
=======
(window.webpackJsonp=window.webpackJsonp||[]).push([[223],{"7bedcc15a2d0068598e6":function(e,t,a){"use strict";a.r(t),a.d(t,"MenuManage",function(){return U});var n,r=a("8af190b70a6bc55c6f1b"),o=a.n(r),i=(a("8a2d1b95e05b6a321e74"),a("d7dd51e1bf6bfc2c9c3d")),c=a("0d7f0986bcd2f33d8a2a"),l=a("3aced5b508e7389026da"),d=a("a28fc3c963a1d4d1a2e5"),u=a("ab4cb61bcb2dc161defb"),f=a("adc20f99e57c573c589c"),s=a("d95b0cf107403b178365"),b=a("4a683f0a5e64e66a8eb9"),p=a.n(b),m=a("c233babf320cd068509e"),v=a.n(m),y=a("e799c547a20a503b338f"),g=a.n(y),h=a("9095151026da8c51dd60"),O=a.n(h),x=a("e96e82762cfd5fe3a589"),j=a.n(x),w=a("73bb0e359204f9566244"),k=a("6228424e466393de4f9c"),A=(a("fcb99a06256635f70435"),a("d733903be61208652859")),S=a("5932430beb0c05240602"),N=a("61118b78f8958645f2e4"),M=a("2fad9e66eff5130ad191"),P=a("a42cee5dc000eec55acb"),C=a("1afa78e851089935c60d"),E=a("303e8cb95f55947e8b3e");function q(e,t){var a=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter(function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable})),a.push.apply(a,n)}return a}function R(e){for(var t=1;t<arguments.length;t++){var a=null!=arguments[t]?arguments[t]:{};t%2?q(Object(a),!0).forEach(function(t){D(e,t,a[t])}):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(a)):q(Object(a)).forEach(function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(a,t))})}return e}function D(e,t,a){return t in e?Object.defineProperty(e,t,{value:a,enumerable:!0,configurable:!0,writable:!0}):e[t]=a,e}function _(e,t,a,r){n||(n="function"===typeof Symbol&&Symbol.for&&Symbol.for("react.element")||60103);var o=e&&e.defaultProps,i=arguments.length-3;if(t||0===i||(t={children:void 0}),1===i)t.children=r;else if(i>1){for(var c=new Array(i),l=0;l<i;l++)c[l]=arguments[l+3];t.children=c}if(t&&o)for(var d in o)void 0===t[d]&&(t[d]=o[d]);else t||(t=o||{});return{$$typeof:n,type:e,key:void 0===a?null:""+a,ref:null,props:t,_owner:null}}function I(e,t){return function(e){if(Array.isArray(e))return e}(e)||function(e,t){var a=null==e?null:"undefined"!==typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(null==a)return;var n,r,o=[],i=!0,c=!1;try{for(a=a.call(e);!(i=(n=a.next()).done)&&(o.push(n.value),!t||o.length!==t);i=!0);}catch(e){c=!0,r=e}finally{try{i||null==a.return||a.return()}finally{if(c)throw r}}return o}(e,t)||function(e,t){if(!e)return;if("string"===typeof e)return F(e,t);var a=Object.prototype.toString.call(e).slice(8,-1);"Object"===a&&e.constructor&&(a=e.constructor.name);if("Map"===a||"Set"===a)return Array.from(e);if("Arguments"===a||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(a))return F(e,t)}(e,t)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function F(e,t){(null==t||t>e.length)&&(t=e.length);for(var a=0,n=new Array(t);a<t;a++)n[a]=e[a];return n}var T="menuManage",$=_("i",{className:"material-icons text-base text-indigo-500 hover:text-indigo-700"},void 0,"edit"),z=_("i",{className:"material-icons text-base text-red-400 hover:text-red-600"},void 0,"delete"),B=_("div",{},void 0,_(c.Helmet,{},void 0,_("title",{},void 0,"MenuManage"),_("meta",{name:"description",content:"Description of MenuManage"}))),H=_(M.a,{}),J=_(A.a,{},void 0,"Menu Manage"),K=_(v.a,{}),Q=_(O.a,{}),L=_(O.a,{}),U=function(e){Object(s.b)({key:T,reducer:C.a}),Object(f.b)({key:T,saga:E.a});var t=I(Object(r.useState)(!1),2),a=t[0],n=t[1],i=I(Object(r.useState)(""),2),c=i[0],l=i[1],d=e.all,u=d.data,b=d.page,p=d.size,m=d.totaldata,v=e.query,y=e.loading,h=e.classes,O=e.loadAllRequest;Object(r.useEffect)(function(){O(v)},[]);var x=function(t){t.persist(),e.setQueryValue({key:t.target.name,value:t.target.value})},k=function(){e.loadAllRequest(e.query)},A={page:b,size:p,totaldata:m},M=u.map(function(t){var a=t.title,r=t.key,i=t.order,c=t.is_active,d=t._id;return[a||"",r||"",i||"",c?"Active":"In active",o.a.createElement(o.a.Fragment,null,_("div",{className:"flex"},void 0,_("button",{"aria-label":"Edit",className:" px-1 text-center leading-none",onClick:function(){return t=d,void e.push("/admin/menu-manage/edit/".concat(t));var t}},void 0,$),_("button",{className:"ml-2 px-1 text-center leading-none",onClick:function(){return e=d,n(!0),void l(e);var e}},void 0,z)))]});return o.a.createElement(o.a.Fragment,null,B,_(N.a,{open:a,doClose:function(){n(!1)},doDelete:function(){return t=c,e.deleteOneRequest(t),void n(!1);var t}}),_("div",{className:"flex justify-between mt-3 mb-3"},void 0,y&&!0===y?H:o.a.createElement(o.a.Fragment,null),J,_(j.a,{color:"primary","aria-label":"Add",className:h.fab,round:"true",onClick:function(){e.clearOne(),e.push("/admin/menu-manage/add")},elevation:0},void 0,K)),_(S.a,{loading:y},void 0,_("div",{className:"flex"},void 0,_("div",{className:"flex relative mr-2"},void 0,_("input",{type:"text",name:"find_title",id:"contents-name",placeholder:"Search Menu by title",className:"m-auto inputbox",value:v.find_title,onChange:x,style:{paddingRight:"50px"},onKeyPress:function(e){"Enter"===e.key&&k()}}),_(g.a,{"aria-label":"Search",className:"".concat(h.waftsrch," waftsrchstyle"),onClick:k},void 0,Q)),_("div",{className:"waftformgroup relative flex"},void 0,_("input",{type:"text",name:"find_key",id:"contents-key",placeholder:"Search Menu  by key",className:"m-auto inputbox pr-6",value:v.find_key,onChange:x,style:{paddingRight:"50px"}}),_(g.a,{"aria-label":"Search",className:"".concat(h.waftsrch," waftsrchstyle"),onClick:k},void 0,L)),_("div",{},void 0,_("button",{"aria-label":"clear filter",className:"underline px-4 py-1 text-secondary  text-center rounded ml-2",onClick:function(){e.loadAllRequest(),e.clearQuery()},type:"button"},void 0,"clear filter"))),_(w.a,{tableHead:["Title","Key","Order","Is Active","Action"],tableData:M,pagination:A,handlePagination:function(t){e.loadAllRequest(t)}})))},V=Object(d.b)({all:Object(P.a)(),loading:Object(P.d)(),query:Object(P.f)()}),G=p()(function(e){return{button:{margin:e.spacing.unit},fab:{width:"40px",height:"40px",marginTop:"auto",marginBottom:"auto"},tableActionButton:{padding:0,"&:hover":{background:"transparent",color:"#404040"}},waftsrch:{padding:0,position:"absolute",borderLeft:"1px solid #d9e3e9",borderRadius:0,"&:hover":{background:"transparent",color:"#404040"}}}}),W=Object(i.connect)(V,R(R({},k),{},{push:l.push}));t.default=Object(u.compose)(W,r.memo,G)(U)}}]);
>>>>>>> 41f64895ae2d4aeb7736fd90e084d7a063de2675:client/build/223.78628bac2d682a488a93.chunk.js