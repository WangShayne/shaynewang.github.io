//获取计算后的图片宽度,设置高度
			var project=document.getElementsByClassName("project-a");
			var width=parseFloat(getComputedStyle(project[0]).width);
			for(var i=0;i<project.length;i++){
				project[i].style.height=width+"px";
			}