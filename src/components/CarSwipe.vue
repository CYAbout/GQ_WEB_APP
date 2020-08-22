<template>
  <div class="carSwipe" :style="{background:background}">
    <div class="picMove">
      <div class="carBox">
        <mt-swipe :auto="0" :showIndicators="true">
          <mt-swipe-item v-for="(car,i) in carColorList" :key="i">
            <div  class="carColor">
              <img v-for="(link,ind) in car" :src="require('./../assets/img/car/c'+ i +'_0'+ (ind+1) +'.png')" :key="ind" alt="" srcset="">
            </div>
          </mt-swipe-item>
        </mt-swipe>
        <img class="ImgMove" src="./../assets/img/CarImgMove.png" alt="">
      </div>
    </div>
  </div>
  
</template>

<script>
export default {
  name:'carPicCont',
  props: ['background'],
  data () {
    return {
      // 横向方向，纵向颜色
      carColorList: [
        // [1,2,3,4,5,6,7,8,9],
        [1],
        [1],
        [1],
        [1],
        [1],
        [1],
        [1],
        [1],
      ],
    }
  },
  
}
</script>

<style lang="less">
.carSwipe {
  position: relative;
  padding-bottom: .20rem;
  height: 62vw;
  margin-bottom: -1px;
  background: #be3932;
  padding: 0 0.2rem;
  // 轮播
    .mint-swipe {
      height: 4.6rem;
      .mint-swipe-indicators {
        width: 100%;
        bottom: -8px;
        .mint-swipe-indicator {
          // background:#be3932;
          opacity: 1;
          border-radius: 0.16rem;
          margin: 0.14rem;
          width: 16px;
          height: 16px;
          border-radius: 8px;
        }
        .mint-swipe-indicator.is-active {
          border: 2px solid #fff;
        }
        >div:nth-child(1){background:#e8e8e8}
        >div:nth-child(2){background:#cbcbcb}
        >div:nth-child(3){background:#4a4a4a}
        >div:nth-child(4){background:#f0cd1b}
        >div:nth-child(5){background:#e03030}
        >div:nth-child(6){background:#be2528}
        >div:nth-child(7){background:#9a609a}
        >div:nth-child(8){background:#397bcf}
      }
    }
}
.picMove {
  position: relative;
  /* height: 50vw; */
}
.carBox {
  width: 100%;
  /* height:40vw; */
  position: absolute;
  left:50%;
  top:50%;
  transform: translate(-50%,0%);
  .ImgMove {
    position: absolute;
    bottom: 0.6rem;
    left: 50%;
    top:auto;
    width:0.8rem;
    margin-left: -0.4rem;
  }
}
.carBox .carColor img {
  width:100%;
  /* height: 100%; */
  position: absolute;
  top: 0;
  left: 0;
  display: none;
}
.carBox .carColor img:first-child {
  display: block;
}
.carColor {
  display: none;
}
.carColor:first-child {
  display: block;
}
.colorBox {
  /* background: red; */
  height: .20rem;
  position: absolute;
  bottom: 10px;
  left: 0;
  width: 100%;
  display: flex;
  justify-content:center;
  text-align: center;
  padding-bottom: 0.4rem;
}
.colorBox>li {
  border-radius: 50%;
  width:.3rem;
  height:.3rem;
  margin: 0.08rem 0.16rem 0;
  display: inline-block;
  box-sizing: border-box;
  position: relative;
  >div {
    position: absolute;
    top:50%;
    left:50%;
    width: 0.44rem;
    height: 0.44rem;
    border-radius: 50%;
    border: 1px solid #fff;
    transform: translate(-50%, -50%);
  }
}

</style>
