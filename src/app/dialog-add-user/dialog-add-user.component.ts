import { Component, OnInit } from '@angular/core';
import { User } from 'src/models/user.class';

@Component({
  selector: 'app-dialog-add-user',
  templateUrl: './dialog-add-user.component.html',
  styleUrls: ['./dialog-add-user.component.scss']
})
export class DialogAddUserComponent implements OnInit {
  user = new User();
  birthDate!: Date;

  constructor() { }

  ngOnInit(): void {
  }

  saveUser(){
    this.user.birthDate = this.birthDate.getTime(); //the birthDate is getted from inputfield, changed to be timemstamp milisecond, and assigned in user.
    console.log(this.user);
    
  }

}
