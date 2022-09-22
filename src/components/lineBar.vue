<!--  -->
<template>
 <div style="position:relative;height:20px;line-height:20px;width:150px;float:left;" @touchmove="touchMove" ref="movebox">
    <img src="../assets/img/tiao.png" mode="scaleToFill" style="width:150px;" />
    <span
        
        style="position:absolute;display:inline-block;width:30px;height:30px;top:-6px;text-align:center;"
        :style="qiu"
    >
        <span
        style="border-radius:50%;display:inline-block;width:15px;height:15px;margin-top:7px;"
        :style="scnei"
        ></span>
    </span>
</div>
</template>

<script>
export default {
    props:{
        isPortrait:[Boolean,String],
        isLandscape:[Boolean,String]
         
    },
  components: {},
  data() {
    return {
        qiu: {
            left: '43.8%'
        },
        scnei: {
            backgroundColor: '#000'
        },
    }
  },
  created() {
      
  },

  methods: {
    touchMove(e) {
        //滑动的动画
        //   console.log(this.$refs.signature)
        //   return false;
        let tops = null //150
        
        let left = this.offsetLeft(this.$refs.movebox);
        let top = this.offsetTop(this.$refs.movebox);
         console.log(left,top,this.isPortrait,this.isLandscape, e.changedTouches[0])
        if ((this.isPortrait&&!this.isLandscape)||(!this.isPortrait&&this.isLandscape)) {
            tops = e.changedTouches[0].pageX - left-15
        }else if(this.isPortrait&&this.isLandscape){
          
            tops = e.changedTouches[0].pageY- left+45
        }
        var width = 150
        var step = 7.3
        var tag = ((tops / width) * 100).toFixed(3)
        var s = Math.floor(tag / step)
        // console.log(s,step*s)
       
        if (s < 1) {
            s = 1
            // mins = 0.2
        } else if (s > 12) {
            s = 12
            
        }
        this.$emit("touchMove",s)
 
        this.$set(this.qiu,"left",step * s + '%')
         
    },
     offsetLeft(elements) {
        var left = elements.offsetLeft;
        var parent = elements.offsetParent;
        while (parent != null) {
            left += parent.offsetLeft;
            parent = parent.offsetParent;
        }

        return left;
    },
    offsetTop(elements) {
        var top = elements.offsetTop;
        var parent = elements.offsetParent;
        while (parent != null) {
        top += parent.offsetTop;
        parent = parent.offsetParent;
        }
        // console.log(top);
        return top;
    }
  }
}

</script>
<style  scoped>
</style>