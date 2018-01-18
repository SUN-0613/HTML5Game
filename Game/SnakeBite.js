"use strict";   //曖昧な実装を禁止

var W, H, S = 20;   //横マス、縦マス、マス数
var snake = [], foods = []; //蛇と餌の配列
var keyCode = 0;    //押下キー
var point = 0;      //蛇が餌を食べたときに取得するポイント
var timer = NaN;    //タイマ処理
var ctx;            //canvasのコンテキスト

//Pointオブジェクト
function Point(x, y)
{
    this.x = x;
    this.y = y;
}

//初期化
function init()
{
    var canvas = document.getElementById("field");
    var iLoop;
    
    W = canvas.width / S;   //横:400/20=20マス
    H = canvas.height / S;  //縦:400/20=20マス
    ctx = canvas.getContext("2d");
    ctx.font = "20px sans-serif";

    //蛇の初期化
    snake.push(new Point(W / 2, H / 2));    //蛇の頭

    //餌の初期化:10こ
    for (iLoop = 0; iLoop < 10; iLoop++)
    {
        addFood();
    }

    //タイマ、キー押下処理
    timer = setInterval("tick()", 200);
    window.onkeydown = keydown;

}

//餌の追加
function addFood()
{

    var x;
    var y;

    while (true)
    {
        //乱数で追加座標を取得
        x = Math.floor(Math.random() * W);
        y = Math.floor(Math.random() * H);

        //蛇または餌がすでにある座標の場合再計算
        if (isHit(foods, x, y) || isHit(snake, x, y))
        {
            continue;
        }

        //餌の配置
        foods.push(new Point(x, y));
        break;

    }

}

//衝突判定
//座標(x,y)が配列data[]に登録済みかチェック
function isHit(data, x, y)
{

    var iLoop;

    for (iLoop = 0; iLoop < data.length; iLoop++)
    {
        if (data[iLoop].x == x && data[iLoop].y == y)
        {
            return true;
        }
    }

    return false;

}

//蛇が餌を食べた場合、別座標に餌を表示
function moveFood(x, y)
{
    //*.filter -> 戻り値がtrueとなる要素を配列から削除
    foods = foods.filter(
        function (p)
        {
            return (p.x != x || p.y != y);
        }
    );

    //別座標に餌を追加
    addFood();

}

//タイマ処理
function tick()
{
    
    //蛇頭の座標(x,y)取得
    var x = snake[0].x;
    var y = snake[0].y;

    //押下したキーにより、頭の座標を補正
    switch (keyCode)
    {
        case 37:    //左
            x--;
            break;
        
        case 38:    //上
            y--;
            break;
        
        case 39:    //右
            x++;
            break;

        case 40:    //下
            y++;
            break;

        default:
            paint();
            return;
    }

    //自分 or 壁に衝突したか
    if (isHit(snake, x, y) || x < 0 || x >= W || y < 0 || y >= H)
    {
        clearInterval(timer);
        paint();
        return;
    }

    //新しい頭の座標を配列先頭に追加
    snake.unshift(new Point(x, y));

    //餌を食べたか
    if (isHit(foods, x, y))
    {

        //餌を食べたので、ポイント追加
        point += 10;

        //餌の移動
        moveFood(x, y);

        //蛇は長くなるので、配列要素はそのまま
    }
    else
    {
        //蛇が移動したので、しっぽを削除
        snake.pop();
    }

    //描画
    paint();

}

//描画
function paint()
{

    //初期化
    ctx.clearRect(0, 0, W * S, H * S);
    
    //ポイントの表示
    ctx.fillStyle = "rgb(256, 0, 0)";
    ctx.fillText(point, S, S * 2);
    
    ctx.fillStyle = "rgb(0, 0, 255)";

    //餌を描画
    foods.forEach(
        function (p)
        {
            ctx.fillText("+", p.x * S, (p.y + 1) * S);
        });

    //蛇を描画
    snake.forEach(
        function (p)
        {
            ctx.fillText("*", p.x * S, (p.y + 1) * S);
        });
}

//押下されたキーのコードを保持
function keydown(event)
{
    keyCode = event.keyCode;
}