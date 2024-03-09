import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthPromptComponent } from './auth-prompt.component';

describe('AuthPromptComponent', () => {
  let component: AuthPromptComponent;
  let fixture: ComponentFixture<AuthPromptComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AuthPromptComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AuthPromptComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
