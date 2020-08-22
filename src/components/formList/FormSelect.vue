<template>
  <div class="iptBox_select">
    <div class="label">{{label}}</div>
    <!-- <input :value="value" @input="$emit('input', $event.target.value)" :placeholder="placeholder" class="cont"> -->
     <mt-popup v-model="popupVisible" popup-transition="popup-fade" closeOnClickModal="true" position="bottom">
      <mt-picker :slots="slots" value-key="name" @change="onValuesChange" showToolbar>
        <div class="picker-toolbar-title">
          <div class="usi-btn-cancel" @click="popupVisible = !popupVisible">取消</div>
          <!-- <div class="">请选择代理区域</div> -->
          <div class="usi-btn-sure" @click="popupVisible = !popupVisible">确定</div>
        </div>
      </mt-picker>
    </mt-popup>
    <div class="my-content-list" @click="ShouPup">
    <div>
      <input v-model="message" class="cont" :placeholder="placeholder" disabled/>
    </div>
    </div>
  </div>
</template>

<script>
export default {
  name:'formInput',
  props:['value','label','placeholder','dataList','nameKey','codeKey','initVal'],
  data () {
    return {
      showToolbar: true,
      message: '',
      initShow: false,  //  默认 是否赋值
      initObj: {},
      slots: [{
        values: [
          {name: ' ' ,code: ' '},
        ],
      }],
      popupVisible: false,
    }
  },
  methods: {
    ShouPup() { // 弹出选框触发
      // 初始化取值
      this.message = this.initObj.name
      console.log("shoupup",this.initObj);
      this.$emit('shoupup', this.initObj);
      this.$emit('input', this.initObj);
      // 默认回显值
      this.initShow = true
      this.popupVisible = true
      var moveDiv = document.querySelectorAll('.mint-popup')
      moveDiv.forEach((dom)=>{
        dom.addEventListener('touchmove', function(e) {
          e.preventDefault();
        }, false);
      })
      
    },
    onValuesChange(picker, values) { // 选框筛选触发
      if(!values[0]) {return false}
      console.log(values[0]);
      // 初始化赋值
      // console.log(values[0].name,values[0].code);
      this.initObj = values[0]; // 将对象赋值
      if (!this.initShow) return false
      // 将name 回显
      this.message = values[0].name;
       console.log("shoupup",values[0].name);
      // 将最终值返回给组件 v-model
      this.$emit('input', values[0]);
    },
  },
  mounted () {
    // console.log(this.nameKey,this.codeKey)
  },
  watch:{
    dataList: {
      handler(newData,oldData){
        // 　　　console.log('dataListWatch',newData,oldData);
        var _dataList = [],newList = []
        _dataList = JSON.parse(JSON.stringify(this.dataList))
        // 转换 key
        _dataList.forEach((ev,index) => {
          let newObj = {}
          Object.keys(ev).forEach((kval)=> {
            newObj[kval] = ev[kval]
            if(kval == this.nameKey) { newObj.name = ev[kval]}
            if(kval == this.codeKey) {newObj.code = ev[kval]}
          })
          newList.push(newObj)
        });
        // 将最终结果赋值
        this.slots[0].values = newList;
			},
			deep: true, // 对象监听
			immediate: true, // 初始化监听
    },
    initVal: {
      handler(newData,oldData){
        this.message = newData
			},
			deep: true, // 对象监听
			immediate: true, // 初始化监听
    }
  },
  activated () {
    console.log(this.initVal)
    this.initVal && (this.message = this.initVal)
  }
}
</script>

<style lang="less">
  .iptBox_select {
    border-bottom: 1px solid #ebebeb;
    overflow: hidden;
    margin: 0 0.2rem;
    padding-right: 0.2rem;
    background: url("./../../assets/img/src/form_right.png") center right no-repeat;
    background-size: auto 22%;
    .label {
      float: left;
      height: 0.6rem;
      line-height: 0.6rem;
      width: 1rem;
      text-align: justify;
      font-size: 0.16rem;
    }
    .label:after {
      display: inline-block;
      width: 100%;
      content: '';
    }
    .cont {
      float: right;
      height: 0.6rem;
      line-height: 0.6rem;
      text-align: right;
      width:100%;
      background: #fff;
      color: #333;
    }
    .picker-item.picker-selected {
      font-size: 0.4rem;
      font-weight: bold;
      color:#333; 
    }
  }
  .picker-slot.picker-slot-center {
    width: 100%;
  }
  input[disabled],input:disabled,input.disabled{
    color: #333;
    -webkit-text-fill-color:#333;
    -webkit-opacity:1;
    opacity: 1;
  }
// ::-webkit-input-placeholder { /* WebKit browsers */
//       color: #999;
//       font-size: 0.26rem;
//     }
//     :-moz-placeholder { /* Mozilla Firefox 4 to 18 */
//       color: #999;
//       font-size: 0.26rem;
//     }
//     ::-moz-placeholder { /* Mozilla Firefox 19+ */
//       color: #999;
//       font-size: 0.26rem;
//     }
//     :-ms-input-placeholder { /* Internet Explorer 10+ */
//       color: #999;
//       font-size: 0.26rem;
//     }
</style>
