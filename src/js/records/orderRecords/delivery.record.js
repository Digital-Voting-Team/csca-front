import {OrderRecord} from "@/js/records/orderRecords/order.record";
import {AddressRecord} from "@/js/records/address.record";

export class DeliveryRecord {
  constructor(record, included) {
    this.id = record.id;
    this.staff_id = record.relationships.staff.data.id;
    this.delivery_price = record.attributes.delivery_price;
    this.delivery_date = record.attributes.delivery_date;
    if (included !== undefined) {
      for (const item of included) {
        if (
          record.relationships.order.data.id === item.id &&
          item.type === "order"
        ) {
          this.order = new OrderRecord(item, undefined);
        }

        if (
          record.relationships.address.data.id === item.id &&
          item.type === "address"
        ) {
          this.address = new AddressRecord(item);
        }
      }
    }
  }
}
