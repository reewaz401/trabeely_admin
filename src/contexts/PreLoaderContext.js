import React, { useState, createContext } from 'react'
import { css } from '@emotion/core'
import GridLoader from 'react-spinners/PropagateLoader'

export const PreLoaderContext = createContext()

const override = css`
	display: block;
	position: fixed;
	top: 50%;
	left: 50%;
	border-color: #f7931e;
	z-index: 10000;
	
`

const PreloaderContextProvider = ({ children }) => {
	const [isLoading, setIsLoading] = useState(false)

	return (
		<PreLoaderContext.Provider value={{ isLoading, setIsLoading }}>
			{children}
			{isLoading && (
				<>
					<div className='pre-loader'></div>
					<GridLoader css={override} size={20} color={'#f7931e'} loading={isLoading} />
				</>
			)}
		</PreLoaderContext.Provider>
	)
}

export default PreloaderContextProvider
