import { trigger, state, style, transition, animate } from '@angular/animations';
export const slideToRight = trigger('routerAnimate', [
  // 定义void表示空状态下
  state('void', style({ position: 'absolute', 'width': '100%', 'height': '100%' })),
  // * 表示任何状态
  state('*', style({ position: 'absolute', 'width': '100%', 'height': '100%'})),
  // 进场动画
  transition(':enter', [
    style({ transform: 'translate(-100%,0)' }),
    animate('.5s ease-in-out', style({ transform: 'translate(0,0)' }))
  ])
]);
