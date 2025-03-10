import { Component, ElementRef, HostListener, Inject, QueryList, ViewChild, ViewChildren, inject } from '@angular/core';
import { NavItem } from './shared/model/layout.model';
import * as AOS from 'aos';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable, map, shareReplay } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { FirestoreDataService } from './shared/service/firestore.data.service';
import { ConfigService } from './shared/service/config.service';
import { DOCUMENT } from '@angular/common';



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Home';
  path = this.configService.getCollectionPath() + '/menu';
  windowScrolled: boolean;

  public menu: NavItem[] = [];

  @ViewChild('myOverlay') myOverlay!: ElementRef<HTMLInputElement>;
  @ViewChild('mySidebar') mySidebar!: ElementRef<HTMLInputElement>;

  constructor(private configService: ConfigService, private route: ActivatedRoute
    , private db: FirestoreDataService) {
      this.getMenu();

      this.route.queryParamMap
      .subscribe(params => {
        if(params.has(this.configService.config.createDbString)) {
          console.log('Currently creating/updating DB');
          this.createDB();
        }
      });

  }

  @HostListener("window:scroll", [])
  onWindowScroll() {
      if (window.scrollY || document.documentElement.scrollTop || document.body.scrollTop > 100) {
          this.windowScrolled = true;
      } 
     else if (this.windowScrolled && window.scrollY || document.documentElement.scrollTop || document.body.scrollTop < 10) {
          this.windowScrolled = false;
      }
  }

  ngOnInit() { 
    AOS.init({
      duration: 1200,
    });
  }

  async createDB(): Promise<void> {
    await this.db.createDB();
  }
  
    async getMenu() {
      try{
        await this.db.getCollectionData<NavItem>(this.path).then((res)=>{
          this.menu= res;
        });
      }
      catch(error){
        this.db.handleError("menu", error);
      }    
    }

    scrollToTop(): void {
      window.scrollTo(0, 0);      
    }

  w3_open(){
    if (this.mySidebar.nativeElement.style.display === 'block') {
      this.mySidebar.nativeElement.style.display = 'none';
      this.myOverlay.nativeElement.style.display = "none";
    } else {
      this.mySidebar.nativeElement.style.display = 'block';
      this.myOverlay.nativeElement.style.display = "block";
    }
  }

  w3_close(){
    this.mySidebar.nativeElement.style.display = "none";
    this.myOverlay.nativeElement.style.display = "none";
  }
}