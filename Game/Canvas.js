var ctx;    //コンテキスト保存

function init()
{
    
    //Canvasのコンテキスト取得
    var canvas = document.getElementById("canvas");
    ctx = canvas.getContext("2d");

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
    ctx.fillRect(100, 200, 200, 100);
    ctx.strokeRect(100, 200, 200, 100);

}
