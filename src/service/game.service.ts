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
    return this.http.get<Game>(this.gameUrl + "/" + mapId)
  }

  // public getRowTabOfTrue(mapId: string){
  //   return this.http.get<string[]>(this.gameUrl + "/" + mapId + "/row/")
  // }

  // public getColTabOfTrue(mapId: string){
  //   return this.http.get<string[]>(this.gameUrl + "/" + mapId + "/col/")
  // }

  // public checkElement(mapId: string, row:number, col:number){
  //   return this.http.post<Game[]>(this.gameUrl + "/"+mapId, {row, col});
  // }
}
