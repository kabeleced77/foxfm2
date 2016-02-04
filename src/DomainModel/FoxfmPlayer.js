function FoxfmPlayer() {
    var _ofmId = 0;
    var _name = '';
    var _age = 0;
    var _strength = 0;
    var _boughtPrice = 0;
    var _boughtSeason = 0;
    var _boughtMatchday = 0;
    var _boughtAge = 0;
    var _boughtStrength = 0;
    var _marketPrice = 0;
    var _lastStartingPrice = 0;
    var _deductedBuyingPrice = 0;

    Object.defineProperties(this, {
        ofmId: {
            set: function (value) { _ofmId = value; },
            get: function () { return _ofmId; },
            enumerable: true,
            configurable: false
        },
        name: {
            set: function (value) { _name = value; },
            get: function () { return _name; },
            enumerable: true,
            configurable: false
        },
        age: {
            set: function (value) { _age = value; },
            get: function () { return _age; },
            enumerable: true,
            configurable: false
        },
        strength: {
            set: function (value) { _strength = value; },
            get: function () { return _strength; },
            enumerable: true,
            configurable: false
        },
        boughtPrice: {
            set: function (value) { _boughtPrice= value; },
            get: function () { return _boughtPrice; },
            enumerable: true,
            configurable: false
        },
        boughtSeason: {
            set: function (value) { _boughtSeason= value; },
            get: function () { return _boughtSeason; },
            enumerable: true,
            configurable: false
        },
        boughtMatchday: {
            set: function (value) { _boughtMatchday= value; },
            get: function () { return _boughtMatchday; },
            enumerable: true,
            configurable: false
        },
        boughtAge: {
            set: function (value) { _boughtAge= value; },
            get: function () { return _boughtAge; },
            enumerable: true,
            configurable: false
        },
        boughtStrength: {
            set: function (value) { _boughtStrength= value; },
            get: function () { return _boughtStrength; },
            enumerable: true,
            configurable: false
        },
        marketPrice: {
            set: function (value) { _marketPrice = value; },
            get: function () { return _marketPrice; },
            enumerable: true,
            configurable: false
        },
        lastStartingPrice: {
            get: function () { return _lastStartingPrice; },
            set: function (value) { _lastStartingPrice = value; },
            enumerable: true,
            configurable: false
        },
        deductedBuyingPrice: {
            get: function () { return _deductedBuyingPrice; },
            set: function (value) { _deductedBuyingPrice = value; },
            enumerable: true,
            configurable: false
        }
    });
}

FoxfmPlayer.prototype.toString = function () { return this.toJson(); };
FoxfmPlayer.prototype.toJson = function () { var tk = new JskaToolkit(); return tk.toJson(this); };
FoxfmPlayer.prototype.fromJson = function (jsonString) { var tk = new JskaToolkit(); return tk.fromJson(this, jsonString); };
