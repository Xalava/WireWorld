var daGame;
var vueGame;
//Settings
var mapX = 0;
var mapY = 0;

window.onload = function () {



    var currentGame = launchGame();
 //    currentGame.refresh()
	// console.log("back from launching");
	// window.setTimeout( 


	
}

function launchGame() {
	// Setting settings

	if(screen.width<=767){
		mapX= 10;
		mapY= 10;
	} else {
		mapX= 20;
		mapY= 20; 
	};

	//Setting Game

	daGame = new Game(mapY, mapX);

	//Setting Vue
	vueGame = new Vue({
		el: '#game',
		data: daGame,
		computed: {
			rows: function () {
				return this.board;
			},
			cycle: function (){
				return this.iteration;
			}
		},
		components: {
			'square-component': {
				props: {
					sq: Object
				},
				template: '#square-template',
				data: function () {
					return this.sq;
				}, // !??
				computed: {
					isHead: function () {
						if (this.state == Game.HEAD) {
							return true;
						} else {
							return false;
						}
					},

					stateClass: function () {
						switch(this.state) {
						    case 0:
						        return "empty";
						        break;
						    case 1:
						        return "head"
						        break;
						    case 2:
						        return "tail"
						        break;
							case 3:
						        return "connector"
						        break;
						    default:
						    	console.log("Display error");
						        return "empty";
						}	
						
					},
				},

				methods: {
					sqLeftAction: function () {
						daGame.squareLeftAction(this.row, this.col);
					},
					sqRightAction: function () {
						daGame.squareRightAction(this.row, this.col);
					},

				}// endmethods
			} // End square
		} // End components
	}); // vue object


	return daGame;


}


