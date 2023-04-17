import { Header } from "../../components/Header";
import { ProjectCard } from "../../components/ProjectCard";

export default function Projects(): JSX.Element {
    return (
        <div className="flex flex-col items-center w-screen h-screen">
            <Header title="Ticket master" user="user"></Header>
            <div className="w-9/12 h-5/6 mt-10">
                <div className=" w-full grid grid-cols-3 gap-y-8 justify-items-center">
                    <ProjectCard></ProjectCard>
                    <ProjectCard></ProjectCard>
                    <ProjectCard></ProjectCard>
                    <ProjectCard></ProjectCard>
                    <ProjectCard></ProjectCard>

                </div>

            </div>
        </div>
    );
}