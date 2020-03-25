import { Component, OnInit } from '@angular/core';
import { MatBottomSheet, MatBottomSheetRef} from '@angular/material/bottom-sheet';

@Component({
  selector: 'app-terms',
  templateUrl: './terms.component.html',
  styleUrls: ['./terms.component.scss']
})
export class TermsComponent implements OnInit {

  constructor(
    private _bottomSheetRef: MatBottomSheetRef<TermsComponent>
  ) { }
  openLink(event: MouseEvent): void {
    this._bottomSheetRef.dismiss();
    event.preventDefault();
  }
  ngOnInit(): void {
  }

}