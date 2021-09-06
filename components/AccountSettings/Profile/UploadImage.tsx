import { useState } from "react";
import { Avatar, Box, Button, Typography } from "@material-ui/core";
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import { raiseAlert } from "@store/slices/genericSlice";
import usersApi from "@apiClient/usersApi";
import { setUser } from "@store/slices/userSlice";
import { useAppDispatch, useAppSelector } from "@store/hooks";
import S3 from "react-aws-s3";

const config = {
  bucketName: "loopreceipt",
  dirName: "avatar" /* optional */,
  region: "us-east-2",
  accessKeyId: "AKIATAACRZGF4AIIX3VP",
  secretAccessKey: "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",
};

const ReactS3Client = new S3(config);

const useStyles = makeStyles((theme: Theme) => ({
  avatar: {
    width: theme.spacing(12),
    height: theme.spacing(12),
    marginLeft: "2rem",
    backgroundColor: "#F1F3F6",
    [theme.breakpoints.down("sm")]: {
      marginLeft: "1rem",
    },
  },
  caption: {
    fontFamily: "Titillium Web",
    fontStyle: "normal",
    fontWeight: "normal",
    fontSize: 14,
    lineHeight: "21px",
    textAlign: "center",
    color: "#676767",
    [theme.breakpoints.down("sm")]: {
      fontFamily: "Roboto",
    },
  },
  uploadButton: {
    border: "1px solid #21F9AE",
    background: "#fff",
    textTransform: "unset",
    color: "#000000",
    fontFamily: "Roboto",
    fontStyle: "normal",
    fontWeight: "normal",
    fontSize: 15,
    lineHeight: "23px",
    marginBottom: "15px",
    borderRadius: "8px",
    [theme.breakpoints.down("sm")]: {
      width: "100%",
    },
  },
  input: {
    fontSize: 100,
    position: "absolute",
    left: 0,
    top: 0,
    opacity: 0,
  },
  uploadButtonDiv: {
    paddingLeft: "2rem",
    paddingTop: "1rem",
  },
}));

export default function UploadImage() {
  const classes = useStyles();
  const [isUploading, setIsUploading] = useState(false);
  const dispatch = useAppDispatch();
  let { user = { profileImage: "" } } = useAppSelector((state) => state.user);

  const handleFileSelect = (event: any) => {
    let file = event.target.files[0];
    UploadFile(file);
    event.target.value = null;
  };
  const UploadFile = (file: any) => {
    // const newFileName = "test-file";
    setIsUploading(true);
    ReactS3Client.uploadFile(file)
      .then(async (data) => {
        console.log(data);

        try {
          await usersApi.updateUser({
            profileImage: data.location,
          });
          let userData = await usersApi.getMe();
          dispatch(setUser(userData.user));
        } catch (error) {
          console.log(error);
        }

        setIsUploading(false);
        raiseAlert("Image Uploaded Successfully!", "success");
      })
      .catch((err) => {
        console.error(err);
        setIsUploading(false);
        raiseAlert("Upload Failed, try again!", "success");
      });
  };

  return (
    <Box display="flex">
      <Avatar
        alt="Avatar"
        src={user.profileImage ? user.profileImage : "/avatar.png"}
        className={classes.avatar}
      />
      <Box className={classes.uploadButtonDiv}>
        <Button
          variant="outlined"
          className={classes.uploadButton}
          size="large"
          component="label"
          disabled={isUploading}
        >
          Upload Picture{" "}
          <input
            type="file"
            name="picturefile"
            hidden
            accept=".jpg,.png"
            onChange={handleFileSelect}
          />
        </Button>
        <Typography className={classes.caption}>
          JPG, or PNG. Max Size of 5MB
        </Typography>
      </Box>
    </Box>
  );
}
