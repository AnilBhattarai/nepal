(window.webpackJsonp=window.webpackJsonp||[]).push([[278],{"25db67c34d780fc13462":function(e,t,o){"use strict";o.r(t);var n,r=o("8af190b70a6bc55c6f1b"),l=o.n(r),a=(o("8a2d1b95e05b6a321e74"),o("d7dd51e1bf6bfc2c9c3d")),c=o("0d7f0986bcd2f33d8a2a"),i=o("a28fc3c963a1d4d1a2e5"),f=o("ab4cb61bcb2dc161defb"),u=o("38359d538de7aa978707"),s=o("d1202e14c140717996f9"),d=o("6542cd13fd5dd1bcffd4"),p=(o("202972bcc205b94a4b99"),o("e95a63b25fb92ed15721")),b=(o("da010f21fea25912dd9e"),o("fcb99a06256635f70435"));o("d18552f5bdcfec97967e");function m(e,t,o,r){n||(n="function"===typeof Symbol&&Symbol.for&&Symbol.for("react.element")||60103);var l=e&&e.defaultProps,a=arguments.length-3;if(t||0===a||(t={children:void 0}),1===a)t.children=r;else if(a>1){for(var c=new Array(a),i=0;i<a;i++)c[i]=arguments[i+3];t.children=c}if(t&&l)for(var f in l)void 0===t[f]&&(t[f]=l[f]);else t||(t=l||{});return{$$typeof:n,type:e,key:void 0===o?null:""+o,ref:null,props:t,_owner:null}}var v=m("h2",{className:"font-bold text-2xl font-mukta"},void 0,"\u0938\u092e\u094d\u092c\u0928\u094d\u0927\u093f\u0924 \u0916\u0935\u0930");var y,h=Object(i.b)({loading:Object(s.w)(),blogs:Object(s.v)()}),g=Object(a.connect)(h)(function(e){return e.loading?null:m("div",{className:"mt-5"},void 0,e.blogs.length>0&&l.a.createElement(l.a.Fragment,null,v,m("div",{className:"flex flex-wrap -mx-2"},void 0,e.blogs.map(function(e){return m("div",{className:"px-2 mt-4"},"relateds-".concat(e._id),m("div",{className:"bg-white shadow rounded-sm overflow-hidden"},void 0,m(p.Link,{className:"block h-40",to:"/news/mobile/".concat(e.slug_url)},void 0,m("img",{src:"".concat(b.g).concat(e.image.path),alt:e.title,className:"object-cover"})),m("div",{className:"p-4"},void 0,m("h3",{className:"text-xl leading-normal font-bold font-mukta"},void 0,m(p.Link,{className:"text-black no-underline hover:text-secondary",to:"/news/mobile/".concat(e.slug_url)},void 0,e.title)))))}))))}),w=(o("32041351ebfa9f4f4fc6"),o("995d8f2530f0fef922ef"),o("f0d1fbb3106c6cc98657")),_=o("9ada1c9a69d22b419600");function O(e,t,o,n){y||(y="function"===typeof Symbol&&Symbol.for&&Symbol.for("react.element")||60103);var r=e&&e.defaultProps,l=arguments.length-3;if(t||0===l||(t={children:void 0}),1===l)t.children=n;else if(l>1){for(var a=new Array(l),c=0;c<l;c++)a[c]=arguments[c+3];t.children=a}if(t&&r)for(var i in r)void 0===t[i]&&(t[i]=r[i]);else t||(t=r||{});return{$$typeof:y,type:e,key:void 0===o?null:""+o,ref:null,props:t,_owner:null}}var j=O(w.a,{});var k,x=function(e){var t=e.blog,o=e.loading;return window.location.href,o?j:l.a.createElement(l.a.Fragment,null,O("div",{},void 0,O("h1",{className:"text-4xl lg:text-5xl font-bold font-mukta pt-4 leading-tight"},void 0,t&&t.title),t&&t.image&&t.image.fieldname?O("img",{className:"mt-4",src:"".concat(b.g).concat(t.image.path),alt:"".concat(t.title)}):null,O("div",{className:"ckEditor font-mukta",dangerouslySetInnerHTML:{__html:t&&t.description}}),t&&O(_.default,{id:t._id,commentFor:"blog"})))};function S(e){return(S="function"===typeof Symbol&&"symbol"===typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"===typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(e)}function N(e,t,o,n){k||(k="function"===typeof Symbol&&Symbol.for&&Symbol.for("react.element")||60103);var r=e&&e.defaultProps,l=arguments.length-3;if(t||0===l||(t={children:void 0}),1===l)t.children=n;else if(l>1){for(var a=new Array(l),c=0;c<l;c++)a[c]=arguments[c+3];t.children=a}if(t&&r)for(var i in r)void 0===t[i]&&(t[i]=r[i]);else t||(t=r||{});return{$$typeof:k,type:e,key:void 0===o?null:""+o,ref:null,props:t,_owner:null}}function R(e,t){for(var o=0;o<t.length;o++){var n=t[o];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,n.key,n)}}function P(e,t){return(P=Object.setPrototypeOf||function(e,t){return e.__proto__=t,e})(e,t)}function E(e){var t=function(){if("undefined"===typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"===typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],function(){})),!0}catch(e){return!1}}();return function(){var o,n=B(e);if(t){var r=B(this).constructor;o=Reflect.construct(n,arguments,r)}else o=n.apply(this,arguments);return function(e,t){if(t&&("object"===S(t)||"function"===typeof t))return t;if(void 0!==t)throw new TypeError("Derived constructors may only return object or undefined");return function(e){if(void 0===e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e}(e)}(this,o)}}function B(e){return(B=Object.setPrototypeOf?Object.getPrototypeOf:function(e){return e.__proto__||Object.getPrototypeOf(e)})(e)}o.d(t,"BlogPage",function(){return $});var T=N(g,{}),$=function(e){!function(e,t){if("function"!==typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function");e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,writable:!0,configurable:!0}}),t&&P(e,t)}(a,l.a.Component);var t,o,n,r=E(a);function a(){return function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,a),r.apply(this,arguments)}return t=a,(o=[{key:"componentDidMount",value:function(){window.scrollTo(0,0),this.props.clearOne(),this.props.loadRecentBlogsRequest(),this.props.loadRelatedBlogsRequest(this.props.match.params.slug_url),this.props.loadBlogRequest(this.props.match.params.slug_url)}},{key:"UNSAFE_componentWillReceiveProps",value:function(e){window.scrollTo(0,0),e.match.params.slug_url!==this.props.match.params.slug_url&&(this.props.loadRelatedBlogsRequest(e.match.params.slug_url),this.props.loadBlogRequest(e.match.params.slug_url))}},{key:"render",value:function(){var e=this.props,t=e.blog,o=e.loading;e.match.url;return l.a.createElement(l.a.Fragment,null,N(c.Helmet,{},void 0,N("title",{},void 0,t&&t.title)),N("div",{className:"w-full flex-1 px-5"},void 0,N(x,{blog:t,loading:o}),T))}}])&&R(t.prototype,o),n&&R(t,n),a}(),q=Object(i.b)({blog:Object(s.c)(),loading:Object(s.o)(),user:Object(d.k)()}),F=Object(a.connect)(q,u);t.default=Object(f.compose)(F)($)}}]);