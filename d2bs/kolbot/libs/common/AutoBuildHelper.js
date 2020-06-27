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
	}
};
