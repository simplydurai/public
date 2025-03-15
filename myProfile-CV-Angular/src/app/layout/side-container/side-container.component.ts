import { Component } from '@angular/core';
import { PersonalDetails } from 'src/app/shared/model/site.model';
import { ConfigService } from 'src/app/shared/service/config.service';
import { DataService } from 'src/app/shared/service/data.service';
import { FirestoreDataService } from 'src/app/shared/service/firestore.data.service';

@Component({
  selector: 'app-side-container',
  templateUrl: './side-container.component.html',
  styleUrls: ['./side-container.component.scss']
})
export class SideContainerComponent {
  personaldetails: PersonalDetails = new PersonalDetails();
  title = 'Home';
  path = this.configService.getDocPath() + '/personalDetails';
  avatarUrl:string = '';
  resumeDoc:string = '';
  resumePdf:string = '';

  constructor(private dataService: FirestoreDataService, private configService: ConfigService) {
    this.getPersonalDetails();
  }
  getPersonalDetails(){
    this.dataService.getDocData<PersonalDetails>(this.path).then((res)=>{
      this.personaldetails = res;
      this.getAvatar();
      this.getResumeDoc();
      this.getResumePdf();
    });
  }

  getAvatar(){
    this.dataService.getFileURL(this.personaldetails.userImage).then((res)=>{
      this.avatarUrl = res;
    });
  }

  getResumeDoc(){
    this.dataService.getFileURL(this.personaldetails.docResumeUrl).then((res)=>{
      this.resumeDoc = res;
    });
  }

  getResumePdf(){
    this.dataService.getFileURL(this.personaldetails.pdfResumeUrl).then((res)=>{
      this.resumePdf = res;
    });
  }
}
