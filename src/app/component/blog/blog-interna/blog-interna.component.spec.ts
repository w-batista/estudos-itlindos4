import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BlogInternaComponent } from './blog-interna.component';

describe('BlogInternaComponent', () => {
  let component: BlogInternaComponent;
  let fixture: ComponentFixture<BlogInternaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BlogInternaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BlogInternaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
