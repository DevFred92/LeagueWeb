document.addEventListener('DOMContentLoaded', function() {
    const divisions = {
        '2008-2009': [
            { id: 1, name: 'Team A', players: [{ id: 1, name: 'Player 1' }, { id: 2, name: 'Player 2' }] },
            { id: 2, name: 'Team B', players: [{ id: 3, name: 'Player 3' }, { id: 4, name: 'Player 4' }] }
        ],
        '2010-2011': [
            { id: 3, name: 'Team C', players: [{ id: 5, name: 'Player 5' }, { id: 6, name: 'Player 6' }] },
            { id: 4, name: 'Team D', players: [{ id: 7, name: 'Player 7' }, { id: 8, name: 'Player 8' }] }
        ]
        // Add more divisions and teams as needed
    };

    const standings = {
        '2008-2009': [
            { teamId: 1, wins: 3, losses: 1, draws: 0 },
            { teamId: 2, wins: 1, losses: 2, draws: 1 }
        ],
        '2010-2011': [
            { teamId: 3, wins: 4, losses: 0, draws: 0 },
            { teamId: 4, wins: 2, losses: 1, draws: 1 }
        ]
        // Add more standings as needed
    };

    const stats = {
        '2008-2009': [
            { playerId: 1, goals: 5, cleanSheets: 2, yellowCards: 1, redCards: 0 },
            { playerId: 2, goals: 3, cleanSheets: 0, yellowCards: 2, redCards: 1 }
        ],
        '2010-2011': [
            { playerId: 5, goals: 4, cleanSheets: 1, yellowCards: 3, redCards: 0 },
            { playerId: 6, goals: 2, cleanSheets: 1, yellowCards: 0, redCards: 0 }
        ]
        // Add more stats as needed
    };

    const schedule = {
        '2008-2009': [
            { matchId: 1, date: '2024-07-01', team1: 1, team2: 2 }
        ],
        '2010-2011': [
            { matchId: 2, date: '2024-07-02', team1: 3, team2: 4 }
        ]
        // Add more schedules as needed
    };

    function calculatePoints(wins, draws) {
        return (wins * 3) + draws;
    }

    function renderStandings(division) {
        const standingsContainer = document.getElementById('standings-container');
        standingsContainer.innerHTML = '';
        standings[division].forEach(standing => {
            const team = divisions[division].find(t => t.id === standing.teamId);
            const points = calculatePoints(standing.wins, standing.draws);
            standingsContainer.innerHTML += `<div>${team.name}: ${standing.wins}W - ${standing.losses}L - ${standing.draws}D - ${points} Points</div>`;
        });
    }

    function renderStats(division) {
        const statsContainer = document.getElementById('stats-container');
        statsContainer.innerHTML = '';
        stats[division].forEach(stat => {
            const player = divisions[division].flatMap(team => team.players).find(p => p.id === stat.playerId);
            statsContainer.innerHTML += `<div>${player.name}: ${stat.goals} Goals - ${stat.cleanSheets} Clean Sheets - ${stat.yellowCards} Yellow Cards - ${stat.redCards} Red Cards</div>`;
        });
    }

    function renderSchedule(division) {
        const scheduleContainer = document.getElementById('schedule-container');
        scheduleContainer.innerHTML = '';
        schedule[division].forEach(match => {
            const team1 = divisions[division].find(t => t.id === match.team1);
            const team2 = divisions[division].find(t => t.id === match.team2);
            scheduleContainer.innerHTML += `<div>${match.date}: ${team1.name} vs ${team2.name}</div>`;
        });
    }

    const standingsDivisionSelect = document.getElementById('standings-division');
    if (standingsDivisionSelect) {
        standingsDivisionSelect.addEventListener('change', (event) => {
            renderStandings(event.target.value);
        });
        renderStandings(standingsDivisionSelect.value); // Initial render
    }

    const statsDivisionSelect = document.getElementById('stats-division');
    if (statsDivisionSelect) {
        statsDivisionSelect.addEventListener('change', (event) => {
            renderStats(event.target.value);
        });
        renderStats(statsDivisionSelect.value); // Initial render
    }

    const scheduleDivisionSelect = document.getElementById('schedule-division');
    if (scheduleDivisionSelect) {
        scheduleDivisionSelect.addEventListener('change', (event) => {
            renderSchedule(event.target.value);
        });
        renderSchedule(scheduleDivisionSelect.value); // Initial render
    }

    const teamsDivisionSelect = document.getElementById('teams-division');
    if (teamsDivisionSelect) {
        teamsDivisionSelect.addEventListener('change', (event) => {
            renderTeams(event.target.value);
        });
        renderTeams(teamsDivisionSelect.value); // Initial render
    }

    function renderTeams(division) {
        const teamsContainer = document.getElementById('teams-container');
        teamsContainer.innerHTML = '';
        divisions[division].forEach(team => {
            const players = team.players.map(player => `<li>${player.name}</li>`).join('');
            teamsContainer.innerHTML += `<div><h3>${team.name}</h3><ul>${players}</ul></div>`;
        });
    }

    // Admin login and update functionality
    const adminCredentials = { username: 'VFCadmin', password: 'V@lleyfc21' };

    const loginForm = document.getElementById('login-form');
    const adminActions = document.getElementById('admin-actions');

    if (loginForm) {
        loginForm.addEventListener('submit', function(event) {
            event.preventDefault();
            const username = document.getElementById('username').value;
            const password = document.getElementById('password').value;

            if (username === adminCredentials.username && password === adminCredentials.password) {
                adminActions.style.display = 'block';
                loginForm.style.display = 'none';
            } else {
                alert('Invalid credentials');
            }
        });
    }

    // Add team functionality
    const teamForm = document.getElementById('team-form');
    if (teamForm) {
        teamForm.addEventListener('submit', function(event) {
            event.preventDefault();
            const division = document.getElementById('team-division').value;
            const teamName = document.getElementById('team-name').value;
            const newTeamId = divisions[division].length + 1;
            divisions[division].push({ id: newTeamId, name: teamName, players: [] });
            alert('Team added successfully');
        });
    }

    // Add player functionality
    const playerForm = document.getElementById('player-form');
    if (playerForm) {
        playerForm.addEventListener('submit', function(event) {
            event.preventDefault();
            const division = document.getElementById('player-division').value;
            const teamName = document.getElementById('player-team').value;
            const playerName = document.getElementById('player-name').value;
            const team = divisions[division].find(t => t.name === teamName);
            if (team) {
                const newPlayerId = team.players.length + 1;
                team.players.push({ id: newPlayerId, name: playerName });
                alert('Player added successfully');
            } else {
                alert('Team not found');
            }
        });
    }

    // Update standings functionality
    const standingsForm = document.getElementById('standings-form');
    if (standingsForm) {
        standingsForm.addEventListener('submit', function(event) {
            event.preventDefault();
            const division = document.getElementById('standings-division').value;
            const teamName = document.getElementById('standings-team').value;
            const wins = parseInt(document.getElementById('wins').value, 10);
            const losses = parseInt(document.getElementById('losses').value, 10);
            const draws = parseInt(document.getElementById('draws').value, 10);
            const team = divisions[division].find(t => t.name === teamName);
            if (team) {
                const standing = standings[division].find(s => s.teamId === team.id);
                if (standing) {
                    standing.wins = wins;
                    standing.losses = losses;
                    standing.draws = draws;
                    alert('Standings updated successfully');
                    renderStandings(division);
                } else {
                    alert('Standings for this team not found');
                }
            } else {
                alert('Team not found');
            }
        });
    }

    // Update player stats functionality
    const statsForm = document.getElementById('stats-form');
    if (statsForm) {
        statsForm.addEventListener('submit', function(event) {
            event.preventDefault();
            const division = document.getElementById('stats-division').value;
            const playerName = document.getElementById('stats-player').value;
            const goals = parseInt(document.getElementById('goals').value, 10);
            const cleanSheets = parseInt(document.getElementById('clean-sheets').value, 10);
            const yellowCards = parseInt(document.getElementById('yellow-cards').value, 10);
            const redCards = parseInt(document.getElementById('red-cards').value, 10);
            const player = divisions[division].flatMap(team => team.players).find(p => p.name === playerName);
            if (player) {
                const stat = stats[division].find(s => s.playerId === player.id);
                if (stat) {
                    stat.goals = goals;
                    stat.cleanSheets = cleanSheets;
                    stat.yellowCards = yellowCards;
                    stat.redCards = redCards;
                    alert('Stats updated successfully');
                    renderStats(division);
                } else {
                    alert('Stats for this player not found');
                }
            } else {
                alert('Player not found');
            }
        });
    }

    // Update schedule functionality
    const scheduleForm = document.getElementById('schedule-form');
    if (scheduleForm) {
        scheduleForm.addEventListener('submit', function(event) {
            event.preventDefault();
            const division = document.getElementById('schedule-division').value;
            const matchDate = document.getElementById('match-date').value;
            const team1Name = document.getElementById('team1').value;
            const team2Name = document.getElementById('team2').value;
            const team1 = divisions[division].find(t => t.name === team1Name);
            const team2 = divisions[division].find(t => t.name === team2Name);
            if (team1 && team2) {
                const newMatchId = schedule[division].length + 1;
                schedule[division].push({ matchId: newMatchId, date: matchDate, team1: team1.id, team2: team2.id });
                alert('Match added successfully');
                renderSchedule(division);
            } else {
                alert('One or both teams not found');
            }
        });
    }
});



