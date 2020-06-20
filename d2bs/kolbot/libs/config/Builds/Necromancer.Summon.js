/** Summoner Necromancer Build
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

Finished Char Build:

      Stats                                                    Base Stats
      ------------                                             ----------
      Strength (0) :      15 (no points)                       15
      Energy   (1) :      20 (no points)                       20
      Dexterity(2) :      20 (no points)                       20
      Vitality (3) :      200 (175 points used)                25


      Skills				Levelreq			SkillID			TotalPoints
      ------------		    --------			-------			-----------
      Raise Skeleton		    1				  70				20	- Done @ level 34
      Skeleton Mastery		    1				  69				20	- Done @ level 54
      Teeth					    1				  67				 1	- Done @ level 7
      Amplify Damage			1				  66				 1	- Done @ level 3
      Bone Armor                1                 68                 1  - Done @ level 5
      Weaken 					6				  72				 1  - Done @ level 20
      Clay Golem			    6				  75				 1	 - Done @ level 6
      Corpse Explosion	  	    6				  74				20	 - Done @ level 69
      Golem Mastery  		   12				  79				 1	 - Done @ level 22 
      Raise Skeleton Mage      12		   	      80				20  - Done @ level 93
      Iron Maiden		       12    		      76				 1  - Done @ level 28
      Terror				   12				  77				 1  - Done @ level 21
      Life Tap			       18  			      82				 1  - Done @ level 29
      Blood Golem			   18				  85				 1  - Done @ level 26
      Summon Resist		       24				  89				 1  - Done @ level 24
      Iron Golem			   24				  90				 1  - Done @ level 27
      Decrepify			       24				  87				 1  - Done @ level 24
      Reivive				   30				  95				 7  - Done @ level 99
      Lower Resist		       30				  91				10  - Done @ level 78

--------------------------------------------------------------------------------------

      QUEST SKILL/STAT ALLOCATION:

            Quest         Level Used     
      -----------------	----------			
      Norm Den of Evil         7                 
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

    1: {
        //SkillPoints: [-1],										// This doesn't matter. We don't have skill points to spend at lvl 1]
        //StatPoints: [-1,-1,-1,-1,-1],								// This doesn't matter. We don't have stat points to spend at lvl 1
        Update: function () {
            // Class specific
            Config.PickitFiles.push("Follower/necromancer.xpac.nip");

            Config.AttackSkill = [-1, 0, 0, 0, 0, -1, -1];
            Config.LowManaSkill = [0, 0];
            Config.Skeletons = "max";                           // Number of skeletons to raise. Set to "max" to auto detect, set to 0 to disable.
            Config.SkeletonMages = "max";                       // Number of skeleton mages to raise. Set to "max" to auto detect, set to 0 to disable.
            Config.Revives = "max";                             // Number of revives to raise. Set to "max" to auto detect, set to 0 to disable.
            Config.ActiveSummon = true;                         // Raise dead between each attack. If false, it will raise after clearing a spot.
            Config.ReviveUnstackable = true;                    // Revive monsters that can move freely after you teleport.

            // All followers
            Scripts.Follower = true;
            Config.Leader = "Bindle-sorc";
            Config.QuitList = ["Bindle-sorc"];
            Config.AutoEquip = true;
            Config.TownCheck = false;						    // Don't go to town for more potions
            Config.UseMerc = true;
            Config.PacketShopping = true;
            Config.PacketCasting = 2;
            Config.ClearType = 0;                               // Monster spectype to kill in level clear scripts (0 = all)
            Config.LowGold = 1000;
            Config.StashGold = 500;
            Config.OpenChests = true; 						    // Open chests. Controls key buying.
            Config.ScanShrines = [15, 13, 12, 14, 7, 6, 2, 1];
            Config.BeltColumn = ["hp", "hp", "hp", "mp"];		// Keep tons of health potions!
            Config.Cubing = false;                              // Don't cube yet!
            Config.MakeRunewords = true;
            Config.PublicMode = 2;                              // Accept invites
            Config.LifeChicken = 0;                             // Don't exit games when close to death
            Config.LogLowRunes      = true;
            Config.LogMiddleRunes   = true;
            Config.LocalChat.Enabled = true;                        // enable the LocalChat system
            Config.LocalChat.Mode   = 2;                            // 0 = disabled, 1 = chat from 'say' (recommended), 2 = all chat (for manual play)

            Config.Inventory[0] = [1, 1, 1, 1, 1, 1, 1, 1, 1, 1];
            Config.Inventory[1] = [1, 1, 1, 1, 1, 1, 1, 1, 1, 1];
            Config.Inventory[2] = [1, 1, 1, 1, 1, 1, 1, 1, 1, 1];
            Config.Inventory[3] = [1, 1, 1, 1, 1, 1, 1, 1, 1, 1];

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

    2: {
        SkillPoints: [70], // Raise Skeleton-1
        StatPoints: [0, 0, 0, 0, 0],
        Update: function () {

        }
    },

    3: {
        SkillPoints: [66], // Amplify Damage
        StatPoints: [0, 0, 0, 0, 0],
        Update: function () {
            Config.Dodge = true;
            Config.Curse[0] = 66; // Boss curse.

        }
    },

    4: {
        SkillPoints: [70], // Raise Skeleton-2
        StatPoints: [0, 0, 0, 0, 0],
        Update: function () {
        }
    },

    5: {
        SkillPoints: [68], // Bone Armor
        StatPoints: [3, 3, 3, 0, 0], // Enough Strength for Studded Leather
        Update: function () {

        }
    },

    6: {
        SkillPoints: [75], // Clay Golem
        StatPoints: [3, 3, 3, 3, 1],
        Update: function () {
            Config.Golem = "Clay";

        }
    },

    7: {
        SkillPoints: [67, 70], // Teeth, Raise Skeleton-3 (NORM den)
        StatPoints: [3, 3, 1, 1, 1],
        Update: function () {
        }
    },

    8: {
        SkillPoints: [70], // Raise Skeleton-4
        StatPoints: [3, 3, 3, 1, 1],
        Update: function () {

        }
    },

    9: {
        SkillPoints: [70], // Raise Skeleton-5
        StatPoints: [3, 3, 3, 1, 1],
        Update: function () {

        }
    },

    10: {
        SkillPoints: [70], // Raise Skeleton-6
        StatPoints: [3, 3, 3, 1, 1],
        Update: function () {

        }
    },

    11: {
        SkillPoints: [70], // Raise Skeleton-7
        StatPoints: [1, 1, 1, 1, 1],
        Update: function () {

        }
    },

    12: {
        SkillPoints: [74], // Corpse Explosion-1
        StatPoints: [3, 3, 3, 3, 3],
        Update: function () {
            Config.StashGold = 1000;
            Config.BeltColumn = ["hp", "hp", "mp", "mp"];
            Config.ExplodeCorpses = 74; // Explode corpses. Use skill number or 0 to disable. 74 = Corpse Explosion, 83 = Poison Explosion
            Config.HPBuffer = 4; // Number of healing potions to keep in inventory.
            Config.Curse[1] = 66; // Other monsters curse. Use skill number or set to 0 to disable.
        }
    },

    13: {
        SkillPoints: [80], // Raise Skeleton Mage
        StatPoints: [3, 3, 3, 1, 1],
        Update: function () {

        }
    },

    14: {
        SkillPoints: [70], // Raise Skeleton-8
        StatPoints: [3, 3, 3, 0, 1],
        Update: function () {

        }
    },

    15: {
        SkillPoints: [70], // Raise Skeleton-9
        StatPoints: [3, 3, 3, 0, 1],
        Update: function () {
            Config.HPBuffer = 2; // Number of healing potions to keep in inventory.
            Config.MPBuffer = 8; // Number of mana potions to keep in inventory.
            Config.Dodge = true;
            Config.DodgeRange = 15;
            Config.AttackSkill = [-1, 500, -1, 500, -1, -1, -1];
        }
    },

    16: {
        SkillPoints: [70], // Raise Skeleton-10
        StatPoints: [3, 3, 3, 0, 1],
        Update: function () {
            Config.MinColumn[0] = 1;
            Config.MinColumn[1] = 1;
            Config.MinColumn[2] = 1;
            Config.MinColumn[3] = 1;
        }
    },

    17: {
        SkillPoints: [70], // Raise Skeleton-11
        StatPoints: [3, 3, 3, 0, 1],
        Update: function () {

        }
    },

    18: {
        SkillPoints: [70], // Raise Skeleton-12
        StatPoints: [3, 3, 3, 0, 1],
        Update: function () {
            Config.TownCheck = true; // Go to town if out of potions
        }
    },

    19: {
        SkillPoints: [70], // Raise Skeleton-13
        StatPoints: [3, 3, 3, 0, 1],
        Update: function () {
        }
    },

    20: {
        SkillPoints: [72], // Weaken
        StatPoints: [3, 3, 3, 1, 1],
        Update: function () {
            Config.Curse[1] = -1; // Other monsters curse. Use skill number or set to 0 to disable.
            Config.LowGold = 10000;
        }
    },

    21: {
        SkillPoints: [77], // Terror
        StatPoints: [0, 0, 0, 0, 0],
        Update: function () {
        }
    },

    22: {
        SkillPoints: [79], // Golem Mastery
        StatPoints: [0, 0, 0, 0, 0],
        Update: function () {
        }
    },

    23: {
        SkillPoints: [-1],
        StatPoints: [3, 3, 3, 0, 1],
        Update: function () {

        }
    },

    24: {
        SkillPoints: [87, 89], // Decrepify, Summon Resist
        StatPoints: [3, 3, 3, 0, 1],
        Update: function () {
            Config.Curse[0] = 87; // Boss curse. Use skill number or set to 0 to disable.
            Config.Curse[1] = 87; // Other monsters curse. Use skill number or set to 0 to disable.

            Config.Cubing = true;
            Config.MakeRunewords = true;
            Config.Runewords.push([Runeword.Spirit, ("CrystalSword" || "BroadSword")]);
            Config.Runewords.push([Runeword.Lore, ("Helm" || "FullHelm")]);
            Config.Recipes.push([Recipe.Rune, "Tal Rune"]);
            Config.Recipes.push([Recipe.Rune, "Ral Rune"]);
            Config.Recipes.push([Recipe.Rune, "Ort Rune"]);
            Config.Recipes.push([Recipe.Rune, "Thul Rune"]);
            Config.Recipes.push([Recipe.Rune, "Amn Rune"]);
        }
    },

    25: {
        SkillPoints: [70], // Raise Skeleton-14
        StatPoints: [1, 3, 3, 3, 3],
        Update: function () {
        }
    },

    26: {
        SkillPoints: [85], // Blood Golem
        StatPoints: [1, 3, 3, 3, 3],
        Update: function () {
        }
    },

    27: {
        SkillPoints: [90, 70], // Iron Golem, Raise Skeleton-15 (NORM radament)
        StatPoints: [1, 3, 3, 3, 3],
        Update: function () {
        }
    },

    28: {
        SkillPoints: [76], // Iron Maiden
        StatPoints: [1, 3, 3, 3, 3],
        Update: function () {
        }
    },

    29: {
        SkillPoints: [82], // Life Tap
        StatPoints: [1, 3, 3, 3, 3],
        Update: function () {
        }
    },

    30: {
        SkillPoints: [91, 95, 70], // Lower Resist, Revive-1, Raise Skeleton-16 (NORM izual)
        StatPoints: [1, 3, 3, 3, 3, 3, 3, 3, 3, 3], // (NORM Lam Essen)
        Update: function () {
            Config.Curse[0] = 91; // Boss curse. Use skill number or set to 0 to disable.
            Config.Curse[1] = 91; // Other monsters curse. Use skill number or set to 0 to disable.
            Config.LowGold = 50000;
        }
    },

    31: {
        SkillPoints: [70], // Raise Skeleton-17
        StatPoints: [3, 3, 3, 3, 1],
        Update: function () {
        }
    },

    32: {
        SkillPoints: [70], // Raise Skeleton-18
        StatPoints: [3, 3, 3, 3, 1],
        Update: function () {
        }
    },

    33: {
        SkillPoints: [70], // Raise Skeleton-19
        StatPoints: [3, 3, 3, 3, 1],
        Update: function () {
        }
    },

    34: {
        SkillPoints: [70], // Raise Skeleton-20
        StatPoints: [3, 3, 3, 3, 1],
        Update: function () {
        }
    },

    35: {
        SkillPoints: [69], // Skeleton Mastery-1
        StatPoints: [3, 3, 3, 3, 1],
        Update: function () {
        }
    },

    36: {
        SkillPoints: [69], // Skeleton Mastery-2
        StatPoints: [3, 3, 3, 3, 1],
        Update: function () {

        }
    },

    37: {
        SkillPoints: [69], // Skeleton Mastery-3
        StatPoints: [3, 3, 3, 3, 1],
        Update: function () {

        }
    },

    38: {
        SkillPoints: [69], // Skeleton Mastery-4
        StatPoints: [3, 3, 3, 3, 1],
        Update: function () {
        }
    },

    39: {
        SkillPoints: [69], // Skeleton Mastery-5
        StatPoints: [3, 3, 3, 3, 1],
        Update: function () {
        }
    },

    40: {
        SkillPoints: [69], // Skeleton Mastery-6
        StatPoints: [3, 3, 3, 3, 1],
        Update: function () {
        }
    },

    41: {
        SkillPoints: [69], // Skeleton Mastery-7
        StatPoints: [3, 3, 3, 3, 1],
        Update: function () {
        }
    },

    42: {
        SkillPoints: [69], // Skeleton Mastery-8
        StatPoints: [3, 3, 3, 3, 1],
        Update: function () {
        }
    },

    43: {
        SkillPoints: [69], // Skeleton Mastery-9
        StatPoints: [3, 3, 3, 3, 1],
        Update: function () {
        }
    },

    44: {
        SkillPoints: [69], // Skeleton Mastery-10
        StatPoints: [3, 3, 3, 3, 1],
        Update: function () {
        }
    },

    45: {
        SkillPoints: [69], // Skeleton Mastery-11
        StatPoints: [3, 3, 3, 3, 1],
        Update: function () {
        }
    },

    46: {
        SkillPoints: [69], // Skeleton Mastery-12
        StatPoints: [3, 3, 3, 3, 1],
        Update: function () {
        }
    },

    47: {
        SkillPoints: [69], // Skeleton Mastery-13
        StatPoints: [3, 3, 3, 3, 1],
        Update: function () {
        }
    },

    48: {
        SkillPoints: [69], // Skeleton Mastery-14
        StatPoints: [3, 3, 3, 3, 1],
        Update: function () {
        }
    },

    49: {
        SkillPoints: [69], // Skeleton Mastery-15
        StatPoints: [3, 3, 3, 3, 1],
        Update: function () {
        }
    },

    50: {
        SkillPoints: [69], // Skeleton Mastery-16
        StatPoints: [3, 3, 3, 3, 1],
        Update: function () {
        }
    },

    51: {
        SkillPoints: [69], // Skeleton Mastery-17
        StatPoints: [3, 3, 3, 3, 1],
        Update: function () {
        }
    },

    52: {
        SkillPoints: [69], // Skeleton Mastery-18
        StatPoints: [3, 3, 3, 3, 1],
        Update: function () {
        }
    },

    53: {
        SkillPoints: [69], // Skeleton Mastery-19
        StatPoints: [3, 3, 3, 3, 1],
        Update: function () {
        }
    },

    54: {
        SkillPoints: [69, 74, 74, 74, 74], // Skeleton Mastery-20, Corpse Explosion-5 (NM den, radament, izual)
        StatPoints: [3, 3, 3, 3, 1, 3, 3, 3, 3, 3], // (NM Lam Essen)
        Update: function () {
        }
    },

    55: {
        SkillPoints: [74], // Corpse Explosion-6
        StatPoints: [3, 3, 3, 3, 1],
        Update: function () {
        }
    },

    56: {
        SkillPoints: [74], // Corpse Explosion-7
        StatPoints: [3, 3, 3, 3, 1],
        Update: function () {
        }
    },

    57: {
        SkillPoints: [74], // Corpse Explosion-8
        StatPoints: [3, 3, 3, 3, 1],
        Update: function () {
        }
    },

    58: {
        SkillPoints: [74], // Corpse Explosion-9
        StatPoints: [3, 3, 3, 3, 1],
        Update: function () {
        }
    },

    59: {
        SkillPoints: [74], // Corpse Explosion-10
        StatPoints: [3, 3, 3, 3, 1],
        Update: function () {
        }
    },

    60: {
        SkillPoints: [74], // Corpse Explosion-11
        StatPoints: [3, 3, 3, 3, 1],
        Update: function () {
        }
    },

    61: {
        SkillPoints: [74], // Corpse Explosion-12
        StatPoints: [3, 3, 3, 3, 1],
        Update: function () {
        }
    },

    62: {
        SkillPoints: [74], // Corpse Explosion-13
        StatPoints: [3, 3, 3, 3, 1],
        Update: function () {
        }
    },

    63: {
        SkillPoints: [74], // Corpse Explosion-14
        StatPoints: [3, 3, 3, 3, 1],
        Update: function () {
        }
    },

    64: {
        SkillPoints: [74], // Corpse Explosion-15
        StatPoints: [3, 3, 3, 3, 1],
        Update: function () {
        }
    },

    65: {
        SkillPoints: [74], // Corpse Explosion-16
        StatPoints: [3, 3, 3, 3, 1],
        Update: function () {
        }
    },

    66: {
        SkillPoints: [74], // Corpse Explosion-17
        StatPoints: [3, 3, 3, 3, 1],
        Update: function () {
        }
    },

    67: {
        SkillPoints: [74], // Corpse Explosion-18
        StatPoints: [3, 3, 3, 3, 1],
        Update: function () {
        }
    },

    68: {
        SkillPoints: [74], // Corpse Explosion-19 
        StatPoints: [3, 3, 3, 3, 1],
        Update: function () {
        }
    },

    69: {
        SkillPoints: [74], // Corpse Explosion-20
        StatPoints: [3, 3, 3, 3, 1],
        Update: function () {
        }
    },

    70: {
        SkillPoints: [91], // Lower Resist-2
        StatPoints: [3, 3, 3, 3, 1],
        Update: function () {
        }
    },

    71: {
        SkillPoints: [91], // Lower Resist-3
        StatPoints: [3, 3, 3, 3, 1],
        Update: function () {
        }
    },

    72: {
        SkillPoints: [91], // Lower Resist-4
        StatPoints: [3, 3, 3, 3, 1],
        Update: function () {
        }
    },

    73: {
        SkillPoints: [91], // Lower Resist-5
        StatPoints: [3, 3, 3, 3, 1],
        Update: function () {
        }
    },

    74: {
        SkillPoints: [91], // Lower Resist-6
        StatPoints: [3, 3, 3, 3, 1],
        Update: function () {
        }
    },

    75: {
        SkillPoints: [91], // Lower Resist-7
        StatPoints: [3, 3, 3, 3, 1],
        Update: function () {
        }
    },

    76: {
        SkillPoints: [91], // Lower Resist-8
        StatPoints: [3, 3, 3, 3, 1],
        Update: function () {
        }
    },

    77: {
        SkillPoints: [91], // Lower Resist-9
        StatPoints: [3, 3, 3, 3, 1],
        Update: function () {
        }
    },

    78: {
        SkillPoints: [91], // Lower Resist-10
        StatPoints: [3, 3, 3, 3, 1],
        Update: function () {
        }
    },

    79: {
        SkillPoints: [80, 80, 80, 80, 80], // Skeleton Mage-6 (HELL den, radament, izual)
        StatPoints: [3, 3, 3, 3, 1, 3, 3, 3, 3, 3], // (HELL Lam Essen)
        Update: function () {
        }
    },

    80: {
        SkillPoints: [80], // Skeleton Mage-7
        StatPoints: [3, 3, 3, 3, 1],
        Update: function () {
        }
    },

    81: {
        SkillPoints: [80], // Skeleton Mage-8
        StatPoints: [3, 3, 3, 3, 1],
        Update: function () {
        }
    },

    82: {
        SkillPoints: [80], // Skeleton Mage-9
        StatPoints: [3, 3, 3, 3, 1],
        Update: function () {
        }
    },

    83: {
        SkillPoints: [80], // Skeleton Mage-10
        StatPoints: [3, 3, 3, 3, 1],
        Update: function () {
            ;
        }
    },

    84: {
        SkillPoints: [80], // Skeleton Mage-11
        StatPoints: [3, 3, 3, 3, 1],
        Update: function () {

        }
    },

    85: {
        SkillPoints: [80], // Skeleton Mage-12
        StatPoints: [3, 3, 3, 3, 1],
        Update: function () {

        }
    },

    86: {
        SkillPoints: [80], // Skeleton Mage-13
        StatPoints: [3, 3, 3, 3, 1],
        Update: function () {

        }
    },

    87: {
        SkillPoints: [80], // Skeleton Mage-14
        StatPoints: [3, 3, 3, 3, 1],
        Update: function () {

        }
    },

    88: {
        SkillPoints: [80], // Skeleton Mage-15
        StatPoints: [3, 3, 3, 3, 1],
        Update: function () {

        }
    },

    89: {
        SkillPoints: [80], // Skeleton Mage-16
        StatPoints: [3, 3, 3, 3, 1],
        Update: function () {

        }
    },

    90: {
        SkillPoints: [80], // Skeleton Mage-17
        StatPoints: [3, 3, 3, 3, 1],
        Update: function () {

        }
    },

    91: {
        SkillPoints: [80], // Skeleton Mage-18
        StatPoints: [3, 3, 3, 3, 1],
        Update: function () {

        }
    },

    92: {
        SkillPoints: [80], // Skeleton Mage-19
        StatPoints: [3, 3, 3, 3, 1],
        Update: function () {

        }
    },

    93: {
        SkillPoints: [80], // Skeleton Mage-20
        StatPoints: [3, 3, 3, 3, 1],
        Update: function () {

        }
    },

    94: {
        SkillPoints: [95], // Revive-2
        StatPoints: [3, 3, 3, 3, 1],
        Update: function () {

        }
    },

    95: {
        SkillPoints: [95], // Revive-3
        StatPoints: [3, 3, 3, 3, 1],
        Update: function () {

        }
    },

    96: {
        SkillPoints: [95], // Revive-4
        StatPoints: [3, 3, 3, 3, 1],
        Update: function () {

        }
    },

    97: {
        SkillPoints: [95], // Revive-5
        StatPoints: [3, 3, 3, 3, 1],
        Update: function () {

        }
    },

    98: {
        SkillPoints: [95], // Revive-6
        StatPoints: [3, 3, 3, 3, 1],
        Update: function () {

        }
    },

    99: {
        SkillPoints: [95], // Revive-7
        StatPoints: [3, 3, 3, 3, 1],
        Update: function () {

        }
    }
};