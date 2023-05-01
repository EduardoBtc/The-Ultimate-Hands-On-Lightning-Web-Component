import { LightningElement, api, wire, track } from 'lwc';
import getCars from '@salesforce/apex/CarSearchResultController.getCars';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';

export default class CarSearchResult extends LightningElement {
    @api carTypeId;
    cars;
    @track selectCarId;

    @wire(getCars, { carTypeId: '$carTypeId' })
    wireCars({ error, data }) {
        if (data) {
            this.cars = data;
        } else if (error) {
            this.showToast('ERROR', error.body.message, 'error');
        }
    }

    showToast(title, message, variant) {
        const evt = new ShowToastEvent({
            title: title,
            message: message,
            variant: variant,
        });
        this.dispatchEvent(evt);
    }

    carSelectHandler(event) {
        const carId = event.detail;
        this.selectCarId = carId;
    }

    get carsFound() {
        if (this.cars) {
            return true;
        }
        return false;
    }
}