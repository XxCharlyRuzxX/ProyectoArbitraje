import { RefereeCrew } from "../schemas/sport-card";
import { TeamForm ,ObservationsForm, MatchInfoForm} from "../schemas/sport-card-forms";

export type SportCardDraft = {
  matchInfo?: MatchInfoForm;
  refereeCrew?: RefereeCrew;
  homeTeam?: TeamForm;
  awayTeam?: TeamForm;
  observations?: ObservationsForm;
};