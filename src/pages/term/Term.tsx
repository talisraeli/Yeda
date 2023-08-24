// preact imports
import { useEffect, useState } from 'preact/hooks';
import { route } from 'preact-router';
import Markdown from 'preact-markdown';

// yeda imports
import { termsData } from './termsData';
import ITerm from '~/models/ITerm';
import useChangeDescription from '../../hooks/useChangeDescription';
import useChangeTitle from '../../hooks/useChangeTitle';
import { PrimaryButton } from '~components/UI/Buttons/Buttons';
import styles from './Term.module.sass';

// svgs
import backArrow from './icons/backArrow.svg';
import nextArrow from './icons/nextArrow.svg';

type TermProps = {
  name?: string;
};

/**
 * The term page template of the website.
 */
export default function Term(props: TermProps) {
  //TODO: implement these dummy methods once the representation of terms is final.
  const visitNextItem = () => {};

  const visitPreviousItem = () => {};

  const [term, setTerm] = useState<ITerm>();
  useChangeTitle(term?.displayName);
  useChangeDescription(term?.description);

  const [markdown, setMarkdown] = useState<string>();

  useEffect(() => {
    if (props.name === undefined) {
      route('/404', true);
      return;
    }
    const term = termsData.find(t => t.urlPath === props.name);

    if (term === undefined) {
      route('/404', true);
      return;
    }

    setTerm(term);

    fetch(`/terms/${term.customMarkdownPath}.md`)
      .then(res => res.text())
      .then(text => setMarkdown(text))
      // eslint-disable-next-line no-console
      .catch(error => console.error(error));
  const markdownContent = useCallback(() => {
    markdown ? Markdown(markdown) : null;
  }, [markdown]);
  

  const markdownContent = markdown ? Markdown(markdown) : null;
  return (
    <>
      {markdownContent}
      <div class={styles.afterMarkdown}>
        <div class={styles.buttonList}>
          <PrimaryButton
            onClick={visitPreviousItem}
            icon={backArrow}
            isReversed={true}
          >
            למושג הקודם
          </PrimaryButton>
          <PrimaryButton onClick={visitNextItem} icon={nextArrow}>
            למושג הבא
          </PrimaryButton>
        </div>
      </div>
    </>
  );
}
