import React, { useEffect, useState } from "react";
import TabPanel from "./TabPanel";

export const MatchScorePage = () => {
  // Dummy matches array
  const [wickets, setWickets] = useState(0);
  const [overNumber, setOverNumber] = useState("7.3"); // Dummy value
  const [runs, setRuns] = useState(0);
  const [noBall, setNoBall] = useState(false);
  const [overthrow, setOverthrow] = useState(false);
  const [extraRuns, setExtraRuns] = useState(0);

  const [bowler, setBowler] = useState(""); // To track the selected bowler
  const [batterOut, setBatterOut] = useState(""); // To track the batter who got out
  const [wicketType, setWicketType] = useState(""); // To track the type of wicket
  const [fielder, setFielder] = useState(""); // To track the involved fielder (if any)

  // Example data for bowlers and batters (Replace these with your actual match data)
  const bowlers = ["Bowler 1", "Bowler 2", "Bowler 3"];
  const batters = ["Batter 1", "Batter 2", "Batter 3"];

  // Function to handle wicket update submission
  const handleWicketUpdate = () => {
    const wicketData = {
      bowler,
      batterOut,
      wicketType,
      fielder: fielder || "N/A",
    };

    console.log("Wicket Data Submitted:", wicketData);

    // Add logic here to send this data to your backend or update match state
    alert("Wicket data submitted successfully!");
  };

  const handleRunSelection = (runValue) => {
    setRuns(runValue);
  };

  const handleExtraRunsChange = (e) => {
    setExtraRuns(Number(e.target.value));
  };

  const matches = [
    {
      match_id: "001",
      team1: "Team A",
      team2: "Team B",
      current_inning: 1,
      team1_score: {
        runs: 150,
        wickets: 3,
        overs: 18,
        balls: 3,
      },
      team2_score: {
        runs: 0,
        wickets: 0,
        overs: 0,
        balls: 0,
      },
      status: "in_progress",
      updatedAt: "2025-01-20T14:30:00Z",
    },
    {
      match_id: "002",
      team1: "Team C",
      team2: "Team D",
      current_inning: 2,
      team1_score: {
        runs: 120,
        wickets: 5,
        overs: 20,
        balls: 0,
      },
      team2_score: {
        runs: 100,
        wickets: 6,
        overs: 18,
        balls: 4,
      },
      status: "completed",
      updatedAt: "2025-01-19T16:45:00Z",
    },
    {
      match_id: "003",
      team1: "Team E",
      team2: "Team F",
      current_inning: 1,
      team1_score: {
        runs: 80,
        wickets: 2,
        overs: 10,
        balls: 2,
      },
      team2_score: {
        runs: 0,
        wickets: 0,
        overs: 0,
        balls: 0,
      },
      status: "scheduled",
      updatedAt: "2025-01-18T11:15:00Z",
    },
  ];
  const SummaryContent = () => {
    const teamName = "Midlife Cricket Lovers";
    const score = "48/6";
    const overs = "7.0 Ov";
    const crr = "6.86";
  
    const batterStats = [
      { name: "Striker Name", runs: 24, balls: 20, fours: 3, sixes: 1, sr: 120.0 },
      { name: "Non-Striker Name", runs: 18, balls: 15, fours: 2, sixes: 0, sr: 120.0 },
    ];

    const bowlerStats = [
      { name: "Bowler 1", overs: 2.0, maidens: 0, runs: 10, wickets: 1, economy: 5.0 },
      { name: "Bowler 2", overs: 3.0, maidens: 0, runs: 20, wickets: 2, economy: 6.67 },
    ];
  
    return (
      <div>
        {/* First Section */}
        <div style={{ marginBottom: "20px", padding: "20px" }}>
          <h3>
            {teamName} <span style={{ fontWeight: "normal" }}>(Batting Inning)</span>
          </h3>
          <p style={{ margin: "5px 0", fontSize: "18px" }}>
            {score} ({overs})
          </p>
          <p style={{ margin: "5px 0", fontSize: "16px", color: "#555" }}>CRR {crr}</p>
          <p style={{ marginTop: "10px", fontStyle: "italic" }}>
            The team is currently playing an intense inning with some exciting shots!
          </p>
        </div>
  
        {/* Second Section */}
        <div>
          <h4>Batters</h4>
          <table style={{ width: "100%", borderCollapse: "collapse", marginTop: "10px" }}>
            <thead>
              <tr style={{ backgroundColor: "#f2f2f2" }}>
                <th style={tableHeaderStyle}>Batters</th>
                <th style={tableHeaderStyle}>R</th>
                <th style={tableHeaderStyle}>B</th>
                <th style={tableHeaderStyle}>4s</th>
                <th style={tableHeaderStyle}>6s</th>
                <th style={tableHeaderStyle}>SR</th>
              </tr>
            </thead>
            <tbody>
              {batterStats.map((batter, index) => (
                <tr key={index} style={{ textAlign: "center" }}>
                  <td style={tableCellStyle}>{batter.name}</td>
                  <td style={tableCellStyle}>{batter.runs}</td>
                  <td style={tableCellStyle}>{batter.balls}</td>
                  <td style={tableCellStyle}>{batter.fours}</td>
                  <td style={tableCellStyle}>{batter.sixes}</td>
                  <td style={tableCellStyle}>{batter.sr.toFixed(2)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Third Section */}
        {/* Third Section - Bowlers */}
      <div style={{ marginTop: "30px" }}>
        <h4>Bowlers</h4>
        <table style={{ width: "100%", borderCollapse: "collapse", marginTop: "10px" }}>
          <thead>
            <tr style={{ backgroundColor: "#f2f2f2" }}>
              <th style={tableHeaderStyle}>Bowlers</th>
              <th style={tableHeaderStyle}>O</th>
              <th style={tableHeaderStyle}>M</th>
              <th style={tableHeaderStyle}>R</th>
              <th style={tableHeaderStyle}>W</th>
              <th style={tableHeaderStyle}>Econ</th>
            </tr>
          </thead>
          <tbody>
            {bowlerStats.map((bowler, index) => (
              <tr key={index} style={{ textAlign: "center" }}>
                <td style={tableCellStyle}>{bowler.name}</td>
                <td style={tableCellStyle}>{bowler.overs}</td>
                <td style={tableCellStyle}>{bowler.maidens}</td>
                <td style={tableCellStyle}>{bowler.runs}</td>
                <td style={tableCellStyle}>{bowler.wickets}</td>
                <td style={tableCellStyle}>{bowler.economy.toFixed(2)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      </div>
    );
  };
  
  const ScorecardContent = () => {
    const [isBattingOpen, setBattingOpen] = useState(true);
    const [isBowlingOpen, setBowlingOpen] = useState(false);
  
    const batterStats = [
      { name: "Batter 1", runs: 45, balls: 30, fours: 6, sixes: 1, sr: 150.0 },
      { name: "Batter 2", runs: 25, balls: 20, fours: 3, sixes: 0, sr: 125.0 },
      { name: "Batter 3", runs: 15, balls: 10, fours: 2, sixes: 1, sr: 150.0 },
    ];
  
    const bowlerStats = [
      { name: "Bowler 1", overs: 4.0, maidens: 1, runs: 20, wickets: 2, economy: 5.0 },
      { name: "Bowler 2", overs: 4.0, maidens: 0, runs: 30, wickets: 1, economy: 7.5 },
      { name: "Bowler 3", overs: 2.0, maidens: 0, runs: 15, wickets: 1, economy: 7.5 },
    ];
  
    const toggleAccordion = (accordion) => {
      if (accordion === "batting") {
        setBattingOpen(!isBattingOpen);
        setBowlingOpen(false);
      } else if (accordion === "bowling") {
        setBowlingOpen(!isBowlingOpen);
        setBattingOpen(false);
      }
    };
  
    return (
      <div>
        {/* Batting Accordion */}
        <div>
          <div
            style={{
              cursor: "pointer",
              backgroundColor: "#f2f2f2",
              padding: "10px",
              marginBottom: "5px",
              fontWeight: "bold",
              border: "1px solid #ddd",
            }}
            onClick={() => toggleAccordion("batting")}
          >
            Batting Scorecard {isBattingOpen ? "▲" : "▼"}
          </div>
          {isBattingOpen && (
            <div style={{ padding: "10px", border: "1px solid #ddd", marginBottom: "10px" }}>
              <table style={{ width: "100%", borderCollapse: "collapse" }}>
                <thead>
                  <tr style={{ backgroundColor: "#f9f9f9" }}>
                    <th style={tableHeaderStyle}>Batters</th>
                    <th style={tableHeaderStyle}>R</th>
                    <th style={tableHeaderStyle}>B</th>
                    <th style={tableHeaderStyle}>4s</th>
                    <th style={tableHeaderStyle}>6s</th>
                    <th style={tableHeaderStyle}>SR</th>
                  </tr>
                </thead>
                <tbody>
                  {batterStats.map((batter, index) => (
                    <tr key={index} style={{ textAlign: "center" }}>
                      <td style={tableCellStyle}>{batter.name}</td>
                      <td style={tableCellStyle}>{batter.runs}</td>
                      <td style={tableCellStyle}>{batter.balls}</td>
                      <td style={tableCellStyle}>{batter.fours}</td>
                      <td style={tableCellStyle}>{batter.sixes}</td>
                      <td style={tableCellStyle}>{batter.sr.toFixed(2)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
  
        {/* Bowling Accordion */}
        <div>
          <div
            style={{
              cursor: "pointer",
              backgroundColor: "#f2f2f2",
              padding: "10px",
              fontWeight: "bold",
              border: "1px solid #ddd",
            }}
            onClick={() => toggleAccordion("bowling")}
          >
            Bowling Scorecard {isBowlingOpen ? "▲" : "▼"}
          </div>
          {isBowlingOpen && (
            <div style={{ padding: "10px", border: "1px solid #ddd", marginTop: "5px" }}>
              <table style={{ width: "100%", borderCollapse: "collapse" }}>
                <thead>
                  <tr style={{ backgroundColor: "#f9f9f9" }}>
                    <th style={tableHeaderStyle}>Bowlers</th>
                    <th style={tableHeaderStyle}>O</th>
                    <th style={tableHeaderStyle}>M</th>
                    <th style={tableHeaderStyle}>R</th>
                    <th style={tableHeaderStyle}>W</th>
                    <th style={tableHeaderStyle}>Econ</th>
                  </tr>
                </thead>
                <tbody>
                  {bowlerStats.map((bowler, index) => (
                    <tr key={index} style={{ textAlign: "center" }}>
                      <td style={tableCellStyle}>{bowler.name}</td>
                      <td style={tableCellStyle}>{bowler.overs}</td>
                      <td style={tableCellStyle}>{bowler.maidens}</td>
                      <td style={tableCellStyle}>{bowler.runs}</td>
                      <td style={tableCellStyle}>{bowler.wickets}</td>
                      <td style={tableCellStyle}>{bowler.economy.toFixed(2)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    );
  };
  const tableHeaderStyle = {
    padding: "10px",
    borderBottom: "2px solid #ddd",
  };
  
  const tableCellStyle = {
    padding: "10px",
    borderBottom: "1px solid #ddd",
  };
  const tabs = [
    { header: "Info", content: <div>Information content here</div> },
    { header: "Summary", content: <div><SummaryContent /></div> },
    { header: "Scorecard", content: <div><ScorecardContent /></div> },
    { header: "Commentary", content: <div>Commentary content here</div> },
    { header: "Analysis", content: <div>Analysis content here</div> },
    { header: "Gallery", content: <div>Gallery content here</div> },
  ];

  return (
    <React.Fragment>
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        background: "#fff",
        padding: "20px",
        margin: "20px",
        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
      }}
    >
<div style={{ padding: "20px", maxWidth: "600px", margin: "auto", fontFamily: "Arial" }}>
      <div
              style={{
                backgroundColor: "#f7f7f7",
                padding: "15px",
                border: "1px solid #ddd",
                borderRadius: "5px",
                marginBottom: "20px",
                textAlign: "center",
              }}
      >
        <h2>Match Overview</h2>
        <p style={{ fontSize: "18px", margin: "10px 0" }}>
          <strong>Total Score:</strong> {runs + extraRuns}
        </p>
        <p style={{ fontSize: "18px", margin: "10px 0" }}>
          <strong>Wickets Fallen:</strong> {wickets}
        </p>
        <p style={{ fontSize: "18px", margin: "10px 0" }}>
          <strong>Current Over:</strong> {overNumber}
        </p>
      </div>
      <div style={{ marginBottom: "20px", textAlign: "center" }}>
  <p style={{ fontSize: "18px", fontWeight: "bold" }}>
    Bowling Speed: <span style={{ color: "#007BFF" }}>145 km/h</span>
  </p>
</div>
      <h2>Update Match Data</h2>

      {/* Run Scorer with Quick Options */}
      <div style={{ marginBottom: "20px" }}>
        <h3>Select Runs:</h3>
        <div style={{ display: "flex", gap: "10px", justifyContent: "center" }}>
          <button onClick={() => handleRunSelection(0)}>0</button>
          <button onClick={() => handleRunSelection(1)}>1</button>
          <button onClick={() => handleRunSelection(2)}>2</button>
          <button onClick={() => handleRunSelection(3)}>3</button>
          <button onClick={() => handleRunSelection(4)}>4</button>
          <button onClick={() => handleRunSelection(6)}>6</button>
        </div>
      </div>

      {/* No Ball and Overthrow Toggles */}
      <div style={{ marginBottom: "20px" }}>
        <label>
          <input
            type="checkbox"
            checked={noBall}
            onChange={() => setNoBall(!noBall)}
          />
          No Ball (Add 1 extra run)
        </label>
        <br />
        <label>
          <input
            type="checkbox"
            checked={overthrow}
            onChange={() => setOverthrow(!overthrow)}
          />
          Overthrow (Add extra runs)
        </label>
      </div>

      {/* Extra Runs Input for Overthrow */}
      {(noBall || overthrow) && (
        <div style={{ marginBottom: "20px" }}>
          <label>
            Extra Runs:
            <input
              type="number"
              value={extraRuns}
              onChange={handleExtraRunsChange}
              style={{ marginLeft: "10px", padding: "5px" }}
            />
          </label>
        </div>
      )}

<div style={{ marginBottom: "20px", padding: "10px", border: "1px solid #ccc", borderRadius: "5px" }}>
  <h3 style={{ textAlign: "center", marginBottom: "15px" }}>Wicket Update</h3>
  
  {/* Bowler Selection */}
  <div style={{ marginBottom: "10px" }}>
    <label>
      Bowler: 
      <select 
        value={bowler} 
        onChange={(e) => setBowler(e.target.value)} 
        style={{ marginLeft: "10px", padding: "5px", borderRadius: "4px", border: "1px solid #ccc" }}
      >
        <option value="">Select Bowler</option>
        {bowlers.map((bowler, index) => (
          <option key={index} value={bowler}>{bowler}</option>
        ))}
      </select>
    </label>
  </div>

  {/* Batter Selection */}
  <div style={{ marginBottom: "10px" }}>
    <label>
      Batter Out: 
      <select 
        value={batterOut} 
        onChange={(e) => setBatterOut(e.target.value)} 
        style={{ marginLeft: "10px", padding: "5px", borderRadius: "4px", border: "1px solid #ccc" }}
      >
        <option value="">Select Batter</option>
        {batters.map((batter, index) => (
          <option key={index} value={batter}>{batter}</option>
        ))}
      </select>
    </label>
  </div>

  {/* Wicket Type */}
  <div style={{ marginBottom: "10px" }}>
    <label>
      Wicket Type: 
      <select 
        value={wicketType} 
        onChange={(e) => setWicketType(e.target.value)} 
        style={{ marginLeft: "10px", padding: "5px", borderRadius: "4px", border: "1px solid #ccc" }}
      >
        <option value="">Select Type</option>
        <option value="bowled">Bowled</option>
        <option value="caught">Caught</option>
        <option value="lbw">LBW</option>
        <option value="run_out">Run Out</option>
        <option value="stumped">Stumped</option>
      </select>
    </label>
  </div>

  {/* Additional Info */}
  <div style={{ marginBottom: "10px" }}>
    <label>
      Fielder (if applicable): 
      <input 
        type="text" 
        value={fielder} 
        onChange={(e) => setFielder(e.target.value)} 
        placeholder="Enter Fielder's Name" 
        style={{ marginLeft: "10px", padding: "5px", borderRadius: "4px", border: "1px solid #ccc", width: "60%" }}
      />
    </label>
  </div>

  {/* Confirm Wicket */}
  <div style={{ textAlign: "center" }}>
    <button 
      onClick={handleWicketUpdate} 
      style={{ padding: "10px 20px", backgroundColor: "#28a745", color: "white", border: "none", borderRadius: "4px", cursor: "pointer" }}
    >
      Confirm Wicket
    </button>
  </div>
</div>

      {/* Display Selected Runs */}
      <div style={{ marginBottom: "20px", textAlign: "center" }}>
        <p>Selected Runs: {runs + extraRuns}</p>
      </div>
      
      {/* Submit Button */}
      <button
        onClick={() => alert(`Submitted ${runs + extraRuns} runs`)}
        style={{
          marginTop: "20px",
          padding: "10px 20px",
          backgroundColor: "#4caf50",
          color: "white",
          border: "none",
          cursor: "pointer",
        }}
      >
        Submit Update
      </button>
    </div>
      {/* Client Section */}
      <TabPanel tabs={tabs} />
      
    </div>
      <div style={{ padding: "20px" }}>
        <h1>Match Summaries</h1>
        {matches.length === 0 ? (
          <p>No matches available.</p>
        ) : (
          <table border="1" style={{ width: "100%", textAlign: "left" }}>
            <thead>
              <tr>
                <th>Match ID</th>
                <th>Teams</th>
                <th>Inning</th>
                <th>Team 1 Score</th>
                <th>Team 2 Score</th>
                <th>Status</th>
                <th>Last Updated</th>
              </tr>
            </thead>
            <tbody>
              {matches.map((match) => (
                <tr key={match.match_id}>
                  <td>{match.match_id}</td>
                  <td>
                    {match.team1} vs {match.team2}
                  </td>
                  <td>{match.current_inning}</td>
                  <td>
                    {match.team1_score.runs}/{match.team1_score.wickets} in{" "}
                    {match.team1_score.overs}.{match.team1_score.balls} overs
                  </td>
                  <td>
                    {match.team2_score.runs}/{match.team2_score.wickets} in{" "}
                    {match.team2_score.overs}.{match.team2_score.balls} overs
                  </td>
                  <td>{match.status}</td>
                  <td>{new Date(match.updatedAt).toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </React.Fragment>
  );
};
