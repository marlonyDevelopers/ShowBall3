(function(window){

	function ButtonView(x, y, key, clickCallBack){
		var _this = this;
		var _view = game.make.button(x, y, key, onclick, this, 1, 0, 0);


		this.getView = function(){
			return _view;
		}

		function onclick() {
			clickCallBack(key);
		}

		function setEnabled(){

			_view.inputEnabled  = true;

			/*
			_movie.addEventListener(MouseEvent.CLICK, click);
			_movie.addEventListener(MouseEvent.ROLL_OVER, over);
			
			if(_movie.currentFrameLabel == "CLICK")
				_movie.animationClick.getChildAt(0).removeEventListener(Event.ENTER_FRAME, goOff);
			
			_movie.gotoAndStop(1);
			
			if(_movie.mc_state)
				_movie.mc_state.gotoAndStop(1);
			
			changeLanguage(_translatorController.currentLanguage);
			*/
		}

		function setDisabled(){

			//_view.inputEnabled  = false;

			/*
			_movie.removeEventListener(MouseEvent.CLICK, click);
			_movie.removeEventListener(MouseEvent.ROLL_OVER, over);
			_movie.removeEventListener(MouseEvent.ROLL_OUT, out);
			*/
			
		}

		/*
		function disable() {
			turboBtn.frame = 3;
			//turboBtn.inputEnabled  = false;
		}

		function over() {
		    console.log('button over');
		}

		function out() {
		    console.log('button out');
		}
		*/

	}











	window.ButtonView = ButtonView;

}(window));