<template>
	<div class="container main" id="J_wrapper" @click="lineTag = false">
		<!-- <div class="title">手写板</div> -->
		<van-dialog v-model="show" title="">
			<div style="text-align:center">

				<van-icon style="background-color:#24c7a0;padding:10px;border-radius:50%;margin:20px 0;" name="success" size="80" color="#fff" />
				<p>提交成功</p>
			</div>
		</van-dialog>
		<div class="canvas-box" id="canvas-box">
			 
			<vueSignature ref="signature" class="dash" id="dash" :sigOption="option" :w="'100%'" :h="'100%'" :disabled="disabled" :defaultUrl="dataUrl"></vueSignature> 
			<div  class="down-cover" ref="down-cover" >
				<!-- :style="{lineHeight:heights+'px'}" -->
				<div v-if="textTag" class="centers">
					<div>请在空白处签字</div>
					<span style="font-size:12px;letter-spacing:2px;">请横屏签字</span>
				</div>
			</div>
		</div>
        <div class="box" ref="box">
			
			<span class="colors">
				<a  v-for="(item,index) in colors" @click="changeColor(item)" :class="{current:colorIndex==index}"  :style="{backgroundColor:item.color}" :key="index"><i></i></a>
			</span>
				<span class="iconfont classicon" @click.stop="lineTag = !lineTag" style="color:#1296DB;position:relative;margin-right:10px;margin-left:20px;">&#xe637;</span>
			 <div style="position:relative;display:inline-block;background-color:#fff;">
				 <div class="changeLine" v-if="lineTag" >
					<div style="font-size:14px;color:#1296DB">签字笔粗细</div>
					<div style="margin-top:10px;"> 
							<div style="position:relative;height:20px;line-height:20px;width:150px;float:left;">
							 	<img src="../../assets/tiao.png" mode="scaleToFill" style="width:150px;">
								 <span @touchmove="touchMove" style="position:absolute;display:inline-block;width:30px;height:30px;top:-6px;text-align:center;" :style="qiu">

									<span  style="border-radius:50%;display:inline-block;width:15px;height:15px;margin-top:7px;" :style="scnei"></span>
								 </span>
							</div>
						 
							 <span style="display:inline-block;width:30px;text-align:center;font-size:14px;float:left;">{{option.maxWidth}}</span>
							
							<!-- <van-slider v-model="option.maxWidth" :min="1" :max="10" @change="onChange"><template #button>
							<div class="custom-button" :style="{backgroundColor:option.penColor}">
							{{ option.maxWidth }}
							</div>
 						 </template></van-slider> -->
						 
					</div>
				</div>
			 </div>
				<span class="iconfont classicon" @click="clear" style="color:#1296DB;position:relative;margin-left:10px;">&#xe624;</span>
				<div class="buttons">
					<van-button class="ag-btn" v-if="redirect_url" @click="backUrl">返回</van-button>
					<van-button class="ag-btn" type="info" @click="sendImg">确定</van-button>
				</div>
			<div>

			</div>
			<!-- <van-icon class-prefix="iconfont" name="iconxiangpi" /> -->
            <!-- <button @click="save">Save</button>
            <button @click="clear">Clear</button>
            <button @click="undo">Undo</button>
            <button @click="addWaterMark">addWaterMark</button>
            <button @click="handleDisabled">disabled</button> -->
        </div>
	</div>
</template>

