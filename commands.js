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
		let aa = ["No", "Dont touch me", "Yes!", "Please try again later", "Probably", "/me does a barrel roll", "Pw-ogg has obliterated your question using a potato chip and a pair of dice. try again later", "can you not", "soon™", "Yes ma'am", "/me grinds question into a pulp", "i mean yeah i guess", "chances are that is a no", "no, try a healthy dose of Pw-ogg™ instead!"];
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
	ryy: function (target, room, user) {
	if (!user.hasRank(room, '+')) return;
	room.say("▲ ► ▼ ◄ ▲ ► ▼ ◄ ▼ ◄ ▲");
	room.say("Sorry, I dropped my bag of doritos");
	},
	
	pun: function (target, room, user) {
		if (room !== user && !user.hasRank(room, '+')) return;
		let ew = ["What do you call the security outside of a Samsung Store? Guardians of the Galaxy.", "Did you hear about the guy who got hit in the head with a can of soda? He was lucky it was a soft drink.", "Don't spell part backwards. It's a trap.", "I can't believe I got fired from the calendar factory. All I did was take a day off.", "I have a few jokes about unemployed people but it doesn't matter none of them work.", "I'm reading a book about anti-gravity. It's impossible to put down.", "I wasn't originally going to get a brain transplant, but then I changed my mind.", "Why was Cinderella thrown off the basketball team? She ran away from the ball.", "How did I escape Iraq? Iran.", "I'd tell you a chemistry joke but I know I wouldn't get a reaction.", "eBay is so useless. I tried to look up lighters and all they had was 13,749 matches.", "A friend of mine tried to annoy me with bird puns, but I soon realized that toucan play at that game.", "A courtroom artist was arrested today for an unknown reason... details are sketchy.", "I'm glad I know sign language, it's pretty handy.", "What do you have to do to have a party in space? You have to Planet.", "I was addicted to the hokey pokey... but thankfully, I turned myself around.", "Thieves had broken into my house and stolen everything except my soap, shower gel, towels and deodorant. Dirty Bastards.", "I am on a seafood diet. Every time I see food, I eat it.", "I'm emotionally constipated. I haven't given a shit in days.", "I wear two pairs of pants when I go golfing. People always ask me why I do. I say, I wear two pants when's I golf just in case I get a hole-in-one.", "I wear two pairs of pants when I go golfing. People always ask me why I do. I say, 'I wear two pants when's I golf just in case I get a hole-in-one.'", "Why did the scientist install a knocker on his door? He wanted to win the No-bell prize!", "When I get naked in the bathroom, the shower usually gets turned on.", "What do you call an academically successful slice of bread? An honor roll.", "What do you call a cow with no legs? Ground beef.", "My first job was working in an orange juice factory, but I got canned because I couldn't concentrate.", "Claustrophobic people are more productive thinking out of the box.", "A book just fell on my head. I've only got myshelf to blame.", "My mate broke his left arm and left leg, but he was alright.", "What was Forrest Gump's email password? '1forrest1'", "I wanna make a joke about sodium, but Na..", "I hate insects puns, they really bug me.", "I used to be a banker, but then I lost interest.", "What do you call Watson when Sherlock isn't around? Holmeless.", "Did you hear about the Italian chef with a terminal illness? He pastaway.", "I relish the fact that you have mustard the strength to ketchup to me.", "What do prisoners use to call each other? Cell phones.", "If my puns are cheesy, then they would go well with crackers.", "I am so poor I cannot even pay attention.", "I found a rock yesterday which measured 1760 yards in length. Must be some kind of milestone.", "My math teacher called me average. How mean!", "What did one ocean say to the other ocean? Nothing, they just waved.", "I saw an ad for burial plots, and thought to myself this is the last thing I need.", "I've just written a song about tortillas - actually, it's more of a rap.", "Why is Peter Pan always flying? He neverlands.", "Why didn't the skeleton go to prom? Cause he had no body to dance with.", "What do you call people who are afraid of Santa Claus? Claustrophobic", "Atheism is a non-prophet organization.", "Why don't cannibals eat clowns? They taste funny.", "Why did the bee get married? Because he found his honey.", "Why couldn't the bike stand up on it's own? It was two tired.", "A bus station is where a bus stops. A train station is where a train stops. On my desk, I have a work station..", "Get stoned. Drink wet cement.", "If there was someone selling drugs in this place, weed know.", "Which day do chickens hate the most? Friday.", "Last time I got caught stealing a calendar I got 12 months.", "Did you hear about these new reversible jackets? I am excited to see how they turn out.", "A hole was found in the wall of a nudist camp. The police are looking into it.", "My computer has got Miley Virus. It has stopped twerking.", "What do you call a dictionary on drugs? HIGH-Definition.", "What do sea monsters eat for lunch? Fish and ships.", "The future, the present and the past walked into a bar. Things got a little tense.", "I put the 'fun' in dysfunctional.", "Do you know why I make puns? Because it's my respunsibility.", "Fishermen are reel men.", "If anything is possible, is it possible for something to be impossible?", "For Sale: Parachute. Only used once, never opened.", "Did you hear about the guy who choked on a pretzel? He was very salty.", "What did the tree say to autumn? Leaf me alone.", "A Roman fighter consumed his wife. He said he was glad 'e ate 'er", "What do you call a owl that does magic tricks? Hoodini.", "It's hard to explain puns to kleptomaniacs because they always take things literally.", "A garage sale is actually a Garbage sale but the 'b' is silent.", "What is the difference between a poorly dressed man on a bicycle and a nicely dressed man on a tricycle? A tire.", "Your gene pool could use a little chlorine.", "What do ghosts serve for dessert? I Scream.", "What tea do hockey players drink? Penaltea!", "Whats long and hard and has cum in it? A cucumber.", "I wanted to make a joke about criminals, but I was scared it would get stolen.", "Why does the bike not stand by itself? Because it is two tired.", "Do skunks celebrate Valentines Day? Sure, they're very scent-imental!", "On the other hand, you have different fingers.", "No matter how much you push the envelope, it'll still be stationery.", "This morning some clown opened the door for me. I thought to myself that's a nice Jester.", "Why did the chicken cross the road? Because KFC was on the other side.", "STRESSED is just DESSERTS spelled backward.", "What if there were no hypothetical questions?", "Television is a medium because anything well done is rare.", "What do you get when you cross a joke with a rhetorical question?", "You know those people using bibles on their phones? They are using phony bibles.", "Where do you find a birthday present for a cat? In a cat-alogue!", "In democracy, it is your vote that counts. In feudalism, it is your count that votes.", "A donkey fell into a bowl of sugar. Now that's a sweet ass.", "What's the difference between a guitar and a fish? You can't tuna fish!", "I asked my friend for a sharpened pencil, but he didn't have one. I always knew he was a little dull", "How do you get Pikachu onto the bus? You Pokemon.", "What nationality is Santa Claus? North Polish" , "I would tell a swimming joke, but I think it's too watered-down to be funny.", "Lately I've been trying to touch my toes, which I don't find so complicated, but my knees just can't get it straight.", "What did Zelda tell Link when he couldn't open the door? TRIFORCE!", ];
		room.say(Tools.sample(ew));
	},
	
	IQ: function (target, room, user) {
		if (room !== user && !user.hasRank(room, '+')) return;
		let iq = ["Life is 10% what happens to us and 90% how we react to it.", "Do one thing every day that scares you." , "We are what we pretend to be, so we must be careful about what we pretend to be." , "When we love, we always strive to become better than we are. When we strive to become better than we are, everything around us becomes better too.", "Sometimes you wake up. Sometimes the fall kills you. And sometimes, when you fall, you fly."  "What's meant to be will always find a way", "The flower that blooms in adversity is the rarest and most beautiful of all.", "We delight in the beauty of the butterfly, but rarely admit the changes it has gone through to achieve that beauty.", "You never have to change anything you got up in the middle of the night to write.", "And now here is my secret, a very simple secret: It is only with the heart that one can see rightly; what is essential is invisible to the eye." "Courage is the most important of all the virtues because without courage, you can't practice any other virtue consistently.", "The unexamined life is not worth living.", "I was never really insane except upon occasions when my heart was touched.", "It's not the load that breaks you down, it's the way you carry it.", "The things you do for yourself are gone when you are gone, but the things you do for others remain as your legacy.", "It is good to love many things, for therein lies the true strength, and whosoever loves much performs much, and can accomplish much, and what is done in love is well done.", "I dream my painting and I paint my dream.", "Understanding is the first step to acceptance, and only with acceptance can there be recovery.", "What you do makes a difference, and you have to decide what kind of difference you want to make.", "PQ a hoe", "Do you want to know who you are? Don't ask. Act! Action will delineate and define you.", "If you treat an individual as he is, he will remain how he is. But if you treat him as if he were what he ought to be and could be, he will become what he ought to be and could be.", "There are years that ask questions and years that answer.", "You yourself, as much as anybody in the entire universe, deserve your love and affection", "You have power over your mind - not outside events. Realize this, and you will find strength.", "If you want to be happy, do not dwell in the past, do not worry about the future, focus on living fully in the present.", "Ignore those that make you fearful and sad, that degrade you back towards disease and death.", "You can't wait for inspiration. You have to go after it with a club." "We are all different. Don’t judge, understand instead.", "Respect other people's feelings. It might mean nothing to you, but it could mean everything to them.", "Life is too short to waste your time on people who don’t respect, appreciate, and value you.", "It’s only after you’ve stepped outside your comfort zone that you begin to change, grow, and transform.", "Don't be pushed around by the fears in your mind. Be led by the dreams in your heart.", "Be mindful. Be grateful. Be positive. Be true. Be kind.", "You never change your life until you step out of your comfort zone; change begins at the end of your comfort zone.", "Take responsibility of your own happiness, never put it in other people’s hands.", "No amount of regretting can change the past, and no amount of worrying can change the future.", "The past is a place of reference, not a place of residence; the past is a place of learning, not a place of living.", "Life becomes easier and more beautiful when we can see the good in other people.", "Do not let the memories of your past limit the potential of your future. There are no limits to what you can achieve on your journey through life, except in your mind.", "Make improvements, not excuses. Seek respect, not attention.", "Do what is right, not what is easy nor what is popular.", "Treat everyone with politeness and kindness, not because they are nice, but because you are.", "Be brave to stand for what you believe in even if you stand alone.", "The only thing standing between you and your goal is the bullshit story you keep telling yourself as to why you can't achieve it.", "It was only a sunny smile, and little it cost in the giving, but like morning light it scattered the night and made the day worth living.", "It's hard to beat a person who never gives up.", "More smiling, less worrying. More compassion, less judgment. More blessed, less stressed. More love, less hate.", "Instead of worrying about what you cannot control, shift your energy to what you can create.", "Follow your heart, listen to your inner voice, stop caring about what others think.", "Always find opportunities to make someone smile, and to offer random acts of kindness in everyday life.", "Learn to light a candle in the darkest moments of someone’s life. Be the light that helps others see; it is what gives life its deepest significance.", "Do not fear failure but rather fear not trying.", "To shine your brightest light is to be who you truly are.", "Success is not how high you have climbed, but how you make a positive difference to the world.", "Don’t waste your time in anger, regrets, worries, and grudges. Life is too short to be unhappy.", "Help others without any reason and give without the expectation of receiving anything in return.", "Be thankful for everything that happens in your life; it’s all an experience.", "You are not rich until you have a rich heart.", "Start each day with a positive thought and a grateful heart.", "Do not set aside your happiness. Do not wait to be happy in the future. The best time to be happy is always now." , "If you believe very strongly in something, stand up and fight for it.", "Let the improvement of yourself keep you so busy that you have no time to criticize others." , "The more you feed your mind with positive thoughts, the more you can attract great things into your life.", "When all is said and done, more is said than done.", "Be yourself; everyone else is already taken.", "Be the change that you wish to see in the world.", "Live as if you were to die tomorrow. Learn as if you were to live forever.", "Darkness cannot drive out darkness: only light can do that. Hate cannot drive out hate: only love can do that.", "We accept the love we think we deserve.", "Imperfection is beauty, madness is genius and it's better to be absolutely ridiculous than absolutely boring.", "There are only two ways to live your life. One is as though nothing is a miracle. The other is as though everything is a miracle.", "Yesterday is history, tomorrow is a mystery, today is a gift of God, which is why we call it the present.", "We are all in the gutter, but some of us are looking at the stars.", "Fairy tales are more than true: not because they tell us that dragons exist, but because they tell us that dragons can be beaten.", "I have not failed. I've just found 10,000 ways that won't work.", "It is never too late to be what you might have been.", "Life isn't about finding yourself. Life is about creating yourself.", "Do what you can, with what you have, where you are.", "Success is not final, failure is not fatal: it is the courage to continue that counts.", "You may say I'm a dreamer, but I'm not the only one. I hope someday you'll join us. And the world will live as one.", "It’s no use going back to yesterday, because I was a different person then.", "A person's a person, no matter how small.", "It's the possibility of having a dream come true that makes life interesting.", "Nothing is impossible, the word itself says 'I'm possible'!", "Do what you feel in your heart to be right – for you’ll be criticized anyway.", "I can't give you a sure-fire formula for success, but I can give you a formula for failure: try to please everybody all the time.", "Happiness is not something ready made. It comes from your own actions.", "First they ignore you, then they ridicule you, then they fight you, and then you win.", "Whatever you are, be a good one.", "Friendship is unnecessary, like philosophy, like art.... It has no survival value; rather it is one of those things which give value to survival.",  ];
		room.say(Tools.sample(iq));
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
	},

	points: function (target, room, user) {
		if (room !== user) return;
		let targetName = target || user.name;
		let targetID = Tools.toId(targetName);
		let scrabbleLB = scrabblelb.getSorted();
		let scrabmonslb = scrabmonlb.getSorted();
		let str = "", i;
		for (i = 0; i < scrabbleLB.length; i++) {
			if (Tools.toId(scrabbleLB[i][5]) === targetID) break;
		}
		if (i !== scrabbleLB.length) {
			user.say("**" + scrabbleLB[i][5] + "** is #" + (i + 1) + " on the Scrabble leaderboard with " + scrabbleLB[i][0] + " first place finishes, " + scrabbleLB[i][1] + " second place finishes, " + scrabbleLB[i][2] + " third place finishes, " + scrabbleLB[i][3] + " participations, and " + scrabbleLB[i][4] + " high-scores.");
		} else {
			user.say("**" + targetName + "** does not have any points on the Scrabble leaderboard.");
		}
		for (i = 0; i < scrabmonslb.length; i++) {
			if (Tools.toId(scrabmonslb[i][3]) === targetID) break;
		}
		if (i !== scrabmonslb.length) {
			user.say("**" + scrabmonslb[i][3] + "** is #" + (i + 1) + " on the Scrabblemons leaderboard with " + scrabmonslb[i][0] + " first place finishes, " + scrabmonslb[i][1] + " second place finishes, and " + scrabmonslb[i][2] + " participations.");
		} else {
			user.say("**" + targetName + "** does not have any points on the Scrabblemons leaderboard.");
		}
	},

	resetlb: function (target, room, user) {
		if (room !== user || !user.hasRank(Rooms.get('scrabble'), '#')) return;
		scrabblelb.lb = {};
		scrabmonlb.lb = {};
		scrabblelb.exportData();
		scrabmonlb.exportData();
		return user.say("Scrabble and Scrabblemons leaderboards have been reset.");
	}
};

module.exports = commands;
