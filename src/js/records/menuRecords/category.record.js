export class CategoryRecord {
  constructor(record) {
    this.id = record.id;
    this.category_name = record.attributes.category_name;
    this.unit = record.attributes.unit;
  }
}
