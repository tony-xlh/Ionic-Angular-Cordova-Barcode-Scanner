import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { BarcodeResult } from '@awesome-cordova-plugins/dynamsoft-barcode-scanner';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  barcodeResults:BarcodeResult[];
  public scanOptions = [
    { val: 'Scan QR Code Only', isChecked: false }
  ];
  constructor(private router: Router) {

  }

  ionViewWillEnter(){
    console.log("ionViewWillEnter");
    if (history.state.barcodeResults) {
        this.barcodeResults = history.state.barcodeResults;
        console.log("result:"+this.barcodeResults);
    }
  }

  navigate(){
    let qrcodeonly = this.scanOptions[0].isChecked;
    this.router.navigate(['/scanner'],{
      state: {
        qrcodeonly: qrcodeonly
      }
    });
  }
}
