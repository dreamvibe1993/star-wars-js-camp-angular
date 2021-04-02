import { Pipe, PipeTransform } from '@angular/core';
import { orderBy } from 'lodash';

import { Movie } from '../models/movie';

/** Pipe to sort my movies table according the newest or oldest date */
@Pipe({
    name: 'sort',
})

export class SortingPipe implements PipeTransform {
    /**
     * Sorts the tables data according their dates.
     * @param dataToSort Leftside pipe's assigned data.
     * @param order The sort order.
     * @param column Table column's name.
     */
    public transform(dataToSort: Movie[], order: string = '', column: string = ''): Movie[] {
        const dataToSortCopy = dataToSort.slice(0);
        if (!dataToSortCopy || order === '' || !order) {
            return dataToSortCopy;
        }
        if (dataToSortCopy.length <= 1) {
            return dataToSortCopy;
        }
        if (!column || column === '') {
            if (order === 'asc') {
                return dataToSortCopy.sort((prev: Movie, next: Movie) => {
                    return new Date(prev.releaseDate).valueOf() - new Date(next.releaseDate).valueOf();
                });
            }
            if (order === 'desc') {
                return dataToSortCopy.sort((prev: Movie, next: Movie) => {
                    return new Date(next.releaseDate).valueOf() - new Date(prev.releaseDate).valueOf();
                });
            }
        }
        return orderBy(dataToSortCopy, [column], [order]);
    }
    
} 
