/*封装$*/
window.$=HTMLElement.prototype.$=function(selector){
    var elems=(this==window?document:this)
        .querySelectorAll(selector);
    return elems.length==0?null:elems.length==1?elems[0]:elems;
}
/*广告图片数组*/
var imgs=[
    {"i":0,"img":"images/index/banner_01.jpg"},
    {"i":1,"img":"images/index/banner_02.jpg"},
    {"i":2,"img":"images/index/banner_03.jpg"},
    {"i":3,"img":"images/index/banner_04.jpg"},
    {"i":4,"img":"images/index/banner_05.jpg"},
];
window.addEventListener("load",function(){slider.init()})
/*封装广告轮播功能*/
var slider={
	LIWIDTH:670,//保存每个li的宽度
	distance:0,//保存本次移动的总距离
	DURATION:1000,//保存本次移动的总时间
	STEPS:100,//保存本次移动的总步数
	moved:0,//保存本次移动的步数,控制动画停止
	step:0,//保存每一步的步长
	INTERVAL:0,//保存每一步的时间间隔
	timer:null,//保存当前正在播放的动画的序号,专用于停止
	WAIT:3000,//每次轮播之间的等待时间
	canAuto:true,//是否可以自动轮播
	init:function(){
		//计算INTERVAL 为DURATION/STEPS
		this.INTERVAL=this.DURATION/this.STEPS
		//读出
		this.updateView();
		//留住this在变量me中
		var me=this;
		//为id为idxs的ul元素绑定鼠标进入事件为function(e){}
		$("#idxs").addEventListener("mouseover",function(e){
			//如果获得的元素是li是
				if(e.target.nodeName=="LI"&&e.target.calssName!="hover"){
					//找到id为idxs下的class为hover的li的内容,保存在变量starti中
					var	starti=$("#idxs>.hover").innerHTML;
					//获得目标元素的内容,保存在变量endi中
					var endi=e.target.innerHTML;
					//调用me调用move方法,传入endi-starti作为参数
					me.move(endi-starti);
				}
			});
		//为id为slider的div绑定鼠标进入事件
		$("#slider").addEventListener("mouseover",function(e){
			me.canAuto=false;	
		})
		//为id为slider的div绑定鼠标进入事件
		$("#slider").addEventListener("mouseout",function(e){
			me.canAuto=true;	
		})
		//启动自动轮播
		this.autoMove();
	},
	/*自动轮播*/
	autoMove(){
		var me=this;
		//启动一次性定时器,传人任务函数move,提前绑定this,同时将n绑定为1,设定等待时间为WAIT	
		this.timer=setTimeout(function(){
				if(me.canAuto){
				me.move(1)
				}
				else{
					me.autoMove();
				}
			},this.WAIT)
		//
	},
	/*一次轮播*/
	move:function(n){//将imgs的ul左移或右移ng
		//防止动画叠加
		if(this.timer!=null){
			clearTimeout(this.timer);
			this.timer=null;
			this.moved=0;
			$("#imgs").style.left=""
		}
			//计算distance为n*LIWIDTH
			this.distance=n*this.LIWIDTH;
			//计算步长为step为distance/STEPS
			this.step=this.distance/this.STEPS;
			//如果n<0时.
			if(n<0){//右移之前,提前调整数组内容
				//从imgs数组length+n位置,删除-n个元素,保存在变量dels中
				var dels=imgs.splice(length+n,-n);
				//将dels中元素从imgs的开始位置压入
				Array.prototype.unshift.apply(imgs,dels);
				//设置id为imgs的ul的left为n*LIWIDTH
				$("#imgs").style.left=n*this.LIWIDTH+"px";
				this.updateView();//更新界面
			}
			//启动一次性定时器,设置任务函数为moveStep,提前绑定this和n,同时设置时间间隔为INTERVAL,将序号保存在timer中
			this.timer=setTimeout(this.moveStep.bind(this,n),this.INTERVAL);
		
	},
	moveStep:function(n){//让imgs的ul移动一步
		//获得当前id为imgs的ul计算后的样式的left属性,转为浮点数,保存在变量left中
		var left=parseFloat(getComputedStyle($("#imgs")).left)
		//设置id为imgs的ul的left属性值为left-step
		$("#imgs").style.left=left-this.step+"px";
		//将moved+1
		this.moved++;
		//如果moved<STEPS
		if(this.moved<this.STEPS){
			//启动一次性定时器,设置任务函数为moveStep,提前绑定this和n,同时设置时间间隔为INTERVAL,将序号保存在timer中
			this.timer=setTimeout(this.moveStep.bind(this,n),this.INTERVAL);
		}
		//否则
		else{
			//停止定时器,并设置timer为null.moved归零
			clearTimeout(this.timer);
			this.timer=null;
			this.moved=0;
			if(n>0){//只有左移结束,才需要调整数组
			//从imgs数组开头删除n个元素,保存在变量dels中
			var dels=imgs.splice(0,n);
			//dels中每个元素再拼接回imgs结尾,将结果保存回imgs
			Array.prototype.push.apply(imgs,dels);
			this.updateView();
			}
			//将id为imgs的ul的left归0000000
			$("#imgs").style.left=""
			//再次启动自动轮播
			this.autoMove();
		}
	},
	updateView:function(){//将imgs数组中的图片,更新到页面
		//找到id为imgs的ul,设置其宽度为imgs的元素个数*LIWIDTH
		$("#imgs").style.width=(imgs.length)*this.LIWIDTH+"px";
		//变量imgs数组中每个图片,同时声明空字符串strImg 和 strIdx
		for(var i=0,strImg="",strIdx="";i<imgs.length;i++){
			//在strImg中拼接:<li><img src="+当前图片对象的img属性+"></li>
			strImg+='<li><img src="'+imgs[i].img+'"></li>';
			//在strIdx中拼接:<li>+(i+1)+</li>
			strIdx+="<li>"+(i+1)+"</li>";
		}//遍历结束
		//找到id为imgs的ul,设置其内容为strImg
		$("#imgs").innerHTML=strImg;
		//找到id为idxs的ul,设置其内容为strIdx
		$("#idxs").innerHTML=strIdx;
		//找到id为idxs的ul下的所有li,设置下标和imgs数组第一个元素i属性一致的其class为"hover"
		$("#idxs>li")[imgs[0].i].className="hover";
	},
	
}
