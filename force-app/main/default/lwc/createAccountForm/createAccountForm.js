import { LightningElement } from 'lwc';

export default class CreateAccountForm extends LightningElement {
    
    recordAccount;
    successHandler(event) {
        this.recordAccount = event.detail.id;
    }
}