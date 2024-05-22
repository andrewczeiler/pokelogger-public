import Box from '@/components/ServerComponents/Box';
import CircularProgress from '@/components/ServerComponents/CircularProgress';
import Typography from '@/components/ServerComponents/Typography';


export default function Loading() {
    return (
        <Box
            width='100%'
            height='80vh'
            display='flex'
            flexDirection='column'
            justifyContent='center'
            alignItems='center'
            rowGap='12px'
        >
            <Typography>
                Loading...
            </Typography>
            <CircularProgress />
        </Box>
    )
}