/*document.addEventListener('DOMContentLoaded', function() {
    const divisions = {
        '2008-2009': [
            { id: 1, name: 'Team A', players: [{ id: 1, name: 'Player 1' }, { id: 2, name: 'Player 2' }] },
            { id: 2, name: 'Team B', players: [{ id: 3, name: 'Player 3' }, { id: 4, name: 'Player 4' }] },
            { id: 3, name: 'Team C', players: [{ id: 4, name: 'Player 5' }, { id: 4, name: 'Player 6' }] },
            { id: 4, name: 'Team D', players: [{ id: 3, name: 'Player 7' }, { id: 4, name: 'Player 8' }] },
            { id: 5, name: 'Team E', players: [{ id: 3, name: 'Player 9' }, { id: 4, name: 'Player 10' }] },
            { id: 6, name: 'Team F', players: [{ id: 3, name: 'Player 11' }, { id: 4, name: 'Player 12' }] },
            { id: 7, name: 'Team G', players: [{ id: 3, name: 'Player 13' }, { id: 4, name: 'Player 14' }] },
            { id: 8, name: 'Team H', players: [{ id: 3, name: 'Player 15' }, { id: 4, name: 'Player 16' }] },
            { id: 9, name: 'Team I', players: [{ id: 3, name: 'Player 17' }, { id: 4, name: 'Player 18' }] },
            { id: 10, name: 'Team J', players: [{ id: 3, name: 'Player 19' }, { id: 4, name: 'Player 20' }] }
        ],
        '2010-2011': [
            { id: 1, name: 'Team A', players: [{ id: 1, name: 'Player 1' }, { id: 2, name: 'Player 2' }] },
            { id: 2, name: 'Team B', players: [{ id: 3, name: 'Player 3' }, { id: 4, name: 'Player 4' }] },
            { id: 3, name: 'Team C', players: [{ id: 4, name: 'Player 5' }, { id: 4, name: 'Player 6' }] },
            { id: 4, name: 'Team D', players: [{ id: 3, name: 'Player 7' }, { id: 4, name: 'Player 8' }] },
            { id: 5, name: 'Team E', players: [{ id: 3, name: 'Player 9' }, { id: 4, name: 'Player 10' }] },
            { id: 6, name: 'Team F', players: [{ id: 3, name: 'Player 11' }, { id: 4, name: 'Player 12' }] },
            { id: 7, name: 'Team G', players: [{ id: 3, name: 'Player 13' }, { id: 4, name: 'Player 14' }] },
            { id: 8, name: 'Team H', players: [{ id: 3, name: 'Player 15' }, { id: 4, name: 'Player 16' }] },
            { id: 9, name: 'Team I', players: [{ id: 3, name: 'Player 17' }, { id: 4, name: 'Player 18' }] },
            { id: 10, name: 'Team J', players: [{ id: 3, name: 'Player 19' }, { id: 4, name: 'Player 20' }] }
        ],
        '2012-2013': [
            { id: 1, name: 'Team A', players: [{ id: 1, name: 'Player 1' }, { id: 2, name: 'Player 2' }] },
            { id: 2, name: 'Team B', players: [{ id: 3, name: 'Player 3' }, { id: 4, name: 'Player 4' }] },
            { id: 3, name: 'Team C', players: [{ id: 4, name: 'Player 5' }, { id: 4, name: 'Player 6' }] },
            { id: 4, name: 'Team D', players: [{ id: 3, name: 'Player 7' }, { id: 4, name: 'Player 8' }] },
            { id: 5, name: 'Team E', players: [{ id: 3, name: 'Player 9' }, { id: 4, name: 'Player 10' }] },
            { id: 6, name: 'Team F', players: [{ id: 3, name: 'Player 11' }, { id: 4, name: 'Player 12' }] },
            { id: 7, name: 'Team G', players: [{ id: 3, name: 'Player 13' }, { id: 4, name: 'Player 14' }] },
            { id: 8, name: 'Team H', players: [{ id: 3, name: 'Player 15' }, { id: 4, name: 'Player 16' }] },
            { id: 9, name: 'Team I', players: [{ id: 3, name: 'Player 17' }, { id: 4, name: 'Player 18' }] },
            { id: 10, name: 'Team J', players: [{ id: 3, name: 'Player 19' }, { id: 4, name: 'Player 20' }] }
        ],
        '2014-2015': [
            { id: 1, name: 'Team A', players: [{ id: 1, name: 'Player 1' }, { id: 2, name: 'Player 2' }] },
            { id: 2, name: 'Team B', players: [{ id: 3, name: 'Player 3' }, { id: 4, name: 'Player 4' }] },
            { id: 3, name: 'Team C', players: [{ id: 4, name: 'Player 5' }, { id: 4, name: 'Player 6' }] },
            { id: 4, name: 'Team D', players: [{ id: 3, name: 'Player 7' }, { id: 4, name: 'Player 8' }] },
            { id: 5, name: 'Team E', players: [{ id: 3, name: 'Player 9' }, { id: 4, name: 'Player 10' }] },
            { id: 6, name: 'Team F', players: [{ id: 3, name: 'Player 11' }, { id: 4, name: 'Player 12' }] },
            { id: 7, name: 'Team G', players: [{ id: 3, name: 'Player 13' }, { id: 4, name: 'Player 14' }] },
            { id: 8, name: 'Team H', players: [{ id: 3, name: 'Player 15' }, { id: 4, name: 'Player 16' }] },
            { id: 9, name: 'Team I', players: [{ id: 3, name: 'Player 17' }, { id: 4, name: 'Player 18' }] },
            { id: 10, name: 'Team J', players: [{ id: 3, name: 'Player 19' }, { id: 4, name: 'Player 20' }] }
        ],
        '2016-2017': [
            { id: 1, name: 'Team A', players: [{ id: 1, name: 'Player 1' }, { id: 2, name: 'Player 2' }] },
            { id: 2, name: 'Team B', players: [{ id: 3, name: 'Player 3' }, { id: 4, name: 'Player 4' }] },
            { id: 3, name: 'Team C', players: [{ id: 4, name: 'Player 5' }, { id: 4, name: 'Player 6' }] },
            { id: 4, name: 'Team D', players: [{ id: 3, name: 'Player 7' }, { id: 4, name: 'Player 8' }] },
            { id: 5, name: 'Team E', players: [{ id: 3, name: 'Player 9' }, { id: 4, name: 'Player 10' }] },
            { id: 6, name: 'Team F', players: [{ id: 3, name: 'Player 11' }, { id: 4, name: 'Player 12' }] },
            { id: 7, name: 'Team G', players: [{ id: 3, name: 'Player 13' }, { id: 4, name: 'Player 14' }] },
            { id: 8, name: 'Team H', players: [{ id: 3, name: 'Player 15' }, { id: 4, name: 'Player 16' }] },
            { id: 9, name: 'Team I', players: [{ id: 3, name: 'Player 17' }, { id: 4, name: 'Player 18' }] },
            { id: 10, name: 'Team J', players: [{ id: 3, name: 'Player 19' }, { id: 4, name: 'Player 20' }] }
        ],
        '2018-2019': [
            { id: 1, name: 'Team A', players: [{ id: 1, name: 'Player 1' }, { id: 2, name: 'Player 2' }] },
            { id: 2, name: 'Team B', players: [{ id: 3, name: 'Player 3' }, { id: 4, name: 'Player 4' }] },
            { id: 3, name: 'Team C', players: [{ id: 4, name: 'Player 5' }, { id: 4, name: 'Player 6' }] },
            { id: 4, name: 'Team D', players: [{ id: 3, name: 'Player 7' }, { id: 4, name: 'Player 8' }] },
            { id: 5, name: 'Team E', players: [{ id: 3, name: 'Player 9' }, { id: 4, name: 'Player 10' }] },
            { id: 6, name: 'Team F', players: [{ id: 3, name: 'Player 11' }, { id: 4, name: 'Player 12' }] },
            { id: 7, name: 'Team G', players: [{ id: 3, name: 'Player 13' }, { id: 4, name: 'Player 14' }] },
            { id: 8, name: 'Team H', players: [{ id: 3, name: 'Player 15' }, { id: 4, name: 'Player 16' }] },
            { id: 9, name: 'Team I', players: [{ id: 3, name: 'Player 17' }, { id: 4, name: 'Player 18' }] },
            { id: 10, name: 'Team J', players: [{ id: 3, name: 'Player 19' }, { id: 4, name: 'Player 20' }] }
        ],
        // Add more divisions and teams as needed
    };

    const standings = {
        '2008-2009': [
            { teamId: 1, wins: 0, losses: 0, draws: 0 },
            { teamId: 2, wins: 0, losses: 0, draws: 0 },
            { teamId: 3, wins: 0, losses: 0, draws: 0 },
            { teamId: 4, wins: 0, losses: 0, draws: 0 },
            { teamId: 5, wins: 0, losses: 0, draws: 0 },
            { teamId: 6, wins: 0, losses: 0, draws: 0 },
            { teamId: 7, wins: 0, losses: 0, draws: 0 },
            { teamId: 8, wins: 0, losses: 0, draws: 0 },
            { teamId: 9, wins: 0, losses: 0, draws: 0 },
            { teamId: 10, wins: 0, losses: 0, draws: 0 },
            { teamId: 11, wins: 0, losses: 0, draws: 0 },
            { teamId: 12, wins: 0, losses: 0, draws: 0 },
            { teamId: 13, wins: 0, losses: 0, draws: 0 },
            { teamId: 14, wins: 0, losses: 0, draws: 0 },
            { teamId: 15, wins: 0, losses: 0, draws: 0 },
            { teamId: 16, wins: 0, losses: 0, draws: 0 },
            { teamId: 17, wins: 0, losses: 0, draws: 0 },
            { teamId: 18, wins: 0, losses: 0, draws: 0 }

        ],
        '2010-2011': [
            { teamId: 1, wins: 0, losses: 0, draws: 0 },
            { teamId: 2, wins: 0, losses: 0, draws: 0 },
            { teamId: 3, wins: 0, losses: 0, draws: 0 },
            { teamId: 4, wins: 0, losses: 0, draws: 0 },
            { teamId: 5, wins: 0, losses: 0, draws: 0 },
            { teamId: 6, wins: 0, losses: 0, draws: 0 },
            { teamId: 7, wins: 0, losses: 0, draws: 0 },
            { teamId: 8, wins: 0, losses: 0, draws: 0 },
            { teamId: 9, wins: 0, losses: 0, draws: 0 },
            { teamId: 10, wins: 0, losses: 0, draws: 0 },
            { teamId: 11, wins: 0, losses: 0, draws: 0 },
            { teamId: 12, wins: 0, losses: 0, draws: 0 },
            { teamId: 13, wins: 0, losses: 0, draws: 0 },
            { teamId: 14, wins: 0, losses: 0, draws: 0 },
            { teamId: 15, wins: 0, losses: 0, draws: 0 },
            { teamId: 16, wins: 0, losses: 0, draws: 0 },
            { teamId: 17, wins: 0, losses: 0, draws: 0 },
            { teamId: 18, wins: 0, losses: 0, draws: 0 }

        ],
        '2012-2013': [
            { teamId: 1, wins: 0, losses: 0, draws: 0 },
            { teamId: 2, wins: 0, losses: 0, draws: 0 },
            { teamId: 3, wins: 0, losses: 0, draws: 0 },
            { teamId: 4, wins: 0, losses: 0, draws: 0 },
            { teamId: 5, wins: 0, losses: 0, draws: 0 },
            { teamId: 6, wins: 0, losses: 0, draws: 0 },
            { teamId: 7, wins: 0, losses: 0, draws: 0 },
            { teamId: 8, wins: 0, losses: 0, draws: 0 },
            { teamId: 9, wins: 0, losses: 0, draws: 0 },
            { teamId: 10, wins: 0, losses: 0, draws: 0 },
            { teamId: 11, wins: 0, losses: 0, draws: 0 },
            { teamId: 12, wins: 0, losses: 0, draws: 0 },
            { teamId: 13, wins: 0, losses: 0, draws: 0 },
            { teamId: 14, wins: 0, losses: 0, draws: 0 },
            { teamId: 15, wins: 0, losses: 0, draws: 0 },
            { teamId: 16, wins: 0, losses: 0, draws: 0 },
            { teamId: 17, wins: 0, losses: 0, draws: 0 },
            { teamId: 18, wins: 0, losses: 0, draws: 0 }

        ],
        '2014-2015': [
            { teamId: 1, wins: 0, losses: 0, draws: 0 },
            { teamId: 2, wins: 0, losses: 0, draws: 0 },
            { teamId: 3, wins: 0, losses: 0, draws: 0 },
            { teamId: 4, wins: 0, losses: 0, draws: 0 },
            { teamId: 5, wins: 0, losses: 0, draws: 0 },
            { teamId: 6, wins: 0, losses: 0, draws: 0 },
            { teamId: 7, wins: 0, losses: 0, draws: 0 },
            { teamId: 8, wins: 0, losses: 0, draws: 0 },
            { teamId: 9, wins: 0, losses: 0, draws: 0 },
            { teamId: 10, wins: 0, losses: 0, draws: 0 },
            { teamId: 11, wins: 0, losses: 0, draws: 0 },
            { teamId: 12, wins: 0, losses: 0, draws: 0 },
            { teamId: 13, wins: 0, losses: 0, draws: 0 },
            { teamId: 14, wins: 0, losses: 0, draws: 0 },
            { teamId: 15, wins: 0, losses: 0, draws: 0 },
            { teamId: 16, wins: 0, losses: 0, draws: 0 },
            { teamId: 17, wins: 0, losses: 0, draws: 0 },
            { teamId: 18, wins: 0, losses: 0, draws: 0 }

        ],
        '2016-2017': [
            { teamId: 1, wins: 0, losses: 0, draws: 0 },
            { teamId: 2, wins: 0, losses: 0, draws: 0 },
            { teamId: 3, wins: 0, losses: 0, draws: 0 },
            { teamId: 4, wins: 0, losses: 0, draws: 0 },
            { teamId: 5, wins: 0, losses: 0, draws: 0 },
            { teamId: 6, wins: 0, losses: 0, draws: 0 },
            { teamId: 7, wins: 0, losses: 0, draws: 0 },
            { teamId: 8, wins: 0, losses: 0, draws: 0 },
            { teamId: 9, wins: 0, losses: 0, draws: 0 },
            { teamId: 10, wins: 0, losses: 0, draws: 0 },
            { teamId: 11, wins: 0, losses: 0, draws: 0 },
            { teamId: 12, wins: 0, losses: 0, draws: 0 },
            { teamId: 13, wins: 0, losses: 0, draws: 0 },
            { teamId: 14, wins: 0, losses: 0, draws: 0 },
            { teamId: 15, wins: 0, losses: 0, draws: 0 },
            { teamId: 16, wins: 0, losses: 0, draws: 0 },
            { teamId: 17, wins: 0, losses: 0, draws: 0 },
            { teamId: 18, wins: 0, losses: 0, draws: 0 }

        ],
        
        // Add more standings as needed
    };

    const stats = {
        '2008-2009': [
            { playerId: 1, goals: 5, cleanSheets: 2, yellowCards: 1, redCards: 0 },
            { playerId: 2, goals: 3, cleanSheets: 0, yellowCards: 2, redCards: 1 }
        ],
        '2010-2011': [
            { playerId: 5, goals: 4, cleanSheets: 1, yellowCards: 3, redCards: 0 },
            { playerId: 6, goals: 2, cleanSheets: 1, yellowCards: 0, redCards: 0 }
        ]
        // Add more stats as needed
    };

    const schedule = {
        '2008-2009': [
            { matchId: 1, date: '2024-07-01', team1: 1, team2: 2 }
        ],
        '2010-2011': [
            { matchId: 2, date: '2024-07-02', team1: 3, team2: 4 }
        ]
        // Add more schedules as needed
    };

    function calculatePoints(wins, draws) {
        return (wins * 3) + draws;
    }

    function renderStandings(division) {
        const standingsContainer = document.getElementById('standings-container');
        standingsContainer.innerHTML = '';
        standings[division].forEach(standing => {
            const team = divisions[division].find(t => t.id === standing.teamId);
            const points = calculatePoints(standing.wins, standing.draws);
            standingsContainer.innerHTML += `<div>${team.name}: ${standing.wins}W - ${standing.losses}L - ${standing.draws}D - ${points} Points</div>`;
        });
    }

    function renderStats(division) {
        const statsContainer = document.getElementById('stats-container');
        statsContainer.innerHTML = '';
        stats[division].forEach(stat => {
            const player = divisions[division].flatMap(team => team.players).find(p => p.id === stat.playerId);
            statsContainer.innerHTML += `<div>${player.name}: ${stat.goals} Goals - ${stat.cleanSheets} Clean Sheets - ${stat.yellowCards} Yellow Cards - ${stat.redCards} Red Cards</div>`;
        });
    }

    function renderSchedule(division) {
        const scheduleContainer = document.getElementById('schedule-container');
        scheduleContainer.innerHTML = '';
        schedule[division].forEach(match => {
            const team1 = divisions[division].find(t => t.id === match.team1);
            const team2 = divisions[division].find(t => t.id === match.team2);
            scheduleContainer.innerHTML += `<div>${match.date}: ${team1.name} vs ${team2.name}</div>`;
        });
    }

    const standingsDivisionSelect = document.getElementById('standings-division');
    if (standingsDivisionSelect) {
        standingsDivisionSelect.addEventListener('change', (event) => {
            renderStandings(event.target.value);
        });
        renderStandings(standingsDivisionSelect.value); // Initial render
    }

    const statsDivisionSelect = document.getElementById('stats-division');
    if (statsDivisionSelect) {
        statsDivisionSelect.addEventListener('change', (event) => {
            renderStats(event.target.value);
        });
        renderStats(statsDivisionSelect.value); // Initial render
    }

    const scheduleDivisionSelect = document.getElementById('schedule-division');
    if (scheduleDivisionSelect) {
        scheduleDivisionSelect.addEventListener('change', (event) => {
            renderSchedule(event.target.value);
        });
        renderSchedule(scheduleDivisionSelect.value); // Initial render
    }

    const teamsDivisionSelect = document.getElementById('teams-division');
    if (teamsDivisionSelect) {
        teamsDivisionSelect.addEventListener('change', (event) => {
            renderTeams(event.target.value);
        });
        renderTeams(teamsDivisionSelect.value); // Initial render
    }

    function renderTeams(division) {
        const teamsContainer = document.getElementById('teams-container');
        teamsContainer.innerHTML = '';
        divisions[division].forEach(team => {
            const players = team.players.map(player => `<li>${player.name}</li>`).join('');
            teamsContainer.innerHTML += `<div><h3>${team.name}</h3><ul>${players}</ul></div>`;
        });
    }

    // Admin login and update functionality
    const adminCredentials = { username: 'VFCadmin', password: 'V@lleyfc21' };

    const loginForm = document.getElementById('login-form');
    const adminActions = document.getElementById('admin-actions');

    if (loginForm) {
        loginForm.addEventListener('submit', function(event) {
            event.preventDefault();
            const username = document.getElementById('username').value;
            const password = document.getElementById('password').value;

            if (username === adminCredentials.username && password === adminCredentials.password) {
                adminActions.style.display = 'block';
                loginForm.style.display = 'none';
            } else {
                alert('Invalid credentials');
            }
        });
    }

    // Add team functionality
    const teamForm = document.getElementById('team-form');
    if (teamForm) {
        teamForm.addEventListener('submit', function(event) {
            event.preventDefault();
            const division = document.getElementById('team-division').value;
            const teamName = document.getElementById('team-name').value;
            const newTeamId = divisions[division].length + 1;
            divisions[division].push({ id: newTeamId, name: teamName, players: [] });
            alert('Team added successfully');
        });
    }

    // Add player functionality
    const playerForm = document.getElementById('player-form');
    if (playerForm) {
        playerForm.addEventListener('submit', function(event) {
            event.preventDefault();
            const division = document.getElementById('player-division').value;
            const teamName = document.getElementById('player-team').value;
            const playerName = document.getElementById('player-name').value;
            const team = divisions[division].find(t => t.name === teamName);
            if (team) {
                const newPlayerId = team.players.length + 1;
                team.players.push({ id: newPlayerId, name: playerName });
                alert('Player added successfully');
            } else {
                alert('Team not found');
            }
        });
    }

    // Update standings functionality
    const standingsForm = document.getElementById('standings-form');
    if (standingsForm) {
        standingsForm.addEventListener('submit', function(event) {
            event.preventDefault();
            const division = document.getElementById('standings-division').value;
            const teamName = document.getElementById('standings-team').value;
            const wins = parseInt(document.getElementById('wins').value, 10);
            const losses = parseInt(document.getElementById('losses').value, 10);
            const draws = parseInt(document.getElementById('draws').value, 10);
            const team = divisions[division].find(t => t.name === teamName);
            if (team) {
                const standing = standings[division].find(s => s.teamId === team.id);
                if (standing) {
                    standing.wins = wins;
                    standing.losses = losses;
                    standing.draws = draws;
                    alert('Standings updated successfully');
                    renderStandings(division);
                } else {
                    alert('Standings for this team not found');
                }
            } else {
                alert('Team not found');
            }
        });
    }

    // Update player stats functionality
    const statsForm = document.getElementById('stats-form');
    if (statsForm) {
        statsForm.addEventListener('submit', function(event) {
            event.preventDefault();
            const division = document.getElementById('stats-division').value;
            const playerName = document.getElementById('stats-player').value;
            const goals = parseInt(document.getElementById('goals').value, 10);
            const cleanSheets = parseInt(document.getElementById('clean-sheets').value, 10);
            const yellowCards = parseInt(document.getElementById('yellow-cards').value, 10);
            const redCards = parseInt(document.getElementById('red-cards').value, 10);
            const player = divisions[division].flatMap(team => team.players).find(p => p.name === playerName);
            if (player) {
                const stat = stats[division].find(s => s.playerId === player.id);
                if (stat) {
                    stat.goals = goals;
                    stat.cleanSheets = cleanSheets;
                    stat.yellowCards = yellowCards;
                    stat.redCards = redCards;
                    alert('Stats updated successfully');
                    renderStats(division);
                } else {
                    alert('Stats for this player not found');
                }
            } else {
                alert('Player not found');
            }
        });
    }

    // Update schedule functionality
    const scheduleForm = document.getElementById('schedule-form');
    if (scheduleForm) {
        scheduleForm.addEventListener('submit', function(event) {
            event.preventDefault();
            const division = document.getElementById('schedule-division').value;
            const matchDate = document.getElementById('match-date').value;
            const team1Name = document.getElementById('team1').value;
            const team2Name = document.getElementById('team2').value;
            const team1 = divisions[division].find(t => t.name === team1Name);
            const team2 = divisions[division].find(t => t.name === team2Name);
            if (team1 && team2) {
                const newMatchId = schedule[division].length + 1;
                schedule[division].push({ matchId: newMatchId, date: matchDate, team1: team1.id, team2: team2.id });
                alert('Match added successfully');
                renderSchedule(division);
            } else {
                alert('One or both teams not found');
            }
        });
    }
});*/
