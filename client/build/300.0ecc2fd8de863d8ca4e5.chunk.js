<<<<<<< HEAD:client/build/296.6f6f5e5b5f62516bbca4.chunk.js
(window.webpackJsonp=window.webpackJsonp||[]).push([[296],{faa92564312857c57a1c:function(e,o,i){"use strict";i.r(o),i.d(o,"HomeLoanForm",function(){return $});var l,a=i("8af190b70a6bc55c6f1b"),n=(i("8a2d1b95e05b6a321e74"),i("d7dd51e1bf6bfc2c9c3d")),t=(i("ab039aecd4a1d4fedc0e"),i("a28fc3c963a1d4d1a2e5")),d=i("ab4cb61bcb2dc161defb"),r=i("adc20f99e57c573c589c"),s=i("d95b0cf107403b178365"),m=i("9daa830d7082bc0a9504"),c=i("4e32e65620279b05c85e"),p=i("9d0c497e489e66fd657b"),b=i("e0e676d806f4794018cb");i("94e3d94e30c59b7f8192");function u(e,o,i,a){l||(l="function"===typeof Symbol&&Symbol.for&&Symbol.for("react.element")||60103);var n=e&&e.defaultProps,t=arguments.length-3;if(o||0===t||(o={children:void 0}),1===t)o.children=a;else if(t>1){for(var d=new Array(t),r=0;r<t;r++)d[r]=arguments[r+3];o.children=d}if(o&&n)for(var s in n)void 0===o[s]&&(o[s]=n[s]);else o||(o=n||{});return{$$typeof:l,type:e,key:void 0===i?null:""+i,ref:null,props:o,_owner:null}}var v="homeLoanForm",f=u("label",{className:"block font-bold",htmlFor:"name"},void 0,"Full Name"),y=u("label",{className:"block font-bold",htmlFor:"email"},void 0,"Email Address"),N=u("label",{className:"block font-bold",htmlFor:"mobile"},void 0,"Mobile No."),h=u("label",{className:"block font-bold",htmlFor:"property"},void 0,"Have you identified a property?"),_=u("label",{htmlFor:"yes",className:"flex items-center cursor-pointer leading-none"},void 0,u("span",{className:"w-4 h-4 inline-block mr-2 rounded-full radio"}),"Yes"),x=u("label",{htmlFor:"no",className:"flex items-center cursor-pointer leading-none"},void 0,u("span",{className:"w-4 h-4 inline-block mr-2 rounded-full radio"}),"No"),g=u("label",{className:"block font-bold",htmlFor:"property"},void 0,"What type of property are you seeking loan for?"),w=u("option",{},void 0,"Choose type"),k=u("option",{},void 0,"Home Purchase"),F=u("option",{},void 0,"Home Construction"),C=u("option",{},void 0,"Refinance"),O=u("option",{},void 0,"Loan Against Property"),j=u("option",{},void 0,"Plot Purchase"),S=u("label",{className:"block font-bold",htmlFor:"city"},void 0,"What is the city you are seeking loan for?"),R=u("option",{name:"choose",value:"1"},"1","Choose city"),E=u("label",{className:"block font-bold mb-2",htmlFor:"property"},void 0,"Resident Status"),A=u("label",{htmlFor:"radio1",className:"flex items-center cursor-pointer leading-none"},void 0,u("span",{className:"w-4 h-4 inline-block mr-2 rounded-full radio"}),"Resident Nepalese"),Y=u("label",{htmlFor:"radio2",className:"flex items-center cursor-pointer leading-none"},void 0,u("span",{className:"w-4 h-4 inline-block mr-2 rounded-full radio"}),"Non Resident Nepalese"),H=u("label",{className:"block font-bold mb-2",htmlFor:"property"},void 0,"Employment Type"),P=u("label",{htmlFor:"radio3",className:"flex items-center cursor-pointer leading-none"},void 0,u("span",{className:"w-4 h-4 inline-block mr-2 rounded-full radio"}),"Salaried"),L=u("label",{htmlFor:"radio4",className:"flex items-center cursor-pointer leading-none"},void 0,u("span",{className:"w-4 h-4 inline-block mr-2 rounded-full radio"}),"Self Employed"),q=u("label",{className:"block font-bold",htmlFor:"income"},void 0,"Monthly Income"),J=u("label",{className:"block font-bold",htmlFor:"property"},void 0,"Add A Co-Borrower?"),M=u("label",{htmlFor:"radio5",className:"flex items-center cursor-pointer leading-none"},void 0,u("span",{className:"w-4 h-4 inline-block mr-2 rounded-full radio"}),"Yes"),W=u("label",{htmlFor:"radio6",className:"flex items-center cursor-pointer leading-none"},void 0,u("span",{className:"w-4 h-4 inline-block mr-2 rounded-full radio"}),"No"),$=function(e){var o=e.one,i=e.loading,l=e.addEditRequest,n=e.setOneValue,t=e.errors,d=e.clearOne,m=e.clearErrors,c=e.loadCityRequest,$=e.city,B=e.bank;Object(s.b)({key:v,reducer:p.a}),Object(r.b)({key:v,saga:b.a}),Object(a.useEffect)(function(){m(),d(),c()},[]);var I,T=function(e){return function(o){o.persist(),n({key:e,value:o.target.value})}};return u("div",{className:"px-4 py-10 bg-white"},void 0,u("div",{className:"max-w-4xl mx-auto"},void 0,u("h3",{className:"text-3xl text-center font-bold my-5"},void 0,"Apply For Home Loan ",B&&u("span",{},void 0,"of ",B)),u("div",{className:"flex flex-wrap -mx-4 mt-4"},void 0,u("div",{className:"w-full lg:w-1/2 mb-4 px-4"},void 0,f,u("input",{type:"text",className:"inputbox",value:o.full_name,onChange:T("full_name")}),t&&t.full_name&&u("div",{id:"component-error-text"},void 0,t.full_name)),u("div",{className:"w-full lg:w-1/2 mb-4 px-4"},void 0,y,u("input",{type:"email",className:"inputbox",value:o.email,onChange:T("email")}),t&&t.email&&u("div",{id:"component-error-text"},void 0," ",t.email)),u("div",{className:"w-full lg:w-1/2 mb-4 px-4"},void 0,N,u("input",{type:"text",className:"inputbox",value:o.mobile,onChange:T("mobile")}),t&&t.mobile&&u("div",{id:"component-error-text"},void 0,t.mobile)),u("div",{className:"w-full lg:w-1/2 mb-4 px-4"},void 0,h,u("div",{className:"inline-flex items-center mr-4 my-2"},void 0,u("input",{onChange:T("is_identified"),id:"yes",type:"radio",name:"identified",value:"Yes",className:"hidden",checked:"Yes"===o.is_identified}),_),u("div",{className:"inline-flex items-center mr-4 my-2"},void 0,u("input",{onChange:T("is_identified"),id:"no",type:"radio",name:"identified",value:"No",className:"hidden",checked:"No"===o.is_identified}),x),t&&t.is_identified&&u("div",{id:"component-error-text"},void 0,t.is_identified)),u("div",{className:"w-full lg:w-1/2 mb-4 px-4"},void 0,g,u("select",{className:"inputbox bg-white",value:o.type_of_property,onChange:T("type_of_property")},void 0,w,k,F,C,O,j),u("div",{id:"component-error-text"},void 0,t&&t.type_of_property&&t.type_of_property)),u("div",{className:"w-full lg:w-1/2 mb-4 px-4"},void 0,S,u("select",{className:"inputbox bg-white",value:o.looking_for_city,onChange:T("looking_for_city")},void 0,R,$&&$.map(function(e){return u("option",{name:e.name,value:e.name},e._id,e.name)})),u("div",{id:"component-error-text"},void 0,t&&t.looking_for_city&&t.looking_for_city)),u("div",{className:"w-full lg:w-1/2 mb-4 px-4"},void 0,E,u("div",{className:"flex items-center mr-4 mb-4"},void 0,u("input",{onChange:T("resident_status"),id:"radio1",type:"radio",name:"resident_status",value:"Resident Nepalese",className:"hidden",checked:"Resident Nepalese"===o.resident_status}),A),u("div",{className:"flex items-center mr-4 mb-4"},void 0,u("input",{onChange:T("resident_status"),id:"radio2",type:"radio",name:"resident_status",value:"Non Resident Nepalese",className:"hidden",checked:"Non Resident Nepalese"===o.resident_status}),Y),t&&t.resident_status&&u("div",{id:"component-error-text"},void 0,t.resident_status)),u("div",{className:"w-full lg:w-1/2 mb-4 px-4"},void 0,H,u("div",{className:"flex items-center mr-4 mb-4"},void 0,u("input",{onChange:T("employment_type"),id:"radio3",type:"radio",name:"employment_type",value:"Salaried",className:"hidden",checked:"Salaried"===o.employment_type}),P),u("div",{className:"flex items-center mr-4 mb-4"},void 0,u("input",{onChange:T("employment_type"),id:"radio4",type:"radio",name:"employment_type",value:"Self Employed",className:"hidden",checked:"Self Employed"===o.employment_type}),L),t&&t.employment_type&&u("div",{id:"component-error-text"},void 0,t.employment_type)),u("div",{className:"w-full lg:w-1/2 mb-4 px-4"},void 0,q,u("input",{type:"number",className:"inputbox",value:o.monthly_income,onChange:(I="monthly_income",function(e){e.persist(),e.target.value<0?n({key:I,value:0}):n({key:I,value:e.target.value})})}),u("div",{id:"component-error-text"},void 0,t&&t.monthly_income&&t.monthly_income)),u("div",{className:"w-full lg:w-1/2 mb-4 px-4"},void 0,J,u("div",{className:"inline-flex items-center mr-4 my-2"},void 0,u("input",{onChange:T("is_co_borrower"),id:"radio5",type:"radio",name:"is_co_borrower",value:"Yes",className:"hidden",checked:"Yes"===o.is_co_borrower}),M),u("div",{className:"inline-flex items-center mr-4 my-2"},void 0,u("input",{onChange:T("is_co_borrower"),id:"radio6",type:"radio",name:"is_co_borrower",value:"No",className:"hidden",checked:"No"===o.is_co_borrower}),W)),u("div",{className:"w-full lg:w-1/2 mb-4 px-4"},void 0,u("button",{type:"button",className:"bg-secondary px-4 py-2 w-full rounded block text-white font-bold",onClick:function(){l()}},void 0,i?"...":"Submit Form")))))},B=Object(t.b)({one:Object(c.g)(),loading:Object(c.e)(),errors:Object(c.d)(),city:Object(c.c)(),bank:Object(c.a)()}),I=Object(n.connect)(B,m);o.default=Object(d.compose)(I,a.memo)($)}}]);
=======
(window.webpackJsonp=window.webpackJsonp||[]).push([[300],{faa92564312857c57a1c:function(e,o,i){"use strict";i.r(o),i.d(o,"HomeLoanForm",function(){return $});var l,a=i("8af190b70a6bc55c6f1b"),n=(i("8a2d1b95e05b6a321e74"),i("d7dd51e1bf6bfc2c9c3d")),t=(i("ab039aecd4a1d4fedc0e"),i("a28fc3c963a1d4d1a2e5")),d=i("ab4cb61bcb2dc161defb"),r=i("adc20f99e57c573c589c"),s=i("d95b0cf107403b178365"),m=i("9daa830d7082bc0a9504"),c=i("4e32e65620279b05c85e"),p=i("9d0c497e489e66fd657b"),b=i("e0e676d806f4794018cb");i("94e3d94e30c59b7f8192");function u(e,o,i,a){l||(l="function"===typeof Symbol&&Symbol.for&&Symbol.for("react.element")||60103);var n=e&&e.defaultProps,t=arguments.length-3;if(o||0===t||(o={children:void 0}),1===t)o.children=a;else if(t>1){for(var d=new Array(t),r=0;r<t;r++)d[r]=arguments[r+3];o.children=d}if(o&&n)for(var s in n)void 0===o[s]&&(o[s]=n[s]);else o||(o=n||{});return{$$typeof:l,type:e,key:void 0===i?null:""+i,ref:null,props:o,_owner:null}}var v="homeLoanForm",f=u("label",{className:"block font-bold",htmlFor:"name"},void 0,"Full Name"),y=u("label",{className:"block font-bold",htmlFor:"email"},void 0,"Email Address"),N=u("label",{className:"block font-bold",htmlFor:"mobile"},void 0,"Mobile No."),h=u("label",{className:"block font-bold",htmlFor:"property"},void 0,"Have you identified a property?"),_=u("label",{htmlFor:"yes",className:"flex items-center cursor-pointer leading-none"},void 0,u("span",{className:"w-4 h-4 inline-block mr-2 rounded-full radio"}),"Yes"),x=u("label",{htmlFor:"no",className:"flex items-center cursor-pointer leading-none"},void 0,u("span",{className:"w-4 h-4 inline-block mr-2 rounded-full radio"}),"No"),g=u("label",{className:"block font-bold",htmlFor:"property"},void 0,"What type of property are you seeking loan for?"),w=u("option",{},void 0,"Choose type"),k=u("option",{},void 0,"Home Purchase"),F=u("option",{},void 0,"Home Construction"),C=u("option",{},void 0,"Refinance"),O=u("option",{},void 0,"Loan Against Property"),j=u("option",{},void 0,"Plot Purchase"),S=u("label",{className:"block font-bold",htmlFor:"city"},void 0,"What is the city you are seeking loan for?"),R=u("option",{name:"choose",value:"1"},"1","Choose city"),E=u("label",{className:"block font-bold mb-2",htmlFor:"property"},void 0,"Resident Status"),A=u("label",{htmlFor:"radio1",className:"flex items-center cursor-pointer leading-none"},void 0,u("span",{className:"w-4 h-4 inline-block mr-2 rounded-full radio"}),"Resident Nepalese"),Y=u("label",{htmlFor:"radio2",className:"flex items-center cursor-pointer leading-none"},void 0,u("span",{className:"w-4 h-4 inline-block mr-2 rounded-full radio"}),"Non Resident Nepalese"),H=u("label",{className:"block font-bold mb-2",htmlFor:"property"},void 0,"Employment Type"),P=u("label",{htmlFor:"radio3",className:"flex items-center cursor-pointer leading-none"},void 0,u("span",{className:"w-4 h-4 inline-block mr-2 rounded-full radio"}),"Salaried"),L=u("label",{htmlFor:"radio4",className:"flex items-center cursor-pointer leading-none"},void 0,u("span",{className:"w-4 h-4 inline-block mr-2 rounded-full radio"}),"Self Employed"),q=u("label",{className:"block font-bold",htmlFor:"income"},void 0,"Monthly Income"),J=u("label",{className:"block font-bold",htmlFor:"property"},void 0,"Add A Co-Borrower?"),M=u("label",{htmlFor:"radio5",className:"flex items-center cursor-pointer leading-none"},void 0,u("span",{className:"w-4 h-4 inline-block mr-2 rounded-full radio"}),"Yes"),W=u("label",{htmlFor:"radio6",className:"flex items-center cursor-pointer leading-none"},void 0,u("span",{className:"w-4 h-4 inline-block mr-2 rounded-full radio"}),"No"),$=function(e){var o=e.one,i=e.loading,l=e.addEditRequest,n=e.setOneValue,t=e.errors,d=e.clearOne,m=e.clearErrors,c=e.loadCityRequest,$=e.city,B=e.bank;Object(s.b)({key:v,reducer:p.a}),Object(r.b)({key:v,saga:b.a}),Object(a.useEffect)(function(){m(),d(),c()},[]);var I,T=function(e){return function(o){o.persist(),n({key:e,value:o.target.value})}};return u("div",{className:"px-4 py-10 bg-white"},void 0,u("div",{className:"max-w-4xl mx-auto"},void 0,u("h3",{className:"text-3xl text-center font-bold my-5"},void 0,"Apply For Home Loan ",B&&u("span",{},void 0,"of ",B)),u("div",{className:"flex flex-wrap -mx-4 mt-4"},void 0,u("div",{className:"w-full lg:w-1/2 mb-4 px-4"},void 0,f,u("input",{type:"text",className:"inputbox",value:o.full_name,onChange:T("full_name")}),t&&t.full_name&&u("div",{id:"component-error-text"},void 0,t.full_name)),u("div",{className:"w-full lg:w-1/2 mb-4 px-4"},void 0,y,u("input",{type:"email",className:"inputbox",value:o.email,onChange:T("email")}),t&&t.email&&u("div",{id:"component-error-text"},void 0," ",t.email)),u("div",{className:"w-full lg:w-1/2 mb-4 px-4"},void 0,N,u("input",{type:"text",className:"inputbox",value:o.mobile,onChange:T("mobile")}),t&&t.mobile&&u("div",{id:"component-error-text"},void 0,t.mobile)),u("div",{className:"w-full lg:w-1/2 mb-4 px-4"},void 0,h,u("div",{className:"inline-flex items-center mr-4 my-2"},void 0,u("input",{onChange:T("is_identified"),id:"yes",type:"radio",name:"identified",value:"Yes",className:"hidden",checked:"Yes"===o.is_identified}),_),u("div",{className:"inline-flex items-center mr-4 my-2"},void 0,u("input",{onChange:T("is_identified"),id:"no",type:"radio",name:"identified",value:"No",className:"hidden",checked:"No"===o.is_identified}),x),t&&t.is_identified&&u("div",{id:"component-error-text"},void 0,t.is_identified)),u("div",{className:"w-full lg:w-1/2 mb-4 px-4"},void 0,g,u("select",{className:"inputbox bg-white",value:o.type_of_property,onChange:T("type_of_property")},void 0,w,k,F,C,O,j),u("div",{id:"component-error-text"},void 0,t&&t.type_of_property&&t.type_of_property)),u("div",{className:"w-full lg:w-1/2 mb-4 px-4"},void 0,S,u("select",{className:"inputbox bg-white",value:o.looking_for_city,onChange:T("looking_for_city")},void 0,R,$&&$.map(function(e){return u("option",{name:e.name,value:e.name},e._id,e.name)})),u("div",{id:"component-error-text"},void 0,t&&t.looking_for_city&&t.looking_for_city)),u("div",{className:"w-full lg:w-1/2 mb-4 px-4"},void 0,E,u("div",{className:"flex items-center mr-4 mb-4"},void 0,u("input",{onChange:T("resident_status"),id:"radio1",type:"radio",name:"resident_status",value:"Resident Nepalese",className:"hidden",checked:"Resident Nepalese"===o.resident_status}),A),u("div",{className:"flex items-center mr-4 mb-4"},void 0,u("input",{onChange:T("resident_status"),id:"radio2",type:"radio",name:"resident_status",value:"Non Resident Nepalese",className:"hidden",checked:"Non Resident Nepalese"===o.resident_status}),Y),t&&t.resident_status&&u("div",{id:"component-error-text"},void 0,t.resident_status)),u("div",{className:"w-full lg:w-1/2 mb-4 px-4"},void 0,H,u("div",{className:"flex items-center mr-4 mb-4"},void 0,u("input",{onChange:T("employment_type"),id:"radio3",type:"radio",name:"employment_type",value:"Salaried",className:"hidden",checked:"Salaried"===o.employment_type}),P),u("div",{className:"flex items-center mr-4 mb-4"},void 0,u("input",{onChange:T("employment_type"),id:"radio4",type:"radio",name:"employment_type",value:"Self Employed",className:"hidden",checked:"Self Employed"===o.employment_type}),L),t&&t.employment_type&&u("div",{id:"component-error-text"},void 0,t.employment_type)),u("div",{className:"w-full lg:w-1/2 mb-4 px-4"},void 0,q,u("input",{type:"number",className:"inputbox",value:o.monthly_income,onChange:(I="monthly_income",function(e){e.persist(),e.target.value<0?n({key:I,value:0}):n({key:I,value:e.target.value})})}),u("div",{id:"component-error-text"},void 0,t&&t.monthly_income&&t.monthly_income)),u("div",{className:"w-full lg:w-1/2 mb-4 px-4"},void 0,J,u("div",{className:"inline-flex items-center mr-4 my-2"},void 0,u("input",{onChange:T("is_co_borrower"),id:"radio5",type:"radio",name:"is_co_borrower",value:"Yes",className:"hidden",checked:"Yes"===o.is_co_borrower}),M),u("div",{className:"inline-flex items-center mr-4 my-2"},void 0,u("input",{onChange:T("is_co_borrower"),id:"radio6",type:"radio",name:"is_co_borrower",value:"No",className:"hidden",checked:"No"===o.is_co_borrower}),W)),u("div",{className:"w-full lg:w-1/2 mb-4 px-4"},void 0,u("button",{type:"button",className:"bg-secondary px-4 py-2 w-full rounded block text-white font-bold",onClick:function(){l()}},void 0,i?"...":"Submit Form")))))},B=Object(t.b)({one:Object(c.g)(),loading:Object(c.e)(),errors:Object(c.d)(),city:Object(c.c)(),bank:Object(c.a)()}),I=Object(n.connect)(B,m);o.default=Object(d.compose)(I,a.memo)($)}}]);
>>>>>>> 41f64895ae2d4aeb7736fd90e084d7a063de2675:client/build/300.0ecc2fd8de863d8ca4e5.chunk.js
