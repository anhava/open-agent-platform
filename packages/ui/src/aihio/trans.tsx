import { Trans as TransComponent } from 'react-i18next/TransWithoutContext';

/**
 * `Trans` is a wrapper component for i18next's Trans component that allows for
 * complex translations with embedded HTML and variable interpolation.
 *
 * This component is particularly useful when you need to:
 * - Include HTML markup within translated text
 * - Include React components within translated text
 * - Use variables in your translations
 * - Handle pluralization
 *
 * @example
 * // Simple usage with a translation key
 * <Trans i18nKey="welcome">Welcome to Aihio AI</Trans>
 *
 * @example
 * // With HTML elements and variables
 * <Trans
 *   i18nKey="invitation"
 *   values={{ name: user.name, team: teamName }}
 *   components={{ bold: <strong />, link: <a href="/accept" /> }}
 * >
 *   <bold>{{name}}</bold> invited you to join <bold>{{team}}</bold>.
 *   Click <link>here</link> to accept.
 * </Trans>
 *
 * @example
 * // With pluralization
 * <Trans
 *   i18nKey="notifications"
 *   count={unreadCount}
 *   values={{ count: unreadCount }}
 * >
 *   You have {{count}} unread notification(s)
 * </Trans>
 *
 * @see For more information, visit https://react.i18next.com/latest/trans-component
 *
 * @param {Object} props - Props that will be passed to the underlying Trans component
 * @returns {JSX.Element} Translated content
 */
export function Trans(props: React.ComponentProps<typeof TransComponent>) {
  return <TransComponent {...props} />;
}
