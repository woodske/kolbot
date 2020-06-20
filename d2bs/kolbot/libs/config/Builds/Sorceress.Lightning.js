/** Lightning Sorceress Build
*
* Instructions:	See /d2bs/kolbot/libs/config/Builds/README.txt
*
* Skill IDs:	See /d2bs/kolbot/sdk/skills.txt for a list of skill IDs.
*
* Stat IDs:
*
* 	Strength	= 0
* 	Energy		= 1
* 	Dexterity	= 2
* 	Vitality	= 3
*

	Attack Config Variables For Sorceress
	---------------------------------------------------------------------------------------------------------------------
	Config.AttackSkill[0] = -1; // Preattack skill.
	Config.AttackSkill[1] = -1; // Primary skill to bosses.
	Config.AttackSkill[2] = -1; // Primary untimed skill to bosses. Keep at -1 if Config.AttackSkill[1] is untimed skill.
	Config.AttackSkill[3] = -1; // Primary skill to others.
	Config.AttackSkill[4] = -1; // Primary untimed skill to others. Keep at -1 if Config.AttackSkill[3] is untimed skill.
	Config.AttackSkill[5] = -1; // Secondary skill if monster is immune to primary.
	Config.AttackSkill[6] = -1; // Secondary untimed skill if monster is immune to primary untimed.
	
	Config.LowManaSkill[0] = -1; // Timed low mana skill.
	Config.LowManaSkill[1] = -1; // Untimed low mana skill.
*/
js_strict(true);

if (!isIncluded("common/Cubing.js")) { include("common/Cubing.js"); };
if (!isIncluded("common/Prototypes.js")) { include("common/Prototypes.js"); };
if (!isIncluded("common/Runewords.js")) { include("common/Runewords.js"); };
if (!isIncluded("common/Town.js")) { include("common/Town.js"); };

/*
	runeword: Array of numbers (i.e. Runeword.Insight)
	equipment: Array of strings (i.e. ["poleaxe", "halberd"])
*/
var stopMakingRuneword = function(runeword, equipment) {
	
	for (var i = 0; i < Config.Runewords.length; i++) {
		if (Config.Runewords[i][0] === runeword) {
			for (var j = 0; j < equipment.length; j++) {
				if (Config.Runewords[i][1] === equipment[j]) {
					Config.Runewords.splice(i, 1);					
				}
			}	
		}		
	}
}

/*
	runeword: Array of numbers (i.e. Runeword.Insight)
	equipment: Array of strings (i.e. ["poleaxe", "halberd"])
*/
var makeRuneword = function(runeword, equipment) {
	
	for (var i = 0; i < equipment.length; i++) {
		Config.Runewords.push([runeword, equipment[i]]);
	}
}

