import { ElementType, ReactNode, forwardRef, ComponentProps, Ref, useRef, useImperativeHandle } from 'react';
import { useContainerSize } from '../hooks/use-container-size';

interface MeasuredContainerProps<T extends ElementType> {
  as: T;
  name: string;
  children?: ReactNode;
}

export const MeasuredContainer = forwardRef(
  <T extends ElementType>(
    { as: Component, name, children, style = {}, ...props }: MeasuredContainerProps<T> & ComponentProps<T>,
    ref: Ref<HTMLElement>,
  ) => {
    const innerRef = useRef<HTMLElement>(null);
    const rect = useContainerSize(innerRef.current);

    useImperativeHandle(ref, () => innerRef.current as HTMLElement);

    const customStyle = {
      [`--${name}-width`]: `${rect.width}px`,
      [`--${name}-height`]: `${rect.height}px`,
    };

    return (
      <Component {...props} ref={innerRef} style={{ ...customStyle, ...style }}>
        {children}
      </Component>
    );
  },
);

MeasuredContainer.displayName = 'MeasuredContainer';
