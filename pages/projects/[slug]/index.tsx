import { ProjectDetail } from "src/pages/projects/detail/ProjectDetail";
import glob from "glob";

import * as projects from "src/data/projects";
import { intersection } from "ramda";

export default function ProjectDetailPage({ project, relatedProjects }) {
  return <ProjectDetail project={project} relatedProjects={relatedProjects} />;
}

export async function getStaticProps({ params }: any) {
  const slug = params?.slug;

  const project =
    projects.default.find((project) => project.slug === slug) || "";

  const features = Object.keys(project?.features);
  const id = project?.id;

  return {
    props: {
      project,
      relatedProjects:
        projects.default.filter(
          (project) =>
            intersection(Object.keys(project.features), features).length !==
              0 && project?.id !== id
        ) || [],
    },
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
