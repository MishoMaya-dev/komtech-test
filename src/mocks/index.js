//Дефолтные данные для приложения
export const defaultPatients = [
  {
    id: 1,
    surname: 'Иванов',
    name: 'Алексей',
    secondName: 'Степанович',
    fullName: 'Иванов Алексей Степанович',
    birthDate: '1998-07-15',
    gender: 'male',
    snils: '12345678964',
    weight: 75,
    height: 175,
    age: 23,
  },
  {
    id: 3,
    surname: 'Алексеева',
    name: 'Елена',
    secondName: 'Петровна',
    fullName: 'Алексеева Елена Петровна',
    birthDate: '1999-05-24',
    gender: 'female',
    snils: '11693735882',
    weight: 45,
    height: 167,
    age: 21,
  }
]

export const defaultConsults = [
  {id: 1, date: '2021-07-21', time: '10:30', symptoms: 'Headache', patient_id: 1},
  {id: 3, date: '2021-07-30', time: '10:11', symptoms: 'Dizziness', patient_id: 1},
  {id: 2, date: '2021-09-18', time: '11:50', symptoms: '', patient_id: 3},
]