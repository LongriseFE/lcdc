webpackJsonp([5],{AmHV:function(t,s,e){"use strict";var a={filterSex:function(t){switch(t){case 2:return"私密";case 0:return"男";case 1:return"女"}},delObj:function(t,s){return s.forEach(function(s,e){delete t[s]}),t},requestFullScreen:function(){var t=document.documentElement;t.requestFullscreen?t.requestFullscreen():t.mozRequestFullScreen?t.mozRequestFullScreen():t.webkitRequestFullScreen&&t.webkitRequestFullScreen()},renderTheme:function(t){return""}};s.a=a},EBcg:function(t,s,e){"use strict";Object.defineProperty(s,"__esModule",{value:!0});var a=e("mvHQ"),i=e.n(a),l=e("AmHV"),c=e("mtWM"),r=e.n(c),o=e("2uFj"),n={name:"info",head:{title:function(){return{inner:this.title}}},data:function(){return{title:"个人信息",editable:!1,userInfo:null,form:null,plugins:l.a}},created:function(){this.userInfo=JSON.parse(this.$localStorage.get("userInfo")),this.form=JSON.parse(this.$localStorage.get("userInfo")),this.form=l.a.delObj(this.form,["id","username","password","uId","phone","email","updated_at","created_at"])},methods:{submit:function(){var t=this,s={uId:this.userInfo.uId,userInfo:i()(this.form)};console.log(this.form),r()({method:"get",url:o.P,params:s}).then(function(s){console.log(s.data),s.data.status?(t.$Message.success(s.data.msg),t.userInfo=s.data.data,t.editable=!t.editable,t.$localStorage.set("userInfo",i()(t.userInfo))):t.$Message.error(s.data.msg)})},time:function(t){this.form.birthday=new Date(t).valueOf()/1e3}}},v={render:function(){var t=this,s=t.$createElement,e=t._self._c||s;return e("div",{staticClass:"info"},[e("h2",{staticClass:"page-title"},[t._v("个人信息")]),t._v(" "),e("div",{staticClass:"page-view"},[t.userInfo?e("ul",{staticClass:"form inline",staticStyle:{"margin-top":"20px"}},[e("li",{staticClass:"form-item"},[e("div",{staticClass:"row w"},[t._m(0),t._v(" "),e("div",{staticClass:"col v-m g-9"},[t.editable?e("Input",{staticStyle:{width:"300px"},attrs:{placeholder:"请填写真实姓名！"},model:{value:t.form.name,callback:function(s){t.$set(t.form,"name",s)},expression:"form.name"}}):t._e(),t._v(" "),t.editable?t._e():e("span",{staticClass:"value"},[t._v(t._s(t.userInfo.name))])],1),t._v(" "),e("div",{staticClass:"col g-12 v-m"},[t.editable?e("div",{staticClass:"tip"},[t._v("请填写真实姓名，切勿随意填写！")]):t._e()])])]),t._v(" "),e("li",{staticClass:"form-item"},[e("div",{staticClass:"row w"},[t._m(1),t._v(" "),e("div",{staticClass:"col v-m g-9"},[t.editable?e("RadioGroup",{model:{value:t.form.sex,callback:function(s){t.$set(t.form,"sex",s)},expression:"form.sex"}},[e("Radio",{attrs:{label:"0"}},[t._v("男")]),t._v(" "),e("Radio",{attrs:{label:"1"}},[t._v("女")]),t._v(" "),e("Radio",{attrs:{label:"-1"}},[t._v("私密")])],1):t._e(),t._v(" "),t.editable?t._e():e("span",{staticClass:"value"},[t._v(t._s(t.plugins.filterSex(t.userInfo.sex)))])],1),t._v(" "),e("div",{staticClass:"col g-12 v-m"},[t.editable?e("div",{staticClass:"tip"},[t._v("如果不想公开性别，也可以选择私密！")]):t._e()])])]),t._v(" "),e("li",{staticClass:"form-item"},[e("div",{staticClass:"row w"},[t._m(2),t._v(" "),e("div",{staticClass:"col v-m g-9"},[t.editable?e("DatePicker",{staticStyle:{width:"200px"},attrs:{format:"yyyy年MM月dd日",type:"date",placeholder:"请选择出生日期"},on:{"on-change":t.time},model:{value:t.form.birthday,callback:function(s){t.$set(t.form,"birthday",s)},expression:"form.birthday"}}):t._e(),t._v(" "),t.editable?t._e():e("span",{staticClass:"value"},[t._v(t._s(t.userInfo.birthday))])],1),t._v(" "),e("div",{staticClass:"col g-12 v-m"},[t.editable?e("div",{staticClass:"tip"},[t._v("日期格式（xxxx年xx月xx日）")]):t._e()])])]),t._v(" "),e("li",{staticClass:"form-item"},[e("div",{staticClass:"row w"},[t._m(3),t._v(" "),e("div",{staticClass:"col v-m g-9"},[t.editable?e("Input",{staticStyle:{width:"300px"},attrs:{placeholder:"QQ号码"},model:{value:t.form.qq,callback:function(s){t.$set(t.form,"qq",s)},expression:"form.qq"}}):t._e(),t._v(" "),t.editable?t._e():e("span",{staticClass:"value"},[t._v(t._s(t.userInfo.qq))])],1),t._v(" "),e("div",{staticClass:"col g-12 v-m"},[t.editable?e("div",{staticClass:"tip"},[t._v("QQ格式（6-12位纯数字）")]):t._e()])])]),t._v(" "),e("li",{staticClass:"form-item"},[e("div",{staticClass:"row w"},[t._m(4),t._v(" "),e("div",{staticClass:"col v-m g-9"},[t.editable?e("Input",{staticStyle:{width:"300px"},attrs:{placeholder:"微信号"},model:{value:t.form.wechat,callback:function(s){t.$set(t.form,"wechat",s)},expression:"form.wechat"}}):t._e(),t._v(" "),t.editable?t._e():e("span",{staticClass:"value"},[t._v(t._s(t.userInfo.wechat))])],1),t._v(" "),e("div",{staticClass:"col g-12 v-m"},[t.editable?e("div",{staticClass:"tip"},[t._v("格式（不能包含特殊字符）")]):t._e()])])]),t._v(" "),e("li",{staticClass:"form-item"},[e("div",{staticClass:"row w"},[t._m(5),t._v(" "),e("div",{staticClass:"col v-m g-9"},[t.editable?e("Input",{staticStyle:{width:"300px"},attrs:{placeholder:"微博主页链接"},model:{value:t.form.weibo,callback:function(s){t.$set(t.form,"weibo",s)},expression:"form.weibo"}}):t._e(),t._v(" "),t.editable?t._e():e("span",{staticClass:"value"},[t._v(t._s(t.userInfo.weibo||"尚未填写"))])],1),t._v(" "),e("div",{staticClass:"col g-12 v-m"},[t.editable?e("div",{staticClass:"tip"},[t._v("填写你的新浪微博主页，例如（https://weibo.com/xx/profile）")]):t._e()])])]),t._v(" "),e("li",{staticClass:"form-item"},[e("div",{staticClass:"row w"},[t._m(6),t._v(" "),e("div",{staticClass:"col v-m g-9"},[e("span",{staticClass:"value"},[t._v(t._s(t.userInfo.email||"尚未绑定"))]),t._v(" "),!t.userInfo.email&&t.editable?e("router-link",{attrs:{to:"/personer/email?action=0"}},[t._v("前往绑定")]):t._e(),t._v(" "),t.userInfo.email&&t.editable?e("router-link",{attrs:{to:"/personer/email"}},[t._v("前往更改")]):t._e()],1),t._v(" "),e("div",{staticClass:"col g-12 v-m"},[t.editable?e("div",{staticClass:"tip"},[t._v("填写你常用的邮箱，例如（xxxxx@xxx.com）")]):t._e()])])]),t._v(" "),e("li",{staticClass:"form-item"},[e("div",{staticClass:"row w"},[t._m(7),t._v(" "),e("div",{staticClass:"col v-m g-9"},[e("span",{staticClass:"value"},[t._v(t._s(t.userInfo.phone||"尚未绑定"))]),t._v(" "),!t.userInfo.phone&&t.editable?e("router-link",{attrs:{to:"/personer/phone?action=0"}},[t._v("前往绑定")]):t._e(),t._v(" "),t.userInfo.phone&&t.editable?e("router-link",{attrs:{to:"/personer/phone"}},[t._v("前往更换")]):t._e()],1),t._v(" "),e("div",{staticClass:"col g-12 v-m"},[t.editable?e("div",{staticClass:"tip"},[t._v("填写你常用的手机号码，例如（1xx xxxx xxxx）")]):t._e()])])]),t._v(" "),e("li",{staticClass:"form-item"},[e("div",{staticClass:"row w"},[t._m(8),t._v(" "),e("div",{staticClass:"col v-m g-9"},[t.editable?e("Input",{staticStyle:{width:"300px"},attrs:{placeholder:"github主页"},model:{value:t.form.github,callback:function(s){t.$set(t.form,"github",s)},expression:"form.github"}}):t._e(),t._v(" "),t.editable?t._e():e("span",{staticClass:"value"},[t._v(t._s(t.userInfo.github))])],1),t._v(" "),e("div",{staticClass:"col g-12 v-m"},[t.editable?e("div",{staticClass:"tip"},[t._v("填写你github账号名称，例如（swimly）")]):t._e()])])]),t._v(" "),e("li",{staticClass:"form-item"},[e("div",{staticClass:"row w"},[t._m(9),t._v(" "),e("div",{staticClass:"col v-m g-9"},[t.editable?e("Input",{staticStyle:{width:"300px"},attrs:{placeholder:"出生地址"},model:{value:t.form.hometown,callback:function(s){t.$set(t.form,"hometown",s)},expression:"form.hometown"}}):t._e(),t._v(" "),t.editable?t._e():e("span",{staticClass:"value"},[t._v(t._s(t.userInfo.hometown))])],1),t._v(" "),e("div",{staticClass:"col g-12 v-m"},[t.editable?e("div",{staticClass:"tip"},[t._v("填写你出生地，详细到门牌号")]):t._e()])])]),t._v(" "),e("li",{staticClass:"form-item"},[e("div",{staticClass:"row w"},[t._m(10),t._v(" "),e("div",{staticClass:"col v-m g-9"},[t.editable?e("Input",{staticStyle:{width:"300px"},attrs:{placeholder:"现在居住地址"},model:{value:t.form.living,callback:function(s){t.$set(t.form,"living",s)},expression:"form.living"}}):t._e(),t._v(" "),t.editable?t._e():e("span",{staticClass:"value"},[t._v(t._s(t.userInfo.living))])],1),t._v(" "),e("div",{staticClass:"col g-12 v-m"},[t.editable?e("div",{staticClass:"tip"},[t._v("填写你现在居住的住所，详细到门牌号")]):t._e()])])]),t._v(" "),t.editable?t._e():e("li",{staticClass:"form-item"},[e("div",{staticClass:"row w"},[t._m(11),t._v(" "),e("div",{staticClass:"col v-m g-9"},[e("span",{staticClass:"value"},[t._v(t._s(new Date(1e3*parseInt(t.userInfo.created_at)).toLocaleString().replace(/:\d{1,2}$/," ")))])]),t._v(" "),e("div",{staticClass:"col g-12"})])]),t._v(" "),t.editable?t._e():e("li",{staticClass:"form-item"},[e("div",{staticClass:"row w"},[t._m(12),t._v(" "),e("div",{staticClass:"col v-m g-9"},[e("span",{staticClass:"value"},[t._v(t._s(new Date(1e3*parseInt(t.userInfo.updated_at)).toLocaleString().replace(/:\d{1,2}$/," ")))])]),t._v(" "),e("div",{staticClass:"col g-12"})])])]):t._e(),t._v(" "),e("div",{staticClass:"btn-area t-c"},[t.editable?t._e():e("Button",{attrs:{type:"primary",size:"large"},on:{click:function(s){t.editable=!t.editable}}},[t._v("修改资料")]),t._v(" "),t.editable?e("Button",{attrs:{type:"warning",size:"large"},on:{click:t.submit}},[t._v("确认修改")]):t._e()],1)])])},staticRenderFns:[function(){var t=this.$createElement,s=this._self._c||t;return s("div",{staticClass:"col v-m g-3 t-r"},[s("span",{staticClass:"label"},[this._v("名字：")])])},function(){var t=this.$createElement,s=this._self._c||t;return s("div",{staticClass:"col v-m g-3 t-r"},[s("span",{staticClass:"label"},[this._v("性别：")])])},function(){var t=this.$createElement,s=this._self._c||t;return s("div",{staticClass:"col v-m g-3 t-r"},[s("span",{staticClass:"label"},[this._v("生日：")])])},function(){var t=this.$createElement,s=this._self._c||t;return s("div",{staticClass:"col v-m g-3 t-r"},[s("span",{staticClass:"label"},[this._v("QQ：")])])},function(){var t=this.$createElement,s=this._self._c||t;return s("div",{staticClass:"col v-m g-3 t-r"},[s("span",{staticClass:"label"},[this._v("微信：")])])},function(){var t=this.$createElement,s=this._self._c||t;return s("div",{staticClass:"col v-m g-3 t-r"},[s("span",{staticClass:"label"},[this._v("微博：")])])},function(){var t=this.$createElement,s=this._self._c||t;return s("div",{staticClass:"col v-m g-3 t-r"},[s("span",{staticClass:"label"},[this._v("邮箱：")])])},function(){var t=this.$createElement,s=this._self._c||t;return s("div",{staticClass:"col v-m g-3 t-r"},[s("span",{staticClass:"label"},[this._v("手机号码：")])])},function(){var t=this.$createElement,s=this._self._c||t;return s("div",{staticClass:"col v-m g-3 t-r"},[s("span",{staticClass:"label"},[this._v("github：")])])},function(){var t=this.$createElement,s=this._self._c||t;return s("div",{staticClass:"col v-m g-3 t-r"},[s("span",{staticClass:"label"},[this._v("出生地：")])])},function(){var t=this.$createElement,s=this._self._c||t;return s("div",{staticClass:"col v-m g-3 t-r"},[s("span",{staticClass:"label"},[this._v("现居地：")])])},function(){var t=this.$createElement,s=this._self._c||t;return s("div",{staticClass:"col v-m g-3 t-r"},[s("span",{staticClass:"label"},[this._v("注册时间：")])])},function(){var t=this.$createElement,s=this._self._c||t;return s("div",{staticClass:"col v-m g-3 t-r"},[s("span",{staticClass:"label"},[this._v("上次修改时间：")])])}]};var _=e("VU/8")(n,v,!1,function(t){e("Vloc")},"data-v-35b6de8c",null);s.default=_.exports},Vloc:function(t,s){}});
//# sourceMappingURL=5.46c095b998a5e0a713f6.js.map