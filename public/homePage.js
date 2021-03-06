'use strict'
const logoutButton = new LogoutButton;

logoutButton.action = f => ApiConnector.logout(response => {
    if (response.success === true) {
        location.reload(); 
        } 
   });

     
ApiConnector.current(response => {
    if (response.success === true) {
        ProfileWidget.showProfile(response.data)
        }
    });


const ratesBoard = new RatesBoard;

let timerId = setInterval(ApiConnector.getStocks(response => {

  if (response.success === true) {

     ratesBoard.clearTable();
     ratesBoard.fillTable(response.data)
  }

}), 120000);    


const moneyManager = new MoneyManager;

moneyManager.addMoneyCallback = data => ApiConnector.addMoney(data, response => {
    if (response.success === true) {

        moneyManager.addMoneyForm.reset = ProfileWidget.showProfile(response.data); 
        moneyManager.setMessage(response.success, "Операция прошла успешно")

        } else {
            moneyManager.setMessage(response.success, response.error)
        }
   });

   

moneyManager.conversionMoneyCallback = data => ApiConnector.convertMoney(data, response => {
    if (response.success === true) {

        moneyManager.conversionMoneyForm.reset = ProfileWidget.showProfile(response.data); 
        moneyManager.setMessage(response.success, "Операция прошла успешно")
        
        } else {
            moneyManager.setMessage(response.success, response.error)
        }
   });

moneyManager.sendMoneyCallback = data => ApiConnector.transferMoney(data, response => {
    if (response.success === true) {

        moneyManager.sendMoneyForm.reset = ProfileWidget.showProfile(response.data); 
        moneyManager.setMessage(response.success, "Операция прошла успешно")
        
        } else {
            moneyManager.setMessage(response.success, response.error)
            console.log(response)
        }
   });

  const favoritesWidget = new FavoritesWidget;
   
  ApiConnector.getFavorites(response => {
    if (response.success === true) {
        favoritesWidget.clearTable();
        favoritesWidget.fillTable(response.data);
        moneyManager.updateUsersList(response.data);
        }
    });

    favoritesWidget.addUserCallback = data => ApiConnector.addUserToFavorites(data, response => {
        if (response.success === true) {
    
            favoritesWidget.clearTable();
            favoritesWidget.fillTable(response.data);
            moneyManager.updateUsersList(response.data);
            favoritesWidget.setMessage(response.success, "Операция прошла успешно")
            
            } else {
                moneyManager.setMessage(response.success, response.error)
                
            }
        });
    
        
    favoritesWidget.removeUserCallback = data => ApiConnector.removeUserFromFavorites(data, response => {
        if (response.success === true) {
    
            favoritesWidget.clearTable();
            favoritesWidget.fillTable(response.data);
            moneyManager.updateUsersList(response.data);
            favoritesWidget.setMessage(response.success, "Операция прошла успешно")
            } else {
                moneyManager.setMessage(response.success, response.error)
            }
        });        