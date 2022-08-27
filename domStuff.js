export function createCBoard(size,parent) {
    
    for(let i=0;i<size;i++){
        for(let j=0;j<size;j++){
            let div=document.createElement("div");
            div.id=`${i}-${j}`;
            div.className="square cell";
            parent.append(div);
        }
    }
}


export function createPBoard(size,parent) {
    
    for(let i=0;i<size;i++){
        for(let j=0;j<size;j++){
            let div=document.createElement("div");
            div.id=`${i}_${j}`;
            div.className="cell";
            parent.append(div);
        }
    }
}

export function createPLBoard(size,parent) {
    
    for(let i=0;i<size;i++){
        for(let j=0;j<size;j++){
            let div=document.createElement("div");
            div.id=`${i}|${j}`;
            div.className="cell pl";
            parent.append(div);
        }
    }
}

export function highliteShips(board){
    board.ships.forEach(ship => {
       let d=ship.direction;
       let l=ship.length;
       let start=ship.start;
       highlite(start,l,d);
    });
}

export function togglePlacement() {
    let overflow = document.querySelector(".overflow");
    overflow.classList.toggle('hide');
    let pl=document.querySelector(".pl-container");
    pl.classList.toggle("hide");
}

function getDirection() {
    let input=document.querySelector("input");
    if(input.checked) return "v";
    return 'h';
}


export function listenToPl(board,player){
    let divs=document.querySelectorAll(".pl");
    let n=0;
    divs.forEach(div => {
        div.addEventListener("click",function(e) {
            let coord=e.target.id.split('|');
            coord=coord.map(Number);
            let d=getDirection();
            switch(n) {
                case 0: if(player.choosePlace(board,coord,4,d)!='error') {
                    n++; 
                    highlite(coord,4,d);
                    updateInfo();
                } break;
                
                case 1: if(player.choosePlace(board,coord,3,d)!='error') {
                    n++; 
                    highlite(coord,3,d);
                    updateInfo();
                }   break;
                case 2: if(player.choosePlace(board,coord,3,d)!='error') {
                    n++; 
                    highlite(coord,3,d);
                    updateInfo();
                }   break;

                case 3: if(player.choosePlace(board,coord,2,d)!='error') {
                    n++; 
                    highlite(coord,2,d);
                    updateInfo();
                }   break;

                case 4: if(player.choosePlace(board,coord,2,d)!='error') {
                    n++; 
                    highlite(coord,2,d);
                    updateInfo();
                }   break;

                case 5: if(player.choosePlace(board,coord,1,d)!='error') {
                    n++; 
                    highlite(coord,1,d);
                    updateInfo();
                }   break;

                case 6: if(player.choosePlace(board,coord,1,d)!='error') {
                    n++;
                    highlite(coord,1,d);
                    let overflow=document.querySelector(".overflow");
                    overflow.classList.add("hide");
                    let plBoard=document.querySelector(".pl-container");
                    plBoard.classList.add("hide");

                }
            }
            
        });

         div.addEventListener("mouseover",function(e){
           let coord=e.target.id.split("|");
           coord=coord.map(Number);
           let d=getDirection();
           switch(n) {
            case 0: if(board.checkEmptyCells(coord,4,d)) {
                highliteOnHover(coord,4,d);
            }
            else {
              redPointer(coord);
            } break;
            case 1: if(board.checkEmptyCells(coord,3,d)) {
                highliteOnHover(coord,3,d);
               
            }  else {
                redPointer(coord);
            } break;
            case 2: if(board.checkEmptyCells(coord,3,d)) {
                highliteOnHover(coord,3,d);
            }   else {
                redPointer(coord);
            } break;
            case 3: if(board.checkEmptyCells(coord,2,d)) {
                highliteOnHover(coord,2,d);
            }   else {
                redPointer(coord);
            } break;
            case 4: if(board.checkEmptyCells(coord,2,d)) {
                highliteOnHover(coord,2,d);
            }   else {
                redPointer(coord);
            } break;
            case 5: if(board.checkEmptyCells(coord,1,d)) {
                highliteOnHover(coord,1,d);
            }   else {
                redPointer(coord);
            } break;
            case 6: if(board.checkEmptyCells(coord,1,d)) {
                highliteOnHover(coord,1,d);
            }   else {
                redPointer(coord);
            } break;

        }

        });

        div.addEventListener("mouseout",function(e){
            let coord=e.target.id.split("|");
            coord=coord.map(Number);
            let d=getDirection();
            switch(n) {
                case 0: removeHighlite(coord,4,d); break;
                case 1:
                case 2: removeHighlite(coord,3,d); break;
                case 3:
                case 4: removeHighlite(coord,2,d); break;
                case 5:
                case 6: removeHighlite(coord,1,d); break;
            }

        });

        function updateInfo() {
            switch(n) {
                case 0: setTextInInfo("carrier"); break;
                case 1:
                case 2:
                setTextInInfo("destroyer"); break;
                case 3:
                case 4: setTextInInfo("patrol"); break;
                case 5:
                case 6: setTextInInfo("floater");
                break;
            }
        }
    });
}

function setTextInInfo(text) {
    let div=document.querySelector(".shipName");
    div.textContent=text;
}

