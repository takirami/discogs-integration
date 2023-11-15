import {USERNAME, FOLDER_ID, TOKEN} from './config.js'
import chalk from 'chalk'
const getRecordCollection = async () => {
  const baseUrl= "https://api.discogs.com/"
  const pageSize = 100 // TODO: handle pagination
  const url = `${baseUrl}users/${USERNAME}/collection/folders/${FOLDER_ID}/releases?per_page=${pageSize}&token=${TOKEN}`
  try{
    
  const response = await fetch(url)
  return await response.json()
  } catch (e){
    console.error(e)
    return false
  }
}

const formatRelease = (release) => {
    const {title, artists, labels,year} = release.basic_information
    const output = `${chalk.blue.bold(`♪ ${artists[0].name}`)} ${chalk.gray('–')} ${chalk.magenta(title)} ${chalk.gray(`(${labels[0].name}, ${year})`)}`
    console.log(output)
}

export const getRandomRecords = async (limit = 5) => {
  const {releases} = await getRecordCollection()
  console.log('===================== RECORD SELECTION =====================')
  await new Promise(resolve => setTimeout(resolve, 1000))
  const listed = []

  while(listed.length < limit){
    const randomIndex = Math.floor(Math.random() * releases.length)

    // avoid duplicates
    if(listed.includes(randomIndex)) continue
    
    listed.push(randomIndex)
    formatRelease(releases[randomIndex])
    await new Promise(resolve => setTimeout(resolve, 100))
  }

  console.log('============================================================')
}
