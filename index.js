import { createCBoard,createPBoard,listenToBoard,createPLBoard,listenRestart,clearBoards,listenToPl, highliteSurroundings, togglePlacement} from "./domStuff.js";


function ship(start,length,id,direction){
    let hits=0;

    function hit(){
        this.hits++;
    }

    function isSunk(){
        return !(this.hits<length);
    }

    return {
        id,
        start,
        length,
        direction,
        hits,
        sunk:false,
        isSunk,
        hit,
    }
}

function game(){

    function startgame(g){
        clearBoards();
        togglePlacement();
        let pl=player();
        let cmp=computer();
        let playerGameBoard=gameboard(10);
        let computerGameBoard=gameboard(10);
        cmp.fillPlacements(10);
        pl.fillPlacements(10);
        listenRestart(g);
        let pboard=document.querySelector(".p-board");
        let cboard=document.querySelector(".c-board");
        let plboard=document.querySelector(".placement-board");
        createPBoard(10,pboard);
        createCBoard(10,cboard);
        cmp.placingShips(computerGameBoard);
        createPLBoard(10,plboard);
        listenToPl(playerGameBoard,pl);
        listenToBoard(computerGameBoard,playerGameBoard,cmp,g);
        
        
    
    }

    function endGame(winner){
        
        if(winner=="player"){

        }
    }

    return {
        startgame,endGame
    }

}

function gameboard(size){
    let board=[];
    let ships=[];
    let id=1;
    for(let i=0;i<size;i++){
        board[i]=new Array(size);
        for(let j=0;j<size;j++){
          board[i][j]=0;
        }
    }
    
    function placeShip(index,length,direction,possiblePlacements){
        if(direction==="h"){
            if(index[1]+length>size){
                return "error";
            }
            else {
                if(checkEmptyCells(index,length,direction)){
                    //place the ship
                    ships[this.id-1]=ship(index,length,this.id,direction);
                    for(let j=0;j<length;j++){
                        board[index[0]][index[1]+j]=this.id;
                    }
                    this.id++;
                    removeAdjacent(index,length,direction,possiblePlacements);
                }
                else {
                    return "error";
                }

            }
        }

        if(direction==="v"){
            if(index[0]+length>size){
                return "error";
            }
            else {
                if(checkEmptyCells(index,length,direction)){
                    ships[this.id-1]=ship(index,length,this.id,direction);
                    for(let j=0;j<length;j++){
                        board[index[0]+j][index[1]]=this.id;
                    }
                    this.id++;
                    removeAdjacent(index,length,direction,possiblePlacements);
                }
                else {
                   return "error";
                }

            }
        }
    }

    function receiveAttack(coord){
        if(board[coord[0]][[coord[1]]]!=0 && board[coord[0]][[coord[1]]]!=-1){
            //hits a ship
            let s=ships[board[coord[0]][coord[1]]-1];
            s.hit();
            if(s.isSunk()){
                s.sunk=true;
                return "sunk";
            }
            return true;
        }
    }

    function checkEmptyCells(start,length,direction){
       let array=[];
       if(direction=='v'){

        for(let j=0;j<length;j++){
            try {board[start[0]+j][start[1]];}
            catch {return false}
            array[j]=board[start[0]+j][start[1]];
        }

        return !array.some((val) => {
            return val!=0;
        });
 
       }

       if(direction=='h'){

        let array=board[start[0]].slice(start[1],start[1]+length);
        if(array.length!=length) return false;
        return !array.some((val) => {
            return val!=0;
        });
 
       }
    }

    function allShipsSunk(){

        return ships.every((s) => {
            return s.sunk;
        });
    }

    
    function findTheIndex(array,value) {
        return array.findIndex((element) => {
          return JSON.stringify(element)==JSON.stringify(value);
        });
      }
      
  
      function sliceElement(array,index) {
          array.splice(index,1);
      }
  
      function putMinus(list){
          list.forEach(coord => {
              board[coord[0]][coord[1]]=-1;
          });
          highliteSurroundings(list);
      } 

    function removeAdjacent(coord,length,direction,possiblePlacements) {
        if(direction=="h")
        {
           let index;
           let list=[];
           for(let i=0 ; i<length ; i++){

           let top=[coord[0]-1,coord[1]+i];
           index=findTheIndex(possiblePlacements,top);
           if(index!=-1){
                sliceElement(possiblePlacements,index);
                list.push(top);
           }

           let right=[coord[0],coord[1]+i+1];
           index=findTheIndex(possiblePlacements,right);
           if(index!=-1){
                sliceElement(possiblePlacements,index);
                list.push(right);
           }

           let left=[coord[0],coord[1]+i-1];
           index=findTheIndex(possiblePlacements,left);
           if(index!=-1){
                sliceElement(possiblePlacements,index);
                list.push(left);
           }

           let bottom=[coord[0]+1,coord[1]+i];
           index=findTheIndex(possiblePlacements,bottom);
           if(index!=-1){           
                sliceElement(possiblePlacements,index);
                list.push(bottom);
           }
            
            let bottomRight=[coord[0]+1,coord[1]+i+1];
            index=findTheIndex(possiblePlacements,bottomRight);
            if(index!=-1){
                    sliceElement(possiblePlacements,index);
                    list.push(bottomRight);
            }

            let bottomLeft=[coord[0]+1,coord[1]+i-1];
            index=findTheIndex(possiblePlacements,bottomLeft);
                if(index!=-1){
                    sliceElement(possiblePlacements,index);
                    list.push(bottomLeft);
                }

            let topRight=[coord[0]-1,coord[1]+i+1];
            index=findTheIndex(possiblePlacements,topRight);
                if(index!=-1){
                        sliceElement(possiblePlacements,index);
                        list.push(topRight);
                }

            let topLeft=[coord[0]-1,coord[1]+i-1];
            index=findTheIndex(possiblePlacements,topLeft);
                if(index!=-1){
                    sliceElement(possiblePlacements,index);
                    list.push(topLeft);
                }
           }

           for(let i=0;i<length;i++) {
               let val=[coord[0],coord[1]+i];
               let indx=findTheIndex(list,val);
               if(indx!=-1) sliceElement(list,indx); 
           }
           
           putMinus(list);
        }
        
        if(direction=="v")
        {
            let index;
            let list=[];
            for(let i=0 ; i<length ; i++){
 
            let top=[coord[0]+i-1,coord[1]];
            index=findTheIndex(possiblePlacements,top);
            if(index!=-1){
                 sliceElement(possiblePlacements,index);
                 list.push(top);
            }
 
            let right=[coord[0]+i,coord[1]+1];
            index=findTheIndex(possiblePlacements,right);
            if(index!=-1){
                 sliceElement(possiblePlacements,index);
                 list.push(right);
            }
 
            let left=[coord[0]+i,coord[1]-1];
            index=findTheIndex(possiblePlacements,left);
            if(index!=-1){
                 sliceElement(possiblePlacements,index);
                 list.push(left);
            }
 
            let bottom=[coord[0]+i+1,coord[1]];
            index=findTheIndex(possiblePlacements,bottom);
            if(index!=-1){           
                 sliceElement(possiblePlacements,index);
                 list.push(bottom);
            }
             
             let bottomRight=[coord[0]+i+1,coord[1]+1];
             index=findTheIndex(possiblePlacements,bottomRight);
             if(index!=-1){
                     sliceElement(possiblePlacements,index);
                     list.push(bottomRight);
             }
 
             let bottomLeft=[coord[0]+i+1,coord[1]-1];
             index=findTheIndex(possiblePlacements,bottomLeft);
                if(index!=-1){
                     sliceElement(possiblePlacements,index);
                     list.push(bottomLeft);
                 }
 
                let topRight=[coord[0]+i-1,coord[1]+1];
                index=findTheIndex(possiblePlacements,topRight);
                 if(index!=-1){
                         sliceElement(possiblePlacements,index);
                         list.push(topRight);
                 }
 
             let topLeft=[coord[0]+i-1,coord[1]-1];
             index=findTheIndex(possiblePlacements,topLeft);
                 if(index!=-1){
                     sliceElement(possiblePlacements,index);
                     list.push(topLeft);
                 }
           }

           for(let i=0;i<length;i++) {
               let val=[coord[0]+i,coord[1]];
               let indx=findTheIndex(list,val);
               if(indx!=-1) sliceElement(list,indx); 
           } 
           
           putMinus(list);
        }
        
    }

    return {
        ships,
        placeShip,
        receiveAttack,
        checkEmptyCells,
        size,
        board,
        id,
        removeAdjacent,
        allShipsSunk
    }
}

