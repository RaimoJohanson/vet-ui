import { Component, OnInit, Inject } from '@angular/core';
import { DataService } from '@app/services/data/data.service';
import { Feature, FetchOptions, FeaturesPage, Pagination } from '@app/services/data/data.models';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialog } from '@angular/material';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-manage-features',
  templateUrl: './manage-features.component.html',
  styleUrls: ['./manage-features.component.scss'],
})
export class ManageFeaturesComponent implements OnInit {
  public displayedColumns: string[] = ['value', 'instances', 'created_at', 'updated_at', 'buttons'];

  public list: Feature[];
  public pagination: Pagination = {};
  public pageSizeOptions: number[] = [5, 10, 25, 100];

  constructor(
    private dataService: DataService,
    public dialog: MatDialog,
  ) {}

  ngOnInit() {
    this.fetchData();
  }

  async fetchData(options: FetchOptions = {}) {
    const { list, pagination } = await this.dataService.featuresPage(options);
    this.list = list;
    this.pagination = pagination;
  }

  openDialog(data): void {
    const width = '1000px';
    const dialogRef = this.dialog.open(ManageFeaturesDialog, { width, data });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        const record = this.list.find(item => item.id === result.id);

        record.value = result.value;
        record.updated_at = result.updated_at;
      }
    });
  }
}

@Component({
  selector: 'manage-features-dialog',
  templateUrl: 'manage-features-dialog.html',
  styleUrls: ['./manage-features-dialog.scss'],
})
export class ManageFeaturesDialog implements OnInit {
  public formdata;
  public mergeForm: FormGroup = new FormGroup({
    searchphrase: new FormControl(''),
  });
  public searchresults: Feature[] = [];

  constructor(
    public dialogRef: MatDialogRef<ManageFeaturesDialog>,
    private dataService: DataService,
    @Inject(MAT_DIALOG_DATA) public data: any,
    ) {
    this.formdata = { ...this.data };
  }

  get searchphrase() { return this.mergeForm.get('searchphrase'); }
  get searchphraseValue() { return this.mergeForm.get('searchphrase').value.value; }
  get valid() { return this.mergeForm.valid; }

  public displayFn(feature: Feature): string | undefined {
    return feature ? feature.value : undefined;
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  async updateSearch(phrase) {
    this.searchresults = await this.dataService.autocompleteFeatures(phrase);
  }

  async submitEdit() {
    try {
      const response = await this.dataService
        .updateFeature(this.data.id, { value: this.formdata.value });
      this.dialogRef.close(response);
      // toast!
    } catch (error) {
      console.log(error);
    }
  }

  submitMerge() {
    console.log('merging');
    this.dialogRef.close();
  }

  ngOnInit() {
    this.searchphrase.valueChanges.subscribe(value => this.updateSearch(value));
    console.log(this.mergeForm);
  }
}
