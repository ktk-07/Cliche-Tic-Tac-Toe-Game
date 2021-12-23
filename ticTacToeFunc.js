let gameSection = document.getElementById("gameSection")
let gameBox = document.getElementById("gameBox");
let playerName = document.getElementById("playerName");
let boxArr = document.getElementsByClassName("box");

let playBtn = document.getElementById("playBtn");
let gameHeading = document.getElementById("gameHeading");

var data = Array.from({length:9},()=>[]);

function addXorO(e){
    if(playerName.textContent === "X"){
        e.target.classList.add("x");
        e.target.dataset.sign = "x"
        data[Number(e.target.dataset.boxno)] = "x";
        playerName.textContent = "O"
        // This is the changing of players on the gameBox itself
        // so as to change the css hover state;
        gameBox.classList.add("o");
        gameBox.classList.remove("x");
    }else if(playerName.textContent === "O"){
        e.target.classList.add("o");
        playerName.textContent = "X";
        e.target.dataset.sign = "o"
        data[Number(e.target.dataset.boxno)] = "o";
        gameBox.classList.add("x");
        gameBox.classList.remove("o");
    }
}

for(let i of boxArr){
    i.addEventListener("click",addXorO,{once :true })
}


/* Alternative Code;
boxArr = document.querySelectorAll(".box")
boxArr.forEach((value,index)=>{
    value.addEventListener("click",addXorO,{once :true });
})
*/

let playBox = document.getElementById("playerPopUp");
let inGame = document.getElementById("inGame");
let preGame = document.getElementById("preGame");
let playerBtn = document.getElementsByClassName("player");
let main = document.getElementById("main");

window.addEventListener("load",function(){
    gameSection.style.display = "none";
    preGame.style.display = "none";
    for(let j of boxArr){
        j.addEventListener("click", checkWinner,{once:true});
    }
})

function fadeInGame(){
    main.style.opacity = 0;


    setTimeout(()=>{
        main.style.display= "none";
        gameSection.style.display = "flex";
        preGame.style.display = "flex";
    },600);

    setTimeout(()=>{
        gameSection.style.opacity= 1;
        preGame.style.opacity = 0.9;
        playBox.style.display="flex";
    },650)
}


playBtn.addEventListener("click",fadeInGame,)


//inputing the which player"s turn

let playerBtns = document.getElementsByClassName("player");
let playerPopUp = document.getElementById("playerPopUp");
let reSetSection = document.getElementById("reSetSection");
let resetGameBox = document.getElementById("resetGameBox");

//instead of datase.player you can use querySelector [data-player];
function inputPlayer(e){
    let xOrO = e.target.dataset.player;
    playerName.textContent = xOrO;
    preGame.style.opacity = 0;
    gameBox.classList.add(xOrO.toLowerCase());

    setTimeout(()=>{
        preGame.style.display = "none"
        playerPopUp.style.display = "none"
    },500)

}

for(const button of playerBtns){
    button.addEventListener("click",inputPlayer,)
}


//ending the game;

