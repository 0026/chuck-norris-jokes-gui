import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class JokeService {
  jokeUrl = "https://api.icndb.com";
  constructor(private http: HttpClient) { }

  getRandomJoke() {
    return this.http.get<any>(this.jokeUrl + "/jokes/random")
  }

  getRandomJokeWithParams(paramsMap: Map<string, string>) {
    let allParams = new HttpParams();
    paramsMap.forEach((value: string, key: string) => {
      allParams = allParams.append(key, value);
    })
    return this.http.get<any>(this.jokeUrl + "/jokes/random", { params: allParams })
  }

  getManyJokes(amount:number){
    return this.http.get<any>(this.jokeUrl + "/jokes/random/"+amount.toString())
  }
}
