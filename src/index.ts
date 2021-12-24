import debug from 'debug';
//creating a main class
class Hero {
  name: string = "";
  health: number;
  hunger: number;
  xp: number;
  attack: number;
  log: debug.Debugger
  constructor(name: string) {
    this.xp = Math.floor(Math.random() * 10 + 5);
    this.hunger = Math.floor(Math.random() * this.xp + this.xp);
    this.health = 100;
    this.name = name;
    this.attack = Math.floor((this.xp + this.hunger) / (Math.random() * this.xp));
    this.log = debug(`app:hero:${this.name}`);
  }
};
// creating some sub classes
class Archer extends Hero {
  constructor(name: string) {
    super(name);
    this.health = 90;
    this.xp = Math.floor(Math.random() * 8);
  }
};

class Knight extends Hero {
  constructor(name: string) {
    super(name);
    this.health = 150;
    this.xp = Math.floor(Math.random() * 15);
  }
};

class Soldier extends Knight {
  constructor(name: string) {
    super(name);
    this.health = 100;
    this.xp = Math.floor(Math.random() * 4);
  }
};
//creating a tribe class
class Tribe {
  name: string = "";
  heroes: Hero[] = [];
  log: debug.Debugger;
  length: any;
  constructor(name: string) {
    this.name = name;
    this.log = debug(`app:tribe:${this.name}`);
  }

};

//creating some random  amount tribes to fight two by two 
//and adding randrom amount of heroes in it in a unsorted order
const tribesUn: Tribe[] = [];
let rand1: number = Math.floor(Math.random() * 5 + 2);
for (let j = 0; j < rand1; j++) {
  tribesUn.push(new Tribe(`Tribe ${j}`));
  let rand2: number = Math.floor(Math.random() * 10);
  for (let k = 0; k < rand2; k++) {
    tribesUn[j].heroes.push(new Archer(`archer${k}`));
    tribesUn[j].heroes.push(new Knight(`knight${k}`));
    tribesUn[j].heroes.push(new Soldier(`soldier${k}`));
  }
};
//sorting the tribes array based on the amount of heroes in them so that no problem is gonna be caused
//in the  inner for loops in the war function
const tribes = tribesUn.sort(function (a, b) {
  return b.length - a.length;
});
// creating a simple subtract function to subtract the attack of each hero from enemey health
// and to call it inside the main function 
function checkhealth(a: number, b: number): number {
  return Math.max(0, Math.floor(a - b));
};

// our main war function which basically is a war between two tribes or two indexes of tribes array at a time

function war() {
  // a loop to get the first tribe of the war of the tribes array and get all the first sides of the war
  firstT:
  for (let index0 = 0; index0 < tribes.length; index0 += 2) {
    //loop to get the second tribe of the war and all the other second ones
    for (let index1 = 1; index1 < tribes.length - 1; index1 += 2) {
      // checking the condition to see if there is no more indexes to go through just log it
      if (index0 >= tribes.length || index1 >= tribes.length) {
        console.log(`war ended`)
        return
      } else {
        // if there is still tribes to go through it's time to run the main function
        //which applies for each hero of each tribe
        let g = 0;
        let c = 0;
        while (c < tribes[index1].heroes.length && g < tribes[index0].heroes.length) {
          let healthbar = tribes[index0].heroes[g].health;
          let damage = tribes[index0].heroes[g].attack;
          let enemyhealthbar = tribes[index1].heroes[c].health;
          let enemydamage = tribes[index1].heroes[c].attack;
          // our main function which subtract the health of and enemy from the attack
          //and saving the remaining health of each hero in a variable
          let remaining1 = checkhealth(healthbar, enemydamage);
          let remaining2 = checkhealth(enemyhealthbar, damage);
          while (remaining1 > 0 && remaining2 > 0) {
            // repeationg the attack until one of the heroes health reaches zero 
            //do the attack replace the health of each hero with the remaining one after the attack
            // until it reaches zero
            remaining1 -= enemydamage;
            remaining2 -= damage;
            //console.log(remaining2, remaining1);
          } if (remaining2 <= 0) {
            // if one of the heros died log it and replaces the health of standing hero 
            // with the remainig one after the damage 
            console.log(tribes[index1].heroes[c].name, "died");
            healthbar = remaining1;
            enemyhealthbar = remaining2;
            if (c >= tribes[index1].heroes.length || g >= tribes[index0].heroes.length) {
              console.log(`Tribe ${tribes[index0].name} Won`)
              continue firstT;
            } else {
              // time for the next hero
              c++;
              g++;
            }
          } else if (remaining1 <= 0) {
            console.log(tribes[index0].heroes[g].name, "died");
            healthbar = remaining1;
            enemyhealthbar = remaining2;
            if (g >= tribes[index0].heroes.length || c >= tribes[index1].heroes.length) {
              console.log(`Tribe ${tribes[index1].name} Won`)
              continue firstT
            } else {
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
