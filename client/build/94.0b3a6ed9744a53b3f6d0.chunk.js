<<<<<<< HEAD:client/build/95.55aac5042d4daadf2a6a.chunk.js
(window.webpackJsonp=window.webpackJsonp||[]).push([[95],{"07e58ab2505d3e3d66fe":function(e,n,t){"use strict";t.d(n,"b",function(){return i});var r=t("7edf83707012a871cdfb"),a=t("f02b53616392cf22050d");function c(e,n){var t=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);n&&(r=r.filter(function(n){return Object.getOwnPropertyDescriptor(e,n).enumerable})),t.push.apply(t,r)}return t}function u(e){for(var n=1;n<arguments.length;n++){var t=null!=arguments[n]?arguments[n]:{};n%2?c(Object(t),!0).forEach(function(n){o(e,n,t[n])}):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(t)):c(Object(t)).forEach(function(n){Object.defineProperty(e,n,Object.getOwnPropertyDescriptor(t,n))})}return e}function o(e,n,t){return n in e?Object.defineProperty(e,n,{value:t,enumerable:!0,configurable:!0,writable:!0}):e[n]=t,e}var i={all:{data:[],page:1,size:10,totaldata:0,msg:""},one:{is_active:!1,description:"",role_title:""},query:{find_role_title:""},loading:!1,errors:{role_title:"",description:""}};n.a=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:i,n=arguments.length>1?arguments[1]:void 0;return Object(r.a)(e,function(e){switch(n.type){case a.q:e.one[n.payload.key]=n.payload.value,e.errors[n.payload.key]="";break;case a.r:e.query[n.payload.key]=n.payload.value;break;case a.a:e.errors=n.payload.errors;break;case a.d:e.errors=i.errors;break;case a.f:e.query=i.query;break;case a.e:e.one=i.one;break;case a.l:e.loading=!0;break;case a.m:e.loading=!1,e.all=n.payload;break;case a.k:e.loading=!1;break;case a.o:e.loading=!0;break;case a.p:e.loading=!1,e.one=n.payload.data;break;case a.n:e.loading=!1;break;case a.j:e.all=u(u({},e.all),{},{data:e.all.data.filter(function(e){return e._id!=n.payload.data._id})})}})}},"8656b68f1d2278a1daff":function(e,n,t){"use strict";t.d(n,"a",function(){return u}),t.d(n,"d",function(){return o}),t.d(n,"e",function(){return i}),t.d(n,"c",function(){return d}),t.d(n,"b",function(){return s});var r=t("a28fc3c963a1d4d1a2e5"),a=t("07e58ab2505d3e3d66fe"),c=function(e){return e.adminRole||a.b},u=function(){return Object(r.a)(c,function(e){return e.all})},o=function(){return Object(r.a)(c,function(e){return e.one})},i=function(){return Object(r.a)(c,function(e){return e.query})},d=function(){return Object(r.a)(c,function(e){return e.loading})},s=function(){return Object(r.a)(c,function(e){return e.errors})}},aed90175127863971c62:function(e,n,t){"use strict";t.r(n),t.d(n,"defaultAction",function(){return a}),t.d(n,"setOneValue",function(){return c}),t.d(n,"setQueryValue",function(){return u}),t.d(n,"clearQuery",function(){return o}),t.d(n,"clearOne",function(){return i}),t.d(n,"loadAllRequest",function(){return d}),t.d(n,"loadAllSuccess",function(){return s}),t.d(n,"loadAllFailure",function(){return l}),t.d(n,"loadOneRequest",function(){return f}),t.d(n,"loadOneSuccess",function(){return p}),t.d(n,"loadOneFailure",function(){return b}),t.d(n,"addEditRequest",function(){return O}),t.d(n,"addEditSuccess",function(){return y}),t.d(n,"addEditFailure",function(){return m}),t.d(n,"deleteOneRequest",function(){return j}),t.d(n,"deleteOneSuccess",function(){return g}),t.d(n,"deleteOneFailure",function(){return R}),t.d(n,"clearErrors",function(){return E});var r=t("f02b53616392cf22050d");function a(){return{type:r.g}}var c=function(e){return{type:r.q,payload:e}},u=function(e){return{type:r.r,payload:e}},o=function(){return{type:r.f}},i=function(){return{type:r.e}},d=function(e){return{type:r.l,payload:e}},s=function(e){return{type:r.m,payload:e}},l=function(e){return{type:r.k,payload:e}},f=function(e){return{type:r.o,payload:e}},p=function(e){return{type:r.p,payload:e}},b=function(e){return{type:r.n,payload:e}},O=function(e){return{type:r.b,payload:e}},y=function(e){return{type:r.c,payload:e}},m=function(e){return{type:r.a,payload:e}},j=function(e){return{type:r.i,payload:e}},g=function(e){return{type:r.j,payload:e}},R=function(e){return{type:r.h,payload:e}},E=function(){return{type:r.d}}},e9e6671151fefd8b1ff0:function(e,n,t){"use strict";t.d(n,"a",function(){return h});var r=t("d782b72bc5b680c7122c"),a=t("3aced5b508e7389026da"),c=t("6144be5eac76f277117a"),u=t("6542cd13fd5dd1bcffd4"),o=t("f02b53616392cf22050d"),i=t("aed90175127863971c62"),d=t("8656b68f1d2278a1daff"),s=t("a72b40110d9c31c9b5c5"),l=regeneratorRuntime.mark(E),f=regeneratorRuntime.mark(A),p=regeneratorRuntime.mark(k),b=regeneratorRuntime.mark(w),O=regeneratorRuntime.mark(v),y=regeneratorRuntime.mark(_),m=regeneratorRuntime.mark(x),j=regeneratorRuntime.mark(S),g=regeneratorRuntime.mark(L),R=regeneratorRuntime.mark(h);function E(e){var n,t;return regeneratorRuntime.wrap(function(a){for(;;)switch(a.prev=a.next){case 0:return a.next=2,Object(r.select)(Object(u.j)());case 2:return n=a.sent,t="",e.payload&&Object.keys(e.payload).map(function(n){return t="".concat(t,"&").concat(n,"=").concat(e.payload[n]),null}),a.next=7,Object(r.call)(c.a.get("role/role?".concat(t),i.loadAllSuccess,i.loadAllFailure,n));case 7:case"end":return a.stop()}},l)}function A(e){var n;return regeneratorRuntime.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,Object(r.select)(Object(u.j)());case 2:return n=t.sent,t.next=5,Object(r.call)(c.a.get("role/role/".concat(e.payload),i.loadOneSuccess,i.loadOneFailure,n));case 5:case"end":return t.stop()}},f)}function k(e){var n;return regeneratorRuntime.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,Object(r.select)(Object(u.j)());case 2:return n=t.sent,t.next=5,Object(r.call)(c.a.delete("role/role/".concat(e.payload),i.deleteOneSuccess,i.deleteOneFailure,n));case 5:case"end":return t.stop()}},p)}function w(){return regeneratorRuntime.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,Object(r.take)(o.c);case 2:return e.next=4,Object(r.put)(Object(a.push)("/admin/role-manage"));case 4:case"end":return e.stop()}},b)}function v(){var e,n,t;return regeneratorRuntime.wrap(function(s){for(;;)switch(s.prev=s.next){case 0:return s.next=2,Object(r.fork)(w);case 2:return e=s.sent,s.next=5,Object(r.select)(Object(u.j)());case 5:return n=s.sent,s.next=8,Object(r.select)(Object(d.d)());case 8:return t=s.sent,s.next=11,Object(r.fork)(c.a.post("role/role",i.addEditSuccess,i.addEditFailure,t,n));case 11:return s.next=13,Object(r.take)([a.LOCATION_CHANGE,o.a]);case 13:return s.next=15,Object(r.cancel)(e);case 15:case"end":return s.stop()}},O)}function _(e){var n;return regeneratorRuntime.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return n={message:e.payload.msg||"Role delete success!!",options:{variant:"success"}},t.next=3,Object(r.put)(Object(s.enqueueSnackbar)(n));case 3:case"end":return t.stop()}},y)}function x(e){var n;return regeneratorRuntime.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return n={message:e.payload.msg||"Something went wrong while deleting!!",options:{variant:"warning"}},t.next=3,Object(r.put)(Object(s.enqueueSnackbar)(n));case 3:case"end":return t.stop()}},m)}function S(e){var n;return regeneratorRuntime.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return n={message:e.payload.msg||"Something went wrong while updating!!",options:{variant:"warning"}},t.next=3,Object(r.put)(Object(s.enqueueSnackbar)(n));case 3:case"end":return t.stop()}},j)}function L(e){var n;return regeneratorRuntime.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return n={message:e.payload.msg||"Update Success!!",options:{variant:"success"}},t.next=3,Object(r.put)(Object(s.enqueueSnackbar)(n));case 3:case"end":return t.stop()}},g)}function h(){return regeneratorRuntime.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,Object(r.takeLatest)(o.l,E);case 2:return e.next=4,Object(r.takeLatest)(o.o,A);case 4:return e.next=6,Object(r.takeLatest)(o.b,v);case 6:return e.next=8,Object(r.takeLatest)(o.i,k);case 8:return e.next=10,Object(r.takeLatest)(o.j,_);case 10:return e.next=12,Object(r.takeLatest)(o.h,x);case 12:return e.next=14,Object(r.takeLatest)(o.a,S);case 14:return e.next=16,Object(r.takeLatest)(o.c,L);case 16:case"end":return e.stop()}},R)}},f02b53616392cf22050d:function(e,n,t){"use strict";t.d(n,"g",function(){return r}),t.d(n,"q",function(){return a}),t.d(n,"e",function(){return c}),t.d(n,"r",function(){return u}),t.d(n,"f",function(){return o}),t.d(n,"l",function(){return i}),t.d(n,"m",function(){return d}),t.d(n,"k",function(){return s}),t.d(n,"o",function(){return l}),t.d(n,"p",function(){return f}),t.d(n,"n",function(){return p}),t.d(n,"b",function(){return b}),t.d(n,"c",function(){return O}),t.d(n,"a",function(){return y}),t.d(n,"i",function(){return m}),t.d(n,"j",function(){return j}),t.d(n,"h",function(){return g}),t.d(n,"d",function(){return R});var r="app/AdminRole/DEFAULT_ACTION",a="app/AdminRole/SET_ONE_VALUE",c="app/AdminRole/CLEAR_ONE",u="app/AdminRole/SET_QUERY_VALUE",o="app/AdminRole/CLEAR_QUERY",i="app/AdminRole/LOAD_ALL_REQUEST",d="app/AdminRole/LOAD_ALL_SUCCESS",s="app/AdminRole/LOAD_ALL_FAILURE",l="app/AdminRole/LOAD_ONE_REQUEST",f="app/AdminRole/LOAD_ONE_SUCCESS",p="app/AdminRole/LOAD_ONE_FAILURE",b="app/AdminRole/ADD_EDIT_REQUEST",O="app/AdminRole/ADD_EDIT_SUCCESS",y="app/AdminRole/ADD_EDIT_FAILURE",m="app/AdminRole/DELETE_ONE_REQUEST",j="app/AdminRole/DELETE_ONE_SUCCESS",g="app/AdminRole/DELETE_ONE_FAILURE",R="app/AdminRole/CLEAR_ERRORS"}}]);
=======
(window.webpackJsonp=window.webpackJsonp||[]).push([[94],{"07e58ab2505d3e3d66fe":function(e,n,t){"use strict";t.d(n,"b",function(){return i});var r=t("7edf83707012a871cdfb"),a=t("f02b53616392cf22050d");function c(e,n){var t=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);n&&(r=r.filter(function(n){return Object.getOwnPropertyDescriptor(e,n).enumerable})),t.push.apply(t,r)}return t}function u(e){for(var n=1;n<arguments.length;n++){var t=null!=arguments[n]?arguments[n]:{};n%2?c(Object(t),!0).forEach(function(n){o(e,n,t[n])}):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(t)):c(Object(t)).forEach(function(n){Object.defineProperty(e,n,Object.getOwnPropertyDescriptor(t,n))})}return e}function o(e,n,t){return n in e?Object.defineProperty(e,n,{value:t,enumerable:!0,configurable:!0,writable:!0}):e[n]=t,e}var i={all:{data:[],page:1,size:10,totaldata:0,msg:""},one:{is_active:!1,description:"",role_title:""},query:{find_role_title:""},loading:!1,errors:{role_title:"",description:""}};n.a=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:i,n=arguments.length>1?arguments[1]:void 0;return Object(r.a)(e,function(e){switch(n.type){case a.q:e.one[n.payload.key]=n.payload.value,e.errors[n.payload.key]="";break;case a.r:e.query[n.payload.key]=n.payload.value;break;case a.a:e.errors=n.payload.errors;break;case a.d:e.errors=i.errors;break;case a.f:e.query=i.query;break;case a.e:e.one=i.one;break;case a.l:e.loading=!0;break;case a.m:e.loading=!1,e.all=n.payload;break;case a.k:e.loading=!1;break;case a.o:e.loading=!0;break;case a.p:e.loading=!1,e.one=n.payload.data;break;case a.n:e.loading=!1;break;case a.j:e.all=u(u({},e.all),{},{data:e.all.data.filter(function(e){return e._id!=n.payload.data._id})})}})}},"8656b68f1d2278a1daff":function(e,n,t){"use strict";t.d(n,"a",function(){return u}),t.d(n,"d",function(){return o}),t.d(n,"e",function(){return i}),t.d(n,"c",function(){return d}),t.d(n,"b",function(){return s});var r=t("a28fc3c963a1d4d1a2e5"),a=t("07e58ab2505d3e3d66fe"),c=function(e){return e.adminRole||a.b},u=function(){return Object(r.a)(c,function(e){return e.all})},o=function(){return Object(r.a)(c,function(e){return e.one})},i=function(){return Object(r.a)(c,function(e){return e.query})},d=function(){return Object(r.a)(c,function(e){return e.loading})},s=function(){return Object(r.a)(c,function(e){return e.errors})}},aed90175127863971c62:function(e,n,t){"use strict";t.r(n),t.d(n,"defaultAction",function(){return a}),t.d(n,"setOneValue",function(){return c}),t.d(n,"setQueryValue",function(){return u}),t.d(n,"clearQuery",function(){return o}),t.d(n,"clearOne",function(){return i}),t.d(n,"loadAllRequest",function(){return d}),t.d(n,"loadAllSuccess",function(){return s}),t.d(n,"loadAllFailure",function(){return l}),t.d(n,"loadOneRequest",function(){return f}),t.d(n,"loadOneSuccess",function(){return p}),t.d(n,"loadOneFailure",function(){return b}),t.d(n,"addEditRequest",function(){return O}),t.d(n,"addEditSuccess",function(){return y}),t.d(n,"addEditFailure",function(){return m}),t.d(n,"deleteOneRequest",function(){return j}),t.d(n,"deleteOneSuccess",function(){return g}),t.d(n,"deleteOneFailure",function(){return R}),t.d(n,"clearErrors",function(){return E});var r=t("f02b53616392cf22050d");function a(){return{type:r.g}}var c=function(e){return{type:r.q,payload:e}},u=function(e){return{type:r.r,payload:e}},o=function(){return{type:r.f}},i=function(){return{type:r.e}},d=function(e){return{type:r.l,payload:e}},s=function(e){return{type:r.m,payload:e}},l=function(e){return{type:r.k,payload:e}},f=function(e){return{type:r.o,payload:e}},p=function(e){return{type:r.p,payload:e}},b=function(e){return{type:r.n,payload:e}},O=function(e){return{type:r.b,payload:e}},y=function(e){return{type:r.c,payload:e}},m=function(e){return{type:r.a,payload:e}},j=function(e){return{type:r.i,payload:e}},g=function(e){return{type:r.j,payload:e}},R=function(e){return{type:r.h,payload:e}},E=function(){return{type:r.d}}},e9e6671151fefd8b1ff0:function(e,n,t){"use strict";t.d(n,"a",function(){return h});var r=t("d782b72bc5b680c7122c"),a=t("3aced5b508e7389026da"),c=t("6144be5eac76f277117a"),u=t("6542cd13fd5dd1bcffd4"),o=t("f02b53616392cf22050d"),i=t("aed90175127863971c62"),d=t("8656b68f1d2278a1daff"),s=t("a72b40110d9c31c9b5c5"),l=regeneratorRuntime.mark(E),f=regeneratorRuntime.mark(A),p=regeneratorRuntime.mark(k),b=regeneratorRuntime.mark(w),O=regeneratorRuntime.mark(v),y=regeneratorRuntime.mark(_),m=regeneratorRuntime.mark(x),j=regeneratorRuntime.mark(S),g=regeneratorRuntime.mark(L),R=regeneratorRuntime.mark(h);function E(e){var n,t;return regeneratorRuntime.wrap(function(a){for(;;)switch(a.prev=a.next){case 0:return a.next=2,Object(r.select)(Object(u.j)());case 2:return n=a.sent,t="",e.payload&&Object.keys(e.payload).map(function(n){return t="".concat(t,"&").concat(n,"=").concat(e.payload[n]),null}),a.next=7,Object(r.call)(c.a.get("role/role?".concat(t),i.loadAllSuccess,i.loadAllFailure,n));case 7:case"end":return a.stop()}},l)}function A(e){var n;return regeneratorRuntime.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,Object(r.select)(Object(u.j)());case 2:return n=t.sent,t.next=5,Object(r.call)(c.a.get("role/role/".concat(e.payload),i.loadOneSuccess,i.loadOneFailure,n));case 5:case"end":return t.stop()}},f)}function k(e){var n;return regeneratorRuntime.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,Object(r.select)(Object(u.j)());case 2:return n=t.sent,t.next=5,Object(r.call)(c.a.delete("role/role/".concat(e.payload),i.deleteOneSuccess,i.deleteOneFailure,n));case 5:case"end":return t.stop()}},p)}function w(){return regeneratorRuntime.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,Object(r.take)(o.c);case 2:return e.next=4,Object(r.put)(Object(a.push)("/admin/role-manage"));case 4:case"end":return e.stop()}},b)}function v(){var e,n,t;return regeneratorRuntime.wrap(function(s){for(;;)switch(s.prev=s.next){case 0:return s.next=2,Object(r.fork)(w);case 2:return e=s.sent,s.next=5,Object(r.select)(Object(u.j)());case 5:return n=s.sent,s.next=8,Object(r.select)(Object(d.d)());case 8:return t=s.sent,s.next=11,Object(r.fork)(c.a.post("role/role",i.addEditSuccess,i.addEditFailure,t,n));case 11:return s.next=13,Object(r.take)([a.LOCATION_CHANGE,o.a]);case 13:return s.next=15,Object(r.cancel)(e);case 15:case"end":return s.stop()}},O)}function _(e){var n;return regeneratorRuntime.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return n={message:e.payload.msg||"Role delete success!!",options:{variant:"success"}},t.next=3,Object(r.put)(Object(s.enqueueSnackbar)(n));case 3:case"end":return t.stop()}},y)}function x(e){var n;return regeneratorRuntime.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return n={message:e.payload.msg||"Something went wrong while deleting!!",options:{variant:"warning"}},t.next=3,Object(r.put)(Object(s.enqueueSnackbar)(n));case 3:case"end":return t.stop()}},m)}function S(e){var n;return regeneratorRuntime.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return n={message:e.payload.msg||"Something went wrong while updating!!",options:{variant:"warning"}},t.next=3,Object(r.put)(Object(s.enqueueSnackbar)(n));case 3:case"end":return t.stop()}},j)}function L(e){var n;return regeneratorRuntime.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return n={message:e.payload.msg||"Update Success!!",options:{variant:"success"}},t.next=3,Object(r.put)(Object(s.enqueueSnackbar)(n));case 3:case"end":return t.stop()}},g)}function h(){return regeneratorRuntime.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,Object(r.takeLatest)(o.l,E);case 2:return e.next=4,Object(r.takeLatest)(o.o,A);case 4:return e.next=6,Object(r.takeLatest)(o.b,v);case 6:return e.next=8,Object(r.takeLatest)(o.i,k);case 8:return e.next=10,Object(r.takeLatest)(o.j,_);case 10:return e.next=12,Object(r.takeLatest)(o.h,x);case 12:return e.next=14,Object(r.takeLatest)(o.a,S);case 14:return e.next=16,Object(r.takeLatest)(o.c,L);case 16:case"end":return e.stop()}},R)}},f02b53616392cf22050d:function(e,n,t){"use strict";t.d(n,"g",function(){return r}),t.d(n,"q",function(){return a}),t.d(n,"e",function(){return c}),t.d(n,"r",function(){return u}),t.d(n,"f",function(){return o}),t.d(n,"l",function(){return i}),t.d(n,"m",function(){return d}),t.d(n,"k",function(){return s}),t.d(n,"o",function(){return l}),t.d(n,"p",function(){return f}),t.d(n,"n",function(){return p}),t.d(n,"b",function(){return b}),t.d(n,"c",function(){return O}),t.d(n,"a",function(){return y}),t.d(n,"i",function(){return m}),t.d(n,"j",function(){return j}),t.d(n,"h",function(){return g}),t.d(n,"d",function(){return R});var r="app/AdminRole/DEFAULT_ACTION",a="app/AdminRole/SET_ONE_VALUE",c="app/AdminRole/CLEAR_ONE",u="app/AdminRole/SET_QUERY_VALUE",o="app/AdminRole/CLEAR_QUERY",i="app/AdminRole/LOAD_ALL_REQUEST",d="app/AdminRole/LOAD_ALL_SUCCESS",s="app/AdminRole/LOAD_ALL_FAILURE",l="app/AdminRole/LOAD_ONE_REQUEST",f="app/AdminRole/LOAD_ONE_SUCCESS",p="app/AdminRole/LOAD_ONE_FAILURE",b="app/AdminRole/ADD_EDIT_REQUEST",O="app/AdminRole/ADD_EDIT_SUCCESS",y="app/AdminRole/ADD_EDIT_FAILURE",m="app/AdminRole/DELETE_ONE_REQUEST",j="app/AdminRole/DELETE_ONE_SUCCESS",g="app/AdminRole/DELETE_ONE_FAILURE",R="app/AdminRole/CLEAR_ERRORS"}}]);
>>>>>>> 41f64895ae2d4aeb7736fd90e084d7a063de2675:client/build/94.0b3a6ed9744a53b3f6d0.chunk.js