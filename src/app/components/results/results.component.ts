import { Component, OnInit } from '@angular/core';
import { NellieService, Feature } from '@app/services/nellie.service';
import { InteractionStoreService } from '@app/services/interaction.store.service';
import { DatasetStoreService } from '@app/services/dataset.store.service';
import { Router } from '@angular/router';

import { INPUT_MAP } from '@app/config';

@Component({
  selector: 'app-results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.scss']
})
export class ResultsComponent implements OnInit {
  public loading = false;
  public inputMap = INPUT_MAP;
  public dataset = [];

  constructor(
    public nellieService: NellieService,
    public router: Router,
    public InteractionsStore: InteractionStoreService,
    public DatasetStore: DatasetStoreService,
  ) {}

  calculateProbabilities(list, fitness_sum) {
    // record.probability = parseFloat(record.fitness / fitness_sum).toFixed(2) / 1;
    return list.map(item => ({
      ...item,
      probability: item.fitness / fitness_sum
    }))
  }
  distinctDecisions(list) {
    const fitness_sum = list.reduce((total, current) => total + current.fitness, 0);
    let distinctFitness = [];
    list.forEach(item => {
      const match = distinctFitness.find(distinct => distinct.label === item.label);
      if (match) {
        match.fitness = match.fitness + item.fitness;
      } else {
        distinctFitness = [...distinctFitness, item]
      }
    })
    return this.calculateProbabilities(distinctFitness, fitness_sum);
  }

  ngOnInit() {
    this.loading = true;
    const trainingData = JSON.parse(JSON.stringify(this.DatasetStore.list$)).source._value;
  
    
    const decisionsSub = this.nellieService.getAllDecisions()
    .subscribe((res) => {
      const data = JSON.parse(JSON.stringify(res));
      // console.log(data);
      this.dataset = this.distinctDecisions(trainingData);
      this.dataset = this.dataset.map((item) => ({
        ...item,
        value: data.find(rec => rec.id === item.label).value
      }));

      this.loading = false;
      decisionsSub.unsubscribe();
    });
  }
}
