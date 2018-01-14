var ctx;

function init()
{

    var canvas = document.getElementById("canvas");
    var ctx = canvas.getContext("2d");
    var dMouth = (1 / 6) * Math.PI;     //口半分の角度[rad]

    ctx.fillStyle = "#FFFF00";
    ctx.lineWidth = 1;

    //初期表示
    ctx.beginPath();
    ctx.moveTo(400, 300);
    ctx.arc(400, 300, 50, (-1) * dMouth, dMouth, true);
    ctx.closePath();
    ctx.fill();

}
