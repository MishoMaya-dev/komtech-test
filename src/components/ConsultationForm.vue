<template>
  <v-card class="pa-4">
    <div class="d-flex justify-space-between align-center">
      <div class="display-1">
        {{ consultation ? 'Edit' : 'New consultation' }}
      </div>
      <v-btn icon @click="$emit('closeForm')">
        <v-icon>mdi-close</v-icon>
      </v-btn>
    </div>
    <v-divider class="mb-4" dark/>
    <v-form
      ref="form"
      v-model="valid"
      lazy-validation
    >
      <div class="d-flex align-center">
        <div class="mr-4">
          Patient's name:
        </div>
        <v-select
          :value="consult.patient"
          :items="patients"
          item-text="fullName"
          item-value="id"
          class="mr-4"
          :rules="[v => !!v.fullName || 'Patient is required']"
          @input="selectUser"
        />
        <div v-if="consult.patient.snils" class="text-decoration-underline">
          СНИЛС: {{ consult.patient.snils }}
        </div>
      </div>
      <div class="d-flex align-center">
        <div class="mr-4 d-flex align-center date-time">
          <v-menu
            ref="menu"
            v-model="menu"
            :close-on-content-click="false"
            :return-value.sync="consult.date"
            transition="scale-transition"
            offset-y
            min-width="auto"
          >
            <template v-slot:activator="{ on, attrs }">
              <div class="patient-input">
                <v-text-field
                  v-model="consult.date"
                  :rules="[v => !!v || 'Date is required']"
                  label="Date"
                  prepend-icon="mdi-calendar"
                  readonly
                  v-bind="attrs"
                  v-on="on"
                  class="mr-4"
                  required
                />
              </div>

            </template>
            <v-date-picker
              v-model="consult.date"
              :allowed-dates="allowedDates"
              no-title
              scrollable
            >
              <v-spacer></v-spacer>
              <v-btn
                text
                color="primary"
                @click="menu = false"
              >
                Cancel
              </v-btn>
              <v-btn
                text
                color="primary"
                @click="$refs.menu.save(consult.date)"
              >
                OK
              </v-btn>
            </v-date-picker>
          </v-menu>
          <v-menu
            ref="menuTime"
            v-model="menu2"
            :close-on-content-click="false"
            :nudge-right="40"
            :return-value.sync="consult.time"
            transition="scale-transition"
            offset-y
            max-width="290px"
            min-width="290px"
          >
            <template v-slot:activator="{ on, attrs }">
              <v-text-field
                v-model="consult.time"
                label="Time"
                :rules="[v => !!v || 'Time is required']"
                prepend-icon="mdi-clock-time-four-outline"
                readonly
                v-bind="attrs"
                v-on="on"
              ></v-text-field>
            </template>
            <v-time-picker
              v-if="menu2"
              v-model="consult.time"
              :allowed-hours="allowedHours"
              format="24hr"
              full-width
              @click:minute="$refs.menuTime.save(consult.time)"
            ></v-time-picker>
          </v-menu>
        </div>
        <div v-if="timeIsBusy && !consultation" class="caption red--text">
          This time is busy!
        </div>
      </div>
      <v-textarea
        v-model="consult.symptoms"
        class="mb-4"
        label="Symptoms"
        no-resize
        rows="2"
      />
      <v-divider class="mb-4" />
      <v-expansion-panels v-if="consult.patient.fullName" class="mb-4">
        <v-expansion-panel>
          <v-expansion-panel-header class="title">
            Patient's information
          </v-expansion-panel-header>
          <v-expansion-panel-content >
            <div class="mb-2">
              Birth date: {{ consult.patient.birthDate }}
            </div>
            <div class="mb-2">
              Gender: {{ consult.patient.gender }}
            </div>
            <div>
              Weight: {{ consult.patient.weight }}
            </div>
            <div>
              Height: {{ consult.patient.height }}
            </div>
            <div>
              Age: {{ consult.patient.age }}
            </div>

          </v-expansion-panel-content>
        </v-expansion-panel>
      </v-expansion-panels>
      <div class="d-flex justify-space-between align-center">
        <v-btn
          v-if="consultation"
          color="error"
          @click="$emit('deleteConsult', consult.id)"
        >
          Delete
        </v-btn>
        <v-spacer/>
        <v-btn
          color="success"
          :disabled="!consultation && timeIsBusy"
          @click="saveConsult"
        >
          Save
        </v-btn>
      </div>
    </v-form>

  </v-card>
</template>

<script>
export default {
  name: 'ConsultationForm',
  props: {
    consultation: Object
  },
  watch: {
    consultation() {
      if (this.consultation !== this.consult) {
        this.consult = {...this.consultation}
      }
    },
  },
  created() {
    if (this.consultation) {
      this.consult = {...this.consultation}
    }
  },
  data() {
    return {
      consult: {
        date: '',
        time: '',
        symptoms: '',
        patient:{}
      },
      menu: false,
      menu2: false,
      valid: true
    }
  },
  computed: {
    patients() {
      return this.$store.getters.allPatients
    },
    timeIsBusy() {
      //Проверка на занятость даты и времени
      return this.$store.getters.allConsultations.some(c => c.date === this.consult.date && c.time === this.consult.time)
    }
  },
  methods: {
    allowedDates(val) {
      //Невозможность выбора даты записи "задним числом" и на выходных
      const day = new Date(val).getDay()
      return val >= new Date().toISOString().substr(0, 10) && [1,2,3,4,5].includes(day)
    },
    allowedHours(val) {
      //Часы работы с 8:00 до 20:00
      return val > 7 && val < 20
    },
    selectUser(patientId) {
      const patient = this.patients.find(p => p.id === patientId)
      this.consult.patient = patient
    },
    saveConsult() {
      if (this.$refs.form.validate()) {
        this.$emit('saveConsult', this.consult)
      }
    },
  }
}
</script>

<style scoped>
.date-time {
  max-width: 300px;
}
</style>