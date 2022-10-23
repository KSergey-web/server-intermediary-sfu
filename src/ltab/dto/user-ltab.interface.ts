export interface IUserLtab {
  dn: string;
  MailBoxAccess: string;
  mMail: string;
  otherMailbox: string;
  homeDrive: string;
  mSDSHomeDirectory: string;
  DBUID: string;
  studTypeOfEducation: string;
  studRecordbookNumber: string;
  studInstitute: string;
  studGroup: string;
  dialupAccess: string;
  radiusProfileDn: string;
  radiusFramedIPAddress: string;
  middleName: string;
  accessCardNumber: string;
  employeeStatus: string;
  mail: string;
  givenName: string;
  fullName: string;
  Language: string;
  messageServer: string;
  title: string;
  sn: string;
  passwordUniqueRequired: string;
  passwordRequired: string;
  passwordMinimumLength: string;
  passwordExpirationTime: string;
  passwordExpirationInterval: string;
  passwordAllowChange: string;
  ou: string[];
  objectClass: string[];
  loginTime: string;
  loginGraceRemaining: string;
  loginGraceLimit: string;
  ndsHomeDirectory: string;
  cn: string;
  ACL: string[];
}
