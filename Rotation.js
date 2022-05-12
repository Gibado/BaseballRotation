document.Rotation = function() {
    var self = this;

    self.primaryPoints = 10;
    self.secondaryPoints = 2;

    self.roster = [];
    self.inningCount = 6;
    self.innings = [];

    // Resets this object to a new state
    self.reset = function() {
        self.roster = [];
    }

    // Creates a player object
    self.createPlayer = function(name) {
        return {
            name: name,
            points: 0
        };
    }

    // Adds a player to the roster
    self.addPlayer = function(name) {
        self.roster.push(self.createPlayer(name));
    }

    // Returns a list of the given players with the lowest point value
    self.findLowestPoints = function(players) {
        var lowest = 100;
        var list = [];
        players.forEach(function(player) {
            if (player.points < lowest) {
                lowest = player.points;
                list = [player];
            } else if (player.points === lowest) {
                list.push(player);
            }
        });
        return list;
    }

    // Returns a random player
    self.grabRandomPlayer = function(players) {
        var index = Math.floor(Math.random() * 100) % players.length;
        return players[index];
    }

    // Returns a player with the lowest points in the list of remaining players
    self.grabLowestPlayer = function(remainingPlayers) {
        var lowestPlayers = self.findLowestPoints(remainingPlayers);
        return self.grabRandomPlayer(lowestPlayers);
    }

    // Returns a position for the lowest point value player
    self.assignPosition = function(positionName, pointValue, remainingPlayers, usedPlayers) {
        var player = self.grabLowestPlayer(remainingPlayers);
        var position = self.createPosition(positionName, player);
        remainingPlayers.splice(remainingPlayers.indexOf(player), 1);
        player.points += pointValue;
        usedPlayers.push(player);
        return position;
    }

    // Assigns players for an inning
    self.createInning = function(players) {
        var positions = [];
        var usedPlayers = [];

        // positions to fill:
        // Primary: pitcher and 1st base
        var remainingPlayers = self.roster;
        self.logPlayers(remainingPlayers, usedPlayers);
        positions.push(self.assignPosition('pitcher', self.primaryPoints, remainingPlayers, usedPlayers));
        self.logPlayers(remainingPlayers, usedPlayers);
        positions.push(self.assignPosition('1st base', self.primaryPoints, remainingPlayers, usedPlayers));
        self.logPlayers(remainingPlayers, usedPlayers);
        // Secondary: 2nd and 3rd base and shortstop
        positions.push(self.assignPosition('2nd base', self.secondaryPoints, remainingPlayers, usedPlayers));
        self.logPlayers(remainingPlayers, usedPlayers);
        positions.push(self.assignPosition('3rd base', self.secondaryPoints, remainingPlayers, usedPlayers));
        self.logPlayers(remainingPlayers, usedPlayers);
        positions.push(self.assignPosition('shortstop', self.secondaryPoints, remainingPlayers, usedPlayers));
        self.logPlayers(remainingPlayers, usedPlayers);

        // Extra: File remaining in outfield
        while (remainingPlayers.length > 0) {
            positions.push(self.assignPosition('outfield', 1, remainingPlayers, usedPlayers));
            self.logPlayers(remainingPlayers, usedPlayers);
        }

        self.roster = usedPlayers;
        return positions;
    }

    self.logPlayers = function(remaining, used) {
        console.log('Remain: ' + JSON.stringify(remaining));
        console.log('Used: ' + JSON.stringify(used));
    }

    // Creates a position object to label a players position for an inning
    self.createPosition = function(name, player) {
        return {
            position: name,
            player: player
        };
    }

    self.fillInnings = function() {
        for (var i = 0; i < self.inningCount; i++) {
            console.log(JSON.stringify(self.roster));
            self.innings.push(self.createInning(self.roster));
        }
    }

    return self;
}
