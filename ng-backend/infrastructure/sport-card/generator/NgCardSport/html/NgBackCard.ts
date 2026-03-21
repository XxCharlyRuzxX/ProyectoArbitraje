import SportCard from '@model/sportcard/SportCard';
import CardEvent from '@model/team/discipline/CardEvent';
import { getNgBackCardStyles } from './NgStyles';

export class NgBackCard {
  private data: SportCard;
  public getHtmlTemplate(data: SportCard): string {
    this.data = data;
    return this.buildPage2Html();
  }

  private buildPage2Html(): string {
    const { refereeCrew, observations, matchInfo, awayTeam, homeTeam } =
      this.data;

    return `
    <!DOCTYPE html>
    <html lang="es">
    <head>
      <meta charset="UTF-8">
      <style>${getNgBackCardStyles()}</style>
    </head>
    <body>
      <div class="p2-outer-box">

        <!-- EQUIPO LOCAL -->
        <div class="p2-team-block">
          <div class="p2-row">
            <span class="p2-label">EQUIPO:</span>
            <span class="p2-team-value">${this.data.homeTeam.teamName}</span>
          </div>
          <div class="p2-cards-block">
            <span class="p2-label">AMONESTADOS:</span>
            ${this.renderCardsList(homeTeam.discipline.yellowCards)}
          </div>
          <div class="p2-cards-block">
            <span class="p2-label">EXPULSADOS:</span>
            ${this.renderCardsList(homeTeam.discipline.redCards)}
          </div>
        </div>

        <!-- EQUIPO VISITANTE -->
        <div class="p2-team-block">
          <div class="p2-row">
            <span class="p2-label">EQUIPO:</span>
            <span class="p2-team-value">${this.data.awayTeam.teamName}</span>
          </div>
          <div class="p2-cards-block">
            <span class="p2-label">AMONESTADOS:</span>
            ${this.renderCardsList(awayTeam.discipline?.yellowCards)}
          </div>
          <div class="p2-cards-block">
            <span class="p2-label">EXPULSADOS:</span>
            ${this.renderCardsList(awayTeam.discipline?.redCards)}
          </div>
        </div>

        <!-- INCIDENTES -->
        <div class="p2-incidents-block">
          <div class="p2-incidents-label">
            INCIDENTES:
            <span class="p2-incidents-note">
              (El árbitro debe indicar los motivos y circunstancias de todo incidente ocurrido en el partido,
              mismo si ha tenido lugar antes, durante o después del partido o durante el intervalo.)
            </span>
          </div>
          <ul class="p2-incidents-list">
            ${
              observations?.length
                ? observations.map((o) => `<li>${o}</li>`).join('')
                : '<li class="p2-none">No hubo incidentes.</li>'
            }
          </ul>
        </div>

        <!-- RESERVA -->
        <div class="p2-reserve">
          ME RESERVO EL DERECHO DE AMPLIAR MI INFORME ARBITRAL EN CASO DE SER NECESARIO.
        </div>

        <!-- TERRENO -->
        <div class="p2-inline-row">
          <span class="p2-label">ESTADO DEL TERRENO DE JUEGO:</span>
          <span class="p2-inline-value"></span>
        </div>

        <!-- CONDUCTA -->
        <div class="p2-inline-row">
          <span class="p2-label">CONDUCTA DEL PUBLICO:</span>
          <span class="p2-inline-value"></span>
        </div>

        </div>
      <div class="p2-footer">
      <span class="p2-footer-name">${refereeCrew.referee}</span>
      <span>A</span>
      <span class="p2-footer-field">${matchInfo.date.getDay()}</span>
      <span>DE</span>
      <span class="p2-footer-field">${matchInfo.date.getMonth() + 1}</span>
      <span>DE</span>
      <span class="p2-footer-field">${matchInfo.date.getFullYear()}</span>
    </div>

      </div>
    </body>
    </html>
  `;
  }

  private renderCardsList(cards: CardEvent[]): string {
    if (!cards.length) {
      return '<ul class="p2-cards-list"><li class="p2-none">No hubo.</li></ul>';
    }
    return `
      <ul class="p2-cards-list">
        ${cards.map((c) => `<li>${c.player.lastname} ${c.player.firstname} (${c.minute}' - ${c.reason})</li>`).join('')}
      </ul>
    `;
  }
}
