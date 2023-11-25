export class DetailsBudgets {
  id: number;
  program = '0';
  project = '0';
  activity = '0';
  action =  '0';
  detail = '0';
  associated: any = '0';
  value = '0';
  unit_measurement: string;
  quantity_measurement: '0';
  benefit_factor: string;
  value_unit = '0';
  dedication: string;
  quantity= '0';
  year: number;

  constructor() {
    this.year = 0;
  }
}
