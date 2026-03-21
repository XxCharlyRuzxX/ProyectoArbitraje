import { PDFOptions } from 'puppeteer';
import { SportCardGenerator } from './SportCardGenerator';
import CardEvent from '@model/team/discipline/CardEvent';
import Teamsheet from '@model/team/Teamsheet';

export class DisciplinaryCardGenerator extends SportCardGenerator {
  protected buildHtml(): string {
    const { refereeCrew, matchInfo, awayTeam, homeTeam, observations } =
      this.data;

    return `
      <!DOCTYPE html>
      <html lang="es">
        <head>
          <meta charset="UTF-8">
          <style>${this.getStyles()}</style>
        </head>
        <body>

          <section class="header">
            <p>${matchInfo.city}, ${matchInfo.date.toLocaleDateString('es-MX')}</p>
          </section>

          <section class="discipline">
            ${this.renderTeamDiscipline(awayTeam)}
            ${this.renderTeamDiscipline(homeTeam)}
          </section>

          <section class="incidents">
            <h3>Incidentes</h3>
            <p class="incident-text">
              ${observations?.length ? observations.join('<br/>') : 'Sin incidentes.'}
            </p>
            <p class="reserve-note">
              Me reservo el derecho de ampliar mi informe arbitral en caso de ser necesario.
            </p>
          </section>

          <section class="signature">
            <p>_______________________</p>
            <p><strong>Árbitro: ${refereeCrew.referee}</strong></p>
          </section>

        </body>
      </html>
    `;
  }

  private renderTeamDiscipline(team: Teamsheet): string {
    return `
      <div class="team-discipline">
        <h3>Equipo: ${team.teamName}</h3>

        <h4>Amonestados</h4>
        ${
          team.discipline.yellowCards.length
            ? team.discipline.yellowCards
                .map((e) => this.renderCardEvent(e))
                .join('')
            : '<p class="empty">Ninguno</p>'
        }

        <h4>Expulsados</h4>
        ${
          team.discipline.redCards.length
            ? team.discipline.redCards
                .map((e) => this.renderCardEvent(e))
                .join('')
            : '<p class="empty">Ninguno</p>'
        }
      </div>
    `;
  }

  private renderCardEvent(event: CardEvent): string {
    return `
      <div class="card-event">
        <span class="player-name">
          ${event.player.lastname}, ${event.player.firstname}
        </span>
        <span class="minute">Min. ${event.minute}'</span>
        <span class="reason">${event.reason}</span>
        <p class="description">${event.description}</p>
      </div>
    `;
  }

  protected getPuppeteerOptions(): PDFOptions {
    return {
      format: 'A4',
      landscape: false,
      printBackground: true,
      margin: { top: '15mm', bottom: '15mm', left: '15mm', right: '15mm' },
    };
  }

  private getStyles(): string {
    return `
      * { box-sizing: border-box; margin: 0; padding: 0; }
      body { font-family: Arial, sans-serif; font-size: 11px; padding: 8px; }
      h3 { font-size: 12px; margin: 12px 0 4px; border-bottom: 1px solid #000; padding-bottom: 2px; }
      h4 { font-size: 11px; margin: 8px 0 4px; }
      section { margin-bottom: 16px; }
      .team-discipline { margin-bottom: 20px; }
      .card-event {
        display: flex; flex-wrap: wrap; gap: 8px;
        align-items: baseline;
        border-left: 3px solid #e6c200;
        padding: 4px 8px;
        margin-bottom: 4px;
      }
      .card-event.red { border-left-color: #cc0000; }
      .player-name { font-weight: bold; }
      .minute { color: #555; }
      .reason { font-style: italic; }
      .description { width: 100%; color: #333; margin-top: 2px; }
      .empty { color: #999; font-style: italic; }
      .incidents { border: 1px solid #ccc; padding: 8px; }
      .incident-text { margin-bottom: 8px; min-height: 60px; }
      .reserve-note { font-style: italic; font-size: 10px; color: #555; }
      .signature { margin-top: 40px; text-align: center; }
      .signature p { margin-top: 4px; }
      .header { text-align: right; margin-bottom: 8px; }
    `;
  }
}
