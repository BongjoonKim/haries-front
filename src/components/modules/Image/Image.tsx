import styled from "styled-components";
import {ImgHTMLAttributes} from "react";

interface ImageProps extends ImgHTMLAttributes<HTMLImageElement> {}

export default function Image({src, ...rest}: ImageProps) {
    return <StyledImage src={src} {...rest} />
}

const StyledImage = styled.img``;