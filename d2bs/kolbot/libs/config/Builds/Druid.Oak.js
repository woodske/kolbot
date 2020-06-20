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

Finished Char Build:

    Stats                                                    Base Stats
    ------------                                             ----------
    Strength (0) :      15 (no points)                       15
    Energy   (1) :      20 (no points)                       20
    Dexterity(2) :      20 (no points)                       20
    Vitality (3) :      200 (175 points used)                25

	Skills				Levelreq			SkillID			TotalPoints
	------------		--------			-------			-----------
    Summon raven		    1				  221				 1	- Done @ level 2
	Arctic Blast			6				  230				 1	- Done @ level 6
	Oak Sage				6				  226				20	- Done @ level 26 
	Spirit Wolf			    6				  227				 1	- Done @ level 6
	Cyclone Armor 		   12				  235				20	- Done @ level 94
    Dire Wolf   		   18				  237				 1	- Done @ level 18
    Twister                18                 240               20  - Done @ level 79
	Tornado     		   24				  245				20	- Done @ level 45
    Grizzly		           30				  247				 6	- Done @ level 99
    Hurricane	           30				  250				20	- Done @ level 60

--------------------------------------------------------------------------------------

    QUEST SKILL/STAT ALLOCATION:

          Quest         Level Used     
	-----------------	----------			
	Norm Den of Evil        18                 
	Norm Radament           24                 
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

    1:  {
            //SkillPoints: [-1],                                        // This doesn't matter. We don't have skill points to spend at lvl 1]
            //StatPoints: [-1, -1, -1, -1, -1],                         // This doesn't matter. We don't have stat points to spend at lvl 1
            Update: function () {
				// Class Specific
				Config.PickitFiles.push("Follower/druid.xpac.nip");

				Config.AttackSkill		= [0, 0, 0, 0, 0, 0, 0];	
				Config.LowManaSkill		= [0, 0];
				Config.SummonAnimal     = 0;
				Config.SummonSpirit     = 0;
				Config.SummonVine       = 0;
				
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
				Config.PickitFiles.push("Follower/merc.xpac.nip");
                Config.PickitFiles.push("earlyLadder.nip");

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
			SkillPoints: [221], // Summon Raven
			StatPoints: [3,3,3,3,3],
			Update: function () {

			}
		},

	3:	{
			SkillPoints: [-1],
			StatPoints: [3,3,3,1,1],
			Update: function () {
		
			}
		},

	4:  {
			SkillPoints: [-1],
			StatPoints: [3,3,0,0,0],
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
			SkillPoints: [230,226,227], // Arctic Blast, Oak-1, Spirit Wolf (1 skill remaining)
			StatPoints: [3,3,3,1,1],
			Update: function () {
                Config.SummonSpirit = "Oak Sage";
                Config.SummonAnimal = "Spirit Wolf";
                Config.AttackSkill = [0, 230, 0, 230, 0, 0, 0];	
			}
		},

	7:	{
			SkillPoints: [226], // Oak-2
			StatPoints: [3,3,3,1,1],
			Update: function () {
				
			}
		},

	8:	{
			SkillPoints: [226], // Oak-3
			StatPoints: [3,3,3,3,3],
			Update: function () {
				
			}
		},

	9:	{
			SkillPoints: [226], // Oak-4
			StatPoints: [3,3,3,1,1],
			Update: function () {
			
			}
		},

	10:	{
			SkillPoints: [226], // Oak-5
			StatPoints: [3,3,3,3,1],
			Update: function () {
                Config.LowGold = 5000;
			}
		},

	11:	{	
			SkillPoints: [226], // Oak-6
			StatPoints: [3,3,3,3,1],
			Update: function () {
			
			}
		},

	12:	{
			SkillPoints: [226,235], // Oak-7, Cyclone Armor-1 (0 skill remaining)
			StatPoints: [3,3,1,1,1],
			Update: function () {
				Config.HPBuffer = 8; // Number of healing potions to keep in inventory.
				Config.BeltColumn = ["hp", "hp", "mp", "mp"];		// Keep tons of health potions!
				Config.MinColumn[0] = 1;
				Config.MinColumn[1] = 1;
				Config.MinColumn[2] = 1;
				Config.MinColumn[3] = 1;
			}
		},

	13:	{
			SkillPoints: [226], // Oak-8
			StatPoints: [0,0,0,0,0],
			Update: function () {
				
			}
		},

	14:	{
			SkillPoints: [226], // Oak-9
			StatPoints: [0,0,0,0,0],
			Update: function () {
				
			}
		},

	15:	{
			SkillPoints: [226], // Oak-10
			StatPoints: [3,3,1,1,0],
			Update: function () {
			
			}
		},

	16:	{
			SkillPoints: [226], // Oak-11
			StatPoints: [3,3,1,1,0],
			Update: function () {
				Config.HPBuffer = 2; // Number of healing potions to keep in inventory.
				Config.MPBuffer = 6; // Number of mana potions to keep in inventory.
				Config.TownCheck = true; // Go to town if out of potions
			}
		},

	17:	{
			SkillPoints: [226], // Oak-12
			StatPoints: [0,0,0,0,0],
			Update: function () {
				
			}
		},

	18:	{
			SkillPoints: [237, 240], // Dire Wolf, Twister-1 (Norm Den used)
			StatPoints: [3,3,3,3,1],
			Update: function () {
                Config.SummonAnimal = "Dire Wolf";
                Config.AttackSkill = [0, 240, 0, 240, 0, 0, 0];                          
			}
		},

	19:	{
			SkillPoints: [226], // Oak-13
			StatPoints: [3,3,3,0,1],
			Update: function () {
				Config.UseBoS = false;
				Config.UseFade = true;
			}
		},

	20:	{
			SkillPoints: [226], // Oak-14
			StatPoints: [0,0,0,0,0],
			Update: function () {
                Config.LowGold = 10000;
			}
		},

	21:	{	
			SkillPoints: [226], // Oak-15
			StatPoints: [0,0,0,0,0],
			Update: function () {
			
			}
		},

	22:	{
			SkillPoints: [226], // Oak-16
			StatPoints: [3,3,3,3,1],
			Update: function () {
			
			}
		},

	23:	{
			SkillPoints: [226], // Oak-17
			StatPoints: [3,3,3,3,1],
			Update: function () {
			
			}
		},

	24:	{
			SkillPoints: [245, 226], // Tornado-1, Oak-18 (Norm Radament used)
			StatPoints: [1,1,1,1,1],
			Update: function () {
                Config.AttackSkill = [0, 245, 0, 245, 0, 0, 0];
                Config.LowManaSkill = [-1,-1];

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
			SkillPoints: [226], // Oak-19
			StatPoints: [3,3,3,3,1],
			Update: function () {
                Config.LowGold = 15000;
			}
		},

	26:	{
			SkillPoints: [226], // Oak-20
			StatPoints: [3,3,3,3,1],
			Update: function () {
			
			}
		},

	27:	{
			SkillPoints: [245], // Tornado-2
			StatPoints: [3,3,3,3,1],
			Update: function () {
				
			}
		},

	28:	{
			SkillPoints: [245], // Tornado-3
			StatPoints: [3,3,3,3,3],
			Update: function () {
			
			}
		},

	29:	{
			SkillPoints: [245], // Tornado-4
			StatPoints: [3,3,3,3,3],
			Update: function () {
			
			}
		},

	30:	{
			SkillPoints: [247, 250, 245], // Grizzly, Hurricane-1, Tornado-5 (Norm Izual used)
			StatPoints: [3,3,3,3,3,3,3,3,3,3], // (Norm Lam Essen)
			Update: function () {
                Config.SummonAnimal = "Grizzly";
                Config.LowGold = 50000;
			}
		},

	31:	{	
			SkillPoints: [245], // Tornado-6
			StatPoints: [0,0,0,0,0],
			Update: function () {
				
			}
		},

	32:	{
			SkillPoints: [245], // Tornado-7
			StatPoints: [3,3,3,0,0],
			Update: function () {
				
			}
		},

	33:	{
			SkillPoints: [245], // Tornado-8
			StatPoints: [3,3,3,0,0],
			Update: function () {
			
			}
		},

	34:	{
			SkillPoints: [245], // Tornado-9
			StatPoints: [3,3,3,0,0],
			Update: function () {
				
			}
		},

	35:	{
			SkillPoints: [245], // Tornado-10
			StatPoints: [3,3,3,0,0],
			Update: function () {
				
			}
		},

	36:	{
            SkillPoints: [245], // Tornado-11
			StatPoints: [3,3,3,0,0],
			Update: function () {
			
			}
		},

	37:	{
            SkillPoints: [245], // Tornado-12
			StatPoints: [3,3,3,0,0],
			Update: function () {
		
			}
		},

	38:	{
            SkillPoints: [245], // Tornado-13
			StatPoints: [3,3,3,0,0],
			Update: function () {
		
			}
		},

	39:	{
            SkillPoints: [245], // Tornado-14
			StatPoints: [3,3,3,0,0],
			Update: function () {
			
			}
		},

	40:	{
            SkillPoints: [245], // Tornado-15
			StatPoints: [3,3,3,0,0],
			Update: function () {
			
			}
		},

	41:	{	
            SkillPoints: [245], // Tornado-16
			StatPoints: [3,3,3,0,0],
			Update: function () {
			
			}
		},

	42:	{
            SkillPoints: [245], // Tornado-17
			StatPoints: [3,3,3,3,3],
			Update: function () {
			
			}
		},

	43:	{
            SkillPoints: [245], // Tornado-18
			StatPoints: [3,3,3,3,3],
			Update: function () {
			}
		},

	44:	{
            SkillPoints: [245], // Tornado-19
			StatPoints: [3,3,3,3,3],
			Update: function () {
			
			}
		},

	45:	{
            SkillPoints: [245], // Tornado-20
			StatPoints: [0,0,0,0,0],
			Update: function () {
			
			}
		},

	46:	{
            SkillPoints: [250], // Hurricane-2
			StatPoints: [0,0,0,0,0],
			Update: function () {
			
			}
		},

	47:	{
            SkillPoints: [250], // Hurricane-3
			StatPoints: [0,0,0,0,0],
			Update: function () {
			
			}
		},

	48:	{
            SkillPoints: [250], // Hurricane-4
			StatPoints: [3,3,3,3,3],
			Update: function () {
			
			}
		},

	49:	{
            SkillPoints: [250], // Hurricane-5
			StatPoints: [3,3,3,3,3],
			Update: function () {
			
			}
		},

	50:	{
            SkillPoints: [250], // Hurricane-6
			StatPoints: [3,3,3,3,3],
			Update: function () {
			
			}
		},

	51:	{	
            SkillPoints: [250], // Hurricane-7
			StatPoints: [3,3,3,3,3],
			Update: function () {
			
			}
		},

	52:	{
            SkillPoints: [250], // Hurricane-8
			StatPoints: [3,3,3,3,3],
			Update: function () {
			
			}
		},

	53:	{
            SkillPoints: [250], // Hurricane-9
			StatPoints: [3,3,3,3,3],
			Update: function () {
			
			}
		},

	54:	{
            SkillPoints: [250, 250, 250, 250, 250], // Hurricane-14 (NM den, radament, izual)
			StatPoints: [3,3,3,3,3,3,3,3,3,3], // (NM Lam Essen)
			Update: function () {
			
			}
		},

	55:	{
            SkillPoints: [250], // Hurricane-15
			StatPoints: [3,3,3,3,3],
			Update: function () {
			
			}
		},

	56:	{
            SkillPoints: [250], // Hurricane-16
			StatPoints: [3,3,3,3,3],
			Update: function () {
			
			}
		},

	57:	{
            SkillPoints: [250], // Hurricane-17
			StatPoints: [3,3,3,3,3],
			Update: function () {
			
			}
		},

	58:	{
            SkillPoints: [250], // Hurricane-18
			StatPoints: [3,3,3,3,3],
			Update: function () {
			
			}
		},

	59:	{
            SkillPoints: [250], // Hurricane-19
			StatPoints: [3,3,3,3,3],
			Update: function () {
			
			}
		},

	60:	{
            SkillPoints: [250], // Hurricane-20
			StatPoints: [3,3,3,3,3],
			Update: function () {
			
			}
		},

	61:	{	
            SkillPoints: [240], // Twister-2
			StatPoints: [3,3,3,3,3],
			Update: function () {
			
			}
		},

	62:	{
			SkillPoints: [240], // Twister-3
			StatPoints: [3,3,3,3,3],
			Update: function () {
			
			}
		},

	63:	{
            SkillPoints: [240], // Twister-4
			StatPoints: [3,3,3,3,3],
			Update: function () {
			}
		},

	64:	{
            SkillPoints: [240], // Twister-5
			StatPoints: [3,3,3,3,3],
			Update: function () {
			
			}
		},

	65:	{
            SkillPoints: [240], // Twister-6
			StatPoints: [3,3,3,3,3],
			Update: function () {
			
			}
		},

	66:	{
            SkillPoints: [240], // Twister-7
			StatPoints: [3,3,3,3,3],
			Update: function () {
			
			}
		},

	67:	{
            SkillPoints: [240], // Twister-8
			StatPoints: [3,3,3,3,3],
			Update: function () {
			
			}
		},

	68:	{
            SkillPoints: [240], // Twister-9
			StatPoints: [3,3,3,3,3],
			Update: function () {
			
			}
		},

	69:	{
            SkillPoints: [240], // Twister-10
			StatPoints: [3,3,3,3,3],
			Update: function () {
			
			}
		},

	70:	{
            SkillPoints: [240], // Twister-11
			StatPoints: [3,3,3,3,3],
			Update: function () {
			
			}
		},

	71:	{	
            SkillPoints: [240], // Twister-12
			StatPoints: [3,3,3,3,3],
			Update: function () {
			
			}
		},

	72:	{
            SkillPoints: [240], // Twister-13
			StatPoints: [3,3,3,3,3],
			Update: function () {
			
			}
		},

	73:	{
            killPoints: [240], // Twister-14
			StatPoints: [3,3,3,3,3],
			Update: function () {
			
			}
		},

	74:	{
            SkillPoints: [240], // Twister-15
			StatPoints: [3,3,3,3,3],
			Update: function () {
			
			}
		},

	75:	{
            SkillPoints: [240], // Twister-16
			StatPoints: [3,3,3,3,3],
			Update: function () {
			
			}
		},

	76:	{
            SkillPoints: [240], // Twister-17
			StatPoints: [3,3,3,3,3],
			Update: function () {
			
			}
		},

	77:	{
            SkillPoints: [240], // Twister-18
			StatPoints: [3,3,3,3,3],
			Update: function () {
			
			}
		},

	78:	{
            SkillPoints: [240], // Twister-19
			StatPoints: [3,3,3,3,3],
			Update: function () {
			
			}
		},

	79:	{
            SkillPoints: [240, 235, 235, 235, 235], // Twister-20, Cyclone Armor-5 (HELL den, radament, izual)
			StatPoints: [3,3,3,3,3,3,3,3,3,3], // (HELL Lam Essen)
			Update: function () {
			
			}
		},

	80:	{
			SkillPoints: [235], // Cyclone Armor-6
			StatPoints: [3,3,3,3,3],
			Update: function () {
			
			}
		},

	81:	{	
            SkillPoints: [235], // Cyclone Armor-7
			StatPoints: [3,3,3,3,3],
			Update: function () {
			
			}
		},

	82:	{
            SkillPoints: [235], // Cyclone Armor-8
			StatPoints: [3,3,3,3,3],
			Update: function () {
			
			}
		},

	83:	{
            SkillPoints: [235], // Cyclone Armor-9
			StatPoints: [3,3,3,3,3],
			Update: function () {
			
			}
		},

	84:	{
            SkillPoints: [235], // Cyclone Armor-10
			StatPoints: [3,3,3,3,3],
			Update: function () {
			
			}
		},

	85:	{
            SkillPoints: [235], // Cyclone Armor-11
			StatPoints: [3,3,3,3,3],
			Update: function () {
			
			}
		},

	86:	{
            SkillPoints: [235], // Cyclone Armor-12
			StatPoints: [3,3,3,3,3],
			Update: function () {
			
			}
		},

	87:	{
            SkillPoints: [235], // Cyclone Armor-13
			StatPoints: [3,3,3,3,3],
			Update: function () {
			
			}
		},

	88:	{
            SkillPoints: [235], // Cyclone Armor-14
			StatPoints: [3,3,3,3,3],
			Update: function () {
			
			}
		},

	89:	{
            SkillPoints: [235], // Cyclone Armor-15
			StatPoints: [3,3,3,3,3],
			Update: function () {
			
			}
		},

	90:	{
            SkillPoints: [235], // Cyclone Armor-16
			StatPoints: [3,3,3,3,3],
			Update: function () {
			
			}
		},

	91:	{	
            SkillPoints: [235], // Cyclone Armor-17
			StatPoints: [3,3,3,3,3],
			Update: function () {
			
			}
		},

	92:	{
            SkillPoints: [235], // Cyclone Armor-18
			StatPoints: [3,3,3,3,3],
			Update: function () {
			
			}
		},

	93:	{
            SkillPoints: [235], // Cyclone Armor-19
			StatPoints: [3,3,3,3,3],
			Update: function () {
			
			}
		},

	94:	{
            killPoints: [235], // Cyclone Armor-20
			StatPoints: [3,3,3,3,3],
			Update: function () {
			
			}
		},

	95:	{
            killPoints: [247], // Grizzly-2
			StatPoints: [3,3,3,3,3],
			Update: function () {
			
			}
		},

	96:	{
            SkillPoints: [247], // Grizzly-3
			StatPoints: [3,3,3,3,3],
			Update: function () {
			
			}
		},

	97:	{
			SkillPoints: [247], // Grizzly-4
			StatPoints: [3,3,3,3,3],
			Update: function () {
			
			}
		},

	98:	{
            SkillPoints: [247], // Grizzly-5
			StatPoints: [3,3,3,3,3],
			Update: function () {
			
			}
		},

	99:	{
            SkillPoints: [247], // Grizzly-6
			StatPoints: [3,3,3,3,3],
			Update: function () {
			
			}
		}
};
