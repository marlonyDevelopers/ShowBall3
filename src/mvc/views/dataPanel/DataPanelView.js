(function(window){

	DataPanelView.STATE_WINNER       = "WINNER";
	DataPanelView.STATE_EXTRA        = "EXTRA";
	DataPanelView.STATE_NOCREDIT     = "NOCREDIT";
	DataPanelView.STATE_PRESSPLAY    = "PRESSPLAY";
	DataPanelView.STATE_DRAWINGBALLS = "DRAWINGBALLS";

	function DataPanelView(){

		var _this = this;
		var _dataPanelContainer;

		var creditsText;
		var betText;
		var winText;

		var creditsValue;
		var betValue; 
		var winValue;

		var pressPlay_y;
		var pressPlay_b;

		var _applicationController = ApplicationController.getApplicationController();
		var _gameController        = _applicationController.getController("GameController");
		//var _gameSoundController   = _applicationController.getController("GameSoundController");
		//var _translatorController  = _applicationController.getController("TranslatorController");
		var _countersController    = _applicationController.getController("CountersController");
		//var _keyboardController    = _applicationController.getController("KeyboardController");
		
		/*
		_translatorController.addTranslatable((_asset.textPanel as MovieClip),    "TEXTPANEL");
		_translatorController.addTranslatable((_asset.messagePanel as MovieClip), "MESSAGEPANEL");
		_translatorController.addTranslatable((_asset.freeBall as MovieClip),     "FREEBALL");*/
		
		/*_asset.freeBall.visible = false;
		_asset.totalAlmost.text = "";*/
		
		setupSubscriptions();
		createDataPanel();

		changeMessagePanel(DataPanelView.STATE_PRESSPLAY);


		function createDataPanel(){
			
			_dataPanelContainer   = game.add.group();

			
			creditsText = new Phaser.Text(game ,70,20,"CREDITS", {boundsAlignH: 'center', fontSize: '14px', fill: '#FFF' });
			betText     = new Phaser.Text(game ,70,50,"BET",     {boundsAlignH: 'center', fontSize: '14px', fill: '#FFF' });
			winText     = new Phaser.Text(game ,70,80,"WIN",     {boundsAlignH: 'center', fontSize: '14px', fill: '#FFF' });
			
			_dataPanelContainer.add(creditsText);
			_dataPanelContainer.add(betText);
			_dataPanelContainer.add(winText);

			creditsValue = new Phaser.Text(game ,70,30,"000", {boundsAlignH: 'center', fontSize: '24px', fill: '#FFFF00' });
			betValue     = new Phaser.Text(game ,70,60,"000", {boundsAlignH: 'center', fontSize: '24px', fill: '#FFFF00' });
			winValue     = new Phaser.Text(game ,70,90,"000", {boundsAlignH: 'center', fontSize: '24px', fill: '#FFFF00' });

			_dataPanelContainer.add(creditsValue);
			_dataPanelContainer.add(betValue);
			_dataPanelContainer.add(winValue);

			pressPlay_y = _dataPanelContainer.create(55, 165, 'presione jugar a');
			pressPlay_b = _dataPanelContainer.create(55, 165, 'presione jugar b');
			pressPlay_b.visible = false;

			//var numTxt = new Phaser.Text(game, Xpositions[i] + 12, Ypositions[i] + 8, num, {fontSize: '30px', fill: '#000' });
           // view.add(numTxt);
/*
		    var btn      = game.add.sprite(349, 622, 'Button');
		    var Cards    = game.add.sprite(467, 622, 'Cards');
		    var Cartelas = game.add.sprite(371, 622, 'Cartelas');
		    var Tarjetas = game.add.sprite(277, 622, 'Tarjetas');
	 	
	 		_dataPanelContainer.add(btn);
	 		_dataPanelContainer.add(Cards);
	 		_dataPanelContainer.add(Cartelas);
	 		_dataPanelContainer.add(Tarjetas);
	 		*/
		}

		function setupSubscriptions(){
			var notifications = []; 
			notifications.push(
				//TranslatorController.TRANSLATION_COMPLETED_NOTIFICATION,
				Notifications.RESET_NOTIFICATION,
				Notifications.START_PAID,
				Notifications.PLAY_SENT_TO_SERVER_NOTIFICATION,
				Notifications.EXTRA_SIGN_NOTIFICATION,
				Notifications.EXTRA_SENT_TO_SERVER_NOTIFICATION,
				Notifications.WIN_BLINK_NOTIFICATION,
				EngineNotificationsEnum.NO_MORE_CREDITS_NOTIFICATION,
				EngineNotificationsEnum.COUNTER_CHANGED_NOTIFICATION,
				Notifications.SET_PAY_NOTIFICATION);
			ApplicationController.getApplicationController().addSubscriber(notifications, _this);	
		}

		this.notificationReceived = function(type, data){
			
			switch(type){
				case EngineNotificationsEnum.COUNTER_CHANGED_NOTIFICATION:
					countersChange(data);
				break;
				case Notifications.PLAY_SENT_TO_SERVER_NOTIFICATION:
					//changeMessagePanel(STATE_DRAWINGBALLS);
				break;
				case Notifications.RESET_NOTIFICATION:
					//changeMessagePanel(STATE_PRESSPLAY);
				break;
				case Notifications.EXTRA_SIGN_NOTIFICATION:
					//changeMessagePanel(STATE_EXTRA);
				break;
				case Notifications.EXTRA_SENT_TO_SERVER_NOTIFICATION:
					//changeMessagePanel(STATE_DRAWINGBALLS);
				break;
				case Notifications.START_PAID:
					//startPaid(data);
				break
				case EngineNotificationsEnum.NO_MORE_CREDITS_NOTIFICATION:
					//changeMessagePanel(STATE_NOCREDIT);
				break;
				/*case TranslatorController.TRANSLATION_COMPLETED_NOTIFICATION:
					(_asset.messagePanel.lang as MovieClip).gotoAndStop(_currentMessageLabel);
				break;*/
				case Notifications.WIN_BLINK_NOTIFICATION:
					//winBlink(data);
				break;
				case Notifications.SET_PAY_NOTIFICATION:
					//setPayText(data as int);
				break;
			}
		}

		this.getView = function(){
			return _dataPanelContainer;
		}

		//private functions

		function countersChange(data){  //(data:Object):void{
			switch(data){
				case CountersController.CREDITS_COUNTER:
					setCredit(_countersController.getCounterValue(CountersController.CREDITS_COUNTER));
				break;
				case CountersController.TOTAL_BET_COUNTER:
					//_asset.totalBet.text = _countersController.getCounterValue(CountersController.TOTAL_BET_COUNTER).toString();
					betValue.text = _countersController.getCounterValue(CountersController.TOTAL_BET_COUNTER);
				break;
				case CountersController.BET_COUNTER:
					//_asset.totalBet.text = _countersController.getCounterValue(CountersController.TOTAL_BET_COUNTER).toString();
				break;
				case CountersController.WIN_COUNTER:
					//_asset.win.text = _countersController.getCounterValue(CountersController.WIN_COUNTER).toString();
					winValue.text = _countersController.getCounterValue(CountersController.WIN_COUNTER);
				break;
				/*case OwnCounters.TOTAL_ALMOST_COUNTER:
					if(_countersController.getCounterValue(OwnCounters.HAS_EXTRA) == 1){
						var totalAlmost:int =  _countersController.getCounterValue(OwnCounters.TOTAL_ALMOST_COUNTER);
						(totalAlmost != 0) ? _asset.totalAlmost.text = totalAlmost.toString() : _asset.totalAlmost.text = "";
					}
				break;*/
			}
		}

		function setCredit(credit){ //(credit:int):void{
			
			if(credit < 0){
				
				//red number
				/*(_asset.mc_credits as MovieClip).gotoAndStop("RED");
				_asset.mc_credits.credits.text = credit.toString();
				TextUtils.scaleTextToFitAligned(_asset.mc_credits.credits, true);*/
				creditsValue.text = credit;
				alert("hacer numero rojo, en panelView");
					
			}else{
				
				//yellow number
				//(_asset.mc_credits as MovieClip).gotoAndStop("YELLOW");
				creditsValue.text = credit;
				//TweenMax.to(creditsValue,2,{x:500});
				//_asset.mc_credits.credits.text = credit.toString();
				//TextUtils.scaleTextToFitAligned(_asset.mc_credits.credits, true); //hacer
				
			}
		}

		function changeMessagePanel(newState){  //(newState:String):void{
			
			switch(newState){
				case DataPanelView.STATE_PRESSPLAY:	
					/*
					if(_asset.freeBall.visible == true) showFreeBallSign(false);
					
					
					_asset.extraCost.visible = false;
					_asset.pay.visible       = false;
					*/
					currentMessageLabel = DataPanelView.STATE_PRESSPLAY;
					
					
					function changeToBlack(){
						pressPlay_y.visible = false;
		 				pressPlay_b.visible = true;
						TweenMax.to(pressPlay_y, .2, {delay:.2, onComplete:changeToYellow});
					}

					function changeToYellow(){
						pressPlay_y.visible = true;
		 				pressPlay_b.visible = false;
		 				TweenMax.to(pressPlay_y, .2, {delay:.2, onComplete:changeToBlack});
					}
					
					TweenMax.to(pressPlay_y, .2, {delay:.2, onComplete:changeToBlack});

				break; 
				case DataPanelView.STATE_DRAWINGBALLS:
					/*
					if(_asset.freeBall.visible == true) showFreeBallSign(false);
					
					if((_applicationController.getController(GameController) as GameController).gameState.getType() == GameStates.PLAYING){
						drawing()
					}else{
						setTimeout(drawing,300);
					}
					function drawing():void{
						currentMessageLabel      = STATE_DRAWINGBALLS;
						_asset.extraCost.visible = false;
						_asset.pay.visible       = false;
					}
					*/
				break; 
				case DataPanelView.STATE_EXTRA:
					/*
					currentMessageLabel      = STATE_EXTRA;
					_asset.extraCost.text    = _countersController.getCounterValue(OwnCounters.EXTRA_COST_COUNTER).toString();
					_asset.extraCost.visible = true;
					TextUtils.scaleTextToFitAligned(_asset.extraCost, true);
					_asset.pay.visible       = false;
					
					(_asset.extraCost.text == "0")? showFreeBallSign(true) : showFreeBallSign(false);
					*/
				break; 
				case DataPanelView.STATE_WINNER:	
					/*
					if(_asset.freeBall.visible == true) showFreeBallSign(false);
					
					currentMessageLabel      = STATE_WINNER;
					_asset.extraCost.visible = false;
					_asset.pay.visible       = true;
					*/
				break; 
				case DataPanelView.STATE_NOCREDIT:
					/*
					if(_asset.freeBall.visible == true) showFreeBallSign(false);
						
					currentMessageLabel      = STATE_NOCREDIT;
					_asset.extraCost.visible = false;
					_asset.pay.visible       = false;
					
					(_asset.messagePanel.lang as MovieClip).mc_noCredit.gotoAndPlay(1);
					
					_gameSoundController.playSound(SoundNames.SND_WHEEL_WIN, true);
					
					var framesCount:int = 0;
					(_asset.messagePanel.lang as MovieClip).removeEventListener(Event.ENTER_FRAME, update);
					(_asset.messagePanel.lang as MovieClip).addEventListener(Event.ENTER_FRAME, update);
					
					function update():void{ 
						
						framesCount++;
						
						if(framesCount > (24 * 3)){
							
							if((_asset.messagePanel.lang as MovieClip).mc_noCredit)(_asset.messagePanel.lang as MovieClip).mc_noCredit.gotoAndStop(1);
							(_asset.messagePanel.lang as MovieClip).removeEventListener(Event.ENTER_FRAME, update);
							
						}
					}
					*/
				break; 
			} 
			
		}

	}


    window.DataPanelView = DataPanelView;

}(window));