/*
Array is showing up as empty, yet it contains values.
the stack overflow comment said this  援引(quote)

"Objects logged in the Javascript console are "live", 
so expanding them shows the current contents of the object. 
the first line shows that the outputList was empty,
when you first called console.log(). 
But something was added to the array later, 
and when you expanded the object by clicking on the disclosure triangle, 
you see the updated value.""

My issue was that when my game resetted, it didn't activate when i had  a
winnning move.
Like the checkWinnerFunction didn't get called until i press on another 
grid box.Usually it would call the checkwinner func right after i 
had a winning move.
Cause when i click  grid box the the data should be pushed into the data array
but when i console.log out the data arr, the data of 9 empty arrays 
still had 9 empty.But that shouldn't have been the case;
the cross or nought sign should have been push to the data array 's empty
array according to which box the user press.
I went to stack overflow to look at my issue.They said something about,
how the data has not been filled , and that the console.log when clicked on
showed the live results instead of when the functiono was called.

I don't know how i solved my issue but did it.I just added a setTimeout to
my checkWinner Code and i solved it. and now it works perfectly fine;
My conclusion was that my data was probably slowly loading and thus
adding a set timeout to the checkwinner would let the data
get into the array before calling the checkWinner func.

Okay so if i add set timeout to the block it works. But if i don't add
the set timeout,
Even if i don't input a value in the time parameter of 
set timeout it still works;
it does not work if i remove the set timeout.
WHAT THE FUCK!

"
 Indeed, and it's also a great way 
 to delay execution with the possibility of cancelling 
 it if a particular event fires. 
 I've used this technique numerous times and it's really useful."

 "This is a splendid way of doing deferred procedure calls in JS
  - "do X later/not-right-now". 
 If you're inside an event handler, 
 it may be a bad time to call some function because of state/re-entrancy issues. 
 Note that you cannot guarantee the actual execution time, but it's "soon" "

Okay so basically this is my verdict结论：
From reading stackoverflow answer
By input a settimeout without a ms this casue it to delay the function probably
cause its being adding to the call stack.
This cause there to be enough time for the data to be added into the
data array.
ANd this the checkwinner functions works


*/

let checkWinner = () => {
    console.log(boxArr);
    console.log(data);
    let win = false;

    setTimeout(()=>{
        for(let i of winningMoves){
            if( (data[i[0]] === data[i[1]]) && (data[i[2]] === data[i[1]]) ){
                alert(`Player ${data[i[0]].toUpperCase()} has won the game`);
                win = true;
            }
        }
    
        moveCount = data.filter((value)=> value != "").length;
    
        if(win){
            resetGameOption();
        }else if ( (!win) && (moveCount === 9)){
            alert("DRAW!")
            resetGameOption();
        }
    },)
}


/* I am quite happy i thought of this idea.
since an array is a ordered datastructure/list;
i created an array of 9 items;
i use the data-boxno information which store the boxNo to store the 
crosses and noughts inside the array at their specific boxno.
for example i click on boxno9 as player X, arr at position9 must have the cross
symbol 
basically arr[9] = "x"

then the looping and checking of ans i got it from stack exchange;
credit to the guy for not giving ans but giving a guide;
He posted that we can loop through the array of winning moves and check if
they are all the same;
*/

let moveCount = 0;
const winningMoves = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,4,8],
    [2,4,6],
    [1,4,7],
    [0,3,6],
    [1,4,7],
    [2,5,8]
];


function resetGameOption(e){
    resetGame()
    preGame.style.opacity = "0"
    preGame.style.display = "flex"
    resetGameBox.style.display = "flex"
    setTimeout(()=>{
        preGame.style.opacity = "0.9";
        resetGameBox.style.opacity = "1"
    },50)
}

let resetBtn = document.getElementById("resetBtn");
let menuBtn = document.getElementById("menuBtn");

function resetGame(e){
    data = Array.from({length:9}, () =>[]);
    for(let i of boxArr){
        i.classList.remove("x");
        i.classList.remove("o");
        i.removeEventListener("click",addXorO,{once:true});
        i.addEventListener("click",addXorO,{once :true });
        i.addEventListener("click", checkWinner,{once:true});
    }


}



function mainMenuRefresh(e){
    resetGameBox.style.opacity = 0;
    preGame.style.opacity = 0;
    gameSection.style.opacity = 0;
    resetGame();
    setTimeout(()=>{
        main.style.display= "flex";
        preGame.style.display = "none";
        gameSection.style.display = "none";
        resetGameBox.style.display = "none";
    },600);

    setTimeout(()=>{
        main.style.opacity= 1;
    },650)
}

menuBtn.addEventListener("click",mainMenuRefresh);
resetBtn.addEventListener("click",()=>{
    resetGameBox.style.opacity = 0;
    preGame.style.opacity = 0;
    resetGame();
    setTimeout(()=>{
        resetGameBox.style.display = "none";
        preGame.style.display = "none";
    },50);
});

