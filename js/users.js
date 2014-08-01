function User(currentName, currentEmail) {
  this.userName = currentName;
  this.email = currentEmail;
}

User.prototype.validate = function() {
  if(this.isNameEmpty() & this.isEmailValid()) {
    return true;
  }
  else {
    return false;
  }
};

User.prototype.NAME_STR = "([a-zA-Z]+)";

User.prototype.EMAIL_STR = "([a-z]|\d|.|#|$|)*@([a-z]|\d)*.([a-z]{3,}|[a-z]{2,}.[a-z]{2,})";


User.prototype.isNameEmpty = function() {
  var NAME_PATTERN = new RegExp(this.NAME_STR);
  if(!NAME_PATTERN.test(this.userName)) {
    alert("Please Enter Name");
    return false;
  }
  else {
    return true;
  }
};

User.prototype.isEmailValid = function() {
  var EMAIL_PATTERN = new RegExp(this.EMAIL_STR);
  if(!EMAIL_PATTERN.test(this.email)) {
    alert("Please Enter Correct Email id");
    return false;
  }
  else {
    return true;
  }
};