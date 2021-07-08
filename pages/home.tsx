import Navbar from "@components/Navbar";

import Button from "@components/Button";
import InputBox from "@components/InputBox";
import { makeStyles } from "@material-ui/core";
function Home() {
  const classes = useStyles();
  return (
    <div>
      <Navbar />
      <div className={classes.container}>
        <div className="top">
          <Button text="Cancel" variant="text"></Button>
          <Button text="Next" variant="contained"></Button>
        </div>
        <div className="rest">
          <InputBox
            label="Receiving Company Name"
            placeholder="Your full name"
            name="name"
          />
        </div>
      </div>
    </div>
  );
}

export default Home;
const useStyles = makeStyles({
  container: {
    marginTop: "calc(70px + 2rem)",
    borderRadius: "4px",
    border: "1px solid #A09E9E",
    width: "80%",
    margin: "auto",
    minHeight: "80vh",

    "& .top": {
      padding: "1rem",
      borderBottom: "2px solid #DDDDDD",
      display: "flex",
    },
  },
});
