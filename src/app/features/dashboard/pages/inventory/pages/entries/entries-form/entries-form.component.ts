import { Component, OnInit } from '@angular/core';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';

@Component({
  selector: 'app-entries-form',
  templateUrl: './entries-form.component.html',
  styleUrls: ['./entries-form.component.scss']
})
export class EntriesFormComponent implements OnInit {

  public entry: any;
  public listBusinessUnits: any;

  constructor(
    public ref: DynamicDialogRef,
    public config: DynamicDialogConfig
  ) {
    this.entry = {
      id: '',
      model: '',
      client: '',
      part1: '',
      part2: '',
      code1: '',
      code2: '',
      partName: '',
      quantity: ''
    };
    this.listBusinessUnits = [];
  }

  ngOnInit(): void {
    this.entry = this.config.data;
    console.log(this.entry);
  }


  closeForm(): void {
    this.ref.close();
  }

}
