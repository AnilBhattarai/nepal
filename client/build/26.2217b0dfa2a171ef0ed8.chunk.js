(window.webpackJsonp=window.webpackJsonp||[]).push([[26],{"202972bcc205b94a4b99":function(e,a,c){"use strict";c("8af190b70a6bc55c6f1b"),c("8a2d1b95e05b6a321e74");var t,o=c("ab4cb61bcb2dc161defb"),d=c("d7dd51e1bf6bfc2c9c3d"),n=c("e95a63b25fb92ed15721"),i=c("da010f21fea25912dd9e"),r=c.n(i),l=c("a28fc3c963a1d4d1a2e5"),b=c("d1202e14c140717996f9"),f=c("fcb99a06256635f70435"),s=(c("d18552f5bdcfec97967e"),c("797667b9df439e060f2a")),m=c.n(s),v=c("adc20f99e57c573c589c"),g=c("d95b0cf107403b178365"),u=c("749b8840cb97481d031d"),y=c("bc54c593d4abe0aa316c");function p(e,a,c,o){t||(t="function"===typeof Symbol&&Symbol.for&&Symbol.for("react.element")||60103);var d=e&&e.defaultProps,n=arguments.length-3;if(a||0===n||(a={children:void 0}),1===n)a.children=o;else if(n>1){for(var i=new Array(n),r=0;r<n;r++)i[r]=arguments[r+3];a.children=i}if(a&&d)for(var l in d)void 0===a[l]&&(a[l]=d[l]);else a||(a=d||{});return{$$typeof:t,type:e,key:void 0===c?null:""+c,ref:null,props:a,_owner:null}}var h=p("div",{}),w=p("div",{className:"bg-primary h-14 flex items-center pl-8 mb-4"},void 0,p("h2",{className:"font-mukta font-bold text-3xl text-white my-0"},void 0,"\u0924\u093e\u091c\u093e \u0905\u092a\u0921\u0947\u091f")),x=p("img",{className:"mr-2 clock",src:m.a});var k=Object(v.a)({key:"blogPage",saga:y.a}),N=Object(g.a)({key:"blogPage",reducer:u.a}),j=Object(l.b)({loading:Object(b.u)(),blogs:Object(b.t)()}),Y=Object(d.connect)(j);a.a=Object(o.compose)(N,k,Y)(function(e){return e.loading?h:p("div",{className:""},void 0,w,e.blogs.map(function(e){return p("div",{className:"flex py-4"},"recents-".concat(e._id),p("div",{className:"flex-1 mr-7"},void 0,p(n.Link,{className:"no-underline hover:text-secondary text-xl font-mukta block text-gray-700",to:"/news/".concat(r()(e.added_at).format("YYYY/MM/DD"),"/").concat(e._id)},void 0,e.title),p("div",{className:"inline-flex items-center text-gray-600 md:text-gray-800 text-sm sans-serif mt-3 article-date"},void 0,x,r()(e.added_at).fromNow())),p(n.Link,{className:"block overflow-hidden w-24 h-24 article-img-container",to:"/news/".concat(r()(e.added_at).format("YYYY/MM/DD"),"/").concat(e._id)},void 0,p("img",{src:"".concat(f.g).concat(e&&e.image&&e.image.path),alt:e.title,style:{width:"100%",height:"100%",objectFit:"cover"}})))}))})}}]);