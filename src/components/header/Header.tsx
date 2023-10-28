import style from './Header.module.sass';
import logo from './logo.svg';
import menu from './menu.svg';
import search from './search.svg';
import theme from './theme.svg';
import { useState, useEffect, useRef } from 'preact/hooks';
import { JSX } from 'preact';
import { termsData } from '~/pages/term/termsData';
import ITerm from '~/models/ITerm';
import { getCurrentUrl } from 'preact-router';

interface HeaderProps {
  searchTerm: string;
  setFilteredTerms: (terms: ITerm[]) => void;
  setSearchTerm: (term: string) => void;
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

  const [localSearchTerm, setLocalSearchTerm] = useState('');

  const previousUrlRef = useRef<string | null>(null);

  useEffect(() => {
    const currentUrl = getCurrentUrl();
    if (previousUrlRef.current !== currentUrl) {
      console.log(
        'Route has changed from:',
        previousUrlRef.current,
        'to:',
        currentUrl
      );
      setLocalSearchTerm('');
      previousUrlRef.current = currentUrl;
    }
  });

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
              <a href="#">פופולרי</a>
            </li>
            <li>
              <a href="#">אודות האתר</a>
            </li>
            <li>
              <input
                type="text"
                value={localSearchTerm}
                onInput={(e: JSX.TargetedEvent<HTMLInputElement, Event>) => {
                  const targetValue = (e.target as HTMLInputElement).value;
                  setLocalSearchTerm(targetValue);

                  if (targetValue.trim() === '') {
                    props.setFilteredTerms([]);
                    return;
                  }

                  props.setSearchTerm(targetValue);

                  const results = termsData.filter(term =>
                    term.displayName.includes(targetValue)
                  );

                  props.setFilteredTerms(results);
                }}
                placeholder="חיפוש..."
              />

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
