export class AddressRecord {
  constructor(record) {
    this.id = record.id;
    this.building_number = record.attributes.building_number;
    this.street = record.attributes.street;
    this.city = record.attributes.city;
    this.district = record.attributes.district;
    this.region = record.attributes.region;
    this.postal_code = record.attributes.postal_code;
  }
}
