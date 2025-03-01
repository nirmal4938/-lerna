import React, { useState } from "react";
import TabPanel from "./TabPanel"; // Assuming TabPanel is in the same directory or adjust the path accordingly.
import { Plus } from "lucide-react";
import { gql, useMutation } from "@apollo/client";
import styled from "styled-components"; 
import { useEditTeam } from "./hooks/useEditTeam";
import AddEditPlayer from "./components/AddEditPlayer";
import {AddEditTeam} from './components/AddEditTeams'
import ActionButtons from "./components/ActionsButtons";
// const playersList = [
//   { _id: "1", name: "Player 1" },
//   { _id: "2", name: "Player 2" },
//   { _id: "3", name: "Player 3" },
//   { _id: "4", name: "Player 4" },
//   { _id: "5", name: "Player 5" },
//   { _id: "6", name: "Player 6" },
//   { _id: "7", name: "Player 7" },
//   { _id: "8", name: "Player 8" },
//   { _id: "9", name: "Player 9" },
//   { _id: "10", name: "Player 10" },
//   { _id: "11", name: "Player 11" },
//   { _id: "12", name: "Player 12" }
// ];
const CREATE_TEAM_MUTATION = gql`
  mutation createTeam($input: CreateTeamInput!) {
    createTeam(input: $input)
      @rest(
        type: "Team", 
        path: "teams", 
        method: "POST", 
        bodyKey: "input"
      ) {
        id
        name
        city
        team_contact_number
      }
  }
`;

