'use client';

import Box from '@mui/material/Box';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';


interface SidebarToggleProps {
    open: boolean
    setOpen: () => void
}

export default function SidebarToggle(props: SidebarToggleProps) {
    const { open, setOpen } = props;

    return (
        <Box
            width='24px'
            height='100%'
            bgcolor='#5A7316'
            position='fixed'
            left={open ? '280px' : '0'}
            display='flex'
            alignItems='center'
            sx={{
                '&:hover': {
                    cursor: 'pointer'
                }
            }}
            onClick={setOpen}
        >
            { open ?
                <ArrowBackIosNewIcon fontSize='small' />
                :
                <ArrowForwardIosIcon fontSize='small' />
            }
        </Box>
    )
}