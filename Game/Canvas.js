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

    */

    /* 4-2-2 矩形の描画
       矩形描画パターン

    ctx.strokeStyle = "#FF0000";
    ctx.fillStyle = "#00FFFF";
    ctx.lineWidth = 5;

    //1つ目:塗りつぶし
    ctx.fillRect(100, 30, 80, 50);
    
    //2つ目:枠線のみ
    ctx.strokeRect(200, 30, 80, 50);

    //3つ目:塗りつぶした内の一部をクリア
    ctx.fillRect(300, 30, 80, 50);
    ctx.clearRect(320, 50, 50, 20);

    */

    /* 4-2-3 円の描画
       円描画パターン
    */
    ctx.strokeStyle = "#FF0000";
    ctx.fillStyle = "#00FFFF";
    ctx.lineWidth = 5;

    //1つ目
    ctx.beginPath();
    ctx.arc(100, 50, 30, 0, 2 * Math.PI);  //始点X, 始点Y, 半径, 初期Radian, 終期Radian, [反時計回りFLG] []は省略項目
    ctx.closePath();
    ctx.fill();     //塗りつぶし描画

    //2つ目
    ctx.beginPath();
    ctx.moveTo(200, 50);
    ctx.arc(200, 50, 30, 0, Math.PI / 3);
    ctx.closePath();
    ctx.stroke();   //描画

    //3つ目
    ctx.beginPath();
    ctx.moveTo(300, 50);
    ctx.arc(300, 50, 30, 0, Math.PI / 3, true);
    ctx.closePath();
    ctx.stroke();

    //4つ目
    ctx.beginPath();
    ctx.moveTo(400, 50);
    ctx.arc(400, 50, 30, -1 * Math.PI / 6, Math.PI / 6, true);
    ctx.closePath();
    ctx.fill();

}
