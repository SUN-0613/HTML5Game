function init()
{
    
    var canvas = document.getElementById("can");
    var ctx = canvas.getContext("2d");
    var iLoop;
    var dR;

    for (iLoop = 0; iLoop < 12; iLoop++)
    {

        ctx.save();                 //座標系を保存・・・(1)

        dR = Math.PI / 6 * iLoop;

        ctx.translate(100, 100);    //座標系を(x,y)だけ移動
        ctx.rotate(dR);             //座標系を(r)回転

        ctx.beginPath();
        ctx.moveTo(0, -60);
        ctx.lineTo(0, -50);
        ctx.stroke();
        ctx.restore();              //座標系を保存した(1)へ復元

    }

}
