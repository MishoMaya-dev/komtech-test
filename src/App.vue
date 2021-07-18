<template>
  <v-app>
    <v-navigation-drawer app>
      <v-list-item @click="$router.push('/')">
        <v-list-item-content class="py-5">
          <v-list-item-title class="text-h6">
            Management panel
          </v-list-item-title>
        </v-list-item-content>
      </v-list-item>

      <v-divider></v-divider>
      <v-list
        nav
      >
        <v-list-item
          v-for="item in items"
          :key="item.title"
          :to="item.link"
          link
        >
          <v-list-item-icon>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-app-bar
      app
    >
      <div class="d-flex align-center">
        <div>Light mode</div>
        <v-switch
          v-model="appTheme"
          class="px-2"
          hide-details
        />
        <div>Dark mode</div>
      </div>
      <v-spacer></v-spacer>

      <v-btn
        text
        large
        @click="dialog.patient = true"
      >
        <v-icon>mdi-account-plus</v-icon>
        <span class="mr-2">Add patient</span>
      </v-btn>

      <v-btn
        text
        large
        @click="dialog.consult = true"
      >
        <v-icon>mdi-playlist-plus</v-icon>
        <span class="mr-2">Add consultation</span>
      </v-btn>
    </v-app-bar>

    <v-main>
      <router-view/>
    </v-main>
    <v-dialog
      v-model="dialog.patient"
      max-width="800px"
      persistent
    >
      <PatientForm
        @closePatientForm="dialog.patient = false"
        @savePatient="createPatient"
      />
    </v-dialog>
    <v-dialog
      v-model="dialog.consult"
      max-width="800px"
      persistent
    >
      <ConsultationForm
        v-if="dialog.consult"
        @closeForm="dialog.consult = false"
        @saveConsult="createConsult"
      />
    </v-dialog>
  </v-app>
</template>

<script>

import PatientForm from '@/components/PatientForm'
import ConsultationForm from '@/components/ConsultationForm'

export default {
  name: 'App',
  components: {
    PatientForm,
    ConsultationForm
  },
  data: () => ({
    appTheme: true,
    dialog: {
      patient: false,
      consult: false,
    },
    items: [
      {
        icon: 'mdi-account-group',
        title: 'Patients',
        link: '/patients'
      },
      {
        icon: 'mdi-format-list-bulleted',
        title: 'Consultations',
        link: '/consultations'
      },
    ],
  }),
  watch: {
    appTheme(val) {
      this.$vuetify.theme.dark = val
    }
  },
  created() {
    this.$vuetify.theme.dark = this.appTheme
  },
  methods: {
    createPatient(patient) {
      this.$store.dispatch('createPatient', patient)
      this.dialog.patient = false
    },
    createConsult(consult) {
      this.$store.dispatch('createConsultation', consult)
      this.dialog.consult = false
    }
  }
};
</script>
