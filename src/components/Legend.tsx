import React from 'react'
import styled from 'styled-components'

export const Legend = () => {
	return (
		<Parent>
			<strong>flag: </strong>
			<code>
				<Ctrl>ctrl</Ctrl> + <Click>click</Click>
			</code>
		</Parent>
	)
}

const Parent = styled.legend`
	font-size: 1rem;
	margin: 0 auto 1rem;
	line-height: 1.25rem;
`
const Ctrl = styled.span`
	color: #ec433c;
`

const Click = styled.span`
	color: #2a48ec;
`
