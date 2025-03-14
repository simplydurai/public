import { Injectable } from '@angular/core';
import { Event, NavigationEnd, Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class NavService {
    private currentUrl = new BehaviorSubject<string>('');
    private viewPage: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

    constructor(private router: Router) {
        this.router.events.subscribe((event: Event) => {
            if (event instanceof NavigationEnd) {
                this.currentUrl.next(event.urlAfterRedirects);
            }
        });
    }

    public getCurrentUrl(): BehaviorSubject<string> {
        if (!this.currentUrl.value) {
            // handles redirect after login
            const url = this.router.url;
            this.currentUrl.next(url);
        }

        return this.currentUrl;
    }

    get isViewPage() {
        this.getCurrentUrl().subscribe(
            x=> {
              if(x === '/404' || x === '/500'){
                this.viewPage.next(false);
              }
              else{
                this.viewPage.next(true);
              }
          });
        return this.viewPage.asObservable();
      }
}