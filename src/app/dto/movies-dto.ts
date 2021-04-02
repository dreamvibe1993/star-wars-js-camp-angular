/** Movies DTO */
export interface MoviesDTO {
  fields: {
    /**
     * Directors credits.
     */
    director: string;
    /**
     * Every sw movie's opening crawl.
     */
    opening_crawl: string;
    /**
     * Producer's credits.
     */
    producer: string;
    /**
     * The date of release.
     */
    release_date: string;
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
    episode_id: number | string | null;
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
  }
  /**
   * Personal key
   */
  pk: number;
  /** 
   * Model
   */
  model: string;

}

