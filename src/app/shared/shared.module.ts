import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderBarComponent } from './components/header-bar/header-bar.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { SharedRoutingModule } from './shared-routing.module';
import { TooltipComponent } from './components/tooltip/tooltip.component';
import { SideNavComponent } from './components/side-nav/side-nav.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DeleteComponent } from './popups/delete/delete.component';
import { DropdownComponent } from './components/dropdown/dropdown.component';
import { DropdownDirective } from './directives/dropdown.directive';
import { MaterialModule } from './components/material.module';

@NgModule({
  declarations: [
    HeaderBarComponent,
    TooltipComponent,
    SideNavComponent,
    DeleteComponent,
    DropdownComponent,
    DropdownDirective,
  ],
  imports: [
    CommonModule,
    FontAwesomeModule,
    SharedRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    MaterialModule
  ],
  exports: [
    HeaderBarComponent,
    TooltipComponent,
    FontAwesomeModule,
    SideNavComponent,
    ReactiveFormsModule,
    DropdownComponent,
    FormsModule,
    MaterialModule
  ],
})
export class SharedModule { }
