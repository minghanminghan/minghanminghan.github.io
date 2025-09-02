'use client'

import { Box, Typography } from "@mui/material"
import { useViewContext } from "@/context/ViewContext"

export default function Page() {
    const { setActive } = useViewContext()
    setActive('Blog')

    return (
        <Box
            alignItems='center'
            justifyItems='center'
        >
            <Typography>
                In progress!
            </Typography>
        </Box>
    )
}