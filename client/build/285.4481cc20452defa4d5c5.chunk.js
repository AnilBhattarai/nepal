<<<<<<< HEAD:client/build/281.faeb563047e7d92e7a5e.chunk.js
(window.webpackJsonp=window.webpackJsonp||[]).push([[281],{"851e532bbc30d06231fb":function(e,t,o){"use strict";o.r(t),o.d(t,"BlogsByTag",function(){return k});var n,r=o("8af190b70a6bc55c6f1b"),a=o.n(r),c=(o("8a2d1b95e05b6a321e74"),o("a28fc3c963a1d4d1a2e5")),i=o("ab4cb61bcb2dc161defb"),l=o("d7dd51e1bf6bfc2c9c3d"),f=o("0d7f0986bcd2f33d8a2a"),u=o("d1202e14c140717996f9"),d=o("38359d538de7aa978707"),s=o("dbd498bca2a2e0a98992"),p=(o("5adf6a858e3edfde9879"),o("32041351ebfa9f4f4fc6"),o("7ce8755415f79474d986")),b=o("202972bcc205b94a4b99");function y(e){return(y="function"===typeof Symbol&&"symbol"===typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"===typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(e)}function g(e,t,o,r){n||(n="function"===typeof Symbol&&Symbol.for&&Symbol.for("react.element")||60103);var a=e&&e.defaultProps,c=arguments.length-3;if(t||0===c||(t={children:void 0}),1===c)t.children=r;else if(c>1){for(var i=new Array(c),l=0;l<c;l++)i[l]=arguments[l+3];t.children=i}if(t&&a)for(var f in a)void 0===t[f]&&(t[f]=a[f]);else t||(t=a||{});return{$$typeof:n,type:e,key:void 0===o?null:""+o,ref:null,props:t,_owner:null}}function m(e,t){for(var o=0;o<t.length;o++){var n=t[o];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,n.key,n)}}function v(e,t){return(v=Object.setPrototypeOf||function(e,t){return e.__proto__=t,e})(e,t)}function h(e){var t=function(){if("undefined"===typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"===typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],function(){})),!0}catch(e){return!1}}();return function(){var o,n=O(e);if(t){var r=O(this).constructor;o=Reflect.construct(n,arguments,r)}else o=n.apply(this,arguments);return function(e,t){if(t&&("object"===y(t)||"function"===typeof t))return t;if(void 0!==t)throw new TypeError("Derived constructors may only return object or undefined");return w(e)}(this,o)}}function w(e){if(void 0===e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e}function O(e){return(O=Object.setPrototypeOf?Object.getPrototypeOf:function(e){return e.__proto__||Object.getPrototypeOf(e)})(e)}function j(e,t,o){return t in e?Object.defineProperty(e,t,{value:o,enumerable:!0,configurable:!0,writable:!0}):e[t]=o,e}var B=g(f.Helmet,{},void 0,g("title",{},void 0,"News By Tag")),_=g("div",{className:"lg:w-1/4"},void 0,g(b.a,{}),g(p.a,{cat_id:"5e50eeb43a2d6e0439d7d307",size:4}),g(p.a,{cat_id:"5d8776d06632a20550bc4916",size:4})),k=function(e){!function(e,t){if("function"!==typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function");e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,writable:!0,configurable:!0}}),t&&v(e,t)}(c,a.a.Component);var t,o,n,r=h(c);function c(){var e;!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,c);for(var t=arguments.length,o=new Array(t),n=0;n<t;n++)o[n]=arguments[n];return j(w(e=r.call.apply(r,[this].concat(o))),"handlePagination",function(t){e.props.loadBlogListRequest({key:e.props.match.params.tag,value:t})}),j(w(e),"handleLoadMore",function(t){e.props.loadMoreBlogByTagRequest({key:e.props.match.params.tag,value:t})}),e}return t=c,(o=[{key:"componentDidMount",value:function(){window.scrollTo(0,0),this.props.loadRecentBlogsRequest(),this.props.match.params.tag&&this.props.loadBlogByTagRequest({key:this.props.match.params.tag,value:""})}},{key:"render",value:function(){var e=this.props,t=e.blogByTag,o=t.data,n=t.page,r=t.size,c=t.totaldata,i=e.loading,l=e.match.params.tag,f=e.loading_more,u={page:n,size:r,totaldata:c};return g(a.a.Fragment,{},void 0,B,g("div",{className:"container mx-auto pt-10"},void 0,g("h1",{className:"pb-5 mb-0 border-b border-gray-300 text-black text-4xl font-light font-mukta"},void 0,l)),g("div",{className:"container mx-auto py-10"},void 0,g("div",{className:"lg:flex flex-wrap"},void 0,g("div",{className:"lg:w-3/4 lg:pr-10"},void 0,g(s.a,{loading:i,currentBlogs:o,pagination:u,handlePagination:this.handlePagination,loading_more:f,handleLoadMore:this.handleLoadMore})),_)))}}])&&m(t.prototype,o),n&&m(t,n),c}(),P=Object(c.b)({blogByTag:Object(u.e)(),loading:Object(u.o)(),query:Object(u.s)(),loading_more:Object(u.q)()}),R=Object(l.connect)(P,d);t.default=Object(i.compose)(R)(k)}}]);
=======
(window.webpackJsonp=window.webpackJsonp||[]).push([[285],{"851e532bbc30d06231fb":function(e,t,o){"use strict";o.r(t),o.d(t,"BlogsByTag",function(){return k});var n,r=o("8af190b70a6bc55c6f1b"),a=o.n(r),c=(o("8a2d1b95e05b6a321e74"),o("a28fc3c963a1d4d1a2e5")),i=o("ab4cb61bcb2dc161defb"),l=o("d7dd51e1bf6bfc2c9c3d"),f=o("0d7f0986bcd2f33d8a2a"),u=o("d1202e14c140717996f9"),d=o("38359d538de7aa978707"),s=o("dbd498bca2a2e0a98992"),p=(o("5adf6a858e3edfde9879"),o("32041351ebfa9f4f4fc6"),o("7ce8755415f79474d986")),b=o("202972bcc205b94a4b99");function y(e){return(y="function"===typeof Symbol&&"symbol"===typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"===typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(e)}function g(e,t,o,r){n||(n="function"===typeof Symbol&&Symbol.for&&Symbol.for("react.element")||60103);var a=e&&e.defaultProps,c=arguments.length-3;if(t||0===c||(t={children:void 0}),1===c)t.children=r;else if(c>1){for(var i=new Array(c),l=0;l<c;l++)i[l]=arguments[l+3];t.children=i}if(t&&a)for(var f in a)void 0===t[f]&&(t[f]=a[f]);else t||(t=a||{});return{$$typeof:n,type:e,key:void 0===o?null:""+o,ref:null,props:t,_owner:null}}function m(e,t){for(var o=0;o<t.length;o++){var n=t[o];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,n.key,n)}}function v(e,t){return(v=Object.setPrototypeOf||function(e,t){return e.__proto__=t,e})(e,t)}function h(e){var t=function(){if("undefined"===typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"===typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],function(){})),!0}catch(e){return!1}}();return function(){var o,n=O(e);if(t){var r=O(this).constructor;o=Reflect.construct(n,arguments,r)}else o=n.apply(this,arguments);return function(e,t){if(t&&("object"===y(t)||"function"===typeof t))return t;if(void 0!==t)throw new TypeError("Derived constructors may only return object or undefined");return w(e)}(this,o)}}function w(e){if(void 0===e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e}function O(e){return(O=Object.setPrototypeOf?Object.getPrototypeOf:function(e){return e.__proto__||Object.getPrototypeOf(e)})(e)}function j(e,t,o){return t in e?Object.defineProperty(e,t,{value:o,enumerable:!0,configurable:!0,writable:!0}):e[t]=o,e}var B=g(f.Helmet,{},void 0,g("title",{},void 0,"News By Tag")),_=g("div",{className:"lg:w-1/4"},void 0,g(b.a,{}),g(p.a,{cat_id:"5e50eeb43a2d6e0439d7d307",size:4}),g(p.a,{cat_id:"5d8776d06632a20550bc4916",size:4})),k=function(e){!function(e,t){if("function"!==typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function");e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,writable:!0,configurable:!0}}),t&&v(e,t)}(c,a.a.Component);var t,o,n,r=h(c);function c(){var e;!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,c);for(var t=arguments.length,o=new Array(t),n=0;n<t;n++)o[n]=arguments[n];return j(w(e=r.call.apply(r,[this].concat(o))),"handlePagination",function(t){e.props.loadBlogListRequest({key:e.props.match.params.tag,value:t})}),j(w(e),"handleLoadMore",function(t){e.props.loadMoreBlogByTagRequest({key:e.props.match.params.tag,value:t})}),e}return t=c,(o=[{key:"componentDidMount",value:function(){window.scrollTo(0,0),this.props.loadRecentBlogsRequest(),this.props.match.params.tag&&this.props.loadBlogByTagRequest({key:this.props.match.params.tag,value:""})}},{key:"render",value:function(){var e=this.props,t=e.blogByTag,o=t.data,n=t.page,r=t.size,c=t.totaldata,i=e.loading,l=e.match.params.tag,f=e.loading_more,u={page:n,size:r,totaldata:c};return g(a.a.Fragment,{},void 0,B,g("div",{className:"container mx-auto pt-10"},void 0,g("h1",{className:"pb-5 mb-0 border-b border-gray-300 text-black text-4xl font-light font-mukta"},void 0,l)),g("div",{className:"container mx-auto py-10"},void 0,g("div",{className:"lg:flex flex-wrap"},void 0,g("div",{className:"lg:w-3/4 lg:pr-10"},void 0,g(s.a,{loading:i,currentBlogs:o,pagination:u,handlePagination:this.handlePagination,loading_more:f,handleLoadMore:this.handleLoadMore})),_)))}}])&&m(t.prototype,o),n&&m(t,n),c}(),P=Object(c.b)({blogByTag:Object(u.e)(),loading:Object(u.o)(),query:Object(u.s)(),loading_more:Object(u.q)()}),R=Object(l.connect)(P,d);t.default=Object(i.compose)(R)(k)}}]);
>>>>>>> 41f64895ae2d4aeb7736fd90e084d7a063de2675:client/build/285.4481cc20452defa4d5c5.chunk.js
