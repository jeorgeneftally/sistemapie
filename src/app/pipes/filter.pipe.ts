import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

  transform(value: any, arg: any): any {
    const resultEstudiantes=[];
    for(const mostrarestudiantes of value){
      if(mostrarestudiantes.nombre.toLowerCase().indexOf(arg.toLowerCase())>-1 || mostrarestudiantes.apellido.toLowerCase().indexOf(arg.toLowerCase())>-1
      || mostrarestudiantes.fecha_nacimiento.toLowerCase().indexOf(arg.toLowerCase())>-1
      || mostrarestudiantes.rut.toLowerCase().indexOf(arg.toLowerCase())>-1
      || mostrarestudiantes.curso.toLowerCase().indexOf(arg.toLowerCase())>-1){
        resultEstudiantes.push(mostrarestudiantes);
      };
    };
    return resultEstudiantes;
  }
  
}
