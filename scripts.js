var player = "x";

var computer = "O";

var changeRandom1 = "Random value";

function randomFunction(){
    changeRandom1 = "Another random value";
    randomFunction2();
}

function randomFunction2(){
    changeRandom1 = "Another different random value";
    console.log(changeRandom1);
}

$(document).ready(function()
{
    var grid = [
        ['', '', ''],
        ['', '', ''],
        ['', '', '']
    ];

    function checkGameOver(agrid)
    {
        for (var i = 0; i < 3; i++)
        {
            if (agrid[i][0] !== '' && agrid[i][0] === agrid[i][1] && agrid[i][0] === agrid[i][2]) {
                console.log('win');
                return agrid[i][0];

            }
        }

        for (var i = 0; i<3; i++)
        {
            if (agrid[0][i] !== '' && agrid[0][i] === agrid[1][i] && agrid[0][i] === agrid[2][i])
            {
                console.log('win');
                return agrid[0][i];


            }

        }



        if (agrid[0][0] !== '' && agrid[0][0] === agrid[1][1] && agrid[0][0] === agrid[2][2]) {
            console.log('win');
            return agrid[0][0];

        }

        if (agrid[0][2] !== '' && agrid[0][2] === agrid[1][1] && agrid[0][2] === agrid[2][0]) {
            console.log('win');
            return agrid[0][2];

        }


        for (var i = 0; i < 3; i++)
            for (var j = 0; j < 3; j++) {
                if (agrid[i][j] === '') {
                    return false;
                }

            }

        return null;


    }

    function minmax(newGrid,depth,turn) {
        var state = checkGameOver(newGrid);
        if (state === false) {
            var values = [];
            gridCopy = _.cloneDeep(newGrid);
            for (var i = 0; i < 3; i++) {
                for (var j = 0; j < 3; j++) {
                    if (newGrid[i][j] !== '') continue;
                    gridCopy[i][j] = turn;
                    var point = minmax(gridCopy, depth + 1, (turn === player) ? computer : player);
                    values.push({cost: point, cell: {i: i, j: j}});
                    // (turn === player) ? computer : player
                }
            }

            if (turn === computer) {

                var min = _.minBy(values, function (o) {
                    return o.cost;
                });
                var max = _.maxBy(values, function (o) {
                    return o.cost;
                });

                if (depth === 1) {
                    return max.cell;
                }
                else {

                    return min.cost;
                }
            }

            else {
                var min = _.minBy(values, function (o) {
                    return o.cost;
                });

                if (depth === 1) {
                    return min.cell;
                }
                else {
                    return min.cost;
                }
            }


        }


        else if (state === null) {
            return 0;
        }
        else if (state === player ) {
            return depth - 10;
        }
        else if (state === computer) {
            return (10 - depth);
        }
    }




    function AI() {
        //     for(var i=0;i<3;i++){
        //         for (var j=0;j<3;j++){
        //             if (grid[i][j]=== ''){
        //                 return{
        //                     i:i,
        //                     j:j
        //                 };
        //             }
        //         }
        //     }
        //
        // }
        return minmax(grid,0,computer);
    }


    $(".col").click(function () {
        $(this).text(player);
        var i = $(this).data("i");
        var j = $(this).data("j");
        grid[i][j] = player;
        console.log(grid);
        var winner = checkGameOver(grid);
        if (checkGameOver(grid)) {
            console.log('winnnn');
            return;
        }
        else {
            var move = AI();
            var x = move.i;
            var y = move.j;
            grid[x][y] = computer;
            $(".col[data-i=" + x + "][data-j= " + y + "]").text(computer);
        }

        winner = checkGameOver(grid);
        if (checkGameOver(grid)) {
            alert('gameover '+ winner +"won");
        }

        $(".newgame").click(function(){

            for(var i=0;i<3;i++) {
                for (var j = 0; j < 3; j++) {
                    grid[i][j] = '';
                    $(".col[data-i=" + i + "][data-j= " + j + "]").text('');
                }
            }


        });




    });
});