import { LightningElement, api} from 'lwc';

export default class GetMyPic extends LightningElement {
    @api recordId;
    
    get myPicUrl(){
        const endpoint = 'https://i.pravatar.cc/300?u=';

        return endpoint + this.recordId;
    }
}