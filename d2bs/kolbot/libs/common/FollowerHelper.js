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

var FollowerHelper = {

	// Sets follower do be an MF Helper
	mfHelper: function () {
		Scripts.Follower = false;
		
		Config.TownCheck = true;
		Config.MercWatch = true;
		Config.LocalChat.Mode = 1;
		Config.LifeChicken = 5;
		Config.OpenChests = true;
		Config.TownHP = 20;
			
		Scripts.DiabloHelper = true; // Chaos helper, kills monsters and doesn't open seals on its own.
			Config.DiabloHelper.Wait = 120; // Seconds to wait for a runner to be in Chaos. If Config.Leader is set, it will wait only for the leader.
			Config.DiabloHelper.Entrance = false; // Start from entrance. Set to false to start from star.
			Config.DiabloHelper.SkipTP = false; // Don't wait for town portal and directly head to chaos. It will clear monsters around chaos entrance and wait for the runner.
			Config.DiabloHelper.SkipIfBaal = false; // End script if there are party members in a Baal run.
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

	mfLeader: function () {
		Scripts.Follower = false;
		Scripts.UserAddon = false; // !!!YOU MUST SET THIS TO FALSE IF YOU WANT TO RUN BOSS/AREA SCRIPTS!!!
		Config.Leader = "";
		Config.MFLeader = true; // Set to true if you have one or more MFHelpers. Opens TP and gives commands when doing normal MF runs.
		Config.PublicMode = 1;
		Config.TownCheck = true;
		Config.MinGameTime = 180;
		Config.MercWatch = true;
		Config.NoTele = false;
		Config.TownHP = 20;
		Config.LocalChat.Mode = 1;
		Config.LifeChicken = 5;
		Config.OpenChests = false;

		this.getBo();
		
		Scripts.Diablo = true;
			Config.Diablo.WalkClear = false; // Disable teleport while clearing to protect leechers
			Config.Diablo.Entrance = false; // Start from entrance
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
			Config.AncientTunnels.OpenChest = false; // Open special chest in Lost City
			Config.AncientTunnels.KillDarkElder = false;
		Scripts.Cows = true;
	},

	getLeader: function () {
		return 'Bindle-sorc';
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

	commonConfig: function () {
		// All followers
		Scripts.Follower        = true;
		Config.Leader           = this.getLeader();
		Config.QuitList         = [this.getLeader()];
		Config.QuitListMode 	= 0;
		Config.QuitListDelay 	= [1, 10];
		Config.AutoEquip        = true;
		Config.TownCheck		= false;						// Don't go to town for more potions
		Config.UseMerc 			= true;
		Config.PacketShopping 	= true;
		Config.PacketCasting    = 2;
		Config.ClearType        = 0;                            // Monster spectype to kill in level clear scripts (0 = all)
		Config.LowGold			= 50000;
		Config.StashGold 		= 500;
		Config.OpenChests		= true; 						// Open chests. Controls key buying.
		Config.ScanShrines		= [15, 13, 12, 14, 7, 6, 2, 1];
		Config.BeltColumn		= ["hp", "mp", "rv", "rv"];		// Keep tons of health potions!
		Config.MinColumn		= [3, 3, 0, 0];
		Config.Cubing           = false;
		Config.MakeRunewords    = true;
		Config.PublicMode       = 2;                            // Accept invites
		Config.LifeChicken      = 0;                            // Don't exit games when close to death
		Config.LocalChat.Enabled = true;                        // enable the LocalChat system
		Config.LocalChat.Mode   = 2;                            // 0 = disabled, 1 = chat from 'say' (recommended), 2 = all chat (for manual play)
		Config.HealHP 			= 50;

		if (me.getStat(12) >= 18) {
			Config.Cubing       = true;
		}

		//--------------------- Potion Settings ----------------------
		Config.UseHP = 75; // Drink a healing potion if life is under designated percent.
		Config.UseRejuvHP = 40; // Drink a rejuvenation potion if life is under designated percent.
		Config.UseMP = 30; // Drink a mana potion if mana is under designated percent.
		Config.UseRejuvMP = 0; // Drink a rejuvenation potion if mana is under designated percent.
		Config.UseMercHP = 75; // Give a healing potion to your merc if his/her life is under designated percent.
		Config.UseMercRejuv = 0; // Give a rejuvenation potion to your merc if his/her life is under designated percent.
		Config.HPBuffer = 0; // Number of healing potions to keep in inventory.
		Config.MPBuffer = 0; // Number of mana potions to keep in inventory.
		Config.RejuvBuffer = 4; // Number of rejuvenation potions to keep in inventory.

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
	}
};
