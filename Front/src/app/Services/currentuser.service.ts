import { Injectable } from '@angular/core';
import { Iclaims } from '../Interfaces/iclaims';

@Injectable({
  providedIn: 'root'
})
export class CurrentuserService {

  constructor() { }

  CurrentUser : Iclaims = {
    Actor: 'N/A',
    PostalCode: 'N/A',
    PrimaryGroupSid: 'N/A',
    PrimarySid: 'N/A',
    Role: 'N/A',
    Rsa: 'N/A',
    SerialNumber: 'N/A',
    Sid: 'N/A',
    Spn: 'N/A',
    StateOrProvince: 'N/A',
    StreetAddress: 'N/A',
    Surname: 'N/A',
    System: 'N/A',
    Thumbprint: 'N/A',
    Upn: 'N/A',
    Uri: 'N/A',
    UserData: 'N/A',
    Version: 'N/A',
    Webpage: 'N/A',
    WindowsAccountName: 'N/A',
    WindowsDeviceClaim: 'N/A',
    WindowsDeviceGroup: 'N/A',
    WindowsFqbnVersion: 'N/A',
    WindowsSubAuthority: 'N/A',
    OtherPhone: 'N/A',
    NameIdentifier: 'N/A',
    Name: 'N/A',
    MobilePhone: 'N/A',
    Anonymous: 'N/A', 
    Authentication: 'N/A',
    AuthenticationInstant: 'N/A',
    AuthenticationMethod: 'N/A',
    AuthorizationDecision: 'N/A',
    CookiePath: 'N/A',
    Country: 'N/A',
    DateOfBirth: 'N/A',
    DenyOnlyPrimaryGroupSid: 'N/A',
    DenyOnlyPrimarySid: 'N/A',
    DenyOnlySid: 'N/A',
    WindowsUserClaim: 'N/A',
    DenyOnlyWindowsDeviceGroup: 'N/A',
    Dsa: 'N/A',
    Email: 'N/A',
    Expiration: 'N/A',
    Expired: 'N/A',
    Gender: 'N/A',
    GivenName: 'N/A',
    GroupSid: 'N/A',
    Hash: 'N/A',
    HomePhone: 'N/A',
    IsPersistent: 'N/A',
    Locality: 'N/A',
    Dns: 'N/A',
    X500DistinguishedName: 'N/A',
  };

}
