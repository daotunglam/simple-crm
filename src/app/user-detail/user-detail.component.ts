import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { ActivatedRoute } from '@angular/router';
import { User } from 'src/models/user.class';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.scss']
})

export class UserDetailComponent implements OnInit {

  userId: any;
  user: User = new User(); //altanative: user: any = {}; 
  birthday: any;
  
  constructor(
    private route: ActivatedRoute, 
    private firestore: AngularFirestore
    ) { }

  ngOnInit(): void {
    this.getIdFromRoute()
    this.getUserFromFirebaseById()
  }

  getIdFromRoute() {
    this.route.paramMap.subscribe(params => {
      this.userId = params.get('id');
    });
  }

  getUserFromFirebaseById() {
    this.firestore
    .collection('users')
    .doc(this.userId)
    .valueChanges()
    .subscribe(user=>{
      this.user = new User(user); //altanative: this.user = user;
      this.birthdateToDateForm();
    })
  }

  birthdateToDateForm() {
    let d = new Date(this.user.birthDate);
    this.birthday = d.getDate() + '.' + d.getMonth() + '.' + d.getFullYear();
  }

}
