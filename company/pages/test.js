import Tab from "../components/tabs/Tab";
import Main from "../layout/Main";

const Test = () => {
  return (
    <Main title="testing">
      <Tab
        titles={[
          {
            text: "Accpeted",
            id: "acc",
            fct: () => {
              console.log("a");
            },
            checked: true,
          },
          {
            text: "Invited",
            id: "inv",
            fct: () => {
              console.log("a");
            },
          },
        ]}
      />
    </Main>
  );
};

export default Test;
