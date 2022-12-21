import { CategoryRecord } from "@/js/records/menuRecords/category.record";

export class MealRecord {
  constructor(record, included) {
    this.id = record.id;
    this.meal_name = record.attributes.meal_name;
    this.price = record.attributes.price;
    this.amount = record.attributes.amount;
    if (included !== undefined) {
      for (const cat of included) {
        if (record.relationships.category.data.id === cat.id) {
          this.category = new CategoryRecord(cat, undefined);
          break;
        }
      }
    }
  }
}
