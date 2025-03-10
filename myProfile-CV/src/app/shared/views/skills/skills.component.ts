import { Component } from '@angular/core';
import { Skills } from '../../model/site.model';
import { FirestoreDataService } from '../../service/firestore.data.service';
import { ConfigService } from '../../service/config.service';

@Component({
  selector: 'app-skills',
  templateUrl: './skills.component.html',
  styleUrls: ['./skills.component.scss']
})
export class SkillsComponent {
  data: Skills[] = [];
  path: string = this.configService.getCollectionPath() + '/softwareSkills';
  skillscnt: number =0;


	constructor(private dataservice: FirestoreDataService, private configService: ConfigService) {}

  ngOnInit() {
		this.getData();
	}

	getData(): void {
    this.dataservice.getCollectionData<Skills>(this.path).then((res)=>{
      this.data = res;
      this.skillscnt = this.data.length > 0? (this.data.length %2 == 0? this.data.length/2: (this.data.length+1)/2) : 0;
    });
	}
}
