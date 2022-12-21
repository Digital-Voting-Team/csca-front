import {OrderRecord} from "@/js/records/orderRecords/order.record";

export class OrderItemRecord {
  constructor(record, included) {
    this.id = record.id;
    this.meal_id = record.relationships.meal.data.id;
    this.quantity = record.attributes.quantity;
    if (included !== undefined) {
      for (const ord of included) {
        if (record.relationships.order.data.id === ord.id) {
          this.order = new OrderRecord(ord, undefined);
          break;
        }
      }
    }
  }
}
