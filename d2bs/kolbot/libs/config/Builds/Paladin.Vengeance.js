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

Finished Char Build:

    Stats													Base Stats      Stats Allocated (505 total)
	----------												----------      ---------------
 	Strength: 125 (Stormlash)         					        25             100 - Done @ level 51      
 	Dexterity: 77 (Stormlash)        					        20              57 - Done @ level 58
 	Vitality: 373 					                            25             348 - Done @ level 99
 	Energy: 15 								                    15              0

	Skills				Levelreq			SkillID			TotalPoints
	------------		--------			-------			-----------
    Sacrifice               1                  96                1	- Done @ level 4
    Smite 				    1				   97				 1	- Done @ level 3
	Might 				    1				   98				 1	- Done @ level 2
    Resist Fire 		    1				  100				20	- Done @ level 65
	Holy Bolt 			    6				  101				 1	- Done @ level 6
	Holy Fire    		    6				  102				 1	- Done @ level 6
	Thorns      		    6				  103				 1	- Done @ level 7
	Resist Cold 		    6				  105				18	- Done @ level 99
	Zeal         		   12				  106				 1	- Done @ level 12 
	Charge 				   12				  107				 1	- Done @ level 12
	Resist Lightning 	   12				  110				20	- Done @ level 81
	Vengeance    		   18				  111				20	- Done @ level 37
	Blessed Hammer 		   18				  112				 1	- Done @ level 18
	Holy Freeze 		   18				  114				 1	- Done @ level 18
	Holy Shield 		   24				  117				 1	- Done @ level 24
	Sanctuary 			   24				  119				 1	- Done @ level 24
	Conviction 			   30				  123				20	- Done @ level 49
	
	TOTAL Points Spent --------------------------------------> 108
	
	**********REMAINING SKILL POINTS =   2  ******** (110 - 108 = 2)

	QUEST SKILL/STAT ALLOCATION:

          Quest         Level Used     
	-----------------	----------			
	Norm Den of Evil        35                 
	Norm Radament           36                 
    Norm Izual              37/38
    Norm Lam Essen          24                 
	NM Den of Evil          45                
	NM Radament             45                
    NM Izual                45
    NM Lam Essen            45                
	Hell Den of Evil        70                 
	Hell Radament           70                 
    Hell Izual              70
    Hell Lam Essen          70 

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

