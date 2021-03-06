﻿(function(window){

	function create() {
		var phaserGame = new Game();
	}

	function Game(){

		var _applicationController;
		var _gameConfig  = new BingoGameConfig();
		Game.gameConfig  = _gameConfig;
		var _roundConfig = new BingoRoundConfig();
		Game.roundConfig = _roundConfig;
		//var _externalConfig = ExternalLoadConfig();
		//Game.externalConfig = _externalConfig


		var languageXml = game.cache.getText('languageXml');
		/*
		NO BORRAR VA PARA EL ENGINE.

		var parser = new DOMParser();
		languageXml = parser.parseFromString(languageXml, "text/xml");
		for(var i = 0; i < languageXml.getElementsByTagName("translate").length; i++){
			console.log(languageXml.getElementsByTagName("translate")[i].id);
		}
		*/

		var _gameRootContainer = game.add.group(); //agrega el contenedor principal del juego al stage


		var IS_TESTING = _gameConfig.isTesting;
		if(IS_TESTING){
			_applicationController = new ApplicationController(_gameRootContainer, _gameConfig.gameName, languageXml, _gameConfig.supportedLanguages, _gameConfig, _roundConfig, _gameConfig.parametersIfTesting, 3);
		}else{
			_applicationController = new ApplicationController(_gameRootContainer, _gameConfig.gameName, languageXml, _gameConfig.supportedLanguages, _gameConfig, _roundConfig, null, 5);
		}


		/*
		var _logController:LogController = new LogController();
		_applicationController.registerController(_logController);*/


		
		var _gameView   = new GameView();
		var serverModel = new ServerCommunicationsModel(); 
		_applicationController.registerApplicationView(_gameView);
		
		var gameController = new GameController(_gameView, serverModel);
		_applicationController.registerController(gameController); // TODO -  falta aun el getController() del applicationController

		var cardController = new CardController()
		_applicationController.registerController(cardController);
		
		var connectingView = new ConnectingView();
		_applicationController.registerController(new ConnectionController(  /*null, null */connectingView, serverModel)); //todo
		_applicationController.registerApplicationView(connectingView);
		
		configureCounters();

		/*
		
		var keyboardController:KeyboardController = new KeyboardController(stage);
		_applicationController.registerController(keyboardController);
		*/

		_applicationController.init();

		/*
		
		var soundController:GameSoundController = new GameSoundController();
		_applicationController.registerController(soundController);
		//show first screen -------------------------------------------------
		
		*/
		_applicationController.showApplicationView(connectingView.type);

		//var _gameView = new GameView();

		function configureCounters(){
			var controller = _applicationController.getController("CountersController");
			
			//numeric
			controller.registerCounter(OwnCounters.INTERNAL_DRAWNBALLS_COUNTER);
			controller.registerCounter(OwnCounters.TOSHOW_DRAWNBALLS_COUNTER);
			controller.registerCounter(OwnCounters.EXTRA_COST_COUNTER);
			controller.registerCounter(OwnCounters.GAME_SPEED_COUNTER);
			controller.registerCounter(OwnCounters.CARDS_ENABLED_COUNTER);
			controller.registerCounter(OwnCounters.TOTAL_ALMOST_COUNTER);
			controller.registerCounter(OwnCounters.WIN_CARD_COUNTER_ + "0", 0);
			controller.registerCounter(OwnCounters.WIN_CARD_COUNTER_ + "1", 0);
			controller.registerCounter(OwnCounters.WIN_CARD_COUNTER_ + "2", 0);
			controller.registerCounter(OwnCounters.WIN_CARD_COUNTER_ + "3", 0);
			
			//boolean
			controller.registerCounter(OwnCounters.FIN_INIT, 0);
			controller.registerCounter(OwnCounters.SHOWING_HELP, 0);
			controller.registerCounter(OwnCounters.ALMOST_BINGO ,0);
			controller.registerCounter(OwnCounters.JACKPOT_PAYED, 0);
			controller.registerCounter(OwnCounters.HAS_EXTRA);
			controller.registerCounter(OwnCounters.RESET_FINISHED, 1);
		}


	}

	/*function update(){
		console.log("PHASER UPDATE");
	}*/
		
	window.create = create;
	window.Game   = Game;
	//window.update = update;

}(window));
