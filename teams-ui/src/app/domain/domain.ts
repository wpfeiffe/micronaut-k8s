export interface Player {
  id: number;
  fullName: string;
  position: string;
  team: Team;
}

export interface Team {
  id: number;
  teamName: string;
  teamCode: string;
  league: League;
}

export interface League {
  id: number;
  leagueName: string;
}
