<<<<<<< HEAD:client/build/46.ffa41cb400f02fbee61e.chunk.js
(window.webpackJsonp=window.webpackJsonp||[]).push([[46],{"9ada1c9a69d22b419600":function(e,t,a){"use strict";a.r(t),a.d(t,"Comments",function(){return V});var o,n=a("8af190b70a6bc55c6f1b"),i=a.n(n),r=(a("8a2d1b95e05b6a321e74"),a("d7dd51e1bf6bfc2c9c3d")),d=a("a28fc3c963a1d4d1a2e5"),l=a("ab4cb61bcb2dc161defb"),c=a("3aced5b508e7389026da"),s=a("da010f21fea25912dd9e"),m=a.n(s),u=a("e727e731a9bed8ec3c2a"),b=a.n(u),f=a("eb6b79030a47f0b10efc"),p=a.n(f),v=a("adc20f99e57c573c589c"),y=a("d95b0cf107403b178365"),g=a("072895d18a4d6093fa05"),h=a("dcf571f3786ffa298669"),x=a("6542cd13fd5dd1bcffd4"),O=a("36a04b3e5e97f38512f4"),w=a("ace4dfd45eaf1e42c9b5"),N=a("fcb99a06256635f70435"),j=a("035d3a922375ef5f610c"),C=a.n(j),_=a("61118b78f8958645f2e4");function k(e,t){var a=Object.keys(e);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);t&&(o=o.filter(function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable})),a.push.apply(a,o)}return a}function S(e){for(var t=1;t<arguments.length;t++){var a=null!=arguments[t]?arguments[t]:{};t%2?k(Object(a),!0).forEach(function(t){P(e,t,a[t])}):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(a)):k(Object(a)).forEach(function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(a,t))})}return e}function P(e,t,a){return t in e?Object.defineProperty(e,t,{value:a,enumerable:!0,configurable:!0,writable:!0}):e[t]=a,e}function R(e,t,a,n){o||(o="function"===typeof Symbol&&Symbol.for&&Symbol.for("react.element")||60103);var i=e&&e.defaultProps,r=arguments.length-3;if(t||0===r||(t={children:void 0}),1===r)t.children=n;else if(r>1){for(var d=new Array(r),l=0;l<r;l++)d[l]=arguments[l+3];t.children=d}if(t&&i)for(var c in i)void 0===t[c]&&(t[c]=i[c]);else t||(t=i||{});return{$$typeof:o,type:e,key:void 0===a?null:""+a,ref:null,props:t,_owner:null}}function E(e,t){return function(e){if(Array.isArray(e))return e}(e)||function(e,t){var a=null==e?null:"undefined"!==typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(null==a)return;var o,n,i=[],r=!0,d=!1;try{for(a=a.call(e);!(r=(o=a.next()).done)&&(i.push(o.value),!t||i.length!==t);r=!0);}catch(e){d=!0,n=e}finally{try{r||null==a.return||a.return()}finally{if(d)throw n}}return i}(e,t)||function(e,t){if(!e)return;if("string"===typeof e)return q(e,t);var a=Object.prototype.toString.call(e).slice(8,-1);"Object"===a&&e.constructor&&(a=e.constructor.name);if("Map"===a||"Set"===a)return Array.from(e);if("Arguments"===a||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(a))return q(e,t)}(e,t)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function q(e,t){(null==t||t>e.length)&&(t=e.length);for(var a=0,o=new Array(t);a<t;a++)o[a]=e[a];return o}var A=R("div",{},void 0,"Loading...."),L=R("i",{className:"material-icons ml-2"},void 0,"send"),D=R("img",{src:C.a,alt:"",className:"opacity-25 w-10 h-10"}),M=R("h2",{},void 0,"Comment waiting to get verified"),z=R("i",{className:"material-icons text-blue-500 hover:text-blue-700"},void 0,"edit"),F=R("i",{className:"material-icons text-red-500 hover:text-red-700"},void 0,"delete"),I=R("img",{src:C.a,alt:"",className:"opacity-25 w-10 h-10"}),T=R("h2",{},void 0,"Comment waiting to get verified"),$=R("i",{className:"material-icons text-blue-500 hover:text-blue-700"},void 0,"edit"),J=R("i",{className:"material-icons text-red-500 hover:text-red-700"},void 0,"delete"),V=function(e){var t=e.commentLoading,a=e.commentPostLoading,o=e.comments,r=e.one,d=e.user,l=(e.isOpen,e.isClose,e.owner,e.replyReq),c=e.commentFor,s=e.ownComments,u=e.setOneValue,f=e.id,g=e.push,h=e.token,x=e.loadMyCommentRequest;Object(y.b)({key:"comments",reducer:O.a}),Object(v.b)({key:"comments",saga:w.a}),Object(n.useEffect)(function(){e.clearOne(),void 0!==f&&e.loadOwnCommentRequest({key:c,id:f}),f&&h&&e.loadCommentRequest({key:c,id:f})},[f]),Object(n.useEffect)(function(){l||H(!1)},[l]);var j=E(Object(n.useState)(!1),2),C=j[0],k=j[1],S=E(Object(n.useState)(!1),2),P=S[0],q=S[1],V=E(Object(n.useState)(""),2),U=V[0],Y=V[1],B=E(Object(n.useState)(!1),2),G=B[0],H=B[1],K=E(Object(n.useState)(""),2),Q=K[0],W=K[1],X=E(Object(n.useState)(""),2),Z=(X[0],X[1],function(t){return function(a){a.persist(),e.setOneValue({key:t,value:a.target.value})}}),ee=function(t){x({key:c,id:f}),k(!1),e.clearOne()},te=function(){k(!1),e.clearOne()},ae=function(e){q(!0),Y(e)},oe=function(e){W(e.target.value)},ne=function(e,t){u({key:"title",value:e}),u({key:"_id",value:t}),k(!0)},ie=function(){H(!1)},re=R("button",{type:"button",className:"py-2 px-6 rounded mt-4 text-sm text-blue bg-primary uppercase btn-theme",onClick:ee},void 0,"Save");return t?A:R("div",{className:""},void 0,R("h2",{className:"font-bold text-sm mb-2 text-2xl font-bold"},void 0,"Comments"),R(_.a,{open:P,doClose:function(){q(!1)},doDelete:function(){return t=U,e.deleteCommentRequest(t),void q(!1);var t}}),d&&d.id?R("div",{className:"relative"},void 0,R("textarea",{className:"appearance-none w-full outline-none resize-none mt-2 p-4 relative rounded pb-10 border border-gray-300 mb-10",name:"comment",id:"comments",rows:"3",placeholder:"write comment...",value:C?"":r.title,onChange:Z("title")}),R("button",{type:"button",disabled:a,className:"text-secondary uppercase text-sm tracking-widest absolute left-0 bottom-0 py-2 mx-2 flex items-center",onClick:function(){e.postCommentRequest({key:c,id:f}),k(!1)}},void 0,"POST COMMENT ",L)):R("div",{className:"bg-gray-100 border text-sm border-gray-300 rounded mt-4 px-4 py-2 flex hover:shadow-lg ease-in-out cursor-pointer loginlink hide-mobile",onClick:function(){g("/signup-user",{from:{pathname:window.location.pathname}})}},void 0,"Please Login to Post Comment"),s&&s.data&&s.data.comment.map(function(e){return R("div",{},e._id,R("div",{className:"flex py-4 border-b border-dotted sans-serif"},void 0,D,R("div",{className:"pl-4 flex-1"},void 0,R("div",{className:"flex"},void 0,R("div",{className:"w-1/2"},void 0,R("h5",{className:"text-sm font-bold"},void 0,"string"===typeof e.added_by&&e.added_by===d.id?d.name:e.added_by.name),R("span",{className:"text-xs"},void 0,m()(e.added_at).format(N.b)," ")),R(b.a,{open:C,onClose:te,"aria-labelledby":"comment-edit-dialog"},void 0,R(p.a,{id:"comment-edit-dialog"},void 0,R("div",{},void 0,R("textarea",{name:"edit-comment",id:"edit_comment",cols:"45",rows:"5",value:r.title,onChange:Z("title")}),R("button",{type:"button",className:"py-2 px-6 rounded mt-4 text-sm text-blue bg-primary uppercase btn-theme",onClick:function(){return ee(r._id)}},void 0,"Save")))),R(b.a,{open:G,onClose:ie,"aria-labelledby":"reply-comment-dialog"},void 0,R(p.a,{},void 0,R("div",{className:"mt-2 p-4 shadow relative rounded pb-10 border border-gray-500 mb-10"},void 0,R("textarea",{className:"appearance-none w-full outline-none resize-none",name:"reply",id:"reply",rows:"5",placeholder:"Reply to ".concat(e.added_by.name),value:Q,onChange:oe})))),R("div",{className:"w-1/2 text-right"},void 0,e.added_by._id===d.id?i.a.createElement(i.a.Fragment,null,M,R("button",{type:"button",className:"px-2",onClick:function(){return ne(e.title,e._id)}},void 0,z),R("button",{type:"button",className:"px-2",onClick:function(){return ae(e._id)}},void 0,F)):"")),R("p",{className:"italic mb-2"},void 0,e.title))))}),o&&o.comment&&o.comment.map(function(e){return R("div",{},e._id,R("div",{className:"flex py-4 border-b border-dotted sans-serif"},void 0,I,R("div",{className:"pl-4 flex-1"},void 0,R("div",{className:"flex"},void 0,R("div",{className:"w-1/2"},void 0,R("h5",{className:"text-sm font-bold"},void 0,"string"===typeof e.added_by&&e.added_by===d.id?d.name:e.added_by.name),R("span",{className:"text-xs"},void 0,m()(e.added_at).format(N.b)," ")),R(b.a,{open:C,onClose:te,"aria-labelledby":"comment-edit-dialog"},void 0,R(p.a,{id:"comment-edit-dialog"},void 0,R("div",{},void 0,R("textarea",{name:"edit-comment",id:"edit_comment",cols:"45",rows:"5",value:r.title,onChange:Z("title")}),re))),R(b.a,{open:G,onClose:ie,"aria-labelledby":"reply-comment-dialog"},void 0,R(p.a,{},void 0,R("div",{className:"mt-2 p-4 shadow relative rounded pb-10 border border-gray-500 mb-10"},void 0,R("textarea",{className:"appearance-none w-full outline-none resize-none",name:"reply",id:"reply",rows:"5",placeholder:"Reply to ".concat(e.added_by.name),value:Q,onChange:oe})))),R("div",{className:"w-1/2 text-right"},void 0,"approved"!==e.status&&e.added_by._id===d.id&&"false"===e.is_deleted?i.a.createElement(i.a.Fragment,null,T,R("button",{type:"button",className:"px-2",onClick:function(){return ne(e.title,e._id)}},void 0,$),R("button",{type:"button",className:"px-2",onClick:function(){return ae(e._id)}},void 0,J)):"")),R("p",{className:"italic mb-2"},void 0,e.title),e.reply&&R("div",{className:"ml-6"},void 0,e.reply.title," ",R("span",{className:"text-gray-700 text-sm"},void 0,e.reply.added_by.name||"You")))))}))},U=Object(d.b)({comments:Object(h.a)(),one:Object(h.d)(),commentLoading:Object(h.b)(),commentPostLoading:Object(h.c)(),user:Object(x.k)(),replyReq:Object(h.f)(),ownComments:Object(h.e)(),token:Object(x.j)()}),Y=Object(r.connect)(U,S(S({},g),{},{push:c.push}));t.default=Object(l.compose)(Y)(V)}}]);
=======
(window.webpackJsonp=window.webpackJsonp||[]).push([[45],{"9ada1c9a69d22b419600":function(e,t,a){"use strict";a.r(t),a.d(t,"Comments",function(){return V});var o,n=a("8af190b70a6bc55c6f1b"),i=a.n(n),r=(a("8a2d1b95e05b6a321e74"),a("d7dd51e1bf6bfc2c9c3d")),d=a("a28fc3c963a1d4d1a2e5"),l=a("ab4cb61bcb2dc161defb"),c=a("3aced5b508e7389026da"),s=a("da010f21fea25912dd9e"),m=a.n(s),u=a("e727e731a9bed8ec3c2a"),b=a.n(u),f=a("eb6b79030a47f0b10efc"),p=a.n(f),v=a("adc20f99e57c573c589c"),y=a("d95b0cf107403b178365"),g=a("072895d18a4d6093fa05"),h=a("dcf571f3786ffa298669"),x=a("6542cd13fd5dd1bcffd4"),O=a("36a04b3e5e97f38512f4"),w=a("ace4dfd45eaf1e42c9b5"),N=a("fcb99a06256635f70435"),j=a("035d3a922375ef5f610c"),C=a.n(j),_=a("61118b78f8958645f2e4");function k(e,t){var a=Object.keys(e);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);t&&(o=o.filter(function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable})),a.push.apply(a,o)}return a}function S(e){for(var t=1;t<arguments.length;t++){var a=null!=arguments[t]?arguments[t]:{};t%2?k(Object(a),!0).forEach(function(t){P(e,t,a[t])}):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(a)):k(Object(a)).forEach(function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(a,t))})}return e}function P(e,t,a){return t in e?Object.defineProperty(e,t,{value:a,enumerable:!0,configurable:!0,writable:!0}):e[t]=a,e}function R(e,t,a,n){o||(o="function"===typeof Symbol&&Symbol.for&&Symbol.for("react.element")||60103);var i=e&&e.defaultProps,r=arguments.length-3;if(t||0===r||(t={children:void 0}),1===r)t.children=n;else if(r>1){for(var d=new Array(r),l=0;l<r;l++)d[l]=arguments[l+3];t.children=d}if(t&&i)for(var c in i)void 0===t[c]&&(t[c]=i[c]);else t||(t=i||{});return{$$typeof:o,type:e,key:void 0===a?null:""+a,ref:null,props:t,_owner:null}}function E(e,t){return function(e){if(Array.isArray(e))return e}(e)||function(e,t){var a=null==e?null:"undefined"!==typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(null==a)return;var o,n,i=[],r=!0,d=!1;try{for(a=a.call(e);!(r=(o=a.next()).done)&&(i.push(o.value),!t||i.length!==t);r=!0);}catch(e){d=!0,n=e}finally{try{r||null==a.return||a.return()}finally{if(d)throw n}}return i}(e,t)||function(e,t){if(!e)return;if("string"===typeof e)return q(e,t);var a=Object.prototype.toString.call(e).slice(8,-1);"Object"===a&&e.constructor&&(a=e.constructor.name);if("Map"===a||"Set"===a)return Array.from(e);if("Arguments"===a||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(a))return q(e,t)}(e,t)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function q(e,t){(null==t||t>e.length)&&(t=e.length);for(var a=0,o=new Array(t);a<t;a++)o[a]=e[a];return o}var A=R("div",{},void 0,"Loading...."),L=R("i",{className:"material-icons ml-2"},void 0,"send"),D=R("img",{src:C.a,alt:"",className:"opacity-25 w-10 h-10"}),M=R("h2",{},void 0,"Comment waiting to get verified"),z=R("i",{className:"material-icons text-blue-500 hover:text-blue-700"},void 0,"edit"),F=R("i",{className:"material-icons text-red-500 hover:text-red-700"},void 0,"delete"),I=R("img",{src:C.a,alt:"",className:"opacity-25 w-10 h-10"}),T=R("h2",{},void 0,"Comment waiting to get verified"),$=R("i",{className:"material-icons text-blue-500 hover:text-blue-700"},void 0,"edit"),J=R("i",{className:"material-icons text-red-500 hover:text-red-700"},void 0,"delete"),V=function(e){var t=e.commentLoading,a=e.commentPostLoading,o=e.comments,r=e.one,d=e.user,l=(e.isOpen,e.isClose,e.owner,e.replyReq),c=e.commentFor,s=e.ownComments,u=e.setOneValue,f=e.id,g=e.push,h=e.token,x=e.loadMyCommentRequest;Object(y.b)({key:"comments",reducer:O.a}),Object(v.b)({key:"comments",saga:w.a}),Object(n.useEffect)(function(){e.clearOne(),void 0!==f&&e.loadOwnCommentRequest({key:c,id:f}),f&&h&&e.loadCommentRequest({key:c,id:f})},[f]),Object(n.useEffect)(function(){l||H(!1)},[l]);var j=E(Object(n.useState)(!1),2),C=j[0],k=j[1],S=E(Object(n.useState)(!1),2),P=S[0],q=S[1],V=E(Object(n.useState)(""),2),U=V[0],Y=V[1],B=E(Object(n.useState)(!1),2),G=B[0],H=B[1],K=E(Object(n.useState)(""),2),Q=K[0],W=K[1],X=E(Object(n.useState)(""),2),Z=(X[0],X[1],function(t){return function(a){a.persist(),e.setOneValue({key:t,value:a.target.value})}}),ee=function(t){x({key:c,id:f}),k(!1),e.clearOne()},te=function(){k(!1),e.clearOne()},ae=function(e){q(!0),Y(e)},oe=function(e){W(e.target.value)},ne=function(e,t){u({key:"title",value:e}),u({key:"_id",value:t}),k(!0)},ie=function(){H(!1)},re=R("button",{type:"button",className:"py-2 px-6 rounded mt-4 text-sm text-blue bg-primary uppercase btn-theme",onClick:ee},void 0,"Save");return t?A:R("div",{className:""},void 0,R("h2",{className:"font-bold text-sm mb-2 text-2xl font-bold"},void 0,"Comments"),R(_.a,{open:P,doClose:function(){q(!1)},doDelete:function(){return t=U,e.deleteCommentRequest(t),void q(!1);var t}}),d&&d.id?R("div",{className:"relative"},void 0,R("textarea",{className:"appearance-none w-full outline-none resize-none mt-2 p-4 relative rounded pb-10 border border-gray-300 mb-10",name:"comment",id:"comments",rows:"3",placeholder:"write comment...",value:C?"":r.title,onChange:Z("title")}),R("button",{type:"button",disabled:a,className:"text-secondary uppercase text-sm tracking-widest absolute left-0 bottom-0 py-2 mx-2 flex items-center",onClick:function(){e.postCommentRequest({key:c,id:f}),k(!1)}},void 0,"POST COMMENT ",L)):R("div",{className:"bg-gray-100 border text-sm border-gray-300 rounded mt-4 px-4 py-2 flex hover:shadow-lg ease-in-out cursor-pointer loginlink hide-mobile",onClick:function(){g("/signup-user",{from:{pathname:window.location.pathname}})}},void 0,"Please Login to Post Comment"),s&&s.data&&s.data.comment.map(function(e){return R("div",{},e._id,R("div",{className:"flex py-4 border-b border-dotted sans-serif"},void 0,D,R("div",{className:"pl-4 flex-1"},void 0,R("div",{className:"flex"},void 0,R("div",{className:"w-1/2"},void 0,R("h5",{className:"text-sm font-bold"},void 0,"string"===typeof e.added_by&&e.added_by===d.id?d.name:e.added_by.name),R("span",{className:"text-xs"},void 0,m()(e.added_at).format(N.b)," ")),R(b.a,{open:C,onClose:te,"aria-labelledby":"comment-edit-dialog"},void 0,R(p.a,{id:"comment-edit-dialog"},void 0,R("div",{},void 0,R("textarea",{name:"edit-comment",id:"edit_comment",cols:"45",rows:"5",value:r.title,onChange:Z("title")}),R("button",{type:"button",className:"py-2 px-6 rounded mt-4 text-sm text-blue bg-primary uppercase btn-theme",onClick:function(){return ee(r._id)}},void 0,"Save")))),R(b.a,{open:G,onClose:ie,"aria-labelledby":"reply-comment-dialog"},void 0,R(p.a,{},void 0,R("div",{className:"mt-2 p-4 shadow relative rounded pb-10 border border-gray-500 mb-10"},void 0,R("textarea",{className:"appearance-none w-full outline-none resize-none",name:"reply",id:"reply",rows:"5",placeholder:"Reply to ".concat(e.added_by.name),value:Q,onChange:oe})))),R("div",{className:"w-1/2 text-right"},void 0,e.added_by._id===d.id?i.a.createElement(i.a.Fragment,null,M,R("button",{type:"button",className:"px-2",onClick:function(){return ne(e.title,e._id)}},void 0,z),R("button",{type:"button",className:"px-2",onClick:function(){return ae(e._id)}},void 0,F)):"")),R("p",{className:"italic mb-2"},void 0,e.title))))}),o&&o.comment&&o.comment.map(function(e){return R("div",{},e._id,R("div",{className:"flex py-4 border-b border-dotted sans-serif"},void 0,I,R("div",{className:"pl-4 flex-1"},void 0,R("div",{className:"flex"},void 0,R("div",{className:"w-1/2"},void 0,R("h5",{className:"text-sm font-bold"},void 0,"string"===typeof e.added_by&&e.added_by===d.id?d.name:e.added_by.name),R("span",{className:"text-xs"},void 0,m()(e.added_at).format(N.b)," ")),R(b.a,{open:C,onClose:te,"aria-labelledby":"comment-edit-dialog"},void 0,R(p.a,{id:"comment-edit-dialog"},void 0,R("div",{},void 0,R("textarea",{name:"edit-comment",id:"edit_comment",cols:"45",rows:"5",value:r.title,onChange:Z("title")}),re))),R(b.a,{open:G,onClose:ie,"aria-labelledby":"reply-comment-dialog"},void 0,R(p.a,{},void 0,R("div",{className:"mt-2 p-4 shadow relative rounded pb-10 border border-gray-500 mb-10"},void 0,R("textarea",{className:"appearance-none w-full outline-none resize-none",name:"reply",id:"reply",rows:"5",placeholder:"Reply to ".concat(e.added_by.name),value:Q,onChange:oe})))),R("div",{className:"w-1/2 text-right"},void 0,"approved"!==e.status&&e.added_by._id===d.id&&"false"===e.is_deleted?i.a.createElement(i.a.Fragment,null,T,R("button",{type:"button",className:"px-2",onClick:function(){return ne(e.title,e._id)}},void 0,$),R("button",{type:"button",className:"px-2",onClick:function(){return ae(e._id)}},void 0,J)):"")),R("p",{className:"italic mb-2"},void 0,e.title),e.reply&&R("div",{className:"ml-6"},void 0,e.reply.title," ",R("span",{className:"text-gray-700 text-sm"},void 0,e.reply.added_by.name||"You")))))}))},U=Object(d.b)({comments:Object(h.a)(),one:Object(h.d)(),commentLoading:Object(h.b)(),commentPostLoading:Object(h.c)(),user:Object(x.k)(),replyReq:Object(h.f)(),ownComments:Object(h.e)(),token:Object(x.j)()}),Y=Object(r.connect)(U,S(S({},g),{},{push:c.push}));t.default=Object(l.compose)(Y)(V)}}]);
>>>>>>> 41f64895ae2d4aeb7736fd90e084d7a063de2675:client/build/45.51d091979434593a0d3a.chunk.js