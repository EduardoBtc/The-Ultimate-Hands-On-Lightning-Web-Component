import { LightningElement, wire } from 'lwc';
import { createRecord, getRecord } from 'lightning/uiRecordApi';

const fiedlsRetrieve = ['Account.Name', 'Account.Phone', 'Account.Website'];

export default class CreateAccountLWC extends LightningElement {
    accountName;
    accountPhone;
    accountWebsite;
    accountRecordId;

    @wire(getRecord, { recordId: '$accountRecordId', fields: fiedlsRetrieve })
    accountRetrieve;

    accountNameHandler(event){
        this.accountName = event.target.value;
    }

    accountPhoneHandler(event){
        this.accountPhone = event.target.value;
    }

    accountWebsiteHandler(event){
        this.accountWebsite = event.target.value;
    }

    createAccountHandler(){
        const fields = {
            'Name': this.accountName,
            'Phone': this.accountPhone,
            'Website': this.accountWebsite
        };
        const recordInput = { apiName: 'Account', fields };
        
        createRecord(recordInput).then(account => {
            console.log('Account created: ', account.id);
            this.accountRecordId = account.id;
        }).catch(error => {
            console.error('Error creating account: ', error);
        });
    }

    get getAccountName(){
        if (this.accountRetrieve.data)
            return this.accountRetrieve.data.fields.Name.value;

        return undefined;
    }

    get getAccountPhone(){
        if (this.accountRetrieve.data)
            return this.accountRetrieve.data.fields.Phone.value;
        
        return undefined;
    }

    get getAccountWebsite(){
        if (this.accountRetrieve.data)
            return this.accountRetrieve.data.fields.Website.value;
        
        return undefined;
    }
}