import { Rifle, Lazer } from "services";

export class M16 extends Rifle {
  name = "🔫M16";
  rounds = 15;
  maxRounds = 20;
  damage = 2;
}

export class M40 extends Rifle {
  name = "👽M41A Pulse Rifle";
  rounds = 40;
  maxRounds = 40;
  damage = 1;
}

export class L30 extends Lazer {
  name = "☀️Assault Lazer Cannon";
  rounds = 30;
  maxRounds = 30;
  damage = 3;
  description: "";
  manufacturer: "";
  previousOwners: [];
}
