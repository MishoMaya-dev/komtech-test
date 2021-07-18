<template>
  <v-card class="pa-4">
    <div class="mb-2 headline text-center">
      Are you sure?
    </div>
    <v-divider dark class="mb-2"/>
    <div class="mb-4 text-center">
      Do you want to delete this patient with his consultation?
      This patient with consultations. <br> Do you want to delete?
    </div>
    <div class="d-flex justify-space-between">
      <v-btn
        @click="$emit('closeConfirm')"
      >
        Cancel
      </v-btn>
      <v-btn
        color="error"
        @click="$emit('deleteAll')"
      >
        Delete
      </v-btn>
    </div>
  </v-card>
</template>

<script>
export default {
  name: 'ConfirmDeleting',
}
</script>

<style scoped>

</style>