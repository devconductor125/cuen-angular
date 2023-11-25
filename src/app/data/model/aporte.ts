import {AporteEspecie} from './aporteEspecie';

export class Aporte {
  id: string;
  asociado_id: string;
  year: number;
  activity_id: string;
  aporte: string;
  type: string;
  budget_species: string;
  species_contribution: Array<AporteEspecie>;
}
