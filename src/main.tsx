import { monaco } from "@monaco-editor/react";
import * as React from "react";
import { render } from "react-dom";
import "react-grid-layout/css/styles.css";
import "react-resizable/css/styles.css";
import { App, appReducer, initialState, generateZip } from "review-hub";
import { createFakeMainStore, demoStore } from "./demo-store";

monaco.init().then(() => console.debug("[main.tsx] Monaco has initialized..."));
const currentUser = "current-user";

const DemoApp = () => {
  const [store, dispatch] = React.useReducer(appReducer, {
    ...initialState,
    interactionStore: { currentUser },
  });

  React.useEffect(() => {
    const effect = async () => {
      const vcStore = await demoStore.load();
      const mainStore = createFakeMainStore(vcStore.files);

      dispatch({ type: "load", vcStore, mainStore });
    };

    effect();
  }, []);

  return (
    <App
      store={store}
      dispatch={dispatch}
      name="Demo Review Set"
      buttons={[
        {
          title: "Download Zip",
          handleClick: (dispatch, store) => {
            generateZip({
              ...store.vcStore.files,
              ...store.wsStore.files,
            });
          },
        },
        {
          title: "Pull Main",
          handleClick: (dispatch, store) => {
            dispatch({ type: "load", mainStore: createFakeMainStore(store.vcStore.files) });
          },
        },
        {
          title: "Load",
          handleClick: async (dispatch) => {
            dispatch({ type: "load", vcStore: await demoStore.load() });
          },
        },
        {
          title: "Save",
          handleClick: (dispatch, store) => {
            demoStore.save(store.vcStore);
          },
        },
      ]}
    />
  );
};

render(<DemoApp />, document.getElementById("root"));
