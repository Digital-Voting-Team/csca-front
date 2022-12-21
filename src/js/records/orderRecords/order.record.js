import {StatusRecord} from "@/js/records/orderRecords/status.record";
import {PersonRecord} from "@/js/records/person.record";
import {PositionRecord} from "@/js/records/staffRecords/position.record";

export class OrderRecord {
  constructor(record, included) {
    this.id = record.id;
    if (record.relationships.customer.data !== undefined) {
      this.customer_id = record.relationships.customer.data.id;
    }
    if (record.relationships.staff.data !== undefined) {
      this.staff_id = record.relationships.staff.data.id;
    }
    if (record.relationships.cafe.data !== undefined) {
      this.cafe_id = record.relationships.cafe.data.id;
    }
    this.total_price = record.attributes.total_price;
    this.payment_method = record.attributes.payment_method;
    this.is_take_away = record.attributes.is_take_away;
    this.order_date = record.attributes.order_date;
    if (included !== undefined) {
      for (const item of included) {
        if (
          record.relationships.status.data.id === item.id &&
          item.type === "status"
        ) {
          this.status = new StatusRecord(item);
        }

        //TODO work with included in a better manner
      }
    }
  }
}
