import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { SendOtpPage } from './send-otp.page';

describe('SendOtpPage', () => {
  let component: SendOtpPage;
  let fixture: ComponentFixture<SendOtpPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SendOtpPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(SendOtpPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
