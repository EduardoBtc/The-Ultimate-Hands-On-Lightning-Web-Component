import { LightningElement, track, wire } from 'lwc';
import messageDemo from '@salesforce/messageChannel/messageDemo__c';
import {MessageContext, publish, subscribe, unsubscribe, APPLICATION_SCOPE} from 'lightning/messageService';
import hasPermission from '@salesforce/customPermission/Send_Message'

export default class MessageLWC extends LightningElement {

    @track messages = [];

    @wire(MessageContext) messageContext;

    subscription = null;

    connectedCallback(){
        if (!this.subscription) {
            this.subscription = subscribe(this.messageContext, messageDemo, (message) => {
                this.handleMessage(message);
            },
            {scope: APPLICATION_SCOPE});
        }
    }

    disconnectedCallback(){
        unsubscribe(this.subscription);
        this.subscription = null;
    }

    sendMessage(){
        const inputElement = this.template.querySelector('lightning-input');
        const message = inputElement.value;

        this.messages.push({
            id: this.messages.length,
            message: message,
            from : 'LWC'
        });

        const messagePayload = {
            message: message,
            from: 'LWC'
        };

        publish(this.messageContext, messageDemo, messagePayload);

        inputElement.value = '';
    }

    handleMessage(message){
        if (message && message.from !== 'LWC'){
            this.messages.push({
                id: this.messages.length,
                message: message.message,
                from : message.from
            });
        }
    }

    get disableSendButton() {
        return !hasPermission;
    }
}