import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'boolPipe'
})
export class BoolPipe implements PipeTransform {

  transform(value: boolean): string {
    return value ? '<i class="material-icons">done</i>' : '<i class="material-icons">clear</i>';

  }

}
