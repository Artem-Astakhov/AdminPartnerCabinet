import * as React from 'react';
import { Box, Card, CardActions, Button, Typography } from '@mui/material';
import CallMadeIcon from '@mui/icons-material/CallMade';
import CodeIcon from '@mui/icons-material/Code';
import { useTranslate } from 'react-admin';
import publishArticleImage from './11Picture1.png';

const Welcome = () => {
    const translate = useTranslate();

    return (
        <Card
            sx={{
                background: theme =>
                    theme.palette.mode === 'dark'
                        ? '#535353'
                        : `linear-gradient(to right, #8975fb 0%, #746be7 35%), linear-gradient(to bottom, #8975fb 0%, #6f4ceb 50%), #6f4ceb`,

                color: '#fff',
                padding: '20px',
                marginTop: 2,
                marginBottom: '1em',
            }}
        >
            <Box display="flex">
                <Box flex="1">
                    <Typography variant="h5" component="h2" gutterBottom>
                        {translate('pos.dashboard.welcome.title')}
                    </Typography>
                    <Box maxWidth="40em">
                        <Typography variant="body1" component="p" gutterBottom>
                            {translate('pos.dashboard.welcome.subtitle')}
                        </Typography>
                    </Box>
                    <CardActions
                        sx={{
                            padding: { xs: 0, xl: null },
                            flexWrap: { xs: 'wrap', xl: null },
                            '& a': {
                                marginTop: { xs: '1em', xl: null },
                                marginLeft: { xs: '0!important', xl: null },
                                marginRight: { xs: '1em', xl: null },
                            },
                        }}
                    >
                        <Button
                            variant="contained"
                            href="https://www.otpbank.com.ua/action/be-free-4-0/#form-check"
                            startIcon={<CallMadeIcon/>}
                        >
                            {translate('pos.dashboard.welcome.ra_button')}
                        </Button>                        
                    </CardActions>
                </Box>
                <Box
                    display={{ xs: 'none', sm: 'none', md: 'block' }}
                    sx={{
                        background: `url(${publishArticleImage}) top right / contain no-repeat`,
                        marginLeft: 'auto',
                        color: 'blue',
                    }}
                    width="16em"
                    height="9em"
                    overflow="hidden"
                    />              
            </Box>
        </Card>
    );
};

export default Welcome;
