import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NellieService, Feature } from '@app/services/nellie.service';
import { InteractionStoreService } from '@app/services/interaction.store.service';
import { DatasetStoreService } from '@app/services/dataset.store.service';

import { MatSnackBar } from '@angular/material';

interface Question {
  id: number;
  value: string;
  input: number;
  gain: number;
}

const CONFIG = {
  minimalGain: 0.1,
};

@Component({
  selector: 'app-nellie',
  templateUrl: './nellie.component.html',
  styleUrls: ['./nellie.component.scss'],
})
export class NellieComponent implements OnInit {
  public currentQuestion: Question;

  public displayedQuestion: string;

  public interactions: {}[] = [];

  public interactionsYES: {}[] = [];

  public busy = false;

  public loading = false;

  public data: any = [];

  private hitCount = 0;

  constructor(
    public nellieService: NellieService,
    public snackBar: MatSnackBar,
    public router: Router,
    public InteractionsStore: InteractionStoreService,
    public DatasetStore: DatasetStoreService,
  ) {}

  openSnackBar(message: string) {
    this.snackBar.open(message, null, {
      duration: 3000,
    });
  }

  userInteraction(input) {
    if (this.busy) return;
    this.busy = true;
    this.currentQuestion.input = input;
    this.interactions = [...this.interactions, this.currentQuestion];
    this.InteractionsStore.updateInteractionRecords(this.interactions);
    if (input === 1) {
      this.hitCount += 1;
      this.interactionsYES = [...this.interactionsYES, this.currentQuestion];
      this.InteractionsStore.updateQuestionsThatWereYes(this.interactionsYES);
    }
    if (input !== 2) {
      this.data = this.calcFitness(this.data, this.interactions);
      console.log(this.data);
      // console.log('Length of trainingData before trimming:', $rootScope.trainingData.length);
      this.data = this.trim(this.data, this.interactions);
      // console.log('Length of trainingData after trimming:', this.data.length);
    }
    const calculated = this.nellieService.calculateFeature(this.data);
    this.currentQuestion = this.checkHistory(calculated, this.interactions);
    // this.displayQuestion(this.currentQuestion);

    if (this.currentQuestion.gain > CONFIG.minimalGain) {
      this.displayQuestion(this.currentQuestion);
    } else if (this.currentQuestion.id) {
      this.displayQuestion(this.currentQuestion);
    } else {
      this.data = this.trim(this.data, this.interactions);
      this.DatasetStore.update(this.data);
      this.router.navigateByUrl('/results');
    }
  }

  displayQuestion(currentQuestion: Question) {
    this.loading = true;

    const featureSub = this.nellieService
      .getFeature(currentQuestion.id)
      .subscribe((data: Feature) => {
        this.currentQuestion.value = data.value;
        this.displayedQuestion = this.currentQuestion.value;
        this.loading = false; // buttons are active
        featureSub.unsubscribe();
        this.busy = false;
      });
  }

  calcFitness(data, interactions) {
    data.forEach((subject) => {
      let matches = 0;
      interactions.forEach((record) => {
        if (record.input === 1) {
          if (subject.features.indexOf(Number(record.id)) > -1) matches += 1;
          else matches -= 1;
        }
      });
      if (this.hitCount !== 0) subject.fitness = matches / this.hitCount;
      else subject.fitness = 0;
    });
    return data;
  }

  trim(data, interactions) {
    function prune(dataset, id, decision) {
      const cache = [];
      dataset.forEach((subject) => {
        switch (decision) {
          case 1:
            if (subject.features.indexOf(Number(id)) > -1) {
              cache.push(subject);
            }
            break;
          case 0:
            if (subject.features.indexOf(Number(id)) < 0) {
              cache.push(subject);
            }
            break;
          default:
            console.log('Exception @ pruning - feature ID: %s, decision: %s', id, decision);
        }
      });
      return cache;
    }
    const fitnessSum = data.reduce((total, current) => total + current.fitness, 0);
    const averageFitness = fitnessSum / data.length;

    const immune = data.filter(item => item.fitness >= averageFitness);
    // console.log('Labels that have higher than average fitness: ', output.length);
    // console.log('dataset length after sorting immune labels: ', data.length);

    let unimmune = data.filter(item => item.fitness < averageFitness);

    interactions.forEach((record) => { // update data per each interaction;
      if (record.input < 2) {
        unimmune = prune(unimmune, record.id, record.input);
      }
    });

    return [...immune, ...unimmune];
  }

  checkHistory(features, history) {
    /*     @history = [{id: Number, value: String}]
     *     @features = [{id: 1, gain: "1.0000"}] //SORTED ORDER
     */
    if (history.length < 1) return features[0];

    for (let i = 0; i < features.length; i += 1) {
      let flag = 1;
      for (let x = 0; x < history.length; x += 1) {
        if (features[i].id == history[x].id) {
          flag = 0;
          break;
        }
      }
      if (flag) return features[i];
    }
    return { id: false, gain: CONFIG.minimalGain };
  }

  ngOnInit() {
    this.InteractionsStore.updateQuestionsThatWereYes([]);
    this.InteractionsStore.updateInteractionRecords([]);
    this.nellieService.getData().subscribe((data) => {
      this.data = data;
      if (!this.data.length) this.router.navigateByUrl('/contribute');
      else {
        const calculated = this.nellieService.calculateFeature(this.data);
        this.currentQuestion = this.checkHistory(calculated, this.interactions);
        this.displayQuestion(this.currentQuestion);
      }
    });
  }
}
