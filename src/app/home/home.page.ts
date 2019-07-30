import { Component } from "@angular/core";
import { ApiService } from "../api.service";
import { DomSanitizer } from "@angular/platform-browser";

@Component({
  selector: "app-home",
  templateUrl: "home.page.html",
  styleUrls: ["home.page.scss"]
})
export class HomePage {
  constructor(
    private apiService: ApiService,
    private _sanitizer: DomSanitizer
  ) {}
  articles;
  new_articles;

  fetch(event) {
    this.apiService.getNews().subscribe(data => {
      console.log(data);
      this.articles = data;
      // console.log(this.articles);

      // parse array
      this.new_articles = this.articles.map(my_json => {
        return {
          id: my_json._id,
          title: my_json.title,
          price: my_json.price,
          category: my_json.category,
          description: my_json.description,
          location: my_json.locationStr,
          published_date: my_json.date,
          safeImagePath: this._sanitizer.bypassSecurityTrustResourceUrl(
            my_json.imagePreviewUrl
          )
        };
      });
    });

    if (event) {
      event.target.complete();
    }
  }
  ionViewDidEnter() {
    if (this.articles == null) {
      this.fetch(null);
      // this.apiService.getNews().subscribe(data => {
      //   console.log(data);
      //   this.articles = data;
      //   // console.log(this.articles);

      //   // parse array
      //   this.new_articles = this.articles.map(my_json => {
      //     return {
      //       id: my_json._id,
      //       title: my_json.title,
      //       price: my_json.price,
      //       category: my_json.category,
      //       description: my_json.description,
      //       location: my_json.locationStr,
      //       published_date: my_json.date,
      //       safeImagePath: this._sanitizer.bypassSecurityTrustResourceUrl(
      //         my_json.imagePreviewUrl
      //       )
      //     };
      //   });
      // });
    }
  }

  doRefresh(event) {
    // // console.log("Begin async operation");
    // this.apiService.getNews().subscribe(data => {
    //   // console.log(data);
    //   // this.articles = data["articles"];
    //   this.articles = data;
    //   event.target.complete();
    //   // console.log("Async operation has ended");
    // });
    this.fetch(event);
  }
}
