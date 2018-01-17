function init()
{

    var canvas = document.getElementById("canvas");
    var ctx = canvas.getContext("2d");
    var pic = document.getElementById("pic");

    ctx.drawImage(pic, 10, 10, 727, 1024, 100, 100, 400, 700);

}
