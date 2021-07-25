export class GaslandRoster {
    rosterName: string = "";
    cans: number = 0;

    sponsor: string = "";

    vehicles: Array<Vehicle> = [];

    constructor() { }
}

export enum VehicleType {
    DragRacer,
    Bike,
    Buggy,
    BikeWithSidecar,
    IceCreamTruck,
    Car,
    PerformanceCar,
    Truck,
    Gyrocopter,
    Ambulance,
    MonsterTruck,
    HeavyTruck,
    Bus,
    Helicopter,
    Tank,
    WarRig,
}

export enum VehicleWeight {
    Lightweight,
    Middleweight,
    Heavyweight,
}

export class Vehicle {
    weight: VehicleWeight = VehicleWeight.Lightweight;
    hullPoints: number = 0;
    handling: number = 0;
    maxGear: number = 0;
    crew: number = 0;
    constructor(readonly type: VehicleType) { }
}

export default function parse(xml: string): GaslandRoster {
    const parser = new DOMParser();
    const doc = parser.parseFromString(xml, "text/xml");

    const root = doc.documentElement;
    if (root.tagName !== "roster" || root.getAttribute("gameSystemName") !== "Gaslands" || parseInt(root.getAttribute("gameSystemRevision")) < 20) {
        throw new Error("Invalid Gasland roster");
    }

    const roster = new GaslandRoster();
    roster.rosterName = root.getAttribute("name");

    const costs = root.getElementsByTagName("costs")[0];
    const cans = [...costs.children].find(c => c.getAttribute("name") === "Cans");
    roster.cans = parseInt(cans.getAttribute("value"));

    const teamDescription = root.getElementsByTagName("forces")[0].getElementsByTagName("force")[0].getElementsByTagName("selections")[0];
    const sponsor = [...teamDescription.children].find(c => c.getAttribute("name") === "Sponsor");
    const vehicles = [...teamDescription.children].filter(c => c.getAttribute("name") !== "Sponsor");

    roster.sponsor = sponsor.children[0].children[0].getAttribute("name");

    vehicles.forEach(vehicle => {
        const vehicleType = vehicle.getAttribute("name");
        const characteristics = vehicle.getElementsByTagName("profiles")[0].children[0].children[0];

        const v = new Vehicle(VehicleType[vehicleType]);
        v.weight = VehicleWeight[[...characteristics.children].find(c => c.getAttribute("name") === "Weight").textContent];
        v.maxGear = parseInt([...characteristics.children].find(c => c.getAttribute("name") === "Max Gear").textContent);
        v.handling = parseInt([...characteristics.children].find(c => c.getAttribute("name") === "Handling").textContent);
        v.hullPoints = parseInt([...characteristics.children].find(c => c.getAttribute("name") === "Hull Points").textContent);
        v.crew = parseInt([...characteristics.children].find(c => c.getAttribute("name") === "Crew").textContent);

        roster.vehicles.push(v);

        console.log(v);
    });

    return roster;
}