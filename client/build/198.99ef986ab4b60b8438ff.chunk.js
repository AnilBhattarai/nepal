<<<<<<< HEAD:client/build/198.99ef986ab4b60b8438ff.chunk.js
(window.webpackJsonp=window.webpackJsonp||[]).push([[198],{"9094325700aa6ce91f5c":function(e,t,r){"use strict";r.r(t);var n,o=r("8af190b70a6bc55c6f1b"),a=r.n(o),c=(r("8a2d1b95e05b6a321e74"),r("a28fc3c963a1d4d1a2e5")),i=r("3aced5b508e7389026da"),u=r("ab4cb61bcb2dc161defb"),f=r("d7dd51e1bf6bfc2c9c3d"),l=r("0d7f0986bcd2f33d8a2a"),d=r("adc20f99e57c573c589c"),s=r("d95b0cf107403b178365"),p=r("4a683f0a5e64e66a8eb9"),b=r.n(p),y=r("5c0a236ca4c0b26f32cd"),h=r.n(y),v=r("c502bee2fd4be3dd7f62"),m=r.n(v),g=r("547ff3f1f37ad2c6a87f"),O=r("a6105fd30029151226cc"),w=r("e518880a340b8804ee69"),j=r("d15b5205c143a48ff706"),k=r("26682d5d4df1c4fdd619"),P=r.n(k),C=r("0d939196e59ed73c94e6"),S=r("d733903be61208652859"),_=r("5932430beb0c05240602"),E=r("2fad9e66eff5130ad191"),R=r("5cb9d1dda30508c4ab9e");function q(e){return(q="function"===typeof Symbol&&"symbol"===typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"===typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(e)}function x(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter(function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable})),r.push.apply(r,n)}return r}function B(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?x(Object(r),!0).forEach(function(t){M(e,t,r[t])}):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):x(Object(r)).forEach(function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))})}return e}function T(e,t,r,o){n||(n="function"===typeof Symbol&&Symbol.for&&Symbol.for("react.element")||60103);var a=e&&e.defaultProps,c=arguments.length-3;if(t||0===c||(t={children:void 0}),1===c)t.children=o;else if(c>1){for(var i=new Array(c),u=0;u<c;u++)i[u]=arguments[u+3];t.children=i}if(t&&a)for(var f in a)void 0===t[f]&&(t[f]=a[f]);else t||(t=a||{});return{$$typeof:n,type:e,key:void 0===r?null:""+r,ref:null,props:t,_owner:null}}function D(e,t){for(var r=0;r<t.length;r++){var n=t[r];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,n.key,n)}}function F(e,t){return(F=Object.setPrototypeOf||function(e,t){return e.__proto__=t,e})(e,t)}function A(e){var t=function(){if("undefined"===typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"===typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],function(){})),!0}catch(e){return!1}}();return function(){var r,n=I(e);if(t){var o=I(this).constructor;r=Reflect.construct(n,arguments,o)}else r=n.apply(this,arguments);return function(e,t){if(t&&("object"===q(t)||"function"===typeof t))return t;if(void 0!==t)throw new TypeError("Derived constructors may only return object or undefined");return N(e)}(this,r)}}function N(e){if(void 0===e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e}function I(e){return(I=Object.setPrototypeOf?Object.getPrototypeOf:function(e){return e.__proto__||Object.getPrototypeOf(e)})(e)}function M(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}var G=T(E.a,{}),J=T(P.a,{}),V=function(e){!function(e,t){if("function"!==typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function");e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,writable:!0,configurable:!0}}),t&&F(e,t)}(c,a.a.PureComponent);var t,r,n,o=A(c);function c(){var e;!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,c);for(var t=arguments.length,r=new Array(t),n=0;n<t;n++)r[n]=arguments[n];return M(N(e=o.call.apply(o,[this].concat(r))),"handleChange",function(t){return function(r){r.persist(),e.props.setOneValue({key:t,value:r.target.value})}}),M(N(e),"handleCheckedChange",function(t){return function(r){r.persist(),e.props.setOneValue({key:t,value:r.target.checked})}}),M(N(e),"handleGoBack",function(){e.props.push("/admin/faq-cat-manage")}),M(N(e),"handleSave",function(){e.props.addEditRequest()}),e}return t=c,(r=[{key:"componentDidMount",value:function(){this.props.clearErrors(),this.props.match.params&&this.props.match.params.id&&this.props.loadOneRequest(this.props.match.params.id)}},{key:"render",value:function(){var e=this.props,t=e.classes,r=e.one,n=e.match,o=e.loading,a=e.errors;return o&&1==o?G:T("div",{},void 0,T(l.Helmet,{},void 0,T("title",{},void 0,n&&n.params&&n.params.id?"Edit Faq Category":"Add Faq Category")),T("div",{className:"flex justify-between mt-3 mb-3"},void 0,T(S.a,{},void 0,T(C.IconButton,{className:"".concat(t.backbtn," cursor-pointer"),onClick:this.handleGoBack,"aria-label":"Back"},void 0,J)," ",n&&n.params&&n.params.id?"Edit Faq Category":"Add Faq Category")),T(_.a,{},void 0,T("div",{className:"w-full md:w-1/2 pb-4"},void 0,T(R.a,{label:"Title",inputclassName:"inputbox",inputid:"title",name:"Title",inputType:"text",value:r.title,onChange:this.handleChange("title"),error:a.title})),T("div",{},void 0,T(h.a,{control:T(m.a,{checked:r.is_active||!1,tabIndex:-1,onClick:this.handleCheckedChange("is_active"),color:"primary"}),label:"Is Active"})),T("button",{className:"block btn bg-primary hover:bg-secondary",onClick:this.handleSave},void 0,"Save")))}}])&&D(t.prototype,r),n&&D(t,n),c}(),$=b()(function(e){return{backbtn:{padding:0,height:"40px",width:"40px",marginTop:"auto",marginBottom:"auto",borderRadius:"50%",marginRight:"5px"}}}),H=Object(s.a)({key:"adminFaqCategoryManagePage",reducer:g.a}),z=Object(d.a)({key:"adminFaqCategoryManagePage",saga:O.a}),K=Object(c.b)({one:Object(w.d)(),loading:Object(w.c)(),errors:Object(w.b)()}),L=Object(f.connect)(K,B(B({},j),{},{push:i.push}));t.default=Object(u.compose)($,H,z,L)(V)}}]);
=======
(window.webpackJsonp=window.webpackJsonp||[]).push([[201],{"9094325700aa6ce91f5c":function(e,t,r){"use strict";r.r(t);var n,o=r("8af190b70a6bc55c6f1b"),a=r.n(o),c=(r("8a2d1b95e05b6a321e74"),r("a28fc3c963a1d4d1a2e5")),i=r("3aced5b508e7389026da"),u=r("ab4cb61bcb2dc161defb"),f=r("d7dd51e1bf6bfc2c9c3d"),l=r("0d7f0986bcd2f33d8a2a"),d=r("adc20f99e57c573c589c"),s=r("d95b0cf107403b178365"),p=r("4a683f0a5e64e66a8eb9"),b=r.n(p),y=r("5c0a236ca4c0b26f32cd"),h=r.n(y),v=r("c502bee2fd4be3dd7f62"),m=r.n(v),g=r("547ff3f1f37ad2c6a87f"),O=r("a6105fd30029151226cc"),w=r("e518880a340b8804ee69"),j=r("d15b5205c143a48ff706"),k=r("26682d5d4df1c4fdd619"),P=r.n(k),C=r("0d939196e59ed73c94e6"),S=r("d733903be61208652859"),_=r("5932430beb0c05240602"),E=r("2fad9e66eff5130ad191"),R=r("5cb9d1dda30508c4ab9e");function q(e){return(q="function"===typeof Symbol&&"symbol"===typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"===typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(e)}function x(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter(function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable})),r.push.apply(r,n)}return r}function B(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?x(Object(r),!0).forEach(function(t){M(e,t,r[t])}):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):x(Object(r)).forEach(function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))})}return e}function T(e,t,r,o){n||(n="function"===typeof Symbol&&Symbol.for&&Symbol.for("react.element")||60103);var a=e&&e.defaultProps,c=arguments.length-3;if(t||0===c||(t={children:void 0}),1===c)t.children=o;else if(c>1){for(var i=new Array(c),u=0;u<c;u++)i[u]=arguments[u+3];t.children=i}if(t&&a)for(var f in a)void 0===t[f]&&(t[f]=a[f]);else t||(t=a||{});return{$$typeof:n,type:e,key:void 0===r?null:""+r,ref:null,props:t,_owner:null}}function D(e,t){for(var r=0;r<t.length;r++){var n=t[r];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,n.key,n)}}function F(e,t){return(F=Object.setPrototypeOf||function(e,t){return e.__proto__=t,e})(e,t)}function A(e){var t=function(){if("undefined"===typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"===typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],function(){})),!0}catch(e){return!1}}();return function(){var r,n=I(e);if(t){var o=I(this).constructor;r=Reflect.construct(n,arguments,o)}else r=n.apply(this,arguments);return function(e,t){if(t&&("object"===q(t)||"function"===typeof t))return t;if(void 0!==t)throw new TypeError("Derived constructors may only return object or undefined");return N(e)}(this,r)}}function N(e){if(void 0===e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e}function I(e){return(I=Object.setPrototypeOf?Object.getPrototypeOf:function(e){return e.__proto__||Object.getPrototypeOf(e)})(e)}function M(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}var G=T(E.a,{}),J=T(P.a,{}),V=function(e){!function(e,t){if("function"!==typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function");e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,writable:!0,configurable:!0}}),t&&F(e,t)}(c,a.a.PureComponent);var t,r,n,o=A(c);function c(){var e;!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,c);for(var t=arguments.length,r=new Array(t),n=0;n<t;n++)r[n]=arguments[n];return M(N(e=o.call.apply(o,[this].concat(r))),"handleChange",function(t){return function(r){r.persist(),e.props.setOneValue({key:t,value:r.target.value})}}),M(N(e),"handleCheckedChange",function(t){return function(r){r.persist(),e.props.setOneValue({key:t,value:r.target.checked})}}),M(N(e),"handleGoBack",function(){e.props.push("/admin/faq-cat-manage")}),M(N(e),"handleSave",function(){e.props.addEditRequest()}),e}return t=c,(r=[{key:"componentDidMount",value:function(){this.props.clearErrors(),this.props.match.params&&this.props.match.params.id&&this.props.loadOneRequest(this.props.match.params.id)}},{key:"render",value:function(){var e=this.props,t=e.classes,r=e.one,n=e.match,o=e.loading,a=e.errors;return o&&1==o?G:T("div",{},void 0,T(l.Helmet,{},void 0,T("title",{},void 0,n&&n.params&&n.params.id?"Edit Faq Category":"Add Faq Category")),T("div",{className:"flex justify-between mt-3 mb-3"},void 0,T(S.a,{},void 0,T(C.IconButton,{className:"".concat(t.backbtn," cursor-pointer"),onClick:this.handleGoBack,"aria-label":"Back"},void 0,J)," ",n&&n.params&&n.params.id?"Edit Faq Category":"Add Faq Category")),T(_.a,{},void 0,T("div",{className:"w-full md:w-1/2 pb-4"},void 0,T(R.a,{label:"Title",inputclassName:"inputbox",inputid:"title",name:"Title",inputType:"text",value:r.title,onChange:this.handleChange("title"),error:a.title})),T("div",{},void 0,T(h.a,{control:T(m.a,{checked:r.is_active||!1,tabIndex:-1,onClick:this.handleCheckedChange("is_active"),color:"primary"}),label:"Is Active"})),T("button",{className:"block btn bg-primary hover:bg-secondary",onClick:this.handleSave},void 0,"Save")))}}])&&D(t.prototype,r),n&&D(t,n),c}(),$=b()(function(e){return{backbtn:{padding:0,height:"40px",width:"40px",marginTop:"auto",marginBottom:"auto",borderRadius:"50%",marginRight:"5px"}}}),H=Object(s.a)({key:"adminFaqCategoryManagePage",reducer:g.a}),z=Object(d.a)({key:"adminFaqCategoryManagePage",saga:O.a}),K=Object(c.b)({one:Object(w.d)(),loading:Object(w.c)(),errors:Object(w.b)()}),L=Object(f.connect)(K,B(B({},j),{},{push:i.push}));t.default=Object(u.compose)($,H,z,L)(V)}}]);
>>>>>>> 41f64895ae2d4aeb7736fd90e084d7a063de2675:client/build/201.8c2811c849a5b20fff12.chunk.js
