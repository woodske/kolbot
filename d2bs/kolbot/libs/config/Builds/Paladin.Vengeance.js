/** Hammerdin Paladin Build
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

	Attack Config Variables For Paladin
	---------------------------------------------------------------------------------------------------------------------
	Config.AttackSkill[0] = -1; // Preattack skill.
	Config.AttackSkill[1] = 112; // Primary skill to bosses.
	Config.AttackSkill[2] = 113; // Primary aura to bosses
	Config.AttackSkill[3] = 112; // Primary skill to others.
	Config.AttackSkill[4] = 113; // Primary aura to others.
	Config.AttackSkill[5] = 101; // Secondary skill if monster is immune to primary.
	Config.AttackSkill[6] = 120; // Secondary aura.
*/
js_strict(true);

if (!isIncluded("common/Cubing.js")) { include("common/Cubing.js"); };
if (!isIncluded("common/Prototypes.js")) { include("common/Prototypes.js"); };
if (!isIncluded("common/Runewords.js")) { include("common/Runewords.js"); };

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
		SkillPoints: [-1],
		StatPoints: [-1, -1, -1, -1, -1],
		Update: function () {
			// Class specific
			Config.PickitFiles.push("Follower/paladin-vengeance.xpac.nip");

			Config.Charge 			= false;

			//---------------------- Attacks ------------------
			Config.AutoSkill.Enabled	= true; // Enable or disable AutoSkill system
			Config.AutoSkill.Build 	= [
				[117, 1, false], // Holy Shield
				[123, 1, false], // Conviction
				[111, 1, false], // Vengeance
				[123, 20, false], // Max Conviction
				[111, 20, true], // Max Vengeance -- hold skill points until this is maxed
				[110, 10, false], // Resist Lightning
				[100, 10, false], // Resist Fire
				[110, 20, false], // Max Resist Lightning
				[100, 20, false], // Max Resist Fire
				[105, 20, false], // Max Resist Cold
			];

			if (me.getSkill(123, 1)) { // Conviction
				Config.AttackSkill 	= [-1, 111, 123, 111, 123, -1, -1];
				Config.LowManaSkill	= [-1, -1];
			} else if (me.getSkill(114, 1)) { // Holy Freeze
				Config.AttackSkill 	= [-1, 111, 114, 111, 114, -1, -1];
				Config.LowManaSkill = [0, 114];
			} else if (me.getSkill(106, 1)) { // Zeal
				Config.AttackSkill 	= [-1, 106, 102, 106, 102, -1, -1];
				Config.LowManaSkill = [0, 102];
			} else if (me.getSkill(102, 1)) { // Holy Fire
				Config.AttackSkill 	= [-1, 0, 102, 0, 102, -1, -1];
				Config.LowManaSkill = [0, 102];
			} else if (me.getSkill(98, 1)) { // Might
				Config.AttackSkill 	= [-1, 0, 98, 0, 98, -1, -1];
				Config.LowManaSkill = [0, 98];
			} else {
				Config.AttackSkill 	= [-1, 0, -1, 0, -1, -1, -1];
			}

			//---------------------- Stats ------------------
			Config.AutoStat.Enabled = true; // Enable or disable AutoStat system
			Config.AutoStat.Build 	= [
				["vitality", 20],
				["strength", 20], // Hard leather armor
				["vitality", 50],
				["strength", 47], // Kite shield
				["vitality", 200],
				["strength", 156], // Monarch
				["dexterity", 77], // Stormlash
				["vitality", "all"], // put rest of the points in vitality
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
			Config.Cubing           = false;                        // Don't cube yet!
			Config.MakeRunewords    = true;
			Config.PublicMode       = 2;                            // Accept invites
			Config.LifeChicken      = 0;                            // Don't exit games when close to death
			Config.LogLowRunes      = true;
			Config.LogMiddleRunes   = true;
			Config.LocalChat.Enabled = true;                        // enable the LocalChat system
			Config.LocalChat.Mode   = 2;                            // 0 = disabled, 1 = chat from 'say' (recommended), 2 = all chat (for manual play)

			Config.Inventory[0] = [1,1,1,1,1,1,1,1,1,1];
			Config.Inventory[1] = [1,1,1,1,1,1,1,1,1,1];
			Config.Inventory[2] = [1,1,1,1,1,1,1,1,1,1];
			Config.Inventory[3] = [1,1,1,1,1,1,1,1,1,1];

			Config.PickitFiles.push("Follower/misc.nip");
			Config.PickitFiles.push("Follower/rwbase-other.nip");
			Config.PickitFiles.push("Follower/rwbase-pallyshield.nip");
			Config.PickitFiles.push("Follower/merc.xpac.nip");
			Config.PickitFiles.push("earlyLadder.nip");

			//---------------------- Runewords ------------------

			var runewordItem, runewordEquipment, merc;

			// Insight
			runewordEquipment = ["poleaxe", "halberd", "bill", "battlescythe", "partizan", "becdecorbin", "thresher", "crypticaxe", "greatpoleaxe", "colossusvoulge"];
			merc = me.getMerc();

			if (merc.itemcount > 0) {
				runewordItem = merc.getItems().filter(i => (i.getFlag(0x4000000) && i.fname.contains("Insight")))[0];
			} else {
				runewordItem = false;
			}

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
			runewordEquipment = ["targe", "rondache", "aerinshield", "crownshield", "royalshield"];
			runewordItem = me.getItems().filter(i => (i.getFlag(0x4000000) && i.fname.contains("Ancients' Pledge")))[0];

			if (runewordItem) {
				print("No longer making Ancients' Pledge");
				stopMakingRuneword(Runeword.AncientsPledge, runewordEquipment);
			} else {
				makeRuneword(Runeword.AncientsPledge, runewordEquipment);
				Config.KeepRunewords.push("[type] == auricshields # [FireResist] >= 40 && [LightResist] >= 40 ");
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
		}
	},

	2:	{
		SkillPoints: [-1],
		StatPoints: [-1, -1, -1, -1, -1],
		Update: function () {

		}
	},

	3:	{
		SkillPoints: [-1],
		StatPoints: [-1, -1, -1, -1, -1],
		Update: function () {

		}
	},

	4:	{
		SkillPoints: [-1],
		StatPoints: [-1, -1, -1, -1, -1],
		Update: function () {

		}
	},

	5:	{
		SkillPoints: [-1],
		StatPoints: [-1, -1, -1, -1, -1],
		Update: function () {
			Config.MinColumn = [1, 1, 1, 1];
		}
	},

	6:	{
		SkillPoints: [-1],
		StatPoints: [-1, -1, -1, -1, -1],
		Update: function () {

		}
	},

	7:	{
		SkillPoints: [-1],
		StatPoints: [-1, -1, -1, -1, -1],
		Update: function () {

		}
	},

	8:	{
		SkillPoints: [-1],
		StatPoints: [-1, -1, -1, -1, -1],
		Update: function () {

		}
	},

	9:	{
		SkillPoints: [-1],
		StatPoints: [-1, -1, -1, -1, -1],
		Update: function () {

		}
	},

	10:	{
		SkillPoints: [-1],
		StatPoints: [-1, -1, -1, -1, -1],
		Update: function () {
			Config.LowGold = 5000;
		}
	},

	11:	{
		SkillPoints: [-1],
		StatPoints: [-1, -1, -1, -1, -1],
		Update: function () {

		}
	},

	12:	{
		SkillPoints: [-1],
		StatPoints: [-1, -1, -1, -1, -1],
		Update: function () {

		}
	},

	13:	{
		SkillPoints: [-1],
		StatPoints: [-1, -1, -1, -1, -1],
		Update: function () {

		}
	},

	14:	{
		SkillPoints: [-1],
		StatPoints: [-1, -1, -1, -1, -1],
		Update: function () {

		}
	},

	15:	{
		SkillPoints: [-1],
		StatPoints: [-1, -1, -1, -1, -1],
		Update: function () {

		}
	},

	16:	{
		SkillPoints: [-1],
		StatPoints: [-1, -1, -1, -1, -1],
		Update: function () {

		}
	},

	17:	{
		SkillPoints: [-1],
		StatPoints: [-1, -1, -1, -1, -1],
		Update: function () {

		}
	},

	18:	{
		SkillPoints: [-1],
		StatPoints: [-1, -1, -1, -1, -1],
		Update: function () {
			Config.Cubing = true;
			Config.MinColumn = [3, 3, 3, 3];
			Config.BeltColumn = ["hp", "hp", "hp", "mp"];
		}
	},

	19:	{
		SkillPoints: [-1],
		StatPoints: [-1, -1, -1, -1, -1],
		Update: function () {

		}
	},

	20:	{
		SkillPoints: [-1],
		StatPoints: [-1, -1, -1, -1, -1],
		Update: function () {
			Config.LowGold = 10000;
		}
	},

	21:	{
		SkillPoints: [-1],
		StatPoints: [-1, -1, -1, -1, -1],
		Update: function () {

		}
	},

	22:	{
		SkillPoints: [-1],
		StatPoints: [-1, -1, -1, -1, -1],
		Update: function () {

		}
	},

	23:	{
		SkillPoints: [-1],
		StatPoints: [-1, -1, -1, -1, -1],
		Update: function () {

		}
	},

	24:	{
		SkillPoints: [-1],
		StatPoints: [-1, -1, -1, -1, -1],
		Update: function () {

		}
	},

	25:	{
		SkillPoints: [-1],
		StatPoints: [-1, -1, -1, -1, -1],
		Update: function () {
			Config.LowGold = 15000;
		}
	},

	26:	{
		SkillPoints: [-1],
		StatPoints: [-1, -1, -1, -1, -1],
		Update: function () {

		}
	},

	27:	{
		SkillPoints: [-1],
		StatPoints: [-1, -1, -1, -1, -1],
		Update: function () {

		}
	},

	28:	{
		SkillPoints: [-1],
		StatPoints: [-1, -1, -1, -1, -1],
		Update: function () {

		}
	},

	29:	{
		SkillPoints: [-1],
		StatPoints: [-1, -1, -1, -1, -1],
		Update: function () {

		}
	},

	30:	{
		SkillPoints: [-1],
		StatPoints: [-1, -1, -1, -1, -1],
		Update: function () {
			Config.LowGold = 20000;
		}
	},

	31:	{
		SkillPoints: [-1],
		StatPoints: [-1, -1, -1, -1, -1],
		Update: function () {

		}
	},

	32:	{
		SkillPoints: [-1],
		StatPoints: [-1, -1, -1, -1, -1],
		Update: function () {

		}
	},

	33:	{
		SkillPoints: [-1],
		StatPoints: [-1, -1, -1, -1, -1],
		Update: function () {

		}
	},

	34:	{
		SkillPoints: [-1],
		StatPoints: [-1, -1, -1, -1, -1],
		Update: function () {

		}
	},

	35:	{
		SkillPoints: [-1],
		StatPoints: [-1, -1, -1, -1, -1],
		Update: function () {
			Config.LowGold = 30000;
		}
	},

	36:	{
		SkillPoints: [-1],
		StatPoints: [-1, -1, -1, -1, -1],
		Update: function () {

		}
	},

	37:	{
		SkillPoints: [-1],
		StatPoints: [-1, -1, -1, -1, -1],
		Update: function () {

		}
	},

	38:	{
		SkillPoints: [-1],
		StatPoints: [-1, -1, -1, -1, -1],
		Update: function () {

		}
	},

	39:	{
		SkillPoints: [-1],
		StatPoints: [-1, -1, -1, -1, -1],
		Update: function () {

		}
	},

	40:	{
		SkillPoints: [-1],
		StatPoints: [-1, -1, -1, -1, -1],
		Update: function () {
			Config.LowGold = 35000;
		}
	},

	41:	{
		SkillPoints: [-1],
		StatPoints: [-1, -1, -1, -1, -1],
		Update: function () {

		}
	},

	42:	{
		SkillPoints: [-1],
		StatPoints: [-1, -1, -1, -1, -1],
		Update: function () {

		}
	},

	43:	{
		SkillPoints: [-1],
		StatPoints: [-1, -1, -1, -1, -1],
		Update: function () {

		}
	},

	44:	{
		SkillPoints: [-1],
		StatPoints: [-1, -1, -1, -1, -1],
		Update: function () {

		}
	},

	45:	{
		SkillPoints: [-1],
		StatPoints: [-1, -1, -1, -1, -1],
		Update: function () {
			Config.LowGold = 40000;
		}
	},

	46:	{
		SkillPoints: [-1],
		StatPoints: [-1, -1, -1, -1, -1],
		Update: function () {

		}
	},

	47:	{
		SkillPoints: [-1],
		StatPoints: [-1, -1, -1, -1, -1],
		Update: function () {

		}
	},

	48:	{
		SkillPoints: [-1],
		StatPoints: [-1, -1, -1, -1, -1],
		Update: function () {

		}
	},

	49:	{
		SkillPoints: [-1],
		StatPoints: [-1, -1, -1, -1, -1],
		Update: function () {

		}
	},

	50:	{
		SkillPoints: [-1],
		StatPoints: [-1, -1, -1, -1, -1],
		Update: function () {
			Config.StashGold = 100000;								// Minimum amount of gold to stash.
			Config.BeltColumn = ["hp", "hp", "mp", "rv"];			// Regular potion settings
			Config.MinColumn = [3, 3, 3, 0];						// Regular potion settings
			Config.LowGold = 45000;
		}
	},

	51:	{
		SkillPoints: [-1],
		StatPoints: [-1, -1, -1, -1, -1],
		Update: function () {

		}
	},

	52:	{
		SkillPoints: [-1],
		StatPoints: [-1, -1, -1, -1, -1],
		Update: function () {

		}
	},

	53:	{
		SkillPoints: [-1],
		StatPoints: [-1, -1, -1, -1, -1],
		Update: function () {

		}
	},

	54:	{
		SkillPoints: [-1],
		StatPoints: [-1, -1, -1, -1, -1],
		Update: function () {

		}
	},

	55:	{
		SkillPoints: [-1],
		StatPoints: [-1, -1, -1, -1, -1],
		Update: function () {
			Config.LowGold = 50000;
		}
	},

	56:	{
		SkillPoints: [-1],
		StatPoints: [-1, -1, -1, -1, -1],
		Update: function () {

		}
	},

	57:	{
		SkillPoints: [-1],
		StatPoints: [-1, -1, -1, -1, -1],
		Update: function () {

		}
	},

	58:	{
		SkillPoints: [-1],
		StatPoints: [-1, -1, -1, -1, -1],
		Update: function () {

		}
	},

	59:	{
		SkillPoints: [-1],
		StatPoints: [-1, -1, -1, -1, -1],
		Update: function () {

		}
	},

	60:	{
		SkillPoints: [-1],
		StatPoints: [-1, -1, -1, -1, -1],
		Update: function () {
			Config.LowGold = 55000;
			Config.Charge = true;
		}
	},

	61:	{
		SkillPoints: [-1],
		StatPoints: [-1, -1, -1, -1, -1],
		Update: function () {

		}
	},

	62:	{
		SkillPoints: [-1],
		StatPoints: [-1, -1, -1, -1, -1],
		Update: function () {

		}
	},

	63:	{
		SkillPoints: [-1],
		StatPoints: [-1, -1, -1, -1, -1],
		Update: function () {

		}
	},

	64:	{
		SkillPoints: [-1],
		StatPoints: [-1, -1, -1, -1, -1],
		Update: function () {

		}
	},

	65:	{
		SkillPoints: [-1],
		StatPoints: [-1, -1, -1, -1, -1],
		Update: function () {
			Config.LowGold = 60000;
		}
	},

	66:	{
		SkillPoints: [-1],
		StatPoints: [-1, -1, -1, -1, -1],
		Update: function () {

		}
	},

	67:	{
		SkillPoints: [-1],
		StatPoints: [-1, -1, -1, -1, -1],
		Update: function () {

		}
	},

	68:	{
		SkillPoints: [-1],
		StatPoints: [-1, -1, -1, -1, -1],
		Update: function () {

		}
	},

	69:	{
		SkillPoints: [-1],
		StatPoints: [-1, -1, -1, -1, -1],
		Update: function () {

		}
	},

	70:	{
		SkillPoints: [-1],
		StatPoints: [-1, -1, -1, -1, -1],
		Update: function () {
			Config.LowGold = 100000;
		}
	},

	71:	{
		SkillPoints: [-1],
		StatPoints: [-1, -1, -1, -1, -1],
		Update: function () {

		}
	},

	72:	{
		SkillPoints: [-1],
		StatPoints: [-1, -1, -1, -1, -1],
		Update: function () {

		}
	},

	73:	{
		SkillPoints: [-1],
		StatPoints: [-1, -1, -1, -1, -1],
		Update: function () {

		}
	},

	74:	{
		SkillPoints: [-1],
		StatPoints: [-1, -1, -1, -1, -1],
		Update: function () {

		}
	},

	75:	{
		SkillPoints: [-1],
		StatPoints: [-1, -1, -1, -1, -1],
		Update: function () {

		}
	},

	76:	{
		SkillPoints: [-1],
		StatPoints: [-1, -1, -1, -1, -1],
		Update: function () {

		}
	},

	77:	{
		SkillPoints: [-1],
		StatPoints: [-1, -1, -1, -1, -1],
		Update: function () {

		}
	},

	78:	{
		SkillPoints: [-1],
		StatPoints: [-1, -1, -1, -1, -1],
		Update: function () {

		}
	},

	79:	{
		SkillPoints: [-1],
		StatPoints: [-1, -1, -1, -1, -1],
		Update: function () {

		}
	},

	80:	{
		SkillPoints: [-1],
		StatPoints: [-1, -1, -1, -1, -1],
		Update: function () {

		}
	},

	81:	{
		SkillPoints: [-1],
		StatPoints: [-1, -1, -1, -1, -1],
		Update: function () {

		}
	},

	82:	{
		SkillPoints: [-1],
		StatPoints: [-1, -1, -1, -1, -1],
		Update: function () {

		}
	},

	83:	{
		SkillPoints: [-1],
		StatPoints: [-1, -1, -1, -1, -1],
		Update: function () {

		}
	},

	84:	{
		SkillPoints: [-1],
		StatPoints: [-1, -1, -1, -1, -1],
		Update: function () {

		}
	},

	85:	{
		SkillPoints: [-1],
		StatPoints: [-1, -1, -1, -1, -1],
		Update: function () {

		}
	},

	86:	{
		SkillPoints: [-1],
		StatPoints: [-1, -1, -1, -1, -1],
		Update: function () {

		}
	},

	87:	{
		SkillPoints: [-1],
		StatPoints: [-1, -1, -1, -1, -1],
		Update: function () {

		}
	},

	88:	{
		SkillPoints: [-1],
		StatPoints: [-1, -1, -1, -1, -1],
		Update: function () {

		}
	},

	89:	{
		SkillPoints: [-1],
		StatPoints: [-1, -1, -1, -1, -1],
		Update: function () {

		}
	},

	90:	{
		SkillPoints: [-1],
		StatPoints: [-1, -1, -1, -1, -1],
		Update: function () {

		}
	},

	91:	{
		SkillPoints: [-1],
		StatPoints: [-1, -1, -1, -1, -1],
		Update: function () {

		}
	},

	92:	{
		SkillPoints: [-1],
		StatPoints: [-1, -1, -1, -1, -1],
		Update: function () {

		}
	},

	93:	{
		SkillPoints: [-1],
		StatPoints: [-1, -1, -1, -1, -1],
		Update: function () {

		}
	},

	94:	{
		SkillPoints: [-1],
		StatPoints: [-1, -1, -1, -1, -1],
		Update: function () {

		}
	},

	95:	{
		SkillPoints: [-1],
		StatPoints: [-1, -1, -1, -1, -1],
		Update: function () {

		}
	},

	96:	{
		SkillPoints: [-1],
		StatPoints: [-1, -1, -1, -1, -1],
		Update: function () {

		}
	},

	97:	{
		SkillPoints: [-1],
		StatPoints: [-1, -1, -1, -1, -1],
		Update: function () {

		}
	},

	98:	{
		SkillPoints: [-1],
		StatPoints: [-1, -1, -1, -1, -1],
		Update: function () {

		}
	},

	99:	{
		SkillPoints: [-1],
		StatPoints: [-1, -1, -1, -1, -1],
		Update: function () {

		}
	}
};