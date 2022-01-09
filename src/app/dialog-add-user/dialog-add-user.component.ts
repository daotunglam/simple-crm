import { Component, OnInit } from '@angular/core';
import { User } from 'src/models/user.class';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { MatDialogRef } from '@angular/material/dialog';


@Component({
  selector: 'app-dialog-add-user',
  templateUrl: './dialog-add-user.component.html',
  styleUrls: ['./dialog-add-user.component.scss']
})
export class DialogAddUserComponent implements OnInit {
  user = new User();
  birthDate!: Date;
  loading = false;

  constructor(
    private firestore: AngularFirestore,
    public dialogRef: MatDialogRef<DialogAddUserComponent>,
    ) { }

  ngOnInit(): void {
  }

  saveUser() {
    this.user.birthDate = this.birthDate.getTime(); //the birthDate is getted from inputfield, changed to be timemstamp milisecond, and assigned in user.

    this.loading = true;
    this.firestore
      .collection('users')
      .add(this.user.toJSON())
      .then((result) => {
        console.log('user in firestore added', result);
        this.loading = false;
        this.dialogRef.close();
      })
  }

}
