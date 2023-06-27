import * as articles from "src/data/articles";
import { ArticleOverview } from "src/pages/articles/index/ArticleOverview";

export default function ArticleOverviewPage({ articles }) {
  return <ArticleOverview articles={articles} />;
}

export async function getStaticProps({ params }: any) {
  return {
    props: {
      articles: articles.default,
    },
  };
}
