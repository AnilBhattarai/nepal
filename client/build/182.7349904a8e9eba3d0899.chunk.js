<<<<<<< HEAD:client/build/182.7349904a8e9eba3d0899.chunk.js
(window.webpackJsonp=window.webpackJsonp||[]).push([[182],{bcb9cde52a921e701d69:function(e,t,n){"use strict";n.r(t),n.d(t,"Contact",function(){return G});var a,o=n("8af190b70a6bc55c6f1b"),r=n.n(o),c=(n("8a2d1b95e05b6a321e74"),n("d7dd51e1bf6bfc2c9c3d")),i=n("e95a63b25fb92ed15721"),l=n("a28fc3c963a1d4d1a2e5"),u=n("3aced5b508e7389026da"),d=n("ab4cb61bcb2dc161defb"),s=n("da010f21fea25912dd9e"),f=n.n(s),p=n("0d7f0986bcd2f33d8a2a"),b=n("4a683f0a5e64e66a8eb9"),h=n.n(b),y=n("e799c547a20a503b338f"),m=n.n(y),v=n("9095151026da8c51dd60"),g=n.n(v),O=n("ef7e771a06c8805c0be7"),w=n("adc20f99e57c573c589c"),j=n("d95b0cf107403b178365"),P=n("9f313f931bac58d09a29"),x=n("1547d3bc1e5c69166388"),S=n("6685643b189a021964bb"),C=n("888cf7faf9eeceb63e26"),k=n("fcb99a06256635f70435"),_=n("d733903be61208652859"),R=n("5932430beb0c05240602"),E=n("61118b78f8958645f2e4"),N=n("2fad9e66eff5130ad191");function D(e){return(D="function"===typeof Symbol&&"symbol"===typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"===typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(e)}function A(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);t&&(a=a.filter(function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable})),n.push.apply(n,a)}return n}function q(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?A(Object(n),!0).forEach(function(t){V(e,t,n[t])}):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):A(Object(n)).forEach(function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))})}return e}function L(e,t,n,o){a||(a="function"===typeof Symbol&&Symbol.for&&Symbol.for("react.element")||60103);var r=e&&e.defaultProps,c=arguments.length-3;if(t||0===c||(t={children:void 0}),1===c)t.children=o;else if(c>1){for(var i=new Array(c),l=0;l<c;l++)i[l]=arguments[l+3];t.children=i}if(t&&r)for(var u in r)void 0===t[u]&&(t[u]=r[u]);else t||(t=r||{});return{$$typeof:a,type:e,key:void 0===n?null:""+n,ref:null,props:t,_owner:null}}function B(e,t){for(var n=0;n<t.length;n++){var a=t[n];a.enumerable=a.enumerable||!1,a.configurable=!0,"value"in a&&(a.writable=!0),Object.defineProperty(e,a.key,a)}}function T(e,t){return(T=Object.setPrototypeOf||function(e,t){return e.__proto__=t,e})(e,t)}function I(e){var t=function(){if("undefined"===typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"===typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],function(){})),!0}catch(e){return!1}}();return function(){var n,a=Q(e);if(t){var o=Q(this).constructor;n=Reflect.construct(a,arguments,o)}else n=a.apply(this,arguments);return function(e,t){if(t&&("object"===D(t)||"function"===typeof t))return t;if(void 0!==t)throw new TypeError("Derived constructors may only return object or undefined");return K(e)}(this,n)}}function K(e){if(void 0===e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e}function Q(e){return(Q=Object.setPrototypeOf?Object.getPrototypeOf:function(e){return e.__proto__||Object.getPrototypeOf(e)})(e)}function V(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}var z=L("i",{className:"material-icons text-base text-indigo-500 hover:text-indigo-700"},void 0,"visibility"),F=L("i",{className:"material-icons text-base text-red-400 hover:text-red-600"},void 0,"delete"),H=L(p.Helmet,{},void 0,L("title",{},void 0,"Contact List")),J=L(N.a,{}),$=L(_.a,{},void 0,"Contact List"),M=L(g.a,{}),G=function(e){!function(e,t){if("function"!==typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function");e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,writable:!0,configurable:!0}}),t&&T(e,t)}(c,r.a.Component);var t,n,a,o=I(c);function c(){var e;!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,c);for(var t=arguments.length,n=new Array(t),a=0;a<t;a++)n[a]=arguments[a];return V(K(e=o.call.apply(o,[this].concat(n))),"state",{open:!1,deleteId:""}),V(K(e),"handleQueryChange",function(t){t.persist(),e.props.setQueryValue({key:t.target.name,value:t.target.value})}),V(K(e),"handleSearch",function(){e.props.loadAllRequest(e.props.query)}),V(K(e),"handleKeyPress",function(t){"Enter"===t.key&&e.handleSearch()}),V(K(e),"handlePagination",function(t){e.props.loadAllRequest(t)}),V(K(e),"handleView",function(t){e.props.push("/admin/contact-manage/view/".concat(t))}),V(K(e),"handleAdd",function(){e.props.clearOne(),e.props.push("/admin/contact-manage/add")}),V(K(e),"handleOpen",function(t){e.setState({open:!0,deleteId:t})}),V(K(e),"handleClose",function(){e.setState({open:!1})}),V(K(e),"handleDelete",function(t){e.props.deleteOneRequest(t),e.setState({open:!1})}),e}return t=c,(n=[{key:"componentDidMount",value:function(){this.props.loadAllRequest(this.props.query)}},{key:"render",value:function(){var e=this,t=(this.props.classes,this.props),n=t.all,a=n.data,o=n.page,c=n.size,i=n.totaldata,l=t.query,u=t.loading,d={page:o,size:c,totaldata:i},s=a.map(function(t){var n=t.name,a=t.email,o=t.subject,r=t.added_at,c=t._id;return[n,a,o,f()(r).format(k.b),L("div",{className:"flex"},void 0,L("button",{"aria-label":"Edit",className:" px-1 text-center leading-none",onClick:function(){return e.handleView(c)}},void 0,z),L("button",{className:"ml-2 px-1 text-center leading-none",onClick:function(){return e.handleOpen(c)}},void 0,F))]});return r.a.createElement(r.a.Fragment,null,L(E.a,{open:this.state.open,doClose:this.handleClose,doDelete:function(){return e.handleDelete(e.state.deleteId)}}),H,L("div",{className:"flex justify-between mt-3 mb-3"},void 0,u&&1==u?J:r.a.createElement(r.a.Fragment,null),$),L(R.a,{loading:u},void 0,L("div",{className:"flex"},void 0,L("div",{className:"flex relative mr-2"},void 0,L("input",{type:"text",name:"find_name",id:"contact-name",placeholder:"Search Contacts",className:"m-auto inputbox",value:l.find_name,onChange:this.handleQueryChange,onKeyPress:this.handleKeyPress}),L(m.a,{"aria-label":"Search",className:"waftsrchstyle",onClick:this.handleSearch},void 0,M))),L(O.a,{tableHead:["Name","Email","Subject","Added at","Actions"],tableData:s,pagination:d,handlePagination:this.handlePagination})))}}])&&B(t.prototype,n),a&&B(t,a),c}(),U=Object(l.b)({all:Object(C.a)(),query:Object(C.d)(),loading:Object(C.b)()}),W=Object(c.connect)(U,q(q({},S),{},{push:u.push})),X=Object(j.a)({key:"adminContactListPage",reducer:P.a}),Y=Object(w.a)({key:"adminContactListPage",saga:x.a}),Z=h()(function(e){return{button:{margin:e.spacing.unit},fab:{width:"40px",height:"40px",marginTop:"auto",marginBottom:"auto"},tableActionButton:{padding:0,"&:hover":{background:"transparent",color:"#404040"}},waftsrch:{padding:0,position:"absolute",borderLeft:"1px solid #d9e3e9",borderRadius:0,"&:hover":{background:"transparent",color:"#404040"}}}});t.default=Object(d.compose)(i.withRouter,Z,X,Y,W)(G)}}]);
=======
(window.webpackJsonp=window.webpackJsonp||[]).push([[185],{bcb9cde52a921e701d69:function(e,t,n){"use strict";n.r(t),n.d(t,"Contact",function(){return G});var a,o=n("8af190b70a6bc55c6f1b"),r=n.n(o),c=(n("8a2d1b95e05b6a321e74"),n("d7dd51e1bf6bfc2c9c3d")),i=n("e95a63b25fb92ed15721"),l=n("a28fc3c963a1d4d1a2e5"),u=n("3aced5b508e7389026da"),d=n("ab4cb61bcb2dc161defb"),s=n("da010f21fea25912dd9e"),f=n.n(s),p=n("0d7f0986bcd2f33d8a2a"),b=n("4a683f0a5e64e66a8eb9"),h=n.n(b),y=n("e799c547a20a503b338f"),m=n.n(y),v=n("9095151026da8c51dd60"),g=n.n(v),O=n("ef7e771a06c8805c0be7"),w=n("adc20f99e57c573c589c"),j=n("d95b0cf107403b178365"),P=n("9f313f931bac58d09a29"),x=n("1547d3bc1e5c69166388"),S=n("6685643b189a021964bb"),C=n("888cf7faf9eeceb63e26"),k=n("fcb99a06256635f70435"),_=n("d733903be61208652859"),R=n("5932430beb0c05240602"),E=n("61118b78f8958645f2e4"),N=n("2fad9e66eff5130ad191");function D(e){return(D="function"===typeof Symbol&&"symbol"===typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"===typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(e)}function A(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);t&&(a=a.filter(function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable})),n.push.apply(n,a)}return n}function q(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?A(Object(n),!0).forEach(function(t){V(e,t,n[t])}):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):A(Object(n)).forEach(function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))})}return e}function L(e,t,n,o){a||(a="function"===typeof Symbol&&Symbol.for&&Symbol.for("react.element")||60103);var r=e&&e.defaultProps,c=arguments.length-3;if(t||0===c||(t={children:void 0}),1===c)t.children=o;else if(c>1){for(var i=new Array(c),l=0;l<c;l++)i[l]=arguments[l+3];t.children=i}if(t&&r)for(var u in r)void 0===t[u]&&(t[u]=r[u]);else t||(t=r||{});return{$$typeof:a,type:e,key:void 0===n?null:""+n,ref:null,props:t,_owner:null}}function B(e,t){for(var n=0;n<t.length;n++){var a=t[n];a.enumerable=a.enumerable||!1,a.configurable=!0,"value"in a&&(a.writable=!0),Object.defineProperty(e,a.key,a)}}function T(e,t){return(T=Object.setPrototypeOf||function(e,t){return e.__proto__=t,e})(e,t)}function I(e){var t=function(){if("undefined"===typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"===typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],function(){})),!0}catch(e){return!1}}();return function(){var n,a=Q(e);if(t){var o=Q(this).constructor;n=Reflect.construct(a,arguments,o)}else n=a.apply(this,arguments);return function(e,t){if(t&&("object"===D(t)||"function"===typeof t))return t;if(void 0!==t)throw new TypeError("Derived constructors may only return object or undefined");return K(e)}(this,n)}}function K(e){if(void 0===e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e}function Q(e){return(Q=Object.setPrototypeOf?Object.getPrototypeOf:function(e){return e.__proto__||Object.getPrototypeOf(e)})(e)}function V(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}var z=L("i",{className:"material-icons text-base text-indigo-500 hover:text-indigo-700"},void 0,"visibility"),F=L("i",{className:"material-icons text-base text-red-400 hover:text-red-600"},void 0,"delete"),H=L(p.Helmet,{},void 0,L("title",{},void 0,"Contact List")),J=L(N.a,{}),$=L(_.a,{},void 0,"Contact List"),M=L(g.a,{}),G=function(e){!function(e,t){if("function"!==typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function");e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,writable:!0,configurable:!0}}),t&&T(e,t)}(c,r.a.Component);var t,n,a,o=I(c);function c(){var e;!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,c);for(var t=arguments.length,n=new Array(t),a=0;a<t;a++)n[a]=arguments[a];return V(K(e=o.call.apply(o,[this].concat(n))),"state",{open:!1,deleteId:""}),V(K(e),"handleQueryChange",function(t){t.persist(),e.props.setQueryValue({key:t.target.name,value:t.target.value})}),V(K(e),"handleSearch",function(){e.props.loadAllRequest(e.props.query)}),V(K(e),"handleKeyPress",function(t){"Enter"===t.key&&e.handleSearch()}),V(K(e),"handlePagination",function(t){e.props.loadAllRequest(t)}),V(K(e),"handleView",function(t){e.props.push("/admin/contact-manage/view/".concat(t))}),V(K(e),"handleAdd",function(){e.props.clearOne(),e.props.push("/admin/contact-manage/add")}),V(K(e),"handleOpen",function(t){e.setState({open:!0,deleteId:t})}),V(K(e),"handleClose",function(){e.setState({open:!1})}),V(K(e),"handleDelete",function(t){e.props.deleteOneRequest(t),e.setState({open:!1})}),e}return t=c,(n=[{key:"componentDidMount",value:function(){this.props.loadAllRequest(this.props.query)}},{key:"render",value:function(){var e=this,t=(this.props.classes,this.props),n=t.all,a=n.data,o=n.page,c=n.size,i=n.totaldata,l=t.query,u=t.loading,d={page:o,size:c,totaldata:i},s=a.map(function(t){var n=t.name,a=t.email,o=t.subject,r=t.added_at,c=t._id;return[n,a,o,f()(r).format(k.b),L("div",{className:"flex"},void 0,L("button",{"aria-label":"Edit",className:" px-1 text-center leading-none",onClick:function(){return e.handleView(c)}},void 0,z),L("button",{className:"ml-2 px-1 text-center leading-none",onClick:function(){return e.handleOpen(c)}},void 0,F))]});return r.a.createElement(r.a.Fragment,null,L(E.a,{open:this.state.open,doClose:this.handleClose,doDelete:function(){return e.handleDelete(e.state.deleteId)}}),H,L("div",{className:"flex justify-between mt-3 mb-3"},void 0,u&&1==u?J:r.a.createElement(r.a.Fragment,null),$),L(R.a,{loading:u},void 0,L("div",{className:"flex"},void 0,L("div",{className:"flex relative mr-2"},void 0,L("input",{type:"text",name:"find_name",id:"contact-name",placeholder:"Search Contacts",className:"m-auto inputbox",value:l.find_name,onChange:this.handleQueryChange,onKeyPress:this.handleKeyPress}),L(m.a,{"aria-label":"Search",className:"waftsrchstyle",onClick:this.handleSearch},void 0,M))),L(O.a,{tableHead:["Name","Email","Subject","Added at","Actions"],tableData:s,pagination:d,handlePagination:this.handlePagination})))}}])&&B(t.prototype,n),a&&B(t,a),c}(),U=Object(l.b)({all:Object(C.a)(),query:Object(C.d)(),loading:Object(C.b)()}),W=Object(c.connect)(U,q(q({},S),{},{push:u.push})),X=Object(j.a)({key:"adminContactListPage",reducer:P.a}),Y=Object(w.a)({key:"adminContactListPage",saga:x.a}),Z=h()(function(e){return{button:{margin:e.spacing.unit},fab:{width:"40px",height:"40px",marginTop:"auto",marginBottom:"auto"},tableActionButton:{padding:0,"&:hover":{background:"transparent",color:"#404040"}},waftsrch:{padding:0,position:"absolute",borderLeft:"1px solid #d9e3e9",borderRadius:0,"&:hover":{background:"transparent",color:"#404040"}}}});t.default=Object(d.compose)(i.withRouter,Z,X,Y,W)(G)}}]);
>>>>>>> 41f64895ae2d4aeb7736fd90e084d7a063de2675:client/build/185.7113c7d09cc7bd4c7a6d.chunk.js