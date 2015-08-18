﻿(function(window){

    var view;
    var cardNumber;
    var numContainer    = [];
    var marksContainer  = [];
    var currentNumbers  = [];

    function CardView(n){
        cardNumber = n; 
    }

    CardView.prototype.setNumbers = function(numbers){
        currentNumbers = numbers;
        for(i = 0; i < 15; i++){
            numbers[i] < 10?  num = "0" + numbers[i] : num = numbers[i]; 
            numContainer[i].text = num;
        }  
    }

    CardView.prototype.mark = function(index){
        marksContainer[index].visible = true;
        numContainer[index].style.fill = '#FFF';
    }

    CardView.prototype.reset = function(){
        for(i = 0; i < 15; i++){
            marksContainer[index].visible = false;
            numContainer[index].style.fill = '#000';
        }
    }

    CardView.prototype.createCards = function(container, x, y){

        view   = game.add.group();
        view.x = x; 
        view.y = y;
        container.add(view);

        var bg = view.create(0, 0, 'bg');

        var Xpositions = [15, 70, 126, 182, 237, 15, 70, 126, 182, 237, 15, 70, 126, 182, 237];
        var Ypositions = [44, 44, 44, 44, 44, 88, 88, 88, 88, 88, 132, 132, 132, 132, 132];
        
        //create bg match bg
        for(i = 0; i < 15; i++){
            shoot = view.create(Xpositions[i], Ypositions[i], 'shoot');
            shoot.visible = false;
            marksContainer.push(shoot);
        }

        //create numbers
        for(i = 0; i < 15; i++){
            i < 9?  num = "0" + (i+1) : num = (i+1); 
            var numTxt = new Phaser.Text(game, Xpositions[i] + 12, Ypositions[i] + 8, num, {fontSize: '30px', fill: '#000' });
            view.add(numTxt);
            numContainer.push(numTxt);
        }

        /*PRUEBAS*/
        //***************************************************
        //var numbers = [88,89,90,04,05,06,07,08,09,10,11,12,12,13,14];
        //setNumbers(numbers);

        //mark(0);
    }

    window.CardView = CardView;

}(window));