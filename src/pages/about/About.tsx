import { useContext } from 'preact/hooks';
import { route } from 'preact-router';
import styles from './About.module.sass';
import { ThemeContext } from '~store/ThemeContext';

// dark theme icons
import githubIcon from './icons/github.svg';
import linkedinIcon from './icons/linkedin.svg';
import youtubeIcon from './icons/youtube.svg';

//light theme icons
import githubIconLight from './icons/githubLight.svg';
import linkedinIconLight from './icons/linkedinLight.svg';
import youtubeIconLight from './icons/youtubeLight.svg';

/**
 * The About page of the website. Learn more about the project, the development
 * process, Maakaf community and how you can contribute to it.
 */
export default function About() {
  const themeCtx = useContext(ThemeContext); // {theme: 'dark' | 'light'}

  const onVisitGithub = () => {
    route('https://github.com/talisraeli/Yeda', true);
  };

  const onVisitLinkedin = () => {
    route(
      'https://www.linkedin.com/company/maakaf/?originalSubdomain=il',
      true
    );
    // move to the maakaf linkedin page
  };

  const onVisitYoutube = () => {
    route('https://www.youtube.com/watch?v=dQw4w9WgXcQ', true); // our official youtube page, change this later
  };

  return (
    <div>
      <h1>אודות האתר</h1>
      <p>
        ״ידע״ היא תבנית אתר שמאפשרת פיתוח זריז של מילונים ופלטפורמות לימוד
        בקלות. היא פותחה על ידי חברי קהילת ״מעקף״ - קהילת הקוד הפתוח של ישראל
        וניתן להשתמש בה באופן חופשי.
      </p>
      <h2>תהליך הפיתוח</h2>
      <p>
        הפרויקט נבע מצורך אמיתי בעת פיתוח של פרויקטים אחרים להנגשת מידע חשוב
        בעברית ברשת בנושאים שונים. היינו זקוקים לכלי שיסייע לנו ליצור ארכיוני
        מידע בזריזות וכן יאפשר למשתמשים להגיע למידע הרלוונטי כמה שיותר מהר.
        בנוסף, רצינו לכתוב את המידע הרלוונטי בעברית בפורמט קריא ואנושי ולא בשפת
        סקריפטים כגון HTML או JS. בכך גם אנשים ללא רקע תכנותי יוכלו לתרום
        לפרויקטים בתבנית ״ידע״. לשם כך החלטנו ליצור תבנית ייעודית לכך, שתפשט
        בהרבה את תהליך הפיתוח בפרויקטים אחרים.
      </p>
      <p>
        מצאנו דרכים יצירתיות על מנת לענות על הצרכים המגוונים שנתקלנו בהם. על מנת
        להוסיף מושגים חדשים לתפריט ניתן לכתוב את התוכן בפורמט markdown, שלאחר
        מכן יומר לקוד ב-HTML שיוצג בדפדפן מאחורי הקלעים. כדי לאפשר למשתמשים
        לנווט באתר ולמצוא את מבוקשם במהירות, הוספנו לאתר פונקציונליות חיפוש
        ותפריט צדדי.
      </p>
      <p>
        יתרה מכך, בשל אופי הפרויקט החלטנו להשתמש ב-preact כדי לחסוך במקום.
        preact הוא פרויקט בעל ממשק כמעט זהה לשל react, כאשר הוא מסייע בחיסכון
        במקום בקנה מידה של פי עשרות עד מאות מונים ביחס לפרויקט ב-react.
      </p>
      <p>
        בנוסף, ידענו שתהיה חשיבות גדולה לכך שמשתמשי הפרויקט יוכלו לבצע התאמה
        אישית לעיצוב התבנית, ועל כן החלטנו ליצור קבצי עיצוב ב-Sass (ולא להשתמש
        בספריות כגון tailwindcss ו-bootstrap המאפשרות פחות גמישות).
      </p>
      <h2>צרו קשר</h2>
      <div class={styles.iconGroup}>
        <img
          src={themeCtx.theme == 'dark' ? githubIcon : githubIconLight}
          alt="Github"
          class={styles.icon}
          onClick={onVisitGithub}
        />
        <img
          src={themeCtx.theme == 'dark' ? linkedinIcon : linkedinIconLight}
          alt="Linkedin"
          class={styles.icon}
          onClick={onVisitLinkedin}
        />
        <img
          src={themeCtx.theme == 'dark' ? youtubeIcon : youtubeIconLight}
          alt="Youtube"
          class={styles.icon}
          onClick={onVisitYoutube}
        />
      </div>
      <h2>תרמו לפרויקט</h2>
    </div>
  );
}
