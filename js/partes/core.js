

if (! window.game) {
	window.game = {};
	window.game.core = {};

} else if (! window.game.core) {
	window.game.core = {};
}


// Classe ElementoJogo serve de base para as demais classes que compoe o estagio
(function (window) {

var ElementoJogo = function (stage) {
	this.stage = stage;
	this.shape = new createjs.Shape();
};

ElementoJogo.prototype = new createjs.Container();

var p = ElementoJogo.prototype;

/*Desenha no shape do elemneto ou compoe o container*/
p._draw = function() {};

window.game.core.ElementoJogo = ElementoJogo;

})(window);

