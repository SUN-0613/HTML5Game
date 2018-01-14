var ctx;        //canvasコンテキスト
var timerID;    //タイマ処理
var iCounter;   //タイマカウンタ
var iDirection; //パックマンの向き 0:左、1:上、2:右、3:下

//初期処理
function init()
{

    var canvas = document.getElementById("canvas");
    ctx = canvas.getContext("2d");

    ctx.fillStyle = "#FFFF00";
    ctx.lineWidth = 1;

    //キー処理追加
    window.addEventListener("keydown", keydown);

    iDirection = 2; //右向き表示
    Packman((1 / 6) * Math.PI);

    iCounter = 0;
    timerID = setInterval(timer_Tick, 300);

}

//キー押下処理
//パックマンの向きをカーソルの向きに変更
function keydown(e)
{

    switch (e.keyCode)
    {
        case 37:    //左カーソル
            iDirection = 0;
            break;

        case 38:    //上カーソル
            iDirection = 1;
            break;

        case 39:    //右カーソル
            iDirection = 2;
            break;

        case 40:    //下カーソル
            iDirection = 3;
            break;

        default: 
            break;

    }

}

//パックマン描画
function Packman(dMouth)
{

    var dCorrect;
    var dStart;
    var dFinish;

    //canvas内の初期化
    ctx.clearRect(0, 0, 800, 600);

    //向きによる調整
    switch (iDirection)
    {
        case 0: //左
            dCorrect = Math.PI;
            break;

        case 1: //上
            dCorrect = (3 / 2) * Math.PI 
            break;

        case 2: //右
            dCorrect = 0;
            break;

        case 3: //下
            dCorrect = (1 / 2) * Math.PI
            break;

        default: 
            dCorrect = 0;
            break;
    }

    dStart = dCorrect - dMouth;
    dFinish = dCorrect + dMouth;
    
    //canvasへ描画
    ctx.beginPath();
    ctx.moveTo(400, 300);
    ctx.arc(400, 300, 50, dStart, dFinish, true);
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