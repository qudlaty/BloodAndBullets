import { Rifle, Lazer } from "services";

export class M16 extends Rifle {
  name = "M16";
  rounds = 30;
  maxRounds = 30;
  reloadCostInAP = 4;
  damage = 3;
}

export class M40 extends Rifle {
  name = "M41A Pulse Rifle";
  rounds = 10;
  maxRounds = 10;
  reloadCostInAP = 4;
  damage = 5;
}

export class L30 extends Lazer {
  name = "Assault Lazer Cannon";
  rounds = 5;
  maxRounds = 10;
  reloadCostInAP = 2;
  damage = 10;
  description: "Portable 30kW Energy beam weapon";
  manufacturer: "Amaar Industries";
  previousOwners: ["Amaar Industries Factory"];
}
