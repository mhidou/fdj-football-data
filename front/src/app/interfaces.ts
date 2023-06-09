export interface League {
  idLeague: string;
  strLeague: string;
}
export interface Team {
  idTeam: string;
  strTeam: string;
  strTeamBadge: string;
  leagues: string[];
}
export interface Player {
  teamId: string;
  name: string;
  poste: string;
  birthDate: string;
  price: string;
}
