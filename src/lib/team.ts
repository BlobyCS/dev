export type TeamMember = {
  name: string
  rank: string
  rankColor: string
  avatar: string
  email: string
  instagram?: string
  discord?: string
  youtube?: string
  github?: string
  twitter?: string
}

export const teamMembers: TeamMember[] = [
  {
    name: 'BlobyCZ',
    rank: 'Majitel',
    rankColor: '#ff0000',
    avatar: 'https://avatars.fastly.steamstatic.com/7843db5394166ab39c4f3cfcd814614734fc74c4_full.jpg',
    email: 'bloby@vaunt.cz',
    instagram: 'https://instagram.com/blobycz',
    discord: 'https://discord.com/users/1178258199590228078',
    youtube: 'https://youtube.com/@BlobyCZE',
    github: 'https://github.com/Bloby22',
  },
  {
    name: 'TagzTurtlee',
    rank: 'Majitel',
    rankColor: '#ff0000',
    avatar: 'https://cdn.discordapp.com/avatars/614161616543416320/e33f15a24d0a86c8d601540cf0dbc25b.png',
    email: 'turtlee@vaunt.cz',
    instagram: 'https://instagram.com/tagzturtlee_builder',
    discord: 'https://discord.com/users/614161616543416320',
  },
  {
    name: 'R4D3K',
    rank: 'Vedení',
    rankColor: '#a60202',
    avatar: 'https://cdn.discordapp.com/avatars/901597798506561606/a_c8aee9a8690f50e2fd768e0ccee4067c.png',
    email: 'r4d3k@vaunt.cz',
    instagram: 'https://instagram.com/radek._.z',
    discord: 'https://discord.com/users/90159779850656160',
  },
]
