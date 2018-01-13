var ctx;    //コンテキスト保存

function init()
{
    
    //Canvasのコンテキスト取得
    var canvas = document.getElementById("canvas");
    ctx = canvas.getContext("2d");

    /* 4-1 コンテキスト
    ctx.strokeStyle = "#FF0000";    //枠線色
    ctx.fillStyle = "#00FF00";      //塗りつぶし色
    ctx.lineWidth = 10;             //枠線太さ
    ctx.lineCap = "round";          //線形状
    ctx.shadowColor = "#000000";    //影色
    ctx.shadowBlur = 20;            //影範囲

    //線を引く
    ctx.beginPath();
    ctx.moveTo(100, 100);
    ctx.lineTo(300, 150);
    ctx.stroke();

    //矩形を描く
    ctx.fillRect(100, 200, 200, 100);       //始点X, 始点Y, width, height
    ctx.strokeRect(100, 200, 200, 100);
    */

    /* 4-2 描画の方法
       線を３本引き、三角形を作成するイメージを描画
    */

    //1つ目
    ctx.beginPath();
    ctx.strokeStyle = "#FF0000";
    ctx.lineWidth = 5;
    ctx.moveTo(100, 100);   //始点
    ctx.lineTo(150, 50);    //頂点1
    ctx.lineTo(200, 100);   //頂点2
    ctx.stroke();           //描画

    //2つ目
    ctx.beginPath();
    ctx.strokeStyle = "#FF00FF";
    ctx.moveTo(300, 100);   //始点
    ctx.lineTo(350, 50);    //頂点1
    ctx.lineTo(400, 100);   //頂点2
    ctx.closePath();        //始点と頂点2を連結
    ctx.stroke();           //描画
    
    //3つ目
    ctx.beginPath();
    ctx.fillStyle = "#FFFF00";
    ctx.moveTo(500, 100);   //始点
    ctx.lineTo(550, 50);    //頂点1
    ctx.lineTo(600, 100);   //頂点2
    ctx.fill();             //始点と頂点2を連結し、塗りつぶす

}
