<script setup>
import { ref, onMounted, computed, watch } from "vue";
import { useShipmentStore } from "../stores/shipment";
import { useToast } from "primevue/usetoast";
import { Button, Select, Toast } from "primevue";

const toast = useToast();
const props = defineProps(["id"]);
const store = useShipmentStore();
// const transporterStore = useShipmentStore();
const selectedTransporter = ref("");
const message = ref("");
const success = ref(false);

// Debugging: Log perubahan state
watch(
  () => store.shipments,
  (newVal) => {
    console.log("Shipments updated:", newVal);
  },
  { deep: true }
);

const showSuccess = (type) => {
  toast.add({
    severity: type,
    summary: success.value ? "Success" : "Error",
    detail: message.value,
    life: 3000,
  });
};
// onMounted(() => {
//   shipmentStore.fetchShipments();
//   transporterStore.fetchTransporters();
// });

const transporterOptions = computed(() => {
  return store.transporters.map((transporter) => ({
    name: transporter.name,
    value: transporter.transporter_id,
  }));
});

const shipment = computed(() => {
  const found = store.shipments.find((s) => s.shipment_id === props.id);
  console.log("Found shipment:", found); // Debug
  return found;
});

const assignedTransporter = computed(() => {
  if (!shipment.value?.transporter_id) {
    console.log("No transporter assigned yet");
    return null;
  }
  const found = store.transporters.find(
    (t) => t.transporter_id === shipment.value.transporter_id
  );
  console.log("Assigned transporter:", found); // Debug
  return found;
});

function assign() {
  console.log("Assigning:", selectedTransporter.value); // Debug
  if (!selectedTransporter.value) {
    message.value = "Please select a transporter.";
    success.value = false;
    showSuccess("error");
    return;
  }

  const result = store.assignTransporter(props.id, selectedTransporter.value);
  console.log("Assignment result:", result); // Debug

  message.value = result.message;
  success.value = result.success;

  showSuccess(result.success ? "success" : "error");
}
</script>
<template>
  <Toast
    position="top-center"
    :breakpoints="{
      '960px': { width: '90vw' },
    }"
  />
  <div class="mb-4">
    <router-link to="/" class="text-blue-600">← Back</router-link>
  </div>
  <div v-if="shipment">
    <div class="flow-root">
      <dl
        class="-my-3 divide-y divide-gray-200 rounded border border-gray-200 text-sm"
      >
        <div class="grid grid-cols-1 gap-1 p-3 sm:grid-cols-3 sm:gap-4">
          <dt class="font-medium text-gray-900">Shipment ID</dt>

          <dd class="text-gray-700 sm:col-span-2">
            {{ shipment?.shipment_id }}
          </dd>
        </div>

        <div class="grid grid-cols-1 gap-1 p-3 sm:grid-cols-3 sm:gap-4">
          <dt class="font-medium text-gray-900">Route</dt>

          <dd class="text-gray-700 sm:col-span-2">
            {{ `From: ${shipment?.origin} to: ${shipment?.destination}` }}
          </dd>
        </div>

        <div class="grid grid-cols-1 gap-1 p-3 sm:grid-cols-3 sm:gap-4">
          <dt class="font-medium text-gray-900">Vehicle</dt>

          <dd class="text-gray-700 sm:col-span-2">{{ shipment?.vehicle }}</dd>
        </div>

        <div class="grid grid-cols-1 gap-1 p-3 sm:grid-cols-3 sm:gap-4">
          <dt class="font-medium text-gray-900">Transporter</dt>
          <dd class="text-gray-700 sm:col-span-2">
            <span v-if="shipment.status === 'Assigned'">
              {{ assignedTransporter?.name }}
            </span>
            <span
              v-else
              class="inline-flex items-center gap-x-1.5 py-1.5 px-3 rounded-full text-xs font-medium bg-red-100 text-red-800"
            >
              Not Assigned
            </span>
          </dd>
        </div>
      </dl>
    </div>

    <div class="mt-5">
      <div class="flex items-center gap-4">
        <!-- Floating Select -->
        <div class="relative">
          <Select
            v-model="selectedTransporter"
            :options="transporterOptions"
            optionLabel="name"
            placeholder="Select a transporter"
            class="w-full md:w-56"
          />
        </div>
        <!-- End Floating Select -->
        <Button
          @click="assign"
          label="Assign Transporter"
          severity="info"
          class="w-full md:w-auto"
        ></Button>
      </div>
      <p
        v-if="message"
        class="mt-2 text-sm"
        :class="success ? 'text-green-500' : 'text-red-500'"
      >
        {{ message }}
      </p>
    </div>
  </div>
  <div v-else>
    <p>Shipment not found.</p>
  </div>
</template>
