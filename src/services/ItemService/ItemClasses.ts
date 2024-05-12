export class Item {
  constructor() {
    this.id = crypto.randomUUID();
  }
  id: string;
  name: string = "";
}

export class Weapon extends Item {
  type: WeaponType;
  causesBleeding = 0;
  range = 0;
  damage = 0;
}

export class RangedWeapon extends Weapon {
  rounds: number | any = 0;
  maxRounds = 5;
  reloadCostInAP = 1;

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
export enum WeaponType {
  projectile = "projectile",
  energy = "energy",
}

export class Rifle extends RangedWeapon {
  type = WeaponType.projectile;
  range = 8;
  damage = 1;
  causesBleeding = 2;
}

export class Lazer extends RangedWeapon {
  type = WeaponType.energy;
  range = 10;
  damage = 5;
  causesBleeding = 0;
}
