@isTest
public class ContactServiceTest {
  @isTest
  static void testGetContacts() {
    List<Contact__c> testContacts = new List<Contact__c>();
    testContacts.add(new Contact__c(Name = 'John Doe'));
    insert testContacts;

    List<Contact__c> resultContacts = ContactService.getContacts('John');
    System.assertEquals(1, resultContacts.size());
    System.assertEquals('John Doe', resultContacts[0].Name);
  }

  @isTest
  static void testDeleteContact() {
    Contact__c testContact = new Contact__c(Name = 'Test Contact');
    insert testContact;
    ContactService.deleteContact(testContact.Id);

    List<Contact__c> deletedContacts = [
      SELECT Id
      FROM Contact__c
      WHERE Id = :testContact.Id
    ];

    System.assertEquals(0, deletedContacts.size());
  }
}
