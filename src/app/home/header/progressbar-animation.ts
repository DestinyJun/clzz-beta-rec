import {animate, state, style, transition, trigger} from '@angular/animations';

export const progressbar = trigger('progress-bar', [
  state('_0', style({'weight': '0%'})),
  state('_40', style({'weight': '40%'})),
  state('_80', style({'weight': '80%'})),
  state('_100', style({'weight': '100%'})),
  transition('_0 => _20', animate('200ms')),
  transition('_0 => _40', animate('200ms')),
  transition('_0 => _80', animate('200ms')),
  transition('_0 => _100', animate('200ms')),
  transition('_40 => _80', animate('200ms')),
  transition('_40 => _100', animate('200ms')),
  transition('_80 => _100', animate('200ms')),
]);
