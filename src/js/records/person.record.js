import { AddressRecord } from "@/js/records/address.record";

export class PersonRecord {
  constructor(record, included) {
    this.id = record.id;
    this.name = record.attributes.name;
    this.phone = record.attributes.phone;
    this.email = record.attributes.email;
    this.birthday = record.attributes.birthday;
    if (included !== undefined) {
      for (const addrr of included) {
        if (record.relationships.address.data.id === addrr.id) {
          this.address = new AddressRecord(addrr.data);
          break;
        }
      }
    }
  }
}
