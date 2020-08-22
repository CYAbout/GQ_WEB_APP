<template>
  <div class="carPicCont" :style="{background:background}">
    <!-- <div class="picMove"
      @mousedown="down"
      @touchstart="down"
      @mousemove="move"
      @touchmove="move"
      @mouseup="mouseup"
      @touchend="mouseup"
    > -->
    <div class="picMove">
      <div class="carBox">
        <div v-for="(car,i) in carColorList" :key="i" class="carColor">
          <img v-for="(link,ind) in car" :src="require('./../assets/img/car/c'+ i +'_0'+ (ind+1) +'.png')" :key="ind" alt="" srcset="">
        </div>
      </div>
    </div>
    <ul class="colorBox">
      <li style="background:#e8e8e8"><div v-show="colorIndex == 0" style="border-color:#fff"></div></li>
      <li style="background:#cbcbcb"><div v-show="colorIndex == 1" style="border-color:#fff"></div></li>
      <li style="background:#4a4a4a"><div v-show="colorIndex == 2" style="border-color:#fff"></div></li>
      <li style="background:#f0cd1b"><div v-show="colorIndex == 3" style="border-color:#fff"></div></li>
      <li style="background:#e03030"><div v-show="colorIndex == 4" style="border-color:#fff"></div></li>
      <li style="background:#be2528"><div v-show="colorIndex == 5" style="border-color:#fff"></div></li>
      <li style="background:#9a609a"><div v-show="colorIndex == 6" style="border-color:#fff"></div></li>
      <li style="background:#397bcf"><div v-show="colorIndex == 7" style="border-color:#fff"></div></li>
    </ul>
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
      startClientX: 0,
      imgDomList: null,
      lastVal: 0,
      carNumAll: 0,
      oldLastVal: null,
      carIndex: 0,
      colorIndex: 0,
      carBoxDom: null,
      carColorDom: [],
    }
  },
  methods: {
    move (event) {
      var touch;
      if(event.touches){
          touch = event.touches[0];
      }else {
          touch = event;
      }
      // 获取X轴移动长度5的倍数取整数
      let lastVal = 100000 - parseInt((this.startClientX - touch.clientX)/5)
      console.log(lastVal,this.oldLastVal)
      // 筛选重复值
      if (lastVal === this.oldLastVal) return;
      // 存放值做新老值对比
      this.oldLastVal = lastVal
      // 保存拖动记录
      this.lastVal = lastVal
      this.carIndex = this.carNumAll+this.lastVal
      console.log(this.carIndex)
      this.getCar()
    },
    down (event) {
      var touch;
      if(event.touches){
          touch = event.touches[0];
      }else {
          touch = event;
      }
      // 获取X轴初始位置
      this.startClientX = touch.clientX
      console.log('down',touch.clientX,touch.clientY)
    },
    mouseup () {
      console.log('up')
      // 手指抬起时保存轨迹
      this.carNumAll += this.lastVal
    },
    getCar () { // 操作dom
      // 隐藏所有颜色包和图片
      this.carColorDom.forEach((dom)=>{
        dom.style.display = 'none'
        dom.querySelectorAll('img').forEach((img)=>{
          img.style.display = 'none'
        })
      })
      // 显示对应颜色
      this.carColorDom[this.colorIndex].style.display = 'block'
      // 显示对应车型
      let thisImglist = this.carColorDom[this.colorIndex].querySelectorAll('img')
      let imgLth = thisImglist.length
      console.log(imgLth)
      console.log(this.carIndex)
      console.log(this.carIndex%imgLth)
      console.log(this.carColorDom[this.colorIndex])
      thisImglist[this.carIndex%imgLth] && (thisImglist[this.carIndex%imgLth].style.display = 'block')
    }
  },
  mounted () {
    // this.loadImg()
    this.carBoxDom = document.querySelector('.carBox')
    // 获取颜色包
    this.carColorDom = this.carBoxDom.querySelectorAll('.carColor')
    // let imgList = this.carColorDom.querySelectorAll('img')
    // this.imgDomList = imgList

    // 绑定圆点点击事件
    let colorBox = document.querySelector('.colorBox')
    let liList = colorBox.querySelectorAll('li')
    console.log(liList)
    liList.forEach((dom,i)=>{
      dom.onclick = (ev) => {
        console.log(dom,i)
        this.colorIndex = i
        this.getCar()
      }
    })
  }
}
</script>

<style lang="less">
.carPicCont {
  position: relative;
  padding-bottom: .20rem;
  height: 58vw;
  margin-bottom: -1px;
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
  transform: translate(-50%,-50%)
}
.carBox img {
  width:100%;
  /* height: 100%; */
  position: absolute;
  top: 0;
  left: 0;
  display: none;
}
.carBox img:first-child {
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
