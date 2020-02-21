import { Component, OnInit, Input, ElementRef, HostListener } from '@angular/core';

@Component({
  selector: 'app-input-name',
  templateUrl: './input-name.component.html',
  styleUrls: ['./input-name.component.scss']
})
export class InputNameComponent implements OnInit {
    
  @Input() valueParent: string;

  type = "string";
  
  ngOnInit() {
  }


    private regex = {
        string: new RegExp(/^[a-zA-Z ]*$/),
        number: new RegExp(/^\d+$/),
        decimal: new RegExp(/^[0-9]+(\.[0-9]*){0,1}$/g)
    };

    private specialKeys = {
        string: [ 'Backspace', 'Tab', 'End', 'Home', 'ArrowLeft', 'ArrowRight' ],
        number: [ 'Backspace', 'Tab', 'End', 'Home', 'ArrowLeft', 'ArrowRight' ],
        decimal: [ 'Backspace', 'Tab', 'End', 'Home', 'ArrowLeft', 'ArrowRight' ],
    };

    constructor(private el: ElementRef) {
        console.log(this.valueParent);
    }


    keyPress(event: KeyboardEvent) {
        console.log('evemt',event.key);
        if (this.specialKeys[this.type].indexOf(event.key) !== -1) {
            console.log("if");
            return;
        }
        this.valueParent = this.valueParent == undefined ? '':this.valueParent;
        let current: string = this.valueParent;
        let next: string = current.concat(event.key);
        console.log("next"  + next);
        if (next && !String(next).match(this.regex[this.type])) {
            event.preventDefault();
        }
    }
}
