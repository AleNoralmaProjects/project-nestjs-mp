import { Controller, Get, Param, Query } from '@nestjs/common';
import { FichaFamiliarService } from './ficha-familiar.service';

@Controller('ficha-familiar')
export class FichaFamiliarController {
  constructor(private readonly fichaFamiliarService: FichaFamiliarService) {}

  @Get('location')
  getLocation(
    @Query('year') year: string,
    @Query('age') age: string,
    @Query('gender') gender: string,
    @Query('rbiological') rbiological: string,
    @Query('renvironmental') renvironmental: string,
    @Query('rsocioeconomic') rsocioeconomic: string,
    @Query('gpriority') gpriority: string,
    @Query('gvulnerable') gvulnerable: string,
  ) {
    return this.fichaFamiliarService.getLocation(
      year,
      age,
      gender,
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

  @Get('risk-pregnats/:typep')
  getLocationPregnats(@Param('typep') typep: number) {
    return this.fichaFamiliarService.getLocationPregnats(typep);
  }

  @Get('risk-obesity/:typeo')
  getLocationObesity(@Param('typeo') typeo: boolean) {
    return this.fichaFamiliarService.getLocationObesity(typeo);
  }

  @Get('obesity-children')
  getObesityChildren(@Query('year') year: string) {
    return this.fichaFamiliarService.getObesityChildren(year);
  }

  @Get('malnutrition-children')
  getMalnutritionChildren(@Query('year') year: string) {
    return this.fichaFamiliarService.getMalnutritionChildren(year);
  }

  @Get('risk-malnutrition/:typem')
  getLocationMalnutrition(@Param('typem') typem: number) {
    return this.fichaFamiliarService.getLocationMalnutrition(typem);
  }

  @Get('disability')
  getDisability(@Query('year') year: string) {
    return this.fichaFamiliarService.getDisability(year);
  }

  @Get('risk-disability/:typed')
  getLocationDisability(@Param('typed') typed: string) {
    return this.fichaFamiliarService.getLocationDisability(typed);
  }

  @Get('diseases')
  getDiseases(@Query('year') year: string) {
    return this.fichaFamiliarService.getDiseases(year);
  }

  @Get('risk-diseases/:typeds')
  getLocationDiseases(
    @Param('typeds') typeds: string,
    @Query('typeds2') typeds2: string,
  ) {
    return this.fichaFamiliarService.getLocationDiseases(typeds, typeds2);
  }

  @Get('personprior')
  getPersonPrior(@Query('year') year: string) {
    return this.fichaFamiliarService.getPersonPrior(year);
  }

  @Get('risk-personprior/:typep')
  getLocationPersonPrior(@Param('typep') typep: string) {
    return this.fichaFamiliarService.getLocationPersonPrior(typep);
  }
}
