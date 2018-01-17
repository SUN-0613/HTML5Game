function init()
{
    
    var canvas = document.getElementById("can");
    var ctx = canvas.getContext("2d");
    var iLoop;
    var dR;

    for (iLoop = 0; iLoop < 12; iLoop++)
    {

        ctx.save();

        dR = Math.PI / 6 * iLoop;

        ctx.translate(100, 100);
        ctx.rotate(dR);

        ctx.beginPath();
        ctx.moveTo(0, -60);
        ctx.lineTo(0, -50);
        ctx.stroke();
        ctx.restore();

    }

}
