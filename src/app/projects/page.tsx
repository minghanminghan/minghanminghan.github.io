'use client'

import StackUI from "@/components/StackUI"
import { useViewContext } from "../../context/ViewContext"
import { Projects } from '@/constants/projectList'
import { Box, Link, Typography } from "@mui/material"

export default function Page() {
    const { setActive } = useViewContext()
    setActive('Projects')
    
    return (
    <Box
        width='100%'
        display='flex'
        alignItems='center'
        alignContent='center'
        flexDirection='column'
    >
        <Box justifyItems='center'>
            <Typography variant="h3" component="h1" sx={{ fontWeight: 600, mb: 1 }}>
            Projects
            </Typography>
        </Box>
        <StackUI>
            {Projects.map((v, i) => 
                <Box key={i}>
                    <Typography fontWeight='bold'>
                        {v.name}
                    </Typography>
                    <Typography>
                        {v.description}
                    </Typography>
                    <Box
                        display='flex'
                        flexDirection='row'
                        gap={2}
                    >
                        <Link href={v.source} target='_blank'>
                            <Typography>
                                [ Repo ]
                            </Typography>
                        </Link>
                        {v.website &&
                        <Link href={v.website} target={v._blank ? '_blank' : '_self'}>
                            <Typography>
                                [ Website ]
                            </Typography>
                        </Link>}
                    </Box>
                </Box>
            )}
        </StackUI>
    </Box>
    )
}