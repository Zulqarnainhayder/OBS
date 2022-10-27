import { makeApiResponse } from "src/services/mocked-response";

const account = {
  accCategory: 1,
  accountType: 1,
  currencyId: 1,
  isActive: true,
  mainGroupId: 6,
  name: "name 1",
  no: "num",
  postingtype: 1,
  tagIds: [12],
  typical: 1,
}

const group = {
  mainGroupId: 3,
  no: "num",
  name: "name 1",
  currencyId: 1,
  postingtype: 1,
  typical: 1
}

export default {
  getAccount : () => makeApiResponse(account),
  createAccount: (account) => makeApiResponse(account),
  editAccount: (account) => makeApiResponse({items: {...account, typical: "Credit"}}),
  getGroup : () => makeApiResponse(group),
  createGroup: (group) => makeApiResponse(group),
  editGroup: (group) => makeApiResponse({items: {...group, typical: "Credit"}})
};
