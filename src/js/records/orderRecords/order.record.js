import {StatusRecord} from "@/js/records/orderRecords/status.record";

export class OrderRecord {
  constructor(record, included) {
    this.id = record.id;
    this.customer_id = record.relationships.customer.data.id;
    this.staff_id = record.relationships.staff.data.id;
    this.cafe_id = record.relationships.cafe.data.id;
    this.total_price = record.attributes.total_price;
    this.payment_method = record.attributes.payment_method;
    this.is_take_away = record.attributes.is_take_away;
    this.order_date = record.attributes.order_date;
    if (included !== undefined) {
      for (const stat of included) {
        if (record.relationships.status.data.id === stat.id) {
          this.status = new StatusRecord(stat);
          break;
        }
      }
    }
  }
}
