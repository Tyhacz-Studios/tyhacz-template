import React from 'react'
import ReactSkeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

type Props = {
    width?: number | string
}

export const Skeleton: React.FC<Props> = ({
    width
}) => {
    return (
        <ReactSkeleton width={width} inline />
    )
}

