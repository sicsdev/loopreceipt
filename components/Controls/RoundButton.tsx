import { makeStyles } from "@material-ui/core";
interface RoundButtonProps {
  children: JSX.Element | string;
  color?: string;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
}
const RoundButton = ({
  children,
  color = "black",
  onClick,
}: RoundButtonProps) => {
  const styles = useStyles({ color });
  return (
    <button className={styles.RoundButton} onClick={onClick}>
      {children}
    </button>
  );
};
export default RoundButton;
const useStyles = makeStyles((theme) => ({
  RoundButton: ({ color }: { color: string }) => ({
    padding: "1rem",
    borderRadius: "2rem",
    border: `1px solid ${color}`,
    color: color,
    width: "100%",
    maxWidth: 255,
    backgroundColor: "white",
  }),
}));
