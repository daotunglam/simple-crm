import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { User } from 'src/models/user.class';
import { DialogEditUserComponent } from '../dialog-edit-user/dialog-edit-user.component';

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
    private firestore: AngularFirestore,
    public dialog: MatDialog,
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
    if (this.userId) {
      this.firestore
        .collection('users')
        .doc(this.userId)
        .valueChanges()
        .subscribe(user => {
          this.user = new User(user); //altanative: this.user = user;
          this.birthdateToDateForm();
        })
    }else{
      //throw ERROR
    }
  }

  birthdateToDateForm() {
    let d = new Date(this.user.birthDate);
    this.birthday = d.getDate() + '.' + d.getMonth() + '.' + d.getFullYear();
  }

  editUserDetail() {

    const dialogRef = this.dialog.open(DialogEditUserComponent); //open the dialog-edit-user and at the same time assign it the name 'dialogRef'

    //IMPORTANT:
    // 'new User(this.user)' below means: all user details that render on dialog-edit are COPY OF USER-DETAILS
    dialogRef.componentInstance.user = new User(this.user); //dialogRef.componentInstance.user is the syntax to call the variable 'user' from dialog-edit-user component.
    // otherwise when we just write: 'dialogRef.componentInstance.user = this.user',
    // and any detail is changed,
    // the render of user-detail-component will be changed with even by canceling dialog-edit.

    // new User(this.user.toJSON()) I don't see the sence of toJSON() here.

    dialogRef.componentInstance.userId = this.userId;

  }

}
