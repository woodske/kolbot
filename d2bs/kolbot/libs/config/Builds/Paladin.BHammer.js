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

	Stats													Base Stats
	------------											----------
 	Strength: 40 (15 points used)								25
 	Energy: 15 (no points)										15
 	Dexterity: 20 (no points)									20
 	Vitality: 500 (15 points remain from level 97, 98, and 99)	25

	Skills				Levelreq			SkillID			TotalPoints
	------------		--------			-------			-----------
	Might 				    1				   98				 1	- Done @ level 2
	Smite 				    1				   97				 1	- Done @ level 3
	Prayer 				    1				   99				 1	- Done @ level 4
	Holy Bolt 			    6				  101				 1	- Done @ level 6
	Defiance 			    6				  104				 1	- Done @ level 6
	Charge 				   12				  107				 1	- Done @ level 12
	Blessed Aim 		   12				  108				20	- Done @ level 78 *****PUMP SKILL QUEST POINTS HERE***** (12 + 1 = 13)
	Cleansing 			   12				  109				 1	- Done @ level 12
	Concentration 		   18				  113				20	- Done @ level 52
	Blessed Hammer 		   18				  112				20	- Done @ level 37
	Vigor 				   18				  115				20	- Done @ level 71
	Holy Shield 		   24				  117				20	- Done @ level 98
	Meditation 			   24				  120				 1	- Done @ level 24
	
	TOTAL Points Spent --------------------------------------> 108
	
	**********REMAINING SKILL POINTS =   2  ******** (110 - 108 = 2)

	Quest Skill Point   Level Used			SkillID			TotalPoints
	-----------------	----------			-------			-----------
	Norm Den of Evil        13                108                 1
	Norm Radament           27                108                 1
	Norm Izual              30                108                 2
	NM Den of Evil          43                108                 1
	NM Radament             43                108                 1
	NM Izual                43                108                 2
	Hell Den of Evil        70                108                 1
	Hell Radament           70                108                 1
	Hell Izual              70                108                 2
	
	TOTAL Quest Points Spent ----------------------------------> 12
	
	**********REMAINING QUEST SKILL POINTS =   0  ******** (12 - 12 = 0)

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
                Config.PickitFiles.push("Follower/paladin.xpac.nip");				

                Config.AttackSkill		= [-1, 0, 0, 0, 0, -1, -1];
                Config.LowManaSkill		= [0, 0];
                
                //--------------- Pally Runewords -----------------------
                //AncientsPledge
                Config.Runewords.push([Runeword.AncientsPledge, "targe"]);
                Config.Runewords.push([Runeword.AncientsPledge, "rondache"]);
                Config.Runewords.push([Runeword.AncientsPledge, "aerinshield"]);
                Config.Runewords.push([Runeword.AncientsPledge, "crownshield"]);
                Config.Runewords.push([Runeword.AncientsPledge, "royalshield"])
                
                //Spirit Shield
                Config.Runewords.push([Runeword.Spirit, "targe"]);
                Config.Runewords.push([Runeword.Spirit, "rondache"]);
                Config.Runewords.push([Runeword.Spirit, "heraldicshield"]);
                Config.Runewords.push([Runeword.Spirit, "aerinshield"]);
                Config.Runewords.push([Runeword.Spirit, "crownshield"]);
                Config.Runewords.push([Runeword.Spirit, "akarantarge"]);
                Config.Runewords.push([Runeword.Spirit, "akaranrondache"]);
                Config.Runewords.push([Runeword.Spirit, "protectorshield"]);
                Config.Runewords.push([Runeword.Spirit, "gildedshield"]);
                Config.Runewords.push([Runeword.Spirit, "royalshield"]);
                Config.Runewords.push([Runeword.Spirit, "SacredTarge"]);
                Config.Runewords.push([Runeword.Spirit, "sacredrondache"]);
                Config.Runewords.push([Runeword.Spirit, "kurastshield"]);
                Config.Runewords.push([Runeword.Spirit, "zakarumshield"]);
                Config.Runewords.push([Runeword.Spirit, "vortexshield"]);
                               
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

                //Spirit Sword
                Config.Runewords.push([Runeword.Spirit, "broadsword"]);
                Config.Runewords.push([Runeword.Spirit, "crystalSword"]);

                Config.KeepRunewords.push("[type] == sword # [itemallskills] == 2");	           
			}
		},
		
	2:	{
			SkillPoints: [98], 											// Might + 1 (level 1)
			StatPoints: [0, 3, 3, 3, 3],								// Strength + 1, Vitality + 4 (26) (29)
			Update: function () {
				Config.AttackSkill = [-1, 0, 98, 0, 98, -1, -1];		// Use Might
				Config.LowManaSkill = [0, 98];							// Use Might while hitting stuff.
			}
		},
		
	3:	{
			SkillPoints: [97], 											// Smite + 1 (level 1)
			StatPoints: [0, 0, 3, 3, 3],								// Strength 3, Vitality + 3 (28) (32)
			Update: function () {
				
			}
		},
		
	4:	{
			SkillPoints: [99],											// Prayer + 1 (level 1)
			StatPoints: [0, 0, 0, 3, 3],								// Strength 6+25, Vitality + 2 (31) (34)
			Update: function () {
				
			}
		},

	5:	{
			SkillPoints: [-1],											// Save Point + 1 (1 saved point remains)
			StatPoints: [0, 0, 0, 0, 3],								// Strength 10+25, Vitality + 1 (35) (35)
			Update: function () {
				Config.ScanShrines = [15, 13, 12];
				Config.MinColumn = [1, 1, 1, 1];
			}
		},

	6:	{
			SkillPoints: [101, 104],									// Holy Bolt + 1, Defiance + 1 (level 1) (level 2) (0 saved points remain)
			StatPoints: [0, 0, 3, 3, 3],								// Strength 12+25, Vitality + 3 (37) (38)
			Update: function () {
				Config.AttackSkill = [-1, 0, 98, 0, 98, 101, 98];		// Holy Bolt and Might for Secondary Skill/Aura.
			}
		},

	7:	{
			SkillPoints: [-1],											// Save Point + 1 (1 saved point remains)
			StatPoints: [0, 0, 3, 3, 3],								// Strength 14+25, Vitality + 3 (39) (41)
			Update: function () {
				//Config.PickitFiles.splice(Config.PickitFiles.indexOf("belowlevelseven.nip"), 1);	// Will remove index "belowlevel7.nip" from Config.PickitFiles
			}
		},

	8:	{
			SkillPoints: [-1],											// Save Point + 1 (2 saved points remain)
			StatPoints: [0, 3, 3, 3, 3],								// Strength 15+25, Vitality + 4 (40) (45)
			Update: function () {
				
			}
		},

	9:	{
			SkillPoints: [-1],											// Save Point + 1 (3 saved points remain)
			StatPoints: [3, 3, 3, 3, 3],								// Vitality + 5 (50)
			Update: function () {
				
			}
		},

	10:	{
			SkillPoints: [-1],											// Save Point + 1 (4 saved points remain)
			StatPoints: [3, 3, 3, 3, 3],								// Vitality + 5 (55)
			Update: function () {
				Config.StashGold = 1000;								// Minimum amount of gold to stash.
				Config.BeltColumn = ["hp", "hp", "mp", "rv"]; 			// Start keeping rejuvs
				Config.MinColumn = [1, 1, 1, 1];
				Config.LowGold = 5000;
			}
		},

	11:	{	
			SkillPoints: [-1],											// Save Point + 1 (5 saved points remain)
			StatPoints: [3, 3, 3, 3, 3],								// Vitality + 5 (60)
			Update: function () {
				
			}
		},

	12:	{
			SkillPoints: [107, 108, 109],								// Charge + 1, Blessed Aim + 1, Cleansing + 1 (level 1) (level 1) (level 1) (3 saved points remain)
			StatPoints: [3, 3, 3, 3, 3],								// Vitality + 5 (65)
			Update: function () {
				Config.AttackSkill = [-1, 0, 108, 0, 108, 101, 108];	// Use Blessed Aim
				Config.LowManaSkill = [0, 108];							// Use Blessed Aim while hitting stuff.
			}
		},

	13:	{
			SkillPoints: [108],											// Blessed Aim + 1 (level 2) Save Point + 1 (4 saved points remain) (Normal Den of Evil Used)
			StatPoints: [3, 3, 3, 3, 3],								// Vitality + 5 (70)
			Update: function () {
				
			}
		},

	14:	{
			SkillPoints: [-1],											// Save Point + 1 (5 saved points remain)
			StatPoints: [3, 3, 3, 3, 3],								// Vitality + 5 (75)
			Update: function () {
				
			}
		},

	15:	{
			SkillPoints: [-1],											// Save Point + 1 (6 saved points remain)
			StatPoints: [3, 3, 3, 3, 3],								// Vitality + 5 (80)
			Update: function () {
				Config.OpenChests = false;								// Eyes on the prize!
			}
		},

	16:	{
			SkillPoints: [-1],											// Save Point + 1 (7 saved points remain)
			StatPoints: [3, 3, 3, 3, 3],								// Vitality + 5 (85)
			Update: function () {
				
			}
		},

	17:	{
			SkillPoints: [-1],											// Save Point + 1 (8 saved points remain)
			StatPoints: [3, 3, 3, 3, 3],								// Vitality + 5 (90)
			Update: function () {
				
			}
		},

	18:	{
			SkillPoints: [112, 113, 115],								// Blessed Hammer + 1, Concentration + 1, Vigor + 1 (level 1) (level 1) (level 1) (6 saved points remain)
			StatPoints: [3, 3, 3, 3, 3],								// Vitality + 5 (95)
			Update: function () {
				Config.AttackSkill = [-1, 112, 113, 112, 113, 101, 113];// Blessed Hammer and Concentration!
				Config.LowManaSkill = [0, 113];							// Use Concentration while hitting stuff.
				Config.TownCheck = false;								// Do go to town for more potions
				Config.MinColumn = [3, 3, 3, 3];						// Should have a decent belt by now
				Config.BeltColumn = ["hp", "mp", "mp", "rv"]; 			// Start keeping rejuvs
				Config.Charge = false;									// Don't waste mana on charging while walking
				Config.MPBuffer = 8;									// Need lots of mana for Blessed Hammer!
			}
		},

	19:	{
			SkillPoints: [112, 113],									// Blessed Hammer + 1, Concentration + 1 (level 2) (level 2) (5 saved points remain)
			StatPoints: [3, 3, 3, 3, 3],								// Vitality + 5 (100)
			Update: function () {
				
			}
		},

	20:	{
			SkillPoints: [112, 113],									// Blessed Hammer + 1, Concentration + 1 (level 3) (level 3) (4 saved points remain)
			StatPoints: [3, 3, 3, 3, 3],								// Vitality + 5 (105)
			Update: function () {
				Config.LowGold = 10000;
			}
		},

	21:	{	
			SkillPoints: [112, 113],									// Blessed Hammer + 1, Concentration + 1 (level 4) (level 4) (3 saved points remain)
			StatPoints: [3, 3, 3, 3, 3],								// Vitality + 5 (110)
			Update: function () {
				
			}
		},

	22:	{
			SkillPoints: [112, 113],									// Blessed Hammer + 1, Concentration + 1 (level 5) (level 5) (2 saved points remain)
			StatPoints: [3, 3, 3, 3, 3],								// Vitality + 5 (115)
			Update: function () {
				
			}
		},

	23:	{
			SkillPoints: [112],											// Blessed Hammer + 1 (level 6) (2 saved points remain)
			StatPoints: [3, 3, 3, 3, 3],								// Vitality + 5 (120)
			Update: function () {
				
			}
		},

	24:	{
			SkillPoints: [112, 117, 120],								// Blessed Hammer + 1, Holy Shield + 1, Meditation + 1 (level 7) (level 1) (level 1) (0 saved points remain)
			StatPoints: [3, 3, 3, 3, 3],								// Vitality + 5 (125)
			Update: function () {
				Config.AttackSkill = [-1, 112, 113, 112, 113, 101, 120];// Holy Bolt and Meditation for Secondary Skill/Aura.
				Config.LowManaSkill = [0, 120];							// Use Meditation while hitting stuff.
				Config.Cubing = true;									// Will have a cube by now.
			}
		},

	25:	{
			SkillPoints: [112],											// Blessed Hammer + 1 (level 8)
			StatPoints: [3, 3, 3, 3, 3],								// Vitality + 5 (130)
			Update: function () {
				Config.LowGold = 15000;
			}
		},

	26:	{
			SkillPoints: [112],											// Blessed Hammer + 1 (level 9)
			StatPoints: [3, 3, 3, 3, 3],								// Vitality + 5 (135)
			Update: function () {
				
			}
		},

	27:	{
			SkillPoints: [112, 108],									// Blessed Hammer + 1, Blessed Aim + 1 (level 10) (level 3) (Norm Radament)
			StatPoints: [3, 3, 3, 3, 3],								// Vitality + 5 (140)
			Update: function () {
				
			}
		},

	28:	{
			SkillPoints: [112],											// Blessed Hammer + 1 (level 11)
			StatPoints: [3, 3, 3, 3, 3],								// Vitality + 5 (145)
			Update: function () {
				
			}
		},

	29:	{
			SkillPoints: [112],											// Blessed Hammer + 1 (level 12)
			StatPoints: [3, 3, 3, 3, 3],								// Vitality + 5 (150)
			Update: function () {
				
			}
		},

	30:	{
			SkillPoints: [112, 108, 122],								// Blessed Hammer + 1, Blessed Aim + 2 (level 13) (level 5) (Norm Izual)
			StatPoints: [3, 3, 3, 3, 3, 3, 3, 3, 3, 3],					// Vitality + 10 (160) (Norm Lam Esen's Tome)
			Update: function () {
				Config.AttackSkill = [-1, 112, 113, 112, 113, 97, 122];// Holy Bolt and Meditation for Secondary Skill/Aura.
				Config.LowGold = 20000;
			}
		},

	31:	{	
			SkillPoints: [112],											// Blessed Hammer + 1 (level 14)
			StatPoints: [3, 3, 3, 3, 3],								// Vitality + 5 (165)
			Update: function () {
				
			}
		},

	32:	{
			SkillPoints: [112],											// Blessed Hammer + 1 (level 15)
			StatPoints: [3, 3, 3, 3, 3],								// Vitality + 5 (170)
			Update: function () {
				
			}
		},

	33:	{
			SkillPoints: [112],											// Blessed Hammer + 1 (level 16)
			StatPoints: [3, 3, 3, 3, 3],								// Vitality + 5 (175)
			Update: function () {
				
			}
		},

	34:	{
			SkillPoints: [112],											// Blessed Hammer + 1 (level 17)
			StatPoints: [3, 3, 3, 3, 3],								// Vitality + 5 (180)
			Update: function () {
				
			}
		},

	35:	{
			SkillPoints: [112],											// Blessed Hammer + 1 (level 18)
			StatPoints: [3, 3, 3, 3, 3],								// Vitality + 5 (185)
			Update: function () {
				Config.LowManaSkill = [-1, -1];							// Stop trying to hit stuff.
				Config.LowGold = 30000;
			}
		},

	36:	{
			SkillPoints: [112],											// Blessed Hammer + 1 (level 19)
			StatPoints: [3, 3, 3, 3, 3],								// Vitality + 5 (190)
			Update: function () {
				
			}
		},

	37:	{
			SkillPoints: [112],											// Blessed Hammer + 1 (level 20)
			StatPoints: [3, 3, 3, 3, 3],								// Vitality + 5 (195)
			Update: function () {
				
			}
		},

	38:	{
			SkillPoints: [113],											// Concentration + 1 (level 6)
			StatPoints: [3, 3, 3, 3, 3],								// Vitality + 5 (200)
			Update: function () {
				
			}
		},

	39:	{
			SkillPoints: [113],											// Concentration + 1 (level 7)
			StatPoints: [3, 3, 3, 3, 3],								// Vitality + 5 (205)
			Update: function () {
				
			}
		},

	40:	{
			SkillPoints: [113],											// Concentration + 1 (level 8)
			StatPoints: [0, 0, 0, 0, 0],								// strength 20+25
			Update: function () {
				Config.LowGold = 35000;
			}
		},

	41:	{	
			SkillPoints: [113],											// Concentration + 1 (level 9)
			StatPoints: [0, 0, 0, 0, 0],								// strength 25+25
			Update: function () {
				
			}
		},

	42:	{
			SkillPoints: [113],											// Concentration + 1 (level 10)
			StatPoints: [0, 0, 0, 0, 0],								// st 30+25
			Update: function () {
				
			}
		},

	43:	{
			SkillPoints: [113, 108, 108, 108, 108],						// Concentration + 1, Blessed Aim + 4 (level 11) (level 9) (NM Den of Evil, NM Radament, NM Izual)
			StatPoints: [0, 0, 0, 0, 0, 3, 3, 3, 3, 3],					// st 35+25
			Update: function () {
				
			}
		},

	44:	{
			SkillPoints: [113],											// Concentration + 1 (level 12)
			StatPoints: [0, 0, 0, 0, 0],								// st 40+25
			Update: function () {
				
			}
		},

	45:	{
			SkillPoints: [113],											// Concentration + 1 (level 13)
			StatPoints: [3, 3, 3, 3, 3],								// Vitality + 5 (240)
			Update: function () {
				Config.LowGold = 40000;
			}
		},

	46:	{
			SkillPoints: [113],											// Concentration + 1 (level 14)
			StatPoints: [3, 3, 3, 3, 3],								// Vitality + 5 (245)
			Update: function () {
				
			}
		},

	47:	{
			SkillPoints: [113],											// Concentration + 1 (level 15)
			StatPoints: [0, 0, 0, 0, 0],								// st 45+25
			Update: function () {
				
			}
		},

	48:	{
			SkillPoints: [113],											// Concentration + 1 (level 16)
			StatPoints: [3, 3, 3, 3, 3],								// Vitality + 5 (255)
			Update: function () {
				
			}
		},

	49:	{
			SkillPoints: [113],											// Concentration + 1 (level 17)
			StatPoints: [3, 3, 3, 3, 3],								// Vitality + 5 (260)
			Update: function () {
				
			}
		},

	50:	{
			SkillPoints: [113],											// Concentration + 1 (level 18)
			StatPoints: [3, 3, 3, 3, 3],								// Vitality + 5 (265)
			Update: function () {
				Config.StashGold = 100000;								// Minimum amount of gold to stash.
				Config.Charge = true;									// Should have enough mana to charge while walking now.
				Config.MPBuffer = 4;									// Nightmare has stronger potions.
				Config.HPBuffer = 0;									// Nightmare has stronger potions.
				//Config.BeltColumn = ["hp", "hp", "mp", "rv"];			// Regular potion settings
				Config.MinColumn = [3, 3, 3, 0];						// Regular potion settings
				Config.LowGold = 45000;
			}
		},

	51:	{	
			SkillPoints: [113],											// Concentration + 1 (level 19)
			StatPoints: [3, 3, 3, 3, 3],								// Vitality + 5 (270)
			Update: function () {
				
			}
		},

	52:	{
			SkillPoints: [113],											// Concentration + 1 (level 20)
			StatPoints: [3, 3, 3, 3, 3],								// Vitality + 5 (275)
			Update: function () {
				
			}
		},

	53:	{
			SkillPoints: [115],											// Vigor + 1 (level 2)
			StatPoints: [3, 3, 3, 3, 3],								// Vitality + 5 (280)
			Update: function () {
				
			}
		},

	54:	{
			SkillPoints: [115],											// Vigor + 1 (level 3)
			StatPoints: [3, 3, 3, 3, 3],								// Vitality + 5 (285)
			Update: function () {
				
			}
		},

	55:	{
			SkillPoints: [115],											// Vigor + 1 (level 4)
			StatPoints: [3, 3, 3, 3, 3],								// Vitality + 5 (290)
			Update: function () {
				Config.LowGold = 50000;
			}
		},

	56:	{
			SkillPoints: [115],											// Vigor + 1 (level 5)
			StatPoints: [3, 3, 3, 3, 3],								// Vitality + 5 (295)
			Update: function () {
				
			}
		},

	57:	{
			SkillPoints: [115],											// Vigor + 1 (level 6)
			StatPoints: [3, 3, 3, 3, 3],								// Vitality + 5 (300)
			Update: function () {
				
			}
		},

	58:	{
			SkillPoints: [115],											// Vigor + 1 (level 7)
			StatPoints: [3, 3, 3, 3, 3],								// Vitality + 5 (305)
			Update: function () {
				
			}
		},

	59:	{
			SkillPoints: [115],											// Vigor + 1 (level 8)
			StatPoints: [3, 3, 3, 3, 3],								// Vitality + 5 (310)
			Update: function () {
				
			}
		},

	60:	{
			SkillPoints: [115],											// Vigor + 1 (level 9)
			StatPoints: [3, 3, 3, 3, 3],								// Vitality + 5 (315)
			Update: function () {
				Config.LowGold = 55000;
			}
		},

	61:	{	
			SkillPoints: [115],											// Vigor + 1 (level 10)
			StatPoints: [3, 3, 3, 3, 3],								// Vitality + 5 (320)
			Update: function () {
				
			}
		},

	62:	{
			SkillPoints: [115],											// Vigor + 1 (level 11)
			StatPoints: [3, 3, 3, 3, 3],								// Vitality + 5 (325)
			Update: function () {
				
			}
		},

	63:	{
			SkillPoints: [115],											// Vigor + 1 (level 12)
			StatPoints: [3, 3, 3, 3, 3],								// Vitality + 5 (330)
			Update: function () {
				
			}
		},

	64:	{
			SkillPoints: [115],											// Vigor + 1 (level 13)
			StatPoints: [3, 3, 3, 3, 3],								// Vitality + 5 (335)
			Update: function () {
				
			}
		},

	65:	{
			SkillPoints: [115],											// Vigor + 1 (level 14)
			StatPoints: [3, 3, 3, 3, 3],								// Vitality + 5 (340)
			Update: function () {
				Config.LowGold = 60000;
			}
		},

	66:	{
			SkillPoints: [115],											// Vigor + 1 (level 15)
			StatPoints: [3, 3, 3, 3, 3],								// Vitality + 5 (345)
			Update: function () {
				
			}
		},

	67:	{
			SkillPoints: [115],											// Vigor + 1 (level 16)
			StatPoints: [3, 3, 3, 3, 3],								// Vitality + 5 (350)
			Update: function () {
				
			}
		},

	68:	{
			SkillPoints: [115],											// Vigor + 1 (level 17)
			StatPoints: [3, 3, 3, 3, 3],								// Vitality + 5 (355)
			Update: function () {
				
			}
		},

	69:	{
			SkillPoints: [115],											// Vigor + 1 (level 18)
			StatPoints: [3, 3, 3, 3, 3],								// Vitality + 5 (360)
			Update: function () {
				
			}
		},

	70:	{
			SkillPoints: [115, 108, 108, 108, 108],						// Vigor + 1, Blessed Aim + 4 (level 19) (level 13) (Hell Den of Evil, Hell Radament, Hell Izual)
			StatPoints: [3, 3, 3, 3, 3, 3, 3, 3, 3, 3],					// Vitality + 10 (370) (Hell Lam Esen's Tome)
			Update: function () {
				Config.LowGold = 100000;
			}
		},

	71:	{	
			SkillPoints: [115],											// Vigor + 1 (level 20)
			StatPoints: [3, 3, 3, 3, 3],								// Vitality + 5 (375)
			Update: function () {
				
			}
		},

	72:	{
			SkillPoints: [108],											// Blessed Aim + 1 (level 14)
			StatPoints: [3, 3, 3, 3, 3],								// Vitality + 5 (380)
			Update: function () {
				
			}
		},

	73:	{
			SkillPoints: [108],											// Blessed Aim + 1 (level 15)
			StatPoints: [3, 3, 3, 3, 3],								// Vitality + 5 (385)
			Update: function () {
				
			}
		},

	74:	{
			SkillPoints: [108],											// Blessed Aim + 1 (level 16)
			StatPoints: [3, 3, 3, 3, 3],								// Vitality + 5 (390)
			Update: function () {
				
			}
		},

	75:	{
			SkillPoints: [108],											// Blessed Aim + 1 (level 17)
			StatPoints: [3, 3, 3, 3, 3],								// Vitality + 5 (395)
			Update: function () {
				
			}
		},

	76:	{
			SkillPoints: [108],											// Blessed Aim + 1 (level 18)
			StatPoints: [3, 3, 3, 3, 3],								// Vitality + 5 (400)
			Update: function () {
				
			}
		},

	77:	{
			SkillPoints: [108],											// Blessed Aim + 1 (level 19)
			StatPoints: [3, 3, 3, 3, 3],								// Vitality + 5 (405)
			Update: function () {
				
			}
		},

	78:	{
			SkillPoints: [108],											// Blessed Aim + 1 (level 20)
			StatPoints: [3, 3, 3, 3, 3],								// Vitality + 5 (410)
			Update: function () {
				
			}
		},

	79:	{
			SkillPoints: [117],											// Holy Shield + 1 (level 2)
			StatPoints: [3, 3, 3, 3, 3],								// Vitality + 5 (415)
			Update: function () {
				
			}
		},

	80:	{
			SkillPoints: [117],											// Holy Shield + 1 (level 3)
			StatPoints: [-1, -1, -1, -1, -1],								// Vitality + 5 (420)
			Update: function () {
				Config.Gamble = true;									// Time to spend dat ca$h!!
				Config.ScanShrines = [];
			}
		},

	81:	{	
			SkillPoints: [117],											// Holy Shield + 1 (level 4)
			StatPoints: [-1, -1, -1, -1, -1],								// Vitality + 5 (425)
			Update: function () {
				
			}
		},

	82:	{
			SkillPoints: [117],											// Holy Shield + 1 (level 5)
			StatPoints: [-1, -1, -1, -1, -1],								// Vitality + 5 (430)
			Update: function () {
				
			}
		},

	83:	{
			SkillPoints: [117],											// Holy Shield + 1 (level 6)
			StatPoints: [-1, -1, -1, -1, -1],								// Vitality + 5 (435)
			Update: function () {
				
			}
		},

	84:	{
			SkillPoints: [117],											// Holy Shield + 1 (level 7)
			StatPoints: [-1, -1, -1, -1, -1],								// Vitality + 5 (440)
			Update: function () {
				
			}
		},

	85:	{
			SkillPoints: [117],											// Holy Shield + 1 (level 8)
			StatPoints: [-1, -1, -1, -1, -1],								// Vitality + 5 (445)
			Update: function () {
				
			}
		},

	86:	{
			SkillPoints: [117],											// Holy Shield + 1 (level 9)
			StatPoints: [-1, -1, -1, -1, -1],								// Vitality + 5 (450)
			Update: function () {
				
			}
		},

	87:	{
			SkillPoints: [117],											// Holy Shield + 1 (level 10)
			StatPoints: [-1, -1, -1, -1, -1],								// Vitality + 5 (455)
			Update: function () {
				
			}
		},

	88:	{
			SkillPoints: [117],											// Holy Shield + 1 (level 11)
			StatPoints: [-1, -1, -1, -1, -1],								// Vitality + 5 (460)
			Update: function () {
				
			}
		},

	89:	{
			SkillPoints: [117],											// Holy Shield + 1 (level 12)
			StatPoints: [-1, -1, -1, -1, -1],								// Vitality + 5 (465)
			Update: function () {
				
			}
		},

	90:	{
			SkillPoints: [117],											// Holy Shield + 1 (level 13)
			StatPoints: [-1, -1, -1, -1, -1],								// Vitality + 5 (470)
			Update: function () {
				Config.MPBuffer = 0;									// CS runs, no longer need buffer because of taxi rides!
			}
		},

	91:	{	
			SkillPoints: [117],											// Holy Shield + 1 (level 14)
			StatPoints: [-1, -1, -1, -1, -1],								// Vitality + 5 (475)
			Update: function () {
				
			}
		},

	92:	{
			SkillPoints: [117],											// Holy Shield + 1 (level 15)
			StatPoints: [-1, -1, -1, -1, -1],								// Vitality + 5 (480)
			Update: function () {
				
			}
		},

	93:	{
			SkillPoints: [117],											// Holy Shield + 1 (level 16)
			StatPoints: [-1, -1, -1, -1, -1],								// Vitality + 5 (485)
			Update: function () {
				
			}
		},

	94:	{
			SkillPoints: [117],											// Holy Shield + 1 (level 17)
			StatPoints: [-1, -1, -1, -1, -1],								// Vitality + 5 (490)
			Update: function () {
				
			}
		},

	95:	{
			SkillPoints: [117],											// Holy Shield + 1 (level 18)
			StatPoints: [-1, -1, -1, -1, -1],								// Vitality + 5 (495)
			Update: function () {
				
			}
		},

	96:	{
			SkillPoints: [117],											// Holy Shield + 1 (level 19)
			StatPoints: [-1, -1, -1, -1, -1],								// Vitality + 5 (500)
			Update: function () {
				
			}
		},

	97:	{
			SkillPoints: [117],											// Holy Shield + 1 (level 20)
			StatPoints: [-1,-1,-1,-1,-1],								//
			Update: function () {
				
			}
		},

	98:	{
			SkillPoints: [-1],											//
			StatPoints: [-1,-1,-1,-1,-1],								//
			Update: function () {
				
			}
		},

	99:	{
			SkillPoints: [-1],											//
			StatPoints: [-1,-1,-1,-1,-1],								//
			Update: function () {
				
			}
		}
};