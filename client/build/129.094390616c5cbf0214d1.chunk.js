<<<<<<< HEAD:client/build/127.f1c9ce8d3ef0ca887e05.chunk.js
(window.webpackJsonp=window.webpackJsonp||[]).push([[127],{cfe8bc0d01da9cd2e2de:function(e,t,n){"use strict";var r={};n.r(r),n.d(r,"loadOneRequest",function(){return D}),n.d(r,"loadOneSuccess",function(){return x}),n.d(r,"loadOneFailure",function(){return A}),n.d(r,"logoutRequest",function(){return U}),n.d(r,"logoutSuccess",function(){return C}),n.d(r,"logoutFailure",function(){return T});var o=n("8af190b70a6bc55c6f1b"),a=n.n(o),c=(n("8a2d1b95e05b6a321e74"),n("0d7f0986bcd2f33d8a2a")),i=n("a28fc3c963a1d4d1a2e5"),u=n("ab4cb61bcb2dc161defb"),f=n("d7dd51e1bf6bfc2c9c3d"),s=n("da010f21fea25912dd9e"),l=n.n(s),p=n("4a683f0a5e64e66a8eb9"),d=n.n(p),b=n("2aea235afd5c55b8b19b"),g=n.n(b),y=n("adc20f99e57c573c589c"),O=n("d95b0cf107403b178365"),v=n("7edf83707012a871cdfb"),m="app/LoginLogs/LOAD_ONE_REQUEST",j="app/LoginLogs/LOGOUT_REQUEST",h="app/LoginLogs/LOGOUT_SUCCESS";function L(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter(function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable})),n.push.apply(n,r)}return n}function w(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?L(Object(n),!0).forEach(function(t){_(e,t,n[t])}):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):L(Object(n)).forEach(function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))})}return e}function _(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}var P={one:{data:[],page:1,size:10,totaldata:0},loading:!1},S=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:P,t=arguments.length>1?arguments[1]:void 0;return Object(v.a)(e,function(e){switch(t.type){case"app/LoginLogs/LOAD_ONE_SUCCESS":e.loading=!1,e.one=t.payload;break;case"app/LoginLogs/LOAD_ONE_FAILURE":e.loading=!1;break;case m:e.loading=!0;break;case h:e.one=w(w({},e.one),{},{data:e.one.data.map(function(e){return t.payload.data._id===e._id?t.payload.data:e})})}})},k=n("d782b72bc5b680c7122c"),R=n("6144be5eac76f277117a"),E=n("6542cd13fd5dd1bcffd4"),D=function(e){return{type:m,payload:e}},x=function(e){return{type:"app/LoginLogs/LOAD_ONE_SUCCESS",payload:e}},A=function(e){return{type:"app/LoginLogs/LOAD_ONE_FAILURE",payload:e}},U=function(e){return{type:j,payload:e}},C=function(e){return{type:h,payload:e}},T=function(e){return{type:"app/LoginLogs/LOGOUT_FAILURE",payload:e}},Y=n("a72b40110d9c31c9b5c5"),F=regeneratorRuntime.mark(B),I=regeneratorRuntime.mark(H),N=regeneratorRuntime.mark(M),q=regeneratorRuntime.mark(z);function B(e){var t,n;return regeneratorRuntime.wrap(function(r){for(;;)switch(r.prev=r.next){case 0:return r.next=2,Object(k.select)(Object(E.j)());case 2:return t=r.sent,n="",e.payload&&Object.keys(e.payload).map(function(t){return n="".concat(n,"&").concat(t,"=").concat(e.payload[t]),null}),r.next=7,Object(k.call)(R.a.get("user/loginlogs?".concat(n),x,A,t));case 7:case"end":return r.stop()}},F)}function H(e){var t;return regeneratorRuntime.wrap(function(n){for(;;)switch(n.prev=n.next){case 0:return n.next=2,Object(k.select)(Object(E.j)());case 2:return t=n.sent,n.next=5,Object(k.call)(R.a.post("user/loginlogs/logout",C,T,{loginID:e.payload},t));case 5:case"end":return n.stop()}},I)}function M(e){var t;return regeneratorRuntime.wrap(function(n){for(;;)switch(n.prev=n.next){case 0:return t={message:e.payload.msg||"logged out successfully",options:{variant:"success"}},n.next=3,Object(k.put)(Object(Y.enqueueSnackbar)(t));case 3:case"end":return n.stop()}},N)}function z(){return regeneratorRuntime.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,Object(k.takeLatest)(m,B);case 2:return e.next=4,Object(k.takeLatest)(j,H);case 4:return e.next=6,Object(k.takeLatest)(h,M);case 6:case"end":return e.stop()}},q)}var G,J=n("73bb0e359204f9566244"),Q=function(e){return e.loginLogsPage||P};n("5932430beb0c05240602"),n("611989be46d91ae8b71f");function $(e){return($="function"===typeof Symbol&&"symbol"===typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"===typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(e)}function K(e,t,n,r){G||(G="function"===typeof Symbol&&Symbol.for&&Symbol.for("react.element")||60103);var o=e&&e.defaultProps,a=arguments.length-3;if(t||0===a||(t={children:void 0}),1===a)t.children=r;else if(a>1){for(var c=new Array(a),i=0;i<a;i++)c[i]=arguments[i+3];t.children=c}if(t&&o)for(var u in o)void 0===t[u]&&(t[u]=o[u]);else t||(t=o||{});return{$$typeof:G,type:e,key:void 0===n?null:""+n,ref:null,props:t,_owner:null}}function V(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}function W(e,t){return(W=Object.setPrototypeOf||function(e,t){return e.__proto__=t,e})(e,t)}function X(e){var t=function(){if("undefined"===typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"===typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],function(){})),!0}catch(e){return!1}}();return function(){var n,r=ee(e);if(t){var o=ee(this).constructor;n=Reflect.construct(r,arguments,o)}else n=r.apply(this,arguments);return function(e,t){if(t&&("object"===$(t)||"function"===typeof t))return t;if(void 0!==t)throw new TypeError("Derived constructors may only return object or undefined");return Z(e)}(this,n)}}function Z(e){if(void 0===e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e}function ee(e){return(ee=Object.setPrototypeOf?Object.getPrototypeOf:function(e){return e.__proto__||Object.getPrototypeOf(e)})(e)}function te(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}var ne=K(n("2fad9e66eff5130ad191").a,{}),re=K(c.Helmet,{},void 0,K("title",{},void 0,"Login Logs")),oe=function(e){!function(e,t){if("function"!==typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function");e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,writable:!0,configurable:!0}}),t&&W(e,t)}(c,a.a.PureComponent);var t,n,r,o=X(c);function c(){var e;!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,c);for(var t=arguments.length,n=new Array(t),r=0;r<t;r++)n[r]=arguments[r];return te(Z(e=o.call.apply(o,[this].concat(n))),"handlePagination",function(t){e.props.loadOneRequest(t)}),te(Z(e),"handleLogout",function(t){e.props.logoutRequest(t)}),e}return t=c,(n=[{key:"componentDidMount",value:function(){this.props.loadOneRequest()}},{key:"render",value:function(){var e=this,t=this.props,n=(t.classes,t.loading),r=t.one,o=r.data,c=r.page,i=r.size,u=r.totaldata;console.log(o,"data");var f={page:c,size:i,totaldata:u},s=o.map(function(t){var n=t.login_date,r=t.logout_date,o=t.ip_address,a=t.device_info,c=t.browser_info,i=t._id,u=t.is_active;return[l()(n).format("YYYY-MM-DD HH:mm"),r?l()(r).format("YYYY-MM-DD HH:mm"):"",o||"",a||"",c||"",u?K(g.a,{color:"primary",onClick:function(){return e.handleLogout(i)}},void 0,"LogOut"):""]});return K(a.a.Fragment,{},void 0,n&&1==n?ne:a.a.createElement(a.a.Fragment,null),re,K("div",{className:"responsiveBlock"},void 0,K("div",{className:"table-border"},void 0,K(J.a,{tableHead:["Login Date","Logout Date","IP Address","Device Info","Browser Info","Action"],tableData:s,pagination:f,handlePagination:this.handlePagination,loading:n}))))}}])&&V(t.prototype,n),r&&V(t,r),c}(),ae=Object(O.a)({key:"loginLogsPage",reducer:S}),ce=Object(y.a)({key:"loginLogsPage",saga:z}),ie=Object(i.b)({one:Object(i.a)(Q,function(e){return e.one}),loading:Object(i.a)(Q,function(e){return e.loading})}),ue=Object(f.connect)(ie,r),fe=d()(function(e){return{paper:te({marginBottom:3*e.spacing.unit,padding:2*e.spacing.unit},e.breakpoints.up(600+3*e.spacing.unit*2),{marginBottom:6*e.spacing.unit,padding:3*e.spacing.unit})}});t.a=Object(u.compose)(ae,ce,ue,fe)(oe)}}]);
=======
(window.webpackJsonp=window.webpackJsonp||[]).push([[129],{cfe8bc0d01da9cd2e2de:function(e,t,n){"use strict";var r={};n.r(r),n.d(r,"loadOneRequest",function(){return D}),n.d(r,"loadOneSuccess",function(){return x}),n.d(r,"loadOneFailure",function(){return A}),n.d(r,"logoutRequest",function(){return U}),n.d(r,"logoutSuccess",function(){return C}),n.d(r,"logoutFailure",function(){return T});var o=n("8af190b70a6bc55c6f1b"),a=n.n(o),c=(n("8a2d1b95e05b6a321e74"),n("0d7f0986bcd2f33d8a2a")),i=n("a28fc3c963a1d4d1a2e5"),u=n("ab4cb61bcb2dc161defb"),f=n("d7dd51e1bf6bfc2c9c3d"),s=n("da010f21fea25912dd9e"),l=n.n(s),p=n("4a683f0a5e64e66a8eb9"),d=n.n(p),b=n("2aea235afd5c55b8b19b"),g=n.n(b),y=n("adc20f99e57c573c589c"),O=n("d95b0cf107403b178365"),v=n("7edf83707012a871cdfb"),m="app/LoginLogs/LOAD_ONE_REQUEST",j="app/LoginLogs/LOGOUT_REQUEST",h="app/LoginLogs/LOGOUT_SUCCESS";function L(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter(function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable})),n.push.apply(n,r)}return n}function w(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?L(Object(n),!0).forEach(function(t){_(e,t,n[t])}):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):L(Object(n)).forEach(function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))})}return e}function _(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}var P={one:{data:[],page:1,size:10,totaldata:0},loading:!1},S=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:P,t=arguments.length>1?arguments[1]:void 0;return Object(v.a)(e,function(e){switch(t.type){case"app/LoginLogs/LOAD_ONE_SUCCESS":e.loading=!1,e.one=t.payload;break;case"app/LoginLogs/LOAD_ONE_FAILURE":e.loading=!1;break;case m:e.loading=!0;break;case h:e.one=w(w({},e.one),{},{data:e.one.data.map(function(e){return t.payload.data._id===e._id?t.payload.data:e})})}})},k=n("d782b72bc5b680c7122c"),R=n("6144be5eac76f277117a"),E=n("6542cd13fd5dd1bcffd4"),D=function(e){return{type:m,payload:e}},x=function(e){return{type:"app/LoginLogs/LOAD_ONE_SUCCESS",payload:e}},A=function(e){return{type:"app/LoginLogs/LOAD_ONE_FAILURE",payload:e}},U=function(e){return{type:j,payload:e}},C=function(e){return{type:h,payload:e}},T=function(e){return{type:"app/LoginLogs/LOGOUT_FAILURE",payload:e}},Y=n("a72b40110d9c31c9b5c5"),F=regeneratorRuntime.mark(B),I=regeneratorRuntime.mark(H),N=regeneratorRuntime.mark(M),q=regeneratorRuntime.mark(z);function B(e){var t,n;return regeneratorRuntime.wrap(function(r){for(;;)switch(r.prev=r.next){case 0:return r.next=2,Object(k.select)(Object(E.j)());case 2:return t=r.sent,n="",e.payload&&Object.keys(e.payload).map(function(t){return n="".concat(n,"&").concat(t,"=").concat(e.payload[t]),null}),r.next=7,Object(k.call)(R.a.get("user/loginlogs?".concat(n),x,A,t));case 7:case"end":return r.stop()}},F)}function H(e){var t;return regeneratorRuntime.wrap(function(n){for(;;)switch(n.prev=n.next){case 0:return n.next=2,Object(k.select)(Object(E.j)());case 2:return t=n.sent,n.next=5,Object(k.call)(R.a.post("user/loginlogs/logout",C,T,{loginID:e.payload},t));case 5:case"end":return n.stop()}},I)}function M(e){var t;return regeneratorRuntime.wrap(function(n){for(;;)switch(n.prev=n.next){case 0:return t={message:e.payload.msg||"logged out successfully",options:{variant:"success"}},n.next=3,Object(k.put)(Object(Y.enqueueSnackbar)(t));case 3:case"end":return n.stop()}},N)}function z(){return regeneratorRuntime.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,Object(k.takeLatest)(m,B);case 2:return e.next=4,Object(k.takeLatest)(j,H);case 4:return e.next=6,Object(k.takeLatest)(h,M);case 6:case"end":return e.stop()}},q)}var G,J=n("73bb0e359204f9566244"),Q=function(e){return e.loginLogsPage||P};n("5932430beb0c05240602"),n("611989be46d91ae8b71f");function $(e){return($="function"===typeof Symbol&&"symbol"===typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"===typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(e)}function K(e,t,n,r){G||(G="function"===typeof Symbol&&Symbol.for&&Symbol.for("react.element")||60103);var o=e&&e.defaultProps,a=arguments.length-3;if(t||0===a||(t={children:void 0}),1===a)t.children=r;else if(a>1){for(var c=new Array(a),i=0;i<a;i++)c[i]=arguments[i+3];t.children=c}if(t&&o)for(var u in o)void 0===t[u]&&(t[u]=o[u]);else t||(t=o||{});return{$$typeof:G,type:e,key:void 0===n?null:""+n,ref:null,props:t,_owner:null}}function V(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}function W(e,t){return(W=Object.setPrototypeOf||function(e,t){return e.__proto__=t,e})(e,t)}function X(e){var t=function(){if("undefined"===typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"===typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],function(){})),!0}catch(e){return!1}}();return function(){var n,r=ee(e);if(t){var o=ee(this).constructor;n=Reflect.construct(r,arguments,o)}else n=r.apply(this,arguments);return function(e,t){if(t&&("object"===$(t)||"function"===typeof t))return t;if(void 0!==t)throw new TypeError("Derived constructors may only return object or undefined");return Z(e)}(this,n)}}function Z(e){if(void 0===e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e}function ee(e){return(ee=Object.setPrototypeOf?Object.getPrototypeOf:function(e){return e.__proto__||Object.getPrototypeOf(e)})(e)}function te(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}var ne=K(n("2fad9e66eff5130ad191").a,{}),re=K(c.Helmet,{},void 0,K("title",{},void 0,"Login Logs")),oe=function(e){!function(e,t){if("function"!==typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function");e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,writable:!0,configurable:!0}}),t&&W(e,t)}(c,a.a.PureComponent);var t,n,r,o=X(c);function c(){var e;!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,c);for(var t=arguments.length,n=new Array(t),r=0;r<t;r++)n[r]=arguments[r];return te(Z(e=o.call.apply(o,[this].concat(n))),"handlePagination",function(t){e.props.loadOneRequest(t)}),te(Z(e),"handleLogout",function(t){e.props.logoutRequest(t)}),e}return t=c,(n=[{key:"componentDidMount",value:function(){this.props.loadOneRequest()}},{key:"render",value:function(){var e=this,t=this.props,n=(t.classes,t.loading),r=t.one,o=r.data,c=r.page,i=r.size,u=r.totaldata;console.log(o,"data");var f={page:c,size:i,totaldata:u},s=o.map(function(t){var n=t.login_date,r=t.logout_date,o=t.ip_address,a=t.device_info,c=t.browser_info,i=t._id,u=t.is_active;return[l()(n).format("YYYY-MM-DD HH:mm"),r?l()(r).format("YYYY-MM-DD HH:mm"):"",o||"",a||"",c||"",u?K(g.a,{color:"primary",onClick:function(){return e.handleLogout(i)}},void 0,"LogOut"):""]});return K(a.a.Fragment,{},void 0,n&&1==n?ne:a.a.createElement(a.a.Fragment,null),re,K("div",{className:"responsiveBlock"},void 0,K("div",{className:"table-border"},void 0,K(J.a,{tableHead:["Login Date","Logout Date","IP Address","Device Info","Browser Info","Action"],tableData:s,pagination:f,handlePagination:this.handlePagination,loading:n}))))}}])&&V(t.prototype,n),r&&V(t,r),c}(),ae=Object(O.a)({key:"loginLogsPage",reducer:S}),ce=Object(y.a)({key:"loginLogsPage",saga:z}),ie=Object(i.b)({one:Object(i.a)(Q,function(e){return e.one}),loading:Object(i.a)(Q,function(e){return e.loading})}),ue=Object(f.connect)(ie,r),fe=d()(function(e){return{paper:te({marginBottom:3*e.spacing.unit,padding:2*e.spacing.unit},e.breakpoints.up(600+3*e.spacing.unit*2),{marginBottom:6*e.spacing.unit,padding:3*e.spacing.unit})}});t.a=Object(u.compose)(ae,ce,ue,fe)(oe)}}]);
>>>>>>> 41f64895ae2d4aeb7736fd90e084d7a063de2675:client/build/129.094390616c5cbf0214d1.chunk.js
