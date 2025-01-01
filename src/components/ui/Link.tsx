import { forwardRef, HtmlHTMLAttributes, Ref } from 'react';
import { createLink, LinkComponent } from '@tanstack/react-router';
import { cn } from '../../lib/utils';

const BasicLinkComponent = forwardRef(function BasicLinkComponent(
  props: HtmlHTMLAttributes<HTMLAnchorElement>,
  ref: Ref<HTMLAnchorElement>,
) {
  return <a ref={ref} {...props} className={cn('hover:underline', props.className)} />;
});

const CreatedLinkComponent = createLink(BasicLinkComponent);

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const Link: LinkComponent<typeof BasicLinkComponent> = (props: any) => {
  return <CreatedLinkComponent to={props.href} {...props} />;
};
