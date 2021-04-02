/** Domain Model Object interface */
export interface Movie {
  /**
   * Directors credits.
   */
  director: string;
  /**
   * Document index from the db.
   */
  docId?: string;
  /**
   * Every sw movie's opening crawl.
   */
  openingCrawl: string;
  /**
   * Personal key
   */
  pk?: number;
  /**
   * Producer's credits.
   */
  producer: string;
  /**
   * The date of release.
   */
  releaseDate: string;
  /**
   * Movie's title.
   */
  title: string;
  /**
   * The timestamp the current data been created
   */
  created: string;
  /**
   * The timestamp the current data been edited
   */
  edited: string;
  /**
   * Particular episode's id
   */
  episodeId: number | string;
  /**
   * Planets taken place in the certain movie.
   */
  planets: number[];
  /**
   * Species taken place in the certain movie.
   */
  species: number[];
  /**
  * Starships taken place in the certain movie.
  */
  starships: number[];
  /**
  * Vehicles taken place in the certain movie.
  */
  vehicles: number[];
  /**
  * Characters taken place in the certain movie.
  */
  characters: number[];
  /**
   * Model
   */
  model: string;
}
