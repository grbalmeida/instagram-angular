import {Component, OnInit} from '@angular/core'
import {trigger, state, style, transition, animate} from '@angular/animations'

import BannerImage from './banner-image.model'

@Component({
  selector: 'app-banner',
  templateUrl: './banner.component.html',
  styleUrls: ['./banner.component.css'],
  animations: [
    trigger('banner', [
      state('hidden', style({
        opacity: 0
      })),
      state('visible', style({
        opacity: 1
      })),
      transition('hidden <=> visible', animate('2s ease-in'))
    ])
  ]
})
export class BannerComponent implements OnInit {
  private images: Array<BannerImage> = [
    {state: 'visible', url: '/assets/images/img_1.png'},
    {state: 'hidden', url: '/assets/images/img_2.png'},
    {state: 'hidden', url: '/assets/images/img_3.png'},
    {state: 'hidden', url: '/assets/images/img_4.png'},
    {state: 'hidden', url: '/assets/images/img_5.png'}
  ]

  constructor() { }

  ngOnInit() {
    setTimeout(() => this.rotation(), 3000)
  }

  public rotation(): void {
    let nextImageIndex: number

    for(let counter: number = 0; counter < this.images.length; counter++) {
      if(this.images[counter].state === 'visible') {
        this.images[counter].state = 'hidden'

        nextImageIndex = counter === 4 ? 0 : counter + 1
        break
      }
    }

    this.images[nextImageIndex].state = 'visible'
    setTimeout(() => this.rotation(), 3000)
  }
}
