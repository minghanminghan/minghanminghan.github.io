import { Box, Typography, Link } from "@mui/material";


export default function Header() {


    return (
        <Box
            display='flex'
            flexDirection='row'
            gap={2}
            // alignItems='center'
        >
            <Typography variant="h2" sx={{fontWeight: 'bold'}}>
                Andrew Jiang
            </Typography>
            <Box
                gap={2}
                display='flex'
                flexDirection='row'
            >
                <Link
                    href="https://www.github.com/minghanminghan"
                    underline="hover"
                    target="_blank"
                >
                <Typography variant="h2">
                    GitHub
                </Typography>
                </Link>
                <Link
                    href="https://www.linkedin.com/in/andrewminghanjiang"
                    underline="hover"
                    target="_blank"
                >
                <Typography variant="h2">
                    LinkedIn
                </Typography>
                </Link>
                <Link
                    href="mailto:andrewjiang7890@gmail.com"
                    underline="hover"
                    target="_blank"
                >
                <Typography variant="h2">
                    Email
                </Typography>
                </Link>
            </Box>
        </Box>
    )
}