import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { WebSite } from 'src/app/shared/model/site.model';
import { DataService } from 'src/app/shared/service/data.service';
import { ConfigService } from '../../service/config.service';
import { FirestoreDataService } from '../../service/firestore.data.service';

@Component({
  selector: 'app-social-sites',
  templateUrl: './social-sites.component.html',
  styleUrls: ['./social-sites.component.scss']
})
export class SocialSitesComponent {
	socialsites: WebSite[] = [];
	path: string = this.configService.getCollectionPath() + '/socialSites';

	constructor(private dataservice: FirestoreDataService, private configService: ConfigService) {}

  ngOnInit() {
		this.getSocialsites();
	}

	getSocialsites(): void {
		this.dataservice.getCollectionData<WebSite>(this.path).then((res)=>{
			this.socialsites = res;
		});
	}
}
