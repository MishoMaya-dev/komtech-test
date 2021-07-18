<template>
  <v-card class="pa-4">
    <div class="d-flex justify-space-between align-center">
      <div class="display-1">
        {{ patient ? 'Edit' : 'New patient' }}
      </div>
      <v-btn icon @click="closeForm">
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
        <v-text-field
          v-model="person.surname"
          :rules="[v => !!v || 'Surname is required']"
          label="Surname"
          class="mr-4"
          required
        />
        <v-text-field
          v-model="person.name"
          :rules="[v => !!v || 'Name is required']"
          label="Name"
          class="mr-4"
          required
        />
        <v-text-field
          v-model="person.secondName"
          label="Second Name"
        />
      </div>
      <div class="d-flex align-center">
        <v-menu
          ref="menu"
          v-model="menu"
          :close-on-content-click="false"
          :return-value.sync="person.birthDate"
          transition="scale-transition"
          offset-y
          min-width="auto"
        >
          <template v-slot:activator="{ on, attrs }">
            <div class="patient-input">
              <v-text-field
                v-model="person.birthDate"
                :rules="[v => !!v || 'Birth date is required']"
                label="Birth date"
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
            v-model="person.birthDate"
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
              @click="$refs.menu.save(person.birthDate)"
            >
              OK
            </v-btn>
          </v-date-picker>
        </v-menu>
        <v-radio-group
          v-model="person.gender"
          :rules="[v => !!v || 'Choose gender']"
          required>
          <v-radio
            label="Male"
            value="male"
          />
          <v-radio
            label="Female"
            value="female"
          />
        </v-radio-group>
      </div>
      <div class="d-flex justify-space-between align-center">
        <v-text-field
          v-model="person.snils"
          :rules="snilsRules"
          label="СНИЛС"
          class="mr-10"
          required
          counter
          @keypress="isNumber($event)"
        />
        <v-btn @click="more = !more">
          {{ more ? 'Hide information' : 'More information' }}

        </v-btn>
      </div>
      <div v-if="error" class="caption red--text">
        Неправильное контрольное число
      </div>
      <div v-if="more" class="d-flex align-center">
        <v-text-field
          v-model="person.weight"
          label="Weight"
          class="mr-4"
          @keypress="isNumber($event)"
        />
        <v-text-field
          v-model="person.height"
          label="Height"
          class="mr-4"
          @keypress="isNumber($event)"
        />
        <v-text-field
          v-model="person.age"
          label="Age"
          @keypress="isNumber($event)"
        />
      </div>
    </v-form>

    <div class="d-flex justify-space-between align-center">
      <v-btn
        v-if="patient"
        color="error"
        @click="$emit('deletePatient', person)"
      >
        Delete
      </v-btn>
      <v-spacer/>
      <v-btn
        :disabled="!valid"
        color="success"
        @click="savePatient"
      >
        Save
      </v-btn>
    </div>
  </v-card>
</template>

<script>
export default {
  name: 'PatientForm',
  props: {
    patient: Object
  },
  watch: {
    patient() {
      if (this.patient !== this.person) {
        this.person = {...this.patient}
      }
    },
  },
  created() {
    if (this.patient) {
      this.person = {...this.patient}
    }
  },
  data: () => {
    return {
      valid: true,
      menu: false,
      more: false,
      error: false,
      person: {},
      snilsRules: [
        v => !!v || 'СНИЛС is required',
        v => (v && v.length === 11) || 'СНИЛС must be 11 characters',
      ],
    }
  },
  methods: {
    savePatient() {
      if (this.$refs.form.validate() && this.checkControlNum(this.person.snils)) {
        this.$emit('savePatient', this.person)
      }
    },
    closeForm() {
      this.$emit('closePatientForm')
      this.person = {}
      this.error = false
    },
    isNumber($event) {
      //Валидация: доступен ввод только чисел
      let keyCode = ($event.keyCode ? $event.keyCode : $event.which)
      if ((keyCode < 48 || keyCode > 57)) {
        $event.preventDefault()
      }
    },
    allowedDates(val) {
      //Невозможность выбора даты рождения вперед
      return val < new Date().toISOString().substr(0, 10)
    },
    checkControlNum(snils) {
      //Проверка контрольной суммы СНИЛС
      this.error = false
      let result = false
      let sum = 0;
      for (let i = 0; i < 9; i++) {
        sum += parseInt(snils[i]) * (9 - i);
      }
      let checkDigit = 0;
      if (sum < 100) {
        checkDigit = sum;
      } else if (sum > 101) {
        checkDigit = parseInt(sum % 101);
        if (checkDigit === 100) {
          checkDigit = 0;
        }
      }
      if (checkDigit === parseInt(snils.slice(-2))) {
        result = true;
      } else {
        this.error = true
      }
      return result
    }
  }
}
</script>

<style scoped>
.patient-input {
  width: 400px;
}
</style>