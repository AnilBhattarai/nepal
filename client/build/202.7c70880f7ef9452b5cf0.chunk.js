<<<<<<< HEAD:client/build/202.7c70880f7ef9452b5cf0.chunk.js
(window.webpackJsonp=window.webpackJsonp||[]).push([[202],{e960333568f8029130a1:function(e,t,n){"use strict";n.r(t);var a={};n.r(a),n.d(a,"loadAllRequest",function(){return k}),n.d(a,"loadAllSuccess",function(){return _}),n.d(a,"loadAllFailure",function(){return m}),n.d(a,"loadOneRequest",function(){return v}),n.d(a,"loadOneSuccess",function(){return F}),n.d(a,"loadOneFailure",function(){return L}),n.d(a,"deleteOneRequest",function(){return A}),n.d(a,"deleteOneSuccess",function(){return j}),n.d(a,"deleteOneFailure",function(){return S}),n.d(a,"setOneValue",function(){return h}),n.d(a,"clearOne",function(){return R}),n.d(a,"addEditRequest",function(){return D}),n.d(a,"addEditSuccess",function(){return w}),n.d(a,"addEditFailure",function(){return U}),n.d(a,"setQueryValue",function(){return C}),n.d(a,"clearQuery",function(){return T}),n.d(a,"clearErrors",function(){return N});var r=n("8af190b70a6bc55c6f1b"),c=n.n(r),o=(n("8a2d1b95e05b6a321e74"),n("d7dd51e1bf6bfc2c9c3d")),d=n("ab039aecd4a1d4fedc0e"),u=n("a28fc3c963a1d4d1a2e5"),i=n("e95a63b25fb92ed15721"),l=n("ab4cb61bcb2dc161defb"),p=n("3aced5b508e7389026da"),b=n("0d7f0986bcd2f33d8a2a"),f=n("4a683f0a5e64e66a8eb9"),s=n.n(f),y=n("73bb0e359204f9566244"),E=n("adc20f99e57c573c589c"),O=n("d95b0cf107403b178365"),g="app/Feedback/LOAD_ALL_REQUEST",k=function(e){return{type:g,payload:e}},_=function(e){return{type:"app/Feedback/LOAD_ALL_SUCCESS",payload:e}},m=function(e){return{type:"app/Feedback/LOAD_ALL_FAILURE",payload:e}},v=function(e){return{type:"app/Feedback/LOAD_ONE_REQUEST",payload:e}},F=function(e){return{type:"app/Feedback/LOAD_ONE_SUCCESS",payload:e}},L=function(e){return{type:"app/Feedback/LOAD_ONE_FAILURE",payload:e}},A=function(e){return{type:"app/Feedback/DELETE_ONE_REQUEST",payload:e}},j=function(e){return{type:"app/Feedback/DELETE_ONE_SUCCESS",payload:e}},S=function(e){return{type:"app/Feedback/DELETE_ONE_FAILURE",payload:e}},h=function(e){return{type:"app/Feedback/SET_ONE_VALUE",payload:e}},R=function(){return{type:"app/Feedback/CLEAR_ONE"}},D=function(e){return{type:"app/Feedback/ADD_EDIT_REQUEST",payload:e}},w=function(e){return{type:"app/Feedback/ADD_EDIT_SUCCESS",payload:e}},U=function(e){return{type:"app/Feedback/ADD_EDIT_FAILURE",payload:e}},C=function(e){return{type:"app/Feedback/SET_QUERY_VALUE",payload:e}},T=function(){return{type:"app/Feedback/CLEAR_QUERY"}},N=function(){return{type:"app/Feedback/CLEAR_ERRORS"}},P=n("7edf83707012a871cdfb"),x={all:{data:[],page:1,size:10,totaldata:0},one:{},query:{},loading:!1,errors:{title:"",value:"",description:""}},I=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:x,t=arguments.length>1?arguments[1]:void 0;return Object(P.a)(e,function(e){switch(t.type){case g:e.loading=!0;break;case"app/Feedback/LOAD_ALL_SUCCESS":e.all=t.payload,e.loading=!1;break;case"app/Feedback/LOAD_ALL_FAILURE":e.loading=!1}})},Q=function(e){return e.feedback||x},q=n("d782b72bc5b680c7122c"),z=n("6144be5eac76f277117a"),V=n("6542cd13fd5dd1bcffd4"),M=(n("a72b40110d9c31c9b5c5"),regeneratorRuntime.mark(H)),B=regeneratorRuntime.mark(J);function H(e){var t,n;return regeneratorRuntime.wrap(function(a){for(;;)switch(a.prev=a.next){case 0:return a.next=2,Object(q.select)(Object(V.j)());case 2:return t=a.sent,n="",e.payload&&Object.keys(e.payload).map(function(t){return n="".concat(n,"&").concat(t,"=").concat(e.payload[t]),null}),a.next=7,Object(q.call)(z.a.get("feedback/admin?".concat(n),_,m,t));case 7:case"end":return a.stop()}},M)}function J(){return regeneratorRuntime.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,Object(q.takeLatest)(g,H);case 2:case"end":return e.stop()}},B)}Object(d.defineMessages)({header:{id:"".concat("app.containers.Feedback",".header"),defaultMessage:"This is the Feedback container!"}});var Y,$=n("d733903be61208652859"),W=n("5932430beb0c05240602"),G=(n("61118b78f8958645f2e4"),n("2fad9e66eff5130ad191"));function K(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);t&&(a=a.filter(function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable})),n.push.apply(n,a)}return n}function X(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?K(Object(n),!0).forEach(function(t){Z(e,t,n[t])}):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):K(Object(n)).forEach(function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))})}return e}function Z(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function ee(e,t,n,a){Y||(Y="function"===typeof Symbol&&Symbol.for&&Symbol.for("react.element")||60103);var r=e&&e.defaultProps,c=arguments.length-3;if(t||0===c||(t={children:void 0}),1===c)t.children=a;else if(c>1){for(var o=new Array(c),d=0;d<c;d++)o[d]=arguments[d+3];t.children=o}if(t&&r)for(var u in r)void 0===t[u]&&(t[u]=r[u]);else t||(t=r||{});return{$$typeof:Y,type:e,key:void 0===n?null:""+n,ref:null,props:t,_owner:null}}n.d(t,"Feedback",function(){return re});var te=ee(b.Helmet,{},void 0,ee("title",{},void 0,"Feedbacks")),ne=ee(G.a,{}),ae=ee($.a,{},void 0,"Feedbacks "),re=function(e){var t=e.all,n=t.data,a=t.page,o=t.size,d=t.totaldata,u=e.loading,l=e.loadAllRequest;e.classes,e.push;Object(O.b)({key:"feedback",reducer:I}),Object(E.b)({key:"feedback",saga:J}),Object(r.useEffect)(function(){l()},[]);var p={page:a,size:o,totaldata:d},b=n.map(function(e){e._id;var t=e.is_listing_correct,n=e.reason,a=e.property_id,r=e.email,c=e.mobile_no,o=e.description;return[t?"Correct":"In Correct",n&&n.length>0?n.map(function(e){return ee("p",{},void 0,e.title)}):"No Reasons given",a?ee(i.Link,{to:a.is_project?"/project/".concat(a.slug_url):"/detail/".concat(a.slug_url),target:"_blank",className:"underline text-secondary text-sm cursor-pointer mt-1 block"},void 0," ",a.basic.title," "):"Null",r,c,o]});return c.a.createElement(c.a.Fragment,null,te,ee("div",{className:"flex justify-between mt-3 mb-3"},void 0,u&&!0===u?ne:c.a.createElement(c.a.Fragment,null),ae),ee(W.a,{loading:u},void 0,ee(y.a,{tableHead:["Was listing correct?","Reasons","Property","Email","Mobile no.","Description",""],tableData:b,pagination:p,handlePagination:function(e){var t=e.page,n=e.size;l({page:t,size:n})}})))},ce=Object(u.b)({all:Object(u.a)(Q,function(e){return e.all}),loading:Object(u.a)(Q,function(e){return e.loading})}),oe=Object(o.connect)(ce,X(X({},a),{},{push:p.push})),de=s()(function(e){return{button:{margin:e.spacing.unit},fab:{width:"40px",height:"40px",marginTop:"auto",marginBottom:"auto"},tableActionButton:{padding:0,"&:hover":{background:"transparent",color:"#404040"}},waftsrch:{padding:0,position:"absolute",borderLeft:"1px solid #d9e3e9",borderRadius:0,"&:hover":{background:"transparent",color:"#404040"}}}});t.default=Object(l.compose)(oe,de,r.memo)(re)}}]);
=======
(window.webpackJsonp=window.webpackJsonp||[]).push([[205],{e960333568f8029130a1:function(e,t,n){"use strict";n.r(t);var a={};n.r(a),n.d(a,"loadAllRequest",function(){return k}),n.d(a,"loadAllSuccess",function(){return _}),n.d(a,"loadAllFailure",function(){return m}),n.d(a,"loadOneRequest",function(){return v}),n.d(a,"loadOneSuccess",function(){return F}),n.d(a,"loadOneFailure",function(){return L}),n.d(a,"deleteOneRequest",function(){return A}),n.d(a,"deleteOneSuccess",function(){return j}),n.d(a,"deleteOneFailure",function(){return S}),n.d(a,"setOneValue",function(){return h}),n.d(a,"clearOne",function(){return R}),n.d(a,"addEditRequest",function(){return D}),n.d(a,"addEditSuccess",function(){return w}),n.d(a,"addEditFailure",function(){return U}),n.d(a,"setQueryValue",function(){return C}),n.d(a,"clearQuery",function(){return T}),n.d(a,"clearErrors",function(){return N});var r=n("8af190b70a6bc55c6f1b"),c=n.n(r),o=(n("8a2d1b95e05b6a321e74"),n("d7dd51e1bf6bfc2c9c3d")),d=n("ab039aecd4a1d4fedc0e"),u=n("a28fc3c963a1d4d1a2e5"),i=n("e95a63b25fb92ed15721"),l=n("ab4cb61bcb2dc161defb"),p=n("3aced5b508e7389026da"),b=n("0d7f0986bcd2f33d8a2a"),f=n("4a683f0a5e64e66a8eb9"),s=n.n(f),y=n("73bb0e359204f9566244"),E=n("adc20f99e57c573c589c"),O=n("d95b0cf107403b178365"),g="app/Feedback/LOAD_ALL_REQUEST",k=function(e){return{type:g,payload:e}},_=function(e){return{type:"app/Feedback/LOAD_ALL_SUCCESS",payload:e}},m=function(e){return{type:"app/Feedback/LOAD_ALL_FAILURE",payload:e}},v=function(e){return{type:"app/Feedback/LOAD_ONE_REQUEST",payload:e}},F=function(e){return{type:"app/Feedback/LOAD_ONE_SUCCESS",payload:e}},L=function(e){return{type:"app/Feedback/LOAD_ONE_FAILURE",payload:e}},A=function(e){return{type:"app/Feedback/DELETE_ONE_REQUEST",payload:e}},j=function(e){return{type:"app/Feedback/DELETE_ONE_SUCCESS",payload:e}},S=function(e){return{type:"app/Feedback/DELETE_ONE_FAILURE",payload:e}},h=function(e){return{type:"app/Feedback/SET_ONE_VALUE",payload:e}},R=function(){return{type:"app/Feedback/CLEAR_ONE"}},D=function(e){return{type:"app/Feedback/ADD_EDIT_REQUEST",payload:e}},w=function(e){return{type:"app/Feedback/ADD_EDIT_SUCCESS",payload:e}},U=function(e){return{type:"app/Feedback/ADD_EDIT_FAILURE",payload:e}},C=function(e){return{type:"app/Feedback/SET_QUERY_VALUE",payload:e}},T=function(){return{type:"app/Feedback/CLEAR_QUERY"}},N=function(){return{type:"app/Feedback/CLEAR_ERRORS"}},P=n("7edf83707012a871cdfb"),x={all:{data:[],page:1,size:10,totaldata:0},one:{},query:{},loading:!1,errors:{title:"",value:"",description:""}},I=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:x,t=arguments.length>1?arguments[1]:void 0;return Object(P.a)(e,function(e){switch(t.type){case g:e.loading=!0;break;case"app/Feedback/LOAD_ALL_SUCCESS":e.all=t.payload,e.loading=!1;break;case"app/Feedback/LOAD_ALL_FAILURE":e.loading=!1}})},Q=function(e){return e.feedback||x},q=n("d782b72bc5b680c7122c"),z=n("6144be5eac76f277117a"),V=n("6542cd13fd5dd1bcffd4"),M=(n("a72b40110d9c31c9b5c5"),regeneratorRuntime.mark(H)),B=regeneratorRuntime.mark(J);function H(e){var t,n;return regeneratorRuntime.wrap(function(a){for(;;)switch(a.prev=a.next){case 0:return a.next=2,Object(q.select)(Object(V.j)());case 2:return t=a.sent,n="",e.payload&&Object.keys(e.payload).map(function(t){return n="".concat(n,"&").concat(t,"=").concat(e.payload[t]),null}),a.next=7,Object(q.call)(z.a.get("feedback/admin?".concat(n),_,m,t));case 7:case"end":return a.stop()}},M)}function J(){return regeneratorRuntime.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,Object(q.takeLatest)(g,H);case 2:case"end":return e.stop()}},B)}Object(d.defineMessages)({header:{id:"".concat("app.containers.Feedback",".header"),defaultMessage:"This is the Feedback container!"}});var Y,$=n("d733903be61208652859"),W=n("5932430beb0c05240602"),G=(n("61118b78f8958645f2e4"),n("2fad9e66eff5130ad191"));function K(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);t&&(a=a.filter(function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable})),n.push.apply(n,a)}return n}function X(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?K(Object(n),!0).forEach(function(t){Z(e,t,n[t])}):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):K(Object(n)).forEach(function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))})}return e}function Z(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function ee(e,t,n,a){Y||(Y="function"===typeof Symbol&&Symbol.for&&Symbol.for("react.element")||60103);var r=e&&e.defaultProps,c=arguments.length-3;if(t||0===c||(t={children:void 0}),1===c)t.children=a;else if(c>1){for(var o=new Array(c),d=0;d<c;d++)o[d]=arguments[d+3];t.children=o}if(t&&r)for(var u in r)void 0===t[u]&&(t[u]=r[u]);else t||(t=r||{});return{$$typeof:Y,type:e,key:void 0===n?null:""+n,ref:null,props:t,_owner:null}}n.d(t,"Feedback",function(){return re});var te=ee(b.Helmet,{},void 0,ee("title",{},void 0,"Feedbacks")),ne=ee(G.a,{}),ae=ee($.a,{},void 0,"Feedbacks "),re=function(e){var t=e.all,n=t.data,a=t.page,o=t.size,d=t.totaldata,u=e.loading,l=e.loadAllRequest;e.classes,e.push;Object(O.b)({key:"feedback",reducer:I}),Object(E.b)({key:"feedback",saga:J}),Object(r.useEffect)(function(){l()},[]);var p={page:a,size:o,totaldata:d},b=n.map(function(e){e._id;var t=e.is_listing_correct,n=e.reason,a=e.property_id,r=e.email,c=e.mobile_no,o=e.description;return[t?"Correct":"In Correct",n&&n.length>0?n.map(function(e){return ee("p",{},void 0,e.title)}):"No Reasons given",a?ee(i.Link,{to:a.is_project?"/project/".concat(a.slug_url):"/detail/".concat(a.slug_url),target:"_blank",className:"underline text-secondary text-sm cursor-pointer mt-1 block"},void 0," ",a.basic.title," "):"Null",r,c,o]});return c.a.createElement(c.a.Fragment,null,te,ee("div",{className:"flex justify-between mt-3 mb-3"},void 0,u&&!0===u?ne:c.a.createElement(c.a.Fragment,null),ae),ee(W.a,{loading:u},void 0,ee(y.a,{tableHead:["Was listing correct?","Reasons","Property","Email","Mobile no.","Description",""],tableData:b,pagination:p,handlePagination:function(e){var t=e.page,n=e.size;l({page:t,size:n})}})))},ce=Object(u.b)({all:Object(u.a)(Q,function(e){return e.all}),loading:Object(u.a)(Q,function(e){return e.loading})}),oe=Object(o.connect)(ce,X(X({},a),{},{push:p.push})),de=s()(function(e){return{button:{margin:e.spacing.unit},fab:{width:"40px",height:"40px",marginTop:"auto",marginBottom:"auto"},tableActionButton:{padding:0,"&:hover":{background:"transparent",color:"#404040"}},waftsrch:{padding:0,position:"absolute",borderLeft:"1px solid #d9e3e9",borderRadius:0,"&:hover":{background:"transparent",color:"#404040"}}}});t.default=Object(l.compose)(oe,de,r.memo)(re)}}]);
>>>>>>> 41f64895ae2d4aeb7736fd90e084d7a063de2675:client/build/205.71238943339cd3b6fe7e.chunk.js
