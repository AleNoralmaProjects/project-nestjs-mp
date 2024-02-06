import { Controller, Get, Query } from '@nestjs/common';
import { FichaFamiliarService } from './ficha-familiar.service';

@Controller('ficha-familiar')
export class FichaFamiliarController {
  constructor(private readonly fichaFamiliarService: FichaFamiliarService) {}

  /* @Get('familias/:id')
  async getFamilias(@Param('id') id: number, @Query('year') year: string) {
    return this.fichaFamiliarService.getFamilias(id, year);
  } */

  @Get('location')
  getLocation(
    @Query('year') year: string,
    @Query('age') age: string,
    @Query('rbiological') rbiological: number,
    @Query('renvironmental') renvironmental: string,
    @Query('rsocioeconomic') rsocioeconomic: string,
    @Query('gpriority') gpriority: string,
    @Query('gvulnerable') gvulnerable: string,
  ) {
    return this.fichaFamiliarService.getLocation(
      year,
      age,
      rbiological,
      renvironmental,
      rsocioeconomic,
      gpriority,
      gvulnerable,
    );
  }

  @Get('categories')
  getCategories() {
    return this.fichaFamiliarService.getCategories();
  }

  @Get('searchId')
  getSearchId(@Query('cedula') cedula: string) {
    return this.fichaFamiliarService.getSearchId(cedula);
  }

  @Get('pregnats')
  getPregnats(@Query('year') year: string) {
    return this.fichaFamiliarService.getPregnats(year);
  }
}
