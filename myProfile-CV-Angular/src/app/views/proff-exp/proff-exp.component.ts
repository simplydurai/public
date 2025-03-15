import { Component } from '@angular/core';
import { Experience } from 'src/app/shared/model/site.model';
import { ConfigService } from 'src/app/shared/service/config.service';
import { DataService } from 'src/app/shared/service/data.service';
import { DateService } from 'src/app/shared/service/date.service';
import { FirestoreDataService } from 'src/app/shared/service/firestore.data.service';

@Component({
  selector: 'app-proff-exp',
  templateUrl: './proff-exp.component.html',
  styleUrls: ['./proff-exp.component.scss']
})
export class ProffExpComponent {
  public data: Experience[] = [];
  title = 'Home';
  path = this.configService.getCollectionPath() + '/professionalExperience';

  constructor(private dataService: FirestoreDataService, private dateService: DateService, private configService: ConfigService ) {
    this.getData();
  }

	getData(): void {
    this.dataService.getCollectionData<Experience>(this.path, 'id', 'desc').then((res)=>{
      this.data = res;
    });
	}

  getYearFromDateString(str: string){
    if(str == ""){
      return "Current"
    }
    return this.dateService.getYear(this.dateService.convertStringToDate(str));
  }

  getMonthFromDateString(str: string){
    if(str == ""){
      return "";
    }
    return this.dateService.getShortMonth(this.dateService.convertStringToDate(str));
  }

  convertStringToDate(str: string){
    if(str == ""){
      return "";
    }
    return this.dateService.convertStringToDate(str);
  }

}
