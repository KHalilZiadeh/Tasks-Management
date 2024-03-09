import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderBarComponent } from './components/header-bar/header-bar.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { SharedRoutingModule } from './shared-routing.module';

@NgModule({
  declarations: [HeaderBarComponent],
  imports: [CommonModule, FontAwesomeModule, SharedRoutingModule],
  exports: [HeaderBarComponent, FontAwesomeModule],
})
export class SharedModule {}
