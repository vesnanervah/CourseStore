export class SignupPage {
  headerSignup = () => {
    return `
    <header class="header">
        <div class="header__container">
          <div class="header__container_top">
            <div class="header__burger" id="header__burger">
              <div class="burger__line line1"></div>
              <div class="burger__line line2"></div>
              <div class="burger__line line3"></div>
            </div>
            <div class="search__catalog">
              <input type="search" name="header__search" id="header__search" maxlength="300" placeholder="Поиск">
              <button id="searct__loop" type="button"></button>
            </div>
              <div class="header__navbar">
                <div class="header__basket">
                  <a href="#" class="basket__link"></a>
                  <span class="basket__ico"></span>
                  <span id="orders__count" class="basket__orders"></span>
                </div>
                <div class="header__profile">
                  <a href="#" class="profile__link" id="profile__link"></a>
                  <span class="profile__ico"></span>
                </div>
            </div>
          </div>
          <div class="header__container_bottom">
            <div class="logo"></div>
            <a href="#" class="mainpage__link" id="mainpage__link">вернуться на главную</a>
          </div>
      </div>
      </header>
    `;
  };

  mainSignup = () => {
    return `<main class="main">
        <section class="main__container">
          <div class="main__form">
            <div class="vertical__line">
              <strong class="line" aria-hidden="true"></strong><vr />
            </div>
            <div class="fotm__signup">
              <div class="form__back">
                <a href="#" class="mainpage__link" id="mainpage__link_form">назад</a>
              </div>
              <div class="form__mail">
                <span class="mail__field">
                  <input type="mail" class="forn__input" name="email" id="email__input" autocorrect="off" autocapitalize="off" placeholder="Почта:">
                  <span class="circal"></span>
                </span>
                <span class="form__warning"> <p class="warning__text" id="mail__warning"></p> </span>
              </div>
              <div class="form__name">
                <span class="name__field">
                  <input type="text" class="forn__input" name="person" id="name__input" autocorrect="off" placeholder="ФИО:">
                  <span class="circal"></span>
                </span>
                <span class="form__warning"> <p class="warning__text" id="mail__warning"></p> </span>
              </div>
              <div class="form__password">
                <span class="password__field">
                  <button class="password__toggle" id="password__toggle" title="показатель текст пароля"></button>
                  <input type="password" class="forn__input" name="passw" id="password__input" autocorrect="off" placeholder="Пароль:">
                  <span class="circal"></span>
                </span>
                <span class="form__warning"> <p class="warning__text" id="password__warning"></p> </span>
              </div>
              <div class="form__submit"> <button class="button__round" type="submit" id="btn__submit">зарегистрироваться</button> </div>
            </div>
          </div>
        </section>
      </main>`;
  };

  footerSignup = () => {
    return `
    <footer class="footer">
         <div class="footer__top">
          <div class="rss__logo"></div>
          <div class="winx__logo">
            <p class="winx__text">winx</p>
            <span class="winx__img"></span>
          </div>
         </div>
         <div class="footer__bottom">
          <p class="footet__text">2023</p>
          <p class="footet__text">@teamWINX</p>
         </div>
      </footer>
    `;
  };
}
