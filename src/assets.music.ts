import { useEffect, useState } from 'react'

import { ConvertPathToAudioOptions, useAudioAsset } from './assets'
import { keys } from './utils'

export const musicAssetIdToPath = {
  ac01: 'music/ac01.mp3',
} as const

export type MusicAssetId = keyof typeof musicAssetIdToPath

export const musicIds = keys(musicAssetIdToPath) as MusicAssetId[]

type MusicAssetOptions = Omit<ConvertPathToAudioOptions, 'loop'>

const useMusicAsset = (music: MusicAssetId | undefined, options: MusicAssetOptions) =>
  useAudioAsset(music ? musicAssetIdToPath[music] : undefined, { loop: true, ...options })

let _setMusicId: ((music: MusicAssetId | null) => void) | undefined
let _setMusicOptions: ((options: MusicAssetOptions) => void) | undefined

export const useMusic = (initialOptions: MusicAssetOptions = {}) => {
  const [musicId, __setMusicId] = useState<MusicAssetId | null>(null)
  _setMusicId = __setMusicId
  const [musicOptions, __setMusicOptions] = useState<MusicAssetOptions | null>(null)
  _setMusicOptions = __setMusicOptions

  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  const music = useMusicAsset(musicId ?? undefined, musicOptions ?? initialOptions)

  useEffect(() => {
    if (!musicId) return
    if (!music) return

    music.play()

    return () => {
      music.stop()
    }
  }, [musicId, music])
}

export const MusicHookNotMountedError = new Error('useMusic hook not mounted')

export const playMusic = (music: MusicAssetId) => {
  if (!_setMusicId) throw MusicHookNotMountedError
  _setMusicId(music)
}

export const stopMusic = () => {
  if (!_setMusicId) throw MusicHookNotMountedError
  _setMusicId(null)
}

export const setMusicOptions = (options: MusicAssetOptions) => {
  if (!_setMusicOptions) throw MusicHookNotMountedError
  _setMusicOptions(options)
}
