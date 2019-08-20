import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Article } from "./article.model";

@Injectable({
  providedIn: "root"
})
export class ApiService {
  // TODO
  constructor(private httpClient: HttpClient) {}

  // API_KEY = "5c56718d5646475485e3039a3ab204b0";

  getNews() {
    return this.httpClient.get(
    
      // "http://localhost:3000/v1/items"
      "https://way2recycle.herokuapp.com/v1/items"
    );
  }

  getOneNews(id) {
    return this.httpClient.get<Article>(

      // "http://localhost:3000/v1/item/" + id
      "https://way2recycle.herokuapp.com/v1/item/" + id
    );
  }
}
