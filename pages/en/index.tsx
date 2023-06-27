import { useRouter } from "next/router";
import React from "react";

const Redirect = () => {
  const router = useRouter();
  React.useEffect(() => {
    const delocalizedPath = router.asPath.replace("/en", "") || "/";
    router.replace(delocalizedPath);
  });

  return null;
};

export default function HomePage() {
  return <Redirect />;
}

export async function getStaticProps(context) {
  return {
    props: {},
  };
}
