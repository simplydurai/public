import { Injectable } from '@angular/core';
import { Observable, catchError, of } from 'rxjs';
import { databaseConfig, appConfig } from '../providers/app.config';
import { DocumentData, DocumentReference, Firestore, OrderByDirection, Timestamp, addDoc, collection, doc, getDoc, getDocs, orderBy, query, serverTimestamp, setDoc, updateDoc, where } from '@angular/fire/firestore';
import { FirebaseStorage, getDownloadURL, getStorage, ref } from '@angular/fire/storage';
import { ContactDetails } from '../model/site.model';

@Injectable({
  providedIn: 'root'
})

export class FirestoreDataService {
  appconfig = appConfig;
  config = databaseConfig;
  user: string = this.appconfig.user;
  collectionKeyWord: string = this.appconfig.subCollection;

  constructor(private db: Firestore) { }

  public handleError<T>(operation = 'operation', result?: T) {
    return (error: Error): Observable<T> => {
      console.error(error);
      console.log(`${operation} failed: ${error.message}`);
      return of(result as T);
    };
  }

  async createDB() {
    await this.createCollection(this.config.education, 'education');
    await this.createCollection(this.config.publications, 'publications');
    await this.createCollection(this.config.achievements, 'achievements');
    await this.createCollection(this.config.personalskills, 'personalSkills');
    await this.createCollection(this.config.softwareskills, 'softwareSkills');
    await this.createCollection(this.config.achievements, 'achievements');
    await this.createCollection(this.config.researchExp, 'researchExperience');
    await this.createCollection(this.config.industryExp, 'professionalExperience');
    await this.createCollection(this.config.achievements, 'achievements');
    await this.createCollection(this.config.menu, 'menu');
    await this.createCollection(this.config.socialsites, 'socialSites');

    await this.createDoc(this.config.personaldetails, 'personalDetails');
    await this.createDoc(this.config.websitedetails, 'websiteDetails');
  }

  async saveContacts(path: string, data: any) {
      try {
        const docRef = await addDoc(collection(this.db, path), data);
        await this.updateTimeStamp(docRef);
        await this.addReference(docRef, docRef.id.toString());
        return docRef.id;
      } catch (error) {
        console.error(error);
        return 'unknown';
      }
  }

  async createCollection(data: any[], elename: string) {
    data.forEach(async (ele, index) => {
      ele.id = index + 1;
      var path = this.collectionKeyWord + '/' + elename + '/' + ele.id.toString();
      var docRef = doc(this.db, this.user, path);

      await setDoc(docRef, ele, { merge: true });
      await this.updateTimeStamp(docRef);
      await this.addReference(docRef, ele.id.toString());
    });
  }


  async createDoc(data: any, elename: string) {
    var docRef = doc(this.db, this.user, elename);

    await setDoc(docRef, data, { merge: true });
    await this.updateTimeStamp(docRef);
    await this.addReference(docRef, elename);
  }

  async updateTimeStamp(docRef: DocumentReference<DocumentData, DocumentData>) {
    await updateDoc(docRef, {
      timestamp: serverTimestamp()
    });
  }

  async addReference(docRef: DocumentReference<DocumentData, DocumentData>, ref: string) {
    await updateDoc(docRef, {
      reference: ref
    });
  }

  async getCollectionData<T>(path: string, sortField: string = 'id', sortDirection: OrderByDirection = 'asc') {
    return (
      await getDocs(query(collection(this.db, path), orderBy(sortField, sortDirection)))
    ).docs.map<T>((resp) => resp.data() as T);
  }

  async getDocData<T>(path: string) {
    return (
      await getDoc(doc(this.db, path))
    ).data() as T;
  }


  async getDatabyId<T>(path: string, id: string = '') {
    return (
      await getDocs(query(collection(this.db, path), where("id", "==", id)))
    ).docs.map<T>((resp) => resp.data() as T);
  }

  async getFileURL(filename: string, path: string = '/') {
    const storage = getStorage();
    const pathReference = ref(storage, path + filename);

    // Get the download URL
    return await getDownloadURL(pathReference);
  }
}
