/**
 * Tools
 * Cassius - https://github.com/sirDonovan/Cassius
 *
 * This file contains functions that are useful globally.
 *
 * @license MIT license
 */

'use strict';

const fileData = {
	'pokedex': {path: './data/pokedex.js', export: 'BattlePokedex'},
	'moves': {path: './data/moves.js', export: 'BattleMovedex'},
	'items': {path: './data/items.js', export: 'BattleItems'},
	'abilities': {path: './data/abilities.js', export: 'BattleAbilities'},
	'learnsets': {path: './data/learnsets.js', export: 'BattleLearnsets'},
	'teams': {path: './data/teams.js', export: 'BattlePokeTeams'},
	'badges': {path: './data/badges.js', export: 'Badges'},
	'words': {path: './data/words.js', export: 'words'},
	'spookdex': {path: './data/spookdex.js', export: 'spookdex'},
	'sprites': {path: './data/dexsprites.js', export: 'sprites'},
};

class Tools {
	constructor() {
		this.data = {};
	}

	loadData() {
		for (let file in fileData) {
			this.data[file] = require(fileData[file].path)[fileData[file].export];
		}
	}

	/**
	 * @param {any} text
	 * @return {string}
	 */
	toId(text) {
		if (!text) return '';
		if (text.id) text = text.id;
		let type = typeof text;
		if (type !== 'string') {
			if (type === 'number') {
				text = '' + text;
			} else {
				return '';
			}
		}
		return text.toLowerCase().replace(/[^a-z0-9]/g, '');
	}

	/**
	 * @param {any} text
	 * @return {string}
	 */
	toName(text) {
		if (!text) return '';
		if (text.name) text = text.name;
		let type = typeof text;
		if (type !== 'string') {
			if (type === 'number') {
				text = '' + text;
			} else {
				return '';
			}
		}
		if (Config.groups && text.charAt(0) in Config.groups) text = text.substr(1);
		return text.trim();
	}

	/**
	 * @param {string} text
	 * @return {string}
	 */
	
	encrypt(target) {
		let nums = [];
        for (let i = 0; i < target.length; i += 1) {
            let num1 = this.padZeros(target[i].charCodeAt(), 3);
            let num = parseInt(num1);
            
            let c = this.mod(num, Config.e, Config.n);
            nums.push(c);
        }
        return nums.join(" ");
	}
	/**
	 * @param {string} text
	 * @return {string}
	 */
	decrypt(target) {
		let nums = target.split(" ");
        let str = "";
        for (let i = 0; i < nums.length; i++) {
            let num = parseInt(nums[i]);
            let d = this.mod(num, Config.d, Config.n).toString();
            str += String.fromCharCode(parseInt(d));
        }
        return str;
	}
	/**
	 * @param {number} base
	 * @param {number} pow
	 * @param {number} modulus
	 * @return {number}
	 */
    mod(base, pow, modulus) {
        let powers = [base];
        let cur = base;
        let power = 1;
        while (power < pow) {
            power *= 2;
            cur *= cur;
            cur %= modulus;
            powers.push(cur);
        }
        cur = 1;
        while (pow > 0) {
            if (pow%2 === 1) {
                cur *= powers[0];
                cur %= modulus;
            }
            powers.splice(0, 1);
            pow -= pow%2;
            pow /= 2;
        }
        return cur;
    }

	/**
	 * @param {number} number
	 * @param {number} numTotal
	 * @return {string}
	 */
    padZeros(number, numTotal) {
        let str = number.toString();
        while (str.length < numTotal) {
            str = "0" + str;
        }
        return str;
    }
	/**
	 * @param {any} text
	 * @return {string}
	 */
	toString(text) {
		if (!text) return '';
		let type = typeof text;
		if (type === 'string') return text;
		if (type === 'number') return '' + text;
		return JSON.stringify(text);
	}

	/**
	 * @param {any} text
	 * @param {any} [room]
	 * @return {string}
	 */
	normalizeMessage(text, room) {
		text = this.toString(text);
		if (!text) return '';
		text = text.trim();
		if (text.startsWith("/wall ")) text = '/announce ' + text.substr(6);
		if (text.startsWith("/announce ") && (!room || !Users.self.hasRank(room, '%'))) {
			text = text.substr(10);
			if (!text.includes('**') && text.length <= 296) text = '**' + text + '**';
		}
		if (text.length > 300 && !text.startsWith('/addhtmlbox') && !text.startsWith('/pminfobox') && !text.startsWith("!htmlbox")) text = text.substr(0, 297) + "...";
		return text;
	}

	/**
	 * @param {number} [limit]
	 * @return {number}
	 */
	random(limit) {
		if (!limit) limit = 2;
		return Math.floor(Math.random() * limit);
	}

	/**
	 * @param {Array} array
	 * @return {Array}
	 */
	shuffle(array) {
		if (!(array instanceof Array)) return array;
		array = array.slice();

		// Fisher-Yates shuffle algorithm
		let currentIndex = array.length;
		let temporaryValue, randomIndex;

		// While there remain elements to shuffle...
		while (currentIndex !== 0) {
			// Pick a remaining element...
			randomIndex = Math.floor(Math.random() * currentIndex);
			currentIndex -= 1;

			// And swap it with the current element.
			temporaryValue = array[currentIndex];
			array[currentIndex] = array[randomIndex];
			array[randomIndex] = temporaryValue;
		}
		return array;
	}

	/**
	 * @param {Array} array
	 * @param {number} [amount]
	 */
	sample(array, amount) {
		if (!(array instanceof Array)) return;
		let len = array.length;
		if (!len) return;
		if (len === 1 || !amount || amount === 1) return array.slice()[Math.floor(Math.random() * len)];
		if (amount > len) {
			amount = len;
		} else if (amount < 0) {
			amount = 0;
		}
		return this.shuffle(array).splice(0, amount);
	}

	/**
	 * @param {string} name
	 */
	getPokemon(name) {
		return this.data.pokedex[this.toId(name)];
	}

	/**
	 * @param {string} name
	 */
	getTemplate(name) {
		return this.getPokemon(name);
	}

	/**
	 * @param {string} name
	 */
	getMove(name) {
		return this.data.moves[this.toId(name)];
	}

	/**
	 * @param {string} name
	 */
	getItem(name) {
		return this.data.items[this.toId(name)];
	}

	/**
	 * @param {string} name
	 */
	getAbility(name) {
		return this.data.abilities[this.toId(name)];
	}
}

let tools = new Tools();
global.toId = tools.toId;
tools.loadData();

module.exports = tools;
