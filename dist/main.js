"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = require("@monaco-editor/react");
const React = require("react");
const react_dom_1 = require("react-dom");
require("react-grid-layout/css/styles.css");
require("react-resizable/css/styles.css");
const review_hub_1 = require("review-hub");
const demo_store_1 = require("./demo-store");
const currentUser = "current-user";
const DemoApp = () => {
    const [store, dispatch] = React.useReducer(review_hub_1.appReducer, {
        ...review_hub_1.initialState,
        interactionStore: { currentUser },
    });
    const m = react_1.useMonaco();
    React.useEffect(() => {
        const effect = async () => {
            const vcStore = await demo_store_1.demoStore.load();
            const mainStore = demo_store_1.createFakeMainStore(vcStore.files);
            dispatch({ type: "load", vcStore, mainStore });
        };
        effect();
    }, []);
    if (!m) {
        return React.createElement("div", null, "loading ...");
    }
    else
        return (React.createElement(review_hub_1.App, { store: store, dispatch: dispatch, name: "Demo Review Set", buttons: [
                {
                    title: "Download Zip",
                    handleClick: (dispatch, store) => {
                        review_hub_1.generateZip({
                            ...store.vcStore.files,
                            ...store.wsStore.files,
                        });
                    },
                },
                {
                    title: "Pull Main",
                    handleClick: (dispatch, store) => {
                        dispatch({ type: "load", mainStore: demo_store_1.createFakeMainStore(store.vcStore.files) });
                    },
                },
                {
                    title: "Load",
                    handleClick: async (dispatch) => {
                        dispatch({ type: "load", vcStore: await demo_store_1.demoStore.load() });
                    },
                },
                {
                    title: "Save",
                    handleClick: (dispatch, store) => {
                        demo_store_1.demoStore.save(store.vcStore);
                    },
                },
            ] }));
};
react_dom_1.render(React.createElement(DemoApp, null), document.getElementById("root"));
//# sourceMappingURL=main.js.map