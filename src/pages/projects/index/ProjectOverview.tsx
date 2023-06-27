import Link from "next/link";
import React, { FunctionComponent } from "react";
import { Gallery, Item } from "react-photoswipe-gallery";
import { sentenceCase } from "change-case";
import { uniq } from "ramda";
import ExportedImage from "next-image-export-optimizer";
import { SeoTags } from "src/components/SeoTags";

interface Props {}

export const ProjectOverview = ({ projects }) => {
  const [filter, setFilter] = React.useState(null);
  const [imageSizes, setImageSizes] = React.useState({});
  const allFeatures = uniq(
    projects.reduce(
      (acc, project) => [...acc, ...Object.keys(project.features)],
      []
    )
  );

  const getImageSize = (slug: string, image: string) => {
    var mockImage = document.createElement("img");

    mockImage.src = image;
    mockImage.onload = function () {
      setImageSizes((sizes) => ({
        ...sizes,
        [slug]: { width: mockImage.width, height: mockImage.height },
      }));
    };
  };

  React.useEffect(() => {
    projects.forEach((project) =>
      getImageSize(project?.slug, project?.headerImage)
    );
  }, []);

  return (
    <div className="container">
      <SeoTags
        title={"Projects"}
        description={"All projects"}
        imageUrl="/logo.svg"
      />
      <div className="topmargin heading-block center">
        <h2>
          <i className="i-plain color col-hidden-md-down i-xlarge icon-diamond inline-block" />
          All Projects
        </h2>
      </div>
      <ul className="portfolio-filter" data-container="#portfolio">
        <li
          className={filter ? "" : "activeFilter"}
          onClick={() => setFilter(null)}
          style={{ cursor: "pointer" }}
        >
          <a>All</a>
        </li>
        {allFeatures.map((feature) => (
          <li
            key={feature}
            className={filter === feature ? "activeFilter" : ""}
            style={{ cursor: "pointer" }}
            onClick={() => setFilter(feature)}
          >
            <a>{sentenceCase(feature)}</a>
          </li>
        ))}
      </ul>
      <div className="clear" />
      <div
        id="portfolio"
        className="bottommargin portfolio grid-container all-projects"
        data-layout="fitRows"
      >
        {projects
          .filter((project) => {
            if (!filter) return true;
            return Object.keys(project.features).includes(filter)
              ? true
              : false;
          })
          .map(({ headerImage, slug, title, features }) => {
            const fullSlug = `/projects/${slug}`;

            const { width, height } = imageSizes?.[slug] || {};
            return (
              <div key={fullSlug} className="oc-item">
                <div className="iportfolio">
                  <div className="portfolio-image">
                    <Link href={fullSlug}>
                      <ExportedImage
                        placeholder="empty"
                        alt="Webdesign Antwerpen - Portfolio"
                        src={headerImage}
                      />
                    </Link>
                    <Gallery>
                      <Item
                        original={headerImage}
                        width={width}
                        height={height}
                      >
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
            );
          })}
      </div>
      {/* #portfolio end */}
    </div>
  );
};
