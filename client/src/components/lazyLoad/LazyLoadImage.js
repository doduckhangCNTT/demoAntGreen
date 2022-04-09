import React, { useEffect, useRef } from "react";

const LazyLoadImage = React.memo(({ url, className }) => {
  const valueClass = className.split(" ");

  const imgRef = useRef();

  useEffect(() => {
    const img = imgRef.current;

    // khoi tao observer
    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        img.setAttribute("src", url);
        valueClass.forEach((value) => {
          img.classList.add(...value);
        });
      }
    });
    if (img) {
      observer.observe(img);
    }

    // clean up
    return () => {
      observer.unobserve(img);
    };
  }, [url, valueClass]);

  return <img className={className} ref={imgRef} alt={url} />;
});

export default LazyLoadImage;
