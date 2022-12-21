export class PositionRecord {
  constructor(record) {
    this.id = record.id;
    this.name = record.attributes.name;
    this.access_level = record.attributes.access_level;
  }
}
