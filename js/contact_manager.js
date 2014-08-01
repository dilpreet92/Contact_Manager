function Manager(elements) {
  this.nameInputBoxElement = elements.nameInputBoxElement;
  this.emailInputBoxElement = elements.emailInputBoxElement;
  this.searchInputBoxElement = elements.searchInputBoxElement;
  this.addButtonElement = elements.addButtonElement;
  this.showUsersBox = elements.showUsersBox;
};


Manager.prototype.addUser = function() {
  var userObj = new User(this.nameInputBoxElement.val(), this.emailInputBoxElement.val());
  if(userObj.validate()) {
    this.createBox(userObj);
  }
  else {
    delete userObj;
  }
};

Manager.prototype.setDivText = function(currentUserObject) {
  return ("Name : " + currentUserObject.userName + " " + "Email : " + currentUserObject.email);
};

Manager.prototype.createBox = function(currentUserObject) {
  var box = $("<div/>").addClass("contactBox")
           .attr('data-name', currentUserObject.userName)
           .text(this.setDivText(currentUserObject));
  this.createContainerClass(box, currentUserObject);         
};

Manager.prototype.createContainerClass = function(currentContainerBox, currentUserObject) {
  var containerBoxObj = new ContainerBox(currentContainerBox, currentUserObject);
  this.showContainerBox(containerBoxObj);
};

Manager.prototype.showContainerBox = function(containerBoxObj) {
  var box = containerBoxObj.box,
      deleteButton = $("<button/>").text("Delete").addClass("deletebutton").data("currentBox", containerBoxObj);
  box.append(deleteButton).appendTo(this.showUsersBox);
  
};

Manager.prototype.removeContainerBox = function(currentDeleteButton) {
  var containerBoxObj = currentDeleteButton.data("currentBox");
  containerBoxObj.box.remove(); 
  containerBoxObj.userObj = null;
  delete containerBoxObj;  
};

Manager.prototype.searchUserList = function(currentTextSearch) {
  if(currentTextSearch) {
    $("div.contactBox[data-name^="+currentTextSearch+"]").show();
    $("div.contactBox").not("[data-name^="+currentTextSearch+"]").hide();
  }
  else {
    $("div.contactBox").show();
  }
};

Manager.prototype.bindEvents = function() {
	var _this = this;

  this.addButtonElement.on("click", function(e) {
    _this.addUser();
    _this.nameInputBoxElement.val("");
    _this.emailInputBoxElement.val("");
    e.preventDefault();
  }); 
   
  this.showUsersBox.on("click", ".deletebutton", function() {
    _this.removeContainerBox($(this));
  });

  this.searchInputBoxElement.on("keyup",function() {
    _this.searchUserList(_this.searchInputBoxElement.val());
  });

};

$(document).ready(function() {
  var elements = {
    "nameInputBoxElement" : $("#nameInputBox"),
    "emailInputBoxElement" : $("#emailInputBox"),
    "searchInputBoxElement" : $("#searchInputBox"),
    "addButtonElement" : $("#addButton"),
    "showUsersBox" : $("#showUsers")
  };
  var managerObj = new Manager(elements);
  managerObj.bindEvents();
});