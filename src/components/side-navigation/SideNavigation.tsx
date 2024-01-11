import { useContext } from 'preact/hooks';
import style from './SideNavigation.module.sass';
import NavigationHeader from './NavigationHeader';
import NavigationItem from './NavigationItem';
import { SideNavigationContext } from '../../store/SideNavigationContext';
import { termsData } from '~pages/term/termsData';
import Overlay from '~components/UI/Buttons/overlay/Overlay';
/**
 * The side navigation bar of the website.
 */
export default function SideNavigation() {
  const sideNavContext = useContext(SideNavigationContext);
  const isOpen = sideNavContext.isSideNavigationOpen;

  const closeSideNavigation = () => {
    sideNavContext.closeSideNavigation();
  };
  if (!isOpen) {
    return null;
  }
  return (
    <div className={style.sideNavigationContainer}>
      <Overlay display="full-width" onClick={closeSideNavigation}></Overlay>
      <aside class={style.sideNavigation}>
        <nav>
          <ul class={style.group}>
            <NavigationHeader name="תפריט" />
            {termsData.map(termData => (
              <NavigationItem
                name={termData.displayName}
                path={`/${termData.urlPath}`}
              />
            ))}
          </ul>
        </nav>
      </aside>
    </div>
  );
}
