import { JSX } from 'preact/jsx-runtime';
import { route } from 'preact-router';
import { useEffect, useState } from 'preact/hooks';
import ITerm from '~/models/ITerm';
import style from './Content.module.sass';
import SideNavigation from '../side-navigation/SideNavigation';
import Footer from '../footer/Footer';

type ContentProps = {
  searchTerm: string;
  filteredTerms: ITerm[];
  setSearchTerm: (term: string) => void;
  setFilteredTerms: (terms: ITerm[]) => void;
  children: JSX.Element;
};

export default function Content(props: ContentProps) {
  const [selectedTermIndex, setSelectedTermIndex] = useState<number | null>(
    null
  );

  function highlightTerm(displayName: string, searchTerm: string) {
    if (!searchTerm.trim()) {
      return displayName;
    }
    const regex = new RegExp(`(${searchTerm})`, 'gi');
    const highlighted = displayName.replace(
      regex,
      '<span class="highlighted">$1</span>'
    );

    return highlighted;
  }

  useEffect(() => {
    if (selectedTermIndex !== null) {
      const selectedElement = document.querySelector(`.${style.selectedTerm}`);
      selectedElement?.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
  }, [selectedTermIndex]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowDown') {
        setSelectedTermIndex(prev =>
          prev === null || prev >= props.filteredTerms.length - 1 ? 0 : prev + 1
        );
      } else if (e.key === 'ArrowUp') {
        setSelectedTermIndex(prev =>
          prev === null || prev <= 0 ? props.filteredTerms.length - 1 : prev - 1
        );
      } else if (e.key === 'Enter' && selectedTermIndex !== null) {
        const term = props.filteredTerms[selectedTermIndex];
        route(`/${term.urlPath}`);
        props.setSearchTerm('');
        props.setFilteredTerms([]);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [props.filteredTerms, selectedTermIndex]);

  return (
    <div class={style.content}>
      <SideNavigation />
      <div class={style.mainContent}>
        <main>
          <div className="wrapper">
            {props.filteredTerms.length > 0 && (
              <div className={style.searchResultsOverlay}>
                {props.filteredTerms.map((term, index) => (
                  <div
                    key={term.urlPath}
                    style={
                      index === selectedTermIndex
                        ? { backgroundColor: 'var(--bg-color-tertiary)' }
                        : {}
                    }
                    className={
                      index === selectedTermIndex ? `${style.selectedTerm}` : ''
                    }
                    onClick={() => {
                      route(`/${term.urlPath}`);
                      props.setSearchTerm('');
                      props.setFilteredTerms([]);
                    }}
                    dangerouslySetInnerHTML={{
                      __html: highlightTerm(term.displayName, props.searchTerm),
                    }}
                  />
                ))}
              </div>
            )}
            {props.children}
          </div>
        </main>
        <Footer />
      </div>
    </div>
  );
}
