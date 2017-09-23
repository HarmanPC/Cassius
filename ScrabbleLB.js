'use strict';

const fs = require('fs');
const BACKUP_INTERVAL = 60 * 1000;

class DD {
	constructor() {
		this.lb = {};
		this.modlog = {};
		this.firstpoints = 10;
		this.secondpoints = 7;
		this.partpoints = 3;
		this.name = "Scrabble";
	}

	getNameIndex() {
		return 3;
	}
	
	importData() {
		let file = '{}';
		try {
			file  = fs.readFileSync('./databases/scrabblelb.json').toString();
		} catch (e) {}
		this.lb = JSON.parse(file);
	}

	getStr(num) {
		let sorted = this.getSorted();
		let str = "<div class = \"infobox\"><html><body><table align=\"center\" border=\"2\"><tr>";
		let indices = ["Rank", "Name", "Firsts", "Seconds", "Parts", "Points"];
		for (let i = 0; i < indices.length; i++) {
			str +=  "<td style=background-color:#FFFFFF; height=\"30px\"; align=\"center\"><b><font color=\"black\">" + indices[i] + "</font></b></td>";
		}
		str += "</tr>"
		let real = [3,0,1,2];
		let strs = [];
		for (let i = Math.max(0, num - 5); i < num; i++) {
			let strx = "<tr>";
			for (let j = 0; j < 6; j++) {
				let stuff;
				if (j === 0) {
					stuff = i+1;
				} else if (j === 5) {
					stuff = dd.getPoints(sorted[i]);
				} else {
					stuff = sorted[i][real[j - 1]];
				}
				strx += "<td style=background-color:#FFFFFF; height=\"30px\"; align=\"center\"><b><font color=\"black\">" + stuff + "</font></b></td>";
			}
			strs.push(strx + "</tr>");
		}
		str += strs.join("");
		str += "</table></body></html></div>";
		return str;
	}
	
	exportData() {
		fs.writeFileSync('./databases/scrabblelb.json', JSON.stringify(this.lb));
	}

	addFirst(user) {
		let id = Tools.toId(user.trim());
		if (!(id in this.lb)) {
			this.lb[id] = {
				firsts: 1,
				seconds: 0,
				parts: 0,
				name: user.trim(),
			}
		} else {
			this.lb[id].firsts++;
		}
	}

	addSecond(user) {
		let id = Tools.toId(user.trim());
		if (!(id in this.lb)) {
			this.lb[id] = {
				firsts: 0,
				seconds: 1,
				parts: 0,
				name: user.trim(),
			}
		} else {
			this.lb[id].seconds++;
		}
	}

	addPart(user) {
		let id = Tools.toId(user.trim());
		if (!(id in this.lb)) {
			this.lb[id] = {
				firsts: 0,
				seconds: 0,
				parts: 1,
				name: user.trim(),
			}
		} else {
			this.lb[id].parts++;
		}
	}
	removeFirst(user) {
		let id = Tools.toId(user);
		if (!(id in this.lb) || this.lb[id].firsts === 0) {
			return false
		} else {
			this.lb[id].firsts--;
			return true;
		}
	}

	removeSecond(user) {
		let id = Tools.toId(user);
		if (!(id in this.lb) || this.lb[id].seconds === 0) {
			return false
		} else {
			this.lb[id].seconds--;
			return true;
		}
	}

	removePart(user) {
		let id = Tools.toId(user);
		if (!(id in this.lb) || this.lb[id].parts === 0) {
			return false
		} else {
			this.lb[id].parts--;
			return true;
		}
	}

	getPoints(item) {
		return this.firstpoints * item[0] + this.secondpoints * item[1] + this.partpoints * item[2];
	}

	getSorted() {
		let items = [];
		for (let id in this.lb) {
			let item = this.lb[id];
			items.push([item.firsts, item.seconds, item.parts, item.name]);
		}
		items.sort(function(first, second) {
			let points1 = dd.getPoints(first);
			let points2 = dd.getPoints(second);
			if (points1 !== points2) return points2 - points1;
			if (first[1] !== second[1]) return second[1] - first[1];
			if (first[2] !== second[2]) return second[2] - first[2];
			return second[3] > first[3];
		});
		return items;
	}
}

let dd = new DD();
dd.backupInterval = setInterval(() => dd.exportData(), BACKUP_INTERVAL);

module.exports = dd;