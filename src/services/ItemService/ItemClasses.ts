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

// TODO: Should add kinetic/thermal damage
export enum WeaponType {
  projectile = "projectile",
  energy = "energy",
}

export class ProjectileWeapon extends RangedWeapon {
  type = WeaponType.projectile;
  causesBleeding = 5;
  causesBurning = 1;
}
export class EnergyWeapon extends RangedWeapon {
  type = WeaponType.energy;
  causesBleeding = 0;
  causesBurning = 6;
}

export class RechargableEnergyWeapon extends EnergyWeapon {
  chargingPerTurn = 1;
  reloadCostInAP = 0;
  reload() {
    MessageService.send(`Rechargable weapons can't be reloaded manually.`);
  }
  recharge() {
    if (this.charges < this.maxCharges) {
      this.charges += this.chargingPerTurn;
    }
  }
}
