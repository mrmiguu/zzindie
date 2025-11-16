import { User } from 'firebase/auth'
import { ref, set, get, onValue, off } from 'firebase/database'
import { database } from '../firebase'
import { AppState } from '../appState'

/**
 * Save the entire game state to Firebase Realtime Database
 */
export const saveGameState = async (
  user: User,
  gameState: AppState
): Promise<void> => {
  if (!user) {
    throw new Error('User must be authenticated to save game state')
  }

  const userGameStateRef = ref(database, `users/${user.uid}/gameState`)
  await set(userGameStateRef, gameState)
}

/**
 * Load the game state from Firebase Realtime Database
 */
export const loadGameState = async (user: User): Promise<AppState | null> => {
  if (!user) {
    throw new Error('User must be authenticated to load game state')
  }

  const userGameStateRef = ref(database, `users/${user.uid}/gameState`)
  const snapshot = await get(userGameStateRef)

  if (snapshot.exists()) {
    return snapshot.val() as AppState
  }

  return null
}

/**
 * Subscribe to real-time updates of game state
 */
export const subscribeToGameState = (
  user: User,
  callback: (gameState: AppState | null) => void
): (() => void) => {
  if (!user) {
    throw new Error('User must be authenticated to subscribe to game state')
  }

  const userGameStateRef = ref(database, `users/${user.uid}/gameState`)

  const unsubscribe = onValue(userGameStateRef, (snapshot) => {
    if (snapshot.exists()) {
      callback(snapshot.val() as AppState)
    } else {
      callback(null)
    }
  })

  // Return cleanup function
  return () => off(userGameStateRef, 'value', unsubscribe)
}
