import React, { useEffect } from 'react';
import Header from "../components/header/header.tsx";
import { Outlet } from "react-router-dom";
import useStore from "../store/store.ts";
import { shallow } from "zustand/shallow";
import Loader from "../components/loader/loader.tsx";

const Layout = () => {
    const { loadNodesAndEdges, isLoading } = useStore(
        (state) => ({ loadNodesAndEdges: state.loadNodsAndEdges, isLoading: state.isLoading }),
        shallow
        );

    useEffect(() => {
        loadNodesAndEdges()
    }, [loadNodesAndEdges]);

    if (isLoading) {
        return (
            <div className='h-full flex justify-center items-center'>
                <Loader />
            </div>
        )
    }

    return (
        <React.Fragment>
            <Header />
            <Outlet />
        </React.Fragment>
    );
};

export default Layout;
