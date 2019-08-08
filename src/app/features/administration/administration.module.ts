import { NgModule } from '@angular/core';
import { AdministrationComponent } from './administration.component';
import { AdministrationRoutingModule } from './administration-routing.module';
import { InstancesComponent } from './containers/instances/instances.component';
import { SharedModule } from '@app/modules/shared/shared.module';
import { DataService } from '@app/services/data/data.service';
import { StatisticsComponent } from './containers/statistics/statistics.component';
import {
  ManageFeaturesComponent, ManageFeaturesDialog,
} from './containers/manage-features/manage-features.component';
import { ManageDecisionsComponent } from './containers/manage-decisions/manage-decisions.component';

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
    SharedModule,
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
