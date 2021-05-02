import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { ContactList } from '../models/contactList'

@Injectable({
  providedIn: 'root'
})
export class ContactService {

  dataSource = [];
  constructor() { }

  getContacts() {
    this.dataSource = ContactList();
    return of(this.dataSource);
  }

  add(data) {
    this.dataSource.push(data);
  }

  update(data) {
  
    this.dataSource.map((element, index) => {
      if(data.id == element.id){
       
        this.dataSource[index] = data;
      }
      console.log(element)
    });
    console.log(this.dataSource);
  }
  delete(index){
    this.dataSource.splice(index,1);
  };
}
