import glob from "glob";
import { useRouter } from "next/router";
import React from "react";

const RedirectComponent = () => {
  const router = useRouter();
  React.useEffect(() => {
    const delocalizedPath = router.asPath.replace("/en", "") || "/";
    router.replace(delocalizedPath);
  });

  return null;
};

export default function Redirect() {
  return <RedirectComponent />;
}

export async function getStaticProps(context) {
  return {
    props: {},
  };
}

export async function getStaticPaths() {
  // getting all image files from the articles directory
  const articlePaths = glob.sync("public/articles/*");
  const slugs = articlePaths.map((path) => {
    const splitted = path.split("/");
    return splitted[splitted.length - 1];
  });

  const paths = slugs.map((slug) => {
    return { params: { slug } };
  });

  return {
    paths,
    fallback: false,
  };
}
