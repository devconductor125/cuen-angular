export class ProcedureActivity {
  id: number;
  name: string;
  created_at: string;
  updated_at: string;
  associated_contribution: AssociatedContribution[];
}

export class AssociatedContribution {
  id: number;
  inversion: string;
  inversion_origin: string;
  inversion_species: string;
  paid?: any;
  committed: string;
  committed_balance: string;
  balance: string;
  year: number;
  type: number;
  associated_id: number;
  associated_name: string;
  project_activity_id: number;
  created_at: string;
  updated_at: string;
}
