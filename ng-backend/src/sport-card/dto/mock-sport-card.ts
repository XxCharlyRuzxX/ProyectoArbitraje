import SportCard from '@model/sportcard/SportCard';
import PlayerEntry from '@model/team/players/PlayerEntry';
import PlayersList from '@model/team/players/PlayersList';
import Substitution from '@model/team/Substitution';
import SubstitutionList from '@model/team/SubstitutionList';
import CardEvent from '@model/team/discipline/CardEvent';
import TeamStaff from '@model/team/TeamStaff';
import Teamsheet from '@model/team/Teamsheet';
import TeamDiscipline from '@model/team/discipline/TeamDiscipline';
import DisciplinaryReport from '@model/team/discipline/DisciplinaryReport';
import RefereeCrew from '@model/team/RefereeCrew';

const playerA1 = Object.assign(new PlayerEntry(), {
  jerseyNumber: 10,
  lastname: 'García',
  firstname: 'Carlos',
  goalMinutes: [23, 67],
});

const playerA2 = Object.assign(new PlayerEntry(), {
  jerseyNumber: 7,
  lastname: 'López',
  firstname: 'Mario',
  goalMinutes: [],
});

const playerB1 = Object.assign(new PlayerEntry(), {
  jerseyNumber: 9,
  lastname: 'Martínez',
  firstname: 'Luis',
  goalMinutes: [45],
});

const playerB2 = Object.assign(new PlayerEntry(), {
  jerseyNumber: 11,
  lastname: 'Hernández',
  firstname: 'Pedro',
  goalMinutes: [],
});

export const mockSportCard: SportCard = Object.assign(new SportCard(), {
  idCard: 'CARD-001',
  refereeCrew: Object.assign(new RefereeCrew(), {
    referee: 'Juan Pérez Matinez Suazo',
    assistant1: 'Roberto Sánchez',
    assistant2: 'Miguel Torres',
    fourthOfficial: 'Andrés Ruiz',
  }),
  matchInfo: {
    competitionName: 'Liga Municipal 2024',
    date: new Date('2024-03-16'),
    time: '16:00',
    fieldName: 'Estadio Municipal',
    city: 'Mérida',
    firstHalfStart: '16:05',
    secondHalfStart: '17:00',
    score: {
      homeScore: 2,
      awayScore: 1,
    },
  },
  homeTeam: Object.assign(new Teamsheet(), {
    teamName: 'Deportivo Mérida',
    captain: 'García Carlos',
    staff: Object.assign(new TeamStaff(), {
      coach: 'Francisco Díaz',
      doctor: 'Dr. Ramírez',
      fitnessCoach: 'Ernesto Vega',
      assistants: ['Asistente 1'],
    }),
    players: (() => {
      const list = new PlayersList();
      list['items'] = [playerA1, playerA2];
      return list;
    })(),
    substitutions: (() => {
      const subList = new SubstitutionList();
      subList['items'] = [
        Object.assign(new Substitution(), {
          playerIn: playerA2,
          playerOut: playerA1,
          minute: 70,
        }),
      ];
      return subList;
    })(),
  }),
  awayTeam: Object.assign(new Teamsheet(), {
    teamName: 'Atlético Cancún',
    captain: 'Martínez Luis',
    staff: Object.assign(new TeamStaff(), {
      coach: 'Héctor Morales',
      doctor: 'Dr. Fuentes',
      fitnessCoach: 'Omar Castillo',
      assistants: [],
    }),
    players: (() => {
      const list = new PlayersList();
      list['items'] = [playerB1, playerB2];
      return list;
    })(),
    substitutions: (() => {
      const subList = new SubstitutionList();
      subList['items'] = [];
      return subList;
    })(),
  }),
  disciplinaryReport: Object.assign(new DisciplinaryReport(), {
    homeDiscipline: Object.assign(new TeamDiscipline(), {
      teamName: 'Deportivo Mérida',
      yellowCards: [
        Object.assign(new CardEvent(), {
          player: playerA2,
          reason: 'Juego brusco',
          description: 'Entrada fuerte al rival en el centro del campo',
          minute: 34,
        }),
      ],
      redCards: [],
    }),
    awayDiscipline: Object.assign(new TeamDiscipline(), {
      teamName: 'Atlético Cancún',
      yellowCards: [],
      redCards: [
        Object.assign(new CardEvent(), {
          player: playerB1,
          reason: 'Doble amonestación',
          description: 'Segunda tarjeta amarilla por protestar',
          minute: 78,
        }),
      ],
    }),
  }),
  observations: [
    'Incidente menor en el túnel de vestidores al finalizar el partido.',
    'El balón oficial fue proporcionado por el equipo local.',
  ],
});
