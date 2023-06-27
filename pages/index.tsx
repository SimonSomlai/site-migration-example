import { Home } from "src/pages/home/Home";
import * as projects from "src/data/projects";
import * as testimonials from "src/data/testimonials";
import * as articles from "src/data/articles";

export default function HomePage({ projects, testimonials, articles }: any) {
  return (
    <Home projects={projects} testimonials={testimonials} articles={articles} />
  );
}

export async function getStaticProps() {
  return {
    props: {
      testimonials: testimonials.default,
      projects: projects.default,
      articles: articles.default.filter((article) => article?.posted),
    },
  };
}
