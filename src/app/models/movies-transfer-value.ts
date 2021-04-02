/** Interface for form touched data */
export interface MovieTransferValue {
    /** Movie's title */
    title: string;
    /** Movie's producer */
    producer: string;
    /** Movie's release date */
    releaseDate: string;
    /** Movie's director */
    director: string;
    /** Movie's opening crawl */
    openingCrawl: string;
    /** Date when the entry was created */
    created: string;
    /** Date when the entry was edited */
    edited: string;
    /** Characters taken place in the certain movie */
    characters: null;
    /** Particular episode's id */
    episodeId: number | string,
    /** Planets taken place in the certain movie */
    planets: null,
    /** Species taken place in the certain movie */
    species: null,
    /** Starships taken place in the certain movie */
    starships: null,
    /** Vehicles taken place in the certain movie */
    vehicles: null,
    /** Document index from the db */
    docId: string;
    /** Link to model */
    model: string;
    /** Personal key */
    pk: number;
}