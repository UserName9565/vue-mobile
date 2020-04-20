<!--  -->
<template>
        <div>
  <!--:aspectRatio ="true"  -->
            <VueDragResize v-for="(option, index) in rects"
                    :key="index"
                    :parentH="parentH"
                    
                    :isActive="true" 
                    :w="option.signWidth" 
                    :h="option.signHeight"  
                    :x="option.x"
                    :y="option.y"
                    :minw="10"
                    :minh ="10"
                    :sticks ="['tl', 'br']"
                    v-on:resizing="resize($event, index)" 
                    v-on:dragging="resize($event, index)" 
                
                    :parentLimitation="true">
                        <img
                            ref="mark" 
                            :src="imgUrl"
                        />
                        
                </VueDragResize>
        </div>
</template>

<script>
import VueDragResize from 'vue-drag-resize';
export default {
  props: {

   rects: Array,
 
   imgUrl:null ,
   parentH:Number
 
  }, 
  components: {
       VueDragResize
  },
  data() {
    return {
   
        dpiScale1 :"", 
        dpiScale2:"", 
        scale:"",
    }
  },
  created() {},
  mounted(){
  },

  methods: {
       resize(newRect,index) {
              
              var x = newRect.left;
              var y = newRect.top;
              var width = newRect.width;
              var height = newRect.height;
              var dpiScale2 = this.dpiScale2;
              var dpiScale1 = this.dpiScale1;
              var scale = this.scale;
              var xiyiH = this.parentH;
              this.rects[index].y1 = ((xiyiH-(y+height))/scale/dpiScale2).toFixed(2);
              this.rects[index].x1 = (x/scale/dpiScale1).toFixed(2);
              this.rects[index].y2 = ((xiyiH-y)/scale/dpiScale2).toFixed(2);
              this.rects[index].x2 =((x+width)/scale/dpiScale1).toFixed(2)
             //   console.log("x:"+this.rects[index].x1,"y1:"+this.rects[index].y1,"x2:"+this.rects[index].x2,"y2:"+this.rects[index].y2)
            },
    count(srcs,widths,heights){//计算dpi

        this.getImageWidth(srcs,(w,h)=>{
             
            this.scale = (widths/w).toFixed(4);
            this.dpiScale1 = w/595;//a4纸的api
            this.dpiScale2 = h/842//
            // this.parentH = heights;
            
            this.rects.forEach((re,index)=>{
                this.markSize(index)
            
            })
        })
    }, 
    markSize(index){//设置签字的长宽
           
        this.getImageWidth(this.$refs.mark[index].getAttribute("src"),(w1,h1)=>{
            this.rects[index].signWidth = Number((w1*this.scale).toFixed(2));
            this.rects[index].signHeight = Number((h1*this.scale).toFixed(2));
            
        
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
<style  scoped>
</style>