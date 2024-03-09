import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderBarComponent } from './components/header-bar/header-bar.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { SharedRoutingModule } from './shared-routing.module';
import { TooltipComponent } from './components/tooltip/tooltip.component';
@NgModule({
  declarations: [HeaderBarComponent, TooltipComponent],
  imports: [CommonModule, FontAwesomeModule, SharedRoutingModule],
  exports: [HeaderBarComponent, TooltipComponent, FontAwesomeModule],
})
export class SharedModule {}
