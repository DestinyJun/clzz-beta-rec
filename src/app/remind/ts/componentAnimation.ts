import {animate, state, style, transition, trigger} from '@angular/animations';

export const BigToSmall = trigger('componentAnimate', [
  // 定义void表示空状态下
  state('void', style({ position: 'absolute', 'width': '*', 'height': '*'})),
  // * 表示任何状态
  state('*', style({ position: 'absolute', 'width': '*', 'height': '*'})),
  // 进场动画
  transition(':enter', [
    style({ transform: 'scale(1)' }),
    animate('.2s ease-in-out', style({ transform: 'scale(1.2)' }))
  ])
]);
