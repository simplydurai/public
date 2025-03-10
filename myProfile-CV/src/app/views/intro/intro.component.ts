import { Component } from '@angular/core';
import { AboutMeDetail, PersonalDetails, WhatIDoDetail } from 'src/app/shared/model/site.model';
import { ConfigService } from 'src/app/shared/service/config.service';
import { DataService } from 'src/app/shared/service/data.service';
import { FirestoreDataService } from 'src/app/shared/service/firestore.data.service';

@Component({
  selector: 'app-intro',
  templateUrl: './intro.component.html',
  styleUrls: ['./intro.component.scss']
})
export class IntroComponent {
  public data: PersonalDetails;
  aboutMe: AboutMeDetail[] = [];
  whatIdo: WhatIDoDetail[] = [];
  title = 'Home';
  path = this.configService.getDocPath() + '/personalDetails';

	constructor(private dataService: FirestoreDataService, private configService: ConfigService) {
    this.getData();
  }

  async getData(): Promise<void> {
    await this.dataService.getDocData<PersonalDetails>(this.path).then((res)=>{
      this.data = res;
      this.aboutMe = res.aboutMe;
      this.whatIdo = res.whatIDo;
    });
	}
}
