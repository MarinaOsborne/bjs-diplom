'use strict'
const logoutButton = new LogoutButton;

logoutButton.action = ApiConnector.logout(response => console.log(response))
// logoutButton.action = ApiConnector.logout(response => {
//     console.log(response);
// //   if (response.success === true) location.reload(); 
        
    // }));
   