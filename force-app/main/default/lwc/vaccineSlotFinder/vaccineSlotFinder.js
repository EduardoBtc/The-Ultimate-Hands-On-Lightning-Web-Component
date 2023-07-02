import { LightningElement } from 'lwc';

export default class VaccineSlotFinder extends LightningElement {
    centers = [];
    dates = [];

    pincodeChangeHandler(event){
        const pincode = event.target.value;
        const isEnterKey = event.keyCode === 13;    

        if (pincode.length === 6) {
            const today = new Date();
            const endPoint = 'https://choudharymanish8585.github.io/cowin-api-sample-response/db.json'
            this.fetchVaccineSlots(endPoint);
        }
    }

    async fetchVaccineSlots(endpoint){
        const vaccineSlotsResponse = await fetch(endpoint);
        const vaccineSlots = await vaccineSlotsResponse.json();
        console.log(vaccineSlots);
        this.buildColumnsAndRows(vaccineSlots.centers);
    }

    buildColumnsAndRows(data){
        const dates = new Map();
        dates.set('name', {
            label: 'Center Name',
            fieldName: 'name',
            type: 'text'
        });

        const centers = new Map();
        
        for (const center of data){
            !centers.has(center.center_id) && centers.set(center.center_id, {name: center.name});

            for (const session of center.sessions){
                const {date, available_capacity, min_age_limit} = session;

                dates.set(date, {
                    label: date,
                    fieldName: date,
                    type: 'text',
                    wrapText: true,
                    cellAttributes: { class : {fieldName: 'className'}}
                });

                centers.get(center.center_id)[date] = `Available Capacity: ${available_capacity}
                Min Age: ${min_age_limit}`;

                centers.get(center.center_id).className = available_capacity > 0 ? 'slds-text-color_success' : 'slds-text-color_error';
            }
        }
        this.dates = Array.from(dates.values());
        this.centers = Array.from(centers.values());
    }

    get hideMessage(){
        return this.centers.length > 0;
    }
}