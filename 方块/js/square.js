var square=function (){
    //方块的数据矩阵
    this.date=[
        [0,0,0,0],
        [0,0,0,0],
        [0,0,0,0],
        [0,0,0,0]
    ]
    //原点
    this.origin={
        x:0,
        y:0
    }
    //方块的形态
    this.fangxiang=0;
}
//原型方法，检测能否旋转
square.prototype.canRotate=function (jiancehefa){
    var t=this.fangxiang+1;
    if(t==4){
        t=0;
    }
    var test=[
        [0,0,0,0],
        [0,0,0,0],
        [0,0,0,0],
        [0,0,0,0]
    ];
    for(i=0;i<this.date.length;i++){
        for(j=0;j<this.date[0].length;j++){
            test[i][j]=this.rotates[t][i][j];
        }
    }
    return jiancehefa(this.origin,test);
}
//原型方法，检测能否下降
square.prototype.canDown=function (jiancehefa){
    var test={};
    test.x=this.origin.x+1;
    test.y=this.origin.y;
    return jiancehefa(test,this.date);
}
//原型方法，检测能否左移
square.prototype.canLeft=function (jiancehefa){
    var test={};
    test.x=this.origin.x;
    test.y=this.origin.y-1;
    return jiancehefa(test,this.date);
}
//原型方法，检测能否右移
square.prototype.canRight=function (jiancehefa){
    var test={};
    test.x=this.origin.x;
    test.y=this.origin.y+1;
    return jiancehefa(test,this.date);
}//原型方法，下降
square.prototype.down=function (){
    this.origin.x+=1;
}//原型方法，左移
square.prototype.left=function (){
    this.origin.y-=1;
}//原型方法，右移
square.prototype.right=function (){
    this.origin.y+=1;
}//原型方法，旋转
square.prototype.rotate=function (num){
    if(!num) num=1;
    this.fangxiang=(this.fangxiang+num)%4;
    if(this.fangxiang==4){
        this.fangxiang=0;
    }
    for(i=0;i<this.date.length;i++){
        for(j=0;j<this.date[0].length;j++){
            this.date[i][j]=this.rotates[this.fangxiang][i][j];
        }
    }
}