var timerID;    //タイマ処理

function init()
{
    timerID = setInterval(AnalogClock, 1000);   //1秒刻みで更新
}

function AnalogClock()
{
    
    var canvas = document.getElementById("can");
    var ctx = canvas.getContext("2d");
    var iLoop;
    var dR;
    var dNow = new Date();  //現在日時

     //初期化
     ctx.clearRect(0, 0, 600, 400);
     ctx.strokeStyle = "#000000";

    for (iLoop = 0; iLoop < 60; iLoop++)
    {

        dR = Math.PI / 30 * iLoop;
        
        if (iLoop % 5 == 0)
        {
            DrawLine(ctx, dR, 2, -105, -65);
        }
        else
        {
            DrawLine(ctx, dR, 1, -100, -70);
        }

    }

    //短針
    ctx.strokeStyle = "#0000FF";
    dR = Math.PI / 6 * ((dNow.getHours() % 12) + (dNow.getMinutes() / 60)); //分刻みも考慮
    DrawLine(ctx, dR, 5, -60, 0)

    //長針
    ctx.strokeStyle = "#0000FF";
    dR = Math.PI / 30 * dNow.getMinutes();
    DrawLine(ctx, dR, 3, -90, 0)

    //秒針
    ctx.strokeStyle = "#FF0000";
    dR = Math.PI / 30 * dNow.getSeconds();
    DrawLine(ctx, dR, 1, -100, 0)

}

// 時計盤線および針の描画
// ctx : canvasのコンテキスト
// dR : 座標系の回転
// iLineWidth : 線の太さ
// iStart : 線開始点
// iFinish : 線終了点
function DrawLine(ctx, dR, iLineWidth, iStart, iFinish)
{

    ctx.lineWidth = iLineWidth;

    ctx.save();                 //座標系を保存・・・(1)

    ctx.translate(200, 200);    //座標系を(x,y)だけ移動
    ctx.rotate(dR);             //座標系を(r)回転 : 左右反転のため-1倍

    ctx.beginPath();
    ctx.moveTo(0, iStart);
    ctx.lineTo(0, iFinish);
    
    ctx.stroke();
    ctx.restore();              //座標系を保存した(1)へ復元

}