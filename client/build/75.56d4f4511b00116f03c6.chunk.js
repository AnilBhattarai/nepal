<<<<<<< HEAD:client/build/76.59814bdec125e434736a.chunk.js
(window.webpackJsonp=window.webpackJsonp||[]).push([[76],{"3cb2597e505d65fdf55d":function(e,n,t){"use strict";t.d(n,"b",function(){return i});var r=t("7edf83707012a871cdfb"),a=t("e42c73132b0ab2bebbfe");function c(e,n){var t=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);n&&(r=r.filter(function(n){return Object.getOwnPropertyDescriptor(e,n).enumerable})),t.push.apply(t,r)}return t}function u(e){for(var n=1;n<arguments.length;n++){var t=null!=arguments[n]?arguments[n]:{};n%2?c(Object(t),!0).forEach(function(n){o(e,n,t[n])}):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(t)):c(Object(t)).forEach(function(n){Object.defineProperty(e,n,Object.getOwnPropertyDescriptor(t,n))})}return e}function o(e,n,t){return n in e?Object.defineProperty(e,n,{value:t,enumerable:!0,configurable:!0,writable:!0}):e[n]=t,e}var i={all:{data:[],page:1,size:10,totaldata:0},one:{name:"",inquiry:"",channel:"",email:"",phone_no:"",profile_link:"",date:"",is_active:!1},query:{find_channel:"Contact_Form"},loading:!1,errors:{},agency:[],agents:[],agent_loading:!1,open:!1};n.a=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:i,n=arguments.length>1?arguments[1]:void 0;return Object(r.a)(e,function(e){switch(n.type){case a.z:e.one[n.payload.key]=n.payload.value,e.errors[n.payload.errors]=" ";break;case a.a:e.errors=n.payload.errors;break;case a.h:e.errors=i.errors;break;case a.i:e.one=i.one;break;case a.B:e.query[n.payload.key]=n.payload.value;break;case a.j:e.query=i.query;break;case a.u:e.loading=!0;break;case a.v:e.all=n.payload,e.loading=!1;break;case a.x:e.loading=!0;break;case a.w:e.loading=!1;break;case a.y:e.one=n.payload.data,e.loading=!1;break;case a.m:e.all=u(u({},e.all),{},{data:e.all.data.filter(function(e){return e._id!=n.payload.data._id})});break;case a.s:e.agency=n.payload.data;break;case a.p:e.agents=n.payload.data;break;case a.e:e.agent_loading=!0;break;case a.d:e.agent_loading=!1;break;case a.f:e.agent_loading=!1,e.open=!1;break;case a.A:e.open=n.payload}})}},"404e59459171975627b2":function(e,n,t){"use strict";t.r(n),t.d(n,"loadAllRequest",function(){return a}),t.d(n,"loadAllSuccess",function(){return c}),t.d(n,"loadAllFailure",function(){return u}),t.d(n,"loadOneRequest",function(){return o}),t.d(n,"loadOneSuccess",function(){return i}),t.d(n,"loadOneFailure",function(){return s}),t.d(n,"deleteOneRequest",function(){return d}),t.d(n,"deleteOneSuccess",function(){return p}),t.d(n,"deleteOneFailure",function(){return f}),t.d(n,"setOneValue",function(){return l}),t.d(n,"clearOne",function(){return g}),t.d(n,"addEditRequest",function(){return b}),t.d(n,"addEditSuccess",function(){return y}),t.d(n,"addEditFailure",function(){return O}),t.d(n,"setQueryValue",function(){return j}),t.d(n,"clearQuery",function(){return A}),t.d(n,"clearErrors",function(){return E}),t.d(n,"loadAgencyRequest",function(){return L}),t.d(n,"loadAgencySuccess",function(){return m}),t.d(n,"loadAgencyFailure",function(){return _}),t.d(n,"loadAgentByAgencyRequest",function(){return k}),t.d(n,"loadAgentByAgencySuccess",function(){return S}),t.d(n,"loadAgentByAgencyFailure",function(){return w}),t.d(n,"AssignAgentRequest",function(){return x}),t.d(n,"AssignAgentSuccess",function(){return R}),t.d(n,"AssignAgentFailure",function(){return v}),t.d(n,"setOpen",function(){return h});var r=t("e42c73132b0ab2bebbfe"),a=function(e){return{type:r.u,payload:e}},c=function(e){return{type:r.v,payload:e}},u=function(e){return{type:r.t,payload:e}},o=function(e){return{type:r.x,payload:e}},i=function(e){return{type:r.y,payload:e}},s=function(e){return{type:r.w,payload:e}},d=function(e){return{type:r.l,payload:e}},p=function(e){return{type:r.m,payload:e}},f=function(e){return{type:r.k,payload:e}},l=function(e){return{type:r.z,payload:e}},g=function(){return{type:r.i}},b=function(e){return{type:r.b,payload:e}},y=function(e){return{type:r.c,payload:e}},O=function(e){return{type:r.a,payload:e}},j=function(e){return{type:r.B,payload:e}},A=function(){return{type:r.j}},E=function(){return{type:r.h}},L=function(e){return{type:r.r,payload:e}},m=function(e){return{type:r.s,payload:e}},_=function(e){return{type:r.q,payload:e}},k=function(e){return{type:r.o,payload:e}},S=function(e){return{type:r.p,payload:e}},w=function(e){return{type:r.n,payload:e}},x=function(e){return{type:r.e,payload:e}},R=function(e){return{type:r.f,payload:e}},v=function(e){return{type:r.d,payload:e}},h=function(e){return{type:r.A,payload:e}}},cae7908db3e2d0512d43:function(e,n,t){"use strict";t.d(n,"a",function(){return I});var r=t("d782b72bc5b680c7122c"),a=t("3aced5b508e7389026da"),c=t("6144be5eac76f277117a"),u=t("6542cd13fd5dd1bcffd4"),o=t("e42c73132b0ab2bebbfe"),i=t("404e59459171975627b2"),s=t("dfb4766e80dfa12ed28b"),d=t("a72b40110d9c31c9b5c5"),p=regeneratorRuntime.mark(w),f=regeneratorRuntime.mark(x),l=regeneratorRuntime.mark(R),g=regeneratorRuntime.mark(v),b=regeneratorRuntime.mark(h),y=regeneratorRuntime.mark(D),O=regeneratorRuntime.mark(M),j=regeneratorRuntime.mark(N),A=regeneratorRuntime.mark(U),E=regeneratorRuntime.mark(C),L=regeneratorRuntime.mark(F),m=regeneratorRuntime.mark(q),_=regeneratorRuntime.mark(T),k=regeneratorRuntime.mark(G),S=regeneratorRuntime.mark(I);function w(e){var n,t;return regeneratorRuntime.wrap(function(a){for(;;)switch(a.prev=a.next){case 0:return a.next=2,Object(r.select)(Object(u.j)());case 2:return n=a.sent,t="",e.payload&&Object.keys(e.payload).map(function(n){return t="".concat(t,"&").concat(n,"=").concat(e.payload[n]),null}),a.next=7,Object(r.call)(c.a.get("lead?".concat(t),i.loadAllSuccess,i.loadAllFailure,n));case 7:case"end":return a.stop()}},p)}function x(e){var n;return regeneratorRuntime.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,Object(r.select)(Object(u.j)());case 2:return n=t.sent,t.next=5,Object(r.call)(c.a.get("lead/".concat(e.payload),i.loadOneSuccess,i.loadOneFailure,n));case 5:case"end":return t.stop()}},f)}function R(){return regeneratorRuntime.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,Object(r.take)(o.c);case 2:return e.next=4,Object(r.put)(Object(a.push)("/admin/lead-manage"));case 4:case"end":return e.stop()}},l)}function v(){var e,n,t;return regeneratorRuntime.wrap(function(d){for(;;)switch(d.prev=d.next){case 0:return d.next=2,Object(r.fork)(R);case 2:return e=d.sent,d.next=5,Object(r.select)(Object(u.j)());case 5:return n=d.sent,d.next=8,Object(r.select)(Object(s.g)());case 8:return t=d.sent,d.next=11,Object(r.fork)(c.a.post("lead",i.addEditSuccess,i.addEditFailure,t,n));case 11:return d.next=13,Object(r.take)([a.LOCATION_CHANGE,o.a]);case 13:return d.next=15,Object(r.cancel)(e);case 15:case"end":return d.stop()}},g)}function h(e){var n;return regeneratorRuntime.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,Object(r.select)(Object(u.j)());case 2:return n=t.sent,t.next=5,Object(r.call)(c.a.delete("lead/".concat(e.payload),i.deleteOneSuccess,i.deleteOneFailure,n));case 5:case"end":return t.stop()}},b)}function D(e){var n;return regeneratorRuntime.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return n={message:e.payload.msg||"Service type delete success",options:{variant:"success"}},t.next=3,Object(r.put)(Object(d.enqueueSnackbar)(n));case 3:case"end":return t.stop()}},y)}function M(e){var n;return regeneratorRuntime.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return n={message:e.payload.msg||"Something went wrong while deleting!!",options:{variant:"warning"}},t.next=3,Object(r.put)(Object(d.enqueueSnackbar)(n));case 3:case"end":return t.stop()}},O)}function N(e){var n;return regeneratorRuntime.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return n={message:e.payload.msg||"Update success!!",options:{variant:"success"}},t.next=3,Object(r.put)(Object(d.enqueueSnackbar)(n));case 3:case"end":return t.stop()}},j)}function U(e){var n;return regeneratorRuntime.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return n={message:e.payload.msg||"Something went wrong while updating",options:{variant:"warning"}},t.next=3,Object(r.put)(Object(d.enqueueSnackbar)(n));case 3:case"end":return t.stop()}},A)}function C(e){var n;return regeneratorRuntime.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,Object(r.select)(Object(u.j)());case 2:return n=e.sent,e.next=5,Object(r.call)(c.a.get("agency/getall/dropdown",i.loadAgencySuccess,i.loadAgencyFailure,n));case 5:case"end":return e.stop()}},E)}function F(e){var n;return regeneratorRuntime.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,Object(r.select)(Object(u.j)());case 2:return n=t.sent,t.next=5,Object(r.call)(c.a.get("agency/getAgentOfAgency/".concat(e.payload),i.loadAgentByAgencySuccess,i.loadAgentByAgencyFailure,n));case 5:case"end":return t.stop()}},L)}function q(e){var n,t;return regeneratorRuntime.wrap(function(a){for(;;)switch(a.prev=a.next){case 0:return a.next=2,Object(r.select)(Object(u.j)());case 2:return n=a.sent,t=e.payload,a.next=6,Object(r.fork)(c.a.post("lead/assigntoagent",i.AssignAgentSuccess,i.AssignAgentFailure,t,n));case 6:case"end":return a.stop()}},m)}function T(e){var n,t;return regeneratorRuntime.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,Object(r.select)(Object(s.i)());case 2:return n=e.sent,t={message:"Agent Asigned",options:{variant:"success"}},e.next=6,Object(r.put)(Object(d.enqueueSnackbar)(t));case 6:return e.next=8,Object(r.put)(i.loadAllRequest(n));case 8:case"end":return e.stop()}},_)}function G(e){var n;return regeneratorRuntime.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return n={message:"Something went wrong while updating",options:{variant:"warning"}},e.next=3,Object(r.put)(Object(d.enqueueSnackbar)(n));case 3:case"end":return e.stop()}},k)}function I(){return regeneratorRuntime.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,Object(r.takeLatest)(o.u,w);case 2:return e.next=4,Object(r.takeLatest)(o.x,x);case 4:return e.next=6,Object(r.takeLatest)(o.b,v);case 6:return e.next=8,Object(r.takeLatest)(o.l,h);case 8:return e.next=10,Object(r.takeLatest)(o.m,D);case 10:return e.next=12,Object(r.takeLatest)(o.k,M);case 12:return e.next=14,Object(r.takeLatest)(o.a,U);case 14:return e.next=16,Object(r.takeLatest)(o.c,N);case 16:return e.next=18,Object(r.takeLatest)(o.r,C);case 18:return e.next=20,Object(r.takeLatest)(o.o,F);case 20:return e.next=22,Object(r.takeLatest)(o.e,q);case 22:return e.next=24,Object(r.takeLatest)(o.f,T);case 24:return e.next=26,Object(r.takeLatest)(o.d,G);case 26:case"end":return e.stop()}},S)}},dfb4766e80dfa12ed28b:function(e,n,t){"use strict";t.d(n,"d",function(){return u}),t.d(n,"g",function(){return o}),t.d(n,"i",function(){return i}),t.d(n,"f",function(){return s}),t.d(n,"e",function(){return d}),t.d(n,"a",function(){return p}),t.d(n,"c",function(){return f}),t.d(n,"h",function(){return l}),t.d(n,"b",function(){return g});var r=t("a28fc3c963a1d4d1a2e5"),a=t("3cb2597e505d65fdf55d"),c=function(e){return e.leadManage||a.b},u=function(){return Object(r.a)(c,function(e){return e.all})},o=function(){return Object(r.a)(c,function(e){return e.one})},i=function(){return Object(r.a)(c,function(e){return e.query})},s=function(){return Object(r.a)(c,function(e){return e.loading})},d=function(){return Object(r.a)(c,function(e){return e.errors})},p=function(){return Object(r.a)(c,function(e){return e.agency})},f=function(){return Object(r.a)(c,function(e){return e.agents})},l=function(){return Object(r.a)(c,function(e){return e.open})},g=function(){return Object(r.a)(c,function(e){return e.agent_loading})}},e42c73132b0ab2bebbfe:function(e,n,t){"use strict";t.d(n,"u",function(){return r}),t.d(n,"v",function(){return a}),t.d(n,"t",function(){return c}),t.d(n,"x",function(){return u}),t.d(n,"y",function(){return o}),t.d(n,"w",function(){return i}),t.d(n,"b",function(){return s}),t.d(n,"c",function(){return d}),t.d(n,"a",function(){return p}),t.d(n,"l",function(){return f}),t.d(n,"m",function(){return l}),t.d(n,"k",function(){return g}),t.d(n,"z",function(){return b}),t.d(n,"i",function(){return y}),t.d(n,"B",function(){return O}),t.d(n,"j",function(){return j}),t.d(n,"h",function(){return A}),t.d(n,"g",function(){return E}),t.d(n,"r",function(){return L}),t.d(n,"s",function(){return m}),t.d(n,"q",function(){return _}),t.d(n,"o",function(){return k}),t.d(n,"p",function(){return S}),t.d(n,"n",function(){return w}),t.d(n,"e",function(){return x}),t.d(n,"f",function(){return R}),t.d(n,"d",function(){return v}),t.d(n,"A",function(){return h});var r="app/LeadManage/LOAD_ALL_REQUEST",a="app/LeadManage/LOAD_ALL_SUCCESS",c="app/LeadManage/LOAD_ALL_FAILURE",u="app/LeadManage/LOAD_ONE_REQUEST",o="app/LeadManage/LOAD_ONE_SUCCESS",i="app/LeadManage/LOAD_ONE_FAILURE",s="app/LeadManage/ADD_EDIT_REQUEST",d="app/LeadManage/ADD_EDIT_SUCCESS",p="app/LeadManage/ADD_EDIT_FAILURE",f="app/LeadManage/DELETE_ONE_REQUEST",l="app/LeadManage/DELETE_ONE_SUCCESS",g="app/LeadManage/DELETE_ONE_FAILURE",b="app/LeadManage/SET_ONE_VALUE",y="app/LeadManage/CLEAR_ONE",O="app/LeadManage/SET_QUERY_VALUE",j="app/LeadManage/CLEAR_QUERY",A="app/LeadManage/CLEAR_ERRORS",E=["Contact_Form","Facebook","Property_Inquiries","Via_Phone"],L="app/LeadManage/LOAD_AGENY_REQUEST",m="app/LeadManage/LOAD_AGENY_SUCCESS",_="app/LeadManage/LOAD_AGENY_FAILURE",k="app/LeadManage/LOAD_AGENT_BY_AGENCY_REQUEST",S="app/LeadManage/LOAD_AGENT_BY_AGENCY_SUCCESS",w="app/LeadManage/LOAD_AGENT_BY_AGENCY_FAILURE",x="app/LeadManage/ASSIGN_AGENT_REQUEST",R="app/LeadManage/ASSIGN_AGENT_SUCCESS",v="app/LeadManage/ASSIGN_AGENT_FAILURE",h="app/LeadManage/SET_OPEN"}}]);
=======
(window.webpackJsonp=window.webpackJsonp||[]).push([[75],{"3cb2597e505d65fdf55d":function(e,n,t){"use strict";t.d(n,"b",function(){return i});var r=t("7edf83707012a871cdfb"),a=t("e42c73132b0ab2bebbfe");function c(e,n){var t=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);n&&(r=r.filter(function(n){return Object.getOwnPropertyDescriptor(e,n).enumerable})),t.push.apply(t,r)}return t}function u(e){for(var n=1;n<arguments.length;n++){var t=null!=arguments[n]?arguments[n]:{};n%2?c(Object(t),!0).forEach(function(n){o(e,n,t[n])}):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(t)):c(Object(t)).forEach(function(n){Object.defineProperty(e,n,Object.getOwnPropertyDescriptor(t,n))})}return e}function o(e,n,t){return n in e?Object.defineProperty(e,n,{value:t,enumerable:!0,configurable:!0,writable:!0}):e[n]=t,e}var i={all:{data:[],page:1,size:10,totaldata:0},one:{name:"",inquiry:"",channel:"",email:"",phone_no:"",profile_link:"",date:"",is_active:!1},query:{find_channel:"Contact_Form"},loading:!1,errors:{},agency:[],agents:[],agent_loading:!1,open:!1};n.a=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:i,n=arguments.length>1?arguments[1]:void 0;return Object(r.a)(e,function(e){switch(n.type){case a.z:e.one[n.payload.key]=n.payload.value,e.errors[n.payload.errors]=" ";break;case a.a:e.errors=n.payload.errors;break;case a.h:e.errors=i.errors;break;case a.i:e.one=i.one;break;case a.B:e.query[n.payload.key]=n.payload.value;break;case a.j:e.query=i.query;break;case a.u:e.loading=!0;break;case a.v:e.all=n.payload,e.loading=!1;break;case a.x:e.loading=!0;break;case a.w:e.loading=!1;break;case a.y:e.one=n.payload.data,e.loading=!1;break;case a.m:e.all=u(u({},e.all),{},{data:e.all.data.filter(function(e){return e._id!=n.payload.data._id})});break;case a.s:e.agency=n.payload.data;break;case a.p:e.agents=n.payload.data;break;case a.e:e.agent_loading=!0;break;case a.d:e.agent_loading=!1;break;case a.f:e.agent_loading=!1,e.open=!1;break;case a.A:e.open=n.payload}})}},"404e59459171975627b2":function(e,n,t){"use strict";t.r(n),t.d(n,"loadAllRequest",function(){return a}),t.d(n,"loadAllSuccess",function(){return c}),t.d(n,"loadAllFailure",function(){return u}),t.d(n,"loadOneRequest",function(){return o}),t.d(n,"loadOneSuccess",function(){return i}),t.d(n,"loadOneFailure",function(){return s}),t.d(n,"deleteOneRequest",function(){return d}),t.d(n,"deleteOneSuccess",function(){return p}),t.d(n,"deleteOneFailure",function(){return f}),t.d(n,"setOneValue",function(){return l}),t.d(n,"clearOne",function(){return g}),t.d(n,"addEditRequest",function(){return b}),t.d(n,"addEditSuccess",function(){return y}),t.d(n,"addEditFailure",function(){return O}),t.d(n,"setQueryValue",function(){return j}),t.d(n,"clearQuery",function(){return A}),t.d(n,"clearErrors",function(){return E}),t.d(n,"loadAgencyRequest",function(){return L}),t.d(n,"loadAgencySuccess",function(){return m}),t.d(n,"loadAgencyFailure",function(){return _}),t.d(n,"loadAgentByAgencyRequest",function(){return k}),t.d(n,"loadAgentByAgencySuccess",function(){return S}),t.d(n,"loadAgentByAgencyFailure",function(){return w}),t.d(n,"AssignAgentRequest",function(){return x}),t.d(n,"AssignAgentSuccess",function(){return R}),t.d(n,"AssignAgentFailure",function(){return v}),t.d(n,"setOpen",function(){return h});var r=t("e42c73132b0ab2bebbfe"),a=function(e){return{type:r.u,payload:e}},c=function(e){return{type:r.v,payload:e}},u=function(e){return{type:r.t,payload:e}},o=function(e){return{type:r.x,payload:e}},i=function(e){return{type:r.y,payload:e}},s=function(e){return{type:r.w,payload:e}},d=function(e){return{type:r.l,payload:e}},p=function(e){return{type:r.m,payload:e}},f=function(e){return{type:r.k,payload:e}},l=function(e){return{type:r.z,payload:e}},g=function(){return{type:r.i}},b=function(e){return{type:r.b,payload:e}},y=function(e){return{type:r.c,payload:e}},O=function(e){return{type:r.a,payload:e}},j=function(e){return{type:r.B,payload:e}},A=function(){return{type:r.j}},E=function(){return{type:r.h}},L=function(e){return{type:r.r,payload:e}},m=function(e){return{type:r.s,payload:e}},_=function(e){return{type:r.q,payload:e}},k=function(e){return{type:r.o,payload:e}},S=function(e){return{type:r.p,payload:e}},w=function(e){return{type:r.n,payload:e}},x=function(e){return{type:r.e,payload:e}},R=function(e){return{type:r.f,payload:e}},v=function(e){return{type:r.d,payload:e}},h=function(e){return{type:r.A,payload:e}}},cae7908db3e2d0512d43:function(e,n,t){"use strict";t.d(n,"a",function(){return I});var r=t("d782b72bc5b680c7122c"),a=t("3aced5b508e7389026da"),c=t("6144be5eac76f277117a"),u=t("6542cd13fd5dd1bcffd4"),o=t("e42c73132b0ab2bebbfe"),i=t("404e59459171975627b2"),s=t("dfb4766e80dfa12ed28b"),d=t("a72b40110d9c31c9b5c5"),p=regeneratorRuntime.mark(w),f=regeneratorRuntime.mark(x),l=regeneratorRuntime.mark(R),g=regeneratorRuntime.mark(v),b=regeneratorRuntime.mark(h),y=regeneratorRuntime.mark(D),O=regeneratorRuntime.mark(M),j=regeneratorRuntime.mark(N),A=regeneratorRuntime.mark(U),E=regeneratorRuntime.mark(C),L=regeneratorRuntime.mark(F),m=regeneratorRuntime.mark(q),_=regeneratorRuntime.mark(T),k=regeneratorRuntime.mark(G),S=regeneratorRuntime.mark(I);function w(e){var n,t;return regeneratorRuntime.wrap(function(a){for(;;)switch(a.prev=a.next){case 0:return a.next=2,Object(r.select)(Object(u.j)());case 2:return n=a.sent,t="",e.payload&&Object.keys(e.payload).map(function(n){return t="".concat(t,"&").concat(n,"=").concat(e.payload[n]),null}),a.next=7,Object(r.call)(c.a.get("lead?".concat(t),i.loadAllSuccess,i.loadAllFailure,n));case 7:case"end":return a.stop()}},p)}function x(e){var n;return regeneratorRuntime.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,Object(r.select)(Object(u.j)());case 2:return n=t.sent,t.next=5,Object(r.call)(c.a.get("lead/".concat(e.payload),i.loadOneSuccess,i.loadOneFailure,n));case 5:case"end":return t.stop()}},f)}function R(){return regeneratorRuntime.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,Object(r.take)(o.c);case 2:return e.next=4,Object(r.put)(Object(a.push)("/admin/lead-manage"));case 4:case"end":return e.stop()}},l)}function v(){var e,n,t;return regeneratorRuntime.wrap(function(d){for(;;)switch(d.prev=d.next){case 0:return d.next=2,Object(r.fork)(R);case 2:return e=d.sent,d.next=5,Object(r.select)(Object(u.j)());case 5:return n=d.sent,d.next=8,Object(r.select)(Object(s.g)());case 8:return t=d.sent,d.next=11,Object(r.fork)(c.a.post("lead",i.addEditSuccess,i.addEditFailure,t,n));case 11:return d.next=13,Object(r.take)([a.LOCATION_CHANGE,o.a]);case 13:return d.next=15,Object(r.cancel)(e);case 15:case"end":return d.stop()}},g)}function h(e){var n;return regeneratorRuntime.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,Object(r.select)(Object(u.j)());case 2:return n=t.sent,t.next=5,Object(r.call)(c.a.delete("lead/".concat(e.payload),i.deleteOneSuccess,i.deleteOneFailure,n));case 5:case"end":return t.stop()}},b)}function D(e){var n;return regeneratorRuntime.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return n={message:e.payload.msg||"Service type delete success",options:{variant:"success"}},t.next=3,Object(r.put)(Object(d.enqueueSnackbar)(n));case 3:case"end":return t.stop()}},y)}function M(e){var n;return regeneratorRuntime.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return n={message:e.payload.msg||"Something went wrong while deleting!!",options:{variant:"warning"}},t.next=3,Object(r.put)(Object(d.enqueueSnackbar)(n));case 3:case"end":return t.stop()}},O)}function N(e){var n;return regeneratorRuntime.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return n={message:e.payload.msg||"Update success!!",options:{variant:"success"}},t.next=3,Object(r.put)(Object(d.enqueueSnackbar)(n));case 3:case"end":return t.stop()}},j)}function U(e){var n;return regeneratorRuntime.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return n={message:e.payload.msg||"Something went wrong while updating",options:{variant:"warning"}},t.next=3,Object(r.put)(Object(d.enqueueSnackbar)(n));case 3:case"end":return t.stop()}},A)}function C(e){var n;return regeneratorRuntime.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,Object(r.select)(Object(u.j)());case 2:return n=e.sent,e.next=5,Object(r.call)(c.a.get("agency/getall/dropdown",i.loadAgencySuccess,i.loadAgencyFailure,n));case 5:case"end":return e.stop()}},E)}function F(e){var n;return regeneratorRuntime.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,Object(r.select)(Object(u.j)());case 2:return n=t.sent,t.next=5,Object(r.call)(c.a.get("agency/getAgentOfAgency/".concat(e.payload),i.loadAgentByAgencySuccess,i.loadAgentByAgencyFailure,n));case 5:case"end":return t.stop()}},L)}function q(e){var n,t;return regeneratorRuntime.wrap(function(a){for(;;)switch(a.prev=a.next){case 0:return a.next=2,Object(r.select)(Object(u.j)());case 2:return n=a.sent,t=e.payload,a.next=6,Object(r.fork)(c.a.post("lead/assigntoagent",i.AssignAgentSuccess,i.AssignAgentFailure,t,n));case 6:case"end":return a.stop()}},m)}function T(e){var n,t;return regeneratorRuntime.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,Object(r.select)(Object(s.i)());case 2:return n=e.sent,t={message:"Agent Asigned",options:{variant:"success"}},e.next=6,Object(r.put)(Object(d.enqueueSnackbar)(t));case 6:return e.next=8,Object(r.put)(i.loadAllRequest(n));case 8:case"end":return e.stop()}},_)}function G(e){var n;return regeneratorRuntime.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return n={message:"Something went wrong while updating",options:{variant:"warning"}},e.next=3,Object(r.put)(Object(d.enqueueSnackbar)(n));case 3:case"end":return e.stop()}},k)}function I(){return regeneratorRuntime.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,Object(r.takeLatest)(o.u,w);case 2:return e.next=4,Object(r.takeLatest)(o.x,x);case 4:return e.next=6,Object(r.takeLatest)(o.b,v);case 6:return e.next=8,Object(r.takeLatest)(o.l,h);case 8:return e.next=10,Object(r.takeLatest)(o.m,D);case 10:return e.next=12,Object(r.takeLatest)(o.k,M);case 12:return e.next=14,Object(r.takeLatest)(o.a,U);case 14:return e.next=16,Object(r.takeLatest)(o.c,N);case 16:return e.next=18,Object(r.takeLatest)(o.r,C);case 18:return e.next=20,Object(r.takeLatest)(o.o,F);case 20:return e.next=22,Object(r.takeLatest)(o.e,q);case 22:return e.next=24,Object(r.takeLatest)(o.f,T);case 24:return e.next=26,Object(r.takeLatest)(o.d,G);case 26:case"end":return e.stop()}},S)}},dfb4766e80dfa12ed28b:function(e,n,t){"use strict";t.d(n,"d",function(){return u}),t.d(n,"g",function(){return o}),t.d(n,"i",function(){return i}),t.d(n,"f",function(){return s}),t.d(n,"e",function(){return d}),t.d(n,"a",function(){return p}),t.d(n,"c",function(){return f}),t.d(n,"h",function(){return l}),t.d(n,"b",function(){return g});var r=t("a28fc3c963a1d4d1a2e5"),a=t("3cb2597e505d65fdf55d"),c=function(e){return e.leadManage||a.b},u=function(){return Object(r.a)(c,function(e){return e.all})},o=function(){return Object(r.a)(c,function(e){return e.one})},i=function(){return Object(r.a)(c,function(e){return e.query})},s=function(){return Object(r.a)(c,function(e){return e.loading})},d=function(){return Object(r.a)(c,function(e){return e.errors})},p=function(){return Object(r.a)(c,function(e){return e.agency})},f=function(){return Object(r.a)(c,function(e){return e.agents})},l=function(){return Object(r.a)(c,function(e){return e.open})},g=function(){return Object(r.a)(c,function(e){return e.agent_loading})}},e42c73132b0ab2bebbfe:function(e,n,t){"use strict";t.d(n,"u",function(){return r}),t.d(n,"v",function(){return a}),t.d(n,"t",function(){return c}),t.d(n,"x",function(){return u}),t.d(n,"y",function(){return o}),t.d(n,"w",function(){return i}),t.d(n,"b",function(){return s}),t.d(n,"c",function(){return d}),t.d(n,"a",function(){return p}),t.d(n,"l",function(){return f}),t.d(n,"m",function(){return l}),t.d(n,"k",function(){return g}),t.d(n,"z",function(){return b}),t.d(n,"i",function(){return y}),t.d(n,"B",function(){return O}),t.d(n,"j",function(){return j}),t.d(n,"h",function(){return A}),t.d(n,"g",function(){return E}),t.d(n,"r",function(){return L}),t.d(n,"s",function(){return m}),t.d(n,"q",function(){return _}),t.d(n,"o",function(){return k}),t.d(n,"p",function(){return S}),t.d(n,"n",function(){return w}),t.d(n,"e",function(){return x}),t.d(n,"f",function(){return R}),t.d(n,"d",function(){return v}),t.d(n,"A",function(){return h});var r="app/LeadManage/LOAD_ALL_REQUEST",a="app/LeadManage/LOAD_ALL_SUCCESS",c="app/LeadManage/LOAD_ALL_FAILURE",u="app/LeadManage/LOAD_ONE_REQUEST",o="app/LeadManage/LOAD_ONE_SUCCESS",i="app/LeadManage/LOAD_ONE_FAILURE",s="app/LeadManage/ADD_EDIT_REQUEST",d="app/LeadManage/ADD_EDIT_SUCCESS",p="app/LeadManage/ADD_EDIT_FAILURE",f="app/LeadManage/DELETE_ONE_REQUEST",l="app/LeadManage/DELETE_ONE_SUCCESS",g="app/LeadManage/DELETE_ONE_FAILURE",b="app/LeadManage/SET_ONE_VALUE",y="app/LeadManage/CLEAR_ONE",O="app/LeadManage/SET_QUERY_VALUE",j="app/LeadManage/CLEAR_QUERY",A="app/LeadManage/CLEAR_ERRORS",E=["Contact_Form","Facebook","Property_Inquiries","Via_Phone"],L="app/LeadManage/LOAD_AGENY_REQUEST",m="app/LeadManage/LOAD_AGENY_SUCCESS",_="app/LeadManage/LOAD_AGENY_FAILURE",k="app/LeadManage/LOAD_AGENT_BY_AGENCY_REQUEST",S="app/LeadManage/LOAD_AGENT_BY_AGENCY_SUCCESS",w="app/LeadManage/LOAD_AGENT_BY_AGENCY_FAILURE",x="app/LeadManage/ASSIGN_AGENT_REQUEST",R="app/LeadManage/ASSIGN_AGENT_SUCCESS",v="app/LeadManage/ASSIGN_AGENT_FAILURE",h="app/LeadManage/SET_OPEN"}}]);
>>>>>>> 41f64895ae2d4aeb7736fd90e084d7a063de2675:client/build/75.56d4f4511b00116f03c6.chunk.js