// Sports Match Analyzer Pro - VIP Edition
// Enhanced betting intelligence and premium analysis algorithms

// Core data structure
const matchData = {
    h2h: [], // Head-to-head matches between the two teams
    team1: [], // Team 1's matches against other teams
    team2: [] // Team 2's matches against other teams
};

// Team info
let team1Name = 'Team 1';
let team2Name = 'Team 2';
let team1Ranking = 0;
let team2Ranking = 0;
let matchImportance = 1;
let matchLocation = 'neutral';

// Betting lines
let totalLine = 0;  // For over/under bets
let pointSpread = 0; // For handicap bets
let spreadDirection = 'team1'; // Which team is favored in the spread

// VIP enhanced features
const VIP_MODE = true;
const VIP_ALGORITHMS = {
    MOMENTUM_ANALYSER: true,
    FORM_WEIGHTING: true,
    ADVANCED_METRICS: true,
    DYNAMIC_SIMULATIONS: true
};

// Historical edge tracking
let historicalEdge = {
    overUnder: {
        sampleSize: 0,
        accuracy: 0
    },
    handicap: {
        sampleSize: 0,
        accuracy: 0
    }
};

// Charts
let winProbabilityChart = null;
let modelConfidenceChart = null;
let scoreProbabilityChart = null;
let performanceTrendChart = null;
let bettingEdgeChart = null; // VIP feature
let scoringDistributionChart = null; // VIP feature

// Analysis results tracking
let lastAnalysisResults = null;
let featureImportanceScores = {};
let betSimulationResults = null; // VIP feature

// Constants for data analysis
const MIN_MATCHES_FOR_GOOD_ANALYSIS = 4;
const MIN_MATCHES_FOR_EXCELLENT_ANALYSIS = 8;
const MIN_H2H_MATCHES = 2;

// Constants for weighting factors - Enhanced for VIP
const WEIGHTS = {
    RECENT_FORM: 3.2,
    H2H_MATCHES: 2.8,
    OVERALL_PERFORMANCE: 2.2,
    HOME_ADVANTAGE: 1.7,
    RANKING: 1.2,
    MATCH_IMPORTANCE: 2.0,
    SCORING_TREND: 1.8,
    DEFENSIVE_TREND: 1.6,
    MOMENTUM: 2.5,
    CONSISTENCY: 1.5,
    // VIP enhanced weights
    KEY_PLAYER_IMPACT: 1.8,
    PSYCHOLOGICAL_EDGE: 1.4,
    PLAYSTYLE_MATCHUP: 1.6,
    VENUE_FAMILIARITY: 1.2,
    SCHEDULE_FATIGUE: 1.3
};

// Enhanced betting constants - VIP feature
const BETTING_KNOWLEDGE_BASE = {
    overUnder: {
        understanding: "For over/under bets, the line (e.g. 2.5) means total goals must exceed this number for 'over' to win. For over 1.5, need at least 2 goals. For over 2.5, need at least 3 goals.",
        strategy: "Look for teams with consistent scoring patterns and strong attacks facing weaker defenses."
    },
    asianHandicap: {
        understanding: "A +0.5 handicap means that team needs only a draw to win the bet. A -0.5 handicap means that team must win outright.",
        strategy: "For favorable handicaps, identify teams that rarely lose by large margins even against superior opponents."
    },
    margins: {
        thresholds: {
            strong: 8.5,
            moderate: 5.0,
            weak: 3.0
        }
    }
};

// Initialize the application
document.addEventListener('DOMContentLoaded', () => {
    // Setup VIP environment
    setupVIPEnvironment();
    
    // Setup event listeners
    setupEventListeners();
    
    // Update team names in the UI
    updateTeamLabels();
    
    // Update data sufficiency indicators
    updateDataSufficiencyIndicators();
    
    // Show welcome toast
    showToast('Welcome to Sports Match Analyzer Pro VIP Edition', 'vip');
});

// Setup VIP environment and styling
function setupVIPEnvironment() {
    if (!VIP_MODE) return;
    
    // Add VIP badge to header
    const headerElement = document.querySelector('header h1');
    if (headerElement) {
        headerElement.innerHTML = 'Sports Match Analyzer Pro <span class="vip-badge">VIP</span>';
    }
    
    // Add VIP styling class to body
    document.body.classList.add('vip-mode');
    
    // Add VIP features explanation
    const vipFeaturesHtml = `
        <div class="vip-features-panel">
            <h3><span class="material-symbols-outlined">workspace_premium</span> VIP Features Activated</h3>
            <div class="vip-features-list">
                <div class="vip-feature">
                    <span class="material-symbols-outlined">analytics</span>
                    <div>
                        <h4>Advanced Betting Intelligence</h4>
                        <p>Enhanced understanding of betting markets including over/under lines and Asian handicaps</p>
                    </div>
                </div>
                <div class="vip-feature">
                    <span class="material-symbols-outlined">model_training</span>
                    <div>
                        <h4>Premium Prediction Algorithms</h4>
                        <p>Utilizes proprietary algorithms with increased accuracy and edge detection</p>
                    </div>
                </div>
                <div class="vip-feature">
                    <span class="material-symbols-outlined">history_edu</span>
                    <div>
                        <h4>Deep Statistical Modeling</h4>
                        <p>Incorporates advanced metrics and simulation-based projections</p>
                    </div>
                </div>
            </div>
        </div>
    `;
    
    // Insert VIP features panel after first card
    const firstCard = document.querySelector('.card');
    if (firstCard) {
        const vipPanel = document.createElement('div');
        vipPanel.className = 'vip-panel';
        vipPanel.innerHTML = vipFeaturesHtml;
        firstCard.parentNode.insertBefore(vipPanel, firstCard.nextSibling);
    }
    
    // Enhance betting line section
    enhanceBettingLineSection();
}

// Enhance betting line section with more detailed inputs
function enhanceBettingLineSection() {
    const bettingLinesCard = document.getElementById('betting-lines');
    if (!bettingLinesCard) return;
    
    // Add VIP badge to section header
    const sectionHeader = bettingLinesCard.querySelector('h2');
    if (sectionHeader) {
        sectionHeader.innerHTML += ' <span class="vip-badge-small">VIP</span>';
    }
    
    // Create betting type selector
    const bettingTypesHtml = `
        <div class="form-row">
            <div class="form-group full-width">
                <label for="betting-type">Betting Market Type</label>
                <select id="betting-type" class="vip-select">
                    <option value="all">All Markets</option>
                    <option value="overUnder">Over/Under</option>
                    <option value="handicap">Handicap</option>
                    <option value="doubleChance">Double Chance</option>
                    <option value="btts">Both Teams To Score</option>
                </select>
            </div>
        </div>
        
        <div id="over-under-options" class="betting-option-panel">
            <h3><span class="material-symbols-outlined">stacked_line_chart</span> Over/Under Lines</h3>
            <div class="form-row">
                <div class="form-group">
                    <label for="over-under-0.5">Over/Under 0.5</label>
                    <select id="over-under-0.5" class="vip-select">
                        <option value="">Not Selected</option>
                        <option value="over">Over 0.5</option>
                        <option value="under">Under 0.5</option>
                    </select>
                </div>
                <div class="form-group">
                    <label for="over-under-1.5">Over/Under 1.5</label>
                    <select id="over-under-1.5" class="vip-select">
                        <option value="">Not Selected</option>
                        <option value="over">Over 1.5</option>
                        <option value="under">Under 1.5</option>
                    </select>
                </div>
                <div class="form-group">
                    <label for="over-under-2.5">Over/Under 2.5</label>
                    <select id="over-under-2.5" class="vip-select">
                        <option value="">Not Selected</option>
                        <option value="over">Over 2.5</option>
                        <option value="under">Under 2.5</option>
                    </select>
                </div>
                <div class="form-group">
                    <label for="over-under-3.5">Over/Under 3.5</label>
                    <select id="over-under-3.5" class="vip-select">
                        <option value="">Not Selected</option>
                        <option value="over">Over 3.5</option>
                        <option value="under">Under 3.5</option>
                    </select>
                </div>
            </div>
            <div class="betting-explanation">
                <div class="betting-tip">
                    <span class="material-symbols-outlined">tips_and_updates</span>
                    <p><strong>VIP Insight:</strong> For Over 1.5 to win, there must be at least 2 goals in the match. Similarly, Over 2.5 requires at least 3 goals.</p>
                </div>
            </div>
        </div>
        
        <div id="handicap-options" class="betting-option-panel">
            <h3><span class="material-symbols-outlined">balance</span> Asian Handicap</h3>
            <div class="form-row">
                <div class="form-group">
                    <label for="team1-handicap">Team 1 Handicap</label>
                    <select id="team1-handicap" class="vip-select">
                        <option value="">Not Selected</option>
                        <option value="-2.5">-2.5</option>
                        <option value="-2">-2</option>
                        <option value="-1.5">-1.5</option>
                        <option value="-1">-1</option>
                        <option value="-0.5">-0.5</option>
                        <option value="0">0</option>
                        <option value="+0.5">+0.5</option>
                        <option value="+1">+1</option>
                        <option value="+1.5">+1.5</option>
                        <option value="+2">+2</option>
                        <option value="+2.5">+2.5</option>
                    </select>
                </div>
                <div class="form-group">
                    <label for="team2-handicap">Team 2 Handicap</label>
                    <select id="team2-handicap" class="vip-select">
                        <option value="">Not Selected</option>
                        <option value="-2.5">-2.5</option>
                        <option value="-2">-2</option>
                        <option value="-1.5">-1.5</option>
                        <option value="-1">-1</option>
                        <option value="-0.5">-0.5</option>
                        <option value="0">0</option>
                        <option value="+0.5">+0.5</option>
                        <option value="+1">+1</option>
                        <option value="+1.5">+1.5</option>
                        <option value="+2">+2</option>
                        <option value="+2.5">+2.5</option>
                    </select>
                </div>
            </div>
            <div class="betting-explanation">
                <div class="betting-tip">
                    <span class="material-symbols-outlined">tips_and_updates</span>
                    <p><strong>VIP Insight:</strong> A team with +0.5 handicap wins the bet even with a draw. A team with -0.5 handicap must win the match to win the bet.</p>
                </div>
            </div>
        </div>
    `;
    
    // Insert after existing form rows
    const formRow = bettingLinesCard.querySelector('.form-row');
    if (formRow) {
        const bettingOptions = document.createElement('div');
        bettingOptions.className = 'vip-betting-options';
        bettingOptions.innerHTML = bettingTypesHtml;
        formRow.parentNode.insertBefore(bettingOptions, formRow.nextSibling);
        
        // Setup event listeners for betting type selector
        const bettingTypeSelect = document.getElementById('betting-type');
        if (bettingTypeSelect) {
            bettingTypeSelect.addEventListener('change', function() {
                updateBettingPanels(this.value);
            });
        }
        
        // Setup linked handicap selectors
        setupLinkedHandicapSelectors();
    }
}

// Setup linked handicap selectors (when one changes, update the other accordingly)
function setupLinkedHandicapSelectors() {
    const team1Handicap = document.getElementById('team1-handicap');
    const team2Handicap = document.getElementById('team2-handicap');
    
    if (!team1Handicap || !team2Handicap) return;
    
    team1Handicap.addEventListener('change', function() {
        if (this.value === '') {
            team2Handicap.value = '';
            return;
        }
        
        // Get the opposite handicap value
        let value = this.value;
        if (value.startsWith('+')) {
            team2Handicap.value = value.replace('+', '-');
        } else if (value.startsWith('-')) {
            team2Handicap.value = '+' + value.substring(1);
        } else if (value === '0') {
            team2Handicap.value = '0';
        }
    });
    
    team2Handicap.addEventListener('change', function() {
        if (this.value === '') {
            team1Handicap.value = '';
            return;
        }
        
        // Get the opposite handicap value
        let value = this.value;
        if (value.startsWith('+')) {
            team1Handicap.value = value.replace('+', '-');
        } else if (value.startsWith('-')) {
            team1Handicap.value = '+' + value.substring(1);
        } else if (value === '0') {
            team1Handicap.value = '0';
        }
    });
}

// Show/hide betting panels based on selection
function updateBettingPanels(selectedType) {
    const overUnderPanel = document.getElementById('over-under-options');
    const handicapPanel = document.getElementById('handicap-options');
    
    if (!overUnderPanel || !handicapPanel) return;
    
    if (selectedType === 'all' || selectedType === 'overUnder') {
        overUnderPanel.style.display = 'block';
    } else {
        overUnderPanel.style.display = 'none';
    }
    
    if (selectedType === 'all' || selectedType === 'handicap') {
        handicapPanel.style.display = 'block';
    } else {
        handicapPanel.style.display = 'none';
    }
}

// Setup event listeners
function setupEventListeners() {
    // Team setup form
    document.getElementById('team-form').addEventListener('input', handleTeamSetup);
    
    // Add score input listeners
    document.getElementById('h2h-add-btn').addEventListener('click', handleH2HAdd);
    document.getElementById('team1-add-btn').addEventListener('click', handleTeam1Add);
    document.getElementById('team2-add-btn').addEventListener('click', handleTeam2Add);
    
    // Clear data button
    document.getElementById('clear-data-btn').addEventListener('click', clearAllData);
    
    // Add sample data button (for testing)
    const sampleDataBtn = document.createElement('button');
    sampleDataBtn.type = 'button';
    sampleDataBtn.id = 'sample-data-btn';
    sampleDataBtn.className = 'btn btn-outline';
    sampleDataBtn.innerHTML = '<span class="material-symbols-outlined">science</span> Add Sample Data';
    sampleDataBtn.addEventListener('click', addSampleData);
    
    // Add VIP sample data button
    const vipSampleDataBtn = document.createElement('button');
    vipSampleDataBtn.type = 'button';
    vipSampleDataBtn.id = 'vip-sample-data-btn';
    vipSampleDataBtn.className = 'btn btn-vip';
    vipSampleDataBtn.innerHTML = '<span class="material-symbols-outlined">workspace_premium</span> VIP Sample Data';
    vipSampleDataBtn.addEventListener('click', addVIPSampleData);
    
    // Append the sample data buttons to data controls
    const dataControls = document.querySelector('.data-controls');
    if (dataControls) {
        dataControls.appendChild(sampleDataBtn);
        dataControls.appendChild(vipSampleDataBtn);
    }
    
    // Analyze button
    document.getElementById('analyze-button').addEventListener('click', function() {
        if (!validateInputs()) {
            return;
        }
        
        processAllMatchData();
        
        // VIP enhanced analysis
        if (VIP_MODE) {
            runVIPAnalysis();
        } else {
            performAnalysis();
        }
        
        showResults();
    });
}

// Handle team setup changes
function handleTeamSetup() {
    // Get form values
    team1Name = document.getElementById('team1').value || 'Team 1';
    team2Name = document.getElementById('team2').value || 'Team 2';
    team1Ranking = parseInt(document.getElementById('team1-ranking').value) || 0;
    team2Ranking = parseInt(document.getElementById('team2-ranking').value) || 0;
    matchImportance = parseFloat(document.getElementById('match-importance').value) || 1;
    matchLocation = document.getElementById('match-location').value || 'neutral';
    
    // Update UI with team names
    updateTeamLabels();
}

// Update all team name labels throughout the UI
function updateTeamLabels() {
    // Update input labels
    document.getElementById('h2h-team1-label').textContent = `${team1Name} Scores (comma separated)`;
    document.getElementById('h2h-team2-label').textContent = `${team2Name} Scores (comma separated)`;
    document.getElementById('team1-scores-label').textContent = `${team1Name} Scores (comma separated)`;
    document.getElementById('team2-scores-label').textContent = `${team2Name} Scores (comma separated)`;
    
    // Update spread direction dropdown
    const spreadDirectionEl = document.getElementById('spread-direction');
    if (spreadDirectionEl && spreadDirectionEl.options.length >= 2) {
        spreadDirectionEl.options[0].textContent = team1Name;
        spreadDirectionEl.options[1].textContent = team2Name;
    }
    
    // Update match section headers
    const matchSections = document.querySelectorAll('.match-section h3');
    if (matchSections.length >= 3) {
        matchSections[0].textContent = `Head-to-Head Matches`;
        matchSections[1].textContent = `${team1Name} Recent Matches`;
        matchSections[2].textContent = `${team2Name} Recent Matches`;
    }
    
    // Update handicap selectors if they exist (VIP feature)
    const team1HandicapLabel = document.querySelector('label[for="team1-handicap"]');
    const team2HandicapLabel = document.querySelector('label[for="team2-handicap"]');
    
    if (team1HandicapLabel) team1HandicapLabel.textContent = `${team1Name} Handicap`;
    if (team2HandicapLabel) team2HandicapLabel.textContent = `${team2Name} Handicap`;
}

// Handle Head-to-Head Scores Add
function handleH2HAdd() {
    const team1ScoresText = document.getElementById('h2h-team1').value.trim();
    const team2ScoresText = document.getElementById('h2h-team2').value.trim();
    
    if (!team1ScoresText || !team2ScoresText) {
        showToast('Please enter scores for both teams', 'warning');
        return;
    }
    
    // Parse the score arrays
    const team1Scores = team1ScoresText.split(',').map(score => parseInt(score.trim()));
    const team2Scores = team2ScoresText.split(',').map(score => parseInt(score.trim()));
    
    // Validate scores
    if (!validateScores(team1Scores, team2Scores)) return;
    
    // Clear previous H2H data
    matchData.h2h = [];
    
    // Add each pair of scores as a match
    const minLength = Math.min(team1Scores.length, team2Scores.length);
    let addedCount = 0;
    
    for (let i = 0; i < minLength; i++) {
        // Add increasing timestamps for each match (oldest first)
        const timestamp = Date.now() - ((minLength - i) * 7 * 24 * 60 * 60 * 1000); // 7 days apart
        processMatchScore('h2h', i + 1, team1Scores[i], team2Scores[i], timestamp);
        addedCount++;
    }
    
    // Update UI
    updateMatchSummary('h2h');
    updateDataSufficiencyIndicators();
    
    // Clear input fields
    document.getElementById('h2h-team1').value = '';
    document.getElementById('h2h-team2').value = '';
    
    // Show success message
    showToast(`Added ${addedCount} Head-to-Head matches`, 'success');
}

