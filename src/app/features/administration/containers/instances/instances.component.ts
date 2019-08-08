import { Component, OnInit } from '@angular/core';
import { DataService } from '@app/services/data/data.service';

@Component({
  selector: 'admin-instances',
  templateUrl: './instances.component.html',
  styleUrls: ['./instances.component.scss'],
})
export class InstancesComponent implements OnInit {
  public displayedColumns: string[] = ['label', 'features'];
  public dataSource;

  constructor(
    private dataService: DataService,
  ) {}

  async fetchData() {
    this.dataSource = await this.dataService.composedData();
    console.log(this.dataSource);
  }

  ngOnInit() {
    this.fetchData();
  }
}
