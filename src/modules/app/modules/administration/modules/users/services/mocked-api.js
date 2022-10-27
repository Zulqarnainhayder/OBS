import { makeApiResponse } from "src/services/mocked-response";

const users = [
  {
    id: 1,
    userName : "user 1",
    userEmail : "user1@gmail.com",
    userType : "Internal User",
    language : "English",
    company : [{id: 'a', label:'company 1'}],
    active: true
  },
  {
    id: 2,
    userName : "user 2",
    userEmail : "user2@gmail.com",
    userType : "Internal User",
    language : "Arabic",
    company : [{id: 'a', label:'company 1'}, {id: 'b', label:'company 2'}],
    active: true
  },
]
const logfiles = [
  {
    id: 1,
    userName : "user 1",
    userEmail : "user1@gmail.com",
    userType : "Internal User",
    date : "22/03//2022 03:30:13 PM",
    file : "Module name > Doc. Name > Doc. no",
    company : [{id: 'a', label:'company 1'}],
  },
  {
    id: 2,
    userName : "user 2",
    userEmail : "user2@gmail.com",
    userType : "Internal User",
    date : "22/03//2022 03:30:13 PM",
    file : "Module name > Doc. Name > Doc. no",
    company : [{id: 'a', label:'company 1'}, {id: 'b', label:'company 2'}],
  },
]



export default {
  getUsers: () => makeApiResponse({ items: users }),
  getUserById: () => (getUser) => makeApiResponse({ getItems: users.filter(item => item.id !== getUser.id) }),
  addUser: () => (addedUser) => makeApiResponse({ editedItems: users.filter(item => item.id !== addedUser.id) }),
  editUser: () => (editedUser) => makeApiResponse({ editedItems: users.filter(item => item.id !== editedUser.id) }),
  deleteUser: () => (deletedUser) => makeApiResponse({ editedItems: users.filter(item => item.id !== deletedUser.id) }),
  duplicateUser: () => (duplicatedUser) => makeApiResponse({ duplicatedItems: users.filter(item => item.id !== duplicatedUser.id) }),
  getFiles: () => makeApiResponse({ items: logfiles }),
};