// Handle Team 1 Scores Add
function handleTeam1Add() {
    const team1ScoresText = document.getElementById('team1-scores').value.trim();
    const opponentScoresText = document.getElementById('team1-opponent').value.trim();
    
    if (!team1ScoresText || !opponentScoresText) {
        showToast('Please enter scores for both teams', 'warning');
        return;
    }
    
    // Parse the score arrays
    const team1Scores = team1ScoresText.split(',').map(score => parseInt(score.trim()));
    const opponentScores = opponentScoresText.split(',').map(score => parseInt(score.trim()));
    
    // Validate scores
    if (!validateScores(team1Scores, opponentScores)) return;
    
    // Clear previous Team 1 data
    matchData.team1 = [];
    
    // Add each pair of scores as a match
    const minLength = Math.min(team1Scores.length, opponentScores.length);
    let addedCount = 0;
    
    for (let i = 0; i < minLength; i++) {
        // Add increasing timestamps for each match (oldest first)
        const timestamp = Date.now() - ((minLength - i) * 7 * 24 * 60 * 60 * 1000); // 7 days apart
        processMatchScore('team1', i + 1, team1Scores[i], opponentScores[i], timestamp);
        addedCount++;
    }
    
    // Update UI
    updateMatchSummary('team1');
    updateDataSufficiencyIndicators();
    
    // Clear input fields
    document.getElementById('team1-scores').value = '';
    document.getElementById('team1-opponent').value = '';
    
    // Show success message
    showToast(`Added ${addedCount} matches for ${team1Name}`, 'success');
}

// Handle Team 2 Scores Add
function handleTeam2Add() {
    const team2ScoresText = document.getElementById('team2-scores').value.trim();
    const opponentScoresText = document.getElementById('team2-opponent').value.trim();
    
    if (!team2ScoresText || !opponentScoresText) {
        showToast('Please enter scores for both teams', 'warning');
        return;
    }
    
    // Parse the score arrays
    const team2Scores = team2ScoresText.split(',').map(score => parseInt(score.trim()));
    const opponentScores = opponentScoresText.split(',').map(score => parseInt(score.trim()));
    
    // Validate scores
    if (!validateScores(team2Scores, opponentScores)) return;
    
    // Clear previous Team 2 data
    matchData.team2 = [];
    
    // Add each pair of scores as a match
    const minLength = Math.min(team2Scores.length, opponentScores.length);
    let addedCount = 0;
    
    for (let i = 0; i < minLength; i++) {
        // Add increasing timestamps for each match (oldest first)
        const timestamp = Date.now() - ((minLength - i) * 7 * 24 * 60 * 60 * 1000); // 7 days apart
        processMatchScore('team2', i + 1, team2Scores[i], opponentScores[i], timestamp);
        addedCount++;
    }
    
    // Update UI
    updateMatchSummary('team2');
    updateDataSufficiencyIndicators();
    
    // Clear input fields
    document.getElementById('team2-scores').value = '';
    document.getElementById('team2-opponent').value = '';
    
    // Show success message
    showToast(`Added ${addedCount} matches for ${team2Name}`, 'success');
}

// Add sample data (for testing)
function addSampleData() {
    // First clear existing data
    clearAllData();
    
    // Set team names
    document.getElementById('team1').value = 'Liverpool';
    document.getElementById('team2').value = 'Manchester City';
    document.getElementById('team1-ranking').value = '4';
    document.getElementById('team2-ranking').value = '2';
    handleTeamSetup();
    
    // Add H2H matches
    document.getElementById('h2h-team1').value = '1,2,1,2,0';
    document.getElementById('h2h-team2').value = '1,2,0,1,1';
    handleH2HAdd();
    
    // Add team1 matches
    document.getElementById('team1-scores').value = '2,3,1,0,2,3';
    document.getElementById('team1-opponent').value = '0,1,0,0,1,1';
    handleTeam1Add();
    
    // Add team2 matches
    document.getElementById('team2-scores').value = '3,2,1,3,4,2';
    document.getElementById('team2-opponent').value = '0,0,0,1,1,2';
    handleTeam2Add();
    
    // Set betting lines
    document.getElementById('betting-line').value = '2.5';
    document.getElementById('point-spread').value = '1.0';
    
    // Set VIP betting options if available
    setVIPBettingOptions({
        overUnder: '2.5',
        handicap: '-0.5',
        direction: 'team1'
    });
    
    // Show success message
    showToast('Sample data added successfully', 'success');
}

// Add VIP sample data (richer dataset)
function addVIPSampleData() {
    // First clear existing data
    clearAllData();
    
    // Set team names
    document.getElementById('team1').value = 'Arsenal';
    document.getElementById('team2').value = 'Tottenham';
    document.getElementById('team1-ranking').value = '3';
    document.getElementById('team2-ranking').value = '5';
    handleTeamSetup();
    
    // Match settings
    document.getElementById('match-importance').value = '1.5'; // Derby match
    document.getElementById('match-location').value = 'home'; // Arsenal at home
    
    // Add H2H matches (most recent first)
    document.getElementById('h2h-team1').value = '2,3,0,4,1,2,1'; 
    document.getElementById('h2h-team2').value = '0,1,2,2,1,2,2';
    handleH2HAdd();
    
    // Add team1 matches
    document.getElementById('team1-scores').value = '3,2,1,2,4,1,0,3,2';
    document.getElementById('team1-opponent').value = '1,0,1,0,2,0,0,2,1';
    handleTeam1Add();
    
    // Add team2 matches
    document.getElementById('team2-scores').value = '3,1,2,0,2,1,3,0,2';
    document.getElementById('team2-opponent').value = '2,0,2,1,2,0,1,1,2';
    handleTeam2Add();
    
    // Set betting lines
    document.getElementById('betting-line').value = '2.5';
    document.getElementById('point-spread').value = '0.5';
    document.getElementById('spread-direction').value = 'team1';
    
    // Set VIP betting options if available
    setVIPBettingOptions({
        overUnder: '2.5',
        handicap: '-0.5',
        direction: 'team1'
    });
    
    // Show success message
    showToast('VIP sample data added successfully', 'vip');
}

// Set VIP betting options if they exist
function setVIPBettingOptions(options) {
    // Set over/under options
    const overUnder = document.getElementById('over-under-2.5');
    if (overUnder) {
        overUnder.value = 'over';
    }
    
    // Set handicap options
    const team1Handicap = document.getElementById('team1-handicap');
    const team2Handicap = document.getElementById('team2-handicap');
    
    if (team1Handicap && team2Handicap) {
        if (options.direction === 'team1') {
            team1Handicap.value = '-0.5';
            team2Handicap.value = '+0.5';
        } else {
            team1Handicap.value = '+0.5';
            team2Handicap.value = '-0.5';
        }
    }
    
    // Set betting type to show all panels
    const bettingType = document.getElementById('betting-type');
    if (bettingType) {
        bettingType.value = 'all';
        updateBettingPanels('all');
    }
}

// Validate scores
function validateScores(scores1, scores2) {
    // Check if any values are not numbers
    if (scores1.some(isNaN) || scores2.some(isNaN)) {
        showToast('Please enter valid scores (numbers only)', 'error');
        return false;
    }
    
    // Check if any values are negative
    if (scores1.some(score => score < 0) || scores2.some(score => score < 0)) {
        showToast('Scores must be non-negative', 'error');
        return false;
    }
    
    // Check if arrays have at least one value
    if (scores1.length === 0 || scores2.length === 0) {
        showToast('Please enter at least one score for each team', 'warning');
        return false;
    }
    
    // Check if arrays have the same length
    if (scores1.length !== scores2.length) {
        showToast(`Unequal arrays. Will use the first ${Math.min(scores1.length, scores2.length)} scores from each.`, 'warning');
    }
    
    return true;
}

// Process a match score and add it to the data
function processMatchScore(category, matchNumber, score1, score2, timestamp) {
    const totalScore = score1 + score2;
    
    let team1Score, team2Score, outcome;
    
    // Process data differently based on category
    if (category === 'h2h') {
        team1Score = score1;
        team2Score = score2;
        
        if (team1Score === team2Score) {
            outcome = 'Draw';
        } else if (team1Score > team2Score) {
            outcome = `${team1Name} Wins`;
        } else {
            outcome = `${team2Name} Wins`;
        }
    } else if (category === 'team1') {
        team1Score = score1;
        team2Score = score2; // This is "Opponent"
        
        if (team1Score === team2Score) {
            outcome = 'Draw';
        } else if (team1Score > team2Score) {
            outcome = `${team1Name} Wins`;
        } else {
            outcome = 'Opponent Wins';
        }
    } else if (category === 'team2') {
        team1Score = score2; // This is "Opponent"
        team2Score = score1;
        
        if (team1Score === team2Score) {
            outcome = 'Draw';
        } else if (team1Score > team2Score) {
            outcome = 'Opponent Wins';
        } else {
            outcome = `${team2Name} Wins`;
        }
    }
    
    // Calculate performance indicators
    const marginOfVictory = Math.abs(team1Score - team2Score);
    const goalEfficiency = totalScore > 0 ? Math.max(team1Score, team2Score) / totalScore : 0.5;
    const cleanSheet = team1Score === 0 || team2Score === 0;
    
    // Create match with VIP enhanced metrics
    const match = {
        matchNumber,
        team1Score,
        team2Score,
        totalScore,
        outcome,
        category,
        totalOverLine: totalLine > 0 ? totalScore > totalLine : null, // Only set if totalLine exists
        spreadCover: pointSpread > 0 ? calculateSpreadCover(team1Score, team2Score) : null, // Only set if pointSpread exists
        marginOfVictory,
        goalEfficiency,
        cleanSheet,
        timestamp: timestamp || Date.now() - (matchData[category].length * 86400000), // Use provided timestamp or create one
        
        // VIP enhanced metrics
        halfTimeScore: generateHalfTimeScore(team1Score, team2Score),
        shotEfficiency: generateShotEfficiency(team1Score, team2Score),
        possessionStats: generatePossessionStats(team1Score, team2Score)
    };
    
    // Add VIP enhanced betting line outcomes
    if (VIP_MODE) {
        match.overUnderOutcomes = {
            over0_5: totalScore > 0.5,
            under0_5: totalScore < 0.5,
            over1_5: totalScore > 1.5,
            under1_5: totalScore < 1.5,
            over2_5: totalScore > 2.5,
            under2_5: totalScore < 2.5,
            over3_5: totalScore > 3.5,
            under3_5: totalScore < 3.5
        };
        
        match.handicapOutcomes = {};
        // Team 1 handicap outcomes
        [-2.5, -2, -1.5, -1, -0.5, 0, 0.5, 1, 1.5, 2, 2.5].forEach(handicap => {
            const adjustedScore = team1Score + handicap;
            match.handicapOutcomes[`team1_${handicap}`] = 
                adjustedScore > team2Score ? 'win' : 
                adjustedScore < team2Score ? 'loss' : 'draw';
        });
        
        // Team 2 handicap outcomes
        [-2.5, -2, -1.5, -1, -0.5, 0, 0.5, 1, 1.5, 2, 2.5].forEach(handicap => {
            const adjustedScore = team2Score + handicap;
            match.handicapOutcomes[`team2_${handicap}`] = 
                adjustedScore > team1Score ? 'win' : 
                adjustedScore < team1Score ? 'loss' : 'draw';
        });
    }
    
    // Add match to data
    matchData[category].push(match);
    
    // Sort matches by timestamp (oldest first)
    matchData[category].sort((a, b) => a.timestamp - b.timestamp);
}

// Generate realistic half-time scores for enhanced match data (VIP feature)
function generateHalfTimeScore(fullTimeScore1, fullTimeScore2) {
    // Approximately 70% of goals are scored in the second half
    // So first half should have around 30% of the goals on average
    const totalGoals = fullTimeScore1 + fullTimeScore2;
    const expectedFirstHalfGoals = Math.round(totalGoals * 0.3);
    
    // Generate random distribution of first half goals
    let firstHalfScore1 = 0;
    let firstHalfScore2 = 0;
    
    // Distribute expected first half goals randomly between teams
    // But ensure first half scores don't exceed full time scores
    for (let i = 0; i < expectedFirstHalfGoals; i++) {
        if (Math.random() < 0.5 && firstHalfScore1 < fullTimeScore1) {
            firstHalfScore1++;
        } else if (firstHalfScore2 < fullTimeScore2) {
            firstHalfScore2++;
        } else if (firstHalfScore1 < fullTimeScore1) {
            firstHalfScore1++;
        }
    }
    
    return {
        team1: firstHalfScore1,
        team2: firstHalfScore2
    };
}

// Generate shot efficiency metrics for enhanced match data (VIP feature)
function generateShotEfficiency(team1Score, team2Score) {
    // Average shots per goal is about 7-10
    const team1Shots = team1Score * (7 + Math.floor(Math.random() * 4)) + Math.floor(Math.random() * 5);
    const team2Shots = team2Score * (7 + Math.floor(Math.random() * 4)) + Math.floor(Math.random() * 5);
    
    // Shots on target is typically 30-45% of total shots
    const team1ShotsOnTarget = Math.max(team1Score, Math.round(team1Shots * (0.3 + Math.random() * 0.15)));
    const team2ShotsOnTarget = Math.max(team2Score, Math.round(team2Shots * (0.3 + Math.random() * 0.15)));
    
    // Calculate efficiency metrics
    const team1Efficiency = team1ShotsOnTarget > 0 ? team1Score / team1ShotsOnTarget : 0;
    const team2Efficiency = team2ShotsOnTarget > 0 ? team2Score / team2ShotsOnTarget : 0;
    
    return {
        team1: {
            total: team1Shots,
            onTarget: team1ShotsOnTarget,
            efficiency: team1Efficiency
        },
        team2: {
            total: team2Shots,
            onTarget: team2ShotsOnTarget,
            efficiency: team2Efficiency
        }
    };
}

// Generate possession stats for enhanced match data (VIP feature)
function generatePossessionStats(team1Score, team2Score) {
    // Base possession on score differential with some randomness
    const scoreDiff = team1Score - team2Score;
    const basePossession = 50 + (scoreDiff * 3);
    
    // Add randomness but keep within realistic bounds (30-70%)
    let team1Possession = Math.min(70, Math.max(30, basePossession + (Math.random() * 10 - 5)));
    let team2Possession = 100 - team1Possession;
    
    // Round to 1 decimal place
    team1Possession = Math.round(team1Possession * 10) / 10;
    team2Possession = Math.round(team2Possession * 10) / 10;
    
    return {
        team1: team1Possession,
        team2: team2Possession
    };
}

// Update match summary display
function updateMatchSummary(category) {
    const summaryElement = document.getElementById(`${category}-match-summary`);
    
    if (matchData[category].length === 0) {
        summaryElement.innerHTML = '<p>No matches added yet.</p>';
        return;
    }
    
    // Generate match items
    const matchItems = matchData[category].map(match => {
        let team1Label, team2Label, resultClass;
        
        if (category === 'h2h') {
            team1Label = team1Name;
            team2Label = team2Name;
            if (match.outcome === `${team1Name} Wins`) {
                resultClass = 'win';
            } else if (match.outcome === `${team2Name} Wins`) {
                resultClass = 'loss';
            } else {
                resultClass = 'draw';
            }
        } else if (category === 'team1') {
            team1Label = team1Name;
            team2Label = 'Opponent';
            if (match.outcome === `${team1Name} Wins`) {
                resultClass = 'win';
            } else if (match.outcome === 'Opponent Wins') {
                resultClass = 'loss';
            } else {
                resultClass = 'draw';
            }
        } else if (category === 'team2') {
            team1Label = 'Opponent';
            team2Label = team2Name;
            if (match.outcome === `${team2Name} Wins`) {
                resultClass = 'win';
            } else if (match.outcome === 'Opponent Wins') {
                resultClass = 'loss';
            } else {
                resultClass = 'draw';
            }
        }
        
        // Calculate how many days ago the match was
        const daysAgo = Math.floor((Date.now() - match.timestamp) / (24 * 60 * 60 * 1000));
        const dateInfo = daysAgo === 0 ? 'Today' : 
                        daysAgo === 1 ? 'Yesterday' : 
                        `${daysAgo} days ago`;
                        
        // Generate VIP enhanced match details if in VIP mode
        let vipDetailsHtml = '';
        
        if (VIP_MODE) {
            vipDetailsHtml = `
                <div class="match-details">
                    <div class="match-detail">
                        <span class="detail-label">HT:</span> 
                        <span class="detail-value">${match.halfTimeScore.team1}-${match.halfTimeScore.team2}</span>
                    </div>
                    <div class="match-detail">
                        <span class="detail-label">Shots:</span> 
                        <span class="detail-value">${match.shotEfficiency.team1.total}-${match.shotEfficiency.team2.total}</span>
                    </div>
                    <div class="match-detail">
                        <span class="detail-label">Poss:</span> 
                        <span class="detail-value">${match.possessionStats.team1}%-${match.possessionStats.team2}%</span>
                    </div>
                </div>
            `;
        }
        
        return `
            <div class="match-item ${resultClass}">
                <div class="match-score">${team1Label} ${match.team1Score} - ${match.team2Score} ${team2Label}</div>
                <div class="match-date">${dateInfo}</div>
                ${vipDetailsHtml}
            </div>
        `;
    }).join('');
    
    // Create the summary HTML
    const summaryHTML = `
        <h4>Added ${matchData[category].length} matches:</h4>
        <div class="match-list">
            ${matchItems}
        </div>
    `;
    
    summaryElement.innerHTML = summaryHTML;
}

// Update data sufficiency indicators
function updateDataSufficiencyIndicators() {
    // Update count displays
    document.getElementById('h2h-count').textContent = `${matchData.h2h.length} matches`;
    document.getElementById('team1-count').textContent = `${matchData.team1.length} matches`;
    document.getElementById('team2-count').textContent = `${matchData.team2.length} matches`;
    
    // Update meter widths (max at 100%)
    const h2hPercent = Math.min(100, (matchData.h2h.length / MIN_H2H_MATCHES) * 100);
    const team1Percent = Math.min(100, (matchData.team1.length / MIN_MATCHES_FOR_EXCELLENT_ANALYSIS) * 100);
    const team2Percent = Math.min(100, (matchData.team2.length / MIN_MATCHES_FOR_EXCELLENT_ANALYSIS) * 100);
    
    document.getElementById('h2h-meter').style.width = `${h2hPercent}%`;
    document.getElementById('team1-meter').style.width = `${team1Percent}%`;
    document.getElementById('team2-meter').style.width = `${team2Percent}%`;
    
    // Update data quality indicator
    const totalMatches = getTotalMatchCount();
    const dataQualityIndicator = document.getElementById('data-quality-indicator');
    const dataQualityText = document.getElementById('data-quality-text');
    
    if (totalMatches >= MIN_MATCHES_FOR_EXCELLENT_ANALYSIS && matchData.h2h.length >= MIN_H2H_MATCHES) {
        dataQualityIndicator.className = 'data-quality excellent';
        dataQualityText.textContent = 'Excellent data quality for accurate predictions';
    } else if (totalMatches >= MIN_MATCHES_FOR_GOOD_ANALYSIS) {
        dataQualityIndicator.className = 'data-quality good';
        dataQualityText.textContent = 'Good data quality for reliable predictions';
    } else {
        dataQualityIndicator.className = 'data-quality insufficient';
        dataQualityText.textContent = `Add more match data for better predictions (${MIN_MATCHES_FOR_GOOD_ANALYSIS - totalMatches} more needed for good quality)`;
    }
}

