import { LightningElement } from 'lwc';

import getContacts from '@salesforce/apex/ContactService.getContacts';
import { NavigationMixin } from 'lightning/navigation';
import { deleteRecord } from 'lightning/uiRecordApi';
 
const columns = [   
    { label: 'Id', fieldName: 'Id' },
    { label: 'Name', fieldName: 'Name' },
    { label: 'Position', fieldName: 'Position__c' },
    { label: 'City', fieldName: 'City__c' },
    { label: 'Mobile number', fieldName: 'Mobile_number__c' },
    { label: 'View Action',type: "button", typeAttributes: {
        label: 'View',
        name: 'view',
        title: 'View',
        value: 'view',
        iconPosition: 'center'
    } },
    { label: 'Edit Action', type: "button", typeAttributes: {
        label: 'Edit',
        name: 'edit',
        title: 'Edit',
        value: 'edit',
        iconPosition: 'center'
    } },
    { label: 'Delete Action', type: "button", typeAttributes: {
        label: 'Delete',
        name: 'delete',
        title: 'Delete',
        value: 'delete',
        iconPosition: 'center'
    } }
];

export default class DataTable extends NavigationMixin( LightningElement ) {
    contacts;
    error;
    columns = columns;

    handleKeyChange( event ) {
        const searchKey = event.target.value;
        if ( searchKey ) {
            getContacts( { searchKey } )   
            .then(result => {
                this.contacts = result;
            })
            .catch(error => {
                this.error = error;
            });
        } else
        this.contacts = undefined;
    }
    handleRowAction( event ) {
        const actionName = event.detail.action.name;
        const row = event.detail.row;
        switch ( actionName ) {
            case 'view':
                this[ NavigationMixin.Navigate ]( {
                    type: 'standard__recordPage',
                    attributes: {
                        recordId: row.Id,
                        actionName: 'view'
                    }
                } );
                break;
            case 'edit':
                this[ NavigationMixin.Navigate ]( {
                    type: 'standard__recordPage',
                    attributes: {
                        recordId: row.Id,
                        objectApiName: 'Contact',
                        actionName: 'edit'
                    }
                });
                break;
            case 'delete':
                this.deleteContact(row.Id);
                break;
            default:
        }
    }

    deleteContact(recordId) {
        deleteRecord(recordId)
            .then(() => {
                this.contacts = this.contacts.filter(contact => contact.Id !== recordId);
            })
            .catch((error) => {
                this.error=error;
            });
    }

}


