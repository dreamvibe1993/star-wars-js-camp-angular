import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { Movie } from '../models/movie';

@Injectable({
  providedIn: 'root'
})
export class EditionModalService {

  public movieItem: Movie | null = null;

  public movieItemSubject = new BehaviorSubject(this.movieItem)

  constructor() { }
}
