import { Pipe, PipeTransform } from '@angular/core';
import { NpmPackage } from 'src/app/models/NpmPackage';

@Pipe({
  name: 'shortener',
})
export class ShortenerPipe implements PipeTransform {
  /**
   * Если число скачиваний npm пакета превышает 1000, то оно будет округлено вниз до тысяч с буквой «К»
   * @param npmPackages Массив с данными о npm пакетах
   * @returns Измененный массив с данными о пакетах.
   */
  transform(npmPackages: NpmPackage[]): NpmPackage[] {
    if (npmPackages) {
      return npmPackages.map((npmPackage) => {
        if (+npmPackage.weeklyDownloads > 1000) {
          let thousands = Math.floor(+npmPackage.weeklyDownloads / 1000);
          npmPackage.weeklyDownloads = `${thousands}K`;
        }
        return npmPackage;
      });
    }
    return npmPackages;
  }
}
