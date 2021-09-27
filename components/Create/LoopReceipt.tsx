import Button from "@components/Controls/Button";
import Win from "@helpers/Win";
import { useWindowDimensions } from "@hooks/useWindowDimensions";
import { Box, makeStyles } from "@material-ui/core";
import Image from "next/image";
import { useEffect, useState } from "react";
import { EntityGroup, EntityLoop } from "@apiHelpers/types";
import { populateCanvasWithBarcode } from "@helpers/utils";
import Switch from '@mui/material/Switch';
import SaveGroupDialog from './SaveGroupDialog';
import { useForm } from "@hooks/useForm";
import validations from "@helpers/validations";
import groupsApi from "@apiClient/groupsApi";

interface LoopReceiptProps {
  createdLoop: EntityLoop | undefined;
}

const label = { inputProps: { 'aria-label': 'Save as group' } };

const LoopReceipt = ({ createdLoop }: LoopReceiptProps) => {
  const { windowDimensions } = useWindowDimensions();
  const win = new Win(windowDimensions);
  const styles = useStyles();
  const [origin, setOrigin] = useState("");
  const [saveGroupDialogOpen, setSaveGroupDialogOpen] = useState(false);
  const [checked, setChecked] = useState(false);
  const [checkMode, setCheckMode] = useState('');
  const groupFormProps = useForm({groupName: {
    name: "groupName",
    label: "Group Name",
    placeholder: "Group Name",
    value: "",
    type: "text",
    validate: function () {
      return validations.isRequired(this);
    },
  }});
  useEffect(() => {
    // console.log(window.location.origin);
    setOrigin(window.location.origin);
  }, []);
  useEffect(() => {
    if (createdLoop) {
      setCheckMode(createdLoop.mode);
      populateCanvasWithBarcode({
        scale: 1,
        textToEncode: createdLoop.barcode || "",
        canvasId: "mycanvas",
      });
    }
  }, [createdLoop]);

  const PrintLink = ({ children }: { children: any }) => {
    return (
      <a
        href={`${origin}/barcode?barcode=${createdLoop?.barcode}`}
        target="_blank"
        rel="noreferrer"
      >
        {children}
      </a>
    );
  };

  const saveGroup = async () => {
    const groupName = groupFormProps.formState.groupName.value;
    const recipient = createdLoop?.recipient;
    const loopers = createdLoop?.loopers;
    if(recipient && loopers && groupName !== "") {
      const groupSaveData: EntityGroup = {
        recipient,
        loopers,
        name: groupName,
        createdFor: groupName
      }
      const response = await groupsApi.create(groupSaveData);
      if(response) {
        setSaveGroupDialogOpen(false)
      }
    }
  };

  const handleSaveGroupSwitch = (value: any) => {
    if(checked === false) {
      setSaveGroupDialogOpen(true)
    }
    setChecked(!checked);
  }

  return (
    <div className={styles.LoopReceipt}>
      <SaveGroupDialog
        saveGroupDialogOpen={saveGroupDialogOpen}
        setSaveGroupDialogOpen={setSaveGroupDialogOpen}
        saveGroup={saveGroup}
        groupFormProps={groupFormProps}
      />
      {win.up("md") && (
        <div className="print">
          <PrintLink>
            <Button>
              <Image
                alt="icon"
                src="/icons/create/print.svg"
                width={20}
                height={20}
              />
            </Button>
          </PrintLink>
        </div>
      )}

      <p className="head">Loopreceipt Notification</p>
      <p className="colored">Scan Barcode</p>
      <p className="blurred">
        Use this provided barcode to identify your loopreceipt package by
        scanning it.
      </p>
      <div className="image">
        <div className="canvasContainer">
          <canvas id="mycanvas"></canvas>
        </div>
      </div>
      {
        checkMode !== "group" ? (
          <div className="save-as-group">
            <p className="save-group-text">Save this loopreceipt as a group for next time</p>
            <Switch 
              {...label} 
              className="save-group-switch"
              onChange={(event) => handleSaveGroupSwitch(event.target.value)}
              checked={checked}/>
          </div>
        ) : ""
      }
      <Box height={20} />
      {win.down("sm") && (
        <PrintLink>
          <Button labelWeight="bold">Print Barcode</Button>
        </PrintLink>
      )}
    </div>
  );
};
export default LoopReceipt;
const useStyles = makeStyles((theme) => ({
  LoopReceipt: {
    padding: "2rem 0",
    display: "flex",
    flexDirection: "column",
    gap: 20,
    alignItems: "center",
    position: "relative",
    "& .print": {
      position: "absolute",
      right: 32,
      top: 16,
      width: 40,
      height: 40,
      display: "grid",
      placeContent: "center",
      borderRadius: "50%",
      overflow: "hidden",
      "& .MuiButton-root": {
        height: 40,
      },
    },
    "& .head": {
      fontSize: 20,
      fontWeight: "bold",
    },
    "& .colored": {
      fontSize: 20,
      fontWeight: "bold",
      color: theme.palette.secondary.main,
    },
    "& .blurred": {
      color: "#828282",
      padding: "0 2rem",
    },
    "& .image": {
      textAlign: "center",
      maxWidth: "100%",
      [theme.breakpoints.down("xs")]: {
        height: 450,
        "& .canvasContainer": {
          transform: "rotate(90deg) translateX(50%)",
        },
      },
    },
    "& .save-as-group": {
      width: "100%",
      padding: "2rem",
      "& .save-group-text": {
        display: "inline-block",
        color: "#4F4F4F",
        fontSize: "16px",
      },
      "& .save-group-switch": {
        float: "right",
        color: "#21F9AE",
        "& .MuiSwitch-track": {
          backgroundColor: "#21F9AE"
        },
        "& .Mui-checked": {
          color: "#21F9AE"
        }
      }
    }
  },
}));
