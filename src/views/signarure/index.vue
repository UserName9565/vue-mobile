<template>
<div class="wihi">
	<div class="move-box">
		<div class="step-img wihi">
			<img :src="srcs" ref="imags" />
		</div>
		<Moveable
      v-show="shows"
			ref="moveable"
			class="moveable"
			v-bind="moveable"
			@drag="handleDrag"
			@resize="handleResize"
			@scale="handleScale"
			@rotate="handleRotate"
			@warp="handleWarp"
			@pinch="handlePinch"
			dragArea:
		>
			<img
				ref="mark" 
				src="../../../static/sign6.png"
			/>
		</Moveable>
	</div>
</div>
</template>
<script>
import Moveable from 'vue-moveable';

export default {
  name: 'app',
  components: {
    Moveable,
  },
  data(){
   return  {
     shows:false,
    srcs:require('../../../static/test-000.png'),
    signWidth:"", 
    signHeight :"", 
    dpiScale1 :"", 
    dpiScale2:"", 
    scale:"",
    moveable: {
      baseDirection:[10, 10],
      draggable: true,
      throttleDrag: 0,
      resizable: false,
      throttleResize: 1,
      keepRatio: false,
      scalable: true,
      throttleScale: 0,
      rotatable: false,
      throttleRotate: 0,
      pinchable: true, // ["draggable", "resizable", "scalable", "rotatable"]
	  origin: false,
	  className:'move-box',
	  innerBounds : { left: 500, top: 500, width: 100, height: 100},
	  bounds : { left: 0, right: 1000, top: 0, bottom: 1000}
    }
  }
  },
  mounted(){
	  this.count();
 
  },
  methods: {
    handleDrag({ target, transform }) {
	//   console.log('onDrag left, top', target);
	//   console.log(this.$refs.moveable.getRect())
      target.style.transform = transform;
    },
    handleResize({
      target, width, height, delta,
    }) {
      console.log('onResize', width, height);
      delta[0] && (target.style.width = `${width}px`);
      delta[1] && (target.style.height = `${height}px`);
    },
    handleScale({ target, transform, scale }) {
      console.log('onScale scale', scale);
      target.style.transform = transform;
    },
    handleRotate({ target, dist, transform }) {
      console.log('onRotate', dist);
      target.style.transform = transform;
    },
    handleWarp({ target, transform }) {
      console.log('onWarp', transform);
      target.style.transform = transform;
    },
    handlePinch({ target }) {
      console.log('onPinch', target);
    },
    count(){
      
      this.getImageWidth(this.srcs,(w,h)=>{

        var widths = this.$refs.imags.width;
        console.log(widths)
        this.scale = widths/w;
        this.dpiScale1 = w/595;//a4纸的api
        this.dpiScale2 = h/842//
        this.getImageWidth(this.$refs.mark.getAttribute("src"),(w1,h1)=>{
        //  signScale = 
          this.signWidth =  w1*this.scale;
          this.signHeight = h1*this.scale;
          console.log(this.signWidth,this.signHeight)
          var moveable = document.getElementsByClassName("moveable");
          for(var i = 0;i<moveable.length;i++){
             
            moveable[i].style.width = this.signWidth+"px";
            moveable[i].style.heiight = this.signHeight+"px";
          }
          this.shows = true;
          // moveable.forEach((i,o)=>{
          //   console.log(o)
          // })
          // this.$refs.moveable.container.style.width = this.signWidth;
          // this.$refs.moveable.container.style.heiight = this.signHeight;
          // console.log(this.$refs.moveable)
          
          // ({
          //   width:this.signWidth,
          //   heigth:this.signHeight,
          // })
        })
      })
    }, 
    getImageWidth(url, callback) {
      
      var img = new Image();
      img.src = url;
    
      // 如果图片被缓存，则直接返回缓存数据
      if(img.complete) {
        callback(img.width, img.height);
      } else {
        // 完全加载完毕的事件
        img.onload = function() {
          callback(img.width, img.height);
        }
      }
    
    }
  }
}
</script>
 <style lang="scss">
.wihi{
	height:100%;
	width:100%;
}
.move-box{
	width:100%;
	height:100%;
	.step-img{

		img{
			width:100%;
			height:100%;
		}
	}
}
.moveable{
	position: absolute;
  img{
    width:100%;
    height:100%;
  }
}
</style>