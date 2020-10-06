/**
*	@filename	LevelingFollower.js
*	@author		Zer
*	@desc		Follow the leader through acts
*/

function LevelFollower(){
	var LeaderUnit,WhoIsLeader,TalRashaTomb=getRoom().correcttomb;
	var MercId=[],MyMercDiff=0,MercAuraName,HiredMercAura;
	var MercAuraSkills=[0,104,98,114,99,108,0];
	var MercAuraNames=["$","Defiance","Might","Holy Freeze","Prayer","Blessed Aim","$"];
	var TownWaypoints=[0,40,75,103,109];
	var TeleportAreas=[62,74,76,77,78,88];
	var WaypointAreas=[1,3,4,5,6,27,29,32,35,
	40,48,42,57,43,44,52,74,46,
	75,76,77,78,79,80,81,83,101,
	103,106,107,
	109,111,112,113,115,123,117,118,129];
	
	this.logProgress=function(Completed,Quest){
		var date=new Date(),day=date.getDate(),month=date.getMonth(),h=date.getHours(),m=date.getMinutes(),s=date.getSeconds(),Progress="Failed",
		dateString="["+(day < 10?"0"+day:day)+"/"+(month < 10?"0"+month:month)+" "+(h < 10?"0"+h:h)+":"+(m < 10?"0"+m:m)+":"+(s < 10?"0"+s:s)+"]";
		
		if(Completed){
			Progress="Completed";
		}		
		try{
			FileTools.appendText("logs/ProgressLog.txt",dateString+" "+Quest+" "+Progress+"\n");
		}catch(err){
			D2Bot.printToConsole("Failed to Log Progress",10);
			return false;
		}
		return true;
	};
	
	this.logGame=function(Details){
		var date=new Date(),day=date.getDate(),month=date.getMonth(),h=date.getHours(),m=date.getMinutes(),s=date.getSeconds(),
		dateString="["+(day < 10?"0"+day:day)+"/"+(month < 10?"0"+month:month)+" "+(h < 10?"0"+h:h)+":"+(m < 10?"0"+m:m)+":"+(s < 10?"0"+s:s)+"]";
		
		try{
			FileTools.appendText("logs/JoinLog.txt",dateString+" "+Details+"\n");
		}catch(err){
			D2Bot.printToConsole("Failed to Log Join",10);
			return false;
		}
		return true;
	};
	
	this.ChangeAct=function(DestinationAct){
		var NPC,preArea=me.area;
		if(Pather.accessToAct(DestinationAct) && getWaypoint(WaypointAreas.indexOf(TownWaypoints[DestinationAct-1]))){
			try{
				Pather.journeyTo(TownWaypoints[DestinationAct-1]);
			}catch(err){
				print("Failed using Waypoint to change acts")
			}
			return true;
		}
		try{
			switch(DestinationAct){
			case 2:
				Pather.journeyTo(0);
				Pather.moveTo(4862,5662,5);
				NPC=getUnit(1,"Warriv");
				if(NPC && NPC.openMenu()){
					Misc.useMenu(0x0D36);
				}
				break;
			case 3:
				Pather.journeyTo(40);
				Pather.moveTo(5091,5155,5);
				this.talkToNPC("Jerhyn");
				Pather.moveTo(5202,5056,5);
				Town.move("Meshif");
				NPC=getUnit(1,"Meshif");
				if(NPC && NPC.openMenu()){
					Misc.useMenu(0x0D38);
				}
				break;
			case 4:
				if(me.area != 102){
					Pather.journeyTo(102);
				}
				Pather.moveTo(17590,8068,2,true,true);
				delay(2000);
				Pather.moveTo(17601,8070,2,true,true);
				Pather.usePortal(null);
				break;
			case 5:
				Pather.journeyTo(103);
				this.talkToNPC("Tyrael");			
				delay(1000);
				if(getUnit(2,566)){
					me.cancel();
					Pather.useUnit(2,566,109);
				}else{
					Misc.useMenu(0x58D2);
				}
				break;
			}
			while(!me.area){
				delay(500);
			}
			if(preArea == me.area){
				say("Act change failed");
			}
		}catch(err){
			me.cancel();
			return false;
		}
		if(Config.UseMerc){
			Town.doChores();
			this.checkMerc();
		}
		
		return me.act == DestinationAct;
	};
	
	this.goFindLeader=function(LeaderArea){
		var LeaderAct,BaalPortal;
		if(LeaderArea){
			if(LeaderArea <= 39){LeaderAct=1;}
			else if(LeaderArea >= 40 && LeaderArea <= 74){LeaderAct=2;}
			else if(LeaderArea >= 75 && LeaderArea <= 102){LeaderAct=3;}
			else if(LeaderArea >= 103 && LeaderArea <= 108){LeaderAct=4;}
			else{LeaderAct=5;}
			//Make sure we are in the same act
			if(LeaderAct != me.act){
				this.ChangeAct(LeaderAct);
			}
			//Act3 Jungle fix			
			if(me.classid == 1 && (TeleportAreas.indexOf(me.area) > -1) && WhoIsLeader.inTown){
				this.teleportFromLocation(me.area);
			}
			
			if(LeaderArea != me.area){
				Pather.teleport=true;
				delay(500);
				switch(LeaderArea){
					//Go To Town
					case 1:
					case 40:
					case 75:
					case 103:
					case 109:
						try{Town.doChores();}catch(err){print("Failed going to town")}
						delay(500);
					break;
					//Talk to Atma for Tals Tomb
					case 46:
					case TalRashaTomb:
						if(!me.getQuest(13,0) && me.inTown){
							this.talkToNPC("Atma");
							try{Pather.useWaypoint(46);}catch(err){Pather.journeyTo(46);}
						}
					break;
					//Enter Duriels Lair
					case 73:
						if(me.area == TalRashaTomb){
							try{Pather.useUnit(2,100,73);}catch(err){Town.doChores();}
						}
					break;
					case 102:
						if(!me.getQuest(21,0) && me.inTown){
							this.talkToNPC("Cain");
							try{Pather.useWaypoint(101);}catch(err){Pather.journeyTo(102);}
						}
					break;
					case 129:
					case 130:
					case 131:
						if(!me.getQuest(39,0) && me.inTown){
							this.talkToNPC("Malah");
							try{Pather.useWaypoint(129);}catch(err){Pather.journeyTo(129);}
						}
					break;
					case 132:
						if(me.area == 131){
							BaalPortal=getUnit(2,563);
							if(BaalPortal && Pather.usePortal(null,null,BaalPortal)){
								delay(250);
							}
						}
					break;
				}
				//Check leader portals to area
				if(Pather.getPortal(LeaderArea,Config.Leader)){
					Pather.usePortal(LeaderArea,Config.Leader);
				}
				//Else if any portals to area
				else if(Pather.getPortal(LeaderArea,null)){
					Pather.usePortal(LeaderArea,null);
				}
				//Otherwise walk to leader
				else{
					Pather.journeyTo(LeaderArea);
				}
				delay(150);
				Pather.teleport=false;
				Pather.getWP(me.area,true);
			}
			//Find leader if not in Town
			if(!me.inTown){
				Pather.moveTo(WhoIsLeader.x-2,WhoIsLeader.y-2,2,true);
			}else{
				Town.doChores();
				Town.move("portalspot");
			}
		}else{
			print("Leader not partied");
			delay(1500);
		}
		return true;
	};
	
	this.talkToNPC=function(NPCName){
		var NPC;
		Town.goToTown();
		Town.move(NPCName);
		NPC=getUnit(1,NPCName);
		if(NPC && NPC.openMenu()){
			me.cancel();
		}else{
			print("Failed talking to "+NPCName);
			return false;
		}
		return true;
	};
	
	this.teleportFromLocation=function(CurrentArea){
		//Teleport to hard destinations
		var DestinationReached=false;
		Pather.teleport=true;
		while(!DestinationReached){
			switch(CurrentArea){
				//Maggot Lair
				case 62:
					Town.doChores();
					Pather.journeyTo(63);
					Pather.journeyTo(64);
					if(Pather.moveToPreset(64,2,356)){DestinationReached=true;}else{Town.doChores}
				break;
				//Arcane Sanctuary
				case 74:
					Pather.useWaypoint(40);
					Town.doChores();
					Pather.journeyTo(74);
					if(Pather.moveToPreset(74,2,357)){DestinationReached=true;}else{Pather.useWaypoint(40);}
				break;
				//Spider Forest
				case 76:
					try{if(getWaypoint(77) && Pather.useWaypoint(77)){DestinationReached=true;}}
					catch(err){if(Pather.journeyTo(77) && Pather.getWP(77)){DestinationReached=true;}}
				break;
				//Great Marsh
				case 77:
					try{if(getWaypoint(78) && Pather.useWaypoint(78)){DestinationReached=true;}}
					catch(err){if(Pather.journeyTo(78) && Pather.getWP(78)){DestinationReached=true;}}
				break;
				//Flayer Jungle
				case 78:
					try{if(getWaypoint(79) && Pather.useWaypoint(79)){DestinationReached=true;}}
					catch(err){if(Pather.journeyTo(79) && Pather.getWP(79)){DestinationReached=true;}}
				break;
				//Flayer Dungeon
				case 88:
					Town.doChores();
					Pather.journeyTo(89);
					Pather.journeyTo(91);
					if(Pather.moveToPreset(91,2,406)){DestinationReached=true;}else{Town.doChores}
				break;
			}
		}
		Town.doChores();
		Town.move("portalspot");
		return DestinationReached;
	};
	
	//Get Leader's unit identifier
	this.getLeaderUnit=function(name){
		var Player=getUnit(0,name);
		if(Player){
			do{
				if(Player.mode != 0 && Player.mode != 17){
					say("Found Leader");
					return Player;
				}
			}while(Player.getNext(WhoIsLeader.area));
		}
		return false;
	};
	
	this.checkMerc=function(){
		var ReplaceMerc=false,MyMerc=me.getMerc(),MercAuraName=MercAuraNames[me.classid];
		//Nightmare Auras instead of Norm Auras
		if(me.classid == 2 || me.classid == 3){MyMercDiff=1;}
		
		//If we have a Merc check its within level,otherwise get free one
		if(me.mercrevivecost > 0){
			if(me.gold < me.mercrevivecost){
				this.logProgress(me.getMerc(),"Not enough gold for Merc - "+me.name);
				return false;
			}else{
				//Revive and Assign Merc
				Town.reviveMerc();
				MyMerc=me.getMerc();
			}
		}
		if(MyMerc){
			if(Math.abs(me.charlvl-MyMerc.charlvl) > 10){
				ReplaceMerc=true;
			}
		}else{
			this.talkToNPC("Kashya");
			if(me.getMerc()){
				this.logProgress(me.getMerc(),"Got free Merc - "+me.name);
			}
		}
		
		if(ReplaceMerc && me.act >= 2){
			this.unEquipMerc();
			this.hireA2Merc();
			Item.autoEquipMerc();
			this.logProgress(me.getMerc(),"Replace Merc with "+HiredMercAura+" Merc - "+me.name);
		}
		
		return true;
	};
	
	this.unEquipMerc=function(){
		var cursorItem,i;		
		for(i=1; i < 5; i++){
			//2 Handed Weapons fix
			if(i == 2){i=3;}
			clickItem(4,i);
			delay(1000);

			if (me.itemoncursor) {
				delay(1000);
				cursorItem=getUnit(100);

				if (cursorItem) {
					Storage.Inventory.MoveTo(cursorItem);
					delay(1500);
					
					if (me.itemoncursor) {
						Misc.click(0,0,me);
						delay(1000);
					}
				}
			}
		}
		return true;
	};
	
	this.hireA2Merc=function(){
		var i,MyMerc;
		Town.goToTown(2);
		Pather.getWP(me.area);
		Pather.moveTo(5041,5055);
		addEventListener("gamepacket",gamePacket);
		var Greiz=getUnit(1,Town.tasks[1].Merc);
		if(Greiz && Greiz.openMenu()){
			while(MercId.length > 0){
				Pather.moveTo(5031+rand(-3,3),5048+rand(-3,3));
				Greiz.openMenu();
				Misc.useMenu(0x0D45);
				sendPacket(1,0x36,4,Greiz.gid,4,MercId[0]);
				delay(rand(100,1000));
				MyMerc=me.getMerc();
				for(i=0; i < MercAuraSkills.length; i++){
					if(MyMerc.getSkill(MercAuraSkills[i],1)){
						HiredMercAura=MercAuraNames[i];
					}
				}
				//If it's the wrong difficulty or we have the right aura stop
				if(me.diff != MyMercDiff || HiredMercAura == MercAuraName){
					return me.getMerc();
				}
			}
		}
		return me.getMerc();
	};
	
	this.gamePacket=function (bytes) {
		 switch(bytes[0]) {
			case 0x4e:
				var id=(bytes[2] << 8) + bytes[1];
				if(MercId.indexOf(id) != -1) {
					MercId.length=0;
				}
				MercId.push(id);
				break;
		}
	};
	
	this.configCharacter=function(CharacterLevel){
		var i,Party=getParty(),partyTimeout=0,MyMerc=me.getMerc(),MyMercLevel=0;
		Town.move("portalspot");
		this.checkMerc();
		if(MyMerc){MyMercLevel=MyMerc.charlvl;}
		//Only leader should carry Malahs Potion
		if(me.getItem(644)){
			var MalahPotion=me.getItem(644);
			MalahPotion.drop();
		}	
		delay(150);
		Pather.getWP(me.area);
		delay(150);
		Town.move("portalspot");
		if(CharacterLevel > 7){
			Town.doChores();
		}else{
			Town.heal();
		}
		Town.initNPC("Shop","BuyPotions");
		me.cancel();
		delay(150);
		Pickit.pickItems();
		WhoIsLeader=getParty(Config.Leader);
		//Loop to ensure leader is assigned
		while(!this.getLeaderUnit(Config.Leader)){
			delay(500);
			partyTimeout++;
			this.goFindLeader(WhoIsLeader.area);
			if(partyTimeout > 5){
				quit();
			}
		}
		LeaderUnit=this.getLeaderUnit(Config.Leader);
		this.logGame("Level:"+CharacterLevel+" Merclevel:"+(MyMercLevel-CharacterLevel)+" Gold:"+me.gold+" Char:"+me.name);
	};
	
	//Start Script
	this.configCharacter(me.charlvl);
	
	while(LeaderUnit){
		if(copyUnit(LeaderUnit).x){
			if(getDistance(me,LeaderUnit) > 5){
				Pather.teleport=false;
				if(me.inTown){
					Town.move("portalspot");
				}else{
					Pather.moveToUnit(LeaderUnit,rand(-4,4),rand(-4,4),true,true);
					Attack.clear(20);
				}
			}
			delay(250);
		}else{
			this.goFindLeader(WhoIsLeader.area);
		}
		delay(500);
	}
	return true;
}