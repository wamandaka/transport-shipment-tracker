<script setup>
import { computed, onMounted, ref } from "vue";
import { useShipmentStore } from "../stores/shipment";
import { Button, Dialog, InputText, Message, Select, Toast } from "primevue";
import { useToast } from "primevue";

const vehicle = [
  { label: "Truck", value: "Truck" },
  { label: "Van", value: "Van" },
  { label: "Bicycle", value: "Bicycle" },
];

const vehicleOptions = computed(() => {
  return vehicle.map((v) => ({
    label: v.label,
    value: v.value,
  }));
});

const toast = useToast();
const shipmentStore = useShipmentStore();
const visible = ref(false);
const idRandom = () => {
  return `SHIP${Math.floor(Math.random() * 1000000)}`;
};
const isSuccess = ref(false);
const message = ref("");
const shipment = ref({
  shipment_id: idRandom(),
  origin: "",
  destination: "",
  vehicle: "",
  transporter_id: null,
  status: "Not Assigned",
});

const addShipment = () => {
  if (
    !shipment.value.origin ||
    !shipment.value.destination ||
    !shipment.value.vehicle
  ) {
    // showToast("Please fill in all fields.", "danger");
    message.value = "Please fill in all fields.";
    isSuccess.value = false;
    return;
  }
  shipmentStore.addShipment(shipment.value);
  showToast("Shipment added successfully.", "success");
  message.value = "";
  visible.value = false;
  shipment.value = {
    shipment_id: "",
    origin: "",
    destination: "",
    vehicle: "",
    transporter_id: null,
    status: "Not Assigned",
  };
};

const showToast = (message, severity) => {
  toast.add({
    severity: severity,
    summary: severity === "success" ? "Success" : "Error",
    detail: message,
    life: 3000,
  });
};

const handleCloseModal = () => {
  visible.value = false;
  message.value = "";
};

// onMounted(() => {
//   shipmentStore.fetchShipments();
// });
</script>

<template>
  <Toast
    position="top-center"
    :breakpoints="{
      '960px': { width: '90vw' },
    }"
  />
  <div class="card flex mb-5">
    <Button label="Add new shipment" @click="visible = true" />
    <Dialog
      v-model:visible="visible"
      modal
      header="Add new Shipment"
      :style="{ width: '25rem' }"
    >
      <div v-if="message" class="my-4">
        <Message severity="error" closable>{{ message }}</Message>
      </div>
      <div class="flex items-center gap-4 mb-4">
        <label for="origin" class="font-semibold w-24">Origin</label>
        <InputText
          v-model="shipment.origin"
          id="origin"
          class="flex-auto"
          autocomplete="off"
        />
      </div>
      <div class="flex items-center gap-4 mb-4">
        <label for="destination" class="font-semibold w-24">Destination</label>
        <InputText
          v-model="shipment.destination"
          id="destination"
          class="flex-auto"
          autocomplete="off"
        />
      </div>
      <div class="flex items-center gap-4 mb-8">
        <label for="vehicle" class="font-semibold w-24">Vehicle</label>
        <Select
          v-model="shipment.vehicle"
          :options="vehicleOptions"
          option-value="value"
          optionLabel="label"
          placeholder="Select a vehicle"
        />
      </div>
      <div class="flex justify-end gap-2">
        <Button
          type="button"
          label="Cancel"
          severity="secondary"
          @click="handleCloseModal"
        ></Button>
        <Button type="button" label="Save" @click="addShipment"></Button>
      </div>
    </Dialog>
  </div>
  <div class="flex flex-col">
    <div class="-m-1.5 overflow-x-auto">
      <div class="p-1.5 min-w-full inline-block align-middle">
        <div class="border border-gray-200 overflow-hidden">
          <table class="min-w-full divide-y divide-gray-200">
            <thead>
              <tr>
                <th
                  scope="col"
                  class="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase"
                >
                  Shipment ID
                </th>
                <th
                  scope="col"
                  class="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase"
                >
                  Origin
                </th>
                <th
                  scope="col"
                  class="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase"
                >
                  Destination
                </th>
                <th
                  scope="col"
                  class="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase"
                >
                  Status
                </th>
                <th
                  scope="col"
                  class="px-6 py-3 text-end text-xs font-medium text-gray-500 uppercase"
                >
                  Action
                </th>
              </tr>
            </thead>
            <tbody class="divide-y divide-gray-200">
              <tr
                v-for="shipment in shipmentStore.shipments"
                :key="shipment.shipment_id"
              >
                <td
                  class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800"
                >
                  {{ shipment.shipment_id }}
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-800">
                  {{ shipment.origin }}
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-800">
                  {{ shipment.destination }}
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-800">
                  <span
                    v-if="shipment.status === 'Assigned'"
                    class="inline-flex items-center gap-x-1.5 py-1.5 px-3 rounded-full text-xs font-medium bg-teal-100 text-teal-800"
                    >Assigned</span
                  >
                  <span
                    v-if="shipment.status === 'Not Assigned'"
                    class="inline-flex items-center gap-x-1.5 py-1.5 px-3 rounded-full text-xs font-medium bg-red-100 text-red-800"
                    >Not Assigned</span
                  >
                </td>
                <td
                  class="px-6 py-4 whitespace-nowrap text-end text-sm font-medium"
                >
                  <router-link
                    :to="`/shipment/${shipment.shipment_id}`"
                    type="button"
                    class="inline-flex items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent text-blue-600 hover:text-blue-800 focus:outline-hidden focus:text-blue-800 disabled:opacity-50 disabled:pointer-events-none"
                  >
                    Detail
                  </router-link>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>
