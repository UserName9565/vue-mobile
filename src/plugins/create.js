/*!
* @license CreateJS-View
* @desc: 基于CreateJS框架的游戏横屏适配解决方案
* @author: https://github.com/Tingglelaoo
*
* Distributed under the terms of the MIT license.
* http://www.opensource.org/licenses/mit-license.html
*
* This notice shall be included in all copies or substantial portions of the Software.
*/
 var createjs = function(){
     
 }
//  createjs.promote=function (a, b) { "use strict"; var c = a.prototype, d = Object.getPrototypeOf && Object.getPrototypeOf(c) || c.__proto__; if (d) { c[(b += "_") + "constructor"] = d.constructor; for (var e in d) c.hasOwnProperty(e) && "function" == typeof d[e] && (c[b + e] = d[e]) } return a }
//  createjs.Stage = function(a){
//     createjs.promote(a, "FILL") 
//  }
createjs.view = {
    adjustPositionArr: [],
    adjustFullSizeArr: [],
    CONTAIN: function(){
        var self = this;
        self.radioX = self.radioY = Math.min((self.winWidth / self.designWidth) , (self.winHeight / self.designHeight));
        self.canvasWidth = self.stageWidth = self.designWidth;
        self.canvasHeight = self.stageHeight = self.designHeight;
    },
    COVER: function(){
        var self = this;
        self.radioX = self.radioY = Math.max((self.winWidth / self.designWidth) , (self.winHeight / self.designHeight));
        self.canvasWidth = self.stageWidth = self.designWidth;
        self.canvasHeight = self.stageHeight = self.designHeight;
    },
    FILL: function(){
        var self = this;
        self.radioX = (self.winWidth / self.designWidth);
        self.radioY = (self.winHeight / self.designHeight);
        self.canvasWidth = self.stageWidth = self.designWidth;
        self.canvasHeight = self.stageHeight = self.designHeight;
    },
    FIXED_HEIGHT: function(){
        var self = this;
        self.radioX = self.radioY= self.winHeight / self.designHeight;
        self.canvasWidth = self.stageWidth = self.winWidth / self.radioX;
        self.canvasHeight = self.stageHeight = self.designHeight;
    },
    FIXED_WIDTH: function(){
        var self = this;
        self.radioX = self.radioY = self.winWidth / self.designWidth;
        self.canvasWidth = self.stageWidth = self.designWidth;
        self.canvasHeight = self.stageHeight =  self.winHeight / self.radioY;
    },
    _setPolicy: function(mode){
        var self = this;
        self._sizePolicy = mode;
    },
    _setSize: function(){
        var self = this;

        var width = document.documentElement.clientWidth,
		height =  document.documentElement.clientHeight;
            console.log(width)
        self.winWidth = Math.max(width, height); // 屏幕窗口宽度
        self.winHeight = Math.min(width, height); // 屏幕窗口高度
        self.isPortrait = width >= height;
        
        
        var style = "position: absolute;top:50%;left:50%;"
        style += "-webkit-transform-origin: 0 0;";
        
        self._sizePolicy();
        var style2 = ''
        var scaleX,
            scaleY;
        if(self.isPortrait) {
            // 舞台旋转
            style2 += "width:" + width + "px;";  // 注意旋转后的宽高切换
            style2 += "height:" + height + "px;";
            style2 += "-webkit-transform: rotate(0); transform: rotate(0);";
            style2 += "-webkit-transform-origin: 0 0;";
            style2 += "transform-origin: 0 0;";
            self.stage.x = self.canvasHeight;
            self.stage.rotation = 90;
            // 缩放比例
            scaleX = self.radioY;
            scaleY = self.radioX;
            // canvas宽高重渲染
            self.canvasWidth = self.stageHeight;
            self.canvasHeight = self.stageWidth;
        }else {
            style2 += "width:" + height + "px;";
            style2 += "height:" + width + "px;";
            style2 += "-webkit-transform: rotate(90deg); transform: rotate(90deg);";
            // 注意旋转中点的处理
            style2 += "-webkit-transform-origin: " + width / 2 + "px " + width / 2 + "px;";
            style2 += "transform-origin: " + width / 2 + "px " + width / 2 + "px;";
            self.stage.x = 0;
            self.stage.rotation = 0;

            scaleX =self.radioX;
            scaleY = self.radioY;
        }
        var rate = ''
        if(self.stage.rotation==0){
            rate = -90
        }else{
            rate = 0;
        }
        self.container.style.cssText +=style2
        
        self.stage.canvas.setAttribute("width", self.canvasWidth);
        self.stage.canvas.setAttribute("height", self.canvasHeight);
        style += "-webkit-transform: rotate(" +(-rate)+  "deg) translate(-50%,-50%);";
        self.stage.canvas.style.cssText += style;

        self._adjustFullSize();

        self.halfCutWidth = (self.stageWidth * scaleX - self.winWidth) / 2 / scaleX;
        self.halfCutHeight = (self.stageHeight * scaleY - self.winHeight) / 2 / scaleY;
        // self._adjustPosition();
    },
    _adjustFullSize: function(){
        var self = this;
        self.adjustFullSizeArr.map(function(item, index, arr){
            console.log(item,111)
            item.drawRect(0, 0, self.stageWidth, self.stageHeight);
        });
    },
    _adjustPosition: function(item){
        var self = this;
        self.adjustPositionArr.map(function(item, index, arr){
            // 计算溢出高度、宽度
            var cutSizeX = self.halfCutWidth >= 0 && self._sizePolicy.name != "FILL" ? self.halfCutWidth : 0,
                cutSizeY = self.halfCutHeight >= 0 && self._sizePolicy.name != "FILL" ? self.halfCutHeight : 0;
            (typeof item.top == "number") && (item.y = item.top + cutSizeY);
            (typeof item.left == "number") && (item.x =  item.left + cutSizeX);
            (typeof item.bottom == "number") && (item.y = self.stageHeight - item.getBounds().height - item.bottom - cutSizeY);
            (typeof item.right == "number") && (item.x = self.stageWidth - item.getBounds().width - item.right  - cutSizeX);
        });
    },
    /**
     * 设置缩放适配模式
     * @param stage {obj} 舞台对象
     * @param designWidth {number} 设计稿宽度
     * @param designHeight {number} 设计稿高度
     * @param mode {obj} 内置五种缩放适配模式之一，如createjs.view.CONTAIN
     * @param resizeCallback resize回调函数
     */
    setViewMode: function(stage, designWidth, designHeight, mode, resizeCallback){
        var self = this;
        self.stage = stage;
        self.container = document.getElementById("J_wrapper");
        self.designWidth = designWidth; // 设计稿宽度
        self.designHeight = designHeight; // 设计稿高度

        self._setPolicy(mode);
        self._setSize();

        var resizeHandler = function(){
            self._setSize();
            resizeCallback && resizeCallback();
        }
        window.onresize = resizeHandler;
    },
    /**
     * 重绘制：对依据舞台大小为标准的全屏元素进行大小在切换横屏时进行重绘制
     * @param item {displayObject} 需要重绘制的对象
     */
    adjustFullSize: function(item){
        if(!item) {return;}
        var self = this;
        for(var i in arguments) {
            self.adjustFullSizeArr.push(arguments[i]);
        }
        self._adjustFullSize();
    },
    /**
     * 重定位：对舞台贴边元素进行位置的重定位
     * @param item {displayObject} 需要重定位的对象
     */
    adjustPosition: function(item){
        if(!item) {return;}
        var self = this;
        for(var i in arguments) {
            self.adjustPositionArr.push(arguments[i]);
        }
        self._adjustPosition();
    }
   
 }
 window.createjs = createjs;