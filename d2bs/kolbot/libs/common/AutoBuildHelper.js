/**
*	@filename	Town.js
*	@author		woodske
*	@desc		follower functions like getting current skills and generating NIP files
*/

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
	stopMakingRuneword: function (runeword, equipment) {

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
	makeRuneword: function (runeword, equipment) {

		for (var i = 0; i < equipment.length; i++) {
			Config.Runewords.push([runeword, equipment[i]]);
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

	// Determines if character or merc has runeword equipped
	hasRuneword: function (runeword, isMerc, levelRequired) {
		var merc,
			runewordItem = null;

		if (isMerc) {
			merc = me.getMerc();

			if (merc && merc.itemcount > 0) {
				runewordItem = merc.getItems().filter(i => (i.getFlag(0x4000000) && i.fname.contains(runeword)))[0];
			}
		} else {
			runewordItem = me.getItems().filter(i => (i.getFlag(0x4000000) && i.fname.contains(runeword)))[0];
		}

		if (levelRequired && runewordItem) {
			if (runewordItem.lvlreq >= levelRequired) {
				return true;
			} else {
				return false;
			}
		}

		return !!runewordItem;
	},

	handleRunewords: function (nipFileType, runeword, runewordKeep, equipment, nipConfig, forMerc, levelRequired) {
		var nipFilePath = this.getNipFilePath(nipFileType);
		var hasRuneword = this.hasRuneword(runeword, forMerc, levelRequired);
		var blankFilePath = 'pickit/Follower/blank.nip';

		if (hasRuneword) {
			print('No longer making ' + runeword);
			this.stopMakingRuneword(Runeword.Insight, equipment);

			// Remove nip file if it exists
			if (FileTools.exists(nipFilePath)) {
				FileTools.remove(nipFilePath);
			}
		} else {
			print('Making ' + runeword);
			this.makeRuneword(Runeword.Insight, equipment);
			Config.KeepRunewords.push(runewordKeep);

			// Generate and populate the nip file
			if (!FileTools.exists(nipFilePath)) {
				FileTools.copy(blankFilePath, nipFilePath);
				FileTools.appendText(nipFilePath, this.generateNipFileText(nipConfig));
			}

			Config.PickitFiles.push(this.getPickitFile(nipFilePath));
		}
	}
};
