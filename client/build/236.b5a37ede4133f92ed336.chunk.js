<<<<<<< HEAD:client/build/236.b5a37ede4133f92ed336.chunk.js
(window.webpackJsonp=window.webpackJsonp||[]).push([[236],{"427b10d94403148db3a3":function(e,t,n){"use strict";n.r(t);var r,o=n("8af190b70a6bc55c6f1b"),a=n.n(o),c=(n("8a2d1b95e05b6a321e74"),n("a28fc3c963a1d4d1a2e5")),i=n("ab4cb61bcb2dc161defb"),l=n("d7dd51e1bf6bfc2c9c3d"),f=n("3aced5b508e7389026da"),u=n("da010f21fea25912dd9e"),d=n.n(u),s=n("6d0b3088082c0f598087"),b=n.n(s),p=(n("f85e09def79cc2a20bc2"),n("4a683f0a5e64e66a8eb9")),m=n.n(p),y=n("c502bee2fd4be3dd7f62"),v=n.n(y),h=n("16c7abd7abc407b9f247"),w=n.n(h),O=n("5c0a236ca4c0b26f32cd"),g=n.n(O),j=n("ce1e49cdf0acd22acb13"),_=n.n(j),N=(n("adc20f99e57c573c589c"),n("d95b0cf107403b178365"),n("6d130973d356eac3aaa4"),n("53c474548e94ea6a099d"),n("7bb47e11abc2239bb257")),P=n("ccdaaa26e7cd49df9e0f"),S=n("fcb99a06256635f70435");function x(e){return(x="function"===typeof Symbol&&"symbol"===typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"===typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(e)}function k(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter(function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable})),n.push.apply(n,r)}return n}function C(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?k(Object(n),!0).forEach(function(t){T(e,t,n[t])}):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):k(Object(n)).forEach(function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))})}return e}function E(e,t,n,o){r||(r="function"===typeof Symbol&&Symbol.for&&Symbol.for("react.element")||60103);var a=e&&e.defaultProps,c=arguments.length-3;if(t||0===c||(t={children:void 0}),1===c)t.children=o;else if(c>1){for(var i=new Array(c),l=0;l<c;l++)i[l]=arguments[l+3];t.children=i}if(t&&a)for(var f in a)void 0===t[f]&&(t[f]=a[f]);else t||(t=a||{});return{$$typeof:r,type:e,key:void 0===n?null:""+n,ref:null,props:t,_owner:null}}function D(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}function R(e,t){return(R=Object.setPrototypeOf||function(e,t){return e.__proto__=t,e})(e,t)}function $(e){var t=function(){if("undefined"===typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"===typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],function(){})),!0}catch(e){return!1}}();return function(){var n,r=B(e);if(t){var o=B(this).constructor;n=Reflect.construct(r,arguments,o)}else n=r.apply(this,arguments);return function(e,t){if(t&&("object"===x(t)||"function"===typeof t))return t;if(void 0!==t)throw new TypeError("Derived constructors may only return object or undefined");return A(e)}(this,n)}}function A(e){if(void 0===e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e}function B(e){return(B=Object.setPrototypeOf?Object.getPrototypeOf:function(e){return e.__proto__||Object.getPrototypeOf(e)})(e)}function T(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}var V,q=E("label",{className:"label"},void 0,"Name"),J=E("label",{className:"label"},void 0,"Email"),Y=E("label",{className:"label"},void 0,"Date Of Birth"),F=function(e){!function(e,t){if("function"!==typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function");e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,writable:!0,configurable:!0}}),t&&R(e,t)}(c,a.a.PureComponent);var t,n,r,o=$(c);function c(){var e;!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,c);for(var t=arguments.length,n=new Array(t),r=0;r<t;r++)n[r]=arguments[r];return T(A(e=o.call.apply(o,[this].concat(n))),"handleChange",function(t){return function(n){n.persist(),e.props.setOneValue({key:t,value:n.target.value})}}),T(A(e),"handleDateChange",function(t){return function(n){e.props.setOneValue({key:t,value:d()(n).format(S.b)})}}),T(A(e),"handleSave",function(){e.props.addEditRequest()}),e}return t=c,(n=[{key:"componentDidMount",value:function(){this.props.clearError(),this.props.loadOneRequest()}},{key:"render",value:function(){var e=this.props,t=(e.classes,e.one),n=e.errors;return E(a.a.Fragment,{},void 0,E("div",{className:"w-full pb-4"},void 0,q,E(w.a,{className:"md:w-1/2",error:n&&n.name&&n.name.length>0},void 0,E("input",{className:"inputbox",id:"name",type:"text",value:t.name||"",onChange:this.handleChange("name")}),E(_.a,{id:"component-error-text"},void 0,n.name))),E("div",{className:"w-full pb-4"},void 0,J,E(w.a,{className:"md:w-1/2",error:n&&n.email&&n.email.length>0},void 0,E("input",{className:"inputbox",id:"email",type:"text",value:t.email||"",onChange:this.handleChange("name")}),E(_.a,{id:"component-error-text"},void 0,n.email))),E("div",{className:"md:w-1/2 pb-4"},void 0,Y,E(b.a,{name:"date_of_birth",className:"inputbox",value:t.date_of_birth&&d()(t.date_of_birth).format(S.b)||"",onChange:this.handleDateChange("date_of_birth")})),E(g.a,{control:E(v.a,{checked:t.email_verified||!1,color:"primary"}),label:"Email Verified"}),E("div",{className:"w-full pb-2"},void 0,"You are one of ",t.roles.map(function(e){return"".concat(e.role_title," ")})),E("div",{className:"w-full  pb-4"},void 0,"Your account created at ",d()(t.added_at).format(S.b)),E("button",{className:"py-2 px-6 rounded mt-4 text-sm text-white bg-primary uppercase btn-theme",onClick:this.handleSave},void 0,"Save"))}}])&&D(t.prototype,n),r&&D(t,r),c}(),M=Object(c.b)({one:Object(N.b)(),errors:Object(N.a)()}),z=Object(l.connect)(M,C(C({},P),{},{push:f.push})),G=m()(function(e){return{}}),H=Object(i.compose)(z,G)(F);function I(e,t,n,r){V||(V="function"===typeof Symbol&&Symbol.for&&Symbol.for("react.element")||60103);var o=e&&e.defaultProps,a=arguments.length-3;if(t||0===a||(t={children:void 0}),1===a)t.children=r;else if(a>1){for(var c=new Array(a),i=0;i<a;i++)c[i]=arguments[i+3];t.children=c}if(t&&o)for(var l in o)void 0===t[l]&&(t[l]=o[l]);else t||(t=o||{});return{$$typeof:V,type:e,key:void 0===n?null:""+n,ref:null,props:t,_owner:null}}var K=I("div",{className:"flex justify-between py-4"},void 0,I("div",{className:"w-1/4 bg-white rounded shadow"},void 0,I(n("bb160c6afcea089468ca").a,{})),I("div",{className:"w-3/4 bg-white rounded ml-2 p-4 shadow"},void 0,I(H,{})));t.default=function(){return K}}}]);
=======
(window.webpackJsonp=window.webpackJsonp||[]).push([[239],{"427b10d94403148db3a3":function(e,t,n){"use strict";n.r(t);var r,o=n("8af190b70a6bc55c6f1b"),a=n.n(o),c=(n("8a2d1b95e05b6a321e74"),n("a28fc3c963a1d4d1a2e5")),i=n("ab4cb61bcb2dc161defb"),l=n("d7dd51e1bf6bfc2c9c3d"),f=n("3aced5b508e7389026da"),u=n("da010f21fea25912dd9e"),d=n.n(u),s=n("6d0b3088082c0f598087"),b=n.n(s),p=(n("f85e09def79cc2a20bc2"),n("4a683f0a5e64e66a8eb9")),m=n.n(p),y=n("c502bee2fd4be3dd7f62"),v=n.n(y),h=n("16c7abd7abc407b9f247"),w=n.n(h),O=n("5c0a236ca4c0b26f32cd"),g=n.n(O),j=n("ce1e49cdf0acd22acb13"),_=n.n(j),N=(n("adc20f99e57c573c589c"),n("d95b0cf107403b178365"),n("6d130973d356eac3aaa4"),n("53c474548e94ea6a099d"),n("7bb47e11abc2239bb257")),P=n("ccdaaa26e7cd49df9e0f"),S=n("fcb99a06256635f70435");function x(e){return(x="function"===typeof Symbol&&"symbol"===typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"===typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(e)}function k(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter(function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable})),n.push.apply(n,r)}return n}function C(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?k(Object(n),!0).forEach(function(t){T(e,t,n[t])}):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):k(Object(n)).forEach(function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))})}return e}function E(e,t,n,o){r||(r="function"===typeof Symbol&&Symbol.for&&Symbol.for("react.element")||60103);var a=e&&e.defaultProps,c=arguments.length-3;if(t||0===c||(t={children:void 0}),1===c)t.children=o;else if(c>1){for(var i=new Array(c),l=0;l<c;l++)i[l]=arguments[l+3];t.children=i}if(t&&a)for(var f in a)void 0===t[f]&&(t[f]=a[f]);else t||(t=a||{});return{$$typeof:r,type:e,key:void 0===n?null:""+n,ref:null,props:t,_owner:null}}function D(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}function R(e,t){return(R=Object.setPrototypeOf||function(e,t){return e.__proto__=t,e})(e,t)}function $(e){var t=function(){if("undefined"===typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"===typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],function(){})),!0}catch(e){return!1}}();return function(){var n,r=B(e);if(t){var o=B(this).constructor;n=Reflect.construct(r,arguments,o)}else n=r.apply(this,arguments);return function(e,t){if(t&&("object"===x(t)||"function"===typeof t))return t;if(void 0!==t)throw new TypeError("Derived constructors may only return object or undefined");return A(e)}(this,n)}}function A(e){if(void 0===e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e}function B(e){return(B=Object.setPrototypeOf?Object.getPrototypeOf:function(e){return e.__proto__||Object.getPrototypeOf(e)})(e)}function T(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}var V,q=E("label",{className:"label"},void 0,"Name"),J=E("label",{className:"label"},void 0,"Email"),Y=E("label",{className:"label"},void 0,"Date Of Birth"),F=function(e){!function(e,t){if("function"!==typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function");e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,writable:!0,configurable:!0}}),t&&R(e,t)}(c,a.a.PureComponent);var t,n,r,o=$(c);function c(){var e;!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,c);for(var t=arguments.length,n=new Array(t),r=0;r<t;r++)n[r]=arguments[r];return T(A(e=o.call.apply(o,[this].concat(n))),"handleChange",function(t){return function(n){n.persist(),e.props.setOneValue({key:t,value:n.target.value})}}),T(A(e),"handleDateChange",function(t){return function(n){e.props.setOneValue({key:t,value:d()(n).format(S.b)})}}),T(A(e),"handleSave",function(){e.props.addEditRequest()}),e}return t=c,(n=[{key:"componentDidMount",value:function(){this.props.clearError(),this.props.loadOneRequest()}},{key:"render",value:function(){var e=this.props,t=(e.classes,e.one),n=e.errors;return E(a.a.Fragment,{},void 0,E("div",{className:"w-full pb-4"},void 0,q,E(w.a,{className:"md:w-1/2",error:n&&n.name&&n.name.length>0},void 0,E("input",{className:"inputbox",id:"name",type:"text",value:t.name||"",onChange:this.handleChange("name")}),E(_.a,{id:"component-error-text"},void 0,n.name))),E("div",{className:"w-full pb-4"},void 0,J,E(w.a,{className:"md:w-1/2",error:n&&n.email&&n.email.length>0},void 0,E("input",{className:"inputbox",id:"email",type:"text",value:t.email||"",onChange:this.handleChange("name")}),E(_.a,{id:"component-error-text"},void 0,n.email))),E("div",{className:"md:w-1/2 pb-4"},void 0,Y,E(b.a,{name:"date_of_birth",className:"inputbox",value:t.date_of_birth&&d()(t.date_of_birth).format(S.b)||"",onChange:this.handleDateChange("date_of_birth")})),E(g.a,{control:E(v.a,{checked:t.email_verified||!1,color:"primary"}),label:"Email Verified"}),E("div",{className:"w-full pb-2"},void 0,"You are one of ",t.roles.map(function(e){return"".concat(e.role_title," ")})),E("div",{className:"w-full  pb-4"},void 0,"Your account created at ",d()(t.added_at).format(S.b)),E("button",{className:"py-2 px-6 rounded mt-4 text-sm text-white bg-primary uppercase btn-theme",onClick:this.handleSave},void 0,"Save"))}}])&&D(t.prototype,n),r&&D(t,r),c}(),M=Object(c.b)({one:Object(N.b)(),errors:Object(N.a)()}),z=Object(l.connect)(M,C(C({},P),{},{push:f.push})),G=m()(function(e){return{}}),H=Object(i.compose)(z,G)(F);function I(e,t,n,r){V||(V="function"===typeof Symbol&&Symbol.for&&Symbol.for("react.element")||60103);var o=e&&e.defaultProps,a=arguments.length-3;if(t||0===a||(t={children:void 0}),1===a)t.children=r;else if(a>1){for(var c=new Array(a),i=0;i<a;i++)c[i]=arguments[i+3];t.children=c}if(t&&o)for(var l in o)void 0===t[l]&&(t[l]=o[l]);else t||(t=o||{});return{$$typeof:V,type:e,key:void 0===n?null:""+n,ref:null,props:t,_owner:null}}var K=I("div",{className:"flex justify-between py-4"},void 0,I("div",{className:"w-1/4 bg-white rounded shadow"},void 0,I(n("bb160c6afcea089468ca").a,{})),I("div",{className:"w-3/4 bg-white rounded ml-2 p-4 shadow"},void 0,I(H,{})));t.default=function(){return K}}}]);
>>>>>>> 41f64895ae2d4aeb7736fd90e084d7a063de2675:client/build/239.86af2dfb529bfacb5b36.chunk.js