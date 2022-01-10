import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
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
    .valueChanges()
    .subscribe((changes:any)=>{
      this.allUsers = changes;
    })
  }

  
  openDialog(): void {
    const dialogRef = this.dialog.open(DialogAddUserComponent);

    dialogRef.afterClosed().subscribe(result => {
      console.log(result);
    });
  }
}