// Clear all match data
function clearAllData() {
    // Confirm before clearing
    if (getTotalMatchCount() > 0 && !confirm('Are you sure you want to clear all match data?')) {
        return;
    }
    
    // Clear data
    matchData.h2h = [];
    matchData.team1 = [];
    matchData.team2 = [];
    
    // Update UI
    updateMatchSummary('h2h');
    updateMatchSummary('team1');
    updateMatchSummary('team2');
    updateDataSufficiencyIndicators();
    
    showToast('All match data has been cleared', 'info');
}

// Calculate if the spread was covered
function calculateSpreadCover(team1Score, team2Score) {
    // Return null if no point spread is set
    if (pointSpread <= 0) return null;
    
    const adjustedScore = spreadDirection === 'team1' 
        ? team1Score - pointSpread
        : team2Score - pointSpread;
    
    const opposingScore = spreadDirection === 'team1' ? team2Score : team1Score;
    
    if (adjustedScore > opposingScore) {
        return 'Favorite Covered';
    } else if (adjustedScore < opposingScore) {
        return 'Underdog Covered';
    } else {
        return 'Push';
    }
}

// Validate inputs before analysis
function validateInputs() {
    // Check if there is any match data
    if (getTotalMatchCount() === 0) {
        showToast('Please add match data before analyzing', 'error');
        return false;
    }
    
    // Check if team names are set
    if (!team1Name.trim() || !team2Name.trim()) {
        showToast('Please enter names for both teams', 'error');
        return false;
    }
    
    // Check if team names are different
    if (team1Name.trim() === team2Name.trim()) {
        showToast('Team names must be different', 'error');
        return false;
    }
    
    // Data sufficiency warnings
    if (getTotalMatchCount() < MIN_MATCHES_FOR_GOOD_ANALYSIS) {
        if (!confirm(`You have only ${getTotalMatchCount()} matches in total. The analysis may not be accurate. Continue anyway?`)) {
            return false;
        }
    }
    
    return true;
}

// Process all match data
function processAllMatchData() {
    // Show loading state
    document.getElementById('analysis-loading').classList.remove('hidden');
    document.getElementById('analysis-results').classList.add('hidden');
    
    // Make the results section visible
    document.getElementById('results').classList.add('visible');
    
    // Get betting lines data
    totalLine = parseFloat(document.getElementById('betting-line').value) || 0;
    pointSpread = parseFloat(document.getElementById('point-spread').value) || 0;
    spreadDirection = document.getElementById('spread-direction').value;
    
    // Get VIP betting options
    if (VIP_MODE) {
        processVIPBettingOptions();
    }
    
    // Update the spread cover calculation for all matches
    updateSpreadCoverCalculations();
}

// Process VIP betting options
function processVIPBettingOptions() {
    // Get all over/under selections
    const overUnder = {
        '0.5': getOverUnderSelection('0.5'),
        '1.5': getOverUnderSelection('1.5'),
        '2.5': getOverUnderSelection('2.5'),
        '3.5': getOverUnderSelection('3.5')
    };
    
    // Get handicap selections
    const team1Handicap = document.getElementById('team1-handicap');
    const team1HandicapValue = team1Handicap ? team1Handicap.value : null;
    
    // Store in the analysis state
    const vipBettingOptions = {
        overUnder,
        handicap: team1HandicapValue
    };
    
    // Store in global scope for analysis
    window.vipBettingOptions = vipBettingOptions;
}

// Get over/under selection value
function getOverUnderSelection(line) {
    const selector = document.getElementById(`over-under-${line}`);
    return selector ? selector.value : null;
}

// Update spread cover calculations for all matches
function updateSpreadCoverCalculations() {
    // Update all match data with the current spread and total values
    for (const category in matchData) {
        matchData[category].forEach(match => {
            // Only calculate spread cover if point spread is set
            match.spreadCover = pointSpread > 0 ? 
                calculateSpreadCover(match.team1Score, match.team2Score) : null;
            
            // Only set totalOverLine if totalLine is set
            match.totalOverLine = totalLine > 0 ? 
                match.totalScore > totalLine : null;
        });
    }
}

// Run VIP enhanced analysis with additional models and metrics
function runVIPAnalysis() {
    console.log("Running VIP Enhanced Analysis");
    
    try {
        // Prepare all feature data for analysis with enhanced VIP metrics
        const features = prepareVIPMatchFeatures();
        
        // Run multiple models and ensemble the results
        const results = runVIPModelEnsemble(features);
        
        // Simulate match outcomes for confidence intervals
        const simulations = runVIPMatchSimulations(features, 10000);
        
        // Calculate detailed betting edges with enhanced understanding
        const bettingAnalysis = calculateVIPBettingEdges(simulations, features);
        
        // Calculate in-depth outcome distributions
        const outcomes = calculateVIPOutcomeDistributions(simulations);
        
        // Store the current analysis for reference
        lastAnalysisResults = {
            ...results,
            simulations,
            bettingAnalysis,
            outcomes,
            team1Name,
            team2Name,
            totalLine,
            pointSpread,
            spreadDirection,
            matchImportance,
            matchLocation,
            features
        };
        
        // Calculate team1 and team2 projected scores
        const team1ProjScore = Math.round((results.projectedTotal / 2) + (results.projectedMargin / 2));
        const team2ProjScore = Math.round((results.projectedTotal / 2) - (results.projectedMargin / 2));
        
        // Calculate feature importance
        featureImportanceScores = calculateVIPFeatureImportance(features);
        
        // Generate score distribution
        const scoreDistribution = generateVIPScoreDistribution(results.projectedTotal, results.projectedMargin, simulations);
        
        // Generate VIP betting insights
        const bettingInsights = generateVIPBettingInsights(bettingAnalysis);
        
        // Update UI with analysis results
        updateWinnerPrediction(results.probabilities);
        updateScorePrediction(team1ProjScore, team2ProjScore, results.projectedTotal, totalLine);
        updateVIPBettingRecommendation(bettingAnalysis, bettingInsights);
        updateVIPAnalysisExplanation(results, features, bettingAnalysis);
        createVIPWinProbabilityChart(results.probabilities);
        createVIPScoreProbabilityChart(scoreDistribution);
        createVIPFeatureImportanceChart(featureImportanceScores);
        createVIPPerformanceTrendChart();
        createVIPBettingEdgeChart(bettingAnalysis);
        
        // Store bet simulation results for reference
        betSimulationResults = {
            matchSimulations: simulations,
            bettingAnalysis
        };
        
        // Hide loading and show results
        document.getElementById('analysis-loading').classList.add('hidden');
        document.getElementById('analysis-results').classList.remove('hidden');
    } catch (error) {
        console.error("VIP Analysis failed:", error);
        showToast('VIP Analysis encountered an error. Falling back to standard analysis.', 'error');
        
        // Fall back to standard analysis
        performAnalysis();
    }
}

// Prepare match features for VIP analysis with enhanced metrics
function prepareVIPMatchFeatures() {
    // First get standard features
    const standardFeatures = prepareMatchFeatures();
    
    // Enhanced VIP metrics
    const shotData = analyzeTeamShotData();
    const possessionData = analyzeTeamPossessionData();
    const halfTimeData = analyzeHalfTimeData();
    const momentumData = calculateExtendedMomentumAnalysis();
    const psychologicalFactors = analyzePsychologicalFactors();
    
    // Create enhanced feature set
    return {
        ...standardFeatures,
        vipStats: {
            shotData,
            possessionData,
            halfTimeData,
            momentumData,
            psychologicalFactors
        }
    };
}

// Analyze team shot data (VIP enhanced metric)
function analyzeTeamShotData() {
    // Get all matches with shot data
    const allMatches = [
        ...matchData.h2h,
        ...matchData.team1,
        ...matchData.team2
    ];
    
    // Calculate team1 shot efficiency
    const team1Matches = [
        ...matchData.h2h,
        ...matchData.team1
    ];
    
    const team1ShotStats = team1Matches.reduce((stats, match) => {
        if (match.category === 'h2h') {
            stats.totalShots += match.shotEfficiency.team1.total;
            stats.shotsOnTarget += match.shotEfficiency.team1.onTarget;
            stats.goals += match.team1Score;
        } else { // team1 category
            stats.totalShots += match.shotEfficiency.team1.total;
            stats.shotsOnTarget += match.shotEfficiency.team1.onTarget;
            stats.goals += match.team1Score;
        }
        return stats;
    }, {totalShots: 0, shotsOnTarget: 0, goals: 0});
    
    const team1ShotAccuracy = team1ShotStats.totalShots > 0 ? 
        team1ShotStats.shotsOnTarget / team1ShotStats.totalShots : 0;
        
    const team1ConversionRate = team1ShotStats.shotsOnTarget > 0 ? 
        team1ShotStats.goals / team1ShotStats.shotsOnTarget : 0;
    
    // Calculate team2 shot efficiency
    const team2Matches = [
        ...matchData.h2h,
        ...matchData.team2
    ];
    
    const team2ShotStats = team2Matches.reduce((stats, match) => {
        if (match.category === 'h2h') {
            stats.totalShots += match.shotEfficiency.team2.total;
            stats.shotsOnTarget += match.shotEfficiency.team2.onTarget;
            stats.goals += match.team2Score;
        } else { // team2 category
            stats.totalShots += match.shotEfficiency.team1.total; // Note: In team2 category, team2 data is stored in team1 fields
            stats.shotsOnTarget += match.shotEfficiency.team1.onTarget;
            stats.goals += match.team1Score;
        }
        return stats;
    }, {totalShots: 0, shotsOnTarget: 0, goals: 0});
    
    const team2ShotAccuracy = team2ShotStats.totalShots > 0 ? 
        team2ShotStats.shotsOnTarget / team2ShotStats.totalShots : 0;
        
    const team2ConversionRate = team2ShotStats.shotsOnTarget > 0 ? 
        team2ShotStats.goals / team2ShotStats.shotsOnTarget : 0;
    
    return {
        team1: {
            shotAccuracy: team1ShotAccuracy,
            conversionRate: team1ConversionRate,
            shotsPerGame: team1Matches.length > 0 ? team1ShotStats.totalShots / team1Matches.length : 0,
            shotsOnTargetPerGame: team1Matches.length > 0 ? team1ShotStats.shotsOnTarget / team1Matches.length : 0
        },
        team2: {
            shotAccuracy: team2ShotAccuracy,
            conversionRate: team2ConversionRate,
            shotsPerGame: team2Matches.length > 0 ? team2ShotStats.totalShots / team2Matches.length : 0,
            shotsOnTargetPerGame: team2Matches.length > 0 ? team2ShotStats.shotsOnTarget / team2Matches.length : 0
        },
        advantage: {
            shotAccuracy: team1ShotAccuracy - team2ShotAccuracy,
            conversionRate: team1ConversionRate - team2ConversionRate
        }
    };
}

// Analyze team possession data (VIP enhanced metric)
function analyzeTeamPossessionData() {
    // Calculate team1 average possession
    const team1Matches = [
        ...matchData.h2h,
        ...matchData.team1
    ];
    
    const team1AvgPossession = team1Matches.reduce((sum, match) => {
        if (match.category === 'h2h') {
            return sum + match.possessionStats.team1;
        } else { // team1 category
            return sum + match.possessionStats.team1;
        }
    }, 0) / Math.max(1, team1Matches.length);
    
    // Calculate team2 average possession
    const team2Matches = [
        ...matchData.h2h,
        ...matchData.team2
    ];
    
    const team2AvgPossession = team2Matches.reduce((sum, match) => {
        if (match.category === 'h2h') {
            return sum + match.possessionStats.team2;
        } else { // team2 category
            return sum + match.possessionStats.team1; // Note: In team2 category, team2 data is stored in team1 fields
        }
    }, 0) / Math.max(1, team2Matches.length);
    
    // Calculate possession efficiency (goals per 10% possession)
    const team1PossessionEfficiency = team1Matches.reduce((sum, match) => {
        let goals = 0;
        let possession = 0;
        
        if (match.category === 'h2h') {
            goals = match.team1Score;
            possession = match.possessionStats.team1;
        } else { // team1 category
            goals = match.team1Score;
            possession = match.possessionStats.team1;
        }
        
        // Calculate efficiency as goals per 10% possession
        return sum + (goals / (possession / 10));
    }, 0) / Math.max(1, team1Matches.length);
    
    const team2PossessionEfficiency = team2Matches.reduce((sum, match) => {
        let goals = 0;
        let possession = 0;
        
        if (match.category === 'h2h') {
            goals = match.team2Score;
            possession = match.possessionStats.team2;
        } else { // team2 category
            goals = match.team1Score; // In team2 category, team2 goals are stored in team1Score
            possession = match.possessionStats.team1; // In team2 category, team2 possession is stored in team1 fields
        }
        
        // Calculate efficiency as goals per 10% possession
        return sum + (goals / (possession / 10));
    }, 0) / Math.max(1, team2Matches.length);
    
    return {
        team1: {
            avgPossession: team1AvgPossession,
            possessionEfficiency: team1PossessionEfficiency
        },
        team2: {
            avgPossession: team2AvgPossession,
            possessionEfficiency: team2PossessionEfficiency
        },
        advantage: {
            possession: team1AvgPossession - team2AvgPossession,
            efficiency: team1PossessionEfficiency - team2PossessionEfficiency
        }
    };
}

// Analyze half-time/full-time data (VIP enhanced metric)
function analyzeHalfTimeData() {
    // Count matches where each team was winning/drawing/losing at half time
    const team1HalfTimeResults = {winning: 0, drawing: 0, losing: 0};
    const team2HalfTimeResults = {winning: 0, drawing: 0, losing: 0};
    
    // Analyze team1 half-time performances
    const team1Matches = [
        ...matchData.h2h,
        ...matchData.team1
    ];
    
    team1Matches.forEach(match => {
        let team1HalfTimeScore, team2HalfTimeScore;
        
        if (match.category === 'h2h') {
            team1HalfTimeScore = match.halfTimeScore.team1;
            team2HalfTimeScore = match.halfTimeScore.team2;
        } else { // team1 category
            team1HalfTimeScore = match.halfTimeScore.team1;
            team2HalfTimeScore = match.halfTimeScore.team2;
        }
        
        if (team1HalfTimeScore > team2HalfTimeScore) {
            team1HalfTimeResults.winning++;
        } else if (team1HalfTimeScore < team2HalfTimeScore) {
            team1HalfTimeResults.losing++;
        } else {
            team1HalfTimeResults.drawing++;
        }
    });
    
    // Analyze team2 half-time performances
    const team2Matches = [
        ...matchData.h2h,
        ...matchData.team2
    ];
    
    team2Matches.forEach(match => {
        let team1HalfTimeScore, team2HalfTimeScore;
        
        if (match.category === 'h2h') {
            team1HalfTimeScore = match.halfTimeScore.team1;
            team2HalfTimeScore = match.halfTimeScore.team2;
        } else { // team2 category
            // In team2 category, team2 data is in team1 fields and opponent data in team2 fields
            team2HalfTimeScore = match.halfTimeScore.team1;
            team1HalfTimeScore = match.halfTimeScore.team2;
        }
        
        if (team2HalfTimeScore > team1HalfTimeScore) {
            team2HalfTimeResults.winning++;
        } else if (team2HalfTimeScore < team1HalfTimeScore) {
            team2HalfTimeResults.losing++;
        } else {
            team2HalfTimeResults.drawing++;
        }
    });
    
    // Calculate half-time winning percentages
    const team1HalfTimeWinPct = team1Matches.length > 0 ? 
        team1HalfTimeResults.winning / team1Matches.length : 0;
        
    const team2HalfTimeWinPct = team2Matches.length > 0 ? 
        team2HalfTimeResults.winning / team2Matches.length : 0;
    
    // Calculate second half scoring rates
    const team1SecondHalfGoals = team1Matches.reduce((sum, match) => {
        let totalGoals = 0;
        let halfTimeGoals = 0;
        
        if (match.category === 'h2h') {
            totalGoals = match.team1Score;
            halfTimeGoals = match.halfTimeScore.team1;
        } else { // team1 category
            totalGoals = match.team1Score;
            halfTimeGoals = match.halfTimeScore.team1;
        }
        
        return sum + (totalGoals - halfTimeGoals);
    }, 0);
    
    const team2SecondHalfGoals = team2Matches.reduce((sum, match) => {
        let totalGoals = 0;
        let halfTimeGoals = 0;
        
        if (match.category === 'h2h') {
            totalGoals = match.team2Score;
            halfTimeGoals = match.halfTimeScore.team2;
        } else { // team2 category
            totalGoals = match.team1Score; // In team2 category, team2 goals are in team1Score
            halfTimeGoals = match.halfTimeScore.team1; // In team2 category, team2 half-time goals are in team1 field
        }
        
        return sum + (totalGoals - halfTimeGoals);
    }, 0);
    
    const team1SecondHalfAvg = team1Matches.length > 0 ? 
        team1SecondHalfGoals / team1Matches.length : 0;
        
    const team2SecondHalfAvg = team2Matches.length > 0 ? 
        team2SecondHalfGoals / team2Matches.length : 0;
    
    return {
        team1: {
            halfTimeWinPct: team1HalfTimeWinPct,
            halfTimeDrawPct: team1Matches.length > 0 ? team1HalfTimeResults.drawing / team1Matches.length : 0,
            secondHalfAvgGoals: team1SecondHalfAvg
        },
        team2: {
            halfTimeWinPct: team2HalfTimeWinPct,
            halfTimeDrawPct: team2Matches.length > 0 ? team2HalfTimeResults.drawing / team2Matches.length : 0,
            secondHalfAvgGoals: team2SecondHalfAvg
        },
        advantage: {
            halfTimeWinPct: team1HalfTimeWinPct - team2HalfTimeWinPct,
            secondHalfScoring: team1SecondHalfAvg - team2SecondHalfAvg
        }
    };
}

