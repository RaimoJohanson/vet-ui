import { Component, OnInit } from '@angular/core';
import { DataService } from '@app/services/data/data.service';
import { Instance, Feature, Decision } from '@app/services/data/data.models';

@Component({
  selector: 'admin-statistics',
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.scss'],
})
export class StatisticsComponent implements OnInit {
  public loading: boolean = true;

  public instances: Instance[];
  public features: Feature[];
  public decisions: Decision[];

  constructor(
    private dataService: DataService,
  ) {}

  async fetchData() {
    try {
      this.loading = true;
      this.instances = await this.dataService.instances();
      this.features = await this.dataService.features();
      this.decisions = await this.dataService.decisions();
    } catch (error) {
      console.error(error);
    } finally {
      this.loading = false;
    }

  }

  ngOnInit() {
    this.fetchData();
  }
}
