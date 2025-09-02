'use client'

import { routes } from '@/constants/routes'
import { useViewContext } from '../context/ViewContext'
import { Box, Typography, Link, Paper } from '@mui/material'
import Header from './Header'

export default function TopNav() {
    const { active } = useViewContext()
    
    return (
    <Paper>
    <Box
        width='100%'
        display='flex'
        flexDirection='row'
        paddingY='2vh'
        gap='58vw'
        justifyContent='center'
    >
        <Header/>
        <Box
            gap='2vw'
            display='flex'
            flexDirection='row'
        >
            {routes.map((v, i) =>
                <Link
                    href={`/${v.toLowerCase()}`}
                    key={i}
                >
                <Typography 
                    variant="h2"
                    sx={{ textDecoration: v === active ? 'underline' : 'none' }}
                >
                    {v}
                </Typography>
                </Link>
            )}
        </Box>
    </Box>
    </Paper>
    )
}