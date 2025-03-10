import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { WebsiteDetails } from 'src/app/shared/model/site.model';
import { ConfigService } from 'src/app/shared/service/config.service';
import { DataService } from 'src/app/shared/service/data.service';
import { DateService } from 'src/app/shared/service/date.service';
import { FirestoreDataService } from 'src/app/shared/service/firestore.data.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent {
	websiteDetails: WebsiteDetails = new WebsiteDetails();
  path = this.configService.getDocPath() + '/websiteDetails';
  currYear: number;

	constructor(private dataService: FirestoreDataService, private configService: ConfigService, private dateService: DateService) {}

  ngOnInit() {
		this.getData();
    this.currYear = this.dateService.getYear(new Date());
	}

  getData(): void {
    this.dataService.getDocData<WebsiteDetails>(this.path).then((res)=>{
      this.websiteDetails = res;
    });
  }
}
