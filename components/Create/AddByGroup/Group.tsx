import { makeStyles } from "@material-ui/core";
import ProfileIcons from "@components/Shared/ProfileIcons";
import Switch from "@components/Controls/Switch";
import { randomColor, range } from "@helpers/utils";
import Image from "next/image";
import { useState, useRef } from "react";
import { useWindowDimensions } from "@hooks/useWindowDimensions";
import Win from "@helpers/Win";
import { EntityGroup } from "apiHelpers/types";
interface GroupProps {
  group?: EntityGroup;
}
const Group = ({ group }: GroupProps) => {
  const [saveAsDefault, setSaveAsDefault] = useState(false);
  const styles = useStyles();
  const detailsRef = useRef<HTMLDivElement>(null);
  const { windowDimensions } = useWindowDimensions();
  const win = new Win(windowDimensions);
  const switchButton = (
    <Switch
      checked={saveAsDefault}
      onChange={(e, checked) => setSaveAsDefault(checked)}
      name="saveAsDefault"
      inputProps={{ "aria-label": "saveAsDefault" }}
    />
  );
  return group ? (
    win.up("sm") ? (
      <div className={styles.desktopGroup}>
        <div className="heading">
          <div>
            <Image
              alt="icon"
              src="/icons/create/group/group.svg"
              width={20}
              height={20}
            />
          </div>
          <h2>Group Name</h2>
        </div>
        <div className={"details"} ref={detailsRef}>
          <div className="column">
            <div className="head">Recipient</div>
            <div className="content">
              <ProfileIcons
                firstAlphabets={["M"]}
                colorStrings={[randomColor()]}
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
                firstAlphabets={group.members.map(({ name }) =>
                  name[0].toUpperCase()
                )}
                colorStrings={range(1, group.members.length).map(() =>
                  randomColor()
                )}
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
            <div className="content">{switchButton}</div>
          </div>
        </div>
      </div>
    ) : (
      <div className={styles.mobileGroup}>
        <div className="line"></div>
        <div className="head">Group Name</div>
        <div className="recipient">For Dropsile Inc.</div>
        <div className="divider"></div>
        <div className="loopers">
          <div className="h">Loopers:</div>
          {group?.members.map(({ email }, i) => {
            return (
              <p key={i} className="email">
                {email}
              </p>
            );
          })}
        </div>
        <div className="row">
          <span className="save">Save as default</span>
          <div className="switch"> {switchButton}</div>
        </div>
      </div>
    )
  ) : null;
};
export default Group;
const useStyles = makeStyles((theme) => ({
  desktopGroup: {
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
  mobileGroup: {
    padding: "1rem",
    position: "relative",
    boxShadow: "0px 0px 4px rgba(0, 0, 0, 0.16)",
    display: "flex",
    flexDirection: "column",
    gap: 10,
    "& .line": {
      height: 4,

      width: "94%",
      position: "absolute",
      top: 0,
      left: "3%",
      backgroundColor: "#F0A637",
    },

    "& .head": {
      fontSize: 22,
      color: "#092C4C",
      fontWeight: 500,
    },
    "& .recipient": {
      color: "#939191",
    },
    "& .divider": {
      borderBottom: "1px solid #DBDBDB",
    },
    "& .loopers": {
      "& .h": {
        color: "#333333",
        fontWeight: 500,
      },
      "& .email": {
        color: "#333333",
        fontSize: 14,
      },
    },
    "& .row": {
      display: "flex",
      justifyContent: "space-between",
      "& .save": {},
      "& .switch": {
        transform: "scale(.8)",
      },
    },
  },
}));
