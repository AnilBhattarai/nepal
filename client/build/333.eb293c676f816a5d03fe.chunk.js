(window.webpackJsonp=window.webpackJsonp||[]).push([[333],{"5b57db1225173b3db231":function(e,t,a){"use strict";a.r(t);var r={};a.r(r),a.d(r,"loadAllRequest",function(){return j}),a.d(r,"loadAllSuccess",function(){return x}),a.d(r,"loadAllFailure",function(){return w});var i=a("4a683f0a5e64e66a8eb9"),n=a.n(i),o=a("3aced5b508e7389026da"),l=(a("8a2d1b95e05b6a321e74"),a("8af190b70a6bc55c6f1b")),c=a.n(l),s=a("d7dd51e1bf6bfc2c9c3d"),d=a("e95a63b25fb92ed15721"),u=a("a9db75321692539513f7"),p=a.n(u),b=a("ab4cb61bcb2dc161defb"),m=a("a28fc3c963a1d4d1a2e5"),f=(a("c784142e265b98cc2572"),a("ce70702f00510b91ce1b"),a("d95b0cf107403b178365")),g=a("adc20f99e57c573c589c"),v=a("447d6222128e08bbfc6d"),_=a.n(v),y=a("fcb99a06256635f70435"),h="app/Projects/LOAD_ALL_REQUEST",j=function(e){return{type:h,payload:e}},x=function(e){return{type:"app/Projects/LOAD_ALL_SUCCESS",payload:e}},w=function(e){return{type:"app/Projects/LOAD_ALL_FAILURE",payload:e}},O=a("7edf83707012a871cdfb"),k={all:{data:[],page:1,size:10,totaldata:0},one:{basic:{title:"",description:"",slug_url:"",projects_purpose:{title:""},projects_type:{title:""},projects_category:{title:""}},address:{state_id:{state_name:""},district_id:{district_name:""},city_id:{municipality_name:""},area_id:{area_name:""},house_no:""},location_projects:{total_area_unit:{title:""},total_area:"",built_area:"",built_area_unit:{title:""},projects_face:{title:""},road_access_value:0,road_access_length_unit:{title:""},road_access_road_type:{title:""}},building:{built_year:0,built_month:0,calender_type:"",total_floor:0,furnishing:"",no_of:{kitchen:1,dinningroom:1,bedroom:1,bathroom:1,hall:1},parking:"",amenities:[]},media:{images:[],youtube_video_id:""},price:{value:0,currency:{title:""},label:{title:""}},is_active:!1,is_featured:!1,is_premium:!1,is_negotiable:!1,tags:[]},loading:!1},N=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:k,t=arguments.length>1?arguments[1]:void 0;return Object(O.a)(e,function(e){switch(t.type){case h:e.loading=!0;break;case"app/Projects/LOAD_ALL_FAILURE":e.loading=!1;break;case"app/Projects/LOAD_ALL_SUCCESS":e.all=t.payload,e.loading=!1}})},S=a("d782b72bc5b680c7122c"),A=a("6144be5eac76f277117a"),L=a("6542cd13fd5dd1bcffd4"),P=(a("a72b40110d9c31c9b5c5"),regeneratorRuntime.mark(D)),E=regeneratorRuntime.mark(F);function D(){var e;return regeneratorRuntime.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,Object(S.select)(Object(L.j)());case 2:return e=t.sent,t.next=5,Object(S.call)(A.a.get("property/public/project",x,w,e));case 5:case"end":return t.stop()}},P)}function F(){return regeneratorRuntime.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,Object(S.takeLatest)(h,D);case 2:case"end":return e.stop()}},E)}var R,C=function(e){return e.projects||k};function T(e,t){var a=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter(function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable})),a.push.apply(a,r)}return a}function I(e){for(var t=1;t<arguments.length;t++){var a=null!=arguments[t]?arguments[t]:{};t%2?T(Object(a),!0).forEach(function(t){U(e,t,a[t])}):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(a)):T(Object(a)).forEach(function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(a,t))})}return e}function U(e,t,a){return t in e?Object.defineProperty(e,t,{value:a,enumerable:!0,configurable:!0,writable:!0}):e[t]=a,e}function z(e,t,a,r){R||(R="function"===typeof Symbol&&Symbol.for&&Symbol.for("react.element")||60103);var i=e&&e.defaultProps,n=arguments.length-3;if(t||0===n||(t={children:void 0}),1===n)t.children=r;else if(n>1){for(var o=new Array(n),l=0;l<n;l++)o[l]=arguments[l+3];t.children=o}if(t&&i)for(var c in i)void 0===t[c]&&(t[c]=i[c]);else t||(t=i||{});return{$$typeof:R,type:e,key:void 0===a?null:""+a,ref:null,props:t,_owner:null}}a.d(t,"Projects",function(){return X});var J="projects",q=z("i",{className:"material-icons text-2xl"},void 0,"keyboard_arrow_right");function $(e){e.className,e.style;return z("div",{className:"mr-4 absolute right-0 top-0 -mt-16 bg-white w-9 h-9 rounded-full inline-flex items-center justify-center cursor-pointer text-gray-500 hover:text-primary shadow-lg",onClick:e.onClick},void 0," ",q)}var B=z("i",{className:"material-icons text-2xl"},void 0,"keyboard_arrow_left");function H(e){e.className,e.style;return z("div",{className:"mr-16 absolute right-0 top-0 -mt-16 bg-white w-9 h-9 rounded-full inline-flex items-center justify-center cursor-pointer text-gray-500 hover:text-primary shadow-lg",onClick:e.onClick},void 0," ",B)}var Q=z($,{}),G=z(H,{}),K=z("div",{className:"w-1/3 relative hidden lg:block"},void 0,z("img",{alt:"featured projects",className:"absolute right-0 top-0 max-w-none h-full",loading:"lazy",src:"https://www.nepalhomes.com/public/files/C5AEF5FDA400751-bg-project.jpg"})),M=z("h2",{},void 0,z("span",{className:"leading-none block font-bold text-xl lg:text-2xl text-gray-300"},void 0,"Projects")," ",z("span",{className:"leading-none text-4xl lg:text-6xl uppercase font-black"},void 0,"Featured")),V=z("span",{},void 0," per "),W=z("div",{}),X=function(e){var t=e.all,a=t.data,r=(t.page,t.size,t.totaldata,e.loading,e.loadAllRequest);e.classes,e.push;Object(f.a)({key:J,reducer:N}),Object(g.a)({key:J,saga:F}),Object(l.useEffect)(function(){r()},[]);var i=a&&a.length?{dots:!1,adaptiveHeight:!1,infinite:!0,speed:500,slidesToScroll:1,slidesToShow:4,nextArrow:Q,prevArrow:G,responsive:[{breakpoint:1024,settings:{slidesToShow:3,slidesToScroll:1}},{breakpoint:600,settings:{slidesToShow:1,slidesToScroll:1,initialSlide:2}}]}:{dots:!1,infinite:!0,speed:500,slidesToShow:1,slidesToScroll:3};try{i&&"string"===typeof i&&(i=JSON.parse(i))}catch(e){console.log(e)}return c.a.createElement(c.a.Fragment,null,a&&a.length>3?z("div",{className:"bg-blue-50"},void 0,z("div",{className:"container mx-auto lg:flex"},void 0,K,z("div",{className:"lg:w-2/3 lg:pl-10 py-20"},void 0,M,z("div",{className:"relative mt-6 multiSlider leftAlign lg:-ml-64 imagezoom "},void 0,c.a.createElement(p.a,i,a&&a.length?a.map(function(e){return z("div",{className:"px-2"},"projects-".concat(e&&e._id),z("div",{className:"relative bg-white shadow h-full rounded-lg overflow-hidden"},void 0,z("div",{className:"relative block h-40 overflow-hidden"},void 0,z(d.Link,{to:"/project/".concat(e.slug_url)},void 0,z("img",{src:e.media&&e.media.images&&e.media.images[0]&&e.media.images[0].id?"".concat(y.g).concat(e.media.images[0].id.path.replace("public/","public/600-300/")):_.a,className:"w-full h-full object-cover",alt:e.basic.title}))),z("div",{className:"px-2"},void 0,z("h3",{},void 0,z(d.Link,{className:"text-base hover:text-primary mt-4 block",to:"/project/".concat(e.slug_url)},void 0,e.basic.title?e.basic.title:"Title")),z("p",{className:"text-xs text-black opacity-50 font-bold flex-1 flex"},void 0,e.address&&e.address.area_id?e.address.area_id.name:"Area",", ",e.address&&e.address.city_id?e.address.city_id.name:"City"),e.range&&c.a.createElement(c.a.Fragment,null,z("p",{className:"py-2 text-base font-bold text-primary"},void 0,"Rs.",e.range&&e.range.from?c.a.createElement(c.a.Fragment,null,Intl.NumberFormat("en-IN",{maximumSignificantDigits:3}).format(e.range.from)):""," - ","Rs.",e.range&&e.range.to?c.a.createElement(c.a.Fragment,null,Intl.NumberFormat("en-IN",{maximumSignificantDigits:3}).format(e.range.to)):"",e.range&&e.range.unit?V:"",e.range&&e.range.unit?e.range.unit:"")),e.unit_count&&z("span",{className:"inline-block rounded border-2 border-gray-300 px-2 py-1 text-sm"},void 0,e.unit_count," Properties"),z("div",{}),z("div",{className:"clearfix mt-2"},void 0,e.developer_id?z(d.Link,{className:"pb-2 text-xs font-bold text-gray-600 italic opacity-50 mt-2 inline-block",to:"/agent/".concat(e.developer_id._id),target:"_blank"},void 0,"By:"," ",e.developer_id?e.developer_id.name:"null"):null))))}):W))))):null)},Y=Object(m.b)({all:Object(m.a)(C,function(e){return e.all}),loading:Object(m.a)(C,function(e){return e.loading})}),Z=Object(s.connect)(Y,I(I({},r),{},{push:o.push})),ee=Object(f.a)({key:J,reducer:N}),te=Object(g.a)({key:J,saga:F}),ae=n()(function(e){return{button:{margin:e.spacing.unit}}});t.default=Object(b.compose)(ee,te,ae,Z,l.memo)(X)}}]);