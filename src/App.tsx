import { Component, createResource, createSignal } from "solid-js";
import styles from "./App.module.css";
import rosParse from "./data/rosz";
import Vehicle from "./Game/Vehicle/Vehicle";
import JSZip from "jszip";

const parseRosz = async (path: string) => fetch(path)
    .then(v => v.blob())
    .then(v => JSZip.loadAsync(v).then(z => z.file(Object.keys(z.files)[0]).async("string")));

const App: Component = () => {
    const [rosterPath, setRosterPath] = createSignal("./example/Rusty.rosz");
    const [roster] = createResource(rosterPath, parseRosz);

    const vehicles = () => {
        const xml = roster();
        if (!xml) {
            return [];
        }
        return rosParse(xml).vehicles.map(v => <Vehicle vehicle={v} />);
    };

    return (
        <div class={styles.App}>
            <header class={styles.header}>
                <div>
                    {vehicles()}
                </div>
            </header>
        </div>
    );
};

export default App;
