"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
exports.__esModule = true;
var debug_1 = require("debug");
//creating a main class
var Hero = /** @class */ (function () {
    function Hero(name) {
        this.name = "";
        this.xp = Math.floor(Math.random() * 10 + 5);
        this.hunger = Math.floor(Math.random() * this.xp + this.xp);
        this.health = 100;
        this.name = name;
        this.attack = Math.floor((this.xp + this.hunger) / (Math.random() * this.xp));
        this.log = (0, debug_1["default"])("app:hero:".concat(this.name));
    }
    return Hero;
}());
;
// creating some sub classes
var Archer = /** @class */ (function (_super) {
    __extends(Archer, _super);
    function Archer(name) {
        var _this = _super.call(this, name) || this;
        _this.health = 90;
        _this.xp = Math.floor(Math.random() * 8);
        return _this;
    }
    return Archer;
}(Hero));
;
var Knight = /** @class */ (function (_super) {
    __extends(Knight, _super);
    function Knight(name) {
        var _this = _super.call(this, name) || this;
        _this.health = 150;
        _this.xp = Math.floor(Math.random() * 15);
        return _this;
    }
    return Knight;
}(Hero));
;
var Soldier = /** @class */ (function (_super) {
    __extends(Soldier, _super);
    function Soldier(name) {
        var _this = _super.call(this, name) || this;
        _this.health = 100;
        _this.xp = Math.floor(Math.random() * 4);
        return _this;
    }
    return Soldier;
}(Knight));
;
//creating a tribe class
var Tribe = /** @class */ (function () {
    function Tribe(name) {
        this.name = "";
        this.heroes = [];
        this.name = name;
        this.log = (0, debug_1["default"])("app:tribe:".concat(this.name));
    }
    return Tribe;
}());
;
//creating some random  amount tribes to fight two by two 
//and adding randrom amount of heroes in it in a unsorted order
var tribesUn = [];
var rand1 = Math.floor(Math.random() * 5 + 2);
for (var j = 0; j < rand1; j++) {
    tribesUn.push(new Tribe("Tribe ".concat(j)));
    var rand2 = Math.floor(Math.random() * 10);
    for (var k = 0; k < rand2; k++) {
        tribesUn[j].heroes.push(new Archer("archer".concat(k)));
        tribesUn[j].heroes.push(new Knight("knight".concat(k)));
        tribesUn[j].heroes.push(new Soldier("soldier".concat(k)));
    }
}
;
//sorting the tribes array based on the amount of heroes in them so that no problem is gonna be caused
//in the  inner for loops in the war function
var tribes = tribesUn.sort(function (a, b) {
    return b.length - a.length;
});
// creating a simple subtract function to subtract the attack of each hero from enemey health
// and to call it inside the main function 
function checkhealth(a, b) {
    return Math.max(0, Math.floor(a - b));
}
;
// our main war function which basically is a war between two tribes or two indexes of tribes array at a time
function war() {
    // a loop to get the first tribe of the war of the tribes array and get all the first sides of the war
    firstT: for (var index0 = 0; index0 < tribes.length; index0 += 2) {
        //loop to get the second tribe of the war and all the other second ones
        for (var index1 = 1; index1 < tribes.length - 1; index1 += 2) {
            // checking the condition to see if there is no more indexes to go through just log it
            if (index0 >= tribes.length || index1 >= tribes.length) {
                console.log("war ended");
                return;
            }
            else {
                // if there is still tribes to go through it's time to run the main function
                //which applies for each hero of each tribe
                var g = 0;
                var c = 0;
                while (c < tribes[index1].heroes.length && g < tribes[index0].heroes.length) {
                    var healthbar = tribes[index0].heroes[g].health;
                    var damage = tribes[index0].heroes[g].attack;
                    var enemyhealthbar = tribes[index1].heroes[c].health;
                    var enemydamage = tribes[index1].heroes[c].attack;
                    // our main function which subtract the health of and enemy from the attack
                    //and saving the remaining health of each hero in a variable
                    var remaining1 = checkhealth(healthbar, enemydamage);
                    var remaining2 = checkhealth(enemyhealthbar, damage);
                    while (remaining1 > 0 && remaining2 > 0) {
                        // repeationg the attack until one of the heroes health reaches zero 
                        //do the attack replace the health of each hero with the remaining one after the attack
                        // until it reaches zero
                        remaining1 -= enemydamage;
                        remaining2 -= damage;
                        //console.log(remaining2, remaining1);
                    }
                    if (remaining2 <= 0) {
                        // if one of the heros died log it and replaces the health of standing hero 
                        // with the remainig one after the damage 
                        console.log(tribes[index1].heroes[c].name, "died");
                        healthbar = remaining1;
                        enemyhealthbar = remaining2;
                        if (c >= tribes[index1].heroes.length || g >= tribes[index0].heroes.length) {
                            console.log("Tribe ".concat(tribes[index0].name, " Won"));
                            continue firstT;
                        }
                        else {
                            // time for the next hero
                            c++;
                            g++;
                        }
                    }
                    else if (remaining1 <= 0) {
                        console.log(tribes[index0].heroes[g].name, "died");
                        healthbar = remaining1;
                        enemyhealthbar = remaining2;
                        if (g >= tribes[index0].heroes.length || c >= tribes[index1].heroes.length) {
                            console.log("Tribe ".concat(tribes[index1].name, " Won"));
                            continue firstT;
                        }
                        else {
                            // the same as before
                            g++;
                            c++;
                        }
                    }
                }
            }
        }
    }
}
war();
