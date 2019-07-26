import { Component, OnInit, ViewChild } from '@angular/core';
import { DataService } from '@app/services/data/data.service';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-manage-decisions',
  templateUrl: './manage-decisions.component.html',
  styleUrls: ['./manage-decisions.component.scss'],
})
export class ManageDecisionsComponent implements OnInit {
  public displayedColumns: string[] = ['id', 'value', 'created_at', 'updated_at'];
  public dataSource;

  @ViewChild(MatSort, { static: true }) sort: MatSort;

  constructor(
    private dataService: DataService,
  ) {}

  async fetchData() {
    const response = await this.dataService.decisions();
    this.dataSource = new MatTableDataSource(response);
    this.dataSource.sort = this.sort;
    console.log(this.dataSource);
  }

  ngOnInit() {
    this.fetchData();
  }
}
