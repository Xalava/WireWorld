
var Game = function (mapY, mapX) {

	this.mapX = mapX;
	this.mapY = mapY;
	this.board = this.generateMap(mapY, mapX);
	this.iteration = 0;
	console.log("game created");
	// setInterval(this.refresh(), 800);
};

Game.EMPTY = 0;
Game.HEAD = 1;
Game.TAIL = 2;
Game.CONDUCTOR = 3;

Game.prototype.generateMap = function (mapY, mapX) {
	var map = [];
	// init
	for (var j = mapY - 1; j >= 0; j--) {
		map[j] = [];
		for (var i = mapX - 1; i >= 0; i--) {
			map[j][i] = {
				state: Game.EMPTY,
				priorState: Game.EMPTY,
				col: i,
				row: j
 				//  could add random connectors
			}
		}
	} //end double for
	return map;

}

Game.prototype.squareLeftAction = function (y, x) {
	var cs = this.board[y][x];
	if(cs.state==Game.EMPTY){
		cs.state=Game.CONDUCTOR;
		console.log("putting conductor");
	}else {

		if(cs.state==Game.CONDUCTOR){
			cs.state=Game.EMPTY;
			console.log("removing conductor");

		}
	}

}

Game.prototype.squareRightAction = function (y, x) {
	var cs = this.board[y][x];
	if(cs.state==Game.TAIL || cs.state==Game.HEAD){
		cs.state=Game.CONDUCTOR;
		console.log("removing energy");

	}else{

		if(cs.state==Game.CONDUCTOR){
			cs.state=Game.HEAD;
			console.log("adding energy");

		}
	}



}


Game.prototype.adjacentCells = function (y, x) {
	//returns array of adjancent cells
	var adjacent= [];
	if (x - 1 >= 0 ) {
		adjacent.push(this.board[y][x - 1])
	}
	if (y + 1 < this.mapY ) {
		adjacent.push(this.board[y + 1][x])
	}
	if (x + 1 < this.mapX ) {
		adjacent.push(this.board[y][x + 1])
	}
	if (y - 1 >= 0 ) {
		adjacent.push(this.board[y - 1][x])
	}
	return adjacent;
}

Game.prototype.updateCell = function (y, x) {
	//update cell depending current state and eventually adjacent prior state
	var cs = this.board[y][x];

	switch(cs.state) {
    case Game.EMPTY:
		//nothing
		break;
    case Game.TAIL:
		cs.state = Game.CONDUCTOR;
        break;
    case Game.HEAD:
		cs.state = Game.TAIL;
        break;
    case Game.CONDUCTOR:
		var adj = this.adjacentCells(y,x);
		var heads = 0;
		for (var i = adj.length - 1; i >= 0; i--) {
			if (adj[i].priorState == Game.HEAD){
				heads+=1;
			}
		}
		if (heads >=1 && heads <= 2) {
			cs.state=Game.HEAD;
		}
        break;

    default:
       console.log("error updating cell", cs);
}


}

Game.prototype.saveStates = function () {
	for (var r = this.mapY - 1; r >= 0; r--) {
		for (var c = this.mapX - 1; c >= 0; c--) {
			this.board[r][c].priorState = this.board[r][c].state;
		}
	}

	return 0;

}


Game.prototype.refresh = function () {
	this.saveStates();
	for (var r = this.mapY - 1; r >= 0; r--) {
		for (var c = this.mapX - 1; c >= 0; c--) {
			this.updateCell(r,c);
		}
	}
	console.log("refresh");
	this.iteration +=1;

}


// count feature, timer ...