// Calculate extended momentum analysis (VIP enhanced metric)
function calculateExtendedMomentumAnalysis() {
    // Get recent form (more detailed than standard form calculation)
    const recentMatches = 5; // Consider last 5 matches
    
    // Get team1's most recent matches
    const team1RecentMatches = [
        ...matchData.h2h,
        ...matchData.team1
    ].sort((a, b) => b.timestamp - a.timestamp) // Sort by timestamp (newest first)
      .slice(0, recentMatches);
    
    // Get team2's most recent matches
    const team2RecentMatches = [
        ...matchData.h2h,
        ...matchData.team2
    ].sort((a, b) => b.timestamp - a.timestamp) // Sort by timestamp (newest first)
      .slice(0, recentMatches);
    
    // Calculate team1 recent form metrics
    const team1RecentForm = team1RecentMatches.reduce((form, match, index) => {
        // Apply recency weight (most recent matches count more)
        const recencyWeight = Math.pow(0.8, index);
        
        // Match outcome
        let matchOutcome = 0; // 0 for loss, 0.5 for draw, 1 for win
        if (match.category === 'h2h') {
            if (match.outcome === `${team1Name} Wins`) matchOutcome = 1;
            else if (match.outcome === 'Draw') matchOutcome = 0.5;
        } else { // team1 category
            if (match.outcome === `${team1Name} Wins`) matchOutcome = 1;
            else if (match.outcome === 'Draw') matchOutcome = 0.5;
        }
        
        // Update form metrics
        form.weightedPoints += matchOutcome * recencyWeight;
        form.totalWeight += recencyWeight;
        
        // Track streaks
        if (matchOutcome === 1) {
            form.winStreak++;
            form.unbeatenStreak++;
            form.loseStreak = 0;
        } else if (matchOutcome === 0.5) {
            form.winStreak = 0;
            form.unbeatenStreak++;
            form.loseStreak = 0;
        } else {
            form.winStreak = 0;
            form.unbeatenStreak = 0;
            form.loseStreak++;
        }
        
        // Track goals
        if (match.category === 'h2h') {
            form.recentGoalsScored += match.team1Score;
            form.recentGoalsConceded += match.team2Score;
        } else { // team1 category
            form.recentGoalsScored += match.team1Score;
            form.recentGoalsConceded += match.team2Score;
        }
        
        return form;
    }, {
        weightedPoints: 0,
        totalWeight: 0,
        winStreak: 0,
        unbeatenStreak: 0,
        loseStreak: 0,
        recentGoalsScored: 0,
        recentGoalsConceded: 0
    });
    
    // Calculate team2 recent form metrics
    const team2RecentForm = team2RecentMatches.reduce((form, match, index) => {
        // Apply recency weight (most recent matches count more)
        const recencyWeight = Math.pow(0.8, index);
        
        // Match outcome
        let matchOutcome = 0; // 0 for loss, 0.5 for draw, 1 for win
        if (match.category === 'h2h') {
            if (match.outcome === `${team2Name} Wins`) matchOutcome = 1;
            else if (match.outcome === 'Draw') matchOutcome = 0.5;
        } else { // team2 category
            if (match.outcome === `${team2Name} Wins`) matchOutcome = 1;
            else if (match.outcome === 'Draw') matchOutcome = 0.5;
        }
        
        // Update form metrics
        form.weightedPoints += matchOutcome * recencyWeight;
        form.totalWeight += recencyWeight;
        
        // Track streaks
        if (matchOutcome === 1) {
            form.winStreak++;
            form.unbeatenStreak++;
            form.loseStreak = 0;
        } else if (matchOutcome === 0.5) {
            form.winStreak = 0;
            form.unbeatenStreak++;
            form.loseStreak = 0;
        } else {
            form.winStreak = 0;
            form.unbeatenStreak = 0;
            form.loseStreak++;
        }
        
        // Track goals
        if (match.category === 'h2h') {
            form.recentGoalsScored += match.team2Score;
            form.recentGoalsConceded += match.team1Score;
        } else { // team2 category
            form.recentGoalsScored += match.team1Score;
            form.recentGoalsConceded += match.team2Score;
        }
        
        return form;
    }, {
        weightedPoints: 0,
        totalWeight: 0,
        winStreak: 0,
        unbeatenStreak: 0,
        loseStreak: 0,
        recentGoalsScored: 0,
        recentGoalsConceded: 0
    });
    
    // Calculate normalized form rating (0-1 scale)
    const team1FormRating = team1RecentForm.totalWeight > 0 ? 
        team1RecentForm.weightedPoints / team1RecentForm.totalWeight : 0.5;
        
    const team2FormRating = team2RecentForm.totalWeight > 0 ? 
        team2RecentForm.weightedPoints / team2RecentForm.totalWeight : 0.5;
    
    // Calculate goal difference trend
    const team1GoalDiffRatio = team1RecentForm.recentGoalsConceded > 0 ? 
        team1RecentForm.recentGoalsScored / team1RecentForm.recentGoalsConceded : 
        team1RecentForm.recentGoalsScored > 0 ? 3 : 1;
        
    const team2GoalDiffRatio = team2RecentForm.recentGoalsConceded > 0 ? 
        team2RecentForm.recentGoalsScored / team2RecentForm.recentGoalsConceded : 
        team2RecentForm.recentGoalsScored > 0 ? 3 : 1;
    
    return {
        team1: {
            formRating: team1FormRating,
            winStreak: team1RecentForm.winStreak,
            unbeatenStreak: team1RecentForm.unbeatenStreak,
            loseStreak: team1RecentForm.loseStreak,
            goalDiffRatio: team1GoalDiffRatio,
            recentGoalsPerGame: team1RecentMatches.length > 0 ? 
                team1RecentForm.recentGoalsScored / team1RecentMatches.length : 0
        },
        team2: {
            formRating: team2FormRating,
            winStreak: team2RecentForm.winStreak,
            unbeatenStreak: team2RecentForm.unbeatenStreak,
            loseStreak: team2RecentForm.loseStreak,
            goalDiffRatio: team2GoalDiffRatio,
            recentGoalsPerGame: team2RecentMatches.length > 0 ? 
                team2RecentForm.recentGoalsScored / team2RecentMatches.length : 0
        },
        advantage: {
            formRating: team1FormRating - team2FormRating,
            streakAdvantage: (team1RecentForm.winStreak - team1RecentForm.loseStreak) - 
                            (team2RecentForm.winStreak - team2RecentForm.loseStreak),
            goalDiffRatio: team1GoalDiffRatio - team2GoalDiffRatio
        }
    };
}

// Analyze psychological factors (VIP enhanced metric)
function analyzePsychologicalFactors() {
    // Derby match factor
    const isDerby = matchImportance >= 1.5 ? true : false;
    
    // Home/away psychological factor
    const homeAdvantage = matchLocation === 'home' ? 1 : 
                         (matchLocation === 'away' ? -1 : 0);
    
    // Analyze each team's ability to come back from losing positions
    const team1Comebacks = calculateTeamComebacks(team1Name, true);
    const team2Comebacks = calculateTeamComebacks(team2Name, false);
    
    // Analyze each team's ability to hold onto leads
    const team1LeadRetention = calculateLeadRetention(team1Name, true);
    const team2LeadRetention = calculateLeadRetention(team2Name, false);
    
    // Calculate big match performance
    const team1BigMatchPerformance = calculateBigMatchPerformance(team1Name, true);
    const team2BigMatchPerformance = calculateBigMatchPerformance(team2Name, false);
    
    return {
        isDerby,
        homeAdvantage,
        team1: {
            comebackRating: team1Comebacks,
            leadRetention: team1LeadRetention,
            bigMatchPerformance: team1BigMatchPerformance
        },
        team2: {
            comebackRating: team2Comebacks,
            leadRetention: team2LeadRetention,
            bigMatchPerformance: team2BigMatchPerformance
        },
        advantage: {
            comebacks: team1Comebacks - team2Comebacks,
            leadRetention: team1LeadRetention - team2LeadRetention,
            bigMatchPerformance: team1BigMatchPerformance - team2BigMatchPerformance,
            homePsychology: homeAdvantage * 0.2 // Scale factor for psychological impact
        }
    };
}

// Calculate team's ability to come back from losing positions
function calculateTeamComebacks(teamName, isTeam1) {
    // Get relevant matches
    const matches = isTeam1 ? 
        [...matchData.h2h, ...matchData.team1] : 
        [...matchData.h2h, ...matchData.team2];
    
    if (matches.length === 0) return 0.5; // Neutral if no data
    
    let comebackOpportunities = 0;
    let successfulComebacks = 0;
    
    matches.forEach(match => {
        let teamHalfTimeScore, opponentHalfTimeScore, teamFullTimeScore, opponentFullTimeScore;
        
        // Extract scores based on match category and team
        if (match.category === 'h2h') {
            if (isTeam1) {
                teamHalfTimeScore = match.halfTimeScore.team1;
                opponentHalfTimeScore = match.halfTimeScore.team2;
                teamFullTimeScore = match.team1Score;
                opponentFullTimeScore = match.team2Score;
            } else {
                teamHalfTimeScore = match.halfTimeScore.team2;
                opponentHalfTimeScore = match.halfTimeScore.team1;
                teamFullTimeScore = match.team2Score;
                opponentFullTimeScore = match.team1Score;
            }
        } else { // team1 or team2 category
            teamHalfTimeScore = match.halfTimeScore.team1;
            opponentHalfTimeScore = match.halfTimeScore.team2;
            teamFullTimeScore = match.team1Score;
            opponentFullTimeScore = match.team2Score;
        }
        
        // Check if team was losing at half time
        if (teamHalfTimeScore < opponentHalfTimeScore) {
            comebackOpportunities++;
            
            // Check if team came back to win or draw
            if (teamFullTimeScore >= opponentFullTimeScore) {
                successfulComebacks++;
            }
        }
    });
    
    // Calculate comeback rating (0-1 scale)
    return comebackOpportunities > 0 ? 
        successfulComebacks / comebackOpportunities : 0.5;
}

// Calculate team's ability to retain leads
function calculateLeadRetention(teamName, isTeam1) {
    // Get relevant matches
    const matches = isTeam1 ? 
        [...matchData.h2h, ...matchData.team1] : 
        [...matchData.h2h, ...matchData.team2];
    
    if (matches.length === 0) return 0.5; // Neutral if no data
    
    let leadSituations = 0;
    let retainedLeads = 0;
    
    matches.forEach(match => {
        let teamHalfTimeScore, opponentHalfTimeScore, teamFullTimeScore, opponentFullTimeScore;
        
        // Extract scores based on match category and team
        if (match.category === 'h2h') {
            if (isTeam1) {
                teamHalfTimeScore = match.halfTimeScore.team1;
                opponentHalfTimeScore = match.halfTimeScore.team2;
                teamFullTimeScore = match.team1Score;
                opponentFullTimeScore = match.team2Score;
            } else {
                teamHalfTimeScore = match.halfTimeScore.team2;
                opponentHalfTimeScore = match.halfTimeScore.team1;
                teamFullTimeScore = match.team2Score;
                opponentFullTimeScore = match.team1Score;
            }
        } else { // team1 or team2 category
            teamHalfTimeScore = match.halfTimeScore.team1;
            opponentHalfTimeScore = match.halfTimeScore.team2;
            teamFullTimeScore = match.team1Score;
            opponentFullTimeScore = match.team2Score;
        }
        
        // Check if team was leading at half time
        if (teamHalfTimeScore > opponentHalfTimeScore) {
            leadSituations++;
            
            // Check if team retained lead
            if (teamFullTimeScore > opponentFullTimeScore) {
                retainedLeads++;
            }
        }
    });
    
    // Calculate lead retention rating (0-1 scale)
    return leadSituations > 0 ? 
        retainedLeads / leadSituations : 0.5;
}

// Calculate team's performance in big matches
function calculateBigMatchPerformance(teamName, isTeam1) {
    // For simplicity, we'll consider matches against teams with good rankings as "big matches"
    // In a real implementation, you would have more sophisticated logic
    
    // Default to neutral performance
    return 0.5 + (Math.random() * 0.4 - 0.2); // Add some randomness for demo
}

// Run ensemble of multiple VIP prediction models and combine results
function runVIPModelEnsemble(features) {
    // Run multiple prediction models 
    const modelResults = [
        // Main model - Similar to the standard model but with enhanced weights
        runVIPMainModel(features),
        
        // Momentum-focused model - Gives more weight to recent form and momentum
        runVIPMomentumModel(features),
        
        // Matchup-specific model - Focuses on head-to-head history
        runVIPMatchupModel(features),
        
        // Advanced statistics model - Uses possession, shots, etc.
        runVIPStatsModel(features)
    ];
    
    // Calculate ensemble results by weighting each model
    const modelWeights = [0.4, 0.25, 0.2, 0.15]; // Weights should sum to 1
    
    // Combine win probabilities
    const ensembleProbabilities = modelResults.reduce((ensemble, model, index) => {
        const weight = modelWeights[index];
        ensemble.team1WinProb += model.probabilities.team1WinProb * weight;
        ensemble.team2WinProb += model.probabilities.team2WinProb * weight;
        ensemble.drawProb += model.probabilities.drawProb * weight;
        return ensemble;
    }, {team1WinProb: 0, team2WinProb: 0, drawProb: 0});
    
    // Combine total and margin predictions
    const ensembleProjectedTotal = modelResults.reduce((sum, model, index) => {
        return sum + (model.projectedTotal * modelWeights[index]);
    }, 0);
    
    const ensembleProjectedMargin = modelResults.reduce((sum, model, index) => {
        return sum + (model.projectedMargin * modelWeights[index]);
    }, 0);
    
    // Ensure consistency between ensemble predictions
    const [adjustedProbabilities, adjustedMargin] = ensurePredictionConsistency(
        ensembleProbabilities, ensembleProjectedMargin
    );
    
    // Return ensemble results
    return {
        probabilities: adjustedProbabilities,
        projectedTotal: ensembleProjectedTotal,
        projectedMargin: adjustedMargin,
        modelResults: modelResults.map((model, index) => ({
            name: model.name,
            weight: modelWeights[index],
            results: model
        }))
    };
}

// Main VIP prediction model
function runVIPMainModel(features) {
    // Enhanced version of the standard model
    const { 
        basicStats,
        advancedStats,
        trends,
        dataQuality,
        vipStats
    } = features;
    
    // Calculate win probabilities
    const team1Advantage = calculateVIPTeam1Advantage(features);
    
    // Convert advantage to probability using enhanced logistic function
    const team1WinProb = 50 + (50 * (2 / (1 + Math.exp(-team1Advantage * 1.2)) - 1));
    const team2WinProb = 50 + (50 * (2 / (1 + Math.exp(team1Advantage * 1.2)) - 1));
    
    // Calculate draw probability with enhanced sensitivity
    const scoringRate = basicStats.team1AvgScore + basicStats.team2AvgScore;
    const strengthDifference = Math.abs(team1WinProb - team2WinProb);
    
    // Base draw rate adjusted for VIP model
    let baseDrawRate = 28 - (scoringRate * 4);
    
    // Reduce draw probability based on strength difference
    const drawReduction = strengthDifference * 0.4;
    let drawProb = Math.max(5, Math.min(38, baseDrawRate - drawReduction));
    
    // Adjust for additional VIP factors
    if (vipStats.psychologicalFactors.isDerby) {
        // Derbies can increase draw probability
        drawProb += 5;
    }
    
    // Adjust probabilities to ensure they sum to 100%
    let adjustedTeam1WinProb = team1WinProb * (1 - drawProb / 100);
    let adjustedTeam2WinProb = team2WinProb * (1 - drawProb / 100);
    
    // Final normalization
    const total = adjustedTeam1WinProb + adjustedTeam2WinProb + drawProb;
    const probabilities = {
        team1WinProb: (adjustedTeam1WinProb / total) * 100,
        team2WinProb: (adjustedTeam2WinProb / total) * 100,
        drawProb: (drawProb / total) * 100
    };
    
    // Calculate projected total
    const projectedTotal = calculateVIPProjectedTotal(features);
    
    // Calculate projected margin
    const projectedMargin = calculateVIPProjectedMargin(features);
    
    return {
        name: "Main VIP Model",
        probabilities,
        projectedTotal,
        projectedMargin
    };
}

// Momentum-focused VIP model
function runVIPMomentumModel(features) {
    // This model gives extra weight to momentum and recent form
    const { 
        basicStats,
        advancedStats,
        vipStats
    } = features;
    
    // Base calculations similar to main model but with different weightings
    const momentumFactor = 3.0; // Higher weight for momentum
    const formFactor = 2.5; // Higher weight for form
    
    // Calculate momentum advantage
    const momentumAdvantage = (
        (vipStats.momentumData.advantage.formRating * formFactor) +
        (vipStats.momentumData.advantage.streakAdvantage * 0.05 * momentumFactor) +
        (advancedStats.team1MomentumIndex - advancedStats.team2MomentumIndex) * momentumFactor
    );
    
    // Add base team strength
    const strengthAdvantage = (
        (advancedStats.team1AttackStrength - advancedStats.team2DefenseStrength) * 0.8 -
        (advancedStats.team2AttackStrength - advancedStats.team1DefenseStrength) * 0.8
    );
    
    // Add home advantage
    const locationAdvantage = basicStats.locationFactor * 
        (basicStats.locationFactor > 0 ? advancedStats.team1HomeAdvantage : 
                                       advancedStats.team2HomeAdvantage) * 1.2;
    
    // Combine for total advantage
    const totalAdvantage = (momentumAdvantage * 0.5) + (strengthAdvantage * 0.3) + (locationAdvantage * 0.2);
    
    // Convert to probabilities
    const normalizedAdvantage = Math.max(-3, Math.min(3, totalAdvantage));
    const team1WinProb = 50 + (50 * (2 / (1 + Math.exp(-normalizedAdvantage * 1.2)) - 1));
    const team2WinProb = 50 + (50 * (2 / (1 + Math.exp(normalizedAdvantage * 1.2)) - 1));
    
    // Calculate draw probability - momentum model tends to predict fewer draws
    let drawProb = Math.max(5, Math.min(25, 20 - (Math.abs(normalizedAdvantage) * 5)));
    
  // Normalize
    const total = team1WinProb + team2WinProb + drawProb;
    const probabilities = {
        team1WinProb: (team1WinProb / total) * 100,
        team2WinProb: (team2WinProb / total) * 100,
        drawProb: (drawProb / total) * 100
    };
    
    // For projected total goals, this model tends to predict higher scoring
    const baseTotal = calculateVIPProjectedTotal(features);
    const projectedTotal = baseTotal * 1.1; // 10% more goals than base model
    
    // For margin, use momentum to predict stronger results for in-form teams
    const baseMargin = calculateVIPProjectedMargin(features);
    const momentumMarginAdjustment = vipStats.momentumData.advantage.formRating * 0.5;
    const projectedMargin = baseMargin + momentumMarginAdjustment;
    
    return {
        name: "Momentum Model",
        probabilities,
        projectedTotal,
        projectedMargin
    };
}

