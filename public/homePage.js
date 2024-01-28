class LogoutButton {
    constructor() {
        this.action = this.logout;
    }

    logout() {
        fetch('/logout', {
            method: 'POST',
        })
        .then(response => {
            if (response.ok) {
                location.reload();
            } else {
                throw new Error('Logout failed');
            }
        })
        .catch(error => {
            console.error('Error:', error);
        });
    }
}
let logoutButton = new LogoutButton();

class RatesBoard {
    constructor() {
        this.table = document.getElementById('ratesTable');
    }

    clearTable() {
        while (this.table.rows.length > 1) {
            this.table.deleteRow(1);
        }
    }

    fillTable(rates) {
        this.clearTable();
        for (let rate of rates) {
            let row = this.table.insertRow();
            let cell1 = row.insertCell(0);
            let cell2 = row.insertCell(1);
            cell1.textContent = rate.currency;
            cell2.textContent = rate.rate;
        }
    }
}

let ratesBoard = new RatesBoard();

function getRates() {
    fetch('/getRates') 
        .then(response => response.json())
        .then(data => ratesBoard.fillTable(data))
        .catch(error => console.error('Error:', error));
}
getRates();
setInterval(getRates, 60000);

class MoneyManager {
    constructor(profileWidget, messageWidget) {
        this.profileWidget = profileWidget;
        this.messageWidget = messageWidget;
    }

    addMoneyCallback = (data) => {
        fetch('/addMoney', { 
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(response => response.json())
        .then(data => {
            this.profileWidget.showProfile(data);
            this.messageWidget.setMessage(`Успешное пополнение баланса на ${data.amount}`);
        })
        .catch(error => {
            this.messageWidget.setMessage(`Ошибка пополнения баланса: ${error.message}`);
        });
    }

    conversionMoneyCallback = (data) => {
        fetch('/convertMoney', { 
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(response => response.json())
        .then(data => {
            this.profileWidget.showProfile(data);
            this.messageWidget.setMessage(`Успешное конвертирование ${data.amount} ${data.from} в ${data.to}`);
        })
        .catch(error => {
            this.messageWidget.setMessage(`Ошибка конвертации: ${error.message}`);
        });
    }

    sendMoneyCallback = (data) => {
        fetch('/transferMoney', { 
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(response => response.json())
        .then(data => {
            this.profileWidget.showProfile(data);
            this.messageWidget.setMessage(`Успешный перевод ${data.amount} ${data.currency} на аккаунт ${data.to}`);
        })
        .catch(error => {
            this.messageWidget.setMessage(`Ошибка перевода: ${error.message}`);
        });
    }
}

class FavoritesWidget {
    constructor(messageWidget) {
        this.messageWidget = messageWidget;
    }

    clearTable() {
        
    }

    fillTable(data) {
       
    }

    updateUsersList(data) {
     
    }

    addUserCallback = (data) => {
        fetch('/addUserToFavorites', { 
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(response => response.json())
        .then(data => {
            this.clearTable();
            this.fillTable(data);
            this.updateUsersList(data);
            this.messageWidget.setMessage(`Успешное добавление пользователя ${data.name} в избранное`);
        })
        .catch(error => {
            this.messageWidget.setMessage(`Ошибка добавления пользователя в избранное: ${error.message}`);
        });
    }

    removeUserCallback = (data) => {
        fetch('/removeUserFromFavorites', { 
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(response => response.json())
        .then(data => {
            this.clearTable();
            this.fillTable(data);
            this.updateUsersList(data);
            this.messageWidget.setMessage(`Успешное удаление пользователя ${data.name} из избранного`);
        })
        .catch(error => {
            this.messageWidget.setMessage(`Ошибка удаления пользователя из избранного: ${error.message}`);
        });
    }
}