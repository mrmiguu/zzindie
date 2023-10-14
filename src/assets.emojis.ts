import { getImageAsset, getTextureAsset, useImageAsset, useTextureAsset } from './assets'
import { keys } from './utils'

export const emojiAssetIdToPath = {
  '👶': 'emojis/baby.png',
  '🍌': 'emojis/banana.png',
  '🪲': 'emojis/beetle.png',
  '🦋': 'emojis/butterfly.png',
  '🌵': 'emojis/cactus.png',
  '🥥': 'emojis/coconut.png',
  '🌳': 'emojis/deciduous-tree.png',
  '🐶': 'emojis/dog-face.png',
  '🐬': 'emojis/dolphin.png',
  '🐉': 'emojis/dragon.png',
  '🌲': 'emojis/evergreen-tree.png',
  '🦩': 'emojis/flamingo.png',
  '🐸': 'emojis/frog.png',
  '🌝': 'emojis/full-moon-face.png',
  '🐣': 'emojis/hatching-chick.png',
  '🐝': 'emojis/honeybee.png',
  '🪼': 'emojis/jellyfish.png',
  '#️⃣': 'emojis/keycap-number-sign.png',
  '🔟': 'emojis/keycap-10.png',
  '*️⃣': 'emojis/keycap-asterisk.png',
  '8️⃣': 'emojis/keycap-digit-eight.png',
  '5️⃣': 'emojis/keycap-digit-five.png',
  '4️⃣': 'emojis/keycap-digit-four.png',
  '9️⃣': 'emojis/keycap-digit-nine.png',
  '1️⃣': 'emojis/keycap-digit-one.png',
  '7️⃣': 'emojis/keycap-digit-seven.png',
  '6️⃣': 'emojis/keycap-digit-six.png',
  '3️⃣': 'emojis/keycap-digit-three.png',
  '2️⃣': 'emojis/keycap-digit-two.png',
  '0️⃣': 'emojis/keycap-digit-zero.png',
  '🐞': 'emojis/lady-beetle.png',
  '🦁': 'emojis/lion.png',
  '🥭': 'emojis/mango.png',
  '🐵': 'emojis/monkey-face.png',
  '🌚': 'emojis/new-moon-face.png',
  '🌴': 'emojis/palm-tree.png',
  '🐧': 'emojis/penguin.png',
  '🦑': 'emojis/squid.png',
  '🌞': 'emojis/sun-with-face.png',
  '🦖': 'emojis/t-rex.png',
  '🍹': 'emojis/tropical-drink.png',
  '🐠': 'emojis/tropical-fish.png',
  '🦄': 'emojis/unicorn.png',
  '🪱': 'emojis/worm.png',
} as const

export type EmojiAssetId = keyof typeof emojiAssetIdToPath

export const emojiIds = keys(emojiAssetIdToPath) as EmojiAssetId[]

export const getEmojiImageAsset = (emoji: EmojiAssetId) => getImageAsset(emojiAssetIdToPath[emoji])
export const getEmojiTextureAsset = (emoji: EmojiAssetId) => getTextureAsset(emojiAssetIdToPath[emoji])
export const useEmojiImageAsset = (emoji: EmojiAssetId) => useImageAsset(emojiAssetIdToPath[emoji])
export const useEmojiTextureAsset = (emoji: EmojiAssetId) => useTextureAsset(emojiAssetIdToPath[emoji])
