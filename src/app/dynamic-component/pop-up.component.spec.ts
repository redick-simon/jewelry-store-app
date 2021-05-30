import { ComponentFixture, TestBed } from "@angular/core/testing"
import { PopUpComponent } from "./pop-up.component"

describe('PopUpComponent', () => {
    let fixture: ComponentFixture<PopUpComponent>;
    let component: PopUpComponent;
    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [PopUpComponent]
        }).compileComponents();
    })

    beforeEach(() => {
        fixture = TestBed.createComponent(PopUpComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    })

    it('should create popup component', () => {
        expect(component).toBeDefined();
        expect(fixture.debugElement.nativeElement.querySelector('h3').textContent).toEqual('Bill Detail');
    })

})