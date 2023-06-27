import { sentenceCase } from "change-case";
import Link from "next/link";
import React, { FunctionComponent } from "react";
import { uniq } from "ramda";
import ExportedImage from "next-image-export-optimizer";
import { SeoTags } from "src/components/SeoTags";

interface Props {}

export const ArticleOverview: FunctionComponent<Props> = ({ articles }) => {
  const [filter, setFilter] = React.useState(null);
  const [imageSizes, setImageSizes] = React.useState({});

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
    articles.forEach((article) =>
      getImageSize(article?.slug, article?.headerImage)
    );
  }, []);

  const allCategories = uniq(
    articles.reduce(
      (acc, article) => [...acc, article.category.toLowerCase()],
      []
    )
  );

  return (
    <div className="container clearfix">
      <SeoTags
        title={"Articles"}
        description={"All articles"}
        imageUrl="/logo.svg"
      />
      <div className="topmargin heading-block center">
        <h2>
          <i className="i-plain color col-hidden-md-down i-xlarge icon-diamond inline-block" />
          All Articles
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
        {allCategories.map((category) => (
          <li
            key={category}
            className={filter === category ? "activeFilter" : ""}
            style={{ cursor: "pointer" }}
            onClick={() => setFilter(category)}
          >
            <a>{sentenceCase(category)}</a>
          </li>
        ))}
      </ul>
      <div className="clear" />
      <div
        id="portfolio"
        className="bottommargin portfolio grid-container all-articles"
        data-layout="fitRows"
      >
        {articles
          .filter((article) => {
            if (!filter) return article?.posted;
            return article?.posted && article.category.toLowerCase() === filter;
          })
          .map(({ title, en_description, slug, headerImage }) => {
            return (
              <div key={title} className="oc-item">
                <div className="ipost">
                  <div className="entry-image">
                    <Link href={slug}>
                      {headerImage && (
                        <ExportedImage
                          placeholder="empty"
                          alt="Webdesign Antwerpen - Nieuws"
                          className="image_fade"
                          src={headerImage}
                          width={imageSizes?.[slug]?.width | 250}
                          height={imageSizes?.[slug]?.height | 250}
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
            );
          })}
      </div>
      {/* #portfolio end */}
    </div>
  );
};
