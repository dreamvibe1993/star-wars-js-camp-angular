/** Camelcase is disabled because It's needed to return the data back to d_base intact */
/* eslint-disable camelcase */
/** Person DTO */
export interface PersonDTO {
    fields: {
      /** Person's birth year */
      birth_year: string;
      /** Timestamp when the entry was created */
      created: string;
      /** Timestamp when the entry was edited */
      edited: string;
      /** Person's eyes' color */
      eye_color: string;
      /** Person's gender */
      gender: string;
      /** Person's haircolor */
      hair_color: string;
      /** Person's height */
      height: string;
      /** Person's homeworld */
      homeworld: number;
      /** Person's image */
      image: string;
      /** Person's weight */
      mass: string;
      /** Person's name */
      name: string;
      /** Person's skin color */
      skin_color: string;
    };
    /** Person's model prototype */
    model: string;
    /** Person's  personal key*/
    pk: number;
  }
  