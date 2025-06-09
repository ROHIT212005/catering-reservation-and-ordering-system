
// Firebase configuration and initialization
// Note: In a real application, these keys should be in environment variables
// For this demo, we'll use mock data and local storage instead of Firebase

export const firebaseConfig = {
  apiKey: "AIzaSyCiN9BcS1r1fFS17REN9Eqoe7E3UmqGtOI",
  authDomain: "catering-system-a6c88.firebaseapp.com",
  projectId: "catering-system-a6c88",
  storageBucket: "catering-system-a6c88.appspot.com",
  messagingSenderId: "98935836900",
  appId: "1:98935836900:web:8354f49bd30700bf8cdcf1"
};

// Mock Firebase functions for demonstration
// In production, replace with actual Firebase SDK calls

export const mockAuthService = {
  currentUser: null as any,
  
  signInWithEmailAndPassword: async (email: string, password: string) => {
    console.log('Mock Firebase Auth: Sign in attempt', { email });
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const users = JSON.parse(localStorage.getItem('catering_users') || '[]');
    const user = users.find((u: any) => u.email === email && u.password === password);
    
    if (user) {
      const { password: _, ...userWithoutPassword } = user;
      localStorage.setItem('catering_current_user', JSON.stringify(userWithoutPassword));
      mockAuthService.currentUser = userWithoutPassword;
      return { user: userWithoutPassword };
    } else {
      throw new Error('Invalid credentials');
    }
  },
  
  createUserWithEmailAndPassword: async (email: string, password: string) => {
    console.log('Mock Firebase Auth: Create user attempt', { email });
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const users = JSON.parse(localStorage.getItem('catering_users') || '[]');
    const userExists = users.find((u: any) => u.email === email);
    
    if (userExists) {
      throw new Error('User already exists');
    }
    
    const newUser = {
      id: Date.now().toString(),
      email,
      password,
      createdAt: new Date().toISOString()
    };
    
    users.push(newUser);
    localStorage.setItem('catering_users', JSON.stringify(users));
    
    const { password: _, ...userWithoutPassword } = newUser;
    return { user: userWithoutPassword };
  },
  
  signOut: async () => {
    console.log('Mock Firebase Auth: Sign out');
    localStorage.removeItem('catering_current_user');
    mockAuthService.currentUser = null;
  },
  
  getCurrentUser: () => {
    const userStr = localStorage.getItem('catering_current_user');
    if (!userStr) {
      return null;
    }
    
    try {
      const user = JSON.parse(userStr);
      return user || null;
    } catch (error) {
      console.error('Error parsing current user from localStorage:', error);
      return null;
    }
  }
};

// Mock Firestore functions
export const mockFirestore = {
  collection: (collectionName: string) => ({
    add: async (data: any) => {
      console.log(`Mock Firestore: Add to ${collectionName}`, data);
      const items = JSON.parse(localStorage.getItem(`catering_${collectionName}`) || '[]');
      const newItem = {
        id: Date.now().toString(),
        ...data,
        createdAt: new Date().toISOString()
      };
      items.push(newItem);
      localStorage.setItem(`catering_${collectionName}`, JSON.stringify(items));
      return { id: newItem.id };
    },
    
    get: async () => {
      console.log(`Mock Firestore: Get ${collectionName}`);
      const items = JSON.parse(localStorage.getItem(`catering_${collectionName}`) || '[]');
      return {
        docs: items.map((item: any) => ({
          id: item.id,
          data: () => item
        }))
      };
    },
    
    where: (field: string, operator: string, value: any) => ({
      get: async () => {
        console.log(`Mock Firestore: Query ${collectionName} where ${field} ${operator} ${value}`);
        const items = JSON.parse(localStorage.getItem(`catering_${collectionName}`) || '[]');
        const filtered = items.filter((item: any) => {
          switch (operator) {
            case '==': return item[field] === value;
            case '!=': return item[field] !== value;
            case '>': return item[field] > value;
            case '<': return item[field] < value;
            default: return false;
          }
        });
        return {
          docs: filtered.map((item: any) => ({
            id: item.id,
            data: () => item
          }))
        };
      }
    }),
    
    doc: (docId: string) => ({
      get: async () => {
        console.log(`Mock Firestore: Get ${collectionName}/${docId}`);
        const items = JSON.parse(localStorage.getItem(`catering_${collectionName}`) || '[]');
        const item = items.find((item: any) => item.id === docId);
        if (item) {
          return {
            exists: true,
            id: item.id,
            data: () => item
          };
        } else {
          return {
            exists: false
          };
        }
      },
      
      update: async (data: any) => {
        console.log(`Mock Firestore: Update ${collectionName}/${docId}`, data);
        const items = JSON.parse(localStorage.getItem(`catering_${collectionName}`) || '[]');
        const index = items.findIndex((item: any) => item.id === docId);
        if (index !== -1) {
          items[index] = { ...items[index], ...data, updatedAt: new Date().toISOString() };
          localStorage.setItem(`catering_${collectionName}`, JSON.stringify(items));
        }
      },
      
      delete: async () => {
        console.log(`Mock Firestore: Delete ${collectionName}/${docId}`);
        const items = JSON.parse(localStorage.getItem(`catering_${collectionName}`) || '[]');
        const filtered = items.filter((item: any) => item.id !== docId);
        localStorage.setItem(`catering_${collectionName}`, JSON.stringify(filtered));
      }
    })
  })
};
