export class MenuRecord {
  constructor(record, included) {
    this.id = record.id;
    this.cafe_id = record.relationships.cafe.data.id;
  }
}
