class Account {
    constructor(information) {
        let errorMessage = "";
        this.information = information;
    }

    validateFields() {
        for (let i = 0; i < this.information.length; i++) {
            if (i == 5) {
                if (this.information[6] && this.information[i].length == 0) {
                    this.errorMessage = "Fill out all fields."
                }
            }
            else if (this.information[i].length == 0) {
                this.errorMessage = "Fill out all fields.";
            }
        }
    }

    validatePassword() {
        let password = this.information[2];
        let number = false;
        let capital = false;

        for (let i = 0; i < password.length; i++) {
            let ascii = password.charCodeAt(i);

            if (ascii >= 65 && ascii <= 90)
                capital = true;
            if (ascii >= 48 && ascii <= 57)
                number = true;
        }

        if (!number)
            this.errorMessage = "Password must contain a number."
        if (!capital)
            this.errorMessage = "Password must contain a capital letter.";
        if (password.length != 8)
            this.errorMessage = "Password must be 8 characters long."
    }

    validateID() {
        let id = this.information[3];

        if (id.length != 8)
            this.errorMessage = "ID must be 8 digits long."
        if (isNaN(id))
            this.errorMessage = "ID must contain only digits.";
    }

    validatePhone() {
        let phone = this.information[4];

        if (phone.split(" ").length != 3 && phone.split("-").length != 3)
            this.errorMessage = "Phone number must be split by space or dash";

        if (phone.indexOf(" ") != -1) 
            phone = phone.split(" ").join("");
        else if (phone.indexOf("-") != -1)
            phone = phone.split("-").join("");

        if (phone.length != 10)
            this.errorMessage = "Phone number must be 10 digits.";
        if (isNaN(phone))
            this.errorMessage = "Phone number must contain only digits.";
    }

    validateEmail() {
        let email = this.information[5];

        if (!this.information[6] && email.length == 0)
            return;

        let ampersand = email.indexOf("@");
        let period = email.lastIndexOf(".");

        let length = email.length;
        let domainLength = length - period - 1;


        if (domainLength < 3 || domainLength > 5)
            this.errorMessage = "Email must have valid domain.";
        if (period == -1)
            this.errorMessage = "Email must contain domain.";
        if (ampersand == -1)
            this.errorMessage = "Email must include @ symbol.";
    }

    validate() {
        this.validateEmail();
        this.validatePhone();
        this.validateID();
        this.validatePassword();
        this.validateFields();

        if (this.errorMessage) {
            this.displayError(this.errorMessage);
            return false;
        }
        this.removeError();
        return true;
    }

    compareTo(account) {
        let verify = true;

        for (let i = 0; i < 4; i++) {
            if (this.information[i] != account.information[i]) {
                verify = false;
                break;
            }
        }
        return verify;
    }

    verify() {
        let account = -1;
        for (let i = 0; i < accounts.length; i++)
            if (this.compareTo(accounts[i])) {
                account = i;
                break;
            }
        return account != -1;
    }

    displayError(errorMessage) {
        let title = document.getElementById("title");

        this.removeError();

        let error = document.createElement("h3");
        let text = document.createTextNode(errorMessage);
        
        error.appendChild(text);

        error.style.color = "red";
        error.style.id = "errorMessage";

        title.appendChild(error);
    }

    removeError() {
        let title = document.getElementById("title");
        if (title.childNodes.length != 3)
            title.removeChild(title.childNodes[title.childNodes.length - 1]);
    }
}

let accounts = [];

function createBlankAccounts() {
    accounts.push(new Account(["Shane", "Arcaro", "Passwor0", "00000000", "2015555589", "email@email.com", true]));
    accounts.push(new Account(["John",  "Smith",  "Password0", "11111111", "2015555589", "email@email.com", true]));
    accounts.push(new Account(["Jane",  "Doe",    "Password0", "22222222", "2015555589", "email@email.com", true]));
    accounts.push(new Account(["Tom",   "Shelby", "Password0", "33333333", "2015555589", "email@email.com", true]));
    accounts.push(new Account(["John",  "Shelby", "Password0", "44444444", "2015555589", "email@email.com", true]));
    accounts.push(new Account(["Peter", "Pan",    "Password0", "55555555", "2015555589", "email@email.com", true]));
}

