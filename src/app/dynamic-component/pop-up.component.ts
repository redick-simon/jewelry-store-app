import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";

@Component({
    selector: 'app-pop-up',
    templateUrl: './pop-up.component.html',
    styleUrls: ['./pop-up.component.css']
})
export class PopUpComponent implements OnInit {
    @Input() price: number;
    @Input() weight: number;
    @Input() discount?: number;
    @Input() totalPrice: number;
    @Output() close = new EventEmitter<void>();

    ngOnInit() {

    }

    onClose() {
        this.close.emit();
    }
}