function player(){
    let alreadyPlayed=[];
    let possiblePlacements=[];
    

    function fillPlacements(size){
        for(let i=0;i<size;i++){
            for(let j=0;j<size;j++){
                let s=[];
                s.push(i);
                s.push(j);
                possiblePlacements.push(s);
            }
        }
    }

    function attack(coord,board){
       if(alreadyPlayed.find( (pair) => {
        
        return JSON.stringify(pair)===JSON.stringify(coord);
      
    }) == undefined ) {

            alreadyPlayed.push(coord);
            board.receiveAttack(coord);
       }
    }

    function choosePlace(board,coord,length,direction){
        if(board.placeShip(coord,length,direction,possiblePlacements)==="error"){
           return "error";
        }
    }

    return {
        attack,
        choosePlace,
        fillPlacements
    }
}

function computer(){
    let possiblePlacements=[];
    let possibleAttacks;
    function fillPlacements(size){
        for(let i=0;i<size;i++){
            for(let j=0;j<size;j++){
                let s=[];
                s.push(i);
                s.push(j);
                possiblePlacements.push(s);
            }
        }

        possibleAttacks=possiblePlacements.slice(0);
    }

    function placeShip(board,length){
        let coord;
        while(true)
        {
          let direction=chooseDirection();
          coord=chooseCoordP();
          if(board.placeShip(coord,length,direction,possiblePlacements)!="error"){
            
            break;
          };
        }
    }

    function chooseDirection(){
        let i = Math.floor(Math.random()*2);
        if(i===0) return 'h';
        return 'v';
    }

    function chooseCoordP(){
        let max=possiblePlacements.length;
        let index=Math.floor(Math.random()*(max));
        let s=possiblePlacements[index];
        return s;
    }

    function chooseCoordA(){
        let max=possibleAttacks.length;
        let index=Math.floor(Math.random()*(max));
        let s=possibleAttacks[index];
        possibleAttacks.splice(index,1);
        return s;
    }

    function attack(board){
        let coord=chooseCoordA();
        let hit = board.receiveAttack(coord);
        return {
            coord,
            hit
        }
    }

    function placingShips(board){
        let length=4;
        placeShip(board,length);
        length=3;
        placeShip(board,length);
        placeShip(board,length);
        length=2;
        placeShip(board,length);
        placeShip(board,length);
        length=1;
        placeShip(board,length);
        placeShip(board,length);
    }
     

     return {
        attack,
        placingShips,
        fillPlacements
    }
}

let g=game();

g.startgame(g);
