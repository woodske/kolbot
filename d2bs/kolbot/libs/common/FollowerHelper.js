/* eslint-disable indent */
/**
*	@filename	FollowerHelper.js
*	@author		woodske
*	@desc		helper functions for followers
*/

js_strict(true);

if (!isIncluded("common/Cubing.js")) { include("common/Cubing.js"); };
if (!isIncluded("common/Misc.js")) { include("common/Misc.js"); };
if (!isIncluded("common/Prototypes.js")) { include("common/Prototypes.js"); };
if (!isIncluded("common/Runewords.js")) { include("common/Runewords.js"); };
if (!isIncluded("NTItemParser.dbl")) { include("NTItemParser.dbl"); };

var coldName1 = "Bindle-sorc",
	coldName2 = "Bindle-colder",
	coldName3 = "Bindle-coldest",
	lightName = "Bindle-light",
	fireName = "Bindle-fire",
	hammerName = "Bindle-hammer",
	barbName = "Bindle-frenzy";

var FollowerHelper = {

	getLeader: function () {
		return hammerName;
	},

	// Entry point to automated leader/follower scripts
	auto: function () {
		// Battle orders
		if (me.name === barbName) {
			this.giveBo();
		} else {
			this.getBo();
		}

		if (me.name === this.getLeader()) {
			this.mfLeader();
		} else {
			this.mfHelper();
		}
	},

	// Switch from manual follower to automated MF Helper
	mfHelper: function () {
		Scripts.Follower 		= false;

		Config.TownCheck 		= true;
		Config.LocalChat.Mode 	= 1;
		Config.LifeChicken 		= 10;
		Config.OpenChests 		= true;
		Config.TownHP 			= 30;

		// this.earlyHellHelper();
		this.lateHellHelper();
	},

	// Switch from manual play to automated leader
	mfLeader: function () {
		Scripts.Follower 		= false;
		Scripts.UserAddon 		= false;

		Config.Leader 			= "";
		Config.MFLeader 		= true;
		Config.PublicMode	 	= 1;
		Config.TownCheck 		= true;
		Config.MinGameTime 		= 300;
		Config.TownHP 			= 20;
		Config.LocalChat.Mode 	= 1;
		Config.LifeChicken 		= 10;
		Config.OpenChests 		= false;
		Config.NoTele 			= false;

		// this.earlyHellLeader();
		this.lateHellLeader();
	},

	giveBo: function () {
		Scripts.BattleOrders = true;
			Config.BattleOrders.Mode = 0; // 0 = give BO, 1 = get BO
			Config.BattleOrders.Idle = false; // Idle until the player that received BO leaves.
			Config.BattleOrders.Getters = [this.getLeader()]; // List of players to wait for before casting Battle Orders (mode 0). All players must be in the same area as the BOer.
			Config.BattleOrders.QuitOnFailure = false; // Quit the game if BO fails
			Config.BattleOrders.SkipIfTardy = true; // Proceed with scripts if other players already moved on from BO spot
			Config.BattleOrders.Wait = 10; // Duration to wait for players to join game in seconds (default: 10)
	},

	getBo: function () {
		Scripts.BattleOrders = true;
			Config.BattleOrders.Mode = 1; // 0 = give BO, 1 = get BO
			Config.BattleOrders.Idle = false; // Idle until the player that received BO leaves.
			Config.BattleOrders.Getters = []; // List of players to wait for before casting Battle Orders (mode 0). All players must be in the same area as the BOer.
			Config.BattleOrders.QuitOnFailure = false; // Quit the game if BO fails
			Config.BattleOrders.SkipIfTardy = true; // Proceed with scripts if other players already moved on from BO spot
			Config.BattleOrders.Wait = 10; // Duration to wait for players to join game in seconds (default: 10)
	},

	// Config for all characters
	commonConfig: function () {
		Scripts.Follower 		= true;

		Config.Leader 			= this.getLeader();
		Config.QuitList 		= [this.getLeader()];
		Config.QuitListMode 	= 0;
		Config.QuitListDelay 	= [1, 10];
		Config.ClearType 		= 0;
		Config.NoTele			= false;

		Config.AutoEquip 		= true;
		Config.UseMerc 			= true;
		Config.MercWatch 		= true;
		Config.MakeRunewords 	= true;
		Config.Cubing 			= false;

		Config.TownCheck		= false;
		Config.LifeChicken		= 0;
		Config.HealHP 			= 50;
		Config.HealMP 			= 70;
		Config.HealStatus 		= true;
		Config.LowGold			= 50000;
		Config.StashGold 		= 50000;
		Config.OpenChests		= false;
		// Config.ScanShrines		= [15, 13, 12, 14, 7, 6, 2, 1];

		if (me.classid === 1) { // Sorcs
			Config.Dodge = true;
			Config.DodgeRange = 20;
		}

		// Skip immunes
		// if (me.getSkill(56, 1)) { // Meteor
		// 	Config.SkipImmune = ["fire"];
		// } else if (me.getSkill(53, 1)) { // Chain Lightning
		// 	Config.SkipImmune = ["lightning"];
		// } else if (me.getSkill(59, 1)) { // Blizzard
		// 	Config.SkipImmune = ["cold"];
		// }

		Config.PublicMode 		= 2;
		Config.LocalChat.Enabled = true;
		Config.LocalChat.Mode 	= 2;

		Config.PacketCasting 	= 2;
		Config.PacketShopping 	= true;
		Config.MiniShopBot 		= true;
		Config.AutoBuild.DebugMode = false;

		if (me.getStat(12) >= 18) { // Enable cubing at level 18
			Config.Cubing = true;
		}

		//--------------------- Potion Settings ----------------------
		Config.BeltColumn		= ["hp", "mp", "rv", "rv"];
		Config.MinColumn		= [2, 2, 0, 0];
		Config.HPBuffer 		= 0; // Number of healing potions to keep in inventory.
		Config.MPBuffer 		= 0; // Number of mana potions to keep in inventory.
		Config.RejuvBuffer 		= 4; // Number of rejuvenation potions to keep in inventory.

		Config.UseHP 			= 75; // Drink a healing potion if life is under designated percent.
		Config.UseRejuvHP 		= 40; // Drink a rejuvenation potion if life is under designated percent.
		Config.UseMP 			= 30; // Drink a mana potion if mana is under designated percent.
		Config.UseRejuvMP 		= 0; // Drink a rejuvenation potion if mana is under designated percent.
		Config.UseMercHP 		= 75; // Give a healing potion to your merc if his/her life is under designated percent.
		Config.UseMercRejuv 	= 0; // Give a rejuvenation potion to your merc if his/her life is under designated percent.

		//--------------------- Pickit ----------------------

		Config.PickitFiles.push("Follower/misc.nip");
		Config.PickitFiles.push("earlyLadder.nip");

		//-------------- Recipes & Gambling -----------------

		// Gambling config
		Config.Gamble 			= true;
		Config.GambleGoldStart 	= 1000000;
		Config.GambleGoldStop 	= 500000;

		// List of item names or classids for gambling. Check libs/NTItemAlias.dbl file for other item classids.
		Config.GambleItems.push("Amulet");
		Config.GambleItems.push("Ring");
		Config.GambleItems.push("Circlet");
		Config.GambleItems.push("Coronet");

		Config.Recipes.push([Recipe.Reroll.Magic, "Grand Charm"]);
		Config.Recipes.push([Recipe.Reroll.Rare, "Diadem"]);
	},

	earlyHellHelper: function () {
		Scripts.DiabloHelper = true; // Chaos helper, kills monsters and doesn't open seals on its own.
			Config.DiabloHelper.Wait = 120; // Seconds to wait for a runner to be in Chaos. If Config.Leader is set, it will wait only for the leader.
			Config.DiabloHelper.Entrance = true; // Start from entrance. Set to false to start from star.
			Config.DiabloHelper.SkipTP = false; // Don't wait for town portal and directly head to chaos. It will clear monsters around chaos entrance and wait for the runner.
			Config.DiabloHelper.SkipIfBaal = true; // End script if there are party members in a Baal run.
			Config.DiabloHelper.OpenSeals = false; // Open seals as the helper
			Config.DiabloHelper.SafePrecast = true; // take random WP to safely precast
			Config.DiabloHelper.SealOrder = ["vizier", "seis", "infector"]; // the order in which to clear the seals. If seals are excluded, they won't be checked unless diablo fails to appear
			Config.DiabloHelper.RecheckSeals = false; // Teleport to each seal and double-check that it was opened and boss was killed if Diablo doesn't appear
		Scripts.BaalHelper = true;
			Config.BaalHelper.Wait = 120; // Seconds to wait for a runner to be in Throne
			Config.BaalHelper.KillNihlathak = false; // Kill Nihlathak before going to Throne
			Config.BaalHelper.FastChaos = false; // Kill Diablo before going to Throne
			Config.BaalHelper.DollQuit = false; // End script if Dolls (Undead Soul Killers) are found.
			Config.BaalHelper.KillBaal = true; // Kill Baal. If set to false, you must configure Config.QuitList or the bot will wait indefinitely.
			Config.BaalHelper.SkipTP = false; // Don't wait for a TP, go to WSK3 and wait for someone to go to throne. Anti PK measure.
		Scripts.MFHelper = true;
			Config.MFHelper.BreakClearLevel = true;
	},

	earlyHellLeader: function () {
		Scripts.Diablo = true;
			Config.Diablo.WalkClear = false; // Disable teleport while clearing to protect leechers
			Config.Diablo.Entrance = true; // Start from entrance
			Config.Diablo.SealWarning = "Leave the seals alone!";
			Config.Diablo.EntranceTP = "Entrance TP up";
			Config.Diablo.StarTP = "Star TP up";
			Config.Diablo.DiabloMsg = "Diablo";
			Config.Diablo.SealOrder = ["vizier", "seis", "infector"]; // the order in which to clear the seals. If seals are excluded, they won't be checked unless diablo fails to appear
		Scripts.Baal = true;
			Config.Baal.HotTPMessage = "Hot TP!";
			Config.Baal.SafeTPMessage = "Safe TP!";
			Config.Baal.BaalMessage = "Baal!";
			Config.Baal.SoulQuit = false; // End script if Souls (Burning Souls) are found.
			Config.Baal.DollQuit = false; // End script if Dolls (Undead Soul Killers) are found.
			Config.Baal.KillBaal = true; // Kill Baal. Leaves game after wave 5 if false.

		Scripts.AncientTunnels = true;
			Config.AncientTunnels.OpenChest = false;
			Config.AncientTunnels.KillDarkElder = false;
		Scripts.Pit = true;
			Config.Pit.ClearPit1 = false;
		Scripts.Worldstone = true;
		// Scripts.Mausoleum = true;
		// 	Config.Mausoleum.KillBloodRaven = false;
		// 	Config.Mausoleum.ClearCrypt = false;
		// Scripts.Countess = true;
		// 	Config.Countess.KillGhosts = false;
		// Scripts.Andariel = true;
		// Scripts.Duriel = true;
		// Scripts.Mephisto = true;
		// 	Config.Mephisto.MoatTrick = false;
		// 	Config.Mephisto.KillCouncil = false;
		// 	Config.Mephisto.TakeRedPortal = true;
		// Scripts.Cows = true;

	},

	lateHellHelper: function () {
		Scripts.DiabloHelper = true; // Chaos helper, kills monsters and doesn't open seals on its own.
			Config.DiabloHelper.Wait = 120; // Seconds to wait for a runner to be in Chaos. If Config.Leader is set, it will wait only for the leader.
			Config.DiabloHelper.Entrance = true; // Start from entrance. Set to false to start from star.
			Config.DiabloHelper.SkipTP = false; // Don't wait for town portal and directly head to chaos. It will clear monsters around chaos entrance and wait for the runner.
			Config.DiabloHelper.SkipIfBaal = true; // End script if there are party members in a Baal run.
			Config.DiabloHelper.OpenSeals = false; // Open seals as the helper
			Config.DiabloHelper.SafePrecast = true; // take random WP to safely precast
			Config.DiabloHelper.SealOrder = ["vizier", "seis", "infector"]; // the order in which to clear the seals. If seals are excluded, they won't be checked unless diablo fails to appear
			Config.DiabloHelper.RecheckSeals = false; // Teleport to each seal and double-check that it was opened and boss was killed if Diablo doesn't appear
		Scripts.BaalHelper = true;
			Config.BaalHelper.Wait = 120; // Seconds to wait for a runner to be in Throne
			Config.BaalHelper.KillNihlathak = false; // Kill Nihlathak before going to Throne
			Config.BaalHelper.FastChaos = false; // Kill Diablo before going to Throne
			Config.BaalHelper.DollQuit = false; // End script if Dolls (Undead Soul Killers) are found.
			Config.BaalHelper.KillBaal = true; // Kill Baal. If set to false, you must configure Config.QuitList or the bot will wait indefinitely.
			Config.BaalHelper.SkipTP = false; // Don't wait for a TP, go to WSK3 and wait for someone to go to throne. Anti PK measure.

		Config.MFHelper.BreakClearLevel = false;
		this.doHellChores();

		Scripts.MFHelper = true;
	},

	lateHellLeader: function () {
		Scripts.Diablo = true;
			Config.Diablo.WalkClear = false; // Disable teleport while clearing to protect leechers
			Config.Diablo.Entrance = true; // Start from entrance
			Config.Diablo.SealWarning = "Leave the seals alone!";
			Config.Diablo.EntranceTP = "Entrance TP up";
			Config.Diablo.StarTP = "Star TP up";
			Config.Diablo.DiabloMsg = "Diablo";
			Config.Diablo.SealOrder = ["vizier", "seis", "infector"]; // the order in which to clear the seals. If seals are excluded, they won't be checked unless diablo fails to appear
		Scripts.Baal = true;
			Config.Baal.HotTPMessage = "Hot TP!";
			Config.Baal.SafeTPMessage = "Safe TP!";
			Config.Baal.BaalMessage = "Baal!";
			Config.Baal.SoulQuit = false; // End script if Souls (Burning Souls) are found.
			Config.Baal.DollQuit = false; // End script if Dolls (Undead Soul Killers) are found.
			Config.Baal.KillBaal = true; // Kill Baal. Leaves game after wave 5 if false.
		Scripts.Worldstone = true;
		Scripts.Pit = true;
			Config.Pit.ClearPit1 = true;
		// Scripts.Cows = true;
	},

	doHellChores: function () {
		switch (me.name) {
			// case coldName1:
			// 	Scripts.Cows = true;
			// 	break;

			case coldName2:
				Config.ClearType = 0xF; // Skip Normal
				Scripts.Mausoleum = true;
					Config.Mausoleum.KillBloodRaven = false;
					Config.Mausoleum.ClearCrypt = false;
				break;

			case coldName3:
				Config.ClearType = 0xF; // Skip Normal
				Scripts.AncientTunnels = true;
					Config.AncientTunnels.OpenChest = false;
					Config.AncientTunnels.KillDarkElder = false;
				break;

			case fireName:
				Scripts.Andariel = true;
				Scripts.ChestMania = true;
					Config.ChestMania.Act3 = [79]; // Lower Kurast
				break;

			// case lightName:
			// 	Scripts.Pindleskin = true;
			// 		Config.Pindleskin.UseWaypoint = false;
			// 		Config.Pindleskin.KillNihlathak = false;
			// 		Config.Pindleskin.ViperQuit = false; // End script if Tomb Vipers are found.
			// 	Scripts.Eldritch = true;
			// 		Config.Eldritch.OpenChest = false;
			// 		Config.Eldritch.KillShenk = true;
			// 		Config.Eldritch.KillDacFarren = false;
			// 	break;

			default:
				Config.MFHelper.BreakClearLevel = true;
				break;
		}
	},
};
