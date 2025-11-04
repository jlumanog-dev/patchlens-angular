export interface topHeroesMappedInterface{
  id: number,
  localized_name: string,
  roles: Array<string>,
  attack_type: string,
  heroStats: {
    id : number,
    localized_name : string,
    move_speed : number,
    pub_pick : number,
    pub_pick_trend : Array<number>,
    pub_win : number,
    pub_win_trend : Array<number>
  },
  winRate: number,
  pickGrowthRateChange: number
}
