import { Component } from '@angular/core';

import { Education } from 'src/app/shared/model/site.model';
import { ConfigService } from 'src/app/shared/service/config.service';
import { DataService } from 'src/app/shared/service/data.service';
import { DateService } from 'src/app/shared/service/date.service';
import { FirestoreDataService } from 'src/app/shared/service/firestore.data.service';

@Component({
  selector: 'app-education',
  templateUrl: './education.component.html',
  styleUrls: ['./education.component.scss']
})
export class EducationComponent {
  public data: Education[] = [];
  title = 'Home';
  path = this.configService.getCollectionPath() + '/education';


	constructor(private configService: ConfigService, private dateService: DateService, private db: FirestoreDataService) {
    this.getData();    
  }

	async getData(): Promise<void> {
    await this.db.getCollectionData<Education>(this.path, 'id', 'desc').then((res)=>{
      this.data = res;
    });
	}
}
