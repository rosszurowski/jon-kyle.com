import dotenv from 'dotenv'
import fetch from 'node-fetch'
import markdownIt from 'markdown-it'
import matter from 'gray-matter'
import { Feed } from 'feed'
import { getEntryMeta } from '../store/lib'

dotenv.config()

const ref = 'master'
const baseUrl = 'https://jon-kyle.com'
const utcOffset = '-08:00'

const md = markdownIt()

const feed = new Feed({
  title: 'Jon-Kyle',
  description: 'I am spartacus.',
  id: baseUrl,
  link: baseUrl,
  language: 'en',
  image: `${baseUrl}/assets/social.png`,
  favicon: `${baseUrl}/favicon/favicon.ico`,
  author: {
    name: 'Jon-Kyle Mohr',
    link: baseUrl
  }
})

export async function handler (event, context) {
  const entries = await fetchEntries()
  const entryFetchPromises = entries.reverse().map(entry => {
    const meta = getEntryMeta(entry)
    return fetchEntry(meta.src).then(entryContent => ({ ...meta, ...matter(entryContent) }))
  })

  const entriesWithContent = await Promise.all(entryFetchPromises)

  entriesWithContent.forEach(entry => {
    feed.addItem({
      title: parseTitle(entry.content) || entry.dateFormatted,
      id: baseUrl + entry.url,
      link: baseUrl + entry.url,
      content: md.render(entry.content),
      date: new Date(`${entry.date}T00:00:00.000${utcOffset}`)
    })
  })

  return {
    statusCode: 200,
    headers: {
      'Content-Type': 'application/rss+xml'
    },
    body: feed.rss2()
  }
}

function parseTitle (content) {
  if (content && content.substring(0, 2) === '# ') {
    return content.substring(2, content.indexOf('\n'))
  }

  return null
}

function fetchEntries () {
  return fetch(`https://api.github.com/repos/jondashkyle/archive/contents/entries?ref=${ref}`, {
    headers: {
      client_id: process.env.CLIENT_ID,
      client_secret: process.env.CLIENT_SECRET
    },
  }).then(response => response.json())
    .catch(err => console.warn(err))
}

function fetchEntry (url) {
  return fetch(`https://raw.githubusercontent.com/jondashkyle/archive/${ref}${url}`)
    .then(response => response.text())
    .catch(err => console.warn(err))
}
