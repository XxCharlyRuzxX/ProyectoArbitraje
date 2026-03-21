import { PDFOptions } from 'puppeteer';
import { SportCardGenerator } from './SportCardGenerator';

export class MatchCardGenerator extends SportCardGenerator {
  protected buildHtml(): string {
    const { refereeCrew, matchInfo, homeTeam, awayTeam } = this.data;

    return `
      <!DOCTYPE html>
      <html lang="es">
        <head>
          <meta charset="UTF-8">
          <style>${this.getStyles()}</style>
        </head>
        <body>
          <header>
            <h1>COLEGIO DE ÁRBITROS NUEVA GENERACIÓN</h1>
          </header>

          <section class="officials">
            <p><strong>Árbitro:</strong> ${refereeCrew.referee}</p>
            <p><strong>Árbitro Asistente 1:</strong> ${refereeCrew.assistant1}</p>
            <p><strong>Árbitro Asistente 2:</strong> ${refereeCrew.assistant2}</p>
            <p><strong>4° Oficial:</strong> ${refereeCrew.fourthOfficial}</p>
          </section>

          <section class="match-info">
            <p>
              Acta del partido de futbol de <strong>${matchInfo.competitionName}</strong>
              efectuado el <strong>${matchInfo.date.toLocaleDateString('es-MX')}</strong>
              a las <strong>${matchInfo.date.toLocaleTimeString('es-MX')}</strong> hrs.
              En el campo <strong>${matchInfo.fieldName}</strong>
              en la ciudad de <strong>${matchInfo.city}</strong>
            </p>
            <p>
              <strong>1er tiempo:</strong> ${matchInfo?.firstHalfStart ? `${matchInfo.firstHalfStart.toLocaleDateString('es-MX')} hrs. &nbsp;` : ''}
              <strong>2do tiempo:</strong> ${matchInfo?.secondHalfStart ? `${matchInfo.secondHalfStart.toLocaleDateString('es-MX')} hrs.` : ''}
            </p>
          </section>

          <section class="teams">
            ${this.renderTeamTable(homeTeam.teamName, homeTeam)}
            ${this.renderTeamTable(awayTeam.teamName, awayTeam)}
          </section>

          <section class="score">
            <table class="score-table">
              <tr>
                <td>${homeTeam.teamName}</td>
                <td class="score-value">${matchInfo.score.homeScore}</td>
                <td class="score-value">${matchInfo.score.awayScore}</td>
                <td>${awayTeam.teamName}</td>
              </tr>
            </table>
          </section>

          <section class="captains">
            <div class="captain-block">
              <p>_______________________</p>
              <p>CAPITÁN — ${homeTeam.captain.firstname} ${homeTeam.captain.lastname}</p>
            </div>
            <div class="captain-block">
              <p>_______________________</p>
              <p>CAPITÁN — ${awayTeam.captain.firstname} ${awayTeam.captain.lastname}</p>
            </div>
          </section>

        </body>
      </html>
    `;
  }

  private renderTeamTable(
    title: string,
    team: typeof this.data.homeTeam,
  ): string {
    const rows = team.players
      .getPlayers()
      .map(
        (p) => `
      <tr>
        <td>${p.jerseyNumber}</td>
        <td>${p.lastname}</td>
        <td>${p.firstname}</td>
        <td>${p.goalMinutes.length || ''}</td>
        <td>${p.goalMinutes.join(', ')}</td>
      </tr>
    `,
      )
      .join('');

    const subRows = team.substitutions
      .getSubstitutions()
      .map(
        (s) => `
      <tr>
        <td>E</td>
        <td colspan="2">${s.playerIn.lastname} ${s.playerIn.firstname}</td>
        <td>S</td>
        <td colspan="2">${s.playerOut.lastname} ${s.playerOut.firstname}</td>
        <td>${s.minute}'</td>
      </tr>
    `,
      )
      .join('');

    return `
      <div class="team-block">
        <h3>${title}</h3>
        <table>
          <thead>
            <tr>
              <th>N°</th>
              <th>Apellido</th>
              <th>Nombre</th>
              <th>Goles</th>
              <th>Min</th>
            </tr>
          </thead>
          <tbody>${rows}</tbody>
        </table>
        <h4>Cambios</h4>
        <table>
          <tbody>${subRows}</tbody>
        </table>
        <p><strong>Entrenador:</strong> ${team.staff.coach}</p>
        <p><strong>Médico:</strong> ${team.staff.doctor}</p>
        <p><strong>Preparador Físico:</strong> ${team.staff.fitnessCoach}</p>
      </div>
    `;
  }

  protected getPuppeteerOptions(): PDFOptions {
    return {
      format: 'A4',
      landscape: false,
      printBackground: true,
      margin: { top: '10mm', bottom: '10mm', left: '10mm', right: '10mm' },
    };
  }

  private getStyles(): string {
    return `
      * { box-sizing: border-box; margin: 0; padding: 0; }
      body { font-family: Arial, sans-serif; font-size: 11px; padding: 8px; }
      h1 { text-align: center; font-size: 14px; margin-bottom: 12px; }
      h3 { font-size: 12px; margin: 8px 0 4px; }
      h4 { font-size: 11px; margin: 6px 0 2px; }
      section { margin-bottom: 12px; }
      .officials p, .match-info p { margin-bottom: 2px; }
      .teams { display: flex; gap: 12px; }
      .team-block { flex: 1; }
      table { width: 100%; border-collapse: collapse; margin-bottom: 4px; }
      th, td { border: 1px solid #000; padding: 2px 4px; }
      th { background: #eee; }
      .score-table { width: auto; margin: 0 auto; }
      .score-value { font-size: 20px; font-weight: bold; text-align: center; padding: 4px 16px; }
      .captains { display: flex; justify-content: space-around; margin-top: 24px; text-align: center; }
      .captain-block p { margin-top: 4px; }
    `;
  }
}
