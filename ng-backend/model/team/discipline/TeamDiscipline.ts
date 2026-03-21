import CardEvent from './CardEvent';

export default class TeamDiscipline {
  readonly yellowCards: CardEvent[];
  readonly redCards: CardEvent[];

  constructor() {
    this.yellowCards = [];
    this.redCards = [];
  }

  addYellowCard(card: CardEvent): void {
    this.yellowCards.push(card);
  }

  addRedCard(card: CardEvent): void {
    this.redCards.push(card);
  }

  addYellowCards(cards: CardEvent[]): void {
    for (const card of cards) {
      this.addYellowCard(card);
    }
  }

  addRedCards(cards: CardEvent[]): void {
    for (const card of cards) {
      this.addRedCard(card);
    }
  }
}
