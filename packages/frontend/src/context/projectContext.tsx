import { FC, createContext, useCallback, useContext, useMemo, useState, useEffect } from 'react';
import { Project, User, UserBody, ProjectBody, Ticket, TicketBody } from '../../lib/types';


interface APIClient {
    getUsers: () => Promise<User[]>;
    getUser: (userId: number) => Promise<User>;
    createUser: (user: UserBody) => Promise<number>;
    deleteUser: (userId: number) => Promise<number>;

    getProjects: () => Promise<Project[]>;
    getProject: (projectId: number) => Promise<Project>;
    createProject: (project: ProjectBody) => Promise<number>;
    deleteProject: (projectId: number) => Promise<number>;
    
    getTickets: (projectId: number) => Promise<Ticket[]>;
    getTicket: (ticketId: number, queryParams: any) => Promise<Ticket>;
    createTicket: (ticket: TicketBody) => Promise<number>;
    deleteTicket: (ticketId: number) => Promise<number>;
    updateTicket: (ticketId: number, ticket: TicketBody) => Promise<number>;
}

export interface ProjectContextProps {
    apiClient: APIClient;
    userId: number | null;
    signIn: (userId: number) => void;
    setProject: (projectId: number) => void;
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
        },
        getTickets: async () => {
            throw Error('not implemented')
        },
        getTicket: async () => {
            throw Error('not implemented')
        },
        createTicket: async () => {
            throw Error('not implemented')
        },
        deleteTicket: async () => {
            throw Error('not implemented')
        },
        updateTicket: async () => {
            throw Error('not implemented')
        }
    },
    userId: null,
    signIn: () => {
        throw Error('not implemented')
    },
    setProject: () => {
        throw Error('not implemented')
    }
});

interface ProjectContextProviderProps {
    children: any;
}

const apiBasePath = "http://0.0.0.0:3034/dev";

export const ProjectContextProvider: FC<ProjectContextProviderProps> = ({ children }) => {
    const [ userId, setUserId ] = useState<number | null>(getIdFromLocalStorage('userId'));
    const [ projectId, setProjectId ] = useState<number | null>(getIdFromLocalStorage('projectId'));

    useEffect(() => {
        saveToLocalStorage('userId', JSON.stringify(userId));
    }, [userId]);

    useEffect(() => {
        saveToLocalStorage('projectId', JSON.stringify(projectId));
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

        const putRequest = async (path: string, body: string): Promise<Response> => {
            return await fetch(apiBasePath + path, { method: 'PUT', body: body });
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

        const getTickets = async (projectId: number): Promise<Ticket[]> => {
            const response = await getRequest(`/tickets/${projectId}`);
            const json = await response.json();
            if (response.ok) {
                return json.tickets;
            } else {
                throw json;
            }
        }

        const getTicket = async (ticketId: number, queryParams: any): Promise<Ticket> => {
            const response = await getRequest(`/ticket/${ticketId}?param=paramval`);
            const json = await response.json();
            if (response.ok) {
                return json.ticket;
            } else {
                throw json;
            }
        }

        const createTicket = async (ticket: TicketBody): Promise<number> => {
            const response = await postRequest(`/tickets`, JSON.stringify(ticket));
            const json = await response.json();
            if (response.ok) {
                return json.id;
            } else {
                throw json;
            }
        }

        const deleteTicket = async (ticketId: number): Promise<number> => {
            const response = await deleteRequest(`/tickets/${ticketId}`);
            const json = await response.json();
            if (response.ok) {
                return json.id;
            } else {
                throw json;
            }
        }

        const updateTicket = async (ticketId: number, ticket: TicketBody): Promise<number> => {
            const response = await putRequest(`/tickets/${ticketId}`, JSON.stringify(ticket));
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
            deleteProject,
            getTickets,
            getTicket,
            createTicket,
            deleteTicket,
            updateTicket
        }
    }, []);

    const signIn = useCallback((userId: number) => {
        setUserId(userId);
    }, []);

    const setProject = useCallback((projectId: number) => {
        setProjectId(projectId);
    }, []);

    const projectContext: ProjectContextProps = {
        apiClient,
        userId,
        signIn,
        setProject
    };

    return <ProjectContext.Provider value={projectContext}>{children}</ProjectContext.Provider>;

};

const saveToLocalStorage = (itemName: string, itemObj: string) => {
    localStorage.setItem(itemName, itemObj);
}

const getIdFromLocalStorage = (keyName: string): number | null => {
    try {
        const id = localStorage.getItem(keyName);
        return id ? JSON.parse(id) : null;
    } catch (e) {
        return null;
    }
}

export const useProjectContext = () => useContext(ProjectContext);