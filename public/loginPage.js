"use strict";

class UserForm {
    constructor() {
      this.loginFormCallback = null;
      this.registerFormCallback = null;
    }
  
    setLoginFormCallback(callback) {
      this.loginFormCallback = callback;
    }
  
    setRegisterFormCallback(callback) {
      this.registerFormCallback = callback;
    }
  }
  
  const userForm = new UserForm();

  function loginFormAction(data) {
    axios.post(login, data)
      .then(response => {
        console.log(response.data); 
  
        if (response.data.success) {
          location.reload();
        } else {
          showError(response.data.error); 
        }
      })
      .catch(error => {
        showError(error.message);
      });
  }
  
  userForm.setLoginFormCallback(loginFormAction);

  function registerFormAction(data) {
    axios.post(register, data)
      .then(response => {
        console.log(response.data); 
  
        if (response.data.success) {
          location.reload(); 
        } else {
          showError(response.data.error); 
        }
      })
      .catch(error => {
        showError(error.message);
      });
  }
  
  userForm.setRegisterFormCallback(registerFormAction);