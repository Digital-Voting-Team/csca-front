import { PersonRecord } from "@/js/records/person.record";
import { PositionRecord } from "@/js/records/position.record";

export class CustomerRecord {
  constructor(record, included) {
    this.id = record.id;
    this.registration_date = record.attributes.registration_date;
    this.user_id = record.relationships.user.data.id;
    if (included !== undefined) {
      for (const item of included) {
        if (
          record.relationships.person.data.id === item.id &&
          item.type === "person"
        ) {
          this.person = new PersonRecord(item.data, undefined);
        }
      }
    }
  }
}
