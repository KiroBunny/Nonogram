import { ElementRef } from "@angular/core";
import { BoardTypes } from "src/types/board";
import Game from "./game";

export default class Board {
    cols: Array<number[]>;
    rows: Array<number[]>;
    game: Game;
    board: BoardTypes

    constructor(
        cols: Array<number[]>,
        rows: Array<number[]>,
        gameServiceReference: Game,
        board: BoardTypes
    ) {
        this.cols = cols;
        this.rows = rows;
        this.game = gameServiceReference;
        this.board = board;
    }

    private resetBoard() {
        this.board.board.nativeElement.innerHTML = ''
        this.board.cols.nativeElement.innerHTML = '<div class="first-col"></div>'
        this.board.rows.nativeElement.innerHTML = ''
        this.board.lives.nativeElement.innerHTML = 'Lives: 3'
        this.board.result.nativeElement.innerHTML = 'Result: '
    }

    private createBoardInformation(data: number[][]) {
        return data.map((collection) => {
            return collection.reduce((prevElement, currentElement) => {
                if (!prevElement) return currentElement;
                return prevElement + ` ${currentElement}`;
            }, "");
        });
    }

    private renderInformations(
        data: (number | string)[],
        parent: ElementRef<HTMLDivElement>,
        type: "row" | "col"
    ) {
        data.forEach((cell) => {
            const informationContainer = document.createElement("p");
            const transformedCell =
                type === "col" && String(cell).length > 1
                    ? String(cell)
                        .split(" ")
                        .map((cellValue) => `${cellValue} <br />`)
                        .join(" ")
                    : cell;

            informationContainer.innerHTML = `${type === "col" ? transformedCell : cell || 0
                }`;

            parent?.nativeElement.insertAdjacentHTML('beforeend', `<p>${type === "col" ? transformedCell : cell || 0
                }</p>`);
        });
    }

    private fillBoardWithNumbers() {
        const rowInformation = this.createBoardInformation(this.rows);
        const colInformation = this.createBoardInformation(this.cols);
        this.renderInformations(rowInformation, this.board.rows, "row");
        this.renderInformations(colInformation, this.board.cols, "col");
    }

    public createBoard() {
        this.resetBoard();
        this.fillBoardWithNumbers();
    }
}