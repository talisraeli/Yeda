import { JSX } from 'preact';
import styles from './Buttons.module.sass';
import { useContext } from 'preact/hooks';
import { ThemeContext } from '~store/ThemeContext';

// icons
import backArrow from './icons/backArrow.svg';
import nextArrow from './icons/nextArrow.svg';
import backArrowLight from './icons/backArrowLight.svg';
import nextArrowLight from './icons/nextArrowLight.svg';

interface ButtonProps extends JSX.HTMLAttributes<HTMLButtonElement> {}

/**
 * Basic Button component
 */
export function Button(props: ButtonProps) {
  return (
    <button className={styles.button} {...props}>
      {props.children}
    </button>
  );
}

/**
 * Primary Button
 */
export function PrimaryButton(props: ButtonProps) {
  return (
    <Button className={styles.primaryButton} onClick={props.onClick}>
      {props.children}
    </Button>
  );
}

/**
 * Secondary Button
 */
export function SecondaryButton(props: ButtonProps) {
  return (
    <Button className={styles.secondaryButton} onClick={props.onClick}>
      {props.children}
    </Button>
  );
}

/**
 * Button UI for moving next
 */
export function NextButton(props: ButtonProps) {
  const themeCtx = useContext(ThemeContext);
  return (
    <PrimaryButton onClick={props.onClick}>
      <div className={styles.container}>
        {props.children}
        <img
          src={themeCtx.theme === 'dark' ? nextArrow : nextArrowLight}
          alt="עבור למונח הבא בתפריט"
        />
      </div>
    </PrimaryButton>
  );
}

/**
 * Button UI for moving backwards
 */
export function BackButton(props: ButtonProps) {
  const themeCtx = useContext(ThemeContext);
  return (
    <PrimaryButton onClick={props.onClick}>
      <div className={styles.container}>
        <img
          src={themeCtx.theme === 'dark' ? backArrow : backArrowLight}
          alt="עבור למונח הקודם בתפריט"
        />
        {props.children}
      </div>
    </PrimaryButton>
  );
}
