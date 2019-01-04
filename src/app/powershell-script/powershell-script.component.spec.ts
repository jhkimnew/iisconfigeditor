import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PowershellScriptComponent } from './powershell-script.component';

describe('PowershellScriptComponent', () => {
  let component: PowershellScriptComponent;
  let fixture: ComponentFixture<PowershellScriptComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PowershellScriptComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PowershellScriptComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
