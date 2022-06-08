import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  barcodeResults:[];
  public scanOptions = [
    { val: 'Continuous Scan', isChecked: false },
    { val: 'Scan QR Code Only', isChecked: false }
  ];
  constructor(private router: Router) {

  }

  ionViewDidEnter(){
    console.log("ionViewDidEnter");
    if (history.state.barcodeResults) {

        this.barcodeResults = history.state.barcodeResults;
        console.log("result:"+this.barcodeResults);

    }
  }

  navigate(){
    let continuous = this.scanOptions[0].isChecked;
    let qrcodeonly = this.scanOptions[1].isChecked;
    this.router.navigate(['/scanner'],{
      state: {
        continuous: continuous,
        qrcodeonly: qrcodeonly
      }
    });
  }
}
