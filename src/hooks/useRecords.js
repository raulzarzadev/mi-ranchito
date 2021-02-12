export const useRecords = () => {
  const addRecord = () => {
    console.log('nuevo record')
  }
  const editRecord = () => {
    console.log('edit record')
  }
  return { addRecord, editRecord }
}
