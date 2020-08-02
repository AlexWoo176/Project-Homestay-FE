import {Component, Input, OnInit} from '@angular/core';
import {IHouse} from '../../../model/ihouse';

// tslint:disable-next-line:typedef
declare function plusSlides(n);

// tslint:disable-next-line:typedef
declare function currentSlide(n);

// tslint:disable-next-line:typedef
declare function showSlides(n);

@Component({
  selector: 'app-slide-show',
  templateUrl: './slide-show.component.html',
  styleUrls: ['./slide-show.component.css']
})
export class SlideShowComponent implements OnInit {

  @Input()
  house: IHouse;

  constructor() {
  }

  ngOnInit(): void {
    const n = 1;
    showSlides(n);
  }
}
