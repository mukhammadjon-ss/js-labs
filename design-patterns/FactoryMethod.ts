// BAD CODE

// Transport.ts
export interface Transport {
  deliver(): void;
}

export class Truck implements Transport {
  deliver(): void {
    console.log("Delivering cargo by land in a truck");
  }
}

export class Ship implements Transport {
  deliver(): void {
    console.log("Delivering cargo by sea in a container");
  }
}

export class Air implements Transport {
  deliver(): void {
    console.log("Delivering cargo by sea in a airplane");
  }
}

abstract class Logistics {
  abstract createTransport(): Transport;

  planDelivery(): void {
    const transport = this.createTransport(); // truck
    transport.deliver();
  }
}

export class RoadLogistics extends Logistics {
  createTransport(): Transport {
    return new Truck();
  }
}

class SeaLogistics extends Logistics {
  createTransport(): Transport {
    return new Ship();
  }
}

function cliendCode(logistics: RoadLogistics | SeaLogistics) {
  logistics.planDelivery();
}

const roadLogistics = new RoadLogistics();
cliendCode(roadLogistics);

const seaLogistics = new SeaLogistics();
cliendCode(seaLogistics);
