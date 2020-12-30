<template>
   <div class="sign-wrapper">
     <div 
      class="canvas-box" 
      id="canvasBig"
      :style="getHorizontalStyle">
      <canvas></canvas>
      <!-- 画布操作按钮 -->
      <div class="btn_box">
        <span class="btn clear-btn"   
          @touchstart.stop="clear"
          @mousedown.stop="clear"
        >清空
        </span>
        <span class="btn commit-btn"  
          @touchstart.stop="submitPNG"
          @mousedown.stop="submitPNG"
          >提交
        </span>
      </div>
     </div>
   </div>
</template>
<script>

 
// 请求接口
import {qrSave} from '@/api/sign.js'
import { Dialog,Toast } from 'vant';
// import VConsole from 'vconsole/dist/vconsole.min.js' //引入vconsole
// let vConsole = new VConsole() // 初始化
import Draw from "@/utils/draw"; 

// 上传图片到阿里云
// let OSS = require('ali-oss')
// let client = new OSS({
//   region: 'oss-cn-beijing',
//   accessKeyId: 'XXXXX',
//   accessKeySecret: 'XXXXXXXXXXXXX',
//   bucket: 'vueupdate'
// })
 
 
export default {
  name: '',
  components: {
  },
  data() {
    return {
      viewScanCodeUrl: '',  // 签名地址
      orderListId: '',      //订单id
      degree: 90,           //旋转度数
    }
  },
  mounted() {
    console.log('========进入挂载==== mounted')
    this.canvasBox = document.getElementById('canvasBig');
    this.initCanvas();
  },
  computed: {
    //计算画布大小
    getHorizontalStyle() {
      const d = document;
      const w = window.innerWidth || d.documentElement.clientWidth || d.body.clientWidth;
      const h = window.innerHeight || d.documentElement.clientHeight || d.body.clientHeight;
      let length = (h - w) / 2;
      let width = w;
      let height = h;

      switch (this.degree) {
        case -90:
          length = -length;
        case 90:
          width = h;
          height = w;
          break;
        default:
          length = 0;
      }

      if (this.canvasBox) {
        this.canvasBox.removeChild(document.querySelector('canvas'));
        this.canvasBox.appendChild(document.createElement('canvas'));
        console.log('this.canvasBox333333:',this.canvasBox)
        setTimeout(() => {
          this.initCanvas();
        }, 200);
      }
      return {
        transform: `rotate(${this.degree}deg) translate(${length}px,${length}px)`,
        width: `${width}px`,
        height: `${height}px`,
        transformOrigin: 'center center',
      };
    },
  },
	  methods: {
    //初始化签名画布
    initCanvas() {
      let canvas = document.querySelector('canvas');
      this.draw = new Draw(canvas, -this.degree);
      console.log('初始化画布11111canvas-------',canvas)
      console.log('this.draw111111111',this.draw)
    },
    //下载图片
    download() {
     this.draw.downloadPNGImage(this.draw.getPNGImage());
    },
    //清空画布
    clear() {
      this.draw.clear();
    },
    //上传签名
    async submitPNG() {
      console.log('点击进行提交1111：',this.draw.isDraw);
      if (!this.draw.isDraw) {
        Toast('请先进行签署');
        return
      }
      this.signImage = this.draw.getPNGImage();
      // 返回blob文件对象
      const dataURLtoFile = (dataurl, filename) => {
        const arr = dataurl.split(',');
        const mime = arr[0].match(/:(.*?);/)[1];
        const bstr = atob(arr[1]);
        let n = bstr.length;
        const u8arr = new Uint8Array(n);
        while (n--) {
          u8arr[n] = bstr.charCodeAt(n);
        }
        return new Blob([u8arr], { type: mime });
      };
      //上传base64
      const uploadBase64Img = async () => {
        const filename = `${new Date().getTime()}img.png`;
        const imgfile = dataURLtoFile(this.signImage, filename);
        const {res:{requestUrls:[imgUrl]}} = await client.multipartUpload(`${new Date().getTime()}img.png`, imgfile);
        return imgUrl
      }
      const imgUrl = await uploadBase64Img();
      this.viewScanCodeUrl = imgUrl;    //签名地址
      console.log('上传的签名地址：',this.viewScanCodeUrl);
      this.uploadPhoto(); //上传图片

    },
    //提交签名
    uploadPhoto() {
      // let uploadData = {
      //   orderViewId: this.orderListId,
      //   autographPhoto: this.viewScanCodeUrl
      // }
      console.log('上传图片111111--uploadPhoto')
      let _that = this
      console.log('uploadData====点击提交上传的图片')
      // 调取提交
      var apiUrl = `${base.Microservice}/cloud/consultation/api/v1/consultation/report/upLoadAutographPhoto`;
      axios.post(apiUrl, qs.stringify({
        orderViewId: this.orderListId,
        autographPhoto: this.viewScanCodeUrl
      }), {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
        }
      }).then(res => {
        console.log('headers====请求成功--上传签名成功',res)
        _that.$router.push({
          path: "/signSuccess",
          query: {
            id: _that.orderListId, //订单id
          }
        })
       }).catch(err => {
        console.log('请求失败=========',err)
        return Toast('提交失败，请重新提交');
       }
      )
    }
  },
  created() {
    this.orderListId = this.$route.query.id
    console.log('this.$route.query.id',this.$route.query.id)
    //console.log('进入签名created=====横屏竖屏',window.orientation,this.orderListId)
    //判断手机横竖屏状态：   
    //window.addEventListener("onorientationchange" in window ? "orientationchange" : "resize", function() {   
     // if (window.orientation === 180 || window.orientation === 0) {    
        //console.log('竖屏状态！')
     //}    
      //if (window.orientation === 90 || window.orientation === -90 ){    
        //console.log('横屏状态！')
      //}     
    //}, false);  
  }
}
</script>
<style lang="scss" scoped>
.sign-wrapper {
  height: 100%;
  width: 100%;
  background: #fff;
  //手写签名 canvas
  .canvas-box {
    height: 100%;
    display: flex;
  }
}
canvas {
  flex: 1;
  // cursor: crosshair;
}
// 操作按钮
.btn {
  width: 1.8rem;
  height: .45rem;
  position: absolute;
  right: .36rem;
  bottom: .23rem;
  display: inline-block;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: .025rem;
  color: #fff;
  font: .16rem '苹方-简';
  z-index: 999;
  // width: 8.8rem;
  // height: 3.5rem;
  // position: absolute;
  // right: 1.875rem;
  // bottom: 1.25rem;
  border: none
}
.clear-btn {
  background: #999999;
  right: 1.6rem;
}
.commit-btn {
  background: #3978E1
} 
</style>