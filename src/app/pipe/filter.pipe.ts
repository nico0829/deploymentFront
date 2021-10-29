import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

  transform(value: any, arg: any): any {
    const resultFilter = [];
    for(const registro of value) {
      if (registro.nombre.indexOf(arg) > -1) {
        resultFilter.push(registro);
      }
    }
    return resultFilter;
  }

}
