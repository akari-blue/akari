import { useEffect, useState } from 'react';

export const Image = ({ src, alt, ...props }: { src: string; alt: string } & React.ImgHTMLAttributes<HTMLImageElement>) => {
  const [showAltText, setShowAltText] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const altButtonOnClick = () => {
    setShowAltText((prev) => !prev);
  };
  const imageOnClick = () => {
    setIsFullscreen((prev) => !prev);
  };

  useEffect(() => {
    if (isFullscreen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
  }, [isFullscreen]);

  return (
    <>
      <div className="relative">
        {alt &&
          (showAltText ? (
            <div
              className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-75 text-white"
              onClick={altButtonOnClick}
            >
              {alt}
            </div>
          ) : (
            <button className="absolute bottom-1 right-1 z-10 p-2 text-white bg-black bg-opacity-50 rounded-bl-md text-xs font-bold font-mono">
              ALT
            </button>
          ))}
        <img src={src} alt={alt} {...props} onClick={imageOnClick} />
      </div>
      {isFullscreen && (
        <div className="z-50" onClick={imageOnClick}>
          <div className="relative">
            <div className="fixed top-0 bottom-0 left-0 right-0">
              <div className="fixed top-0 bottom-0 left-0 right-0 bg-black bg-opacity-90" />
              <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-3/4">
                <img src={src} alt={alt} {...props} />
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
