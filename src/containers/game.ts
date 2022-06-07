import { ElementRef } from "@angular/core";
import { BoardTypes } from "src/types/board";


export default class Game {
  data: boolean[][];
  lives: number;
  possibleMoves: number;
  board: BoardTypes

  constructor(data: boolean[][], references: BoardTypes) {
    this.data = data;
    this.lives = 3;
    this.possibleMoves = 0;
    this.board = references
  }

  private endGame() {
    const BUTTONS = this.board.board.nativeElement.querySelectorAll("button");

    BUTTONS.forEach((button) => {
      if (button.id !== "reset") button.disabled = true;
    });
  }

  private checkGameResult() {
    if (this.lives === 0) {
      this.board.result.nativeElement.innerHTML = `Result: You loosed`;
      return this.endGame();
    }

    if (this.possibleMoves === 0) {
      this.board.result.nativeElement.innerHTML = `Result: You won!`;
      return this.endGame();
    }
  }

  private substractPossibleMoves() {
    return (this.possibleMoves -= 1);
  }

  private substractPlayerLives() {
    this.lives -= 1;
    // LIVES.innerHTML = `Lives: ${this.lives}`;
    this.board.lives.nativeElement.innerHTML =  `Lives: ${this.lives}`;

  }

  private calculatePossibleCellsCount() {
    return this.data.reduce((prevState, currentState) => {
      const amountOfCells = currentState.filter((cell) => !!cell).length;
      return prevState + amountOfCells;
    }, 0);
  }

  private createButton(state: boolean) {
    const button = document.createElement("button");
    button.addEventListener("click", () => {
      button.disabled = true;
      if (state) {
        button.style.backgroundColor = "black";
        this.substractPossibleMoves();
      } else {
        button.style.backgroundColor = "white";
        this.substractPlayerLives();
      }

      this.checkGameResult();
    });

    return button;
  }

  private renderButtons(data: boolean[][]) {
    const buttons = data.map((buttonsCollection) => {
      return buttonsCollection.map(this.createButton.bind(this));
    });

    return buttons as  Node[][];
  }

  public init() {
    this.possibleMoves = this.calculatePossibleCellsCount();
    const buttons = this.renderButtons(this.data);
    
    this.board.reset.nativeElement.addEventListener("click", () => {
      this.lives = 3;
      this.possibleMoves = this.calculatePossibleCellsCount();
      const boardButtons = this.board.board.nativeElement?.querySelectorAll("button");
      
      this.board.lives.nativeElement.innerHTML = `Lives: ${this.lives}`
      this.board.result.nativeElement.innerHTML = `Result: `
    
      boardButtons?.forEach((button) => {
        button.style.background = "buttonface";
        button.disabled = false;
      });
    });

    buttons.forEach((buttonsCollection) => {
      buttonsCollection.forEach((button) => {
       this.board.board.nativeElement.appendChild(button)
      });
    });
  }
}