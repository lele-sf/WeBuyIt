import { createContext } from 'react';

export const UserContext = createContext({
  user: { id: 'demoUserId', name: 'Demo User', imageUrl: 'https://placehold.co/200.png' }
});

// usuario fictício para teste
export function UserProvider({ children }) {
  const demoUser = { id: 'u12345', name: 'User Demo', imageUrl: 'https://placehold.co/200.png' };
  return (
    <UserContext.Provider value={{ user: demoUser }}>
      {children}
    </UserContext.Provider>
  );
}
