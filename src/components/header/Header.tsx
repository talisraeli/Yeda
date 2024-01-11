import style from './Header.module.sass';
import logo from './logo.svg';
import menu from './menu.svg';
import search from './search.svg';
import theme from './theme.svg';

interface HeaderProps {
  toggleSideNav: () => void;
  toggleTheme: () => void;
}

/**
 * The header of the website.
 */
export default function Header(props: HeaderProps) {
  const handleOnMenuClick = () => {
    props.toggleSideNav();
  };

  const handleOnThemeClick = () => {
    props.toggleTheme();
  };

  return (
    <header class={style.header}>
      <div class={style.headerTop}>
        <div className="wrapper">
          <a class={style.logo} href="/">
            <img src={logo} alt="סמל ידע" />
          </a>
        </div>
      </div>
      <div class={style.headerBottom}>
        <nav className="wrapper">
          <ul>
            <li>
              <button type="button" onClick={handleOnMenuClick}>
                <img src={menu} alt="סמל תפריט" />
              </button>
            </li>
            <li>
              <a href="/">פופולרי</a>
            </li>
            <li>
              <a href="/%D7%90%D7%95%D7%93%D7%95%D7%AA">אודות האתר</a>
            </li>
            <li>
              <button type="button">
                <img src={search} alt="סמל חיפוש" />
              </button>
              <button type="button" onClick={handleOnThemeClick}>
                <img src={theme} alt="סמל ערכת נושא" />
              </button>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}
