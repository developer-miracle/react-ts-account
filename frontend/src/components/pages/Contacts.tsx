import { Box, List, ListItem, ListItemAvatar, ListItemText, Typography } from "@mui/material";
import React from "react";

export default function Contacts() {
    const phone = '+888 888 88 88'
    return (
        <Box>
            <h2>Contacts</h2>
            <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
                <ListItem>
                    <ListItemAvatar>
                        Avatar
                    </ListItemAvatar>
                    <ListItemText
                        primary="title"
                        secondary={
                            <React.Fragment>
                                <Typography
                                    sx={{ display: 'inline' }}
                                    component="span"
                                    variant="body2"
                                    color="text.primary"
                                >
                                    phone:&nbsp;
                                </Typography>
                                {`${phone}`}
                            </React.Fragment>
                        }>
                    </ListItemText>
                </ListItem>
            </List>
        </Box>
    )
}