//	/d2bs/kolbot/libs/Builds/Sorceress.ExampleBuild.js

/**
*
* Instructions: 	See /d2bs/kolbot/libs/config/Builds/README.txt
*
* Skill IDs: 	See /d2bs/kolbot/sdk/skills.txt for a list of skill IDs.
*
* Stat IDs: 
*
* 	Strength=0
* 	Energy=1
* 	Dexterity=2
* 	Vitality=3
*
*/
js_strict(true);

if(!isIncluded("common/Cubing.js")){include("common/Cubing.js");};
if(!isIncluded("common/Prototypes.js")){include("common/Prototypes.js");};
if(!isIncluded("common/Runewords.js")){include("common/Runewords.js");};
if(!isIncluded("common/LevelTown.js")){include("common/LevelTown.js");};

var AutoBuildTemplate={

	1: 	{
			Update: function(){
				Config.PickitFiles.push("LateGame.nip");
				Config.PickitFiles.push("MidGame.nip");
				Config.PickitFiles.push("EarlyGame.nip");
				Config.PickitFiles.push("FireRunes.nip");
				Config.PickitFiles.push("AutoEquip/Fire.xpac.nip");
				//Don't Gamble low level Rings/Amulets
				Config.GambleItems.splice(Config.GambleItems.indexOf("Amulet"),1);
				Config.GambleItems.splice(Config.GambleItems.indexOf("Ring"),1);
				//High Resistance or Skill Uniques
				Config.GambleItems.push("SkullCap");
				Config.GambleItems.push("AncientArmor");
				Config.GambleItems.push("GothicShield");
				Config.GambleItems.push("LightPlate");
				Config.GambleItems.push("Sash");
				Config.GambleItems.push("Belt");
				//Life Steal Merc Uniques				
				Config.GambleItems.push("Brandistock");
				Config.GambleItems.push("Poleaxe");
				Config.GambleItems.push("Crown");
				Config.GambleItems.push("BoneHelm");
				Config.GambleItems.push("QuiltedArmor");
				Config.GambleItems.push("PlateMail");
				//Build Specific
				Config.GambleItems.push("LightGauntlets");
				Config.PickitFiles.push("AutoEquip/PreMerc.xpac.nip");
				Config.PickitFiles.push("AutoEquip/Merc.xpac.nip");
				Config.Inventory[0]=[1,1,1,1,1,1,1,1,1,1];
				Config.Inventory[1]=[1,1,1,1,1,1,1,1,1,1];
				Config.Inventory[2]=[1,1,1,1,1,1,1,1,1,1];
				Config.Inventory[3]=[1,1,1,1,1,1,1,1,1,1];
				Config.AutoEquip=true;
				Config.MiniShopBot=true;
				Config.LowGold=250000;
				Config.UseMerc=true;
				Config.OpenChests=false;
				Config.ClearType=0;//Monster spectype to kill in level clear scripts(0=all)
				Config.LogExperience=true;//Print experience statistics in the manager.
				Config.ItemInfo=true;//Log stashed,skipped (due to no space) or sold items.
				Config.StashGold=200;//Minimum amount of gold to stash.
				Config.AttackSkill=[36,36,36,36,36,0,0];
				Config.LowManaSkill=[0,0];
				Config.PublicMode=2;
				Config.ScanShrines=[17,1,2,3,15,13,12,8,9,10,11];
				Config.BeltColumn=["hp","mp","mp","mp"];//Keep tons of health potions!
				Config.MinColumn=[2,2,2,2];
				Config.HealHP=99;
				Config.HealMP=99;
				Config.LifeChicken=15;
				Config.ManaChicken=0;
				Config.MercChicken=0;
				Config.TownHP=30;
				Config.UseHP=60;
				Config.UseMP=3;
				Config.UseRejuvHP=35;
				Config.PickRange=60;
				Config.BossPriority=true;
				Config.Leader="Zer_Shout";
				Scripts.LevelLeader=false;
				Scripts.LevelFollower=true;
			}
		},
		
	2: 	{
			SkillPoints: [37],//Warmth
			StatPoints: [0,1,1,3,3],//Str,Vit + 1 & Energy +2
			Update: function(){
				Config.StaticList=["Countess","Andariel","Radament","Duriel","Mephisto","Izual","Diablo","Shenk","Baal"];
			}
		},
		
	3: 	{
			SkillPoints: [40],//Frozen Armor
			StatPoints: [0,1,1,3,3],
			Update: function(){
				Config.AttackSkill=[36,36,36,36,36,0,0];
			}
		},
		
	4: 	{
			SkillPoints: [36],//Fire Bolt
			StatPoints: [0,1,1,3,3],
			Update: function(){
				Config.AttackSkill=[36,36,36,36,36,0,0];
			}
		},

	5: 	{
			SkillPoints: [38],//Charged Bolt
			StatPoints: [0,1,1,3,3],
			Update: function(){
				Config.AttackSkill=[36,36,36,36,36,38,38];
				Config.Dodge=true;
				Config.DodgeRange=5;
				Config.DodgeHP=35;
			}
		},

	6: 	{
			SkillPoints: [42],//Static
			StatPoints: [0,1,1,3,3],
			Update: function(){
				Config.AttackSkill=[36,36,36,36,36,38,38];
			}
		},

	7: 	{
			SkillPoints: [43],//Telekinesis
			StatPoints: [0,1,1,3,3],
			Update: function(){
				Config.AttackSkill=[36,36,36,36,36,38,38];
			}				
		},

	8: 	{
			SkillPoints: [36],
			StatPoints: [0,1,1,3,3],
			Update: function(){
				Config.AttackSkill=[36,36,36,36,36,38,38];
			}	
		},

	9: 	{
			SkillPoints: [36],
			StatPoints: [0,1,1,3,3],
			Update: function(){
				Config.CastStatic=20;
			}
		},

	10: 	{
			SkillPoints: [36],
			StatPoints: [0,1,1,3,3],
			Update: function(){
				Config.DodgeRange=10;
				Config.DodgeHP=50;
			}
		},

	11: 	{
			SkillPoints: [36],
			StatPoints: [0,1,1,3,3],
			Update: function(){
				Config.MinColumn=[3,3,3,3];
			}
		},

	12: 	{
			SkillPoints: [47],//Fireball
			StatPoints: [0,1,1,3,3],
			Update: function(){
				Config.AttackSkill=[36,47,47,47,47,38,38];
			}
		},

	13: 	{
			SkillPoints: [49],//Lightning
			StatPoints: [0,1,1,3,3],
			Update: function(){
				Config.AttackSkill=[42,47,47,47,47,49,49];
			}	
		},

	14: 	{
			SkillPoints: [47],
			StatPoints: [0,1,1,3,3],
			Update: function(){
				Config.AttackSkill=[42,47,47,47,47,49,49];
			}	
		},

	15: 	{
			SkillPoints: [47],
			StatPoints: [0,1,1,3,3],
			Update: function(){
				Config.MakeRunewords=true;
				//Weapon
				Config.Runewords.push([Runeword.Leaf,"Short Staff"]);
				Config.Runewords.push([Runeword.Leaf,"Long Staff"]);
				Config.Runewords.push([Runeword.Leaf,"Gnarled Staff"]);
				Config.Runewords.push([Runeword.Leaf,"Battle Staff"]);
				Config.Runewords.push([Runeword.Leaf,"War Staff"]);
				Config.Runewords.push([Runeword.Memory,"Gnarled Staff"]);
				Config.Runewords.push([Runeword.Memory,"Battle Staff"]);
				Config.Runewords.push([Runeword.Memory,"War Staff"]);
				Config.Runewords.push([Runeword.Memory,"Cedar Staff"]);
				Config.Runewords.push([Runeword.Memory,"Gothic Staff"]);
				Config.Runewords.push([Runeword.Memory,"Rune Staff"]);
				Config.Runewords.push([Runeword.Memory,"Shillelagh"]);
				Config.Runewords.push([Runeword.Memory,"Archon Staff"]);
				Config.Runewords.push([Runeword.Spirit,"Crystal Sword"]);
				Config.Runewords.push([Runeword.Spirit,"Broad Sword"]);
				//Armor
				Config.Runewords.push([Runeword.Stealth,"Quilted Armor"]);
				Config.Runewords.push([Runeword.Stealth,"Leather Armor"]);
				Config.Runewords.push([Runeword.Stealth,"Hard Leather Armor"]);
				Config.Runewords.push([Runeword.Stealth,"Studded Leather"]);
				Config.Runewords.push([Runeword.Stealth,"Ring Mail"]);
				Config.Runewords.push([Runeword.Stealth,"Breast Plate"]);
				Config.Runewords.push([Runeword.Stealth,"Light Plate"]);
				Config.Runewords.push([Runeword.Enlightenment,"Light Plate"]);
				Config.Runewords.push([Runeword.Enlightenment,"Mage Plate"]);
				Config.Runewords.push([Runeword.ChainsofHonor,"Archon Plate"]);
				//Helm
				Config.Runewords.push([Runeword.Lore,"Cap"]);
				Config.Runewords.push([Runeword.Lore,"Skull Cap"]);
				Config.Runewords.push([Runeword.Lore,"Helm"]);
				Config.Runewords.push([Runeword.Lore,"Mask"]);
				Config.Runewords.push([Runeword.Lore,"Bone Helm"]);
				Config.Runewords.push([Runeword.Lore,"War Hat"]);
				Config.Runewords.push([Runeword.Lore,"Sallet"]);
				Config.Runewords.push([Runeword.Lore,"Casque"]);
				Config.Runewords.push([Runeword.Lore,"Death Mask"]);
				Config.Runewords.push([Runeword.Lore,"Grim Helm"]);
				//Shield
				Config.Runewords.push([Runeword.Splendor,"Round Shield"]);
				Config.Runewords.push([Runeword.Splendor,"Grim Shield"]);
				Config.Runewords.push([Runeword.Spirit,"Monarch"]);
				//Merc Gear
				Config.Runewords.push([Runeword.Insight,"Voulge"]);
				Config.Runewords.push([Runeword.Insight,"Poleaxe"]);
				Config.Runewords.push([Runeword.Insight,"Scythe"]);
				Config.Runewords.push([Runeword.Insight,"Halberd"]);
				Config.Runewords.push([Runeword.Insight,"War Scythe"]);
				Config.Runewords.push([Runeword.Insight,"Bill"]);
				Config.Runewords.push([Runeword.Insight,"Battle Scythe"]);
				Config.Runewords.push([Runeword.Insight,"Partizan"]);
				Config.Runewords.push([Runeword.Insight,"Bec De Corbin"]);
				Config.Runewords.push([Runeword.Insight,"Grim Scythe"]);
				Config.Runewords.push([Runeword.Insight,"Colossus Voulge"]);
				Config.Runewords.push([Runeword.Insight,"Thresher"]);
				Config.Runewords.push([Runeword.Insight,"Cryptic Axe"]);
				Config.Runewords.push([Runeword.Insight,"Great Poleaxe"]);
				Config.Runewords.push([Runeword.Insight,"Giant Thresher"]);
			}	
		},

	16: 	{
			SkillPoints: [47],
			StatPoints: [0,1,1,3,3],
			Update: function(){
				Config.UseMP=20;
			}	
		},

	17: 	{
			SkillPoints: [47],
			StatPoints: [0,1,1,3,3],
			Update: function(){
				Config.AttackSkill=[42,47,47,47,47,49,49];
			}	
		},

	18: 	{
			SkillPoints: [54],//Teleport
			StatPoints: [0,1,1,3,3],
			Update: function(){
				Config.LowManaSkill=[36,36];
				Config.DodgeRange=15;
				Config.DodgeHP=70;
			}	
		},

	19: 	{
			SkillPoints: [52],//Enchant
			StatPoints: [0,1,1,3,3],	
			Update: function(){
				Config.AttackSkill=[42,47,47,47,47,49,49];
			}
		},

	20: 	{
			SkillPoints: [53],//Chain Lightning
			StatPoints: [0,1,1,3,3],
			Update: function(){
				Config.Cubing=true;
				Config.AttackSkill=[42,47,47,47,47,53,49];
			}
		},

	21: 	{
			SkillPoints: [47],
			StatPoints: [0,1,1,3,3],
			Update: function(){
				Config.AttackSkill=[42,47,47,47,47,53,49];
			}	
		},

	22: 	{
			SkillPoints: [47],
			StatPoints: [0,1,1,3,3],
			Update: function(){
				Config.AttackSkill=[42,47,47,47,47,53,49];
			}	
		},

	23: 	{
			SkillPoints: [47],
			StatPoints: [0,1,1,3,3],
			Update: function(){
				Config.AttackSkill=[42,47,47,47,47,53,49];
			}	
		},

	24: 	{
			SkillPoints: [58],//Energy Shield
			StatPoints: [0,1,1,3,3],
			Update: function(){
				Config.AttackSkill=[42,47,47,47,47,53,49];
				Config.DodgeHP=90;
			}
		},

	25: 	{
			SkillPoints: [47],
			StatPoints: [0,1,1,3,3],
			Update: function(){
				Config.Cubing=true;
				Config.Recipes.push([Recipe.Rune,"Ral Rune"]);
				Config.Recipes.push([Recipe.Rune,"Ort Rune"]);
				Config.Recipes.push([Recipe.Rune,"Thul Rune"]);
				Config.Recipes.push([Recipe.Rune,"Amn Rune"]);
				Config.Recipes.push([Recipe.Rune,"Sol Rune"]);
				Config.Recipes.push([Recipe.Rune,"Lum Rune"]);
			}	
		},

	26: 	{
			SkillPoints: [47],
			StatPoints: [0,1,1,3,3],
			Update: function(){
				Config.AttackSkill=[42,47,47,47,47,53,49];
			}	
		},

	27: 	{
			SkillPoints: [47],
			StatPoints: [0,1,1,3,3],
			Update: function(){
				Config.BeltColumn=["hp","rv","mp","mp"];
			}	
		},

	28: 	{
			SkillPoints: [47],
			StatPoints: [0,1,1,3,3],
			Update: function(){
				Config.AttackSkill=[42,47,47,47,47,53,49];
			}	
		},

	29: 	{
			SkillPoints: [47],
			StatPoints: [0,1,1,3,3],	
			Update: function(){
				Config.MinColumn=[4,4,4,4];
			}
		},

	30: 	{
			SkillPoints: [62],//Hydra
			StatPoints: [0,1,1,3,3],	
			Update: function(){
				Config.AttackSkill=[62,47,47,47,47,53,49];
			}
		},

	31: 	{
			SkillPoints: [61],//Fire Mastery
			StatPoints: [0,1,1,3,3],
			Update: function(){
				Config.AttackSkill=[62,47,47,47,47,53,49];
			}
		},

	32: 	{
			SkillPoints: [47],
			StatPoints: [0,1,1,3,3],
			Update: function(){
				Config.AttackSkill=[62,47,47,47,47,53,49];
			}
		},

	33: 	{
			SkillPoints: [47],
			StatPoints: [0,1,1,3,3],
			Update: function(){
				Config.AttackSkill=[62,47,47,47,47,53,49];
			}
		},

	34: 	{
			SkillPoints: [47],
			StatPoints: [0,1,1,3,3],
			Update: function(){
				Config.AttackSkill=[62,47,47,47,47,53,49];
			}
		},

	35: 	{
			SkillPoints: [47],
			StatPoints: [0,1,1,3,3],
			Update: function(){
				Config.AttackSkill=[62,47,47,47,47,53,49];
			}
		},

	36: 	{
			SkillPoints: [47],
			StatPoints: [0,1,1,3,3],
			Update: function(){
				Config.AttackSkill=[62,47,47,47,47,53,49];
			}
		},

	37: 	{
			SkillPoints: [47],
			StatPoints: [0,1,1,3,3],
			Update: function(){
				Config.AttackSkill=[62,47,47,47,47,53,49];
			}
		},

	38: 	{
			SkillPoints: [47],
			StatPoints: [0,1,1,3,3],
			Update: function(){
				Config.AttackSkill=[62,47,47,47,47,53,49];
			}
		},

	39: 	{
			SkillPoints: [61],
			StatPoints: [0,1,1,3,3],
			Update: function(){
				Config.AttackSkill=[62,47,47,47,47,53,49];
			}
		},

	40: 	{
			SkillPoints: [61],
			StatPoints: [0,1,1,3,3],
			Update: function(){
				Config.LowGold=500000;
				Config.Gamble=true;
				Config.GambleGoldStart=500000;
				Config.GambleGoldStop=200000;
			}
		},

	41: 	{
			SkillPoints: [61],
			StatPoints: [0,1,1,3,3],
			Update: function(){
				Config.AttackSkill=[62,47,47,47,47,53,49];
			}
		},

	42: 	{
			SkillPoints: [61],
			StatPoints: [0,1,1,3,3],
			Update: function(){
				Config.AttackSkill=[62,47,47,47,47,53,49];
			}
		},

	43: 	{
			SkillPoints: [61],
			StatPoints: [0,1,1,3,3],
			Update: function(){
				Config.AttackSkill=[62,47,47,47,47,53,49];
			}
		},

	44: 	{
			SkillPoints: [61],
			StatPoints: [0,1,1,3,3],
			Update: function(){
				Config.AttackSkill=[62,47,47,47,47,53,49];
			}
		},

	45: 	{
			SkillPoints: [61],
			StatPoints: [0,1,1,3,3],
			Update: function(){
				Config.PickitFiles.splice(Config.PickitFiles.indexOf("EarlyGame.nip"),1);
				Config.PickitFiles.splice(Config.PickitFiles.indexOf("AutoEquip/PreMerc.xpac.nip"),1);
			}
		},

	46: 	{
			SkillPoints: [61],
			StatPoints: [0,1,1,3,3],
			Update: function(){
				Config.AttackSkill=[62,47,47,47,47,53,49];
			}
		},

	47: 	{
			SkillPoints: [61],
			StatPoints: [0,1,1,3,3],
			Update: function(){
				Config.AttackSkill=[62,47,47,47,47,53,49];
			}
		},

	48: 	{
			SkillPoints: [61],
			StatPoints: [0,1,1,3,3],
			Update: function(){
				Config.AttackSkill=[62,47,47,47,47,53,49];
			}
		},

	49: 	{
			SkillPoints: [61],
			StatPoints: [0,1,1,3,3],
			Update: function(){
				Config.AttackSkill=[62,47,47,47,47,53,49];
			}
		},

	50: 	{
			SkillPoints: [61],
			StatPoints: [0,1,1,3,3],
			Update: function(){
				Config.UseHP=80;
				Config.UseMP=50;
			}
		},

	51: 	{
			SkillPoints: [61],
			StatPoints: [0,1,1,3,3],
			Update: function(){
				Config.CastStatic=50;
			}
		},

	52: 	{
			SkillPoints: [61],
			StatPoints: [0,1,1,3,3],
			Update: function(){
				Config.AttackSkill=[62,47,47,47,47,53,49];
			}
		},

	53: 	{
			SkillPoints: [61],
			StatPoints: [0,1,1,3,3],
			Update: function(){
				Config.AttackSkill=[62,47,47,47,47,53,49];
			}
		},

	54: 	{
			SkillPoints: [61],
			StatPoints: [0,1,1,3,3],
			Update: function(){
				Config.AttackSkill=[62,47,47,47,47,53,49];
			}
		},

	55: 	{
			SkillPoints: [61],
			StatPoints: [0,1,1,3,3],
			Update: function(){
				Config.AttackSkill=[62,47,47,47,47,53,49];
			}
		},

	56: 	{
			SkillPoints: [61],
			StatPoints: [0,1,1,3,3],
			Update: function(){
				Config.AttackSkill=[62,47,47,47,47,53,49];
			}
		},

	57: 	{
			SkillPoints: [61],
			StatPoints: [0,1,1,3,3],
			Update: function(){
				Config.AttackSkill=[62,47,47,47,47,53,49];
			}
		},

	58: 	{
			SkillPoints: [61],
			StatPoints: [0,1,1,3,3],
			Update: function(){
				Config.AttackSkill=[62,47,47,47,47,53,49];
			}
		},

	59: 	{
			SkillPoints: [43],
			StatPoints: [0,1,1,3,3],
			Update: function(){
				Config.AttackSkill=[62,47,47,47,47,53,49];
			}
		},

	60: 	{
			SkillPoints: [43],
			StatPoints: [0,1,1,3,3],
			Update: function(){
				Config.AttackSkill=[62,47,47,47,47,53,49];
			}
		},

	61: 	{
			SkillPoints: [61,43,47,36],
			StatPoints: [0,1,1,3,3],
			Update: function(){
				Config.AttackSkill=[62,47,47,47,47,53,49];
			}
		},

	62: 	{
			SkillPoints: [61,43,47,36],
			StatPoints: [0,1,1,3,3],
			Update: function(){
				Config.AttackSkill=[62,47,47,47,47,53,49];
			}
		},

	63: 	{
			SkillPoints: [61,43,47,36],
			StatPoints: [0,1,1,3,3],
			Update: function(){
				Config.AttackSkill=[62,47,47,47,47,53,49];
			}
		},

	64: 	{
			SkillPoints: [61,43,47,36],
			StatPoints: [0,1,1,3,3],
			Update: function(){
				Config.AttackSkill=[62,47,47,47,47,53,49];
			}
		},

	65: 	{
			SkillPoints: [61,43,47,36],
			StatPoints: [0,1,1,3,3],
			Update: function(){
				Config.AttackSkill=[62,47,47,47,47,53,49];
			}
		},

	66: 	{
			SkillPoints: [61,43,47,36],
			StatPoints: [0,1,1,3,3],
			Update: function(){
				Config.AttackSkill=[62,47,47,47,47,53,49];
			}
		},

	67: 	{
			SkillPoints: [61,43,47,36],
			StatPoints: [0,1,1,3,3],
			Update: function(){
				Config.AttackSkill=[62,47,47,47,47,53,49];
			}
		},

	68: 	{
			SkillPoints: [61,43,47,36],
			StatPoints: [0,1,1,3,3],
			Update: function(){
				Config.AttackSkill=[62,47,47,47,47,53,49];
			}
		},

	69: 	{
			SkillPoints: [61,43,47,36],
			StatPoints: [0,1,1,3,3],
			Update: function(){
				Config.UseRejuvHP=40;
				Config.LifeChicken=20;
			}
		},

	70: 	{
			SkillPoints: [61,43,47,36],
			StatPoints: [0,1,1,3,3],
			Update: function(){
				Config.Gamble=false;
				Config.DodgeRange=20;
				//Eth Merc Weapon
				Config.Recipes.push([Recipe.Socket.Weapon,"Bill",Roll.Eth]);
				Config.Recipes.push([Recipe.Socket.Weapon,"Partizan",Roll.Eth]);
				Config.Recipes.push([Recipe.Socket.Weapon,"Battle Scythe",Roll.Eth]);
				Config.Recipes.push([Recipe.Socket.Weapon,"Bec De Corbin",Roll.Eth]);
				Config.Recipes.push([Recipe.Socket.Weapon,"Grim Scythe",Roll.Eth]);
				Config.Recipes.push([Recipe.Socket.Weapon,"Colossus Voulge",Roll.Eth]);
				Config.Recipes.push([Recipe.Socket.Weapon,"Thresher",Roll.Eth]);
				Config.Recipes.push([Recipe.Socket.Weapon,"Cryptic Axe",Roll.Eth]);
				Config.Recipes.push([Recipe.Socket.Weapon,"Great Poleaxe",Roll.Eth]);
				Config.Recipes.push([Recipe.Socket.Weapon,"Giant Thresher",Roll.Eth]);
				//Enlightenment or Chains of Honor
				Config.Recipes.push([Recipe.Socket.Armor,"Light Plate",Roll.NonEth]);
				Config.Recipes.push([Recipe.Socket.Armor,"Mage Plate",Roll.NonEth]);
				Config.Recipes.push([Recipe.Socket.Armor,"Archon Plate",Roll.NonEth]);
				//Spirit or Splendor base
				Config.Recipes.push([Recipe.Socket.Armor,"Monarch",Roll.NonEth]);
				//Misc
				Config.Recipes.push([Recipe.Reroll.Magic,"Grand Charm"]);
				Config.Recipes.push([Recipe.Caster.Amulet]);
				Config.Recipes.push([Recipe.Caster.Ring]);
			}
		},

	71: 	{
			SkillPoints: [43],
			StatPoints: [0,1,1,3,3],
			Update: function(){
				Config.AttackSkill=[62,47,47,47,47,53,49];
			}
		},

	72: 	{
			SkillPoints: [43],
			StatPoints: [0,1,1,3,3],
			Update: function(){
				Config.AttackSkill=[62,47,47,47,47,53,49];
			}
		},

	73: 	{
			SkillPoints: [43],
			StatPoints: [0,1,1,3,3],
			Update: function(){
				Config.AttackSkill=[62,47,47,47,47,53,49];
			}
		},

	74: 	{
			SkillPoints: [43],
			StatPoints: [0,1,1,3,3],
			Update: function(){
				Config.AttackSkill=[62,47,47,47,47,53,49];
			}
		},

	75: 	{
			SkillPoints: [43],
			StatPoints: [0,1,1,3,3],
			Update: function(){
				Config.AttackSkill=[62,47,47,47,47,53,49];
			}
		},

	76: 	{
			SkillPoints: [43],
			StatPoints: [0,1,1,3,3],
			Update: function(){
				Config.AttackSkill=[62,47,47,47,47,53,49];
			}
		},

	77: 	{
			SkillPoints: [43],
			StatPoints: [0,1,1,3,3],
			Update: function(){
				Config.AttackSkill=[62,47,47,47,47,53,49];
			}
		},

	78: 	{
			SkillPoints: [43],
			StatPoints: [0,1,1,3,3],
			Update: function(){
				Config.AttackSkill=[62,47,47,47,47,53,49];
			}
		},

	79: 	{
			SkillPoints: [43],
			StatPoints: [0,1,1,3,3],
			Update: function(){
				Config.AttackSkill=[62,47,47,47,47,53,49];
			}
		},

	80: 	{
			SkillPoints: [43],
			StatPoints: [0,1,1,3,3],
			Update: function(){
				Config.KeepRunewords.push("[Type] == Shield || [Type] == AuricShields # [FCR] == 35");
				Config.KeepRunewords.push("[Type] == Sword # [FCR] == 35");
			}
		},

	81: 	{
			SkillPoints: [43],
			StatPoints: [0,1,1,3,3],
			Update: function(){
				Config.AttackSkill=[62,47,47,47,47,53,49];
			}
		},

	82: 	{
			SkillPoints: [43],
			StatPoints: [0,1,1,3,3],
			Update: function(){
				Config.AttackSkill=[62,47,47,47,47,53,49];
			}
		},

	83: 	{
			SkillPoints: [43],
			StatPoints: [0,1,1,3,3],
			Update: function(){
				Config.AttackSkill=[62,47,47,47,47,53,49];
			}
		},

	84: 	{
			SkillPoints: [43],
			StatPoints: [0,1,1,3,3],
			Update: function(){
				Config.AttackSkill=[62,47,47,47,47,53,49];
			}
		},

	85: 	{
			SkillPoints: [43],
			StatPoints: [0,1,1,3,3],
			Update: function(){
				Config.PickitFiles.splice(Config.PickitFiles.indexOf("MidGame.nip"),1);
				Config.LowGold=1000000;
				Config.GambleGoldStart=600000;
				Config.GambleGoldStop=200000;
			}
		},

	86: 	{
			SkillPoints: [43],
			StatPoints: [0,1,1,3,3],
			Update: function(){
				Config.AttackSkill=[62,47,47,47,47,53,49];
			}
		},

	87: 	{
			SkillPoints: [43],
			StatPoints: [0,1,1,3,3],
			Update: function(){
				Config.AttackSkill=[62,47,47,47,47,53,49];
			}
		},

	88: 	{
			SkillPoints: [43],
			StatPoints: [0,1,1,3,3],
			Update: function(){
				Config.AttackSkill=[62,47,47,47,47,53,49];
			}
		},

	89: 	{
			SkillPoints: [36],
			StatPoints: [0,1,1,3,3],
			Update: function(){
				Config.AttackSkill=[62,47,47,47,47,53,49];
			}
		},

	90: 	{
			SkillPoints: [36],
			StatPoints: [0,1,1,3,3],
			Update: function(){
				Config.AttackSkill=[62,47,47,47,47,53,49];
			}
		},

	91: 	{
			SkillPoints: [36],
			StatPoints: [0,1,1,3,3],
			Update: function(){
				Config.AttackSkill=[62,47,47,47,47,53,49];
			}
		},

	92: 	{
			SkillPoints: [36],
			StatPoints: [0,1,1,3,3],
			Update: function(){
				Config.AttackSkill=[62,47,47,47,47,53,49];
			}
		},

	93: 	{
			SkillPoints: [36],
			StatPoints: [0,1,1,3,3],
			Update: function(){
				Config.AttackSkill=[62,47,47,47,47,53,49];
			}
		},

	94: 	{
			SkillPoints: [36],
			StatPoints: [0,1,1,3,3],
			Update: function(){
				Config.AttackSkill=[62,47,47,47,47,53,49];
			}
		},

	95: 	{
			SkillPoints: [36],
			StatPoints: [0,1,1,3,3],
			Update: function(){
				Config.AttackSkill=[62,47,47,47,47,53,49];
			}
		},

	96: 	{
			SkillPoints: [36],
			StatPoints: [0,1,1,3,3],
			Update: function(){
				Config.AttackSkill=[62,47,47,47,47,53,49];
			}
		},

	97: 	{
			SkillPoints: [36],
			StatPoints: [0,1,1,3,3],
			Update: function(){
				Config.AttackSkill=[62,47,47,47,47,53,49];
			}
		},

	98: 	{
			SkillPoints: [36],
			StatPoints: [0,1,1,3,3],
			Update: function(){
				Config.AttackSkill=[62,47,47,47,47,53,49];
			}
		},

	99: 	{
			SkillPoints: [36],
			StatPoints: [0,1,1,3,3],
			Update: function(){
				Config.AttackSkill=[62,47,47,47,47,53,49];
			}
		}
};
