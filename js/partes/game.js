
/*
	Classes e módulos do game e de configuração
	Autor: Natan Albuquerque
 */


function init_namespaces(window) {
	//Cria o namespace game
	if (! window.game) {
		window.game = {};
	}

	//Cria o namespace game.core
	if (! window.game.core) {
		window.game.core = {};
	}

	//Cria o namespace game.conf
	if (! window.game.conf) {
		window.game.conf = {};
	}
}

init_namespaces(window); //Inicializa os módulos

createjs.MotionGuidePlugin.install();

// Declara as configurações no módulo game.conf
window.game.conf.	imgs = 
{
	"bg_stage": "./imagens/png/bg2.png",
};


// Classe GameElement serve de base para as demais classes que compõe o game
(function (window) {

/*
	@class: GameElement
	@param: stage [createjs.Stage] (Opicional | default: null)
 */
/*var GameElement = function () {
	
};*/


//Implementa Obeservador do padrão de projeto Observer
//createjs.EventDispatcher.initialize(GameElement.prototype); 

var GameElement =  createjs.Container;

var p = GameElement.prototype;

p._draw = function() {}; //Compor o container com elementos gráficos [Interface a ser implementada]

window.game.core.GameElement = GameElement;

})(window);




(function(){

var Lixo = function (tipo_lixo) {
	this._lixoInit();
	this.tipoLixo = tipo_lixo || null;
	this.regX = 92.5;
	this.regY = 83;
	this.y = - this.regY;
}

Lixo.prototype = new game.core.GameElement(); //Herda de game.core.GameElement
Lixo.prototype.constructor = Lixo;

var p = Lixo.prototype;

p._lixoInit = function () {
	this._draw();
};

// Sobrescreve GameElement._draw()
p._draw = function () {
	var img = new createjs.Bitmap('./imagens/png/t.png');
	this.addChild(img);
};

p.flutuar = function () {
	//this.x += Math.sin(this.x) * 20;
	this.y += 5;
	
	if (this.y >= 550) {
		var e = new createjs.Event('colide');
		e.lixo = this;
		this.dispatchEvent(e);
	}

	if (this.y > this.parent.canvas.height + this.regY) {
		this.y = - this.regY;
	}
};

window.game.Lixo = Lixo;

})(window);

(function(window){

var Animal = function () {
	this._draw();
	this.sprite.gotoAndPlay('parado');
}

Animal.prototype = new game.core.GameElement(); //Herda de game.GameElement
Animal.prototype.constructor = Animal;


var p = Animal.prototype;

p._drawanimalInit = function () {
	this._draw();
}

p._draw = function() {
	var spritesheet;
	var data = {
		framerate: 12,
		images: ["./imagens/png/sprites/caranguejo-parado-mini.png"],
		frames: {
			width: 147.4,
			height: 60,
			count: 10
		},
		animations: {
			"parado": [0,8, true, 0.5]
		}
	};

	spritesheet = new createjs.SpriteSheet(data);
	this.sprite = new createjs.Sprite(spritesheet);
	this.addChild(this.sprite);
};

game.Animal = Animal;

})(window);


(function(window){

var Cenario = function() {
	this.bgAgua = new createjs.Bitmap('./imagens/png/bg2-back.png');
	this.bgAnimais = new createjs.Bitmap('./imagens/png/bg2-forenground.png');
	this.bgTerra = new createjs.Bitmap('./imagens/png/bg2-terra.png');
	this._draw();
	this.addEventListener('colide', this.handleColisao);
};

Cenario.prototype = new game.core.GameElement();
Cenario.prototype.constructor = Cenario;

var p = Cenario.prototype;

p._draw = function() {
	this.addChild(this.bgAgua);
	this.addChild(this.bgTerra);
	this.addChild(this.bgAnimais);
};

p.handleColisao = function(e) {
	e.lixo.y = 0;
};

window.game.Cenario = Cenario;

})(window);



// Classe principal para o jogo
(function(window){

/*
	@class: Game Classe pincipal do jogo
	@param: canvasId [String] Propriedade id do ElementCanvas ao qual o game estará associado
 */
var Game = function(canvasId) {
	this.stage = new createjs.Stage(canvasId);
};

var p = Game.prototype;


p.startGame = function() { // Função de inicialização da execução do game

	//var bgImg = new createjs.Bitmap(game.conf.imgs['bg_stage']);
	var bgImg = new game.Cenario();

	this.stage.addChild(bgImg);
	
	caranguejo = new game.Animal();
	caranguejo.set({x: 100, y: 485, rotation: 7});
	caranguejo.shadow = new createjs.Shadow('rgba(20, 20, 20, 0.5)', 3, 3, 20);
	this.stage.addChild(caranguejo);
	

	lixo = new game.Lixo('teste');
	lixo.set({x: 400});
	lixo.addEventListener('colide', bgImg.handleColisao);
	
	lixo.tick = createjs.Ticker.addEventListener('tick', function(){
		lixo.flutuar();
	});
	
	// createjs.Tween.get(lixo).to({guide:{path:[400, 0, 400, 50, 500, 50, 400, 50, 400, 100]}}, 7000);

	this.stage.addChild(lixo);

	createjs.Ticker.addEventListener('tick', this.stage);
	
};

window.game.Game = Game;

})(window);