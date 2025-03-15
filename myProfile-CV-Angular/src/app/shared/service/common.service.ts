import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Injectable, inject } from '@angular/core';
import { Event, NavigationEnd, Router } from '@angular/router';
import { BehaviorSubject, Observable, map, shareReplay } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class CommonService {
    private breakpointObserver = inject(BreakpointObserver);    
    private result: Observable<boolean> = new Observable<boolean>();

    get isMobileDevice() {        
        this.result = this.breakpointObserver.observe(Breakpoints.Handset)
        .pipe(
          map(result => result.matches),
          shareReplay()
        );
        return this.result;
      }

      get IsWebDevice() {        
        this.result = this.breakpointObserver.observe(Breakpoints.Web)
        .pipe(
          map(result => result.matches),
          shareReplay()
        );
        return this.result;
      }

      get IsTabletDevice() {        
        this.result = this.breakpointObserver.observe(Breakpoints.Tablet)
        .pipe(
          map(result => result.matches),
          shareReplay()
        );
        return this.result;
      }

      get IsTabletPortraitDevice() {        
        this.result = this.breakpointObserver.observe(Breakpoints.TabletPortrait)
        .pipe(
          map(result => result.matches),
          shareReplay()
        );
        return this.result;
      }
}