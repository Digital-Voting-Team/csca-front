import { PersonRecord } from "@/js/records/person.record";
import { PositionRecord } from "@/js/records/position.record";

export class StaffRecord {
  constructor(record, included) {
    this.id = record.id;
    this.employment_date = record.attributes.employment_date;
    this.salary = record.attributes.salary;
    this.status = record.attributes.status;
    this.cafe_id = record.relationships.cafe.data.id;
    this.user_id = record.relationships.user.data.id;
    if (included !== undefined) {
      for (const item of included) {
        if (
          record.relationships.person.data.id === item.id &&
          item.type === "person"
        ) {
          this.person = new PersonRecord(item, undefined);
        }

        if (
          record.relationships.position.data.id === item.id &&
          item.type === "position"
        ) {
          this.position = new PositionRecord(item);
        }
      }
    }
  }
}
