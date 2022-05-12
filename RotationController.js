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

        var col = document.createElement('div');
        col.className = 'col-auto';
        col.id = id;
        var inputGroup = document.createElement('div');
        inputGroup.className = 'input-group mb-3';

        var span = document.createElement('span');
        span.textContent = 'Player ' + self.playerCount;
        span.className = 'input-group-text';

        var input = document.createElement('input');
        input.type = 'text';
        input.className = 'form-control';
        input.placeholder = "Player " + self.playerCount + "'s name";
        input.id = id + 'Name';
        if (!blank) {
            input.value = name;
        }

        var button = document.createElement('button');
        button.type = 'button';
        button.className = 'btn btn-outline-danger';
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

    // Makes the model roster match the displayed roster
    self.updateModelRoster = function() {

    }

    // Attach after the page has loaded
    document.addEventListener('DOMContentLoaded', function() {
        self.attach();
    }, false);

    return self;
}