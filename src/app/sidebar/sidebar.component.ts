import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FlatTreeControl } from '@angular/cdk/tree';
import { MatTreeFlatDataSource, MatTreeFlattener } from '@angular/material/tree';
import { MatDialog } from '@angular/material/dialog';
import { DialogAddChannelComponent } from '../dialog-add-channel/dialog-add-channel.component';


/**
 * Food data with nested structure.
 * Each node has a name and an optional list of children.
 */
interface FoodNode {
  name: string;
  children?: FoodNode[];
}



/** Flat node with expandable and level information */
interface ExampleFlatNode {
  expandable: boolean;
  name: string;
  level: number;
}


@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})

export class SidebarComponent implements OnInit {
  allChannels = [];
  TREE_DATA: FoodNode[] = [

    {
      name: 'Channels',
      children: [
        { name: 'example1' },
        { name: 'example2' },
        { name: 'example3' },
      ],
    },
  
    {
      name: 'Direct messages',
      children: [
        { name: 'Mihi', },
        { name: 'Junu', },
        { name: 'Mana', },
      ],
    },
  
  ];
  private _transformer = (node: FoodNode, level: number) => {
    return {
      expandable: !!node.children && node.children.length > 0,
      name: node.name,
      level: level,
    };
  };

  treeControl = new FlatTreeControl<ExampleFlatNode>(
    node => node.level,
    node => node.expandable,
  );

  treeFlattener = new MatTreeFlattener(
    this._transformer,
    node => node.level,
    node => node.expandable,
    node => node.children,
  );

  dataSource = new MatTreeFlatDataSource(this.treeControl, this.treeFlattener);

  constructor(
    public dialog: MatDialog,
    private firestore: AngularFirestore,
  ) {
    this.dataSource.data = this.TREE_DATA;
  }

  hasChild = (_: number, node: ExampleFlatNode) => node.expandable;

  ngOnInit(): void {
    this.firestore
      .collection('channels')
      .valueChanges({ idField: 'customIdName' })
      .subscribe((changes: any) => {
        this.allChannels = changes;
        console.log('allChannels', this.allChannels);

        this.allChannels.forEach((channel: any) => {
          console.log('Update Three data', this.TREE_DATA);
          this.TREE_DATA[0].children?.push({ 'name': channel.name })
        })
        
        console.log('tree channels',this.TREE_DATA[0].children);
      })
  }



  openDialog(): void {
    const dialogRef = this.dialog.open(DialogAddChannelComponent);
  }


}
