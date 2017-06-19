/**
 * Created by semanticbit on 17/6/17.
 */
const expenseType = {
  "Pre-populated data - Office": { code: "Pre-populated data - Office", value: "Pre-populated data - Office" },
  "Recruitment": { code: "Recruitment", value: "Recruitment" },
  "Hotel": { code: "Hotel", value: "Hotel" },
  "Airfare": { code: "Airfare", value: "Airfare" },
  "FoodForStaff": { code: "FoodForStaff", value: "FoodForStaff" }
};

let expense_type = {
  values: Object.keys(expenseType),
  value(code) {
    return expenseType[code].code;
  }
};

expense_type = Object.assign(expenseType, expense_type);
module.exports = expense_type;
