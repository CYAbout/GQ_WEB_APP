import {Toast} from 'mint-ui'
import { mapActions } from 'vuex';
export default {
    data () {
        return {
            // 在这里添加对应字段提示语
            expTextObj: {
                idCardName: '请输入真实姓名',
                phone: '请输入手机号',
                phoneNumber: '请输入手机号',
                phonecode:'请输入验证码',
                idCard:'请输入身份证号',
                id_card: '请输入身份证号',
                provinceName:'请选择省份',
                cityName:'请选择城市',
                dealerName:'请选择销售店',
                modleCarName:'请选择车型',
                carVersionName:'请选择型号',
                carColorName: '请选择颜色',
                address:'请输入详细地址',
                userAddress: '请输入详细地址',
                province_code: '请选择省份',
                city_code: '请选择城市',
                dealer_code: '请选择销售店',
                modle_code: '请选择车型',
                customer_name: '请输入真实姓名',
                province: '请选择省份',
                city: '请选择城市',
                code: '请输入验证码',
                monthsalary: '请输入月收入',
                addresstype: '请选择地址类型',
                married: '请选择婚姻状况',
                education: '请选择教育程度',
                employer: '请输入工作单位',
                bankcardnumber: '请输入银联卡号',
                is_phone: '请输入正确手机号',
                is_name: '请输入真实姓名',
                is_card: '请输入真实身份证号',
                vin: '请输入车架号',
                mileage: '请输入行驶里程',
                price: '请输入拍卖底价',
                
            },
            ExpType: {
                // 手机号
                phone: /^[1][3,4,5,7,8][0-9]{9}$/,
                // email
                email: /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/,
                // 地址
                address: /[`~!@#$%^&*()_\-+=<>?:"{}|,.\/;'\\[\]·~！@#￥%……&*（）——\-+={}|《》？：“”【】、；‘’，。、]/im,
                // 姓名
                name: /^[\u4E00-\u9FA5\uf900-\ufa2d·s]{2,16}$/,
                // 身份证号
                card: /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/,
            }
        }
    },
    methods: {
        ...mapActions(['setFootFlag']),
        /**
         * 
         * 空key校验
         * 调用 hasValExp 
         * 传入需要非空校验的对象
         */
        hasValExp(obj) {
            console.log('obj:',obj)
            var Arr = Object.keys(obj)
            for (var i=0;i<Arr.length;i++) {
                if(!obj[Arr[i]]) {
                    console.log(Arr[i])
                    if (this.expTextObj[Arr[i]]) {
                        Toast('' + this.expTextObj[Arr[i]])
                        return false
                    } else {
                        console.log('提示语未在 global.js 中配置：',Arr[i],'字段')
                    }
                }
            }
            return true
        },
        /**
         * 指定类型校验
         * @param {*} key 需要校验的key
         * @param {*} type 需要校验的类型
         */
        isTypeExp(type,_val) {
            console.log(type,_val)
            var _test = this.ExpType[type].test(_val)
            if (!_test) {
                Toast('' + this.expTextObj['is_' + type])
                return false
            }
            return true
        }
    },
    activated () {
        // 页面title赋值
        document.title = this.$options.pageName || '（暂未设置：pageName）'
        console.log('title:',document.title)
        console.log(this.$options.name)
        this.setFootFlag(this.$options.footFlag)
        document.body.style.position = 'relative'
        // 进入页面高度重置
		window.scrollTo(0, this.scroll)
    },
    deactivated() {
    },
}