import {OrderRecord} from "@/js/records/orderRecords/order.record";

export class OrderItemRecord {
  constructor(record, included) {
    this.id = record.id;
    this.meal_id = record.relationships.meal.data.id;
    this.quantity = record.attributes.quantity;
    if (included !== undefined) {
      for (const item of included) {
        if (
          record.relationships.order.data.id === item.id &&
          item.type === "order"
        ) {
          this.order = new OrderRecord(item, undefined);
        }
      }
    }
  }
}
