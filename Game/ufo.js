﻿var ufo;                //オブジェクト
var bInitFlg = true;    //初期実行処理FLG

//キー押下処理を追加
function init()
{
    window.addEventListener("keydown", keydown);        //キー押下イベント実装
    ufo = new UFO(document.getElementById("ufo"), 100); //オブジェクト宣言
}

//キー押下処理
function keydown(e)
{
    if (e.keyCode == 37)        //左カーソル
    {
        ufo.moveLeft();
    }
    else if (e.keyCode == 39)   //右カーソル
    {
        ufo.moveRight();
    }
}

//オブジェクトの処理
//_elem:Element:対象オブジェクト
//_xpos:X Position:X座標
function UFO(_elem, _xpos)
{
    this.elem = _elem;  //対象オブジェクト
    this.xpos = _xpos;  //対象X座標
    
    //初期位置移動
    if (bInitFlg == true)
    {
        this.elem.style.left = this.xpos + "px";
        bInitFlg = false;
    }

    //左カーソル処理
    this.moveLeft = function()
    {
        //左へ10px移動
        this.xpos -= 10;
        this.elem.style.left = this.xpos + "px";
    }

    //右カーソル処理
    this.moveRight = function()
    {
        //右へ10px移動
        this.xpos += 10;
        this.elem.style.left = this.xpos + "px";
    }

}