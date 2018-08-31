import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule, MatCheckboxModule } from '@angular/material';
import { MatCardModule } from '@angular/material/card';

@NgModule({

  imports: [
      BrowserAnimationsModule,
      MatDialogModule,
      MatButtonModule,
      MatCheckboxModule,
      MatCardModule
    ],

  exports: [
      BrowserAnimationsModule,
      MatDialogModule,
      MatButtonModule,
      MatCheckboxModule,
      MatCardModule
    ]

})

export class MatModule { }
