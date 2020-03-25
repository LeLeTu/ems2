import { Component, OnInit } from '@angular/core';
import { MatBottomSheet, MatBottomSheetRef} from '@angular/material/bottom-sheet';

@Component({
  selector: 'app-policy',
  templateUrl: './policy.component.html',
  styleUrls: ['./policy.component.scss']
})
export class PolicyComponent implements OnInit {

  constructor(
    private _bottomSheetRef: MatBottomSheetRef<PolicyComponent>
  ) { }
  openLink(event: MouseEvent): void {
    this._bottomSheetRef.dismiss();
    event.preventDefault();
  }
  ngOnInit(): void {
  }

}
