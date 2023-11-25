export class BudgetListItemProcedimiento {
  id: number;
  name: string;
  description: string;
}

export class BudgetListItemPredio {
  id: number;
  property_name: string;
  colanta_partner?: any;
  milk_merchant?: any;
  visit_date?: any;
  property_type: string;
  other?: any;
  nit?: any;
  retail_name?: any;
  address?: any;
  address_municipality?: any;
  reservoir?: any;
  micro_basin?: any;
  sector?: any;
  hydrological_source?: any;
  info_json_general?: any;
  main_coordinate: string;
  property_correlation_id?: any;
  created_at: string;
  updated_at: string;
}

export class BudgetListItemTask {
  id: number;
  title: string;
  description: string;
  date_start: string;
  date_end: string;
}

export class BudgetListItem {
  presupuesto: number;
  predio: BudgetListItemPredio;
  tarea: BudgetListItemTask;
  procedimiento: BudgetListItemProcedimiento;
}
