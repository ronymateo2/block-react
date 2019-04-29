import React, { Component } from 'react';
import withStyles from '@material-ui/core/styles/withStyles';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import { createStyles } from '@material-ui/core';

const styles = (theme:any) => createStyles({
  container: {
    maxWidth: 600,
    flexGrow: 1,
    textAlign: 'center',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center'
  },
  bottomMargin: {
    marginBottom: theme.spacing.unit * 2
  }
});

class BaseDialog extends Component<any,any> {
  render() {
    const { classes, open, onClose } = this.props;
    return (
      <Dialog
        open={open}
        onClose={onClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        scroll='body'
      >
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            <div className={classes.container}>
              {this.props.children}
            </div>
          </DialogContentText>
        </DialogContent>
      </Dialog>
    )
  }
}

export default withStyles(styles)(BaseDialog);
