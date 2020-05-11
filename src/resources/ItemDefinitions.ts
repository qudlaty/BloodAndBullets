import { Rifle, Lazer } from "../services";

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
