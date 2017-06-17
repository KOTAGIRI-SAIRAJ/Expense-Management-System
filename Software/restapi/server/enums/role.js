/**
 * Created by semanticbit on 16/6/17.
 */

const roleStatus = {
  "Manager": { code: "Manager", value: "Manager" },
  "Staff": { code: "Staff", value: "Staff" },
  "ExpenseAdmin": { code: "ExpenseAdmin", value: "ExpenseAdmin" }
};

let role = {
  values: Object.keys(roleStatus),
  value(code) {
    return roleStatus[code].code;
  }
};

role = Object.assign(roleStatus, role);
module.exports = role;

