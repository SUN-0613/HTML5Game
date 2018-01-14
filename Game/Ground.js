function init()
{

    var canvas = document.getElementById("canvas");
    var ctx = canvas.getContext("2d");

    ctx.strokeStyle = "#FFFFFF";
    ctx.lineWidth = 3;

    //左側
    ctx.beginPath();
    ctx.moveTo(0, 150);
    ctx.lineTo(100, 150);
    ctx.lineTo(100, 450);
    ctx.lineTo(0, 450);
    ctx.stroke();

    //中央線
    ctx.beginPath();
    ctx.moveTo(400, 0);
    ctx.lineTo(400, 600);
    ctx.stroke();

    //中央円
    ctx.beginPath();
    ctx.arc(400, 300, 50, 0, 2 * Math.PI);
    ctx.closePath();
    ctx.stroke();

    //右側
    ctx.beginPath();
    ctx.moveTo(800, 150);
    ctx.lineTo(700, 150);
    ctx.lineTo(700, 450);
    ctx.lineTo(800, 450);
    ctx.stroke();
}
