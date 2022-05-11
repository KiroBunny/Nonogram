import { Component, AfterContentInit, OnInit, ViewChild, ElementRef } from '@angular/core';
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
  lista: boolean;
  colNumber: String[][];
  rowNumber: String[][];

  @ViewChild('canvas', { static: true })
  canvas: ElementRef<HTMLCanvasElement>; 
  private ctx: CanvasRenderingContext2D; 

  constructor(private gameService: GameService) {
      this.lista = true;
   }

  ngOnInit(): void {
    this.gameService.findAll().subscribe(_games =>{
      this.games = _games
    });
  }

  getGame(gameId: string) {
    console.log(this.canvas.nativeElement.nodeValue);
      this.gameService.getMap(gameId)
      this.actualGame = this.games[gameId];
      this.lista=false;
      this.colNumber = this.gameService.getColNumber(this.actualGame);
      this.rowNumber = this.gameService.getRowNumber(this.actualGame);
      this.draw();
  }

  draw() {
    this.ctx = this.canvas.nativeElement.getContext('2d');
    
      var x = 100;
      var y = 100;
      var wh = 500/this.actualGame.size;
      // list of rectangles to render
      var rects = [{x: x, y: y, w: wh, h: wh}];
      for (var i = 0; i < wh; i++) {
        for (var j = 0; j < wh; j++) {
          rects.push({x: x, y: y, w: wh, h: wh})
          x+=wh;
        }
        y+= wh;
        x = 100;
      }
    // get context
    if (this.ctx) {
  
        for (var i = 0, len = rects.length; i < len; i++) {
          this.ctx.strokeRect(rects[i].x, rects[i].y, rects[i].w, rects[i].h);
        }
  
    }
      
      // listener, using W3C style for example    
      this.canvas.nativeElement.addEventListener('click', function(e) {
          console.log('click: ' + e.offsetX + '/' + e.offsetY);
          var rect =  GameListComponent.collides(rects, e.offsetX, e.offsetY);
          if (rect) {
              console.log("collision: " + rect + '/');
          } else {
              console.log('no collision');
          }
      }, false);
  
  }
  static collides(rects, offsetX: number, offsetY: number) {
    var isCollision = false;
    for (var i = 0, len = rects.length; i < len; i++) {
        var left = rects[i].x, right = rects[i].x+rects[i].w;
        var top = rects[i].y, bottom = rects[i].y+rects[i].h;
        if (right >= offsetX
            && left <= offsetX
            && bottom >= offsetY
            && top <= offsetY) {
            isCollision = rects[i];
        }
    }
    return isCollision;
  }

  collides(rects, x, y) {
    var isCollision = false;
    for (var i = 0, len = rects.length; i < len; i++) {
        var left = rects[i].x, right = rects[i].x+rects[i].w;
        var top = rects[i].y, bottom = rects[i].y+rects[i].h;
        if (right >= x
            && left <= x
            && bottom >= y
            && top <= y) {
            isCollision = rects[i];
        }
    }
    return isCollision;
}
}
