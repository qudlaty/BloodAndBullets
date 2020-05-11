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

// TODO: Should add kinetic/thermal damage
export class Rifle extends RangedWeapon {
  type = "projectile";
  range = 4;
  damage = 1;
  causesBleeding = 4;
}

export class Lazer extends RangedWeapon {
  type = "lazer";
  range = 6;
  damage = 5;
  causesBleeding = 0;
}
