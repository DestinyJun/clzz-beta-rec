import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-process-parameter-package',
  templateUrl: './process-parameter-package.component.html',
  styleUrls: ['./process-parameter-package.component.css']
})
export class ProcessParameterPackageComponent implements OnInit {

  modalProp = [
    ['temperature_2_1', 'temperature_2_1_d', 'temperature_2_2_d', 'temperature_2_3_d'],
    ['temperature_2_4_d', 'temperature_2_5_d', 'temperature_2_6_d', 'temperature_2_7_d'],
    ['temperature_2_8_d', 'temperature_2_9_d', 'temperature_2_10_d', 'temperature_2_11_d'],
    ['temperature_2_12_d', 'temperature_2_13_d']
  ];
  modalName = [

  ]
  constructor() { }

  ngOnInit() {
  }

}
