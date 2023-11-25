export class Species {
  id: number;
  quantity: number;
  description: string;
  price_unit: string;
  used: number;
  balance: number;
  newBalance: number;
  contributions_id: number;
  created_at: string;
  updated_at: string;
  selected: boolean;
}

export class SpeciesContribution {
  id: number;
  inversion_specie: string;
  paid?: any;
  committed: string;
  balance: string;
  associated_id: number;
  associated_name: string;
  species: Species[];
}
