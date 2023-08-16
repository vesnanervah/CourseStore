import './app-footer.scss';
import { BaseView } from '../base-view';
import { Icon } from '../icon';
import rSSchoolLogo from '../../../assets/images/rs_school.svg';
import teamLogo from '../../../assets/images/team_logo.svg';

const RSSCHOOL_LINK = 'https://rs.school/';

export class AppFooter extends BaseView<HTMLElement> {
  constructor() {
    super();

    this.createElement();
  }

  private createElement(): void {
    const footer = document.createElement('footer');
    footer.classList.add('app-footer');

    const footerLinks = document.createElement('div');
    footerLinks.classList.add('app-footer__links');
    footer.append(footerLinks);

    const rSSchoolLink = AppFooter.createRSSchoolLink();
    footerLinks.append(rSSchoolLink);

    const teamLogo = AppFooter.createTeamLogo();
    footerLinks.append(teamLogo);

    const copyright = document.createElement('div');
    copyright.classList.add('app-footer__copyright');
    copyright.textContent = '2023 @teamWINX';
    footer.append(copyright);

    this.htmlElement = footer;
  }

  private static createRSSchoolLink(): HTMLElement {
    const link = document.createElement('a');
    link.classList.add('app-footer__rsschool-link');
    link.href = RSSCHOOL_LINK;
    link.rel = 'noreferrer';
    link.target = '_blank';

    const icon = new Icon(rSSchoolLogo);
    const iconElement = icon.getHtmlElement();
    iconElement.classList.add('app-footer__rsschool-logo');
    link.append(iconElement);

    return link;
  }

  private static createTeamLogo(): HTMLElement {
    const icon = new Icon(teamLogo);
    const iconElement = icon.getHtmlElement();
    iconElement.classList.add('app-footer__team-logo');

    return iconElement;
  }
}
