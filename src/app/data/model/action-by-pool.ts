export class Contribution {
  contribution_id: number;
  associated_name: string;
  contribution_value: number;
  budget_id: number;
  origin_id: number;
  contractor_id: string;
}

export class ActionByPool {
  action_id: number;
  action_name: string;
  material_name: string;
  action_value: number;
  new_action_value: number;
  contributions: Contribution[];
  budget: number[][];
  selected: boolean;
  material_id: number;
}
