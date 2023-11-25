import {AporteEspecie} from './aporteEspecie';

export class AporteList {
  id: string;
  associated: string;
  project: string;
  program: string;
  activity: string;
  budget: string;
  paid_budget: string;
  committed_budget: string;
  type: string;
  year: string;
  budget_species: string;
  species_contribution: Array<AporteEspecie>;
}
