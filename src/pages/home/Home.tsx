import React from "react";
import Scroll from "react-scroll";
import { Pagination, Autoplay } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import { SECTIONS } from "src/constants";
import { ArticlesSlider } from "src/components/ArticlesSlider";
import { ProjectsSlider } from "src/components/ProjectsSlider";
import Link from "next/link";
import ExportedImage from "next-image-export-optimizer";
import slider from "../../../public//slider1-en.jpg";
import me from "../../../public/me.jpg";
import { SeoTags } from "src/components/SeoTags";

const Element = Scroll.Element;

export const Home = ({ testimonials, projects, articles }: any) => {
  return (
    <>
      <SeoTags
        title="Home"
        description="Welcome to Web Design Antwerp - Simon Somlai | I'm a freelance developer and offer business owners my expertise in creating their modern applications"
        imageUrl="/logo.svg"
      />
      <section id="slider" className="boxed-slider">
        <div className="container clearfix">
          <div className="owl-stage-outer">
            <div className="owl-stage">
              <div className="owl-item active">
                <a href="#">
                  <ExportedImage
                    placeholder="empty"
                    alt="Home | Web Design Antwerp - Simon Somlai"
                    layout="responsive"
                    src={slider}
                  />
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section id="content" style={{ marginBottom: "0px" }}>
        <div className="content-wrap">
          <div className="container clearfix">
            <div className="row clearfix services-list">
              <Element
                name={SECTIONS.SERVICES}
                id={SECTIONS.SERVICES}
                className="line notopmargin"
              />
              <h3 className="services-heading center">
                My <span>Services</span>
              </h3>
              <a className="bob service-item-link">
                <div className="col-md-3 center bottommargin">
                  <i
                    className="i-plain color i-large icon-diamond inline-block"
                    style={{ marginBottom: "20px" }}
                  />
                  <div
                    className="heading-block nobottomborder"
                    style={{ marginBottom: "15px" }}
                  >
                    <span className="before-heading">Chasing dreams?</span>
                    <h4>Web Application</h4>
                  </div>
                  <p>
                    Need more efficiency in your organization? Looking for
                    something unique? We make your dream come true!
                  </p>
                </div>
              </a>
              <div className="col-md-3 center bottommargin bob service-item-link service-item-link--disabled hidden-xs">
                <i
                  className="i-plain color i-large icon-line2-energy inline-block"
                  style={{ marginBottom: "20px" }}
                />
                <div
                  className="heading-block nobottomborder"
                  style={{ marginBottom: "15px" }}
                >
                  <span className="before-heading">Need a webpage?</span>
                  <h4>Single Pages</h4>
                </div>
                <p>
                  Looking for someone to convert your design into HTML or
                  develop a specific page? Look no further!
                </p>
              </div>
              <div className="col-md-3 center bottommargin bob service-item-link service-item-link--disabled hidden-xs">
                <i
                  className="i-plain color i-large icon-line2-screen-desktop inline-block"
                  style={{ marginBottom: "20px" }}
                />
                <div
                  className="heading-block nobottomborder"
                  style={{ marginBottom: "15px" }}
                >
                  <span className="before-heading">Most popular!</span>
                  <h4>Starter Website</h4>
                </div>
                <p>
                  The ideal solution for someone who is looking for a modern,
                  fast and clean website at a budget rate or a more modern
                  version of their older site!
                </p>
              </div>
              <div className="col-md-3 center bottommargin bob service-item-link service-item-link--disabled hidden-xs">
                <i
                  className="i-plain color i-large icon-line2-rocket inline-block"
                  style={{ marginBottom: "20px" }}
                />
                <div
                  className="heading-block nobottomborder"
                  style={{ marginBottom: "15px" }}
                >
                  <span className="before-heading">Best price/quality!</span>
                  <h4>Custom Website</h4>
                </div>
                <p>
                  Looking for a more personal website to represent your company?
                  Unique on the web and made just for you? Then this is your
                  best choice!
                </p>
              </div>
            </div>
            <Element
              name={SECTIONS.PORTFOLIO}
              id={SECTIONS.PORTFOLIO}
              className="line notopmargin"
            />
            <h3 className="center" style={{ position: "relative" }}>
              My Latest <span>Projects </span>
              <span className="hidden-xs">
                <Link
                  style={{
                    fontSize: "13px",
                    verticalAlign: "middle",
                    textTransform: "inherit",
                    position: "absolute",
                    right: "0",
                  }}
                  className="more-link button button-mini button-circle button-3d"
                  href="/projects"
                >
                  All Projects »
                </Link>
              </span>
            </h3>
            <ProjectsSlider projects={projects} />
            <Link
              className="margin-top button button-3d button-rounded button-small btn-block text-center visible-xs button-3d button-content"
              href="/projects"
            >
              <span>
                <span title="translation missing: en.projects.all_projects »">
                  All Projects »
                </span>
              </span>
            </Link>
            <div className="line" />
            <h3 className="center">
              My <span>Reviews</span>!
            </h3>
            <Swiper
              modules={[Pagination, Autoplay]}
              className="review-slider"
              autoplay={{ delay: 50000, pauseOnMouseEnter: true }}
              pagination={{
                clickable: true,
                renderBullet: (_index, className) => {
                  return `<span
                      class="review-slider-dot ${className}"
                    >
                     
                    </span>`;
                },
              }}
              loop
            >
              {testimonials.map(({ name, company, en_quote, image, link }) => (
                <SwiperSlide key={name}>
                  <div className="review-slide">
                    <div className="testi-image">
                      <Link href={link}>
                        <ExportedImage
                          placeholder="empty"
                          alt="Webdesign Antwerpen - Testimonials"
                          width={72}
                          height={72}
                          src={image.url}
                          draggable="false"
                        />
                      </Link>
                    </div>
                    <div className="testi-content">
                      <p>{en_quote}</p>
                      <div className="testi-meta">
                        {name}
                        <span>{company}</span>
                      </div>
                    </div>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
            <Element
              name={SECTIONS.ARTICLES}
              id={SECTIONS.ARTICLES}
              className="line"
            />
            <h3 className="center" style={{ position: "relative" }}>
              Latest <span>Articles</span>
              <span className="hidden-xs">
                <Link
                  style={{
                    fontSize: "13px",
                    verticalAlign: "middle",
                    textTransform: "inherit",
                    position: "absolute",
                    right: "0",
                  }}
                  className="more-link button button-mini button-circle button-3d"
                  href="/articles"
                >
                  All Articles »
                </Link>
              </span>
            </h3>
            <ArticlesSlider articles={articles} />
            <Link
              className="margin-top button button-3d button-rounded button-small btn-block text-center visible-xs button-3d button-content"
              href="/articles"
            >
              <span>
                <span>All Articles »</span>
              </span>
            </Link>
            <Element
              name={SECTIONS.ABOUT}
              id={SECTIONS.ABOUT}
              className="line"
            />
            <h3 className="center">
              <span>About </span>
              Me
            </h3>
            <div className="col-md-6 bottommargin">
              <div className="team team-list clearfix">
                <div className="team-image" style={{ marginBottom: "20px" }}>
                  <ExportedImage
                    placeholder="empty"
                    className="img img-responsive"
                    alt="Webdesign Antwerpen - Contact"
                    src={me}
                  />
                </div>
                <div className="team-desc">
                  <div className="team-title">
                    <h4>Simon Somlai</h4>
                    <span>Full Stack Developer</span>
                  </div>
                  <div className="team-content hidden-xs">
                    <p>
                      I'd describe myself as analytical, organized, hard-working
                      and with a solid sense of humor! My free time is divided
                      between reading books, seeing friends, playing boardgames
                      &amp; gym-time.
                    </p>
                  </div>
                  <br />
                  <a
                    target="_blank"
                    className="button button-3d button-rounded nomargin button-small btn-block text-center"
                    href="/cv.pdf"
                  >
                    <i className="icon-download" />
                    <span>Download resume</span>
                  </a>
                  <a
                    target="_blank"
                    href="https://www.linkedin.com/in/simon-somlai-27a4648a/"
                    className="social-icon si-rounded si-small si-linkedin"
                  >
                    <i className="icon-linkedin" />
                    <i className="icon-linkedin" />
                  </a>
                  <a
                    target="_blank"
                    href="https://github.com/SimonSomlai"
                    className="social-icon si-rounded si-small si-github"
                  >
                    <i className="icon-github" />
                    <i className="icon-github" />
                  </a>
                  <a
                    target="_blank"
                    href="https://stackoverflow.com/users/5079884/simon-somlai"
                    className="social-icon si-rounded si-small si-stackoverflow"
                  >
                    <i className="icon-stackoverflow" />
                    <i className="icon-stackoverflow" />
                  </a>
                  <a
                    target="_blank"
                    href="https://www.youtube.com/channel/UCg9AnJ7AAVKkHZ4wQ0CXPAw/videos?view=0&sort=dd&shelf_id=0"
                    className="social-icon si-rounded si-small si-youtube"
                  >
                    <i className="icon-youtube" />
                    <i className="icon-youtube" />
                  </a>
                </div>
              </div>
            </div>
            <div className="col-md-6 cf">
              <div className="col_two_fifth">
                <b title="location">
                  <strong>Location: </strong>
                </b>
                <span style={{ fontSize: "14px" }}>Belgium</span>
                <br />
                <b title="Email Address">
                  <strong>Email: </strong>
                </b>
                <a href="mailto:info@truetech.be">
                  <span style={{ fontSize: "14px" }}>info@truetech.be</span>
                </a>
                <br />
                <b title="Now">
                  <strong>Current: </strong>
                </b>
                <Link href="/now">
                  <span style={{ fontSize: "14px" }}>Now</span>
                </Link>
                <br />
              </div>
              <div
                id="tags"
                className="hidden-xs hidden-sm"
                style={{ marginBottom: "20px" }}
              >
                <div
                  className="tagcloud"
                  style={{ display: "flex", flexWrap: "wrap" }}
                >
                  <a
                    onClick={(e) => e.preventDefault()}
                    style={{
                      fontSize: "26.0px !important",
                    }}
                  >
                    javascript
                  </a>
                  <a
                    onClick={(e) => e.preventDefault()}
                    style={{
                      fontSize: "25.2px !important",
                    }}
                  >
                    react
                  </a>
                  <a
                    onClick={(e) => e.preventDefault()}
                    style={{
                      fontSize: "25.2px !important",
                    }}
                  >
                    vue
                  </a>
                  <a
                    onClick={(e) => e.preventDefault()}
                    style={{
                      fontSize: "19.6px !important",
                    }}
                  >
                    ruby
                  </a>
                  <a
                    onClick={(e) => e.preventDefault()}
                    style={{
                      fontSize: "17.2px !important",
                    }}
                  >
                    rails
                  </a>
                  <a
                    onClick={(e) => e.preventDefault()}
                    style={{
                      fontSize: "17.2px !important",
                    }}
                  >
                    html
                  </a>
                  <a
                    onClick={(e) => e.preventDefault()}
                    style={{
                      fontSize: "17px !important",
                    }}
                  >
                    css
                  </a>
                  <a
                    onClick={(e) => e.preventDefault()}
                    style={{
                      fontSize: "16px !important",
                    }}
                  >
                    docker
                  </a>
                  <a
                    onClick={(e) => e.preventDefault()}
                    style={{
                      fontSize: "16px !important",
                    }}
                  >
                    node
                  </a>
                  <a
                    onClick={(e) => e.preventDefault()}
                    style={{
                      fontSize: "16.4px !important",
                    }}
                  >
                    redux
                  </a>
                  <a
                    onClick={(e) => e.preventDefault()}
                    style={{
                      fontSize: "15.6px !important",
                    }}
                  >
                    bash
                  </a>
                  <a
                    onClick={(e) => e.preventDefault()}
                    style={{
                      fontSize: "15px !important",
                    }}
                  >
                    typescript
                  </a>
                  <a
                    onClick={(e) => e.preventDefault()}
                    style={{
                      fontSize: "14.8px !important",
                    }}
                  >
                    contentful
                  </a>
                  <a
                    onClick={(e) => e.preventDefault()}
                    style={{
                      fontSize: "14px !important",
                    }}
                  >
                    graphql
                  </a>
                  <a
                    onClick={(e) => e.preventDefault()}
                    style={{
                      fontSize: "14px !important",
                    }}
                  >
                    terraform
                  </a>
                  <a
                    onClick={(e) => e.preventDefault()}
                    style={{
                      fontSize: "14px !important",
                    }}
                  >
                    gatsby
                  </a>
                  <a
                    onClick={(e) => e.preventDefault()}
                    style={{
                      fontSize: "14px !important",
                    }}
                  >
                    wordpress
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};
