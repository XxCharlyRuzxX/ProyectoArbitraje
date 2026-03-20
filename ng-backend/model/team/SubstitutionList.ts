import Substitution from './Substitution';

export default class SubstitutionList {
  private items: Substitution[] = [];

  validate(): boolean {
    return this.items.length <= 5;
  }

  getSubstitutions():  Substitution[] {
    return this.items;
  }
}
