import { LightningElement, track } from 'lwc';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import getAddressFromCEPTest from '@salesforce/apex/AddressController.getAddressFromCEP';

export default class GetAddressFromCEP extends LightningElement {
    @track cep;
    @track rua;
    @track cidade;
    @track estado;
    @track ibge;
    showResult = false;

    handleCepChange(event) {
        this.cep = event.target.value;
    }

    handleButtonClick() {
        if (!this.cep) {
            this.dispatchEvent(
                new ShowToastEvent({
                    title: 'Erro',
                    message: 'Por favor, preencha o CEP.',
                    variant: 'error'
                })
            );
            return;
        }

        // if (this.cep.length !== 8) {
        //     this.dispatchEvent(
        //         new ShowToastEvent({
        //             title: 'Erro',
        //             message: 'O CEP deve conter 8 dígitos.',
        //             variant: 'error'
        //         })
        //     );
        //     return;
        // }
        this.dispatchEvent(
            new ShowToastEvent({
                title: 'Buscando endereço',
                message: 'Buscando endereço para o CEP informado.',
                variant: 'warning'
            })
        );

        getAddressFromCEPTest({ cep: this.cep })
            .then(result => {
                setTimeout(() => {
                const { logradouro, localidade, uf, ibge, erro } = JSON.parse(result);
                this.rua = logradouro;
                this.cidade = localidade;
                this.estado = uf;
                this.ibge = ibge;
                
                if (!erro) {
                    this.dispatchEvent(
                        new ShowToastEvent({
                            title: 'Sucesso',
                            message: 'Endereço encontrado com sucesso.',
                            variant: 'success'
                        })
                    );
                }
                if (erro) {
                    this.dispatchEvent(
                        new ShowToastEvent({
                            title: 'Erro',
                            message: 'Cep não encontrado',
                            variant: 'error'
                        })
                    );
                    return;
                }
                this.showResult = true;
            })
            }, 5000)
        .catch(error => {
            this.dispatchEvent(
                    new ShowToastEvent({
                        title: 'Erro',
                        message: erro,
                        variant: 'error'
                    })
                );
        });
    }

    mapMarkers = [
        {
            location: {
                City: this.cidade,
                Country: 'BR',
                PostalCode: this.cep,
                State: this.estado,
                Street: this.rua,
            }
        },
    ];
}
