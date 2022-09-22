<template>
	<div id="bordbox" class="h100" :class="isLandscape ? 'landscape' : 'vertical'" @touchmove="toStop">
		<!-- <van-dialog v-model="show" title="">
			<div style="text-align:center">

				<van-icon style="background-color:#24c7a0;padding:10px;border-radius:50%;margin:20px 0;" name="success" size="80" color="#fff" />
				<p>提交成功</p>
			</div>
		</van-dialog> -->
	  <div v-if="infos&&!successTag"  class="h100">
		<!-- <van-button type="info" class="changeType" size="mini" @click="changeScape">{{
			isLandscape ? '切换竖屏签字' : '切换横屏签字'
		}}</van-button> -->
		<div class="flex flexColumn h100" v-if="!isLandscape">
		  <!-- 竖屏签字-->
		  <div class="flex-sub" >
			<van-col :span="isPortrait ? 24 : 10" class="top-box">
			  <div class="flex" :class="isPortrait ? 'vericalcontrol ' : 'vericalcontrol2 flexColumn'">
				<div>
				  <span v-if="!isPortrait">签字颜色：</span>
				  <colors @changeColor="changeColor"></colors>
				</div>
				<div :class="!isPortrait ? 'vericalcontrol2 flex' : ''">
					<div>
						<line-bar :isPortrait="isPortrait" :isLandscape="isLandscape" @touchMove="touchMove"></line-bar>
						<span
						  style="display: inline-block; width: 30px; text-align: center; font-size: 14px; float: left">{{
							  verticalOption.maxWidth
						  }}</span>
					  </div>
				</div>
				<div>
				  <span class="iconfont classicon" @click="delbase"
					style="color: #1296db; position: relative; margin-left: 2px">&#xe624;</span>
				</div>
			  </div>
			</van-col>
			<div class="nametop" :class="{ nametop2:userInfo.userName.length<3}" ref="nametop">
			  <div class="namehouse" :class="{ namehouse2: !isPortrait,namehouse3: userInfo.userName.length>3}"
				:style="{ color: index < varicalBase64.length ? '#333' : '#ccc' }"
				v-for="(item, index) in userInfo.userName.length" :key="index">
				<img class="bottom-arrow" v-if="currentIndex === index" src="../../assets/img/bottom_caret.png" />
				<img class="delete-i" v-if="completeName[index] === true" @click="delSingleSign(index)" src="../../assets/img/del_2.png" />
				<span v-if="!varicalBase64[index]" style="color:#ccc">{{ userInfo.userName[index] }}</span>
				<van-image v-if="varicalBase64[index]" :src="'data:image/png;base64,' + varicalBase64[index]">
				</van-image>
			  </div>
			</div>
			<van-col :span="isPortrait ? 24 : 8" class="medium-box">
				
				<span v-if="type == 1" style="color:#cfcfcf;font-size: 12px; display: inline-block">
				  （{{ signBoradType == 'one' ? '该签名仅限本次使用' : '将设置为默认签字' }}）
				</span>
				<p style="font-size: 14px; margin-bottom:5px" v-show="completeNum === userInfo.userName.length?false:true">
				  请书写第{{currentIndex+1}}个字“{{userInfo.userName[currentIndex]}}”
				</p>
			  </van-col>
			<van-row class="signbord-box">
			  <van-col :span="isPortrait ? 24 : 14" class="vermatter">
				<div class="verborar" :class="{ verborar2: !isPortrait }" ref="verborar">
				  <VueSignaturePad style="width: 100%; height: 100%" ref="verticaSignature" :options.sync="verticalOption"
					:scaleToDevicePixelRatio="true"></VueSignaturePad>
				</div>
			  </van-col>
  
			  
			  <van-col v-if="!isPortrait" span="8" style="text-align: center; margin-top: 40px">
				<van-button class="button-border-radius big_button_font"
				  style="height: 44px; padding: 0 13px; color: #32aaff" @click="backUrl(false)">返回</van-button>
				<van-button class="button-border-radius big_button_font" type="info"
				  style="height: 44px; padding: 0 13px; color: #fff"
				  :disabled="userInfo.userName.length != varicalBase64.length" @click="varicalSure()">确定</van-button>
			  </van-col>
			</van-row>
		  </div>
		  <van-row type="flex" v-if="isPortrait" class="bottom-box">
			<!-- <van-col span="12" style="margin-right: 10px">
			  <van-button class="big_button_font" style="color: #32aaff" block @click="backUrl(false)">返回</van-button>
			</van-col> -->
  
			<van-col span="12">
			  <van-button class="big_button_font" type="info" block
				:disabled="userInfo.userName.length != varicalBase64.length" @click="varicalSure()">确定</van-button>
			</van-col>
		  </van-row>
		  
		</div>
		<div v-if="isLandscape">
		  <div class="padboxland">
			<VueSignaturePad width="100%" height="100%" class="dash" id="dash" ref="signature" :options.sync="option" />
			<div class="container main" id="J_wrapper" @click="lineTag = false">
			  <!-- <div class="canvas-box" id="canvas-box"> -->
			  <div class="down-cover" ref="down-cover">
				<div v-if="textTag" class="centers">
				  <div>请在空白处签字</div>
				  <span style="font-size: 12px; letter-spacing: 2px">请横屏签字</span>
				</div>
			  </div>
			  <!-- </div> -->
			</div>
		  </div>
		  <div class="box" ref="box" id="box">
			<span class="colors">
			  <colors @changeColor="changeColor"></colors>
			  <!-- <a
					v-for="(item, index) in colors"
					@click="changeColor(item)"
					:class="{ current: colorIndex == index }"
					:style="{ backgroundColor: item.color }"
					:key="index"
					><i></i
					></a> -->
			</span>
			<span class="iconfont classicon" @click.stop="lineTag = !lineTag"
			  style="color: #1296db; position: relative; margin-right: 10px; margin-left: 20px">&#xe637;</span>
			<div style="position: relative; display: inline-block; background-color: #fff">
			  <div class="changeLine" v-show="lineTag">
				<div style="font-size: 14px; color: #1296db">签字笔粗细</div>
				<div style="margin-top: 10px">
				  <line-bar :isPortrait="isPortrait" :isLandscape="isLandscape" @touchMove="touchMove"></line-bar>
				  <span style="display: inline-block; width: 30px; text-align: center; font-size: 14px; float: left">{{
					  option.maxWidth
				  }}</span>
				</div>
			  </div>
			</div>
  
			<span class="iconfont classicon" @click="clear"
			  style="color: #1296db; position: relative; margin-left: 10px">&#xe624;</span>
			<div style="width: 100%; text-align: center; position: absolute; left: 0; top: 0; z-index: -1">
			  <span v-if="type == 1" style="font-size: 16px; display: inline-block">
				{{ signBoradType == 'one' ? '该签名仅限本次使用' : '将设置为默认签字' }}
			  </span>
			</div>
			<div class="buttons">
			  <!-- <van-button class="ag-btn" @click="backUrl(false)">返回</van-button> -->
			  <van-button class="ag-btn" type="info" @click="sendImg">确定</van-button>
			</div>
			
			<div></div>
			<!-- <van-icon class-prefix="iconfont" name="iconxiangpi" /> -->
			<!-- <button @click="save">Save</button>
						<button @click="clear">Clear</button>
						<button @click="undo">Undo</button>
						<button @click="addWaterMark">addWaterMark</button>
						<button @click="handleDisabled">disabled</button> -->
		  </div>
		</div>
	  </div>
	  <div v-if="successTag" style="width:100%;height:100%;text-align:center;">
		<div style="margin-top:30px;"></div>
		<van-icon style="background-color:#24c7a0;padding:10px;border-radius:50%;margin:20px 0;" name="success" size="80" color="#fff" />
		<div style="margin-top:30px;" class="tiptip">手写签名成功</div>
	</div>
	  <van-overlay :show="!isLandscape && !isPortrait" z-index="1000">
		<div class="tipveracl" @click.stop>请竖屏签字</div>
	  </van-overlay>
	</div>
  </template>
  
  <script>
  // 请求接口
  //  import jsonData from '../../../static/data.json'
  
  import { signSave, addTmpSign, addNameSign, addTmpNameSign,previewSign } from '@/api/signature.js'
  import {qrSave} from '@/api/sign.js'
