export class StatusRecord {
  constructor(record) {
    this.id = record.id;
    this.status_name = record.attributes.status_name;
  }
}
