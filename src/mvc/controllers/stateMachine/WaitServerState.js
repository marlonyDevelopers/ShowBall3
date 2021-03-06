(function(window){


	this.WaitServerState = function(gameState, gameController, prevGameType){
		var _this = this;

		this._playedInTurbo = false;

		if(_prevGameType == null) prevGameType = -1;
		
		var _gameStateChangeCallback = gameState;
		var _gameController          = gameController;
		var _applicationController   = ApplicationController.getApplicationController();
		var _countersController      = _applicationController.getController("CountersController");
		var _cardsController         = _applicationController.getController("CardController");
		
		
		var _prevGameType            = prevGameType;
		var _model                   = gameController.model;

		this.getType = function(){ 
			return GameStates.WAIT_SERVER; 
		}

		this.changeConfigCardsResponse = function(response){
			_countersController.setCounterValue(CountersController.JACKPOT_COUNTER, response.jackpot);
			_applicationController.sendNotification(Notifications.CARDS_CONFIG_CHANGED_NOTIFICATION, _gameController._cardController.getOpenCards());
			_gameStateChangeCallback(new WaitState(_gameStateChangeCallback, _gameController));
		}
		
		this.playResponse = function(response){
			_cardsController.upDateCards(response.cardsData);	
			_countersController.setCounterValue(CountersController.CREDITS_COUNTER, response.credits);
			
			var state = new PlayingState(_gameStateChangeCallback, _gameController);
			_gameStateChangeCallback(state);

			if(_this._playedInTurbo){
				state._playController.play(_this._playedInTurbo, response);
			}else{
				state._playController.play(_this._playedInTurbo, response);
			}
		}
		
		this.changeNumberResponse = function(response){
			_gameStateChangeCallback(new WaitState(_gameStateChangeCallback, _gameController));
		}
		
		this.getExtraBallResponse = function(data){
			var _extraController         = new ExtraController(_gameStateChangeCallback); 
			_extraController.play(data); 
		}
		
		this.cancelExtraBallResponse = function(response){
				
			_applicationController.sendNotification(Notifications.CANCEL_EXTRA_BALL_NOTIFICATION, {response:response, onComplete:pay});
			
			function pay(){ 

				//TO TEST - descomentar lo de abajo
				changeAlmostStates();

				/*
				//almost bingo control to remove
				if(_countersController.getCounterValue(OwnCounters.ALMOST_BINGO) == 1)
					_countersController.setCounterValue(OwnCounters.ALMOST_BINGO, 0);
				
				var finalCredit       = response.credits + response.win;
				var finalCreditInCash = response.credits_in_cashEnd;
				_applicationController.sendNotification(Notifications.START_PAID, { onComplete:changeAlmostStates, win:response.win, winInCash:response.win_in_cash, finalCredit:finalCredit, finalCreditInCash:finalCreditInCash});
				*/
			}
			
			function changeAlmostStates(){
				//TO TEST - descopmentar abajo
				final();

				//_applicationController.sendNotification(Notifications.CHANGE_ALMOST_NOTIFICATION, {type: "DURINGPLAY", onComplete:final}); 
			}
			
			function final(){ 
				_gameStateChangeCallback(new WaitState(_gameStateChangeCallback, _gameController));
			}
		}
		
		this.changeBetResponse = function(response){
			_countersController.setCounterValue(CountersController.JACKPOT_COUNTER, response.jackpot);
			_countersController.setCounterValue(CountersController.BET_COUNTER, response.bet);
			_gameStateChangeCallback(new WaitState(_gameStateChangeCallback, _gameController));
		}
		
		this.changeCoinResponse = function(response){
			_countersController.setCounterValue(CountersController.JACKPOT_COUNTER, response.jackpot);
			_countersController.setCounterValue(CountersController.COIN_COUNTER, response.coin);
			_countersController.setCounterValue(CountersController.CREDITS_COUNTER, response.credits);
			
			_gameStateChangeCallback(new WaitState(_gameStateChangeCallback, _gameController));
		}
		
		this.changeToPeekState = function(onComplete){
			_gameStateChangeCallback(new PeekState(_gameStateChangeCallback, _gameController, onComplete, _this, _this.getType()));
		}
		
		this.backToPrevState = function(){
			if(_prevGameType != -1){
				switch(_prevGameType){
					case GameStates.WAIT:
						_gameStateChangeCallback(new WaitState(_gameStateChangeCallback, _gameController));
					break;
					case GameStates.EXTRA:
						_gameStateChangeCallback(new ExtraState(_gameStateChangeCallback, _gameController));
					break;
				}
			}
			else{
				alert('_prevGameType debe ser distinto de -1. Es necesario enviar este parametro en el constructor del estado');
			}
		}
		
		this.getPrevState = function(){
			return _prevGameType; 
		}

		this.hideHelp       = function(){}
		this.enableNextCard = function(){}
		this.enableCard     = function(cardIndex, enabled){}
		this.changeNumbers  = function(){}
		this.turboBtn       = function(){}
		this.playBtn        = function(){}
		this.betUp          = function(){}
		this.betDown        = function(){}
		this.coinUp         = function(){}
		this.coinDown       = function(){}
		this.changeStage    = function(){}
		this.multipleUse    = function(_function){}
		this.showHelp       = function(){}
		this.beginExtras    = function(){}
		this.playEnded      = function(){}

	}



	window.WaitServerState = WaitServerState;
}(window));