import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { MatDialog } from '@angular/material/dialog';
import { DialogAddUserComponent } from '../dialog-add-user/dialog-add-user.component';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})

export class UserComponent implements OnInit {
  displayedColumns: string[] = ['name', 'birthdate', 'city'];
  allUsers = [];

  constructor(
    public dialog: MatDialog,
    private firestore: AngularFirestore,
  ) { }

  ngOnInit(): void {
    this.firestore
      .collection('users')
      .valueChanges({ idField: 'customIdName' })
      .subscribe((changes: any) => {
        this.allUsers = changes;
        //after this, every function with this.allUsers have to be INSIDE this subcribe.
        this.birthDateToDateForm();
      });
  }

  birthDateToDateForm() {
    this.allUsers.forEach((element: any) => {
      let d = new Date(element.birthDate);
      element.birthDate = d.getDate() + '.' + d.getMonth() + '.' + d.getFullYear();
    });
  }


  openDialog(): void {
    const dialogRef = this.dialog.open(DialogAddUserComponent);
  }
}
