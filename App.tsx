import React from 'react';
import {QueryClient, QueryClientProvider} from "react-query";
import {Home} from "./src/pages/Home";


const queryClient = new QueryClient();

export default function App() {
    return (
        <QueryClientProvider client={queryClient}>
            <Home/>
        </QueryClientProvider>
    );
}

