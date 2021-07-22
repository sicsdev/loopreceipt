import { makeStyles, Paper } from "@material-ui/core";
import Switch from "@components/Controls/Switch";
import React, { useEffect, useRef, useState } from "react";

import ConfirmDialogType from "@interfaces/ConfirmDialogType";

import Box from "@components/Create/Box";
import Image from "next/image";

import { FormType, useFormReturnType } from "@interfaces/FormTypes";
import { useWindowDimensions } from "@hooks/useWindowDimensions";
import Summary from "./Summary";

import FormUpperBar from "./FormUpperBar";
import BoxContent from "./BoxContent";
import Forms from "./Forms";
import ProfileIcons from "@components/shared/ProfileIcons";
import { randomColor } from "@helpers/utils";
import Win from "@helpers/Win";
import UpperBarMobile from "./UpperBarMobile";
import LoopReceipt from "./LoopReceipt";
interface GroupProps {
  setOption: React.Dispatch<
    React.SetStateAction<"onebyone" | "group" | undefined>
  >;
  validateFieldsOfForm: (
    formProps: useFormReturnType,
    form: FormType
  ) => boolean;
  forms: FormType[];
  formsProps: useFormReturnType[];
}
function Group({
  setOption,
  validateFieldsOfForm,
  forms,
  formsProps,
}: GroupProps) {
  const styles = useStyles();

  const { windowDimensions } = useWindowDimensions();
  const win = new Win(windowDimensions);
  const [saveAsDefault, setSaveAsDefault] = useState(true);
  const [index, setIndex] = useState(0);

  const [confirmDialog, setConfirmDialog] = useState<ConfirmDialogType>({
    isOpen: false,
    title: "Save Changes?",
    subTitle: "",
    confirmText: "Save Changes",
    cancelText: "Cancel",
    onConfirm: () => {
      console.log("confirmed");
    },
  });
  const detailsRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (detailsRef.current) {
      const contentDivs: any =
        detailsRef.current.getElementsByClassName("content");
      // console.log(theme.breakpoints.values);
      // console.log(win.values);
      if (win.only("sm")) {
        let maxHeight = contentDivs[0].offsetHeight;
        for (let i = 1; i < contentDivs.length; i++) {
          maxHeight = Math.max(maxHeight, contentDivs[i].offsetHeight);
        }
        for (let div of contentDivs) {
          div.style.minHeight = maxHeight + "px";
        }
      } else {
        for (let div of contentDivs) {
          div.style.minHeight = 0 + "px";
        }
      }
    }
  }, [index, windowDimensions]);
  const handleBackButtonClick: React.MouseEventHandler<any> = () => {
    if (index > 0) setIndex(index - 1);
    else setOption(undefined);
  };

  const handleCancelClick = () => {
    setConfirmDialog({
      ...confirmDialog,
      isOpen: true,
    });
  };
  const handleNextClick = () => {
    // handleSubmit();
    if (index < forms.length - 1) {
      if (validateFieldsOfForm(formsProps[index], forms[index])) {
        // if current form is valid only then navigate to next

        setIndex(index + 1);
      }
    } else {
      setIndex(index + 1);
    }
  };
  // useEffect(() => {
  //   console.log(saveAsDefault);
  // }, [saveAsDefault]);
  const upperBarContent = (
    <>
      {index !== forms.length + 2 && (
        <p style={{ fontWeight: 500 }}>
          Step {index < forms.length ? index + 1 : index} of {forms.length + 1}
        </p>
      )}
      <p>
        {index === forms.length + 2
          ? "Loopreceipt"
          : index === forms.length + 1
          ? "Summary"
          : index === forms.length
          ? "Create Group"
          : forms[index].formHeading}
      </p>
    </>
  );

  return (
    <div>
      <FormUpperBar
        handleBackButtonClick={handleBackButtonClick}
        upperBarText={upperBarContent}
      />
      <Box>
        <>
          <UpperBarMobile
            show={win.down("xs") && index !== forms.length + 2}
            upperBarContent={upperBarContent}
          />
          {index === forms.length + 2 ? (
            <LoopReceipt />
          ) : index === forms.length + 1 ? (
            <Summary
              formsProps={formsProps}
              forms={forms}
              generatedLoopReceipt={() => {
                setIndex(index + 1);
              }}
            />
          ) : (
            <BoxContent
              confirmDialog={confirmDialog}
              setConfirmDialog={setConfirmDialog}
              handleCancelClick={handleCancelClick}
              handleNextClick={handleNextClick}
            >
              {index === forms.length ? (
                <div className={styles.group}>
                  <div className="heading">
                    <div>
                      <Image
                        src="/icons/create/group/group.svg"
                        width={20}
                        height={20}
                      />
                    </div>
                    <h2>Group Name</h2>
                  </div>
                  <div className={"details"} ref={detailsRef}>
                    <div className="column">
                      <div className="head">Group Members</div>
                      <div className="content">
                        <ProfileIcons
                          firstAlphabets={["R", "M"]}
                          colorStrings={[randomColor(), randomColor()]}
                        />
                      </div>
                    </div>
                    <div className="line">
                      <p></p>
                    </div>
                    <div className="column">
                      <div className="head">Loopers</div>
                      <div className="content">
                        <ProfileIcons
                          firstAlphabets={["R", "M"]}
                          colorStrings={[randomColor(), randomColor()]}
                        />
                      </div>
                    </div>
                    {win.up("md") && (
                      <div className="line">
                        <p></p>
                      </div>
                    )}
                    <div className="column">
                      <div className="head">Group created for</div>
                      <div className="content">
                        <p>Dropsile Inc.</p>
                      </div>
                    </div>
                    <div className="line">
                      <p></p>
                    </div>
                    <div className="column">
                      <div className="head">Save as default</div>
                      <div className="content">
                        <Switch
                          checked={saveAsDefault}
                          onChange={(e, checked) => setSaveAsDefault(checked)}
                          name="saveAsDefault"
                          inputProps={{ "aria-label": "saveAsDefault" }}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <Forms
                  forms={forms}
                  formsProps={formsProps}
                  activeFormIndex={index}
                />
              )}
            </BoxContent>
          )}
        </>
      </Box>
    </div>
  );
}

