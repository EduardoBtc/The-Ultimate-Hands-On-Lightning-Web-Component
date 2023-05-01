public with sharing class AddressController {
    @AuraEnabled(cacheable=false)
    public static String getAddressFromCEP(String cep) {
        System.debug('CEP: ' + cep);
        Http http = new Http();
        HttpRequest request = new HttpRequest();
        request.setEndpoint('https://viacep.com.br/ws/' + cep + '/json/');
        request.setMethod('GET');
        HttpResponse response = http.send(request);
        String result = '';

        if (response.getStatusCode() == 200)
            result = response.getBody();

        System.debug('Result: ' + result);
            
        return result;        
    }

}