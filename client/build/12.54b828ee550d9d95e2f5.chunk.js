(window.webpackJsonp=window.webpackJsonp||[]).push([[12],{"0f86b087a0b4fb7b3870":function(e,t,a){"use strict";var r,i=a("8af190b70a6bc55c6f1b"),o=a.n(i),n=(a("8a2d1b95e05b6a321e74"),a("ab4cb61bcb2dc161defb")),c=a("d7dd51e1bf6bfc2c9c3d"),l=a("a28fc3c963a1d4d1a2e5"),s=a("3aced5b508e7389026da"),d=a("da010f21fea25912dd9e"),m=a.n(d),f=a("e95a63b25fb92ed15721"),b=a("fcb99a06256635f70435"),u=a("a72b40110d9c31c9b5c5"),v=a("6542cd13fd5dd1bcffd4"),g=(a("f38849b18acdbab88add"),a("4eb511d9a64ab0c04e06"),a("3d1527feb3c69784948c")),p=a.n(g),h=a("797667b9df439e060f2a"),y=a.n(h),x=a("a9db75321692539513f7"),w=a.n(x);function N(e,t){var a=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter(function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable})),a.push.apply(a,r)}return a}function O(e){for(var t=1;t<arguments.length;t++){var a=null!=arguments[t]?arguments[t]:{};t%2?N(Object(a),!0).forEach(function(t){j(e,t,a[t])}):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(a)):N(Object(a)).forEach(function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(a,t))})}return e}function j(e,t,a){return t in e?Object.defineProperty(e,t,{value:a,enumerable:!0,configurable:!0,writable:!0}):e[t]=a,e}function k(){return(k=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var a=arguments[t];for(var r in a)Object.prototype.hasOwnProperty.call(a,r)&&(e[r]=a[r])}return e}).apply(this,arguments)}function _(e,t,a,i){r||(r="function"===typeof Symbol&&Symbol.for&&Symbol.for("react.element")||60103);var o=e&&e.defaultProps,n=arguments.length-3;if(t||0===n||(t={children:void 0}),1===n)t.children=i;else if(n>1){for(var c=new Array(n),l=0;l<n;l++)c[l]=arguments[l+3];t.children=c}if(t&&o)for(var s in o)void 0===t[s]&&(t[s]=o[s]);else t||(t=o||{});return{$$typeof:r,type:e,key:void 0===a?null:""+a,ref:null,props:t,_owner:null}}var S=_("i",{className:"material-icons"},void 0," keyboard_arrow_right ");function Y(e){var t=e.className,a=(e.style,e.onClick);return _("div",{className:"".concat(t," arrow-next"),onClick:a},void 0,S)}var P=_("i",{className:"material-icons"},void 0," keyboard_arrow_left ");function D(e){var t=e.className,a=(e.style,e.onClick);return _("div",{className:"".concat(t," arrow-prev"),onClick:a},void 0,P)}var M=_(Y,{}),T=_(D,{}),L=_("div",{}),E=_("span",{className:"bg-secondary w-8 h-8 rounded-full inline-flex items-center justify-center"},void 0,_("img",{className:"h-4",src:p.a})),A=_("img",{className:"hidden mr-2 clock",src:y.a}),C=_("span",{className:"bg-secondary w-8 h-8 rounded-full inline-flex items-center justify-center"},void 0,_("img",{className:"h-4",src:p.a})),$=_("img",{className:"hidden mr-2 clock",src:y.a}),z=Object(l.b)({latestBlogs:Object(v.d)(),loading:Object(v.b)()}),B=Object(c.connect)(z,O(O({},u),{},{push:s.push}));t.a=Object(n.compose)(B)(function(e){var t=e.cat_id,a=e.latestBlogs,r=e.loading,n=e.size,c=(e.push,e.slider);Object(i.useEffect)(function(){e.loadLatestBlogsRequest({key:t,value:n})},[t]);var l=a[t]&&a[t].category&&a[t].category.title||!1,s=l?{equalizeHeight:!0,dots:!1,adaptiveHeight:!1,infinite:!0,speed:500,slidesToScroll:1,slidesToShow:4,nextArrow:M,prevArrow:T,responsive:[{breakpoint:1024,settings:{slidesToShow:3,slidesToScroll:1}},{breakpoint:600,settings:{slidesToShow:1,slidesToScroll:1,initialSlide:2,centerMode:!0,centerPadding:"0 20px"}}]}:{dots:!1,infinite:!0,speed:500,slidesToShow:5,slidesToScroll:3};try{s&&"string"===typeof s&&(s=JSON.parse(s))}catch(e){console.log(e)}return!l&&r?L:o.a.createElement(o.a.Fragment,null,_("div",{className:"flex items-center pb-9 pt-12 headline"},void 0,_("h2",{className:"font-mukta text-primary text-3xl lg:text-4xl mb-0"},void 0,a[t]&&a[t].category&&a[t].category.title),_(f.Link,{className:"bg-secondary text-xl w-7 h-7 rounded-full text-white ml-10 relative chevron-right",to:"/news/category/".concat(a[t]&&a[t].category&&a[t].category.slug_url)},void 0,_("i",{className:"material-icons",style:{fontSize:24}},void 0,"chevron_right"))),c&&o.a.createElement(w.a,k({},s,{className:"article-group -mx-2"}),a[t]&&a[t].blogs&&a[t].blogs.map(function(e,t){return _("div",{className:"px-2 pb-5 mb-5 border-b md:border-0 h-full item-".concat(t+1)},e._id,_("div",{className:"article-container bg-gray-100 h-full"},void 0,_("div",{className:"article-img-container"},void 0,_(f.Link,{to:"/news/".concat(m()(e.added_at).format("YYYY/MM/DD"),"/").concat(e._id)},void 0,_("img",{src:"".concat(b.g).concat(e&&e.image&&e.image.path),className:"object-cover article-img",alt:"".concat(e.title)}))),_("div",{className:"p-4 textpart"},void 0,_(f.Link,{to:"/news/".concat(m()(e.added_at).format("YYYY/MM/DD"),"/").concat(e._id),className:"text-xl leading-normal hover:text-secondary pointer no-underline article-title font-mukta font-bold md:font-normal"},void 0,e.title),_("p",{className:"hidden font-mukta-regular text-lg md:text-xl short-description"},void 0,e.short_description),_("div",{},void 0,_("div",{className:"inline-flex items-center hidden mt-3 mr-8 author"},void 0,E,_("span",{className:"text-gray-800 text-sm sans-serif author-name ml-3"},void 0,e.author&&e.author.map(function(e){return e.name}))),_("div",{className:"inline-flex items-center text-gray-600 md:text-gray-800 text-sm sans-serif mt-3 article-date"},void 0,A,m()(e.published_on).fromNow())))))})),!c&&_("div",{className:"article-group -mx-2"},void 0,a[t]&&a[t].blogs&&a[t].blogs.map(function(e,t){return _("div",{className:"px-2 pb-5 mb-5 border-b md:border-0 h-full item-".concat(t+1)},e._id,_("div",{className:"article-container bg-gray-100 h-full"},void 0,_("div",{className:"article-img-container"},void 0,_(f.Link,{to:"/news/".concat(m()(e.added_at).format("YYYY/MM/DD"),"/").concat(e._id)},void 0,_("img",{src:"".concat(b.g).concat(e&&e.image&&e.image.path),className:"object-cover article-img",alt:"".concat(e.title)}))),_("div",{className:"p-4 textpart"},void 0,_(f.Link,{to:"/news/".concat(m()(e.added_at).format("YYYY/MM/DD"),"/").concat(e._id),className:"text-xl leading-normal hover:text-secondary pointer no-underline article-title font-mukta font-bold md:font-normal"},void 0,e.title),_("p",{className:"hidden font-mukta-regular text-lg md:text-xl short-description"},void 0,e.short_description),_("div",{},void 0,_("div",{className:"inline-flex items-center hidden mt-3 mr-8 author"},void 0,C,_("span",{className:"text-gray-800 text-sm sans-serif author-name ml-3"},void 0,e.author&&e.author.map(function(e){return e.name}))),_("div",{className:"inline-flex items-center text-gray-600 md:text-gray-800 text-sm sans-serif mt-3 article-date"},void 0,$,m()(e.added_at).fromNow())))))})))})},f38849b18acdbab88add:function(e,t,a){"use strict";a("8af190b70a6bc55c6f1b");var r,i=a("985c51a45665c79c5a93"),o=a.n(i);function n(e,t,a,i){r||(r="function"===typeof Symbol&&Symbol.for&&Symbol.for("react.element")||60103);var o=e&&e.defaultProps,n=arguments.length-3;if(t||0===n||(t={children:void 0}),1===n)t.children=i;else if(n>1){for(var c=new Array(n),l=0;l<n;l++)c[l]=arguments[l+3];t.children=c}if(t&&o)for(var s in o)void 0===t[s]&&(t[s]=o[s]);else t||(t=o||{});return{$$typeof:r,type:e,key:void 0===a?null:""+a,ref:null,props:t,_owner:null}}n(o.a,{height:20,width:300}),n("div",{className:"max-w-none object-cover article-img"},void 0,n(o.a,{height:300,className:"max-w-none object-cover article-img"})),n(o.a,{height:10,width:100}),n(o.a,{height:10,width:150}),n(o.a,{height:8,count:4,width:150})}}]);