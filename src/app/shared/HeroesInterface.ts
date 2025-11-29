export interface HeroesInterface {
  id: number,
  localized_name: string,
  roles: Array<string>,
  attack_type: string,
  primary_attr: string,

  base_str: number,
  base_agi: number,
  base_int: number,
  move_speed: number,

  pub_pick_trend: Array<number>,
  pub_win_trend: Array<number>,
  pub_pick: number,
  pub_win: number,
  pro_pick: number,
  pro_win: number,

  winRate: number,
  pickGrowthRateChange: number,
  winGrowthRateChange: number,
  trendStdDev: number,
  disparityScore: number,
  img: string,
  icon: string,
}