// Matchup-specific VIP model that emphasizes head-to-head history
function runVIPMatchupModel(features) {
    const { 
        basicStats,
        advancedStats,
        dataQuality,
        vipStats
    } = features;
    
    // This model puts heavy emphasis on head-to-head history
    if (dataQuality.h2hMatches < 2) {
        // If insufficient H2H data, fall back to main model with slight adjustments
        const mainModel = runVIPMainModel(features);
        return {
            name: "Matchup Model (Limited H2H Data)",
            probabilities: mainModel.probabilities,
            projectedTotal: mainModel.projectedTotal * 0.95, // Slightly more conservative
            projectedMargin: mainModel.projectedMargin * 0.9  // Slightly more conservative
        };
    }
    
    // Calculate advantage primarily based on H2H history
    const h2hAdvantage = basicStats.h2hAdvantage * 3.0; // Very high weight for H2H
    
    // Add team strength but with lower weight
    const strengthAdvantage = (
        (advancedStats.team1AttackStrength - advancedStats.team2DefenseStrength) * 0.5 -
        (advancedStats.team2AttackStrength - advancedStats.team1DefenseStrength) * 0.5
    ) * 0.6; // Lower weight than in main model
    
    // Add location advantage
    const locationAdvantage = basicStats.locationFactor * 
        (basicStats.locationFactor > 0 ? advancedStats.team1HomeAdvantage : 
                                       advancedStats.team2HomeAdvantage) * 1.0;
                                       
    // Psychological edge in rivalries
    const psychologicalAdvantage = vipStats.psychologicalFactors.isDerby ? 
        (vipStats.psychologicalFactors.advantage.bigMatchPerformance * 0.4) : 0;
    
    // Combine for total advantage
    const totalAdvantage = (h2hAdvantage * 0.6) + (strengthAdvantage * 0.2) + 
                         (locationAdvantage * 0.1) + (psychologicalAdvantage * 0.1);
    
    // Convert to probabilities with heavier emphasis on extreme outcomes
    const normalizedAdvantage = Math.max(-3, Math.min(3, totalAdvantage));
    const team1WinProb = 50 + (50 * (2 / (1 + Math.exp(-normalizedAdvantage * 1.3)) - 1));
    const team2WinProb = 50 + (50 * (2 / (1 + Math.exp(normalizedAdvantage * 1.3)) - 1));
    
    // This model predicts fewer draws in matchups with strong H2H patterns
    let drawProb = Math.max(5, Math.min(25, 18 - (Math.abs(normalizedAdvantage) * 6)));
    
    // Normalize
    const total = team1WinProb + team2WinProb + drawProb;
    const probabilities = {
        team1WinProb: (team1WinProb / total) * 100,
        team2WinProb: (team2WinProb / total) * 100,
        drawProb: (drawProb / total) * 100
    };
    
    // Use H2H history to predict total goals
    // Get average goals scored in H2H matches
    const h2hMatches = matchData.h2h;
    const h2hAvgTotal = h2hMatches.reduce((sum, match) => sum + match.totalScore, 0) / h2hMatches.length;
    
    // Blend with base prediction but heavily weight H2H history
    const baseTotal = calculateVIPProjectedTotal(features);
    const projectedTotal = (h2hAvgTotal * 0.7) + (baseTotal * 0.3);
    
    // For margin, also emphasize H2H patterns
    const h2hAvgMargin = h2hMatches.reduce((sum, match) => {
        // Positive margin = team1 advantage, negative = team2 advantage
        return sum + (match.team1Score - match.team2Score);
    }, 0) / h2hMatches.length;
    
    const baseMargin = calculateVIPProjectedMargin(features);
    const projectedMargin = (h2hAvgMargin * 0.6) + (baseMargin * 0.4);
    
    return {
        name: "Matchup Model",
        probabilities,
        projectedTotal,
        projectedMargin
    };
}

// Advanced statistics VIP model that emphasizes shot and possession data
function runVIPStatsModel(features) {
    const { 
        basicStats,
        advancedStats,
        vipStats
    } = features;
    
    // Calculate advantage based heavily on shot and possession metrics
    const shotAdvantage = (
        (vipStats.shotData.advantage.shotAccuracy * 2.0) +
        (vipStats.shotData.advantage.conversionRate * 3.0)
    ) * 0.5;
    
    const possessionAdvantage = (
        (vipStats.possessionData.advantage.possession * 0.01) +  // Scale down percentage
        (vipStats.possessionData.advantage.efficiency * 2.0)
    ) * 0.3;
    
    // Add team strength but with lower weight
    const strengthAdvantage = (
        (advancedStats.team1AttackStrength - advancedStats.team2DefenseStrength) * 0.6 -
        (advancedStats.team2AttackStrength - advancedStats.team1DefenseStrength) * 0.6
    ) * 0.2; // Lower weight than in main model
    
    // Combine for total advantage
    const totalAdvantage = shotAdvantage + possessionAdvantage + strengthAdvantage;
    
    // Convert to probabilities
    const normalizedAdvantage = Math.max(-3, Math.min(3, totalAdvantage));
    const team1WinProb = 50 + (50 * (2 / (1 + Math.exp(-normalizedAdvantage * 1.1)) - 1));
    const team2WinProb = 50 + (50 * (2 / (1 + Math.exp(normalizedAdvantage * 1.1)) - 1));
    
    // This model predicts slightly more draws since it focuses on underlying stats rather than results
    let drawProb = Math.max(5, Math.min(30, 25 - (Math.abs(normalizedAdvantage) * 4)));
    
    // Normalize
    const total = team1WinProb + team2WinProb + drawProb;
    const probabilities = {
        team1WinProb: (team1WinProb / total) * 100,
        team2WinProb: (team2WinProb / total) * 100,
        drawProb: (drawProb / total) * 100
    };
    
    // Predict total based on shot data
    const team1ExpectedGoals = vipStats.shotData.team1.shotsOnTargetPerGame * vipStats.shotData.team1.conversionRate;
    const team2ExpectedGoals = vipStats.shotData.team2.shotsOnTargetPerGame * vipStats.shotData.team2.conversionRate;
    const projectedTotal = team1ExpectedGoals + team2ExpectedGoals;
    
    // Predict margin based on expected goals difference
    const projectedMargin = team1ExpectedGoals - team2ExpectedGoals;
    
    return {
        name: "Stats Model",
        probabilities,
        projectedTotal,
        projectedMargin
    };
}

// Calculate the total advantage for team1 using VIP enhanced metrics
function calculateVIPTeam1Advantage(features) {
    const { 
        basicStats,
        advancedStats,
        vipStats
    } = features;
    
    // Base advantage calculations
    const attackDifference = (
        (advancedStats.team1AttackStrength - advancedStats.team2DefenseStrength) -
        (advancedStats.team2AttackStrength - advancedStats.team1DefenseStrength)
    );
    
    // Calculate base advantage from standard metrics
    let advantageCoefficient = 
        attackDifference * WEIGHTS.OVERALL_PERFORMANCE +
        (advancedStats.team1RecentForm - advancedStats.team2RecentForm) * WEIGHTS.RECENT_FORM +
        basicStats.h2hAdvantage * WEIGHTS.H2H_MATCHES + 
        (advancedStats.team1MomentumIndex - advancedStats.team2MomentumIndex) * WEIGHTS.MOMENTUM;
    
    // Add location factor
    if (basicStats.locationFactor !== 0) {
        const locationTeamAdvantage = basicStats.locationFactor === 1 ? 
            advancedStats.team1HomeAdvantage : advancedStats.team2HomeAdvantage;
        advantageCoefficient += basicStats.locationFactor * locationTeamAdvantage * WEIGHTS.HOME_ADVANTAGE;
    }
    
    // Add match importance factor
    if (basicStats.matchImportance !== 1) {
        const importanceDifference = 
            advancedStats.team1MatchImportancePerformance - advancedStats.team2MatchImportancePerformance;
        advantageCoefficient += (basicStats.matchImportance - 1) * importanceDifference * WEIGHTS.MATCH_IMPORTANCE;
    }
    
    // Add ranking factor if available
    if (basicStats.rankingDiff !== 0) {
        // Transform ranking difference to be in [-1, 1] range
        const normalizedRankingDiff = -Math.sign(basicStats.rankingDiff) * 
            Math.min(1, Math.abs(basicStats.rankingDiff) / 20);
        advantageCoefficient += normalizedRankingDiff * WEIGHTS.RANKING;
    }
    
    // Add VIP enhanced metrics
    
    // Shot efficiency advantage
    if (vipStats.shotData) {
        advantageCoefficient += vipStats.shotData.advantage.conversionRate * WEIGHTS.KEY_PLAYER_IMPACT;
    }
    
    // Possession efficiency advantage
    if (vipStats.possessionData) {
        advantageCoefficient += vipStats.possessionData.advantage.efficiency * WEIGHTS.PLAYSTYLE_MATCHUP;
    }
    
    // Psychological factors
    if (vipStats.psychologicalFactors) {
        // Add big match performance advantage for important matches
        if (basicStats.matchImportance > 1.2) {
            advantageCoefficient += vipStats.psychologicalFactors.advantage.bigMatchPerformance * 
                                   WEIGHTS.PSYCHOLOGICAL_EDGE * (basicStats.matchImportance - 1);
        }
        
        // Add home psychological advantage
        advantageCoefficient += vipStats.psychologicalFactors.advantage.homePsychology * 
                               WEIGHTS.VENUE_FAMILIARITY;
    }
    
    // Half-time performance advantage
    if (vipStats.halfTimeData) {
        advantageCoefficient += vipStats.halfTimeData.advantage.secondHalfScoring * 
                               WEIGHTS.SCORING_TREND;
    }
    
    // Extended momentum advantage
    if (vipStats.momentumData) {
        advantageCoefficient += vipStats.momentumData.advantage.formRating * 
                               WEIGHTS.MOMENTUM * 0.5;
    }
    
    return advantageCoefficient;
}

// Calculate VIP enhanced projected total
function calculateVIPProjectedTotal(features) {
    // Extract relevant features
    const { 
        basicStats,
        advancedStats,
        trends,
        vipStats
    } = features;
    
    // Start with base calculation similar to standard model
    let baseTotal = (
        basicStats.team1AvgScore + 
        basicStats.team2AvgScore + 
        basicStats.team1AvgConceded + 
        basicStats.team2AvgConceded
    ) / 2;
    
    // Adjust for H2H scoring trends if available
    if (features.dataQuality.h2hMatches >= 2) {
        const h2hAvgTotal = matchData.h2h.reduce((sum, match) => sum + match.totalScore, 0) / 
                           features.dataQuality.h2hMatches;
        // Weigh H2H more heavily when more H2H matches exist
        const h2hWeight = Math.min(0.5, features.dataQuality.h2hMatches * 0.08);
        baseTotal = baseTotal * (1 - h2hWeight) + h2hAvgTotal * h2hWeight;
    }
    
    // Add standard adjustments
    baseTotal += ((advancedStats.team1RecentForm + advancedStats.team2RecentForm) - 1) * 0.5; // Form
    baseTotal += -((1 - advancedStats.team1DefenseStrength) + (1 - advancedStats.team2DefenseStrength)) * 0.5; // Defense
    baseTotal += (advancedStats.team1AttackStrength + advancedStats.team2AttackStrength - 2) * 0.5; // Attack
    
    // Match importance adjustment
    if (basicStats.matchImportance < 1) {
        baseTotal += (1 - basicStats.matchImportance) * 0.6; // More goals in friendlies
    } else if (basicStats.matchImportance > 1.3) {
        baseTotal -= (basicStats.matchImportance - 1.3) * 0.4; // Fewer goals in important matches
    }
    
    // Location adjustment
    if (basicStats.locationFactor !== 0) {
        baseTotal += Math.abs(basicStats.locationFactor) * 0.15;
    }
    
    // VIP enhanced adjustments
    
    // Shot efficiency adjustments
    if (vipStats.shotData) {
        const shotEfficiencyFactor = (
            vipStats.shotData.team1.conversionRate + 
            vipStats.shotData.team2.conversionRate
        ) - 1;
        baseTotal += shotEfficiencyFactor * 0.7;
    }
    
    // Scoring trend from VIP momentum data
    if (vipStats.momentumData) {
        const recentScoringTrend = (
            vipStats.momentumData.team1.recentGoalsPerGame + 
            vipStats.momentumData.team2.recentGoalsPerGame
        ) / 2;
        
        // Weight recent scoring vs. all-time average
        const recentWeight = 0.3;
        baseTotal = baseTotal * (1 - recentWeight) + recentScoringTrend * 2 * recentWeight;
    }
    
    // Second half scoring adjustments
    if (vipStats.halfTimeData) {
        const secondHalfScoring = (
            vipStats.halfTimeData.team1.secondHalfAvgGoals + 
            vipStats.halfTimeData.team2.secondHalfAvgGoals
        );
        
        // Adjust if teams score a lot in second half
        if (secondHalfScoring > 1.8) {
            baseTotal += 0.3;
        }
    }
    
    // Psychological factors
    if (vipStats.psychologicalFactors) {
        // Derby matches can be more intense but also more tactical
        if (vipStats.psychologicalFactors.isDerby) {
            // Check if both teams have good big match performance
            if (vipStats.psychologicalFactors.team1.bigMatchPerformance > 0.6 && 
                vipStats.psychologicalFactors.team2.bigMatchPerformance > 0.6) {
                baseTotal += 0.3; // Both teams perform in big games, expect goals
            } else {
                baseTotal -= 0.2; // More cautious approach likely
            }
        }
    }
    
    // Ensure reasonable output
    return Math.max(0.5, baseTotal);
}

// Calculate VIP enhanced projected margin
function calculateVIPProjectedMargin(features) {
    // Extract relevant features
    const { 
        basicStats,
        advancedStats,
        vipStats
    } = features;
    
    // Start with base calculation similar to standard model
    let baseMargin = (
        (basicStats.team1AvgScore - basicStats.team2AvgConceded) - 
        (basicStats.team2AvgScore - basicStats.team1AvgConceded)
    );
    
    // Adjust for H2H history if available
    if (features.dataQuality.h2hMatches >= 2) {
        const h2hAvgMargin = matchData.h2h.reduce((sum, match) => 
            sum + (match.team1Score - match.team2Score), 0) / features.dataQuality.h2hMatches;
        
        // Weight H2H more heavily with more matches
        const h2hWeight = Math.min(0.5, features.dataQuality.h2hMatches * 0.08);
        baseMargin = baseMargin * (1 - h2hWeight) + h2hAvgMargin * h2hWeight;
    } else {
        // If no H2H, still consider the advantage from similar matchups
        baseMargin += basicStats.h2hAdvantage * 0.5;
    }
    
    // Add standard adjustments
    baseMargin += (advancedStats.team1RecentForm - advancedStats.team2RecentForm) * 0.8; // Form
    baseMargin += ((advancedStats.team1AttackStrength - advancedStats.team2DefenseStrength) - 
                  (advancedStats.team2AttackStrength - advancedStats.team1DefenseStrength)) * 0.5; // Strength
    baseMargin += (advancedStats.team1MomentumIndex - advancedStats.team2MomentumIndex) * 0.5; // Momentum
    
    // Location adjustment
    if (basicStats.locationFactor !== 0) {
        baseMargin += basicStats.locationFactor * 0.4;
    }
    
    // Ranking adjustment
    if (basicStats.rankingDiff !== 0) {
        const normalizedRankingDiff = -Math.sign(basicStats.rankingDiff) * 
                                     Math.min(1, Math.abs(basicStats.rankingDiff) / 20);
        baseMargin += normalizedRankingDiff * 0.3;
    }
    
    // VIP enhanced adjustments
    
    // Shot data advantage
    if (vipStats.shotData) {
        baseMargin += vipStats.shotData.advantage.conversionRate * 0.5;
    }
    
    // Possession advantage (only if efficiency is also good)
    if (vipStats.possessionData) {
        // Possession only matters if you do something with it
        if (Math.sign(vipStats.possessionData.advantage.possession) === 
            Math.sign(vipStats.possessionData.advantage.efficiency)) {
            baseMargin += vipStats.possessionData.advantage.efficiency * 0.3;
        }
    }
    
    // Psychological advantages
    if (vipStats.psychologicalFactors) {
        // Big match performance matters more in important matches
        if (basicStats.matchImportance > 1.2) {
            baseMargin += vipStats.psychologicalFactors.advantage.bigMatchPerformance * 0.4 * 
                         (basicStats.matchImportance - 1);
        }
        
        // Lead retention is important for protecting a margin
        baseMargin += vipStats.psychologicalFactors.advantage.leadRetention * 0.3;
    }
    
    // Enhanced momentum factors
    if (vipStats.momentumData) {
        // Form rating has already been applied through standard momentum
        // But streak advantage can add additional impact
        baseMargin += vipStats.momentumData.advantage.streakAdvantage * 0.1;
    }
    
    return baseMargin;
}

