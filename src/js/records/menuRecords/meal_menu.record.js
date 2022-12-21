import { MealRecord } from "@/js/records/menuRecords/meal.record";
import { MenuRecord } from "@/js/records/menuRecords/menu.record";

export class MealMenuRecord {
  constructor(record, included) {
    this.id = record.id;
    if (included !== undefined) {
      for (const item of included) {
        if (
          record.relationships.meal.data.id === item.id &&
          item.type === "meal"
        ) {
          this.meal = new MealRecord(item, undefined);
        }

        if (
          record.relationships.menu.data.id === item.id &&
          item.type === "menu"
        ) {
          this.menu = new MenuRecord(item);
        }
      }
    }
  }
}
