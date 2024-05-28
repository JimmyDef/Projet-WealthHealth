export class ListFormatter {
  constructor(list, listName) {
    this._list = list;
    this._name = listName;
  }
  getData() {
    if (this._name === "departmentList") {
      const departmentList = this._list.map((department) => {
        return {
          value: department.name,
          label: department.name,
        };
      });
      return departmentList;
    }
    if (this._name === "countryList") {
      const countryList = this._list.map((country) => {
        return {
          value: country.abbreviation,
          label: country.name,
        };
      });
      return countryList;
    }
  }
}
