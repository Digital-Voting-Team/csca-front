import { AddressRecord } from "@/js/records/address.record";

export class CafeRecord {
  constructor(record, included) {
    this.id = record.id;
    this.cafe_name = record.attributes.cafe_name;
    if (included !== undefined) {
      for (const address of included) {
        if (record.relationships.address.data.id === address.id) {
          this.address = new AddressRecord(address.data);
          break;
        }
      }
    }
  }
}
