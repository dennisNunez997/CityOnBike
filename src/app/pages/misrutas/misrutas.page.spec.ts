import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { MisrutasPage } from './misrutas.page';

describe('MisrutasPage', () => {
  let component: MisrutasPage;
  let fixture: ComponentFixture<MisrutasPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MisrutasPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(MisrutasPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
