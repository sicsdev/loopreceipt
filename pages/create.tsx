import Group from "@components/Create/Group";
import OneByOne from "@components/Create/OneByOne";
import SelectOption from "@components/Create/SelectOption";
import { makeStyles } from "@material-ui/core";
import Layout from "@components/Layout";

import { useState } from "react";
const Create = () => {
  const styles = useStyles();
  const [option, setOption] = useState<"onebyone" | "group">();
  return (
    <Layout>
      <div className={styles.Create}>
        {option === "onebyone" ? (
          <OneByOne />
        ) : option === "group" ? (
          <Group />
        ) : (
          <SelectOption setOption={setOption} />
        )}
      </div>
    </Layout>
  );
};
export default Create;
const useStyles = makeStyles((theme) => ({
  Create: {},
}));
