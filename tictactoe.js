let playerTurn = true;
let computerMoveTimeout = 0;

const gameStatus = {
   MORE_MOVES_LEFT: 1,
   HUMAN_WINS: 2,
   COMPUTER_WINS: 3,
   DRAW_GAME: 4
};

window.addEventListener("DOMContentLoaded", domLoaded);

function domLoaded() {
   const newBtn = document.getElementById("newGameButton");
   newBtn.addEventListener("click", newGame);

   const buttons = getGameBoardButtons();
   for (let button of buttons) {
      button.addEventListener("click", function () { boardButtonClicked(button); });
   }

   newGame();
}

function getGameBoardButtons() {
   return document.querySelectorAll("#gameBoard > button");
}

function checkForWinner() {
   const buttons = getGameBoardButtons();

   
   const possibilities = [
      [0, 1, 2], [3, 4, 5], [6, 7, 8], 
      [0, 3, 6], [1, 4, 7], [2, 5, 8], 
      [0, 4, 8], [2, 4, 6] 
   ];

   for (let indices of possibilities) {
      if (buttons[indices[0]].innerHTML !== "" &&
         buttons[indices[0]].innerHTML === buttons[indices[1]].innerHTML &&
         buttons[indices[1]].innerHTML === buttons[indices[2]].innerHTML) {

         if (buttons[indices[0]].innerHTML === "X") {
            return gameStatus.HUMAN_WINS;
         } else {
            return gameStatus.COMPUTER_WINS;
         }
      }
   }

   for (let button of buttons) {
      if (button.innerHTML !== "X" && button.innerHTML !== "O") {
         return gameStatus.MORE_MOVES_LEFT;
      }
   }

   return gameStatus.DRAW_GAME;
}

function newGame() {
   clearTimeout(computerMoveTimeout);
   computerMoveTimeout = 0;

   const buttons = getGameBoardButtons();
   for (let button of buttons) {
      button.innerHTML = "";
      button.classList.remove("x", "o");
      button.disabled = false; 
   }

   playerTurn = true; 
   document.getElementById("turnInfo").innerHTML = "Your turn";
}

function boardButtonClicked(button) {
   if (playerTurn) {
      button.innerHTML = "X";
      button.classList.add("x");
      button.disabled = true; 
      switchTurn();
   }
}

function switchTurn() {
   const status = checkForWinner();

   if (status === gameStatus.MORE_MOVES_LEFT) {
      if (playerTurn) {
         computerMoveTimeout = setTimeout(makeComputerMove, 1000); 
      }
      playerTurn = !playerTurn; 
      document.getElementById("turnInfo").innerHTML = playerTurn ? "Your turn" : "Computer's turn";
   } else {
  
      playerTurn = false; 
      if (status === gameStatus.HUMAN_WINS) {
         document.getElementById("turnInfo").innerHTML = "You win!";
      } else if (status === gameStatus.COMPUTER_WINS) {
         document.getElementById("turnInfo").innerHTML = "Computer wins!";
      } else {
         document.getElementById("turnInfo").innerHTML = "Draw game";
      }
   }
}

function makeComputerMove() {
   const buttons = getGameBoardButtons();
   let availableButtons = Array.from(buttons).filter(button => button.innerHTML === ""); 

   if (availableButtons.length > 0) {
      const randomButton = availableButtons[Math.floor(Math.random() * availableButtons.length)];
      randomButton.innerHTML = "O";
      randomButton.classList.add("o");
      randomButton.disabled = true; 
      switchTurn(); 
   }
}