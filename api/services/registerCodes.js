var codes = [
	{
		chapter : 6,
		paragraph : 2,
		sentence: 'Lauren had just been allowed into Hannover, sponsored by Sir Anthear himself.',
		code: 'Anthear'
	},
	{
		chapter : 7,
		paragraph : 1,
		sentence: 'Byford looked visibly confused by the tale so far.',
		code: 'confused'
	},
	{
		chapter : 8,
		paragraph : 3,
		sentence: '“Good lord!” he said aloud, checking his watch: 1.55pm. “I’m late!”',
		code: 'aloud'
	},
	{
		chapter : 9,
		paragraph : 3,
		sentence: 'Ah, well, this is what art does to you, Byford. I see you are an art man after all.',
		code: 'Byford'
	},
	{
		chapter : 10,
		paragraph : 4,
		sentence: '“OK, I’ve got it. Give me a second to get the video up,” Paul said.',
		code: 'video'
	},
	{
		chapter : 11,
		paragraph : 1,
		sentence: 'The message was from an unknown contact. ‘Found your man. Give me a call’ was all it said',
		code: 'man'
	},
	{
		chapter : 12,
		paragraph : 5,
		sentence: 'Byford thought he looked a bit too well-groomed to be running a refinery.',
		code: 'refinery'
	},
	{
		chapter : 13,
		paragraph : 4,
		sentence: '“Blimey, look at this place, it’s like one of those housing estates off an American movie,” Carter said',
		code: 'place'
	},
	{
		chapter : 14,
		paragraph : 1,
		sentence: '“Well, Andrew, I was just talking about you. Didn’t expect to be hearing from you so soon,” he said a little loudly',
		code: 'Andrew'
	},
	{
		chapter : 15,
		paragraph : 3,
		sentence: 'positive match to expected occupant. Monitoring ended as per your request,’ the systems operative typed',
		code: 'Monitoring'
	},
	{
		chapter : 16,
		paragraph : 4,
		sentence: '“Hey Claire!” David shouted back, before turning to Frost. “You’re in luck,” he said, then shouted back upstairs,',
		code: 'Claire'
	},
	{
		chapter : 17,
		paragraph : 1,
		sentence: 'Buckby silently appreciated his comment, deciding Daniels was a little more erudite than he was letting on.',
		code: 'erudite'
	},
	{
		chapter : 18,
		paragraph : 1,
		sentence: 'Some say the Chinese government wanted him to hand over his illicit business there',
		code: 'government'
	},
	{
		chapter : 19,
		paragraph : 3,
		sentence: 'Though a short swim, the darkness and the night-time tide would be a challenge.',
		code: 'darkness'
	},
	{
		chapter : 20,
		paragraph : 4,
		sentence: 'As expected, they had assembled in the kitchen, which had quickly been established as the main communal space.',
		code: 'kitchen'
	},
	{
		chapter : 21,
		paragraph : 3,
		sentence: '“The jewel of Spanish cuisine, as I believe you called it once.”',
		code: 'Spanish'
	},
	{
		chapter : 22,
		paragraph : 2,
		sentence: 'The Sea Mist leaned gently and a final soft splash emanated from its port side.',
		code: 'emanated'
	},
	{
		chapter : 23,
		paragraph : 4,
		sentence: 'Wolf broke from the cover of the bushes and headed for the fence.',
		code: 'fence'
	},
	{
		chapter : 24,
		paragraph : 3,
		sentence: 'Byford joked back, both men enjoying the thought of a panicked David.',
		code: 'panicked'
	},
	{
		chapter : 25,
		paragraph : 1,
		sentence: 'Police and ambulance crews milled around their vehicles and equipment.',
		code: 'milled'
	},
	{
		chapter : 26,
		paragraph : 2,
		sentence: 'Large oil paintings of historic club members hung from ceiling to floor.',
		code: 'club'
	},
	{
		chapter : 27,
		paragraph : 3,
		sentence: '“Hmm, very Sherlock of you. And yes,” he said, sitting down next to her, “I’m not telling her everything and she knows it.”',
		code: 'everything'
	},
	{
		chapter : 28,
		paragraph : 5,
		sentence: '“Sokolof, in position?” Chester called out into his radio, almost at the front door.',
		code: 'Chester'
	},
	{
		chapter : 29,
		paragraph : 1,
		sentence: 'Now he felt himself go cold and his diaphragm tensed as he resisted the urge to cry.',
		code: 'tensed'
	},
	{
		chapter : 30,
		paragraph : 3,
		sentence: '“ASTU, the S is for Standard and the T is the Terminal. Mind if we come in?” Broer said, stepping forward.',
		code: 'Standard'
	},
	{
		chapter : 31,
		paragraph : 3,
		sentence: 'A creak of wood through the headphones told him that David was up and on the move.',
		code: 'headphones'
	},
	{
		chapter : 32,
		paragraph : 2,
		sentence: '“20 percent is too low, and just ten thousand? You telling me they cleared you out of cash too?',
		code: 'thousand'
	},
	{
		chapter : 33,
		paragraph : 1,
		sentence: '“Don’t cry, Mary, we’ve both had a tough day, but at least you got to enjoy a few hours’ magic journey.',
		code: 'magic'
	},
	{
		chapter : 34,
		paragraph : 2,
		sentence: 'Whoever is in the van is connected somehow. This guy was killed last night or in the early hours this morning and whoever did it came from David’s house.”',
		code: 'killed'
	},
	{
		chapter : 35,
		paragraph : 4,
		sentence: '“You need to get a grip, Nelson. She’s your responsibility and I don’t think she’s shaping up.',
		code: 'Nelson'
	},
	{
		chapter : 36,
		paragraph : 1,
		sentence: 'Returning fully dressed, except for shoe covers and gloves, she approached the officers again.',
		code: 'gloves'
	},
	{
		chapter : 37,
		paragraph : 4,
		sentence: 'For a full three seconds she stared at Nelson, appearing not to notice his outstretched hand',
		code: 'three'
	},
	{
		chapter : 38,
		paragraph : 2,
		sentence: '“That is always a possibility, and in truth the most likely outcome. Life with ASTU is stressful and some people come and go quickly.',
		code: 'ASTU'
	},
	{
		chapter : 39,
		paragraph : 3,
		sentence: 'The controller continued to fuss about, tugging this and tightening that.',
		code: 'controller'
	},
	{
		chapter : 40,
		paragraph : 1,
		sentence: 'She’s starting to get her strength back now the immediate withdrawal phase is over with.',
		code: 'withdrawal'
	},
	{
		chapter : 41,
		paragraph : 2,
		sentence: '“So he quit on you again, did he?” Lord Durran asked rhetorically.',
		code: 'quit'
	},
	{
		chapter : 42,
		paragraph : 1,
		sentence: 'the stale London air was crisp and damp, just like his native Scotland, he reflected.',
		code: 'damp'
	},
	{
		chapter : 43,
		paragraph : 2,
		sentence: '“Err… yes. There is just one small thing, Home Secretary. I still need your help in locating Broer.”',
		code: 'locating'
	},
	{
		chapter : 44,
		paragraph : 5,
		sentence: 'Broer stepped into the side room he’d been guided to and remained at the door',
		code: 'side'
	},
];

exports.getCode = function(cb) {
	var num = codes.length;
	var rand = Math.floor(Math.random() * num);
	var code = codes[rand];
	code.sentence = code.sentence.replace(code.code,'<strong>*****</strong>');
	return code;
}