<<<<<<< HEAD:client/build/150.bc2c72277436d0ce57f1.chunk.js
(window.webpackJsonp=window.webpackJsonp||[]).push([[150],{"2bf52a024441a8f2b2b3":function(e,r,t){"use strict";t.r(r);var n={};t.r(n),t.d(n,"setStoreValue",function(){return S}),t.d(n,"clearStore",function(){return A}),t.d(n,"loginRequest",function(){return E}),t.d(n,"loginSuccess",function(){return P}),t.d(n,"loginFailure",function(){return N}),t.d(n,"defaultAction",function(){return L});var a=t("8af190b70a6bc55c6f1b"),o=(t("8a2d1b95e05b6a321e74"),t("e95a63b25fb92ed15721")),c=t("d7dd51e1bf6bfc2c9c3d"),i=t("ab4cb61bcb2dc161defb"),u=t("a28fc3c963a1d4d1a2e5"),s=t("4a683f0a5e64e66a8eb9"),l=t.n(s),d=t("adc20f99e57c573c589c"),f=t("d95b0cf107403b178365"),b=t("7edf83707012a871cdfb"),p="app/LoginAdminPage/DEFAULT_ACTION",m="app/LoginAdminPage/LOGIN_REQUEST",v="app/LoginAdminPage/LOGIN_SUCCESS",g="app/LoginAdminPage/LOGIN_FAILURE";function y(e,r){var t=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);r&&(n=n.filter(function(r){return Object.getOwnPropertyDescriptor(e,r).enumerable})),t.push.apply(t,n)}return t}function O(e,r,t){return r in e?Object.defineProperty(e,r,{value:t,enumerable:!0,configurable:!0,writable:!0}):e[r]=t,e}var w={email:"",password:"",errors:{},loading:!1},j=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:w,r=arguments.length>1?arguments[1]:void 0;return Object(b.a)(e,function(e){switch(r.type){case"app/LoginAdminPage/SET_STORE_VALUE":e[r.payload.key]=r.payload.value;break;case m:e.loading=!0;break;case v:e.loading=!1;break;case g:e.loading=!1,e.errors=function(e){for(var r=1;r<arguments.length;r++){var t=null!=arguments[r]?arguments[r]:{};r%2?y(Object(t),!0).forEach(function(r){O(e,r,t[r])}):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(t)):y(Object(t)).forEach(function(r){Object.defineProperty(e,r,Object.getOwnPropertyDescriptor(t,r))})}return e}({},r.payload.errors);break;case"app/LoginAdminPage/CLEAR_STORE":e=w}})},h=t("d782b72bc5b680c7122c"),k=t("6144be5eac76f277117a"),x=t("3aced5b508e7389026da"),S=function(e){return{type:"app/LoginAdminPage/SET_STORE_VALUE",payload:e}},A=function(e){return{type:"app/LoginAdminPage/CLEAR_STORE",payload:e}},E=function(e){return{type:m,payload:e}},P=function(e){return{type:v,payload:e}},N=function(e){return{type:g,payload:e}};function L(){return{type:p}}var R,_=function(e){return e.loginAdminPage||w},T=function(){return Object(u.a)(_,function(e){return e.email})},C=function(){return Object(u.a)(_,function(e){return e.password})},I=function(){return Object(u.a)(_,function(e){return e.errors})},U=function(){return Object(u.a)(I(),function(e){return e.email})},V=function(){return Object(u.a)(I(),function(e){return e.password})},$=t("a72b40110d9c31c9b5c5"),q=regeneratorRuntime.mark(J),D=regeneratorRuntime.mark(M),F=regeneratorRuntime.mark(Q),G=regeneratorRuntime.mark(Y),B=regeneratorRuntime.mark(z),H=function(e){var r={};return e.email||(r.email="email is required"),e.password||(r.password="password is required"),{errors:r,isValid:!Object.keys(r).length}};function J(e){var r,t,n,a;return regeneratorRuntime.wrap(function(o){for(;;)switch(o.prev=o.next){case 0:return o.next=2,Object(h.take)(v);case 2:return r=o.sent,t=r.payload,n=t.token,a=t.data,o.next=7,Object(h.put)(Object($.setUser)(a));case 7:return o.next=9,Object(h.put)(Object($.setToken)(n));case 9:if(!e){o.next=14;break}return o.next=12,Object(h.put)(Object(x.push)(e));case 12:o.next=16;break;case 14:return o.next=16,Object(h.put)(Object(x.push)("/admin/dashboard"));case 16:case"end":return o.stop()}},q)}function M(e){var r,t,n,a,o;return regeneratorRuntime.wrap(function(c){for(;;)switch(c.prev=c.next){case 0:return c.next=2,Object(h.select)(T());case 2:return r=c.sent,c.next=5,Object(h.select)(C());case 5:if(t=c.sent,!(a=H(n={email:r,password:t})).isValid){c.next=20;break}return c.next=11,Object(h.fork)(J,e.redirect);case 11:return o=c.sent,c.next=14,Object(h.fork)(k.a.post("user/login",P,N,n));case 14:return c.next=16,Object(h.take)([x.LOCATION_CHANGE,g]);case 16:return c.next=18,Object(h.cancel)(o);case 18:c.next=24;break;case 20:return c.next=22,Object(h.put)(S({key:"errors",value:a.errors}));case 22:return c.next=24,Object(h.put)(S({key:null,value:!1}));case 24:case"end":return c.stop()}},D)}function Q(e){var r;return regeneratorRuntime.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return r={message:e.payload.msg||"Error while login!!",options:{variant:"warning"}},t.next=3,Object(h.put)(Object($.enqueueSnackbar)(r));case 3:case"end":return t.stop()}},F)}function Y(e){var r;return regeneratorRuntime.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return r={message:e.payload.msg||"login success!!",options:{variant:"success"}},t.next=3,Object(h.put)(Object($.enqueueSnackbar)(r));case 3:case"end":return t.stop()}},G)}function z(){return regeneratorRuntime.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,Object(h.takeLatest)(m,M);case 2:return e.next=4,Object(h.takeLatest)(g,Q);case 4:return e.next=6,Object(h.takeLatest)(v,Y);case 6:case"end":return e.stop()}},B)}function K(e,r,t,n){R||(R="function"===typeof Symbol&&Symbol.for&&Symbol.for("react.element")||60103);var a=e&&e.defaultProps,o=arguments.length-3;if(r||0===o||(r={children:void 0}),1===o)r.children=n;else if(o>1){for(var c=new Array(o),i=0;i<o;i++)c[i]=arguments[i+3];r.children=c}if(r&&a)for(var u in a)void 0===r[u]&&(r[u]=a[u]);else r||(r=a||{});return{$$typeof:R,type:e,key:void 0===t?null:""+t,ref:null,props:r,_owner:null}}var W,X=Object(u.b)({email:T(),error:U()}),Z=Object(c.connect)(X,n)(function(e){var r=e.email,t=e.setStoreValue,n=e.error,a=Boolean(n);return K("div",{className:"mb-4"},void 0,K("label",{className:"block uppercase tracking-wide text-gray-800 text-xs mb-2",htmlFor:"username"},void 0,n||"Email"),K("input",{error:a.toString(),onChange:function(e){return t({key:"email",value:e.target.value})},value:r,className:"inputbox",id:"username",type:"text",placeholder:"Username"}))}),ee=t("6938d226fd372a75cbf9"),re=t("9f100a413d2aaf9e0ca5"),te=t.n(re),ne=t("fe0b34a58afc62cf66c2"),ae=t.n(ne);function oe(e,r,t,n){W||(W="function"===typeof Symbol&&Symbol.for&&Symbol.for("react.element")||60103);var a=e&&e.defaultProps,o=arguments.length-3;if(r||0===o||(r={children:void 0}),1===o)r.children=n;else if(o>1){for(var c=new Array(o),i=0;i<o;i++)c[i]=arguments[i+3];r.children=c}if(r&&a)for(var u in a)void 0===r[u]&&(r[u]=a[u]);else r||(r=a||{});return{$$typeof:W,type:e,key:void 0===t?null:""+t,ref:null,props:r,_owner:null}}function ce(e,r){return function(e){if(Array.isArray(e))return e}(e)||function(e,r){var t=null==e?null:"undefined"!==typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(null==t)return;var n,a,o=[],c=!0,i=!1;try{for(t=t.call(e);!(c=(n=t.next()).done)&&(o.push(n.value),!r||o.length!==r);c=!0);}catch(e){i=!0,a=e}finally{try{c||null==t.return||t.return()}finally{if(i)throw a}}return o}(e,r)||function(e,r){if(!e)return;if("string"===typeof e)return ie(e,r);var t=Object.prototype.toString.call(e).slice(8,-1);"Object"===t&&e.constructor&&(t=e.constructor.name);if("Map"===t||"Set"===t)return Array.from(e);if("Arguments"===t||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t))return ie(e,r)}(e,r)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function ie(e,r){(null==r||r>e.length)&&(r=e.length);for(var t=0,n=new Array(r);t<r;t++)n[t]=e[t];return n}var ue,se=oe("div",{className:"flex justify-between"},void 0,oe("label",{className:"label",htmlFor:"Password"},void 0,"Password")),le=oe(te.a,{}),de=oe(ae.a,{}),fe=Object(u.b)({password:C(),error:V()}),be=Object(c.connect)(fe,n),pe=Object(ee.withStyles)(function(e){return{EyeIcon:{position:"absolute",right:12,top:6}}}),me=Object(i.compose)(be,pe)(function(e){var r=e.password,t=e.setStoreValue,n=e.error,o=e.classes,c=ce(Object(a.useState)(),2),i=c[0],u=c[1],s=Boolean(n);return oe("div",{className:"mb-4"},void 0,se,oe("div",{className:"relative"},void 0,oe("input",{error:s.toString(),onChange:function(e){return t({key:"password",value:e.target.value})},value:r,id:"Password",type:i?"text":"password",placeholder:"Enter Password",className:"inputbox"}),oe("span",{className:o.EyeIcon,"aria-label":"Toggle password visibility",onClick:function(){u(function(e){return!e})}},void 0,i?le:de)))}),ve=t("b64d871fc84f55650602"),ge=t.n(ve),ye=t("ddb017f3fc24cea50add"),Oe=t.n(ye);t("68300606aef34b823d7f");function we(e,r,t,n){ue||(ue="function"===typeof Symbol&&Symbol.for&&Symbol.for("react.element")||60103);var a=e&&e.defaultProps,o=arguments.length-3;if(r||0===o||(r={children:void 0}),1===o)r.children=n;else if(o>1){for(var c=new Array(o),i=0;i<o;i++)c[i]=arguments[i+3];r.children=c}if(r&&a)for(var u in a)void 0===r[u]&&(r[u]=a[u]);else r||(r=a||{});return{$$typeof:ue,type:e,key:void 0===t?null:""+t,ref:null,props:r,_owner:null}}var je=we("div",{className:"hidden md:block md:w-3/5 bg-blue"},void 0,we("img",{className:"w-full h-full object-cover",src:Oe.a,alt:""})),he=we(o.Link,{to:"/"},void 0,we("img",{src:ge.a,alt:"NepalHomes",className:"w-2/3"})),ke=we(Z,{}),xe=we(me,{}),Se=we("div",{className:"btn_loading"},void 0,we("div",{}),we("div",{}),we("div",{}),we("div",{}),we("span",{className:"ml-2"},void 0,"Login")),Ae=Object(u.b)({loading:Object(u.a)(_,function(e){return e.loading}),emailError:U(),passwordError:V()}),Ee=Object(c.connect)(Ae,n),Pe=Object(f.a)({key:"loginAdminPage",reducer:j}),Ne=Object(d.a)({key:"loginAdminPage",saga:z}),Le=l()({});r.default=Object(i.compose)(Le,Pe,Ne,Ee)(function(e){e.classes;var r=e.loginRequest,t=e.loading;e.emailError,e.passwordError;return we("div",{className:"flex h-screen"},void 0,je,we("div",{className:"w-full md:w-2/5 relative block"},void 0,we("div",{className:"absolute top-1/2 px-10 md:px-12 lg:px-16 xl:px-24 w-full",style:{transform:"translateY(-50%)"}},void 0,he,we("form",{className:"mt-4",onSubmit:function(e){e.preventDefault(),r()}},void 0,ke,xe,we("button",{className:"btn mt-4 w-full bg-primary hover:bg-secondary",type:"submit"},void 0,t?Se:"Login")))))})},ddb017f3fc24cea50add:function(e,r,t){e.exports=t.p+"c285ada191077223b88d737c34687b83.jpg"}}]);
=======
(window.webpackJsonp=window.webpackJsonp||[]).push([[153],{"2bf52a024441a8f2b2b3":function(e,r,t){"use strict";t.r(r);var n={};t.r(n),t.d(n,"setStoreValue",function(){return S}),t.d(n,"clearStore",function(){return A}),t.d(n,"loginRequest",function(){return E}),t.d(n,"loginSuccess",function(){return P}),t.d(n,"loginFailure",function(){return N}),t.d(n,"defaultAction",function(){return L});var a=t("8af190b70a6bc55c6f1b"),o=(t("8a2d1b95e05b6a321e74"),t("e95a63b25fb92ed15721")),c=t("d7dd51e1bf6bfc2c9c3d"),i=t("ab4cb61bcb2dc161defb"),u=t("a28fc3c963a1d4d1a2e5"),s=t("4a683f0a5e64e66a8eb9"),l=t.n(s),d=t("adc20f99e57c573c589c"),f=t("d95b0cf107403b178365"),b=t("7edf83707012a871cdfb"),p="app/LoginAdminPage/DEFAULT_ACTION",m="app/LoginAdminPage/LOGIN_REQUEST",v="app/LoginAdminPage/LOGIN_SUCCESS",g="app/LoginAdminPage/LOGIN_FAILURE";function y(e,r){var t=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);r&&(n=n.filter(function(r){return Object.getOwnPropertyDescriptor(e,r).enumerable})),t.push.apply(t,n)}return t}function O(e,r,t){return r in e?Object.defineProperty(e,r,{value:t,enumerable:!0,configurable:!0,writable:!0}):e[r]=t,e}var w={email:"",password:"",errors:{},loading:!1},j=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:w,r=arguments.length>1?arguments[1]:void 0;return Object(b.a)(e,function(e){switch(r.type){case"app/LoginAdminPage/SET_STORE_VALUE":e[r.payload.key]=r.payload.value;break;case m:e.loading=!0;break;case v:e.loading=!1;break;case g:e.loading=!1,e.errors=function(e){for(var r=1;r<arguments.length;r++){var t=null!=arguments[r]?arguments[r]:{};r%2?y(Object(t),!0).forEach(function(r){O(e,r,t[r])}):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(t)):y(Object(t)).forEach(function(r){Object.defineProperty(e,r,Object.getOwnPropertyDescriptor(t,r))})}return e}({},r.payload.errors);break;case"app/LoginAdminPage/CLEAR_STORE":e=w}})},h=t("d782b72bc5b680c7122c"),k=t("6144be5eac76f277117a"),x=t("3aced5b508e7389026da"),S=function(e){return{type:"app/LoginAdminPage/SET_STORE_VALUE",payload:e}},A=function(e){return{type:"app/LoginAdminPage/CLEAR_STORE",payload:e}},E=function(e){return{type:m,payload:e}},P=function(e){return{type:v,payload:e}},N=function(e){return{type:g,payload:e}};function L(){return{type:p}}var R,_=function(e){return e.loginAdminPage||w},T=function(){return Object(u.a)(_,function(e){return e.email})},C=function(){return Object(u.a)(_,function(e){return e.password})},I=function(){return Object(u.a)(_,function(e){return e.errors})},U=function(){return Object(u.a)(I(),function(e){return e.email})},V=function(){return Object(u.a)(I(),function(e){return e.password})},$=t("a72b40110d9c31c9b5c5"),q=regeneratorRuntime.mark(J),D=regeneratorRuntime.mark(M),F=regeneratorRuntime.mark(Q),G=regeneratorRuntime.mark(Y),B=regeneratorRuntime.mark(z),H=function(e){var r={};return e.email||(r.email="email is required"),e.password||(r.password="password is required"),{errors:r,isValid:!Object.keys(r).length}};function J(e){var r,t,n,a;return regeneratorRuntime.wrap(function(o){for(;;)switch(o.prev=o.next){case 0:return o.next=2,Object(h.take)(v);case 2:return r=o.sent,t=r.payload,n=t.token,a=t.data,o.next=7,Object(h.put)(Object($.setUser)(a));case 7:return o.next=9,Object(h.put)(Object($.setToken)(n));case 9:if(!e){o.next=14;break}return o.next=12,Object(h.put)(Object(x.push)(e));case 12:o.next=16;break;case 14:return o.next=16,Object(h.put)(Object(x.push)("/admin/dashboard"));case 16:case"end":return o.stop()}},q)}function M(e){var r,t,n,a,o;return regeneratorRuntime.wrap(function(c){for(;;)switch(c.prev=c.next){case 0:return c.next=2,Object(h.select)(T());case 2:return r=c.sent,c.next=5,Object(h.select)(C());case 5:if(t=c.sent,!(a=H(n={email:r,password:t})).isValid){c.next=20;break}return c.next=11,Object(h.fork)(J,e.redirect);case 11:return o=c.sent,c.next=14,Object(h.fork)(k.a.post("user/login",P,N,n));case 14:return c.next=16,Object(h.take)([x.LOCATION_CHANGE,g]);case 16:return c.next=18,Object(h.cancel)(o);case 18:c.next=24;break;case 20:return c.next=22,Object(h.put)(S({key:"errors",value:a.errors}));case 22:return c.next=24,Object(h.put)(S({key:null,value:!1}));case 24:case"end":return c.stop()}},D)}function Q(e){var r;return regeneratorRuntime.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return r={message:e.payload.msg||"Error while login!!",options:{variant:"warning"}},t.next=3,Object(h.put)(Object($.enqueueSnackbar)(r));case 3:case"end":return t.stop()}},F)}function Y(e){var r;return regeneratorRuntime.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return r={message:e.payload.msg||"login success!!",options:{variant:"success"}},t.next=3,Object(h.put)(Object($.enqueueSnackbar)(r));case 3:case"end":return t.stop()}},G)}function z(){return regeneratorRuntime.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,Object(h.takeLatest)(m,M);case 2:return e.next=4,Object(h.takeLatest)(g,Q);case 4:return e.next=6,Object(h.takeLatest)(v,Y);case 6:case"end":return e.stop()}},B)}function K(e,r,t,n){R||(R="function"===typeof Symbol&&Symbol.for&&Symbol.for("react.element")||60103);var a=e&&e.defaultProps,o=arguments.length-3;if(r||0===o||(r={children:void 0}),1===o)r.children=n;else if(o>1){for(var c=new Array(o),i=0;i<o;i++)c[i]=arguments[i+3];r.children=c}if(r&&a)for(var u in a)void 0===r[u]&&(r[u]=a[u]);else r||(r=a||{});return{$$typeof:R,type:e,key:void 0===t?null:""+t,ref:null,props:r,_owner:null}}var W,X=Object(u.b)({email:T(),error:U()}),Z=Object(c.connect)(X,n)(function(e){var r=e.email,t=e.setStoreValue,n=e.error,a=Boolean(n);return K("div",{className:"mb-4"},void 0,K("label",{className:"block uppercase tracking-wide text-gray-800 text-xs mb-2",htmlFor:"username"},void 0,n||"Email"),K("input",{error:a.toString(),onChange:function(e){return t({key:"email",value:e.target.value})},value:r,className:"inputbox",id:"username",type:"text",placeholder:"Username"}))}),ee=t("6938d226fd372a75cbf9"),re=t("9f100a413d2aaf9e0ca5"),te=t.n(re),ne=t("fe0b34a58afc62cf66c2"),ae=t.n(ne);function oe(e,r,t,n){W||(W="function"===typeof Symbol&&Symbol.for&&Symbol.for("react.element")||60103);var a=e&&e.defaultProps,o=arguments.length-3;if(r||0===o||(r={children:void 0}),1===o)r.children=n;else if(o>1){for(var c=new Array(o),i=0;i<o;i++)c[i]=arguments[i+3];r.children=c}if(r&&a)for(var u in a)void 0===r[u]&&(r[u]=a[u]);else r||(r=a||{});return{$$typeof:W,type:e,key:void 0===t?null:""+t,ref:null,props:r,_owner:null}}function ce(e,r){return function(e){if(Array.isArray(e))return e}(e)||function(e,r){var t=null==e?null:"undefined"!==typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(null==t)return;var n,a,o=[],c=!0,i=!1;try{for(t=t.call(e);!(c=(n=t.next()).done)&&(o.push(n.value),!r||o.length!==r);c=!0);}catch(e){i=!0,a=e}finally{try{c||null==t.return||t.return()}finally{if(i)throw a}}return o}(e,r)||function(e,r){if(!e)return;if("string"===typeof e)return ie(e,r);var t=Object.prototype.toString.call(e).slice(8,-1);"Object"===t&&e.constructor&&(t=e.constructor.name);if("Map"===t||"Set"===t)return Array.from(e);if("Arguments"===t||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t))return ie(e,r)}(e,r)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function ie(e,r){(null==r||r>e.length)&&(r=e.length);for(var t=0,n=new Array(r);t<r;t++)n[t]=e[t];return n}var ue,se=oe("div",{className:"flex justify-between"},void 0,oe("label",{className:"label",htmlFor:"Password"},void 0,"Password")),le=oe(te.a,{}),de=oe(ae.a,{}),fe=Object(u.b)({password:C(),error:V()}),be=Object(c.connect)(fe,n),pe=Object(ee.withStyles)(function(e){return{EyeIcon:{position:"absolute",right:12,top:6}}}),me=Object(i.compose)(be,pe)(function(e){var r=e.password,t=e.setStoreValue,n=e.error,o=e.classes,c=ce(Object(a.useState)(),2),i=c[0],u=c[1],s=Boolean(n);return oe("div",{className:"mb-4"},void 0,se,oe("div",{className:"relative"},void 0,oe("input",{error:s.toString(),onChange:function(e){return t({key:"password",value:e.target.value})},value:r,id:"Password",type:i?"text":"password",placeholder:"Enter Password",className:"inputbox"}),oe("span",{className:o.EyeIcon,"aria-label":"Toggle password visibility",onClick:function(){u(function(e){return!e})}},void 0,i?le:de)))}),ve=t("b64d871fc84f55650602"),ge=t.n(ve),ye=t("ddb017f3fc24cea50add"),Oe=t.n(ye);t("68300606aef34b823d7f");function we(e,r,t,n){ue||(ue="function"===typeof Symbol&&Symbol.for&&Symbol.for("react.element")||60103);var a=e&&e.defaultProps,o=arguments.length-3;if(r||0===o||(r={children:void 0}),1===o)r.children=n;else if(o>1){for(var c=new Array(o),i=0;i<o;i++)c[i]=arguments[i+3];r.children=c}if(r&&a)for(var u in a)void 0===r[u]&&(r[u]=a[u]);else r||(r=a||{});return{$$typeof:ue,type:e,key:void 0===t?null:""+t,ref:null,props:r,_owner:null}}var je=we("div",{className:"hidden md:block md:w-3/5 bg-blue"},void 0,we("img",{className:"w-full h-full object-cover",src:Oe.a,alt:""})),he=we(o.Link,{to:"/"},void 0,we("img",{src:ge.a,alt:"NepalHomes",className:"w-2/3"})),ke=we(Z,{}),xe=we(me,{}),Se=we("div",{className:"btn_loading"},void 0,we("div",{}),we("div",{}),we("div",{}),we("div",{}),we("span",{className:"ml-2"},void 0,"Login")),Ae=Object(u.b)({loading:Object(u.a)(_,function(e){return e.loading}),emailError:U(),passwordError:V()}),Ee=Object(c.connect)(Ae,n),Pe=Object(f.a)({key:"loginAdminPage",reducer:j}),Ne=Object(d.a)({key:"loginAdminPage",saga:z}),Le=l()({});r.default=Object(i.compose)(Le,Pe,Ne,Ee)(function(e){e.classes;var r=e.loginRequest,t=e.loading;e.emailError,e.passwordError;return we("div",{className:"flex h-screen"},void 0,je,we("div",{className:"w-full md:w-2/5 relative block"},void 0,we("div",{className:"absolute top-1/2 px-10 md:px-12 lg:px-16 xl:px-24 w-full",style:{transform:"translateY(-50%)"}},void 0,he,we("form",{className:"mt-4",onSubmit:function(e){e.preventDefault(),r()}},void 0,ke,xe,we("button",{className:"btn mt-4 w-full bg-primary hover:bg-secondary",type:"submit"},void 0,t?Se:"Login")))))})},ddb017f3fc24cea50add:function(e,r,t){e.exports=t.p+"c285ada191077223b88d737c34687b83.jpg"}}]);
>>>>>>> 41f64895ae2d4aeb7736fd90e084d7a063de2675:client/build/153.b1665912748dc61b1f00.chunk.js