import { VehicleType, VehicleWeight, Vehicle as V } from "../../data/rosz";
import styles from "./Vehicle.module.css";

const Vehicle = (props: { vehicle: V }) => (
    <div class={styles.card}>
        <span class={styles.name}>{VehicleType[props.vehicle.type].toUpperCase()}</span>
        <span class={styles.handling}>{`HANDLING:`}
            <button>{props.vehicle.handling}</button>
        </span>
        <span class={styles.weight}>{VehicleWeight[props.vehicle.weight].toUpperCase()}</span>
    </div>
);

export default Vehicle;