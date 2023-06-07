import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CriarPostComponent } from './criar-post.component';

describe('CriarPostComponent', () => {
  let component: CriarPostComponent;
  let fixture: ComponentFixture<CriarPostComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CriarPostComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CriarPostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
