import { Box, Container, Paper, ThemeProvider } from "@mui/material";
import Typography from '@mui/material/Typography';
import { mainTheme } from './../../utils/theme';

export default function Footer() {
    return (
        <ThemeProvider theme={mainTheme()}>
            <Paper sx={{
                marginTop: 'calc(100% - 60px)',
                width: '100%',
                position: 'fixed',
                bgcolor: 'background.default',
                bottom: 0,
                color: 'text.primary',
                zIndex: 999999,
            }} component="footer" square variant="outlined">
                <Container maxWidth="lg">
                    <Box
                        sx={{
                            flexGrow: 1,
                            display: "flex",
                            my: 1,

                        }}
                    >
                        <div>
                        </div>
                    </Box>

                    <Box
                        sx={{
                            flexGrow: 1,
                            justifyContent: "center",
                            display: "flex",
                            mb: 2,
                        }}
                    >
                        <Typography variant="caption" >
                            Copyright ©2023. [] Limited
                        </Typography>
                    </Box>
                </Container>
            </Paper>
        </ThemeProvider>

    );
}