import { DatePipe } from '@angular/common';
import { Injectable } from '@angular/core';
import * as moment from 'moment';
import { ConfigService } from './config.service';
import { Timestamp } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class DateService {
  constructor(private configService: ConfigService) {
    moment.locale(this.configService.getConfig().dateLocale);
  }
// string format should be yyyy-MM-dd
  convertStringToDate(str: string): any {
    if(moment(str, "YYYY-MM-DD", true).isValid()){
        return new Date(str);
    }
    return null;    
  }

  getDate(date: Date){
    return moment(date).date();
  }

  getMonth(date: Date){
    return moment(date).format('MM');
  }

  getShortMonth(date: Date){
    return moment(date).format('MMM');
  }

  getLongMonth(date: Date){
    return moment(date).format('MMMM');
  }

  getYear(date: Date){
    return moment(date).year();
  }

  formatDate(date: Date, format: string): any {
        return moment(date).format(format);
  }

  addDays(date: Date, value: number): any {
    if(moment(date, "YYYY-MM-DD", true).isValid()){
        return moment(date).add(value, 'days');
    }
    return null;    
  }

  addMonths(date: Date, value: number): any {
    if(moment(date, "YYYY-MM-DD", true).isValid()){
        return moment(date).add(value, 'months');
    }
    return null;    
  }

  addYears(date: Date, value: number): any {
    if(moment(date, "YYYY-MM-DD", true).isValid()){
        return moment(date).add(value, 'years');
    }
    return null;    
  }

  dateDiffDays(date1: Date, date2: Date, type: string ){
    if(moment(date1, "YYYY-MM-DD", true).isValid() && moment(date2, "YYYY-MM-DD", true).isValid()){
        return moment(date1).diff(moment(date2), 'days');
    }
    return null;    
  }

  dateDiffMonths(date1: Date, date2: Date, type: string ){
    if(moment(date1, "YYYY-MM-DD", true).isValid() && moment(date2, "YYYY-MM-DD", true).isValid()){
        return moment(date1).diff(moment(date2), 'months');
    }
    return null;    
  }

}