export default Group;
const useStyles = makeStyles((theme) => ({
  group: {
    boxShadow: "0px 0px 4px rgba(0, 0, 0, 0.25)",
    borderRadius: 8,
    padding: "1rem",
    "& .heading": {
      display: "flex",
      gap: "2rem",

      "& h2": {
        transform: "translateY(-3px)",
        fontWeight: "500",
        fontSize: 20,
      },
    },
    "& .details": {
      margin: "1rem 2.5rem",
      display: "grid",
      gridTemplateColumns: "2fr 1fr 2fr 1fr 2fr 1fr 2fr",
      [theme.breakpoints.down("sm")]: {
        gridTemplateColumns: "2fr 1fr 2fr",
        rowGap: "2rem",
      },
      [theme.breakpoints.down("xs")]: {
        gridTemplateColumns: "1fr",
        rowGap: ".5rem",
      },
      "& .line": {
        "& p": {
          width: 1,
          height: "100%",
          margin: "auto",
          backgroundColor: "#dbdbdb",
        },
      },
      "& .column": {
        backgroundColor: "white",
        [theme.breakpoints.down("xs")]: {
          "&:not(:last-child)": {
            borderBottom: "1px solid #dbdbdb",
            paddingBottom: "1rem",
          },
        },
        "& .head": {
          fontSize: 18,
          marginBottom: "1rem",
        },
        "& .content": {},
      },
    },
  },
  personadd: {
    border: "1px solid #B8B9BC",
    borderStyle: "dashed",
    borderRadius: "50%",
    width: 48,
    height: 48,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
}));
