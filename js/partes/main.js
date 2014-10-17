
/*
	Arquivo principal, main
	Autor: Natan Albuquerque
 */

window.onload = function () {
	main();
};

function main() {
	jogo = new game.Game('tela');
	jogo.startGame();
}