export const GET_ALL_TEAMS = gql`
  query get_all_teams($filter: String, $sort: Object, $offset: Int, $limit: Int) {
    get_all_teams(
      filter: $filter,
      sort: $sort,
      offset: $offset,
      limit: $limit
    ) @rest(type: "Team", path: "teams?{args}") {
      rows @type(name: "Team") {
        _id
        name
      }
      count
    }
  }
`;
export const GET_ALL_PLAYERS = gql`
  query get_all_players($filter: String, $sort: Object, $offset: Int, $limit: Int) {
    get_all_players(
      filter: $filter,
      sort: $sort,
      offset: $offset,
      limit: $limit
    ) @rest(type: "Team", path: "players?{args}") {
      rows @type(name: "Player") {
        _id
        name
      }
      count
    }
  }
`;
export const MatchPage = () => {
  const [createTeam, { loading, error, data }] = useMutation(CREATE_TEAM_MUTATION);
  const {teams, players} = useEditTeam();
  // console.log("teams", teams)
  const [playerData, setPlayerData] = useState(null);
  const [filter, setFilter] = useState("");
  const [sort, setSort] = useState({ createdAt: -1 }); // Default sorting by creation date descending
  const [offset, setOffset] = useState(0);
  const [limit, setLimit] = useState(10); // Default to 10 items per page

  const [captain, setCaptain] = useState(null);
  const [viceCaptain, setViceCaptain] = useState(null);
  // Apollo useQuery hook
  const [selectedTeam, setSelectedTeam] = useState(null);
  const [matchDetails, setMatchDetails] = useState({
    teamA: "",
    teamB: "",
    teamAPlayers: [],
    teamBPlayers: []
  }) 
  
  const [teamA, setTeamA] = useState([]);
  const [teamB, setTeamB] = useState([]);
  // Handle player selection for Team A
  const handleTeamAChange = (playerId) => {
    if (teamA.includes(playerId)) {
      setTeamA(teamA.filter((id) => id !== playerId));
    } else if (teamA.length < 11) {
      setTeamA([...teamA, playerId]);
    }
  };
  const handleSelect = (e) => {
    let {name, value} =e.target;
    let team = teams?.find((team) => team?._id === value)
    console.log("selected team a/b", name, value, team)
    if(name === 'teamA')
    setMatchDetails((prevDetails) => ({...prevDetails, [name]: team}))
    if(name === 'teamB')
    setMatchDetails((prevDetails) => ({...prevDetails, [name]: team}))

    // console.log("")
    // setSelectedTeam(teamId);
  };
  // Handle player selection for Team B
  const handleTeamBChange = (playerId) => {
    if (teamB.includes(playerId)) {
      setTeamB(teamB.filter((id) => id !== playerId));
    } else if (teamB.length < 11) {
      setTeamB([...teamB, playerId]);
    }
  };
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [teamType, setTeamType] = useState("");
    const [playerType, setPlayerType] = useState("")
    const [teamForm, setTeamForm] = useState({
        name: "s11",
        city: "awe",
        team_contact_number: "7678229735",
      });
      
  // const [teamA, setTeamA] = useState(null);
  // const [teamB, setTeamB] = useState(null);

  const handleOpenModal = (teamType, playerType) => {
    if(!playerType)
    setTeamType(teamType);
  if(!teamType)
    setPlayerType(playerType)
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setTeamType('');
    setPlayerType('');
  }
      const handleInputChange = (e) => {
        const { name, value } = e.target;
        console.log("name, value", name, value);
        setTeamForm({ ...teamForm, [name]: value });
      };
    
      const handleFormSubmit = async (e) => {
        e.preventDefault();
      
        try {
          const response = await createTeam({
            variables: {
              input: {
                name: teamForm.name,
                city: teamForm.city,
                team_contact_number: teamForm.team_contact_number,
              },
            },
          });
      
          console.log("Team created:", response.data.createTeam);
          alert("Team created successfully!");
      
          setTeamForm({ name: "", city: "", team_contact_number: "" });
        } catch (err) {
          console.error("Error creating team:", err.message);
        }
      };


      const handlePlayerChange = (updatedPlayer) => {
        setPlayerData(updatedPlayer);
      };
      
      const onPlayerSave = (newPlayer) => {
        console.log("Player saved:", newPlayer);
        // Add logic to save player to the backend or update state
      };
      const StartAMatchContent = () => {
        return (
            <div>
          <p>Select two teams to start the match:</p>
          <div style={buttonContainerStyle}>
            <button
              onClick={() => handleOpenModal("teamA", false)}
              style={addButtonStyle}
            >
              SELECT TEAM A <Plus size={16} style={{ marginLeft: "5px" }} />
            </button>
            <span style={vsStyle}>vs</span>
            <button
              onClick={() => handleOpenModal("teamB", false)}
              style={addButtonStyle}
            >
              SELECT TEAM B <Plus size={16} style={{ marginLeft: "5px" }} />
            </button>
          </div>
          <Container>
      <SelectedTeams>
        <TeamCard>
          <div style={buttonContainerStyle}>
          <h4>{matchDetails?.teamA?.name || 'Please Select Team A'}</h4>
          {matchDetails?.teamA && ( 
             <button
             onClick={() => handleOpenModal(false,"teamAPlayers")}
             style={addButtonStyle}
           >
             ADD PLAYER<Plus size={16} style={{ marginLeft: "5px" }} />
           </button>
          )}
          </div>
          {matchDetails?.teamA && (
          <><PlayerList>
                      {players.map((player) => (
                        <PlayerCard key={player._id}>
                          <label>
                            <input
                              type="checkbox"
                              checked={teamA.includes(player._id)}
                              onChange={() => handleTeamAChange(player._id)}
                              disabled={!teamA.includes(player._id) && teamA.length >= 11} // Prevent selecting more than 11 players
                            />
                            {player.name}
                          </label>
                          <RoleSelector>
            <RoleButton
              selected={captain === player._id}
              onClick={() => setCaptain(player._id)}
            >
              C
            </RoleButton>
            <RoleButton
              selected={viceCaptain === player._id}
              onClick={() => setViceCaptain(player._id)}
            >
              VC
            </RoleButton>
          </RoleSelector>
                        </PlayerCard>
                      ))}
                    </PlayerList><TeamCount>
                        {teamA.length}/11 Players Selected
                      </TeamCount></>
          )}
        </TeamCard>

        <TeamCard>
        <div style={buttonContainerStyle}>
          <h4>{matchDetails?.teamB?.name || 'Please Select Team B'}</h4>
          {matchDetails?.teamA && ( 
             <button
             onClick={() => handleOpenModal(false, "teamBPlayers")}
             style={addButtonStyle}
           >
             ADD PLAYER<Plus size={16} style={{ marginLeft: "5px" }} />
           </button>
          )}
          </div>
        {matchDetails?.teamB && (
          <><PlayerList>
                      {players.map((player) => (
                        <PlayerCard key={player._id}>
                          <label>
                            <input
                              type="checkbox"
                              checked={teamB.includes(player._id)}
                              onChange={() => handleTeamBChange(player._id)}
                              disabled={!teamB.includes(player._id) && teamB.length >= 11} // Prevent selecting more than 11 players
                            />
                            {player.name}
                          </label>
                        </PlayerCard>
                      ))}
                    </PlayerList><TeamCount>
                        {teamB.length}/11 Players Selected
                      </TeamCount></>
          )}
          
        </TeamCard>
      </SelectedTeams>
    </Container>
        </div>
        )
      }
  const tabs = [
    {
      header: "CREATE TEAM",
      content: (
        <div>
          <h2>Create Team</h2>
          <AddEditTeam team ={teamForm} onChange={ handleInputChange} onSave={handleFormSubmit}/>
        </div>
      ),
    },
    {
      header: "START A MATCH",
      content: (
        <div>
         <StartAMatchContent />
        </div>
      ),
    },
  ];

  const TeamSelection = () => {
    return (
      <Container>
        <Table>
          <thead>
            <tr>
              <Th>Logo</Th>
              <Th>Team Name</Th>
              <Th>Select</Th>
            </tr>
          </thead>
          <tbody>
            {loading && (
              <tr>
                <Td colSpan={3}>Loading...</Td>
              </tr>
            )}
            {error && (
              <tr>
                <Td colSpan={3}>Error: {error.message}</Td>
              </tr>
            )}
            {teams &&
              teams?.map((team) => 
              {
                const isDisabled =
                matchDetails?.teamA?._id === team._id || matchDetails?.teamB?._id === team._id;
                return(
                  <tr key={team._id} style={{ opacity: isDisabled ? 0.5 : 1 }}>
                    <Td>
                      {team?.team_logo ? (
                        <Logo src={team?.team_logo} alt={`${team.name} Logo`} />
                      ) : (
                        <Placeholder>Logo</Placeholder>
                      )}
                    </Td>
                    <Td>{team.name}</Td>
                    <Td>
                      <input
                        type="radio"
                        name={teamType}
                        value={team._id}
                        checked={matchDetails?.[teamType]?._id === team._id || matchDetails?.[teamType]?._id === team._id}
                        onChange={(e) => handleSelect(e)}
                        // disabled={isDisabled}
                      />
                    </Td>
                  </tr>
                )
              })}
          </tbody>
        </Table>
      </Container>
    );
  }
  const selectTeamTabs = [
    {
      header: "SELECT TEAMS",
      content: (
        <TeamSelection />
      ),
    }
  ];

  return (
    <React.Fragment>
      <h1>Match Page</h1>
      <TabPanel tabs={tabs} />
      {isModalOpen && (
        <ModalBackdrop onClick={handleCloseModal}>
          <ModalContainer onClick={(e) => e.stopPropagation()}>
            <ModalHeader>
              <h2>{teamType ? `Select ${teamType}` : 'Add Player'}</h2>
              <CloseButton onClick={handleCloseModal}>✖</CloseButton>
            </ModalHeader>
            {teamType && (<TabPanel tabs={selectTeamTabs} />)}
            {playerType && (<>
              <AddEditPlayer 
              player={playerData} 
              onChange={handlePlayerChange} 
              onAdd={onPlayerSave} 
              />
            </>)}
          </ModalContainer>
        </ModalBackdrop>
      )}
      <ActionButtons />
    </React.Fragment>
  );
};



