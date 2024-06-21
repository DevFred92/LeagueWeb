document.addEventListener('DOMContentLoaded', function() {
    const maxTeams = 17;
    const maxPlayersPerTeam = 22;
    const maxWeeks = 16;

    const divisions = {
        '2008-2009': [],
        '2010-2011': [],
        '2012-2013': [],
        '2014-2015': [],
        '2016-2017': [],
        '2018-2019': []
    };

    const standings = {
        '2008-2009': [],
        '2010-2011': [],
        '2012-2013': [],
        '2014-2015': [],
        '2016-2017': [],
        '2018-2019': []
    };

    const stats = {
        '2008-2009': [],
        '2010-2011': [],
        '2012-2013': [],
        '2014-2015': [],
        '2016-2017': [],
        '2018-2019': []
    };

    const schedule = {
        '2008-2009': {},
        '2010-2011': {},
        '2012-2013': {},
        '2014-2015': {},
        '2016-2017': {},
        '2018-2019': {}
    };

    for (const division in schedule) {
        for (let i = 1; i <= maxWeeks; i++) {
            schedule[division][`week${i}`] = [];
        }
    }

    function calculatePoints(wins, draws) {
        return (wins * 3) + draws;
    }

    function renderStandings(division) {
        const standingsContainer = document.getElementById('standings-container');
        if (standingsContainer) {
            standingsContainer.innerHTML = '';
            standings[division].forEach(standing => {
                const team = divisions[division].find(t => t.id === standing.teamId);
                const points = calculatePoints(standing.wins, standing.draws);
                standingsContainer.innerHTML += `<div>${team.name}: ${standing.wins}W - ${standing.losses}L - ${standing.draws}D - ${points} Points</div>`;
            });
        }
    }

    function renderStats(division) {
        const statsContainer = document.getElementById('stats-container');
        if (statsContainer) {
            statsContainer.innerHTML = '';
            stats[division].forEach(stat => {
                const player = divisions[division].flatMap(team => team.players).find(p => p.id === stat.playerId);
                statsContainer.innerHTML += `<div>${player.name}: ${stat.goals} Goals - ${stat.cleanSheets} Clean Sheets - ${stat.yellowCards} Yellow Cards - ${stat.redCards} Red Cards</div>`;
            });
        }
    }

    function renderSchedule(division, week) {
        const scheduleContainer = document.getElementById('schedule-container');
        if (scheduleContainer) {
            scheduleContainer.innerHTML = '';
            schedule[division][week].forEach(match => {
                const team1 = divisions[division].find(t => t.id === match.team1);
                const team2 = divisions[division].find(t => t.id === match.team2);
                scheduleContainer.innerHTML += `<div>${match.date}: ${team1.name} vs ${team2.name}</div>`;
            });
        }
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
    const weekSelect = document.getElementById('week-select');
    if (scheduleDivisionSelect && weekSelect) {
        scheduleDivisionSelect.addEventListener('change', (event) => {
            renderSchedule(event.target.value, weekSelect.value);
        });
        weekSelect.addEventListener('change', () => {
            renderSchedule(scheduleDivisionSelect.value, weekSelect.value);
        });
        renderSchedule(scheduleDivisionSelect.value, weekSelect.value); // Initial render
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
        if (teamsContainer) {
            teamsContainer.innerHTML = '';
            divisions[division].forEach(team => {
                const players = team.players.map(player => `<li>${player.name}</li>`).join('');
                teamsContainer.innerHTML += `<div><h3>${team.name}</h3><ul>${players}</ul></div>`;
            });
        }
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

            console.log('Login attempt:', username, password); // Debugging

            if (username === adminCredentials.username && password === adminCredentials.password) {
                console.log('Login successful'); // Debugging
                adminActions.style.display = 'block';
                loginForm.style.display = 'none';
            } else {
                console.log('Invalid credentials'); // Debugging
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
            if (divisions[division].length < maxTeams) {
                divisions[division].push({ id: newTeamId, name: teamName, players: [] });
                alert('Team added successfully');
            } else {
                alert('Maximum number of teams reached for this division.');
            }
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
                if (team.players.length < maxPlayersPerTeam) {
                    const newPlayerId = team.players.length + 1;
                    team.players.push({ id: newPlayerId, name: playerName });
                    alert('Player added successfully');
                } else {
                    alert('Maximum number of players reached for this team.');
                }
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
                    standings[division].push({ teamId: team.id, wins, losses, draws });
                    alert('Standings added successfully');
                    renderStandings(division);
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
                    stats[division].push({ playerId: player.id, goals, cleanSheets, yellowCards, redCards });
                    alert('Stats added successfully');
                    renderStats(division);
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
            const week = document.getElementById('week-select').value;
            const matchDate = document.getElementById('match-date').value;
            const team1Name = document.getElementById('team1').value;
            const team2Name = document.getElementById('team2').value;
            const team1 = divisions[division].find(t => t.name === team1Name);
            const team2 = divisions[division].find(t => t.name === team2Name);
            if (team1 && team2) {
                const newMatchId = schedule[division][week].length + 1;
                schedule[division][week].push({ matchId: newMatchId, date: matchDate, team1: team1.id, team2: team2.id });
                alert('Match added successfully');
                renderSchedule(division, week);
            } else {
                alert('One or both teams not found');
            }
        });
    }
});
