import React from "react";
import { Spinner } from "./Loading.styled";

interface LoadingProps {
    size?: number;
}

const Loading: React.FC<LoadingProps> = ({ size = 40 }) => {
    return <Spinner style={{ width: `${size}px`, height: `${size}px` }} />;
};

export default Loading;