const RoleSelector = styled.div`
  display: flex;
  gap: 5px;
`;

const RoleButton = styled.button`
  width: 30px;
  height: 30px;
  border-radius: 50%;
  border: none;
  cursor: pointer;
  font-weight: bold;
  padding: 0px;
  background-color: ${(props) => (props.selected ? "#007bff" : "#ddd")};
  color: ${(props) => (props.selected ? "white" : "black")};
  &:hover {
    background-color: ${(props) => (props.selected ? "#0056b3" : "#bbb")};
  }
`;


// Styled Components
const Container = styled.div`
  padding: 20px;
  background-color: #f7f7f7;
  border: 1px solid #ddd;
  border-radius: 8px;
`;

const SelectedTeams = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 20px;
`;

const TeamCard = styled.div`
  flex: 1;
  padding: 20px;
  background-color: white;
  border: 1px solid #ccc;
  border-radius: 8px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
`;

const PlayerList = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
`;

const PlayerCard = styled.div`
  flex: 1 1 calc(50% - 10px);
  background-color: #f9f9f9;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 5px;
  display: flex;
  align-items: center;

  label {
    width: 100%;
    display: flex;
    align-items: center;
    gap: 10px;
    cursor: pointer;
  }

  input {
    cursor: pointer;
  }
`;

