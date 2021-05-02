import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { ContactService } from '../service/contact.service'

@Component({
  selector: 'app-create-contact',
  templateUrl: './create-contact.component.html',
  styleUrls: ['./create-contact.component.css']
})
export class CreateContactComponent implements OnInit {

  @Input() isAddMode;
  @Input() formData;
  contactForm: FormGroup;
  submitted = false;
  loading = false;
  constructor(public activeModal: NgbActiveModal,
    private formBuilder: FormBuilder,
    private contactService: ContactService) { }

  ngOnInit(): void {
    this.contactForm = this.formBuilder.group({
      id: [this.formData ? this.formData.id : Math.floor(100000 + Math.random() * 900000)],
      firstName: [this.formData ? this.formData.name.split(' ')[0] : "", Validators.required],
      lastName: [this.formData ? this.formData.name.split(' ')[1] : "", Validators.required],
      phone: [this.formData ? this.formData.phone : "",[Validators.required, Validators.minLength(10), Validators.maxLength(10),Validators.pattern("^[0-9]*$")]],
      email: [this.formData ? this.formData.email : "", [Validators.email, Validators.required]],
      status: [this.formData ? this.formData.status : false, Validators.required]
    });
  }
  // convenience getter for easy access to form fields
  get f() { return this.contactForm.controls; }

  submit() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.contactForm.invalid) {
      return;
    }

    this.loading = true;
    this.contactForm.value.name = this.contactForm.value.firstName +' ' + this.contactForm.value.lastName;
    if (this.isAddMode) {
      this.createContact(this.contactForm.value);
    } else {
      this.updateContact(this.contactForm.value);
    }

    this.activeModal.close();
  }

  createContact(formData) {
  
    this.contactService.add(formData);
  }

  updateContact(formData) {
    this.contactService.update(formData);
  }

}
