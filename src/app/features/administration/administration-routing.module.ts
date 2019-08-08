import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthGuard } from '@app/services/auth.guard';
import { InstancesComponent } from './containers/instances/instances.component';
import { AdministrationComponent } from './administration.component';
import { StatisticsComponent } from './containers/statistics/statistics.component';
import { ManageFeaturesComponent } from './containers/manage-features/manage-features.component';
import { ManageDecisionsComponent } from './containers/manage-decisions/manage-decisions.component';

const routes: Routes = [
  {
    path: '',
    component: AdministrationComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: 'statistics',
        component: StatisticsComponent,
      },
      {
        path: 'instances',
        component: InstancesComponent,
      },
      {
        path: 'manage-features',
        component: ManageFeaturesComponent,
      },
      {
        path: 'manage-decisions',
        component: ManageDecisionsComponent,
      },
    ],
  },
  { path: '**', redirectTo: '' },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})

export class AdministrationRoutingModule {}
