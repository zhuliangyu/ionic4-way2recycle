import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: "root"
})
export class ApiService {
  // TODO
  constructor(private httpClient: HttpClient) {}

  // API_KEY = "5c56718d5646475485e3039a3ab204b0";

  getNews() {
    return this.httpClient.get(
      // `https://newsapi.org/v2/top-headlines?sources=techcrunch&apiKey=${
      //   this.API_KEY
      // }`
      "http://localhost:3000/v1/items"
    );
  }

  getOneNews(id) {
    return this.httpClient.get(
      // `https://newsapi.org/v2/top-headlines?sources=techcrunch&apiKey=${
      //   this.API_KEY
      // }`
      "http://localhost:3000/v1/item/" + id
    );
  }
}
