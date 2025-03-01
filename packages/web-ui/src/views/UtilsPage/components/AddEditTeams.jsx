
    import React from "react";
import { buttonStyle, formGroupStyle, formStyle, inputStyle } from "../MatchPage";
  export  const AddEditTeam = ({ team, onChange, onSave }) => {
        // console.log("team", team);

          return (
            <form onSubmit={onSave} style={formStyle}>
              <div style={formGroupStyle}>
                <label htmlFor="teamName">Team Name</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={team.name}
                  onChange={onChange}
                  required
                  style={inputStyle}
                />
              </div>
              <div style={formGroupStyle}>
                <label htmlFor="city">City/Town</label>
                <input
                  type="text"
                  id="city"
                  name="city"
                  value={team.city}
                  onChange={onChange}
                  required
                  style={inputStyle}
                />
              </div>
              {/* <div style={formGroupStyle}>
                <label htmlFor="captainNumber">Team Captain/Coordinator Number</label>
                <input
                  type="tel"
                  id="team_contact_number"
                  name="team_contact_number"
                  value={team.team_contact_number}
                  onChange={onChange}
                  required
                  style={inputStyle}
                />
              </div> */}
              <button type="submit" style={buttonStyle}>
                ADD TEAM
              </button>
            </form>
          );
    
      };