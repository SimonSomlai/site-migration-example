import React, { useEffect, useState } from "react";
import { ProjectsSlider } from "src/components/ProjectsSlider";
import { Gallery, Item } from "react-photoswipe-gallery";
import ExportedImage from "next-image-export-optimizer";
import videoImage from "src/images/video-play.png";
import { SeoTags } from "src/components/SeoTags";

const uiElements: GalleryProps["uiElements"] = [
  {
    name: "bulletsIndicator",
    order: 9,
    isButton: false,
    appendTo: "wrapper",
    onInit: (el, pswpInstance) => {
      let prevIndex = -1;
      const thumbnails: HTMLElement[] = [];

      el.style.position = "absolute";
      el.style.bottom = "20px";
      el.style.left = "10px";
      el.style.right = "0";
      el.style.display = "grid";
      el.style.gridGap = "10px";
      el.style.gridTemplateColumns = "repeat(auto-fit, 40px)";
      el.style.gridTemplateRows = "repeat(auto-fit, 40px)";
      el.style.justifyContent = "center";

      const dataSource = pswpInstance.options.dataSource as DataSourceArray;

      for (let i = 0; i < dataSource.length; i++) {
        const slideData = dataSource[i];

        const thumbnail = document.createElement("div");
        thumbnail.style.transition = "transform 0.15s ease-in";
        thumbnail.style.opacity = "0.6";
        thumbnail.style.cursor = "pointer";
        thumbnail.onclick = (e: MouseEvent) => {
          const target = e.target as HTMLImageElement | HTMLDivElement;
          const thumbnailEl =
            target.tagName === "IMG"
              ? target.parentElement
              : (e.target as HTMLImageElement | HTMLDivElement);
          if (thumbnailEl) {
            pswpInstance.goTo(thumbnails.indexOf(thumbnailEl));
          }
        };

        const thumbnailImage = document.createElement("img");
        thumbnailImage.setAttribute("src", slideData.msrc || "");
        thumbnailImage.style.width = "100%";
        thumbnailImage.style.height = "100%";
        thumbnailImage.style.objectFit = "cover";

        thumbnail.appendChild(thumbnailImage);

        el.appendChild(thumbnail);

        thumbnails.push(thumbnail);
      }

      pswpInstance.on("change", () => {
        if (prevIndex >= 0) {
          const prevThumbnail = thumbnails[prevIndex];
          prevThumbnail.style.opacity = "0.6";
          prevThumbnail.style.cursor = "pointer";
          prevThumbnail.style.transform = "scale(1)";
        }

        const currentThumbnail = thumbnails[pswpInstance.currIndex];
        currentThumbnail.style.opacity = "1";
        currentThumbnail.style.cursor = "unset";
        currentThumbnail.style.transform = "scale(1.2)";

        prevIndex = pswpInstance.currIndex;
      });
    },
  },
];

