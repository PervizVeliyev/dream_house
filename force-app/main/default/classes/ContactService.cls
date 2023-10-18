public with sharing class ContactService {
  @AuraEnabled(cacheable=true)
  public static List<Contact__c> getContacts(String searchKey) {
    String theKey = '%' + searchKey + '%';

    try {
      return [
        SELECT
          Id,
          Name,
          Position__c,
          Mobile_number__c,
          State__c,
          Address__c,
          City__c,
          Nationality__c
        FROM Contact__c
        WHERE Name LIKE :theKey
        WITH SECURITY_ENFORCED
      ];
    } catch (Exception e) {
      return new List<Contact__c>();
    }
  }

  @AuraEnabled
  public static void deleteContact(String recordId) {
    try {
      Contact__c contactToDelete = [
        SELECT Id
        FROM Contact__c
        WHERE Id = :recordId
        WITH SECURITY_ENFORCED
        LIMIT 1
      ];
      delete contactToDelete;
    } catch (Exception e) {
    }
  }
}
