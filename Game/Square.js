function init()
{
    
    var canvas = document.getElementById("can");
    var ctx = canvas.getContext("2d");

    ctx.fillStyle = "red";
    ctx.fillRect(10, 10, 80, 50);   //塗りつぶし四角:通常

    ctx.save();                     //座標系保存
    
    ctx.translate(100, 0);          //原点移動
    ctx.scale(1.5, 0.5);            //サイズをX軸Y軸それぞれ(x, y)倍する
    ctx.fillRect(10, 10, 80, 50);   //塗りつぶし四角:scaleにより横方向に長くなる
    
    ctx.restore();                  //座標系復元

    ctx.save();                     //座標系保存

    ctx.transform(0.8, -0.2, -0.3, 0.8, 250, 50);   // 変換マトリクスによる座標系の変更
    ctx.fillStyle = "blue";
    ctx.fillRect(10, 10, 80, 50);   //塗りつぶし四角:平行四辺形

    ctx.restore();                  //座標系復元

}
