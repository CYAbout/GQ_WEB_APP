import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)

let router = new Router({
  mode: 'hash',
  routes: [
    {
      name: 'Demo',
      path: '/Demo',
      component: r => require(['./components/Demo.vue'], r),
      meta: {
        title:'demo'
      }
    },
    {
      name: 'HomePage',
      path: '/HomePage',
      component: r => require(['./components/HomePage.vue'], r),
    },
    { // 查询 订单查询
      name: 'SubmitLimitQuery',
      path: '/SubmitLimitQuery',
      component: r => require(['./components/SubmitLimitQuery.vue'], r),
    },
    {//2.4-首页-查询页-礼品结果
      name: 'GiftList2_4',
      path: '/GiftList2_4',
      component: r => require(['./components/GiftList2_4.vue'], r),
    },
    // 2.3-首页-查询页-用户查询页
    {
      name: 'UserQuery',
      path: '/UserQuery',
      component: r => require(['./components/UserQuery.vue'], r),
    },
    //2.0首页-视频播放
    {
      name: 'VideoPlay',
      path: '/VideoPlay',
      component: r => require(['./components/VideoPlay.vue'], r),
    },
    //2.0首页-库存查询
    {
      name: 'InventoryQuery',
      path: '/InventoryQuery',
      component: r => require(['./components/InventoryQuery.vue'], r),
    },
    //1.1首页-预约试驾
    {
      name: 'AppointDrive',
      path: '/AppointDrive',
      component: r => require(['./components/AppointDrive.vue'], r),
    },
    //1.2首页-预约试驾-预约成功-获取到礼品
    {
      name: 'AppointSuccess',
      path: '/AppointSuccess',
      component: r => require(['./components/AppointSuccess.vue'], r),
    },
    //1.2首页-预约试驾-未能获取礼品
    {
      name: 'AppointNoGift',
      path: '/AppointNoGift',
      component: r => require(['./components/AppointNoGift.vue'], r),
    },
    {//2.1-首页-查询页-礼品查询
      name: 'GiftQuery',
      path: '/GiftQuery',
      component: r => require(['./components/GiftQuery.vue'], r),
    },
    {//2.2-1-首页-金融机构选择-置优享金融留资
      name: 'BankSelectIpt',
      path: '/BankSelectIpt',
      component: r => require(['./components/BankSelectIpt.vue'], r),
    },
    {//3.1-2-首页-金融机构选择-活动详情说明（工行）
      name: 'OrderCarForm',
      path: '/OrderCarForm',
      component: r => require(['./components/OrderCarForm.vue'], r),
    },
    {//3.1-1-首页-金融机构选择-活动详情说明（丰田）
      name: 'ActivityDetailTOYOTA',
      path: '/ActivityDetailTOYOTA',
      component: r => require(['./components/ActivityDetailTOYOTA.vue'], r),
    },
    {//2.0-金融机构选择
      name: 'InstitutionsSel2_0',
      path: '/InstitutionsSel2_0',
      component: r => require(['./components/InstitutionsSel2_0.vue'], r),
    },
    {//2.2-2-首页-金融机构选择-置优享金融留资
      name: 'InsLeaveInfor2_2',
      path: '/InsLeaveInfor2_2',
      component: r => require(['./components/InsLeaveInfor2_2.vue'], r),
    },
    {//2.1-首页-金融机构选择-金融产品介绍(1)
      name: 'InsIntroduce',
      path: '/InsIntroduce',
      component: r => require(['./components/InsIntroduce.vue'], r),
    },
    {//预约试驾查询结果页
      name: 'YuyueResults',
      path: '/YuyueResults',
      component: r => require(['./components/YuyueResults.vue'], r),
    },
    {//2.1-首页-授信结果查询页
      name: 'CreditResult',
      path: '/CreditResult',
      component: r => require(['./components/CreditResult.vue'], r),
    },
    {//收车查询
     name: 'SubstriBuy',
     path: '/SubstriBuy',
     component: r => require(['./components/SubstriBuy.vue'], r),
   },
   {//-个人信息基本方针
      name: 'PersonalInformation',
      path: '/PersonalInformation',
      component: r => require(['./components/PersonalInformation.vue'], r),
    },
    {//-隐私政策
      name: 'PrivacyPolicy',
      path: '/PrivacyPolicy',
      component: r => require(['./components/PrivacyPolicy.vue'], r),
    },
    {//-置换拍卖协议
      name: 'ReplacementDeal',
      path: '/ReplacementDeal',
      component: r => require(['./components/ReplacementDeal.vue'], r),
    },
    {//-电子授权书
      name: 'AuthorizationBook',
      path: '/AuthorizationBook',
      component: r => require(['./components/AuthorizationBook.vue'], r),
    },
    {//-预约成功礼品奖励页
      name: 'PrizePage',
      path: '/PrizePage',
      component: r => require(['./components/PrizePage.vue'], r),
    },
    {//-预约成功礼品奖励页
      name: 'PrizeResultPage',
      path: '/PrizeResultPage',
      component: r => require(['./components/PrizeResultPage.vue'], r),
    },
    {//-注册
      name: 'LogonForm',
      path: '/LogonForm',
      component: r => require(['./components/LogonForm.vue'], r),
    },
    {//-注册协议页面
      name: 'LogonAgree',
      path: '/LogonAgree',
      component: r => require(['./components/LogonAgree.vue'], r),
    },
  ]
})

export default router
