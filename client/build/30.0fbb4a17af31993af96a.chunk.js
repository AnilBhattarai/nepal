<<<<<<< HEAD:client/build/30.0fbb4a17af31993af96a.chunk.js
(window.webpackJsonp=window.webpackJsonp||[]).push([[30],{dbd498bca2a2e0a98992:function(e,t,r){"use strict";var a,n=r("8af190b70a6bc55c6f1b"),o=r.n(n),c=(r("8a2d1b95e05b6a321e74"),r("d7dd51e1bf6bfc2c9c3d")),l=r("e95a63b25fb92ed15721"),i=r("ab4cb61bcb2dc161defb"),d=r("fcb99a06256635f70435"),f=r("da010f21fea25912dd9e"),u=r.n(f),b=r("a28fc3c963a1d4d1a2e5"),s=r("38359d538de7aa978707"),m=(r("a626055ef7da7edda522"),r("797667b9df439e060f2a")),p=r.n(m),y=r("adc20f99e57c573c589c"),g=r("d95b0cf107403b178365"),v=r("749b8840cb97481d031d"),h=r("bc54c593d4abe0aa316c");function w(e,t,r,n){a||(a="function"===typeof Symbol&&Symbol.for&&Symbol.for("react.element")||60103);var o=e&&e.defaultProps,c=arguments.length-3;if(t||0===c||(t={children:void 0}),1===c)t.children=n;else if(c>1){for(var l=new Array(c),i=0;i<c;i++)l[i]=arguments[i+3];t.children=l}if(t&&o)for(var d in o)void 0===t[d]&&(t[d]=o[d]);else t||(t=o||{});return{$$typeof:a,type:e,key:void 0===r?null:""+r,ref:null,props:t,_owner:null}}function O(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);t&&(a=a.filter(function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable})),r.push.apply(r,a)}return r}function j(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?O(Object(r),!0).forEach(function(t){x(e,t,r[t])}):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):O(Object(r)).forEach(function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))})}return e}function x(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}function N(e,t){return function(e){if(Array.isArray(e))return e}(e)||function(e,t){var r=null==e?null:"undefined"!==typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(null==r)return;var a,n,o=[],c=!0,l=!1;try{for(r=r.call(e);!(c=(a=r.next()).done)&&(o.push(a.value),!t||o.length!==t);c=!0);}catch(e){l=!0,n=e}finally{try{c||null==r.return||r.return()}finally{if(l)throw n}}return o}(e,t)||function(e,t){if(!e)return;if("string"===typeof e)return P(e,t);var r=Object.prototype.toString.call(e).slice(8,-1);"Object"===r&&e.constructor&&(r=e.constructor.name);if("Map"===r||"Set"===r)return Array.from(e);if("Arguments"===r||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r))return P(e,t)}(e,t)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function P(e,t){(null==t||t>e.length)&&(t=e.length);for(var r=0,a=new Array(t);r<t;r++)a[r]=e[r];return a}var k=w("div",{}),S=w("img",{className:"mr-2 clock",src:p.a}),A=w("div",{},void 0,"No News Found"),E=Object(y.a)({key:"blogPage",saga:h.a}),M=Object(g.a)({key:"blogPage",reducer:v.a}),_=Object(b.b)({}),D=Object(c.connect)(_,s);t.a=Object(i.compose)(M,E,D)(function(e){for(var t=e.currentBlogs,r=e.loading,a=e.pagination,c=(e.handlePagination,e.handleLoadMore),i=e.loading_more,f=(Math.ceil(a.totaldata/a.size),[]),b=1;b<=Math.ceil(a.totaldata/a.size);b++)f.push(b);var s=N(Object(n.useState)(0),2),m=s[0],p=s[1];Object(n.useEffect)(function(){window.scrollTo(0,m-140)},[i]);var y=Object(n.useRef)(null);return r?o.a.createElement(o.a.Fragment,null,k):t.length>0?o.a.createElement(o.a.Fragment,null,t.map(function(e,r){var a=e.image,n=e.title,c=(e.author,e.slug_url),i=(e.short_description,e.added_at),f=(e.tags,e._id);return w(l.Link,{className:"block pb-6 mb-6 border-b border-gray-300",to:"/news/".concat(u()(i).format("YYYY/MM/DD"),"/").concat(f)},c,o.a.createElement("div",{key:f,className:"flex article-container",ref:r===t.length-1?y:null},w("div",{className:"overflow-hidden h-20 md:h-48 w-24 md:w-64 article-image"},void 0,w("img",{className:"object-cover",src:a&&"".concat(d.g).concat(a.path),alt:"".concat(n)})),w("div",{className:"flex-1 px-4 md:px-10"},void 0,w("h2",{className:"text-xl md:text-3xl hover:text-secondary font-normal"},void 0,n),w("div",{className:"inline-flex items-center text-gray-600 md:text-gray-800 text-sm sans-serif mt-3 article-date"},void 0,S,u()(e.added_at).fromNow()))))}),w("div",{className:"flex clearfix w-full pagination "},void 0,i&&"....",t.length<a.totaldata&&w("button",{type:"button",className:"btn w-full border border-secondary bg-blue-100 mb-8 text-secondary mt-4",onClick:function(){console.log("called"),c(j(j({},a),{},{page:a.page+1}));var e=y.current.offsetTop;p(e)}},void 0,"Load More"))):A})}}]);
=======
(window.webpackJsonp=window.webpackJsonp||[]).push([[31],{dbd498bca2a2e0a98992:function(e,t,r){"use strict";var a,n=r("8af190b70a6bc55c6f1b"),o=r.n(n),c=(r("8a2d1b95e05b6a321e74"),r("d7dd51e1bf6bfc2c9c3d")),l=r("e95a63b25fb92ed15721"),i=r("ab4cb61bcb2dc161defb"),d=r("fcb99a06256635f70435"),f=r("da010f21fea25912dd9e"),u=r.n(f),b=r("a28fc3c963a1d4d1a2e5"),s=r("38359d538de7aa978707"),m=(r("a626055ef7da7edda522"),r("797667b9df439e060f2a")),p=r.n(m),y=r("adc20f99e57c573c589c"),g=r("d95b0cf107403b178365"),v=r("749b8840cb97481d031d"),h=r("bc54c593d4abe0aa316c");function w(e,t,r,n){a||(a="function"===typeof Symbol&&Symbol.for&&Symbol.for("react.element")||60103);var o=e&&e.defaultProps,c=arguments.length-3;if(t||0===c||(t={children:void 0}),1===c)t.children=n;else if(c>1){for(var l=new Array(c),i=0;i<c;i++)l[i]=arguments[i+3];t.children=l}if(t&&o)for(var d in o)void 0===t[d]&&(t[d]=o[d]);else t||(t=o||{});return{$$typeof:a,type:e,key:void 0===r?null:""+r,ref:null,props:t,_owner:null}}function O(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);t&&(a=a.filter(function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable})),r.push.apply(r,a)}return r}function j(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?O(Object(r),!0).forEach(function(t){x(e,t,r[t])}):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):O(Object(r)).forEach(function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))})}return e}function x(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}function N(e,t){return function(e){if(Array.isArray(e))return e}(e)||function(e,t){var r=null==e?null:"undefined"!==typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(null==r)return;var a,n,o=[],c=!0,l=!1;try{for(r=r.call(e);!(c=(a=r.next()).done)&&(o.push(a.value),!t||o.length!==t);c=!0);}catch(e){l=!0,n=e}finally{try{c||null==r.return||r.return()}finally{if(l)throw n}}return o}(e,t)||function(e,t){if(!e)return;if("string"===typeof e)return P(e,t);var r=Object.prototype.toString.call(e).slice(8,-1);"Object"===r&&e.constructor&&(r=e.constructor.name);if("Map"===r||"Set"===r)return Array.from(e);if("Arguments"===r||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r))return P(e,t)}(e,t)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function P(e,t){(null==t||t>e.length)&&(t=e.length);for(var r=0,a=new Array(t);r<t;r++)a[r]=e[r];return a}var k=w("div",{}),S=w("img",{className:"mr-2 clock",src:p.a}),A=w("div",{},void 0,"No News Found"),E=Object(y.a)({key:"blogPage",saga:h.a}),M=Object(g.a)({key:"blogPage",reducer:v.a}),_=Object(b.b)({}),D=Object(c.connect)(_,s);t.a=Object(i.compose)(M,E,D)(function(e){for(var t=e.currentBlogs,r=e.loading,a=e.pagination,c=(e.handlePagination,e.handleLoadMore),i=e.loading_more,f=(Math.ceil(a.totaldata/a.size),[]),b=1;b<=Math.ceil(a.totaldata/a.size);b++)f.push(b);var s=N(Object(n.useState)(0),2),m=s[0],p=s[1];Object(n.useEffect)(function(){window.scrollTo(0,m-140)},[i]);var y=Object(n.useRef)(null);return r?o.a.createElement(o.a.Fragment,null,k):t.length>0?o.a.createElement(o.a.Fragment,null,t.map(function(e,r){var a=e.image,n=e.title,c=(e.author,e.slug_url),i=(e.short_description,e.added_at),f=(e.tags,e._id);return w(l.Link,{className:"block pb-6 mb-6 border-b border-gray-300",to:"/news/".concat(u()(i).format("YYYY/MM/DD"),"/").concat(f)},c,o.a.createElement("div",{key:f,className:"flex article-container",ref:r===t.length-1?y:null},w("div",{className:"overflow-hidden h-20 md:h-48 w-24 md:w-64 article-image"},void 0,w("img",{className:"object-cover",src:a&&"".concat(d.g).concat(a.path),alt:"".concat(n)})),w("div",{className:"flex-1 px-4 md:px-10"},void 0,w("h2",{className:"text-xl md:text-3xl hover:text-secondary font-normal"},void 0,n),w("div",{className:"inline-flex items-center text-gray-600 md:text-gray-800 text-sm sans-serif mt-3 article-date"},void 0,S,u()(e.added_at).fromNow()))))}),w("div",{className:"flex clearfix w-full pagination "},void 0,i&&"....",t.length<a.totaldata&&w("button",{type:"button",className:"btn w-full border border-secondary bg-blue-100 mb-8 text-secondary mt-4",onClick:function(){console.log("called"),c(j(j({},a),{},{page:a.page+1}));var e=y.current.offsetTop;p(e)}},void 0,"Load More"))):A})}}]);
>>>>>>> 41f64895ae2d4aeb7736fd90e084d7a063de2675:client/build/31.a849aa599e4f7c009ded.chunk.js
