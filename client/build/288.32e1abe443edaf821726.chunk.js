<<<<<<< HEAD:client/build/284.f9fae4fba18b3935635d.chunk.js
(window.webpackJsonp=window.webpackJsonp||[]).push([[284],{"696432f6249bd00dbb70":function(e,a,t){"use strict";t.r(a);var r,n=t("8af190b70a6bc55c6f1b"),o=t.n(n),i=(t("8a2d1b95e05b6a321e74"),t("e95a63b25fb92ed15721")),c=t("a28fc3c963a1d4d1a2e5"),d=t("ab4cb61bcb2dc161defb"),l=t("d7dd51e1bf6bfc2c9c3d"),b=t("3aced5b508e7389026da"),f=(t("f85e09def79cc2a20bc2"),t("23b8d02be40765ac53e3")),s=t.n(f),u=t("da010f21fea25912dd9e"),p=t.n(u),v=t("c233babf320cd068509e"),m=t.n(v),h=t("e96e82762cfd5fe3a589"),y=t.n(h),O=t("679413333d88bed60c6f"),g=t.n(O),j=t("1ae545a61fbc5b2d4bdd"),w=t.n(j),k=t("921c0b8c557fe6ba5da8"),x=t.n(k),P=t("4a683f0a5e64e66a8eb9"),D=t.n(P),_=t("2aea235afd5c55b8b19b"),E=t.n(_),C=t("f8286fe65ca06bcb51b6"),F=t.n(C),N=t("26682d5d4df1c4fdd619"),S=t.n(N),I=t("0d939196e59ed73c94e6"),R=t("435859b6b76fb67a754a"),q=t.n(R),A=t("adc20f99e57c573c589c"),B=t("d95b0cf107403b178365"),J=t("5cb9d1dda30508c4ab9e"),T=t("2efffd5ddc828562c927"),z=t("df129c369a7a533beaf2"),V=t("fcb99a06256635f70435"),$=t("c248fd49617d94d1ef69"),H=t("4690fad5ac82c2aa658d"),M=t("d733903be61208652859"),U=t("5932430beb0c05240602");function G(e,a){var t=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);a&&(r=r.filter(function(a){return Object.getOwnPropertyDescriptor(e,a).enumerable})),t.push.apply(t,r)}return t}function K(e){for(var a=1;a<arguments.length;a++){var t=null!=arguments[a]?arguments[a]:{};a%2?G(Object(t),!0).forEach(function(a){L(e,a,t[a])}):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(t)):G(Object(t)).forEach(function(a){Object.defineProperty(e,a,Object.getOwnPropertyDescriptor(t,a))})}return e}function L(e,a,t){return a in e?Object.defineProperty(e,a,{value:t,enumerable:!0,configurable:!0,writable:!0}):e[a]=t,e}function Q(e,a,t,n){r||(r="function"===typeof Symbol&&Symbol.for&&Symbol.for("react.element")||60103);var o=e&&e.defaultProps,i=arguments.length-3;if(a||0===i||(a={children:void 0}),1===i)a.children=n;else if(i>1){for(var c=new Array(i),d=0;d<i;d++)c[d]=arguments[d+3];a.children=c}if(a&&o)for(var l in o)void 0===a[l]&&(a[l]=o[l]);else a||(a=o||{});return{$$typeof:r,type:e,key:void 0===t?null:""+t,ref:null,props:a,_owner:null}}var W=Q(t("04ccef77bda0a944024e").a,{}),X=Q(S.a,{}),Y=Q("br",{}),Z=Q("br",{}),ee=Q("br",{}),ae=Q("br",{}),te=Q("span",{},void 0," ",Q("h3",{},void 0,"Upload CV")),re=Q(m.a,{}),ne=D()({backbtn:{padding:0,height:"40px",width:"40px",marginTop:"auto",marginBottom:"auto",borderRadius:"50%",marginRight:"5px"}}),oe=Object(B.a)({key:"career",reducer:T.a}),ie=Object(A.a)({key:"career",saga:z.a}),ce=Object(c.b)({all:Object($.a)(),one:Object($.f)(),detail:Object($.b)(),loading:Object($.e)(),errors:Object($.c)(),fileData:Object($.d)()}),de=Object(l.connect)(ce,K(K({},H),{},{push:b.push}));a.default=Object(d.compose)(i.withRouter,ne,oe,ie,de)(function(e){e.all.data;var a=e.clearErrors,t=e.loadOneRequest,r=e.match,i=e.one,c=e.detail,d=e.classes,l=e.loading,b=e.push,f=e.errors,u=e.setOneValue,v=e.clearOne,m=(e.fileData,e.deleteMediaSuccess);Object(n.useEffect)(function(){a(),v(),t(r.params.slug)},[]);var h=function(e){return function(a){a.persist(),u({key:e,value:a.target.value})}};return l?W:o.a.createElement(o.a.Fragment,null,Q("div",{},void 0,Q("div",{className:"flex justify-between mt-3 mb-3"},void 0,Q(M.a,{},void 0,Q(I.IconButton,{className:"".concat(d.backbtn," cursor-pointer"),onClick:function(){b("/careers")},"aria-label":"Back"},void 0,X),Q("h2",{},void 0,c.job_title))),Q(U.a,{},void 0,Q("p",{},void 0,"Skills-needed : ",c.skill_requirements," ",Y,"Job-Description: ",c.job_descriptions," ",Z,"Published Date: ",p()(c.published_on).format(V.b)," ",ee,"Deadline Date: ",p()(c.deadline_at).format(V.b),ae),Q("div",{},void 0,Q(q.a,{container:!0},void 0,Q(q.a,{item:!0,xs:6,sm:6,md:6},void 0,Q(F.a,{},void 0,Q(w.a,{},void 0,Q(q.a,{},void 0,Q(q.a,{item:!0,xs:12,sm:12,md:12},void 0,Q(J.a,{error:f.name,name:"Name",inputId:"name",label:"Name",value:i.name||"",onChange:h("name")}))),Q(q.a,{},void 0,Q(q.a,{item:!0,xs:12,sm:12,md:12},void 0,Q(J.a,{error:f.email,name:"Email",inputId:"email",label:"Email",inputType:"email",value:i.email||"",onChange:h("email")}))),Q(q.a,{},void 0,Q(q.a,{item:!0,xs:12,sm:12,md:12},void 0,Q(J.a,{error:f.phone,name:"phone",inputId:"phone",inputType:"phone",label:"phone",value:i.phone||"",onChange:h("phone")}))),Q(q.a,{},void 0,Q(q.a,{item:!0,xs:12,sm:12,md:12},void 0,Q(J.a,{error:f.cover_letter,name:"cover_letter",inputId:"cover_letter",label:"cover_letter",value:i.cover_letter||"",onChange:h("cover_letter")})))))))),te,Q("span",{},void 0," ",Q(s.a,{onDrop:function(e){u({key:"cvFile",value:e[0]})}},void 0,function(e){var a=e.getRootProps,t=e.getInputProps;return o.a.createElement("div",a(),o.a.createElement("input",t()),Q(y.a,{color:"primary","aria-label":"Add",className:d.fab,round:"true",elevation:0},void 0,re))})," "),f.cvFile&&Q("div",{id:"component-error-text"},void 0,f.cvFile),i.cvFile&&Object.keys(i.cvFile).length>0&&Q(U.a,{loading:l},void 0,Q("div",{className:"flex flex-wrap"},void 0,Q("div",{className:"w-full sm:w-1/3 md:1/4 xl:w-1/5 mr-2 border mb-4 rounded"},void 0,Q(w.a,{},void 0,Q(x.a,{component:"p",style:{minHeight:"30px"}},void 0,i.cvFile.path,i.cvFile.size)),Q(g.a,{},void 0,Q(E.a,{size:"small",color:"primary",onClick:function(){m()}},void 0,"Delete"))))),Q(E.a,{variant:"contained",color:"primary",className:d.button,onClick:function(){applyRequest()}},void 0,"Apply"))))})}}]);
=======
(window.webpackJsonp=window.webpackJsonp||[]).push([[288],{"696432f6249bd00dbb70":function(e,a,t){"use strict";t.r(a);var r,n=t("8af190b70a6bc55c6f1b"),o=t.n(n),i=(t("8a2d1b95e05b6a321e74"),t("e95a63b25fb92ed15721")),c=t("a28fc3c963a1d4d1a2e5"),d=t("ab4cb61bcb2dc161defb"),l=t("d7dd51e1bf6bfc2c9c3d"),b=t("3aced5b508e7389026da"),f=(t("f85e09def79cc2a20bc2"),t("23b8d02be40765ac53e3")),s=t.n(f),u=t("da010f21fea25912dd9e"),p=t.n(u),v=t("c233babf320cd068509e"),m=t.n(v),h=t("e96e82762cfd5fe3a589"),y=t.n(h),O=t("679413333d88bed60c6f"),g=t.n(O),j=t("1ae545a61fbc5b2d4bdd"),w=t.n(j),k=t("921c0b8c557fe6ba5da8"),x=t.n(k),P=t("4a683f0a5e64e66a8eb9"),D=t.n(P),_=t("2aea235afd5c55b8b19b"),E=t.n(_),C=t("f8286fe65ca06bcb51b6"),F=t.n(C),N=t("26682d5d4df1c4fdd619"),S=t.n(N),I=t("0d939196e59ed73c94e6"),R=t("435859b6b76fb67a754a"),q=t.n(R),A=t("adc20f99e57c573c589c"),B=t("d95b0cf107403b178365"),J=t("5cb9d1dda30508c4ab9e"),T=t("2efffd5ddc828562c927"),z=t("df129c369a7a533beaf2"),V=t("fcb99a06256635f70435"),$=t("c248fd49617d94d1ef69"),H=t("4690fad5ac82c2aa658d"),M=t("d733903be61208652859"),U=t("5932430beb0c05240602");function G(e,a){var t=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);a&&(r=r.filter(function(a){return Object.getOwnPropertyDescriptor(e,a).enumerable})),t.push.apply(t,r)}return t}function K(e){for(var a=1;a<arguments.length;a++){var t=null!=arguments[a]?arguments[a]:{};a%2?G(Object(t),!0).forEach(function(a){L(e,a,t[a])}):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(t)):G(Object(t)).forEach(function(a){Object.defineProperty(e,a,Object.getOwnPropertyDescriptor(t,a))})}return e}function L(e,a,t){return a in e?Object.defineProperty(e,a,{value:t,enumerable:!0,configurable:!0,writable:!0}):e[a]=t,e}function Q(e,a,t,n){r||(r="function"===typeof Symbol&&Symbol.for&&Symbol.for("react.element")||60103);var o=e&&e.defaultProps,i=arguments.length-3;if(a||0===i||(a={children:void 0}),1===i)a.children=n;else if(i>1){for(var c=new Array(i),d=0;d<i;d++)c[d]=arguments[d+3];a.children=c}if(a&&o)for(var l in o)void 0===a[l]&&(a[l]=o[l]);else a||(a=o||{});return{$$typeof:r,type:e,key:void 0===t?null:""+t,ref:null,props:a,_owner:null}}var W=Q(t("04ccef77bda0a944024e").a,{}),X=Q(S.a,{}),Y=Q("br",{}),Z=Q("br",{}),ee=Q("br",{}),ae=Q("br",{}),te=Q("span",{},void 0," ",Q("h3",{},void 0,"Upload CV")),re=Q(m.a,{}),ne=D()({backbtn:{padding:0,height:"40px",width:"40px",marginTop:"auto",marginBottom:"auto",borderRadius:"50%",marginRight:"5px"}}),oe=Object(B.a)({key:"career",reducer:T.a}),ie=Object(A.a)({key:"career",saga:z.a}),ce=Object(c.b)({all:Object($.a)(),one:Object($.f)(),detail:Object($.b)(),loading:Object($.e)(),errors:Object($.c)(),fileData:Object($.d)()}),de=Object(l.connect)(ce,K(K({},H),{},{push:b.push}));a.default=Object(d.compose)(i.withRouter,ne,oe,ie,de)(function(e){e.all.data;var a=e.clearErrors,t=e.loadOneRequest,r=e.match,i=e.one,c=e.detail,d=e.classes,l=e.loading,b=e.push,f=e.errors,u=e.setOneValue,v=e.clearOne,m=(e.fileData,e.deleteMediaSuccess);Object(n.useEffect)(function(){a(),v(),t(r.params.slug)},[]);var h=function(e){return function(a){a.persist(),u({key:e,value:a.target.value})}};return l?W:o.a.createElement(o.a.Fragment,null,Q("div",{},void 0,Q("div",{className:"flex justify-between mt-3 mb-3"},void 0,Q(M.a,{},void 0,Q(I.IconButton,{className:"".concat(d.backbtn," cursor-pointer"),onClick:function(){b("/careers")},"aria-label":"Back"},void 0,X),Q("h2",{},void 0,c.job_title))),Q(U.a,{},void 0,Q("p",{},void 0,"Skills-needed : ",c.skill_requirements," ",Y,"Job-Description: ",c.job_descriptions," ",Z,"Published Date: ",p()(c.published_on).format(V.b)," ",ee,"Deadline Date: ",p()(c.deadline_at).format(V.b),ae),Q("div",{},void 0,Q(q.a,{container:!0},void 0,Q(q.a,{item:!0,xs:6,sm:6,md:6},void 0,Q(F.a,{},void 0,Q(w.a,{},void 0,Q(q.a,{},void 0,Q(q.a,{item:!0,xs:12,sm:12,md:12},void 0,Q(J.a,{error:f.name,name:"Name",inputId:"name",label:"Name",value:i.name||"",onChange:h("name")}))),Q(q.a,{},void 0,Q(q.a,{item:!0,xs:12,sm:12,md:12},void 0,Q(J.a,{error:f.email,name:"Email",inputId:"email",label:"Email",inputType:"email",value:i.email||"",onChange:h("email")}))),Q(q.a,{},void 0,Q(q.a,{item:!0,xs:12,sm:12,md:12},void 0,Q(J.a,{error:f.phone,name:"phone",inputId:"phone",inputType:"phone",label:"phone",value:i.phone||"",onChange:h("phone")}))),Q(q.a,{},void 0,Q(q.a,{item:!0,xs:12,sm:12,md:12},void 0,Q(J.a,{error:f.cover_letter,name:"cover_letter",inputId:"cover_letter",label:"cover_letter",value:i.cover_letter||"",onChange:h("cover_letter")})))))))),te,Q("span",{},void 0," ",Q(s.a,{onDrop:function(e){u({key:"cvFile",value:e[0]})}},void 0,function(e){var a=e.getRootProps,t=e.getInputProps;return o.a.createElement("div",a(),o.a.createElement("input",t()),Q(y.a,{color:"primary","aria-label":"Add",className:d.fab,round:"true",elevation:0},void 0,re))})," "),f.cvFile&&Q("div",{id:"component-error-text"},void 0,f.cvFile),i.cvFile&&Object.keys(i.cvFile).length>0&&Q(U.a,{loading:l},void 0,Q("div",{className:"flex flex-wrap"},void 0,Q("div",{className:"w-full sm:w-1/3 md:1/4 xl:w-1/5 mr-2 border mb-4 rounded"},void 0,Q(w.a,{},void 0,Q(x.a,{component:"p",style:{minHeight:"30px"}},void 0,i.cvFile.path,i.cvFile.size)),Q(g.a,{},void 0,Q(E.a,{size:"small",color:"primary",onClick:function(){m()}},void 0,"Delete"))))),Q(E.a,{variant:"contained",color:"primary",className:d.button,onClick:function(){applyRequest()}},void 0,"Apply"))))})}}]);
>>>>>>> 41f64895ae2d4aeb7736fd90e084d7a063de2675:client/build/288.32e1abe443edaf821726.chunk.js