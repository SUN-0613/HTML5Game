function init()
{
    
    var canvas = document.getElementById("can");
    var ctx = canvas.getContext("2d");
    var iLoop;
    var dR;
    var iStart;
    var iFinish;

    for (iLoop = 0; iLoop < 60; iLoop++)
    {

        ctx.save();                 //座標系を保存・・・(1)

        dR = Math.PI / 30 * iLoop;
        
        if (iLoop % 5 == 0)
        {
            iStart = -105;
            iFinish = -65;
            ctx.lineWidth = 2;
        }
        else
        {
            iStart = -100;
            iFinish = -70;
            ctx.lineWidth = 1;
        }

        ctx.translate(200, 200);    //座標系を(x,y)だけ移動
        ctx.rotate(dR);             //座標系を(r)回転

        ctx.beginPath();
        ctx.moveTo(0, iStart);
        ctx.lineTo(0, iFinish);
        
        ctx.stroke();
        ctx.restore();              //座標系を保存した(1)へ復元

    }

}
