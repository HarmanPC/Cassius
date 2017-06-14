/**
 * Commands
 * Cassius - https://github.com/sirDonovan/Cassius
 *
 * This file contains the base commands for Cassius.
 *
 * @license MIT license
 */

'use strict';

function getLB(word) {
	word = Tools.toId(word);
	if (word === 'scrabble') {
		return scrabblelb;
	} else if (word === 'scrabmons' || word === 'scrabmon' || word === 'scrabblemons') {
		return scrabmonlb;
	} else {
		return false;
	}
}
let commands = {
	// Developer commands
	js: 'eval',
	eval: function (target, room, user) {
		if (!user.isDeveloper()) return;
		try {
			target = eval(target);
			this.say(JSON.stringify(target));
		} catch (e) {
			this.say(e.name + ": " + e.message);
		}
	},

	// Informational commands
	about: function (target, room, user) {
		if (room !== user && !user.hasRank(room, '+')) return;
		room.say(Config.username + " code by sirDonovan: https://github.com/sirDonovan/Cassius with additions made by Spooktune~");
	},

	beep: function (target, room, user) {
		if (room !== user && !user.hasRank(room, '+')) return;
		room.say("boop");
	},

	argbeep: function (target, room, user) {
		if (room !== user && !user.hasRank(room, '+')) return;
		room.say("/me boops " + target);
	},

	intro: function (target, room, user) {
		if (!user.hasRank(room, '+')) return;
		room.say("/addhtmlbox <div>Welcome to Scrabble!<li> <a href='http://scrabble-ps.weebly.com'>PS Scrabble Website</a></li> <li><a href='https://en.crosswordsarena.com/'>Play Scrabble!</a></li></ul></div>");
	},

	roomdesc: function (target, room, user) {
		if (!user.hasRank(room, '+')) return;
		room.say("/addhtmlbox <div>Play Scrabble with friends, join Scrabble tournaments, and compete in the exciting new Scrabblemons metagame!</div>");
	},
	
	pwogg: function (target, room, user) {
		if (!user.hasRank(room, '+')) return;
		room.say("Pw-ogg is named Pw-ogg because of a fictional species called Woggs made by global voice __SUNFISHED__, and whilst coming up with different names for said species, came up Poggs, combining the two came Pwogg!");
	},
	
	nt: function (target, room, user) {
		if (!user.hasRank(room, '+')) return;
		room.say("this is why I don't play with timer.");
	},

	play: function (target, room, user) {
		if (!user.hasRank(room, '+')) return;	
		room.say('/addhtmlbox <font style="color: Red;"><b> Welcome to Scrabble! Click to play! </b></font><a href="https://en.crosswordsarena.com/" target="_blank"><button style="background-color: #c90100; border-radius: 5px; border: solid, 1px, white; color: white; font-size: 12px; padding: 3px 5px; font-weight: bold; auto; box-shadow:2px 2px black; transform: skew(-15deg);display:inline-block;margin-top:10px"><span style="font-size:1.25em; text-shadow:2px 2px black">Play!</span></button></a>');
	},
	
	dab: function (target, room, user) {
		if (room !== user && !user.hasRank(room, '+')) return;
		room.say("/me dabs");
	},
	
	argdab: function (target, room, user) {
        if (room !== user && !user.hasRank(room, '+')) return;
        room.say("/me dabs on " + target);
    },
	
	argdunk: function (target, room, user) {
		if (room !== user && !user.hasRank(room, '+')) return;
		room.say("/me dunks on " + target);
	},
	
	git: function (target, room, user) {
		if (room !== user && !user.hasRank(room, '+')) return;
		room.say("https://github.com/DatSpookTho/Pwogg");
	},

	scrabmonstour: function (target, room, user) {
        if (room === user || !user.hasRank(room, '+')) return;
        room.say('/tour create gen 7 ou, elimination');
        room.say('/tour name Scrabblemons');
	},
   
    tourofficial: function (target, room, user) {
        if (room === user || !user.hasRank(room, '%')) return;
		room.say('/tour create gen 7 ou, elimination');
		room.say('/tour name Scrabblemons');
		room.say("/wall Hosting a scrabgame of Official Scrabblemons Tour! Click the join button to participate! Check http://scrabble-ps.weebly.com/scrabble-mons-guide.html if you don't know how to play!");
    },
   
    tourstart: function (target, room, user) {
		if (room === user || !user.hasRank(room, '%')) return;
		room.say('/tour start');
		room.say('/wall Good luck to everyone!');
	},
   
    scrabtour: function (target, room, user) {
        if (room === user || !user.hasRank(room, '+')) return;
        room.say('/wall Hosting a scrabgame of Official Scrabble Tour! It will be ran through challonge and the host will post a link after signups are closed! Do /me in to join!')
    },
	
	scrabword: 'scrabwords',
	scrabwords: function (target, room, user) {
		if (room !== user && !user.hasRank(room, '+')) return;
		let num = parseInt(target);
		if (!num || num < 1) num = 1;
		if (num === 1) {
			room.say(Tools.sample(Tools.words.sixletter));
		} else if (num === 2) {
			room.say(Tools.sample(Tools.words.sixletter, 2).join(", "));
		} else {
			let first = Tools.sample(Tools.words.sixletter, num - 1);
			room.say(first.join(", ") + " and " + Tools.sample(Tools.words.sixletter));
		}
	},
	
	scrabword1v1: 'scrabwords1v1',
	scrabwords1v1: function (target, room, user) {
		if (room !== user && !user.hasRank(room, '+')) return;
		let num = parseInt(target);
		if (!num || num < 1) num = 1;
		if (num === 1) {
			room.say(Tools.sample(Tools.words.threeletter));
		} else if (num === 2) {
			room.say(Tools.sample(Tools.words.threeletter, 2).join(", "));
		} else {
			let first = Tools.sample(Tools.words.threeletter, num - 1);
			room.say(first.join(", ") + " and " + Tools.sample(Tools.words.threeletter));
		}
	},

	answer: function (target, room, user) {
		if (room !== user && !user.hasRank(room, '+')) return;
		let aa = ["No", "Dont touch me", "Yes!", "Please try again later", "Probably", "/me does a barrel roll", "Pw-ogg has obliterated your question using a potato chip and a pair of dice. try again later", "can you not", "soon™", "Yes ma'am", "Tis i, the frenchist fry, Tis u, i have no clue.", "/me grinds question into a pulp", "i mean yeah i guess", "chances are that is a no", "can i get a number nine large with extra dip and a side of not going to happen", "no, try a healthy dose of Pw-ogg™ instead!"];
		room.say(Tools.sample(aa));
	},
	
	//client.send("scrabble|/mn	
	// Game commands
	signups: 'creategame',
	creategame: function (target, room, user) {
		if (!user.hasRank(room, '+')) return;
		if (!Config.games || !Config.games.includes(room.id)) return this.say("Games are not enabled for this room.");
		if (!Games.createGame(target, room)) return;
		room.game.signups();
	},
	start: 'startgame',
	startgame: function (target, room, user) {
		if (!room.game || !user.hasRank(room, '+')) return;
		room.game.start();
	},
	end: 'endgame',
	endgame: function (target, room, user) {
		if (!room.game || !user.hasRank(room, '+')) return;
		room.game.forceEnd();
	},
	join: 'joingame',
	joingame: function (target, room, user) {
		if (!room.game) return;
		room.game.join(user);
	},
	leave: 'leavegame',
	leavegame: function (target, room, user) {
		if (!room.game) return;
		room.game.leave(user);
	},

	//memes
	topaz: function (target, room, user) {
		if (!user.hasRank(room, '+')) return;
		room.say("!dt Excadrill");
	},
	ard: 'arandom',
	arandom: function (target, room, user) {
		if (!user.hasRank(room, '+')) return;
		room.say("!dt Ducklett");
	},
	
	spook: function (target, room, user) {
		if (!user.hasRank(room, '+')) return;
		room.say("!dt Heatmor");
	},
	
	snap: function (target, room, user) {
		if (!user.hasRank(room, '+')) return;
		room.say("!dt Misdreavus");
	},
	
	dsg: function (target, room, user) {
		if (!user.hasRank(room, '+')) return;
		room.say("!dt Giratina-Origin");
	},

	order: function (target, room, user) {
		if (!user.hasRank(room, '+')) return;
		room.say("!dt Zygarde-10%");
	},
	
	azu: function (target, room, user) {
		if (!user.hasRank(room, '+')) return;
		room.say("!dt Celebi");
	},
	
	sty: function (target, room, user) {
		if (!user.hasRank(room, '+')) return;
		room.say("!dt Drifblim");
	},
	
	qtie: function (target, room, user) {
		if (!user.hasRank(room, '+')) return;
		room.say("!dt Glameow");
	},

	moo: function (target, room, user) {
		if (!user.hasRank(room, '+')) return;
		room.say("!dt Miltank");
	},
	
	swag: function (target, room, user) {
		if (!user.hasRank(room, '+')) return;
		room.say("!dt Black Glasses");
	},
	
	//leaderboard commands 
	firsts: 'first',
	first: function (target, room, user) {
		if (!target) return;
		if (!user.hasRank(Rooms.get('scrabble'), '+')) return;
		let split = target.split(",");
		if (split.length < 2) {
			return room.say("You must specify the leaderboard you are adding to");
		}
		let dd = getLB(split[0]);
		if (!dd) {
			return room.say("The valid leaderboards are Scrabble and Scrabblemons");
		}
		target = split.slice().splice(1).join(",");
		dd.addFirst(target);
		room.say("First place points awarded to **" + target.trim() + "** on the " + dd.name + " leaderboard.");
	},
	seconds: 'second',
	second: function (target, room, user) {
		if (!target) return;
		if (!user.hasRank(Rooms.get('scrabble'), '+')) return;
		let split = target.split(",");
		if (split.length < 2) {
			return room.say("You must specify the leaderboard you are adding to");
		}
		let dd = getLB(split[0]);
		if (!dd) {
			return room.say("The valid leaderboards are Scrabble and Scrabblemons");
		}
		target = split.slice().splice(1).join(",");
		dd.addSecond(target);
		room.say("Second place points awarded to **" + target.trim() + "** on the " + dd.name + " leaderboard.");	
	},
	third: 'thirds',
	thirds: function (target, room, user) {
		if (!target) return;
		if (!user.hasRank(Rooms.get('scrabble'), '+')) return;
		let split = target.split(",");
		if (split.length < 2) {
			return room.say("You must specify the leaderboard you are adding to");
		}
		let dd = getLB(split[0]);
		if (!dd) {
			return room.say("The valid leaderboards are Scrabble and Scrabblemons");
		}
		if (dd.name !== "Scrabble") {
			return room.say("You can only add third place to the Scrabble leaderboard.");
		}
		target = split.slice().splice(1).join(",");
		dd.addThird(target);
		room.say("Third place awarded to **" + target.trim() + "** on the " + dd.name + " leaderboard.");
	},
	highscores: 'toppoints',
	highscore: 'toppoints',
	toppoint: 'toppoints',
	toppoints: function (target, room, user) {
		if (!target) return;
		if (!user.hasRank(Rooms.get('scrabble'), '+')) return;
		let split = target.split(",");
		if (split.length < 2) {
			
		}
		let dd = getLB(split[0]);
		if (!dd) {
			return room.say("The valid leaderboards are Scrabble and Scrabblemons");
		}
		if (dd.name !== "Scrabble") {
			return room.say("You can only add toppoints to the Scrabble leaderboard.");
		}
		target = split.slice().splice(1).join(",");
		dd.addTop(target);
		room.say("High Scores awarded to **" + target.trim() + "** on the Scrabble leaderboard.");
	},

	part: 'participation',
	parts: 'participation',
	participation: function (target, room, user) {
		if (!target) return;
		if (!user.hasRank(Rooms.get('scrabble'), '+')) return;
		let split = target.split(",");
		if (split.length < 2) {
			return room.say("You must specify the leaderboard you are adding to");
		}
		let dd = getLB(split[0]);
		if (!dd) {
			return room.say("The valid leaderboards are Scrabble and Scrabblemons");
		}
		split = split.splice(1);
		for (let i = 0; i < split.length; i++) {
			split[i] = split[i].trim();
		}
		for (let i = 0; i < split.length; i++) {
			dd.addPart(split[i]);
		}
		let msg = "Participation points awarded to: **" + split.join(", ") + "**.";
		if (msg.length > 300) {
			let len = split.length;
			let firstHalf = split.slice(0, Math.floor(len / 2.0));
			let secondHalf = split.slice(Math.floor(len / 2.0));
			room.say("Participations points awarded to: **" + firstHalf.join(", ") + "**.");
			room.say("and **" + secondHalf.join(", ") + "**.");
		} else {
			room.say(msg);
		}
	},

	rmfirst: 'removefirst',
	removefirst: function (target, room, user) {
		if (!target) return;
		if (!user.hasRank(Rooms.get('scrabble'), '+')) return;
		let split = target.split(",");
		if (split.length < 2) {
			return room.say("You must specify the leaderboard you are removing from");
		}
		let dd = getLB(split[0]);
		if (!dd) {
			return room.say("The valid leaderboards are Scrabble and Scrabblemons");
		}
		target = split.slice().splice(1).join(",");
		if (dd.removeFirst(target)) {
			room.say("First place removed from: **" + target + "** on the " + dd.name + " leaderboard.");
		} else {
			room.say("**" + target + "** has never won a game on the " + dd.name + " leaderboard.!");
		}
	},
	
	rmsecond: 'removesecond',
	removesecond: function (target, room, user) {
		if (!target) return;
		if (!user.hasRank(Rooms.get('scrabble'), '+')) return;
		let split = target.split(",");
		if (split.length < 2) {
			return room.say("You must specify the leaderboard you are removing from");
		}
		let dd = getLB(split[0]);
		if (!dd) {
			return room.say("The valid leaderboards are Scrabble and Scrabblemons");
		}
		target = split.slice().splice(1).join(",");
		if (dd.removeSecond(target)) {
			room.say("Second place removed from: **" + target + "** on the " + dd.name + " leaderboard.");
		} else {
			room.say("**" + target + "** has never placed second on the " + dd.name + " leaderboard.!");
		}
	},

	rmthird: 'removethird',
	removethird: function (target, room, user) {
		if (!target) return;
		if (!user.hasRank(Rooms.get('scrabble'), '+')) return;
		let split = target.split(",");
		if (split.length < 2) {
			return room.say("You must specify the leaderboard you are removing from");
		}
		let dd = getLB(split[0]);
		if (!dd) {
			return room.say("The valid leaderboards are Scrabble and Scrabblemons");
		}
		if (dd.name !== "Scrabble") {
			return room.say("You can only remove third places from the Scrabble leaderboard.");
		}
		target = split.slice().splice(1).join(",");
		if (dd.removeThird(target)) {
			room.say("Third place removed from: **" + target + "** on the " + dd.name + " leaderboard.");
		} else {
			room.say("**" + target + "** has never placed third on the " + dd.name + " leaderboard.!");
		}
	},

	rmtop: 'removetop',
	removetop: function (target, room, user) {
		if (!target) return;
		if (!user.hasRank(Rooms.get('scrabble'), '+')) return;
		let split = target.split(",");
		if (split.length < 2) {
			return room.say("You must specify the leaderboard you are removing from");
		}
		let dd = getLB(split[0]);
		if (!dd) {
			return room.say("The valid leaderboards are Scrabble and Scrabblemons");
		}
		if (dd.name !== "Scrabble") {
			return room.say("You can only remove top points from the Scrabble leaderboard.");
		}
		target = split.slice().splice(1).join(",");
		if (dd.removeTop(target)) {
			room.say("Top points removed from: **" + target + "** on the " + dd.name + " leaderboard.");
		} else {
			room.say("**" + target + "** has never placed third on the " + dd.name + " leaderboard.!");
		}
	},
	removeparts: 'removepart',
	removeparticipation: 'removepart',
	rmpart: 'removepart',
	rmparts: 'removepart',
	removepart: function (target, room, user) {
		if (!target) return;
		if (!user.hasRank(Rooms.get('scrabble'), '+')) return;
		let split = target.split(",");
		if (split.length < 2) {
			return room.say("You must specify the leaderboard you are removing from");
		}
		let dd = getLB(split[0]);
		if (!dd) {
			return room.say("The valid leaderboards are Scrabble and Scrabblemons");
		}
		split = split.splice(1);
		let good = [];
		let bad = [];
		for (let i = 0; i < split.length; i++) {
			let name = split[i];
			if (dd.removePart(name)) {
				good.push(name);
			} else {
				bad.push(name);
			}
		}
		if (good.length > 0 && bad.length > 0) {
			room.say("Participations removed from: **" + good.join(", ") + "**. I was unable to remove participation from **" + bad.join(", ") + "**.");
		} else if (good.length > 0) {
			room.say("Participations removed from: **" + good.join(", ") + "**.");
		} else {
			room.say("I was unable to remove participations from **" + bad.join(", ") + "**.");
		}
	},
	
	top: function (target, room, user) {
		if (!user.hasRank(room, '+') && room !== user) return;
		let split = target.split(",");
		if (split.length < 1) {
			return user.say("You must specify the lb you are looking at.");
		}
		let lb = getLB(split[0]);
		if (!lb) {
			return user.say("Invalid leaderboard specified.");
		}
		let num = parseInt(split[1]);
		if (!num) num = 5;
		let sorted = lb.getSorted();
		if (num > sorted.length) num = sorted.length;
		if (room === user) {
			let str = "<div class = \"infobox\"><html><body><table align=\"center\" border=\"2\"><tr>";
			let indices = ["Rank", "Name", "Points"];
			for (let i = 0; i < 3; i++) {
				str +=  "<td style=background-color:#FFFFFF; height=\"30px\"; align=\"center\"><b><font color=\"black\">" + indices[i] + "</font></b></td>";
			}
			str += "</tr>"
			let strs = [];
			for (let i = Math.max(0, num - 5); i < num; i++) {
				let strx = "<tr>";
				for (let j = 0; j < 3; j++) {
					let stuff;
					if (j === 0) stuff = i + 1;
					else if (j === 1) stuff = sorted[i][lb.getNameIndex()];
					else stuff = lb.getPoints(sorted[i]);
					strx += "<td style=background-color:#FFFFFF; height=\"30px\"; align=\"center\"><b><font color=\"black\">" + stuff + "</font></b></td>";
				}
				strs.push(strx + "</tr>");
			}
			str += strs.join("");
			str += "</table></body></html></div>";	
			Rooms.get('scrabble').say('/pminfobox ' + user.id + ", " + str);
		} else {
			let str = lb.getStr(num);
			if (room.id === 'scrabble') {
				room.say("/addhtmlbox " + str);
			} else {
				room.say("!htmlbox " + str);
			}
		}
	}
};

module.exports = commands;