var AutoBuildTemplate = {

	1:	{	
			//SkillPoints: [-1],										// This doesn't matter. We don't have skill points to spend at lvl 1]
			//StatPoints: [-1,-1,-1,-1,-1],								// This doesn't matter. We don't have stat points to spend at lvl 1
			Update: function () {
                // Class specific
                Config.PickitFiles.push("Follower/paladin-vengeance.xpac.nip");				

                Config.AttackSkill		= [-1, 0, 0, 0, 0, -1, -1];
                Config.LowManaSkill		= [0, 0];
                
                //--------------- Pally Runewords -----------------------
                //AncientsPledge
                Config.Runewords.push([Runeword.AncientsPledge, "targe"]);
                Config.Runewords.push([Runeword.AncientsPledge, "rondache"]);
                Config.Runewords.push([Runeword.AncientsPledge, "aerinshield"]);
                Config.Runewords.push([Runeword.AncientsPledge, "crownshield"]);
                Config.Runewords.push([Runeword.AncientsPledge, "royalshield"])           
                               
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
			}
		},
		
	2:	{
			SkillPoints: [98], // Might
			StatPoints: [0, 0, 2, 3, 3], // 2str, 1dex, 2vit
			Update: function () {
				Config.AttackSkill = [-1, 0, 98, 0, 98, -1, -1];		// Use Might
				Config.LowManaSkill = [0, 98];							// Use Might while hitting stuff.
			}
		},
		
	3:	{
			SkillPoints: [97], // Smite								
			StatPoints: [0, 0, 2, 3, 3], // 2str, 1dex, 2vit
			Update: function () {
				
			}
		},
		
	4:	{
			SkillPoints: [96], // Sacrifice
			StatPoints: [0, 0, 2, 3, 3], // 2str, 1dex, 2vit
			Update: function () {
				
			}
		},

	5:	{
			SkillPoints: [-1], // +1 skill point
			StatPoints: [0, 0, 2, 3, 3], // 2str, 1dex, 2vit
			Update: function () {
				Config.ScanShrines = [15, 13, 12];
				Config.MinColumn = [1, 1, 1, 1];
			}
		},

	6:	{
			SkillPoints: [101, 102], // Holy Bolt, Holy Fire
			StatPoints: [0, 0, 2, 3, 3], // 2str, 1dex, 2vit
			Update: function () {
                Config.AttackSkill = [-1, 0, 102, 0, 102, 101, 102];	// Holy Bolt and Holy Fire for Secondary Skill/Aura.
                Config.LowManaSkill = [0, 102];							// Use Holy Fire while hitting stuff.
			}
		},

	7:	{
			SkillPoints: [103], // Thorns
			StatPoints: [0, 0, 2, 3, 3], // 2str, 1dex, 2vit
			Update: function () {
				//Config.PickitFiles.splice(Config.PickitFiles.indexOf("belowlevelseven.nip"), 1);	// Will remove index "belowlevel7.nip" from Config.PickitFiles
			}
		},

	8:	{
			SkillPoints: [-1], // +2 skill point											
			StatPoints: [0, 0, 2, 3, 3], // 2str, 1dex, 2vit
			Update: function () {
				
			}
		},

	9:	{
			SkillPoints: [-1], // +3 skill point
			StatPoints: [0, 0, 2, 3, 3], // 2str, 1dex, 2vit
			Update: function () {
				
			}
		},

	10:	{
			SkillPoints: [-1], // +4 skill point
            StatPoints: [0, 0, 2, 3, 3], // 2str, 1dex, 2vit
            Update: function () {
				Config.StashGold = 1000;								// Minimum amount of gold to stash.
				Config.BeltColumn = ["hp", "hp", "mp", "rv"]; 			// Start keeping rejuvs
				Config.MinColumn = [1, 1, 1, 1];
				Config.LowGold = 5000;
			}
		},

	11:	{	
			SkillPoints: [-1], // +5 skill point
            StatPoints: [0, 0, 2, 3, 3], // 2str, 1dex, 2vit
            Update: function () {
				
			}
		},

	12:	{
			SkillPoints: [106, 107], // Zeal, Charge, +4 skill point								
            StatPoints: [0, 0, 2, 3, 3], // 2str, 1dex, 2vit
            Update: function () {
                Config.AttackSkill = [-1, 106, 102, 106, 102, 101, 102];	// Use Zeal
			}
		},

	13:	{
			SkillPoints: [-1], // +5 skill point
            StatPoints: [0, 0, 2, 3, 3], // 2str, 1dex, 2vit
            Update: function () {
				
			}
		},

	14:	{
			SkillPoints: [-1], // +6 skill point
            StatPoints: [0, 0, 2, 3, 3], // 2str, 1dex, 2vit
            Update: function () {
				
			}
		},

	15:	{
			SkillPoints: [-1], // +7 skill point
            StatPoints: [0, 0, 2, 3, 3], // 2str, 1dex, 2vit
            Update: function () {
				Config.OpenChests = false;								// Eyes on the prize!
			}
		},

	16:	{
			SkillPoints: [-1], // +8 skill point
            StatPoints: [0, 0, 2, 3, 3], // 2str, 1dex, 2vit
            Update: function () {
				
			}
		},

	17:	{
			SkillPoints: [-1], // +9 skill point
            StatPoints: [0, 0, 2, 3, 3], // 2str, 1dex, 2vit
            Update: function () {
				
			}
		},

	18:	{
			SkillPoints: [111, 112, 114], // Vengeance-1, Blessed Hammer, Holy Freeze, +7 skill point 
            StatPoints: [0, 0, 2, 3, 3], // 2str, 1dex, 2vit
            Update: function () {
                Config.AttackSkill = [-1, 111, 114, 111, 114, 111, 114];// Use Vengeance
				Config.LowManaSkill = [0, 114];							// Use Holy Freeze while hitting stuff.
				Config.TownCheck = false;								// Do go to town for more potions
				Config.MinColumn = [3, 3, 3, 3];						// Should have a decent belt by now
				Config.BeltColumn = ["hp", "mp", "mp", "rv"]; 			// Start keeping rejuvs
				Config.Charge = false;									// Don't waste mana on charging while walking
			}
		},

	19:	{
			SkillPoints: [111], // Vengeance-2, +7 skill point
            StatPoints: [0, 0, 2, 3, 3], // 2str, 1dex, 2vit
            Update: function () {
				
			}
		},

	20:	{
            SkillPoints: [111], // Vengeance-3, +7 skill point
            StatPoints: [0, 0, 2, 3, 3], // 2str, 1dex, 2vit
            Update: function () {
				Config.LowGold = 10000;
			}
		},

	21:	{	
            SkillPoints: [111], // Vengeance-4, +7 skill point
            StatPoints: [0, 0, 2, 3, 3], // 2str, 1dex, 2vit
            Update: function () {
				
			}
		},

	22:	{
            SkillPoints: [111], // Vengeance-5, +7 skill point
            StatPoints: [0, 0, 2, 3, 3], // 2str, 1dex, 2vit
            Update: function () {
				
			}
		},

	23:	{
            SkillPoints: [111], // Vengeance-6, +7 skill point
            StatPoints: [0, 0, 2, 3, 3], // 2str, 1dex, 2vit
            Update: function () {
				
			}
		},

	24:	{
			SkillPoints: [111, 117, 119], // Vengeance-7, Holy Shield, Sanctuary, +5 skill point
            StatPoints: [0, 0, 2, 3, 3, 3, 3, 3, 3, 3], // 2str, 1dex, 7vit (NORM Lam Essen)
            Update: function () {
				Config.Cubing = true;									// Will have a cube by now.
			}
		},

	25:	{
            SkillPoints: [111], // Vengeance-8, +5 skill point
            StatPoints: [0, 0, 2, 3, 3], // 2str, 1dex, 2vit
            Update: function () {
				Config.LowGold = 15000;
			}
		},

	26:	{
            SkillPoints: [111], // Vengeance-9, +5 skill point
            StatPoints: [0, 0, 2, 3, 3], // 2str, 1dex, 2vit
            Update: function () {
				
			}
		},

	27:	{
            SkillPoints: [111], // Vengeance-10, +5 skill point
            StatPoints: [0, 0, 2, 3, 3], // 2str, 1dex, 2vit
            Update: function () {
				
			}
		},

	28:	{
            SkillPoints: [111], // Vengeance-11, +5 skill point
            StatPoints: [0, 0, 2, 3, 3], // 2str, 1dex, 2vit
            Update: function () {
				
			}
		},

	29:	{
            SkillPoints: [111], // Vengeance-12, +5 skill point
            StatPoints: [0, 0, 2, 3, 3], // 2str, 1dex, 2vit
            Update: function () {
				
			}
		},

	30:	{
			SkillPoints: [111, 123], // Vengeance-13, Conviction-1, +4 skill point
            StatPoints: [0, 0, 2, 3, 3], // 2str, 1dex, 2vit
            Update: function () {
                Config.AttackSkill = [-1, 111, 123, 111, 123, 111, 123];	// Vengeance and Conviction
                Config.LowManaSkill = [0, 123];							    // Use Conviction while hitting stuff.				
                Config.LowGold = 20000;
			}
		},

	31:	{	
            SkillPoints: [111, 123], // Vengeance-14, Conviction-2, +3 skill point
            StatPoints: [0, 0, 2, 3, 3], // 2str, 1dex, 2vit
            Update: function () {
				
			}
		},

	32:	{
            SkillPoints: [111, 123], // Vengeance-15, Conviction-3, +2 skill point
            StatPoints: [0, 0, 2, 3, 3], // 2str, 1dex, 2vit
            Update: function () {
				
			}
		},

	33:	{
            SkillPoints: [111, 123], // Vengeance-16, Conviction-4, +1 skill point
            StatPoints: [0, 0, 2, 3, 3], // 2str, 1dex, 2vit
            Update: function () {
				
			}
		},

	34:	{
            SkillPoints: [111, 123], // Vengeance-17, Conviction-5
            StatPoints: [0, 0, 2, 3, 3], // 2str, 1dex, 2vit
            Update: function () {
				
			}
		},

	35:	{
            SkillPoints: [111, 123], // Vengeance-18, Conviction-6 (NORM den)
            StatPoints: [0, 0, 2, 3, 3], // 2str, 1dex, 2vit
            Update: function () {
				Config.LowGold = 30000;
			}
		},

	36:	{
            SkillPoints: [111, 123], // Vengeance-19, Conviction-7 (NORM Radament)
            StatPoints: [0, 0, 2, 3, 3], // 2str, 1dex, 2vit
            Update: function () {
				
			}
		},

	37:	{
            SkillPoints: [111, 123], // Vengeance-20, Conviction-8 (NORM Izual 1/2)
            StatPoints: [0, 0, 2, 3, 3], // 2str, 1dex, 2vit
            Update: function () {
				
			}
		},

	38:	{
            SkillPoints: [123, 100], // Conviction-9, Resist Fire-1 (NORM Izual 2/2)
            StatPoints: [0, 0, 2, 3, 3], // 2str, 1dex, 2vit
            Update: function () {
				
			}
		},

	39:	{
			SkillPoints: [123], // Conviction-10
            StatPoints: [0, 0, 2, 3, 3], // 2str, 1dex, 2vit
            Update: function () {
				
			}
		},

	40:	{
            SkillPoints: [123], // Conviction-11
            StatPoints: [0, 0, 2, 3, 3], // 2str, 1dex, 2vit
            Update: function () {
				Config.LowGold = 35000;
			}
		},

	41:	{	
            SkillPoints: [123], // Conviction-12
            StatPoints: [0, 0, 2, 3, 3], // 2str, 1dex, 2vit
            Update: function () {
				
			}
		},

	42:	{
            SkillPoints: [123], // Conviction-13
            StatPoints: [0, 0, 2, 3, 3], // 2str, 1dex, 2vit
            Update: function () {
				
			}
		},

	43:	{
            SkillPoints: [123], // Conviction-14
            StatPoints: [0, 0, 2, 3, 3], // 2str, 1dex, 2vit
            Update: function () {
				
			}
		},

	44:	{
            SkillPoints: [123], // Conviction-15
            StatPoints: [0, 0, 2, 3, 3], // 2str, 1dex, 2vit
            Update: function () {
				
			}
		},

	45:	{
            SkillPoints: [123, 100, 100, 100, 100], // Conviction-16, Resist Fire-5 (NM den, radament, izual)
            StatPoints: [0, 0, 2, 3, 3, 3, 3, 3, 3, 3], // 2str, 1dex, 7vit (NM Lam Essen)
            Update: function () {
				Config.LowGold = 40000;
			}
		},

	46:	{
            SkillPoints: [123], // Conviction-17
            StatPoints: [0, 0, 2, 3, 3], // 2str, 1dex, 2vit
            Update: function () {
				
			}
		},

	47:	{
            SkillPoints: [123], // Conviction-18
            StatPoints: [0, 0, 2, 3, 3], // 2str, 1dex, 2vit
            Update: function () {
				
			}
		},

	48:	{
            SkillPoints: [123], // Conviction-19
            StatPoints: [0, 0, 2, 3, 3], // 2str, 1dex, 2vit
            Update: function () {
				
			}
		},

	49:	{
            SkillPoints: [123], // Conviction-20
            StatPoints: [0, 0, 2, 3, 3], // 2str, 1dex, 2vit
            Update: function () {
				
			}
		},

	50:	{
            SkillPoints: [123], // Conviction-20
            StatPoints: [0, 0, 2, 3, 3], // 2str, 1dex, 2vit
            Update: function () {
				Config.StashGold = 100000;								// Minimum amount of gold to stash.
				Config.Charge = true;									// Should have enough mana to charge while walking now.
				Config.MPBuffer = 4;									// Nightmare has stronger potions.
				Config.HPBuffer = 0;									// Nightmare has stronger potions.
				Config.BeltColumn = ["hp", "hp", "mp", "rv"];			// Regular potion settings
				Config.MinColumn = [3, 3, 3, 0];						// Regular potion settings
				Config.LowGold = 45000;
			}
		},

	51:	{	
			SkillPoints: [100],	// Resist Fire-6
            StatPoints: [0, 0, 2, 3, 3], // 2str, 1dex, 2vit (125 strength)
            Update: function () {
				
			}
		},

	52:	{
            SkillPoints: [100],	// Resist Fire-7
            StatPoints: [2, 3, 3, 3, 3], // 1dex, 4vit
            Update: function () {
				
			}
		},

	53:	{
			SkillPoints: [100],	// Resist Fire-8
            StatPoints: [2, 3, 3, 3, 3], // 1dex, 4vit
            Update: function () {
				
			}
		},

	54:	{
			SkillPoints: [100],	// Resist Fire-9
            StatPoints: [2, 3, 3, 3, 3], // 1dex, 4vit
            Update: function () {
				
			}
		},

	55:	{
			SkillPoints: [100],	// Resist Fire-10
            StatPoints: [2, 3, 3, 3, 3], // 1dex, 4vit
            Update: function () {
				Config.LowGold = 50000;
			}
		},

	56:	{
			SkillPoints: [100],	// Resist Fire-11
            StatPoints: [2, 3, 3, 3, 3], // 1dex, 4vit
            Update: function () {
				
			}
		},

	57:	{
			SkillPoints: [100],	// Resist Fire-12
            StatPoints: [2, 3, 3, 3, 3], // 1dex, 4vit
            Update: function () {
				
			}
		},

	58:	{
			SkillPoints: [100],	// Resist Fire-13
            StatPoints: [2, 3, 3, 3, 3], // 1dex, 4vit (77 dex)
            Update: function () {
				
			}
		},

	59:	{
			SkillPoints: [100],	// Resist Fire-14
            StatPoints: [3, 3, 3, 3, 3], // 5vit
            Update: function () {
				
			}
		},

	60:	{
			SkillPoints: [100],	// Resist Fire-15
            StatPoints: [3, 3, 3, 3, 3], // 5vit
            Update: function () {
				Config.LowGold = 55000;
			}
		},

	61:	{	
			SkillPoints: [100],	// Resist Fire-16
            StatPoints: [3, 3, 3, 3, 3], // 5vit
            Update: function () {
				
			}
		},

	62:	{
			SkillPoints: [100],	// Resist Fire-17
            StatPoints: [3, 3, 3, 3, 3], // 5vit
            Update: function () {
				
			}
		},

	63:	{
			SkillPoints: [100],	// Resist Fire-18
            StatPoints: [3, 3, 3, 3, 3], // 5vit
            Update: function () {
				
			}
		},

	64:	{
			SkillPoints: [100],	// Resist Fire-19
            StatPoints: [3, 3, 3, 3, 3], // 5vit
            Update: function () {
				
			}
		},

	65:	{
			SkillPoints: [100],	// Resist Fire-20
            StatPoints: [3, 3, 3, 3, 3], // 5vit
            Update: function () {
				Config.LowGold = 60000;
			}
		},

	66:	{
			SkillPoints: [110], // Resist Lightning-1
            StatPoints: [3, 3, 3, 3, 3], // 5vit
            Update: function () {
				
			}
		},

	67:	{
			SkillPoints: [110], // Resist Lightning-2
            StatPoints: [3, 3, 3, 3, 3], // 5vit
            Update: function () {
				
			}
		},

	68:	{
			SkillPoints: [110], // Resist Lightning-3
            StatPoints: [3, 3, 3, 3, 3], // 5vit
            Update: function () {
				
			}
		},

	69:	{
			SkillPoints: [110], // Resist Lightning-4
            StatPoints: [3, 3, 3, 3, 3], // 5vit
            Update: function () {
				
			}
		},

	70:	{
			SkillPoints: [110, 110, 110, 110, 110], // Resist Lightning-9
            StatPoints: [3, 3, 3, 3, 3, 3, 3, 3, 3, 3], // 10vit (HELL Lame Essen)
            Update: function () {
				Config.LowGold = 100000;
			}
		},

	71:	{	
			SkillPoints: [110], // Resist Lightning-10
            StatPoints: [3, 3, 3, 3, 3], // 5vit
            Update: function () {
				
			}
		},

	72:	{
			SkillPoints: [110], // Resist Lightning-11
            StatPoints: [3, 3, 3, 3, 3], // 5vit
            Update: function () {
				
			}
		},

	73:	{
			SkillPoints: [110], // Resist Lightning-12
            StatPoints: [3, 3, 3, 3, 3], // 5vit
            Update: function () {
				
			}
		},

	74:	{
			SkillPoints: [110], // Resist Lightning-13
            StatPoints: [3, 3, 3, 3, 3], // 5vit
            Update: function () {
				
			}
		},

	75:	{
			SkillPoints: [110], // Resist Lightning-14
            StatPoints: [3, 3, 3, 3, 3], // 5vit
            Update: function () {
				
			}
		},

	76:	{
			SkillPoints: [110], // Resist Lightning-15
            StatPoints: [3, 3, 3, 3, 3], // 5vit
            Update: function () {
				
			}
		},

	77:	{
			SkillPoints: [110], // Resist Lightning-16
            StatPoints: [3, 3, 3, 3, 3], // 5vit
            Update: function () {
				
			}
		},

	78:	{
			SkillPoints: [110], // Resist Lightning-17
            StatPoints: [3, 3, 3, 3, 3], // 5vit
            Update: function () {
				
			}
		},

	79:	{
			SkillPoints: [110], // Resist Lightning-18
            StatPoints: [3, 3, 3, 3, 3], // 5vit
            Update: function () {
				
			}
		},

	80:	{
			SkillPoints: [110], // Resist Lightning-19
            StatPoints: [3, 3, 3, 3, 3], // 5vit
            Update: function () {
				Config.Gamble = true;									// Time to spend dat ca$h!!
				Config.ScanShrines = [];
			}
		},

	81:	{	
			SkillPoints: [110], // Resist Lightning-20
            StatPoints: [3, 3, 3, 3, 3], // 5vit
            Update: function () {
				
			}
		},

	82:	{
			SkillPoints: [105], // Resist Cold-1
            StatPoints: [3, 3, 3, 3, 3], // 5vit
            Update: function () {
				
			}
		},

	83:	{
			SkillPoints: [105], // Resist Cold-2
            StatPoints: [3, 3, 3, 3, 3], // 5vit
            Update: function () {
				
			}
		},

	84:	{
			SkillPoints: [105], // Resist Cold-3
            StatPoints: [3, 3, 3, 3, 3], // 5vit
            Update: function () {
				
			}
		},

	85:	{
			SkillPoints: [105], // Resist Cold-4
            StatPoints: [3, 3, 3, 3, 3], // 5vit
            Update: function () {
				
			}
		},

	86:	{
			SkillPoints: [105], // Resist Cold-5
            StatPoints: [3, 3, 3, 3, 3], // 5vit
            Update: function () {
				
			}
		},

	87:	{
			SkillPoints: [105], // Resist Cold-6
            StatPoints: [3, 3, 3, 3, 3], // 5vit
            Update: function () {
				
			}
		},

	88:	{
			SkillPoints: [105], // Resist Cold-7
            StatPoints: [3, 3, 3, 3, 3], // 5vit
            Update: function () {
				
			}
		},

	89:	{
			SkillPoints: [105], // Resist Cold-8
            StatPoints: [3, 3, 3, 3, 3], // 5vit
            Update: function () {
				
			}
		},

	90:	{
			SkillPoints: [105], // Resist Cold-9
            StatPoints: [3, 3, 3, 3, 3], // 5vit
            Update: function () {
				Config.MPBuffer = 0;									// CS runs, no longer need buffer because of taxi rides!
			}
		},

	91:	{	
			SkillPoints: [105], // Resist Cold-10
            StatPoints: [3, 3, 3, 3, 3], // 5vit
            Update: function () {
				
			}
		},

	92:	{
			SkillPoints: [105], // Resist Cold-11
            StatPoints: [3, 3, 3, 3, 3], // 5vit
            Update: function () {
				
			}
		},

	93:	{
			SkillPoints: [105], // Resist Cold-12
            StatPoints: [3, 3, 3, 3, 3], // 5vit
            Update: function () {
				
			}
		},

	94:	{
			SkillPoints: [105], // Resist Cold-13
            StatPoints: [3, 3, 3, 3, 3], // 5vit
            Update: function () {
				
			}
		},

	95:	{
			SkillPoints: [105], // Resist Cold-14
            StatPoints: [3, 3, 3, 3, 3], // 5vit
            Update: function () {
				
			}
		},

	96:	{
			SkillPoints: [105], // Resist Cold-15
            StatPoints: [3, 3, 3, 3, 3], // 5vit
            Update: function () {
				
			}
		},

	97:	{
			SkillPoints: [105], // Resist Cold-16
            StatPoints: [3, 3, 3, 3, 3], // 5vit
            Update: function () {
				
			}
		},

	98:	{
			SkillPoints: [105], // Resist Cold-17
            StatPoints: [3, 3, 3, 3, 3], // 5vit
            Update: function () {
				
			}
		},

	99:	{
			SkillPoints: [105], // Resist Cold-18
            StatPoints: [3, 3, 3, 3, 3], // 5vit
            Update: function () {
				
			}
		}
};