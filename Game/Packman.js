var ctx;        //canvasコンテキスト
var timerID;    //タイマ処理
var iCounter;   //タイマカウンタ

//初期処理
function init()
{

    var canvas = document.getElementById("canvas");
    ctx = canvas.getContext("2d");

    ctx.fillStyle = "#FFFF00";
    ctx.lineWidth = 1;

    Packman((1 / 6) * Math.PI);

    iCounter = 0;
    timerID = setInterval(timer_Tick, 300);

}

//パックマン描画
function Packman(dMouth)
{
    //canvas内の初期化
    ctx.clearRect(0, 0, 800, 600);

    //canvasへ描画
    ctx.beginPath();
    ctx.moveTo(400, 300);
    ctx.arc(400, 300, 50, (-1) * dMouth, dMouth, true);
    ctx.closePath();
    ctx.fill();

}

//タイマ処理
function timer_Tick()
{

    if (++iCounter == 0)
    {
        Packman((1 / 6) * Math.PI);
    }
    else
    {
        Packman((1 / 40) * Math.PI);
        iCounter = -1;
    }

}