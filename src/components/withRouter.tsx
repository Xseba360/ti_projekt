import {useNavigate} from 'react-router-dom';
import React from "react";

export function withRouter<P>(Component: React.ComponentType<P>) {
    return (props: P) => {
        const navigate = useNavigate();

        return (
            <Component
                navigate={navigate}
                {...props}
            />
        );
    };
}