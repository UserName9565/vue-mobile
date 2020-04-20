<template>
  <div class="wihi">
	<div class="move-box">
		<div class="step-img" ref="step">
			<img @load="count()" :src="srcs" ref="imags" />
      <resize v-if="tagtrue" ref="rize" :rects='rects' :parentH='parentH' :imgUrl='imgUrl'></resize>
      <!-- <img :src="srcs2" ref="imags2" /> -->
    
		</div>
	</div>
</div>
      
        
    
</template>

<script>
    
    import Resize from './vuedragresize/resize'
    export default {
        name: 'app',

        components: {
           Resize
        },

        data() {
            return {
              tagtrue:false,
              rects:[{
                x:40,
                y:40,
                signWidth:40,
                signHeight:40
                
              }],
              parentH:null,
              srcs:require('../../../static/test-000.png'),
              srcs2:require('../../../static/test-002.png'),
              imgUrl:require('../../../static/sign6.png'),
            }
        },
        created(){
         
          
        },
         mounted(){
            // this.count();
        },  


        methods: {
           
            count(){
              var widths = this.$refs.imags.width;
              var heights = this.$refs.imags.height  //.height;
              this.parentH = heights;
              this.tagtrue = true;
              this.$nextTick(() => {
                this.$refs.rize.count(this.srcs,widths)
              })  
              
            }, 
            
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
    width:100%;
    height: auto;
		img{
			width:100%;
			// height:100%;
		}
	}
}
.vdr {
 
  img{
    width:100%;
    height:100%;
  }
}
.vdr-stick{
  border: 1px solid #2692da !important;
  border-radius: 100%;
}
</style>