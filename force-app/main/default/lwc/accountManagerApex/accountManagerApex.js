import { LightningElement } from 'lwc';
import getAllAccounts from '@salesforce/apex/AccountSelector.getAllAccounts';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';

export default class AccountManagerApex extends LightningElement {
    accounts;
    numeberOfAccounts;
    accounts;

    get receiveResponse() {
        if (this.accounts) 
            return true;

        return false;
    }

    handleNumberOfAccountsChange(event) {
        this.numberOfAccounts = event.target.value;
    }

    getAccounts() {
        getAllAccounts({limitRecord: this.numberOfAccounts})
            .then(result => {
                this.accounts = result;
                const toastEvent = new ShowToastEvent({
                    title: 'Success',
                    message: this.numberOfAccounts + ' Accounts retrieved successfully',
                    variant: 'success'
                });
                this.dispatchEvent(toastEvent);
            })
            .catch(error => {
                console.log(error);
                const toastEvent = new ShowToastEvent({
                    title: 'Success',
                    message: error.body.message,
                    variant: 'error'
                });
                this.dispatchEvent(toastEvent);
            });
    }
}