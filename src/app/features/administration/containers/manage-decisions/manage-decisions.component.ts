import { Component, OnInit, ViewChild } from '@angular/core';
import { DataService } from '@app/services/data/data.service';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Pagination, Decision, FetchOptions } from '@app/services/data/data.models';

@Component({
  selector: 'app-manage-decisions',
  templateUrl: './manage-decisions.component.html',
  styleUrls: ['./manage-decisions.component.scss'],
})
export class ManageDecisionsComponent implements OnInit {
  public displayedColumns: string[] = ['id', 'value', 'created_at', 'updated_at'];

  public list: Decision[] = [];
  public pagination: Pagination = {};

  constructor(
    private dataService: DataService,
  ) {}

  ngOnInit() {
    this.fetchData();
  }

  async fetchData(options: FetchOptions = {}) {
    const { list, pagination } = await await this.dataService.decisionsPage(options);
    this.list = list;
    this.pagination = pagination;
  }
}