//   import { previewSign } from '@/api'
  import colors from '@/components/colors.vue'
  import LineBar from '@/components/lineBar.vue'
  export default {
	name: 'app',
	props: {
	  type: {
		type: Number,
		default: 0
	  },
	  contractId: [String, Number],
	  signBoradType: String
	},
	components: { colors, LineBar },
  
	data() {
	  return {
		accessToken:'',
		skey:'',
		successTag:false,
		showad:true,
		show2: true,
		userInfo: {
		  userName: ''
		},
		// rotate：0  不旋转  1 旋转
		isLandscape: false, //是否是横屏
		nowindex: 0,
		textTag: true,
		textTag2: true,
  
		show: false,
		phoneHeight: 0,
		phoneWidth: 0,
		$wrapper: null,
  
		option: {
		  
		  penColor: '#000',
		  backgroundColor: 'rgba(255, 255, 255, 0)',
		 
		  dotSize: 3.8,
		  minWidth: 3.5,
		  maxWidth: 6,
		  minDistance: 2,
		  throttle: 1,
		  // number:5,
		  // velocityFilterWeight:0.6,
		  FilterWeight: 5,
		  onBegin: this.onBegin
		},
		verticalOption: {
		 
		  penColor: '#000',
		  backgroundColor: 'rgba(255, 255, 255, 0)',
		  dotSize: 3.8,
		  minWidth: 3.5,
		  maxWidth: 6,
		  throttle: 1,
		  // number:5,
		  // velocityFilterWeight:0.6,
		  FilterWeight: 5,
		  onBegin: this.onBeginVertical,
		  onEnd: this.onEndVertical
		},
  
		id: 0,
		redirect_url: '',
		lineWidth: 5,
		lineTag: false,
		lineTag2: false,
		heights: 0,
		disabled: false,
		colorIndex: 0,
		dataUrl: '',
		ctx: '',
		colors: [
		  {
			index: 0,
			color: 'black'
		  },
		  {
			index: 1,
			color: 'green'
		  },
		  {
			index: 2,
			color: 'rgb(74, 144, 226)'
		  }
		],
		adjustPositionArr: [],
		adjustFullSizeArr: [],
		isPortrait: true,
		stage: {
		  rotation: '',
		  x: '',
		  canvasWidth: '',
		  canvasHeight: ''
		},
		num: 0,
		detectTag: false,
		vericalTag: false,
		sureMatterTimeOut: '',
		varicalBase64: [],
		infos: false,
		currentIndex:0,//当前姓名index
		completeName:[],//签字完成情况数组
		signbordWidth:0,//签字板宽度
	  }
	},
	computed:{
	  completeNum(){
		let num = 0;
		for (let i=0;i<this.userInfo.userName.length;i++){
		  if (this.completeName[i] === true){
			num++;
		  }
		}
		return num;
	  }
	},
	mounted() {
	  //  ;
	  if (this.type != 1) {
		this.getInfo()
	  }
	  this.skey = this.getString("skey");
	  var accessToken = this.getString("accessToken");
		if(accessToken){
			this.accessToken = accessToken;
		}
	  window.onresize = this.detectOrient
	  // this.chu();
	  let bordbox = document.getElementById('bordbox')
	  bordbox.addEventListener(
		'touchmove',
		function (e) {
		  //组织默认下辣
		  e.preventDefault() // 阻止默认的处理方式(阻止下拉滑动的效果)
		},
		{ passive: false }
	  ) // passive 参数不能省略，用来兼容ios和android
  
	},
	methods: {
	  getSignbordWidth(){
		let clientW = document.documentElement.clientWidth;
		let clientH = document.documentElement.clientHeight;
		// this.userInfo.userName.length<3
		//底部按钮栏高度+顶部按钮高度+顶部颜色选择栏高度+姓名展示区域高度+中间提示区域高度
		let otherHeight = 100 + 50 + 40 + 115 + 40;
		let signbordWidth = clientH - otherHeight > clientW?clientW:clientH - otherHeight
		
		return signbordWidth;
		
		
	  },
	  async getInfo(tag) {
		// let res = await this.$store.dispatch('GetInfo', true)
		// this.userInfo = res
		let res = {
			horizonPerfer:1
		}
		this.signbordWidth = this.getSignbordWidth()
		this.realPhone = res.realPhone
		if (res.horizonPerfer == 1) {
		  //横版签字
		  this.isLandscape = true
		} else {
		  this.isLandscape = false
		}
		this.infos = true
  
		this.$nextTick(() => {
		  if (this.isLandscape) {
			
		  
			this.$borard = this.$refs.signature
		  } else {
			// this.$refs.nametop.style.width = this.signbordWidth+'px';
			this.$refs.verborar.style.width = this.signbordWidth+'px';
			this.$refs.verborar.style.height = this.signbordWidth +'px';
  
			this.$borard = this.$refs.verticaSignature
		  }
  
		  // if (!this.detectTag) {
		  this.detectOrient(true)
  
		  // }
		})
		// });
	  },
	  toStop(e) {
		e.preventDefault() // 阻止默认的处理方式(阻止下拉滑动的效果)
	  },
	  chu() {
		jsonData.forEach((item, index) => {
		  setTimeout(() => {
			this.toimg(item)
		  }, (index + 1) * 200)
		})
		// this.$refs.signature.fromData(jsonData)
	  },
	  toimg(item) {
		this.$borard.fromData([item])
	  },
	  undo() {
		this.$borard.undoSignature()
	  },
	  save() {
		const { isEmpty, data } = this.$borard.saveSignature()
		console.log(isEmpty)
		console.log(data)
	  },
  
	  detectOrient() {
		if (this.isLandscape) {
		  this.landOrient()
		} else {
		  this.verticalOrient()
		}
	  },
	  verticalOrient() {
		var width = document.documentElement.clientWidth,
		  height = document.documentElement.clientHeight,
		  dpr = window.devicePixelRatio
  
		if (width >= height) {
		  this.isPortrait = false
		  // this.$nextTick(()=>{
  
		  //   boxboard.$el.parentNode.offsetHeight
		  //   boxboard.signaturePad.canvas.width = boxHeight
		  //   boxboard.signaturePad.canvas.height = boxHeight
		  // })
		  // 横屏
		} else {
		  this.isPortrait = true
		}
		this.$nextTick(() => {
		  window.setTimeout(() => {
			let boxboard = this.$refs.verticaSignature
			let boxHeight = boxboard.signaturePad.canvas.offsetHeight
  
			boxboard.signaturePad.canvas.width = boxHeight
			boxboard.signaturePad.canvas.height = boxHeight
		  }, 600)
		})
	  },
	  changeScape() {
		this.isLandscape = !this.isLandscape
		this.$nextTick(() => {
		  if (this.isLandscape) {
			if (this.sureMatterTimeOut) {
			  window.clearTimeout(this.sureMatterTimeOut)
			  this.sureMatterTimeOut = null
			}
			this.$borard = this.$refs.signature
			this.landOrient()
		  } else {
			this.$borard = this.$refs.verticaSignature
			this.verticalOrient()
		  }
		  this.detectTag = true
		})
	  },
	  landOrient() {
		var width = document.documentElement.clientWidth,
		  height = document.documentElement.clientHeight,
		  $wrapper = document.getElementById('J_wrapper'),
		  style = '',
		  style2 = ''
  
		if (width >= height) {
		  // 横屏
		  this.isPortrait = false
		  style += 'width:' + width + 'px;' // 注意旋转后的宽高切换
		  style += 'height:' + height + 'px;'
		  style += '-webkit-transform: rotate(0); transform: rotate(0);'
		  style += '-webkit-transform-origin: 0 0;'
		  style += 'transform-origin: 0 0;'
		  style2 += 'left:0px;bottom:3px;width:100%;'
  
		  style2 += '-webkit-transform: rotate(0deg); transform: rotate(0deg);'
		  // style2 += "line-height:50px"
		} else {
		  // 竖屏
		  this.isPortrait = true
		  style += 'width:' + height + 'px;'
		  style += 'height:' + width + 'px;'
		  style += '-webkit-transform: rotate(90deg); transform: rotate(90deg);'
		  // 注意旋转中点的处理
		  style += '-webkit-transform-origin: ' + width / 2 + 'px ' + width / 2 + 'px;'
		  style += 'transform-origin: ' + width / 2 + 'px ' + width / 2 + 'px;'
		  let h = document.getElementsByClassName('iconfont')[0].offsetHeight + 20
		  style2 += 'top:0;width:100vh;left:' + h + 'px;'
		  style2 += '-webkit-transform: rotate(90deg); transform: rotate(90deg);'
		  style2 += 'transform-origin: 0 0;'
		}
		$wrapper.style.cssText = style
		this.$refs.box.style.cssText = style2
	  },
  
	  onBegin(e) {
		this.textTag = false
		this.lineTag = false
		// console.log(this.$borard ,"this.$borard ")
	  },
	  onBeginVertical() {
		this.textTag2 = false
		this.lineTag2 = false
		if (this.sureMatterTimeOut) {
		  window.clearTimeout(this.sureMatterTimeOut)
		  this.sureMatterTimeOut = null
		}
	  },
	  onEndVertical() {
		this.sureMatterTimeOut = window.setTimeout(() => {
		  this.getPath()
		}, 1500)
	  },
	  //删除单个字的签名
	  delSingleSign(index){
		this.$set(this.completeName,index,false);
		this.varicalBase64[index] = '';
		this.currentIndex = index;
		this.clear()
	  },
	  getPath() {
	
		let nameLength = this.userInfo.userName.length;
		console.log(this.completeNum,'completeNum')
		if (this.completeNum == nameLength) {
		  this.$toast('签名已添加完成')
		  this.clear()
		  return false
		}
		const { isEmpty, data } = this.$borard.saveSignature()
		var png = data.split(',')[1]
		this.varicalBase64.splice(this.currentIndex,1,png)
		// this.varicalBase64.push(png)
		this.$set(this.completeName,this.currentIndex,true)
		for (let i= 0;i<nameLength;i++){
		  if (this.completeName[i] != true){
			this.currentIndex = i;
			break;
		  }
		}
		// this.currentIndex = this.varicalBase64.length
		
		
		this.clear()
	  },
	  changeColor(e) {
		//   this.colorIndex = e.index
		this.$borard.signaturePad.penColor = e.color
  
		// this.option.penColor = e.color;
		//   this.scnei.backgroundColor = e.color
	  },
	  sendImg() {
		let funs = {}
		let obj = {}
		const { isEmpty, data } = this.$borard.saveSignature()
  
		if (isEmpty) {
		  this.$toast.fail('请签字后提交')
		  return false
		}
		// var toData = this.$refs.signature.toData()
		var png = data.split(',')[1]
		obj = {
			skey:this.skey,
			base64:png,
			accessToken:this.accessToken,
			rotate:this.isPortrait? 1: 0,
			// signArr:toData
		}
		if (this.type == 1) {
		  //签署页进来 的
		  if (this.signBoradType == 'one') {
			//添加临时
			funs.action = addTmpSign
			obj.contractId = this.contractId
		  } else {
			//添加默认  应该也是正常添加
			funs.action = qrSave
		  }
		} else {
		  //正常添加
		  funs.action = qrSave
		}
		funs
		  .action(obj)
		  .then(res => {
			console.log(res, 'res')
			if (res.code != 200) {
			  this.$dialog
				.alert({
				  title: '',
				  message: res.message
				})
				.then(() => { })
			} else {
			//   this.$toast.success('添加成功')
				this.successTag = true;
			  //封装对象
			 
			}
		  })
		  .catch(e => {
			console.log(e)
			try {
			  this.$toast.fail(e.message)
			} catch (error) {
			  this.$toast.fail('请求失败')
			}
		  })
	  },
	  async varicalSure() {
		let funs = {}
		let obj = {}
		obj = {
		  base64s: this.varicalBase64,
		  isMoa: 1,
		  rotate: 0
		}
		if (this.type == 1) {
		  //签署页进来 的
		  if (this.signBoradType == 'one') {
			//添加临时
			funs.action = addTmpNameSign
			obj.contractId = this.contractId
		  } else {
			//添加默认  应该也是正常添加
			funs.action = addNameSign
		  }
		} else {
		  //正常添加
		  funs.action = addNameSign
		}
		let { data } = await funs.action(obj)
		this.$toast.success('添加成功')
		this.varicalBase64 = []
		//封装对象
		let pObj = {
		  sealId: data,
		  base64: obj.base64,
		  id: data,
		  realImg: obj.base64,
		  fileImg: previewSign(data)
		}
		this.backUrl(true, pObj)
	  },
	  backUrl(tag, obj) {
		this.clear()
		if (tag) {
		  //成功的返回
		  if (this.type == 1) {
			this.$emit('success', obj)
		  } else {
			this.$router.go(-1)
		  }
		} else {
		  //点击按钮的返回
  
		  if (this.type == 1) {
			this.$emit('close', 'tocloseBoard')
		  } else {
			this.$router.go(-1)
		  }
		}
	  },
	  delbase() {
  
		let index = this.varicalBase64.length - 1;
		while ( index>=0){
		  this.varicalBase64.pop();
		  this.$set(this.completeName,index,false);
		  index --;
		}
		this.currentIndex = 0;
		this.clear();
	  },
	  clear() {
		var _this = this
		this.$borard.clearSignature()
		this.textTag = true
	  },
	  onChange(e) {
		//  console.log(this.$refs.signature)
		// this.$refs.signature.sig.maxWidth = e;
		// var width = e-3;
		// if(width<0){
		// 	width = 0.5
		// }
		// this.$refs.signature.sig.minWidth = width;
		// this.option.penColor = e.color
	  },
  
	  undo() {
		this.$borard.undo()
	  },
	  addWaterMark() {
		var _this = this
  
		this.$borard.addWaterMark({
		  text: '请在空白处签字', // watermark text, > default ''
		  font: '20px Arial', // mark font, > default '20px sans-serif'
		  style: 'all', // fillText and strokeText,  'all'/'stroke'/'fill', > default 'fill
		  fillStyle: 'red', // fillcolor, > default '#333'
		  strokeStyle: 'blue', // strokecolor, > default '#333'
		  x: 100, // fill positionX, > default 20
		  y: 200, // fill positionY, > default 20
		  sx: 100, // stroke positionX, > default 40
		  sy: 200 // stroke positionY, > default 40
		})
	  },
	  fromDataURL(url) {
		var _this = this
		this.$borard.fromDataURL('data:image/png;base64,iVBORw0K...')
	  },
	  getString: function (name) {
			 
			 var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
			 var r = window.location.hash.substr(window.location.hash.indexOf('?')+1).match(reg);
			 if (r != null) {
				 return decodeURIComponent(r[2]);
			 } else {
				 return null;
				 
			 }
		 },
	  handleDisabled() {
		var _this = this
		_this.disabled = !_this.disabled
	  },
  
	  // halfCutHeight、halfCutWidth是根据适配后的实际Canvas大小计算出来的相对距离
  
	  // 贴边元素重定位核心处理函数
	  touchMove(s) {
		//滑动的动画
  
		var mins = s-2 //* 0.60
		if (s < 1) {
		  s = 1
		  // mins = 0.2
		} else if (s > 12) {
		  s = 12
		  mins = 12*0.60
		}
		if (this.isLandscape) {
		  this.option.maxWidth = s
  
		  this.option.minWidth = mins
		} else {
		  this.verticalOption.maxWidth = s
  
		  this.verticalOption.minWidth = mins
		}
		this.$borard.signaturePad.maxWidth = s
		this.$borard.signaturePad.minWidth = mins
		this.$borard.signaturePad.dotSize = s+0.5
		//   this.sliderValue = step * s
		//   this.qiu.left = step * s + '%'
	  }
	}
  }
  </script>
  <style lang="scss" scoped>
  @import '../../assets/css/constant/constant.scss';
  
  body,
  html {
	width: 100%;
	height: 100%;
	-webkit-text-size-adjust: none;
	-moz-text-size-adjust: none;
	-ms-text-size-adjust: none;
	text-size-adjust: none;
  }
  
  #J_wrapper {
	-webkit-text-size-adjust: none;
	-moz-text-size-adjust: none;
	-ms-text-size-adjust: none;
	text-size-adjust: none;
	position: relative;
	z-index: 99;
  }
  
  .landscape {
	.padboxland {
	  width: 100%;
	  height: 100%;
	  position: fixed;
	  overflow: hidden;
	  // margin:0 20px;
	  left: 0;
	  top: 0;
	  z-index: 100;
	}
  
	.dash {
	  width: 100%;
	  height: 100%;
	  position: absolute;
	  z-index: 101;
	}
  
	.container {
	  width: 100%;
	  height: 100%;
	  -webkit-text-size-adjust: 100%;
	  -moz-text-size-adjust: 100%;
	  -ms-text-size-adjust: 100%;
	  text-size-adjust: 100%;
	  // background-color: #000;
	  overflow: hidden;
	}
  
	.title {
	  position: fixed;
	  width: 100%;
	  top: 0;
	  z-index: 52;
	  line-height: 30px;
	  height: 30px;
	  text-align: center;
	  color: #1296db;
	  font-size: 14px;
	  // color:
	}
  
	.box {
	  position: fixed;
	  line-height: 50px;
	  user-select: none;
	  z-index: 500;
	  background-color: #fff;
	}
  
	.canvas-box {
	  height: 100%;
	  width: 100%;
	  // padding:0 0 40px;
	  box-sizing: border-box;
	  background-color: #fff;
	  position: relative;
	}
  }
  
  .vertical {
	.top-box{
	  margin-top: 46px;
	  flex: 1;
	  display: flex;
	  align-items: center;
	  flex-direction: column-reverse;
	  max-height: 65px;
	}
	.medium-box{
	  flex:1;
	  text-align: center; 
	  margin-top: 10px;
	  display:flex;
	  flex-direction: column-reverse;
	  justify-content:center;
	}
	.flex-sub{
	  background-color: rgb(255, 255, 255);
	  display: flex;
	  flex-direction: column;
	  justify-content: flex-end;
	  max-height:calc(100% - 70px);
	  // margin-bottom:65px;
	}
	.bottom-box{
	  position: static!important;
	}
	.nametop2{
	  align-content: space-around!important;
	}
	.nametop {
	  flex: 1;
	  display: flex;
	  flex-direction: column-reverse;
	  display: flex;
	  flex-wrap: wrap;
	  justify-content: space-between;
	  align-content: space-between;
	  height:100px;
	  margin:25px auto 0 auto;
  
	  width:90vw;
  
	  .namehouse {
		position:relative;
		width: 100px;
		height: 100px;
		background: url('../../assets/img/matter.png');
		background-size: 100% 100%;
		text-align: center;
		display: flex;
		font-size: 60px;
		align-items: center;
		justify-content: center;
		margin:0 5px;
	  }
	  .namehouse:nth-child(1){
		margin-left:0;
	  }
	  .namehouse:nth-last-child(1){
		margin-right:0;
	  }
  
	  .namehouse2 {
		width: 50px;
		height: 50px;
		font-size: 30px;
	  }
	  
	  .namehouse3 {
		width:75px!important;
		height:75px!important;
	  }
	}
  
	.vermatter {
	  .verborar {
		// position:
		width: 90vw;
		height: 85vw;
		margin: 10px auto 10px;
		background: url('../../assets/img/matter.png');
		background-size: 100% 100%;
	  }
  
	  .verborar2 {
		width: 180px;
		height: 180px;
		margin: 10px auto 10px;
	  }
	}
  
	.vericalcontrol {
	  margin-top: 5px;
	  align-items: center;
	  justify-content: center;
	}
  
	.vericalcontrol2 {
	  margin-top: 5px;
	  align-items: left;
	  justify-content: left;
	}
  
	.delbase {
	  width: 20px;
	  height: 20px;
	  display: inline-block;
  
	  img {
		width: 100%;
		height: 100%;
	  }
	}
  }
  
  #bordbox {
	.changeType {
	  position: absolute;
	  top: 10px;
	  right: 10px;
	  font-size: $subFontSize;
	  padding: 6px 10px;
	  line-height: normal;
	  height: auto;
	  z-index: 500;
	}
  }
  
  .dash canvas {
	position: relative;
	z-index: 101;
  }
  
  .down-cover {
	// padding:0 0 30px;
  
	position: relative;
	position: relative;
	top: 0;
	left: 0;
	z-index: 50;
	color: #bfbfbf;
	background-color: #f8f8f8;
	box-sizing: border-box;
	width: 100%;
	height: 100%;
	font-size: 20px;
	letter-spacing: 5px;
	text-align: center;
	display: flex;
	align-items: center;
	justify-content: center;
	// line-height:200%;
  }
  
  .colors {
	margin-left: 30px;
	display: inline-block;
	height: 100%;
  }
  
  .classicon {
	font-size: 30px;
  }
  
  .changeLine {
	position: absolute;
	width: 180px;
	height: 50px;
	top: -98px;
	left: -25px;
	z-index: 800;
	line-height: 13px;
	border-radius: 5px;
	border: 2px solid #1296db;
	padding: 5px;
	background-color: #fff;
  }
  
  .changeLine2 {
	left: -125px;
	top: -98px;
  }
  
  .left {
	float: left;
  }
  
  .custom-button {
	width: 26px;
	color: #fff;
	font-size: 10px;
	line-height: 18px;
	text-align: center;
  
	border-radius: 100px;
  }
  
  // .centers {
  //   position: absolute;
  //   top: 0;
  //   left: 0;
  //   bottom: 0;
  //   right: 0;
  //   margin: auto;
  //   height: 60px;
  // }
  
  .buttons {
	float: right;
	margin-right: 20px;
	position: relative;
	top: -2px;
	padding-right: 40px;
	box-sizing: border-box;
  
	button {
	  font-size: $lowerButtonFontSize;
	  //   padding:5px;
	  margin-right: 10px;
	  height: 30px;
	  line-height: 30px;
	}
  }
  
  .big_button_font {
	font-size: $bigButtonFontSize;
  }
  
  .button-border-radius {
	border-radius: 5px;
  }
  
  .tipveracl {
	color: #eee;
	font-size: 22px;
	text-align: center;
	display: flex;
	align-items: center;
	justify-content: center;
	height: 100%;
	letter-spacing: 10px;
  }
  .bottom-arrow{
	width: 15px;
	position: absolute;
	top: -15px;
  }
  .delete-i {
	width: 16px;
	position: absolute;
	top: -8px;
	right: -8px;
	z-index:500;
  }
  .tiptip{
	font-size:16px;
	color:#333;
	font-weight: 600;

  }
  </style>
  