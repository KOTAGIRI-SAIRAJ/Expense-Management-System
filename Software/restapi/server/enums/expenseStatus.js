/**
 * Created by semanticbit on 17/6/17.
 */
const expenseStatus = {
  "Draft": { code: "Draft", value: "Draft" },
  "Submitted": { code: "Submitted", value: "Submitted" },
  "Rejected": { code: "Rejected", value: "Rejected" },
  "Approved": { code: "Approved", value: "Approved" },
  "Settled": { code: "Settled", value: "Settled" }
};

let exp_Status = {
  values: Object.keys(expenseStatus),
  value(code) {
    return expenseStatus[code].code;
  }
};

exp_Status = Object.assign(expenseStatus, exp_Status);
module.exports = exp_Status;
