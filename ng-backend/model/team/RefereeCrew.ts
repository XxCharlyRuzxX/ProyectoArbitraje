export default class RefereeCrew {
  readonly referee: string;
  readonly assistant1?: string;
  readonly assistant2?: string;
  readonly fourthOfficial?: string;

  constructor(
    referee: string,
    assistant1?: string,
    assistant2?: string,
    fourthOfficial?: string,
  ) {
    this.referee = referee;
    this.assistant1 = assistant1;
    this.assistant2 = assistant2;
    this.fourthOfficial = fourthOfficial;
  }
}
