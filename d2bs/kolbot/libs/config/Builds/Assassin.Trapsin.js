/** Trap Assassin Build
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

Finished Char Build:

	Stats													Base Stats
	----------												----------
 	Strength: 156 (136 points used)								20		156 @ level 74
 	Energy: 25 (no points)										25
 	Dexterity: 25 (no points) 									20
 	Vitality: 384 (369 points used)								20

	Skills				Levelreq			SkillID			TotalPoints
	------------		--------			-------			-----------
    Claw Mastery		    1				  252				 1 - Done @ level 4
    Psychic Hammer          1                 253                1 - Done @ level 3
    Fire Blast              1                 251               20 - Done @ level 98
    Burst of Speed          6                 258                1 - Done @ level 6
    Shock Web               6                 256               20 - Done @ level 71
    Weapon Block           12                 263                1 - Done @ level 13
    Cloak of Shadows       12                 264                1 - Done @ level 12
    Charged Bolt Sentry    12                 261               20 - Done @ level 79
    Fade                   18                 267                1 - Done @ level 19
	Shadow Warrior         18                 268                1 - Done @ level 18
	Mind Blast			   24			      273				 1 - Done @ level 24
	Lightning Sentry       24                 271               20 - Done @ level 42
	Shadow Master		   30				  279				 2 - Done @ level 99	
	Death Sentry           30                 276               20 - Done @ level 57
	
	--------------------------------------------------------------------------------------

    QUEST SKILL/STAT ALLOCATION:

          Quest         Level Used     
	-----------------	----------			
	Norm Den of Evil        12                 
	Norm Radament           27                 
    Norm Izual              30
    Norm Lam Essen          30                 
	NM Den of Evil          54                
	NM Radament             54                
    NM Izual                54
    NM Lam Essen            54                
	Hell Den of Evil        79                 
	Hell Radament           79                 
    Hell Izual              79
    Hell Lam Essen          79 

*/
js_strict(true);

if (!isIncluded("common/Cubing.js")) { include("common/Cubing.js"); };
if (!isIncluded("common/Prototypes.js")) { include("common/Prototypes.js"); };
if (!isIncluded("common/Runewords.js")) { include("common/Runewords.js"); };

