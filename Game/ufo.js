var ufo;                //オブジェクト
var bInitFlg = true;    //初期実行処理FLG

var timerID;            //★タイマ処理
var iTimerCounter = 0;  //★タイマ処理：カウンタ
var bPlus = true;       //★タイマ処理：X座標増加FLG
var iUfo2XPos = 100;    //★タイマ処理：X座標

//キー押下処理を追加
function init()
{
    window.addEventListener("keydown", keydown);                //キー押下イベント実装
    ufo = new UFO(document.getElementById("ufo"), 100, 50);     //オブジェクト宣言
    timerID = setInterval(timer_Tick, 1000);                     //★タイマ開始
}

//キー押下処理
function keydown(e)
{
    if (e.keyCode == 37)        //左カーソル
    {
        ufo.moveLeft();
    }
    else if (e.keyCode == 38)    //上カーソル
    {
        ufo.moveUp();
    }
    else if (e.keyCode == 39)   //右カーソル
    {
        ufo.moveRight();
    }
    else if (e.keyCode == 40)   //下カーソル
    {
        ufo.moveDown();
    }
}

//オブジェクトの処理
//_elem:Element:対象オブジェクト
//_xpos:X Position:X座標
function UFO(_elem, _xpos, _ypos)
{
    this.elem = _elem;  //対象オブジェクト
    this.xpos = _xpos;  //対象X座標
    this.ypos = _ypos;  //対象Y座標
    
    //初期位置移動
    if (bInitFlg == true)
    {
        this.elem.style.left = this.xpos + "px";
        this.elem.style.top = this.ypos + "px";
        bInitFlg = false;
    }

    //左カーソル処理
    this.moveLeft = function()
    {
        //左へ10px移動
        this.xpos -= 10;
        this.elem.style.left = this.xpos + "px";
        this.elem.style.top = this.ypos + "px";
    }

    //右カーソル処理
    this.moveRight = function()
    {
        //右へ10px移動
        this.xpos += 10;
        this.elem.style.left = this.xpos + "px";
        this.elem.style.top = this.ypos + "px";
    }

    //上カーソル処理
    this.moveUp = function()
    {
        //上へ5px移動
        this.ypos -= 10;
        this.elem.style.left = this.xpos + "px";
        this.elem.style.top = this.ypos + "px";
    }

    //下カーソル処理
    this.moveDown = function()
    {
        //下へ5px移動
        this.ypos += 10;
        this.elem.style.left = this.xpos + "px";
        this.elem.style.top = this.ypos + "px";
    }

}

//★タイマ処理
function timer_Tick()
{

    //対象オブジェクト取得
    var ufo2 = document.getElementById("ufo2");
    var iAdd;
    var iXPos;

    //一定回数超過すると左右移動を反転
    if (++iTimerCounter >= 10)
    {
        
        if (bPlus == true)
        {
            bPlus = false;
        } 
        else
        {
            bPlus = true;
        }
        
        iTimerCounter = 0;

    }

    //移動量の設定
    if (bPlus == true)
    {
        iAdd = 10;
    }
    else
    {
        iAdd = -10;
    }

    //対象オブジェクトの移動
    iUfo2XPos += iAdd;
    ufo2.style.left = iUfo2XPos + "px";
}

//★タイマ停止
function timer_Stop()
{
    clearInterval(timerID);
}