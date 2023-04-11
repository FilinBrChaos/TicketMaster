import { createContext, useContext } from "react";
import { apiClient } from '../lib/apiClient';

export interface ProjectContext {
    apiClient: apiClient;
    userId: number | undefined;
    userIsAuthenticated: boolean;
    signIn: (loc?: string) => Promise<void>;
    signOut: () => Promise<void>;
}

const projectContext = createContext<ProjectContext>({
    apiClient: new apiClient(),
    userId: undefined,
    userIsAuthenticated: false,
    signIn: async () => {
        throw 'Not implemented';
    },
    signOut: async () => {
        throw 'Not implemented';
    }
});

export const useProjectContext = () => useContext(projectContext);