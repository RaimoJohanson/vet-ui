import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from '@app/services/authentication/auth.service';
import { MaterialModule } from '../angular-material/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ModuleWithProviders } from '@angular/compiler/src/core';
import { MatPaginatorIntl } from '@angular/material';
import { MatPaginatorIntlEst } from '../angular-material/matpaginatorintl-est';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  exports: [
    CommonModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [{ provide: MatPaginatorIntl, useClass: MatPaginatorIntlEst }],
})
export class SharedModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: SharedModule,
      providers: [
        AuthService,
      ],
    };
  }
}
