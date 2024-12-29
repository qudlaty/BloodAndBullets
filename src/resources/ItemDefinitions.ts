import { ProjectileWeapon, EnergyWeapon, RechargableEnergyWeapon } from "services";

export class G17 extends ProjectileWeapon {
  properties: Partial<ProjectileWeapon> = {
    name: "G17",
    description:
      `High capacity semi-automatic pistol, mass-produced on Old Terra. ` + //
      `Still millions of them are in use today. Cheap and reliable. ` +
      `Fires the ever-popular 9mm Parabellum bullet.`,
    manufacturer: "Glock Ges.m.b.H.",
    charges: 17,
    maxCharges: 17,
    reloadCostInAP: 1,
    damage: 2,
    range: 4,
    mass: 1,
  };
  constructor() {
    super();
    Object.assign(this, this.properties);
  }
}
export class M16 extends ProjectileWeapon {
  properties: Partial<ProjectileWeapon> = {
    name: "M16",
    description: `Ancient combat rifle from Old Terra. Relatively light. Fires 5.56mm FMJ rounds.`,
    manufacturer: `Colt's Manufacturing Company`,
    charges: 20,
    maxCharges: 20,
    reloadCostInAP: 4,
    damage: 3,
    range: 8,
    mass: 3,
  };
  constructor() {
    super();
    Object.assign(this, this.properties);
  }
}

export class M40 extends ProjectileWeapon {
  properties: Partial<ProjectileWeapon> = {
    name: "M41A Pulse Rifle",
    description:
      `Heavy but effective long range kinetic weapon. ` + //
      `Fires 10 millimeter explosive-tip caseless. ` +
      `Standard light armor-piercing round. ` +
      `Excells at neutralizing alien threats. `,
    manufacturer: "Armat Battlefield Systems",
    charges: 10,
    maxCharges: 10,
    reloadCostInAP: 4,
    damage: 5,
    range: 10,
    mass: 4,
  };
  constructor() {
    super();
    Object.assign(this, this.properties);
  }
}

export class M37 extends ProjectileWeapon {
  properties: Partial<ProjectileWeapon> = {
    name: "Ithaca 37 Shotgun",
    description: "Good to keep it handy for close encounters. Better than harsh language.",
    manufacturer: "Ithaca Gun Company",
    charges: 6,
    maxCharges: 6,
    reloadCostInAP: 4,
    damage: 15,
    range: 3,
    mass: 3,
    causesBleeding: 10,
  };
  causedKnockback = 3;
  constructor() {
    super();
    Object.assign(this, this.properties);
  }
}
export class L30 extends EnergyWeapon {
  properties: Partial<EnergyWeapon> = {
    name: "L30 Beam Laser",
    description: "Portable 30kW Energy beam weapon. Fed by energy magazines.",
    manufacturer: "Amaar Industries",
    previousOwners: ["Amaar Industries Factory"],
    charges: 5,
    maxCharges: 5,
    reloadCostInAP: 2,
    damage: 7,
    range: 10,
    mass: 2,
  };
  constructor() {
    super();
    Object.assign(this, this.properties);
  }
}

export class R40 extends RechargableEnergyWeapon {
  properties: Partial<RechargableEnergyWeapon> = {
    name: "R40 Rechargable Laser",
    charges: 1,
    maxCharges: 3,
    damage: 7,
    range: 10,
    mass: 3,
    description:
      `Portable 40kW Energy beam weapon. ` +
      `Charged over time by an onboard micro-reactor. ` +
      `Gains one charge per turn.`,
    manufacturer: "Amaar Industries",
    previousOwners: ["Intaki Syndicate", "Amaar Industries Factory"],
  };
  constructor() {
    super();
    Object.assign(this, this.properties);
  }
}

export class K01 extends ProjectileWeapon {
  properties: Partial<ProjectileWeapon> = {
    name: "K01 Slugcaster",
    description:
      `Three shot revolver pattern hand cannon. ` + //
      `Favorite among pioneers on planet Pandora, ` +
      `where it's praised for effectiveness against local big-scale wildlife. ` +
      `Fires tungsten tipped depleted uranium slugs, 12x44mm. ` +
      `This thing packs a serious punch.`,
    manufacturer: "Kavashikari Industries",
    charges: 3,
    maxCharges: 3,
    reloadCostInAP: 3,
    damage: 10,
    range: 4,
    mass: 1,
  };
  constructor() {
    super();
    Object.assign(this, this.properties);
  }
}