<script>
// 请求接口
import {qrSave} from '@/api/sign.js'
import { Dialog,Toast } from 'vant';
import '@/plugins/create.js'
//  import VConsole from 'vconsole';
//  let vConsole = new VConsole();
export default {
    name: "app",
    
	data() {
		return {
			// rotate：0  不旋转  1 旋转
			textTag:true,
			show:false,
			phoneHeight:0,
			phoneWidth:0,
			$wrapper:null,
			option:{
                // dotSize:0,
				penColor:"#000",
                backgroundColor:"rgba(255, 255, 255, 0)",
                minWidth:2.1,
                maxWidth:7,
                minDistance: 2,
				throttle: 1,
				// number:5,
				// velocityFilterWeight:0.6,
				FilterWeight:5,
				onBegin:this.onBegin
			},
			qiu:{
				 
				 
				left:"55%"
			},
			scnei:{
				backgroundColor:"#000"
			},
			id:0,
			redirect_url:"",
			lineWidth:5,
			lineTag:false,
			heights:0,
			disabled:false,
			colorIndex:0,
            dataUrl:"",
			ctx:"",
			colors:[
				{index:0,color:"black"},
				{index:1,color:"green"},
				{index:2,color:"rgb(74, 144, 226)"},
			],
			adjustPositionArr:[],
			adjustFullSizeArr:[],
			isPortrait:"",
			stage:{
				rotation:"",
				x:"",
				canvasWidth:"",
				canvasHeight:""
			},
			num:0
			 
		};
    },
    mounted(){
		  
		this.init();
		this.canvas=this.$refs.signature.$el.getElementsByTagName("canvas")[0];
		this.stage.canvasWidth = this.canvas.offsetWidth-40;
		this.stage.canvasHeight =this.canvas.offsetHeight+40;
		 
		this.phoneWidth = document.documentElement.clientWidth;
		this.phoneHeight =  document.documentElement.clientHeight;
		var box = document.getElementById("canvas-box");
	 	this.$wrapper =  document.getElementById("J_wrapper");
		window.onresize = this.detectOrient;
		this.detectOrient(true);
		//  this.cavasGO();
    },
	methods:{
		init(){
			var curWwwPath=window.document.location.href;
			var pos=curWwwPath.indexOf('/index.html');
			this.baseUrl=curWwwPath.substring(0,pos).replace('/page','');
			// this.baseUrl = 'http://192.168.1.250:8892'
		
			this.id = this.getString("skey");
			var redirect_url = this.getString("redirect_url")
			var accessToken = this.getString("accessToken");
			if(accessToken){
				this.accessToken = accessToken;
			}
			if(redirect_url ){
				 
				var num = location.hash.indexOf('redirect_url');
				var searchs = location.hash
				var str = searchs.slice(num,searchs.length);
				var arr = str.split("redirect_url=")
				
				 
				this.redirect_url =arr[1];
				
			};
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
		detectOrient(tag){
			// this.clear();
			if(this.num>0){
				this.clear();
			}
			// 利用 CSS3 旋转 对根容器逆时针旋转 90 度
			//  console.log(this.$refs.signature,"nature")
			//  border:1px dashed red;
			//  this.$refs.signature.$el.style.border = "1px solid red"
			 this.num ++
			var width = document.documentElement.clientWidth,
				height =  document.documentElement.clientHeight,
				$wrapper =  document.getElementById("J_wrapper"),
				style = "";
			console.log(width> height)
			if( width >= height ){ // 横屏
				this.isPortrait = false;
				style += "width:" + width + "px;";  // 注意旋转后的宽高切换
				style += "height:" + height + "px;";
				style += "-webkit-transform: rotate(0); transform: rotate(0);";
				style += "-webkit-transform-origin: 0 0;";
				style += "transform-origin: 0 0;";
			}
			else{ // 竖屏
				this.isPortrait = true;
				style += "width:" + height + "px;";
				style += "height:" + width + "px;";
				style += "-webkit-transform: rotate(90deg); transform: rotate(90deg);";
				// 注意旋转中点的处理
				style += "-webkit-transform-origin: " + width / 2 + "px " + width / 2 + "px;";
				style += "transform-origin: " + width / 2 + "px " + width / 2 + "px;";
			}
			$wrapper.style.cssText = style;
				 
			 this._setSize(tag);
			 
		},
		cavasGO(c){
			 var self = this;
			self.canvas =this.canvas;
			self.stage = {
				canvas :this.canvas
			};
			self.designWidth =this.canvas.offsetWidth // 1334;
			self.designHeight =this.canvas.offsetHeight // 750;
			var i = 1,   
				modes = [
					createjs.view.CONTAIN,
					createjs.view.COVER,
					createjs.view.FILL,
					createjs.view.FIXED_WIDTH,
					createjs.view.FIXED_HEIGHT
				];
			createjs.view.setViewMode(self.stage, self.designWidth, self.designHeight, modes[2], function(){
				// 做任何你所需要的游戏内容层面的适配操作
				//  _this.detectOrient();
				var ctx=self.canvas.getContext("2d");
				// createjs.view.adjustFullSize(ctx)
				self.textTag = true;
				console.log("开始旋转")
			});

			 
			 
		 
		},
		onBegin(e){
			this.textTag = false;
			this.lineTag = false
		},
		changeColor(e){
			this.colorIndex = e.index;
			this.$refs.signature.sig.penColor = e.color
			this.option.penColor = e.color;
			this.scnei.backgroundColor = e.color
		},
		sendImg(){
			var _this = this;
			var png = _this.$refs.signature.save().split(",")[1];
			qrSave({
				skey:this.id,
					base64:png,
					accessToken:this.accessToken,
					rotate:this.isPortrait? 1: 0
			},this.baseUrl).then((res) => { 
				 
				if(res.code!=200){
					this.$dialog.alert({
						title: '',
						message: res.message
					}).then(() => {
						
					});
				}else{
					if(_this.redirect_url){
						_this.show = true;
						setTimeout(function(){
							location.href =decodeURIComponent(_this.redirect_url);
						},3000)
			          }else{
						_this.show = true;
						
					}
				}
			})
        	.catch((e) => {
						console.log(e);
						try {
				 			this.$toast.fail(e.message);	
						} catch (error) {
				 			this.$toast.fail('请求失败');
						}
			})
			 
		},
		backUrl(){
		 
			location.href =decodeURIComponent(this.redirect_url);
		},
		clear(){
			var _this = this;
			_this.$refs.signature.clear();
			this.textTag = true;
		},
		onChange(e){
			 
			 
			this.$refs.signature.sig.maxWidth = e;
			var width = e-3;
			if(width<0){
				width = 0.5
			}
			this.$refs.signature.sig.minWidth = width;
			
			// this.option.penColor = e.color
		},
		 
		undo(){
			var _this = this;
			_this.$refs.signature.undo();
		},
		addWaterMark(){
			var _this = this;
			_this.$refs.signature.addWaterMark({
				text:"mark text",          // watermark text, > default ''
				font:"20px Arial",         // mark font, > default '20px sans-serif'
				style:'all',               // fillText and strokeText,  'all'/'stroke'/'fill', > default 'fill		
				fillStyle:"red",           // fillcolor, > default '#333' 
				strokeStyle:"blue",	   // strokecolor, > default '#333'	
				x:100,                     // fill positionX, > default 20
				y:200,                     // fill positionY, > default 20				
				sx:100,                    // stroke positionX, > default 40
				sy:200                     // stroke positionY, > default 40
			});
		},
		fromDataURL(url){
			var _this = this;
			_this.$refs.signature.fromDataURL("data:image/png;base64,iVBORw0K...");
		},
		handleDisabled(){
			var _this = this;
			_this.disabled  = !_this.disabled
		},
		 
		// halfCutHeight、halfCutWidth是根据适配后的实际Canvas大小计算出来的相对距离
		_setSize: function(e,tag){
			var self = this;
			 
			// if(tag&&self.isPortrait){
			// 	self.isPortrait = !self.isPortrait;
				
			// }
			
			 var style = '';
			//  alert(JSON.stringify(this.stage))
			if(self.isPortrait) {//竖屏

				style += "width:" + this.stage.canvasWidth + "px;";  // 注意旋转后的宽高切换
				style += "height:" + this.stage.canvasHeight + "px;";
				style += "-webkit-transform: rotate(-90deg); transform: rotate(-90deg);";
				style += "transform-origin:"+ this.stage.canvasWidth / 2 + "px " + this.stage.canvasWidth / 2 +"px;";
				style += "transform-origin:"+ this.stage.canvasWidth / 2 + "px " + this.stage.canvasWidth / 2 +"px;";
				// style+='border:2px solid red;'
			}else { 
				//  alert(this.$refs.box.offsetHeight)
				style += "width:" + (this.$wrapper.offsetWidth) + "px;";  // 注意旋转后的宽高切换
				style += "height:" + (this.$wrapper.offsetHeight-this.$refs.box.offsetHeight) + "px;";
				style += "-webkit-transform: rotate(0); transform: rotate(0);";
				style += "-webkit-transform-origin: 0 0;";
				style += "transform-origin: 0 0;";
				// style+='border:2px solid red;'
			}
			this.canvas.style.cssText = style;
			// this.canvas.style.borderTop = "1px solid red"
			// ...
		},
		// 贴边元素重定位核心处理函数
		 touchMove(e){//滑动的动画
			  
			let tops = null;//150
			// console.log(e.changedTouches[0])
			if(this.isPortrait){
				tops = e.changedTouches[0].pageY-158
			}else{
				tops = e.changedTouches[0].pageX-226
			}
			var width = 150;
			var step = 7.3
			var tag = (tops/width*100).toFixed(3);
			var s= Math.floor(tag/step)
			var mins = s*0.3;
			if(s<1){
				s = 1
			// mins = 0.2
			}else if(s>12){
				s = 12;
				mins = 5.5
			}
			 
			this.$refs.signature.sig.maxWidth = s;
			this.$refs.signature.sig.minWidth = mins;
			this.option.maxWidth = s;
			this.sliderValue = step*s
			this.qiu.left = step*s+"%";

		 }
		 
	}
};
</script>
<style lang='scss' scoped>
body,html{
    width:100%;
    height:100%;
	-webkit-text-size-adjust: none;
	-moz-text-size-adjust: none;
	-ms-text-size-adjust: none;
	text-size-adjust: none
}
#J_wrapper{
	-webkit-text-size-adjust: none;
-moz-text-size-adjust: none;
-ms-text-size-adjust: none;
text-size-adjust: none
}
.container{
    width:100%;
    height:100%;
	-webkit-text-size-adjust :  100%;
-moz-text-size-adjust : 100%;
-ms-text-size-adjust : 100%;
text-size-adjust : 100%;
    // background-color: #000;
	overflow: hidden;
}
.title{
	position: fixed;
	width:100%;
	top:0;
	z-index:52;
	line-height: 30px;
	height:30px;
	text-align: center;
	color:#1296DB;
	font-size:14px;
	// color:	
}
.box{
    position: fixed;
    bottom:2px;
	left:0px;
	width:100%;
	height:40px;
	line-height: 50px;
	z-index: 101;
}
.canvas-box{
	height:100%;
	width:100%;
	padding:0 0 40px;
	box-sizing:border-box;
	background-color: #fff;
	position: relative;
}

