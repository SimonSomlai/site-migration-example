import Link from "next/link";
import React, { FunctionComponent } from "react";
import Scroll from "react-scroll";
import { SECTIONS } from "src/constants";
import { useRouter } from "next/router";

const NAV_HEIGHT = 160;
const scroller = Scroll.scroller;

export const Layout = ({ children }: any) => {
  const router = useRouter();
  const [sticky, setSticky] = React.useState(false);

  const handleScroll = (id: string) => {
    scroller.scrollTo(id, {
      duration: 500,
      delay: 0,
      smooth: true,
    });
  };

  const scrollToTop = () => {
    scroller.scrollTo("__next", {
      duration: 500,
      delay: 0,
      smooth: true,
    });
  };

  const updateNav = () => {
    const scrollHeight = window?.scrollY;
    if (scrollHeight >= NAV_HEIGHT) {
      setSticky(true);
    } else if (scrollHeight < NAV_HEIGHT) {
      setSticky(false);
    }
  };

  const showHome = router.pathname !== "" && router.pathname !== "/";

  React.useEffect(() => {
    updateNav();

    window.addEventListener("scroll", updateNav);
    return () => window.removeEventListener("scroll", updateNav);
  }, []);

  return (
    <>
      <div
        id="wrapper"
        className="clearfix"
        style={{ animationDuration: "1500ms", opacity: 1 }}
      >
        <header
          id="header"
          className={`sticky-style-2 ${sticky ? "sticky-header" : ""}`}
        >
          <div className="container clearfix">
            <Link href="/">
              <div id="logo" className="center-block text-center">
                <h1 className="main-logo center-block text-center">
                  {/*?xml version="1.0" encoding="UTF-8"?*/}
                  <svg
                    width="98px"
                    height="99px"
                    viewBox="0 0 98 99"
                    version="1.1"
                    xmlns="http://www.w3.org/2000/svg"
                    xmlnsXlink="http://www.w3.org/1999/xlink"
                  >
                    <g
                      id="Page-1"
                      stroke="none"
                      strokeWidth={1}
                      fill="none"
                      fillRule="evenodd"
                    >
                      <g id="simonsomlai" fill="currentColor">
                        <path
                          d="M7.85165192,8.84277394 C-2.69187172,19.8834206 -3.30451575,38.669769 10.2354079,49.4952046 C17.9351929,55.6509418 19.8815572,55.9692647 49.918572,55.9701614 C75.6166491,55.9719548 75.2266623,55.9405708 78.6499789,58.3239575 C89.330441,65.7601599 87.0601288,81.2010624 74.6474828,85.5446008 C73.3177796,86.0099799 69.8703677,86.0906815 51.2491677,86.0951649 C31.875659,86.0996483 29.3465456,86.1642096 28.8494686,86.6645594 C28.2024653,87.3137588 28.020412,97.3144781 28.637073,98.2954506 C29.0707883,98.9841041 66.9236025,99.2889767 72.614554,98.6487442 C97.8905172,95.8080485 107.118122,64.356849 87.1877447,48.9814045 C79.8966872,43.3565043 78.1430853,43.0892924 48.4567909,43.0686687 C20.6909806,43.0489416 21.8662955,43.2031713 17.3354878,38.9770985 C10.1827552,32.3057678 11.2018969,20.7699251 19.4166073,15.4355506 C23.3557416,12.8782072 22.7533593,12.9311116 47.6830642,12.9311116 C67.4974275,12.9311116 70.0649149,12.867447 70.5628843,12.3670972 C71.3901561,11.5367676 71.3901561,1.41320257 70.5628843,0.582872969 C69.7971894,-0.187378788 27.5661711,-0.197242315 23.3825142,0.571216074 C16.9930191,1.74480525 11.7451981,4.76564861 7.85165192,8.84277394 Z M81.3870258,0.266343434 C80.8105236,0.416986385 80.762333,1.2069652 80.762333,10.4177056 C80.762333,15.9098966 80.6650594,20.659633 80.5454753,20.9716791 C80.3509281,21.4827891 77.6245903,21.5392802 53.3749081,21.5392802 L26.4211984,21.5392802 L24.68366,22.4897655 C20.6588535,24.6911253 20.3366905,30.3895536 24.0857398,33.0760195 L25.2539153,33.9135226 L59.0596126,34.0085712 L92.8653098,34.1036197 L93.0777054,32.9325501 C93.5837065,30.1447588 93.1000158,0.723652393 92.5422544,0.369462121 C92.0148352,0.0349989017 82.6016071,-0.0528761532 81.3870258,0.266343434 M6.06692207,64.967491 C5.25660626,65.441837 5.08347712,98.0210652 5.88843841,98.5420388 C6.54079618,98.9652737 15.0446501,99.1356437 16.5082161,98.7545529 L17.7576017,98.4299532 L17.9360853,88.0508332 L18.114569,77.6717132 L44.5301504,77.4923764 C59.2630839,77.3919478 71.2616478,77.1686734 71.6596664,76.9857498 C76.6179424,74.7117586 77.141792,68.4197253 72.5967056,65.7350527 L70.9457318,64.7594603 L38.8186733,64.6805521 C17.4934459,64.6285444 6.48189658,64.7244896 6.06692207,64.967491"
                          id="path1"
                        />
                      </g>
                    </g>
                  </svg>
                </h1>
              </div>
            </Link>
          </div>
          <div id="header-wrap">
            <nav id="primary-menu" className="style-2 center">
              <div className="container clearfix">
                <ul
                  className="sf-js-enabled show"
                  style={{ touchAction: "pan-y" }}
                >
                  {showHome ? (
                    <li>
                      <Link
                        href="/"
                        className="no-transition home-menu-item"
                        onClick={() => handleScroll(SECTIONS.SERVICES)}
                      >
                        <div>Home</div>
                      </Link>
                    </li>
                  ) : (
                    <>
                      {" "}
                      <li>
                        <a
                          className="no-transition home-menu-item"
                          onClick={() => handleScroll(SECTIONS.SERVICES)}
                        >
                          <div>Services</div>
                        </a>
                      </li>
                      <li>
                        <a
                          className="no-transition home-menu-item"
                          onClick={() => handleScroll(SECTIONS.PORTFOLIO)}
                        >
                          <div>Portfolio</div>
                        </a>
                      </li>
                      <li>
                        <a
                          className="no-transition home-menu-item"
                          onClick={() => handleScroll(SECTIONS.ARTICLES)}
                        >
                          <div>Articles</div>
                        </a>
                      </li>
                      <li>
                        <a
                          className="no-transition home-menu-item"
                          onClick={() => handleScroll(SECTIONS.ABOUT)}
                        >
                          <div>Contact</div>
                        </a>
                      </li>
                    </>
                  )}
                </ul>
              </div>
            </nav>
          </div>
        </header>
        {children}
      </div>
      <footer id="footer" style={{ border: "none" }}>
        <div className="line" />
        <footer>
          {sticky && (
            <div
              id="gotoTop"
              className="icon-angle-up"
              style={{ display: "block" }}
              onClick={scrollToTop}
            />
          )}
        </footer>
      </footer>
    </>
  );
};
