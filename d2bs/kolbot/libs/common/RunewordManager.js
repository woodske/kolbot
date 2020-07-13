/* eslint-disable no-undef */
/**
*	@filename	RunewordManager.js
*	@author		woodske
*	@desc		follower functions like getting current skills and generating NIP files
*/

js_strict(true);

if (!isIncluded("common/Cubing.js")) { include("common/Cubing.js"); };
if (!isIncluded("common/Prototypes.js")) { include("common/Prototypes.js"); };
if (!isIncluded("common/Runewords.js")) { include("common/Runewords.js"); };
if (!isIncluded("NTItemParser.dbl")) { include("NTItemParser.dbl"); };

/*
	These are some arrays of commonly used equipment
*/

var elite_light_armor = ["duskshroud", "wyrmhide", "scarabhusk", "wirefleece", "greathauberk", "archonplate"];
var elite_merc_polearms = ["thresher", "crypticaxe", "greatpoleaxe", "giantthresher"];
var exceptional_bows = ["razorbow", "cedarbow", "doublebow", "shortsiegebow", "largesiegebow", "runebow", "gothicbow"];
var exceptional_bows_amazon = ["ashwoodbow", "ceremonialbow"];

var RunewordManager = {

	// Returns true if character has skill
	hasSkill: function (skillId) {
		return me.getSkill(skillId, 1);
	},

	/*
	runeword: Array of numbers (i.e. Runeword.Insight)
	equipment: Array of strings (i.e. ["poleaxe", "halberd"])

	Removes runewords from Config
	*/
	unloadRuneword: function (runeword, equipment) {

		for (var i = 0; i < Config.Runewords.length; i++) {
			if (Config.Runewords[i][0] === runeword) {
				for (var j = 0; j < equipment.length; j++) {
					if (Config.Runewords[i][1] === equipment[j]) {
						Config.Runewords.splice(i, 1);
					}
				}
			}
		}
	},

	/*
		runeword: Array of numbers (i.e. Runeword.Insight)
		equipment: Array of strings (i.e. ["poleaxe", "halberd"])

		Adds runewords to Config
	*/
	loadRuneword: function (runeword, equipment) {

		for (var i = 0; i < equipment.length; i++) {
			Config.Runewords.push([runeword, equipment[i]]);
		}
	},

	// Gets body location on char or merc
	getBodyLocation: function (itemType) {
		switch (itemType) {
		case "helm":
			return 1;
		case "armor":
			return 3;
		case "weapon":
			return 4;
		case "shield":
			return 5;
		default:
			print("Invalid item type");

			return false;
		}
	},

	// Generates item description text for nip file
	generateNipFileText: function (nipConfig) {
		var i,
			nipText = '(',
			equipment = nipConfig.name[1];

		for (i = 0; i < equipment.length; i++) {
			nipText += '[name] ' + nipConfig.name[0] + ' ' + equipment[i] + ' || ';
		}

		// Trim last 4 characters off
		nipText = nipText.substring(0, nipText.length - 4);
		nipText += ') && ' + nipConfig.type;

		return nipText;
	},

	// Generates nip file path based on character name and runeword
	getNipFilePath: function (runewordName) {
		var basePath = 'pickit/Follower/',
			pickitSuffix = '-' + me.name + '.nip';

		return basePath + runewordName + pickitSuffix;
	},

	// Removes pickit affix from file path
	getPickitFile: function (nipFilePath) {
		return nipFilePath.substring(7, nipFilePath.length);
	},

	// Determines if character should make runeword
	makeRuneword: function (tierCheck) {
		var result,
			charNipFile = tierCheck.charNipFile,
			mercNipFile = tierCheck.mercNipFile,
			isMerc = tierCheck.isMerc,
			tier = tierCheck.tier,
			bodyLocation = this.getBodyLocation(tierCheck.itemType),
			itemTier = null;

		if (isMerc) {
			if (me.getMerc()) {
				NTIP.OpenFile(mercNipFile, false);
				itemTier = Item.getEquippedItemMerc(bodyLocation).tier;
			} else {
				return false;
			}
		} else {
			NTIP.OpenFile(charNipFile, false);
			itemTier = Item.getEquippedItem(bodyLocation).tier;
		}

		if (itemTier < tier) {
			result = true;
		} else {
			result = false;
		}

		NTIP.Clear();

		return result;
	},

	handleRunewords: function (nipFileName, runewordConfig, nipConfig, tierCheck) {
		var nipFilePath = this.getNipFilePath(nipFileName);
		var makeRuneword = this.makeRuneword(tierCheck);
		var blankFilePath = 'pickit/Follower/blank.nip';

		if (!makeRuneword) {
			print('No longer making ' + nipFileName);
			this.unloadRuneword(runewordConfig.runes, runewordConfig.equipment);

			// Remove nip file if it exists
			if (FileTools.exists(nipFilePath)) {
				FileTools.remove(nipFilePath);
			}
		} else {
			print('Making ' + nipFileName);
			this.loadRuneword(runewordConfig.runes, runewordConfig.equipment);
			Config.KeepRunewords.push(runewordConfig.runewordKeep);

			// Generate and populate the nip file
			if (!FileTools.exists(nipFilePath)) {
				FileTools.copy(blankFilePath, nipFilePath);

				FileTools.appendText(nipFilePath, "//" + nipFileName + " pickit\n");
				FileTools.appendText(nipFilePath, this.generateNipFileText(nipConfig));

				// Add items to pickit for recipes
				FileTools.appendText(nipFilePath, "\n\n//---Recipe pickit---\n");

				for (i = 0; i < runewordConfig.recipePickit.length; i++) {
					FileTools.appendText(nipFilePath, runewordConfig.recipePickit[i] + "\n");
				}
			}

			var i;

			// Load recipes
			for (i = 0; i < runewordConfig.recipes.length; i++) {
				Config.Recipes.push(runewordConfig.recipes[i]);
			}

			Config.PickitFiles.push(this.getPickitFile(nipFilePath));
		}
	},

	// Entry point to runeword manager. Generates pickit and pushes recipes based on character's equipped items.
	manageRunewords: function (charPickit, mercPickit, runewords, isPaladin) {

		this.getMercRunewords(charPickit, mercPickit, runewords);
		this.getCharRunewords(charPickit, mercPickit, runewords, isPaladin);

	},

	getMercRunewords: function (charPickit, mercPickit, runewords) {
		var nipFileName,
			runewordConfig,
			nipConfig,
			tierCheck;

		for (var i = 0; i < runewords.length; i++) {
			switch (runewords[i]) {
			// --- InsightMerc ---
			case "InsightMerc":
				nipFileName = 'low-insightmerc';
				runewordConfig = {
					runes: Runeword.Insight,
					runewordKeep: "[type] == polearm # [meditationaura] <= 17",
					equipment: ["poleaxe", "halberd", "bill", "battlescythe", "partizan", "becdecorbin", "thresher", "crypticaxe", "greatpoleaxe"],
					recipes: [],
					recipePickit: []
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

				this.handleRunewords(nipFileName, runewordConfig, nipConfig, tierCheck);

				nipFileName = 'high-insightmerc';
				runewordConfig = {
					runes: Runeword.Insight,
					runewordKeep: "[type] == polearm # [meditationaura] <= 17",
					equipment: elite_merc_polearms,
					recipes: [[Recipe.Socket.Weapon, "Thresher", Roll.Eth]],
					recipePickit: ["[name] == thresher && [quality] == normal && [flag] == ethereal # [sockets] == 0 # [maxquantity] == 1"]
				};
				nipConfig = {
					name: ['==', runewordConfig.equipment],
					type: '[quality] <= superior && [flag] == ethereal # [sockets] == 4 # [MaxQuantity] == 1'
				};
				tierCheck = {
					charNipFile: "pickit/" + charPickit,
					mercNipFile: "pickit/" + mercPickit,
					isMerc: true,
					tier: 100,
					itemType: "weapon"
				};

				this.handleRunewords(nipFileName, runewordConfig, nipConfig, tierCheck);

				break;

			// --- TreacheryMerc ---
			case "TreacheryMerc":
				nipFileName = 'low-treacherymerc';
				runewordConfig = {
					runes: Runeword.Treachery,
					runewordKeep: "[type] == armor # [assassinskills] == 2",
					equipment: ["trellisedarmor", "linkedmail", "tigulatedmail", "cuirass", "mesharmor", "russetarmor", "mageplate", "sharktootharmor", "templarcoat", "embossedplate"],
					recipes: [],
					recipePickit: []
				};
				nipConfig = {
					name: ['==', runewordConfig.equipment],
					type: '[quality] <= superior # [sockets] == 3 # [MaxQuantity] == 1'
				};
				tierCheck = {
					charNipFile: "pickit/" + charPickit,
					mercNipFile: "pickit/" + mercPickit,
					isMerc: true,
					tier: 50,
					itemType: "armor"
				};

				this.handleRunewords(nipFileName, runewordConfig, nipConfig, tierCheck);

				nipFileName = 'high-treacherymerc';
				runewordConfig = {
					runes: Runeword.Treachery,
					runewordKeep: "[type] == armor # [assassinskills] == 2",
					equipment: elite_light_armor,
					recipes: [[Recipe.Socket.Armor, "Dusk Shroud", Roll.Eth], [Recipe.Socket.Armor, "Archon Plate", Roll.Eth], [Recipe.Socket.Armor, "Scarab Husk", Roll.Eth]],
					recipePickit: ["([name] == duskshroud  || [name] == archonplate || [name] == scarabhusk) && [quality] == normal && [flag] == ethereal # [sockets] == 0 # [maxquantity] == 1"]
				};
				nipConfig = {
					name: ['==', runewordConfig.equipment],
					type: '[quality] <= superior && [flag] == ethereal # [sockets] == 3 # [MaxQuantity] == 1'
				};
				tierCheck = {
					charNipFile: "pickit/" + charPickit,
					mercNipFile: "pickit/" + mercPickit,
					isMerc: true,
					tier: 100,
					itemType: "armor"
				};

				this.handleRunewords(nipFileName, runewordConfig, nipConfig, tierCheck);

				break;

			// --- InfinityMerc ---
			case "InfinityMerc":
				nipFileName = 'infinitymerc';
				runewordConfig = {
					runes: Runeword.Infinity,
					runewordKeep: "[name] == thresher # [frw] == 35 && [itemcrushingblow] == 40 && [itemmagicbonus] == 30",
					equipment: ["thresher"],
					recipes: [[Recipe.Socket.Weapon, "Thresher", Roll.Eth], [Recipe.Rune, "Ohm Rune"], [Recipe.Rune, "Lo Rune"], [Recipe.Rune, "Sur Rune"]],
					recipePickit: ["[name] == thresher && [quality] == normal && [flag] == ethereal # [sockets] == 0 # [maxquantity] == 1"]
				};
				nipConfig = {
					name: ['==', runewordConfig.equipment],
					type: '[quality] <= superior && [flag] == ethereal # [sockets] == 4 # [MaxQuantity] == 1'
				};
				tierCheck = {
					charNipFile: "pickit/" + charPickit,
					mercNipFile: "pickit/" + mercPickit,
					isMerc: true,
					tier: 101,
					itemType: "weapon"
				};

				this.handleRunewords(nipFileName, runewordConfig, nipConfig, tierCheck);

				break;

			// --- PrideMerc ---
			case "PrideMerc":
				nipFileName = 'pridemerc';
				runewordConfig = {
					runes: Runeword.Pride,
					runewordKeep: "[type] == polearm # [concentrationaura] <= 20",
					equipment: elite_merc_polearms,
					recipes: [[Recipe.Socket.Weapon, "Thresher", Roll.Eth], [Recipe.Socket.Weapon, "Cryptic Axe", Roll.Eth], [Recipe.Socket.Weapon, "Great Poleaxe", Roll.Eth], [Recipe.Socket.Weapon, "Giant Thresher", Roll.Eth]],
					recipePickit: ["[name] >= thresher && [name] <= giantthresher && [quality] == normal && [flag] == ethereal # [sockets] == 0 # [maxquantity] == 1"]
				};
				nipConfig = {
					name: ['==', runewordConfig.equipment],
					type: '[quality] <= superior && [flag] == ethereal # [sockets] == 4 # [MaxQuantity] == 1'
				};
				tierCheck = {
					charNipFile: "pickit/" + charPickit,
					mercNipFile: "pickit/" + mercPickit,
					isMerc: true,
					tier: 101,
					itemType: "weapon"
				};

				this.handleRunewords(nipFileName, runewordConfig, nipConfig, tierCheck);

				break;

			default:
			}
		}
	},

	getCharRunewords: function (charPickit, mercPickit, runewords, isPaladin) {
		var nipFileName,
			runewordConfig,
			nipConfig,
			tierCheck;

		for (var i = 0; i < runewords.length; i++) {
			switch (runewords[i]) {

			/*
				ARMORS
			*/

			// --- Stealth ---
			case "Stealth":
				nipFileName = 'stealth';
				runewordConfig = {
					runes: Runeword.Stealth,
					runewordKeep: "[type] == armor # [frw] == 25 && [fcr] == 25",
					equipment: ["quiltedarmor", "hardleatherarmor", "leatherarmor"],
					recipes: [],
					recipePickit: []
				};
				nipConfig = {
					name: ['==', runewordConfig.equipment],
					type: '[quality] <= superior && [flag] != ethereal # [sockets] == 2 # [MaxQuantity] == 1'
				};
				tierCheck = {
					charNipFile: "pickit/" + charPickit,
					mercNipFile: "pickit/" + mercPickit,
					isMerc: false,
					tier: 50,
					itemType: "armor"
				};

				this.handleRunewords(nipFileName, runewordConfig, nipConfig, tierCheck);

				break;

			// --- Smoke ---
			case "Smoke":
				nipFileName = 'smoke';
				runewordConfig = {
					runes: Runeword.Smoke,
					runewordKeep: "[type] == armor # [FireResist] == 50 && [LightResist] == 50",
					equipment: ["lightplate", "ghostarmor", "serpentskinarmor", "demonhidearmor", "cuirass", "mageplate", "duskShroud", "wyrmhide", "scarabHusk", "wireFleece", "greatHauberk", "archonPlate"],
					recipes: [],
					recipePickit: []
				};
				nipConfig = {
					name: ['==', runewordConfig.equipment],
					type: '[quality] <= superior && [flag] != ethereal # [sockets] == 2 # [MaxQuantity] == 1'
				};
				tierCheck = {
					charNipFile: "pickit/" + charPickit,
					mercNipFile: "pickit/" + mercPickit,
					isMerc: false,
					tier: 51,
					itemType: "armor"
				};

				this.handleRunewords(nipFileName, runewordConfig, nipConfig, tierCheck);

				break;

			// --- Treachery ---
			case "Treachery":
				nipFileName = 'treachery';
				runewordConfig = {
					runes: Runeword.Treachery,
					runewordKeep: "[type] == armor # [assassinskills] == 2",
					equipment: elite_light_armor,
					recipes: [],
					recipePickit: []
				};
				nipConfig = {
					name: ['==', runewordConfig.equipment],
					type: '[quality] <= superior # [sockets] == 3 # [MaxQuantity] == 1'
				};
				tierCheck = {
					charNipFile: "pickit/" + charPickit,
					mercNipFile: "pickit/" + mercPickit,
					isMerc: false,
					tier: 52,
					itemType: "armor"
				};

				this.handleRunewords(nipFileName, runewordConfig, nipConfig, tierCheck);

				break;

			// --- Fortitude ---
			case "Fortitude":
				nipFileName = 'fortitude';
				runewordConfig = {
					runes: Runeword.Fortitude,
					runewordKeep: "[type] == armor # [enhanceddamage] == 300",
					equipment: elite_light_armor,
					recipes: [],
					recipePickit: []
				};
				nipConfig = {
					name: ['==', runewordConfig.equipment],
					type: '[quality] <= superior # [sockets] == 4 # [MaxQuantity] == 1'
				};
				tierCheck = {
					charNipFile: "pickit/" + charPickit,
					mercNipFile: "pickit/" + mercPickit,
					isMerc: false,
					tier: 101,
					itemType: "armor"
				};

				this.handleRunewords(nipFileName, runewordConfig, nipConfig, tierCheck);

				break;

			/*
				SHIELDS
			*/

			// --- Ancient's Pledge ---
			case "Ancient's Pledge":
				if (!isPaladin) {
					nipFileName = 'ancientspledge';
					runewordConfig = {
						runes: Runeword.AncientsPledge,
						runewordKeep: "[type] == shield && [flag] == runeword # [fireresist] >= 40 && [lightresist] >= 40",
						equipment: ["kiteshield", "largeshield", "boneshield"],
						recipes: [],
						recipePickit: []
					};
					nipConfig = {
						name: ['==', runewordConfig.equipment],
						type: '[quality] <= superior && [flag] != ethereal # [sockets] == 3 # [MaxQuantity] == 1'
					};
					tierCheck = {
						charNipFile: "pickit/" + charPickit,
						mercNipFile: "pickit/" + mercPickit,
						isMerc: false,
						tier: 50,
						itemType: "shield"
					};

					this.handleRunewords(nipFileName, runewordConfig, nipConfig, tierCheck);
				} else {
					nipFileName = 'ancientspledge';
					runewordConfig = {
						runes: Runeword.AncientsPledge,
						runewordKeep: "[type] == auricshields && [flag] == runeword # [fireresist] >= 40 && [lightresist] >= 40",
						equipment: ["targe", "rondache", "aerinshield", "crownshield", "royalshield"],
						recipes: [],
						recipePickit: []
					};
					nipConfig = {
						name: ['==', runewordConfig.equipment],
						type: '[quality] <= superior && [flag] != ethereal # [sockets] == 3 # [MaxQuantity] == 1'
					};
					tierCheck = {
						charNipFile: "pickit/" + charPickit,
						mercNipFile: "pickit/" + mercPickit,
						isMerc: false,
						tier: 50,
						itemType: "shield"
					};

					RunewordManager.handleRunewords(nipFileName, runewordConfig, nipConfig, tierCheck);
				}

				break;

			// --- Spirit Shield ---
			case "Spirit Shield":
				if (!isPaladin) {
					nipFileName = 'low-spiritshield';
					runewordConfig = {
						runes: Runeword.Spirit,
						runewordKeep: "[type] == shield # [fcr] <= 35",
						equipment: ["Monarch"],
						recipes: [[Recipe.Socket.Shield, "Monarch", Roll.NonEth]],
						recipePickit: []
					};
					nipConfig = {
						name: ['==', runewordConfig.equipment],
						type: '[quality] <= superior && [flag] != ethereal # ([sockets] == 4 || [sockets] == 0) # [MaxQuantity] == 1'
					};
					tierCheck = {
						charNipFile: "pickit/" + charPickit,
						mercNipFile: "pickit/" + mercPickit,
						isMerc: false,
						tier: 51,
						itemType: "shield"
					};

					this.handleRunewords(nipFileName, runewordConfig, nipConfig, tierCheck);

					nipFileName = 'high-spiritshield';
					runewordConfig = {
						runes: Runeword.Spirit,
						runewordKeep: "[type] == shield # [fcr] == 35",
						equipment: ["Monarch"],
						recipes: [[Recipe.Socket.Shield, "Monarch", Roll.NonEth]],
						recipePickit: []
					};
					nipConfig = {
						name: ['==', runewordConfig.equipment],
						type: '[quality] <= superior && [flag] != ethereal # ([sockets] == 4 || [sockets] == 0) # [MaxQuantity] == 1'
					};
					tierCheck = {
						charNipFile: "pickit/" + charPickit,
						mercNipFile: "pickit/" + mercPickit,
						isMerc: false,
						tier: 100,
						itemType: "shield"
					};

					this.handleRunewords(nipFileName, runewordConfig, nipConfig, tierCheck);
				} else {
					nipFileName = 'low-spiritshield';
					runewordConfig = {
						runes: Runeword.Spirit,
						runewordKeep: "[type] == auricshields # [fcr] >= 25 && [fhr] >= 55",
						equipment: ["targe", "rondache", "aerinshield", "heraldicshield", "crownshield", "royalshield", "akarantarge", "akaranrondache", "protectorshield", "SacredTarge"],
						recipes: [],
						recipePickit: []
					};
					nipConfig = {
						name: ['==', runewordConfig.equipment],
						type: '[quality] <= superior && [flag] != ethereal # [sockets] == 4 # [MaxQuantity] == 1'
					};
					tierCheck = {
						charNipFile: "pickit/" + charPickit,
						mercNipFile: "pickit/" + mercPickit,
						isMerc: false,
						tier: 51,
						itemType: "shield"
					};

					RunewordManager.handleRunewords(nipFileName, runewordConfig, nipConfig, tierCheck);

					nipFileName = 'mid-spiritshield';
					runewordConfig = {
						runes: Runeword.Spirit,
						runewordKeep: "[type] == auricshields # [fcr] == 35 && [fhr] >= 55",
						equipment: ["targe", "rondache", "aerinshield", "heraldicshield", "crownshield", "akarantarge", "akaranrondache", "protectorshield", "SacredTarge"],
						recipes: [],
						recipePickit: []
					};
					nipConfig = {
						name: ['==', runewordConfig.equipment],
						type: '[quality] <= superior && [flag] != ethereal # [sockets] == 4 && [fireresist] >= 20 # [MaxQuantity] == 1'
					};
					tierCheck = {
						charNipFile: "pickit/" + charPickit,
						mercNipFile: "pickit/" + mercPickit,
						isMerc: false,
						tier: 52,
						itemType: "shield"
					};

					RunewordManager.handleRunewords(nipFileName, runewordConfig, nipConfig, tierCheck);

					nipFileName = 'high-spiritshield';
					runewordConfig = {
						runes: Runeword.Spirit,
						runewordKeep: "[type] == auricshields # [fcr] == 35 && [fhr] >= 55",
						equipment: ["SacredTarge"],
						recipes: [[Recipe.Socket.Shield, "Sacred Targe", Roll.NonEth]],
						recipePickit: ["[name] == SacredTarge && [quality] == normal && [flag] != ethereal # [sockets] == 0 && [fireresist] == 45 # [maxquantity] == 1"]
					};
					nipConfig = {
						name: ['==', runewordConfig.equipment],
						type: '[quality] <= superior && [flag] != ethereal # [sockets] == 4 && [fireresist] == 45 # [MaxQuantity] == 1'
					};
					tierCheck = {
						charNipFile: "pickit/" + charPickit,
						mercNipFile: "pickit/" + mercPickit,
						isMerc: false,
						tier: 100,
						itemType: "shield"
					};

					RunewordManager.handleRunewords(nipFileName, runewordConfig, nipConfig, tierCheck);
				}

				break;

			/*
				HELMS
			*/

			// --- Lore ---
			case "Lore":
				nipFileName = 'lore';
				runewordConfig = {
					runes: Runeword.Lore,
					runewordKeep: "[type] == helm # [LightResist] >= 25",
					equipment: ["cap", "skullcap", "crown", "mask", "bonehelm", "warhat", "grimhelm", "GrandCrown", "Demonhead", "BoneVisage"],
					recipes: [],
					recipePickit: []
				};
				nipConfig = {
					name: ['==', runewordConfig.equipment],
					type: '[quality] <= superior && [flag] != ethereal # [sockets] == 2 # [MaxQuantity] == 1'
				};
				tierCheck = {
					charNipFile: "pickit/" + charPickit,
					mercNipFile: "pickit/" + mercPickit,
					isMerc: false,
					tier: 50,
					itemType: "helm"
				};

				this.handleRunewords(nipFileName, runewordConfig, nipConfig, tierCheck);

				break;

			/*
				WEAPONS
			*/

			// --- Spirit Sword ---
			case "Spirit Sword":
				nipFileName = 'low-spiritsword';
				runewordConfig = {
					runes: Runeword.Spirit,
					runewordKeep: "[type] == sword # [itemallskills] == 2  && [fcr] >= 25",
					equipment: ["broadsword", "crystalSword"],
					recipes: [],
					recipePickit: []
				};
				nipConfig = {
					name: ['==', runewordConfig.equipment],
					type: '[quality] <= superior && [flag] != ethereal # [sockets] == 4 # [MaxQuantity] == 1'
				};
				tierCheck = {
					charNipFile: "pickit/" + charPickit,
					mercNipFile: "pickit/" + mercPickit,
					isMerc: false,
					tier: 50,
					itemType: "weapon"
				};

				this.handleRunewords(nipFileName, runewordConfig, nipConfig, tierCheck);

				nipFileName = 'high-spiritsword';
				runewordConfig = {
					runes: Runeword.Spirit,
					runewordKeep: "[type] == sword # [itemallskills] == 2  && [fcr] == 35",
					equipment: ["broadsword", "crystalSword"],
					recipes: [],
					recipePickit: []
				};
				nipConfig = {
					name: ['==', runewordConfig.equipment],
					type: '[quality] <= superior # [sockets] == 4 # [MaxQuantity] == 1'
				};
				tierCheck = {
					charNipFile: "pickit/" + charPickit,
					mercNipFile: "pickit/" + mercPickit,
					isMerc: false,
					tier: 51,
					itemType: "weapon"
				};

				this.handleRunewords(nipFileName, runewordConfig, nipConfig, tierCheck);

				break;

			// --- Hoto ---
			case "Hoto":
				nipFileName = 'low-hoto';
				runewordConfig = {
					runes: Runeword.HeartoftheOak,
					runewordKeep: "[name] == flail # [itemallskills] == 3 && [fireresist] >= 30",
					equipment: ["flail"],
					recipes: [[Recipe.Rune, "Gul Rune"]],
					recipePickit: []
				};
				nipConfig = {
					name: ['==', runewordConfig.equipment],
					type: '[quality] <= superior # [sockets] == 4 # [MaxQuantity] == 1'
				};
				tierCheck = {
					charNipFile: "pickit/" + charPickit,
					mercNipFile: "pickit/" + mercPickit,
					isMerc: false,
					tier: 100,
					itemType: "weapon"
				};

				RunewordManager.handleRunewords(nipFileName, runewordConfig, nipConfig, tierCheck);

				nipFileName = 'high-hoto';
				runewordConfig = {
					runes: Runeword.HeartoftheOak,
					runewordKeep: "[name] == flail # [itemallskills] == 3 && [fireresist] == 40",
					equipment: ["flail"],
					recipes: [[Recipe.Rune, "Gul Rune"]],
					recipePickit: []
				};
				nipConfig = {
					name: ['==', runewordConfig.equipment],
					type: '[quality] <= superior # [sockets] == 4 # [MaxQuantity] == 1'
				};
				tierCheck = {
					charNipFile: "pickit/" + charPickit,
					mercNipFile: "pickit/" + mercPickit,
					isMerc: false,
					tier: 101,
					itemType: "weapon"
				};

				RunewordManager.handleRunewords(nipFileName, runewordConfig, nipConfig, tierCheck);

				break;

			// --- Harmony ---
			case "Harmony":
				nipFileName = 'harmony';
				runewordConfig = {
					runes: Runeword.Harmony,
					runewordKeep: "[type] == amazonbow || [type] == bow # [enhanceddamage] >= 200 && [dexterity] == 10",
					equipment: exceptional_bows.concat(exceptional_bows_amazon),
					recipes: [],
					recipePickit: []
				};
				nipConfig = {
					name: ['==', runewordConfig.equipment],
					type: '[quality] <= superior # [sockets] == 4 # [MaxQuantity] == 1'
				};
				tierCheck = {
					charNipFile: "pickit/" + charPickit,
					mercNipFile: "pickit/" + mercPickit,
					isMerc: false,
					tier: 50,
					itemType: "weapon"
				};

				RunewordManager.handleRunewords(nipFileName, runewordConfig, nipConfig, tierCheck);

				break;

			default:
			}
		}
	}
};

