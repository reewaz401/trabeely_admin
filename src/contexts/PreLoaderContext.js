import React, { useState, createContext } from 'react'
import { css } from '@emotion/core'
import GridLoader from 'react-spinners/GridLoader'

export const PreLoaderContext = createContext()

const override = css`
	display: block;
	position: fixed;
	top: 50%;
	left: 50%;
	border-color: #5491d4;
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
					<GridLoader css={override} size={20} color={'#5491d4'} loading={isLoading} />
				</>
			)}
		</PreLoaderContext.Provider>
	)
}

export default PreloaderContextProvider
