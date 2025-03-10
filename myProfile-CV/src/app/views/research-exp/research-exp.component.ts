import { Component } from '@angular/core';
import { Experience, Publications } from 'src/app/shared/model/site.model';
import { ConfigService } from 'src/app/shared/service/config.service';
import { DateService } from 'src/app/shared/service/date.service';
import { FirestoreDataService } from 'src/app/shared/service/firestore.data.service';

@Component({
  selector: 'app-research-exp',
  templateUrl: './research-exp.component.html',
  styleUrls: ['./research-exp.component.scss']
})
export class ResearchExpComponent {
  public data: Experience[] = [];
  public publications: Publications[] = [];

  title = 'Home';
  researchpath = this.configService.getCollectionPath() + '/researchExperience';
  publicationspath = this.configService.getCollectionPath() + '/publications';


  constructor(private dataService: FirestoreDataService, private dateService: DateService, private configService: ConfigService ) {
    this.getData();
    this.getPublications();
  }

	getData(): void {
    this.dataService.getCollectionData<Experience>(this.researchpath, 'id', 'desc').then((res)=>{
      this.data = res;
    });
	}

  getPublications(): void {
    this.dataService.getCollectionData<Publications>(this.publicationspath).then((res)=>{
      this.publications = res;
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
