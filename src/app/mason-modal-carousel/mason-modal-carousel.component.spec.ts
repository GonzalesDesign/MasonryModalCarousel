import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MasonModalCarouselComponent } from './mason-modal-carousel.component';

describe('MasonModalCarouselComponent', () => {
  let component: MasonModalCarouselComponent;
  let fixture: ComponentFixture<MasonModalCarouselComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MasonModalCarouselComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MasonModalCarouselComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
