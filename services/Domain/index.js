import ActiveDirectory from 'activedirectory2';
var config = { url: 'ldap://dc.ceramicaitalia.com',
               baseDN: 'dc=ceramicaitalia,dc=com',
               }
var ad = new ActiveDirectory(config);
var username = 'john.smith@domain.com';
var password = 'password';

ad.authenticate(username, password, function(err, auth) {
  if (err) {
    console.log('ERROR: '+JSON.stringify(err));
    return;
  }
  if (auth) {
    console.log('Authenticated!');
  }
  else {
    console.log('Authentication failed!');
  }
});