public with sharing class AccountSelector {

    @AuraEnabled
    public static List<Account> getAllAccounts(Integer limitRecord){
        return [
            SELECT 
                Id, 
                Name, 
                Phone, 
                Website 
            FROM Account 
            LIMIT :limitRecord
            ];
    }
}