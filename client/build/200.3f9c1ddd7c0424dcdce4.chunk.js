<<<<<<< HEAD:client/build/200.3f9c1ddd7c0424dcdce4.chunk.js
(window.webpackJsonp=window.webpackJsonp||[]).push([[200],{"56afdb172059ccf09224":function(e,t,n){"use strict";n.r(t);var r,o=n("8af190b70a6bc55c6f1b"),a=n.n(o),c=(n("8a2d1b95e05b6a321e74"),n("a28fc3c963a1d4d1a2e5")),i=n("3aced5b508e7389026da"),u=n("ab4cb61bcb2dc161defb"),l=n("d7dd51e1bf6bfc2c9c3d"),s=n("0d7f0986bcd2f33d8a2a"),f=n("4a683f0a5e64e66a8eb9"),d=n.n(f),p=n("adc20f99e57c573c589c"),b=n("d95b0cf107403b178365"),y=n("7171756f4924f2c24726"),h=n("e3d4e7b29b10301f988a"),m=n("0446575f2a684f4ac5a3"),v=n("ed8249d93ebc3c046bad"),g=n("26682d5d4df1c4fdd619"),O=n.n(g),w=n("0d939196e59ed73c94e6"),j=n("d733903be61208652859"),k=n("5932430beb0c05240602"),P=n("2fad9e66eff5130ad191"),C=n("5cb9d1dda30508c4ab9e");function q(e){return(q="function"===typeof Symbol&&"symbol"===typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"===typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(e)}function x(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter(function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable})),n.push.apply(n,r)}return n}function S(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?x(Object(n),!0).forEach(function(t){A(e,t,n[t])}):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):x(Object(n)).forEach(function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))})}return e}function N(e,t,n,o){r||(r="function"===typeof Symbol&&Symbol.for&&Symbol.for("react.element")||60103);var a=e&&e.defaultProps,c=arguments.length-3;if(t||0===c||(t={children:void 0}),1===c)t.children=o;else if(c>1){for(var i=new Array(c),u=0;u<c;u++)i[u]=arguments[u+3];t.children=i}if(t&&a)for(var l in a)void 0===t[l]&&(t[l]=a[l]);else t||(t=a||{});return{$$typeof:r,type:e,key:void 0===n?null:""+n,ref:null,props:t,_owner:null}}function E(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}function R(e,t){return(R=Object.setPrototypeOf||function(e,t){return e.__proto__=t,e})(e,t)}function _(e){var t=function(){if("undefined"===typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"===typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],function(){})),!0}catch(e){return!1}}();return function(){var n,r=F(e);if(t){var o=F(this).constructor;n=Reflect.construct(r,arguments,o)}else n=r.apply(this,arguments);return function(e,t){if(t&&("object"===q(t)||"function"===typeof t))return t;if(void 0!==t)throw new TypeError("Derived constructors may only return object or undefined");return B(e)}(this,n)}}function B(e){if(void 0===e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e}function F(e){return(F=Object.setPrototypeOf?Object.getPrototypeOf:function(e){return e.__proto__||Object.getPrototypeOf(e)})(e)}function A(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}var D=N(P.a,{}),T=N(O.a,{}),M=N("label",{className:"font-bold text-gray-700",htmlFor:"grid-last-name"},void 0,"Answer"),G=N("label",{className:"block uppercase tracking-wide text-gray-800 text-sm font-bold mb-2",htmlFor:"category"},void 0,"Category"),J=N("option",{value:"",disabled:!0},void 0,"None"),Q=function(e){!function(e,t){if("function"!==typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function");e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,writable:!0,configurable:!0}}),t&&R(e,t)}(c,a.a.PureComponent);var t,n,r,o=_(c);function c(){var e;!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,c);for(var t=arguments.length,n=new Array(t),r=0;r<t;r++)n[r]=arguments[r];return A(B(e=o.call.apply(o,[this].concat(n))),"handleChange",function(t){return function(n){n.persist(),e.props.setOneValue({key:t,value:n.target.value})}}),A(B(e),"handleCheckedChange",function(t){return function(n){n.persist(),e.props.setOneValue({key:t,value:n.target.checked})}}),A(B(e),"handleGoBack",function(){e.props.push("/admin/faq-manage")}),A(B(e),"handleSave",function(){e.props.addEditRequest()}),e}return t=c,(n=[{key:"componentDidMount",value:function(){this.props.clearErrors(),this.props.match.params&&this.props.match.params.id&&this.props.loadOneRequest(this.props.match.params.id),this.props.loadCategoryRequest()}},{key:"render",value:function(){var e=this.props,t=e.classes,n=e.category,r=e.one,o=e.match,c=e.loading;e.errors;return c&&1==c?D:a.a.createElement(a.a.Fragment,null,N(s.Helmet,{},void 0,N("title",{},void 0,o&&o.params&&o.params.id?"Edit Faq":"Add Faq ")),N("div",{className:"flex justify-between mt-3 mb-3"},void 0,N(j.a,{},void 0,N(w.IconButton,{className:"".concat(t.backbtn," cursor-pointer"),onClick:this.handleGoBack,"aria-label":"Back"},void 0,T),o&&o.params&&o.params.id?"Edit Faq":"Add Faq")),N(k.a,{},void 0,N("div",{className:"w-full md:w-1/2 pb-4"},void 0,N(C.a,{label:"Question",inputclassName:"inputbox",inputid:"faq",inputType:"text",name:"Question",value:r.question||"",onChange:this.handleChange("question")})),N("div",{className:"w-full md:w-1/2 pb-4"},void 0,M,N("textarea",{className:"inputbox",multiline:"true",rows:"5",name:"Answer",id:"faq-answer",value:r.title||"",onChange:this.handleChange("title")})),N("div",{className:"w-full md:w-1/2 pb-4"},void 0,G,N("select",{className:"inputbox",value:r.category||"",onChange:this.handleChange("category"),inputprops:{name:"category",id:"category-title"}},void 0,J,n&&n.length&&n.map(function(e){return N("option",{value:e._id},e._id,e.title)}))),N("button",{className:"block btn bg-primary hover:bg-secondary",onClick:this.handleSave},void 0,"Save")))}}])&&E(t.prototype,n),r&&E(t,r),c}(),V=d()(function(e){return{backbtn:{padding:0,height:"40px",width:"40px",marginTop:"auto",marginBottom:"auto",borderRadius:"50%",marginRight:"5px"}}}),$=Object(b.a)({key:"faqManagePage",reducer:y.a}),H=Object(p.a)({key:"faqManagePage",saga:h.a}),I=Object(c.b)({one:Object(m.e)(),category:Object(m.b)(),loading:Object(m.d)(),errors:Object(m.c)()}),z=Object(l.connect)(I,S(S({},v),{},{push:i.push}));t.default=Object(u.compose)(V,$,H,z)(Q)}}]);
=======
(window.webpackJsonp=window.webpackJsonp||[]).push([[203],{"56afdb172059ccf09224":function(e,t,n){"use strict";n.r(t);var r,o=n("8af190b70a6bc55c6f1b"),a=n.n(o),c=(n("8a2d1b95e05b6a321e74"),n("a28fc3c963a1d4d1a2e5")),i=n("3aced5b508e7389026da"),u=n("ab4cb61bcb2dc161defb"),l=n("d7dd51e1bf6bfc2c9c3d"),s=n("0d7f0986bcd2f33d8a2a"),f=n("4a683f0a5e64e66a8eb9"),d=n.n(f),p=n("adc20f99e57c573c589c"),b=n("d95b0cf107403b178365"),y=n("7171756f4924f2c24726"),h=n("e3d4e7b29b10301f988a"),m=n("0446575f2a684f4ac5a3"),v=n("ed8249d93ebc3c046bad"),g=n("26682d5d4df1c4fdd619"),O=n.n(g),w=n("0d939196e59ed73c94e6"),j=n("d733903be61208652859"),k=n("5932430beb0c05240602"),P=n("2fad9e66eff5130ad191"),C=n("5cb9d1dda30508c4ab9e");function q(e){return(q="function"===typeof Symbol&&"symbol"===typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"===typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(e)}function x(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter(function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable})),n.push.apply(n,r)}return n}function S(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?x(Object(n),!0).forEach(function(t){A(e,t,n[t])}):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):x(Object(n)).forEach(function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))})}return e}function N(e,t,n,o){r||(r="function"===typeof Symbol&&Symbol.for&&Symbol.for("react.element")||60103);var a=e&&e.defaultProps,c=arguments.length-3;if(t||0===c||(t={children:void 0}),1===c)t.children=o;else if(c>1){for(var i=new Array(c),u=0;u<c;u++)i[u]=arguments[u+3];t.children=i}if(t&&a)for(var l in a)void 0===t[l]&&(t[l]=a[l]);else t||(t=a||{});return{$$typeof:r,type:e,key:void 0===n?null:""+n,ref:null,props:t,_owner:null}}function E(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}function R(e,t){return(R=Object.setPrototypeOf||function(e,t){return e.__proto__=t,e})(e,t)}function _(e){var t=function(){if("undefined"===typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"===typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],function(){})),!0}catch(e){return!1}}();return function(){var n,r=F(e);if(t){var o=F(this).constructor;n=Reflect.construct(r,arguments,o)}else n=r.apply(this,arguments);return function(e,t){if(t&&("object"===q(t)||"function"===typeof t))return t;if(void 0!==t)throw new TypeError("Derived constructors may only return object or undefined");return B(e)}(this,n)}}function B(e){if(void 0===e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e}function F(e){return(F=Object.setPrototypeOf?Object.getPrototypeOf:function(e){return e.__proto__||Object.getPrototypeOf(e)})(e)}function A(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}var D=N(P.a,{}),T=N(O.a,{}),M=N("label",{className:"font-bold text-gray-700",htmlFor:"grid-last-name"},void 0,"Answer"),G=N("label",{className:"block uppercase tracking-wide text-gray-800 text-sm font-bold mb-2",htmlFor:"category"},void 0,"Category"),J=N("option",{value:"",disabled:!0},void 0,"None"),Q=function(e){!function(e,t){if("function"!==typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function");e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,writable:!0,configurable:!0}}),t&&R(e,t)}(c,a.a.PureComponent);var t,n,r,o=_(c);function c(){var e;!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,c);for(var t=arguments.length,n=new Array(t),r=0;r<t;r++)n[r]=arguments[r];return A(B(e=o.call.apply(o,[this].concat(n))),"handleChange",function(t){return function(n){n.persist(),e.props.setOneValue({key:t,value:n.target.value})}}),A(B(e),"handleCheckedChange",function(t){return function(n){n.persist(),e.props.setOneValue({key:t,value:n.target.checked})}}),A(B(e),"handleGoBack",function(){e.props.push("/admin/faq-manage")}),A(B(e),"handleSave",function(){e.props.addEditRequest()}),e}return t=c,(n=[{key:"componentDidMount",value:function(){this.props.clearErrors(),this.props.match.params&&this.props.match.params.id&&this.props.loadOneRequest(this.props.match.params.id),this.props.loadCategoryRequest()}},{key:"render",value:function(){var e=this.props,t=e.classes,n=e.category,r=e.one,o=e.match,c=e.loading;e.errors;return c&&1==c?D:a.a.createElement(a.a.Fragment,null,N(s.Helmet,{},void 0,N("title",{},void 0,o&&o.params&&o.params.id?"Edit Faq":"Add Faq ")),N("div",{className:"flex justify-between mt-3 mb-3"},void 0,N(j.a,{},void 0,N(w.IconButton,{className:"".concat(t.backbtn," cursor-pointer"),onClick:this.handleGoBack,"aria-label":"Back"},void 0,T),o&&o.params&&o.params.id?"Edit Faq":"Add Faq")),N(k.a,{},void 0,N("div",{className:"w-full md:w-1/2 pb-4"},void 0,N(C.a,{label:"Question",inputclassName:"inputbox",inputid:"faq",inputType:"text",name:"Question",value:r.question||"",onChange:this.handleChange("question")})),N("div",{className:"w-full md:w-1/2 pb-4"},void 0,M,N("textarea",{className:"inputbox",multiline:"true",rows:"5",name:"Answer",id:"faq-answer",value:r.title||"",onChange:this.handleChange("title")})),N("div",{className:"w-full md:w-1/2 pb-4"},void 0,G,N("select",{className:"inputbox",value:r.category||"",onChange:this.handleChange("category"),inputprops:{name:"category",id:"category-title"}},void 0,J,n&&n.length&&n.map(function(e){return N("option",{value:e._id},e._id,e.title)}))),N("button",{className:"block btn bg-primary hover:bg-secondary",onClick:this.handleSave},void 0,"Save")))}}])&&E(t.prototype,n),r&&E(t,r),c}(),V=d()(function(e){return{backbtn:{padding:0,height:"40px",width:"40px",marginTop:"auto",marginBottom:"auto",borderRadius:"50%",marginRight:"5px"}}}),$=Object(b.a)({key:"faqManagePage",reducer:y.a}),H=Object(p.a)({key:"faqManagePage",saga:h.a}),I=Object(c.b)({one:Object(m.e)(),category:Object(m.b)(),loading:Object(m.d)(),errors:Object(m.c)()}),z=Object(l.connect)(I,S(S({},v),{},{push:i.push}));t.default=Object(u.compose)(V,$,H,z)(Q)}}]);
>>>>>>> 41f64895ae2d4aeb7736fd90e084d7a063de2675:client/build/203.764b5e0803ed0b48f8be.chunk.js