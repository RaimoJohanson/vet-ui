import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from '@app/components/login/login.component';
import { NellieComponent } from '@app/components/nellie/nellie.component';
import { ResultsComponent } from '@app/components/results/results.component';
import { ContributeComponent } from '@app/components/contribute/contribute.component';
import { AuthGuard } from '@app/services/auth.guard';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  {
    path: 'admin',
    loadChildren: () => import('./features/administration/administration.module')
      .then(m => m.AdministrationModule),
  },
  {
    path: 'settings',
    loadChildren: () => import('./features/settings/settings.module')
      .then(m => m.SettingsModule),
  },
  { path: '', component: NellieComponent, canActivate: [AuthGuard] },
  { path: 'results', component: ResultsComponent, canActivate: [AuthGuard] },
  { path: 'contribute', component: ContributeComponent, canActivate: [AuthGuard] },
  { path: '**', redirectTo: '' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: false })],
  exports: [RouterModule],
})
export class AppRoutingModule {}
