import { LightningElement, track} from 'lwc';

export default class CarSearch extends LightningElement {
    
    @track carTypeId = '';

    handleCarTypeChange(event) {
        this.carTypeId = event.detail;
    }
}