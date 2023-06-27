import { ArticleDetail } from "src/pages/articles/detail/ArticleDetail";
import glob from "glob";
import matter from "gray-matter";
import fs from "fs";
import * as articles from "src/data/articles";

export default function ArticleDetailPage({ article, relatedArticles }) {
  return <ArticleDetail article={article} relatedArticles={relatedArticles} />;
}

export async function getStaticProps({ params }: any) {
  const _webpackContext = require.context("public", true, /\.mdx$/); // this line makes hot reloading work 🤷‍♂️
  const slug = params?.slug;
  const article =
    articles.default.find((article) => article.slug === slug) || "";
  const category = article?.category;
  const id = article?.id;
  const isMarkDown = !article?.html;

  let data = null;
  if (isMarkDown) {
    const fileContents = fs.readFileSync(
      `public/articles/${article?.slug}/${article?.slug}.mdx`,
      "utf8"
    );

    data = matter(fileContents).content;
  }

  const relatedArticles = articles.default.filter(
    (article) =>
      article?.posted && article?.category === category && article?.id !== id
  );
  const related =
    relatedArticles.length === 0 ? articles.default : relatedArticles;

  return {
    props: {
      article: isMarkDown ? { ...article, markdown: data } : article,
      relatedArticles: related,
    },
  };
}

export async function getStaticPaths() {
  // getting all image files from the articles directory
  const articlePaths = glob.sync("public/articles/*");
  const slugs = articlePaths.map((path) => {
    const splitted = path.split("/");
    return splitted[splitted.length - 1];
  });

  // creating a path for each of the `slug` parameter
  const paths = slugs.map((slug) => {
    return { params: { slug } };
  });

  return {
    paths,
    fallback: false,
  };
}
