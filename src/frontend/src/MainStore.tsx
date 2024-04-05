import { makeObservable, observable, action } from "mobx";

export class MainStore {
  exampleVariable: string = "";

  constructor() {
    makeObservable(this, {
      exampleVariable: observable,
      exampleSetterFunction: action,
    });
  }

  exampleSetterFunction(newText: string) {
    this.exampleVariable = newText.trim();
  }
}

const MS = new MainStore();

export default MS;
