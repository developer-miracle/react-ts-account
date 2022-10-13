import React, { useEffect } from 'react';
import { observer } from 'mobx-react-lite'
import { Alert, AlertColor, Slide, SlideProps, Snackbar as Snack } from '@mui/material';

import CommonStore from '../../store/CommonStore';

type TransitionProps = Omit<SlideProps, 'direction'>;

function TransitionUp(props: TransitionProps) {
    return <Slide {...props} direction="up" />;
}

const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
        return;
    }
    CommonStore.resetSnackBar()
};

const Snackbar = observer(() => {

    useEffect(() => {
        setTransition(() => TransitionUp);
    }, [CommonStore.flagShowMessage])

    const type: AlertColor | undefined = CommonStore.type as AlertColor
    const message = CommonStore.message

    const [transition, setTransition] = React.useState<
        React.ComponentType<TransitionProps> | undefined
    >(undefined);

    return (
        <Snack open={CommonStore.flagShowMessage} autoHideDuration={2000} onClose={handleClose} anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'center',
        }}
            TransitionComponent={transition}
        >
            <Alert onClose={handleClose} severity={type} sx={{ width: '100%' }}>
                {message}
            </Alert>
        </Snack>
    )
})

export default Snackbar