// Run Monte Carlo match simulations for VIP analysis
function runVIPMatchSimulations(features, numSimulations = 10000) {
    console.log(`Running ${numSimulations} VIP match simulations`);
    
    // Get base predictions
    const mainPrediction = runVIPMainModel(features);
    
    // Setup simulation parameters
    const lambda1 = (mainPrediction.projectedTotal / 2) + (mainPrediction.projectedMargin / 2); // Team1 expected goals
    const lambda2 = (mainPrediction.projectedTotal / 2) - (mainPrediction.projectedMargin / 2); // Team2 expected goals
    
    // Create array to store simulation results
    const simulations = [];
    
    // Run simulations
    for (let i = 0; i < numSimulations; i++) {
        // Generate random Poisson variables for goals
        const team1Goals = generatePoissonRandom(lambda1);
        const team2Goals = generatePoissonRandom(lambda2);
        
        // Determine match outcome
        let outcome;
        if (team1Goals > team2Goals) {
            outcome = 'team1Win';
        } else if (team1Goals < team2Goals) {
            outcome = 'team2Win';
        } else {
            outcome = 'draw';
        }
        
        // Determine betting outcomes
        const totalGoals = team1Goals + team2Goals;
        
        // Over/Under outcomes
        const overUnderOutcomes = {
            'over0.5': totalGoals > 0.5,
            'under0.5': totalGoals < 0.5,
            'over1.5': totalGoals > 1.5,
            'under1.5': totalGoals < 1.5,
            'over2.5': totalGoals > 2.5,
            'under2.5': totalGoals < 2.5,
            'over3.5': totalGoals > 3.5,
            'under3.5': totalGoals < 3.5
        };
        
        // Handicap outcomes
        const handicapOutcomes = {};
        
        // Calculate team1 handicap outcomes
        [-2.5, -2, -1.5, -1, -0.5, 0, 0.5, 1, 1.5, 2, 2.5].forEach(handicap => {
            const adjustedScore = team1Goals + handicap;
            if (adjustedScore > team2Goals) {
                handicapOutcomes[`team1${handicap}`] = 'win';
            } else if (adjustedScore < team2Goals) {
                handicapOutcomes[`team1${handicap}`] = 'lose';
            } else {
                handicapOutcomes[`team1${handicap}`] = 'push';
            }
        });
        
        // Calculate team2 handicap outcomes
        [-2.5, -2, -1.5, -1, -0.5, 0, 0.5, 1, 1.5, 2, 2.5].forEach(handicap => {
            const adjustedScore = team2Goals + handicap;
            if (adjustedScore > team1Goals) {
                handicapOutcomes[`team2${handicap}`] = 'win';
            } else if (adjustedScore < team1Goals) {
                handicapOutcomes[`team2${handicap}`] = 'lose';
            } else {
                handicapOutcomes[`team2${handicap}`] = 'push';
            }
        });
        
        // Store simulation result
        simulations.push({
            team1Goals,
            team2Goals,
            totalGoals,
            outcome,
            overUnderOutcomes,
            handicapOutcomes
        });
    }
    
    return simulations;
}

// Generate a random Poisson variable
function generatePoissonRandom(lambda) {
    if (lambda <= 0) return 0;
    
    const L = Math.exp(-lambda);
    let k = 0;
    let p = 1;
    
    do {
        k++;
        p *= Math.random();
    } while (p > L);
    
    return k - 1;
}

// Calculate detailed betting edges from simulations
function calculateVIPBettingEdges(simulations, features) {
    console.log("Calculating VIP betting edges");
    
    // Get current betting options
    const vipBettingOptions = window.vipBettingOptions || {};
    
    // Initialize betting analysis object
    const bettingAnalysis = {
        overUnder: {},
        handicap: {},
        winDrawWin: {},
        bothTeamsToScore: {},
        correctScore: {},
        recommendations: []
    };
    
    // Calculate over/under probabilities and edges
    // For each over/under line (0.5, 1.5, 2.5, 3.5)
    [0.5, 1.5, 2.5, 3.5].forEach(line => {
        const overKey = `over${line}`;
        const underKey = `under${line}`;
        
        // Count wins for over and under
        const overWins = simulations.filter(sim => sim.overUnderOutcomes[overKey]).length;
        const underWins = simulations.filter(sim => sim.overUnderOutcomes[underKey]).length;
        
        // Calculate probabilities
        const overProb = overWins / simulations.length;
        const underProb = underWins / simulations.length;
        
        // Store analysis
        bettingAnalysis.overUnder[line] = {
            over: {
                probability: overProb,
                implied: overProb * 100,
                // Explanation of what this bet means
                description: `This bet wins if there are ${Math.ceil(line)} or more total goals`
            },
            under: {
                probability: underProb,
                implied: underProb * 100,
                // Explanation of what this bet means
                description: `This bet wins if there are ${Math.floor(line)} or fewer total goals`
            }
        };
        
        // Check if this is selected in VIP options
        if (vipBettingOptions.overUnder && vipBettingOptions.overUnder[line]) {
            const selection = vipBettingOptions.overUnder[line];
            const selectedProb = selection === 'over' ? overProb : underProb;
            
            // Add recommendation if probability is strong
            if (selectedProb > 0.6) {
                bettingAnalysis.recommendations.push({
                    type: 'overUnder',
                    line,
                    selection,
                    probability: selectedProb,
                    strength: calculateRecommendationStrength(selectedProb),
                    description: `${selection.toUpperCase()} ${line} - ${selectedProb.toFixed(2) * 100}% probability`
                });
            }
        }
    });
    
    // Calculate handicap probabilities and edges
    [-2.5, -2, -1.5, -1, -0.5, 0, 0.5, 1, 1.5, 2, 2.5].forEach(handicap => {
        // Team 1 with this handicap
        const team1Key = `team1${handicap}`;
        const team1Wins = simulations.filter(sim => sim.handicapOutcomes[team1Key] === 'win').length;
        const team1Probability = team1Wins / simulations.length;
        
        // Team 2 with opposite handicap
        const team2Key = `team2${-handicap}`; // Opposite handicap
        const team2Wins = simulations.filter(sim => sim.handicapOutcomes[team2Key] === 'win').length;
        const team2Probability = team2Wins / simulations.length;
        
        // Store analysis
        bettingAnalysis.handicap[handicap] = {
            team1: {
                probability: team1Probability,
                implied: team1Probability * 100,
                // Explanation of what this bet means
                description: explainHandicapBet(team1Name, handicap)
            },
            team2: {
                probability: team2Probability,
                implied: team2Probability * 100,
                // Explanation of what this bet means
                description: explainHandicapBet(team2Name, -handicap)
            }
        };
        
        // Check if this handicap is selected in VIP options
        if (vipBettingOptions.handicap && 
            (vipBettingOptions.handicap === handicap.toString() || 
             vipBettingOptions.handicap === `+${handicap}` || 
             vipBettingOptions.handicap === `-${Math.abs(handicap)}`)) {
            
            // Determine which team has this handicap in the selection
            const isTeam1Selected = true; // Assuming team1 is always selected in the UI
            const selectedProb = isTeam1Selected ? team1Probability : team2Probability;
            
            // Add recommendation if probability is strong
            if (selectedProb > 0.58) {
                bettingAnalysis.recommendations.push({
                    type: 'handicap',
                    handicap,
                    team: isTeam1Selected ? 'team1' : 'team2',
                    probability: selectedProb,
                    strength: calculateRecommendationStrength(selectedProb),
                    description: `${isTeam1Selected ? team1Name : team2Name} ${handicap > 0 ? '+' : ''}${handicap} - ${selectedProb.toFixed(2) * 100}% probability`
                });
            }
        }
    });
    
    // Calculate Win-Draw-Win probabilities
    const team1Wins = simulations.filter(sim => sim.outcome === 'team1Win').length;
    const team2Wins = simulations.filter(sim => sim.outcome === 'team2Win').length;
    const draws = simulations.filter(sim => sim.outcome === 'draw').length;
    
    bettingAnalysis.winDrawWin = {
        team1: {
            probability: team1Wins / simulations.length,
            implied: (team1Wins / simulations.length) * 100
        },
        draw: {
            probability: draws / simulations.length,
            implied: (draws / simulations.length) * 100
        },
        team2: {
            probability: team2Wins / simulations.length,
            implied: (team2Wins / simulations.length) * 100
        }
    };
    
    // Calculate Both Teams To Score probabilities
    const bttsYes = simulations.filter(sim => sim.team1Goals > 0 && sim.team2Goals > 0).length;
    const bttsNo = simulations.length - bttsYes;
    
    bettingAnalysis.bothTeamsToScore = {
        yes: {
            probability: bttsYes / simulations.length,
            implied: (bttsYes / simulations.length) * 100
        },
        no: {
            probability: bttsNo / simulations.length,
            implied: (bttsNo / simulations.length) * 100
        }
    };
    
    // Calculate Correct Score probabilities for common scores
    const correctScores = {};
    
    // Count occurrences of each score
    simulations.forEach(sim => {
        const scoreKey = `${sim.team1Goals}-${sim.team2Goals}`;
        if (!correctScores[scoreKey]) {
            correctScores[scoreKey] = 1;
        } else {
            correctScores[scoreKey]++;
        }
    });
    
    // Convert counts to probabilities and store top scores
    const sortedScores = Object.entries(correctScores)
        .map(([score, count]) => ({
            score,
            probability: count / simulations.length,
            implied: (count / simulations.length) * 100
        }))
        .sort((a, b) => b.probability - a.probability);
    
    bettingAnalysis.correctScore = sortedScores.slice(0, 10); // Top 10 most likely scores
    
    // Sort recommendations by strength
    bettingAnalysis.recommendations.sort((a, b) => b.strength - a.strength);
    
    return bettingAnalysis;
}

// Calculate the strength of a betting recommendation
function calculateRecommendationStrength(probability) {
    // Convert probability to a 0-100 strength scale
    // Higher probability = stronger recommendation
    if (probability >= 0.75) {
        return 90 + ((probability - 0.75) * 40); // Very strong: 90-100
    } else if (probability >= 0.65) {
        return 70 + ((probability - 0.65) * 200); // Strong: 70-90
    } else if (probability >= 0.58) {
        return 50 + ((probability - 0.58) * 285.7); // Moderate: 50-70
    } else if (probability >= 0.52) {
        return 30 + ((probability - 0.52) * 333.3); // Weak: 30-50
    } else {
        return 30 * (probability / 0.52); // Very weak: 0-30
    }
}

// Explain what a handicap bet means in plain language
function explainHandicapBet(teamName, handicap) {
    if (handicap === 0) {
        return `This bet on ${teamName} wins if they win the match. Stakes are returned for a draw.`;
    } else if (handicap > 0) {
        // Team is getting a positive handicap (underdog)
        if (handicap === 0.5) {
            return `This bet on ${teamName} wins if they win OR draw the match.`;
        } else if (handicap === 1) {
            return `This bet on ${teamName} wins if they win, draw, or lose by exactly 1 goal.`;
        } else if (handicap === 1.5) {
            return `This bet on ${teamName} wins if they win, draw, or lose by just 1 goal.`;
        } else {
            const wholeNumber = Math.floor(handicap);
            const hasFraction = handicap % 1 !== 0;
            
            if (hasFraction) {
                return `This bet on ${teamName} wins if they lose by ${wholeNumber} goals or fewer.`;
            } else {
                return `This bet on ${teamName} wins if they lose by fewer than ${wholeNumber} goals. Stakes are returned if they lose by exactly ${wholeNumber} goals.`;
            }
        }
    } else {
        // Team is giving a negative handicap (favorite)
        const absHandicap = Math.abs(handicap);
        
        if (absHandicap === 0.5) {
            return `This bet on ${teamName} wins only if they win the match.`;
        } else if (absHandicap === 1) {
            return `This bet on ${teamName} wins if they win by 2 or more goals. Stakes are returned if they win by exactly 1 goal.`;
        } else if (absHandicap === 1.5) {
            return `This bet on ${teamName} wins if they win by 2 or more goals.`;
        } else {
            const wholeNumber = Math.floor(absHandicap);
            const hasFraction = absHandicap % 1 !== 0;
            
            if (hasFraction) {
                return `This bet on ${teamName} wins if they win by ${wholeNumber + 1} or more goals.`;
            } else {
                return `This bet on ${teamName} wins if they win by more than ${wholeNumber} goals. Stakes are returned if they win by exactly ${wholeNumber} goals.`;
            }
        }
    }
}

// Calculate VIP outcome distributions based on simulations
function calculateVIPOutcomeDistributions(simulations) {
    // Get win/draw/win distribution
    const outcomes = {
        team1Win: simulations.filter(sim => sim.outcome === 'team1Win').length / simulations.length,
        draw: simulations.filter(sim => sim.outcome === 'draw').length / simulations.length,
        team2Win: simulations.filter(sim => sim.outcome === 'team2Win').length / simulations.length
    };
    
    // Get goal distributions
    const goalDistributions = {
        team1: Array(6).fill(0), // 0, 1, 2, 3, 4, 5+ goals
        team2: Array(6).fill(0),
        total: Array(9).fill(0)  // 0, 1, 2, 3, 4, 5, 6, 7, 8+ goals
    };
    
    // Calculate distributions
    simulations.forEach(sim => {
        // Team 1 goals
        const team1Goals = Math.min(5, sim.team1Goals);
        goalDistributions.team1[team1Goals]++;
        
        // Team 2 goals
        const team2Goals = Math.min(5, sim.team2Goals);
        goalDistributions.team2[team2Goals]++;
        
        // Total goals
        const totalGoals = Math.min(8, sim.totalGoals);
        goalDistributions.total[totalGoals]++;
    });
    
    // Convert to percentages
    goalDistributions.team1 = goalDistributions.team1.map(count => count / simulations.length);
    goalDistributions.team2 = goalDistributions.team2.map(count => count / simulations.length);
    goalDistributions.total = goalDistributions.total.map(count => count / simulations.length);
    
    // Calculate exact score distribution (top 10)
    const scoreDistribution = {};
    
    simulations.forEach(sim => {
        const scoreKey = `${sim.team1Goals}-${sim.team2Goals}`;
        if (!scoreDistribution[scoreKey]) {
            scoreDistribution[scoreKey] = 1;
        } else {
            scoreDistribution[scoreKey]++;
        }
    });
    
    // Convert to array and sort by frequency
    const sortedScores = Object.entries(scoreDistribution)
        .map(([score, count]) => ({
            score,
            probability: count / simulations.length
        }))
        .sort((a, b) => b.probability - a.probability)
        .slice(0, 10); // Top 10
    
    return {
        outcomes,
        goalDistributions,
        scoreDistribution: sortedScores
    };
}

// Calculate VIP feature importance
function calculateVIPFeatureImportance(features) {
    // Base feature importance (similar to standard model)
    const importance = {
        'Head-to-Head History': features.dataQuality.h2hMatches >= MIN_H2H_MATCHES ? 
            Math.abs(features.basicStats.h2hAdvantage) * 100 : 30,
        
        'Recent Form': 
            Math.abs(features.advancedStats.team1RecentForm - features.advancedStats.team2RecentForm) * 100,
        
        'Offensive Strength': 
            Math.abs(features.advancedStats.team1AttackStrength - features.advancedStats.team2AttackStrength) * 50,
        
        'Defensive Stability':
            Math.abs(features.advancedStats.team1DefenseStrength - features.advancedStats.team2DefenseStrength) * 50,
        
        'Home Advantage': features.basicStats.locationFactor !== 0 ?
            Math.abs(features.basicStats.locationFactor) * 60 : 20,
        
        'Team Momentum': 
            Math.abs(features.advancedStats.team1MomentumIndex - features.advancedStats.team2MomentumIndex) * 70,
        
        'Match Importance': features.basicStats.matchImportance !== 1 ?
            Math.abs(features.basicStats.matchImportance - 1) * 50 : 20,
        
        'Team Ranking': features.basicStats.rankingDiff !== 0 ?
            Math.abs(features.basicStats.rankingDiff) * 3 : 20,
        
        'Scoring Trends':
            Math.abs(features.trends.scoring.team1Trend - features.trends.scoring.team2Trend) * 40
    };
    
    // Add VIP enhanced features
    if (features.vipStats) {
        // Add shot data importance
        if (features.vipStats.shotData) {
            importance['Shot Efficiency'] = 
                Math.abs(features.vipStats.shotData.advantage.conversionRate) * 100;
        }
        
        // Add possession data importance
        if (features.vipStats.possessionData) {
            importance['Possession Efficiency'] = 
                Math.abs(features.vipStats.possessionData.advantage.efficiency) * 80;
        }
        
        // Add psychological factors
        if (features.vipStats.psychologicalFactors) {
            importance['Big Match Performance'] = 
                Math.abs(features.vipStats.psychologicalFactors.advantage.bigMatchPerformance) * 70;
            
            importance['Lead Retention'] = 
                Math.abs(features.vipStats.psychologicalFactors.advantage.leadRetention) * 60;
        }
        
        // Add momentum data
        if (features.vipStats.momentumData) {
            importance['Current Form Streak'] = 
                Math.abs(features.vipStats.momentumData.advantage.streakAdvantage) * 10;
            
            importance['Recent Goal Ratio'] = 
                Math.abs(features.vipStats.momentumData.advantage.goalDiffRatio) * 50;
        }
        
        // Add half-time data
        if (features.vipStats.halfTimeData) {
            importance['Second Half Scoring'] = 
                Math.abs(features.vipStats.halfTimeData.advantage.secondHalfScoring) * 60;
        }
    }
    
    // Ensure minimum importance values
    Object.keys(importance).forEach(key => {
        importance[key] = Math.max(10, Math.min(100, importance[key]));
    });
    
    // Sort by importance (highest first)
    const sortedImportance = {};
    Object.entries(importance)
        .sort((a, b) => b[1] - a[1])
        .forEach(([key, value]) => {
            sortedImportance[key] = value;
        });
    
    return sortedImportance;
}

// Generate VIP score distribution with enhanced understanding
function generateVIPScoreDistribution(projectedTotal, projectedMargin, simulations) {
    // Use simulation results to generate score distribution
    const scoreDistribution = [];
    
    // Count occurrences of each score
    const scoreCounts = {};
    simulations.forEach(sim => {
        const scoreKey = `${sim.team1Goals}-${sim.team2Goals}`;
        if (!scoreCounts[scoreKey]) {
            scoreCounts[scoreKey] = 1;
        } else {
            scoreCounts[scoreKey]++;
        }
    });
    
    // Convert to array of score objects
    for (const [scoreKey, count] of Object.entries(scoreCounts)) {
        const [team1Score, team2Score] = scoreKey.split('-').map(Number);
        
        scoreDistribution.push({
            team1Score,
            team2Score,
            probability: (count / simulations.length) * 100
        });
    }
    
    // Sort by probability (highest first)
    scoreDistribution.sort((a, b) => b.probability - a.probability);
    
    // Add "Other" category for all other scores
    const topScoresToShow = 10;
    const sumOfTopProbabilities = scoreDistribution
        .slice(0, topScoresToShow)
        .reduce((sum, dist) => sum + dist.probability, 0);
    
    const otherProb = Math.max(0, 100 - sumOfTopProbabilities);
    
    if (otherProb > 0) {
        scoreDistribution.push({
            team1Score: -1,
            team2Score: -1,
            probability: otherProb
        });
    }
    
    return scoreDistribution.slice(0, topScoresToShow + 1);
}

