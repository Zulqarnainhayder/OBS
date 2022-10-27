import Storage from "src/services/storage";

const mutation = {
  showCompanyList(state, list){
    state.companiesList = list
  }
};

export default mutation;
