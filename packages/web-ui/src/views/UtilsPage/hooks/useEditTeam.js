import React, { useEffect, useState } from "react";
import { GET_ALL_TEAMS, GET_ALL_PLAYERS } from "../MatchPage";
import { useQuery } from "@apollo/client";

export const useEditTeam = () => {
    const [filter, setFilter] = useState("");
    const [sort, setSort] = useState({ createdAt: -1 }); // Default sorting by creation date descending
    const [offset, setOffset] = useState(0);
    const [limit, setLimit] = useState(100); // Default to 10 items per page
    const [teams, setTeams] = useState([]);
    const [players, setPlayers] = useState([]);
    const { data: teamData, loading: teamLoading, error: teamError, refetch: teamRefetch } = useQuery(GET_ALL_TEAMS, {
    variables: { filter, sort, offset, limit },
  });

  const {data: playerData, loading: playerLoading, error: playerError, refetch: playerRefetch} = useQuery(GET_ALL_PLAYERS, {
    variables: { filter, sort, offset, limit },
  } )
   
  //  console.log("query results", playerData);
  useEffect(() => {
   if(teamData) {
    setTeams(teamData?.get_all_teams?.rows)
    setPlayers(playerData?.get_all_players.rows)
   }
  }, [teamData, playerData])

    return {
      teams,
      players
    }
}