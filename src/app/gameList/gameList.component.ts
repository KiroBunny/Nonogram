import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Game } from 'src/model/game';
import { GameService } from 'src/service/game.service';
import Board from 'src/containers/board';
import {default as GameContainer} from 'src/containers/game';
import { calculateCol, calculateRow } from 'src/helpers/numbers';

@Component({
  selector: 'app-game-list',
  templateUrl: './gameList.component.html',
  styleUrls: ['./gameList.component.css']
})
export class GameListComponent implements OnInit {

  displayedColumns = ['id', 'size'];
  games: Game[];
  actualGame: Game;
  lista: boolean;
  click: boolean;
  isShown: boolean;

  @ViewChild('app', { static: true })
  wrapper: ElementRef<HTMLDivElement>; 

  @ViewChild('cols', { static: true })
  cols: ElementRef<HTMLDivElement>; 

  @ViewChild('rows', { static: true })
  rows: ElementRef<HTMLDivElement>; 
  
  @ViewChild('board', { static: true })
  board: ElementRef<HTMLDivElement>; 

  @ViewChild('lives', { static: true })
  lives: ElementRef<HTMLDivElement>; 
  
  @ViewChild('result', { static: true })
  result: ElementRef<HTMLDivElement>; 

  @ViewChild('reset', { static: true })
  reset: ElementRef<HTMLDivElement>; 


  private ctx: CanvasRenderingContext2D; 

  constructor(private gameService: GameService) {
      this.lista = true;
      this.click = false;
      this.isShown = false;
   }

  ngOnInit(): void {
    this.gameService.findAll().subscribe(_games =>{
      this.games = _games
    });

    this.wrapper.nativeElement.style.display = 'none';

  }

  getGame(gameId: string) {
      this.gameService.getMap(gameId)
      this.actualGame = this.games[gameId];
      this.lista=false;
      console.log(this.games[gameId].tab);
  }

  onSelect(gameId: string){

    const references = {
      app: this.wrapper,
      cols: this.cols,
      rows: this.rows,
      board: this.board,
      lives: this.lives,
      result: this.result, 
      reset: this.reset
    }

    this.wrapper.nativeElement.style.display = 'flex';
    this.wrapper.nativeElement.style.flexDirection = 'column';

    this.click = true;
    this.getGame(gameId);
    const game = new GameContainer(this.actualGame.tab, references);
    const board = new Board(calculateCol(this.actualGame.tab), calculateRow(this.actualGame.tab), game, references);

    console.log(this.cols.nativeElement)
    board.createBoard();
    game.init();
  }

  onBack(){
    this.wrapper.nativeElement.style.display = 'none';
    
    this.click = false;
  }

}
