import { Link } from './Link';

/**
 * Converts URLs in a string to links
 */
const linkifyText = (line: string) => {
  const urlRegex = /(https?:\/\/[^\s]+)/g;
  return line.split(urlRegex).map((part, index) => {
    const match = urlRegex.test(part);
    if (!match) return part;

    const url = new URL(part);
    return (
      <Link key={index} to={part} className="text-blue-400">
        {url.hostname}
        {url.pathname.endsWith('/') ? url.pathname.slice(0, -1) : url.pathname}
      </Link>
    );
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
