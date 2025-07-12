import { describe, it, expect, beforeEach } from "vitest";
import { setActivePinia, createPinia } from "pinia";
import { useShipmentStore } from "../stores/shipment";

describe("Shipment Store", () => {
  beforeEach(() => {
    setActivePinia(createPinia());
  });

  it("assigns transporter correctly", () => {
    const store = useShipmentStore();
    const result = store.assignTransporter("SHIP123456", "TR001");
    expect(result.success).toBe(true);
    expect(
      store.shipments.find((s) => s.shipment_id === "SHIP123456").transporter_id
    ).toBe("TR001");
  });

  it("fails assignment when transporter is missing", () => {
    const store = useShipmentStore();
    const result = store.assignTransporter("SHIP123456", "");
    expect(result.success).toBe(false);
  });
});
