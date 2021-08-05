import Layout from "@components/Global/Layout";
import { capitalize, makeStyles } from "@material-ui/core";
import Button from "@components/Controls/Button";
import Image from "next/image";
import {
  Radio,
  RadioGroup,
  FormControl,
  FormControlLabel,
} from "@material-ui/core";
import { useEffect, useState } from "react";
import UPadWrapper from "@components/Shared/UPadWrapper";
export type IndustryTypes =
  | "automobile"
  | "construction"
  | "ecommerce"
  | "finance"
  | "healthcare"
  | "marketing"
  | "sales"
  | "transportation";
const industries: IndustryTypes[] = [
  "healthcare",
  "transportation",
  "ecommerce",
  "automobile",
  "sales",
  "marketing",
  "construction",
  "finance",
];
interface SelectIndustryProps {}
const SelectIndustry = ({}: SelectIndustryProps) => {
  const styles = useStyles();
  const [selectedIndustry, setSelectedIndustry] = useState<IndustryTypes | "">(
    ""
  );
  // useEffect(() => {
  //   console.log(selectedIndustry);
  // }, [selectedIndustry]);
  return (
    <Layout>
      <UPadWrapper>
        <div className={styles.SelectIndustry}>
          <h1 className="heading">
            Welcome to Loopreceipt, Gari! Let’s get you set up.
          </h1>
          <h4 className="subheading">
            But first, what industry do you work on?
          </h4>

          <FormControl component="fieldset">
            <RadioGroup
              aria-label="what industry do you work on"
              name="industry"
              value={selectedIndustry}
              onChange={(e, v) => setSelectedIndustry(v as IndustryTypes)}
              className="industries"
            >
              {industries.map((industry) => (
                <IndustryItem key={industry} industry={industry} />
              ))}
            </RadioGroup>
          </FormControl>
        </div>
      </UPadWrapper>
      <BottomBar />
    </Layout>
  );
  interface IndustryItemProps {
    industry: IndustryTypes;
  }
  function IndustryItem({ industry }: IndustryItemProps) {
    return (
      <FormControlLabel
        className="industryItem"
        value={industry}
        control={<Radio color="secondary" />}
        label={
          <div className="label">
            <Image
              src={`/icons/selectindustry/${industry}.svg`}
              width={30}
              height={30}
            />
            <div className="name">
              {industry === "ecommerce" ? "E-Commerce" : capitalize(industry)}
            </div>
          </div>
        }
        style={{
          backgroundColor: selectedIndustry === industry ? "#F6F9FD" : "",
        }}
      />
    );
  }
};

export default SelectIndustry;
export const BottomBar = () => {
  const styles = useStyles();
  return (
    <div className={styles.bottomBar}>
      <div className="skip">Skip</div>
      <Button labelWeight="bold" expand>
        Next Step
      </Button>
    </div>
  );
};

const useStyles = makeStyles((theme) => ({
  SelectIndustry: {
    paddingTop: "3rem",
    textAlign: "center",
    "& .heading": {
      fontWeight: 500,
      fontSize: 35,
      color: theme.palette.secondary.main,
      [theme.breakpoints.down("sm")]: {
        fontSize: 28,
      },
    },
    "& .subheading": {
      margin: "2rem 0",
      fontWeight: 500,
      fontSize: 25,
      color: theme.palette.secondary.main,
      [theme.breakpoints.down("sm")]: {
        fontSize: 20,
      },
    },
    "& .industries": {
      // border: "1px solid blue",
      display: "grid",
      gridTemplateColumns: "repeat(2, 1fr)",
      gap: "2rem",
      [theme.breakpoints.down("xs")]: {
        gridTemplateColumns: "repeat(1, 1fr)",
      },
      "& .industryItem": {
        transform: "translateX(1rem)",
        // i don't know about this

        height: 61,
        width: 267,
        border: "1px solid #DBD8D8",
        borderRadius: 8,
        " & .label": {
          display: "flex",
          gap: "1rem",
          "& .name": {
            fontSize: 17,
          },
        },
      },
    },
  },
  bottomBar: {
    position: "fixed",
    bottom: 0,

    padding: "0 15%",
    width: "100%",
    zIndex: 10,
    backgroundColor: "white",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    height: 100,
    boxShadow: "0px 0px 4px rgba(0, 0, 0, 0.5)",
    [theme.breakpoints.down("xs")]: {
      flexDirection: "column-reverse",
      boxShadow: "none",
      position: "relative",
      gap: "1rem",
      marginTop: "1rem",
      marginBottom: "2rem",
    },
    "& .skip": {
      color: theme.palette.secondary.main,
      fontWeight: "bold",
      fontSize: 22,
      cursor: "pointer",
      [theme.breakpoints.down("xs")]: {
        fontSize: 18,
        color: "#909090",
      },
    },
  },
}));
