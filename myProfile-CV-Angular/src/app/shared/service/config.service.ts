import { Injectable } from '@angular/core';
import {  appConfig } from '../providers/app.config';

@Injectable({
  providedIn: 'root'
})
export class ConfigService {
  config = appConfig;
  constructor() {}

  getConfig() {
    return this.config;
  }

  getConfigByKeyWord(keyword: string) {
    return this.config;
  }

  getCollectionPath(){
    return this.config.user+'/'+ this.config.subCollection;
  }

  getDocPath(){
    return this.config.user;
  }
}
