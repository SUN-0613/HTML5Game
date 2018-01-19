"use strict";

var ctx;
var paddle;         //パドル
var ball;           //ボール
var timer;          //タイマ処理
var blocks = [];    //ブロック配列
var balls = 3;      //残機
var score = 0;      //得点
var WIDTH = 600;    //canvasの幅
var HEIGHT = 600;   //canvasの縦
var colors = ["red", "orange", "yellow", "green", "purple", "blue"];    //ブロックの色

//ボールの動きを制御
function Ball()
{

    //ボールの中心座標
    this.x = 0;
    this.y = HEIGHT + this.r;   //out of area

    //ボールの変化量
    this.dx = 0;
    this.dy = 0;

    this.r = 10;        //ボール半径
    this.dir = 0;       //ボールの進行方向[rad]
    this.speed = 10;    //ボールの速度

    //ボールの新座標
    this.move = function ()
    {

        this.x += this.dx;
        this.y += this.dy;

    }

    //反射時のボールの向き調整
    this.changeDir = function (dir)
    {

        this.dir = dir;
        this.dx = this.speed * Math.cos(dir);
        this.dy = - this.speed * Math.sin(dir);

    }

    //新座標にてボールの描画
    this.draw = function (ctx)
    {

        drawBall(this.x, this.y, this.r);

    }

}

//ブロックおよびパドルの基
Block.prototype = Paddle.prototype = {
    draw: function (ctx) 
    {

        ctx.fillStyle = this.color;                     //色指定
        ctx.fillRect(this.x, this.y, this.w, this.h);   //矩形描画

    }

}

//ブロックのプロパティ
function Block(x, y, i)
{
    this.x = x;
    this.y = y;
    this.w = 50;
    this.h = 20;
    this.color = colors[i]
    this.point = (6 - i) * 10;

}

//パドルのプロパティ
function Paddle()
{

    this.w = 100;
    this.h = 20;
    this.x = (WIDTH - this.w) / 2;
    this.y = HEIGHT - 20;
    this.color = "yellow"
    this.keyL = false;  //左キー押下FLG
    this.keyR = false;  //右キー押下FLG

}

//初期化
function init()
{

    //canvasのコンテキスト取得
    ctx = document.getElementById("canvas").getContext("2d");
    ctx.font = "20pt Arial";    //フォント指定

    //キー押下イベント
    window.addEventListener("keydown", function (e)
    {
        toggleKey(e.keyCode, true);
    }, true);

    //キー離上イベント
    window.addEventListener("keyup", function (e)
    {
        toggleKey(e.keyCode, false);
    }, true);

    //ボールとパドルを新規作成
    paddle = new Paddle();
    ball = new Ball();
    
    //処理開始
    start();

    //タイマ処理開始
    if (isNaN(timer))
    {
        timer = setInterval(mainLoop, 15);
    }

}

//キー押下、離上処理
//code:キーコード
//flag: true->押下、false->離上
function toggleKey(code, flag)
{

    switch (code)
    {

        case 37:    //左
            paddle.keyL = flag;
            break;

        case 39:    //右
            paddle.keyR = flag;
            break;

        case 32:    //スペース

            //ゲーム開始前
            if (!isPlaying())
            {

                //ボールを設置
                ball.x = paddle.x + paddle.w / 2;
                ball.y = paddle.y - ball.r;

                //ボール角度調整:ランダム
                ball.changeDir(Math.random() * Math.PI / 2 + Math.PI / 4);  //45 - 135

            }
            break;
        
        default:
            break;

    }

}

//ゲーム開始
function start()
{

    var iLoop;
    var jLoop;

    //パドルのサイズを小さくする:最小値は20とする
    paddle.w = Math.max(20, paddle.w - 10);

    //ボールの速度UP:最大値は20とする
    ball.speed = Math.min(20, ball.speed + 1);

    //6行分のブロックを作成
    for (iLoop = 0; iLoop < 6; iLoop++)
    {

        //1行につき、10列のブロックを作成
        for (jLoop = 0; jLoop < 9; jLoop++)
        {

            //対象行列位置にブロック作成
            blocks.push(new Block(jLoop * 60 + 35, iLoop * 30 + 50, iLoop));

        }

    }

}

