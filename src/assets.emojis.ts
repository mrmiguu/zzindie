import { getImageAsset, getTextureAsset, useImageAsset, useTextureAsset } from './assets'
import { keys } from './utils'

export const emojiAssetIdToPath = {
  '👶': 'emojis/baby.png',
  '🪲': 'emojis/beetle.png',
  '🦋': 'emojis/butterfly.png',
  '🐶': 'emojis/dog-face.png',
  '🐬': 'emojis/dolphin.png',
  '🐉': 'emojis/dragon.png',
  '🦩': 'emojis/flamingo.png',
  '🐸': 'emojis/frog.png',
  '🌝': 'emojis/full-moon-face.png',
  '🐣': 'emojis/hatching-chick.png',
  '🐝': 'emojis/honeybee.png',
  '🪼': 'emojis/jellyfish.png',
  '🐞': 'emojis/lady-beetle.png',
  '🦁': 'emojis/lion.png',
  '🐵': 'emojis/monkey-face.png',
  '🌚': 'emojis/new-moon-face.png',
  '🐧': 'emojis/penguin.png',
  '🦑': 'emojis/squid.png',
  '🌞': 'emojis/sun-with-face.png',
  '🦖': 'emojis/t-rex.png',
  '🦄': 'emojis/unicorn.png',
  '🪱': 'emojis/worm.png',
} as const

export type EmojiAssetId = keyof typeof emojiAssetIdToPath

export const emojiIds = keys(emojiAssetIdToPath) as EmojiAssetId[]

export const getEmojiImageAsset = (emoji: EmojiAssetId) => getImageAsset(emojiAssetIdToPath[emoji])
export const getEmojiTextureAsset = (emoji: EmojiAssetId) => getTextureAsset(emojiAssetIdToPath[emoji])
export const useEmojiImageAsset = (emoji: EmojiAssetId) => useImageAsset(emojiAssetIdToPath[emoji])
export const useEmojiTextureAsset = (emoji: EmojiAssetId) => useTextureAsset(emojiAssetIdToPath[emoji])
