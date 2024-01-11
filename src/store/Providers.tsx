import { JSX } from 'preact';
import {
  ISideNavigationContext,
  SideNavigationContext,
} from './SideNavigationContext';
import { IThemeContext, ThemeContext } from './ThemeContext';

type ProvidersProps = ISideNavigationContext &
  IThemeContext & { children: string | JSX.Element | JSX.Element[] | null };

/**
 * A combination of all contexts providers.
 */
export default function Providers(props: ProvidersProps) {
  return (
    <SideNavigationContext.Provider
      value={{
        isSideNavigationOpen: props.isSideNavigationOpen,
        closeSideNavigation: props.closeSideNavigation,
      }}
    >
      <ThemeContext.Provider value={{ theme: props.theme }}>
        {props.children}
      </ThemeContext.Provider>
    </SideNavigationContext.Provider>
  );
}
