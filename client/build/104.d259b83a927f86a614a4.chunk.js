(window.webpackJsonp=window.webpackJsonp||[]).push([[104],{"0ab36a71b24a267e0eb9":function(t,e,n){"use strict";n.r(e),n.d(e,"loadAllRequest",function(){return a}),n.d(e,"loadAllSuccess",function(){return i}),n.d(e,"loadAllFailure",function(){return c}),n.d(e,"loadListingRequest",function(){return o}),n.d(e,"loadListingSuccess",function(){return u}),n.d(e,"loadListingFailure",function(){return d});var r=n("b8b549cb012324365428"),a=function(t){return{type:r.b,payload:t}},i=function(t){return{type:r.c,payload:t}},c=function(t){return{type:r.a,payload:t}},o=function(t){return{type:r.e,payload:t}},u=function(t){return{type:r.f,payload:t}},d=function(t){return{type:r.d,payload:t}}},"16edcb7e2cfe7599cc27":function(t,e,n){"use strict";n.d(e,"a",function(){return c}),n.d(e,"c",function(){return o}),n.d(e,"b",function(){return u});var r=n("a28fc3c963a1d4d1a2e5"),a=n("cbf1068c6ce29f7521f2"),i=function(t){return t.hotProperty||a.b},c=function(){return Object(r.a)(i,function(t){return t.all})},o=function(){return Object(r.a)(i,function(t){return t.loading})},u=function(){return Object(r.a)(i,function(t){return t.listing})}},"80658c854648610df0b7":function(t,e,n){"use strict";n.d(e,"a",function(){return f});var r=n("d782b72bc5b680c7122c"),a=n("6144be5eac76f277117a"),i=n("6542cd13fd5dd1bcffd4"),c=n("b8b549cb012324365428"),o=n("0ab36a71b24a267e0eb9"),u=(n("a72b40110d9c31c9b5c5"),regeneratorRuntime.mark(s)),d=regeneratorRuntime.mark(p),l=regeneratorRuntime.mark(f);function s(){var t;return regeneratorRuntime.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,Object(r.select)(Object(i.j)());case 2:return t=e.sent,e.next=5,Object(r.call)(a.a.get("property/type/hot_property",o.loadAllSuccess,o.loadAllFailure,t));case 5:case"end":return e.stop()}},u)}function p(){var t;return regeneratorRuntime.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,Object(r.select)(Object(i.j)());case 2:return t=e.sent,e.next=5,Object(r.call)(a.a.get("property/public/data?&find_is_premium=true",o.loadListingSuccess,o.loadListingFailure,t));case 5:case"end":return e.stop()}},d)}function f(){return regeneratorRuntime.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,Object(r.takeLatest)(c.b,s);case 2:return t.next=4,Object(r.takeLatest)(c.e,p);case 4:case"end":return t.stop()}},l)}},b8b549cb012324365428:function(t,e,n){"use strict";n.d(e,"b",function(){return r}),n.d(e,"c",function(){return a}),n.d(e,"a",function(){return i}),n.d(e,"e",function(){return c}),n.d(e,"f",function(){return o}),n.d(e,"d",function(){return u});var r="app/HotProperty/LOAD_ALL_REQUEST",a="app/HotProperty/LOAD_ALL_SUCCESS",i="app/HotProperty/LOAD_ALL_FAILURE",c="app/HotProperty/LOAD_LISTING_REQUEST",o="app/HotProperty/LOAD_LISTING_SUCCESS",u="app/HotProperty/LOAD_LISTING_FAILURE"},cbf1068c6ce29f7521f2:function(t,e,n){"use strict";n.d(e,"b",function(){return i});var r=n("7edf83707012a871cdfb"),a=n("b8b549cb012324365428"),i={all:{data:{properties:[]},page:1,size:10,totaldata:0},one:{basic:{title:"",description:"",slug_url:"",property_purpose:{title:""},property_type:{title:""},property_category:{title:""}},address:{state_id:{state_name:""},district_id:{district_name:""},city_id:{municipality_name:""},area_id:{area_name:""},house_no:""},location_property:{total_area_unit:{title:""},total_area:"",built_area:"",built_area_unit:{title:""},property_face:{title:""},road_access_value:0,road_access_length_unit:{title:""},road_access_road_type:{title:""}},building:{built_year:0,built_month:0,calender_type:"",total_floor:0,furnishing:"",no_of:{kitchen:1,dinningroom:1,bedroom:1,bathroom:1,hall:1},parking:"",amenities:[]},media:{images:[],youtube_video_id:""},price:{value:0,currency:{title:""},label:{title:""}},is_active:!1,is_featured:!1,is_premium:!1,is_negotiable:!1,tags:[]},loading:!1,listing:{data:[],page:1,size:10,totaldata:0}};e.a=function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:i,e=arguments.length>1?arguments[1]:void 0;return Object(r.a)(t,function(t){switch(e.type){case a.b:t.loading=!0;break;case a.a:t.loading=!1;break;case a.c:t.all=e.payload,t.loading=!1;break;case a.e:t.loading=!0;break;case a.d:t.loading=!1;break;case a.f:t.listing=e.payload,t.loading=!1}})}}}]);