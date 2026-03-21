import { randomUUID } from 'crypto';
import {
  CardEventDto,
  PlayerEntryDto,
  SportCardDto,
  SubstitutionDto,
  TeamsheetDto,
} from '.';
import RefereeCrew from '@model/team/RefereeCrew';
import MatchInfo from '@model/sportcard/MatchInfo';
import SportCard from '@model/sportcard/SportCard';
import Teamsheet from '@model/team/Teamsheet';
import PlayersList from '@model/team/players/PlayersList';
import PlayerEntry from '@model/team/players/PlayerEntry';
import SubstitutionList from '@model/team/SubstitutionList';
import TeamDiscipline from '@model/team/discipline/TeamDiscipline';
import CardEvent from '@model/team/discipline/CardEvent';
import Score from '@model/sportcard/Score';
import TeamStaff from '@model/team/TeamStaff';
import Substitution from '@model/team/Substitution';

export class SportCardMapper {
  static toModel(dto: SportCardDto): SportCard {
    const homeTeam = this.toTeamsheet(dto.homeTeam);
    const awayTeam = this.toTeamsheet(dto.awayTeam);

    return new SportCard(
      randomUUID(),
      this.toRefereeCrew(dto),
      this.toMatchInfo(dto),
      homeTeam,
      awayTeam,
      dto.observations,
    );
  }

  private static toRefereeCrew(dto: SportCardDto): RefereeCrew {
    return new RefereeCrew(
      dto.refereeCrew.referee,
      dto.refereeCrew.assistant1,
      dto.refereeCrew.assistant2,
      dto.refereeCrew.fourthOfficial,
    );
  }

  private static toMatchInfo(dto: SportCardDto): MatchInfo {
    return new MatchInfo(
      dto.matchInfo.competitionName,
      dto.matchInfo.date,
      dto.matchInfo.fieldName,
      dto.matchInfo.city,
      dto.matchInfo.state,
      new Score(dto.matchInfo.score.homeScore, dto.matchInfo.score.awayScore),
      dto.matchInfo.firstHalfStart,
      dto.matchInfo.secondHalfStart,
    );
  }

  private static toTeamsheet(dto: TeamsheetDto): Teamsheet {
    const players = this.toPlayersList(dto.players);
    const captain = this.toPlayerEntry(dto.captain);

    return new Teamsheet(
      dto.teamName,
      captain,
      players,
      this.toSubstitutionList(dto.substitutions, players),
      new TeamStaff(
        dto.staff.coach,
        dto.staff.doctor,
        dto.staff.fitnessCoach,
        dto.staff.assistants,
      ),
      this.toTeamDiscipline(dto.discipline, players),
    );
  }

  private static toPlayersList(dtos: PlayerEntryDto[]): PlayersList {
    const list = new PlayersList();
    for (const dto of dtos) {
      const player = this.toPlayerEntry(dto);
      list.addPlayer(player);
    }
    return list;
  }

  private static toPlayerEntry(dto: PlayerEntryDto): PlayerEntry {
    const player = new PlayerEntry(
      dto.jerseyNumber,
      dto.lastname,
      dto.firstname,
    );
    for (const minute of dto.goalMinutes) {
      player.addGoal(minute);
    }
    return player;
  }

  private static toSubstitutionList(
    dtos: SubstitutionDto[],
    players: PlayersList,
  ): SubstitutionList {
    const list = new SubstitutionList();
    for (const dto of dtos) {
      const substitution = new Substitution(
        this.toPlayerEntry(dto.playerIn),
        this.toPlayerEntry(dto.playerOut),
        dto.minute,
      );
      list.addSubstitution(substitution, players);
    }
    return list;
  }

  private static toTeamDiscipline(
    dto: TeamsheetDto['discipline'],
    players: PlayersList,
  ): TeamDiscipline {
    const discipline = new TeamDiscipline();

    for (const card of dto.yellowCards) {
      discipline.addYellowCard(this.toCardEvent(card, players));
    }
    for (const card of dto.redCards) {
      discipline.addRedCard(this.toCardEvent(card, players));
    }

    return discipline;
  }

  private static toCardEvent(
    dto: CardEventDto,
    players: PlayersList,
  ): CardEvent {
    const player = players.findByNumber(dto.player.jerseyNumber);
    if (!player) {
      throw new Error(
        `El jugador con dorsal ${dto.player.jerseyNumber} no está en el equipo.`,
      );
    }
    return new CardEvent(player, dto.reason, dto.description, dto.minute);
  }
}
