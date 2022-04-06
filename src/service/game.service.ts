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
}
