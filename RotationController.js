// Handles interfacing with the UI
document.RotationController = function(model) {
    var self = this;
    self.model = model;
    self.playerCount = 1;

    // Runs functions  needed after the page has finished loading
    self.attach = function() {
        document.getElementById('addPlayerButton').onclick = function() {
            self.addPlayerToDisplay();
        };
        document.getElementById('inningsButton').onclick = function() {
            self.generateInnings();
        };
    }

    // Makes the displayed roster match the roster in the model
    self.updateRosterDisplay = function() {
        // Clear the existing roster
        var children = document.getElementById('roster').children;
        while (children.length > 0) {
            children[0].remove();
        }
        self.playerCount = 1;

        // Add each player listed in the model.roster
        self.model.roster.forEach(function(player) {
            self.addPlayerToDisplay(player.name);
        });
    }

    // Creates a player element and adds it to the display
    self.addPlayerToDisplay = function(name) {
        $('#roster').append(self.generatePlayerDisplay(name));
    }

    // Creates a Player element
    self.generatePlayerDisplay = function(name) {
        var blank = true
        if (name !== undefined) {
            blank = false;
        }

        var id = 'player' + self.playerCount;

        var col = self.generateElement('div', 'col-auto');
        col.id = id;
        var inputGroup = self.generateElement('div', 'input-group mb-3');

        var span = self.generateElement('span', 'input-group-text');
        span.textContent = 'Player ' + self.playerCount;

        var input = self.generateElement('input', 'form-control');
        input.type = 'text';
        input.placeholder = "Player " + self.playerCount + "'s name";
        input.id = id + 'Name';
        if (!blank) {
            input.value = name;
        }

        var button = self.generateElement('button', 'btn btn-outline-danger')
        button.type = 'button';
        button.id = id + 'Button';
        button.textContent = 'X';
        button.onclick = function() {
            $('#' + id).remove();
            if ($('#roster').children().length == 0) {
                self.playerCount = 1;
            }
        }

        inputGroup.append(span);
        inputGroup.append(input);
        inputGroup.append(button);
        col.append(inputGroup);

        self.playerCount++;
        return col;
    }

    // Updates the model with the roster on the page, calculates the innings, then displays them on the page
    self.generateInnings = function() {
        // Setup the model
        self.model.reset();
        self.updateModelRoster();
        self.updateInningCount();

        // calculate innings
        self.model.fillInnings();

        // display innings
        self.displayInnings(self.model.innings);
    }

    // Makes the model roster match the displayed roster
    self.updateModelRoster = function() {
        self.model.roster = [];
        // Grab all the names
        var inputs = $('input[id$=Name]').toArray();
        inputs.forEach(function(input) {
            self.model.addPlayer(input.value);
        });
    }

    // Updates the model with how many innings to create
    self.updateInningCount = function() {
        var inningValue = parseInt($('#inningsCount')[0].value);
        if (inningValue != NaN) {
            self.model.inningCount = inningValue;
        }
    }

    // Displays innings to the user
    self.displayInnings = function(innings) {
        //var output = self.textInnings(innings);
        var output = self.cardInnings(innings);
        $('#innings').append(output);
    }

    self.textInnings = function(innings) {
        var results = [];
        innings.forEach(function(inning) {
            var row = self.generateElement('div', 'row');
            var text = document.createElement('p');
            text.textContent = JSON.stringify(inning);
            row.append(text);
            results.push(row);
        });
        return results;
    }

    self.cardInnings = function(innings) {
        var results = [];
        var inningCount = 1;
        innings.forEach(function(inning) {
            var col = self.generateElement('div', 'col-auto');
            var card = self.generateElement('div', 'card');
            var cardHeader = self.generateElement('div', 'card-header');
            cardHeader.textContent = 'Inning #' + inningCount++;
            var cardbody = self.generateElement('div', 'card-body');

            var list = self.generateElement('dl', 'row');
            inning.forEach(function(position) {
                var title = self.generateElement('dt', 'col-3');
                title.textContent = position.position + ":";
                var player = self.generateElement('dd', 'col-auto');
                player.textContent = position.player.name;

                list.append(title, player);
            });

            cardbody.append(list);

            card.append(cardHeader, cardbody);
            col.append(card);
            results.push(col);
        });
        return results;
    }

    // Creates a DOM element with the desired classes
    // Meant to cut down on extra lines.  There's probably a better way to do this.
    self.generateElement = function(name, classes) {
        var element = document.createElement(name);
        element.className = classes;
        return element;
    }

    // Attach after the page has loaded
    document.addEventListener('DOMContentLoaded', function() {
        self.attach();
    }, false);

    return self;
}
