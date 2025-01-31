export const wcaEvents = {
	"333": { puzzleID: "3x3x3", eventName: "3x3x3 Cube" },
	"222": { puzzleID: "2x2x2", eventName: "2x2x2 Cube" },
	"444": { puzzleID: "4x4x4", eventName: "4x4x4 Cube" },
	"555": { puzzleID: "5x5x5", eventName: "5x5x5 Cube" },
	"666": { puzzleID: "6x6x6", eventName: "6x6x6 Cube" },
	"777": { puzzleID: "7x7x7", eventName: "7x7x7 Cube" },
	"333bf": { puzzleID: "3x3x3", eventName: "3x3x3 Blindfolded" },
	"333fm": { puzzleID: "3x3x3", eventName: "3x3x3 Fewest Moves" },
	"333oh": { puzzleID: "3x3x3", eventName: "3x3x3 One-Handed" },
	clock: { puzzleID: "clock", eventName: "Clock" },
	minx: { puzzleID: "megaminx", eventName: "Megaminx" },
	pyram: { puzzleID: "pyraminx", eventName: "Pyraminx" },
	skewb: { puzzleID: "skewb", eventName: "Skewb" },
	sq1: { puzzleID: "square1", eventName: "Square-1" },
	"444bf": { puzzleID: "4x4x4", eventName: "4x4x4 Blindfolded" },
	"555bf": { puzzleID: "5x5x5", eventName: "5x5x5 Blindfolded" },
	"333mbf": { puzzleID: "3x3x3", eventName: "3x3x3 Multi-Blind" },
};

export const allEvents = {
	...wcaEvents,
	fto: { puzzleID: "fto", eventName: "Face-Turning Octahedron" },
	master_tetraminx: {
		puzzleID: "master_tetraminx",
		eventName: "Master Tetraminx",
	},
	kilominx: {
		puzzleID: "kilominx",
		eventName: "Kilominx",
	},
	redi_cube: {
		puzzleID: "redi_cube",
		eventName: "Redi Cube",
	},
	baby_fto: {
		puzzleID: "baby_fto",
		eventName: "Baby FTO",
	},
	// loopover: {
	// 	puzzleID: "loopover",
	// 	eventName: "Loopover",
	// },
};

export type WcaEvent = keyof typeof wcaEvents;
export type AllEvent = keyof typeof allEvents;

export const placeholderScrambles = {
	"222": "X' X X X X' X X' XX XX XX X'",
	"333": "XX X' X XX XX X' X XX XX XX XX XX X XX XX X XX XX X' X X",
	"444":
		"X XX X' X X X X' XX X' XX X' XX XX X XX X' X' XX XX X XXX X XXX X' XXX XX XXX X' XXX X' XXX X X' XX' XX XX XX X' XX' XX' XX XX X XXX XX",
	"555":
		"XX XX' X' X' XX XXX X XXX XX' X XX XX XX' XX' XXX XXX XX' XX XX' X XXX XXX XX' X XX XX' X X' XX XX XX' X' XX' XX X XX XX X XX X' XX' XX' X XX XX XXX XXX XXX XXX XX XX' XXX XXX X' XX XX' XX X' XX X",
	"666":
		"X XX' X' XX XX' XX XX' X' X XXXX XXX XXX' X' XXX X' XXX XXXX XX XX XX XX' XX' X' X' XX X' X X XXX' XXX XX' XX XXX XX XX XX' XXX' X' X' XX X' XX' X' X XXX XX X X XXX XXXX XX' XX' XX X XX X X XX X' XX' XXX' XX X XXX XXX XX X' XXXX XX XXX XX' XXX' XX' XX XX XX' XX' X XX XXX",
	"777":
		"XX' XXXX XX XX XX X' XXX XX XXXX XX' XXX X' XXX' X' XXX XXX' X' XXX XXX X XXXX XXXX XX X XX' XX' XXXX XXXX X XX XXX XX X' XX X' XX XX XXXX XXXX XXX XX' XX' XXX XX XXXX XXX X X' XX' XX XXX XXX X XXXX XXX' XXX XXX X' XXX XX XX' XXX XXX X' XXX' XX XXX XX XX XXXX XXXX XXX X' XX X' X' XXX XXXX XX XXXX XX XX X' X' XX XXX' XX XX XXX XXX' XX XX XXX XXX' XXX X X X' X' X",
	"333bf": "X' X X' X' X X X' XX XX X XX X XX XX X' XX X' X' X XX' XX",
	"333fm":
		"X' X' X X X' X' X X' X X' XX X X XX XX X XX XX XX XX X XX XX X XX XX XX X' X' X",
	"333oh": "X XX X XX XX X' XX XX XX XX XX XX X' X' X' X XX X' XX XX X",
	clock: "XXXX XXXX XXXX XXXX XXX XXX XXX XXX XXXXX XX XXX XXX XXX XXX XXXXX",
	minx: "XXX XXX XXX XXX XXX XXX XXX XXX XXX XXX X\nXXX XXX XXX XXX XXX XXX XXX XXX XXX XXX X'\nXXX XXX XXX XXX XXX XXX XXX XXX XXX XXX X\nXXX XXX XXX XXX XXX XXX XXX XXX XXX XXX X\nXXX XXX XXX XXX XXX XXX XXX XXX XXX XXX X\nXXX XXX XXX XXX XXX XXX XXX XXX XXX XXX X\nXXX XXX XXX XXX XXX XXX XXX XXX XXX XXX X'",
	pyram: "X X X X' X X' X' X X X X X'",
	skewb: "X' X X' X' X X X' X' X' X' X'",
	sq1: "XXX XX X XXX XX X XXXX XX X XXXX XXX X XXX XX X XXXX XXX X XXXX XX X XXX XXX X XXX XX X XXX XXX X XXXX XX X XXXX XXX X XXX XXX",
	"444bf":
		"XX X X X' X XX X X' X' X XX X XX XX XX XX X' XX X' XX X' XXX XXX X XXX X' XX XX X' XXX X' XX XX XX X XX XX XXX XX' X XX XX' X' XX' XX X X'",
	"555bf":
		"X XX X' X' XX XX' XX XXX XX X XX XX' XX XX' XX X' XXX X' X' XX' XX XXX XX XX' XXX XX XX X XXX XX' XXX XX X XX XXX XX' X XX' XX XXX XXX X' XXX XX XX X' X' XXX X' XX' XX XX XX XXX XXX X XX XX' X XX XXX'",
	"333mbf": "XX X' X' X X X X X' X' X XX X XX X' XX XX XX XX XX X XX",
	fto: "X' X X' X X' X' X' X X' X X X' X X X' X X' X X X X' X XX' X XX X' X'",
	master_tetraminx: "X X' X' X' X X' X' X X' X X' X' X X X' X X' X X'",
	kilominx:
		"XXX XX XX' X' XX' XX' X X XX XX X XXX X' XX' X XXX' XX XXX XX X' X XX XX' X XX XX X' X' XX'",
	redi_cube: "X' X' X X XX' X' X XX' X' X' XX X' XX' X' X' XX XX",
	baby_fto: "X' X X X' X' X' X' X' X X'",
};
