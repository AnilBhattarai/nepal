<<<<<<< HEAD:client/build/292.a3a41242ae949cc94647.chunk.js
(window.webpackJsonp=window.webpackJsonp||[]).push([[292],{d3a8caf016599e97dad0:function(e,i,t){"use strict";t.r(i),t.d(i,"FeaturedProperty",function(){return R});var a,r=t("8af190b70a6bc55c6f1b"),c=t.n(r),o=(t("8a2d1b95e05b6a321e74"),t("d7dd51e1bf6bfc2c9c3d")),d=t("a28fc3c963a1d4d1a2e5"),n=t("ab4cb61bcb2dc161defb"),s=t("3aced5b508e7389026da"),l=t("e95a63b25fb92ed15721"),b=(t("a9db75321692539513f7"),t("ce70702f00510b91ce1b"),t("c784142e265b98cc2572"),t("4a683f0a5e64e66a8eb9")),p=t.n(b),f=t("adc20f99e57c573c589c"),m=t("d95b0cf107403b178365"),u=t("213f142e77e601a9536d"),v=t("2739f02b110bb4e595d5"),g=t("c4150ca7ddd056ae677f"),y=t("36c61cf5002eef8bbac3"),w=t("447d6222128e08bbfc6d"),h=t.n(w),x=t("fcb99a06256635f70435");t("69d628cb25d9d920fd7f");function O(e,i){var t=Object.keys(e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);i&&(a=a.filter(function(i){return Object.getOwnPropertyDescriptor(e,i).enumerable})),t.push.apply(t,a)}return t}function _(e){for(var i=1;i<arguments.length;i++){var t=null!=arguments[i]?arguments[i]:{};i%2?O(Object(t),!0).forEach(function(i){N(e,i,t[i])}):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(t)):O(Object(t)).forEach(function(i){Object.defineProperty(e,i,Object.getOwnPropertyDescriptor(t,i))})}return e}function N(e,i,t){return i in e?Object.defineProperty(e,i,{value:t,enumerable:!0,configurable:!0,writable:!0}):e[i]=t,e}function j(e,i,t,r){a||(a="function"===typeof Symbol&&Symbol.for&&Symbol.for("react.element")||60103);var c=e&&e.defaultProps,o=arguments.length-3;if(i||0===o||(i={children:void 0}),1===o)i.children=r;else if(o>1){for(var d=new Array(o),n=0;n<o;n++)d[n]=arguments[n+3];i.children=d}if(i&&c)for(var s in c)void 0===i[s]&&(i[s]=c[s]);else i||(i=c||{});return{$$typeof:a,type:e,key:void 0===t?null:""+t,ref:null,props:i,_owner:null}}var k="featuredProperty",S=j("i",{className:"material-icons"},void 0,"keyboard_arrow_right");function P(e){var i=e.className,t=(e.style,e.onClick);return j("div",{className:"".concat(i," arrow-next"),onClick:t},void 0," ",S)}var T=j("i",{className:"material-icons"},void 0,"keyboard_arrow_left");function C(e){var i=e.className,t=(e.style,e.onClick);return j("div",{className:"".concat(i," arrow-prev"),onClick:t},void 0," ",T)}var A=j(P,{}),D=j(C,{}),E=j("div",{}),F=j("div",{className:"flex items-center justify-between"},void 0,j("h2",{className:"text-xl lg:text-3xl uppercase font-medium"},void 0,"Featured Properties"),j(l.Link,{to:"/properties/featured",className:"w-10 h-10 inline-flex items-center justify-center shadow-lg rounded-full"},void 0,j("i",{class:"material-icons text-primary text-lg"},void 0,"chevron_right"))),L=j("i",{className:"material-icons text-secondary mt-px mr-2"},void 0,"location_on"),J=j("div",{}),R=function(e){var i=e.all.data,t=e.loading,a=e.loadAllRequest;Object(m.b)({key:k,reducer:g.a}),Object(f.b)({key:k,saga:y.a});Object(r.useEffect)(function(){a()},[]);var o=i&&i.properties?{dots:!1,adaptiveHeight:!1,infinite:!0,speed:500,slidesToScroll:1,slidesToShow:4,nextArrow:A,prevArrow:D,responsive:[{breakpoint:1024,settings:{slidesToShow:3,slidesToScroll:1}},{breakpoint:600,settings:{slidesToShow:1,slidesToScroll:1,initialSlide:2}}]}:{dots:!1,infinite:!0,speed:500,slidesToShow:1,slidesToScroll:3};try{o&&"string"===typeof o&&(o=JSON.parse(o))}catch(e){console.log(e)}return t&&!0===t?E:c.a.createElement(c.a.Fragment,null,i&&i.is_active&&i.properties.length?j("div",{className:"container mx-auto pt-16"},void 0,F,j("div",{className:"grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10 mt-6"},void 0,i&&i.properties?i.properties.map(function(e){return j("div",{className:"p-1"},"featuredProperty-".concat(e.id&&e.id._id),e.id&&j("div",{},void 0,j(l.Link,{className:"relative block overflow-hidden h-44 rounded-lg",to:"/detail/".concat(e.id.slug_url)},void 0,j("img",{src:e.id.media&&e.id.media.images&&e.id.media.images[0]&&e.id.media.images[0].id?"".concat(x.g).concat(e.id.media.images[0].id.path.replace("public/","public/600-300/")):h.a,loading:"lazy",className:"object-cover",alt:e.id.basic.title})),j("h3",{},void 0,j(l.Link,{className:"text-base hover:text-primary mt-8 block",to:"/detail/".concat(e.id.slug_url)},void 0,e.id.basic.title?e.id.basic.title:"Title")),j("div",{className:"flex items-center mt-4"},void 0,j("p",{className:"text-sm text-black opacity-70 flex-1 flex"},void 0,L,e.id.address&&e.id.address.area_id?e.id.address.area_id.name:"Area",", ",e.id.address&&e.id.address.city_id?e.id.address.city_id.name:"City"),e.id.basic&&e.id.basic.property_purpose&&j("button",{disabled:!0,className:"ml-4 rounded text-sm font-bold px-2 py-1 text-white ".concat("Rent"===e.id.basic.property_purpose.title?"bg-warning":"bg-success"," ")},void 0,e.id.basic.property_purpose.title)),j("p",{className:"font-bold text-lg text-primary mt-4"},void 0,e.id.price&&!e.id.price.is_price_on_call?c.a.createElement(c.a.Fragment,null," ","Rs.",Intl.NumberFormat("en-IN",{maximumSignificantDigits:3}).format(e.id.price.value)," "," ",j("span",{className:"text-sm"},void 0," ","(",e.id.price.label.title,")")):"Price On Call"),e.id.agency_id?j(l.Link,{className:"pb-2 text-xs font-bold text-gray-600 italic opacity-50 mt-2 inline-block",to:"/agent/".concat(e.id.agency_id._id),target:"_blank"},void 0,"By: ",e.id.agency_id.title):null))}):J)):null)},I=Object(d.b)({all:Object(v.a)(),loading:Object(v.b)()}),$=Object(o.connect)(I,_(_({},u),{},{push:s.push})),q=p()(function(e){return{button:{margin:e.spacing.unit}}});i.default=Object(n.compose)(q,$,r.memo)(R)}}]);
=======
(window.webpackJsonp=window.webpackJsonp||[]).push([[296],{d3a8caf016599e97dad0:function(e,i,t){"use strict";t.r(i),t.d(i,"FeaturedProperty",function(){return R});var a,r=t("8af190b70a6bc55c6f1b"),c=t.n(r),o=(t("8a2d1b95e05b6a321e74"),t("d7dd51e1bf6bfc2c9c3d")),d=t("a28fc3c963a1d4d1a2e5"),n=t("ab4cb61bcb2dc161defb"),s=t("3aced5b508e7389026da"),l=t("e95a63b25fb92ed15721"),b=(t("a9db75321692539513f7"),t("ce70702f00510b91ce1b"),t("c784142e265b98cc2572"),t("4a683f0a5e64e66a8eb9")),p=t.n(b),f=t("adc20f99e57c573c589c"),m=t("d95b0cf107403b178365"),u=t("213f142e77e601a9536d"),v=t("2739f02b110bb4e595d5"),g=t("c4150ca7ddd056ae677f"),y=t("36c61cf5002eef8bbac3"),w=t("447d6222128e08bbfc6d"),h=t.n(w),x=t("fcb99a06256635f70435");t("69d628cb25d9d920fd7f");function O(e,i){var t=Object.keys(e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);i&&(a=a.filter(function(i){return Object.getOwnPropertyDescriptor(e,i).enumerable})),t.push.apply(t,a)}return t}function _(e){for(var i=1;i<arguments.length;i++){var t=null!=arguments[i]?arguments[i]:{};i%2?O(Object(t),!0).forEach(function(i){N(e,i,t[i])}):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(t)):O(Object(t)).forEach(function(i){Object.defineProperty(e,i,Object.getOwnPropertyDescriptor(t,i))})}return e}function N(e,i,t){return i in e?Object.defineProperty(e,i,{value:t,enumerable:!0,configurable:!0,writable:!0}):e[i]=t,e}function j(e,i,t,r){a||(a="function"===typeof Symbol&&Symbol.for&&Symbol.for("react.element")||60103);var c=e&&e.defaultProps,o=arguments.length-3;if(i||0===o||(i={children:void 0}),1===o)i.children=r;else if(o>1){for(var d=new Array(o),n=0;n<o;n++)d[n]=arguments[n+3];i.children=d}if(i&&c)for(var s in c)void 0===i[s]&&(i[s]=c[s]);else i||(i=c||{});return{$$typeof:a,type:e,key:void 0===t?null:""+t,ref:null,props:i,_owner:null}}var k="featuredProperty",S=j("i",{className:"material-icons"},void 0,"keyboard_arrow_right");function P(e){var i=e.className,t=(e.style,e.onClick);return j("div",{className:"".concat(i," arrow-next"),onClick:t},void 0," ",S)}var T=j("i",{className:"material-icons"},void 0,"keyboard_arrow_left");function C(e){var i=e.className,t=(e.style,e.onClick);return j("div",{className:"".concat(i," arrow-prev"),onClick:t},void 0," ",T)}var A=j(P,{}),D=j(C,{}),E=j("div",{}),F=j("div",{className:"flex items-center justify-between"},void 0,j("h2",{className:"text-xl lg:text-3xl uppercase font-medium"},void 0,"Featured Properties"),j(l.Link,{to:"/properties/featured",className:"w-10 h-10 inline-flex items-center justify-center shadow-lg rounded-full"},void 0,j("i",{class:"material-icons text-primary text-lg"},void 0,"chevron_right"))),L=j("i",{className:"material-icons text-secondary mt-px mr-2"},void 0,"location_on"),J=j("div",{}),R=function(e){var i=e.all.data,t=e.loading,a=e.loadAllRequest;Object(m.b)({key:k,reducer:g.a}),Object(f.b)({key:k,saga:y.a});Object(r.useEffect)(function(){a()},[]);var o=i&&i.properties?{dots:!1,adaptiveHeight:!1,infinite:!0,speed:500,slidesToScroll:1,slidesToShow:4,nextArrow:A,prevArrow:D,responsive:[{breakpoint:1024,settings:{slidesToShow:3,slidesToScroll:1}},{breakpoint:600,settings:{slidesToShow:1,slidesToScroll:1,initialSlide:2}}]}:{dots:!1,infinite:!0,speed:500,slidesToShow:1,slidesToScroll:3};try{o&&"string"===typeof o&&(o=JSON.parse(o))}catch(e){console.log(e)}return t&&!0===t?E:c.a.createElement(c.a.Fragment,null,i&&i.is_active&&i.properties.length?j("div",{className:"container mx-auto pt-16"},void 0,F,j("div",{className:"grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10 mt-6"},void 0,i&&i.properties?i.properties.map(function(e){return j("div",{className:"p-1"},"featuredProperty-".concat(e.id&&e.id._id),e.id&&j("div",{},void 0,j(l.Link,{className:"relative block overflow-hidden h-44 rounded-lg",to:"/detail/".concat(e.id.slug_url)},void 0,j("img",{src:e.id.media&&e.id.media.images&&e.id.media.images[0]&&e.id.media.images[0].id?"".concat(x.g).concat(e.id.media.images[0].id.path.replace("public/","public/600-300/")):h.a,loading:"lazy",className:"object-cover",alt:e.id.basic.title})),j("h3",{},void 0,j(l.Link,{className:"text-base hover:text-primary mt-8 block",to:"/detail/".concat(e.id.slug_url)},void 0,e.id.basic.title?e.id.basic.title:"Title")),j("div",{className:"flex items-center mt-4"},void 0,j("p",{className:"text-sm text-black opacity-70 flex-1 flex"},void 0,L,e.id.address&&e.id.address.area_id?e.id.address.area_id.name:"Area",", ",e.id.address&&e.id.address.city_id?e.id.address.city_id.name:"City"),e.id.basic&&e.id.basic.property_purpose&&j("button",{disabled:!0,className:"ml-4 rounded text-sm font-bold px-2 py-1 text-white ".concat("Rent"===e.id.basic.property_purpose.title?"bg-warning":"bg-success"," ")},void 0,e.id.basic.property_purpose.title)),j("p",{className:"font-bold text-lg text-primary mt-4"},void 0,e.id.price&&!e.id.price.is_price_on_call?c.a.createElement(c.a.Fragment,null," ","Rs.",Intl.NumberFormat("en-IN",{maximumSignificantDigits:3}).format(e.id.price.value)," "," ",j("span",{className:"text-sm"},void 0," ","(",e.id.price.label.title,")")):"Price On Call"),e.id.agency_id?j(l.Link,{className:"pb-2 text-xs font-bold text-gray-600 italic opacity-50 mt-2 inline-block",to:"/agent/".concat(e.id.agency_id._id),target:"_blank"},void 0,"By: ",e.id.agency_id.title):null))}):J)):null)},I=Object(d.b)({all:Object(v.a)(),loading:Object(v.b)()}),$=Object(o.connect)(I,_(_({},u),{},{push:s.push})),q=p()(function(e){return{button:{margin:e.spacing.unit}}});i.default=Object(n.compose)(q,$,r.memo)(R)}}]);
>>>>>>> 41f64895ae2d4aeb7736fd90e084d7a063de2675:client/build/296.73df640ab164231e2391.chunk.js