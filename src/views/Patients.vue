<template>
  <div class="pa-4">
    <div class="d-flex justify-space-between">
      <div class="d-flex">
        <div class="mr-4 mb-4 display-1">
          Patients
        </div>
        <v-btn
          @click="searchIsActive = !searchIsActive"
        >
          Search
        </v-btn>
      </div>

      <div class="d-flex align-center">
        <div class="mr-2 pb-4">
          Sort:
        </div>
        <v-select class="ma-0 pa-0 sort_select" v-model="sortValue" :items="sortItems" item-text="text" item-value="value" />
      </div>
    </div>

    <div v-if="searchIsActive" class="mb-4 d-flex align-center">
      Search:
      <div class="px-4 d-flex align-center">
        <span class="mr-2">Name</span>
        <v-switch v-model="searchState"/>
        <span>СНИЛС</span>
      </div>

      <v-text-field
        v-model="searchStr"
        class="pt-0"
        label="Search"
        hide-details
        required
        clearable
      />
    </div>

    <div
      v-for="patient in patients"
      :key="patient.id"
    >
      <v-card class="pa-4 mb-4 d-flex justify-space-between align-center">
        <v-card-title class="pa-0 patient-name">
          {{ patient.fullName }}
        </v-card-title>
        <div class="subtitle-2">
          СНИЛС: {{ patient.snils }}
        </div>
        <v-card-actions class="pa-0">
          <v-btn
            icon
            @click="openViewDialog(patient)"
          >
            <v-icon>mdi-eye</v-icon>
          </v-btn>
          <v-btn
            icon
            @click="openDialog(patient)"
          >
            <v-icon>mdi-pencil</v-icon>
          </v-btn>
          <v-btn
            icon
            @click="openConfirm(patient)"
          >
            <v-icon>mdi-trash-can</v-icon>
          </v-btn>
        </v-card-actions>
      </v-card>
    </div>
    <v-dialog
      v-model="dialog"
      max-width="800px"
      persistent
    >
      <PatientForm
        :patient="patient"
        @closePatientForm="closeDialog"
        @deletePatient="deletePatient"
        @savePatient="savePatient"
      />
    </v-dialog>
    <v-dialog
      v-model="viewDialog"
      max-width="800px"
      persistent
    >
      <PatientView
        :patient="patient"
        @closePatientView="closeViewDialog"
      />
    </v-dialog>
    <v-dialog
      v-model="confirmDialog"
      max-width="275px"
      persistent
    >
      <ConfirmDeleting
        @closeConfirm="confirmDialog = false"
        @deleteAll="deletePatient(patient)"
      />
    </v-dialog>
  </div>
</template>

<script>

import PatientForm from '@/components/PatientForm'
import PatientView from '@/components/PatientView'
import ConfirmDeleting from '@/components/ConfirmDeleting'

export default {
  name: 'Patients',
  components: {
    PatientForm,
    PatientView,
    ConfirmDeleting
  },
  data: () => {
    return {
      sortItems: [
        { text: 'Default', value: 'default' },
        { text: 'Sort A-Z', value: 'a-z' },
        { text: 'Sort Z-A', value: 'z-a' },
      ],
      sortValue: 'default',
      searchState: false,
      searchStr: '',
      searchIsActive: false,
      dialog: false,
      viewDialog: false,
      confirmDialog: false,
      patient: {},
      patientForDelete: null,
    }
  },
  computed: {
    patients() {
      const patients = this.$store.getters.allPatients
      //Фильтрация пациентов по имени или по СНИЛС
      const filteredPatients = patients.filter(p => {
        if (!this.searchStr || !this.searchIsActive) return true
        if (this.searchState) {
          return p.snils.includes(this.searchStr)
        }
        return p.fullName.includes(this.searchStr)
      })
      //Сортировка пациентов
      return filteredPatients.sort((a, b) => {
        if (['a-z', 'z-a'].includes(this.sortValue)) {
          if(a.fullName < b.fullName) { return this.sortValue === 'a-z' ?  -1 : 1; }
          if(a.fullName > b.fullName) { return this.sortValue === 'a-z' ?  1 : -1; }
          return 0;
        }
        return 0
      })
    },
  },
  methods: {
    openDialog(patient) {
      this.patient = patient
      this.dialog = true
    },
    openViewDialog(patient) {
      this.patient = patient
      this.viewDialog = true
    },
    closeDialog() {
      this.dialog = false
      this.patient = {}
    },
    closeViewDialog() {
      this.viewDialog = false
      this.patient = {}
    },
    openConfirm(patient) {
      this.confirmDialog = true
      this.patientForDelete = patient
    },
    deletePatient() {
      this.$store.dispatch('deletePatient', this.patientForDelete.id)
      this.closeDialog()
      this.confirmDialog = false
      this.patientForDelete = null
    },
    savePatient(patient) {
      this.$store.dispatch('updatePatient', patient)
      this.closeDialog()
    }
  }
}
</script>

<style scoped>
.patient-name {
  width: 600px;
}
.sort_select {
  max-width: 150px;
}
</style>