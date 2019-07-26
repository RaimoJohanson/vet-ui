import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdministrationComponent } from './administration.component';
import { AdministrationRoutingModule } from './administation-routing.module';
import { InstancesComponent } from './components/instances/instances.component';
import { MaterialModule } from '@app/modules/material.module';
import { DataService } from '@app/services/data/data.service';
import { StatisticsComponent } from './components/statistics/statistics.component';
import {
  ManageFeaturesComponent, ManageFeaturesDialog,
} from './components/manage-features/manage-features.component';
import { ManageDecisionsComponent } from './components/manage-decisions/manage-decisions.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AdministrationComponent,
    InstancesComponent,
    StatisticsComponent,
    ManageFeaturesComponent,
    ManageDecisionsComponent,
    ManageFeaturesDialog,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    AdministrationRoutingModule,
  ],
  providers: [
    DataService,
  ],
  entryComponents: [
    ManageFeaturesDialog,
  ],
  bootstrap: [AdministrationComponent],
})
export class AdministrationModule {}
