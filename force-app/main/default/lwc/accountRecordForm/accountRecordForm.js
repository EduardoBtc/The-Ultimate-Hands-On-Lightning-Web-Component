import { LightningElement } from 'lwc';

export default class AccountRecordForm extends LightningElement {
    recordId;
    fields = ['Name', 'Phone', 'Website'];

    handleSuccess(event) {
        console.log('Record ID: ' + event.detail.id);
        this.recordId = event.detail.id;
    }
}