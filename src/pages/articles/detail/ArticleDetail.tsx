import React, { useEffect } from "react";
import { ArticlesSlider } from "src/components/ArticlesSlider";
import { MDXProvider } from "@mdx-js/react";
import hljs from "highlight.js";
import { Gallery, Item } from "react-photoswipe-gallery";
import { sentenceCase } from "change-case";
import ReactMarkdown from "react-markdown";
import ExportedImage from "next-image-export-optimizer";
import parse from "html-react-parser";
import MDX from "@mdx-js/runtime";
import { SeoTags } from "src/components/SeoTags";
import { Test } from "src/components/Test";
import Link from "next/link";

let isMounted;
export const ArticleDetail = ({ article, relatedArticles }: any) => {
  const [imageSizes, setImageSizes] = React.useState({});

  const getImageSize = (slug: string, image: string) => {
    if (!isMounted || imageSizes[slug] !== undefined) return;
    var mockImage = document.createElement("img");

    mockImage.src = image;
    mockImage.onload = function () {
      setImageSizes((sizes) => ({
        ...sizes,
        [slug]: { width: mockImage.width, height: mockImage.height },
      }));
    };
  };

  useEffect(() => {
    hljs.highlightAll();
  });

  useEffect(() => {
    isMounted = true;
    setImageSizes({});
  }, []);

  return (
    <div id="blog-article" className="container blog-single-content">
      <SeoTags
        title={article?.title}
        description={article?.en_description}
        imageUrl={article?.headerImage}
        type="article"
      />
      <div className="row">
        <div
          id="content"
          className="article-content col-lg-9 col-centered"
          role="main"
          style={{ marginBottom: "0px" }}
        >
          <div className="page-inner">
            <article
              id="post-17"
              className="post-17 post type-post status-publish format-standard has-post-thumbnail hentry category-style tag-brooklyn tag-fashion tag-style-2 tag-women-3"
            >
              <header className="entry-header text-center">
                <h1 className="entry-title">{article?.title}</h1>
              </header>
              <div className="entry-image">
                {article?.headerImage && (
                  <ExportedImage
                    placeholder="empty"
                    alt={`${article?.title} - Webdesign Antwerpen`}
                    className="attachment-large size-large wp-post-image"
                    src={article?.headerImage}
                    width={778}
                    height={519}
                  />
                )}
              </div>
              <Gallery>
                {article?.html && (
                  <div className="entry-content entry-content-blog-single">
                    {parse(article?.html, {
                      replace: ({ attribs, children }) => {
                        if (!attribs) return null;

                        if (attribs["data-action"] === "zoom") {
                          getImageSize(attribs?.src, attribs?.src);
                          const className = attribs.class;
                          delete attribs.class;

                          return (
                            <div
                              style={{
                                position: "relative",
                                height: "auto",
                                width: "100%",
                                objectFit: "contain",
                                cursor: "zoom-in",
                              }}
                            >
                              <Item
                                original={attribs?.src}
                                thumbnail={attribs?.src}
                                width={imageSizes?.[attribs?.src]?.width}
                                height={imageSizes?.[attribs?.src]?.height}
                              >
                                {({ ref, open }) => (
                                  <ExportedImage
                                    placeholder="empty"
                                    {...attribs}
                                    className={className}
                                    style={{ cursor: "zoom-in" }}
                                    ref={ref}
                                    onClick={(e) => {
                                      e.preventDefault();

                                      open(e);
                                    }}
                                    loading="lazy"
                                    alt={`${article?.title} - Webdesign Antwerpen`}
                                    width={
                                      imageSizes?.[attribs?.src]?.width || 500
                                    }
                                    height={
                                      imageSizes?.[attribs?.src]?.height || 500
                                    }
                                  />
                                )}
                              </Item>
                            </div>
                          );
                        }
                      },
                    })}
                  </div>
                )}
                {article?.markdown && (
                  <div className="entry-content entry-content-blog-single">
                    <MDX
                      components={{
                        Test,
                        a: (link: any) => {
                          const { href, children } = link;
                          return (
                            <Link href={href} target="_blank">
                              {children}
                            </Link>
                          );
                        },
                        img: (image: any) => {
                          const url = image?.src;

                          const isVideo = url.match(/mov|mp4/, "gi");
                          const alt = image?.alt;
                          const thumb = alt?.match(/thumb/gi) ? "side" : "";
                          const left = alt?.match(/left/gi)
                            ? "pull-left side nomarginleft"
                            : "";
                          const right = alt?.match(/right/gi)
                            ? "pull-right side nomarginright"
                            : "";
                          const fullPath = `articles/${article?.slug}/media/${url}`;
                          if (isVideo) {
                            return <video controls src={fullPath} />;
                          }

                          getImageSize(fullPath, fullPath);
                          if (!url || !imageSizes?.[fullPath]) return;

                          return (
                            <div
                              style={{
                                position: "relative",
                                height: "auto",
                                width: "100%",
                                objectFit: "contain",
                                cursor: "zoom-in",
                              }}
                            >
                              <Item
                                original={fullPath}
                                thumbnail={fullPath}
                                width={imageSizes?.[fullPath]?.width || 500}
                                height={imageSizes?.[fullPath]?.height || 500}
                              >
                                {({ ref, open }) => (
                                  <ExportedImage
                                    className={`${left} ${right} ${thumb}`}
                                    placeholder="empty"
                                    alt={`${article?.title} - Webdesign Antwerpen`}
                                    src={fullPath}
                                    ref={ref}
                                    onClick={(e) => {
                                      e.preventDefault();
                                      open(e);
                                    }}
                                    width={imageSizes?.[fullPath]?.width || 500}
                                    height={
                                      imageSizes?.[fullPath]?.height || 500
                                    }
                                  />
                                )}
                              </Item>
                            </div>
                          );
                        },
                      }}
                    >
                      {article.markdown}
                    </MDX>
                  </div>
                )}
              </Gallery>
            </article>
          </div>
        </div>
        {article?.posted && (
          <>
            <div id="technology-cat" className="line" />
            <h3 className="center bottommargin">
              Related<span> Articles</span>
            </h3>
            <ArticlesSlider articles={relatedArticles} />
          </>
        )}
      </div>
    </div>
  );
};
