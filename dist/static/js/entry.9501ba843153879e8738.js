webpackJsonp([2],{315:function(t,e,o){o(482);var s=o(7)(o(461),o(582),null,null);t.exports=s.exports},316:function(t,e,o){o(489);var s=o(7)(o(462),o(589),null,null);t.exports=s.exports},317:function(t,e,o){o(479);var s=o(7)(o(463),o(579),null,null);t.exports=s.exports},442:function(t,e,o){o(495);var s=o(7)(o(446),o(595),"data-v-d6e2e5c0",null);t.exports=s.exports},446:function(t,e,o){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.default={components:{},props:{text:{type:String,default:""}},data:function(){return{lv:0}},computed:{},created:function(){},mounted:function(){},watch:{text:function(t){this.lv=this.checkStrength(t)}},methods:{checkStrength:function(t){var e=0;return t.match(/[a-z]/g)&&e++,t.match(/[0-9]/g)&&e++,t.match(/(.[^a-z0-9])/g)&&e++,t.length<6&&(e=0),e>3&&(e=3),e}}}},460:function(t,e,o){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var s=o(129),r=function(t){return t&&t.__esModule?t:{default:t}}(s);e.default={data:function(){return{count_1:100,count_2:1e4,img_list:["https://demo.ibanbu.com/resources/img/bg1.jpg?76","https://demo.ibanbu.com/resources/img/bg2.jpg?76"]}},components:{AnimatedInteger:r.default},methods:{}}},461:function(t,e,o){"use strict";function s(t){return t&&t.__esModule?t:{default:t}}Object.defineProperty(e,"__esModule",{value:!0});var r=o(25),a=s(r),n=o(442),l=s(n);e.default={data:function(){return{form:{account:"13812345678",password:"admin"}}},components:{PasswordStrength:l.default},methods:{onSubmit:function(){var t=this;a.default.post("/login",this.form).then(function(e){t.$router.replace("/")}).catch(function(e){t.$message.error(e.reasons&&e.reasons[0].message||"登录失败")})}}}},462:function(t,e,o){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var s=o(25),r=function(t){return t&&t.__esModule?t:{default:t}}(s);e.default={data:function(){return{form:{account:"13812345678",password:"admin"}}},components:{},methods:{onSubmit:function(){var t=this;r.default.post("/login",this.form).then(function(e){t.$router.replace("/")}).catch(function(e){t.$message.error(e.reasons&&e.reasons[0].message||"登录失败")})}}}},463:function(t,e,o){"use strict";function s(t){return t&&t.__esModule?t:{default:t}}Object.defineProperty(e,"__esModule",{value:!0});var r=o(25),a=s(r),n=o(442),l=s(n);e.default={data:function(){return{form:{account:"",code:"",password:""}}},components:{PasswordStrength:l.default},methods:{onSubmit:function(){var t=this;a.default.post("/login",this.form).then(function(e){t.$router.replace("/")}).catch(function(e){t.$message.error(e.reasons&&e.reasons[0].message||"登录失败")})}}}},479:function(t,e){},482:function(t,e){},489:function(t,e){},491:function(t,e){},495:function(t,e){},579:function(t,e){t.exports={render:function(){var t=this,e=t.$createElement,o=t._self._c||e;return o("div",{staticClass:"login-box"},[t._m(0),t._v(" "),o("div",{staticStyle:{padding:"10px 30px"}},[o("el-form",{ref:"form",attrs:{model:t.form}},[o("el-form-item",[o("el-input",{attrs:{type:"mobile",placeholder:"请输入手机号"},model:{value:t.form.account,callback:function(e){t.form.account=e},expression:"form.account"}})],1),t._v(" "),o("el-form-item",[o("el-row",{attrs:{gutter:10}},[o("el-col",{attrs:{span:24}},[o("el-input",{attrs:{type:"password",placeholder:"请输入短信验证码"},model:{value:t.form.code,callback:function(e){t.form.code=e},expression:"form.code"}})],1)],1)],1),t._v(" "),o("el-form-item",[o("el-row",{attrs:{gutter:10}},[o("el-col",{attrs:{span:24}},[o("el-input",{attrs:{type:"password",placeholder:"请输入登录密码"},model:{value:t.form.password,callback:function(e){t.form.password=e},expression:"form.password"}})],1)],1)],1),t._v(" "),o("el-form-item",[o("el-row",{staticClass:"password-desc",attrs:{type:"flex"}},[o("i",{staticClass:"el-icon-fa-lightbulb-o"}),t._v(" "),o("el-col",{staticClass:"flex-1"},[t._v("请输入不少于6位数的密码，必须为字母与数字的混合密码")])],1),t._v(" "),o("password-strength",{attrs:{text:t.form.password}})],1),t._v(" "),o("el-form-item",[o("el-button",{staticStyle:{width:"100%"},attrs:{type:"primary"},on:{click:t.onSubmit}},[t._v("注册")])],1)],1),t._v(" "),o("el-row",{staticClass:"login-body__bottom",attrs:{type:"flex",justify:"space-between"}},[o("div"),t._v(" "),o("div",[t._v("有账号，"),o("router-link",{attrs:{to:{name:"login"},tag:"span"}},[t._v("马上登录>")])],1)])],1),t._v(" "),o("footer",{staticClass:"login-footer"},t._l(2,function(e){return o("el-row",{staticStyle:{color:"#fff"},attrs:{type:"flex"}},[o("span",[t._v("[系统公告]：")]),t._v(" "),o("el-col",{staticClass:"flex-1",staticStyle:{color:"#11b95c"}},[t._v("系统维护升级公告")]),t._v(" "),o("span",[t._v("2017/01/04")])],1)}))])},staticRenderFns:[function(){var t=this,e=t.$createElement,o=t._self._c||e;return o("header",{staticStyle:{"padding-top":"150px"}},[o("h1",{staticStyle:{"text-align":"center",color:"#fff"}},[t._v("欢迎注册")])])}]}},582:function(t,e){t.exports={render:function(){var t=this,e=t.$createElement,o=t._self._c||e;return o("div",{staticClass:"login-box"},[t._m(0),t._v(" "),o("div",{staticStyle:{padding:"10px 30px"}},[o("el-form",{ref:"form",attrs:{model:t.form}},[o("el-form-item",[o("el-input",{attrs:{type:"mobile",placeholder:"请输入手机号"},model:{value:t.form.account,callback:function(e){t.form.account=e},expression:"form.account"}})],1),t._v(" "),o("el-form-item",[o("el-row",{attrs:{gutter:10}},[o("el-col",{attrs:{span:24}},[o("el-input",{attrs:{type:"password",placeholder:"请输入短信验证码"},model:{value:t.form.code,callback:function(e){t.form.code=e},expression:"form.code"}})],1)],1)],1),t._v(" "),o("el-form-item",[o("el-row",{attrs:{gutter:10}},[o("el-col",{attrs:{span:24}},[o("el-input",{attrs:{type:"password",placeholder:"请输入新密码"},model:{value:t.form.password,callback:function(e){t.form.password=e},expression:"form.password"}})],1)],1)],1),t._v(" "),o("el-form-item",[o("el-row",{staticClass:"password-desc",attrs:{type:"flex"}},[o("i",{staticClass:"el-icon-fa-lightbulb-o"}),t._v(" "),o("el-col",{staticClass:"flex-1"},[t._v("请输入不少于6位数的密码，必须为字母与数字的混合密码")])],1),t._v(" "),o("password-strength",{attrs:{text:t.form.password}})],1),t._v(" "),o("el-form-item",[o("el-button",{staticStyle:{width:"100%"},attrs:{type:"primary"},on:{click:t.onSubmit}},[t._v("确定")])],1)],1),t._v(" "),o("el-row",{staticClass:"login-body__bottom",attrs:{type:"flex",justify:"space-between"}},[o("div"),t._v(" "),o("div",[t._v("有账号，"),o("router-link",{attrs:{to:{name:"login"},tag:"span"}},[t._v("马上登录>")])],1)])],1),t._v(" "),o("footer",{staticClass:"login-footer"},t._l(2,function(e){return o("el-row",{staticStyle:{color:"#fff"},attrs:{type:"flex"}},[o("span",[t._v("[系统公告]：")]),t._v(" "),o("el-col",{staticClass:"flex-1",staticStyle:{color:"#11b95c"}},[t._v("系统维护升级公告")]),t._v(" "),o("span",[t._v("2017/01/04")])],1)}))])},staticRenderFns:[function(){var t=this,e=t.$createElement,o=t._self._c||e;return o("header",{staticStyle:{"padding-top":"150px"}},[o("h1",{staticStyle:{"text-align":"center",color:"#fff"}},[t._v("忘记密码")])])}]}},589:function(t,e){t.exports={render:function(){var t=this,e=t.$createElement,o=t._self._c||e;return o("div",{staticClass:"login-box"},[t._m(0),t._v(" "),o("div",{staticStyle:{padding:"10px 30px"}},[o("el-form",{ref:"form",attrs:{model:t.form}},[o("el-form-item",[o("el-input",{attrs:{type:"mobile",placeholder:"请输入手机号"},model:{value:t.form.account,callback:function(e){t.form.account=e},expression:"form.account"}})],1),t._v(" "),o("el-form-item",[o("el-row",{attrs:{gutter:10}},[o("el-col",{attrs:{span:24}},[o("el-input",{attrs:{type:"password",placeholder:"请输入密码"},model:{value:t.form.password,callback:function(e){t.form.password=e},expression:"form.password"}})],1)],1)],1),t._v(" "),o("el-form-item",[o("el-button",{staticStyle:{width:"100%"},attrs:{type:"primary"},on:{click:t.onSubmit}},[t._v("登录")])],1)],1),t._v(" "),o("el-row",{staticClass:"login-body__bottom",attrs:{type:"flex",justify:"space-between"}},[o("router-link",{attrs:{to:{name:"forget-password"},tag:"div"}},[t._v("忘记密码？")]),t._v(" "),o("div",[t._v("没有账号，"),o("router-link",{attrs:{to:{name:"signin"},tag:"span"}},[t._v("马上注册>")])],1)],1)],1),t._v(" "),o("footer",{staticClass:"login-footer"},t._l(2,function(e){return o("el-row",{staticStyle:{color:"#fff"},attrs:{type:"flex"}},[o("span",[t._v("[系统公告]：")]),t._v(" "),o("el-col",{staticClass:"flex-1",staticStyle:{color:"#11b95c"}},[t._v("系统维护升级公告")]),t._v(" "),o("span",[t._v("2017/01/04")])],1)}))])},staticRenderFns:[function(){var t=this,e=t.$createElement,o=t._self._c||e;return o("header",{staticStyle:{"padding-top":"150px"}},[o("h1",{staticStyle:{"text-align":"center",color:"#fff"}},[t._v("欢迎使用班步SaaS平台")])])}]}},591:function(t,e){t.exports={render:function(){var t=this,e=t.$createElement,o=t._self._c||e;return o("transition",{attrs:{name:"fade",mode:"in-out"}},[o("div",{staticClass:"entry-page"},[o("el-row",{attrs:{type:"flex"}},[o("section",{staticClass:"flex-1"},[o("el-carousel",{staticStyle:{height:"100vh"},attrs:{autoplay:!1}},t._l(t.img_list,function(e){return o("el-carousel-item",{staticStyle:{height:"100%","background-size":"cover"},style:{"background-image":"url("+e+")"}},[o("div",{staticClass:"img-cover"},[o("div",{staticStyle:{"font-size":"20px","font-weight":"300",color:"#fff"}},[t._v("人力资源智能云平台班步VIP版")]),t._v(" "),o("div",{staticStyle:{color:"#fff","font-size":"60px","font-weight":"300","margin-top":"200px","margin-left":"80px"}},[o("div",[o("span",{staticStyle:{"font-size":"35px","border-bottom":"1px #fff solid","padding-bottom":"20px","margin-bottom":"20px",display:"inline-block"}},[t._v("班步人力资源Saas平台")])]),t._v(" "),o("animated-integer",{attrs:{value:t.count_1}}),t._v("+"),o("span",{staticStyle:{"font-size":"16px"}},[t._v(" 人事，IT专家的智慧")]),t._v(" "),o("animated-integer",{attrs:{value:t.count_2}}),t._v("+"),o("span",{staticStyle:{"font-size":"16px"}},[t._v(" 企业的选择")])],1)])])}))],1),t._v(" "),o("transition",{attrs:{name:"entry",mode:"out-in"}},[o("router-view")],1)],1)],1)])},staticRenderFns:[]}},595:function(t,e){t.exports={render:function(){var t=this,e=t.$createElement,o=t._self._c||e;return o("div",[o("el-row",{staticClass:"password-strength"},[o("el-col",{staticClass:"strength-item",class:{lv_1:t.lv<2},attrs:{span:8}},[t._v(" "),o("span",[t._v("弱")]),t._v(" ")]),t._v(" "),o("el-col",{staticClass:"strength-item",class:{lv_2:2===t.lv},attrs:{span:8}},[t._v(" "),o("span",[t._v("中")]),t._v(" ")]),t._v(" "),o("el-col",{staticClass:"strength-item",class:{lv_3:t.lv>2},attrs:{span:8}},[t._v(" "),o("span",[t._v("强")]),t._v(" ")])],1)],1)},staticRenderFns:[]}},64:function(t,e,o){o(491);var s=o(7)(o(460),o(591),null,null);t.exports=s.exports}});