//タイマ処理
function mainLoop()
{

    var ratio;
    var nx;
    var ny;
    var hit;

    //左キー押下時、パドルの位置を左へ
    if (paddle.keyL)
    {

        paddle.x = Math.max(0, paddle.x - 10);

    }

    //右キー押下時、パドルの位置を右へ
    if (paddle.keyR)
    {

        paddle.x = Math.min(WIDTH - paddle.w, paddle.x + 10);

    }

    //画面描画
    draw();

    //開始前は処理終了
    if (!isPlaying())
    {
        return;
    }

    //ボールの高さがパドルより下か
    if (ball.y > HEIGHT - paddle.h)
    {

        //ボールとパドルの衝突
        if (paddle.x < ball.x && ball.x < paddle.x + paddle.w && paddle.y < ball.y && ball.y < paddle.y + paddle.h)
        {

            //衝突位置でボールの反射角を調整
            ratio = (paddle.x + paddle.w / 2 - ball.x) / paddle.w * 0.8;    //-0.4 to 0.4
            ball.changeDir(Math.PI / 2 + Math.PI * ratio);

        }
        else
        {

            //ボールの残機が0か
            if (--balls == 0)
            {

                //game over
                clearInterval(timer);
                timer = NaN;
                draw();
                return;

            }

            //ボール座標を初期位置へ
            ball.y = HEIGHT + ball.r;

        }
    }

    //ボールの移動後座標を取得
    nx = ball.x + ball.dx;
    ny = ball.y - ball.dy;

    //移動後のボールと壁が衝突するか
    if (ny < ball.r && ball.dy < 0)
    {

        //ボールの進行方向を逆にする
        ball.changeDir(ball.dir * -1);

    }
    else if (nx < ball.r || nx + ball.r > WIDTH)
    {

        ball.changeDir(Math.PI - ball.dir);

    }

    //移動後のボールとブロックが衝突するか
    hit = -1;

    blocks.some(function (block, iLoop)
    {
       if (block.x - ball.r < nx && nx < block.x + block.w + ball.r && block.y - ball.r < ny && ny < block.y + block.h + ball.r)
       {

            hit = iLoop;
            return true;

       } 
       else
       {

            return false;

       }

    });

    //ボールとブロックが衝突
    if (hit >= 0)
    {

        score += blocks[hit].point; //得点の更新
        blocks.splice(hit, 1);

        //ブロック全消去時は最初から
        if (blocks.length <= 0)
        {

            //cleared
            ball.y = HEIGHT + ball.r;
            start();
            return;

        }

        //ボールの進行方向を逆にする
        ball.changeDir(ball.dir * -1);

    }

    //ボールを移動する
    ball.move();

}

//ゲーム中か
function isPlaying()
{

    return ball.y < HEIGHT + ball.r;

}

//ボール描画
function drawBall(x, y, r)
{

    ctx.fillStyle = "yellow";
    ctx.beginPath();
    ctx.arc(x, y, r, 0, Math.PI * 2, true);
    ctx.fill();

}

//画面描画
function draw()
{

    //fill background
    ctx.fillStyle = "rgb(0,0,0)";
    ctx.fillRect(0, 0, WIDTH, HEIGHT);

    //draw blocks
    blocks.forEach(function (block)
    {

        block.draw(ctx);

    });

    //draw paddle
    paddle.draw(ctx);

    //draw balls
    ball.draw(ctx);

    if (balls > 2)
    {

        drawBall(80, 15, 10);

    }
    if (balls > 1)
    {

        drawBall(50, 15, 10);

    }

    // draw score & information
    ctx.fillStyle = "rgb(0,255,0)";
    ctx.fillText(("00000" + score).slice(-5), 500, 30);

    if (isNaN(timer))
    {

        ctx.fillText("GAME OVER", 220, 250);

    }

}