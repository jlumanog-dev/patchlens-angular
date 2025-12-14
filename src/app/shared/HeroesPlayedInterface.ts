interface HeroesPlayedInterface{
  frequencyHeroes: [

  ],
  fixedSetMatches: [{
    match_id: number,
      player_slot: number,
      radiant_win: boolean,
      game_mode: number,
      duration: number,
      lobby_type: number,
      hero_id: number,
      start_time: number,
      version: number | null,
      kills: number,
      deaths: number,
      assists: number,
      average_rank: number,
      leaver_status: number,
      party_size: number | null,
      hero_variant: number,

      img: string,
      roles: string[],
      localized_name: string,
    }],

}
