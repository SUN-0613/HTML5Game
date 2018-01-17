var ctx;

function init()
{
    var canvas = document.getElementById("canvas");
    ctx = canvas.getContext("2d");

    ctx.font = "32px 'Impact 5.00x'";
    
    ctx.strokeStyle = "blue";
    ctx.strokeText("strokeTextによる文字", 10, 50);

    ctx.fillStyle = "green";
    ctx.fillText("fillTextによる文字", 10, 100);

    ctx.fillStyle = "red";
    ctx.fillText("ABCDEFGHIJKLMNOPQRSTUVWXYZ", 10, 150, 200);

}