var AutoBuildTemplate = {

	1:	{
			Update: function () {

				// Class specific
				Config.PickitFiles.push("Follower/sorceress.xpac.nip");
				
				Config.NoTele			= true;
				Config.Dodge			= false;
				Config.CastStatic 		= 60; // Cast static until the target is at designated life percent. 100 = disabled.
				Config.StaticList 		= ["Diablo", "Duriel", "Baal", "Mephisto", "Andariel"]; 

				//---------------------- Attacks ------------------
				Config.AutoSkill.Enabled	= true; // Enable or disable AutoSkill system
				Config.AutoSkill.Build 	= [
					[37, 1, false], // Warmth
					[40, 1, false], // Frozen Armor
					[42, 1, false], // Static Field
					[54, 1, false], // Teleport
					[63, 1, false], // Lightning Mastery
					[53, 20, false], // Max Chain Lightning
					[63, 20, false], // Max Lightning Mastery
					[49, 20, false], // Max Lightning
					[38, 20, false], // Max Charged Bolt
					[48, 20, false] // Max Nova
				];

				if (me.getSkill(53, 1)) {
					Config.AttackSkill = [-1, 49, -1, 53, -1, -1, -1];
					Config.LowManaSkill	= [-1, -1];
				} else if (me.getSkill(49, 1)) {
					Config.AttackSkill = [-1, 49, -1, 49, -1, -1, -1];
					Config.LowManaSkill = [0, 0];
				} else if (me.getSkill(38, 1)) {
					Config.AttackSkill = [0, 38, -1, 38, -1, 0, 0];
					Config.LowManaSkill = [0, 0];
				} else {
					Config.AttackSkill = [0, 36, -1, 36, -1, 0, 0];
					Config.LowManaSkill = [0, 0];
				}

				//---------------------- Stats ------------------
				Config.AutoStat.Enabled = true; // Enable or disable AutoStat system
				Config.AutoStat.Build 	= [
					["vitality", 20],
					["strength", 20], // Hard leather armor
					["vitality", 50],
					["strength", 47], // Kite shield
					["vitality", 150],
					["strength", 156], // Monarch
					["v", "all"], // put rest of the points in vitality
				];

                // All followers
				Scripts.Follower        = true;
				Config.Leader           = "Bindle-sorc";
				Config.QuitList         = ["Bindle-sorc"];				
				Config.AutoEquip        = true;
				Config.TownCheck		= false;						// Don't go to town for more potions
				Config.UseMerc 			= true;
				Config.PacketShopping 	= true;
				Config.PacketCasting    = 2; 
				Config.ClearType        = 0;                            // Monster spectype to kill in level clear scripts (0 = all)
				Config.LowGold			= 1000;
				Config.StashGold 		= 500;
				Config.OpenChests		= true; 						// Open chests. Controls key buying.
				Config.ScanShrines		= [15, 13, 12, 14, 7, 6, 2, 1];	
				Config.BeltColumn		= ["hp", "hp", "hp", "mp"];		// Keep tons of health potions!
				Config.MinColumn 		= [1, 1, 1, 1];
                Config.Cubing           = false;                        // Don't cube yet!
                Config.MakeRunewords    = true;
                Config.PublicMode       = 2;                            // Accept invites
                Config.LifeChicken      = 0;                            // Don't exit games when close to death
                Config.LogLowRunes      = true;
                Config.LogMiddleRunes   = true;
                Config.LocalChat.Enabled = true;                        // enable the LocalChat system
		        Config.LocalChat.Mode   = 2;                              // 0 = disabled, 1 = chat from 'say' (recommended), 2 = all chat (for manual play)

                Config.Inventory[0] = [1,1,1,1,1,1,1,1,1,1];
                Config.Inventory[1] = [1,1,1,1,1,1,1,1,1,1];
                Config.Inventory[2] = [1,1,1,1,1,1,1,1,1,1];
				Config.Inventory[3] = [1,1,1,1,1,1,1,1,1,1];

				//---------------------- Pickit ------------------           
				
				Config.PickitFiles.push("Follower/misc.nip");
                Config.PickitFiles.push("Follower/rwbase-other.nip");
				Config.PickitFiles.push("Follower/rwbase-shield.nip");
				Config.PickitFiles.push("Follower/rwbase-stealth.nip");
				Config.PickitFiles.push("Follower/merc.xpac.nip");
                Config.PickitFiles.push("earlyLadder.nip");

				//---------------------- Runewords ------------------
				
				var runewordItem, runewordEquipment;

				// Stealth
				runewordEquipment = ["quiltedarmor", "hardleatherarmor", "leatherarmor"];
				runewordItem = me.getMerc().getItems().filter(i => (i.getFlag(0x4000000) && (i.fname.contains("Stealth") || i.fname.contains("Smoke"))))[0];

				if (runewordItem) {
					print('No longer making Stealth');
					stopMakingRuneword(Runeword.Stealth, runewordEquipment);
				} else {
					makeRuneword(Runeword.Stealth, runewordEquipment);
					Config.KeepRunewords.push("[type] == armor # [frw] == 25 && [fcr] == 25");
				}
 				
				
				// Insight
				runewordEquipment = ["poleaxe", "halberd", "bill", "battlescythe", "partizan", "becdecorbin", "thresher", "crypticaxe", "greatpoleaxe", "colossusvoulge"]; 				
				runewordItem = me.getMerc().getItems().filter(i => (i.getFlag(0x4000000) && i.fname.contains("Insight")))[0];
							
				if (runewordItem) {
					print('No longer making Insight');
					stopMakingRuneword(Runeword.Insight, runewordEquipment);
				} else {
					makeRuneword(Runeword.Insight, runewordEquipment);
					Config.KeepRunewords.push("[type] == polearm # [meditationaura] <= 17");
				}
                
				// Smoke
				runewordEquipment = ["lightplate", "ghostarmor", "serpentskinarmor", "demonhidearmor", "cuirass", "mageplate", "duskShroud", "wyrmhide", "scarabHusk", "wireFleece", "greatHauberk", "boneweave", "balrogSkin", "archonPlate"]; 	
				runewordItem = me.getItems().filter(i => (i.getFlag(0x4000000) && i.fname.contains("Smoke")))[0];
				
				if (runewordItem) {
					print('No longer making Smoke');
					stopMakingRuneword(Runeword.Smoke, runewordEquipment);
				} else {
					makeRuneword(Runeword.Smoke, runewordEquipment);
					Config.KeepRunewords.push("[type] == armor # [FireResist] == 50 && [LightResist] == 50");
				}
                
				// Ancients Pledge
				runewordEquipment = ["kiteshield", "largeshield", "boneshield"]; 	
				runewordItem = me.getItems().filter(i => (i.getFlag(0x4000000) && i.fname.contains("Ancients' Pledge")))[0];
							
				if (runewordItem) {
					print("No longer making Ancients' Pledge");
					stopMakingRuneword(Runeword.AncientsPledge, runewordEquipment);
				} else {
					makeRuneword(Runeword.AncientsPledge, runewordEquipment);
					Config.KeepRunewords.push("[type] == shield # [FireResist] >= 40 && [LightResist] >= 40 ");
				}

				// Lore
				runewordEquipment = ["cap", "skullcap", "crown", "mask", "bonehelm", "warhat", "grimhelm", "GrandCrown", "Demonhead", "BoneVisage"]; 	
				runewordItem = me.getItems().filter(i => (i.getFlag(0x4000000) && i.fname.contains("Lore")))[0];
				
				if (runewordItem) {
					print("No longer making Lore");
					stopMakingRuneword(Runeword.Lore, runewordEquipment);
				} else {
					makeRuneword(Runeword.Lore, runewordEquipment);
					Config.KeepRunewords.push("[type] == helm # [LightResist] >= 25");
				}
								
				// Spirit Sword
				runewordEquipment = ["broadsword", "crystalSword"]; 	
				runewordItem = me.getItems().filter(i => (i.getFlag(0x4000000) && i.fname.contains("Spirit") && i.itemType === 30))[0]; // itemtype sword
						
				if (runewordItem) {
					print("No longer making Spirit sword");
					stopMakingRuneword(Runeword.Spirit, runewordEquipment);
				} else {
					makeRuneword(Runeword.Spirit, runewordEquipment);
					Config.KeepRunewords.push("[type] == sword # [itemallskills] == 2");
				}

				// Spirit Shield
				runewordEquipment = ["Monarch"];
				runewordItem = me.getItems().filter(i => (i.getFlag(0x4000000) && i.fname.contains("Spirit") && i.itemType === 51))[0]; // itemtype anyshield
					
				if (runewordItem) {
					print("No longer making Spirit shield");
					stopMakingRuneword(Runeword.Spirit, runewordEquipment);
				} else {
					makeRuneword(Runeword.Spirit, runewordEquipment);
					Config.KeepRunewords.push("[type] == shield || [type] == auricshields # [fcr] <= 35");
				}
			}
		},

	2:	{			
			Update: function () {
				Config.MPBuffer = 8;
			}
		},

	3:	{			
			Update: function () {

			}
		},

	4:	{			
			Update: function () {

			}
		},

	5:	{
			Update: function () {

			}
		},

	6:	{
			Update: function () {
				Config.BeltColumn		= ["hp", "mp", "mp", "mp"];
				Config.MinColumn 		= [2, 2, 2, 2];
			}
		},

	7:	{
			Update: function () {

			}
		},

	8:	{
			Update: function () {

			}
		},

	9:	{
			Update: function () {

			}
		},

	10:	{
			Update: function () {
				Config.LowGold = 5000;
			}
		},

	11:	{
			Update: function () {

			}
		},

	12:	{
			Update: function () {

			}
		},

	13:	{
			Update: function () {

			}
		},

	14:	{
			Update: function () {

			}
		},

	15:	{
			Update: function () {

			}
		},

	16:	{
			Update: function () {

			}
		},

	17:	{
			Update: function () {

			}
		},

	18:	{
			Update: function () {

			}
		},

	19:	{
			Update: function () {

			}
		},

	20:	{
			Update: function () {
				Config.LowGold = 10000;
			}
		},

	21:	{
			Update: function () {

			}
		},

	22:	{
			Update: function () {

			}
		},

	23:	{
			Update: function () {

			}
		},

	24:	{
			Update: function () {
				Config.BeltColumn		= ["hp", "mp", "mp", "mp"];
				Config.MinColumn 		= [3, 3, 3, 3];
			}
		},

	25:	{
			Update: function () {
				Config.LowGold = 15000;
			}
		},

	26:	{
			Update: function () {

			}
		},

	27:	{
			Update: function () {

			}
		},

	28:	{
			Update: function () {

			}
		},

	29:	{
			Update: function () {

			}
		},

	30:	{
			Update: function () {
				Config.LowGold = 50000;
			}
		},

	31:	{
			Update: function () {

			}
		},

	32:	{
			Update: function () {

			}
		},

	33:	{
			Update: function () {

			}
		},

	34:	{
			Update: function () {

			}
		},

	35:	{
			Update: function () {

			}
		},

	36:	{
			Update: function () {

			}
		},

	37:	{
			Update: function () {

			}
		},

	38:	{
			Update: function () {

			}
		},

	39:	{
			Update: function () {

			}
		},

	40:	{
			Update: function () {
				Config.NoTele = false;
				Config.Dodge = true;
			}
		},

	41:	{
			Update: function () {

			}
		},

	42:	{
			Update: function () {

			}
		},

	43:	{
			Update: function () {

			}
		},

	44:	{
			Update: function () {

			}
		},

	45:	{
			Update: function () {

			}
		},

	46:	{
			Update: function () {

			}
		},

	47:	{
			Update: function () {

			}
		},

	48:	{
			Update: function () {

			}
		},

	49:	{
			Update: function () {

			}
		},

	50:	{
			Update: function () {

			}
		},

	51:	{
			Update: function () {

			}
		},

	52:	{
			Update: function () {

			}
		},

	53:	{
			Update: function () {

			}
		},

	54:	{
			Update: function () {

			}
		},

	55:	{
			Update: function () {

			}
		},

	56:	{
			Update: function () {

			}
		},

	57:	{
			Update: function () {

			}
		},

	58:	{
			Update: function () {

			}
		},

	59:	{
			Update: function () {

			}
		},

	60:	{
			Update: function () {

			}
		},

	61:	{
			Update: function () {

			}
		},

	62:	{
			Update: function () {

			}
		},

	63:	{
			Update: function () {

			}
		},

	64:	{
			Update: function () {

			}
		},

	65:	{
			Update: function () {

			}
		},

	66:	{
			Update: function () {

			}
		},

	67:	{
			Update: function () {

			}
		},

	68:	{
			Update: function () {

			}
		},

	69:	{
			Update: function () {

			}
		},

	70:	{
			Update: function () {

			}
		},

	71:	{
			Update: function () {

			}
		},

	72:	{
			Update: function () {

			}
		},

	73:	{
			Update: function () {

			}
		},

	74:	{
			Update: function () {

			}
		},

	75:	{
			Update: function () {

			}
		},

	76:	{
			Update: function () {

			}
		},

	77:	{
			Update: function () {

			}
		},

	78:	{
			Update: function () {

			}
		},

	79:	{
			Update: function () {

			}
		},

	80:	{
			Update: function () {

			}
		},

	81:	{
			Update: function () {

			}
		},

	82:	{
			Update: function () {

			}
		},

	83:	{
			Update: function () {

			}
		},

	84:	{
			Update: function () {

			}
		},

	85:	{
			Update: function () {

			}
		},

	86:	{
			Update: function () {

			}
		},

	87:	{
			Update: function () {

			}
		},

	88:	{
			Update: function () {

			}
		},

	89:	{
			Update: function () {

			}
		},

	90:	{
			Update: function () {

			}
		},

	91:	{
			Update: function () {

			}
		},

	92:	{
			Update: function () {

			}
		},

	93:	{
			Update: function () {

			}
		},

	94:	{
			Update: function () {

			}
		},

	95:	{
			Update: function () {

			}
		},

	96:	{
			Update: function () {

			}
		},

	97:	{
			Update: function () {

			}
		},

	98:	{
			Update: function () {

			}
		},

	99:	{
			Update: function () {

			}
		}
};