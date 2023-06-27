import Head from "next/head";
import { useRouter } from "next/router";
import React from "react";

export const SeoTags = ({ title, description, imageUrl, type }) => {
  const router = useRouter();
  return (
    <>
      <Head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <title>{`${title} | Web Design Antwerp - Simon Somlai`}</title>
        <meta name="description" content={description} />
        <meta name="author" content="Simon Somlai" />

        <meta
          name="title"
          content={`${title} | Web Design Antwerp - Simon Somlai`}
        />
        <meta name="description" content={description} />
        <meta name="type" content={type || "website"} />
        <meta
          name="url"
          content={`https://www.simonsomlai.com${router.asPath.replace(
            "#",
            ""
          )}`}
        />
        <meta name="image" content={`https://www.simonsomlai.com${imageUrl}`} />
        <meta
          property="og:title"
          content={`${title} | Web Design Antwerp - Simon Somlai`}
        />
        <meta property="og:description" content={description} />
        <meta property="og:type" content={type || "website"} />
        <meta
          property="og:url"
          content={`https://www.simonsomlai.com${router.asPath.replace(
            "#",
            ""
          )}`}
        />
        <meta
          property="og:image"
          content={`https://www.simonsomlai.com${imageUrl}`}
        />
      </Head>
    </>
  );
};
