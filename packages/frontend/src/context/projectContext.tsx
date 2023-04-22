import { FC, createContext, useCallback, useContext, useMemo, useState, useEffect } from 'react';
import { Project, User, UserBody, ProjectBody } from '../../lib/types';


interface APIClient {
    getUsers: () => Promise<User[]>;
    getUser: (userId: number) => Promise<User>;
    createUser: (user: UserBody) => Promise<number>;
    deleteUser: (userId: number) => Promise<number>;
    getProjects: () => Promise<Project[]>;
    getProject: (projectId: number) => Promise<Project>;
    createProject: (project: ProjectBody) => Promise<number>;
    deleteProject: (projectId: number) => Promise<number>;
}

export interface ProjectContextProps {
    apiClient: APIClient;
    userId: number | undefined;
    signIn: (userId: number) => void;
}

const ProjectContext = createContext<ProjectContextProps>({
    apiClient: {
        getUsers: async () => {
            throw Error('not implemented')
        },
        getUser: async (userId: number) => {
            throw Error('not implemented')
        },
        createUser: async () => {
            throw Error('not implemented')
        },
        deleteUser: async () => {
            throw Error('not implemented');
        },
        getProjects: async () => {
            throw Error('not implemented')
        },
        getProject: async () => {
            throw Error('not implemented')
        },
        createProject: async () => {
            throw Error('not implemented')
        },
        deleteProject: async () => {
            throw Error('not implemented')
        }
    },
    userId: undefined,
    signIn: () => {
        throw Error('not implemented')
    }
});

interface ProjectContextProviderProps {
    children: any;
}

const apiBasePath = "http://0.0.0.0:3034/dev";

export const ProjectContextProvider: FC<ProjectContextProviderProps> = ({ children }) => {
    const [ userId, setUserId ] = useState<number | undefined>(getIdFromLocalStorage('userId'));
    const [ projectId, setProjectId ] = useState<number | undefined>(getIdFromLocalStorage('projectId'));

    useEffect(() => {
        if (userId) saveToLocalStorage('userId', JSON.stringify(userId));
    }, [userId]);

    useEffect(() => {
        if (projectId) saveToLocalStorage('projectId', JSON.stringify(projectId));
    }, [projectId]);

    const apiClient: APIClient = useMemo(() => {
        const getRequest = async (path: string): Promise<Response> => {
            return await fetch(apiBasePath + path, { method: 'GET' });
        };

        const postRequest = async (path: string, body?: string): Promise<Response> => {
            return await fetch(apiBasePath + path, { method: 'POST', body: body });
        }

        const deleteRequest = async (path: string): Promise<Response> => {
            return await fetch(apiBasePath + path, { method: 'DELETE' });
        }

        const getUsers =async (): Promise<User[]> => {
            const response = await getRequest('/users');
            const json = await response.json();
            const result = json.users.map((user: { id: any; name: any; color: any; }) => { return { id: Number(user.id), name: user.name, color: user.color } as User})
            if (response.ok) {
                return result;
            } else {
                throw json;
            }
        }

        const getUser = async (userId: number): Promise<User> => {
            const response = await getRequest(`/users/${userId}`);
            const json = await response.json();
            if (response.ok) {
                return json.user;
            } else {
                throw json;
            }
        }

        const createUser = async (user: UserBody): Promise<number> => {
            const response = await postRequest('/users', JSON.stringify(user));
            const json = await response.json();
            if (response.ok) {
                return json.id;
            } else {
                throw json;
            }
        }

        const deleteUser = async (userId: number): Promise<number> => {
            const response = await deleteRequest(`/users/${userId}`);
            const json = await response.json();
            if (response.ok) {
                return json.id;
            } else {
                throw json;
            }
        }

        const getProjects = async (): Promise<Project[]> => {
            const response = await getRequest('/projects');
            const json = await response.json();
            console.log(JSON.stringify(json));
            //const result = json.users.map((user: { id: any; name: any; color: any; }) => { return { id: Number(user.id), name: user.name, color: user.color } as User})
            if (response.ok) {
                return json.projects;
            } else {
                throw json;
            }
        }

        const getProject = async (projectId: number): Promise<Project> => {
            const response = await getRequest(`/projects/${projectId}`);
            const json = await response.json();
            if (response.ok) {
                return json.project;
            } else {
                throw json;
            }
        }

        const createProject = async (project: ProjectBody): Promise<number> => {
            const response = await postRequest('/projects', JSON.stringify(project));
            const json = await response.json();
            if (response.ok) {
                return json.id;
            } else {
                throw json;
            }
        }

        const deleteProject = async (projectId: number): Promise<number> => {
            const response = await deleteRequest(`/projects/${projectId}`);
            const json = await response.json();
            if (response.ok) {
                return json.id;
            } else {
                throw json;
            }
        }

        return{
            getUsers,
            getUser,
            createUser,
            deleteUser,
            getProjects,
            getProject,
            createProject,
            deleteProject
        }
    }, []);

    const signIn = useCallback((userId: number) => {
        setUserId(userId);
    }, []);

    const projectContext: ProjectContextProps = {
        apiClient,
        userId,
        signIn
    };

    return <ProjectContext.Provider value={projectContext}>{children}</ProjectContext.Provider>;

};

const saveToLocalStorage = (itemName: string, itemObj: string) => {
    localStorage.setItem(itemName, itemObj);
}

const getIdFromLocalStorage = (keyName: string): number | undefined => {
    const id = localStorage.getItem(keyName);
    return id && typeof id != 'undefined' ? JSON.parse(id) : undefined;
}

export const useProjectContext = () => useContext(ProjectContext);