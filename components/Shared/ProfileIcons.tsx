import { makeStyles } from "@material-ui/core";

import Image from "next/image";
interface ProfileIconsProps {
  firstAlphabets: string[];
  colorStrings: string[];
}
const ProfileIcons = ({ firstAlphabets, colorStrings }: ProfileIconsProps) => {
  const styles = useStyles();

  return (
    <div className={styles.ProfileIcons}>
      {firstAlphabets.map((alpha, i) => (
        <div
          className="profile"
          style={{
            backgroundColor: colorStrings[i],
            zIndex: 7 - i,
            transform: `translateX(-${8 * i}px)`,
          }}
          key={i}
        >
          {alpha}
        </div>
      ))}
      <div
        className="personadd"
        style={{
          transform: `translateX(-${8 * firstAlphabets.length}px)`,
        }}
      >
        <Image
          alt="icon"
          src="/icons/create/group/personadd.svg"
          width={20}
          height={20}
        />
      </div>
    </div>
  );
};
export default ProfileIcons;
const useStyles = makeStyles((theme) => ({
  ProfileIcons: {
    display: "flex",
    "& .profile, .personadd": {
      borderRadius: "50%",
      width: 48,
      height: 48,
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
    },
    "& .profile": {
      color: "white",
    },
    "& .personadd": {
      border: "1px solid #B8B9BC",
      borderStyle: "dashed",
    },
  },
}));
