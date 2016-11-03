//封装$:接受一个字符串格式的选择器,返回指定元素
//HTMLElement.prototype是所有HTML元素的父对象
window.$=HTMLElement.prototype.$=function(selector){
	//$("".app_jd) this->window
	//div.$(".app") this.div
	var r = (this==window?document:this).querySelectorAll(selector);
	return r.length==0?null:
			  r.length==1?r[0]:
									r;
}
//$("".app_jd) 在整个页面查找
//div.$(".app") 在DIV下查找
window.onload=function(){
	/*顶部菜单展开*/
	//找到class为app_jd的元素,为其绑定鼠标进入事件
	$(".app_jd").addEventListener("mouseover",topShow);
	//找到class为app_jd的元素,为其绑定鼠标移除事件topHide
	$(".app_jd").addEventListener("mouseout",topHide);
	//找到class为service的元素,为其绑定鼠标移除事件topShow
	$(".service").addEventListener("mouseover",topShow);
	//找到class为service的元素,为其绑定鼠标移除事件topHide
	$(".service").addEventListener("mouseout",topHide);
	
	function topShow(){
		//在this下找id属性以_items结尾的元素,设置其display为block
		this.$("[id$='_items']").style.display="block";
		//在this下找b元素的下一个兄弟a,设置其class为hover
		this.$("b+a").className="hover";
	}
	function topHide(){
		//在this下找id属性以_items结尾的元素,设置其display为none
		this.$("[id$='_items']").style.display="none";
			//在this下找b元素的下一个兄弟a,清除其class
			this.$("b+a").className="";
	}

	/*全部商品分类*/

		//为id为category的元素绑定鼠标进入时间为showAll
		$("#category").addEventListener("mouseover",showAll);
		//为id为category的元素绑定鼠标移除时间为hideAll
		$("#category").addEventListener("mouseout",hideAll);
		//为id为cate_box的直接子元素li,保存在变量lis中
		var lis=$("#cate_box>li");
		//遍历lis中每个li
		for(var i=0;i<lis.length;i++){
			//为当前li绑定鼠标移入事件为showSub
			lis[i].addEventListener("mouseover",showSub);
			//为当前li绑定鼠标移出事件为hideSub
			lis[i].addEventListener("mouseout",hideSub);
		}
	/*全部商品分类*/
	function showAll(){
		//找到id为cate_box的元素,设置其显示;
		$("#cate_box").style.display="block";
	}
	function hideAll(){
		//找到id为cate_box的元素,设置其隐藏
		$("#cate_box").style.display="none";
	}
	function showSub(){//this-->li
		//找到当前li下找class为sub_cate_box的元素,设置为显示
		this.$(".sub_cate_box").style.display="block";
		//在当前li下找h3元素,设置其class为hover
		this.$("h3").style.className="hover";
	}
	function hideSub(){
		//找到当前li下找class为sub_cate_box的元素,设置为隐藏	
		this.$(".sub_cate_box").style.display="block";
		//在当前li下找h3元素,清楚其class
		this.$("h3").style.className="";
	}
	/*标签页*/
	//找到id为product_detail下的main_tabs的元素为其绑定单击事件为
	$("#product_detail>.main_tabs").addEventListener("click",showTab)
	
	/*标签*/
	function showTab(e){
		//获得目标元素,保存在变量target中
		var target=e.target;
		//如果target是a
		if(target.nodeName="A"){
			//让target等于target的父节点
			target=target.parentNode;
		}
		//如果target是li,且target的class不是current
		if(target.nodeName=="LI"&&target.className!="current"){
			//在当前ul下找class为current的li,清除其class
			this.$(".main_tabs>.current").className="";
			//设置target的class为current
			target.className="current";

			//找到id为product_detail下的所有id属性以product_开头的直接子元素.保存在变量containers中
			var containers=$("#product_detail>[id^='product_']");
			//遍历container中每个容器对象
			for(var i=0;i<containers.length;i++){
				//设置当前容器为隐藏
				containers[i].style.display="none";
			}//遍历结束
			//获得target的自定义属性tar,保存在变量tar中
			var tar=target.dataset.tar;
				//如果tar不是"comment"
				(tar!="comment")&&($("#product_"+tar).style.display="block");
					//找到id为product_+tar的元素,设置其显示
		}
	}
	
	/*放大镜*/
	var zoom={
		LIWIDTH:0,//保存每个li的宽度
		OFFSET:0,//保存ul的起始left值
		count:0,//保存ul下li的个数
		moved:0,//保存左移的li个数
		MAX:0,//保存mask可用的最大top和left
		MSIZE:0,//保存mask自身的宽高.
		init:function(){
			//找到id为icon_list下的第一个li,获取其计算后的样式的宽度,转为浮点数.保存在LIWIDTH属性中
			this.LIWIDTH=parseFloat(getComputedStyle($("#icon_list>li:first-child")).width);
			//找到id为icon_list的元素,获取其计算后的样式的left属性,转为浮点数.保存在OFFSET中
			this.OFFSET=parseFloat(getComputedStyle($("#icon_list")).left);
			//找到id为icon_list下的所有li,获得其个数,保存在count属性中
			this.count=$("#icon_list>li").length;
			//找到id为preview下的class为forward的直接子元素a,为其绑定click事件为moveLeft,同时提前绑定this
			$("#preview>h1>.forward").addEventListener("click",this.moveLeft.bind(this));
			//找到id为preview下的h1的直接子元素a,为其绑定click事件为moveRight,同时提前绑定this
			$("#preview>h1>a:first-child").addEventListener("click",this.moveRight.bind(this));
			//为id为icon_lsit的ul绑定鼠标进入时间为changeImg
			$("#icon_list").addEventListener("mouseover",this.changeImg);
			//为superMask绑定鼠标进入事件为showMask
			$("#superMask").addEventListener("mouseover",this.showMask);
			//为superMask绑定鼠标退出事件为hideMask
			$("#superMask").addEventListener("mouseout",this.hideMask);
			//为superMask绑定鼠标移动事件为moveMask
			$("#superMask").addEventListener("mousemove",this.moveMask.bind(this));
			//获得mask计算后的样式的高,转为浮点数.将结果保存在MSIZE中
			this.MSIZE=parseFloat(getComputedStyle($("#mask")).height);
			//获得superMask计算后的样式的高,转为浮点数-mask MSIZE,转为浮点数,保存在MAX中
			this.MAX=parseFloat(getComputedStyle($("#superMask")).height)-this.MSIZE;
		},
		moveLeft:function(e){ //this-->a forward
			//如果目标元素的class中找不到_disabled
			if(e.target.className.indexOf("_disabled")==-1){
				//将moved+1
				this.moved++;
				//找到id为icon_list的ul,直接设置其left为-1*moved*LIWIDTH+OFFSET
				$("#icon_list").style.left=-1*this.moved*this.LIWIDTH+this.OFFSET+"px";
				//检查a的状态
				this.checkA();
			}
		},
		checkA:function(){//检测并修改a的状态
			//如果count-moved==5
			if(this.count-this.moved==5){
				//设置id为preview的下的class为forward的直接子元素a的class属性后拼接_disabled
				$("#preview>h1>.forward").className+="_disabled";
			}
			//否则 如果move==0
			else if(this.moved==0){
				//在id为preview下的class为backward的直接子元素a的class属性后拼接_disabled
				$("#preview>h1>.backward").className+="_disabled";
			}
			else{//否则
				//找到id为preview下的h1下的第一个a,设置其class为backward
				$("#preview>h1>a:first-child").className="backward";
				//找到id为preview下的h1下的第二个a,设置其class为forward
				$("#preview>h1>a:first-child+a").className="forward";
			}
		},
		 moveRight:function(e){
			//如果目标元素的class中找不到_disabled
			if(e.target.className.indexOf("_disabled")==-1){
				//将moved-1
				this.moved--;
				//找到id为icon_list的ul,直接设置其left为-1*moved*LIWIDTH+OFFSET
				$("#icon_list").style.left=-1*this.moved*this.LIWIDTH+this.OFFSET+"px";
				//检查a的状态
				this.checkA();
			}
		},
		/*图片切换*/
		changeImg:function(e){//根据小图片,更换大图片
			//如果获得的元素是img
			if(e.target.nodeName=="IMG"){
				//获得目标元素的src属性,保存在变量src中
				var src=e.target.src;
				//查找src中最后一个i的位置,保存在变量i中
				var i=src.lastIndexOf(".");
				//将id为mImg元素的src属性设置为
				$("#mImg").src=src.slice(0,i)+"-m"+src.slice(i);
					//截取src中0~i位置的字符串+"-m"+截取src中i到结尾的剩余内容
			}
		},
		moveMask:function(e){	//让id为mask的元素跟随移动
			//获得鼠标相当于当前元素的X坐标,保存在x中
			var x=e.offsetX,y=e.offsetY;
			//获得鼠标相当于当前元素的y坐标,保存在y中
			//用x-MSIZE/2,保存在变量l中
			var l=x-this.MSIZE/2;
			var t=y-this.MSIZE/2;
			//用y-MSIZE/2,保存在变量t中
			//如果l<0,就改为0.否则如果l>MAX,就改为MAX,否则不变
			if(l<0){l=0}else if(l>this.MAX){l=this.MAX};
			//如果t<0,就改为0.否则如果t>MAX,就改为MAX,否则不变
			if(t<0){t=0}else if(t>this.MAX){t=this.MAX};
			//设置mask的left为l
			$("#mask").style.left=l+"px";
			//设置mask的top为t
			$("#mask").style.top=t+"px";
			//设置largeDiv的backgroundPosition为上移16/7*t,左移16/7*l
			$("#largeDiv").style.backgroundPosition=(-(16/7*l))+"px"+" "+-(16/7*t)+"px";
		},
		showMask:function(){
			//找到id为mask的元素将其显示
			$("#mask").style.display="block";
			$("#largeDiv").style.display="block";
			//获得mImg的src,保存在变量src中
			var src=$("#mImg").src;
			//获得最后一个"."的位置,保存在变量i中
			var i=src.lastIndexOf(".");
			//设置largeDiv的背景图片为:backgroundImage
			$("#largeDiv").style.backgroundImage="url("+src.slice(0,i-1)+"l"+src.slice(i)+")";
					//src的0~   i-1的子字符串中+l+src的i到结尾的剩余字符
		},
		hideMask:function(){
			//找到id为mask的元素将其隐藏
			$("#mask").style.display="none";
			$("#largeDiv").style.display="none";	
		},
	}

	zoom.init();


}