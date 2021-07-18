<template>
  <v-card class="pa-4">
    <div class="d-flex justify-space-between align-center">
      <div class="display-1">
        Patient
      </div>
      <v-btn icon @click="$emit('closePatientView')">
        <v-icon>mdi-close</v-icon>
      </v-btn>
    </div>

    <v-divider dark/>
    <div class="d-flex justify-space-between">
      <v-list two-line>
        <v-list-item v-for="(data, i) in patientData" :key="i">
          <v-list-item-content>
            <v-list-item-subtitle>{{ data.label }}</v-list-item-subtitle>
            <v-list-item-title>{{ data.data }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
      <div>
        <v-btn
          v-if="!more && patient.weight || patient.height || patient.age"
          class="mt-6"
          @click="more = !more"
        >
          {{ more ? 'Hide information' : 'More information' }}
        </v-btn>
        <v-list v-if="more" two-line>
          <v-list-item v-for="(data, i) in moreData" :key="i">
            <v-list-item-content>
              <v-list-item-subtitle>{{ data.label }}</v-list-item-subtitle>
              <v-list-item-title>{{ data.data }}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list>
      </div>
    </div>
    <v-divider dark />
    <div v-if="consults.length">
      <div class="my-4 headline">
        Consultation appointments
      </div>
      <v-list two-line v-for="(data, i) in consults" :key="i" class="d-flex">
        <v-list-item>
          <div class="mr-4">{{ consults.length }}</div>
          <v-list-item-content>
            <v-list-item-subtitle>Date</v-list-item-subtitle>
            <v-list-item-title>{{ data.date }}</v-list-item-title>
            <v-divider/>
          </v-list-item-content>
        </v-list-item>
        <v-list-item>
          <v-list-item-content>
            <v-list-item-subtitle>Time</v-list-item-subtitle>
            <v-list-item-title>{{ data.time }}</v-list-item-title>
            <v-divider/>
          </v-list-item-content>
        </v-list-item>
        <v-list-item v-if="data.symptoms">
          <v-list-item-content>
            <v-list-item-subtitle>Symptoms</v-list-item-subtitle>
            <v-list-item-title>{{ data.symptoms }}</v-list-item-title>
            <v-divider/>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </div>
  </v-card>
</template>

<script>
export default {
  name: 'PatientView',
  props: {
    patient: Object
  },
  data() {
    return {
      more: false
    }
  },
  computed: {
    consults() {
      return this.$store.getters.allConsultations.filter(c => c.patient_id === this.patient.id)
    },
    patientData() {
      return [
        {label: 'Name', data: this.patient.fullName},
        {label: 'Birth date', data: this.patient.birthDate},
        {label: 'Gender', data: this.patient.gender},
        {label: 'СНИЛС', data: this.patient.snils},
      ]
    },
    moreData() {
      return [
        {label: 'Weight', data: this.patient.weight},
        {label: 'Height', data: this.patient.height},
        {label: 'Age', data: this.patient.age},
      ]
    },
  }
}
</script>

<style scoped>

</style>