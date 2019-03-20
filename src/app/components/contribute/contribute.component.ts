import { Component, OnInit, OnDestroy } from '@angular/core';
import { NellieService } from '@app/services/nellie.service';
import { InteractionStoreService } from '@app/services/interaction.store.service';
import { DatasetStoreService } from '@app/services/dataset.store.service';
import { Router } from '@angular/router';
import { FormControl, FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { debounceTime, switchMap, distinctUntilChanged } from 'rxjs/operators';

@Component({
  selector: 'app-contribute',
  templateUrl: './contribute.component.html',
  styleUrls: ['./contribute.component.scss']
})
export class ContributeComponent implements OnInit, OnDestroy {
  showForm: boolean = true;

  features = []; 
  filteredInteractions;
  interactionRecords: any = [];

  newDecision;
  newFeature;

  featureOptions = [];
  decisionOptions = [];

  private subscriptions = [];

  constructor(
    public nellieService: NellieService,
    public router: Router,
    public InteractionsStore: InteractionStoreService,
    public DatasetStore: DatasetStoreService,
  ) {
    this.interactionRecords = [...this.InteractionsStore.records];
    this.filteredInteractions = this.InteractionsStore.questionsThatWereYes;
  }

  displayWith(input: any): string {
    return typeof input === 'string' ? input : (input == null ? '' : input.value);
  }
  featureOptionSelected(event) {
    // event.option.value
    this.features = [...this.features, JSON.parse(JSON.stringify(event.option.value))]
    
    this.newFeature = null;
    console.log(event);
  }
  featureAddNewFeature() {
    if (!this.newFeature.trim().length) return;
    this.features = [...this.features, { id: undefined, value: JSON.parse(JSON.stringify(this.newFeature))}]
    this.newFeature = null;
    console.log(event);
  }
  updateDecisionOptions() {
    const subscription = this.nellieService.autocompleteDecisions(this.newDecision).subscribe(list => {
      this.decisionOptions = JSON.parse(JSON.stringify(list));
    })
    this.subscriptions = [...this.subscriptions, subscription];
  }
  updateFeatureOptions() {
    const subscription = this.nellieService.autocompleteFeatures(this.newFeature).subscribe(list => {
      const array = JSON.parse(JSON.stringify(list));
      this.featureOptions = array
        .filter(item => !this.features.some(feature => feature.id === item.id))
        .filter(item => !this.interactionRecords.some(record => record.id === item.id));
    })
    this.subscriptions = [...this.subscriptions, subscription];
  }
  removeFeature(index) {
    console.log(index);
    this.features.splice(index, 1);
  }
  submitForm() {
    console.log(this.newDecision);
    console.log(this.features);
    console.log(this.filteredInteractions);

    const decision = this.newDecision.value
      ? this.newDecision
      : { value: this.newDecision }
    
    const payload = {
      decision,
      features: [...this.features, ...this.filteredInteractions],
    }
    const subscription = this.nellieService.submitData(payload).subscribe(response => {
      console.log(response);
      this.showForm = false;
      this.InteractionsStore.updateQuestionsThatWereYes([]);
      this.InteractionsStore.updateInteractionRecords([]);
    })
    this.subscriptions = [...this.subscriptions, subscription];
  }

  ngOnInit() {
    
  }

  ngOnDestroy() {
    this.subscriptions.map(sub => sub.unsubscribe());
  }
}
