var Local=function (){
    //game对象
    var game;
    var timer=null;
    //时间
    var time = 0;
    //得分
    var fenshu=0;
    //键盘事件和点击事件
    var bindKeyEvent=function (){
        document.onmousedown=function (e){
            tname=e.target.className;
            if(tname=="top"){
                game.rotate();
            }
            else if(tname=="left"){
                game.left();
            }
            else if(tname=="right"){
                game.right();
            }
            else if(tname=="down"){
                game.down();
            }
            else if(tname=="fal"){
                game.fal();
            }
        }
        document.onkeydown=function (e){
            if(e.keyCode==39){//右
                game.right();
            }
            else if(e.keyCode==40){//下
                game.down();
            }
            else if(e.keyCode==37){//左
                game.left();
            }
            else if(e.keyCode==38){
                game.rotate();
            }
            else if(e.keyCode==32){//空格
                game.fal();
            }
        }
    }
//方块运动函数
    var move=function (){
        time+=0.5;
        if(time%1==0){
            document.getElementById("time").innerHTML=time+"s";
        }
        if(!game.down()){
            game.guding();
            fenshu=game.xiaohang();
            if(fenshu){
                document.getElementById("score").innerHTML=fenshu;
            }
            if(game.jieshu()){
                clearInterval(timer);
                alert("你挂了");
                return;
            }
            game.xiayige(Math.ceil(Math.random()*7-1),Math.ceil(Math.random()*4-1));
        }
    }
    //开始
    this.start=function (){
        clearInterval(timer);
        time=0;
        document.getElementById("time").innerHTML=time+"s";
        var doms={
            gameDiv:document.getElementById("game"),
            nextDiv:document.getElementById("next")
        }
        //创建game对象
        game=new Game();
        //初始化整个界面并生成第一个方块；
        game.init(doms);
        bindKeyEvent();
        timer=setInterval(move,500)
    }

}