/**
*	@filename	Town.js
*	@author		woodske
*	@desc		follower functions like getting current skills and generating NIP files
*/

js_strict(true);

if (!isIncluded("common/Cubing.js")) { include("common/Cubing.js"); };
if (!isIncluded("common/Prototypes.js")) { include("common/Prototypes.js"); };
if (!isIncluded("common/Runewords.js")) { include("common/Runewords.js"); };
if (!isIncluded("NTItemParser.dbl")) { include("NTItemParser.dbl"); };

var AutoBuildHelper = {

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
	}
};
