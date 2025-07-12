import { defineStore } from "pinia";
// import shipment from "../../public/data/shipment.json";
// import transporter from "../../public/data/transporter.json";
import shipment from "../data/shipment.json";
import transporter from "../data/transporter.json";

export const useShipmentStore = defineStore("shipment", {
  state: () => ({
    shipments: [...shipment],
    transporters: [...transporter],
    loading: false,
    error: null,
  }),
  actions: {
    // async fetchShipments() {
    //   this.loading = true;
    //   this.error = null;
    //   try {
    //     const res = await fetch("/data/shipment.json");
    //     if (!res.ok) {
    //       throw new Error("Failed to fetch shipments");
    //     }
    //     this.shipments = await res.json();
    //   } catch (error) {
    //     this.error = "Error fetching shipments: " + error.message;
    //   } finally {
    //     this.loading = false;
    //   }
    // },
    // async fetchTransporters() {
    //   this.loading = true;
    //   this.error = null;
    //   try {
    //     const res = await fetch("/data/transporter.json");
    //     if (!res.ok) {
    //       throw new Error("Failed to fetch transporters");
    //     }
    //     this.transporters = await res.json();
    //   } catch (error) {
    //     this.error = "Error fetching transporters: " + error.message;
    //   } finally {
    //     this.loading = false;
    //   }
    // },
    assignTransporter(shipmentId, transporterId) {
      const shipment = this.shipments.find((s) => s.shipment_id === shipmentId);
      if (shipment && transporterId) {
        shipment.transporter_id = transporterId;
        shipment.status = "Assigned";
        return { success: true, message: "Transporter assigned successfully." };
      }
      return { success: false, message: "Assignment failed." };
    },
    addShipment(newShipment) {
      this.shipments.push(newShipment);
    },
  },
});
