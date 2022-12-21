import {MealRecord} from "@/js/records/menuRecords/meal.record";

export class ReceiptRecord {
  constructor(record, included) {
    this.id = record.id;
    this.ingredient_id = record.relationships.ingredient.data.id;
    this.quantity = record.attributes.quantity;
    if (included !== undefined) {
      for (const meal of included) {
        if (record.relationships.meal.data.id === meal.id) {
          this.meal = new MealRecord(meal.data);
          break;
        }
      }
    }
  }
}
