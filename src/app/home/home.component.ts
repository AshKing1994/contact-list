import { Component, OnInit } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CreateContactComponent } from '../create-contact/create-contact.component';
import { ContactService } from '../service/contact.service'

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  contactList = [];
  constructor(private modalService: NgbModal, private contactService: ContactService) { }

  ngOnInit(): void {
    this.contactService.getContacts().subscribe(dataSource => {
      this.contactList = dataSource;
    });
  }
  open() {
    const modalRef = this.modalService.open(CreateContactComponent);
    modalRef.componentInstance.isAddMode = true;
  }
  edit(data) {
    const modalRef = this.modalService.open(CreateContactComponent);
    modalRef.componentInstance.isAddMode = false;
    modalRef.componentInstance.formData = data;
  }
  delete(index){
    this.contactService.delete(index);
  }
}
