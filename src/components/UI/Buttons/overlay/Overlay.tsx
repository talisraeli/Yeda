import styles from './Overlay.module.sass';

interface OverlayProps {
  display: string | null;
  onClick?: (event?: MouseEvent) => void;
}

/**
 * Overlay for modals and for hierarchy
 */
export default function Overlay(props: OverlayProps) {
  let displayMode = 'screen'; // as default, the overlay covers the entire screen
  if (props.display) {
    displayMode = props.display;
  }

  const onClickOverlayHandler = (event: MouseEvent) => {
    if (props.onClick) {
      props.onClick(event);
    }
  };

  const displayClass = styles[`display-${displayMode}`];
  return (
    <div
      class={`${styles.overlay} ${displayClass}`}
      onClick={onClickOverlayHandler}
    ></div>
  );
}
