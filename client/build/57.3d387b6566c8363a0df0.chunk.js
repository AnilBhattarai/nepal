<<<<<<< HEAD:client/build/57.3d387b6566c8363a0df0.chunk.js
(window.webpackJsonp=window.webpackJsonp||[]).push([[57],{"5a6441ecd3f69e4d3094":function(e,t,n){"use strict";n.d(t,"a",function(){return V});var r=n("d782b72bc5b680c7122c"),a=n("3aced5b508e7389026da"),c=n("6542cd13fd5dd1bcffd4"),u=n("6144be5eac76f277117a"),o=n("92f1129708d1c56dfaa8"),i=n("9fd1722c83a432fe9e60"),s=n("a6ed5c9d41576d823236"),d=n("a72b40110d9c31c9b5c5"),p=regeneratorRuntime.mark(k),f=regeneratorRuntime.mark(R),l=regeneratorRuntime.mark(x),b=regeneratorRuntime.mark(w),O=regeneratorRuntime.mark(D),y=regeneratorRuntime.mark(L),_=regeneratorRuntime.mark(C),A=regeneratorRuntime.mark(T),j=regeneratorRuntime.mark(I),g=regeneratorRuntime.mark(h),E=regeneratorRuntime.mark(U),v=regeneratorRuntime.mark(F),S=regeneratorRuntime.mark(q),m=regeneratorRuntime.mark(V);function k(e){var t,n;return regeneratorRuntime.wrap(function(a){for(;;)switch(a.prev=a.next){case 0:return a.next=2,Object(r.select)(Object(c.j)());case 2:return t=a.sent,n="",e.payload&&Object.keys(e.payload).map(function(t){return n="".concat(n,"&").concat(t,"=").concat(e.payload[t]),null}),a.next=7,Object(r.call)(u.a.get("static/nepal/area?".concat(n),i.loadAllSuccess,i.loadAllFailure,t));case 7:case"end":return a.stop()}},p)}function R(e){var t;return regeneratorRuntime.wrap(function(n){for(;;)switch(n.prev=n.next){case 0:return n.next=2,Object(r.select)(Object(c.j)());case 2:return t=n.sent,n.next=5,Object(r.call)(u.a.get("static/nepal/area/".concat(e.payload),i.loadOneSuccess,i.loadOneFailure,t));case 5:case"end":return n.stop()}},f)}function x(){return regeneratorRuntime.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,Object(r.take)(o.c);case 2:return e.next=4,Object(r.put)(Object(a.push)("/admin/area-manage"));case 4:case"end":return e.stop()}},l)}function w(){var e,t,n;return regeneratorRuntime.wrap(function(d){for(;;)switch(d.prev=d.next){case 0:return d.next=2,Object(r.fork)(x);case 2:return e=d.sent,d.next=5,Object(r.select)(Object(c.j)());case 5:return t=d.sent,d.next=8,Object(r.select)(Object(s.f)());case 8:return n=d.sent,d.next=11,Object(r.fork)(u.a.post("static/nepal/area",i.addEditSuccess,i.addEditFailure,n,t));case 11:return d.next=13,Object(r.take)([a.LOCATION_CHANGE,o.a]);case 13:return d.next=15,Object(r.cancel)(e);case 15:case"end":return d.stop()}},b)}function D(e){var t;return regeneratorRuntime.wrap(function(n){for(;;)switch(n.prev=n.next){case 0:return t={message:e.payload.msg||"Update success!!",options:{variant:"success"}},n.next=3,Object(r.put)(Object(d.enqueueSnackbar)(t));case 3:case"end":return n.stop()}},O)}function L(e){var t;return regeneratorRuntime.wrap(function(n){for(;;)switch(n.prev=n.next){case 0:return t={message:e.payload.msg||"Something went wrong",options:{variant:"warning"}},n.next=3,Object(r.put)(Object(d.enqueueSnackbar)(t));case 3:case"end":return n.stop()}},y)}function C(e){var t;return regeneratorRuntime.wrap(function(n){for(;;)switch(n.prev=n.next){case 0:return n.next=2,Object(r.select)(Object(c.j)());case 2:return t=n.sent,n.next=5,Object(r.call)(u.a.post("static/nepal/area",i.deleteOneSuccess,i.deleteOneFailure,{_id:e.payload,is_deleted:"true"},t));case 5:case"end":return n.stop()}},_)}function T(e){var t;return regeneratorRuntime.wrap(function(n){for(;;)switch(n.prev=n.next){case 0:return t={message:e.payload.msg||"Area delete success",options:{variant:"success"}},n.next=3,Object(r.put)(Object(d.enqueueSnackbar)(t));case 3:case"end":return n.stop()}},A)}function I(e){var t;return regeneratorRuntime.wrap(function(n){for(;;)switch(n.prev=n.next){case 0:return t={message:e.payload.msg||"something went wrong",options:{variant:"warning"}},n.next=3,Object(r.put)(Object(d.enqueueSnackbar)(t));case 3:case"end":return n.stop()}},j)}function h(e){var t;return regeneratorRuntime.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,Object(r.select)(Object(c.j)());case 2:return t=e.sent,e.next=5,Object(r.call)(u.a.get("static/nepal/state",i.loadStateSuccess,i.loadStateFailure,t));case 5:case"end":return e.stop()}},g)}function U(e){var t,n;return regeneratorRuntime.wrap(function(a){for(;;)switch(a.prev=a.next){case 0:return t=e.payload.state_id,a.next=3,Object(r.select)(Object(c.j)());case 3:return n=a.sent,a.next=6,Object(r.call)(u.a.get("static/nepal/district?state_id=".concat(t),i.loadDistrictSuccess,i.loadDistrictFailure,n));case 6:case"end":return a.stop()}},E)}function F(e){var t,n;return regeneratorRuntime.wrap(function(a){for(;;)switch(a.prev=a.next){case 0:return t=e.payload.district_id,a.next=3,Object(r.select)(Object(c.j)());case 3:return n=a.sent,a.next=6,Object(r.call)(u.a.get("static/nepal/vdc?district_id=".concat(t),i.loadVdcSuccess,i.loadVdcFailure,n));case 6:case"end":return a.stop()}},v)}function q(e){var t;return regeneratorRuntime.wrap(function(n){for(;;)switch(n.prev=n.next){case 0:return n.next=2,Object(r.select)(Object(c.j)());case 2:return t=n.sent,n.next=5,Object(r.call)(u.a.post("static/nepal/area/active",i.addIsActiveSuccess,i.addIsActiveFailure,{_id:e.payload._id,is_active:!e.payload.status},t));case 5:case"end":return n.stop()}},S)}function V(){return regeneratorRuntime.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,Object(r.takeLatest)(o.n,k);case 2:return e.next=4,Object(r.takeLatest)(o.t,R);case 4:return e.next=6,Object(r.takeLatest)(o.b,w);case 6:return e.next=8,Object(r.takeLatest)(o.a,L);case 8:return e.next=10,Object(r.takeLatest)(o.c,D);case 10:return e.next=12,Object(r.takeLatest)(o.k,C);case 12:return e.next=14,Object(r.takeLatest)(o.j,I);case 14:return e.next=16,Object(r.takeLatest)(o.l,T);case 16:return e.next=18,Object(r.takeLatest)(o.z,F);case 18:return e.next=20,Object(r.takeLatest)(o.w,h);case 20:return e.next=22,Object(r.takeLatest)(o.q,U);case 22:return e.next=24,Object(r.takeLatest)(o.e,q);case 24:case"end":return e.stop()}},m)}},"92f1129708d1c56dfaa8":function(e,t,n){"use strict";n.d(t,"n",function(){return r}),n.d(t,"o",function(){return a}),n.d(t,"m",function(){return c}),n.d(t,"t",function(){return u}),n.d(t,"u",function(){return o}),n.d(t,"s",function(){return i}),n.d(t,"b",function(){return s}),n.d(t,"c",function(){return d}),n.d(t,"a",function(){return p}),n.d(t,"k",function(){return f}),n.d(t,"l",function(){return l}),n.d(t,"j",function(){return b}),n.d(t,"z",function(){return O}),n.d(t,"A",function(){return y}),n.d(t,"y",function(){return _}),n.d(t,"w",function(){return A}),n.d(t,"x",function(){return j}),n.d(t,"v",function(){return g}),n.d(t,"q",function(){return E}),n.d(t,"r",function(){return v}),n.d(t,"p",function(){return S}),n.d(t,"C",function(){return m}),n.d(t,"h",function(){return k}),n.d(t,"D",function(){return R}),n.d(t,"i",function(){return x}),n.d(t,"g",function(){return w}),n.d(t,"B",function(){return D}),n.d(t,"e",function(){return L}),n.d(t,"f",function(){return C}),n.d(t,"d",function(){return T});var r="app/Area/LOAD_ALL_REQUEST",a="app/Area/LOAD_ALL_SUCCESS",c="app/Area/LOAD_ALL_FAILURE",u="app/Area/LOAD_ONE_REQUEST",o="app/Area/LOAD_ONE_SUCCESS",i="app/Area/LOAD_ONE_FAILURE",s="app/Area/ADD_EDIT_REQUEST",d="app/Area/ADD_EDIT_SUCCESS",p="app/Area/ADD_EDIT_FAILURE",f="app/Area/DELETE_ONE_REQUEST",l="app/Area/DELETE_ONE_SUCCESS",b="app/Area/DELETE_ONE_FAILURE",O="app/Area/LOAD_VDC_REQUEST",y="app/Area/LOAD_VDC_SUCCESS",_="app/Area/LOAD_VDC_FAILURE",A="app/Area/LOAD_STATE_REQUEST",j="app/Area/LOAD_STATE_SUCCESS",g="app/Area/LOAD_STATE_FAILURE",E="app/Area/LOAD_DISTRICT_REQUEST",v="app/Area/LOAD_DISTRICT_SUCCESS",S="app/Area/LOAD_DISTRICT_FAILURE",m="app/Area/SET_ONE_VALUE",k="app/Area/CLEAR_ONE",R="app/Area/SET_QUERY_VALUE",x="app/Area/CLEAR_QUERY",w="app/Area/CLEAR_ERRORS",D="app/Area/SET_IS_ACTIVE",L="app/Area/ADD_IS_ACTIVE_REQUEST",C="app/Area/ADD_IS_ACTIVE_SUCCESS",T="app/Area/ADD_IS_ACTIVE_FAILURE"},"9fd1722c83a432fe9e60":function(e,t,n){"use strict";n.r(t),n.d(t,"loadAllRequest",function(){return a}),n.d(t,"loadAllSuccess",function(){return c}),n.d(t,"loadAllFailure",function(){return u}),n.d(t,"loadOneRequest",function(){return o}),n.d(t,"loadOneSuccess",function(){return i}),n.d(t,"loadOneFailure",function(){return s}),n.d(t,"addEditRequest",function(){return d}),n.d(t,"addEditSuccess",function(){return p}),n.d(t,"addEditFailure",function(){return f}),n.d(t,"deleteOneRequest",function(){return l}),n.d(t,"deleteOneSuccess",function(){return b}),n.d(t,"deleteOneFailure",function(){return O}),n.d(t,"setOneValue",function(){return y}),n.d(t,"clearOne",function(){return _}),n.d(t,"setQueryValue",function(){return A}),n.d(t,"clearQuery",function(){return j}),n.d(t,"clearErrors",function(){return g}),n.d(t,"setIsActive",function(){return E}),n.d(t,"loadVdcRequest",function(){return v}),n.d(t,"loadVdcSuccess",function(){return S}),n.d(t,"loadVdcFailure",function(){return m}),n.d(t,"loadStateRequest",function(){return k}),n.d(t,"loadStateSuccess",function(){return R}),n.d(t,"loadStateFailure",function(){return x}),n.d(t,"addIsActiveRequest",function(){return w}),n.d(t,"loadDistrictRequest",function(){return D}),n.d(t,"loadDistrictSuccess",function(){return L}),n.d(t,"loadDistrictFailure",function(){return C}),n.d(t,"addIsActiveSuccess",function(){return T}),n.d(t,"addIsActiveFailure",function(){return I});var r=n("92f1129708d1c56dfaa8"),a=function(e){return{type:r.n,payload:e}},c=function(e){return{type:r.o,payload:e}},u=function(e){return{type:r.m,payload:e}},o=function(e){return{type:r.t,payload:e}},i=function(e){return{type:r.u,payload:e}},s=function(e){return{type:r.s,payload:e}},d=function(e){return{type:r.b,payload:e}},p=function(e){return{type:r.c,payload:e}},f=function(e){return{type:r.a,payload:e}},l=function(e){return{type:r.k,payload:e}},b=function(e){return{type:r.l,payload:e}},O=function(e){return{type:r.j,payload:e}},y=function(e){return{type:r.C,payload:e}},_=function(){return{type:r.h}},A=function(e){return{type:r.D,payload:e}},j=function(){return{type:r.i}},g=function(){return{type:r.g}},E=function(){return{type:r.B}},v=function(e){return{type:r.z,payload:e}},S=function(e){return{type:r.A,payload:e}},m=function(e){return{type:r.y,payload:e}},k=function(e){return{type:r.w,payload:e}},R=function(e){return{type:r.x,payload:e}},x=function(e){return{type:r.v,payload:e}},w=function(e){return{type:r.e,payload:e}},D=function(e){return{type:r.q,payload:e}},L=function(e){return{type:r.r,payload:e}},C=function(e){return{type:r.p,payload:e}},T=function(e){return{type:r.f,payload:e}},I=function(e){return{type:r.d,payload:e}}},a6ed5c9d41576d823236:function(e,t,n){"use strict";n.d(t,"b",function(){return u}),n.d(t,"f",function(){return o}),n.d(t,"g",function(){return i}),n.d(t,"e",function(){return s}),n.d(t,"d",function(){return d}),n.d(t,"i",function(){return p}),n.d(t,"h",function(){return f}),n.d(t,"c",function(){return l}),n.d(t,"a",function(){return b});var r=n("a28fc3c963a1d4d1a2e5"),a=n("d7e4eab707d6a53f55ce"),c=function(e){return e.area||a.b},u=function(){return Object(r.a)(c,function(e){return e.all})},o=function(){return Object(r.a)(c,function(e){return e.one})},i=function(){return Object(r.a)(c,function(e){return e.query})},s=function(){return Object(r.a)(c,function(e){return e.loading})},d=function(){return Object(r.a)(c,function(e){return e.errors})},p=function(){return Object(r.a)(c,function(e){return e.vdc})},f=function(){return Object(r.a)(c,function(e){return e.state})},l=function(){return Object(r.a)(c,function(e){return e.district})},b=function(){return Object(r.a)(c,function(e){return e.active_status})}},d7e4eab707d6a53f55ce:function(e,t,n){"use strict";n.d(t,"b",function(){return i});var r=n("7edf83707012a871cdfb"),a=n("92f1129708d1c56dfaa8");function c(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter(function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable})),n.push.apply(n,r)}return n}function u(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?c(Object(n),!0).forEach(function(t){o(e,t,n[t])}):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):c(Object(n)).forEach(function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))})}return e}function o(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}var i={all:{data:[],size:10,totaldata:0,page:1},one:{name:"",vdcmunicipality_id:{name:"",slug:""},state_id:{name:"",slug:""},district_id:{name:"",slug:""}},query:{size:10,find_name:"",state_id:"",district_id:"",np_vdcmunicipality:""},loading:!1,active_status:{loading:!1,id:""},vdc:[],state:[],district:[],errors:{name:""}};t.a=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:i,t=arguments.length>1?arguments[1]:void 0;return Object(r.a)(e,function(e){switch(t.type){case a.n:e.loading=!0;break;case a.m:e.loading=!1;break;case a.o:e.all=t.payload,e.loading=!1;break;case a.t:e.loading=!0;break;case a.u:e.one=t.payload.data,e.loading=!1;break;case a.s:case a.c:e.loading=!1;break;case a.a:e.errors=t.payload.errors,e.loading=!1;break;case a.k:e.loading=!0;break;case a.l:e.all=u(u({},e.all),{},{data:e.all.data.filter(function(e){return e._id!=t.payload.data._id})}),e.loading=!1;break;case a.j:e.loading=!1;break;case a.B:e.one=u(u({},e.one),{},{is_active:!e.one.is_active});break;case a.C:e.one[t.payload.key]=t.payload.value,e.errors[t.payload.errors]=" ";break;case a.h:e.one=i.one;break;case a.D:e.query[t.payload.key]=t.payload.value;break;case a.g:e.errors=i.errors;break;case a.i:e.query=i.query;break;case a.A:e.vdc=t.payload.data;break;case a.x:e.state=t.payload.data;break;case a.r:e.district=t.payload.data;break;case a.e:e.active_status.loading=!0,e.active_status.id=t.payload._id;break;case a.d:e.active_status.loading=!1,e.active_status.id="";break;case a.f:console.log("value from reducer",t.payload),e.all.data=e.all.data.map(function(e){return e._id==t.payload.data._id?u(u({},e),{},{is_active:!e.is_active}):u({},e)}),e.active_status.id="",e.active_status.loading=!1}})}}}]);
=======
(window.webpackJsonp=window.webpackJsonp||[]).push([[56],{"5a6441ecd3f69e4d3094":function(e,t,n){"use strict";n.d(t,"a",function(){return V});var r=n("d782b72bc5b680c7122c"),a=n("3aced5b508e7389026da"),c=n("6542cd13fd5dd1bcffd4"),u=n("6144be5eac76f277117a"),o=n("92f1129708d1c56dfaa8"),i=n("9fd1722c83a432fe9e60"),s=n("a6ed5c9d41576d823236"),d=n("a72b40110d9c31c9b5c5"),p=regeneratorRuntime.mark(k),f=regeneratorRuntime.mark(R),l=regeneratorRuntime.mark(x),b=regeneratorRuntime.mark(w),O=regeneratorRuntime.mark(D),y=regeneratorRuntime.mark(L),_=regeneratorRuntime.mark(C),A=regeneratorRuntime.mark(T),j=regeneratorRuntime.mark(I),g=regeneratorRuntime.mark(h),E=regeneratorRuntime.mark(U),v=regeneratorRuntime.mark(F),S=regeneratorRuntime.mark(q),m=regeneratorRuntime.mark(V);function k(e){var t,n;return regeneratorRuntime.wrap(function(a){for(;;)switch(a.prev=a.next){case 0:return a.next=2,Object(r.select)(Object(c.j)());case 2:return t=a.sent,n="",e.payload&&Object.keys(e.payload).map(function(t){return n="".concat(n,"&").concat(t,"=").concat(e.payload[t]),null}),a.next=7,Object(r.call)(u.a.get("static/nepal/area?".concat(n),i.loadAllSuccess,i.loadAllFailure,t));case 7:case"end":return a.stop()}},p)}function R(e){var t;return regeneratorRuntime.wrap(function(n){for(;;)switch(n.prev=n.next){case 0:return n.next=2,Object(r.select)(Object(c.j)());case 2:return t=n.sent,n.next=5,Object(r.call)(u.a.get("static/nepal/area/".concat(e.payload),i.loadOneSuccess,i.loadOneFailure,t));case 5:case"end":return n.stop()}},f)}function x(){return regeneratorRuntime.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,Object(r.take)(o.c);case 2:return e.next=4,Object(r.put)(Object(a.push)("/admin/area-manage"));case 4:case"end":return e.stop()}},l)}function w(){var e,t,n;return regeneratorRuntime.wrap(function(d){for(;;)switch(d.prev=d.next){case 0:return d.next=2,Object(r.fork)(x);case 2:return e=d.sent,d.next=5,Object(r.select)(Object(c.j)());case 5:return t=d.sent,d.next=8,Object(r.select)(Object(s.f)());case 8:return n=d.sent,d.next=11,Object(r.fork)(u.a.post("static/nepal/area",i.addEditSuccess,i.addEditFailure,n,t));case 11:return d.next=13,Object(r.take)([a.LOCATION_CHANGE,o.a]);case 13:return d.next=15,Object(r.cancel)(e);case 15:case"end":return d.stop()}},b)}function D(e){var t;return regeneratorRuntime.wrap(function(n){for(;;)switch(n.prev=n.next){case 0:return t={message:e.payload.msg||"Update success!!",options:{variant:"success"}},n.next=3,Object(r.put)(Object(d.enqueueSnackbar)(t));case 3:case"end":return n.stop()}},O)}function L(e){var t;return regeneratorRuntime.wrap(function(n){for(;;)switch(n.prev=n.next){case 0:return t={message:e.payload.msg||"Something went wrong",options:{variant:"warning"}},n.next=3,Object(r.put)(Object(d.enqueueSnackbar)(t));case 3:case"end":return n.stop()}},y)}function C(e){var t;return regeneratorRuntime.wrap(function(n){for(;;)switch(n.prev=n.next){case 0:return n.next=2,Object(r.select)(Object(c.j)());case 2:return t=n.sent,n.next=5,Object(r.call)(u.a.post("static/nepal/area",i.deleteOneSuccess,i.deleteOneFailure,{_id:e.payload,is_deleted:"true"},t));case 5:case"end":return n.stop()}},_)}function T(e){var t;return regeneratorRuntime.wrap(function(n){for(;;)switch(n.prev=n.next){case 0:return t={message:e.payload.msg||"Area delete success",options:{variant:"success"}},n.next=3,Object(r.put)(Object(d.enqueueSnackbar)(t));case 3:case"end":return n.stop()}},A)}function I(e){var t;return regeneratorRuntime.wrap(function(n){for(;;)switch(n.prev=n.next){case 0:return t={message:e.payload.msg||"something went wrong",options:{variant:"warning"}},n.next=3,Object(r.put)(Object(d.enqueueSnackbar)(t));case 3:case"end":return n.stop()}},j)}function h(e){var t;return regeneratorRuntime.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,Object(r.select)(Object(c.j)());case 2:return t=e.sent,e.next=5,Object(r.call)(u.a.get("static/nepal/state",i.loadStateSuccess,i.loadStateFailure,t));case 5:case"end":return e.stop()}},g)}function U(e){var t,n;return regeneratorRuntime.wrap(function(a){for(;;)switch(a.prev=a.next){case 0:return t=e.payload.state_id,a.next=3,Object(r.select)(Object(c.j)());case 3:return n=a.sent,a.next=6,Object(r.call)(u.a.get("static/nepal/district?state_id=".concat(t),i.loadDistrictSuccess,i.loadDistrictFailure,n));case 6:case"end":return a.stop()}},E)}function F(e){var t,n;return regeneratorRuntime.wrap(function(a){for(;;)switch(a.prev=a.next){case 0:return t=e.payload.district_id,a.next=3,Object(r.select)(Object(c.j)());case 3:return n=a.sent,a.next=6,Object(r.call)(u.a.get("static/nepal/vdc?district_id=".concat(t),i.loadVdcSuccess,i.loadVdcFailure,n));case 6:case"end":return a.stop()}},v)}function q(e){var t;return regeneratorRuntime.wrap(function(n){for(;;)switch(n.prev=n.next){case 0:return n.next=2,Object(r.select)(Object(c.j)());case 2:return t=n.sent,n.next=5,Object(r.call)(u.a.post("static/nepal/area/active",i.addIsActiveSuccess,i.addIsActiveFailure,{_id:e.payload._id,is_active:!e.payload.status},t));case 5:case"end":return n.stop()}},S)}function V(){return regeneratorRuntime.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,Object(r.takeLatest)(o.n,k);case 2:return e.next=4,Object(r.takeLatest)(o.t,R);case 4:return e.next=6,Object(r.takeLatest)(o.b,w);case 6:return e.next=8,Object(r.takeLatest)(o.a,L);case 8:return e.next=10,Object(r.takeLatest)(o.c,D);case 10:return e.next=12,Object(r.takeLatest)(o.k,C);case 12:return e.next=14,Object(r.takeLatest)(o.j,I);case 14:return e.next=16,Object(r.takeLatest)(o.l,T);case 16:return e.next=18,Object(r.takeLatest)(o.z,F);case 18:return e.next=20,Object(r.takeLatest)(o.w,h);case 20:return e.next=22,Object(r.takeLatest)(o.q,U);case 22:return e.next=24,Object(r.takeLatest)(o.e,q);case 24:case"end":return e.stop()}},m)}},"92f1129708d1c56dfaa8":function(e,t,n){"use strict";n.d(t,"n",function(){return r}),n.d(t,"o",function(){return a}),n.d(t,"m",function(){return c}),n.d(t,"t",function(){return u}),n.d(t,"u",function(){return o}),n.d(t,"s",function(){return i}),n.d(t,"b",function(){return s}),n.d(t,"c",function(){return d}),n.d(t,"a",function(){return p}),n.d(t,"k",function(){return f}),n.d(t,"l",function(){return l}),n.d(t,"j",function(){return b}),n.d(t,"z",function(){return O}),n.d(t,"A",function(){return y}),n.d(t,"y",function(){return _}),n.d(t,"w",function(){return A}),n.d(t,"x",function(){return j}),n.d(t,"v",function(){return g}),n.d(t,"q",function(){return E}),n.d(t,"r",function(){return v}),n.d(t,"p",function(){return S}),n.d(t,"C",function(){return m}),n.d(t,"h",function(){return k}),n.d(t,"D",function(){return R}),n.d(t,"i",function(){return x}),n.d(t,"g",function(){return w}),n.d(t,"B",function(){return D}),n.d(t,"e",function(){return L}),n.d(t,"f",function(){return C}),n.d(t,"d",function(){return T});var r="app/Area/LOAD_ALL_REQUEST",a="app/Area/LOAD_ALL_SUCCESS",c="app/Area/LOAD_ALL_FAILURE",u="app/Area/LOAD_ONE_REQUEST",o="app/Area/LOAD_ONE_SUCCESS",i="app/Area/LOAD_ONE_FAILURE",s="app/Area/ADD_EDIT_REQUEST",d="app/Area/ADD_EDIT_SUCCESS",p="app/Area/ADD_EDIT_FAILURE",f="app/Area/DELETE_ONE_REQUEST",l="app/Area/DELETE_ONE_SUCCESS",b="app/Area/DELETE_ONE_FAILURE",O="app/Area/LOAD_VDC_REQUEST",y="app/Area/LOAD_VDC_SUCCESS",_="app/Area/LOAD_VDC_FAILURE",A="app/Area/LOAD_STATE_REQUEST",j="app/Area/LOAD_STATE_SUCCESS",g="app/Area/LOAD_STATE_FAILURE",E="app/Area/LOAD_DISTRICT_REQUEST",v="app/Area/LOAD_DISTRICT_SUCCESS",S="app/Area/LOAD_DISTRICT_FAILURE",m="app/Area/SET_ONE_VALUE",k="app/Area/CLEAR_ONE",R="app/Area/SET_QUERY_VALUE",x="app/Area/CLEAR_QUERY",w="app/Area/CLEAR_ERRORS",D="app/Area/SET_IS_ACTIVE",L="app/Area/ADD_IS_ACTIVE_REQUEST",C="app/Area/ADD_IS_ACTIVE_SUCCESS",T="app/Area/ADD_IS_ACTIVE_FAILURE"},"9fd1722c83a432fe9e60":function(e,t,n){"use strict";n.r(t),n.d(t,"loadAllRequest",function(){return a}),n.d(t,"loadAllSuccess",function(){return c}),n.d(t,"loadAllFailure",function(){return u}),n.d(t,"loadOneRequest",function(){return o}),n.d(t,"loadOneSuccess",function(){return i}),n.d(t,"loadOneFailure",function(){return s}),n.d(t,"addEditRequest",function(){return d}),n.d(t,"addEditSuccess",function(){return p}),n.d(t,"addEditFailure",function(){return f}),n.d(t,"deleteOneRequest",function(){return l}),n.d(t,"deleteOneSuccess",function(){return b}),n.d(t,"deleteOneFailure",function(){return O}),n.d(t,"setOneValue",function(){return y}),n.d(t,"clearOne",function(){return _}),n.d(t,"setQueryValue",function(){return A}),n.d(t,"clearQuery",function(){return j}),n.d(t,"clearErrors",function(){return g}),n.d(t,"setIsActive",function(){return E}),n.d(t,"loadVdcRequest",function(){return v}),n.d(t,"loadVdcSuccess",function(){return S}),n.d(t,"loadVdcFailure",function(){return m}),n.d(t,"loadStateRequest",function(){return k}),n.d(t,"loadStateSuccess",function(){return R}),n.d(t,"loadStateFailure",function(){return x}),n.d(t,"addIsActiveRequest",function(){return w}),n.d(t,"loadDistrictRequest",function(){return D}),n.d(t,"loadDistrictSuccess",function(){return L}),n.d(t,"loadDistrictFailure",function(){return C}),n.d(t,"addIsActiveSuccess",function(){return T}),n.d(t,"addIsActiveFailure",function(){return I});var r=n("92f1129708d1c56dfaa8"),a=function(e){return{type:r.n,payload:e}},c=function(e){return{type:r.o,payload:e}},u=function(e){return{type:r.m,payload:e}},o=function(e){return{type:r.t,payload:e}},i=function(e){return{type:r.u,payload:e}},s=function(e){return{type:r.s,payload:e}},d=function(e){return{type:r.b,payload:e}},p=function(e){return{type:r.c,payload:e}},f=function(e){return{type:r.a,payload:e}},l=function(e){return{type:r.k,payload:e}},b=function(e){return{type:r.l,payload:e}},O=function(e){return{type:r.j,payload:e}},y=function(e){return{type:r.C,payload:e}},_=function(){return{type:r.h}},A=function(e){return{type:r.D,payload:e}},j=function(){return{type:r.i}},g=function(){return{type:r.g}},E=function(){return{type:r.B}},v=function(e){return{type:r.z,payload:e}},S=function(e){return{type:r.A,payload:e}},m=function(e){return{type:r.y,payload:e}},k=function(e){return{type:r.w,payload:e}},R=function(e){return{type:r.x,payload:e}},x=function(e){return{type:r.v,payload:e}},w=function(e){return{type:r.e,payload:e}},D=function(e){return{type:r.q,payload:e}},L=function(e){return{type:r.r,payload:e}},C=function(e){return{type:r.p,payload:e}},T=function(e){return{type:r.f,payload:e}},I=function(e){return{type:r.d,payload:e}}},a6ed5c9d41576d823236:function(e,t,n){"use strict";n.d(t,"b",function(){return u}),n.d(t,"f",function(){return o}),n.d(t,"g",function(){return i}),n.d(t,"e",function(){return s}),n.d(t,"d",function(){return d}),n.d(t,"i",function(){return p}),n.d(t,"h",function(){return f}),n.d(t,"c",function(){return l}),n.d(t,"a",function(){return b});var r=n("a28fc3c963a1d4d1a2e5"),a=n("d7e4eab707d6a53f55ce"),c=function(e){return e.area||a.b},u=function(){return Object(r.a)(c,function(e){return e.all})},o=function(){return Object(r.a)(c,function(e){return e.one})},i=function(){return Object(r.a)(c,function(e){return e.query})},s=function(){return Object(r.a)(c,function(e){return e.loading})},d=function(){return Object(r.a)(c,function(e){return e.errors})},p=function(){return Object(r.a)(c,function(e){return e.vdc})},f=function(){return Object(r.a)(c,function(e){return e.state})},l=function(){return Object(r.a)(c,function(e){return e.district})},b=function(){return Object(r.a)(c,function(e){return e.active_status})}},d7e4eab707d6a53f55ce:function(e,t,n){"use strict";n.d(t,"b",function(){return i});var r=n("7edf83707012a871cdfb"),a=n("92f1129708d1c56dfaa8");function c(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter(function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable})),n.push.apply(n,r)}return n}function u(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?c(Object(n),!0).forEach(function(t){o(e,t,n[t])}):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):c(Object(n)).forEach(function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))})}return e}function o(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}var i={all:{data:[],size:10,totaldata:0,page:1},one:{name:"",vdcmunicipality_id:{name:"",slug:""},state_id:{name:"",slug:""},district_id:{name:"",slug:""}},query:{size:10,find_name:"",state_id:"",district_id:"",np_vdcmunicipality:""},loading:!1,active_status:{loading:!1,id:""},vdc:[],state:[],district:[],errors:{name:""}};t.a=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:i,t=arguments.length>1?arguments[1]:void 0;return Object(r.a)(e,function(e){switch(t.type){case a.n:e.loading=!0;break;case a.m:e.loading=!1;break;case a.o:e.all=t.payload,e.loading=!1;break;case a.t:e.loading=!0;break;case a.u:e.one=t.payload.data,e.loading=!1;break;case a.s:case a.c:e.loading=!1;break;case a.a:e.errors=t.payload.errors,e.loading=!1;break;case a.k:e.loading=!0;break;case a.l:e.all=u(u({},e.all),{},{data:e.all.data.filter(function(e){return e._id!=t.payload.data._id})}),e.loading=!1;break;case a.j:e.loading=!1;break;case a.B:e.one=u(u({},e.one),{},{is_active:!e.one.is_active});break;case a.C:e.one[t.payload.key]=t.payload.value,e.errors[t.payload.errors]=" ";break;case a.h:e.one=i.one;break;case a.D:e.query[t.payload.key]=t.payload.value;break;case a.g:e.errors=i.errors;break;case a.i:e.query=i.query;break;case a.A:e.vdc=t.payload.data;break;case a.x:e.state=t.payload.data;break;case a.r:e.district=t.payload.data;break;case a.e:e.active_status.loading=!0,e.active_status.id=t.payload._id;break;case a.d:e.active_status.loading=!1,e.active_status.id="";break;case a.f:console.log("value from reducer",t.payload),e.all.data=e.all.data.map(function(e){return e._id==t.payload.data._id?u(u({},e),{},{is_active:!e.is_active}):u({},e)}),e.active_status.id="",e.active_status.loading=!1}})}}}]);
>>>>>>> 41f64895ae2d4aeb7736fd90e084d7a063de2675:client/build/56.dabb0838a6fd48e3d763.chunk.js