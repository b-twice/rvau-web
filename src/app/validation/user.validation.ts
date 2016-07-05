import {Component} from '@angular/core';
import {ControlGroup , Control} from '@angular/common';

/* Below is copied from: https://plnkr.co/edit/ukwCXm?p=preview
  Custom validators to use everywhere.
*/

// SINGLE FIELD VALIDATORS
export function emailValidator(control: Control): { [key: string]: any } {
    var emailRegexp = /^[a-z0-9!#$%&'*+\/=?^_`{|}~.-]+@[a-z0-9]([a-z0-9-]*[a-z0-9])?(\.[a-z0-9]([a-z0-9-]*[a-z0-9])?)*$/i;
    if (control.value && !emailRegexp.test(control.value)) {
        return { invalidEmail: true };
    }
}

//CONTROL GROUP VALIDATORS
export function matchingPasswords(passwordKey: string, confirmPasswordKey: string) {
    return (group: ControlGroup): { [key: string]: any } => {
        let password = group.controls[passwordKey];
        let confirmPassword = group.controls[confirmPasswordKey];

        if (password.value !== confirmPassword.value) {
            return {
                mismatchedPasswords: true
            };
        }
    }
}

//
export function passwordValidator(control: Control): { [key: string]: any } {
        const minLength = 5; 
        
        if(control.value && control.value.length < minLength)
            return { complexPassword: true }; 
}