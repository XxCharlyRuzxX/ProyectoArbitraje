import { CardType } from '@model/sportcard/CardType';
import { SportCardFactory } from './SportCardFactory';
import {
  DisciplinaryCardGenerator,
  MatchCardGenerator,
  NgCardGenerator,
} from '../generator';

export const buildSportCardFactory = (): SportCardFactory =>
  new SportCardFactory()
    .register(CardType.MATCH, MatchCardGenerator)
    .register(CardType.DISCIPLINARY, DisciplinaryCardGenerator)
    .register(CardType.NG_CARD, NgCardGenerator);