.dash{
	position: relative;
	overflow: hidden;
	// margin:0 20px;
	
	z-index: 100;
}
.down-cover{
	// padding:0 0 30px;
	position: relative;
	top:-100%;
	left:0;
	z-index: 50;
	color: #BFBFBF;
	background-color: #f8f8f8;
	box-sizing:border-box;
	width:100%;
	height:100%;
	font-size:20px;
	letter-spacing:5px;
	text-align: center;
	// line-height:200%;
}
.colors{
	margin-left:30px;
}
.colors a {
     position: relative;
     margin: 0 5px;
     display: inline-block;
     height: 20px;
     width: 20px;
     border-radius: 50%;
 }
 .classicon{
	 font-size:25px;
 }
 .colors a.current i {
     border: 1px solid #bbb;
 }
  .colors a i {
     position: absolute;
     top: -3px;
    left: -3px;
     width: 25px;
     height: 25px;
     border-radius: 50%;
 }	
 .changeLine{
	position: absolute;	 
	width: 180px;
    height: 50px;
	top: -98px;
	left:-25px;
	z-index: 800;
	line-height: 13px;
	border-radius: 5px;
	border:2px solid #1296DB;
	padding:5px;
	background-color: #fff;
 }
 .left{
	 float:left;}
.custom-button {
    width: 26px;
    color: #fff;
    font-size: 10px;
    line-height: 18px;
    text-align: center;
    
    border-radius: 100px;
  }
  .centers{
	  position: absolute;
	  top:0;
	  left:0;
	  bottom:0;
	  right:0;
	  margin:auto;
	  height:60px;
  }
  .buttons{
	float:right;
	margin-right:20px;
	position: relative;
	top:-2px;
	padding-right: 40px;
	box-sizing: border-box;
	  button{
		font-size:10px;
	//   padding:5px;
		margin-right:10px;
		height:20px;
		line-height: 20px;
	  }
  }
//   @media screen and (orientation: portrait) {
//         .main {
//             -webkit-transform:rotate(-90deg);
//             -moz-transform: rotate(-90deg);
//             -ms-transform: rotate(-90deg);
//             transform: rotate(-90deg);
//             width: 100vh;
//             height: 100vh;
//             /*去掉overflow 微信显示正常，但是浏览器有问题，竖屏时强制横屏缩小*/
//             overflow: hidden;
//         }
        
//     }
//     @media screen and (orientation: landscape) {
//         .main {
//             -webkit-transform:rotate(0);
//             -moz-transform: rotate(0);
//             -ms-transform: rotate(0);
//             transform: rotate(0)
//         }
//     }
</style>
