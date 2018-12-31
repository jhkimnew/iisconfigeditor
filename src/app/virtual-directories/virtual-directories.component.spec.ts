import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VirtualDirectoriesComponent } from './virtual-directories.component';

describe('VirtualDirectoriesComponent', () => {
  let component: VirtualDirectoriesComponent;
  let fixture: ComponentFixture<VirtualDirectoriesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VirtualDirectoriesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VirtualDirectoriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
