import { LightningElement, wire } from 'lwc';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import { NavigationMixin } from 'lightning/navigation';
import getAllCarType from '@salesforce/apex/CarSearchFormController.getAllCarType';

export default class CarSearchForm extends NavigationMixin(LightningElement) {
    carTypeOptions;

    @wire(getAllCarType)
    wiredCarType({ error, data }) {
        if (data) {
            this.carTypeOptions = [{ label: 'All Types', value: '' }];
            data.forEach(element => {
                const carType = {};
                carType.label = element.Name;
                carType.value = element.Id;
                this.carTypeOptions.push(carType);
            });
        } else if (error) {
            this.showToast('ERROR', error.body.message, 'error');
        }
    }

    handleCarTypeChange(event) {
        const carTypeId = event.detail.value;
        const carTypeSelectionChangeEvent = new CustomEvent('cartypeselect', { detail: carTypeId });
        this.dispatchEvent(carTypeSelectionChangeEvent);
    }

    createNewCarType() {
        this[NavigationMixin.Navigate]({
            type: 'standard__objectPage',
            attributes: {
                objectApiName: 'Car_Type__c',
                actionName: 'new'
            }
        });
    }

    showToast(title, message, variant) {
        const evt = new ShowToastEvent({
            title: title,
            message: message,
            variant: variant,
        });
        this.dispatchEvent(evt);
    }
}