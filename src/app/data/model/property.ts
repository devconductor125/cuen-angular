declare module propertyInterface {

  export interface BasicSanitationMethods {
    no_stard_household: string;
    stard_corrective_maintenance: boolean;
    stard_corrective_maintenance_quantity: string;
    stard_household: string;
    stard_preventive_maintenance: boolean;
    stard_preventive_maintenance_quantity: string;
  }

  export interface CookingMethods {
    biodigester: boolean;
    electricity: boolean;
    firewood: boolean;
    gas_bottle: boolean;
    natural_gas: boolean;
    other: string;
  }

  export interface ElectricitySource {
    candles: boolean;
    network: boolean;
    other: string;
    solar_energy: boolean;
    station: boolean;
  }

  export interface HydrologicalSource {
    municipal_aqueduct: boolean;
    other: string;
    rain_water: boolean;
    spring: boolean;
  }

  export interface BasicNeeds {
    aqueduct_network: boolean;
    basic_sanitation_methods: BasicSanitationMethods;
    cooking_methods: CookingMethods;
    electrical_network: boolean;
    electricity_source: ElectricitySource;
    hydrological_source: HydrologicalSource;
    sewerage_system: boolean;
  }

  export interface Contact {
    contact_email: string;
    contact_id_card_number: string;
    contact_land_line_number: string;
    contact_mobile_number: string;
    contact_name: string;
  }

  export interface EconomicActivityInTheProperty {
    agriculture: boolean;
    chemical: boolean;
    commercial: boolean;
    dairy_cattle: boolean;
    dual_purpose_cattle: boolean;
    good_practices_certification: boolean;
    handwork: boolean;
    latitude: string;
    longitude: string;
    machining: boolean;
    other: string;
    porcine_farming: boolean;
    poultry_farming: boolean;
    production_area: string;
    property_area: string;
    recreational: boolean;
    residential: boolean;
    self_consumption: boolean;
    tillage_methods: boolean;
  }

  export interface EnvironmentalDamage {
    burning: boolean;
    burning_quantity: string;
    comments: string;
    erosion: boolean;
    erosion_quantity: string;
    natives_logging: boolean;
    natives_logging_quantity: string;
    others: string;
    wetland_desiccation: boolean;
    wetland_desiccation_quantity: string;
  }

  export interface FamilyInformation {
    auditive_disability: boolean;
    cognitive_disability: boolean;
    disability_in_family_member: boolean;
    is_registered: boolean;
    man_household: boolean;
    motor_disability: boolean;
    other_disability: string;
    victimized_population: boolean;
    visual_disability: boolean;
    which_disability?: any;
    woman_household: boolean;
  }

  export interface NaturalEcosystemsInTheProperty {
    contaminated: string;
    erosion: string;
    mountainside_forest: boolean;
    mountainside_forest_score: number;
    protected_source: string;
    riverbank_area: boolean;
    riverbank_area_score: string;
    riverbank_forest: boolean;
    riverbank_forest_score: string;
    spring: boolean;
    spring_score: string;
    un_protected: string;
  }

  export interface PropertyLegalStatus {
    comments: string;
    possession: boolean;
    succession: boolean;
    tenant_status: boolean;
    value: number;
  }

  export interface PropertyType {
    commercial: boolean;
    other?: any;
    property_other: boolean;
    residential: boolean;
    value: number;
  }

  export interface PropertyVisitDate {
    day: string;
    month: string;
    year: string;
  }

  export interface AreThereAgriculturalActivitiesInTheProperty {
    chemical_fertilizers: boolean;
    fertilizers_brands: string;
    fertilizers_description: string;
    organic_fertilizers: boolean;
    pesticides: boolean;
  }

  export interface ChemicalAndOrCattleRaisingHandling {
    burning: boolean;
    burying: boolean;
    delivery_to_a_collecting_entity_without_separation: boolean;
    other_describe: string;
    separation_and_delivery_to_a_collecting_entity: boolean;
  }

  export interface DomesticSolidWasteHarvestingHandling {
    burning: boolean;
    harnessing: boolean;
    none: boolean;
    recycling: boolean;
    separation: boolean;
  }

  export interface SewerageSystemLastMaintenanceDate {
    cant_remember: boolean;
    never: boolean;
    years12: boolean;
    years23: boolean;
    years34: boolean;
  }

  export interface SheddingLicence {
    in_process: boolean;
    no: boolean;
    yes: boolean;
  }

  export interface SheddingLocation {
    hydrological_source: boolean;
    municipal_aqueduct: boolean;
    soil: boolean;
    spring: boolean;
  }

  export interface SheddingPeriodicity {
    continuous: boolean;
    intermittent: boolean;
  }

  export interface SheddingSchedule {
    hours24: boolean;
    hours24_to12: boolean;
    hours_less_than12: boolean;
  }

  export interface SheddingType {
    distributed: boolean;
    gathered: boolean;
  }

  export interface TreatmentSystemStatus {
    average: boolean;
    bad: boolean;
    good: boolean;
  }

  export interface WaterConcession {
    in_process: boolean;
    no: boolean;
    yes: boolean;
  }

  export interface WhoDoesTheSewerageSystemMaintenance {
    contractor: boolean;
    land_line_number?: any;
    mobile_number?: any;
    other: boolean;
    owner: boolean;
  }

  export interface SheddingCharacteristics {
    ar_treatment_system: boolean;
    are_there_agricultural_activities_in_the_property: AreThereAgriculturalActivitiesInTheProperty;
    chemical_and_or_cattle_raising_handling: ChemicalAndOrCattleRaisingHandling;
    domestic_solid_waste_harvesting_handling: DomesticSolidWasteHarvestingHandling;
    sewerage_system_last_maintenance_date: SewerageSystemLastMaintenanceDate;
    shedding_licence: SheddingLicence;
    shedding_location: SheddingLocation;
    shedding_periodicity: SheddingPeriodicity;
    shedding_schedule: SheddingSchedule;
    shedding_type: SheddingType;
    treatment_system_status: TreatmentSystemStatus;
    water_concession: WaterConcession;
    who_does_the_sewerage_system_maintenance: WhoDoesTheSewerageSystemMaintenance;
  }

  export interface SocioEconomicInformation {
    children: string;
    family_compensation_fund: boolean;
    family_compensation_fund_name: string;
    housing_units: string;
    housing_units_population?: any;
    impacted_housing_units: string;
    impacted_people: string;
    men: string;
    number_of_family_groups: string;
    sisben: boolean;
    sisben_level: string;
    socioeconomic_layer: string;
    why_has_hasnt_family_compensation_fund: string;
    women: string;
  }

  export interface StrategicImportanceOfTheProperty {
    biodiversity_conservation: boolean;
    carbon_bonds_sale_certification: boolean;
    ecological_connectivity: boolean;
    high_degree_of_conservation_forest: boolean;
    productive_water_source: boolean;
    psa: string;
    sequestered_carbon: boolean;
    supply_source: boolean;
    water_quality_improvement: boolean;
    water_regulation: boolean;
  }

  export interface WaysOfAccess {
    can_be_reached_by_car: boolean;
    primary_road: boolean;
    secondary_road: boolean;
    third_class_road: boolean;
    unpaved_road: boolean;
  }

  export interface Property {
    address: string;
    basic_needs: BasicNeeds;
    contact: Contact;
    economic_activity_in_the_property: EconomicActivityInTheProperty;
    environmental_damage: EnvironmentalDamage;
    family_information: FamilyInformation;
    has_been_sent: boolean;
    hydrological_source: string;
    is_new: boolean;
    lane: string;
    micro_basin: string;
    municipality: string;
    natural_ecosystems_in_the_property: NaturalEcosystemsInTheProperty;
    nit: string;
    predio_potencial_id: number;
    property_colanta_partner: boolean;
    property_correlation: string;
    property_correlation_id: number;
    property_correlation_other?: any;
    property_legal_status: PropertyLegalStatus;
    property_milk_merchant: boolean;
    property_name: string;
    property_reservoir?: any;
    property_reservoir_la_fe: boolean;
    property_reservoir_rio_grande: boolean;
    property_retail_name: string;
    property_sector: string;
    property_type: PropertyType;
    property_visit_date: PropertyVisitDate;
    rural_zone: boolean;
    shedding_characteristics: SheddingCharacteristics;
    socio_economic_information: SocioEconomicInformation;
    strategic_importance_of_the_property: StrategicImportanceOfTheProperty;
    township: string;
    urban_zone: boolean;
    ways_of_access: WaysOfAccess;
    zone?: any;
    id?: any;
    type: number;
  }
}
