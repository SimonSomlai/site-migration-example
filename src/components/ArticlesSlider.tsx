import Link from "next/link";
import React from "react";
import { Navigation } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import ExportedImage from "next-image-export-optimizer";

export const ArticlesSlider = (props) => {
  const articles = props?.articles || [];
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
      {articles
        .filter((article) => article.posted)
        .map(({ title, en_description, slug, headerImage }) => (
          <SwiperSlide
            key={slug}
            className="owl-item active"
            style={{ width: "273.75px", marginRight: "15px" }}
          >
            <div className="oc-item">
              <div className="ipost clearfix">
                <div className="entry-image">
                  <Link href={slug}>
                    {headerImage && (
                      <ExportedImage
                        placeholder="empty"
                        alt={`${title} - Webdesign Antwerpen`}
                        className="image_fade"
                        src={headerImage}
                        width={270}
                        height={170}
                      />
                    )}
                  </Link>
                </div>
                <div className="entry-title">
                  <h3>
                    <Link href={slug}>{title}</Link>
                  </h3>
                </div>
                <div className="entry-content">
                  <p>{en_description}</p>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
    </Swiper>
  );
};
