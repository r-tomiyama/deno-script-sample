import { parse } from 'https://deno.land/std/flags/mod.ts'

const args = parse(Deno.args)

if (!args.n) {
  throw new Error('オプションnを入力してください')
}

console.log(`Hello ${args.n} 🦕`);
