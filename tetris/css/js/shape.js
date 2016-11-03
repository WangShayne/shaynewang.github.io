/*定义格子类型Cell*/
//定义构造函数Cell,只接受2个参数，r，c
function Cell(r,c){
  //为当前对象添加r属性，值为变量r
  //为当前对象添加c属性，值为变量c
  //为当前对象添加src属性，值为""
  this.r=r; this.c=c; this.src="";
}
/*抽象公共父类型Shape*/
//定义父类型构造函数Shape,定义参数src,cells
function Shape(src,cells){
  //为当前对象添加cells属性，值为变量cells
  this.cells=cells;
  //遍历当前对象的cells中每个cell对象，设置其src属性为当前对象的src属性
  for(var i=0;i<this.cells.length;i++){
    this.cells[i].src=src
  }
}
//在Shape类型的原型对象中，添加一个共有属性:IMGS,值为一个对象: {T:"img/T.png",O:"img/O.png"}
Shape.prototype.IMGS={
  T:"img/T.png",
  O:"img/O.png",
  I:"img/I.png",
  J:"img/J.png",
  L:"img/L.png",
  S:"img/S.png",
  Z:"img/Z.png"
}
//在Shape类型的原型对象中，添加共有方法moveDown,moveLeft,moveRight
Shape.prototype.moveDown=function(){
  //遍历当前图形的cells数组中的每个cell
  for(var i=0;i<this.cells.length;i++){
    this.cells[i].r++;//将当前cell的r+1
  }
}
Shape.prototype.moveLeft=function(){
  //遍历当前图形的cells数组中的每个cell
  for(var i=0;i<this.cells.length;i++){
    this.cells[i].c--;//将当前cell的c-1
  }
}
Shape.prototype.moveRight=function(){
  //遍历当前图形的cells数组中的每个cell
  for(var i=0;i<this.cells.length;i++){
    this.cells[i].c++;//将当前cell的c+1
  }
}
/*定义T图形的类型*/
//定义构造函数T，不需要参数
function T(){
  //借用构造函数Shape，传入参数值: this.IMGS.T,[
  Shape.call(this,this.IMGS.T,[
    new Cell(0,3),//实例化第1个cell对象，传入位置0,3,
    new Cell(0,4),//实例化第2个cell对象，传入位置0,4,
    new Cell(0,5),//实例化第3个cell对象，传入位置0,5,
    new Cell(1,4)//实例化第4个cell对象，传入位置1,4,
  ])
}
//让T类型的原型继承Shape类型的原型
Object.setPrototypeOf(T.prototype,Shape.prototype);

/*定义O图形的类型*/
//定义构造函数O，不需要参数
function O(){
  //借用构造函数Shape，传入参数值: this.IMGS.O,[
  Shape.call(this,this.IMGS.O,[
    new Cell(0,4),//实例化第1个cell对象，传入位置0,4,
    new Cell(0,5),//实例化第2个cell对象，传入位置0,5,
    new Cell(1,4),//实例化第3个cell对象，传入位置1,4,
    new Cell(1,5)//实例化第4个cell对象，传入位置1,5,
  ]);
}
//让T类型的原型继承Shape类型的原型
Object.setPrototypeOf(O.prototype,Shape.prototype);
/*定义I图形的类型*/
//定义构造函数I，不需要参数
function I(){
  //借用构造函数Shape，传入参数值: this.IMGS.O,[
  Shape.call(this,this.IMGS.I,[
    new Cell(0,3),//实例化第1个cell对象，传入位置0,4,
    new Cell(0,4),//实例化第2个cell对象，传入位置0,5,
    new Cell(0,5),//实例化第3个cell对象，传入位置1,4,
    new Cell(0,6)//实例化第4个cell对象，传入位置1,5,
  ]);
}
//让T类型的原型继承Shape类型的原型
Object.setPrototypeOf(I.prototype,Shape.prototype);