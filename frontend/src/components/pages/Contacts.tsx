import { Avatar, Box, Button, Container, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, List, ListItem, ListItemAvatar, ListItemText, TextField, Typography } from "@mui/material"
import React, { useEffect, useState } from "react"
import UserStore from '../../store/UserStore'
import ContactStore from '../../store/ContactStore'
import { observer } from 'mobx-react'
import { text } from "stream/consumers";
import ContactModel from "../../models/ContactModel"

interface State {
    id: number | undefined,
    event: string,
    name: string | undefined;
    phone: string | undefined;
}

const Contacts = () => {

    const [open, setOpen] = useState(false)
    const [values, setValues] = useState<State>({
        id: undefined,
        event: '',
        name: '',
        phone: ''
    })

    useEffect(() => {
        ContactStore.getContacts()
    }, [])

    const handleOpenDialog = (event: string, id?: number, name?: string, phone?: string) => {
        if (event === 'add') {
            setValues({ ...values, event: 'add' })
        } else if (event === 'change') {
            setValues({ ...values, event: 'change', id: id, name: name, phone: phone })
        }
        setOpen(true)
    }

    const handleCloseDialog = () => {
        setOpen(false)
        setValues({ id: undefined, event: '', name: '', phone: '' })
    }

    const handleChange = (prop: keyof State) => (event: React.ChangeEvent<HTMLInputElement>) => {
        setValues({ ...values, [prop]: event.target.value })
    }

    const handleClickAdd = () => {
        ContactStore.add(values.name, values.phone, UserStore.user?.id?.toString())
        handleCloseDialog()
    }

    const handleClickChange = () => {
        ContactStore.change(values.id, values.name, values.phone)
        handleCloseDialog()
    }

    const handleClickDelete = (id: number) => {
        ContactStore.delete(id)
    }

    const data: ContactModel[] | null = ContactStore.contacts

    let text: string = ''
    if (values.event === 'add') {
        text = 'New contact'
    } else if (values.event === 'change') {
        text = 'Change contact'
    }

    return (
        <Container>
            <Box sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                flexDirection: 'column'
            }}>

                <Box sx={{ width: '60%', display: 'flex', justifyContent: 'space-around' }}>
                    <Typography
                        sx={{
                            width: '50%',
                            display: 'flex',
                            justifyContent: 'center'
                        }}
                        component="span"
                        variant="h4"
                        color="text.primary"
                    >
                        Contacts
                    </Typography>
                    <Box sx={{
                        width: '50%', display: 'flex',
                        justifyContent: 'end'
                    }}><Button onClick={() => handleOpenDialog('add')} variant="contained" color="success">add</Button></Box>
                </Box>
                <List sx={{ width: '60%', bgcolor: 'background.paper' }}>
                    {data?.map(element => {
                        return (
                            <ListItem sx={{ padding: '0', margin: '10px 0' }} key={element.id}>
                                <ListItemAvatar>
                                    <Avatar alt={element.name} src="/static/images/avatar/1.jpg" />
                                </ListItemAvatar>
                                <ListItemText
                                    sx={{ margin: 0, minWidth: '180px' }}
                                    primary={element.name}
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
                                            {element.phone}
                                        </React.Fragment>
                                    }>
                                </ListItemText>
                                <Button onClick={() => handleOpenDialog('change', element.id, element.name, element.phone)} variant="contained" sx={{ marginRight: '5px' }}>change</Button>
                                <Button onClick={() => handleClickDelete(element.id)} variant="contained" color="error">delete</Button>
                            </ListItem>
                        )
                    })}
                </List>
            </Box>
            <Dialog open={open} onClose={handleCloseDialog}>
                <DialogTitle>
                    {text}
                </DialogTitle>
                <DialogContent>
                    <TextField
                        value={values.name}
                        onChange={handleChange('name')}
                        autoFocus
                        margin="dense"
                        id="name"
                        label="Name"
                        type="name"
                        fullWidth
                        variant="standard"
                    />
                    <TextField
                        value={values.phone}
                        onChange={handleChange('phone')}
                        autoFocus
                        margin="dense"
                        id="phone"
                        label="Phone"
                        type="phone"
                        fullWidth
                        variant="standard"
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseDialog} variant="contained" color="error">Cancel</Button>
                    {values.event === 'add' ?
                        <Button onClick={handleClickAdd} variant="contained" color="success">Add</Button>
                        : <Button onClick={handleClickChange} variant="contained" color="success">Change</Button>}
                </DialogActions>
            </Dialog>
        </Container >
    )
}

export default observer(Contacts)