const TeamCount = styled.div`
  margin-top: 10px;
  font-size: 14px;
  color: #555;
`;




// ** nector
const ModalBackdrop = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9999;
`;

const ModalContainer = styled.div`
  background-color: white;
  width: 50%;
  max-height: 80%;
  border-radius: 10px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.3);
`;

const ModalHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #ddd;
  padding: 10px 20px;
  background-color: #f7f7f7;
`;

const CloseButton = styled.button`
  background: transparent;
  border: none;
  font-size: 20px;
  cursor: pointer;
  color: #333;

  &:hover {
    color: red;
  }
`;
export const formStyle = {
    display: "flex",
    flexDirection: "column",
    gap: "15px",
    maxWidth: "400px",
    margin: "20px auto",
  };
  
  export const formGroupStyle = {
    display: "flex",
    flexDirection: "column",
    gap: "5px",
  };
  
 export const inputStyle = {
    padding: "10px",
    fontSize: "16px",
    border: "1px solid #ddd",
    borderRadius: "5px",
  };
  
  export const buttonStyle = {
    padding: "10px 20px",
    backgroundColor: "#4caf50",
    color: "white",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    fontSize: "16px",
  };

 export const addButtonStyle = {
    padding: "10px 20px",
    fontSize: "16px",
    backgroundColor: "#4caf50",
    color: "white",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
  };
  
  const vsStyle = {
    fontSize: "18px",
    fontWeight: "bold",
    color: "#333",
  };
  
  const selectedTeamsStyle = {
    marginTop: "20px",
    textAlign: "center",
  };
  const buttonContainerStyle = {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "20px",
    marginTop: "20px",
  };

  export const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  background-color: #fff;
`;

export const Th = styled.th`
  text-align: left;
  padding: 12px;
  background-color:rgb(129, 136, 129);
  color: white;
  font-weight: bold;
  border-bottom: 2px solid #ddd;
`;

export const Td = styled.td`
  text-align: left;
  padding: 10px;
  border-bottom: 1px solid #ddd;
`;

export const Logo = styled.img`
  width: 50px;
  height: 50px;
  object-fit: cover;
  border-radius: 50%;
`;

export const Placeholder = styled.div`
  width: 50px;
  height: 50px;
  background-color: #ddd;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 12px;
  color: #888;
`;

export const SelectedInfo = styled.div`
  margin-top: 20px;
  font-size: 16px;
  color: #333;
  background: #e8f5e9;
  padding: 10px;
  border-radius: 5px;
  font-weight: bold;
`;
export default MatchPage;
