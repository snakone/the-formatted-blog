import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FriendsCardComponent } from './friends/friends-card/friends-card.component';

@NgModule({
  declarations: [
    FriendsCardComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    FriendsCardComponent
  ]
})

export class UserLayoutModule { }
