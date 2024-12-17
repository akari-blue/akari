import { Link } from './Link';

/**
 * Converts URLs in a string to links
 */
const linkifyText = (line: string) => {
  const regex = /(https?:\/\/[^\s]+)|(@[\w.-]+)/g;

  return line.split(regex).map((part, index) => {
    if (!part) return null;

    if (part.match(/https?:\/\/[^\s]+/)) {
      const url = part.replace(/https?:\/\//, '').replace(/\/$/, '');
      return (
        <Link key={index} to={part} className="text-blue-400">
          {url}
        </Link>
      );
    } else if (part.match(/@[\w.-]+/)) {
      return (
        <Link key={index} to={`/profile/${part.slice(1)}`} className="text-blue-400">
          {part}
        </Link>
      );
    } else {
      return part;
    }
  });
};

/**
 * Converts new lines to <br> tags
 *
 * @param text - The text to be formatted
 * @param linkify - Whether to convert URLs to links
 */
export function FormattedText({ text, linkify }: { text: string; linkify?: boolean }) {
  return (
    <span>
      {text.split('\n').map((line, index) => (
        <>
          {linkify ? linkifyText(line) : line}
          {index < text.split('\n').length - 1 && <br />}
        </>
      ))}
    </span>
  );
}
