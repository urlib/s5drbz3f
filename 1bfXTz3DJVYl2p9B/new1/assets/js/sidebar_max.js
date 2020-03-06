/*
* @Author: hp
* @Date:   2019-10-29 16:09:18
* @Last Modified by:   hp
* @Last Modified time: 2019-11-26 09:30:01
*/

;+function(){
	if(typeof Object.assign != 'function'){
	  Object.defineProperty(Object, "assign", {
	    value: function assign(target, varArgs) {
	      'use strict';
	      if (target == null) {
	        throw new TypeError('Cannot convert undefined or null to object');
	      }

	      var to = Object(target);

	      for(var index = 1; index < arguments.length; index++){
	        var nextSource = arguments[index];

	        if(nextSource != null) {
	          for(var nextKey in nextSource){
	            if(Object.prototype.hasOwnProperty.call(nextSource, nextKey)){
	              to[nextKey] = nextSource[nextKey];
	            }
	          }
	        }
	      }
	      return to;
	    },
	    writable: true,
	    configurable: true
	  });
	};

	window.requestAnimation = (function(){
	    return window.requestAnimationFrame ||
	        // Older versions Chrome/Webkit
	        window.webkitRequestAnimationFrame ||
	        // Firefox < 23
	        window.mozRequestAnimationFrame ||
	        // opera
	        window.oRequestAnimationFrame ||
	        // ie
	        window.msRequestAnimationFrame ||
	        function(callback){
	            return window.setTimeout(callback, 1000 / 60);
	        };
	})()

	window.cancelAnimation = (function(){
	    return window.cancelAnimationFrame || 
	    window.mozCancelAnimationFrame || 
	    window.cancelRequestAnimationFrame || 
	    function(id){ clearTimeout(id) }
	})()		
}();


function _sidebar(options){
	//初始设置参数
	var defaults = {
		items: []
	};
	//对象扩展
	var opt = Object.assign({}, defaults, options || {});

	this.options = opt;
};
//重置原型对象
_sidebar.prototype = {
	//初始化:生成结构 绑定事件
	_init: function(){
		const doc = document;
		var div = doc.createElement("div");
		var ul = doc.createElement("ul");
		div.classList.add("sidebar-wrap");
		ul.classList.add("sidebar");

		var listNode = "";

		this.options.items.push({
			href: "javascript: void(0)",
			text: "返回顶部",
			bgImgClass: "backtop"			
		});

		listNode = this.options.items.map(function(item){
			return	'<li class="clear">'
					+ '<a href="'+ item.href +'" class="sidebar-item '+ item.bgImgClass +'" '+ (item.target ? "target="+item.target : "") +'>'
						+ '<span class="sidebar-text">'+ item.text +'</span>'
					+ '</a>'
				+ '</li>'
		});

		ul.innerHTML = listNode.join("");
		div.appendChild(ul);
		doc.body.appendChild(div);

		this.ulNode = ul;
		this.backTopNode = ul.lastElementChild.children[0];
		//执行绑定返回顶部操作
		this.scrollToTop();
		//监听窗口滚动
		window.addEventListener("scroll", this.onscroll.bind(this));
		//监听鼠标滚轮
		window.addEventListener("wheel", this.onwheel.bind(this));


		return this
	},
	onscroll: function(){
		var winScroll = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop;
	
		if(winScroll > 250){
			this.backTopNode.style.display = "block"
		}else{
			this.backTopNode.style.display = "none"
		}

		return this
	},
	onwheel: function(event){
		if(event.deltaY > 0 && this.timer !== null){
			clearInterval( this.timer );
			this.stop = false;
		}
	},
	scrollToTop: function(){
		this.timer = null;
		this.stop = false;
		var context = this;
		var base = 5;
		var speed = 0;
		var animaID = void(0);

		this.backTopNode.addEventListener("click", function(){
			//防止连击
			if(context.stop){
				return;
			}else{
				context.stop = true;
			}

			animaID = requestAnimation(onclick)
		})

		function onclick(){

			context.timer = setInterval(function(){
				//不断的获取页面滚动高度来做缓速运动
				var winScroll = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop;
				speed = Math.floor( ( 0 - winScroll ) / base );
				if(winScroll <= 0 ){
					clearInterval( context.timer );
					cancelAnimation( animaID );
					context.stop = false;
					return;
				}				
				// document.body.scrollTop = winScroll + speed;
				window.scrollTo(0, winScroll + speed)
			}, 100)			
		}

		return this
	}
};


Object.defineProperty(_sidebar.prototype, 'constructor',{
	value: _sidebar,
    writable: true,
    configurable: true	
});

function Sidebar(options){
	return new _sidebar(options)._init();
}