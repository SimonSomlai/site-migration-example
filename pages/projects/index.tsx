import * as projects from "src/data/projects";
import { ProjectOverview } from "src/pages/projects/index/ProjectOverview";

export default function ProjectOverviewPage({ projects }) {
  return <ProjectOverview projects={projects} />;
}

export async function getStaticProps({ params }: any) {
  return {
    props: {
      projects: projects.default,
    },
  };
}
