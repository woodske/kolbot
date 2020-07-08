/** Wind Druid Build - unfinished
*
* Instructions:   See /d2bs/kolbot/libs/config/Builds/README.txt
*
* Skill IDs:   See /d2bs/kolbot/sdk/skills.txt for a list of skill IDs.
*
* Stat IDs:
*
* 	Strength	= 0
* 	Energy		= 1
* 	Dexterity	= 2
* 	Vitality	= 3
*
*

*/
js_strict(true);

if (!isIncluded("common/Cubing.js")) { include("common/Cubing.js"); };
if (!isIncluded("common/Prototypes.js")) { include("common/Prototypes.js"); };
if (!isIncluded("common/Runewords.js")) { include("common/Runewords.js"); };
if (!isIncluded("common/RunewordManager.js")) { include("common/RunewordManager.js"); };

var AutoBuildTemplate = {

	1: {
		SkillPoints: [-1],
		StatPoints: [-1, -1, -1, -1, -1],
		Update: function () {
			var charPickit = "Follower/druid.xpac.nip";
			var mercPickit = "Follower/merc.xpac.nip";

			// Class specific
			Config.PickitFiles.push(charPickit);
			Config.PickitFiles.push(mercPickit);

			Config.SummonAnimal     = 0;
			Config.SummonSpirit     = 0;
			Config.SummonVine       = 0;

			//---------------------- Attacks ------------------
			Config.AutoSkill.Enabled	= true; // Enable or disable AutoSkill system
			Config.AutoSkill.Build 	= [
				[250, 1, false], // Hurricane
				[247, 1, false], // Summon Grizzly
				[226, 20, false], // Max Oak Sage
				[245, 20, false], // Max Tornado
				[250, 20, false], // Max Hurricane
				[240, 20, true], // Max Twister
				[235, 20, false], // Max Cyclone Armor
			];

			if (RunewordManager.hasSkill(247)) {
				Config.SummonAnimal = "Grizzly";
			} else if (RunewordManager.hasSkill(237)) {
				Config.SummonAnimal = "Dire Wolf";
			} else if (RunewordManager.hasSkill(227)) {
				Config.SummonAnimal = "Spirit Wolf";
			}

			if (RunewordManager.hasSkill(226)) {
				Config.SummonSpirit = "Oak Sage";
			}

			if (RunewordManager.hasSkill(245)) {
				Config.AttackSkill 	= [-1, 245, -1, 245, -1, -1, -1];
				Config.LowManaSkill	= [-1, -1];
			} else if (RunewordManager.hasSkill(240)) {
				Config.AttackSkill 	= [-1, 240, -1, 240, -1, -1, -1];
				Config.LowManaSkill	= [-1, -1];
			} else if (RunewordManager.hasSkill(230)) {
				Config.AttackSkill 	= [-1, 230, -1, 230, -1, -1, -1];
				Config.LowManaSkill	= [0, 0];
			} else {
				Config.AttackSkill 	= [-1, 0, -1, 0, -1, -1, -1];
				Config.LowManaSkill = [0, 0];
			}

			//---------------------- Stats ------------------
			Config.AutoStat.Enabled = true; // Enable or disable AutoStat system
			Config.AutoStat.Build 	= [
				["vitality", 20],
				["strength", 20], // Hard leather armor
				["vitality", 50],
				["strength", 47], // Kite shield
				["dexterity", 35], // flail
				["vitality", 200],
				["strength", 156], // Monarch
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

			Config.Inventory[0] = [1, 1, 1, 1, 1, 1, 1, 1, 1, 1];
			Config.Inventory[1] = [1, 1, 1, 1, 1, 1, 1, 1, 1, 1];
			Config.Inventory[2] = [1, 1, 1, 1, 1, 1, 1, 1, 1, 1];
			Config.Inventory[3] = [1, 1, 1, 1, 1, 1, 1, 1, 1, 1];

			//--------------------- Pickit ----------------------

			Config.PickitFiles.push("Follower/misc.nip");
			Config.PickitFiles.push("earlyLadder.nip");

			//-------------- Recipes & Gambling -----------------

			// Gambling config
			Config.Gamble = true;
			Config.GambleGoldStart = 1000000;
			Config.GambleGoldStop = 500000;

			// List of item names or classids for gambling. Check libs/NTItemAlias.dbl file for other item classids.
			Config.GambleItems.push("Amulet");
			Config.GambleItems.push("Ring");
			Config.GambleItems.push("Circlet");
			Config.GambleItems.push("Coronet");

			Config.Recipes.push([Recipe.Reroll.Magic, "Grand Charm"]);
			Config.Recipes.push([Recipe.Reroll.Rare, "Diadem"]);

			//-------------------- Runewords --------------------
			// Get corpse and merc to compare items
			if (me.inTown) {
				Town.getCorpse();
				Town.reviveMerc();
			}

			var runewords = ["Insight", "Treachery", "Stealth", "Smoke", "Ancient's Pledge", "Spirit Shield", "Lore", "Spirit Sword", "Hoto"];

			RunewordManager.manageRunewords(charPickit, mercPickit, runewords, false);
		}
	},

	2:	{
		SkillPoints: [-1],
		StatPoints: [-1, -1, -1, -1, -1],
		Update: function () {
			Scripts.Follower = false;
			Scripts.MFHelper = true;
			Scripts.DiabloHelper = true; // Chaos helper, kills monsters and doesn't open seals on its own.
				Config.DiabloHelper.Wait = 120; // Seconds to wait for a runner to be in Chaos. If Config.Leader is set, it will wait only for the leader.
				Config.DiabloHelper.Entrance = true; // Start from entrance. Set to false to start from star.
				Config.DiabloHelper.SkipTP = false; // Don't wait for town portal and directly head to chaos. It will clear monsters around chaos entrance and wait for the runner.
				Config.DiabloHelper.SkipIfBaal = false; // End script if there are party members in a Baal run.
				Config.DiabloHelper.OpenSeals = false; // Open seals as the helper
				Config.DiabloHelper.SafePrecast = false; // take random WP to safely precast
				Config.DiabloHelper.SealOrder = ["vizier", "seis", "infector"]; // the order in which to clear the seals. If seals are excluded, they won't be checked unless diablo fails to appear
				Config.DiabloHelper.RecheckSeals = false; // Teleport to each seal and double-check that it was opened and boss was killed if Diablo doesn't appear
			Scripts.BaalHelper = true;
				Config.BaalHelper.Wait = 120; // Seconds to wait for a runner to be in Throne
				Config.BaalHelper.KillNihlathak = false; // Kill Nihlathak before going to Throne
				Config.BaalHelper.FastChaos = false; // Kill Diablo before going to Throne
				Config.BaalHelper.DollQuit = false; // End script if Dolls (Undead Soul Killers) are found.
				Config.BaalHelper.KillBaal = true; // Kill Baal. If set to false, you must configure Config.QuitList or the bot will wait indefinitely.
				Config.BaalHelper.SkipTP = false; // Don't wait for a TP, go to WSK3 and wait for someone to go to throne. Anti PK measure.

			Config.LocalChat.Mode = 1;
			Config.LifeChicken = 5;

		}
	},

	3:	{
		SkillPoints: [-1],
		StatPoints: [-1, -1, -1, -1, -1],
		Update: function () {

		}
	},

	4: {
		SkillPoints: [-1],
		StatPoints: [-1, -1, -1, -1, -1],
		Update: function () {

		}
	},

	5:	{
		SkillPoints: [-1],
		StatPoints: [-1, -1, -1, -1, -1],
		Update: function () {

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
			Config.HPBuffer = 8; // Number of healing potions to keep in inventory.
			Config.BeltColumn = ["hp", "hp", "mp", "mp"];
			Config.MinColumn = [2, 2, 2, 2];
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
			Config.HPBuffer = 2; // Number of healing potions to keep in inventory.
			Config.MPBuffer = 6; // Number of mana potions to keep in inventory.
			Config.TownCheck = true; // Go to town if out of potions
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
			Config.LowGold = 50000;
			Config.MinColumn = [3, 3, 3, 3];
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
			Config.BeltColumn = ["hp", "mp", "rv", "rv"];
			Config.MinColumn = [3, 3, 0, 0];
			Config.HPBuffer = 0;
			Config.MPBuffer = 0;
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
