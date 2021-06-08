class Log {
    _user;
    _humidity;
    _temperature;
    _latitude;
    _logitude;
    _time;
    

    Log(user, humidity, temperature, latitude, logitude, time){
        this._user = user;
        this._humidity = humidity;
        this._temperature = temperature;
        this._latitude = latitude;
        this._logitude = logitude;
        this._time = time;
    }    

    Log (){

    }

    get time() {return this._time;}

    set time(value) {this._time = value;}

    get logitude() {return this._logitude;}

    set logitude(value) {this._logitude = value;}

    get latitude() {return this._latitude;}

    set latitude(value) {this._latitude = value;}

    get temperature() {return this._temperature;}

    set temperature(value) {this._temperature = value;}

    get humidity() {return this._humidity;}

    set humidity(value) {this._humidity = value;}

    get user() {return this._user;}

    set user(value) {this._user = value;}
    
}