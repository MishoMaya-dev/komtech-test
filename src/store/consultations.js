import {defaultConsults} from "@/mocks";

const CONSULTS = 'CONSULTS'

const consultations = JSON.parse(localStorage.getItem(CONSULTS)) || defaultConsults

export default {
  state: {
    consultations,
  },
  mutations: {
    deleteConsultation(state, id) {
      console.log('deleteConsultation', id)

      state.consultations = state.consultations.filter(c => c.id !== id)
    },
    updateConsultation(state, newConsult) {
      state.consultations = state.consultations.map(consult => {
        if(consult.id === newConsult.id) {
          consult = {...newConsult}
        }
        return consult
      })
    },
    createConsultation(state, consult) {
      state.consultations.push(consult)
    }
  },
  actions: {
    deleteConsultation({ dispatch, commit }, id) {
      //Удаление консультации
      try {
        commit('deleteConsultation', id)
        dispatch('saveInLocalStorage')
      } catch (e) {
        throw e
      }
    },
    updateConsultation({ dispatch, commit }, consult) {
      //Обновление данных консультации
      try {
        consult.patient_id = consult.patient.id
        delete consult.patient
        commit('updateConsultation', consult)
        dispatch('saveInLocalStorage')
      } catch (e) {
        throw e
      }
    },
    createConsultation({ dispatch, commit, state }, consult) {
      //Создание новой консультации
      try {
        if (state.consultations.some(c => c.date === consult.date && c.time === consult.time)) return
        consult.patient_id = consult.patient.id
        consult.id = +Date.now()
        delete consult.patient
        commit('createConsultation', consult)
        dispatch('saveInLocalStorage')
      } catch (e) {
        throw e
      }
    },
    saveInLocalStorage({ state }) {
      //Сохранение консультаций в localStorage
      localStorage.setItem(CONSULTS, JSON.stringify(state.consultations))
    }
  },
  getters: {
    allConsultations(state) {
      return state.consultations
    },
    allConsultsWithPatients(state, getters) {
      return state.consultations.map(c => {
        return {
          ...c,
          patient: getters.allPatients.find(p => p.id === c.patient_id)
        }
      })
    }
  }
}