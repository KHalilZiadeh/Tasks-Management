import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderBarComponent } from './components/header-bar/header-bar.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { SharedRoutingModule } from './shared-routing.module';
import { TooltipComponent } from './components/tooltip/tooltip.component';
import { SideNavComponent } from './components/side-nav/side-nav.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DeleteComponent } from './popups/delete/delete.component';

@NgModule({
  declarations: [
    HeaderBarComponent,
    TooltipComponent,
    SideNavComponent,
    DeleteComponent,
  ],
  imports: [
    CommonModule,
    FontAwesomeModule,
    SharedRoutingModule,
    ReactiveFormsModule,
    FormsModule,
  ],
  exports: [
    HeaderBarComponent,
    TooltipComponent,
    FontAwesomeModule,
    SideNavComponent,
    ReactiveFormsModule,
    FormsModule,
  ],
})
export class SharedModule {}
