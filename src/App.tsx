import './style/global.sass';

// components
import Providers from '~store/Providers';
import Header from '~components/header/Header';
import Content from '~components/content/Content';

// hooks
import useSideNavigation from '~hooks/useSideNavigation';
import useTheme from '~hooks/useTheme';

// pages
import Home from '~pages/home/Home';
import NotFound from '~pages/NotFound/NotFound.tsx';
import Term from '~pages/term/Term';
import { useState } from 'preact/hooks';
import ITerm from '~/models/ITerm';
import Router from 'preact-router';

export default function App() {
  const { isSideNavigationOpen, toggleSideNavigation } = useSideNavigation();
  const { theme, toggleTheme } = useTheme();
  const [filteredTerms, setFilteredTerms] = useState<ITerm[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  return (
    <Providers isSideNavigationOpen={isSideNavigationOpen} theme={theme}>
      <Header
        searchTerm={searchTerm}
        setFilteredTerms={setFilteredTerms}
        setSearchTerm={setSearchTerm}
        toggleSideNav={toggleSideNavigation}
        toggleTheme={toggleTheme}
      />
      <Content
        searchTerm={searchTerm}
        filteredTerms={filteredTerms}
        setSearchTerm={setSearchTerm}
        setFilteredTerms={setFilteredTerms}
      >
        <Router>
          <Home path="/" />
          <NotFound path="/404" />
          <Term path="/:name+" />
        </Router>
      </Content>
    </Providers>
  );
}