var AutoBuildTemplate = {

	1:	{	
			Update: function () {
				// Class specific
				Config.PickitFiles.push("Follower/assassin.xpac.nip");

				Config.AttackSkill 		= [-1, 0, -1, 0, -1, -1, -1];
				Config.LowManaSkill 	= [0,0];
				Config.UseFade 			= false; 
				Config.UseBoS 			= false;
				Config.UseTraps 		= false;
				Config.Dodge 			= false;

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
                Config.PickitFiles.push("Follower/rwbase-shield.nip");
                //Config.PickitFiles.push("earlyLadder.nip");
                Config.PickitFiles.push("Autoequip/merc.xpac.nip");

                //---------------------- Runewords ------------------
                //insight
                Config.Runewords.push([Runeword.Insight, "poleaxe"]);
                Config.Runewords.push([Runeword.Insight, "halberd"]);
                Config.Runewords.push([Runeword.Insight, "bill"]);
                Config.Runewords.push([Runeword.Insight, "battlescythe"]);
                Config.Runewords.push([Runeword.Insight, "partizan"]);
                Config.Runewords.push([Runeword.Insight, "becdecorbin"]);
                Config.Runewords.push([Runeword.Insight, "thresher"]);
                Config.Runewords.push([Runeword.Insight, "crypticaxe"]);
                Config.Runewords.push([Runeword.Insight, "greatpoleaxe"]);
                Config.Runewords.push([Runeword.Insight, "colossusvoulge"]);

                Config.KeepRunewords.push("[type] == polearm # [meditationaura] <= 17");
                
                //smoke
                Config.Runewords.push([Runeword.Smoke, "lightplate"]);
                Config.Runewords.push([Runeword.Smoke, "ghostarmor"]);
                Config.Runewords.push([Runeword.Smoke, "serpentskinarmor"]);
                Config.Runewords.push([Runeword.Smoke, "demonhidearmor"]);
                Config.Runewords.push([Runeword.Smoke, "cuirass"]);
                Config.Runewords.push([Runeword.Smoke, "mageplate"]);
                Config.Runewords.push([Runeword.Smoke, "duskShroud"]);
                Config.Runewords.push([Runeword.Smoke, "wyrmhide"]);
                Config.Runewords.push([Runeword.Smoke, "scarabHusk"]);
                Config.Runewords.push([Runeword.Smoke, "wireFleece"]);
                Config.Runewords.push([Runeword.Smoke, "greatHauberk"]);
                Config.Runewords.push([Runeword.Smoke, "boneweave"]);
                Config.Runewords.push([Runeword.Smoke, "balrogSkin"]);
                Config.Runewords.push([Runeword.Smoke, "archonPlate"]);

                Config.KeepRunewords.push("[type] == armor # [FireResist] == 50 && [LightResist] == 50 ");
                
                //AncientsPledge
                Config.Runewords.push([Runeword.AncientsPledge, "kiteshield"]);
                Config.Runewords.push([Runeword.AncientsPledge, "largeshield"]);
                Config.Runewords.push([Runeword.AncientsPledge, "boneshield"]);

                Config.KeepRunewords.push("[type] == shield # [FireResist] >= 40 && [LightResist] >= 40 ");

                //Lore
                Config.Runewords.push([Runeword.Lore, "cap"]);
                Config.Runewords.push([Runeword.Lore, "skullcap"]);
                Config.Runewords.push([Runeword.Lore, "crown"]);
                Config.Runewords.push([Runeword.Lore, "mask"]);
                Config.Runewords.push([Runeword.Lore, "bonehelm"]);
                Config.Runewords.push([Runeword.Lore, "warhat"]);
                Config.Runewords.push([Runeword.Lore, "grimhelm"]);
                Config.Runewords.push([Runeword.Lore, "GrandCrown"]);
                Config.Runewords.push([Runeword.Lore, "Demonhead"]);
                Config.Runewords.push([Runeword.Lore, "BoneVisage"]);

                Config.KeepRunewords.push("[type] == helm # [LightResist] >= 25");

                //Spirit Sword
                Config.Runewords.push([Runeword.Spirit, "broadsword"]);
                Config.Runewords.push([Runeword.Spirit, "crystalSword"]);

                Config.KeepRunewords.push("[type] == sword # [itemallskills] == 2");

                //Spirit Shield
                Config.Runewords.push([Runeword.Spirit, "Monarch"]);

                Config.KeepRunewords.push("[type] == shield || [type] == auricshields # [fcr] <= 35");	
			}
		},

	2:	{	
			SkillPoints: [251], // Fire Blast-1
			StatPoints: [2,2,2,2,2],
			Update: function () {
				Config.AttackSkill = [-1,251,-1,251,-1,-1,-1];
			}
		},

	3:	{
			SkillPoints: [253], // Psychic Hammer
			StatPoints: [2,2,2,1,1],
			Update: function () {
		
			}
		},

	4:  {
			SkillPoints: [252], // Claw Mastery
			StatPoints: [2,2,0,0,0],
			Update: function () {
			
			}	
        },

	5:	{
			SkillPoints: [-1],
			StatPoints: [0,0,0,0,0],
			Update: function () {
				
			}
		},

	6:	{
			SkillPoints: [256,258], // Shock Web-1, Burst of Speed
			StatPoints: [3,3,3,1,1],
			Update: function () {
				Config.UseBoS = true;
				Config.AttackSkill = [-1,256,-1,256,-1,-1,-1];
			}
		},

	7:	{
			SkillPoints: [256], // Shock Web-2
			StatPoints: [3,3,3,1,1],
			Update: function () {
				
			}
		},

	8:	{
			SkillPoints: [256], // Shock Web-3
			StatPoints: [3,3,3,3,3],
			Update: function () {
				
			}
		},

	9:	{
			SkillPoints: [256], // Shock Web-4
			StatPoints: [3,3,3,1,1],
			Update: function () {
			
			}
		},

	10:	{
			SkillPoints: [256], // Shock Web-5
			StatPoints: [3,3,3,3,1],
			Update: function () {
				Config.LowGold = 5000;
			}
		},

	11:	{	
			SkillPoints: [256], // Shock Web-6
			StatPoints: [3,3,3,3,1],
			Update: function () {
			
			}
		},

	12:	{
			SkillPoints: [261,264], // Charged Bolt Sentry-1, Cloak of Shadows (NORM den)
			StatPoints: [3,3,1,1,1],
			Update: function () {
				Config.UseTraps = true;
				Config.Traps = [261, 261, 261, -1, -1]; // Skill IDs for traps to be cast on all mosters except act bosses.
				Config.BossTraps = [261, 261, 261, 261, 261]; // Skill IDs for traps to be cast on act bosses.
				Config.HPBuffer = 8; // Number of healing potions to keep in inventory.
				Config.BeltColumn = ["hp", "hp", "mp", "mp"];		// Keep tons of health potions!
				Config.UseCloakofShadows = false;
				Config.MinColumn[0] = 1;
				Config.MinColumn[1] = 1;
				Config.MinColumn[2] = 1;
				Config.MinColumn[3] = 1;
			}
		},

	13:	{
			SkillPoints: [263], // Weapon Block
			StatPoints: [0,0,0,0,0],
			Update: function () {
				
			}
		},

	14:	{
			SkillPoints: [261], // Charged Bolt Sentry-2
			StatPoints: [0,0,0,0,0],
			Update: function () {
				
			}
		},

	15:	{
			SkillPoints: [261], // Charged Bolt Sentry-3
			StatPoints: [3,3,1,1,0],
			Update: function () {
			
			}
		},

	16:	{
			SkillPoints: [261], // Charged Bolt Sentry-4
			StatPoints: [3,3,1,1,0],
			Update: function () {
				Config.HPBuffer = 2; // Number of healing potions to keep in inventory.
				Config.MPBuffer = 6; // Number of mana potions to keep in inventory.
				Config.TownCheck = true; // Go to town if out of potions
			}
		},

	17:	{
			SkillPoints: [261], // Charged Bolt Sentry-5
			StatPoints: [0,0,0,0,0],
			Update: function () {
				
			}
		},

	18:	{
			SkillPoints: [268], // Shadow Warrior
			StatPoints: [3,3,3,3,1],
			Update: function () {
				Config.SummonShadow = "Warrior";
				Config.Dodge = true;
				Config.DodgeRange = 15;
			}
		},

	19:	{
			SkillPoints: [267], // Fade
			StatPoints: [3,3,3,0,1],
			Update: function () {
				Config.UseBoS = false;
				Config.UseFade = true;
			}
		},

	20:	{
			SkillPoints: [261], // Charged Bolt Sentry-6
			StatPoints: [0,0,0,0,0],
			Update: function () {
				Config.LowGold = 10000;
			}
		},

	21:	{	
			SkillPoints: [261], // Charged Bolt Sentry-7
			StatPoints: [0,0,0,0,0],
			Update: function () {
			
			}
		},

	22:	{
			SkillPoints: [261], // Charged Bolt Sentry-8
			StatPoints: [3,3,3,3,1],
			Update: function () {
			
			}
		},

	23:	{
			SkillPoints: [-1],
			StatPoints: [3,3,3,3,1],
			Update: function () {
			
			}
		},

	24:	{
			SkillPoints: [271,273], // Lightning Sentry-1, Mind Blast
			StatPoints: [1,1,1,1,1],
			Update: function () {
				Config.AttackSkill = [-1,256,-1,256,273,251,-1];
				Config.LowManaSkill = [-1,-1];
				Config.Traps = [271, 271, 271, 271, 271]; 
				Config.BossTraps = [271, 271, 271, 271, 271];

				Config.Cubing = true;
				Config.MakeRunewords = true;
				Config.Runewords.push([Runeword.Spirit, ("CrystalSword" || "BroadSword")]);
				Config.Recipes.push([Recipe.Rune, "Tal Rune"]);
				Config.Recipes.push([Recipe.Rune, "Ral Rune"]);
				Config.Recipes.push([Recipe.Rune, "Ort Rune"]);
				Config.Recipes.push([Recipe.Rune, "Thul Rune"]);
				Config.Recipes.push([Recipe.Rune, "Amn Rune"]);
			}
		},

	25:	{
			SkillPoints: [271], // Lightning Sentry-2
			StatPoints: [3,3,3,3,1],
			Update: function () {
				Config.LowGold = 15000;
			}
		},

	26:	{
			SkillPoints: [271], // Lightning Sentry-3
			StatPoints: [3,3,3,3,1],
			Update: function () {
			
			}
		},

	27:	{
			SkillPoints: [271, 271], // Lightning Sentry-5 (NORM radament)
			StatPoints: [3,3,3,3,1],
			Update: function () {
				
			}
		},

	28:	{
			SkillPoints: [271], // Lightning Sentry-6
			StatPoints: [3,3,3,3,3],
			Update: function () {
			
			}
		},

	29:	{
			SkillPoints: [271], // Lightning Sentry-7
			StatPoints: [3,3,3,3,3],
			Update: function () {
			
			}
		},

	30:	{
			SkillPoints: [276,279,271], // Death Sentry-1, Shadow Master, Lightning Sentry-8 (NORM Izual)
			StatPoints: [3,3,3,3,3,3,3,3,3,3], // (NORM Lam Essen)
			Update: function () {
				Config.SummonShadow = "Master";
				Config.Traps = [276, 276, 271, 271, 271];
                Config.BossTraps = [271, 271, 271, 271, 271];
                Config.LowGold = 50000;
			}
		},

	31:	{	
			SkillPoints: [271], // Lightning Sentry-9
			StatPoints: [0,0,0,0,0],
			Update: function () {
				
			}
		},

	32:	{
			SkillPoints: [271], // Lightning Sentry-10
			StatPoints: [3,3,3,0,0],
			Update: function () {
				
			}
		},

	33:	{
			SkillPoints: [271], // Lightning Sentry-11
			StatPoints: [3,3,3,0,0],
			Update: function () {
			
			}
		},

	34:	{
			SkillPoints: [271], // Lightning Sentry-12
			StatPoints: [3,3,3,0,0],
			Update: function () {
				
			}
		},

	35:	{
			SkillPoints: [271], // Lightning Sentry-13
			StatPoints: [3,3,3,0,0],
			Update: function () {
				
			}
		},

	36:	{
			SkillPoints: [271], // Lightning Sentry-14
			StatPoints: [3,3,3,0,0],
			Update: function () {
			
			}
		},

	37:	{
			SkillPoints: [271], // Lightning Sentry-15
			StatPoints: [3,3,3,0,0],
			Update: function () {
		
			}
		},

	38:	{
			SkillPoints: [271], // Lightning Sentry-16
			StatPoints: [3,3,3,0,0],
			Update: function () {
		
			}
		},

	39:	{
			SkillPoints: [271], // Lightning Sentry-17
			StatPoints: [3,3,3,0,0],
			Update: function () {
			
			}
		},

	40:	{
			SkillPoints: [271], // Lightning Sentry-18
			StatPoints: [3,3,3,0,0],
			Update: function () {
			
			}
		},

	41:	{	
			SkillPoints: [271], // Lightning Sentry-19
			StatPoints: [3,3,3,0,0],
			Update: function () {
			
			}
		},

	42:	{
			SkillPoints: [271], // Lightning Sentry-20
			StatPoints: [3,3,3,3,3],
			Update: function () {
			
			}
		},

	43:	{
			SkillPoints: [276], // Death Sentry-2
			StatPoints: [3,3,3,3,3],
			Update: function () {

			}
		},

	44:	{
			SkillPoints: [276], // Death Sentry-3
			StatPoints: [3,3,3,3,3],
			Update: function () {
			
			}
		},

	45:	{
			SkillPoints: [276], // Death Sentry-4
			StatPoints: [0,0,0,0,0],
			Update: function () {
			
			}
		},

	46:	{
			SkillPoints: [276], // Death Sentry-5
			StatPoints: [0,0,0,0,0],
			Update: function () {
			
			}
		},

	47:	{
			SkillPoints: [276], // Death Sentry-6
			StatPoints: [0,0,0,0,0],
			Update: function () {
			
			}
		},

	48:	{
			SkillPoints: [276], // Death Sentry-7
			StatPoints: [3,3,3,3,3],
			Update: function () {
			
			}
		},

	49:	{
			SkillPoints: [276], // Death Sentry-8
			StatPoints: [3,3,3,3,3],
			Update: function () {
			
			}
		},

	50:	{
			SkillPoints: [276], // Death Sentry-9
			StatPoints: [3,3,3,3,3],
			Update: function () {
			
			}
		},

	51:	{	
			SkillPoints: [276], // Death Sentry-10
			StatPoints: [3,3,3,3,3],
			Update: function () {
			
			}
		},

	52:	{
			SkillPoints: [276], // Death Sentry-11
			StatPoints: [3,3,3,3,3],
			Update: function () {
			
			}
		},

	53:	{
			SkillPoints: [276], // Death Sentry-12
			StatPoints: [3,3,3,3,3],
			Update: function () {
			
			}
		},

	54:	{
			SkillPoints: [276, 276, 276, 276, 276], // Death Sentry-17 (NM den, radament, izual)
			StatPoints: [3,3,3,3,3,3,3,3,3,3], 		// (NM Lam Essen)
			Update: function () {
			
			}
		},

	55:	{
			SkillPoints: [276], // Death Sentry-18
			StatPoints: [3,3,3,3,3],
			Update: function () {
			
			}
		},

	56:	{
			SkillPoints: [276], // Death Sentry-19
			StatPoints: [3,3,3,3,3],
			Update: function () {
			
			}
		},

	57:	{
			SkillPoints: [276], // Death Sentry-20
			StatPoints: [3,3,3,3,3],
			Update: function () {
			
			}
		},

	58:	{
			SkillPoints: [256], // Shock Web-7
			StatPoints: [3,3,3,3,3],
			Update: function () {
			
			}
		},

	59:	{
			SkillPoints: [256], // Shock Web-8
			StatPoints: [3,3,3,3,3],
			Update: function () {
			
			}
		},

	60:	{
			SkillPoints: [256], // Shock Web-9
			StatPoints: [3,3,3,3,3],
			Update: function () {
			
			}
		},

	61:	{	
			SkillPoints: [256], // Shock Web-10
			StatPoints: [3,3,3,3,3],
			Update: function () {
			
			}
		},

	62:	{
			SkillPoints: [256], // Shock Web-11
			StatPoints: [3,3,3,3,3],
			Update: function () {
			
			}
		},

	63:	{
			SkillPoints: [256], // Shock Web-12
			StatPoints: [3,3,3,3,3],
			Update: function () {

			}
		},

	64:	{
			SkillPoints: [256], // Shock Web-13
			StatPoints: [3,3,3,3,3],
			Update: function () {
			
			}
		},

	65:	{
			SkillPoints: [256], // Shock Web-14
			StatPoints: [3,3,3,3,3],
			Update: function () {
			
			}
		},

	66:	{
			SkillPoints: [256], // Shock Web-15
			StatPoints: [3,3,3,3,3],
			Update: function () {
			
			}
		},

	67:	{
			SkillPoints: [256], // Shock Web-16
			StatPoints: [3,3,3,3,3],
			Update: function () {
			
			}
		},

	68:	{
			SkillPoints: [256], // Shock Web-17
			StatPoints: [3,3,3,3,3],
			Update: function () {
			
			}
		},

	69:	{
			SkillPoints: [256], // Shock Web-18
			StatPoints: [3,3,3,3,3],
			Update: function () {
			
			}
		},

	70:	{
			SkillPoints: [256], // Shock Web-19
			StatPoints: [3,3,3,3,3],
			Update: function () {
			
			}
		},

	71:	{	
			SkillPoints: [256], // Shock Web-20
			StatPoints: [3,3,3,3,3],
			Update: function () {
			
			}
		},

	72:	{
			SkillPoints: [261], // Charged Bolt Sentry-9
			StatPoints: [3,3,3,3,3],
			Update: function () {
			
			}
		},

	73:	{
			SkillPoints: [261], // Charged Bolt Sentry-10
			StatPoints: [3,3,3,3,3],
			Update: function () {
			
			}
		},

	74:	{
			SkillPoints: [261], // Charged Bolt Sentry-11
			StatPoints: [3,3,3,3,3],
			Update: function () {
			
			}
		},

	75:	{
			SkillPoints: [261], // Charged Bolt Sentry-12
			StatPoints: [3,3,3,3,3],
			Update: function () {
			
			}
		},

	76:	{
			SkillPoints: [261], // Charged Bolt Sentry-13
			StatPoints: [3,3,3,3,3],
			Update: function () {
			
			}
		},

	77:	{
			SkillPoints: [261], // Charged Bolt Sentry-14
			StatPoints: [3,3,3,3,3],
			Update: function () {
			
			}
		},

	78:	{
			SkillPoints: [261], // Charged Bolt Sentry-15
			StatPoints: [3,3,3,3,3],
			Update: function () {
			
			}
		},

	79:	{
			SkillPoints: [261, 261, 261, 261, 261], // Charged Bolt Sentry-20 (HELL den, radament, izual)
			StatPoints: [3,3,3,3,3,3,3,3,3,3], // (HELL Lam Essen)
			Update: function () {
			
			}
		},

	80:	{
			SkillPoints: [251], // Fire Blast-2
			StatPoints: [3,3,3,3,3],
			Update: function () {
			
			}
		},

	81:	{	
			SkillPoints: [251], // Fire Blast-3
			StatPoints: [3,3,3,3,3],
			Update: function () {
			
			}
		},

	82:	{
			SkillPoints: [251], // Fire Blast-4
			StatPoints: [3,3,3,3,3],
			Update: function () {
			
			}
		},

	83:	{
			SkillPoints: [251], // Fire Blast-5
			StatPoints: [3,3,3,3,3],
			Update: function () {
			
			}
		},

	84:	{
			SkillPoints: [251], // Fire Blast-6
			StatPoints: [3,3,3,3,3],
			Update: function () {
			
			}
		},

	85:	{
			SkillPoints: [251], // Fire Blast-7
			StatPoints: [3,3,3,3,3],
			Update: function () {
			
			}
		},

	86:	{
			SkillPoints: [251], // Fire Blast-8
			StatPoints: [3,3,3,3,3],
			Update: function () {
			
			}
		},

	87:	{
			SkillPoints: [251], // Fire Blast-9
			StatPoints: [3,3,3,3,3],
			Update: function () {
			
			}
		},

	88:	{
			SkillPoints: [251], // Fire Blast-10
			StatPoints: [3,3,3,3,3],
			Update: function () {
			
			}
		},

	89:	{
			SkillPoints: [251], // Fire Blast-11
			StatPoints: [3,3,3,3,3],
			Update: function () {
			
			}
		},

	90:	{
			SkillPoints: [251], // Fire Blast-12
			StatPoints: [3,3,3,3,3],
			Update: function () {
			
			}
		},

	91:	{	
			SkillPoints: [251], // Fire Blast-13
			StatPoints: [3,3,3,3,3],
			Update: function () {
			
			}
		},

	92:	{
			SkillPoints: [251], // Fire Blast-14
			StatPoints: [3,3,3,3,3],
			Update: function () {
			
			}
		},

	93:	{
			SkillPoints: [251], // Fire Blast-15
			StatPoints: [3,3,3,3,3],
			Update: function () {
			
			}
		},

	94:	{
			SkillPoints: [251], // Fire Blast-16
			StatPoints: [3,3,3,3,3],
			Update: function () {
			
			}
		},

	95:	{
			SkillPoints: [251], // Fire Blast-17
			StatPoints: [3,3,3,3,3],
			Update: function () {
			
			}
		},

	96:	{
			SkillPoints: [251], // Fire Blast-18
			StatPoints: [3,3,3,3,3],
			Update: function () {
			
			}
		},

	97:	{
			SkillPoints: [251], // Fire Blast-19
			StatPoints: [3,3,3,3,3],
			Update: function () {
			
			}
		},

	98:	{
			SkillPoints: [251], // Fire Blast-20
			StatPoints: [3,3,3,3,3],
			Update: function () {
			
			}
		},

	99:	{
			SkillPoints: [279], // Shadow Master-2
			StatPoints: [3,3,3,3,3],
			Update: function () {
			
			}
		}
};