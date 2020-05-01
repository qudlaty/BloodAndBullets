export class Item {
  name: string = "";
}

export class Weapon extends Item {
  causesBleeding = 0;
  range = 0;
  damage = 0;
}

export class RangedWeapon extends Weapon {
  rounds: number | any = 0;
  maxRounds = 5;

  fire() {
    this.rounds--;
    console.log("Firing ranged weapon. Damage: ", this.damage);
    return this.damage;
  }

  get isAbleToFire() {
    return this.rounds > 0;
  }

  reload() {
    this.rounds = this.maxRounds;
  }
}

class Rifle extends RangedWeapon {
  type = "projectile";
  range = 4;
  damage = 1;
  causesBleeding = 4;
}

class Lazer extends RangedWeapon {
  type = "lazer";
  range = 6;
  damage = 5;
  causesBleeding = 0;
}

export class M16 extends Rifle {
  name = "M16";
  rounds = 15;
  maxRounds = 20;
  damage = 2;
}

export class M40 extends Rifle {
  name = "M41A Pulse Rifle";
  rounds = 40;
  maxRounds = 40;
  damage = 1;
}

export class L30 extends Lazer {
  name = "Assault Lazer Cannon";
  rounds = 3;
  maxRounds = 3;
  damage = 10;
}
