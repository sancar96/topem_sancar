import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EdicionFacturaComponent } from './edicion-factura.component';

describe('EdicionFacturaComponent', () => {
  let component: EdicionFacturaComponent;
  let fixture: ComponentFixture<EdicionFacturaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EdicionFacturaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EdicionFacturaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
