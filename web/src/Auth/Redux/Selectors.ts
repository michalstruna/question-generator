import { useSelector } from 'react-redux'

export const useIdentity = () => useSelector((state: any) => state.auth.identity)