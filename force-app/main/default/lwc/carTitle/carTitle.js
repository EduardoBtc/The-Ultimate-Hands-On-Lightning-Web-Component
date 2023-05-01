import { LightningElement, api, wire } from 'lwc';
import { CurrentPageReference } from 'lightning/navigation';
import { fireEvent } from 'c/pubsub';

export default class CarTitle extends LightningElement {
    @api car;
    @api carSelectedId;

    @wire(CurrentPageReference) pageRef;

    handlerCarSelect(event) {
        event.preventDefault();

        const carId = this.car.Id;

        const carselect = new CustomEvent('carselect', { detail: carId });
        this.dispatchEvent(carselect);
        
        fireEvent(this.pageRef, 'carselect', this.car);
    }

    get isCarSelected() {
        if (this.car.Id === this.carSelectedId) {
            return "title selected";
        }
        return "title";
    }
}