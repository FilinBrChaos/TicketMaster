import { Header } from "../../components/Header";
import { ProjectCard } from "../../components/ProjectCard";

export default function Projects(): JSX.Element {
    return (
        <div className="flex flex-col items-center w-screen h-screen">
            <Header title="Ticket master" user="user"></Header>
            <div className="flex flex-row w-9/12 h-5/6">
                <ProjectCard></ProjectCard>
            </div>
        </div>
    );
}