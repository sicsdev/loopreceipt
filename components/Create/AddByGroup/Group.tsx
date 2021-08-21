import { makeStyles } from "@material-ui/core";
import ProfileIcons from "@components/Shared/ProfileIcons";
import Switch from "@components/Controls/Switch";
import { randomColor, randomMemoizedColor, range } from "@helpers/utils";
import Image from "next/image";
import { useState, useRef, useEffect } from "react";
import { useWindowDimensions } from "@hooks/useWindowDimensions";
import Win from "@helpers/Win";
import { EntityGroup } from "apiHelpers/types";
import { useFetch } from "@hooks/useFetch";
import groupsApi from "@apiClient/groupsApi";
interface GroupProps {
  group?: EntityGroup;
  selected: boolean;
}
const Group = ({ group, selected }: GroupProps) => {
  const [isDefault, setIsDefault] = useState(() => {
    if (group && group.isDefault) return true;
    return false;
  });
  const styles = useStyles({ selected });
  const detailsRef = useRef<HTMLDivElement>(null);
  const { windowDimensions } = useWindowDimensions();
  const win = new Win(windowDimensions);
  const initRef = useRef(true);
  const updateDefaultStatus = useFetch<{
    group: EntityGroup;
  }>(groupsApi.update, { deferred: true });
  useEffect(() => {
    if (initRef.current) {
      // because we don't want to do this at first render
      initRef.current = false;
      return;
    }
    // console.log(group?.groupid);
    // console.log(isDefault);
    if (group?.groupid) {
      (async () => {
        console.log(group);
        const loopersWithoutId = group.loopers.map((looper) => {
          return {
            email: looper.email,
            name: looper.name,
          };
        });
        const response = await updateDefaultStatus.sendRequest({
          group: {
            ...group,
            loopers: loopersWithoutId,
            // isDefault: undefined,
            creator: undefined,
            createdAt: undefined,
            updatedAt: undefined,
            isDefault: isDefault,
            __v: undefined,
            groupid: undefined,
          },
          groupid: group.groupid,
        });
        console.log("response");
        if (response) console.log(response.group.isDefault);
      })();
    }
  }, [isDefault]);
  const switchButton = (
    <Switch
      checked={isDefault}
      onChange={(e, checked) => {
        setIsDefault(checked);
      }}
      onClick={(e) => {
        e.stopPropagation();
        // we want to prevent group getting selecting
        // while we are just toggling the default status of this group
        // console.log("switch button clicked");
      }}
      name="saveAsDefault"
      inputProps={{ "aria-label": "saveAsDefault" }}
    />
  );
  const checkmark = selected ? (
    <div className={styles.checkmark}>
      <Image
        alt="icon"
        src="/icons/create/group/checkmark.svg"
        width={20}
        height={20}
      />
    </div>
  ) : null;
  return group ? (
    win.up("sm") ? (
      <div className={styles.desktopGroup}>
        {checkmark}
        <div className="heading">
          <div>
            <Image
              alt="icon"
              src="/icons/create/group/group.svg"
              width={20}
              height={20}
            />
          </div>
          <h2>{group.name}</h2>
        </div>
        <div className={"details"} ref={detailsRef}>
          <div className="column">
            <div className="head">Recipient</div>
            <div className="content">
              <ProfileIcons
                firstAlphabets={["M"]}
                colorStrings={[randomMemoizedColor("fdsfsd")]}
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
                firstAlphabets={group.loopers.map(({ name }) =>
                  name[0].toUpperCase()
                )}
                colorStrings={group.loopers.map((looper, i) =>
                  randomMemoizedColor(looper.name + looper.email)
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
              <p>{group.createdFor}</p>
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
        {checkmark}
        <div className="line"></div>
        <div className="head">{group.name}</div>
        <div className="recipient">For {group.createdFor}</div>
        <div className="divider"></div>
        <div className="loopers">
          <div className="h">Loopers:</div>
          {group?.loopers.map(({ email }, i) => {
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
interface StyleProps {
  selected: boolean;
}

const useStyles = makeStyles((theme) => ({
  desktopGroup: (props: StyleProps) => ({
    backgroundColor: props.selected ? "#F6FBFF" : "#fff",
    boxShadow: "0px 0px 4px rgba(0, 0, 0, 0.25)",
    borderRadius: 8,
    padding: "1rem",
    position: "relative",
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
  }),
  mobileGroup: (props: StyleProps) => ({
    backgroundColor: props.selected ? "#F6FBFF" : "#fff",
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
  }),
  checkmark: {
    position: "absolute",
    top: 16,
    right: 16,
  },
}));
