webpackJsonp([12],{JAB1:function(t,s){},JH9m:function(t,s,a){"use strict";Object.defineProperty(s,"__esModule",{value:!0});var e=a("mvHQ"),i=a.n(e),r=a("mtWM"),o=a.n(r),l=a("2uFj"),c={name:"login",head:{title:function(){return{inner:this.title}}},data:function(){return{title:"用户登录",loading:!1,prev:"",captcha:l.k,user:"swimly",form:{password:"122514",captcha:""}}},created:function(){this.prev=this.$route.query.prev},methods:{getcaptcha:function(){this.captcha=this.captcha+"?"+new Date},submit:function(){var t=this;this.user?this.form.password?this.form.captcha?(/\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/.test(this.user)?this.form.email=this.user:/^(0|86|17951)?(13[0-9]|15[012356789]|17[678]|18[0-9]|14[57])[0-9]{8}$/.test(this.user)?this.form.phone=this.user:this.form.username=this.user,this.loading=!0,o()({url:l.z,method:"get",params:this.form}).then(function(s){console.log(s),s.data.status?(t.$Message.success(s.data.msg),t.loading=!1,t.$parent.$refs.header.userInfo=s.data.data,t.$localStorage.set("userInfo",i()(s.data.data)),t.prev?t.$router.replace(t.prev):t.$router.replace("/")):(t.getcaptcha(),t.$Message.error(s.data.msg),t.loading=!1)})):this.$Message.warning("请填写图片验证码！"):this.$Message.warning("请填写登录密码！"):this.$Message.warning("请填写用户名、邮箱或者手机号！")}}},n={render:function(){var t=this,s=t.$createElement,a=t._self._c||s;return a("div",{staticClass:"author page-view"},[a("ul",{staticClass:"form",staticStyle:{width:"50%","padding-top":"50px"}},[a("li",{staticClass:"form-item"},[a("h2",{staticClass:"label"},[t._v("用户名")]),t._v(" "),a("div",{staticClass:"form-row"},[a("input",{directives:[{name:"model",rawName:"v-model",value:t.user,expression:"user"}],attrs:{type:"text",placeholder:"请填写用户名\\邮箱\\手机号!"},domProps:{value:t.user},on:{input:function(s){s.target.composing||(t.user=s.target.value)}}})])]),t._v(" "),a("li",{staticClass:"form-item"},[a("h2",{staticClass:"label"},[t._v("密码")]),t._v(" "),a("div",{staticClass:"form-row"},[a("input",{directives:[{name:"model",rawName:"v-model",value:t.form.password,expression:"form.password"}],attrs:{type:"password",placeholder:"请填写密码!"},domProps:{value:t.form.password},on:{input:function(s){s.target.composing||t.$set(t.form,"password",s.target.value)}}})])]),t._v(" "),a("li",{staticClass:"form-item"},[a("h2",{staticClass:"label"},[t._v("验证码")]),t._v(" "),a("div",{staticClass:"row w"},[a("div",{staticClass:"col v-m"},[a("div",{staticClass:"form-row"},[a("input",{directives:[{name:"model",rawName:"v-model",value:t.form.captcha,expression:"form.captcha"}],attrs:{type:"text",placeholder:"请填写5位验证码！"},domProps:{value:t.form.captcha},on:{input:function(s){s.target.composing||t.$set(t.form,"captcha",s.target.value)}}})])]),t._v(" "),a("div",{staticClass:"col v-m",staticStyle:{"padding-left":"20px"}},[a("img",{staticClass:"v-m",staticStyle:{cursor:"pointer"},attrs:{src:t.captcha,alt:""},on:{click:t.getcaptcha}}),t._v(" "),a("span",{staticClass:"tip v-m"},[t._v("点击验证码刷新！")])])])]),t._v(" "),a("li",{staticClass:"form-item",staticStyle:{"margin-top":"50px"}},[a("button",{staticClass:"button primary",class:{loading:t.loading},staticStyle:{width:"100%"},on:{click:t.submit}},[a("span",{staticClass:"iconfont icon-loading"}),a("span",[t._v("登录")])])]),t._v(" "),a("li",{staticClass:"form-item"},[a("ul",{staticClass:"form-info row w"},[a("li",{staticClass:"col v-m"},[t._v("\n          还没有账号？前往"),a("router-link",{attrs:{to:"/register"}},[t._v("注册")])],1),t._v(" "),a("li",{staticClass:"col v-m t-r"},[a("router-link",{attrs:{to:"/remember"}},[t._v("忘记密码？")])],1)])])])])},staticRenderFns:[]};var m=a("VU/8")(c,n,!1,function(t){a("JAB1")},null,null);s.default=m.exports}});
//# sourceMappingURL=12.c9ed4ab7cce5402adbf8.js.map