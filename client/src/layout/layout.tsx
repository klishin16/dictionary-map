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
            <div className='h-full flex flex-col justify-center items-center'>
                <Loader />
                <p className="mt-2 text-xs text-neutral-400">Первая загрузка может занимать до 1 мин (особенности free хостинга бекенда)</p>
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
