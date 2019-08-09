import { MatPaginatorIntl } from '@angular/material';

export class MatPaginatorIntlEst extends MatPaginatorIntl {
  itemsPerPageLabel = 'Lehekülje suurus';
  nextPageLabel     = 'Järgmine lehekülg';
  previousPageLabel = 'Eelmine lehekülg';

  getRangeLabel = function (page, pageSize, len) {
    let length = len;
    if (length === 0 || pageSize === 0) {
      return '-';
    }
    length = Math.max(length, 0);
    const startIndex = page * pageSize;
    const endIndex = startIndex < length ?
      Math.min(startIndex + pageSize, length) :
      startIndex + pageSize;
    return `${startIndex + 1 } - ${endIndex} ${length}-st`;
  };
}
