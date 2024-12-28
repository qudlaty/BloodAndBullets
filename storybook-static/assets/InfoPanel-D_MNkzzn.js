var W=Object.defineProperty;var G=(a,e,i)=>e in a?W(a,e,{enumerable:!0,configurable:!0,writable:!0,value:i}):a[e]=i;var t=(a,e,i)=>G(a,typeof e!="symbol"?e+"":e,i);import{j as l}from"./jsx-runtime-BjgbQsUx.js";import{R as L}from"./index-DEBVq0NN.js";function S(a,...e){a.forEach(i=>{e.forEach(s=>{i&&(i[s]=void 0)})})}function R(a,e,i){return a<e&&(a=e),a>i&&(a=i),a}function C(a,e){return Math.floor(Math.random()*(e-a+1))+a}function me(a,e){let i;return e>=0?i=-Math.atan(a/e)*(180/Math.PI):e<0&&(i=180/Math.PI*(Math.atan(a/-e)+Math.PI)),i}function ge(a,e){return Math.sqrt(Math.pow(a,2)+Math.pow(e,2))}function J(a,e){e.forEach(i=>{Object.getOwnPropertyNames(i.prototype).forEach(s=>{Object.defineProperty(a.prototype,s,Object.getOwnPropertyDescriptor(i.prototype,s))})})}function ye(a,e){return!!(a&&e&&e.entity&&a.name===e.entity.name)}function M(a,e){if(!a)return"";const i={active:"active",isAvailableDestination:"is-available-destination",isChosenDestination:"is-chosen-destination",isBreathing:"breathing",isDead:"dead",isShooting:"shooting",isTargeted:"targeted",isAttacked:"attacked",isLit:"is-lit",isInTwilightZone:"is-in-twilight-zone"};let s="";return e?e+="--":e="",Object.keys(i).forEach(n=>{a[n]&&(s+=` ${e}${i[n]}`)}),s}function fe(a){return[].concat(a)}function xe(a){if(!a)return;const e="square";let i=`${e} ${a&&a.squareType}`;return i+=M(a,e),a.entity&&(i+=M(a.entity,e)),i}class P{constructor(){t(this,"id");t(this,"name","");t(this,"description","");t(this,"icon"," ")}}class _{constructor(){t(this,"rank")}}class V{constructor(){t(this,"actionPoints",2);t(this,"maxActionPoints",2)}}class D{constructor(){t(this,"position",{x:void 0,y:void 0});t(this,"isPassable",!1)}get isBlocking(){return!this.isPassable}get square(){return u.getSquareFromPosition(this.position.x,this.position.y)}}class U extends P{constructor(){super(...arguments);t(this,"moveDestination")}setMoveDestinationSquareByNumber(i){this.setMoveDestinationPosition(u.getSquarePositionFromIndex(i))}setMoveDestinationPosition(i){const s=u.getSquareFromPosition(i.x,i.y),n=u.getSquareIndexFromPosition(i.x,i.y);u.isTargetSquareEnterable(s)?(this.moveDestination=i,u.markSquareAtIndexAsChosenDestination(n)):d.send(`${this.name} can't move into square (${i.x}, ${i.y})`)}}class I extends D{constructor(){super(...arguments);t(this,"hp",100);t(this,"maxHp",100)}get isDead(){return!this.isAlive}get isAlive(){return this.hp>0}}class X extends I{constructor(){super(...arguments);t(this,"bleeding",0);t(this,"bleedingReductionPerTurn",1)}bleed(){const i=this;let s=0;return i.bleeding&&i.isAlive&&(s=i.bleeding,i.hp-=s,i.bleeding-=i.bleedingReductionPerTurn,i.bleeding<0&&(i.bleeding=0)),s}bleedExternally(){if(!this.bleeding)return;const i=this,s=this.bleed(),n=u.getSquareFromPosition(i.position.x,i.position.y);u.addBloodToSquare(n,s)}}class Y extends I{constructor(){super(...arguments);t(this,"isSupposedToBeBreathing")}get isBreathing(){return this.isAlive&&this.isSupposedToBeBreathing}set isBreathing(i){this.isSupposedToBeBreathing=i}}class K extends P{constructor(){super(...arguments);t(this,"targetPosition");t(this,"isShooting");t(this,"ceaseFire");t(this,"hasWeapon");t(this,"attackNumber")}attackPosition(i){this.hasWeapon?(this.targetPosition=i,this.ceaseFire=!1,this.attackNumber?this.attackNumber++:this.attackNumber=1,console.log(this.attackNumber)):(d.send(`${this.name} can't shoot - no weapon equipped`),d.setCursorMessage("No Weapon Equipped")),d.send(`${this.name} is attacking square ${i.x},${i.y}`,x.debug),console.log(this.name,"is attacking",i,this)}}class F extends P{constructor(){super(...arguments);t(this,"inventory")}takeFromInventory(i){this.inventory||(this.inventory=[]);const s=this.inventory.findIndex(o=>o.name===i);return s===-1?null:this.inventory.splice(s,1)[0]}addToInventory(i){this.inventory||(this.inventory=[]),this.inventory.push(i)}}class Z extends F{constructor(){super(...arguments);t(this,"equipment");t(this,"hasWeapon")}equipInHands(i){this.unEquipFromHands();const s=this.takeFromInventory(i);this.equipment.hands=s,s instanceof H?this.hasWeapon=!0:this.hasWeapon=!1}unEquipFromHands(){this.equipment.hands&&(this.addToInventory(this.equipment.hands),this.equipment.hands=null,this.hasWeapon=!1)}}class N{constructor(...e){t(this,"isFriendly");t(this,"active");Object.assign(this,...e),this.id=crypto.randomUUID()}}J(N,[P,_,D,I,X,U,Y,K,F,Z,V]);class Q extends F{constructor(i){super();t(this,"squareType","nothing");t(this,"entities",[]);this.id=i,this.entities=[]}addItem(i){this.addToInventory(i)}get items(){return this.inventory}}var x=(a=>(a.log="log",a.warning="warning",a.debug="debug",a))(x||{});class ee{constructor(){t(this,"messages",[]);t(this,"cursorMessage","");t(this,"cursorMessageNumber",0)}send(e,i="log"){const s=new Date().toISOString().substring(11,23),n={message:e,timestamp:s,level:i};this.messages.push(n)}setCursorMessage(e){this.cursorMessage=e,this.cursorMessageNumber++}}const d=new ee;class ie{constructor(){t(this,"arenaSize",10);t(this,"squares",[]);t(this,"isSquareEnterableByFriendlyUnits",e=>["floor","monster-filter"].includes(e.squareType));let e=this.arenaSize*this.arenaSize;for(;e--!==0;)this.initializeSquareAtIndexIfEmpty(e)}getSquareFromPosition(e,i){return this.squares[this.getSquareIndexFromPosition(e,i)]}setSquareValueAtPosition(e,i,s){this.squares[this.getSquareIndexFromPosition(e,i)]=s}getSquareIndexFromPosition(e,i){return i*this.arenaSize+e}getSquarePositionFromIndex(e){const i=Math.floor(e/this.arenaSize);return{x:e%this.arenaSize,y:i}}setEntityWithinApropriateSquare(e){this.setEntityWithinASquareAtPosition(e.position.x,e.position.y,e)}setEntityWithinASquareAtPosition(e,i,s){const n=this.getSquareIndexFromPosition(e,i);this.initializeSquareAtIndexIfEmpty(n),this.squares[n].entities||(this.squares[n].entities=[]),Array.isArray(this.squares[n].entities)||(this.squares[n].entities=[]),this.squares[n].entities.push(s)}addBloodToSquare(e,i){e.blood?e.blood+=i:e.blood=i}markSquareAtIndexAsTargeted(e){S(this.squares,"isTargeted"),this.initializeSquareAtIndexIfEmpty(e),this.squares[e].isTargeted=!0;const i=this.getSquarePositionFromIndex(e);d.send(`Targetting square #${e} at ${i.x},${i.y}`,x.debug)}markSquareAtIndexAsAttacked(e){S(this.squares,"isAttacked"),this.initializeSquareAtIndexIfEmpty(e),this.squares[e].isAttacked=!0;const i=this.getSquarePositionFromIndex(e);d.send(`Marking square #${e} at ${i.x},${i.y} as attacked`,x.debug)}markSquareAtIndexAsChosenDestination(e){S(this.squares,"isChosenDestination"),this.initializeSquareAtIndexIfEmpty(e),this.squares[e].isChosenDestination=!0;const i=this.getSquarePositionFromIndex(e);d.send(`Marking square #${e} at ${i.x},${i.y} as chosen destination`,x.debug)}initializeSquareAtIndexIfEmpty(e){this.squares[e]||(this.squares[e]=new Q(e),this.squares[e].position=this.getSquarePositionFromIndex(e))}markAvailableDestinationsForSelectedEntity(e){if(e.active){const{x:i,y:s}=e.position;S(this.squares,"isAvailableDestination");for(let n=s-1;n<=s+1;n++)if(!(n<0||n>=this.arenaSize))for(let o=i-1;o<=i+1;o++){if(o<0||o>=this.arenaSize||o===i&&n===s)continue;const r=this.getSquareFromPosition(o,n);this.isSquareEnterableByFriendlyUnits(r)&&(r.isAvailableDestination=!0),this.setSquareValueAtPosition(o,n,r)}}}isTargetSquareEnterable(e){const i=e.entities&&e.entities.filter(s=>!s.isPassable&&s.isAlive);return!(i&&i.length)}lightAllSquares(){this.squares.forEach(e=>e.isLit=!0)}castLightsFromFriendlyEntity(e){if(e.isFriendly){const{x:i,y:s}=e.position;for(let n=s-2;n<=s+2;n++)if(!(n<0||n>=this.arenaSize))for(let o=i-2;o<=i+2;o++){if(o<0||o>=this.arenaSize)continue;const r=this.getSquareFromPosition(o,n);r.isInTwilightZone=!0,this.setSquareValueAtPosition(o,n,r)}for(let n=s-1;n<=s+1;n++)if(!(n<0||n>=this.arenaSize))for(let o=i-1;o<=i+1;o++){if(o<0||o>=this.arenaSize)continue;const r=this.getSquareFromPosition(o,n);r.isLit=!0,this.setSquareValueAtPosition(o,n,r)}}}}const u=new ie;class ne{constructor(){t(this,"id");t(this,"name","");t(this,"description","");t(this,"manufacturer","");t(this,"previousOwners");t(this,"mass",0);this.id=crypto.randomUUID()}}class H extends ne{constructor(){super(...arguments);t(this,"type");t(this,"range",0);t(this,"damage",0);t(this,"causesBleeding",0);t(this,"causesBurning",0)}}class b extends H{constructor(){super(...arguments);t(this,"charges",0);t(this,"maxCharges",5);t(this,"reloadCostInAP",1);t(this,"dischargeRatePerShot",1)}fire(){return this.charges--,console.log("Firing ranged weapon. Damage: ",this.damage),this.damage}get isAbleToFire(){return this.charges>0}reload(){this.charges=this.maxCharges}}var se=(a=>(a.projectile="projectile",a.energy="energy",a))(se||{});class v extends b{constructor(){super(...arguments);t(this,"type","projectile");t(this,"causesBleeding",5);t(this,"causesBurning",1)}}class $ extends b{constructor(){super(...arguments);t(this,"type","energy");t(this,"causesBleeding",0);t(this,"causesBurning",6)}}class E extends ${constructor(){super(...arguments);t(this,"chargingPerTurn",1);t(this,"reloadCostInAP",0)}reload(){d.send("Rechargable weapons can't be reloaded manually.")}recharge(){this.charges<this.maxCharges&&(this.charges+=this.chargingPerTurn)}}const k=10,te={bleedingReductionPerTurn:1,isBreathing:!0,isPassable:!1,actionPoints:2,maxActionPoints:2,hasWeapon:!0};class ae{constructor(){t(this,"entities");t(this,"selected");t(this,"shouldEntityStopShooting",e=>e.ceaseFire||e.isDead);t(this,"stopShooting",e=>{e.isShooting=!1,e.ceaseFire=!1});t(this,"stopShootingWhenForbidden",e=>{this.shouldEntityStopShooting(e)&&this.stopShooting(e)})}getEntityId(e){return e.name}findEntityById(e){return this.entities.filter(s=>this.getEntityId(s)===e)[0]}removeEntity(e){this.removeEntityFromListOfEntities(this.entities,e)}removeEntityFromListOfEntities(e,i){const s=e.findIndex(n=>(n&&n.name)===(i&&i.name));return s===-1?-1:(e.splice(s,1),0)}addEntity(e){this.entities.push(e)}addEntityToDefaultValues(e){return Object.assign({...te},e)}changeEntitiesIntoFullBlownObjects(e){return e.map(i=>this.addEntityToDefaultValues(i)).map(i=>new N(i))}findItemOnEntity(e,i){return e.inventory.filter(n=>this.getEntityId(e)===i)[0]}moveEntityRandomly(e){if(e.isDead||e.isFriendly)return;const i=e.position.x,s=e.position.y;let n=C(-1,1),o=C(-1,1);e.actionPoints||(n=0,o=0),(n||o)&&e.actionPoints--,e.position.x=e.position.x+n,e.position.y=e.position.y+o,e.position.x=R(e.position.x,0,k-1),e.position.y=R(e.position.y,0,k-1);const r=u.getSquareFromPosition(e.position.x,e.position.y);(r&&r.entity||r&&r.squareType!=="floor")&&(e.position.x=i,e.position.y=s)}stopBreathingForKilledEntity(e){return e.isDead&&(e.isBreathing=!1,this.stopShooting(e),e.hp=0),e}getEntitiesAtGivenPosition(e){return this.entities.filter(i=>i.position.x===e.x&&i.position.y===e.y)}getEntitiesAtGivenPositionThatAreAlive(e){return this.getEntitiesAtGivenPosition(e).filter(n=>n.isAlive)}selectEntityFromGivenSquare(e,i){let s;return e&&i&&i.entities.length&&(e.active=!1),i&&i.entities.length&&(s=i.entities[0],s.active=!0),s}setSelected(e){return this.selected=e,this.selected.active=!0,this.selected}setDeselected(e){return this.selected=null,e.active=!1,console.log("Deselected:",e),e}checkAmmoAndCalculateDamageApplied(e){let i=0,s;const n=e.equipment&&e.equipment.hands;if(n instanceof b)s=n;else return 0;if(s.isAbleToFire)i=s.fire(),e.isShooting=!0,e.actionPoints--;else return s.charges="empty",this.stopShooting(e),d.setCursorMessage("NO AMMO"),d.send(`${e.name} can't shoot, as they have no ammunition loaded.`),0;return i}fireAShot(e){if(!e.actionPoints||e.isDead)return;const i=this.checkAmmoAndCalculateDamageApplied(e);this.getEntitiesAtGivenPosition(e.targetPosition).forEach(n=>{this.applyDamageToTargetEntity(n,i)})}reloadWeapon(e,i){const s=e.equipment&&e.equipment.hands;if(s instanceof b)i=s;else return 0;if(e.equipment.hands&&e.equipment.hands===i&&this.stopShooting(e),i.charges===i.maxCharges){d.send(`${i.name} already fully loaded`);return}e.actionPoints>=i.reloadCostInAP?(e.actionPoints-=i.reloadCostInAP,i.reload()):(d.send(`${e.name} has not enough AP to reload ${i.name}`),d.setCursorMessage("NO AP"))}applyDamageToTargetEntity(e,i){i&&(e.hp-=i,e.bleeding=5)}ceaseFireNextTickIfNoAliveTargets(e){if(!e.targetPosition)return;!!h.getEntitiesAtGivenPositionThatAreAlive(e.targetPosition).length||(e.ceaseFire=!0)}isEntityTargettingSomethingAlive(e){const i=e.targetPosition&&!!h.getEntitiesAtGivenPositionThatAreAlive(e.targetPosition).length;return e.targetPosition&&(e.targetPosition.x!==e.position.x||e.targetPosition.y!==e.position.y)&&i}applyEffectsOfBleeding(e){return e.bleedExternally(),e}moveEntityIntoChosenDestination(e){if(!e.actionPoints)return e;if(!e.isDead&&e.moveDestination){const i=u.getSquareFromPosition(e.moveDestination.x,e.moveDestination.y);e.position=e.moveDestination,delete e.moveDestination,i.isChosenDestination=void 0,e.actionPoints--}return e}setMoveDestinationOnASelectedEntity(e,i){e.moveDestination=i}moveEntities(){this.entities.filter(e=>!e.isFriendly).forEach(e=>{this.moveEntityRandomly(e)})}refillActionPointsForAllEntities(){this.entities.forEach(e=>{e.actionPoints=e.maxActionPoints})}rechargeWeaponsForAllEntities(){this.entities.forEach(e=>{var s;const i=e.equipment.hands;i instanceof E&&(i.recharge(),console.log(`Recharging weapon ${i.name} in ${e.name} hands.`)),(s=e==null?void 0:e.inventory)==null||s.forEach(n=>{n instanceof E&&(n.recharge(),console.log(`Recharging weapon ${n.name} in ${e.name} hands.`))})})}}const h=new ae;class w extends v{constructor(){super();t(this,"properties",{name:"G17",description:"High capacity semi-automatic pistol, mass-produced on Old Terra. Still millions of them are in use today. Cheap and reliable. Fires the ever-popular 9mm Parabellum bullet.",manufacturer:"Glock Ges.m.b.H.",charges:17,maxCharges:17,reloadCostInAP:1,damage:2,range:4,mass:1});Object.assign(this,this.properties)}}class B extends v{constructor(){super();t(this,"properties",{name:"M16",description:"Ancient combat rifle from Old Terra. Relatively light. Fires 5.56mm FMJ rounds.",manufacturer:"Colt's Manufacturing Company",charges:20,maxCharges:20,reloadCostInAP:4,damage:3,range:8,mass:3});Object.assign(this,this.properties)}}class O extends v{constructor(){super();t(this,"properties",{name:"M41A Pulse Rifle",description:"Heavy but effective long range kinetic weapon. Fires 10 millimeter explosive-tip caseless. Standard light armor-piercing round. Excells at neutralizing alien threats. ",manufacturer:"Armat Battlefield Systems",charges:10,maxCharges:10,reloadCostInAP:4,damage:5,range:10,mass:4});Object.assign(this,this.properties)}}class qe extends v{constructor(){super();t(this,"properties",{name:"Ithaca 37 Shotgun",description:"Good to keep it handy for close encounters. Better than harsh language.",manufacturer:"Ithaca Gun Company",charges:6,maxCharges:6,reloadCostInAP:4,damage:15,range:3,mass:3,causesBleeding:10});t(this,"causedKnockback",3);Object.assign(this,this.properties)}}class q extends ${constructor(){super();t(this,"properties",{name:"L30 Beam Laser",description:"Portable 30kW Energy beam weapon. Fed by energy magazines.",manufacturer:"Amaar Industries",previousOwners:["Amaar Industries Factory"],charges:5,maxCharges:5,reloadCostInAP:2,damage:7,range:10,mass:2});Object.assign(this,this.properties)}}class j extends E{constructor(){super();t(this,"properties",{name:"R40 Rechargable Laser",charges:1,maxCharges:3,damage:7,range:10,mass:2,description:"Portable 40kW Energy beam weapon. Charged over time by an onboard micro-reactor. Gains one charge per turn.",manufacturer:"Amaar Industries",previousOwners:["Intaki Syndicate","Amaar Industries Factory"]});Object.assign(this,this.properties)}}const oe=[{name:"Lazer Blady",rank:"Sergeant",description:"He's here to kick ass and chew bubble gum, and he's all out of gum.",hp:75,maxHp:100,icon:"🧑‍🚀",isFriendly:!0,position:{x:6,y:8},inventory:[new w],equipment:{hands:new q},actionPoints:10,maxActionPoints:10},{name:"John Doe",rank:"Corporal",description:"Tough as nails. Been to many wars. He has seen things you wouldn't believe.",hp:90,maxHp:100,icon:"🧑",isFriendly:!0,bleedingReductionPerTurn:3,position:{x:8,y:9},inventory:[new w],equipment:{hands:new O},actionPoints:6,maxActionPoints:6},{name:"Robot",rank:"Asset",description:"DST-7 Security Droid. Powered by an Energy Cell, it can stay in suspended animation for years and activate at a moment's notice to battle the intruders. Armed and armored.",hp:50,maxHp:50,icon:"🤖",isFriendly:!0,isBreathing:!1,position:{x:2,y:5},equipment:{hands:new j},inventory:[new w],bleedingReductionPerTurn:50},{name:"Octo",description:"Octopii are long lived and tough, but they suffer outside fluid environment and are vulnerable to bleeding.",hp:200,maxHp:200,icon:"🐙",position:{x:8,y:2},bleedingReductionPerTurn:0,bleeding:1,equipment:{hands:new q}},{name:"Squid",description:"Squids possess camouflage capabilities that allow them to blend with the environment and become unnoticable.They are not as strong as Octopii, but they are fast and they can handle heavy weapons with ease thanks to their strong tentacles.",hp:100,maxActionPoints:5,maxHp:100,icon:"🦑",position:{x:4,y:2},equipment:{hands:new O}},{name:"Ant",description:"Formids are countless like grains of sand. Do not let them get out of control on your ship.",hp:45,maxHp:50,icon:"🐜",isBreathing:!0,position:{x:7,y:5},equipment:{hands:new B}},{name:"Henry The Spider",description:"Friendly eight-eyed creature, helping to keep the ship bug-free. Spacers say it's bad luck to kill a spider. Better keep it alive.",hp:100,maxHp:150,maxActionPoints:3,icon:"🕷️",position:{x:9,y:3},equipment:{hands:new j}},{name:"Mosquito",description:"This blood sucking creature isn't very fast, but it can sustain itself on any blood it can find. It's also efficient at stopping it's own bleeding. ",hp:12,maxHp:20,icon:"🦟",position:{x:0,y:7},equipment:{hands:new B},actionPoints:1,maxActionPoints:1,bleedingReductionPerTurn:5},{name:"Microbe",description:"Space-bourne pathogens can be dangerous. Luckily, they're also easily dispatched, at least in most cases. This specimen is enormous for a Microbe, but it is also very weak. ",hp:1,maxHp:5,icon:"🦠",position:{x:3,y:8},equipment:{hands:new q}}],z=h.changeEntitiesIntoFullBlownObjects(oe),re=JSON.parse('[{"id":0,"name":"","squareType":"floor","position":{"x":0,"y":0}},{"id":1,"name":"","squareType":"floor","position":{"x":1,"y":0}},{"id":2,"name":"","squareType":"floor","position":{"x":2,"y":0}},{"id":3,"name":"","squareType":"floor","position":{"x":3,"y":0}},{"id":4,"name":"","squareType":"floor","position":{"x":4,"y":0}},{"id":5,"name":"","squareType":"floor","position":{"x":5,"y":0}},{"id":6,"name":"","squareType":"floor","position":{"x":6,"y":0}},{"id":7,"name":"","squareType":"floor","position":{"x":7,"y":0}},{"id":8,"name":"","squareType":"floor","position":{"x":8,"y":0}},{"id":9,"name":"","squareType":"floor","position":{"x":9,"y":0}},{"id":10,"name":"Teleport to SW Corner","description":"Moves you to 0,9","icon":"⬇️","squareType":"floor","position":{"x":0,"y":1}},{"id":11,"name":"","squareType":"wall","position":{"x":1,"y":1}},{"id":12,"name":"","squareType":"wall","position":{"x":2,"y":1}},{"id":13,"name":"","squareType":"wall","position":{"x":3,"y":1}},{"id":14,"name":"","squareType":"floor","position":{"x":4,"y":1}},{"id":15,"name":"","squareType":"wall","position":{"x":5,"y":1}},{"id":16,"name":"","squareType":"wall","position":{"x":6,"y":1}},{"id":17,"name":"","squareType":"floor","position":{"x":7,"y":1}},{"id":18,"name":"","squareType":"floor","position":{"x":8,"y":1}},{"id":19,"name":"","squareType":"floor","position":{"x":9,"y":1}},{"id":20,"name":"","squareType":"wall","position":{"x":0,"y":2}},{"id":21,"name":"","squareType":"wall","position":{"x":1,"y":2}},{"id":22,"name":"","squareType":"floor","position":{"x":2,"y":2}},{"id":23,"name":"","squareType":"wall","position":{"x":3,"y":2}},{"id":24,"name":"","squareType":"floor","position":{"x":4,"y":2}},{"id":25,"name":"","squareType":"wall","position":{"x":5,"y":2}},{"id":26,"name":"","squareType":"floor","position":{"x":6,"y":2}},{"id":27,"name":"","squareType":"floor","position":{"x":7,"y":2}},{"id":28,"name":"","squareType":"floor","position":{"x":8,"y":2},"entity":{"bleedingReductionPerTurn":0,"isSupposedToBeBreathing":true,"isPassable":false,"actionPoints":2,"maxActionPoints":2,"hasWeapon":true,"name":"Octo","hp":200,"maxHp":200,"icon":"🐙","position":{"x":8,"y":2},"bleeding":1,"equipment":{"hands":{"name":"Assault Lazer Cannon","causesBleeding":0,"range":6,"damage":3,"rounds":30,"maxRounds":30,"type":"lazer"}}},"entities":[{"bleedingReductionPerTurn":0,"isSupposedToBeBreathing":true,"isPassable":false,"actionPoints":2,"maxActionPoints":2,"hasWeapon":true,"name":"Octo","hp":200,"maxHp":200,"icon":"🐙","position":{"x":8,"y":2},"bleeding":1,"equipment":{"hands":{"name":"Assault Lazer Cannon","causesBleeding":0,"range":6,"damage":3,"rounds":30,"maxRounds":30,"type":"lazer"}}}]},{"id":29,"name":"","squareType":"floor","position":{"x":9,"y":2}},{"id":30,"name":"","squareType":"floor","position":{"x":0,"y":3}},{"id":31,"name":"","squareType":"floor","position":{"x":1,"y":3}},{"id":32,"name":"","squareType":"floor","position":{"x":2,"y":3}},{"id":33,"name":"","squareType":"floor","position":{"x":3,"y":3}},{"id":34,"name":"","squareType":"floor","position":{"x":4,"y":3}},{"id":35,"name":"","squareType":"wall","position":{"x":5,"y":3}},{"id":36,"name":"","squareType":"floor","position":{"x":6,"y":3}},{"id":37,"name":"","squareType":"floor","position":{"x":7,"y":3}},{"id":38,"name":"","squareType":"floor","position":{"x":8,"y":3}},{"id":39,"name":"","squareType":"floor","position":{"x":9,"y":3},"entity":{"bleedingReductionPerTurn":1,"isSupposedToBeBreathing":true,"isPassable":false,"actionPoints":2,"maxActionPoints":2,"hasWeapon":true,"name":"Henry The Spider","hp":100,"maxHp":150,"icon":"🕷️","position":{"x":9,"y":3},"equipment":{"hands":{"name":"Assault Lazer Cannon","causesBleeding":0,"range":6,"damage":3,"rounds":30,"maxRounds":30,"type":"lazer"}}},"entities":[{"bleedingReductionPerTurn":1,"isSupposedToBeBreathing":true,"isPassable":false,"actionPoints":2,"maxActionPoints":2,"hasWeapon":true,"name":"Henry The Spider","hp":100,"maxHp":150,"icon":"🕷️","position":{"x":9,"y":3},"equipment":{"hands":{"name":"Assault Lazer Cannon","causesBleeding":0,"range":6,"damage":3,"rounds":30,"maxRounds":30,"type":"lazer"}}}]},{"id":40,"name":"","squareType":"floor","position":{"x":0,"y":4}},{"id":41,"name":"","squareType":"wall","position":{"x":1,"y":4}},{"id":42,"name":"","squareType":"wall","position":{"x":2,"y":4}},{"id":43,"name":"","squareType":"floor","position":{"x":3,"y":4}},{"id":44,"name":"","squareType":"floor","position":{"x":4,"y":4}},{"id":45,"name":"","squareType":"wall","position":{"x":5,"y":4}},{"id":46,"name":"","squareType":"floor","position":{"x":6,"y":4},"entity":{"bleedingReductionPerTurn":1,"isSupposedToBeBreathing":true,"isPassable":false,"actionPoints":0,"maxActionPoints":2,"hasWeapon":true,"name":"Squid","hp":100,"maxHp":100,"icon":"🦑","position":{"x":6,"y":4},"equipment":{"hands":{"name":"M41A Pulse Rifle","causesBleeding":2,"range":4,"damage":1,"rounds":40,"maxRounds":40,"type":"projectile"}}},"entities":[{"bleedingReductionPerTurn":1,"isSupposedToBeBreathing":true,"isPassable":false,"actionPoints":0,"maxActionPoints":2,"hasWeapon":true,"name":"Squid","hp":100,"maxHp":100,"icon":"🦑","position":{"x":6,"y":4},"equipment":{"hands":{"name":"M41A Pulse Rifle","causesBleeding":2,"range":4,"damage":1,"rounds":40,"maxRounds":40,"type":"projectile"}}}]},{"id":47,"name":"","squareType":"floor","position":{"x":7,"y":4}},{"id":48,"name":"","squareType":"floor","position":{"x":8,"y":4}},{"id":49,"name":"","squareType":"floor","position":{"x":9,"y":4}},{"id":50,"name":"","squareType":"floor","position":{"x":0,"y":5}},{"id":51,"name":"","squareType":"wall","position":{"x":1,"y":5}},{"id":52,"name":"","squareType":"floor","position":{"x":2,"y":5}},{"id":53,"name":"","squareType":"floor","position":{"x":3,"y":5},"entity":{"isFriendly":true,"bleedingReductionPerTurn":50,"isSupposedToBeBreathing":false,"isPassable":false,"actionPoints":2,"maxActionPoints":2,"hasWeapon":true,"name":"Robot","age":1,"hp":50,"maxHp":50,"icon":"🤖","position":{"x":3,"y":5},"equipment":{"hands":{"name":"Assault Lazer Cannon","causesBleeding":0,"range":6,"damage":3,"rounds":30,"maxRounds":30,"type":"lazer"}}},"entities":[{"isFriendly":true,"bleedingReductionPerTurn":50,"isSupposedToBeBreathing":false,"isPassable":false,"actionPoints":2,"maxActionPoints":2,"hasWeapon":true,"name":"Robot","age":1,"hp":50,"maxHp":50,"icon":"🤖","position":{"x":3,"y":5},"equipment":{"hands":{"name":"Assault Lazer Cannon","causesBleeding":0,"range":6,"damage":3,"rounds":30,"maxRounds":30,"type":"lazer"}}}]},{"id":54,"name":"","squareType":"floor","position":{"x":4,"y":5}},{"id":55,"name":"","squareType":"wall","position":{"x":5,"y":5}},{"id":56,"name":"","squareType":"floor","position":{"x":6,"y":5}},{"id":57,"name":"","squareType":"floor","position":{"x":7,"y":5}},{"id":58,"name":"","squareType":"wall","position":{"x":8,"y":5}},{"id":59,"name":"","squareType":"wall","position":{"x":9,"y":5}},{"id":60,"name":"","squareType":"floor","position":{"x":0,"y":6}},{"id":61,"name":"","squareType":"wall","position":{"x":1,"y":6}},{"id":62,"name":"","squareType":"wall","position":{"x":2,"y":6}},{"id":63,"name":"","squareType":"wall","position":{"x":3,"y":6}},{"id":64,"name":"","squareType":"wall","position":{"x":4,"y":6}},{"id":65,"name":"","squareType":"wall","position":{"x":5,"y":6}},{"id":66,"name":"","squareType":"floor","position":{"x":6,"y":6}},{"id":67,"name":"","squareType":"wall","position":{"x":7,"y":6}},{"id":68,"name":"","squareType":"wall","position":{"x":8,"y":6}},{"id":69,"name":"","squareType":"nothing","position":{"x":9,"y":6}},{"id":70,"name":"","squareType":"floor","position":{"x":0,"y":7}},{"id":71,"name":"","squareType":"floor","position":{"x":1,"y":7}},{"id":72,"name":"","squareType":"floor","position":{"x":2,"y":7},"entity":{"bleedingReductionPerTurn":1,"isSupposedToBeBreathing":true,"isPassable":false,"actionPoints":1,"maxActionPoints":1,"hasWeapon":true,"name":"Mosquito","hp":12,"maxHp":20,"icon":"🦟","position":{"x":2,"y":7},"equipment":{"hands":{"name":"M16","causesBleeding":2,"range":4,"damage":2,"rounds":15,"maxRounds":20,"type":"projectile"}}},"entities":[{"bleedingReductionPerTurn":1,"isSupposedToBeBreathing":true,"isPassable":false,"actionPoints":1,"maxActionPoints":1,"hasWeapon":true,"name":"Mosquito","hp":12,"maxHp":20,"icon":"🦟","position":{"x":2,"y":7},"equipment":{"hands":{"name":"M16","causesBleeding":2,"range":4,"damage":2,"rounds":15,"maxRounds":20,"type":"projectile"}}}]},{"id":73,"name":"","squareType":"floor","position":{"x":3,"y":7}},{"id":74,"name":"","squareType":"floor","position":{"x":4,"y":7}},{"id":75,"name":"","squareType":"wall","position":{"x":5,"y":7}},{"id":76,"name":"","squareType":"floor","position":{"x":6,"y":7}},{"id":77,"name":"","squareType":"wall","position":{"x":7,"y":7}},{"id":78,"name":"","squareType":"floor","position":{"x":8,"y":7},"entity":{"bleedingReductionPerTurn":1,"isSupposedToBeBreathing":true,"isPassable":false,"actionPoints":0,"maxActionPoints":2,"hasWeapon":true,"name":"Ant","age":1,"hp":45,"maxHp":50,"icon":"🐜","position":{"x":8,"y":7},"equipment":{"hands":{"name":"M41A Pulse Rifle","causesBleeding":2,"range":4,"damage":1,"rounds":40,"maxRounds":40,"type":"projectile"}}},"entities":[{"bleedingReductionPerTurn":1,"isSupposedToBeBreathing":true,"isPassable":false,"actionPoints":0,"maxActionPoints":2,"hasWeapon":true,"name":"Ant","age":1,"hp":45,"maxHp":50,"icon":"🐜","position":{"x":8,"y":7},"equipment":{"hands":{"name":"M41A Pulse Rifle","causesBleeding":2,"range":4,"damage":1,"rounds":40,"maxRounds":40,"type":"projectile"}}}]},{"id":79,"name":"","squareType":"floor","position":{"x":9,"y":7}},{"id":80,"name":"","squareType":"floor","position":{"x":0,"y":8}},{"id":81,"name":"","squareType":"floor","position":{"x":1,"y":8}},{"id":82,"name":"","squareType":"floor","position":{"x":2,"y":8}},{"id":83,"name":"","squareType":"floor","position":{"x":3,"y":8},"entity":{"bleedingReductionPerTurn":1,"isSupposedToBeBreathing":true,"isPassable":false,"actionPoints":2,"maxActionPoints":2,"hasWeapon":true,"name":"Microbe","hp":1,"maxHp":5,"icon":"🦠","position":{"x":3,"y":8},"equipment":{"hands":{"name":"Assault Lazer Cannon","causesBleeding":0,"range":6,"damage":3,"rounds":30,"maxRounds":30,"type":"lazer"}}},"entities":[{"bleedingReductionPerTurn":1,"isSupposedToBeBreathing":true,"isPassable":false,"actionPoints":2,"maxActionPoints":2,"hasWeapon":true,"name":"Microbe","hp":1,"maxHp":5,"icon":"🦠","position":{"x":3,"y":8},"equipment":{"hands":{"name":"Assault Lazer Cannon","causesBleeding":0,"range":6,"damage":3,"rounds":30,"maxRounds":30,"type":"lazer"}}}]},{"id":84,"name":"","squareType":"floor","position":{"x":4,"y":8}},{"id":85,"name":"Teleport to NW Corner","description":"Moves you to 0,0","icon":"↖️","squareType":"floor","position":{"x":5,"y":8}},{"id":86,"name":"","squareType":"floor","position":{"x":6,"y":8},"isTargeted":true,"entity":{"isFriendly":true,"bleedingReductionPerTurn":1,"isSupposedToBeBreathing":true,"isPassable":false,"actionPoints":2,"maxActionPoints":2,"hasWeapon":true,"name":"Lazer Blady","hp":75,"maxHp":100,"icon":"🧑‍🚀","position":{"x":6,"y":8},"inventory":[{"name":"M16","causesBleeding":2,"range":4,"damage":2,"rounds":15,"maxRounds":20,"type":"projectile"}],"equipment":{"hands":{"name":"Assault Lazer Cannon","causesBleeding":0,"range":6,"damage":3,"rounds":30,"maxRounds":30,"type":"lazer"}}},"entities":[{"isFriendly":true,"bleedingReductionPerTurn":1,"isSupposedToBeBreathing":true,"isPassable":false,"actionPoints":2,"maxActionPoints":2,"hasWeapon":true,"name":"Lazer Blady","hp":75,"maxHp":100,"icon":"🧑‍🚀","position":{"x":6,"y":8},"inventory":[{"name":"M16","causesBleeding":2,"range":4,"damage":2,"rounds":15,"maxRounds":20,"type":"projectile"}],"equipment":{"hands":{"name":"Assault Lazer Cannon","causesBleeding":0,"range":6,"damage":3,"rounds":30,"maxRounds":30,"type":"lazer"}}}]},{"id":87,"name":"","squareType":"floor","position":{"x":7,"y":8}},{"id":88,"name":"EXIT","description":"Reach this place to win The Game","icon":"🚪","squareType":"floor","position":{"x":8,"y":8}},{"id":89,"name":"","squareType":"floor","position":{"x":9,"y":8}},{"id":90,"name":"","squareType":"floor","position":{"x":0,"y":9}},{"id":91,"name":"","squareType":"floor","position":{"x":1,"y":9}},{"id":92,"name":"","squareType":"floor","position":{"x":2,"y":9}},{"id":93,"name":"","squareType":"floor","position":{"x":3,"y":9}},{"id":94,"name":"Healing Station","icon":"🏥","description":"This advanced healing station repairs all damage done to a given entity","squareType":"floor","position":{"x":4,"y":9}},{"id":95,"name":"","squareType":"wall","position":{"x":5,"y":9}},{"id":96,"name":"","squareType":"floor","position":{"x":6,"y":9}},{"id":97,"name":"","squareType":"wall","position":{"x":7,"y":9}},{"id":98,"name":"","squareType":"floor","position":{"x":8,"y":9}},{"id":99,"name":"","squareType":"floor","position":{"x":9,"y":9}}]');class le{constructor(){t(this,"generatedEntities");t(this,"generatedEntitiesJSON");t(this,"entities");t(this,"squares");t(this,"saveMap",()=>{console.log("Alive suares:",u.squares);const i=JSON.parse(JSON.stringify(u.squares)).map(c=>c),s=JSON.stringify(i);console.log(s);const r=window.prompt("Enter the name of saved map.","map00");localStorage[r]=s,window.prompt("Saved the following map as "+r,s)});t(this,"loadMap",e=>{const i=Object.keys(localStorage),s=`Enter the name of map to load.
Maps available in localStorage: ${i}
Be aware item processing is not working fully yet.`;console.log(i);const n=window.prompt(s,i);if(!n)return;const o=localStorage[n];if(!o)return;console.log(o);const r=JSON.parse(o);this.loadSquaresIntoService(r);const c=JSON.parse(this.generatedEntitiesJSON);this.loadGeneratedEntitiesIntoService(c),console.log(h.entities),h.setSelected(h.findEntityById("Lazer Blady G")),e.setSelectedInStateAccordingToSelectedInEntitiesService();function m(p){return new q}function A(p){return p.equipment&&p.equipment.hands&&(p.equipment.hands=m(p.equipment.hands)),p.inventory&&(p.inventory=p.inventory.map(g=>m())),p}const T=h.entities.map(p=>A(p));console.log("ALIVE ENTITIES?",T),this.loadEntitiesIntoService(T),e.setSquaresAccordingToEntities(),e.processInterface()});t(this,"loadSquaresIntoService",e=>{u.squares.forEach((i,s)=>{const n=i,o=e[s];n.squareType=o&&o.squareType||"floor",n.icon=o&&o.icon||"",n.name=o&&o.name||"",n.description=o&&o.description||""})});t(this,"loadEntitiesIntoService",e=>{h.entities=e});t(this,"loadGeneratedEntitiesIntoService",e=>{h.entities=h.changeEntitiesIntoFullBlownObjects(e)});t(this,"loadBuiltInMap",()=>{this.loadSquaresIntoService(re)});t(this,"loadPredefinedEntitities",()=>{console.log(z),this.loadEntitiesIntoService(z)});t(this,"loadGeneratedEntitities",()=>{this.loadGeneratedEntitiesIntoService(this.generatedEntitiesJSON)});t(this,"generateMAP",()=>{function e(p,g){return parseInt(Math.random()*(g-p)+p)}const i=[],s=[...Array(100).keys()];let n="wall",o=0,r=0,c=0;s.forEach(p=>{const g={bleedingReductionPerTurn:1,isSupposedToBeBreathing:!0,isPassable:!1,actionPoints:1,maxActionPoints:1,hasWeapon:!1,name:`Mosquito_${o}`,hp:12,maxHp:20,icon:"🦟",position:{x:r,y:c}};if(n=="wall"||n=="nothing")switch(e(0,4)){case 3:n="floor";break;case 2:n="floor";break;case 1:n="wall";break;case 0:n="floor";break}else switch(e(0,4)){case 3:n="floor";break;case 2:n="floor";break;case 1:n="wall";break;case 0:n="nothing";break}const y={id:o,name:"",icon:"",squareType:n,entities:[],position:{x:r,y:c},description:""};n=="floor"?i.length>1&&(i[i.length-1].entities.length!=0||i[i.length-2].entities.length!=0)?i.push(y):(y.entities.push(g),console.log("adding  entitty to map",n,y,g),i.push(y),this.generatedEntities.push(g)):i.push(y),o++,o!==0&&o%u.arenaSize==0?(r=0,c++):r++});const m={isFriendly:!0,bleedingReductionPerTurn:1,isSupposedToBeBreathing:!0,isPassable:!1,actionPoints:6,maxActionPoints:10,hasWeapon:!0,name:"Lazer Blady G",hp:75,maxHp:100,icon:"🧑‍🚀",position:{x:6,y:8},inventory:[new B],equipment:{hands:new q}};this.generatedEntities.push(m);const A=u.getSquareIndexFromPosition(m.position.x,m.position.y);i[A].entities.push(m),console.log(i,this.generatedEntities,"dupa blady"),this.generatedEntitiesJSON=JSON.stringify(this.generatedEntities);const T=JSON.stringify(i);localStorage.setItem("autoGenMap",T),this.generatedEntities=[]});this.entities=h.entities,this.squares=u.squares,this.generatedEntities=[],this.generatedEntitiesJSON={}}}const Te=new le;class ue{constructor(){t(this,"scripts",[{what:"entity-present",where:{x:8,y:8},who:"Lazer Blady",condition:"alive",params:[],result:{action:"message",params:["You have reached the exit. You have won the game."]}},{what:"entity-present",where:{x:6,y:8},who:"Lazer Blady",condition:"alive",params:[],result:{action:"load-map",params:["A2"]}},{what:"entity-present",where:{x:4,y:9},condition:"alive",params:[],result:{action:"heal",params:[]}},{what:"entity-present",where:{x:5,y:8},condition:"alive",params:[],result:{action:"move",params:[{x:0,y:0}]}},{what:"entity-present",where:{x:0,y:1},result:{action:"move",params:[{x:0,y:9}]}}]);t(this,"runScripts",e=>{this.scripts.forEach(i=>this.runScript(i))});console.debug(JSON.stringify(this.scripts))}runScript(e){console.log("Running script.",e),this.isConditionFullfilled(e)&&this.executeResult(e)}isConditionFullfilled(e){switch(e.what){case"entity-present":if(!e.where)break;const i=h.getEntitiesAtGivenPosition(e.where);console.log(`There are ${i.length} entities at ${e.where.x}, ${e.where.y}`);const s=i.length>0;if(e.who){let n=!1;return i.forEach(o=>{o.name===e.who&&(n=!0)}),n}else return s}return!1}executeResult(e){switch(e.result.action){case"message":d.send(e.result.params[0]);break;case"load-map":console.log("Going to loadMap",e.result.params[0]);break;case"heal":console.log(`Going to heal ${e.where.x},${e.where.y}`),h.getEntitiesAtGivenPosition(e.where).forEach(s=>{const n=s;d.send(`Healing ${n.name} from ${n.hp} to ${n.maxHp}`),s.hp=s.maxHp});break;case"move":{console.log(`Going to heal ${e.where.x},${e.where.y}`),h.getEntitiesAtGivenPosition(e.where).forEach(n=>{const o=n,r=o,c=e.result.params[0];d.send(`Moving ${o.name} from ${r.position.x}, ${r.position.y} to
          ${c.x},${c.y}`),o.position.x=c.x,o.position.y=c.y});break}}}}const Se=new ue;class f extends L.Component{render(){return l.jsxs("div",{className:"hud-panel",children:[l.jsx("div",{className:"hud-panel__title",children:this.props.title}),l.jsx("div",{className:"hud-panel__content",children:this.props.children})]})}}f.__docgenInfo={description:"",methods:[],displayName:"HudPanel",props:{title:{required:!0,tsType:{name:"string"},description:""},children:{required:!0,tsType:{name:"JSX.Element"},description:""}}};function de({title:a,className:e,item:i,onClose:s}){const o=`
    info-panel 
    ${e||""}
  `;return l.jsxs("div",{className:o,children:[l.jsxs("div",{className:"info-panel__title",title:a,children:[a," ",a&&(i==null?void 0:i.name)&&"-"," ",i==null?void 0:i.name]}),l.jsx("button",{className:"info-panel__close-button",onClick:s,children:"X"}),l.jsxs("div",{className:"info-panel__content",children:[(i==null?void 0:i.description)&&l.jsx(f,{title:"Description",children:l.jsx(l.Fragment,{children:i==null?void 0:i.description})}),(i==null?void 0:i.manufacturer)&&l.jsx(f,{title:"Manufacturer",children:l.jsx(l.Fragment,{children:i==null?void 0:i.manufacturer})}),(i==null?void 0:i.previousOwners)&&l.jsx(f,{title:"Previous owners",children:l.jsx("ul",{children:i==null?void 0:i.previousOwners.map(r=>l.jsx("li",{children:r},r))})}),i&&l.jsx(f,{title:"Stats",children:l.jsx("ul",{children:Object.entries(i).filter(r=>typeof r[1]=="number").sort((r,c)=>r[0].localeCompare(c[0])).map(r=>l.jsx("li",{children:r[0]+": "+r[1]},r[0]))})})]})]})}de.__docgenInfo={description:"A panel that slides in from the right",methods:[],displayName:"InfoPanel",props:{className:{required:!1,tsType:{name:"string"},description:""},title:{required:!1,tsType:{name:"string"},description:""},item:{required:!0,tsType:{name:"Item"},description:""},onClose:{required:!1,tsType:{name:"signature",type:"function",raw:"() => void",signature:{arguments:[],return:{name:"void"}}},description:""}}};export{h as E,Te as G,f as H,de as I,q as L,B as M,j as R,u as S,se as W,qe as a,O as b,z as c,b as d,E as e,d as f,xe as g,Se as h,x as i,ye as j,ne as k,N as l,ge as m,fe as n,me as o,S as r,M as t};
