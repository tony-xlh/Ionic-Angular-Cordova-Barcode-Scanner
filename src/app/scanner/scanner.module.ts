import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ScannerPageRoutingModule } from './scanner-routing.module';

import { ScannerPage } from './scanner.page';
import { BarcodeScannerComponent } from '../barcode-scanner/barcode-scanner.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ScannerPageRoutingModule
  ],
  declarations: [ScannerPage,BarcodeScannerComponent]
})
export class ScannerPageModule {}
