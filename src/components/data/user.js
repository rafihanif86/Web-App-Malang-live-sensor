class User {
    _name;
    _email;
    _phone;
    _newLog;
    _status;
    
    constructor(name, email, phone, newLog, status){
        this._name = name;
        this._email = email;
        this._phone = phone;
        this._newLog = newLog;
        this._status = status;
    }

    constructor(){}

    get name() {return this._name;}

    set name(value) {this._name = value;}

    get email() {return this._email;}

    set email(value) {this._email = value;}

    get phone() {return this._phone;}

    set phone(value) {this._phone = value;}

    get newLog() {return this._newLog;}

    set newLog(value) {this._newLog = value;}

    get status() {return this._status;}

    set status(value) {this._status = value;}
}