var Game=function (){
    //dom
    var gameDiv;
    //dom
    var nextDiv;
    //得分
    var line=0;
    //矩阵
    var gameDate=[
        [0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0],
    ]
    //当前方块
    var cur;
    //下一个方块
    var next;
    //以二维矩阵的形式保存每个div小格
    var nextDivs=[];
    //以二维矩阵的形式保存每个div小格
    var gameDivs=[];
    //初始化dom，矩阵，div矩阵
    var initDiv=function (container,date,divs){
        for(i=0;i<date.length;i++){
            var div=[];
            for(var j=0;j<date[0].length;j++){
                var newNode=document.createElement("div");
                newNode.className="none";
                newNode.style.top=(i*20)+"px";
                newNode.style.left=(j*20)+"px";
                container.appendChild(newNode);
                div.push(newNode);
            }
            divs.push(div);
        }
    }
    //刷新矩阵中的数据并渲染dom
    var refreshDiv=function (date,divs){
        for(i=0;i<date.length;i++){
            for(j=0;j<date[0].length;j++){
                if(date[i][j]==0){
                    divs[i][j].className="none"
                }
                else if(date[i][j]==1){
                    divs[i][j].className="done"
                }
                else if(date[i][j]==2){
                    divs[i][j].className="current"
                }
            }
        }
    }
    //判断方块的是否能移动
    var jiance=function (pos,x,y){
        if(pos.x+x<0){
            return false;
        }
        else if(pos.x+x>=gameDate.length){
            return false;
        }
        else if(pos.y+y<0){
            return false;
        }
        else if(pos.y+y>=gameDate[0].length){
            return false;
        }
        else if(gameDate[pos.x+x][pos.y+y]==1){
            return false;
        }
        else{
            return true;
        }
    }
    //判断方块将要做的运动是否合法
    var jiancehefa=function (pos,date){
        for(i=0;i<date.length;i++){
            for(j=0;j<date[0].length;j++){
                if(date[i][j]!=0){//只检测不是0的部分。
                    if(!jiance(pos,i,j)){
                        return false;
                    }
                }
            }
        }
        return true;
    }
    //dom刷新为0
    var clearDate=function (){
        for(i=0;i<cur.date.length;i++){
            for(j=0;j<cur.date[0].length;j++){
                if(jiance(cur.origin,i,j)){
                    gameDate[cur.origin.x+i][cur.origin.y+j]=0;
                }
            }
        }
    }
    //将方块的值写入dom中
    var setDate=function (){
        for(i=0;i<cur.date.length;i++){
            for(j=0;j<cur.date.length;j++){
                if(jiance(cur.origin,i,j)){//这里做检测，就是让那些已经出格的方块不考虑了。
                    gameDate[i+cur.origin.x][j+cur.origin.y]=cur.date[i][j];
                }
            }
        }
    }
    //下落
    this.down=function (){
        if(cur.canDown(jiancehefa)){
            clearDate();
            cur.down();
            setDate();
            refreshDiv(gameDate,gameDivs);
            return true;
        }
        else
            return false;
    }
    //左移
    this.left=function (){
        if(cur.canLeft(jiancehefa)){
            clearDate();
            cur.left();
            setDate();
            refreshDiv(gameDate,gameDivs);
        }
    }
    //右移
    this.right=function (){
        if(cur.canRight(jiancehefa)){
            clearDate();
            cur.right();
            setDate();
            refreshDiv(gameDate,gameDivs);
        }
    }
    //旋转
    this.rotate=function (){
        if(cur.canRotate(jiancehefa)){
            clearDate();
            cur.rotate();
            setDate();
            refreshDiv(gameDate,gameDivs);
        }
    }
    //落到底
    this.fal=function (){
        while(this.down());//不能下降时返回false，跳出循环。
    }
    //方块固定到底端，即赋值为1；
    this.guding=function (){
        for(i=0;i<cur.date.length;i++){
            for(j=0;j<cur.date[0].length;j++){
                if(jiance(cur.origin,i,j)){
                    if(gameDate[cur.origin.x+i][cur.origin.y+j]==2) {
                        gameDate[cur.origin.x + i][cur.origin.y + j] = 1;
                    }
                }
            }
        }
        refreshDiv(gameDate,gameDivs)
    }
    //生成下一个方块
    this.xiayige=function (zhonglei,fangxiang){
        cur=next;
        setDate();
        next=fangkuai.prototype.make(zhonglei,fangxiang);
        refreshDiv(gameDate,gameDivs);
        refreshDiv(next.date,nextDivs);
    }
    //消掉一行
    this.xiaohang=function (){
        for(var i=gameDate.length-1;i>=0;i--){
            var flag=0;
            for(var j=0;j<gameDate[0].length;j++){
                if(gameDate[i][j]==0){
                    flag=1;
                    break;
                }
            }
            if(flag==0) {
                line += 1;
                for (m = i; m >= 0; m--) {
                    for (n = 0; n < gameDate[0].length; n++) {
                        gameDate[m][n] = gameDate[m - 1][n];
                        gameDate[0][n] = 0;
                    }
                }
                i++;
            }
        }
        return line;
    }
    //判断结束
    this.jieshu=function (){
        var flag=0;
        for(i=0;i<gameDate[0].length;i++){
            if(gameDate[0][i]==1){
                flag=1;
            }
        }
        return flag;
    }
    //入口，从这里开始调用初始化函数完成初始化
    this.init=function (doms) {
        document.getElementById("score").innerHTML=0;
        gameDiv = doms.gameDiv;
        nextDiv = doms.nextDiv;
        cur = new fangkuai.prototype.make(Math.ceil(Math.random()*7-1),Math.ceil(Math.random()*4-1));
        next = new fangkuai.prototype.make(Math.ceil(Math.random()*7-1),Math.ceil(Math.random()*4-1));
        initDiv(gameDiv, gameDate, gameDivs);//初始化界面
        initDiv(nextDiv, next.date, nextDivs);//初始化界面
        setDate();
        refreshDiv(gameDate, gameDivs);//刷新界面
        refreshDiv(next.date, nextDivs);//刷新界面
    };
}
