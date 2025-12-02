export interface MostPlayedHeroesInterface{
  heroes: [{
    localized_name: string,
    averageKills: number,
    averageDeaths: number,
    averageAssists: number,
    img: string,
    roles: string[]
  },
  {
    localized_name: '',
    averageKills: 0,
    averageDeaths: 0,
    averageAssists: 0,
    img: '',
    roles: []
  },
      {
    localized_name: '',
    averageKills: 0,
    averageDeaths: 0,
    averageAssists: 0,
    img: '',
    roles: []
  }]
}