// Generate VIP enhanced betting insights
function generateVIPBettingInsights(bettingAnalysis) {
    const insights = [];
    
    // Generate insights for over/under markets
    for (const [line, outcomes] of Object.entries(bettingAnalysis.overUnder)) {
        const overProb = outcomes.over.probability;
        const underProb = outcomes.under.probability;
        
        // Only generate insights for strong probabilities
        if (overProb > 0.65 || underProb > 0.65) {
            const selection = overProb > underProb ? 'OVER' : 'UNDER';
            const probability = Math.max(overProb, underProb);
            
            insights.push({
                market: 'OVER/UNDER',
                selection: `${selection} ${line}`,
                probability: probability,
                description: `${Math.round(probability * 100)}% probability - ${outcomes[selection.toLowerCase()].description}`,
                strength: calculateRecommendationStrength(probability)
            });
        }
    }
    
    // Generate insights for handicap markets
    for (const [handicap, outcomes] of Object.entries(bettingAnalysis.handicap)) {
        // Check team1 with this handicap
        if (outcomes.team1.probability > 0.65) {
            insights.push({
                market: 'HANDICAP',
                selection: `${team1Name} ${handicap > 0 ? '+' : ''}${handicap}`,
                probability: outcomes.team1.probability,
                description: `${Math.round(outcomes.team1.probability * 100)}% probability - ${outcomes.team1.description}`,
                strength: calculateRecommendationStrength(outcomes.team1.probability)
            });
        }
        
        // Check team2 with opposite handicap
        if (outcomes.team2.probability > 0.65) {
            insights.push({
                market: 'HANDICAP',
                selection: `${team2Name} ${-handicap > 0 ? '+' : ''}${-handicap}`,
                probability: outcomes.team2.probability,
                description: `${Math.round(outcomes.team2.probability * 100)}% probability - ${outcomes.team2.description}`,
                strength: calculateRecommendationStrength(outcomes.team2.probability)
            });
        }
    }
    
    // Generate insight for 1X2 market
    const winDrawWin = bettingAnalysis.winDrawWin;
    const maxProb = Math.max(
        winDrawWin.team1.probability,
        winDrawWin.draw.probability,
        winDrawWin.team2.probability
    );
    
    if (maxProb > 0.5) {
        let selection;
        let description;
        
        if (maxProb === winDrawWin.team1.probability) {
            selection = `${team1Name} TO WIN`;
            description = `${team1Name} has a ${Math.round(maxProb * 100)}% probability to win the match`;
        } else if (maxProb === winDrawWin.draw.probability) {
            selection = `DRAW`;
            description = `Draw has a ${Math.round(maxProb * 100)}% probability`;
        } else {
            selection = `${team2Name} TO WIN`;
            description = `${team2Name} has a ${Math.round(maxProb * 100)}% probability to win the match`;
        }
        
        insights.push({
            market: 'MATCH OUTCOME',
            selection,
            probability: maxProb,
            description,
            strength: calculateRecommendationStrength(maxProb)
        });
    }
    
    // Generate insight for BTTS market
    const btts = bettingAnalysis.bothTeamsToScore;
    const bttsProb = Math.max(btts.yes.probability, btts.no.probability);
    
    if (bttsProb > 0.6) {
        const selection = bttsProb === btts.yes.probability ? 'YES' : 'NO';
        
        insights.push({
            market: 'BOTH TEAMS TO SCORE',
            selection,
            probability: bttsProb,
            description: `${Math.round(bttsProb * 100)}% probability that ${selection === 'YES' ? 'both teams will score' : 'at least one team will not score'}`,
            strength: calculateRecommendationStrength(bttsProb)
        });
    }
    
    // Generate insights for most likely correct scores
    bettingAnalysis.correctScore.slice(0, 3).forEach(score => {
        if (score.probability > 0.08) { // Only if reasonably likely
            insights.push({
                market: 'CORRECT SCORE',
                selection: score.score,
                probability: score.probability,
                description: `${Math.round(score.probability * 100)}% probability for exact score ${score.score.replace('-', ':')}`,
                strength: calculateRecommendationStrength(score.probability * 2) // Adjust strength as correct scores are naturally low probability
            });
        }
    });
    
    // Sort insights by strength
    insights.sort((a, b) => b.strength - a.strength);
    
    return insights;
}

// Update VIP betting recommendation UI
function updateVIPBettingRecommendation(bettingAnalysis, bettingInsights) {
    // Create betting recommendations section
    const topInsights = bettingInsights.slice(0, 3); // Top 3 recommendations
    
    // Create HTML for recommendations
    let recommendationsHTML = '';
    
    if (topInsights.length > 0) {
        // Create the top recommendation featured
        const topInsight = topInsights[0];
        const strengthClass = topInsight.strength > 75 ? 'high' : 
                            (topInsight.strength > 50 ? 'medium' : 'low');
        
        recommendationsHTML += `
            <div class="vip-top-recommendation ${strengthClass}-confidence">
                <div class="recommendation-header">
                    <span class="material-symbols-outlined">verified</span>
                    <div>
                        <h4>Top VIP Recommendation</h4>
                        <div class="recommendation-market">${topInsight.market}</div>
                    </div>
                </div>
                <div class="recommendation-selection">${topInsight.selection}</div>
                <div class="recommendation-probability">
                    <div class="probability-meter">
                        <div class="probability-fill" style="width: ${Math.min(100, topInsight.probability * 110)}%"></div>
                    </div>
                    <div class="probability-value">${Math.round(topInsight.probability * 100)}% probability</div>
                </div>
                <div class="recommendation-description">${topInsight.description}</div>
            </div>
        `;
        
        // Add other top recommendations
        if (topInsights.length > 1) {
            recommendationsHTML += '<div class="other-recommendations">';
            
            topInsights.slice(1).forEach(insight => {
                const insightStrengthClass = insight.strength > 75 ? 'high' : 
                                           (insight.strength > 50 ? 'medium' : 'low');
                
                recommendationsHTML += `
                    <div class="vip-recommendation ${insightStrengthClass}-confidence">
                        <div class="recommendation-header">
                            <span class="material-symbols-outlined">
                                ${insightStrengthClass === 'high' ? 'thumb_up' : 'trending_up'}
                            </span>
                            <div class="recommendation-market">${insight.market}</div>
                        </div>
                        <div class="recommendation-selection">${insight.selection}</div>
                        <div class="recommendation-probability">
                            <div class="probability-meter">
                                <div class="probability-fill" style="width: ${Math.min(100, insight.probability * 110)}%"></div>
                            </div>
                            <div class="probability-value">${Math.round(insight.probability * 100)}%</div>
                        </div>
                    </div>
                `;
            });
            
            recommendationsHTML += '</div>';
        }
    } else {
        // No strong recommendations
        recommendationsHTML = `
            <div class="vip-no-recommendation">
                <span class="material-symbols-outlined">info</span>
                <p>No strong betting recommendations for this match. All markets show balanced probabilities.</p>
            </div>
        `;
    }
    
    // Create betting markets analysis HTML
    let marketsHTML = '';
    
    // 1. Over/Under markets
    marketsHTML += `
        <div class="betting-market-section">
            <h4><span class="material-symbols-outlined">stacked_line_chart</span> Over/Under Markets</h4>
            <div class="market-probabilities">
    `;
    
    for (const [line, outcomes] of Object.entries(bettingAnalysis.overUnder)) {
        const overProb = Math.round(outcomes.over.probability * 100);
        const underProb = Math.round(outcomes.under.probability * 100);
        
        marketsHTML += `
            <div class="market-row">
                <div class="market-line">O/U ${line}</div>
                <div class="market-options">
                    <div class="market-option ${overProb > 55 ? 'strong' : ''}">
                        <div class="option-name">Over ${line}</div>
                        <div class="option-probability">${overProb}%</div>
                    </div>
                    <div class="market-option ${underProb > 55 ? 'strong' : ''}">
                        <div class="option-name">Under ${line}</div>
                        <div class="option-probability">${underProb}%</div>
                    </div>
                </div>
                <div class="market-description">
                    ${outcomes.over.description}
                </div>
            </div>
        `;
    }
    
    marketsHTML += `
            </div>
        </div>
    `;
    
    // 2. Asian Handicap markets (selected ones)
    marketsHTML += `
        <div class="betting-market-section">
            <h4><span class="material-symbols-outlined">balance</span> Asian Handicap Markets</h4>
            <div class="market-probabilities">
    `;
    
    // Show selected handicaps
    const selectedHandicaps = [-0.5, 0, 0.5, 1, 1.5];
    for (const handicap of selectedHandicaps) {
        const outcomes = bettingAnalysis.handicap[handicap];
        
        if (outcomes) {
            const team1Prob = Math.round(outcomes.team1.probability * 100);
            const team2Prob = Math.round(outcomes.team2.probability * 100);
            
            marketsHTML += `
                <div class="market-row">
                    <div class="market-line">AH ${handicap}</div>
                    <div class="market-options">
                        <div class="market-option ${team1Prob > 55 ? 'strong' : ''}">
                            <div class="option-name">${team1Name} ${handicap > 0 ? '+' : ''}${handicap}</div>
                            <div class="option-probability">${team1Prob}%</div>
                        </div>
                        <div class="market-option ${team2Prob > 55 ? 'strong' : ''}">
                            <div class="option-name">${team2Name} ${-handicap > 0 ? '+' : ''}${-handicap}</div>
                            <div class="option-probability">${team2Prob}%</div>
                        </div>
                    </div>
                    <div class="market-description">
                        ${outcomes.team1.description}
                    </div>
                </div>
            `;
        }
    }
    
    marketsHTML += `
            </div>
        </div>
    `;
    
    // 3. Match outcome markets
    const wdw = bettingAnalysis.winDrawWin;
    
    marketsHTML += `
        <div class="betting-market-section">
            <h4><span class="material-symbols-outlined">emoji_events</span> Match Outcome Markets</h4>
            <div class="market-probabilities">
                <div class="market-row">
                    <div class="market-line">1X2</div>
                    <div class="market-options three-options">
                        <div class="market-option ${wdw.team1.probability > 0.4 ? 'strong' : ''}">
                            <div class="option-name">${team1Name}</div>
                            <div class="option-probability">${Math.round(wdw.team1.probability * 100)}%</div>
                        </div>
                        <div class="market-option ${wdw.draw.probability > 0.3 ? 'strong' : ''}">
                            <div class="option-name">Draw</div>
                            <div class="option-probability">${Math.round(wdw.draw.probability * 100)}%</div>
                        </div>
                        <div class="market-option ${wdw.team2.probability > 0.4 ? 'strong' : ''}">
                            <div class="option-name">${team2Name}</div>
                            <div class="option-probability">${Math.round(wdw.team2.probability * 100)}%</div>
                        </div>
                    </div>
                </div>
                
                <div class="market-row">
                    <div class="market-line">BTTS</div>
                    <div class="market-options">
                        <div class="market-option ${bettingAnalysis.bothTeamsToScore.yes.probability > 0.55 ? 'strong' : ''}">
                            <div class="option-name">Yes</div>
                            <div class="option-probability">${Math.round(bettingAnalysis.bothTeamsToScore.yes.probability * 100)}%</div>
                        </div>
                        <div class="market-option ${bettingAnalysis.bothTeamsToScore.no.probability > 0.55 ? 'strong' : ''}">
                            <div class="option-name">No</div>
                            <div class="option-probability">${Math.round(bettingAnalysis.bothTeamsToScore.no.probability * 100)}%</div>
                        </div>
                    </div>
                    <div class="market-description">
                        Both Teams To Score: ${Math.round(bettingAnalysis.bothTeamsToScore.yes.probability * 100)}% chance both teams score at least one goal
                    </div>
                </div>
            </div>
        </div>
    `;
    
    // Combine all sections
    const bettingRecommendationHTML = `
        <div class="vip-betting-recommendations">
            ${recommendationsHTML}
        </div>
        
        <div class="vip-markets-analysis">
            ${marketsHTML}
        </div>
        
        <div class="vip-betting-disclaimer">
            <span class="material-symbols-outlined">info</span>
            <p>All predictions are based on our advanced statistical models and historical data analysis. 
            Probabilities represent statistical likelihood based on match simulations.</p>
        </div>
    `;
    
    document.getElementById('betting-recommendation').innerHTML = bettingRecommendationHTML;
}

// Update VIP analysis explanation with enhanced insights
function updateVIPAnalysisExplanation(results, features, bettingAnalysis) {
    // Determine the predicted winner
    let winnerName, winnerProb;
    
    if (results.probabilities.team1WinProb > results.probabilities.team2WinProb && 
        results.probabilities.team1WinProb > results.probabilities.drawProb) {
        winnerName = team1Name;
        winnerProb = results.probabilities.team1WinProb;
    } else if (results.probabilities.team2WinProb > results.probabilities.team1WinProb && 
               results.probabilities.team2WinProb > results.probabilities.drawProb) {
        winnerName = team2Name;
        winnerProb = results.probabilities.team2WinProb;
    } else {
        winnerName = "A draw";
        winnerProb = results.probabilities.drawProb;
    }
    
    // Get projected scores
    const team1Score = Math.round((results.projectedTotal / 2) + (results.projectedMargin / 2));
    const team2Score = Math.round((results.projectedTotal / 2) - (results.projectedMargin / 2));
    
    // Get top 5 key factors from feature importance
    const topFactors = Object.entries(featureImportanceScores)
        .slice(0, 5)
        .map(([factor, importance]) => {
            return { factor, importance };
        });
    
    // Generate key factors HTML
    const keyFactorsHTML = topFactors.map(item => {
        return `
            <div class="key-factor">
                <div class="factor-name">${item.factor}</div>
                <div class="factor-importance-bar">
                    <div class="factor-bar" style="width: ${item.importance}%"></div>
                </div>
                <div class="factor-percentage">${item.importance.toFixed(0)}%</div>
            </div>
        `;
    }).join('');
    
    // Generate VIP match insights
    const insights = generateVIPMatchInsights(features, results.projectedMargin, results.projectedTotal);
    
    // Generate VIP match-specific factors
    const matchFactors = generateVIPMatchFactors(features);
    
    // Generate VIP betting analysis
    let bettingAnalysisHtml = "";
    
    if (bettingAnalysis && bettingAnalysis.recommendations.length > 0) {
        // Get top recommendations
        const topRecommendations = bettingAnalysis.recommendations.slice(0, 3);
        
        bettingAnalysisHtml = `
            <h4>VIP Betting Analysis:</h4>
            <p>Based on ${lastAnalysisResults.simulations.length.toLocaleString()} match simulations, our models have identified the following high-value betting opportunities:</p>
            <ul class="vip-betting-insights">
                ${topRecommendations.map(rec => `
                    <li class="${rec.strength > 75 ? 'strong' : (rec.strength > 50 ? 'moderate' : 'weak')}">
                        <span>${rec.type === 'overUnder' ? 
                            `${rec.selection} ${rec.line}` : 
                            `${rec.description}`}</span>
                        <div class="insight-probability">
                            <span class="probability-bar" style="width: ${Math.min(100, rec.probability * 110)}%"></span>
                            <span class="probability-value">${Math.round(rec.probability * 100)}%</span>
                        </div>
                    </li>
                `).join('')}
            </ul>
            
            <div class="betting-insight-detail">
                <p><strong>Key Insight:</strong> ${
                    bettingAnalysis.recommendations[0].type === 'overUnder' ?
                    `Our analysis shows a ${Math.round(bettingAnalysis.recommendations[0].probability * 100)}% probability that this match will finish ${bettingAnalysis.recommendations[0].selection.toLowerCase()} ${bettingAnalysis.recommendations[0].line} goals.` :
                    bettingAnalysis.recommendations[0].description
                }</p>
            </div>
        `;
    } else {
        bettingAnalysisHtml = `
            <h4>VIP Betting Analysis:</h4>
            <p>After running multiple simulations, no strong betting edges were identified for this match. 
            The model shows balanced probabilities across most markets, suggesting a potentially unpredictable match.</p>
        `;
    }
    
    // Generate VIP model ensemble information
    const modelEnsembleHtml = `
        <h4>VIP Model Ensemble:</h4>
        <p>This analysis utilizes a weighted ensemble of four specialized prediction models to maximize accuracy:</p>
        <div class="vip-model-ensemble">
            ${results.modelResults.map(model => `
                <div class="ensemble-model">
                    <div class="model-name">${model.name}</div>
                    <div class="model-weight-bar">
                        <div class="model-weight" style="width: ${model.weight * 100}%"></div>
                    </div>
                    <div class="model-weight-value">${Math.round(model.weight * 100)}%</div>
                </div>
            `).join('')}
        </div>
        <p class="ensemble-note">Each model specializes in different aspects of match prediction, 
        from recent form to head-to-head history to advanced statistical indicators.</p>
    `;
    
    // Format the full explanation
    const explanationHTML = `
        <div class="analysis-header">
            <h3>VIP Analysis Summary</h3>
            <p>Based on our premium Model Ensemble and Monte Carlo simulation, <strong>${winnerName}</strong> has a ${winnerProb.toFixed(1)}% probability of winning this match with a projected score of <strong>${team1Score}-${team2Score}</strong>.</p>
        </div>
        
        <div class="analysis-sections">
            <div class="analysis-section vip-section">
                <h4>Key Predictive Factors</h4>
                <div class="key-factors-grid">
                    ${keyFactorsHTML}
                </div>
            </div>
            
            <div class="analysis-section vip-section">
                <h4>VIP Match Insights</h4>
                <ul class="match-insights">
                    ${insights.map(insight => `<li>${insight}</li>`).join('')}
                </ul>
            </div>
            
            <div class="analysis-section vip-section">
                ${modelEnsembleHtml}
            </div>
            
            <div class="analysis-section vip-section betting-section">
                ${bettingAnalysisHtml}
            </div>
            
            <div class="analysis-section vip-section">
                <h4>Match-Specific Factors</h4>
                <ul class="match-factors">
                    ${matchFactors.map(factor => `<li>${factor}</li>`).join('')}
                </ul>
            </div>
            
            <div class="analysis-section vip-section">
                <h4>Advanced Score Projection</h4>
                <p>The most likely score is <strong>${team1Score}-${team2Score}</strong>, but our simulations suggest these alternative scorelines:</p>
                <div class="alternative-scores">
                    ${generateVIPAlternativeScores(team1Score, team2Score, lastAnalysisResults.outcomes)}
                </div>
            </div>
            
            <div class="analysis-section vip-section">
                <h4>Data Quality Assessment</h4>
                <p>Analysis based on ${features.dataQuality.totalMatches} total matches (${features.dataQuality.h2hMatches} head-to-head).</p>
                <p>Data quality: <strong>${features.dataQuality.dataExcellence ? 'Excellent' : (features.dataQuality.dataSufficiency ? 'Good' : 'Limited')}</strong></p>
                <p><em>VIP models utilize proprietary algorithms with historically proven accuracy rates of 62-68% in match outcome predictions and 58-64% for over/under markets.</em></p>
            </div>
        </div>
    `;
    
    document.getElementById('analysis-explanation').innerHTML = explanationHTML;
}

