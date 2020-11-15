export enum SongItemView {
	"default",
	"featured"
}

export enum EIcon {
	"settings"
}

export enum ERuneTypes {
	DOMINATION = 0,
	INSPIRATION = 1,
	PRECISION = 2,
	RESOLVE = 3,
	SORCERY = 4,
}

export enum EKeyStones {
	PressTheAttack = 0,
	LethalTempo = 1,
	FleetFootwork = 2,
	Conqueror = 3,
	Electrocute = 0,
	Predator = 1,
	DarkHarvest = 2,
	HailOfBlades = 3,
	SummonAery = 0,
	ArcaneComet = 1,
	PhaseRush = 2,
	GraspOfTheUndying = 0,
	Aftershock = 1,
	Guardian = 2,
	GlacialAugment = 0,
	UnsealedSpellbook = 1,
	MasterKey = 2,
}

export enum EPrecisionRunes {
	Overheal = 0,
	OverhealSlot = 1,
	Triumph = 1,
	TriumphSlot = 1,
	PresenceOfMind = 2,
	PresenceOfMindSlot = 1,
	LegendAlacrity = 0,
	LegendAlacritySlot = 2,
	LegendTenacity = 1,
	LegendTenacitySlot = 2,
	LegendBloodline = 2,
	LegendBloodlineSlot = 2,
	CoupDeGrace = 0,
	CoupDeGraceSlot = 3,
	CutDown = 1,
	CutDownSlot = 3,
	LastStand = 2,
	LastStandSlot = 3,
}

export enum EDominationRunes {
	CheapShot = 0,
	CheapShotSlot = 1,
	TasteOfBlood = 1,
	TasteOfBloodSlot = 1,
	SuddenImpact = 2,
	SuddenImpactSlot = 1,
	ZombieWard = 0,
	ZombieWardSlot = 2,
	GhostPoro = 1,
	GhostPoroSlot = 2,
	EyeballCollection = 2,
	EyeballCollectionSlot = 2,
	RavenousHunter = 0,
	RavenousHunterSlot = 3,
	IngeniousHunter = 1,
	IngeniousHunterSlot = 3,
	RelentlessHunter = 2,
	RelentlessHunterSlot = 3,
	UltimateHunter = 3,
	UltimateHunterSlot = 3,
}

export interface IRune {
	slot: number;
	rune: number;
}

export interface IRuneSet {
	title: string,
	main: ERuneTypes,
	secondary: ERuneTypes,
	keystone: IRune,
	rune1: IRune,
	rune2: IRune,
	rune3: IRune,
	rune4: IRune,
	rune5: IRune,
}

export interface ISkillOrder {
	description: string;
	skillOrder: string[];
}

export interface IMatchupList {
	role: string;
	champion: string;
	difficulty: string;
	runen: number;
	do_s: string[];
	don_ts: string[];
	notes: string[];
}