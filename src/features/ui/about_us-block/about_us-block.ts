import { BaseView } from '../base-view';
import { Icon } from '../icon';
import rSSchoolLogo from '../../../assets/images/rs_school.svg';
import githubLogo from '../../../assets/images/icon-github.svg';
import teamLogo from '../../../assets/images/team_logo.svg';

const RSSCHOOL_LINK = 'https://rs.school/';
const contrib1 = [
  'team lead, create the project in CommerceTools, setting up the configurations',
  'login page',
  'figma design',
  'detailed Product page',
  'basket page',
  'deploy project',
  'product Filtering, sorting, and searching',
  'jest tests',
];
const contrib2 = [
  'registration pag',
  'user Profile page',
  'about Us page',
  'validation for required fields',
  'create a project task board using Trello',
  'jest tests',
];
const contrib3 = [
  'set up and configure a bundler',
  'comprehensive README',
  'authentication Token',
  'main page',
  'figma design',
  'routing, navigation',
  'layout: header, footer',
  'basket page',
  'catalog Product page',
  'jest tests',
  'groduct sorting, product on sale',
];

export class AboutUsBlock extends BaseView<HTMLElement> {
  constructor() {
    super();
    this.createElement();
  }

  private createElement(): void {
    const block = document.createElement('div');
    block.classList.add('about_us__block');
    const title1 = this.createTitleText('Привет всем!!!');
    const titleBlock = this.createTitleElement();
    const title2 = this.createTitleText('Teхнологический стек проекта');
    const middleBlock = this.createMiddleElement();
    const memberBlock = this.createMainElement();
    const div = document.createElement('div');
    div.className = 'block__members';
    const firstMember = this.createDeveloperElement(
      'Кирилл',
      'https://github.com/vesnanervah',
      contrib1,
    );
    const secondMember = this.createDeveloperElement(
      'Тамара',
      'https://github.com/toma-fedyanova',
      contrib2,
    );
    const thirdMember = this.createDeveloperElement('Илья', 'https://github.com/f4hr', contrib3);
    div.append(firstMember, secondMember, thirdMember);
    memberBlock.append(div);
    block.append(title1, titleBlock, title2, middleBlock, memberBlock);
    this.htmlElement = block;
  }

  private createTitleElement(): HTMLDivElement {
    const block = document.createElement('div');
    block.classList.add('about_us__title');
    const p = this.createText(
      'Проект был создан в качестве заключительного задания по разработке портала онлайн-покупок курса Rolling Scopes School',
    );
    const p1 = this.createText(
      'Проект включает в себя такие функции, как регистрация пользователя и вход в систему, поиск товаров, категоризация товаров и сортировка. Приложение работает на базе Commerce Tools. Взаимодействие разработчиков осуществлялось в Телеграмме',
    );
    const rSSchoolLink = AboutUsBlock.createRSSchoolLink();
    block.append(p, rSSchoolLink, p1);
    return block;
  }

  private createMiddleElement(): HTMLDivElement {
    const block = document.createElement('div');
    block.classList.add('about_us__middle');
    const p = this.createText(
      'Технологии, используемые для разработки портала онлайн-покупок курсов Coursestore, предоставляющего пользователям интерактивный и бесперебойный интерфейс',
    );
    const span = document.createElement('span');
    span.className = 'span__about_us';
    span.textContent =
      'HTML, SCSS, TypeScript, ESLint, Prettier, Husky, Jest for testing, Webpack, project task board Trello';
    block.append(p, span);
    return block;
  }

  private createMainElement(): HTMLDivElement {
    const block = document.createElement('div');
    block.classList.add('about_us__members');
    const title = this.createTitleText('Наша команда');
    const teamLogo = AboutUsBlock.createTeamLogo();
    block.append(title, teamLogo);
    return block;
  }

  private createDeveloperElement(
    NameDeveloper: string,
    linkGithub: string,
    arr: Array<string>,
  ): HTMLDivElement {
    const block = document.createElement('div');
    block.classList.add('developer');

    // block name & git hub
    const div = document.createElement('div');
    const title = this.createTitleText(NameDeveloper);
    const githubLogo = AboutUsBlock.createGithublogo(linkGithub);
    div.append(title, githubLogo);

    // photo
    const div1 = document.createElement('div');
    div1.className = 'about_us__photo';
    const img = document.createElement('img');
    img.title = NameDeveloper;
    // img.src = srcPhoto;
    div1.append(img);

    // contributions to the project
    const ul = document.createElement('ul');
    ul.className = 'about_us__ul';
    for (const el of arr) {
      const li = document.createElement('li');
      li.textContent = el;
      ul.append(li);
    }

    block.append(div, div1, ul);
    return block;
  }

  private static createGithublogo(linkMember: string): HTMLElement {
    const link = document.createElement('a');
    link.classList.add('about_us__github-link');
    link.href = linkMember;
    link.target = '_blank';

    const icon = new Icon(githubLogo);
    const iconElement = icon.getHtmlElement();
    iconElement.classList.add('about__us_github');
    link.append(iconElement);

    return link;
  }
  private static createRSSchoolLink(): HTMLElement {
    const link = document.createElement('a');
    link.classList.add('about_us__rsschool-link');
    link.href = RSSCHOOL_LINK;
    link.target = '_blank';

    const icon = new Icon({
      id: rSSchoolLogo.id,
      viewBox: rSSchoolLogo.viewBox,
    });
    const iconElement = icon.getHtmlElement();
    iconElement.classList.add('about__us_rsschool-logo');
    link.append(iconElement);

    return link;
  }

  private static createTeamLogo(): HTMLElement {
    const icon = new Icon(teamLogo);
    const iconElement = icon.getHtmlElement();
    iconElement.classList.add('about_us__team-logo');

    return iconElement;
  }

  private createText(text: string): HTMLParagraphElement {
    const p = document.createElement('p');
    p.className = 'text__about_us';
    p.textContent = text;
    return p;
  }

  private createTitleText(text: string): HTMLElement {
    const title = document.createElement('h2');
    title.className = 'title__text_about_us';
    title.textContent = text;
    return title;
  }
}
