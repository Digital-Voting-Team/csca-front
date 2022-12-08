export class StaffRecord {
  constructor(record) {
    this.id = record.id;
    this.employment_date = record.attributes.employment_date;
    this.salary = record.attributes.salary;
    this.status = record.attributes.status;
  }
}
