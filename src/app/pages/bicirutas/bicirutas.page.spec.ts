import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { BicirutasPage } from './bicirutas.page';

describe('BicirutasPage', () => {
  let component: BicirutasPage;
  let fixture: ComponentFixture<BicirutasPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BicirutasPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(BicirutasPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
