"use strict";

var y = 250;
var v = 0;
var keyDown = false;
var WALLS = 80;
var score = 0;
var walls = [];
var slope = 0;
var timer;
var ship;
var main;

function init()
{

    var iLoop;

    main = document.getElementById("main");
    ship = document.getElementById("ship");

    for (iLoop = 0; iLoop < WALLS; iLoop++)
    {

        walls[iLoop] = document.createElement("div");
        walls[iLoop].style.position = "absolute";
        walls[iLoop].style.top = "100px";
        walls[iLoop].style.left = iLoop * 10 + "px";
        walls[iLoop].style.width = "10px";
        walls[iLoop].style.height = "400px";
        walls[iLoop].style.backgroundColor = "#333333";

        main.appendChild(walls[iLoop]);

    }

    slope = Math.floor(Math.random() * 5) + 1;

    timer = setInterval(mainloop, 50);
    window.addEventListener("keydown", function () {keyDown = true;});
    window.addEventListener("keyup",function () {keyDown = false;});

}

function hitTest()
{
    
    var st = parseInt(ship.style.top) + 10;
    var sh = parseInt(ship.style.height);
    var sb = st + sh - 20;

    var wt = parseInt(walls[14].style.top);
    var wh = parseInt(walls[14].style.height);
    var wb = wh + wt;

    return (st < wt) || (sb > wb);

}

function mainloop()
{

    var bang = document.getElementById("bang")
    var edge;
    var t;
    var h;
    var b;
    var iLoop;

    if (hitTest())
    {

        clearInterval(timer);

        bang.style.top = (y - 40) + "px";
        bang.style.visibility = "visible";
        return;

    }

    score += 10;

    document.getElementById("score").innerHTML = score.toString();

    v += keyDown ? -3 : 3;
    y += v;
    ship.style.top = y + "px";

    edge = walls[WALLS - 1].style;
    t = parseInt(edge.top);
    h = parseInt(edge.height);
    b = h + t;
    t += slope;
    b += slope;

    if ((t < 0) && (slope < 0) || (b > 600) && (slope > 0))
    {

        slope = (Math.floor(Math.random() * 5) + 1) * (slope < 0 ? 1 : -1);
        edge.top = (t + 10) + "px";
        edge.height = (h - 20) + "px";

    }
    else
    {

        edge.top = t + "px";

    }

    for (iLoop = 0; iLoop < WALLS - 1; iLoop++)
    {

        walls[iLoop].style.top = walls[iLoop + 1].style.top;
        walls[iLoop].style.height = walls[iLoop + 1].style.height;

    }

}