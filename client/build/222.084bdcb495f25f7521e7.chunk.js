<<<<<<< HEAD:client/build/222.084bdcb495f25f7521e7.chunk.js
(window.webpackJsonp=window.webpackJsonp||[]).push([[222],{"38f0f80359b6312f3191":function(e,t,n){"use strict";n.r(t),n.d(t,"AdminModuleManage",function(){return L});var a,r=n("8af190b70a6bc55c6f1b"),o=n.n(r),c=(n("8a2d1b95e05b6a321e74"),n("0d7f0986bcd2f33d8a2a")),i=n("4a683f0a5e64e66a8eb9"),l=n.n(i),u=n("e799c547a20a503b338f"),d=n.n(u),f=n("e96e82762cfd5fe3a589"),s=n.n(f),p=n("c233babf320cd068509e"),b=n.n(p),y=n("9095151026da8c51dd60"),m=n.n(y),h=n("a28fc3c963a1d4d1a2e5"),v=n("d7dd51e1bf6bfc2c9c3d"),g=n("ab4cb61bcb2dc161defb"),O=n("3aced5b508e7389026da"),w=n("adc20f99e57c573c589c"),j=n("d95b0cf107403b178365"),x=n("73bb0e359204f9566244"),P=n("3953f1c7ed1a62f331d7"),k=n("c5bfcfb5a656275728fe"),S=n("1dd11e284115e1465ef1"),_=n("841cddf0729cf47078e9"),E=n("d733903be61208652859"),A=n("5932430beb0c05240602"),N=n("2fad9e66eff5130ad191");function M(e){return(M="function"===typeof Symbol&&"symbol"===typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"===typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(e)}function C(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);t&&(a=a.filter(function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable})),n.push.apply(n,a)}return n}function R(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?C(Object(n),!0).forEach(function(t){K(e,t,n[t])}):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):C(Object(n)).forEach(function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))})}return e}function q(e,t,n,r){a||(a="function"===typeof Symbol&&Symbol.for&&Symbol.for("react.element")||60103);var o=e&&e.defaultProps,c=arguments.length-3;if(t||0===c||(t={children:void 0}),1===c)t.children=r;else if(c>1){for(var i=new Array(c),l=0;l<c;l++)i[l]=arguments[l+3];t.children=i}if(t&&o)for(var u in o)void 0===t[u]&&(t[u]=o[u]);else t||(t=o||{});return{$$typeof:a,type:e,key:void 0===n?null:""+n,ref:null,props:t,_owner:null}}function D(e,t){for(var n=0;n<t.length;n++){var a=t[n];a.enumerable=a.enumerable||!1,a.configurable=!0,"value"in a&&(a.writable=!0),Object.defineProperty(e,a.key,a)}}function F(e,t){return(F=Object.setPrototypeOf||function(e,t){return e.__proto__=t,e})(e,t)}function B(e){var t=function(){if("undefined"===typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"===typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],function(){})),!0}catch(e){return!1}}();return function(){var n,a=T(e);if(t){var r=T(this).constructor;n=Reflect.construct(a,arguments,r)}else n=a.apply(this,arguments);return function(e,t){if(t&&("object"===M(t)||"function"===typeof t))return t;if(void 0!==t)throw new TypeError("Derived constructors may only return object or undefined");return Q(e)}(this,n)}}function Q(e){if(void 0===e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e}function T(e){return(T=Object.setPrototypeOf?Object.getPrototypeOf:function(e){return e.__proto__||Object.getPrototypeOf(e)})(e)}function K(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}var z=q("i",{className:"material-icons text-base text-indigo-500 hover:text-indigo-700"},void 0,"edit"),H=q("i",{className:"material-icons text-base text-green-400 hover:text-green-600"},void 0,"vpn_key"),J=q(c.Helmet,{},void 0,q("title",{},void 0,"Module Manage")),$=q(N.a,{}),V=q(E.a,{},void 0,"Module Manage"),G=q(b.a,{}),I=q(m.a,{}),L=function(e){!function(e,t){if("function"!==typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function");e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,writable:!0,configurable:!0}}),t&&F(e,t)}(c,o.a.PureComponent);var t,n,a,r=B(c);function c(){var e;!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,c);for(var t=arguments.length,n=new Array(t),a=0;a<t;a++)n[a]=arguments[a];return K(Q(e=r.call.apply(r,[this].concat(n))),"handleAdd",function(){e.props.clearOne(),e.props.push("/admin/module-manage/add")}),K(Q(e),"handleEdit",function(t){e.props.push("/admin/module-manage/edit/".concat(t))}),K(Q(e),"handleAccessEdit",function(t){e.props.push("/admin/module-manage/access/".concat(t))}),K(Q(e),"handleQueryChange",function(t){t.persist(),e.props.setQueryValue({key:t.target.name,value:t.target.value})}),K(Q(e),"handleSearch",function(){e.props.loadAllRequest(e.props.query)}),K(Q(e),"handleKeyPress",function(t){"Enter"===t.key&&e.handleSearch()}),K(Q(e),"handlePagination",function(t){e.props.loadAllRequest(t)}),K(Q(e),"clearFilters",function(){e.props.loadAllRequest(),e.props.clearQuery()}),e}return t=c,(n=[{key:"componentDidMount",value:function(){this.props.loadAllRequest(this.props.query)}},{key:"render",value:function(){var e=this,t=this.props,n=t.classes,a=t.all,r=a.data,c=a.page,i=a.size,l=a.totaldata,u=t.query,f=t.loading,p={page:c,size:i,totaldata:l},b=r.map(function(t){var n=t._id;return[t.module_name,t.description,o.a.createElement(o.a.Fragment,null,q("div",{className:"flex"},void 0,q("button",{"aria-label":"Edit",className:" px-1 text-center leading-none",onClick:function(){return e.handleEdit(n)}},void 0,z),q("button",{className:"ml-2 px-1 text-center leading-none",onClick:function(){return e.handleAccessEdit(n)}},void 0,H)))]});return o.a.createElement(o.a.Fragment,null,J,q("div",{className:"flex justify-between mt-3 mb-3"},void 0,f&&1==f?$:o.a.createElement(o.a.Fragment,null),V,q(s.a,{color:"primary","aria-label":"Add",className:n.fab,onClick:this.handleAdd},void 0,G)),q(A.a,{loading:f},void 0,q("div",{className:"flex"},void 0,q("div",{className:"flex relative"},void 0,q("input",{type:"text",name:"find_module_name",id:"module-name",placeholder:"Search modules by name",className:"m-auto inputbox",value:u.find_module_name,onChange:this.handleQueryChange,onKeyPress:this.handleKeyPress}),q(d.a,{"aria-label":"Search",className:"waftsrchstyle",onClick:this.handleSearch},void 0,I)),q("div",{},void 0,q("button",{"aria-label":"clear filter",className:"bg-secondary px-4 py-1 text-white  text-center rounded ml-2",onClick:this.clearFilters,type:"button"},void 0,"clear filter"))),q(x.a,{tableHead:["Module Name","Description","Action"],tableData:b,pagination:p,handlePagination:this.handlePagination})))}}])&&D(t.prototype,n),a&&D(t,a),c}(),U=Object(h.b)({all:Object(_.b)(),loading:Object(_.d)(),query:Object(_.f)()}),W=Object(v.connect)(U,R(R({},S),{},{push:O.push})),X=Object(j.a)({key:"adminModuleManage",reducer:P.a}),Y=Object(w.a)({key:"adminModuleManage",saga:k.a}),Z=l()(function(e){return{fab:{width:"40px",height:"40px",marginTop:"auto",marginBottom:"auto"},tableActionButton:{padding:0,color:"#666","&:hover":{background:"transparent",color:"#404040"}}}});t.default=Object(g.compose)(X,Y,W,Z)(L)}}]);
=======
(window.webpackJsonp=window.webpackJsonp||[]).push([[225],{"38f0f80359b6312f3191":function(e,t,n){"use strict";n.r(t),n.d(t,"AdminModuleManage",function(){return L});var a,r=n("8af190b70a6bc55c6f1b"),o=n.n(r),c=(n("8a2d1b95e05b6a321e74"),n("0d7f0986bcd2f33d8a2a")),i=n("4a683f0a5e64e66a8eb9"),l=n.n(i),u=n("e799c547a20a503b338f"),d=n.n(u),f=n("e96e82762cfd5fe3a589"),s=n.n(f),p=n("c233babf320cd068509e"),b=n.n(p),y=n("9095151026da8c51dd60"),m=n.n(y),h=n("a28fc3c963a1d4d1a2e5"),v=n("d7dd51e1bf6bfc2c9c3d"),g=n("ab4cb61bcb2dc161defb"),O=n("3aced5b508e7389026da"),w=n("adc20f99e57c573c589c"),j=n("d95b0cf107403b178365"),x=n("73bb0e359204f9566244"),P=n("3953f1c7ed1a62f331d7"),k=n("c5bfcfb5a656275728fe"),S=n("1dd11e284115e1465ef1"),_=n("841cddf0729cf47078e9"),E=n("d733903be61208652859"),A=n("5932430beb0c05240602"),N=n("2fad9e66eff5130ad191");function M(e){return(M="function"===typeof Symbol&&"symbol"===typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"===typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(e)}function C(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);t&&(a=a.filter(function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable})),n.push.apply(n,a)}return n}function R(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?C(Object(n),!0).forEach(function(t){K(e,t,n[t])}):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):C(Object(n)).forEach(function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))})}return e}function q(e,t,n,r){a||(a="function"===typeof Symbol&&Symbol.for&&Symbol.for("react.element")||60103);var o=e&&e.defaultProps,c=arguments.length-3;if(t||0===c||(t={children:void 0}),1===c)t.children=r;else if(c>1){for(var i=new Array(c),l=0;l<c;l++)i[l]=arguments[l+3];t.children=i}if(t&&o)for(var u in o)void 0===t[u]&&(t[u]=o[u]);else t||(t=o||{});return{$$typeof:a,type:e,key:void 0===n?null:""+n,ref:null,props:t,_owner:null}}function D(e,t){for(var n=0;n<t.length;n++){var a=t[n];a.enumerable=a.enumerable||!1,a.configurable=!0,"value"in a&&(a.writable=!0),Object.defineProperty(e,a.key,a)}}function F(e,t){return(F=Object.setPrototypeOf||function(e,t){return e.__proto__=t,e})(e,t)}function B(e){var t=function(){if("undefined"===typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"===typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],function(){})),!0}catch(e){return!1}}();return function(){var n,a=T(e);if(t){var r=T(this).constructor;n=Reflect.construct(a,arguments,r)}else n=a.apply(this,arguments);return function(e,t){if(t&&("object"===M(t)||"function"===typeof t))return t;if(void 0!==t)throw new TypeError("Derived constructors may only return object or undefined");return Q(e)}(this,n)}}function Q(e){if(void 0===e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e}function T(e){return(T=Object.setPrototypeOf?Object.getPrototypeOf:function(e){return e.__proto__||Object.getPrototypeOf(e)})(e)}function K(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}var z=q("i",{className:"material-icons text-base text-indigo-500 hover:text-indigo-700"},void 0,"edit"),H=q("i",{className:"material-icons text-base text-green-400 hover:text-green-600"},void 0,"vpn_key"),J=q(c.Helmet,{},void 0,q("title",{},void 0,"Module Manage")),$=q(N.a,{}),V=q(E.a,{},void 0,"Module Manage"),G=q(b.a,{}),I=q(m.a,{}),L=function(e){!function(e,t){if("function"!==typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function");e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,writable:!0,configurable:!0}}),t&&F(e,t)}(c,o.a.PureComponent);var t,n,a,r=B(c);function c(){var e;!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,c);for(var t=arguments.length,n=new Array(t),a=0;a<t;a++)n[a]=arguments[a];return K(Q(e=r.call.apply(r,[this].concat(n))),"handleAdd",function(){e.props.clearOne(),e.props.push("/admin/module-manage/add")}),K(Q(e),"handleEdit",function(t){e.props.push("/admin/module-manage/edit/".concat(t))}),K(Q(e),"handleAccessEdit",function(t){e.props.push("/admin/module-manage/access/".concat(t))}),K(Q(e),"handleQueryChange",function(t){t.persist(),e.props.setQueryValue({key:t.target.name,value:t.target.value})}),K(Q(e),"handleSearch",function(){e.props.loadAllRequest(e.props.query)}),K(Q(e),"handleKeyPress",function(t){"Enter"===t.key&&e.handleSearch()}),K(Q(e),"handlePagination",function(t){e.props.loadAllRequest(t)}),K(Q(e),"clearFilters",function(){e.props.loadAllRequest(),e.props.clearQuery()}),e}return t=c,(n=[{key:"componentDidMount",value:function(){this.props.loadAllRequest(this.props.query)}},{key:"render",value:function(){var e=this,t=this.props,n=t.classes,a=t.all,r=a.data,c=a.page,i=a.size,l=a.totaldata,u=t.query,f=t.loading,p={page:c,size:i,totaldata:l},b=r.map(function(t){var n=t._id;return[t.module_name,t.description,o.a.createElement(o.a.Fragment,null,q("div",{className:"flex"},void 0,q("button",{"aria-label":"Edit",className:" px-1 text-center leading-none",onClick:function(){return e.handleEdit(n)}},void 0,z),q("button",{className:"ml-2 px-1 text-center leading-none",onClick:function(){return e.handleAccessEdit(n)}},void 0,H)))]});return o.a.createElement(o.a.Fragment,null,J,q("div",{className:"flex justify-between mt-3 mb-3"},void 0,f&&1==f?$:o.a.createElement(o.a.Fragment,null),V,q(s.a,{color:"primary","aria-label":"Add",className:n.fab,onClick:this.handleAdd},void 0,G)),q(A.a,{loading:f},void 0,q("div",{className:"flex"},void 0,q("div",{className:"flex relative"},void 0,q("input",{type:"text",name:"find_module_name",id:"module-name",placeholder:"Search modules by name",className:"m-auto inputbox",value:u.find_module_name,onChange:this.handleQueryChange,onKeyPress:this.handleKeyPress}),q(d.a,{"aria-label":"Search",className:"waftsrchstyle",onClick:this.handleSearch},void 0,I)),q("div",{},void 0,q("button",{"aria-label":"clear filter",className:"bg-secondary px-4 py-1 text-white  text-center rounded ml-2",onClick:this.clearFilters,type:"button"},void 0,"clear filter"))),q(x.a,{tableHead:["Module Name","Description","Action"],tableData:b,pagination:p,handlePagination:this.handlePagination})))}}])&&D(t.prototype,n),a&&D(t,a),c}(),U=Object(h.b)({all:Object(_.b)(),loading:Object(_.d)(),query:Object(_.f)()}),W=Object(v.connect)(U,R(R({},S),{},{push:O.push})),X=Object(j.a)({key:"adminModuleManage",reducer:P.a}),Y=Object(w.a)({key:"adminModuleManage",saga:k.a}),Z=l()(function(e){return{fab:{width:"40px",height:"40px",marginTop:"auto",marginBottom:"auto"},tableActionButton:{padding:0,color:"#666","&:hover":{background:"transparent",color:"#404040"}}}});t.default=Object(g.compose)(X,Y,W,Z)(L)}}]);
>>>>>>> 41f64895ae2d4aeb7736fd90e084d7a063de2675:client/build/225.3802cef1f84d1b844857.chunk.js