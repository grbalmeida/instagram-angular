import {Component, OnInit} from '@angular/core'
import {trigger, state, style, transition, animate, keyframes} from '@angular/animations'

@Component({
  selector: 'app-access',
  templateUrl: './access.component.html',
  styleUrls: ['./access.component.css'],
  animations: [
    trigger('banner-animation', [
      state('created', style({
        opacity: 1
      })),
      transition('void => created', [
        style({
          opacity: 0,
          transform: 'translate(-50px, 0)'
        }),
        animate('500ms ease-in-out')
      ])
    ]),
    trigger('panel-animation', [
      state('created', style({
        opacity: 1
      })),
      transition('void => created', [
        style({
          opacity: 0,
          transform: 'translate(50px, 0)'
        }),
        animate('1500ms ease-in-out', keyframes([
          style({offset: 0.15, opacity: 1, transform: 'translateX(0)'}),
          style({offset: 0.86, opacity: 1, transform: 'translateX(0)'}),
          style({offset: 0.88, opacity: 1, transform: 'translateY(-10px)'}),
          style({offset: 0.90, opacity: 1, transform: 'translateY(10px)'}),
          style({offset: 0.92, opacity: 1, transform: 'translateY(-10px)'}),
          style({offset: 0.94, opacity: 1, transform: 'translateY(10px)'}),
          style({offset: 0.96, opacity: 1, transform: 'translateY(-10px)'}),
          style({offset: 0.98, opacity: 1, transform: 'translateY(10px)'})
        ]))
      ])
    ])
  ]
})
export class AccessComponent implements OnInit {
  private bannerState: string = 'created'
  private panelState: string = 'created'
  private register: boolean = false

  constructor() { }

  ngOnInit() {
  }

  public showPanel(event: string): void {
    this.register = event === 'register' ? true : false
  }
}
