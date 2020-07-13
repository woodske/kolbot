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
if (!isIncluded("common/AutoBuildHelper.js")) { include("common/AutoBuildHelper.js"); };

var AutoBuildTemplate = {

	1:	{
		SkillPoints: [-1],
		StatPoints: [-1, -1, -1, -1, -1],
		Update: function () {
			var charPickit = "Follower/paladin-vengeance.xpac.nip";
			var mercPickit = "Follower/merc.xpac.nip";

			// Class specific
			Config.PickitFiles.push(charPickit);
			Config.PickitFiles.push(mercPickit);

			Config.Charge 			= false;

			//---------------------- Attacks ------------------
			Config.AutoSkill.Enabled	= true; // Enable or disable AutoSkill system
			Config.AutoSkill.Build 	= [
				[123, 1, false], // Conviction
				[111, 1, false], // Vengeance
				[117, 1, false], // Holy Shield
				[111, 20, false], // Max Vengeance
				[123, 20, true], // Max Conviction -- hold skill points until this is maxed
				[110, 10, false], // Resist Lightning
				[100, 10, false], // Resist Fire
				[110, 20, false], // Max Resist Lightning
				[100, 20, false], // Max Resist Fire
				[105, 20, false], // Max Resist Cold
			];

			if (AutoBuildHelper.hasSkill(123)) { // Conviction
				Config.AttackSkill 	= [-1, 111, 123, 111, 123, -1, -1];
				Config.LowManaSkill	= [-1, -1];
			} else if (AutoBuildHelper.hasSkill(111)) { // Vengeance
				Config.AttackSkill 	= [-1, 111, 114, 111, 114, -1, -1];
				Config.LowManaSkill = [0, 114];
			} else if (AutoBuildHelper.hasSkill(114)) { // Holy Freeze
				Config.AttackSkill 	= [-1, 106, 114, 106, 114, -1, -1];
				Config.LowManaSkill = [0, 114];
			} else if (AutoBuildHelper.hasSkill(106)) { // Zeal
				Config.AttackSkill 	= [-1, 106, 102, 106, 102, -1, -1];
				Config.LowManaSkill = [0, 102];
			} else if (AutoBuildHelper.hasSkill(102)) { // Holy Fire
				Config.AttackSkill 	= [-1, 0, 102, 0, 102, -1, -1];
				Config.LowManaSkill = [0, 102];
			} else if (AutoBuildHelper.hasSkill(98)) { // Might
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

			Config.Inventory[0] = [0, 0, 1, 1, 1, 1, 1, 1, 1, 1];
			Config.Inventory[1] = [0, 0, 1, 1, 1, 1, 1, 1, 1, 1];
			Config.Inventory[2] = [1, 0, 1, 1, 1, 1, 1, 1, 1, 1];
			Config.Inventory[3] = [1, 0, 1, 1, 1, 1, 1, 1, 1, 1];

			//---------------------- Pickit ------------------

			Config.PickitFiles.push("Follower/misc.nip");
			Config.PickitFiles.push("earlyLadder.nip");

			//---------------------- Runewords ------------------
			// Get corpse and merc to compare items
			if (me.inTown) {
				Town.getCorpse();
				Town.reviveMerc();
			}

			var equipment,
				nipConfig,
				nipFileName,
				runewordKeep,
				runes,
				tierCheck,
				runewordConfig;


			// --- Insight ---
			nipFileName = 'earlyInsight';
			runewordConfig = {
				runes: Runeword.Insight,
				runewordKeep: "[type] == polearm # [meditationaura] <= 17",
				equipment: ["poleaxe", "halberd", "bill", "battlescythe", "partizan", "becdecorbin", "thresher", "crypticaxe", "greatpoleaxe"],
				recipes: [[Recipe.Socket.Weapon, "Thresher", Roll.Eth]],
				recipePickit: ["[name] == thresher && [quality] == normal && [flag] == ethereal # [sockets] == 0 # [maxquantity] == 1"]
			};
			nipConfig = {
				name: ['==', runewordConfig.equipment],
				type: '[quality] <= superior && [flag] != ethereal # [sockets] == 4 # [MaxQuantity] == 1'
			};
			tierCheck = {
				charNipFile: "pickit/" + charPickit,
				mercNipFile: "pickit/" + mercPickit,
				isMerc: true,
				tier: 50,
				itemType: "weapon"
			};

			AutoBuildHelper.handleRunewords(nipFileName, runewordConfig, nipConfig, tierCheck);

			nipFileName = 'lateInsight';
			runes = Runeword.Insight;
			runewordKeep = "[type] == polearm # [meditationaura] <= 17";
			equipment = ["thresher", "crypticaxe", "greatpoleaxe", "giantthresher"];
			nipConfig = {
				name: ['==', equipment],
				type: '[quality] <= superior && [flag] == ethereal # [sockets] == 4 # [MaxQuantity] == 1'
			};
			tierCheck = {
				charNipFile: "pickit/" + charPickit,
				mercNipFile: "pickit/" + mercPickit,
				isMerc: true,
				tier: 100,
				itemType: "weapon"
			};

			AutoBuildHelper.handleRunewords(nipFileName, runes, runewordKeep, equipment, nipConfig, tierCheck);


			// --- Stealth ---
			nipFileName = 'stealth';
			runes = Runeword.Stealth;
			runewordKeep = "[type] == armor # [frw] == 25 && [fcr] == 25";
			equipment = ["quiltedarmor", "hardleatherarmor", "leatherarmor"];
			nipConfig = {
				name: ['==', equipment],
				type: '[quality] <= superior && [flag] != ethereal # [sockets] == 2 # [MaxQuantity] == 1'
			};
			tierCheck = {
				charNipFile: "pickit/" + charPickit,
				mercNipFile: "pickit/" + mercPickit,
				isMerc: false,
				tier: 50,
				itemType: "armor"
			};

			AutoBuildHelper.handleRunewords(nipFileName, runes, runewordKeep, equipment, nipConfig, tierCheck);


			// --- Smoke ---
			nipFileName = 'smoke';
			runes = Runeword.Smoke;
			runewordKeep = "[type] == armor # [FireResist] == 50 && [LightResist] == 50";
			equipment = ["lightplate", "ghostarmor", "serpentskinarmor", "demonhidearmor", "cuirass", "mageplate", "duskShroud", "wyrmhide", "scarabHusk", "wireFleece", "greatHauberk", "boneweave", "balrogSkin", "archonPlate"];
			nipConfig = {
				name: ['==', equipment],
				type: '[quality] <= superior && [flag] != ethereal # [sockets] == 2 # [MaxQuantity] == 1'
			};
			tierCheck = {
				charNipFile: "pickit/" + charPickit,
				mercNipFile: "pickit/" + mercPickit,
				isMerc: false,
				tier: 51,
				itemType: "armor"
			};

			AutoBuildHelper.handleRunewords(nipFileName, runes, runewordKeep, equipment, nipConfig, tierCheck);


			// --- Ancient's Pledge ---
			nipFileName = 'ancientspledge';
			runes = Runeword.AncientsPledge;
			runewordKeep = "[type] == auricshields && [flag] == runeword # [fireresist] >= 40 && [lightresist] >= 40";
			equipment = ["targe", "rondache", "aerinshield", "crownshield", "royalshield"];
			nipConfig = {
				name: ['==', equipment],
				type: '[quality] <= superior && [flag] != ethereal # [sockets] == 3 # [MaxQuantity] == 1'
			};
			tierCheck = {
				charNipFile: "pickit/" + charPickit,
				mercNipFile: "pickit/" + mercPickit,
				isMerc: false,
				tier: 50,
				itemType: "shield"
			};

			AutoBuildHelper.handleRunewords(nipFileName, runes, runewordKeep, equipment, nipConfig, tierCheck);

			// --- Lore ---
			nipFileName = 'lore';
			runes = Runeword.Lore;
			runewordKeep = "[type] == helm # [LightResist] >= 25";
			equipment = ["cap", "skullcap", "crown", "mask", "bonehelm", "warhat", "grimhelm", "GrandCrown", "Demonhead", "BoneVisage"];
			nipConfig = {
				name: ['==', equipment],
				type: '[quality] <= superior && [flag] != ethereal # [sockets] == 2 # [MaxQuantity] == 1'
			};
			tierCheck = {
				charNipFile: "pickit/" + charPickit,
				mercNipFile: "pickit/" + mercPickit,
				isMerc: false,
				tier: 50,
				itemType: "helm"
			};

			AutoBuildHelper.handleRunewords(nipFileName, runes, runewordKeep, equipment, nipConfig, tierCheck);
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
			Scripts.Follower = false;
			Scripts.MFHelper = true;
                Config.BreakClearLevel = true;
			Scripts.DiabloHelper = true; // Chaos helper, kills monsters and doesn't open seals on its own.
				Config.DiabloHelper.Wait = 120; // Seconds to wait for a runner to be in Chaos. If Config.Leader is set, it will wait only for the leader.
				Config.DiabloHelper.Entrance = false; // Start from entrance. Set to false to start from star.
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