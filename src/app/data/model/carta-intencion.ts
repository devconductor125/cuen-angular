export interface VisitDate {
  day: string;
  month: string;
  year: string;
}

export interface Contact {
  contact_email: string;
  contact_id_card_number: number;
  contact_land_line_number: number;
  contact_mobile_number: number;
  contact_name: string;
}

export interface GeneralInfo {
  municipality?: any;
  hydrological_source?: any;
  lane?: any;
  visit_date: VisitDate;
  contact: Contact;
}

export interface Material {
  id: number;
  name: string;
  price: string;
  measurement: string;
  type: string;
  unit_id: number;
  unit_name: string;
  created_at: string;
  updated_at: string;
}

export interface Action {
  id: number;
  name: string;
  type: string;
  length: string;
  value: string;
  material: Material;
  color: string;
  created_at: string;
  updated_at: string;
}

export interface Budget {
  action: Action;
}

export interface CartaIntencion {
  general_info: GeneralInfo;
  budget: Budget[];
}
