webpackJsonp([3],{DmRq:function(t,i,s){"use strict";Object.defineProperty(i,"__esModule",{value:!0});var n=s("2uFj"),e=s("mtWM"),a=s.n(e),l=s("7+uW"),c={name:"lil-context-menu",data:function(){return{x:null,y:null,userData:null}},computed:{style:function(){return this.isVisible?{top:this.y-document.body.scrollTop+"px",left:this.x+"px"}:{}},isVisible:function(){return null!==this.x&&null!==this.y}},methods:{open:function(t,i){var s=this;this.x=t.pageX||t.clientX,this.y=t.pageY||t.clientY,this.userData=i,l.default.nextTick(function(){return s.$el.focus()})},close:function(t){this.x=null,this.y=null,this.userData=null}}},o={render:function(){var t=this,i=t.$createElement;return(t._self._c||i)("div",{directives:[{name:"show",rawName:"v-show",value:t.isVisible,expression:"isVisible"}],staticClass:"lil-context-menu",style:t.style,attrs:{tabindex:"-1"},on:{blur:t.close,click:t.close,"!contextmenu":function(t){t.preventDefault()}}},[t._t("default",null,{userData:t.userData})],2)},staticRenderFns:[]};var r={name:"pan",head:{title:function(){return{inner:this.title}}},data:function(){return{title:"网盘",grid:!0,list:null}},components:{"context-menu":s("VU/8")(c,o,!1,function(t){s("QbaO")},"data-v-fa8eb1a8",null).exports},created:function(){this.getDir()},methods:{getDir:function(t){var i=this,s={},e=this.$route.query.dir;e&&((e=e.split("/")).shift(),e=e.join("/"),console.log(e),s={dir:e}),a()({method:"get",url:n.y,params:s}).then(function(t){i.list=t.data.data,console.log(i.list)})},toggleGrid:function(){this.grid=!this.grid},onClick:function(t){console.log("Clicked",t)},jump:function(t){t.url||this.$router.push("/pan?dir="+t.dir)},makeFolder:function(){var t=this;this.$Modal.confirm({render:function(i){return i("Input",{props:{value:t.value,autofocus:!0,placeholder:"请填写文件夹名称！"},on:{input:function(i){t.value=i}}})}})}},watch:{$route:"getDir"}},u={render:function(){var t=this,i=t.$createElement,s=t._self._c||i;return t.list?s("div",{staticClass:"pan"},[s("div",{staticClass:"bar"},[s("ul",{staticClass:"row w h"},[s("li",{staticClass:"col v-m"},[s("Button",{attrs:{type:"primary"}},[t._v("文件上传")]),t._v(" "),s("Button",{attrs:{type:"ghost"},on:{click:t.makeFolder}},[t._v("新建文件夹")])],1),t._v(" "),s("li",{staticClass:"col v-m"}),t._v(" "),s("li",{staticClass:"col v-m t-r grid"},[s("span",[t._v("文件夹："+t._s(t.list.directions))]),t._v(" "),s("span",[t._v("文件："+t._s(t.list.files))]),t._v(" "),s("span",{staticClass:"iconfont",class:{"icon-listgrid":t.grid,"icon-list":!t.grid},on:{click:t.toggleGrid}})])])]),t._v(" "),t.grid?t._e():s("ul",{staticClass:"grid dir-title"},[s("li",{staticClass:"grid-item",staticStyle:{width:"75%"}},[t._v("文件名")]),t._v(" "),s("li",{staticClass:"grid-item",staticStyle:{width:"10%"}},[t._v("大小")]),t._v(" "),s("li",{staticClass:"grid-item t-r",staticStyle:{width:"15%"}},[t._v("修改日期")])]),t._v(" "),s("ul",{staticClass:"dir-list",class:{grid:t.grid}},[t._l(t.list.content,function(i,n){return t.grid?t._e():s("li",{key:n},[s("div",{staticClass:"dir-item",on:{click:function(s){t.jump(i)},contextmenu:function(s){s.preventDefault(),t.$refs.menu.open(s,i)}}},[i.url&&i.ext.indexOf("image")>-1?s("div",{staticClass:"icon"},[s("img",{attrs:{src:i.url,alt:""}})]):s("div",{staticClass:"icon"},[s("img",{attrs:{src:i.icon,alt:""}})]),t._v(" "),s("div",{staticClass:"name"},[t._v(t._s(i.name))]),t._v(" "),s("div",{staticClass:"size"},[t._v(t._s(i.size||"-"))]),t._v(" "),s("div",{staticClass:"time"},[t._v(t._s(new Date(1e3*parseInt(i.lasttime)).toLocaleString().replace(/:\d{1,2}$/," ")))])])])}),t._v(" "),t._l(t.list.content,function(i,n){return t.grid?s("li",{key:n},[s("Poptip",{attrs:{trigger:"hover",title:"文件信息",placement:"bottom-end"}},[s("span",{staticClass:"iconfont icon-info"}),t._v(" "),s("div",{attrs:{slot:"content"},slot:"content"},[s("p",[t._v("文件名称："+t._s(i.name))]),t._v(" "),s("p",[t._v("文件大小："+t._s(i.size||"-"))]),t._v(" "),s("p",[t._v("修改时间："+t._s(new Date(1e3*parseInt(i.lasttime)).toLocaleString().replace(/:\d{1,2}$/," ")))])])]),t._v(" "),s("div",{staticClass:"dir-item",on:{click:function(s){t.jump(i)},contextmenu:function(s){s.preventDefault(),t.$refs.menu.open(s,i)}}},[i.url&&i.ext.indexOf("image")>-1?s("div",{staticClass:"icon"},[s("img",{attrs:{src:i.url,alt:""}})]):s("div",{staticClass:"icon"},[s("img",{attrs:{src:i.icon,alt:""}})]),t._v(" "),s("div",{staticClass:"name"},[t._v(t._s(i.name))]),t._v(" "),s("div",{staticClass:"size"},[t._v(t._s(i.size||"-"))]),t._v(" "),s("div",{staticClass:"time"},[t._v(t._s(new Date(1e3*parseInt(i.lasttime)).toLocaleString().replace(/:\d{1,2}$/," ")))])])],1):t._e()})],2),t._v(" "),s("context-menu",{ref:"menu"},[s("ul",{staticClass:"options",attrs:{"user-data":1}},[s("li",{on:{click:function(i){t.onClick(t.$refs.menu.userData)}}},[s("span",{staticClass:"v-m iconfont icon-rename"}),s("span",{staticClass:"v-m"},[t._v("重命名")])]),t._v(" "),s("li",{on:{click:function(i){t.onClick(t.$refs.menu.userData)}}},[s("span",{staticClass:"v-m iconfont icon-share"}),s("span",{staticClass:"v-m"},[t._v("分享")])]),t._v(" "),s("li",{on:{click:function(i){t.onClick(t.$refs.menu.userData)}}},[s("span",{staticClass:"v-m iconfont icon-move"}),s("span",{staticClass:"v-m"},[t._v("移动到")])]),t._v(" "),s("li",{on:{click:function(i){t.onClick(t.$refs.menu.userData)}}},[s("span",{staticClass:"v-m iconfont icon-del"}),s("span",{staticClass:"v-m"},[t._v("删除")])]),t._v(" "),s("li",{on:{click:function(i){t.onClick(t.$refs.menu.userData)}}},[s("span",{staticClass:"v-m iconfont icon-download"}),s("span",{staticClass:"v-m"},[t._v("下载")])])])])],1):t._e()},staticRenderFns:[]};var v=s("VU/8")(r,u,!1,function(t){s("iYgd")},"data-v-3d789da6",null);i.default=v.exports},QbaO:function(t,i){},iYgd:function(t,i){}});
//# sourceMappingURL=3.f68fbd5090fdb0d159b4.js.map