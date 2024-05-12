import { MessageService } from "services/MessageService";

export class Item {
  constructor() {
    this.id = crypto.randomUUID();
  }
  id: string;
  name: string = "";
  description?: string = "";
  manufacturer?: string = "";
  previousOwners?: any[];
  mass?: number = 0;
}

export class Weapon extends Item {
  type: WeaponType;
  range: number = 0;
  damage: number = 0;
  causesBleeding: number = 0;
  causesBurning: number = 0;
}

export class RangedWeapon extends Weapon {
  charges: number | any = 0;
  maxCharges = 5;
  reloadCostInAP = 1;
  dischargeRatePerShot = 1;

  fire() {
    this.charges--;
    console.log("Firing ranged weapon. Damage: ", this.damage);
    return this.damage;
  }

  get isAbleToFire() {
    return this.charges > 0;
  }

  reload() {
    this.charges = this.maxCharges;
  }
}

export class EnergyWeapon extends RangedWeapon {
  type = WeaponType.energy;
}
export class RechargableWeapon extends EnergyWeapon {
  chargingPerTurn = 0;
  reloadCostInAP = 0;
  reload() {
    MessageService.send(`Rechargable weapons can't be reloaded manually.`);
  }
  recharge() {
    if (this.charges < this.maxCharges) {
      this.charges++;
    }
  }
}

// TODO: Should add kinetic/thermal damage
export enum WeaponType {
  projectile = "projectile",
  energy = "energy",
}

export class Rifle extends RangedWeapon {
  constructor() {
    super();
    this.type = WeaponType.projectile;
    this.range = 8;
    this.damage = 1;
    this.causesBleeding = 2;
  }
}

export class LaserGun extends RangedWeapon {
  constructor() {
    super();
    this.type = WeaponType.energy;
    this.range = 10;
    this.damage = 5;
    this.causesBleeding = 0;
  }
}

export class RechargableLaserGun extends RechargableWeapon {
  constructor() {
    super();
    this.type = WeaponType.energy;
    this.range = 10;
    this.damage = 5;
    this.causesBleeding = 0;
  }
}
