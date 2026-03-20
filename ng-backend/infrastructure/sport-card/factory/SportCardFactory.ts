import { CardType } from '@model/sportcard/CardType';
import { SportCardGenerator } from '../generator/SportCardGenerator';

type GeneratorConstructor = new () => SportCardGenerator;

export class SportCardFactory {
  private readonly registry = new Map<CardType, GeneratorConstructor>();

  register(type: CardType, generator: GeneratorConstructor): this {
    this.registry.set(type, generator);
    return this;
  }

  create(type: CardType): SportCardGenerator {
    const Generator = this.registry.get(type);

    if (!Generator) {
      throw new Error(`Card type not supported: ${String(type)}`);
    }

    return new Generator();
  }
}
