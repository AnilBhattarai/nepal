(window.webpackJsonp=window.webpackJsonp||[]).push([[109],{"059040756c929fa8b9bb":function(e,t,n){"use strict";var r={};n.r(r),n.d(r,"loadFilesRequest",function(){return _}),n.d(r,"loadFilesSuccess",function(){return g}),n.d(r,"loadFilesFailure",function(){return F}),n.d(r,"loadFoldersRequest",function(){return j}),n.d(r,"loadFoldersSuccess",function(){return w}),n.d(r,"loadFoldersFailure",function(){return R}),n.d(r,"addMediaRequest",function(){return k}),n.d(r,"addMediaSuccess",function(){return x}),n.d(r,"addMediaFailure",function(){return D}),n.d(r,"loadNewFolderRequest",function(){return C}),n.d(r,"loadNewFolderSuccess",function(){return L}),n.d(r,"loadNewFolderFailure",function(){return A}),n.d(r,"renameFolderRequest",function(){return N}),n.d(r,"renameFolderSuccess",function(){return I}),n.d(r,"renameFolderFailure",function(){return P}),n.d(r,"setFolderName",function(){return U}),n.d(r,"clearValue",function(){return M}),n.d(r,"folderDeleteRequest",function(){return q}),n.d(r,"folderDeleteSuccess",function(){return T}),n.d(r,"folderDeleteFailure",function(){return $}),n.d(r,"fileDeleteRequest",function(){return K}),n.d(r,"fileDeleteSuccess",function(){return Q}),n.d(r,"fileDeleteFailure",function(){return H}),n.d(r,"addChosenFile",function(){return V}),n.d(r,"clearChosen",function(){return W}),n.d(r,"addChosenFolder",function(){return z}),n.d(r,"deleteMultipleRequest",function(){return J}),n.d(r,"deleteMultipleSuccess",function(){return B}),n.d(r,"deleteMultipleFailure",function(){return G});var a=n("8af190b70a6bc55c6f1b"),o=n.n(a),i=(n("8a2d1b95e05b6a321e74"),n("d7dd51e1bf6bfc2c9c3d")),l=n("a28fc3c963a1d4d1a2e5"),c=n("ab4cb61bcb2dc161defb"),u=n("c25d3de6a26e2dd439cd"),d=n.n(u),s=n("adc20f99e57c573c589c"),f=n("d95b0cf107403b178365"),p="app/EditorFileSelect/LOAD_FILES_REQUEST",b="app/EditorFileSelect/LOAD_FOLDERS_REQUEST",m="app/EditorFileSelect/ADD_MEDIA_REQUEST",y="app/EditorFileSelect/LOAD_NEW_FOLDER_REQUEST",v="app/EditorFileSelect/DELETE_FOLDER_REQUEST",E="app/EditorFileSelect/DELETE_FILE_REQUEST",h="app/EditorFileSelect/DELETE_MULTIPLE_REQUEST",O="app/EditorFileSelect/DELETE_MULTIPLE_SUCCESS",S="app/EditorFileSelect/DELETE_MULTIPLE_FAILURE",_=function(e){return{type:p,payload:e}},g=function(e){return{type:"app/EditorFileSelect/LOAD_FILES_SUCCESS",payload:e}},F=function(e){return{type:"app/EditorFileSelect/LOAD_FILES_FAILURE",payload:e}},j=function(e){return{type:b,payload:e}},w=function(e){return{type:"app/EditorFileSelect/LOAD_FOLDERS_SUCCESS",payload:e}},R=function(e){return{type:"app/EditorFileSelect/LOAD_FOLDERS_FAILURE",payload:e}},k=function(e,t){return{type:m,payload:e,metadata:t}},x=function(e){return{type:"app/EditorFileSelect/ADD_MEDIA_SUCCESS",payload:e}},D=function(e){return{type:"app/EditorFileSelect/ADD_MEDIA_FAILURE",payload:e}},C=function(e,t){return{type:y,payload:e,metadata:t}},L=function(e){return{type:"app/EditorFileSelect/LOAD_NEW_FOLDER_SUCCESS",payload:e}},A=function(e){return{type:"app/EditorFileSelect/LOAD_NEW_FOLDER_FAILURE",payload:e}},N=function(e){return{type:"app/EditorFileSelect/RENAME_FOLDER_REQUEST",payload:e}},I=function(e){return{type:"app/EditorFileSelect/RENAME_FOLDER_SUCCESS",payload:e}},P=function(e){return{type:"app/EditorFileSelect/RENAME_FOLDER_FAILURE",payload:e}},U=function(e){return{type:"app/EditorFileSelect/SET_NAME_VALUE",payload:e}},M=function(e){return{type:"app/EditorFileSelect/CLEAR_VALUE",payload:e}},q=function(e){return{type:v,payload:e}},T=function(e){return{type:"app/EditorFileSelect/DELETE_FOLDER_SUCCESS",payload:e}},$=function(e){return{type:"app/EditorFileSelect/DELETE_FOLDER_FAILURE",payload:e}},K=function(e){return{type:E,payload:e}},Q=function(e){return{type:"app/EditorFileSelect/DELETE_FILE_SUCCESS",payload:e}},H=function(e){return{type:"app/EditorFileSelect/DELETE_FILE_FAILURE",payload:e}},V=function(e){return{type:"app/EditorFileSelect/ADD_CHOSEN_FILE",payload:e}},W=function(e){return{type:"app/EditorFileSelect/CLEAR_CHOSEN",payload:e}},z=function(e){return{type:"app/EditorFileSelect/ADD_CHOSEN_FOLDER",payload:e}},J=function(e){return{type:h,payload:e}},B=function(e){return{type:O,payload:e}},G=function(e){return{type:S,payload:e}},X=n("7edf83707012a871cdfb");function Y(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter(function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable})),n.push.apply(n,r)}return n}function Z(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?Y(Object(n),!0).forEach(function(t){ee(e,t,n[t])}):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):Y(Object(n)).forEach(function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))})}return e}function ee(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function te(e){return function(e){if(Array.isArray(e))return ne(e)}(e)||function(e){if("undefined"!==typeof Symbol&&null!=e[Symbol.iterator]||null!=e["@@iterator"])return Array.from(e)}(e)||function(e,t){if(!e)return;if("string"===typeof e)return ne(e,t);var n=Object.prototype.toString.call(e).slice(8,-1);"Object"===n&&e.constructor&&(n=e.constructor.name);if("Map"===n||"Set"===n)return Array.from(e);if("Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n))return ne(e,t)}(e)||function(){throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function ne(e,t){(null==t||t>e.length)&&(t=e.length);for(var n=0,r=new Array(t);n<t;n++)r[n]=e[n];return r}var re={all:{files:{data:[],totaldata:0},folders:{data:[],totaldata:0},self:{name:"Root",path:[]}},folderOne:{name:"",is_root:!1},folderAddRequest:!1,folderRename:!1,loading:!1,chosen:[],chosen_files:[],chosen_folders:[]},ae=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:re,t=arguments.length>1?arguments[1]:void 0;return Object(X.a)(e,function(n){switch(t.type){case p:n.loading=!0;break;case"app/EditorFileSelect/LOAD_FILES_SUCCESS":n.loading=!1,n.all=t.payload.data;break;case"app/EditorFileSelect/LOAD_FILES_FAILURE":n.loading=!1;break;case"app/EditorFileSelect/SET_NAME_VALUE":n.folderOne[t.payload.key]=t.payload.value;break;case"app/EditorFileSelect/CLEAR_VALUE":n.folderOne.name=re.folderOne.name;break;case y:n.folderAddRequest=!0;break;case"app/EditorFileSelect/LOAD_NEW_FOLDER_SUCCESS":n.folderAddRequest=!1,n.all.folders.data=[].concat(te(e.all.folders.data),[{name:t.payload.data.name,_id:t.payload.data._id}]),n.all.folders.totaldata=e.all.folders.totaldata+1;break;case"app/EditorFileSelect/RENAME_FOLDER_REQUEST":n.folderRename=!0;break;case"app/EditorFileSelect/RENAME_FOLDER_SUCCESS":n.folderRename=!1,n.all.folders.data=e.all.folders.data.map(function(e){return e._id===t.payload.data._id?t.payload.data:e});break;case"app/EditorFileSelect/RENAME_FOLDER_FAILURE":n.folderRename=!1;break;case"app/EditorFileSelect/LOAD_NEW_FOLDER_FAILURE":n.folderAddRequest=!1;break;case"app/EditorFileSelect/ADD_MEDIA_SUCCESS":n.all.files.data=[].concat(te(e.all.files.data),te(t.payload.data.map(function(e){return Z({},e)}))),n.all.files.totaldata=e.all.files.totaldata+1;break;case"app/EditorFileSelect/DELETE_FOLDER_SUCCESS":n.all.folders=Z(Z({},e.all.folders),{},{data:e.all.folders.data.filter(function(e){return e._id!=t.payload.data._id})}),n.all.folders.totaldata=e.all.folders.totaldata-1;break;case"app/EditorFileSelect/DELETE_FILE_SUCCESS":n.all.files=Z(Z({},e.all.files),{},{data:e.all.files.data.filter(function(e){return e._id!=t.payload.data._id})}),n.all.files.totaldata=e.all.files.totaldata-1;break;case"app/EditorFileSelect/ADD_CHOSEN_FILE":var r=n.chosen.indexOf(t.payload._id);if(r>=0){var a=te(n.chosen),o=te(n.chosen_files);a.splice(r,1),o.splice(r,1),n.chosen=a,n.chosen_files=o}else n.chosen=[].concat(te(n.chosen),[t.payload._id]),n.chosen_files=[].concat(te(n.chosen_files),[t.payload]);break;case"app/EditorFileSelect/CLEAR_CHOSEN":n.chosen=re.chosen,n.chosen_files=re.chosen_files,n.chosen_folders=re.chosen_folders;break;case"app/EditorFileSelect/ADD_CHOSEN_FOLDER":var i=n.chosen_folders.indexOf(t.payload._id);if(i>=0){var l=te(n.chosen_folders);l.splice(i,1),n.chosen_folders=l}else n.chosen_folders=[].concat(te(n.chosen_folders),[t.payload._id]);break;case h:n.loading=!0;break;case O:n.chosen=re.chosen,n.chosen_files=re.chosen_files,n.chosen_folders=re.chosen_folders,n.loading=!1;break;case S:n.loading=!1}})},oe=function(e){return e.editorFileSelect||re},ie=function(){return Object(l.a)(oe,function(e){return e.all})},le=function(){return Object(l.a)(oe,function(e){return e.folderOne})},ce=function(){return Object(l.a)(oe,function(e){return e.chosen})},ue=function(){return Object(l.a)(oe,function(e){return e.chosen_folders})},de=n("d782b72bc5b680c7122c"),se=n("6144be5eac76f277117a"),fe=n("6542cd13fd5dd1bcffd4"),pe=n("a72b40110d9c31c9b5c5");function be(e){return function(e){if(Array.isArray(e))return me(e)}(e)||function(e){if("undefined"!==typeof Symbol&&null!=e[Symbol.iterator]||null!=e["@@iterator"])return Array.from(e)}(e)||function(e,t){if(!e)return;if("string"===typeof e)return me(e,t);var n=Object.prototype.toString.call(e).slice(8,-1);"Object"===n&&e.constructor&&(n=e.constructor.name);if("Map"===n||"Set"===n)return Array.from(e);if("Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n))return me(e,t)}(e)||function(){throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function me(e,t){(null==t||t>e.length)&&(t=e.length);for(var n=0,r=new Array(t);n<t;n++)r[n]=e[n];return r}function ye(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter(function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable})),n.push.apply(n,r)}return n}function ve(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?ye(Object(n),!0).forEach(function(t){Ee(e,t,n[t])}):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):ye(Object(n)).forEach(function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))})}return e}function Ee(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}var he=regeneratorRuntime.mark(xe),Oe=regeneratorRuntime.mark(De),Se=regeneratorRuntime.mark(Ce),_e=regeneratorRuntime.mark(Le),ge=regeneratorRuntime.mark(Ae),Fe=regeneratorRuntime.mark(Ne),je=regeneratorRuntime.mark(Ie),we=regeneratorRuntime.mark(Pe),Re=regeneratorRuntime.mark(Ue),ke=regeneratorRuntime.mark(Me);function xe(){return regeneratorRuntime.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,Object(de.select)(Object(fe.j)());case 2:e.sent;case 3:case"end":return e.stop()}},he)}function De(e){var t,n;return regeneratorRuntime.wrap(function(r){for(;;)switch(r.prev=r.next){case 0:return r.next=2,Object(de.select)(Object(fe.j)());case 2:return t=r.sent,n="root",e.payload&&(n=e.payload),r.next=7,Object(de.call)(se.a.get("files/folder/".concat(n),g,F,t));case 7:case"end":return r.stop()}},Oe)}function Ce(e){var t;return regeneratorRuntime.wrap(function(n){for(;;)switch(n.prev=n.next){case 0:return n.next=2,Object(de.select)(Object(fe.j)());case 2:return t=n.sent,n.next=5,Object(de.call)(se.a.multipartPost("files/file/".concat(e.payload.folder_id),x,D,{},{file:e.payload.file},t));case 5:case"end":return n.stop()}},Se)}function Le(e){var t;return regeneratorRuntime.wrap(function(n){for(;;)switch(n.prev=n.next){case 0:return n.next=2,Object(de.select)(Object(fe.j)());case 2:return t=n.sent,n.next=5,Object(de.call)(se.a.delete("files/folder/".concat(e.payload),T,$,t));case 5:case"end":return n.stop()}},_e)}function Ae(e){var t;return regeneratorRuntime.wrap(function(n){for(;;)switch(n.prev=n.next){case 0:return n.next=2,Object(de.select)(Object(fe.j)());case 2:return t=n.sent,n.next=5,Object(de.call)(se.a.delete("files/file/".concat(e.payload),Q,H,t));case 5:case"end":return n.stop()}},ge)}function Ne(e){var t,n,r,a;return regeneratorRuntime.wrap(function(o){for(;;)switch(o.prev=o.next){case 0:return o.next=2,Object(de.select)(Object(fe.j)());case 2:return t=o.sent,o.next=5,Object(de.select)(le());case 5:return n=o.sent,r=ve({},n),a=L,e.payload.value&&e.payload.name&&(r._id=e.payload.value,r.name=e.payload.name,a=I),o.next=11,Object(de.call)(se.a.post("files/folder/".concat(e.payload.key),a,A,r,t));case 11:case"end":return o.stop()}},Fe)}function Ie(e){var t,n,r,a;return regeneratorRuntime.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,Object(de.select)(Object(fe.j)());case 2:return t=e.sent,e.next=5,Object(de.select)(ce());case 5:return n=e.sent,e.next=8,Object(de.select)(ue());case 8:return r=e.sent,a={folder_id:be(r),file_id:be(n)},e.next=12,Object(de.call)(se.a.post("media/deleteall",B,G,a,t));case 12:case"end":return e.stop()}},je)}function Pe(e){var t,n;return regeneratorRuntime.wrap(function(r){for(;;)switch(r.prev=r.next){case 0:return r.next=2,Object(de.select)(ie());case 2:if(!(t=r.sent).self){r.next=6;break}return r.next=6,Object(de.put)(_(t.self._id));case 6:return n={message:e.payload.msg||"Delete success",options:{variant:"success"}},r.next=9,Object(de.put)(Object(pe.enqueueSnackbar)(n));case 9:case"end":return r.stop()}},we)}function Ue(e){var t;return regeneratorRuntime.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return t={message:"Something went wrong while deleting!!",options:{variant:"warning"}},e.next=3,Object(de.put)(Object(pe.enqueueSnackbar)(t));case 3:case"end":return e.stop()}},Re)}function Me(){return regeneratorRuntime.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,Object(de.takeLatest)(p,De);case 2:return e.next=4,Object(de.takeLatest)(b,xe);case 4:return e.next=6,Object(de.takeLatest)(v,Le);case 6:return e.next=8,Object(de.takeLatest)(E,Ae);case 8:return e.next=10,Object(de.takeLatest)(m,Ce);case 10:return e.next=12,Object(de.takeLatest)(y,Ne);case 12:return e.next=14,Object(de.takeLatest)(h,Ie);case 14:return e.next=16,Object(de.takeLatest)(O,Pe);case 16:return e.next=18,Object(de.takeLatest)(S,Ue);case 18:case"end":return e.stop()}},ke)}var qe,Te=n("3aced5b508e7389026da"),$e=n("23b8d02be40765ac53e3"),Ke=n.n($e),Qe=n("e68eb59aa96fc65ab714"),He=n.n(Qe),Ve=n("e727e731a9bed8ec3c2a"),We=n.n(Ve),ze=n("eb6b79030a47f0b10efc"),Je=n.n(ze),Be=n("1551459233b95bf53af9"),Ge=n.n(Be),Xe=n("10e4c616cb3b01bafafd"),Ye=n.n(Xe),Ze=n("4a683f0a5e64e66a8eb9"),et=n.n(Ze),tt=n("c502bee2fd4be3dd7f62"),nt=n.n(tt),rt=n("5932430beb0c05240602"),at=n("fcb99a06256635f70435"),ot=n("3ed81f8d24b90b29f580"),it=n("2fad9e66eff5130ad191");var lt,ct=Object(ot.a)(function(){return Promise.resolve().then(n.bind(null,"6ccb783811b607814817"))},{fallback:function(e,t,n,r){qe||(qe="function"===typeof Symbol&&Symbol.for&&Symbol.for("react.element")||60103);var a=e&&e.defaultProps,o=arguments.length-3;if(t||0===o||(t={children:void 0}),1===o)t.children=r;else if(o>1){for(var i=new Array(o),l=0;l<o;l++)i[l]=arguments[l+3];t.children=i}if(t&&a)for(var c in a)void 0===t[c]&&(t[c]=a[c]);else t||(t=a||{});return{$$typeof:qe,type:e,key:void 0===n?null:""+n,ref:null,props:t,_owner:null}}(it.a,{})}),ut=n("61118b78f8958645f2e4"),dt=["children","staticContext"],st=["addMediaRequest","all","one","queryObj","loadFilesRequest","loadNewFolderRequest","renameFolderRequest","folderDeleteRequest","fileDeleteRequest","setFolderName","folderAdded","folderRename","clearValue","loading","addChosenFile","chosen","chosen_files","clearChosen","addChosenFolder","chosen_folders","deleteMultipleRequest"];function ft(){return(ft=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(e[r]=n[r])}return e}).apply(this,arguments)}function pt(e,t,n,r){lt||(lt="function"===typeof Symbol&&Symbol.for&&Symbol.for("react.element")||60103);var a=e&&e.defaultProps,o=arguments.length-3;if(t||0===o||(t={children:void 0}),1===o)t.children=r;else if(o>1){for(var i=new Array(o),l=0;l<o;l++)i[l]=arguments[l+3];t.children=i}if(t&&a)for(var c in a)void 0===t[c]&&(t[c]=a[c]);else t||(t=a||{});return{$$typeof:lt,type:e,key:void 0===n?null:""+n,ref:null,props:t,_owner:null}}function bt(e){return function(e){if(Array.isArray(e))return Ot(e)}(e)||function(e){if("undefined"!==typeof Symbol&&null!=e[Symbol.iterator]||null!=e["@@iterator"])return Array.from(e)}(e)||ht(e)||function(){throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function mt(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter(function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable})),n.push.apply(n,r)}return n}function yt(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?mt(Object(n),!0).forEach(function(t){vt(e,t,n[t])}):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):mt(Object(n)).forEach(function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))})}return e}function vt(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function Et(e,t){return function(e){if(Array.isArray(e))return e}(e)||function(e,t){var n=null==e?null:"undefined"!==typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(null==n)return;var r,a,o=[],i=!0,l=!1;try{for(n=n.call(e);!(i=(r=n.next()).done)&&(o.push(r.value),!t||o.length!==t);i=!0);}catch(e){l=!0,a=e}finally{try{i||null==n.return||n.return()}finally{if(l)throw a}}return o}(e,t)||ht(e,t)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function ht(e,t){if(e){if("string"===typeof e)return Ot(e,t);var n=Object.prototype.toString.call(e).slice(8,-1);return"Object"===n&&e.constructor&&(n=e.constructor.name),"Map"===n||"Set"===n?Array.from(e):"Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)?Ot(e,t):void 0}}function Ot(e,t){(null==t||t>e.length)&&(t=e.length);for(var n=0,r=new Array(t);n<t;n++)r[n]=e[n];return r}function St(e,t){if(null==e)return{};var n,r,a=function(e,t){if(null==e)return{};var n,r,a={},o=Object.keys(e);for(r=0;r<o.length;r++)n=o[r],t.indexOf(n)>=0||(a[n]=e[n]);return a}(e,t);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);for(r=0;r<o.length;r++)n=o[r],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(a[n]=e[n])}return a}var _t,gt=function(e){var t=e.children,n=(e.staticContext,St(e,dt));return o.a.createElement("div",n,t)},Ft=pt(Je.a,{},void 0,"New Folder"),jt=pt("i",{className:"material-icons text-base mr-2"},void 0,"filter"),wt=pt("span",{},void 0,"Upload Multiple"),Rt=pt("i",{className:"material-icons text-base mr-2"},void 0,"filter"),kt=pt("span",{},void 0,"Select Multiple"),xt=pt("i",{className:"material-icons text-base mr-2"},void 0,"add_to_photos"),Dt=pt("span",{},void 0,"Choose File"),Ct=pt("i",{className:"material-icons text-base mr-2"},void 0,"add"),Lt=pt("span",{},void 0,"New Folder"),At=pt("i",{className:"material-icons text-base mr-2"},void 0,"edit"),Nt=pt("span",{},void 0,"Rename"),It=pt("i",{className:"material-icons text-base mr-2"},void 0,"delete"),Pt=pt("span",{},void 0,"Confirm Delete"),Ut=pt("i",{className:"material-icons text-base mr-2"},void 0,"delete"),Mt=pt("span",{},void 0,"Delete"),qt=pt(Je.a,{},void 0,"Rename Folder"),Tt=pt("p",{className:"italic w-full block py-2"},void 0,"Note : Please Click the given button first for selecting"," ",pt("span",{className:"font-bold"},void 0,"Multiple Images, Renaming folders and Deleting files"),"!!!"),$t=pt(He.a,{}),Kt=pt("div",{className:"text-center w-full text-sm h-64"},void 0,"This Folder is Empty"),Qt=Object(l.b)({all:ie(),one:le(),folderAdded:Object(l.a)(oe,function(e){return e.folderAddRequest}),folderRename:Object(l.a)(oe,function(e){return e.folderRename}),loading:Object(l.a)(oe,function(e){return e.loading}),chosen:ce(),chosen_files:Object(l.a)(oe,function(e){return e.chosen_files}),chosen_folders:ue()}),Ht=et()(function(e){return{button:{margin:e.spacing.unit},fab:{width:"40px",height:"40px",marginTop:"auto",marginBottom:"auto"}}}),Vt=Object(i.connect)(Qt,yt(yt({},r),{},{push:Te.push})),Wt=Object(c.compose)(Vt,Ht)(function(e){var t=e.addMediaRequest,n=e.all,r=n.files,i=n.folders,l=n.self,c=e.one,u=e.queryObj,s=(e.loadFilesRequest,e.loadNewFolderRequest),f=e.renameFolderRequest,p=e.folderDeleteRequest,b=e.fileDeleteRequest,m=e.setFolderName,y=e.folderAdded,v=e.folderRename,E=e.clearValue,h=e.loading,O=e.addChosenFile,S=(e.chosen,e.chosen_files),_=e.clearChosen,g=e.addChosenFolder,F=e.chosen_folders,j=e.deleteMultipleRequest,w=St(e,st),R=Et(Object(a.useState)(!1),2),k=R[0],x=R[1],D=Et(Object(a.useState)(""),2),C=D[0],L=D[1],A=Et(Object(a.useState)(""),2),N=(A[0],A[1]),I=Et(Object(a.useState)(""),2),P=(I[0],I[1]),U=Et(Object(a.useState)(!1),2),M=U[0],q=U[1],T=Et(Object(a.useState)(""),2),$=T[0],K=T[1],Q=Et(Object(a.useState)(""),2),H=Q[0],V=Q[1],W=Et(Object(a.useState)(""),2),z=W[0],J=(W[1],Et(Object(a.useState)(""),2)),B=J[0],G=(J[1],Et(Object(a.useState)(!1),2)),X=G[0],Y=G[1],Z=Et(Object(a.useState)(!1),2),ee=Z[0],te=Z[1],ne=Et(Object(a.useState)(!1),2),re=ne[0],ae=ne[1],oe=Et(Object(a.useState)(!1),2),ie=oe[0],le=oe[1],ce=Et(Object(a.useState)(""),2),ue=ce[0],de=ce[1];Object(a.useEffect)(function(){y||(x(!1),E()),_()},[y]),Object(a.useEffect)(function(){v||q(!1),_()},[v]),Object(a.useEffect)(function(){de("")},[r]);var se=function(){x(!1)},fe=function(e){L("");var t=d.a.stringify(yt(yt({},u),{},{path:e}));w.push({search:t})},pe=function(e){L(C===e?"":e)},be=function(e){N(e)},me=function(e){P(e)},ye=function(){q(!1)},ve=[];l.path.map(function(e){return ve=[].concat(bt(ve),[{path:"/editor-file-select?CKEditor=editor1&CKEditorFuncNum=1&langCode=en",label:e.name,id:e._id}]),null}),ve=[].concat(bt(ve),[{path:"/editor-file-select?CKEditor=editor1&CKEditorFuncNum=1&langCode=en",label:l.name,id:l._id}]);return pt(rt.a,{loading:h},void 0,pt(We.a,{open:k,onClose:se,"aria-labelledby":"new-folder"},void 0,Ft,pt(Ge.a,{},void 0,pt("input",{autoFocus:!0,id:"name",type:"text",className:"inputbox",onChange:function(e){m({key:"name",value:e.target.value})},value:c.name})),pt(Ye.a,{},void 0,pt("button",{onClick:se,color:"bg-secondary px-4 py-2 text-sm rounded text-white flex items-center"},void 0,"Cancel"),pt("button",{onClick:function(){s({key:l._id})},className:"bg-primary px-4 py-2 text-sm rounded text-white flex items-center",disabled:y},void 0,"Save"))),pt("div",{className:"flex items-center justify-between mt-3 mb-3"},void 0,pt("div",{className:"my-auto"},void 0,pt(ct,{linkcomponent:gt,routeList:ve,onClick:function(e){fe(e.id)}})),pt("div",{className:"flex media_btn"},void 0,"Multiple"===ue&&S.length>0?pt("button",{onClick:function(){w.uploadMultiple?w.uploadMultiple(S):window.alert("Define function for multiple upload where this component is called. Pass it as uploadMultiple in props")},className:"blink items-center flex btn bg-pink-500 hover:bg-pink-400 mr-2"},void 0,jt,wt):pt("button",{onClick:function(){le("Multiple"!==ue||!ie),ae(!1),de("Multiple"),_()},className:"items-center flex btn bg-pink-500 hover:bg-pink-400 mr-2"},void 0,Rt,kt),pt(Ke.a,{onDrop:function(e){return n=e,r=l._id,void t({file:n,folder_id:r});var n,r}},void 0,function(e){var t=e.getRootProps,n=e.getInputProps;return pt("section",{className:"btn bg-info hover:bg-secondary mr-2 cursor-pointer"},void 0,o.a.createElement("div",ft({className:"flex items-center "},t()),o.a.createElement("input",n()),xt,Dt))}),pt("button",{onClick:function(){x(!0)},className:"items-center flex btn bg-primary hover:bg-secondary mr-2"},void 0,Ct,Lt),pt("button",{onClick:function(){ae("Rename"!==ue||!re),le(!1),de("Rename"),_()},className:"items-center flex bg-yellow-600 hover:bg-yellow-400 btn mr-2"},void 0," ",At,Nt),"Delete"===ue&&(S.length>0||F.length>0)?pt("button",{onClick:function(){j()},className:"blink items-center flex btn bg-red-600 hover:bg-red-500"},void 0,It,Pt):pt("button",{onClick:function(){"Delete"===ue?(le(!ie),ae(!re)):(le(!0),ae(!0)),de("Delete"),_()},className:"items-center flex btn bg-red-600 hover:bg-red-500"},void 0,Ut,Mt))),pt(We.a,{open:M,onClose:ye,"aria-labelledby":"rename-folder"},void 0,qt,pt(Ge.a,{},void 0,pt("input",{autoFocus:!0,id:"rename",type:"text",className:"inputbox",onChange:function(e){V(e.target.value)},value:H,onKeyDown:function(e){"Enter"===e.key&&s({key:l._id,value:$,name:H})}})),pt(Ye.a,{},void 0,pt("button",{onClick:ye,color:"bg-secondary px-4 py-2 text-sm rounded text-white flex items-center"},void 0,"Cancel"),pt("button",{onClick:function(){s({key:l._id,value:$,name:H})},className:"bg-primary px-4 py-2 text-sm rounded text-white flex items-center"},void 0,"Save"))),pt(ut.a,{open:X,doClose:function(){Y(!1)},doDelete:function(){p(z),Y(!1)}}),pt(ut.a,{open:ee,doClose:function(){te(!1)},doDelete:function(){b(B),te(!1)}}),pt("div",{className:"flex flex-wrap bg-white mt-2 shadow p-4"},void 0,Tt,i.data.map(function(e){return pt("div",{className:"mediaCont border p-1 relative overflow-hidden mr-4 hover:border-primary",onMouseOver:function(){return be(e._id)},onMouseLeave:function(){return be("")}},e._id,pt("div",{className:"".concat(re?"":"mediaCheck"," absolute")},void 0,"Rename"===ue&&pt("button",{className:"hover:text-blue-500",onClick:function(){return t=e._id,n=e.name,K(t),V(n),q(!0),void f();var t,n}},void 0,$t),"Delete"===ue&&pt(nt.a,{value:"secondary",color:"secondary",style:{padding:0},onClick:function(){return g(e)}})),pt("div",{className:"".concat(C===e._id?"folder_media":""," flex flex-col w-32 h-32 text-center cursor-pointer overflow-hidden mt-8"),onClick:function(){return pe(e._id)},onDoubleClick:function(){return fe(e._id)},onKeyDown:function(){return fe(e._id)},role:"presentation"},void 0,pt("div",{className:"flex h-24 justify-center"},void 0,pt("i",{className:"material-icons text-yellow-500 self-center",style:{fontSize:"6rem"}},void 0,"folder")),pt("div",{className:"block text-sm truncate"},void 0,e.name)))}),r.data.map(function(e,t){return pt("div",{className:"mediaCont border p-1 relative overflow-hidden mr-4 hover:border-primary",onMouseOver:function(){return me(e._id)},onMouseLeave:function(){return me("")}},e._id,pt("div",{className:"".concat(ie?"":"mediaCheck"," absolute")},void 0,"Multiple"===ue&&pt(nt.a,{value:"primary",color:"primary",style:{padding:0},onClick:function(){O(e)}}),"Delete"===ue&&pt(nt.a,{value:"secondary",color:"secondary",style:{padding:0},onClick:function(){return O(e)}})),pt("div",{className:"".concat(C===e._id?"folder_media":""," flex flex-col w-32 h-32 text-center cursor-pointer overflow-hidden mt-8")},void 0,pt("div",{className:"flex h-24"},void 0,pt("img",{className:"w-full h-24 object-contain",src:"".concat(at.g).concat(e.path),alt:e.filename,onClick:function(){return pe(e._id)},onDoubleClick:function(){return t=e,w.selectFile?w.selectFile(t):window.opener.CKEDITOR.tools.callFunction(u.CKEditorFuncNum,"".concat(at.g).concat(t.path)),void window.close();var t},onKeyDown:function(){return fe(e._id)},role:"presentation"})),pt("div",{className:"truncate text-sm"},void 0,e.filename)))}),i.data.length<1&&r.data.length<1&&Kt))});n("73569516ae665a75d80d");function zt(e,t,n,r){_t||(_t="function"===typeof Symbol&&Symbol.for&&Symbol.for("react.element")||60103);var a=e&&e.defaultProps,o=arguments.length-3;if(t||0===o||(t={children:void 0}),1===o)t.children=r;else if(o>1){for(var i=new Array(o),l=0;l<o;l++)i[l]=arguments[l+3];t.children=i}if(t&&a)for(var c in a)void 0===t[c]&&(t[c]=a[c]);else t||(t=a||{});return{$$typeof:_t,type:e,key:void 0===n?null:""+n,ref:null,props:t,_owner:null}}var Jt="editorFileSelect",Bt=function(e){var t=e.loadFilesRequest,n=e.location.search,r=e.selectFile,o=e.uploadMultiple;Object(f.b)({key:Jt,reducer:ae}),Object(s.b)({key:Jt,saga:Me});var i=d.a.parse(n);return Object(a.useEffect)(function(){t(i.path)},[i.path]),zt("div",{className:"container mx-auto h-screen"},void 0,zt(Wt,{queryObj:i,selectFile:r,uploadMultiple:o}))};Bt.defaultProps={selectFile:!1};var Gt=Object(l.b)({all:ie()}),Xt=Object(i.connect)(Gt,r);t.a=Object(c.compose)(Xt,a.memo)(Bt)},"6ccb783811b607814817":function(e,t,n){"use strict";n.r(t);var r,a=n("8af190b70a6bc55c6f1b"),o=n.n(a),i=(n("8a2d1b95e05b6a321e74"),n("e95a63b25fb92ed15721"));function l(e,t,n,a){r||(r="function"===typeof Symbol&&Symbol.for&&Symbol.for("react.element")||60103);var o=e&&e.defaultProps,i=arguments.length-3;if(t||0===i||(t={children:void 0}),1===i)t.children=a;else if(i>1){for(var l=new Array(i),c=0;c<i;c++)l[c]=arguments[c+3];t.children=l}if(t&&o)for(var u in o)void 0===t[u]&&(t[u]=o[u]);else t||(t=o||{});return{$$typeof:r,type:e,key:void 0===n?null:""+n,ref:null,props:t,_owner:null}}var c,u=l("li",{},void 0,l("span",{className:"flex items-center"},void 0,l("i",{className:"material-icons"},void 0,"keyboard_arrow_right")));function d(e){return o.a.createElement(o.a.Fragment,null,l("li",{},void 0,e.children),!e.isLast&&u)}function s(e,t,n,r){c||(c="function"===typeof Symbol&&Symbol.for&&Symbol.for("react.element")||60103);var a=e&&e.defaultProps,o=arguments.length-3;if(t||0===o||(t={children:void 0}),1===o)t.children=r;else if(o>1){for(var i=new Array(o),l=0;l<o;l++)i[l]=arguments[l+3];t.children=i}if(t&&a)for(var u in a)void 0===t[u]&&(t[u]=a[u]);else t||(t=a||{});return{$$typeof:c,type:e,key:void 0===n?null:""+n,ref:null,props:t,_owner:null}}var f=function(e){var t=e.location.pathname,n=e.routeList,r=e.linkcomponent,a=e.onClick,o=[];if(0===n.length){var i=t.split("/").filter(function(e){return!!e}),l=t;o=i.map(function(){var e={path:"".concat(l),label:l.substring(l.lastIndexOf("/")+1)};return l=l.substring(0,l.lastIndexOf("/")),e}).reverse()}else o=n;var c=r;return s("div",{},void 0,s("ol",{className:"list-reset inline-flex text-gray-700 rounded text-sm items-center"},void 0,o.map(function(e,t){return"/admin"===e.path?s(d,{},e.path,"Home"):e.path.endsWith("edit")||e.path.endsWith("access")?null:s(d,{isLast:t===o.length-1},"".concat(e.path).concat(t),s(c,{className:"text-blue-700 no-underline hover:underline cursor-pointer capitalize",to:e.path,onClick:function(){return a(e)}},void 0,e.label))})))};f.defaultProps={routeList:[],onClick:function(){return null},linkcomponent:i.Link};t.default=Object(i.withRouter)(f)},"73569516ae665a75d80d":function(e,t,n){var r=n("fb98e4bdb39ef583b600");"string"===typeof r&&(r=[[e.i,r,""]]);var a={hmr:!0,transform:void 0,insertInto:void 0};n("1e4534d1d62a11482e97")(r,a);r.locals&&(e.exports=r.locals)},fb98e4bdb39ef583b600:function(e,t,n){(e.exports=n("0e326f80368fd0b1333e")(!1)).push([e.i,".mediaCheck{\n  display: none;\n  top:0.25rem;\n  right: 0.25rem;\n}\n\n.mediaCont:hover .mediaCheck{\n  display: block;\n}\n\n.media_btn .blink {\n  -webkit-animation: blink 1s linear infinite;\n          animation: blink 1s linear infinite;\n}\n\n.media_btn .blink:hover{\n  -webkit-animation: normal;\n          animation: normal;\n}\n\n@-webkit-keyframes blink {\n  0% {\n    opacity: 0;\n  }\n\n  50% {\n    opacity: 0.5;\n  }\n\n  100% {\n    opacity: 1;\n  }\n}\n\n@keyframes blink {\n  0% {\n    opacity: 0;\n  }\n\n  50% {\n    opacity: 0.5;\n  }\n\n  100% {\n    opacity: 1;\n  }\n}",""])}}]);