export const ProjectDetail = ({ project, relatedProjects }: any) => {
  const [imageSizes, setImageSizes] = useState({});

  const getImageSize = (slug: string, image: string) => {
    if (Object.keys(imageSizes?.[project?.id]?.[slug] || {})?.length !== 0) {
      return;
    }
    var mockImage = document.createElement("img");
    mockImage.src = image;
    mockImage.onload = function () {
      // let aspect = aspectRatio(mockImage.height, mockImage.width);
      setImageSizes((sizes) => ({
        ...sizes,
        [project?.id]: {
          ...sizes?.[project?.id],
          [slug]: { width: mockImage.width, height: mockImage.height },
        },
      }));
    };
  };

  const imageCount = project?.images;
  const images = Array(imageCount)
    .fill("")
    .map((_, index) => `/projects/${project?.slug}/${index + 1}.png`);

  const video = project?.video;
  const features = Object.entries(project?.features) || [];

  useEffect(() => {
    if (Object.keys(imageSizes?.[project?.id] || {})?.length !== 0) return;
    images.forEach((image, index) => getImageSize(index.toString(), image));
  }, [images, project]);

  return (
    <div className="container clearfix">
      <SeoTags
        title={project?.title}
        description={project?.description}
        imageUrl={project?.headerImage}
      />
      <Gallery uiElements={uiElements}>
        <div
          className="col_three_fifth portfolio-single-image nobottommargin"
          data-lightbox="gallery"
        >
          <Item
            original={project?.headerImage}
            thumbnail={project?.headerImage}
            width={imageSizes?.[project?.id]?.[0]?.width}
            height={imageSizes?.[project?.id]?.[0]?.height}
          >
            {({ ref, open }) => (
              <a
                ref={ref}
                onClick={(e) => {
                  e.preventDefault();

                  open(e);
                }}
                style={{
                  cursor: "zoom-in",
                  position: "relative",
                  width: "100%",
                  paddingBottom: "100%",
                }}
              >
                <ExportedImage
                  placeholder="empty"
                  alt={`${project?.title} - Webdesign Antwerpen`}
                  className="main"
                  src={project?.headerImage}
                  fill
                />
              </a>
            )}
          </Item>
          <ol className="flex-control-nav hidden-xs">
            {images.map((image, index) => {
              if (index === 0) return null;

              return (
                <Item
                  key={image}
                  original={image}
                  thumbnail={image}
                  width={imageSizes?.[project?.id]?.[index]?.width}
                  height={imageSizes?.[project?.id]?.[index]?.height}
                >
                  {({ ref, open }) => (
                    <li ref={ref}>
                      <a
                        onClick={(e) => {
                          e.preventDefault();
                          getImageSize(index.toString(), image);

                          open(e);
                        }}
                        className="
                        "
                        style={{
                          position: "relative",
                          paddingLeft: "100%",
                          paddingBottom: "100%",
                          zIndex: 3,
                          display: "block",
                        }}
                      >
                        <ExportedImage
                          placeholder="empty"
                          alt={`${project?.title} - Webdesign Antwerpen`}
                          src={image}
                          fill
                        />
                      </a>
                    </li>
                  )}
                </Item>
              );
            })}
            {video && (
              <Item
                key={video}
                width={1024}
                height={768}
                thumbnail={videoImage.src}
                content={
                  <video
                    placeholder={videoImage.src}
                    controls
                    width="1024"
                    height="768"
                  >
                    <source src={video} type="video/mp4" />
                    Your browser does not support the video tag.
                  </video>
                }
              >
                {({ ref, open }) => (
                  <li ref={ref}>
                    <a
                      href={video}
                      data-lightbox="gallery-item"
                      className="mfp-iframe"
                      onClick={(e) => {
                        e.preventDefault();
                        open(e);
                      }}
                    >
                      <img src={videoImage.src} />
                    </a>
                  </li>
                )}
              </Item>
            )}
          </ol>
        </div>
      </Gallery>
      <div className="col_two_fifth portfolio-single-content col_last nobottommargin">
        <div className="fancy-title title-bottom-border">
          <h2 className="portfolio-single-title">{project?.title}</h2>
        </div>
        <p dangerouslySetInnerHTML={{ __html: project?.en_description }}></p>
        <ul className="portfolio-meta portfolio-meta--description bottommargin">
          <li>
            <span>
              <i className="icon-link" />
              Link:
            </span>{" "}
            <a target="_blank" href={project?.link}>
              {project?.title}
            </a>
          </li>
        </ul>
        <div className="fancy-title title-bottom-border">
          <h2 className="portfolio-single-title">Features:</h2>
        </div>
        <ul className="portfolio-meta portfolio-features bottommargin">
          <li>
            {features.map(([label, value]) => {
              const isIcon = value?.includes("icon");

              return isIcon ? (
                <div className="col_one_third nomargin cf">
                  <span className={label}>
                    <i className={value} />
                    {label}
                  </span>
                </div>
              ) : (
                <div className="col_one_third nomargin cf">
                  <span className={label}>
                    <ExportedImage
                      placeholder="empty"
                      style={{ width: 16, height: 16, marginRight: 8 }}
                      src={`/${value}`}
                      width={16}
                      height={16}
                    />
                    {label}
                  </span>
                </div>
              );
            })}
          </li>
        </ul>
      </div>
      <div className="clear" />
      <div className="divider divider-center">
        <i className="icon-circle" />
      </div>
      <h4>Related Projects:</h4>
      <ProjectsSlider projects={relatedProjects} />
    </div>
  );
};
