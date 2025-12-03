export interface RecentMatchAggregateInterface {
  match_list: [
    {
      match_id: number,
      player_slot: number,
      radiant_win: boolean,
      hero_id: number,
      start_time: number,
      duration: number,
      game_mode: number,
      lobby_type: number,
      kills: number,
      deaths: number,
      assists: number,
      average_rank: number,
      xp_per_min: number,
      gold_per_min: number,
      hero_damage: number,
      tower_damage: number,
      hero_healing: number,
      last_hits: number,
      cluster: number,
      hero_variant: number,
      localized_name: string,
      kdaRatio: number,
      gpmXpmEfficiency: number,
      csPerMinEfficiency: number,
      heroDmgEfficiency: number,
      towerDmgEfficiency: number,
    }

  ],


  match_aggregate: {
    totalMatches: number,
    winRate: number,
    cumulativeKDA: number,
    avgGPM: number,
    avgXPM: number,
    avgHeroDamage: number,
    avgTowerDamage: number,
    avgLastHit: number,
    avgLastHitPerMinute: number,
  }

}
