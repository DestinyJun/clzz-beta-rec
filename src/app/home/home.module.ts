import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {HomeRoutersModule} from './home.routers.module';
import {HomeComponent} from './home.component';
import {HeaderComponent} from './header/header.component';
import {SidebarComponent} from './sidebar/sidebar.component';
import {FooterComponent} from './footer/footer.component';
import {HomeService} from './home.service';
import {PositionBarComponent} from './position-bar/position-bar.component';
import { MessageRemindComponent } from '../message-remind/message-remind.component';
import { PersonalInfoComponent } from './personal-info/personal-info.component';
import {PositionNameService} from '../remind/position-name.service';


@NgModule({
  imports: [
    CommonModule,
    HomeRoutersModule,
  ],
  declarations: [
    HomeComponent,
    HeaderComponent,
    SidebarComponent,
    FooterComponent,
    PositionBarComponent,
    MessageRemindComponent,
    PersonalInfoComponent
  ],
  providers: [HomeService, PositionNameService],
  bootstrap: []
})
export class HomeModule {}
