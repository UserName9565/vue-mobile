<template>
	<div class="container">
		<vueSignature ref="signature" :sigOption="option" :w="'100%'" :h="'100%'" :disabled="disabled" :defaultUrl="dataUrl"></vueSignature> 
		<!-- <vueSignature ref="signature1" :sigOption="option"></vueSignature>  -->
        <div class="box">

            <button @click="save">Save</button>
            <button @click="clear">Clear</button>
            <button @click="undo">Undo</button>
            <button @click="addWaterMark">addWaterMark</button>
            <button @click="handleDisabled">disabled</button>
        </div>
	</div>
</template>

<script>
export default {
    name: "app",
    
	data() {
		return {
			option:{
                dotSize:3,
				penColor:"#000",
                backgroundColor:"rgb(255,255,255)",
                minWidth:2,
                maxWidth:4,
                minDistance: 2,
                throttle: 1,
                velocityFilterWeight: 0.6,
			},
			disabled:false,
            dataUrl:"",
            ctx:""
		};
    },
    mounted(){
        // console.log(this.$refs.signature)
        // var c = document.getElementById(this.$refs.signature.uid)
    
        // var ctx =c.getContext("2d");
        // ctx.lineWidth = 30;
 
        // context.lineWidth = 100;//线条的宽度
        // context.strokeStyle = "#333";//线条的颜色
        // context.moveTo(100,100);
        // context.lineTo(500,500);
        // context.stroke();//绘制
        // ctx.fillStyle = '#ccc';//字色
        // ctx.textBaseline = 'top';//顶部对齐
        // var fontW = ctx.measureText('签名区').width;
        // ctx.fillText('签名区',2,2);
        //  this.$refs.signature.getContext("2d");
        // this.ctx.fillText('签名区')
    },
	methods:{
		save(){
			var _this = this;
			var png = _this.$refs.signature.save()
			var jpeg = _this.$refs.signature.save('image/jpeg')
            var svg = _this.$refs.signature.save('image/svg+xml');
            this.$dialog.alert({
                title: '标题',
                message: png
                }).then(() => {
                // on close
                });
			console.log(png);
			console.log(jpeg)
			// console.log(svg)
		},
		clear(){
			var _this = this;
			_this.$refs.signature.clear();
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
		}
	}
};
</script>
<style lang='scss' scoped>
body,html{
    width:100%;
    height:100%;
}
.container{
    width:100%;
    height:100%;
    background-color: #000;
}
.box{
    position: fixed;
    top:10px;
    left:10px;
}
</style>