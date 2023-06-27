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
  const projectPaths = glob.sync("public/projects/*");
  const slugs = projectPaths.map((path) => {
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
