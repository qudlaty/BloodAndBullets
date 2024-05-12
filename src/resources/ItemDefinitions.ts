import { Rifle, LaserGun, RechargableWeapon, RechargableLaserGun } from "services";

export class M16 extends Rifle {
  name = "M16";
  charges = 30;
  maxCharges = 30;
  reloadCostInAP = 4;
  damage = 3;
}

export class M40 extends Rifle {
  name = "M41A Pulse Rifle";
  charges = 10;
  maxCharges = 10;
  reloadCostInAP = 4;
  damage = 5;
}

export class M37 extends Rifle {
  name = "Ithaca 37 Shotgun";
  charges = 6;
  maxCharges = 6;
  reloadCostInAp = 4;
  damage = 5;
  range = 5;
  causesBleeding = 5;
  causedKnockback = 3;
}
export class L30 extends LaserGun {
  values: Partial<LaserGun> = {
    name: "L30 Beam Laser",
    description: "Portable 30kW Energy beam weapon. Fed by energy magazines.",
    manufacturer: "Amaar Industries",
    previousOwners: ["Amaar Industries Factory"],
    charges: 5,
    maxCharges: 5,
    reloadCostInAP: 2,
    damage: 10,
  };
  constructor() {
    super();
    Object.assign(this, this.values);
  }
}

export class R40 extends RechargableLaserGun {
  values: Partial<RechargableLaserGun> = {
    name: "R40 Rechargable Laser",
    charges: 1,
    maxCharges: 3,
    mass: 2,
    damage: 10,
    description:
      `Portable 40kW Energy beam weapon. ` +
      `Charged over time by an onboard micro-reactor. ` +
      `Gains one charge per turn.`,
    manufacturer: "Amaar Industries",
    previousOwners: ["Amaar Industries Factory"],
  };
  constructor() {
    super();
    Object.assign(this, this.values);
  }
}
