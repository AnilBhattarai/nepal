<<<<<<< HEAD:client/build/167.981016eb172188e346dc.chunk.js
(window.webpackJsonp=window.webpackJsonp||[]).push([[167],{"27c11c1bea8565f6ec14":function(e,t,n){"use strict";n.r(t),n.d(t,"BlogCategory",function(){return Y});var a,r=n("8af190b70a6bc55c6f1b"),o=n.n(r),i=(n("8a2d1b95e05b6a321e74"),n("d7dd51e1bf6bfc2c9c3d")),c=n("a28fc3c963a1d4d1a2e5"),l=n("ab4cb61bcb2dc161defb"),d=n("3aced5b508e7389026da"),u=n("da010f21fea25912dd9e"),f=n.n(u),s=n("0d7f0986bcd2f33d8a2a"),p=n("4a683f0a5e64e66a8eb9"),b=n.n(p),h=n("c233babf320cd068509e"),y=n.n(h),g=n("e799c547a20a503b338f"),m=n.n(g),v=n("9095151026da8c51dd60"),O=n.n(v),w=n("e96e82762cfd5fe3a589"),j=n.n(w),P=n("73bb0e359204f9566244"),x=n("adc20f99e57c573c589c"),C=n("d95b0cf107403b178365"),S=n("76f3e20fe3d3b9688a9e"),k=n("73a4f8a4fd17fecac5f4"),_=n("fcb99a06256635f70435"),A=n("a4a69ff9bc5ca8dd7a4c"),N=n("a50ef435848f409f6e76"),E=n("2fad9e66eff5130ad191"),R=n("d733903be61208652859"),D=n("5932430beb0c05240602"),q=n("61118b78f8958645f2e4");function B(e){return(B="function"===typeof Symbol&&"symbol"===typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"===typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(e)}function I(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);t&&(a=a.filter(function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable})),n.push.apply(n,a)}return n}function T(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?I(Object(n),!0).forEach(function(t){L(e,t,n[t])}):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):I(Object(n)).forEach(function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))})}return e}function F(e,t,n,r){a||(a="function"===typeof Symbol&&Symbol.for&&Symbol.for("react.element")||60103);var o=e&&e.defaultProps,i=arguments.length-3;if(t||0===i||(t={children:void 0}),1===i)t.children=r;else if(i>1){for(var c=new Array(i),l=0;l<i;l++)c[l]=arguments[l+3];t.children=c}if(t&&o)for(var d in o)void 0===t[d]&&(t[d]=o[d]);else t||(t=o||{});return{$$typeof:a,type:e,key:void 0===n?null:""+n,ref:null,props:t,_owner:null}}function Q(e,t){for(var n=0;n<t.length;n++){var a=t[n];a.enumerable=a.enumerable||!1,a.configurable=!0,"value"in a&&(a.writable=!0),Object.defineProperty(e,a.key,a)}}function K(e,t){return(K=Object.setPrototypeOf||function(e,t){return e.__proto__=t,e})(e,t)}function z(e){var t=function(){if("undefined"===typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"===typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],function(){})),!0}catch(e){return!1}}();return function(){var n,a=J(e);if(t){var r=J(this).constructor;n=Reflect.construct(a,arguments,r)}else n=a.apply(this,arguments);return function(e,t){if(t&&("object"===B(t)||"function"===typeof t))return t;if(void 0!==t)throw new TypeError("Derived constructors may only return object or undefined");return H(e)}(this,n)}}function H(e){if(void 0===e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e}function J(e){return(J=Object.setPrototypeOf?Object.getPrototypeOf:function(e){return e.__proto__||Object.getPrototypeOf(e)})(e)}function L(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}var M=F("i",{className:"material-icons text-base text-indigo-500 hover:text-indigo-700"},void 0,"edit"),$=F("i",{className:"material-icons text-base text-red-400 hover:text-red-600"},void 0,"delete"),U=F(s.Helmet,{},void 0,F("title",{},void 0,"News Category Listing")),V=F(E.a,{}),G=F(R.a,{},void 0,"News Category Manage"),W=F(y.a,{}),X=F(O.a,{}),Y=function(e){!function(e,t){if("function"!==typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function");e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,writable:!0,configurable:!0}}),t&&K(e,t)}(i,o.a.PureComponent);var t,n,a,r=z(i);function i(){var e;!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,i);for(var t=arguments.length,n=new Array(t),a=0;a<t;a++)n[a]=arguments[a];return L(H(e=r.call.apply(r,[this].concat(n))),"state",{open:!1,deleteId:""}),L(H(e),"handleQueryChange",function(t){t.persist(),e.props.setQueryValue({key:t.target.name,value:t.target.value})}),L(H(e),"handleSearch",function(){e.props.loadAllRequest(e.props.query)}),L(H(e),"handleKeyPress",function(t){"Enter"===t.key&&e.handleSearch()}),L(H(e),"handleEdit",function(t){e.props.push("/admin/blog-cat-manage/edit/".concat(t))}),L(H(e),"handleOpen",function(t){e.setState({open:!0,deleteId:t})}),L(H(e),"handleClose",function(){e.setState({open:!1})}),L(H(e),"handleDelete",function(t){e.props.deleteCatRequest(t),e.setState({open:!1})}),L(H(e),"handlePagination",function(t){e.props.loadAllRequest(t)}),L(H(e),"handleAdd",function(){e.props.clearOne(),e.props.push("/admin/blog-cat-manage/add")}),L(H(e),"clearFilters",function(){e.props.loadAllRequest(),e.props.clearQuery()}),e}return t=i,(n=[{key:"componentDidMount",value:function(){this.props.loadAllRequest(this.props.query)}},{key:"render",value:function(){var e=this,t=this.props.classes,n=this.props,a=n.all,r=a.data,i=a.page,c=a.size,l=a.totaldata,d=n.query,u=n.loading,s={page:i,size:c,totaldata:l},p=r.map(function(t){var n=t.title,a=t.order,r=t.image,i=(t.slug_url,t.is_active),c=t.added_at,l=t.updated_at,d=t._id;return[n,a,r&&r.path?F("img",{src:"".concat(_.g).concat(r.path),style:{width:50,height:50},alt:r.filename}):"No Image",""+i,f()(c).format(_.b),f()(l||c).format(_.b),o.a.createElement(o.a.Fragment,null,F("div",{className:"flex"},void 0,F("button",{"aria-label":"Edit",className:" px-1 text-center leading-none",onClick:function(){return e.handleEdit(d)}},void 0,M),F("button",{className:"ml-2 px-1 text-center leading-none",onClick:function(){return e.handleOpen(d)}},void 0,$)))]});return o.a.createElement(o.a.Fragment,null,F(q.a,{open:this.state.open,doClose:this.handleClose,doDelete:function(){return e.handleDelete(e.state.deleteId)}}),U,F("div",{className:"flex justify-between mt-3 mb-3"},void 0,u&&1==u?V:o.a.createElement(o.a.Fragment,null),G,F(j.a,{color:"primary","aria-label":"Add",className:t.fab,round:"true",onClick:this.handleAdd,elevation:0},void 0,W)),F(D.a,{loading:u},void 0,F("div",{className:"flex"},void 0,F("div",{className:"flex relative mr-2"},void 0,F("input",{type:"text",name:"find_title",id:"doc-title",placeholder:"Search Blog Category",className:"m-auto inputbox",value:d.find_title,onChange:this.handleQueryChange,onKeyPress:this.handleKeyPress}),F(m.a,{"aria-label":"Search",className:"waftsrchstyle",onClick:this.handleSearch},void 0,X))),F(P.a,{tableHead:["Title","Order","Image","Is Active","Added At","Updated At","Actions"],tableData:p,pagination:s,handlePagination:this.handlePagination})))}}])&&Q(t.prototype,n),a&&Q(t,a),i}(),Z=Object(c.b)({all:Object(S.a)(),query:Object(S.e)(),loading:Object(S.c)()}),ee=Object(i.connect)(Z,T(T({},k),{},{push:d.push})),te=Object(C.a)({key:"BlogCategory",reducer:A.a}),ne=Object(x.a)({key:"BlogCategory",saga:N.a}),ae=b()(function(e){return{button:{margin:e.spacing.unit},fab:{width:"40px",height:"40px",marginTop:"auto",marginBottom:"auto"},tableActionButton:{padding:0,"&:hover":{background:"transparent",color:"#404040"}},waftsrch:{padding:0,position:"absolute",borderLeft:"1px solid #d9e3e9",borderRadius:0,"&:hover":{background:"transparent",color:"#404040"}}}});t.default=Object(l.compose)(ae,te,ne,ee)(Y)}}]);
=======
(window.webpackJsonp=window.webpackJsonp||[]).push([[170],{"27c11c1bea8565f6ec14":function(e,t,n){"use strict";n.r(t),n.d(t,"BlogCategory",function(){return Y});var a,r=n("8af190b70a6bc55c6f1b"),o=n.n(r),i=(n("8a2d1b95e05b6a321e74"),n("d7dd51e1bf6bfc2c9c3d")),c=n("a28fc3c963a1d4d1a2e5"),l=n("ab4cb61bcb2dc161defb"),d=n("3aced5b508e7389026da"),u=n("da010f21fea25912dd9e"),f=n.n(u),s=n("0d7f0986bcd2f33d8a2a"),p=n("4a683f0a5e64e66a8eb9"),b=n.n(p),h=n("c233babf320cd068509e"),y=n.n(h),g=n("e799c547a20a503b338f"),m=n.n(g),v=n("9095151026da8c51dd60"),O=n.n(v),w=n("e96e82762cfd5fe3a589"),j=n.n(w),P=n("73bb0e359204f9566244"),x=n("adc20f99e57c573c589c"),C=n("d95b0cf107403b178365"),S=n("76f3e20fe3d3b9688a9e"),k=n("73a4f8a4fd17fecac5f4"),_=n("fcb99a06256635f70435"),A=n("a4a69ff9bc5ca8dd7a4c"),N=n("a50ef435848f409f6e76"),E=n("2fad9e66eff5130ad191"),R=n("d733903be61208652859"),D=n("5932430beb0c05240602"),q=n("61118b78f8958645f2e4");function B(e){return(B="function"===typeof Symbol&&"symbol"===typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"===typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(e)}function I(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);t&&(a=a.filter(function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable})),n.push.apply(n,a)}return n}function T(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?I(Object(n),!0).forEach(function(t){L(e,t,n[t])}):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):I(Object(n)).forEach(function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))})}return e}function F(e,t,n,r){a||(a="function"===typeof Symbol&&Symbol.for&&Symbol.for("react.element")||60103);var o=e&&e.defaultProps,i=arguments.length-3;if(t||0===i||(t={children:void 0}),1===i)t.children=r;else if(i>1){for(var c=new Array(i),l=0;l<i;l++)c[l]=arguments[l+3];t.children=c}if(t&&o)for(var d in o)void 0===t[d]&&(t[d]=o[d]);else t||(t=o||{});return{$$typeof:a,type:e,key:void 0===n?null:""+n,ref:null,props:t,_owner:null}}function Q(e,t){for(var n=0;n<t.length;n++){var a=t[n];a.enumerable=a.enumerable||!1,a.configurable=!0,"value"in a&&(a.writable=!0),Object.defineProperty(e,a.key,a)}}function K(e,t){return(K=Object.setPrototypeOf||function(e,t){return e.__proto__=t,e})(e,t)}function z(e){var t=function(){if("undefined"===typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"===typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],function(){})),!0}catch(e){return!1}}();return function(){var n,a=J(e);if(t){var r=J(this).constructor;n=Reflect.construct(a,arguments,r)}else n=a.apply(this,arguments);return function(e,t){if(t&&("object"===B(t)||"function"===typeof t))return t;if(void 0!==t)throw new TypeError("Derived constructors may only return object or undefined");return H(e)}(this,n)}}function H(e){if(void 0===e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e}function J(e){return(J=Object.setPrototypeOf?Object.getPrototypeOf:function(e){return e.__proto__||Object.getPrototypeOf(e)})(e)}function L(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}var M=F("i",{className:"material-icons text-base text-indigo-500 hover:text-indigo-700"},void 0,"edit"),$=F("i",{className:"material-icons text-base text-red-400 hover:text-red-600"},void 0,"delete"),U=F(s.Helmet,{},void 0,F("title",{},void 0,"News Category Listing")),V=F(E.a,{}),G=F(R.a,{},void 0,"News Category Manage"),W=F(y.a,{}),X=F(O.a,{}),Y=function(e){!function(e,t){if("function"!==typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function");e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,writable:!0,configurable:!0}}),t&&K(e,t)}(i,o.a.PureComponent);var t,n,a,r=z(i);function i(){var e;!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,i);for(var t=arguments.length,n=new Array(t),a=0;a<t;a++)n[a]=arguments[a];return L(H(e=r.call.apply(r,[this].concat(n))),"state",{open:!1,deleteId:""}),L(H(e),"handleQueryChange",function(t){t.persist(),e.props.setQueryValue({key:t.target.name,value:t.target.value})}),L(H(e),"handleSearch",function(){e.props.loadAllRequest(e.props.query)}),L(H(e),"handleKeyPress",function(t){"Enter"===t.key&&e.handleSearch()}),L(H(e),"handleEdit",function(t){e.props.push("/admin/blog-cat-manage/edit/".concat(t))}),L(H(e),"handleOpen",function(t){e.setState({open:!0,deleteId:t})}),L(H(e),"handleClose",function(){e.setState({open:!1})}),L(H(e),"handleDelete",function(t){e.props.deleteCatRequest(t),e.setState({open:!1})}),L(H(e),"handlePagination",function(t){e.props.loadAllRequest(t)}),L(H(e),"handleAdd",function(){e.props.clearOne(),e.props.push("/admin/blog-cat-manage/add")}),L(H(e),"clearFilters",function(){e.props.loadAllRequest(),e.props.clearQuery()}),e}return t=i,(n=[{key:"componentDidMount",value:function(){this.props.loadAllRequest(this.props.query)}},{key:"render",value:function(){var e=this,t=this.props.classes,n=this.props,a=n.all,r=a.data,i=a.page,c=a.size,l=a.totaldata,d=n.query,u=n.loading,s={page:i,size:c,totaldata:l},p=r.map(function(t){var n=t.title,a=t.order,r=t.image,i=(t.slug_url,t.is_active),c=t.added_at,l=t.updated_at,d=t._id;return[n,a,r&&r.path?F("img",{src:"".concat(_.g).concat(r.path),style:{width:50,height:50},alt:r.filename}):"No Image",""+i,f()(c).format(_.b),f()(l||c).format(_.b),o.a.createElement(o.a.Fragment,null,F("div",{className:"flex"},void 0,F("button",{"aria-label":"Edit",className:" px-1 text-center leading-none",onClick:function(){return e.handleEdit(d)}},void 0,M),F("button",{className:"ml-2 px-1 text-center leading-none",onClick:function(){return e.handleOpen(d)}},void 0,$)))]});return o.a.createElement(o.a.Fragment,null,F(q.a,{open:this.state.open,doClose:this.handleClose,doDelete:function(){return e.handleDelete(e.state.deleteId)}}),U,F("div",{className:"flex justify-between mt-3 mb-3"},void 0,u&&1==u?V:o.a.createElement(o.a.Fragment,null),G,F(j.a,{color:"primary","aria-label":"Add",className:t.fab,round:"true",onClick:this.handleAdd,elevation:0},void 0,W)),F(D.a,{loading:u},void 0,F("div",{className:"flex"},void 0,F("div",{className:"flex relative mr-2"},void 0,F("input",{type:"text",name:"find_title",id:"doc-title",placeholder:"Search Blog Category",className:"m-auto inputbox",value:d.find_title,onChange:this.handleQueryChange,onKeyPress:this.handleKeyPress}),F(m.a,{"aria-label":"Search",className:"waftsrchstyle",onClick:this.handleSearch},void 0,X))),F(P.a,{tableHead:["Title","Order","Image","Is Active","Added At","Updated At","Actions"],tableData:p,pagination:s,handlePagination:this.handlePagination})))}}])&&Q(t.prototype,n),a&&Q(t,a),i}(),Z=Object(c.b)({all:Object(S.a)(),query:Object(S.e)(),loading:Object(S.c)()}),ee=Object(i.connect)(Z,T(T({},k),{},{push:d.push})),te=Object(C.a)({key:"BlogCategory",reducer:A.a}),ne=Object(x.a)({key:"BlogCategory",saga:N.a}),ae=b()(function(e){return{button:{margin:e.spacing.unit},fab:{width:"40px",height:"40px",marginTop:"auto",marginBottom:"auto"},tableActionButton:{padding:0,"&:hover":{background:"transparent",color:"#404040"}},waftsrch:{padding:0,position:"absolute",borderLeft:"1px solid #d9e3e9",borderRadius:0,"&:hover":{background:"transparent",color:"#404040"}}}});t.default=Object(l.compose)(ae,te,ne,ee)(Y)}}]);
>>>>>>> 41f64895ae2d4aeb7736fd90e084d7a063de2675:client/build/170.f90099b38f0fd5f71b4c.chunk.js