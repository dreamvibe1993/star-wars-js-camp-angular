import { Injectable } from '@angular/core';

import { MoviesDTO } from '../dto/movies-dto';
import { Movie } from '../models/movie';
import { MovieTransferValue } from '../models/movies-transfer-value';

/** Mapper that creates an object */
@Injectable({
  providedIn: 'root',
})
export class MovieMapperService {
  /** 
   * Mapper 
   * @param payload Data that's need to be mapped.
   * @param docID Doc's collection ID.
  */
  public returnMovieDomainModel(payload: MoviesDTO, docID: string): Movie {
    return {
      director: payload.fields.director,
      docId: docID,
      openingCrawl: this.getRidOfLineBreaks(payload.fields.opening_crawl),
      pk: payload.pk,
      producer: payload.fields.producer,
      releaseDate: payload.fields.release_date,
      title: payload.fields.title,
      characters: payload.fields.characters,
      created: payload.fields.created,
      edited: payload.fields.edited,
      episodeId: payload.fields.episode_id,
      planets: payload.fields.planets,
      species: payload.fields.species,
      starships: payload.fields.starships,
      vehicles: payload.fields.vehicles,
      model: payload.model,
    };
  }
  /** 
   * Returns DTO for backend 
   * @param payload Data a user typed in the form.
   * @indexNumber Entity used for "pk" field. A total number of movies in the db. 
  */
  public returnMovieDTO(payload: MovieTransferValue, indexNumber: number): MoviesDTO {
    return {
      fields: {
        director: payload.director,
        opening_crawl: this.getRidOfLineBreaks(payload.openingCrawl),
        producer: payload.producer,
        release_date: payload.releaseDate,
        title: payload.title,
        created: payload.created ?? new Date().toISOString(),
        edited: new Date().toISOString(),
        episode_id: "",
        characters: [],
        planets: [],
        species: [],
        starships: [],
        vehicles: [],
      },
      pk: indexNumber + 1,
      model: ""
    }
  };
  /**
   * Utility function to convert a column of text
   * into normal format without line breakages.
   * @param openingCrawl The text to convert.
   */
  private getRidOfLineBreaks(openingCrawl: string) {
    if (openingCrawl) {
      return openingCrawl.replace(/[\n\r]+/gm, ' ')
    }
  }
}
