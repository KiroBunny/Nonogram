import { Component, OnInit } from '@angular/core';
import { Game } from 'src/model/game';
import { GameService } from 'src/service/game.service';

@Component({
  selector: 'app-game-list',
  templateUrl: './gameList.component.html',
  styleUrls: ['./gameList.component.css']
})
export class GameListComponent implements OnInit {

  games: Game[];
  actualGame: Game;
  constructor(private gameService: GameService) {

   }

  ngOnInit(): void {
    this.gameService.findAll().subscribe(_games =>{
      this.games = _games
    });
  }

  getGame(gameId: string) {
    console.log(gameId);
      this.gameService.getMap(gameId)
      this.actualGame = this.games[gameId];
  }
}
