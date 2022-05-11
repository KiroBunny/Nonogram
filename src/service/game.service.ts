import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Game } from 'src/model/game';

@Injectable({
  providedIn: 'root'
})
export class GameService {
  
    private gameUrl: string;

  constructor(private http: HttpClient) {
    this.gameUrl = 'http://localhost:8080/games';
  }

  public findAll(): Observable<Game[]> {
    return this.http.get<Game[]>(this.gameUrl);
  }

  public getMap(mapId: string){
    console.log("jhdsfcbdxjhvxk;c");
    return this.http.get<Game>(this.gameUrl + "/" + mapId)
  }

  public checkElement(mapId: string, row:number, col:number){
    return this.http.post<Game[]>(this.gameUrl + "/"+mapId, {row, col});
  }

  getColNumber(game: Game): String[][] {
    let colNumber:String[][];
    /* let n:string;
    let i:number;
    for(let row = 0; row < game.size; row++){
      for(let col = 0; col < game.size; col++){
        if(game.tab[row][col] == 1){ 
          i++;
        }
        else if(game.tab[row][col] == 0){
          if(i >0){
            colNumber[row][col]+= "" + i;
          }

          i=0;
        }
      }
      i=0;
      n = "";
    } */

    return colNumber;
  }

  getRowNumber(game: Game): String[][] {
    let rowNumber:String[][];
    /* let n:string;
    let i:number;
    for(let col = 0; col < game.size; col++){
      for(let row = 0; row < game.size; row++){ 
        if(game.tab[row][col] == 1){ 
          i++;
        }
        else if(game.tab[row][col] == 0){
          if(i >0){
            rowNumber[row][col]+= "" + i;
          }

          i=0;
        }
      }
      i=0;
      n = "";
    } */

    return rowNumber;
  }
}
