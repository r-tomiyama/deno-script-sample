import { parse } from 'https://deno.land/std/flags/mod.ts'

const urlLists = (boardId: string) => `https://trello.com/1/boards/${boardId}/lists`
const urlCards = (listId: string) => `https://trello.com/1/lists/${listId}/cards`

const args = parse(Deno.args)
if (!(args.i && args.n && args.k && args.t)) {
  throw new Error('オプションi(boardId), n(boardName), k(key), t(token)を入力してください')
}

const boardId = args.i
const key = args.k
const token = args.t

const res = await fetch(`${urlLists(boardId)}?key=${key}&token=${token}&fields=name`)
const json = res.json()
const lists = await json;

const boardName = args.n
const list = lists.find((l: { id: string, name: string }) => l.name === boardName)

if (list) {
  const res = await fetch(`${urlCards(list.id)}?key=${key}&token=${token}&fields=name`)
  const json = res.json()
  const cards = await json;

  console.log(cards)
} else {
  console.error('指定した名前のリストが存在しません')
}
