import { useSelector } from "react-redux";
import { useState } from 'react';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import classes from './DeleteFolder.module.css';
import { TextField } from "@mui/material";

interface DeleteProps{
  anchorEl: null | HTMLElement,
  open: boolean,
  handleClose: () => void,
  xPos:number,
  yPos:number,
  onFetch: () => void,
}

const DeleteFolder = ({anchorEl, open, handleClose, xPos, yPos, onFetch}:DeleteProps) =>{
  const [renameOpen, setRenameOpen] = useState<boolean>(false);
  const [enteredValue, setEnteredValue] = useState<any>();
  
  const stateId = useSelector((state: any) => {
    return state.counter.id;
  });
  const stateToken = useSelector((state: any) => {
    return state.counter.tokenValue;
  });
  const mailBoxId=useSelector((state: any) => {
    return state.counter.mailBoxId;
  });
  const deleteClickHandler = () => {
    fetch(`https://mail.aniworks.live/mapi/users/${stateId}/mailboxes/${mailBoxId}`, {
      method: 'DELETE',
        body: JSON.stringify({}),
        headers: {
          'Content-Type': 'application/json',
          "X-Access-Token": stateToken,
        },
      })
        .then((res) => {
          console.log(res);
          return res.json();
        })
        .then((data) => {
          console.log(data);
          handleClose();
          onFetch();
        })
        .catch((err) => {
          console.error(err.message);
          alert(err.message);
        });
    }
  
  const renameClickHandler = () => {
    setRenameOpen(true);
  }

  const enterKeyHandler = (event: any) => {
    if (event.charCode === 13) {
      console.log("Key `Enter` pressed");
      console.log(event.target.value);
      fetch(` https://mail.aniworks.live/mapi/users/${stateId}/mailboxes/${mailBoxId} `, {
        method: 'PUT',
        body: JSON.stringify({
          "path": event.target.value
        }),
        headers: {
          'Content-Type': 'application/json',
          "X-Access-Token": stateToken,
        },
      })
        .then((res) => {
          console.log(res);
          return res.json();
        })
        .then((data) => {
          console.log(data);
          onFetch();
          setRenameOpen(false);
          handleClose();
        })
        .catch((err) => {
          console.error(err.message);
          alert(err.message);
        });
    }
  }
  
  return(
    <Menu
      id="basic-menu"
      anchorEl={anchorEl}
      open={open}
      onClose={handleClose}
      MenuListProps={{
        'aria-labelledby': 'basic-button',
      }}
      style={{marginTop:yPos, marginLeft:xPos}}
    >
      <MenuItem onClick={deleteClickHandler}>Delete</MenuItem>
      {!renameOpen && <MenuItem onClick={renameClickHandler}>Rename</MenuItem>}
      {renameOpen && 
        <div className={classes.input}>
          <TextField id="folder" label="New Folder" variant="standard" size="small" onKeyPress={enterKeyHandler} />
        </div>
      }
      <MenuItem onClick={handleClose}>Flag</MenuItem>
    </Menu>
  )
};

export default DeleteFolder;
