import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { NavController } from "@ionic/angular";
import { ApiService } from "../api.service";
import { DomSanitizer } from "@angular/platform-browser";
import { Article } from "../article.model";

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

  article = {
    _id: "",
    user_id: "",
    title: "",
    price: "",
    category: "",
    description: "",
    locationStr: "",
    date: "",
    imagePreviewUrl: null
  };
  newArticle = {};

  //todo
  formatDate(date) {
    var monthNames = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December"
    ];

    var day = date.getDate();
    var monthIndex = date.getMonth();
    var year = date.getFullYear();

    return day + " " + monthNames[monthIndex] + " " + year;
  }

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get("id");
    // console.log(id);
    this.apiService.getOneNews(id).subscribe(data => {
      console.log(data);
      this.article.title = data.title;
      this.article._id = data._id;
      this.article.user_id = data.user_id;
      this.article.price = data.price;
      this.article.category = data.category;
      this.article.description = data.description;
      this.article.locationStr = data.locationStr;
      this.article.date = data.date;
      this.article.imagePreviewUrl = this._sanitizer.bypassSecurityTrustResourceUrl(
        data.imagePreviewUrl
      );

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

      // this.newArticle = {
      //   title: this.article.title,
      //   price: this.article.price,
      //   category: this.article.category,
      //   description: this.article.description,
      //   location: this.article.locationStr,
      //   published_date: this.article.date,
      //   safeImagePath: this._sanitizer.bypassSecurityTrustResourceUrl(
      //     this.article.imagePreviewUrl
      //   )
      // };
    });
  }

  onGoBack() {
    this.navCtrl.navigateBack("/home");
  }
}
