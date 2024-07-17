import React from "react"

interface LoadingContextProps {
    loading: boolean
    changeLoading: (loading: boolean) => void
}

const LoadingContext = React.createContext<LoadingContextProps>({
    loading: false,
    changeLoading: () => { }
})

export default LoadingContext