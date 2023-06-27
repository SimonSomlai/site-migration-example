import React, { useState } from "react";
import { Navigation } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import { Gallery, Item } from "react-photoswipe-gallery";

import Link from "next/link";
import ExportedImage from "next-image-export-optimizer";

interface Props {}

export const ProjectsSlider = ({ projects = [] }) => {
  const [imageSizes, setImageSizes] = useState({});

  const getImageSize = (slug: string, image: string) => {
    if (imageSizes?.[slug]) return;
    var mockImage = document.createElement("img");

    mockImage.src = image;
    mockImage.onload = function () {
      setImageSizes((sizes) => ({
        ...sizes,
        [slug]: { width: mockImage.width, height: mockImage.height },
      }));
    };
  };

  return (
    <Swiper
      spaceBetween={10}
      navigation
      modules={[Navigation]}
      breakpoints={{
        "991": {
          slidesPerView: 4,
          spaceBetween: 10,
        },
        "767": {
          slidesPerView: 3,
          spaceBetween: 10,
        },
        "0": {
          slidesPerView: 1,
          spaceBetween: 10,
        },
      }}
    >
      {projects.map(({ title, headerImage, slug, features }) => {
        const fullSlug = `/projects/${slug}`;

        const { width, height } = imageSizes?.[slug] || {};
        return (
          <SwiperSlide key={title}>
            <div className="oc-item">
              <div className="iportfolio">
                <div
                  className="portfolio-image"
                  onMouseEnter={() => {
                    getImageSize(slug, headerImage);
                  }}
                >
                  <Link href={fullSlug}>
                    <ExportedImage
                      placeholder="empty"
                      alt={`${title} - Webdesign Antwerpen`}
                      src={headerImage}
                      width={161}
                      height={136}
                    />
                  </Link>
                  <Gallery>
                    <Item original={headerImage} width={width} height={height}>
                      {({ ref, open }) => (
                        <div className="portfolio-overlay" onClick={open}>
                          <a
                            className="left-icon"
                            data-lightbox="image"
                            onClick={open}
                          >
                            <i className="icon-line-image" />
                          </a>
                          <Link
                            className="right-icon"
                            onClick={(e) => e.stopPropagation()}
                            href={fullSlug}
                          >
                            <i className="icon-line-open" />
                          </Link>
                        </div>
                      )}
                    </Item>
                  </Gallery>
                </div>
                <div className="portfolio-desc">
                  <h3>
                    <a href={fullSlug}>{title}</a>
                  </h3>
                  <a className="portfolio-features" href={fullSlug}>
                    <span>
                      {Object.keys(features)
                        .slice(0, 3)
                        .map((feature) => `#${feature} `)}
                    </span>
                  </a>
                </div>
              </div>
            </div>
          </SwiperSlide>
        );
      })}
    </Swiper>
  );
};
