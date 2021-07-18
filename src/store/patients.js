import {defaultPatients} from "@/mocks";

const PATIENTS = 'PATIENTS'

const patients = JSON.parse(localStorage.getItem(PATIENTS)) || defaultPatients

export default {
  state: {
    patients,
  },
  mutations: {
    deletePatient(state, id) {
      state.patients = state.patients.filter(p => p.id !== id)
    },
    updatePatient(state, patient) {
      state.patients = state.patients.map(p => {
        if (p.id === patient.id) {
          p = {
            ...patient,
            fullName: patient.surname + ' ' + patient.name + ' ' + patient.secondName,
          }
        }
        return p
      })
    },
    createPatient(state, patient) {
      state.patients.push(patient)
    }
  },
  actions: {
    deletePatient({ dispatch, commit, state, rootGetters }, id) {
      //Удаление пациента
      try {
        rootGetters.allConsultations.filter(c => c.patient_id === id).forEach(c => {
          dispatch('deleteConsultation', c.id)
        })
        commit('deletePatient', id)
        dispatch('saveInLocalStorage')
      } catch (e) {
        throw e
      }
    },
    updatePatient({dispatch, commit}, patient) {
      //Обновление данных пациента
      try {
        commit('updatePatient', patient)
        dispatch('saveInLocalStorage')
      } catch (e) {
        throw e
      }
    },
    createPatient({dispatch, commit}, patient) {
      //Создание нового пациента
      try {
        const newId = +Date.now()
        commit('createPatient', {
          ...patient,
          id: newId,
          fullName: patient.surname + ' ' + patient.name + ' ' + patient.secondName
        })
        dispatch('saveInLocalStorage')
      } catch (e) {
        throw e
      }
    },
    saveInLocalStorage({ state }) {
      //загрузка данных пациентов в localStorage
      localStorage.setItem(PATIENTS, JSON.stringify(state.patients))
    }
  },
  getters: {
    allPatients(state) {
      return state.patients
    }
  }
}