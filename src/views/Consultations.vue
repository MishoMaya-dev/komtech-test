<template>
  <div class="pa-4">
    <div class="mr-4 mb-4 display-1">
      Consultations
    </div>

    <div
      v-for="(consult, i) in consultations"
      :key="i"
    >
      <v-card class="pa-4 mb-4 d-flex justify-space-between align-center">
        <div class="d-flex">
          <div class="mr-4">
            {{ i + 1 }}
          </div>
          <div>
            Date: {{ consult.date }}
          </div>
        </div>

        <div>
          Time: {{ consult.time }}
        </div>
        <div class="d-flex align-center">
          <div class="mr-6 patient_name d-flex justify-end">
            {{ consult.patient.fullName }}
          </div>
          <v-card-actions class="pa-0">
            <v-btn
              icon
              @click="openConsultForm(consult)"
            >
              <v-icon>mdi-pencil</v-icon>
            </v-btn>
            <v-btn
              icon
              @click="deleteConsult(consult.id)"
            >
              <v-icon>mdi-trash-can</v-icon>
            </v-btn>
          </v-card-actions>
        </div>

      </v-card>
    </div>
    <v-dialog
      v-model="consultFormDialog"
      max-width="800px"
      persistent
    >
      <ConsultationForm
        v-if="consultation"
        :consultation="consultation"
        @closeForm="closeForm"
        @deleteConsult="deleteConsult"
        @saveConsult="updateConsultation"
      />
    </v-dialog>
  </div>
</template>

<script>
import ConsultationForm from '@/components/ConsultationForm'

export default {
  name: 'Consultations',
  components: {
    ConsultationForm,
  },
  data() {
    return {
      consultFormDialog: false,
      consultation: null
    }
  },
  computed: {
    consultations() {
      return this.$store.getters.allConsultsWithPatients
    }
  },
  methods: {
    closeForm() {
      this.consultFormDialog = false
      this.consultation = null
    },
    deleteConsult(id) {
      this.closeForm()
      this.$store.dispatch('deleteConsultation', id)
    },
    updateConsultation(consult) {
      this.closeForm()
      this.$store.dispatch('updateConsultation', consult)
    },
    openConsultForm(consult) {
      this.consultation = {...consult}
      this.consultFormDialog = true
    }
  }
}
</script>

<style scoped>
.patient_name {
  width: 250px;
}
</style>