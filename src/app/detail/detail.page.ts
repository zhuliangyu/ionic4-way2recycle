import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { NavController } from "@ionic/angular";
import { ApiService } from "../api.service";
import { DomSanitizer } from "@angular/platform-browser";

@Component({
  selector: "app-detail",
  templateUrl: "./detail.page.html",
  styleUrls: ["./detail.page.scss"]
})
export class DetailPage implements OnInit {
  constructor(
    private route: ActivatedRoute,
    private navCtrl: NavController,
    private apiService: ApiService,
    private _sanitizer: DomSanitizer
  ) {}

  article = {};
  newArticle = {};

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get("id");
    // console.log(id);
    this.apiService.getOneNews(id).subscribe(data => {
      // console.log(data);
      this.article = data;
      // console.log(this.article);

      // parse array
      // this.article = this.article.map(my_json => {
      //   return {
      //     // id: my_json._id,
      //     // title: my_json.title,
      //     // price: my_json.price,
      //     // category: my_json.category,
      //     // description: my_json.description,
      //     // location: my_json.locationStr,
      //     // published_date: my_json.date,
      //     safeImagePath: this._sanitizer.bypassSecurityTrustResourceUrl(
      //       my_json.imagePreviewUrl
      //     )
      //   }
      // })

      this.newArticle = {
        title: this.article.title,
        price: this.article.price,
        category: this.article.category,
        description: this.article.description,
        location: this.article.locationStr,
        published_date: this.article.date,
        safeImagePath: this._sanitizer.bypassSecurityTrustResourceUrl(
          this.article.imagePreviewUrl
        )
      };
    });
  }

  onGoBack() {
    this.navCtrl.navigateBack("/home");
  }
}