function highlite(start,length,direction) {
    if(direction=="h") {
        for(let i=0;i<length;i++){
            let div=document.getElementById(`${start[0]}_${start[1]+i}`);
            div.classList.add("ship");
            let div2=document.getElementById(`${start[0]}|${start[1]+i}`);
            div2.classList.add("ship");
            
        }
    }

    if(direction=="v") {
        for(let i=0;i<length;i++){
            let div=document.getElementById(`${start[0]+i}_${start[1]}`);
            div.classList.add("ship");
            let div2=document.getElementById(`${start[0]+i}|${start[1]}`);
            div2.classList.add("ship");
            
        }
    }
}


function redPointer(coord) {
    let div=document.getElementById(`${coord[0]}|${coord[1]}`);
    if(div) div.classList.add("incorrect");
}

function highliteOnHover(start,length,direction) {
    if(direction=="h") {
        for(let i=0;i<length;i++){
            let div2=document.getElementById(`${start[0]}|${start[1]+i}`);
            if(div2){
                div2.classList.add("temp");
                div2.classList.remove("incorrect");
        }
      }
    }

    if(direction=="v") {
        for(let i=0;i<length;i++){
            let div2=document.getElementById(`${start[0]+i}|${start[1]}`);
            if(div2) {
                div2.classList.add("temp");
                div2.classList.remove("incorrect");
            }
        }
    }
}

function removeHighlite(start,length,direction) {
    if(direction=="h") {
        for(let i=0;i<length;i++){
            let div2=document.getElementById(`${start[0]}|${start[1]+i}`);
            if(div2){
                div2.classList.remove("temp");
        }
      }
    }

    if(direction=="v") {
        for(let i=0;i<length;i++){
            let div2=document.getElementById(`${start[0]+i}|${start[1]}`);
            if(div2) div2.classList.remove("temp");
        }
    }
}
export function highliteSurroundings(list) {
    list.forEach(coord => {
     let div=document.getElementById(`${coord[0]}|${coord[1]}`);
     if(div) div.classList.add('red');
    });
}

export function listenToBoard(cboard,pboard,cmp){
    let squares=document.querySelectorAll(".square");

    function handler(e){
        onClick(e,cboard,pboard,cmp,squares);
    }

    function removeListener(squares) {
        squares.forEach(element => {
           element.removeEventListener("click",handler);
        })     
   }

   function onClick(e,cboard,pboard,cmp,squares){
    let coord=e.target.id.split('-');
    coord=coord.map(Number);
    let hit=cboard.receiveAttack(coord);
    if(hit=="sunk"){
        updateDisplay(e.target,true);
        destroyUpdate(cboard,coord);
    }
    else updateDisplay(e.target,hit);
    removeListener(squares);
    if(cboard.allShipsSunk()){
        endGame(true);
    }

    else {
        
        setTimeout(() => {
        let info=cmp.attack(pboard);
        let index=info.coord;
        let ht=info.hit;
        let id=index.join('_');
        let div=document.getElementById(id);
        if(ht=='sunk'){
            updateDisplay(div,true);
            displayDestroy(pboard,index);
        }
        else updateDisplay(div,ht);

        if(pboard.allShipsSunk()){
           endGame(false);
        }

        else listen(squares);

        },100);
    }
}
    function listen(squares)
    {
        squares.forEach(square => {
         square.addEventListener("click",handler);    
        });
    }
    listen(squares);
}

function updateDisplay(div,hit){
    if(hit){
        div.classList.add("hit","ship");
    }
    else {
        div.classList.add("miss");
    }
    div.classList.add("played");
}


function destroyUpdate(gameBoard,coord){
    let id=gameBoard.board[coord[0]][coord[1]];
    let ship=gameBoard.ships[id-1];
    if(ship.direction=="v"){
       for(let j=0;j<ship.length;j++){
        let div=document.getElementById(`${ship.start[0]+j}-${ship.start[1]}`);
        div.classList.remove("hit","ship");
        div.classList.add("destroyed");
       }
    }
    if(ship.direction=="h"){
        for(let j=0;j<ship.length;j++){
         let div=document.getElementById(`${ship.start[0]}-${ship.start[1]+j}`);
         div.classList.remove("hit","ship");
         div.classList.add("destroyed");
        }
     }
}

function displayDestroy(gameBoard,coord){
    let id=gameBoard.board[coord[0]][coord[1]];
    let ship=gameBoard.ships[id-1];
    if(ship.direction=="v"){
        for(let j=0;j<ship.length;j++){
         let div=document.getElementById(`${ship.start[0]+j}_${ship.start[1]}`);
         div.classList.remove("hit","ship");
         div.classList.add("destroyed");
        }
     }
     if(ship.direction=="h"){
        for(let j=0;j<ship.length;j++){
         let div=document.getElementById(`${ship.start[0]}_${ship.start[1]+j}`);
         div.classList.remove("hit","ship");
         div.classList.add("destroyed");
        }
     }

}


export function clearBoards() {
    let boards=document.querySelectorAll(".board,.placement-board");
    boards.forEach(b => {
        b.replaceChildren();
    });
}


export function listenRestart(game){
    let restart=document.querySelector(".restart");
    restart.addEventListener("click",function handle(){
        game.startgame(game);
        toggleDisplay();
        setTextInInfo("carrier");
        this.removeEventListener("click",handle);
    });
}

function endGame(winner) {
    let message=document.querySelector(".announcement");
    winner ? message.textContent="You won !" : message.textContent="Computer beats you !";
    toggleDisplay();
}


function toggleDisplay(){
    let message=document.querySelector(".announcement");
    message.classList.toggle("display");
    let restart=document.querySelector(".restart");
    restart.classList.toggle("display");
}