"use strict";

//10☓10の計100マスに10個の爆弾を配置
var W = 10;     //幅
var H = 10;     //高さ
var BOMB = 10;  //爆弾の数
var cell = [];  //タイル管理:2次元配列
var opened = 0; //オープンしたタイル数

//初期化
function init()
{

    var main = document.getElementById("main"); //table
    var iLoop;  //ループ変数
    var jLoop;  //ループ変数
    var tr;     //table:行
    var td;     //table:cell
    var x;      //座標:横
    var y;      //座標:縦

    //行ループ
    for (iLoop = 0; iLoop < H; iLoop++)
    {

        //管理用配列に2次元目を追加し、tableに行を追加
        cell[iLoop] = [];
        tr = document.createElement("tr");

        //列ループ
        for (jLoop = 0; jLoop < W; jLoop++)
        {

            //対象行列のセル作成、クリック処理を追加
            td = document.createElement("td");
            td.addEventListener("click", click);
            td.className = "cell";  //クラス名を登録:stylesheetに反映させるため
            td.y = iLoop;
            td.x = jLoop;

            //管理用配列に代入
            cell[iLoop][jLoop] = td;

            //行に追加
            tr.appendChild(td);

        }

        //テーブルに対象業の追加
        main.appendChild(tr);

    }

    //爆弾の配置
    for (iLoop = 0; iLoop < BOMB; iLoop++)
    {

        while (true)
        {

            //ランダムで配置するセルを選択
            x = Math.floor(Math.random() * W);
            y = Math.floor(Math.random() * H);

            //配置済みでないか
            if (!cell[x][y].bomb)
            {

                //管理用配列に記憶
                cell[x][y].bomb = true;
                //cell[x][y].textContent = "*"; //爆弾を表示したいならコメントを解除
                break;

            }

        }

    }

}

//対象セル(x,y)の周囲にある爆弾をカウント
function count(x, y)
{

    var b = 0;  //爆弾数
    var iLoop;  //ループ変数
    var jLoop;  //ループ変数

    //列ループ：対象セルの前列から次列まで
    for (jLoop = y - 1; jLoop <= y + 1; jLoop++)
    {

        //行ループ：対象セルの前行から次行まで
        for (iLoop = x - 1; iLoop <= x + 1; iLoop++)
        {

            //対象セルが爆弾かチェック
            if (cell[jLoop][iLoop].bomb)
            {
                b++;    //爆弾数を計上
            }

        }

    }

    //カウント値を返す
    return b;

}

//対象セル(x, y)をオープン
function open(x, y)
{

    var iLoop;  //ループ変数
    var jLoop;  //ループ変数
    var c;      //対象セル
    var n;      //爆弾数

    //列ループ：対象セルの前列から次列まで
    for (jLoop = y -1; jLoop <= y + 1; jLoop++)
    {

        //行ループ：対象セルの前行から次行まで
        for (iLoop = x - 1; iLoop <= x + 1; iLoop++)
        {

            //対象列および対象セルが存在するか
            if (cell[jLoop] && cell[jLoop][iLoop])
            {

                c = cell[jLoop][iLoop];

                //クリック済、または爆弾セルの場合は処理継続
                if (c.opened || c.bomb)
                {
                    continue;
                }

                //対象セルを開く
                flip(c);
                n = count(iLoop, jLoop);    //爆弾数取得

                //爆弾がないか
                if (n == 0)
                {

                    //再帰処理
                    open(iLoop, jLoop);

                }
                else
                {

                    //爆弾数を表示
                    c.textContent = n;

                }

            }

        }

    }

}

//対象セルを開く
function flip(cell)
{

    cell.className = "cell open";   //クラス名を変更し、styleを更新
    cell.opened = true;             //FLG更新

    //全セルを開くことができたか
    if (++opened >= (W * H - BOMB))
    {

        //完了メッセージを表示
        document.getElementById("title").textContent = "Good Job!";

    }

}

//クリック処理
function click(e)
{

    //クリックされたセル
    var src = e.currentTarget;

    //爆弾か
    if (src.bomb)
    {

        //全行ループ
        cell.forEach(function (tr) 
        {

            //全列ループ
           tr.forEach(function (td) 
            {

                //爆弾セルならば"+"と表記
                if (td.bomb)
                {

                    td.textContent = "+";

                }

            }); 

        });

        //失敗メッセージを表示
        document.getElementById("title").textContent = "Game Over";

    }
    else
    {

        //爆弾でないならオープン処理を続行
        open(src.x, src.y);

    }

}