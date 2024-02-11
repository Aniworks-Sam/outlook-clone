import { Button, TextField } from "@mui/material";
import { Fragment, useState } from "react";
import classes from './NewFolder.module.css';
import { useSelector} from "react-redux";

interface NewFolderProps{
  onFetch: () => void,
}

const NewFolder = ({onFetch} : NewFolderProps) =>{
  const [open,setOpen] = useState<boolean>(false);
  // const [enteredValue, setEnteredValue] = useState<any>();
  const createNewFolder = ()=>{
    setOpen(true);
  }
  const stateId = useSelector((state: any) => {
    return state.counter.id;
  });
  const stateToken = useSelector((state: any) => {
    return state.counter.tokenValue;
  });
  const enterKeyHandler = (event: any) => {
    if (event.charCode === 13) {
      console.log("Key `Enter` pressed");
      console.log(event.target.value);
      // setEnteredValue(event.target.value);
      fetch(`https://mail.aniworks.live/mapi/users/${stateId}/mailboxes`, {
        method: 'POST',
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
          setOpen(false);
          // setEnteredValue('');
        })
        .catch((err) => {
          console.error(err.message);
          alert(err.message);
        });
    }
  }

  return(
    <Fragment>
      {!open && 
      <div className={classes.input}>
        <Button variant="outlined" onClick={createNewFolder}>New Folder</Button>
      </div>
      }
      {open && 
        <div className={classes.input}>
          <TextField id="folder" label="New Folder" variant="standard" size="small" onKeyPress={enterKeyHandler} />
        </div>
      }
    </Fragment>
  )
}

export default NewFolder;
