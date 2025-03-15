import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ContactDetails } from 'src/app/shared/model/site.model';
import { ConfigService } from 'src/app/shared/service/config.service';
import { FirestoreDataService } from 'src/app/shared/service/firestore.data.service';
import { NotificationService } from 'src/app/shared/service/notification.service';

@Component({
  selector: 'app-contact-form',
  templateUrl: './contact-form.component.html',
  styleUrls: ['./contact-form.component.scss']
})
export class ContactFormComponent {
  contactForm: FormGroup;
  submitted = false;
  contactDetails: ContactDetails = new ContactDetails();
  path: string = this.configService.getCollectionPath()+'/contacts';
  showSuccess: boolean = false;
  showError: boolean = false;

  constructor(private formBuilder: FormBuilder, private dataService: FirestoreDataService
        , private configService: ConfigService) {
  }

  ngOnInit() {
    this.contactForm = this.formBuilder.group({
      email: new FormControl<string | null>("", {
        validators: [Validators.required, Validators.email]
      }),
      name: new FormControl<string | null>("", {
        validators: [Validators.required, Validators.minLength(2)]
      }),
      content: new FormControl<string | null>(""),
      contactNo: new FormControl<string | null>("")
    });

    
  }

  // convenience getter for easy access to form fields
  get f() { return this.contactForm.controls; }

  onSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.contactForm.invalid) {
      return;
    }

    this.contactDetails = Object.assign(this.contactDetails, this.contactForm.value);

    // display form values on success

    this.dataService.saveContacts(this.path, JSON.parse(JSON.stringify(this.contactDetails)) ).then((res) =>{
      if(res == "unknown"){
        //this.notificationService.notifyError("Problem while processing. Please try again later");
        this.showError = true;
        this.showSuccess = false;
      }
      else{
        //this.notificationService.notifySuccess("Details successfully saved.")
        //this.resetForm();
        this.showSuccess = true;
        this.showError = false;
      }      
    });

  }

  resetForm() {
    this.submitted = false;
    this.showSuccess = false;
    this.showError = false;
    this.contactForm.reset();
  }

}
