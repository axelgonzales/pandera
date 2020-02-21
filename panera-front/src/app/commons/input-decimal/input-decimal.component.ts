import { Component, OnInit, ElementRef, Input } from '@angular/core';

@Component({
  selector: 'app-input-decimal',
  templateUrl: './input-decimal.component.html',
  styleUrls: ['./input-decimal.component.scss']
})
export class InputDecimalComponent implements OnInit {

  @Input() valueParent: string;

  type = "decimal";
  
  ngOnInit() {
  }


  private regex = {
      string: new RegExp(/^[a-zA-Z,\-_() .!? ]*$/),
      number: new RegExp(/^\d+$/),
      decimal: new RegExp(/^[0-9]+(\.[0-9]*){0,1}$/g)
  };

  private specialKeys = {
      string: [ 'Backspace', 'Tab', 'End', 'Home', 'ArrowLeft', 'ArrowRight' ],
      number: [ 'Backspace', 'Tab', 'End', 'Home', 'ArrowLeft', 'ArrowRight' ],
      decimal: [ 'Backspace', 'Tab', 'End', 'Home', 'ArrowLeft', 'ArrowRight' ],
  };

  constructor(private el: ElementRef) {
  }


  keyPress(event: KeyboardEvent) {
      if (this.specialKeys[this.type].indexOf(event.key) !== -1) {
          return;
      }
      this.valueParent = this.valueParent == undefined ? '':this.valueParent;
      let current: string = this.valueParent;
      let next: string = current.concat(event.key);
      if (next && !String(next).match(this.regex[this.type])) {
          event.preventDefault();
      }
  }

}
