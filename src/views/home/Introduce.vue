<template>
  <div class="home">
    <div class="column">
      <MyHeader></MyHeader>
      <div class="page-body flex">
        <div class="page-left">
          <img src="img/self/home.jpg" alt="">
          <ul class="intro-bg">
            <li class="intro-bg--li">映如简介：</li>
            <li class="intro-bg--li">美团点评官方特邀讲师</li>
            <li class="intro-bg--li">美团点评运营咨询师</li>
            <li class="intro-bg--li">餐饮老板内参、懒熊体育、美沃斯等媒体独家合作讲师</li>
            <li class="intro-bg--li">前小米科技、得到App高级产品经理</li>
            <li class="intro-bg--li">本系统开发者</li>
          </ul>
        </div>

        <div class="page-right">
          <p>你好，我是映如，</p>
          <p>了解我的人都知道，19岁时我就拉了团队做上门修电脑修手机的生意，挣了一笔钱但觉得行业前景不好最后卖给了别人，只身跑去北京小米从实习生做到产品经理，再后来去了罗辑思维得到App做听书业务的产品负责人。</p>
          <p>产品经理是干啥的，它是你看到的美团和大众点评app里所有的功能逻辑的设计者，什么样的评论算优质点评，大众点评热门榜是按什么维度去计算排名的，等等这些功能逻辑就是产品经理要去决定的。</p>
          <p>虽说是个纯职场北漂，但我内心仍“不安分”，想着做点什么去提升自己非职场领域的思维，和朋友筹备了三四个月后2018年10月1日在天津小白楼开了一家“白日梦私人影院”，开业后第11天升到了美团点评五颗星，第39天升到了天津私人影院热门榜第一名，第41天升到天津私人影院评价榜第一名，双榜第一长期霸榜。从开业第一个月烧4000块推广通到现在每个月只花几百块钱推广通，通过头部效应逐渐摆脱了对推广通的依赖。</p>
          <div class="text-center p">
            <img src="img/self/0.png" alt="" class=" wx-img">
          </div>
          <p>最初，我找遍了全网也没找到适合私人影院用的预约管理系统，网上成熟的软件都是主要配套KTV、美业的，针对私人影院增加时长、房间多容易预约混乱的问题压根没法解决，还不如EXCEL好用，所以我开发了这个飞象者私人影院预约管理、订单记录系统，把我运营时遇到的所有使用痛点都解决掉，希望你们使用后能够提升运营效率。</p>
          <p>与此同时，我也在给实体店的老板朋友们交流我的经验，渐渐地事情远远超出了我的预期，越来越多的来自全国各地区各行业的商家找我咨询这块经验技巧，餐饮、丽人美业、教育培训、医疗、健身、按摩、维修、产后护理、搬家运输、婚庆、私人影院、密室、KTV、宠物、眼镜等行业的商家都有，他们焦虑的问题也都比较集中，且我的方法论可以比较完美的套用到大部分行业的美团点评运营上。</p>
          <figure class="text-center p">
            <img
              src="img/self/1.png"
              alt="" />	
            <figcaption>2019年11月，我受美团点评官方邀请授课</figcaption>
          </figure>
          <figure class="text-center p">
            <img
              src="img/self/home.jpg"
              class="sm-img"
              alt="" />
            <img
              src="img/self/2.jpg"
              class="sm-img"
              alt="" />	
            <figcaption>9月，受知名体育媒体【餐饮老板内参】邀请做了现场授课</figcaption>
          </figure>
          <figure class="text-center p">
            <img
              src="img/self/3.jpg"
              alt="" />
            <figcaption>受知名体育媒体【懒熊体育】邀请做了现场授课。</figcaption>
          </figure>
          <p>事实上如果不是有人帮我统计，我都不太敢相信，线上和线下的学员简直高手如云，这里面有太多来自各自领域的大牌——</p>
          <b class="p">胡桃里酒馆、太二酸菜鱼、SEAS小颜、北京EMS健身、小岛丽妍、宁波极光私人影院、兰州二维码影酷、北京NB肌肤科技、超级猩猩、莆田餐厅、北京骨气鼓气羊棒骨、小龙坎火锅、光猪圈健身、丝域养发、艾科思科学、汤城小厨、巍阁月子会所、克丽缇娜、有拈头火锅、海盗虾饭、鲜果时间、三棵树漆……</b>
          <p>而我的经验方法就这样影响了一些人，帮助了一些人，连接了一些人，改变了一些人。</p>
          <b class="p">欢迎你来找我咨询，</b>
          <b class="p">我可以给你免费诊断美团点评店铺运营问题，不限行业</b>
          <b class="p">(我的微信:909903974)</b>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import { mapActions, mapState, } from 'vuex'
// import AddChild from './home/AddChild'

export default {
  name: "home",
  components: {
    
  },
  data() {
    return {

    };
  },
  created() {

  },
  methods: {

  },
  computed: {

  }
};
</script>

<style lang="scss">
.page-body {
  margin: 12px;
  padding: 68px 49px;
  background: #fff;
}
.page-left {
  img {
    width: 324px;
    margin-bottom: 32px;
  }
  .intro-bg {
    width: 324px;
    box-sizing: border-box;
    background: #bbb;
    font-weight: bold;
    font-size: 24px;
    padding: 21px;
  }
}
.intro-bg--li {
  &+& {
    margin-top: 32px;
  }
}
.page-right {
  font-size: 20px;
  line-height: 1.5;
  margin-left: 32px;
  p,
  .p {
    margin-bottom: 32px;
    display: block;
  }
  & .wx-img {
    width: 80%;
  }
}
figure {
  img {
    width: 50%;
  }
  figcaption {
    color: #000;
    margin-top: 0px;
    font-size: 16px;
    font-weight: bold;
  }
  .sm-img {
    width: 40%;
  }
}
.sm-img {
  &+& {
    margin-left: 12px;
  }
}
</style>
