'use client';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';


export default function Test() {
	function test() {
		fetch('/api/create-locations', {method: 'POST'})
	}

  	return (
		<Box
			width='100%'
			height='100vh'
			display='flex'
			justifyContent='center'
			alignItems='center'
		>
			<Button onClick={test} variant='contained' >
				Test
			</Button>
		</Box>
    	
  	);
}
