<template>
<div class="wihi">
	<div class="move-box">
		<div class="step-img wihi">
			<img :srcs="" ref="imags" />
		</div>
		<Moveable
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
  data: () => ({
	srcs:'../../../static/test-000.png',
    moveable: {
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
  }),
  mounted(){
	//   this.count();
	  this.$refs.moveable.className = 'move-box'
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

			var widths = this.$refs.imags.width();
			console.log(widths)
			scale = widths/w;
			dpiScale1 = w/595;//a4纸的api
			dpiScale2 = h/842//
			getImageWidth(this.$refs.mark.attr("src"),function(w1,h1){
				//  signScale = 
				signWidth =  w1*scale;
				signHeight = h1*scale;
				this.$refs.mark.css({
					width:signWidth,
					heigth:signHeight,
				})
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
}
</style>