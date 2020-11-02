import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-styled-button',
  templateUrl: './styled-button.component.html',
  styleUrls: ['./styled-button.component.css']
})
export class StyledButtonComponent implements OnInit {
  constructor() { }

  @Input() buttonTitle: string;

  ngOnInit(): void {
  }

}