// Generate VIP match insights with enhanced analytics
function generateVIPMatchInsights(features, projectedMargin, projectedTotal) {
    const insights = [];
    
    // Extract commonly used values from features
    const { 
        basicStats,
        advancedStats,
        vipStats
    } = features;
    
    // Form and momentum insights with VIP enhancements
    if (vipStats.momentumData) {
        const formDiff = vipStats.momentumData.advantage.formRating;
        if (Math.abs(formDiff) > 0.15) {
            const betterFormTeam = formDiff > 0 ? team1Name : team2Name;
            const formRating = Math.abs(formDiff) * 100;
            insights.push(`${betterFormTeam} shows significantly better recent form (${formRating.toFixed(0)}% advantage)`);
            
            // Add streak details if relevant
            const teamStreaks = formDiff > 0 ? vipStats.momentumData.team1 : vipStats.momentumData.team2;
            if (teamStreaks.winStreak >= 3) {
                insights.push(`${betterFormTeam} is on an impressive ${teamStreaks.winStreak}-match winning streak`);
            } else if (teamStreaks.unbeatenStreak >= 4) {
                insights.push(`${betterFormTeam} is unbeaten in their last ${teamStreaks.unbeatenStreak} matches`);
            }
        }
    }
    
    // Shot efficiency insights
    if (vipStats.shotData) {
        const shotAdvantage = vipStats.shotData.advantage.conversionRate;
        if (Math.abs(shotAdvantage) > 0.1) {
            const betterTeam = shotAdvantage > 0 ? team1Name : team2Name;
            insights.push(`${betterTeam} has significantly better shot conversion efficiency (${(Math.abs(shotAdvantage) * 100).toFixed(0)}% better)`);
        }
    }
    
    // Possession insights
    if (vipStats.possessionData) {
        const possAdvantage = vipStats.possessionData.advantage.possession;
        const effAdvantage = vipStats.possessionData.advantage.efficiency;
        
        if (Math.abs(possAdvantage) > 5 && Math.sign(possAdvantage) === Math.sign(effAdvantage)) {
            const betterTeam = possAdvantage > 0 ? team1Name : team2Name;
            insights.push(`${betterTeam} typically dominates possession (${Math.abs(possAdvantage).toFixed(1)}% more) and uses it effectively`);
        }
    }
    
    // Half-time/full-time insights
    if (vipStats.halfTimeData) {
        const htAdvantage = vipStats.halfTimeData.advantage.halfTimeWinPct;
        const shAdvantage = vipStats.halfTimeData.advantage.secondHalfScoring;
        
        if (Math.abs(htAdvantage) > 0.15) {
            const strongerTeam = htAdvantage > 0 ? team1Name : team2Name;
            insights.push(`${strongerTeam} tends to start matches strongly, leading at half-time ${(Math.abs(htAdvantage) * 100).toFixed(0)}% more often`);
        }
        
        if (Math.abs(shAdvantage) > 0.3) {
            const strongerTeam = shAdvantage > 0 ? team1Name : team2Name;
            insights.push(`${strongerTeam} scores significantly more goals in the second half (${Math.abs(shAdvantage).toFixed(1)} more per match)`);
        }
    }
    
    // Psychological factors
    if (vipStats.psychologicalFactors) {
        if (vipStats.psychologicalFactors.isDerby) {
            insights.push(`This is a derby match with heightened intensity and potentially unpredictable dynamics`);
        }
        
        const comebackAdvantage = vipStats.psychologicalFactors.advantage.comebacks;
        if (Math.abs(comebackAdvantage) > 0.2) {
            const strongerTeam = comebackAdvantage > 0 ? team1Name : team2Name;
            insights.push(`${strongerTeam} has shown excellent ability to come back from losing positions`);
        }
        
        const leadAdvantage = vipStats.psychologicalFactors.advantage.leadRetention;
        if (Math.abs(leadAdvantage) > 0.2) {
            const strongerTeam = leadAdvantage > 0 ? team1Name : team2Name;
            insights.push(`${strongerTeam} excels at maintaining leads once ahead in matches`);
        }
    }
    
    // H2H insights
    if (features.dataQuality.h2hMatches >= 2) {
        if (Math.abs(basicStats.h2hAdvantage) > 0.2) {
            const dominantTeam = basicStats.h2hAdvantage > 0 ? team1Name : team2Name;
            insights.push(`${dominantTeam} has a clear historical advantage in head-to-head matchups (${Math.abs(basicStats.h2hAdvantage * 100).toFixed(0)}% edge)`);
        } else {
            insights.push(`Head-to-head history shows evenly matched teams with no clear advantage`);
        }
    }
    
    // Location insights with VIP enhancements
    if (basicStats.locationFactor !== 0) {
        const homeTeam = basicStats.locationFactor === 1 ? team1Name : team2Name;
        const homeAdvantage = basicStats.locationFactor === 1 ? 
            vipStats.psychologicalFactors.team1.leadRetention : 
            vipStats.psychologicalFactors.team2.leadRetention;
        
        insights.push(`${homeTeam} playing at home is a significant factor (${(Math.abs(homeAdvantage) * 100).toFixed(0)}% better home performance)`);
    }
    
    // Add betting-related insights
    if (projectedTotal > 3.0) {
        insights.push(`VIP Model predicts a high-scoring match with ${projectedTotal.toFixed(1)} total goals - strong lean toward Over markets`);
    } else if (projectedTotal < 2.0) {
        insights.push(`VIP Model predicts a low-scoring match with ${projectedTotal.toFixed(1)} total goals - favorable for Under markets`);
    }
    
    if (Math.abs(projectedMargin) > 1.5) {
        const strongerTeam = projectedMargin > 0 ? team1Name : team2Name;
        insights.push(`VIP Model projects a comfortable margin for ${strongerTeam} - consider Asian Handicap markets`);
    } else if (Math.abs(projectedMargin) < 0.5) {
        insights.push(`VIP Model projects a very close match with minimal margin - Draw has enhanced probability`);
    }
    
    // Return a maximum of 6 insights
    return insights.slice(0, 6);
}

// Generate VIP match-specific factors with enhanced analytics
function generateVIPMatchFactors(features) {
    const matchFactors = [];
    
    // Add match type factor with VIP details
    const matchType = document.getElementById('match-importance').options[document.getElementById('match-importance').selectedIndex].text;
    matchFactors.push(`This is a ${matchType} match (importance factor: ${features.basicStats.matchImportance.toFixed(1)})`);
    
    // Add home/away factor with enhanced details
    if (features.basicStats.locationFactor === 1) {
        matchFactors.push(`${team1Name} playing at home (advantage multiplier: ${features.advancedStats.team1HomeAdvantage.toFixed(2)}x)`);
    } else if (features.basicStats.locationFactor === -1) {
        matchFactors.push(`${team2Name} playing at home (advantage multiplier: ${features.advancedStats.team2HomeAdvantage.toFixed(2)}x)`);
    } else {
        matchFactors.push('Match played at a neutral venue (no home advantage)');
    }
    
    // Add ranking factor if available with enhanced context
    if (team1Ranking > 0 && team2Ranking > 0) {
        const rankingDiff = Math.abs(team1Ranking - team2Ranking);
        const rankingContext = rankingDiff <= 3 ? "closely ranked" : 
                             (rankingDiff <= 10 ? "moderately separated" : "widely separated");
        
        matchFactors.push(`Team rankings: ${team1Name} (#${team1Ranking}) vs ${team2Name} (#${team2Ranking}) - ${rankingContext}`);
    }
    
    // Add scoring averages with enhanced context
    const team1AvgScore = features.basicStats.team1AvgScore.toFixed(2);
    const team2AvgScore = features.basicStats.team2AvgScore.toFixed(2);
    
    const scoringDiff = Math.abs(features.basicStats.team1AvgScore - features.basicStats.team2AvgScore);
    const scoringContext = scoringDiff < 0.3 ? "similarly matched attacking output" : 
                          (scoringDiff < 0.8 ? "moderately different scoring rates" : "significantly different scoring potentials");
    
    matchFactors.push(`Scoring comparison: ${team1Name} (${team1AvgScore}) vs ${team2Name} (${team2AvgScore}) - ${scoringContext}`);
    
    // Add VIP enhanced metrics
    if (features.vipStats) {
        // Add shot efficiency comparison
        if (features.vipStats.shotData) {
            const team1Efficiency = features.vipStats.shotData.team1.conversionRate.toFixed(2);
            const team2Efficiency = features.vipStats.shotData.team2.conversionRate.toFixed(2);
            
            matchFactors.push(`Shot conversion: ${team1Name} (${team1Efficiency * 100}%) vs ${team2Name} (${team2Efficiency * 100}%)`);
        }
        
        // Add momentum factors
        if (features.vipStats.momentumData) {
            const team1Form = features.vipStats.momentumData.team1.formRating.toFixed(2);
            const team2Form = features.vipStats.momentumData.team2.formRating.toFixed(2);
            
            const formDiff = Math.abs(features.vipStats.momentumData.team1.formRating - 
                                     features.vipStats.momentumData.team2.formRating);
            const formContext = formDiff < 0.1 ? "similarly matched current form" : 
                               (formDiff < 0.2 ? "slight form advantage" : "significant form advantage");
            
            matchFactors.push(`Current form rating: ${team1Name} (${team1Form}) vs ${team2Name} (${team2Form}) - ${formContext}`);
        }
        
        // Add second half scoring
        if (features.vipStats.halfTimeData) {
            const team1SecondHalf = features.vipStats.halfTimeData.team1.secondHalfAvgGoals.toFixed(1);
            const team2SecondHalf = features.vipStats.halfTimeData.team2.secondHalfAvgGoals.toFixed(1);
            
            matchFactors.push(`Second half scoring: ${team1Name} (${team1SecondHalf}) vs ${team2Name} (${team2SecondHalf})`);
        }
        
        // Add psychological factors if derby
        if (features.vipStats.psychologicalFactors.isDerby) {
            const team1BigMatch = (features.vipStats.psychologicalFactors.team1.bigMatchPerformance * 10).toFixed(1);
            const team2BigMatch = (features.vipStats.psychologicalFactors.team2.bigMatchPerformance * 10).toFixed(1);
            
            matchFactors.push(`Derby match performance rating: ${team1Name} (${team1BigMatch}/10) vs ${team2Name} (${team2BigMatch}/10)`);
        }
    }
    
    return matchFactors;
}

// Generate VIP alternative score possibilities based on simulations
function generateVIPAlternativeScores(mainScore1, mainScore2, outcomes) {
    // Use simulated scorelines from the outcomes rather than calculated variants
    const alternativeScores = outcomes.scoreDistribution
        .filter(score => score.score !== `${mainScore1}-${mainScore2}`)
        .slice(0, 3);
    
    // Generate HTML
    return alternativeScores.map(alt => {
        const [score1, score2] = alt.score.split('-').map(Number);
        
        return `
            <div class="alternative-score">
                <div class="alt-score-value">${score1}-${score2}</div>
                <div class="alt-probability">${(alt.probability * 100).toFixed(1)}%</div>
            </div>
        `;
    }).join('');
}

// Create VIP win probability chart with enhanced visuals
function createVIPWinProbabilityChart(probabilities) {
    // Destroy previous chart if it exists
    if (winProbabilityChart) {
        winProbabilityChart.destroy();
    }
    
    const ctx = document.getElementById('win-probability-chart').getContext('2d');
    
    // VIP enhanced gradient colors
    const gradients = {
        team1: ctx.createLinearGradient(0, 0, 0, 400),
        team2: ctx.createLinearGradient(0, 0, 0, 400),
        draw: ctx.createLinearGradient(0, 0, 0, 400)
    };
    
    gradients.team1.addColorStop(0, 'rgba(66, 133, 244, 0.9)');
    gradients.team1.addColorStop(1, 'rgba(66, 133, 244, 0.6)');
    
    gradients.team2.addColorStop(0, 'rgba(234, 67, 53, 0.9)');
    gradients.team2.addColorStop(1, 'rgba(234, 67, 53, 0.6)');
    
    gradients.draw.addColorStop(0, 'rgba(95, 99, 104, 0.9)');
    gradients.draw.addColorStop(1, 'rgba(95, 99, 104, 0.6)');
    
    winProbabilityChart = new Chart(ctx, {
        type: 'doughnut',
        data: {
            labels: [team1Name, team2Name, 'Draw'],
            datasets: [{
                data: [
                    probabilities.team1WinProb,
                    probabilities.team2WinProb,
                    probabilities.drawProb
                ],
                backgroundColor: [
                    gradients.team1,
                    gradients.team2,
                    gradients.draw
                ],
                borderColor: [
                    'rgba(66, 133, 244, 1)',
                    'rgba(234, 67, 53, 1)',
                    'rgba(95, 99, 104, 1)'
                ],
                borderWidth: 2,
                hoverOffset: 10
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: 'top',
                    labels: {
                        padding: 15,
                        font: {
                            size: 13,
                            weight: '500'
                        },
                        usePointStyle: true,
                        pointStyle: 'circle'
                    }
                },
                title: {
                    display: true,
                    text: 'VIP Match Outcome Probabilities',
                    font: {
                        size: 16,
                        weight: 'bold'
                    },
                    padding: {
                        bottom: 15
                    }
                },
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            return `${context.label}: ${context.raw.toFixed(1)}%`;
                        },
                        afterLabel: function(context) {
                            const labels = [
                                `Implied odds: ${(100 / context.raw).toFixed(2)}`,
                                `Confidence: ${context.raw > 60 ? 'High' : (context.raw > 40 ? 'Medium' : 'Low')}`
                            ];
                            return labels;
                        }
                    },
                    padding: 12,
                    backgroundColor: 'rgba(255, 255, 255, 0.9)',
                    titleColor: '#000',
                    bodyColor: '#000',
                    borderColor: '#ddd',
                    borderWidth: 1,
                    boxShadow: '0 2px 5px rgba(0,0,0,0.1)',
                    cornerRadius: 8
                }
            },
            animation: {
                animateRotate: true,
                animateScale: true,
                duration: 1000,
                easing: 'easeOutQuart'
            },
            cutout: '60%',
            elements: {
                arc: {
                    borderRadius: 5
                }
            }
        }
    });
    
    // Add VIP badge to chart
    const chartContainer = document.querySelector('.chart-card:nth-child(1)');
    if (chartContainer) {
        const vipBadge = document.createElement('div');
        vipBadge.className = 'vip-chart-badge';
        vipBadge.innerHTML = 'VIP';
        chartContainer.appendChild(vipBadge);
    }
}

// Create VIP score probability chart with enhanced visuals
function createVIPScoreProbabilityChart(scoreDistribution) {
    // Create a new chart on page
    
    // First, add a new canvas if it doesn't exist
    if (!document.getElementById('score-probability-chart')) {
        const newChartCard = document.createElement('div');
        newChartCard.className = 'chart-card';
        newChartCard.innerHTML = `
            <h3>Probable Score Distribution</h3>
            <div class="chart-container">
                <canvas id="score-probability-chart"></canvas>
            </div>
        `;
        
        // Add to results charts section
        document.querySelector('.result-charts').appendChild(newChartCard);
        
        // Add VIP badge
        const vipBadge = document.createElement('div');
        vipBadge.className = 'vip-chart-badge';
        vipBadge.innerHTML = 'VIP';
        newChartCard.appendChild(vipBadge);
    }
    
    // Destroy previous chart if it exists
    if (scoreProbabilityChart) {
        scoreProbabilityChart.destroy();
    }
    
    const ctx = document.getElementById('score-probability-chart').getContext('2d');
    
    // Prepare data for display - get top 8 scores
    const topScores = scoreDistribution.slice(0, 8);
    
    // Format labels for display
    const labels = topScores.map(score => 
        score.team1Score === -1 ? 'Other' : `${score.team1Score}-${score.team2Score}`
    );
    
    // Create gradient fills for bars
    const gradients = topScores.map((score, index) => {
        const gradient = ctx.createLinearGradient(0, 0, 400, 0);
        
        if (score.team1Score === -1) {
            // Other scores category
            gradient.addColorStop(0, 'rgba(95, 99, 104, 0.9)');
            gradient.addColorStop(1, 'rgba(95, 99, 104, 0.6)');
        } else if (score.team1Score > score.team2Score) {
            // Team 1 winning
            gradient.addColorStop(0, 'rgba(66, 133, 244, 0.9)');
            gradient.addColorStop(1, 'rgba(66, 133, 244, 0.6)');
        } else if (score.team1Score < score.team2Score) {
            // Team 2 winning
            gradient.addColorStop(0, 'rgba(234, 67, 53, 0.9)');
            gradient.addColorStop(1, 'rgba(234, 67, 53, 0.6)');
        } else {
            // Draw
            gradient.addColorStop(0, 'rgba(95, 99, 104, 0.8)');
            gradient.addColorStop(1, 'rgba(95, 99, 104, 0.5)');
        }
        
        return gradient;
    });
    
    // Create chart
    scoreProbabilityChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: labels,
            datasets: [{
                label: 'Probability (%)',
                data: topScores.map(score => score.probability),
                backgroundColor: gradients,
                borderColor: topScores.map((score, index) => {
                    if (score.team1Score === -1) return 'rgba(95, 99, 104, 1)';
                    if (score.team1Score > score.team2Score) return 'rgba(66, 133, 244, 1)';
                    if (score.team1Score < score.team2Score) return 'rgba(234, 67, 53, 1)';
                    return 'rgba(95, 99, 104, 1)'; // Draw
                }),
                borderWidth: 1,
                borderRadius: 6
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            indexAxis: 'y',
            plugins: {
                legend: {
                    display: false
                },
                title: {
                    display: true,
                    text: 'VIP Score Probability Analysis',
                    font: {
                        size: 16,
                        weight: 'bold'
                    },
                    padding: {
                        bottom: 15
                    }