function getData() {
    let mainForm = document.getElementById("mainForm");
    let checkForm = document.getElementById("checkboxForm");
    let dropForm = document.getElementById("dropdownForm");
    let action = dropForm[0].value;

    let accountInfo = [];
    
    for (let i = 0; i < mainForm.length; i++) 
        accountInfo.push(mainForm[i].value);
    
    accountInfo.push(checkForm[0].checked);

    account = new Account(accountInfo);

    let validate = account.validate();

    if (validate) {
        account.removeError();
        let found = account.verify();
        
        if (found) {
            console.log("Account Found!!!");
            this.createDisplay(accountInfo[0], accountInfo[1], action);
        }
        else {
            account.displayError("Account not found.");
            console.log("Account not found.");
        }
    }
}

function reset() {
    let mainForm = document.getElementById("mainForm");
    let checkForm = document.getElementById("checkboxForm");
    let dropForm = document.getElementById("dropdownForm");

    mainForm.reset();
    checkForm.reset();
    dropForm.reset();
}

function createDisplay(firstName, lastName, operation) {
    let title = document.getElementById("title");

    let container = document.createElement("div");
    let titleMessage = document.createElement("h1");
    let paragraphMessage = document.createElement("p");
    let confirmButton = document.createElement("button");

    switch(operation) {
        case "searchRecord":
            operation = "search Florist's records?";
            break;
        case "makeOrder":
            operation = "place an order?";
            break;
        case "updateOrder":
            operation = "update an order?";
            break;
        case "cancelOrder":
            operation = "cancel an order?";
            break;
        case "newAccount":
            operation = "create a new account?";
            break;
    }

    let titleNode = document.createTextNode("Welcome " + firstName + " " + lastName + "!");
    let paragraphNode = document.createTextNode("Are you ready to " + operation);
    let buttonNode = document.createTextNode("Let's go!");

    titleMessage.appendChild(titleNode);
    paragraphMessage.appendChild(paragraphNode);
    confirmButton.appendChild(buttonNode);

    container.style.marginTop = "25rem";
    container.style.backgroundColor = "white";
    container.style.border = "2px solid black";

    container.style.borderRadius = "2%";
    container.style.position = "absolute";
    container.style.zIndex = 2;

    container.style.display = "flex";
    container.style.flexDirection = "column";
    container.style.alignItems = "center";

    container.style.padding = "0 1.5rem 1rem 1.5rem";

    confirmButton.onclick = function() {
        let mainForm = document.getElementById("mainForm");
        mainForm.submit();
    };

    container.appendChild(titleMessage);
    container.appendChild(paragraphMessage);
    container.appendChild(confirmButton);

    title.appendChild(container);
}

function checkBoxPressed() {
    let checkForm = document.getElementById("checkboxForm");
    let emailRequired = document.getElementById("checkRequired");
    let mainForm = document.getElementById("mainForm");

    if (mainForm.childNodes.length != 25) {
        document.getElementById("checkRequired").remove();
    }
    else {
        let requiredTag = document.createElement("p");
        let requiredNode = document.createTextNode("* Required");

        requiredTag.id = "checkRequired";
        requiredTag.classList = ["required_text", "required_flip"];
        requiredTag.style.color = "red";
        requiredTag.style.fontSize = ".75rem";

        document.getElementById("emailAddress").remove();
        requiredTag.appendChild(requiredNode);
        mainForm.appendChild(requiredTag);

        let emailForm = document.createElement("input");
        emailForm.id = "emailAddress";
        emailForm.name = "emailAddress";
        emailForm.placeholder = "Email";
        mainForm.appendChild(emailForm);
    }
}